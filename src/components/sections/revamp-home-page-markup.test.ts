import { describe, expect, it } from "vitest";
import { revampHomePageMarkupForLocale } from "./revamp-home-page-markup";

describe("homepage markup for the shared site chrome", () => {
  it.each(["en", "id", "cn", "jp", "kr"] as const)(
    "keeps the homepage content in %s without duplicating shared landmarks",
    (locale) => {
      const markup = revampHomePageMarkupForLocale(locale);

      expect(markup).toContain('<section class="hero">');
      expect(markup).toContain("<dialog");
      expect(markup).not.toContain('<header class="nav"');
      expect(markup).not.toContain('<a class="skip"');
      expect(markup).not.toContain('<main id="main">');
      expect(markup).not.toContain("</main>");
    },
  );

  it("keeps the hero reveal spans while localizing its copy", () => {
    const english = revampHomePageMarkupForLocale("en");
    const chinese = revampHomePageMarkupForLocale("cn");

    expect(english).toContain(
      '<span class="tr" style="--i:0">#1</span> <span class="tr" style="--i:1">AI-powered</span>',
    );
    expect(english).toContain(
      '<span class="tr" style="--i:2"><span class="rot rot--revenue">',
    );
    expect(english).toContain(
      '<span class="tr" style="--i:3">technology</span>',
    );
    expect(chinese).toContain(
      '<span class="tr" style="--i:0">领先的 AI 驱动</span>',
    );
    expect(chinese).toContain('<span class="tr" style="--i:3">技术</span>');
    expect(chinese).toContain('class="rot__word">收入</span>');
  });
});
