import {
  Children,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type ElementType,
} from "react";
import { describe, expect, it, vi } from "vitest";
import { BlogFeed } from "@/components/sections/blog/blog-feed";
import { HeroFeatured } from "@/components/sections/blog/hero-featured";
import { StoryRail } from "@/components/sections/blog/story-rail";
import BlogIndexPage, { generateMetadata } from "./page";

const getPosts = vi.hoisted(() =>
  vi.fn(async () => ({
    posts: [{ id: 1, slug: "story", title: "Story", content: "Full article" }],
    totalPages: 3,
  })),
);
vi.mock("@/lib/wordpress", () => ({ getPosts, getCategories: async () => [] }));
vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async () => (key: string) => key,
}));

function find(
  node: ReactNode,
  type: ElementType,
):
  | ReactElement<{
      children?: ReactNode;
      initialPage?: number;
      initialPosts?: Array<{ id: number }>;
      posts?: Array<{ id: number }>;
      post?: { slug: string };
    }>
  | undefined {
  if (
    !isValidElement<{
      children?: ReactNode;
      initialPage?: number;
      initialPosts?: Array<{ id: number }>;
      posts?: Array<{ id: number }>;
      post?: { slug: string };
    }>(node)
  )
    return;
  if (node.type === type) return node;
  for (const child of Children.toArray(node.props.children)) {
    const result = find(child, type);
    if (result) return result;
  }
}

describe("server-rendered blog pagination", () => {
  it("assigns a lead, three supporting stories and the feed without repeating posts", async () => {
    getPosts.mockResolvedValueOnce({
      posts: [1, 2, 3, 4, 5].map((id) => ({
        id,
        slug: `story-${id}`,
        title: `Story ${id}`,
        content: "Full article",
      })),
      totalPages: 3,
    });
    const tree = await BlogIndexPage({
      params: Promise.resolve({ locale: "id" }),
      searchParams: Promise.resolve({}),
    });
    expect(find(tree, HeroFeatured)).toBeDefined();
    expect(find(tree, StoryRail)?.props.posts?.map((post) => post.id)).toEqual([
      2, 3, 4,
    ]);
    expect(
      find(tree, BlogFeed)?.props.initialPosts?.map((post) => post.id),
    ).toEqual([5]);
  });
  it("curates the published Figma highlights and prioritizes matching feed stories", async () => {
    const slugs = [
      "spam-test-leads-analisis-campaign",
      "ad-fatigue-kapan-ganti-creative",
      "postcampaign-review-learning",
      "roadmap-eksperimen-marketing-90-hari",
      "course-marketing-trial-booking-enrollment",
      "kontrak-metrik-agency-klien",
      "alasan-penolakan-input-marketing",
    ];
    getPosts.mockResolvedValueOnce({
      posts: slugs.map((slug, index) => ({
        id: index + 1,
        slug,
        title: slug,
        content: "Full article",
      })),
      totalPages: 2,
    });
    const tree = await BlogIndexPage({
      params: Promise.resolve({ locale: "en" }),
      searchParams: Promise.resolve({}),
    });
    expect(find(tree, HeroFeatured)?.props.post?.slug).toBe(
      "roadmap-eksperimen-marketing-90-hari",
    );
    expect(find(tree, StoryRail)?.props.posts?.map((post) => post.id)).toEqual([
      3, 6, 7,
    ]);
    expect(
      find(tree, BlogFeed)?.props.initialPosts?.map((post) => post.id),
    ).toEqual([2, 5, 1]);
  });
  it("requests the selected page and resets the client feed identity when pages change", async () => {
    const params = Promise.resolve({ locale: "id" });
    const first = await BlogIndexPage({
      params,
      searchParams: Promise.resolve({}),
    });
    const next = await BlogIndexPage({
      params,
      searchParams: Promise.resolve({ page: "2" }),
    });
    expect(getPosts).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 2, perPage: 18 }),
    );
    expect(find(next, BlogFeed)?.props.initialPage).toBe(2);
    expect(find(next, BlogFeed)?.key).not.toBe(find(first, BlogFeed)?.key);
    expect(find(next, HeroFeatured)).toBeUndefined();
  });

  it("defaults malformed pagination to page one and noindexes valid later pages", async () => {
    const params = Promise.resolve({ locale: "id" });
    await BlogIndexPage({
      params,
      searchParams: Promise.resolve({ page: "-5" }),
    });
    expect(getPosts).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 1 }),
    );
    const metadata = await generateMetadata({
      params,
      searchParams: Promise.resolve({ page: "2" }),
    });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
