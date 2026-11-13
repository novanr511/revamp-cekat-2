import { describe, expect, it, vi } from "vitest";
import { Children, isValidElement, type ReactNode } from "react";
import { ProductLanding } from "./product-landing";
import { LandingHero } from "./landing-hero";
import { BenefitAccordion } from "./benefit-accordion";
import { AlternatingStory } from "./alternating-story";
import { RichFaq } from "./rich-faq";
import { LandingCta } from "./landing-cta";
import { LandingTestimonial } from "./landing-testimonial";
import { PRODUCT_ART } from "./product-stage";
import { ProductSurface } from "./product-surface";

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

describe("product landing capability layouts", () => {
  it.each(["marketing", "chat", "crm", "order"] as const)(
    "uses the scoped capability layout for /%s",
    async (namespace) => {
      const tree = elements(
        await ProductLanding({
          locale: "id",
          namespace,
          badge: namespace,
          steps: [{ key: "step1", image: "/existing-feature.png" }],
        }),
      ).filter(isValidElement);
      const hero = tree.find((element) => element.type === LandingHero);
      expect(hero?.props).toMatchObject({
        badge: namespace,
        productImage: PRODUCT_ART[namespace],
        tone: namespace,
      });
      const types = tree.map((element) => element.type);
      expect(
        tree.find((element) => element.type === ProductSurface)?.props,
      ).toMatchObject({ product: namespace });
      expect(types).toContain(
        namespace === "order" ? BenefitAccordion : AlternatingStory,
      );
      expect(types).not.toContain(
        namespace === "order" ? AlternatingStory : BenefitAccordion,
      );
      expect(types).toContain(RichFaq);
      expect(types).toContain(LandingCta);
      expect(types).not.toContain(LandingTestimonial);
    },
  );

  it("preserves existing customer proof when supplied by a product page", async () => {
    const tree = elements(
      await ProductLanding({
        locale: "id",
        namespace: "chat",
        badge: "Chat",
        steps: [],
        testimonial: { image: "/existing-customer.png" },
      }),
    ).filter(isValidElement);
    expect(
      tree.find((element) => element.type === LandingTestimonial)?.props,
    ).toMatchObject({ testimonial: { image: "/existing-customer.png" } });
  });
});
