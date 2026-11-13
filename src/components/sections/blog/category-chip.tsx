import type { BlogPost } from "@/lib/wordpress";

export function CategoryChip({
  category,
  small = false,
}: {
  category?: BlogPost["category"];
  small?: boolean;
}) {
  if (!category) return null;
  const slug = category.slug.toLowerCase();
  const tone = /marketing/.test(slug)
    ? "orange"
    : /chat|whatsapp|omnichannel|customer|ticket/.test(slug)
      ? "cyan"
      : /crm|sales|automation/.test(slug)
        ? "blue"
        : "neutral";

  return (
    <span
      className={`r-blog-chip r-blog-chip--${tone}${small ? " r-blog-chip--small" : ""}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M3 10v4h4l9 5V5l-9 5H3Zm4 4v4m12-9a5 5 0 0 1 0 6" />
      </svg>
      {category.name}
    </span>
  );
}
