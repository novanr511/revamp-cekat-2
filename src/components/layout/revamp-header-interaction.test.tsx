import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { localizeRevampHeaderMarkup, RevampHeader } from "./revamp-header";
import { revampHeaderMarkup } from "./revamp-header-markup";

const { pathnameMock } = vi.hoisted(() => ({
  pathnameMock: vi.fn(() => "/industries/healthcare"),
}));

vi.mock("next-intl", () => ({ useLocale: () => "en" }));
vi.mock("next/navigation", () => ({
  useParams: () => ({ slug: "healthcare" }),
}));
vi.mock("@/i18n/navigation", () => ({
  usePathname: pathnameMock,
  getPathname: ({ locale }: { locale: string }) => `/${locale}`,
}));

describe("secondary page product previews", () => {
  it("localizes visible Japanese industry-menu labels", () => {
    const markup = localizeRevampHeaderMarkup(
      "<p>By industry</p><a>Retail &amp; F&amp;B</a><a>Travel &amp; Hospitality</a>",
      "jp",
    );
    expect(markup).toContain("業界別");
    expect(markup).toContain("小売・飲食");
    expect(markup).toContain("旅行・ホスピタリティ");
  });

  it.each([
    ["id", "/studi-kasus", "Studi Kasus"],
    ["en", "/en/studi-kasus", "Case studies"],
    ["cn", "/cn/case-studies", "案例研究"],
    ["jp", "/jp/case-studies", "導入事例一覧"],
    ["kr", "/kr/case-studies", "사례 연구"],
  ] as const)(
    "links to case studies from Resources in %s",
    (locale, href, label) => {
      const markup = localizeRevampHeaderMarkup(revampHeaderMarkup, locale);
      expect(markup).toContain(`href="${href}">${label}</a>`);
    },
  );

  it("switches the highlighted product and preview on hover and keyboard focus", () => {
    const { container, unmount } = render(<RevampHeader />);
    const menu = container.querySelector<HTMLElement>("#mm-products")!;
    const products = [
      "marketing",
      "chat",
      "crm",
      "broadcasts",
      "automation",
      "analytics",
    ];

    const assertSelected = (key: string) => {
      expect(
        [...menu.querySelectorAll<HTMLElement>(".mitem.is-on")].map(
          (el) => el.dataset.prev,
        ),
      ).toEqual([key]);
      expect(
        [...menu.querySelectorAll<HTMLElement>(".mp.is-on")].map(
          (el) => el.dataset.prev,
        ),
      ).toEqual([key]);
    };

    assertSelected("marketing");
    for (const key of products) {
      fireEvent.mouseEnter(menu.querySelector(`.mitem[data-prev="${key}"]`)!);
      assertSelected(key);
    }
    fireEvent.focus(menu.querySelector('.mitem[data-prev="chat"]')!);
    assertSelected("chat");
    unmount();
  });

  it("uses the same compact mobile header on secondary pages, including stories", () => {
    pathnameMock.mockReturnValue("/industries/healthcare");
    const secondary = render(<RevampHeader />);
    expect(secondary.container.querySelector(".nav")).toHaveClass(
      "nav--mobile-compact",
    );
    secondary.unmount();

    pathnameMock.mockReturnValue("/");
    const homepage = render(<RevampHeader />);
    expect(homepage.container.querySelector(".nav")).not.toHaveClass(
      "nav--mobile-compact",
    );
    expect(homepage.container.querySelector(".nav")).toHaveClass(
      "nav--homepage",
    );
    expect(homepage.container.querySelector(".skip")).toHaveAttribute(
      "href",
      "#main",
    );
    expect(homepage.container.querySelector(".nav")?.innerHTML).toContain(
      'href="/en/blog"',
    );
    expect(homepage.container.querySelector(".nav")?.innerHTML).toContain(
      'href="/en/contact-us">Talk to sales</a>',
    );
    homepage.unmount();

    pathnameMock.mockReturnValue("/stories");
    const stories = render(<RevampHeader />);
    expect(stories.container.querySelector(".nav")).toHaveClass(
      "nav--mobile-compact",
    );
    expect(stories.container.querySelector(".nav__cta-label")).toHaveAttribute(
      "data-mobile-label",
      "Free trial",
    );
    stories.unmount();

    pathnameMock.mockReturnValue("/industries/healthcare");
  });
});
