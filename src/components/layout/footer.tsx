"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { REGISTRY } from "@/lib/registry";
import { localeValue } from "@/lib/locale-value";
import { Icon } from "@iconify/react/offline";
import {
  mdiInstagram,
  mdiLinkedin,
  mdiYoutube,
  mdiFacebook,
} from "@/lib/icons";
import { Container } from "./container";
import { LogoBlack } from "./logo";
import { AppStoreBadge, MetaLogo, PlayStoreBadge } from "./store-badges";
import { cn } from "@/lib/utils";

const PRODUCT_LINKS = [
  { key: "chat", href: "/chat" },
  { key: "crm", href: "/crm" },
  { key: "marketing", href: "/marketing" },
  { key: "order", href: "/order" },
  { key: "events", href: "/events" },
  { key: "harga", href: "/pricing" },
  // Contact was an orphan (zero internal links sitewide) and integrations had
  // no footer entry — both are money-page paths crawlers should reach.
  { key: "contact", href: "/contact" },
  { key: "integrations", href: "/integrations" },
  // About was likewise an orphan risk — company pages need a steady internal path.
  { key: "about", href: "/about" },
] as const;

// Legal pages are served on this site (localized), mirroring the cekat.ai copy.
const LEGAL_LINKS = [
  { key: "terms", href: "/terms-and-conditions" },
  { key: "privacy", href: "/privacy-policy" },
  { key: "refund", href: "/return-refund-delivery-policy" },
] as const;

const SOCIALS = [
  {
    icon: mdiLinkedin,
    href: "https://www.linkedin.com/company/cekatai/",
    label: "LinkedIn",
  },
  {
    icon: mdiInstagram,
    href: "https://www.instagram.com/cekat.ai/",
    label: "Instagram",
  },
  {
    icon: mdiYoutube,
    href: "https://www.youtube.com/@cekatai",
    label: "YouTube",
  },
  {
    icon: mdiFacebook,
    href: "https://www.facebook.com/p/CekatAI-61551061527910/",
    label: "Facebook",
  },
] as const;

const OFFICE_COUNTRIES = [
  { flag: "🇮🇩", key: "indonesia" },
  { flag: "🇸🇬", key: "singapore" },
  { flag: "🇲🇾", key: "malaysia" },
] as const;

const OFFICE_COUNTRY_LABELS: Record<
  Locale,
  Record<(typeof OFFICE_COUNTRIES)[number]["key"], string>
> = {
  en: { indonesia: "Indonesia", singapore: "Singapore", malaysia: "Malaysia" },
  id: { indonesia: "Indonesia", singapore: "Singapura", malaysia: "Malaysia" },
  cn: { indonesia: "印度尼西亚", singapore: "新加坡", malaysia: "马来西亚" },
  jp: {
    indonesia: "インドネシア",
    singapore: "シンガポール",
    malaysia: "マレーシア",
  },
  kr: {
    indonesia: "인도네시아",
    singapore: "싱가포르",
    malaysia: "말레이시아",
  },
};

function LinkColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="font-numeric text-base font-semibold text-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  className,
}: {
  href: React.ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "inline-block py-1 text-sm leading-relaxed font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer({
  largeTouchTargets = false,
}: {
  largeTouchTargets?: boolean;
} = {}) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale() as Locale;
  const [activeCountry, setActiveCountry] = useState<string>("indonesia");

  const featureLinks = REGISTRY.features
    .filter((entry) => entry.slugs[locale] && !entry.switcherFallbackId)
    .sort((a, b) => (a.nav?.order ?? 99) - (b.nav?.order ?? 99))
    .slice(0, 6);
  const industryLinks = REGISTRY.industries
    .filter((entry) => entry.slugs[locale])
    .sort((a, b) => (a.nav?.order ?? 99) - (b.nav?.order ?? 99))
    .slice(0, 6);
  const solutionLinks = REGISTRY.solutions
    .filter((entry) => entry.slugs[locale])
    .sort((a, b) => (a.nav?.order ?? 99) - (b.nav?.order ?? 99));

  return (
    <footer
      data-layout="link-columns"
      className="relative overflow-hidden border-t border-border bg-white text-foreground"
    >
      {/* Meta partner strip */}
      <div className="border-b border-border">
        <Container className="flex flex-col items-center gap-3 py-6 font-numeric text-base text-foreground lg:flex-row lg:gap-6">
          <MetaLogo className="h-3 w-auto lg:h-5" />
          <p>{t("metaPartner")}</p>
        </Container>
      </div>

      <div>
        <Container className="grid gap-x-10 gap-y-12 py-12 lg:grid-cols-12 lg:py-16">
          {/* Brand and app badges anchor the link columns. */}
          <div className="flex min-w-0 flex-col items-start gap-8 lg:col-span-3">
            <div className="flex flex-col items-start">
              <LogoBlack className="h-9 w-auto" />
              <div className="mt-4 flex gap-4">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-8 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <Icon icon={s.icon} className="size-[1.15rem]" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-numeric text-xs text-foreground">
                {t("downloadApp")}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.cekatmobile&pcampaignid=web_share&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <PlayStoreBadge className="h-9 w-auto" />
                </a>
                <a
                  href="https://apps.apple.com/id/app/cekat-ai/id6499275234?l=id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <AppStoreBadge className="h-9 w-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Blueprint: link columns, not a narrow stacked sidebar. */}
          <div
            data-footer-links
            className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:col-span-9 xl:grid-cols-5"
          >
            <LinkColumn title={t("productHeading")}>
              {PRODUCT_LINKS.map((l) => (
                <FooterLink key={l.key} href={l.href}>
                  {tn(l.key)}
                </FooterLink>
              ))}
            </LinkColumn>
            <LinkColumn title={tn("fitur")}>
              {featureLinks.map((entry) => (
                <FooterLink
                  key={entry.id}
                  href={{
                    pathname: "/features/[slug]",
                    params: { slug: entry.slugs[locale]! },
                  }}
                >
                  {localeValue(entry.title, locale)}
                </FooterLink>
              ))}
              <FooterLink
                href="/features"
                className="font-semibold text-primary"
              >
                {tn("viewAllFeatures")} <span aria-hidden>→</span>
              </FooterLink>
            </LinkColumn>
            <LinkColumn title={tn("industries")}>
              {industryLinks.map((entry) => (
                <FooterLink
                  key={entry.id}
                  href={{
                    pathname: "/industries/[slug]",
                    params: { slug: entry.slugs[locale]! },
                  }}
                >
                  {localeValue(entry.title, locale)}
                </FooterLink>
              ))}
              <FooterLink
                href="/industries"
                className="font-semibold text-primary"
              >
                {tn("viewAllIndustries")} <span aria-hidden>→</span>
              </FooterLink>
            </LinkColumn>
            <LinkColumn title={tn("solutions")}>
              {solutionLinks.map((entry) => (
                <FooterLink
                  key={entry.id}
                  href={{
                    pathname: "/solutions/[slug]",
                    params: { slug: entry.slugs[locale]! },
                  }}
                >
                  {localeValue(entry.title, locale)}
                </FooterLink>
              ))}
              <FooterLink
                href="/solutions"
                className="font-semibold text-primary"
              >
                {tn("viewAllSolutions")} <span aria-hidden>→</span>
              </FooterLink>
            </LinkColumn>
            <LinkColumn title={t("legalHeading")}>
              {LEGAL_LINKS.map((l) => (
                <FooterLink key={l.key} href={l.href}>
                  {t(l.key)}
                </FooterLink>
              ))}
            </LinkColumn>
          </div>

          {/* Keep the three-country switcher as a separate, full-width office row. */}
          <div
            data-footer-offices
            className="grid min-w-0 gap-8 border-t border-border pt-10 lg:col-span-12 lg:grid-cols-12 lg:gap-10"
          >
            <div className="flex min-w-0 flex-col items-start gap-4 lg:col-span-5">
              <p className="font-numeric text-xs text-foreground">
                {t("officeHeading")}
              </p>
              <div
                role="tablist"
                aria-label={t("officeHeading")}
                className="grid w-full max-w-full grid-cols-3 items-center gap-1 rounded-xl border border-border bg-surface-muted p-1 sm:flex sm:w-fit sm:flex-wrap sm:gap-1.5"
              >
                {OFFICE_COUNTRIES.map((c) => {
                  const isActive = activeCountry === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCountry(c.key)}
                      className={cn(
                        "inline-flex min-w-0 cursor-pointer items-center justify-center gap-1 rounded-lg border px-1 py-1.5 font-numeric text-xs transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-primary/25 focus-visible:outline-none sm:shrink-0 sm:gap-1.5 sm:px-3.5 sm:text-sm sm:whitespace-nowrap",
                        largeTouchTargets ? "min-h-11" : "min-h-10",
                        isActive
                          ? "border-border/60 bg-white font-medium text-foreground shadow-xs"
                          : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="font-emoji">{c.flag}</span>
                      <span>{OFFICE_COUNTRY_LABELS[locale][c.key]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="min-h-[7.5rem] min-w-0 text-left lg:col-span-7">
              {activeCountry === "indonesia" && (
                <div
                  key="indonesia"
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("jakartaOfficeName")}
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-foreground">
                      {t("companyLegalName")}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                      {t("jakartaOfficeAddress")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("tangerangOfficeName")}
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-foreground">
                      {t("companyLegalName")}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                      {t("tangerangOfficeAddress")}
                    </p>
                  </div>
                </div>
              )}

              {activeCountry === "singapore" && (
                <div key="singapore" className="sm:max-w-md">
                  <p className="text-xs text-muted-foreground">
                    {t("singaporeOfficeName")}
                  </p>
                  <h3 className="mt-1.5 text-base font-semibold text-foreground">
                    {t("singaporeCompanyName")}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {t("singaporeOfficeAddress")}
                  </p>
                </div>
              )}

              {activeCountry === "malaysia" && (
                <div key="malaysia" className="sm:max-w-md">
                  <p className="text-xs text-muted-foreground">
                    {t("malaysiaOfficeName")}
                  </p>
                  <h3 className="mt-1.5 text-base font-semibold text-foreground">
                    {t("malaysiaCompanyName")}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {t("malaysiaOfficeAddress")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>

        {/* Bottom bar */}
        <div className="border-t border-border py-6">
          <Container>
            <p className="text-left text-xs font-medium text-muted-foreground">
              {locale === "id" ? "" : "Copyright "}&copy;{" "}
              {new Date().getFullYear()} CekatAI. {t("rights")}
            </p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
