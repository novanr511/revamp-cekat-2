import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AlternatingStory } from "./alternating-story";

vi.mock("./section-heading", () => ({
  SectionHeading: ({ heading }: { heading: string }) => <h2>{heading}</h2>,
}));

describe("alternating story", () => {
  it("shows every chapter without buttons or hidden panels and keeps text first", () => {
    const benefits = [0, 1, 2].map((index) => ({
      title: `Capability ${index}`,
      body: `Existing body ${index}`,
      image: "/images/marketing/see-what-actually-works.png",
      imageAlt: `Illustration ${index}`,
    }));
    const { container } = render(
      <AlternatingStory heading="Capabilities" benefits={benefits} />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(
      container.querySelectorAll("[hidden], [aria-expanded]"),
    ).toHaveLength(0);
    const chapters = container.querySelectorAll("article");
    expect(chapters).toHaveLength(3);
    chapters.forEach((chapter, index) => {
      expect(screen.getByText(`Existing body ${index}`)).toBeVisible();
      expect(chapter.firstElementChild?.tagName).toBe("DIV");
      expect(chapter.lastElementChild?.tagName).toBe("FIGURE");
      expect(
        chapter.firstElementChild?.className.includes("md:col-start-2"),
      ).toBe(index % 2 === 1);
      expect(screen.getByAltText(`Illustration ${index}`)).toHaveAttribute(
        "loading",
        "lazy",
      );
    });
  });

  it("omits an empty section and supports text-only chapters", () => {
    const { container, rerender } = render(
      <AlternatingStory heading="Capabilities" benefits={[]} />,
    );
    expect(container).toBeEmptyDOMElement();
    rerender(
      <AlternatingStory
        heading="Capabilities"
        benefits={[{ title: "Text", body: "Existing content" }]}
      />,
    );
    expect(screen.getByText("Existing content")).toBeVisible();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
