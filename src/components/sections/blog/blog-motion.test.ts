import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(
  "src/components/sections/blog/blog-motion.css",
  "utf8",
);
const page = readFileSync("src/app/[locale]/(site)/blog/page.tsx", "utf8");

describe("blueprint blog motion", () => {
  it("uses a listing-only boundary, without generic scroll reveals or GSAP", () => {
    expect(page).toContain('className="r-page r-journal r-journal-motion"');
    expect(page).not.toContain("RevampMotion");
    expect(css).not.toMatch(/transition\s*:\s*all\b|ease-in\b|scale\(0\)/);
  });

  it("finishes the lead choreography inside 300ms and does not stagger articles", () => {
    expect(css).toContain("journal-title-enter 240ms var(--ease-out) both");
    expect(css).toContain("journal-copy-enter 200ms var(--ease-out) 50ms both");
    expect(css).toContain(
      "journal-image-enter 200ms var(--ease-out) 80ms both",
    );
    expect(css).not.toMatch(/nth-child|animation-delay|r-blog-grid\s*\{/);
  });

  it("animates only compositor properties and leaves dimensions unchanged", () => {
    const declarations = [
      ...css.matchAll(/(?:^|[;{}])\s*([\w-]+)\s*:\s*([^;{}]+);/gm),
    ];
    expect(declarations.length).toBeGreaterThan(20);
    for (const [, property, value] of declarations) {
      expect(property).toMatch(
        /^(--ease-out|transform|opacity|animation|transition|transition-duration|text-decoration|text-underline-offset)$/,
      );
      if (property === "transition") {
        expect(value).toMatch(/^(none|(?:opacity|transform)\s)/);
        expect(value).not.toMatch(
          /width|height|padding|margin|top|left|filter|box-shadow|background/,
        );
      }
    }
  });

  it("gates hover movement, cancels reduced motion and makes keyboard search instant", () => {
    expect(css).toContain("@media (hover: hover) and (pointer: fine)");
    expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(":hover:not(:focus-visible)");
    expect(css).toContain(":active:not(:focus-visible)");
    expect(css).toMatch(/:not\(\[data-motion="instant"\]\)\s+input/);
    expect(css).toContain("@starting-style");
  });
});
