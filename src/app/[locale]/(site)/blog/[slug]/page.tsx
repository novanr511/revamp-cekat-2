import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  metaSnippet,
  metaTitle,
  reciprocalLanguages,
  SITE_URL,
} from "@/lib/seo";
import {
  counterpartPostSlug,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/wordpress";
import { buildToc, wordCount } from "@/lib/toc";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleHero } from "@/components/sections/blog/article-hero";
import { RevampMotion } from "@/components/sections/revamp/motion";
import { RevampCloser } from "@/components/sections/revamp/shared";
import { PostBody } from "@/components/sections/blog/post-body";
import { RelatedPosts } from "@/components/sections/blog/related-posts";
import { ShareButtons } from "@/components/sections/blog/share-buttons";
import { ArticleReadingBar } from "@/components/sections/blog/article-reading-bar";
import { TableOfContents } from "@/components/sections/blog/table-of-contents";
import { AuthorCard } from "@/components/sections/blog/author-card";

export const revalidate = 300;
export const dynamicParams = true;

// Rendered on demand (and cached), the free WP host isn't hit at build time.
export function generateStaticParams() {
  return [];
}

function canonicalFor(locale: Locale, slug: string) {
  return `${SITE_URL}${getPathname({ href: { pathname: "/blog/[slug]", params: { slug } }, locale })}`;
}

function ogImage(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  const url = post.seo.ogImage || post.image?.url;
  if (!url)
    return [
      { url: "/graph-image.jpg", width: 1200, height: 630, alt: post.title },
    ];
  return [
    {
      url,
      width: post.image?.width ?? 1200,
      height: post.image?.height ?? 630,
      alt: post.image?.alt || post.title,
    },
  ];
}

/**
 * Sends a request for a slug that does not exist in `locale` somewhere useful,
 * then throws: a published translation redirects to its own slug, an article
 * still awaiting translation falls back to the blog index in that locale, and
 * an unknown slug 404s so we never soft-404 a bad URL into a listing page.
 */
