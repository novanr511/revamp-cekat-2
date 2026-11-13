import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/wordpress";
import { CategoryChip } from "./category-chip";
import { BlogDate } from "./blog-date";

/** Supporting stories are lighter than the editorial lead, not duplicate cards. */
export function StoryRail({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="r-story-rail">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
          className="r-story-rail__story"
        >
          <div className="r-story-rail__image">
            {post.image ? (
              <Image
                src={post.image.url}
                alt={post.image.alt || post.title}
                fill
                sizes="(max-width: 700px) 100vw, 384px"
                className="object-cover"
              />
            ) : null}
            <CategoryChip category={post.category} />
          </div>
          <div>
            <BlogDate date={post.date} dateIso={post.dateIso} />
            <h3>{post.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
