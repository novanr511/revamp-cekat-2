import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProductSurface } from "./product-surface";

const css = readFileSync(
  "src/components/sections/landing/product-soft.css",
  "utf8",
);
const sharedCss = readFileSync("src/app/globals.css", "utf8");
const sharedPalette = Object.fromEntries(
  [...sharedCss.matchAll(/(--soft-surface-[\w-]+):\s*(#[\da-f]{6});/gi)].map(
    (match) => [match[1], match[2]],
  ),
);
const productTokens = Object.fromEntries(
  [...css.matchAll(/(--product-[\w-]+):\s*([^;]+);/gi)].map((match) => [
    match[1],
    match[2].trim(),
  ]),
);

function resolveColor(value: string, seen = new Set<string>()): string {
  const reference = value.match(/^var\((--[\w-]+)\)$/)?.[1];
  if (!reference || seen.has(reference)) return value;
  seen.add(reference);
  const next = productTokens[reference] ?? sharedPalette[reference];
  return next ? resolveColor(next, seen) : value;
}

describe("six-product soft palette boundary", () => {
  it.each([
    "marketing",
    "chat",
    "crm",
    "broadcast",
    "otomatisasi",
    "analitik",
  ] as const)("scopes /%s without replacing its content", (product) => {
    const markup = renderToStaticMarkup(
      <ProductSurface product={product}>
        <section>Existing content</section>
      </ProductSurface>,
    );
    expect(markup).toBe(
      `<div class="product-soft" data-product="${product}"><section>Existing content</section></div>`,
    );
  });

  it("leaves order unwrapped and unchanged", () => {
    expect(
      renderToStaticMarkup(
        <ProductSurface product="order">
          <section>Existing order</section>
        </ProductSurface>,
      ),
    ).toBe("<section>Existing order</section>");
  });

  it("contains only scoped cosmetic declarations, never layout changes", () => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    try {
      const rules = [...style.sheet!.cssRules] as CSSStyleRule[];
      expect(rules.length).toBeGreaterThan(20);
      for (const rule of rules) {
        for (const selector of rule.selectorText.split(",")) {
          expect(selector.trim()).toMatch(
            /^\.cekat-page\s+\.product-soft(?:[\s.[#:]|$)/,
          );
        }
        for (let i = 0; i < rule.style.length; i++) {
          expect(rule.style[i]).toMatch(
            /^(--[\w-]+|background(?:-(?:color|image|position|size|repeat|origin|clip|attachment))?|color|border-(?:(?:top|right|bottom|left)-)?color|box-shadow)$/,
          );
        }
      }
    } finally {
      style.remove();
    }
  });

  it("shares blue and warm surface tokens across every refreshed page family", () => {
    expect(sharedPalette).toMatchObject({
      "--soft-surface-blue": "#f0f4fa",
      "--soft-surface-blue-deep": "#e2eaf5",
      "--soft-surface-warm": "#faf6ed",
      "--soft-surface-sand": "#f3ead7",
      "--soft-surface-neutral": "#f7f8fa",
    });

    const pageStyles = [
      readFileSync("src/components/sections/landing/playground.css", "utf8"),
      css,
      readFileSync(
        "src/components/sections/shared/secondary-hubs-soft.css",
        "utf8",
      ),
      readFileSync(
        "src/components/sections/shared/story-detail-soft.css",
        "utf8",
      ),
      readFileSync(
        "src/components/sections/shared/case-study-soft.css",
        "utf8",
      ),
      readFileSync("src/components/sections/pricing/pricing-soft.css", "utf8"),
      readFileSync("src/components/sections/revamp/revamp.css", "utf8"),
    ].join("\n");

    expect(pageStyles).not.toMatch(
      /--[\w-]*mint|#(?:e6f7fa|a5e1e8|78d1de|dceee8|f0f7f5|e1efeb|a8d9ca|aac6c0|e7f1ed)/i,
    );
  });

  it("keeps text and CTA colors above AA contrast on all soft surfaces", () => {
    function luminance(hex: string) {
      const channels = hex.match(/[\da-f]{2}/gi)!.map((value) => {
        const n = parseInt(value, 16) / 255;
        return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    }
    const tokens = Object.fromEntries(
      Object.entries(productTokens).map(([key, value]) => [
        key,
        resolveColor(value),
      ]),
    );
    const surfaces = [
      "--soft-surface-blue",
      "--soft-surface-blue-deep",
      "--soft-surface-warm",
      "--soft-surface-sand",
      "--soft-surface-neutral",
    ].map((key) => sharedPalette[key]);
    surfaces.push("#ffffff");
    const pairs = surfaces.flatMap((surface) =>
      ["--product-ink", "--product-body", "--product-accent"].map((key) => [
        tokens[key],
        surface,
      ]),
    );
    pairs.push(
      ["#ffffff", tokens["--product-accent"]],
      ["#ffffff", tokens["--product-accent-hover"]],
    );
    for (const [fg, bg] of pairs) {
      const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
      expect(
        (values[0] + 0.05) / (values[1] + 0.05),
        `${fg} on ${bg}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
