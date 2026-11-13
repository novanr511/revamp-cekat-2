import { Children, isValidElement, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { LandingPage } from "./landing-page";
import { LandingHero } from "./landing-hero";
import { Breadcrumbs } from "./breadcrumbs";
import { DefinitionBlock } from "./definition-block";
import { AlternatingStory } from "./alternating-story";
import { BenefitAccordion } from "./benefit-accordion";
import { FeatureTabs } from "./feature-tabs";
import { Pillars } from "./pillars";
import { LandingTestimonial } from "./landing-testimonial";
import { RichFaq } from "./rich-faq";
import { RelatedLinks } from "./related-links";
import { LandingCta } from "./landing-cta";
import { LogoMarquee } from "@/components/sections/shared/logo-marquee";

vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("@/i18n/navigation", () => ({
  getPathname: ({ href }: { href: string }) => href,
  Link: "a",
}));

function elements(node: ReactNode): ReturnType<typeof Children.toArray> {
  return Children.toArray(node).flatMap((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return [];
    return [child, ...elements(child.props.children)];
  });
}

describe("feature detail layout", () => {
  it("uses the long use-case sequence for feature details", async () => {
    const tree = elements(
      await LandingPage({
        kind: "features",
        params: Promise.resolve({ locale: "id", slug: "auto-reply-whatsapp" }),
      }),
    ).filter(isValidElement);
    const types = tree.map((element) => element.type);
    const layout = tree.find(
      (element) =>
        (element.props as Record<string, unknown>)["data-layout"] ===
        "long-with-use-cases",
    );

    expect(layout).toBeDefined();
    expect(types).toContain(LogoMarquee);
    expect(types).toContain(AlternatingStory);
    expect(types).toContain(FeatureTabs);
    expect(types).toContain(Pillars);
    expect(types).toContain(LandingTestimonial);
    expect(types).toContain(RichFaq);
    expect(types).toContain(RelatedLinks);
    expect(types).toContain(LandingCta);
    expect(types).not.toContain(BenefitAccordion);

    const sequence = [
      LandingHero,
      Breadcrumbs,
      LogoMarquee,
      DefinitionBlock,
      AlternatingStory,
      FeatureTabs,
      Pillars,
      LandingTestimonial,
      RichFaq,
      RelatedLinks,
      LandingCta,
    ];
    const positions = sequence.map((type) => types.indexOf(type));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("keeps solution pages on their existing accordion composition", async () => {
    const tree = elements(
      await LandingPage({
        kind: "solutions",
        params: Promise.resolve({ locale: "id", slug: "sales" }),
      }),
    ).filter(isValidElement);
    const types = tree.map((element) => element.type);

    expect(types).toContain(BenefitAccordion);
    expect(types).not.toContain(AlternatingStory);
    expect(
      tree.some(
        (element) =>
          (element.props as Record<string, unknown>)["data-layout"] ===
          "long-with-use-cases",
      ),
    ).toBe(false);
  });
});
