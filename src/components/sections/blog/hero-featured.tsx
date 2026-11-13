import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/wordpress";
import { RevampIcon } from "../revamp/icon";
import { CategoryChip } from "./category-chip";
import { BlogDate } from "./blog-date";

/** Image-led editorial opening, using the original WordPress cover. */
export function HeroFeatured({ post }: { post: BlogPost }) {
  return (
    <Link
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
      className="r-editorial-feature"
    >
      <div className="r-editorial-feature__image">
        {post.image ? (
          <Image
            src={post.image.url}
            alt={post.image.alt || post.title}
            fill
            preload
            fetchPriority="high"
            sizes="(max-width: 800px) 92vw, 680px"
          />
        ) : (
          <div className="r-editorial-fallback">
            <RevampIcon name="chat" size="2rem" />
            <span>Cekat Journal</span>
          </div>
        )}
        <CategoryChip category={post.category} />
      </div>
      <div className="r-editorial-feature__copy">
        <BlogDate date={post.date} dateIso={post.dateIso} />
        <h2>{post.title}</h2>
      </div>
    </Link>
  );
}
