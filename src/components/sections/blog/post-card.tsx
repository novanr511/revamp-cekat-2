import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/lib/wordpress";
import { formatDate } from "@/lib/format-date";
import { RevampIcon } from "../revamp/icon";
import { CategoryChip } from "./category-chip";
import { BlogDate } from "./blog-date";

export function PostCard({
  post,
  locale,
  listing = false,
}: {
  post: BlogPost;
  locale?: Locale;
  listing?: boolean;
}) {
  if (!listing) {
    return (
      <Link
        href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
        className="r-post-card"
      >
        <div className="r-post-card__image">
          {post.image ? (
            <Image
              src={post.image.url}
              alt={post.image.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="r-editorial-fallback">
              <RevampIcon name="chat" size="2rem" />
              <span>Cekat Journal</span>
            </div>
          )}
        </div>
        <div className="r-post-card__copy">
          <div className="r-post-card__meta">
            {post.category && <span>{post.category.name}</span>}
            <time dateTime={post.dateIso}>
              {formatDate(post.date, locale || "id")}
            </time>
          </div>
          <h3>{post.title}</h3>
          <p className="r-post-card__excerpt">{post.excerpt}</p>
          <div className="r-post-card__foot">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                width={28}
                height={28}
                alt=""
                unoptimized
              />
            )}
            <span>{post.author.name}</span>
            <RevampIcon name="diagonal" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
      className="r-post-card"
    >
      <div className="r-post-card__image">
        {post.image ? (
          <Image
            src={post.image.url}
            alt={post.image.alt || post.title}
            fill
            sizes="(max-width: 600px) 112px, 160px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="r-post-card__copy">
        <CategoryChip category={post.category} small />
        <h3>{post.title}</h3>
        <BlogDate date={post.date} dateIso={post.dateIso} />
      </div>
    </Link>
  );
}
