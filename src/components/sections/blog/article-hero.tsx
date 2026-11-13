import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/lib/wordpress";
import { formatDate } from "@/lib/format-date";
import { wordCount } from "@/lib/toc";
import { useTranslations } from "next-intl";

export function ArticleHero({
  post,
  locale,
  description,
  homeLabel,
  blogLabel,
}: {
  post: BlogPost;
  locale: Locale;
  description: string;
  homeLabel: string;
  blogLabel: string;
}) {
  const t = useTranslations("secondary");
  const showUpdated = post.modifiedIso !== post.dateIso;
  const readingMinutes = Math.max(1, Math.ceil(wordCount(post.content) / 220));
  const aspect =
    post.image?.width && post.image.height
      ? `${post.image.width} / ${post.image.height}`
      : "16 / 9";
  return (
    <section className="r-article-hero">
      <div className="r-container">
        <nav className="r-breadcrumb" aria-label={t("breadcrumb")}>
          <Link href="/">{homeLabel}</Link>
          <span aria-hidden>/</span>
          <Link href="/blog">{blogLabel}</Link>
          {post.category && (
            <>
              <span aria-hidden>/</span>
              <Link
                href={{
                  pathname: "/blog",
                  query: { category: post.category.slug },
                }}
              >
                {post.category.name}
              </Link>
            </>
          )}
        </nav>
        <div
          className={`r-article-hero__layout ${!post.image ? "r-article-hero__layout--text" : ""}`}
        >
          <div className="r-article-hero__copy">
            <p className="r-kicker">
              {post.category?.name || "Cekat Journal"}
              <span aria-hidden>·</span>
              {t("readingTime", { minutes: readingMinutes })}
            </p>
            <h1>{post.title}</h1>
            {description && <p className="r-lede">{description}</p>}
            <div className="r-article-byline">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt=""
                  width={44}
                  height={44}
                  unoptimized
                />
              )}
              <div>
                {post.author.slug ? (
                  <Link
                    href={{
                      pathname: "/blog/author/[slug]",
                      params: { slug: post.author.slug },
                    }}
                  >
                    {post.author.name}
                  </Link>
                ) : (
                  <strong>{post.author.name}</strong>
                )}
                <p>
                  <time dateTime={post.dateIso}>
                    {formatDate(post.date, locale)}
                  </time>
                  {showUpdated && (
                    <>
                      <span aria-hidden> · </span>
                      {t("updated")}{" "}
                      <time dateTime={post.modifiedIso}>
                        {formatDate(post.modified, locale)}
                      </time>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          {post.image && (
            <div className="r-article-cover" style={{ aspectRatio: aspect }}>
              <Image
                src={post.image.url}
                alt={post.image.alt || post.title}
                fill
                preload
                fetchPriority="high"
                sizes="(max-width: 800px) 92vw, (max-width: 1200px) 85vw, 960px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
