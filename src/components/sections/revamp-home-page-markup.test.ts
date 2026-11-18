import { describe, expect, it } from "vitest";
import { revampHomePageMarkupForLocale } from "./revamp-home-page-markup";

describe("homepage markup for the shared site chrome", () => {
  it.each([
    ["en", "Customer journey", "Select a stage to see how Cekat helps."],
    ["id", "Perjalanan pelanggan", "Pilih tahap untuk melihat peran Cekat."],
    ["cn", "客户旅程", "选择一个阶段，了解 Cekat 如何提供帮助。"],
    [
      "jp",
      "カスタマージャーニー",
      "各段階でのCekatの役割を見るには、タブを選択してください。",
    ],
    ["kr", "고객 여정", "단계를 선택해 Cekat의 역할을 확인하세요."],
  ] as const)(
    "makes journey navigation discoverable and accessible in %s",
    (locale, title, hint) => {
      const markup = revampHomePageMarkupForLocale(locale);
      const container = document.createElement("div");
      container.innerHTML = markup;
      const navigation = container.querySelector(".journey__nav")!;
      const tabs = [...navigation.querySelectorAll('[role="tab"]')];
      const panels = [
        ...container.querySelectorAll('#journey [role="tabpanel"]'),
      ];
      const initialDock = container.querySelector(
        "#panel-acquire .feat__stage > .products",
      );

      expect(navigation.getAttribute("aria-label")).toBe(title);
      expect(navigation.querySelector(".journey__nav-hint")?.textContent).toBe(
        hint,
      );
      expect(
        navigation.querySelector(".rail")?.getAttribute("aria-describedby"),
      ).toBe("journey-nav-hint");
      expect(tabs).toHaveLength(5);
      expect(panels).toHaveLength(5);
      expect(initialDock).not.toBeNull();
      expect(
        initialDock?.nextElementSibling?.classList.contains("feat__frame"),
      ).toBe(true);
      expect(
        initialDock?.querySelectorAll(".product[data-floating-slot]"),
      ).toHaveLength(2);
      expect(
        container.querySelector("#journey > .wrap > .products"),
      ).toBeNull();
      tabs.forEach((tab, index) => {
        expect(tab.tagName).toBe("BUTTON");
        expect(tab.getAttribute("type")).toBe("button");
        expect(tab.hasAttribute("disabled")).toBe(false);
        expect(tab.querySelector(".rail__dot")?.textContent).toBe(
          String(index + 1).padStart(2, "0"),
        );
        expect(
          tab.querySelector(".rail__dot")?.getAttribute("aria-hidden"),
        ).toBe("true");
        expect(
          tab.querySelector(".rail__description")?.textContent,
        ).toBeTruthy();
        expect(
          container
            .querySelector(`#${tab.getAttribute("aria-controls")}`)
            ?.getAttribute("aria-labelledby"),
        ).toBe(tab.id);
      });
      expect(
        panels.every((panel) => panel.getAttribute("tabindex") === "0"),
      ).toBe(true);
      expect(container.querySelectorAll("#journey .feat__item")).toHaveLength(
        30,
      );
      expect(container.querySelectorAll("#journey .product")).toHaveLength(6);
    },
  );

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
      '<span class="tr" style="--i:0">领先的 AI 技术，</span><span class="tr" style="--i:1"><span class="rot rot--revenue" data-words=',
    );
    expect(chinese).toContain('class="rot__word">助力营收增长</span>');
    expect(chinese).not.toContain('<span class="tr" style="--i:3">');
  });
});
