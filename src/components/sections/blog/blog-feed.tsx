import type { BlogPost } from "@/lib/wordpress";
import { Link } from "@/i18n/navigation";
import { PostCard } from "./post-card";

export function BlogFeed({
  initialPosts,
  initialPage,
  totalPages,
  categorySlug,
  query,
}: {
  initialPosts: BlogPost[];
  initialPage: number;
  totalPages: number;
  categorySlug?: string;
  query?: string;
}) {
  const pageNumbers = Array.from(
    new Set(
      [
        1,
        2,
        3,
        initialPage - 1,
        initialPage,
        initialPage + 1,
        totalPages,
      ].filter((number) => number > 0 && number <= totalPages),
    ),
  ).sort((a, b) => a - b);
  const href = (page: number) => ({
    pathname: "/blog" as const,
    query: {
      ...(page > 1 ? { page } : {}),
      ...(categorySlug ? { category: categorySlug } : {}),
      ...(query ? { q: query } : {}),
    },
  });

  return (
    <div>
      <div className="r-blog-grid">
        {initialPosts.map((post) => (
          <PostCard key={post.id} post={post} listing />
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="r-blog-pagination" aria-label="Blog pages">
          {initialPage > 1 ? (
            <Link href={href(initialPage - 1)} aria-label="Previous page">
              ←
            </Link>
          ) : (
            <span className="r-blog-pagination__disabled" aria-hidden="true">
              ←
            </span>
          )}
          {pageNumbers.map((number, index) => (
            <span key={number} className="r-blog-pagination__item">
              {index > 0 && number - pageNumbers[index - 1] > 1 && (
                <span
                  className="r-blog-pagination__ellipsis"
                  aria-hidden="true"
                >
                  …
                </span>
              )}
              <Link
                href={href(number)}
                aria-label={`Page ${number}`}
                aria-current={number === initialPage ? "page" : undefined}
              >
                {number}
              </Link>
            </span>
          ))}
          {initialPage < totalPages ? (
            <Link href={href(initialPage + 1)} aria-label="Next page">
              →
            </Link>
          ) : (
            <span className="r-blog-pagination__disabled" aria-hidden="true">
              →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
