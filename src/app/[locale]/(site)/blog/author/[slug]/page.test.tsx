import type { ComponentProps, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AuthorPage from "./page";

const mocks = vi.hoisted(() => ({
  getAuthorBySlug: vi.fn(),
  getPosts: vi.fn(),
}));

vi.mock("@/lib/wordpress", () => ({
  getAuthorBySlug: mocks.getAuthorBySlug,
  getPosts: mocks.getPosts,
}));

vi.mock("next-intl/server", () => ({
  getTranslations:
    async () => (key: string, values?: Record<string, unknown>) => {
      if (key === "authorPostCount") return `${values?.count} artikel`;
      const messages: Record<string, string> = {
        authorBio: "Tim konten Cekat.AI.",
        authorEyebrow: "Penulis",
        authorRole: "Tim Konten",
        authorArticles: "Artikel oleh Cekat AI",
        authorArticlesSubtitle: "Artikel terbaru dari Cekat AI.",
        backToBlog: "Kembali ke Blog",
        heroTitle: "Blog",
      };
      return messages[key] ?? key;
    },
  setRequestLocale: vi.fn(),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  getPathname: () => "/",
}));

vi.mock("@/components/seo/json-ld", () => ({ JsonLd: () => null }));
vi.mock("@/components/sections/shared/hero-entrance", () => ({
  HeroEntrance: () => null,
}));
vi.mock("@/components/sections/new-home/reveal", () => ({
  Reveal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/components/sections/blog/post-card", () => ({
  PostCard: () => null,
}));

describe("blog author profile", () => {
  beforeEach(() => {
    mocks.getAuthorBySlug.mockResolvedValue({
      id: 17,
      name: "Cekat AI",
      slug: "superadmin",
      avatar: null,
      bio: "",
    });
    mocks.getPosts.mockResolvedValue({ posts: [], total: 307 });
  });

  it("uses readable colors for the author details on its light hero", async () => {
    const page = await AuthorPage({
      params: Promise.resolve({ locale: "id", slug: "superadmin" }),
    });
    render(page);

    const authorName = screen
      .getAllByText("Cekat AI")
      .find((element) => element.tagName === "P");
    const postCount = screen
      .getAllByText("307 artikel")
      .find((element) => element.tagName === "P");
    const profileCard = authorName?.parentElement?.parentElement;

    expect(authorName).toHaveClass("text-[#09214c]");
    expect(screen.getByText("Tim Konten")).toHaveClass("text-[#505f73]");
    expect(postCount).toHaveClass("text-[#1352bf]");
    expect(profileCard).toHaveClass("border-[#ccdaf1]", "bg-white/90");
  });
});
