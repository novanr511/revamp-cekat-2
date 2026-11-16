import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates, metaSnippet, metaTitle, SITE_URL } from "@/lib/seo";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/sections/new-home/reveal";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SecondaryHubSurface } from "@/components/sections/shared/secondary-hub-surface";
import { TestimonialVideoCard } from "@/components/sections/shared/testimonial-video-card";
import { STORIES, VIDEO_TESTIMONIALS, storyCopyFor } from "@/lib/stories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "home.testimonials" });
  const copy = storyCopyFor(locale);

  const title = metaTitle(
    `${copy.indexHeading} — ${copy.metaTitleSuffix} Cekat.AI`,
  );
  const description = metaSnippet(t("body"), 158);
  const { canonical, languages } = alternates(locale, "/stories");

  return {
    title,
    description,
    robots: { index: true, follow: true },
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

export default async function StoriesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home.testimonials" });
  const tb = await getTranslations({ locale, namespace: "breadcrumb" });
  const copy = storyCopyFor(locale);
  const url = `${SITE_URL}${getPathname({ href: "/stories", locale })}`;
  const homeUrl = `${SITE_URL}${getPathname({ href: "/", locale })}`;

  return (
    <SecondaryHubSurface hub="stories">
      <JsonLd
        data={[
          collectionPageJsonLd({
            url,
            name: `${copy.eyebrow} — Cekat.AI`,
            description: copy.indexLead,
            items: STORIES.map((story) => ({
              name: t(`${story.key}.company`),
              url: `${SITE_URL}${getPathname({
                href: {
                  pathname: "/stories/[slug]",
                  params: { slug: story.slug },
                },
                locale,
              })}`,
            })),
          }),
          breadcrumbJsonLd([
            { name: tb("home"), url: homeUrl },
            { name: copy.eyebrow },
          ]),
        ]}
      />

      <PageHero
        tone="stories"
        eyebrow={copy.eyebrow}
        title={copy.indexHeading}
        subtitle={copy.indexLead}
        align="left"
        className="editorial-index"
      />

      <section className="story-index-grid relative overflow-hidden bg-[#f9fafb] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VIDEO_TESTIMONIALS.map((testimonial, index) => (
              <Reveal
                key={testimonial.videoId}
                delay={index * 60}
                className="h-full"
              >
                <TestimonialVideoCard
                  videoId={testimonial.videoId}
                  name={t(`videos.${testimonial.key}.name`)}
                  role={t(`videos.${testimonial.key}.role`)}
                  imageSrc={testimonial.image}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </SecondaryHubSurface>
  );
}
