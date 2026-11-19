import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates, metaSnippet, metaTitle, SITE_URL } from "@/lib/seo";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { StoryInterviewCard } from "@/components/sections/shared/story-interview-card";
import { STORIES, VIDEO_TESTIMONIALS, storyCopyFor } from "@/lib/stories";
import { storyIndexCopyFor } from "@/lib/story-index-copy";

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
  const trusted = await getTranslations({
    locale,
    namespace: "home.trustedBy",
  });
  const indexCopy = storyIndexCopyFor(locale);
  const companies = {
    moir: "Moir Salon",
    rumahZakat: "Rumah Zakat",
    mnp: "Multimedia Nusantara Polytechnic",
    vio: "VIO Optical Clinic",
    dokterhub: "DokterHub",
    threeland: "Threeland Property",
  };
  const [featured, ...interviews] = VIDEO_TESTIMONIALS;
  const interviewProps = (
    testimonial: (typeof VIDEO_TESTIMONIALS)[number],
  ) => ({
    videoId: testimonial.videoId,
    image: testimonial.image,
    company: companies[testimonial.key],
    name: t(`videos.${testimonial.key}.name`),
    role: t(`videos.${testimonial.key}.role`),
    watchLabel: copy.videoLabel,
    closeLabel: indexCopy.close,
    fallbackLabel: indexCopy.fallback,
    loadingLabel: indexCopy.loading,
    headline: indexCopy.headlines[testimonial.key],
  });

  return (
    <div className="story-editorial">
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

      <section className="story-editorial__intro">
        <Container>
          <h1>
            {indexCopy.heading} <span>Cekat.AI.</span>
          </h1>
          <p>{indexCopy.lead}</p>
        </Container>
      </section>
      <section
        className="story-editorial__collection"
        aria-labelledby="featured-interview"
      >
        <Container>
          <h2 id="featured-interview">{indexCopy.featured}</h2>
          <StoryInterviewCard
            {...interviewProps(featured)}
            featured
            headline={trusted("quote")}
          />
          <div className="story-editorial__more">
            <h2>{indexCopy.all}</h2>
            <div className="story-editorial__grid">
              {interviews.map((testimonial) => (
                <StoryInterviewCard
                  key={testimonial.videoId}
                  {...interviewProps(testimonial)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