async function redirectToCounterpart(
  slug: string,
  locale: Locale,
): Promise<never> {
  const counterpart = await counterpartPostSlug(slug, locale);
  if (counterpart.kind === "translated") {
    redirect(
      getPathname({
        href: { pathname: "/blog/[slug]", params: { slug: counterpart.slug } },
        locale,
      }),
    );
  }
  if (counterpart.kind === "untranslated") {
    redirect(getPathname({ href: "/blog", locale }));
  }
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const post = await getPostBySlug(slug, locale);

  // Missing in this locale: do NOT inherit the layout's homepage canonical.
  // The page component still runs counterpart redirect / 404; noindex here is
  // belt-and-suspenders if a bot ever inspects the intermediate response.
  if (!post) {
    return { robots: { index: false, follow: false } };
  }

  const title = metaTitle(post.seo.title || post.title);
  const description = metaSnippet(post.seo.description || post.excerpt, 158);
  const canonical = canonicalFor(locale, slug);
  const images = ogImage(post);

  // hreflang demands a reciprocal pair. Each translation has its own slug, so
  // advertising this one under both locales points crawlers at a URL that does
  // not exist. Emit the pair only when the counterpart is actually published.
  // Keys are `en` / `id` (not `id-ID`) so they match the blog sitemap and
  // `alternates()` — mixed codes on one URL are a crawl-budget smell.
  // Paths are RELATIVE: reciprocalLanguages prefixes SITE_URL itself, and
  // passing canonicalFor()'s absolute URL here used to yield
  // `https://cekat.aihttps://cekat.ai/...` (URL-parsed down to `...aihttps//...`).
  const other: Locale = locale === "id" ? "en" : "id";
  const counterpart = await counterpartPostSlug(slug, other);
  const languages =
    counterpart.kind === "translated"
      ? reciprocalLanguages({
          en: getPathname({
            href: {
              pathname: "/blog/[slug]",
              params: { slug: locale === "en" ? slug : counterpart.slug },
            },
            locale: "en",
          }),
          id: getPathname({
            href: {
              pathname: "/blog/[slug]",
              params: { slug: locale === "id" ? slug : counterpart.slug },
            },
            locale: "id",
          }),
        })
      : undefined;

  return {
    title,
    description,
    // Explicit index/follow: layout does not set robots, and a stale override
    // would otherwise be possible after a previous noindex response shape.
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "CekatAI",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "article",
      publishedTime: post.dateIso,
      modifiedTime: post.modifiedIso,
      authors: [post.author.name],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const post = await getPostBySlug(slug, locale);
  // Polylang gives every translation its own slug, so the language switcher
  // (which renders in the layout and cannot see this article) links to the
  // same slug under the other locale. Resolve where that should really land.
  if (!post) return await redirectToCounterpart(slug, locale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tb = await getTranslations({ locale, namespace: "breadcrumb" });
  const ts = await getTranslations({ locale, namespace: "secondary" });
  const related = await getRelatedPosts(post, 3, locale);
  const url = canonicalFor(locale, slug);
  const { html: bodyHtml, toc } = buildToc(post.content);
  const description = metaSnippet(post.seo.description || post.excerpt, 158);

  const homeUrl = `${SITE_URL}${getPathname({ href: "/", locale })}`;
  const blogUrl = `${SITE_URL}${getPathname({ href: "/blog", locale })}`;

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            headline: post.title,
            description,
            url,
            image: post.image,
            authorName: post.author.name,
            authorUrl: post.author.slug
              ? `${SITE_URL}${getPathname({
                  href: {
                    pathname: "/blog/author/[slug]",
                    params: { slug: post.author.slug },
                  },
                  locale,
                })}`
              : undefined,
            datePublished: post.dateIso,
            dateModified: post.modifiedIso,
            section: post.category?.name,
            language: locale === "id" ? "id-ID" : "en",
            keywords: post.tags,
            wordCount: wordCount(post.content),
          }),
          breadcrumbJsonLd([
            { name: tb("home"), url: homeUrl },
            { name: t("heroTitle"), url: blogUrl },
            // Last node: name only (Google's BreadcrumbList examples omit `item`).
            { name: post.title },
          ]),
        ]}
      />

      <ArticleReadingBar title={post.title} backLabel={t("backToBlog")} />

      <RevampMotion className="r-article">
        <ArticleHero
          post={post}
          locale={locale}
          description={description}
          homeLabel={tb("home")}
          blogLabel={t("heroTitle")}
        />

        {/* One reading column, with only the table of contents in the left rail. */}
        <article>
          <div
            className={`r-container r-article-layout${toc.length < 2 ? " r-article-layout--no-toc" : ""}`}
          >
            {toc.length >= 2 && (
              <aside className="r-article-sidebar">
                <TableOfContents items={toc} label={t("onThisPage")} />
              </aside>
            )}
            <div className="r-article-content">
              <PostBody html={bodyHtml} editorial />
              {post.tags.length > 0 && (
                <div className="r-article-tags">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={{ pathname: "/blog", query: { q: tag } }}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
              <div className="r-article-author">
                <AuthorCard
                  author={post.author}
                  label={t("aboutAuthor")}
                  role={t("authorRole")}
                  fallbackBio={t("authorBio")}
                  profileLabel={t("viewAuthorProfile")}
                />
              </div>
              <div className="r-article-share">
                <ShareButtons
                  url={url}
                  title={post.title}
                  shareLabel={t("share")}
                  copyLabel={t("copyLink")}
                  copiedLabel={t("copied")}
                />
              </div>
            </div>
          </div>
        </article>

        <RelatedPosts
          posts={related}
          heading={t("relatedHeading")}
          locale={locale}
        />
        <RevampCloser heading={ts("journalCta")} body={ts("journalCtaBody")} />
      </RevampMotion>
    </>
  );
}
