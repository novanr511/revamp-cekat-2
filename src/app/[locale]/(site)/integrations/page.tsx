import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Icon } from "@iconify/react/offline";
import type { Locale } from "@/i18n/routing";
import { alternates, metaSnippet, metaTitle } from "@/lib/seo";
import { INTEGRATION_GROUPS } from "@/lib/integrations";
import { localeValue } from "@/lib/locale-value";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ProductStage } from "@/components/sections/landing/product-stage";
import { ArrowDown, Plus } from "lucide-react";
import { LandingCta } from "@/components/sections/landing/landing-cta";
import { SecondaryHubSurface } from "@/components/sections/shared/secondary-hub-surface";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "integrations" });
  const { canonical, languages } = alternates(locale, "/integrations");
  const title = metaTitle(t("metaTitle"));
  const description = metaSnippet(t("metaDescription"), 158);

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "CekatAI",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [
        { url: "/graph-image.jpg", width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/graph-image.jpg"],
    },
  };
}

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "integrations" });

  return (
    <SecondaryHubSurface hub="integrations">
      <PageHero
        split
        eyebrow={t("badge")}
        title={t("heading")}
        subtitle={t("subtitle")}
        visual={
          <ProductStage
            image="/images/chat/connect-channels.png"
            imageAlt={t("heading")}
            label={t("badge")}
          />
        }
      >
        <a
          href="#catalog"
          className="inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 font-semibold text-white hover:bg-[#0d439f]"
        >
          {t("browse")} <ArrowDown size={18} aria-hidden />
        </a>
      </PageHero>

      <Container className="grid items-start gap-8 py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <nav
          id="catalog"
          aria-labelledby="catalog-title"
          className="scroll-mt-24 rounded-2xl border border-border bg-surface-muted p-5 lg:sticky lg:top-24"
        >
          <h2
            id="catalog-title"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            {t("catalog")}
          </h2>
          {INTEGRATION_GROUPS.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="flex min-h-12 items-center justify-between gap-3 border-t border-border py-2 text-sm font-medium text-foreground hover:text-primary hover:underline"
            >
              {localeValue(group.title, locale)}
              <span className="rounded-full bg-white px-2.5 py-1 text-xs tabular-nums text-primary">
                {group.items.length}
              </span>
            </a>
          ))}
        </nav>
        <div className="grid min-w-0 gap-10 lg:gap-14">
          {INTEGRATION_GROUPS.map((group, index) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="scroll-mt-24"
            >
              <div>
                <h2
                  id={`${group.id}-title`}
                  className="flex items-baseline gap-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-semibold tracking-tight text-foreground"
                >
                  <span
                    aria-hidden
                    className="text-sm tabular-nums tracking-normal text-primary"
                  >
                    0{index + 1}
                  </span>
                  {localeValue(group.title, locale)}
                </h2>
                <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
                  {localeValue(group.body, locale)}
                </p>
              </div>

              <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 bg-white p-4 sm:odd:last:col-span-2 sm:p-5"
                  >
                    {/* Vendor logos ignore this tint, our own glyphs inherit
                      it; see the icon field on Integration. Height plus
                      w-auto because the brand marks are not all square. */}
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary ring-1 ring-border">
                      <Icon
                        // Seed Iconify's gradient IDs identically on the server and client.
                        id={`integration-icon-${item.id}`}
                        icon={item.icon}
                        className="h-5 w-auto"
                        aria-hidden
                      />
                    </span>
                    <div>
                      <h3 className="font-numeric text-base font-semibold text-foreground">
                        {localeValue(item.name, locale)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {localeValue(item.note, locale)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <details className="group rounded-2xl bg-surface-muted px-5">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 font-semibold text-foreground">
              {t("missingHeading")}
              <Plus
                size={18}
                aria-hidden
                className="shrink-0 group-open:rotate-45"
              />
            </summary>
            <p className="max-w-[65ch] pb-5 text-base leading-relaxed text-muted-foreground">
              {t("missingBody")}
            </p>
          </details>
        </div>
      </Container>

      <LandingCta heading={t("ctaHeading")} body={t("ctaBody")} />
    </SecondaryHubSurface>
  );
}
