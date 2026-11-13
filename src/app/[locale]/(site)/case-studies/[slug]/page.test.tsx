import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { CASE_STUDIES, localizeCaseStudy } from "@/lib/case-studies";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/sections/shared/page-hero";
import CaseStudyPage, { generateStaticParams } from "./page";

vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async () => (key: string) => key,
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound: () => {
    throw new Error("not found");
  },
}));

type Props = {
  className?: string;
  children?: ReactNode;
  visual?: ReactNode;
  href?: unknown;
};
function elements(node: ReactNode): ReactElement<Props>[] {
  return Children.toArray(node).flatMap((child) => {
    if (!isValidElement<Props>(child)) return [];
    return [
      child,
      ...elements(child.props.children),
      ...elements(child.props.visual),
    ];
  });
}
function text(node: ReactNode): string {
  return Children.toArray(node)
    .map((child): string => {
      if (typeof child === "string" || typeof child === "number")
        return String(child);
      return isValidElement<Props>(child) ? text(child.props.children) : "";
    })
    .join("");
}

describe("soft case-study detail pages", () => {
  it.each(
    CASE_STUDIES.flatMap((study) =>
      routing.locales.map((locale) => ({ study, locale })),
    ),
  )(
    "$study.slug / $locale keeps all customer evidence inside a detail-only palette",
    async ({ study: source, locale }) => {
      const study = localizeCaseStudy(source, locale);
      const page = await CaseStudyPage({
        params: Promise.resolve({ locale, slug: study.slug }),
      });
      expect(page.props.className).toBe("case-study-soft");
      const tree = elements(page);
      const byClass = (name: string) =>
        tree.filter((node) => node.props.className?.split(" ").includes(name));
      expect(tree.find((node) => node.type === PageHero)?.props).toMatchObject({
        title: study.title,
        subtitle: study.summary,
        split: true,
      });
      const outcomes = byClass("case-study__outcome");
      const results = byClass("case-study__result");
      expect(outcomes).toHaveLength(study.outcomes.length);
      expect(results).toHaveLength(study.outcomes.length);
      study.outcomes.forEach((outcome, index) => {
        expect(text(outcomes[index])).toContain(outcome.value);
        expect(text(outcomes[index])).toContain(outcome.label);
        expect(text(results[index])).toContain(outcome.detail);
      });
      const steps = byClass("case-study__solution-step");
      expect(steps).toHaveLength(study.solutions.steps.length);
      study.solutions.steps.forEach((step, index) => {
        expect(text(steps[index])).toContain(step.title);
        expect(text(steps[index])).toContain(step.body);
      });
      expect(text(byClass("case-study__challenge-quote")[0])).toContain(
        study.challenge.quote,
      );
      expect(text(byClass("case-study__results-quote")[0])).toContain(
        study.results.quote,
      );
      expect(byClass("case-study__cta")).toHaveLength(1);
      expect(tree.some((node) => node.props.href === "/contact-sales")).toBe(
        true,
      );
    },
  );

  it("keeps all seven detail routes", () => {
    expect(generateStaticParams()).toEqual(
      CASE_STUDIES.map((study) => ({ slug: study.slug })),
    );
  });

  it("preserves not-found behavior", async () => {
    await expect(
      CaseStudyPage({
        params: Promise.resolve({ locale: "id", slug: "unknown" }),
      }),
    ).rejects.toThrow("not found");
  });

  it("adds only cosmetic declarations scoped to detail pages", () => {
    const style = document.createElement("style");
    style.textContent = readFileSync(
      "src/components/sections/shared/case-study-soft.css",
      "utf8",
    );
    document.head.append(style);
    try {
      const rules = [...style.sheet!.cssRules] as CSSStyleRule[];
      expect(rules.length).toBeGreaterThan(10);
      for (const rule of rules) {
        for (const selector of rule.selectorText.split(",")) {
          expect(selector.trim()).toMatch(
            /^\.cekat-page\s+\.case-study-soft(?:[\s.[#:]|$)/,
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
});
