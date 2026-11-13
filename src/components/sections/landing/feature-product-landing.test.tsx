import { Children, isValidElement, type ReactNode } from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { routing } from "@/i18n/routing";
import { loadLandingContent } from "@/lib/registry/content";
import { getEntryById } from "@/lib/registry";
import {
  FEATURE_PRODUCTS,
  FeatureProductLanding,
  featureProductMetadata,
  featureProductStaticParams,
  type FeatureProduct,
} from "./feature-product-landing";
import { LandingHero } from "./landing-hero";
import { DefinitionBlock } from "./definition-block";
import { BenefitAccordion } from "./benefit-accordion";
import { AlternatingStory } from "./alternating-story";
import { RichFaq } from "./rich-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductSurface } from "./product-surface";

vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: vi.fn(async () => (key: string) => key),
}));

function elements(node: ReactNode): ReturnType<typeof Children.toArray> {
  return Children.toArray(node).flatMap((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return [];
    return [child, ...elements(child.props.children)];
  });
}

const products = Object.keys(FEATURE_PRODUCTS) as FeatureProduct[];

describe("standalone capability product pages", () => {
  it("generates every supported locale", () => {
    expect(featureProductStaticParams()).toEqual(
      routing.locales.map((locale) => ({ locale })),
    );
  });

  it.each(
    products.flatMap((product) =>
      routing.locales.map((locale) => ({ product, locale })),
    ),
  )(
    "renders $product in $locale using existing capability content and assets",
    async ({ product, locale }) => {
      const config = FEATURE_PRODUCTS[product];
      const content = await loadLandingContent(
        "features",
        config.source,
        locale,
      );
      const tree = elements(
        await FeatureProductLanding({
          product,
          params: Promise.resolve({ locale }),
        }),
      ).filter(isValidElement);
      expect(
        tree.find((element) => element.type === ProductSurface)?.props,
      ).toMatchObject({ product });
      expect(
        tree.find((element) => element.type === LandingHero)?.props,
      ).toMatchObject({
        title: config.copy[locale].title,
        productImage: content.benefits[config.heroIndex].image,
        staticVisual: true,
      });
      expect(
        tree.find((element) => element.type === DefinitionBlock)?.props,
      ).not.toHaveProperty("stats");
      expect(
        tree.find((element) => element.type === AlternatingStory)?.props,
      ).toMatchObject({ benefits: content.benefits });
      expect(tree.some((element) => element.type === BenefitAccordion)).toBe(
        false,
      );
      expect(
        tree.find((element) => element.type === RichFaq)?.props,
      ).toMatchObject({ items: content.faq });
      for (const benefit of content.benefits) {
        if (benefit.image)
          expect(
            existsSync(path.join(process.cwd(), "public", benefit.image)),
          ).toBe(true);
      }
      for (const id of config.related) {
        expect(getEntryById("features", id)?.slugs[locale]).toBeTruthy();
      }
      const schema = tree.find((element) => element.type === JsonLd)?.props as {
        data: { url?: string }[];
      };
      expect(schema.data[0].url).toBe(
        `https://cekat.ai${locale === "id" ? "" : `/${locale}`}/${product}`,
      );
    },
  );

  it.each(products)(
    "sets /%s metadata to its own URL rather than a feature alias",
    async (product) => {
      const metadata = await featureProductMetadata(
        product,
        Promise.resolve({ locale: "id" }),
      );
      expect(metadata.alternates?.canonical).toBe(
        `https://cekat.ai/${product}`,
      );
      expect(metadata.alternates?.languages?.en).toBe(
        `https://cekat.ai/en/${product}`,
      );
      expect(metadata.title).toContain(FEATURE_PRODUCTS[product].copy.id.label);
      expect(metadata.description).not.toContain("3.000+");
    },
  );
});
