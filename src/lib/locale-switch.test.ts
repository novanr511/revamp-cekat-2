import { describe, expect, it } from "vitest";
import { switchLocaleHref } from "./locale-switch";

describe("switchLocaleHref", () => {
  it.each(["en", "jp", "kr", "cn"] as const)(
    "resolves the Indonesian retail slug from a concrete path for %s",
    (locale) => {
      expect(switchLocaleHref("/industries/ritel", undefined, "id", locale)).toEqual({
        pathname: "/industries/[slug]",
        params: { slug: "retail-ecommerce" },
      });
    },
  );
  it.each(["en", "id", "jp", "kr", "cn"] as const)(
    "keeps the case-study detail when switching from cn to %s",
    (locale) => {
      expect(
        switchLocaleHref("/case-studies/[slug]", "holywings", "cn", locale),
      ).toEqual({
        pathname: "/case-studies/[slug]",
        params: { slug: "holywings" },
      });
    },
  );
});
