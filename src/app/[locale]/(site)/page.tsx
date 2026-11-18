import Script from "next/script";
import { setRequestLocale } from "next-intl/server";
import { revampHomePageMarkupForLocale } from "@/components/sections/revamp-home-page-markup";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <div
        className="reference-home"
        data-locale={locale}
        dangerouslySetInnerHTML={{
          __html: revampHomePageMarkupForLocale(locale),
        }}
      />
      <Script
        src="/revamp-web-cekat/main.js?v=47"
        strategy="afterInteractive"
      />
    </>
  );
}
