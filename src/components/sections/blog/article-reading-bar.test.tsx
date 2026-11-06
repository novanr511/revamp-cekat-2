import type { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ArticleReadingBar } from "./article-reading-bar";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ArticleReadingBar", () => {
  it("stays in document flow and is visible before scrolling", () => {
    const { container } = render(
      <ArticleReadingBar title="Article title" backLabel="Back to Blog" />,
    );

    const bar = container.firstElementChild as HTMLElement;

    expect(bar).not.toHaveClass("fixed");
    expect(bar).not.toHaveClass("sticky");
    expect(bar).not.toHaveClass("opacity-0");
    expect(bar).not.toHaveClass("pointer-events-none");
    expect(screen.getByText("Article title")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });
});
