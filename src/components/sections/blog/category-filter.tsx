import { Link } from "@/i18n/navigation";
import type { BlogCategory } from "@/lib/wordpress";

export function CategoryFilter({
  categories,
  activeSlug,
  allLabel,
}: {
  categories: BlogCategory[];
  activeSlug?: string;
  allLabel: string;
}) {
  if (categories.length === 0) return null;

  return (
    <div className="r-blog-categories">
      <Link href="/blog" aria-current={!activeSlug ? "page" : undefined}>
        {allLabel}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={{ pathname: "/blog", query: { category: cat.slug } }}
          aria-current={activeSlug === cat.slug ? "page" : undefined}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
