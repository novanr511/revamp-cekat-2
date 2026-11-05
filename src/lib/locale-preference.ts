import { LOCALE_COOKIE, routing } from "@/i18n/routing";

const ONE_YEAR = 60 * 60 * 24 * 365;
const SUPPORTED_LOCALES = new Set<string>(routing.locales);
export const LOCALE_STORAGE_KEY = "locale_pref";
export const UI_LOCALE_STORAGE_KEY = "cekat_ui_locale";

const UI_LOCALE_VALUES: Record<string, string> = {
  en: "en",
  id: "id",
  cn: "zh-CN",
  kr: "ko",
  jp: "ja",
};

/** Persist an explicit language choice so geo routing never overrides it. */
export function rememberLocaleChoice(locale: string) {
  if (!SUPPORTED_LOCALES.has(locale)) return false;

  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    window.localStorage.setItem(
      UI_LOCALE_STORAGE_KEY,
      UI_LOCALE_VALUES[locale],
    );
  } catch {
    // Cookie routing remains available when browser storage is disabled.
  }
  return true;
}

/** Persist the locale attached to a raw HTML language-menu link. */
export function rememberLocaleFromLinkTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;

  const locale =
    target.closest<HTMLAnchorElement>("a[data-locale]")?.dataset.locale;
  return locale ? rememberLocaleChoice(locale) : false;
}
