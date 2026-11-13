import type { ReactNode } from "react";

type Product =
  | "marketing"
  | "chat"
  | "crm"
  | "broadcast"
  | "otomatisasi"
  | "analitik"
  | "order";

/** Palette boundary only: shared sections retain their composition and behavior.
 * Order deliberately bypasses the six-product color refresh.
 */
export function ProductSurface({
  product,
  children,
}: {
  product: Product;
  children: ReactNode;
}) {
  if (product === "order") return <>{children}</>;
  return (
    <div className="product-soft" data-product={product}>
      {children}
    </div>
  );
}
