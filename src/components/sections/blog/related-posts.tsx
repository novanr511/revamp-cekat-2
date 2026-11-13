import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/lib/wordpress";
import { Link } from "@/i18n/navigation";
import { RevampIcon } from "../revamp/icon";
import { useTranslations } from "next-intl";
import { PostCard } from "./post-card";

export function RelatedPosts({
  posts,
  heading,
  locale,
}: {
  posts: BlogPost[];
  heading: string;
  locale: Locale;
}) {
  const t = useTranslations("secondary");
  if (posts.length === 0) return null;

  return (
    <section className="r-related-posts r-section">
      <div className="r-container">
        <div className="r-section-heading r-section-heading--row">
          <div>
            <p className="r-kicker">Cekat Journal</p>
            <h2>{heading}</h2>
          </div>
          <Link href="/blog" className="r-text-link">
            {t("allStories")}
            <RevampIcon name="diagonal" />
          </Link>
        </div>
        <div className="r-blog-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
