import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { routing } from "@/i18n/routing";
import SiteLayout from "./layout";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
  getMessages: async ({ locale }: { locale: string }) =>
    JSON.parse(
      readFileSync(join(process.cwd(), "messages", `${locale}.json`), "utf8"),
    ),
}));
vi.mock("@/components/layout/site-chrome", () => ({ SiteChrome: () => null }));

describe("site client translations", () => {
  it.each(routing.locales)(
    "delivers secondary-page labels in %s without shipping server-only catalogs",
    async (locale) => {
      const layout = await SiteLayout({
        children: null,
        params: Promise.resolve({ locale }),
      });
      const messages = layout.props.messages;
      expect(messages.secondary.trial).toBeTruthy();
      expect(messages.secondary.preview.sample).toBeTruthy();
      expect(messages.secondary.preview.days).toContain("{days}");
      expect(messages.nav).toBeDefined();
      expect(messages.landing).toBeUndefined();
      expect(messages.seo).toBeUndefined();
    },
  );
});
