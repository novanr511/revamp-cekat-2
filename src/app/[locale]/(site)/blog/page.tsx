import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates, SITE_URL } from "@/lib/seo";
import { getCategories, getPosts } from "@/lib/wordpress";
import { blogListingJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { RevampCloser } from "@/components/sections/revamp/shared";
import { HeroFeatured } from "@/components/sections/blog/hero-featured";
import { StoryRail } from "@/components/sections/blog/story-rail";
import { CategoryFilter } from "@/components/sections/blog/category-filter";
import { BlogSearch } from "@/components/sections/blog/blog-search";
import { BlogFeed } from "@/components/sections/blog/blog-feed";

export const revalidate = 300;

const PER_PAGE = 18;
const HIGHLIGHT_SLUGS = [
  "roadmap-eksperimen-marketing-90-hari",
  "postcampaign-review-learning",
  "kontrak-metrik-agency-klien",
  "alasan-penolakan-input-marketing",
];
const FEED_PRIORITY_SLUGS = [
  "ad-fatigue-kapan-ganti-creative",
  "course-marketing-trial-booking-enrollment",
  "hospitality-inquiry-completed-reservations",
  "mall-campaign-engagement-activation",
  "insurance-campaign-ad-chat-promises",
];

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const query = sp.q?.trim();
  const categorySlug = sp.category?.trim();
  const t = await getTranslations({ locale, namespace: "blog" });
  const { canonical, languages } = alternates(locale, "/blog");
  const title = query ? t("searchResults", { query }) : t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    // Filtered views (?q= search AND ?category= archive) are the same posts
    // cards under a canonical to /blog — keeping them out of the index stops
    // two near-duplicate URLs per category competing with the hub. `follow`
    // stays on so the in-page links still get crawled.
    ...(query || categorySlug || Number(sp.page) > 1
      ? { robots: { index: false, follow: true } }
      : {}),
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

export default async function BlogIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const sp = await searchParams;
  const categorySlug = sp.category;
  const query = sp.q?.trim() || undefined;
  const requestedPage = Number(sp.page);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const t = await getTranslations({ locale, namespace: "blog" });
  const tb = await getTranslations({ locale, namespace: "breadcrumb" });
  const ts = await getTranslations({ locale, namespace: "secondary" });
  const categories = await getCategories(locale);
  const activeCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : undefined;
  const { posts, totalPages } = await getPosts({
    page,
    perPage: PER_PAGE,
    categories: activeCategory?.ids,
    lang: locale,
    search: query,
  });

  // The Figma highlight curates published stories; filtered views stay entirely
  // result-driven. The remaining posts retain their editorial date order.
  const showFeatured =
    page === 1 && !categorySlug && !query && posts.length > 0;
  const highlights = showFeatured
    ? HIGHLIGHT_SLUGS.map((slug) => posts.find((post) => post.slug === slug))
        .filter((post): post is (typeof posts)[number] => Boolean(post))
        .concat(posts.filter((post) => !HIGHLIGHT_SLUGS.includes(post.slug)))
        .slice(0, 4)
    : [];
  const featured = highlights[0];
  const supporting = highlights.slice(1);
  const highlightedIds = new Set(highlights.map((post) => post.id));
  const feedPosts = showFeatured
    ? posts.filter((post) => !highlightedIds.has(post.id))
    : posts;
  const gridPosts = showFeatured
    ? [
        ...FEED_PRIORITY_SLUGS.map((slug) =>
          feedPosts.find((post) => post.slug === slug),
        ).filter((post): post is (typeof posts)[number] => Boolean(post)),
        ...feedPosts.filter((post) => !FEED_PRIORITY_SLUGS.includes(post.slug)),
      ]
    : feedPosts;
  const blogUrl = `${SITE_URL}${getPathname({ href: "/blog", locale })}`;

  return (
    <>
      <JsonLd
        data={[
          blogListingJsonLd({
            url: blogUrl,
            name: t("metaTitle"),
            description: t("metaDescription"),
          }),
          breadcrumbJsonLd([
            {
              name: tb("home"),
              url: `${SITE_URL}${getPathname({ href: "/", locale })}`,
            },
            { name: t("heroTitle"), url: blogUrl },
          ]),
        ]}
      />

      <div className="r-page r-journal r-journal-motion" data-r-tone="industry">
        <section className="r-journal-hero">
          <div className="r-container">
            <h1 className="r-journal-title">Cekat.AI Blog</h1>
            {featured && <HeroFeatured post={featured} />}
            {supporting.length > 0 && <StoryRail posts={supporting} />}
          </div>
        </section>

        <section className="r-journal-feed">
          <div className="r-container">
            <div className="r-journal-feed__heading">
              <h2>{query ? t("searchResults", { query }) : t("latest")}</h2>
              <BlogSearch
                key={query || "all"}
                initialQuery={query}
                placeholder={t("searchPlaceholder")}
                label={t("searchLabel")}
                clearLabel={t("searchClear")}
                openLabel={t("searchOpen")}
                closeLabel={t("searchClose")}
              />
            </div>
            <div className="r-journal-filters">
              <CategoryFilter
                categories={categories}
                activeSlug={categorySlug}
                allLabel={t("allCategories")}
              />
            </div>

            {gridPosts.length === 0 ? (
              <p className="mt-16 text-center font-numeric text-base text-muted-foreground">
                {query ? t("searchEmpty", { query }) : t("empty")}
              </p>
            ) : (
              <BlogFeed
                key={`${locale}-${page}-${categorySlug ?? "all"}-${query ?? ""}`}
                initialPosts={gridPosts.map((p) => ({ ...p, content: "" }))}
                initialPage={page}
                totalPages={totalPages}
                categorySlug={categorySlug}
                query={query}
              />
            )}
          </div>
        </section>
        <RevampCloser heading={ts("journalCta")} body={ts("journalCtaBody")} />
      </div>
    </>
  );
}
