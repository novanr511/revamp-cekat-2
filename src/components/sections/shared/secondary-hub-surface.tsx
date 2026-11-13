import type { ReactNode } from "react";

type SecondaryHub = "features" | "integrations" | "stories";

/** Scope the soft color refresh to the three requested directory pages. */
export function SecondaryHubSurface({
  hub,
  children,
}: {
  hub: SecondaryHub;
  children: ReactNode;
}) {
  return (
    <div className="secondary-hub-soft" data-hub={hub}>
      {children}
    </div>
  );
}
