import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import type { BlogPost } from "@/lib/wordpress";
import { BlogFeed } from "./blog-feed";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: unknown;
    [key: string]: unknown;
  }) => (
    <a href={typeof href === "string" ? href : JSON.stringify(href)} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("./post-card", () => ({
  PostCard: ({ post }: { post: BlogPost }) => <div>{post.title}</div>,
}));

describe("blog pagination", () => {
  it("links to real pages, retains filters, and marks the selected page", () => {
    render(
      <BlogFeed
        initialPosts={[{ id: 1, title: "Story" } as BlogPost]}
        initialPage={2}
        totalPages={8}
        categorySlug="marketing"
        query="campaign"
      />,
    );
    expect(screen.getByText("Story")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Next page" }).getAttribute("href"),
    ).toContain('"page":3');
    expect(
      screen.getByRole("link", { name: "Next page" }).getAttribute("href"),
    ).toContain('"category":"marketing"');
    expect(
      screen.getByRole("link", { name: "Next page" }).getAttribute("href"),
    ).toContain('"q":"campaign"');
  });
});
