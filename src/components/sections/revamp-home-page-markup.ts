import type { Locale } from "@/i18n/routing";
import { revampHomeMarkup } from "./revamp-home-markup";
import { enhanceRevampHomeJourney } from "./revamp-home-journey-markup";
import {
  localizeRevampHomeMarkup,
  localizeRevampHomeRoutes,
} from "./revamp-home-i18n";

/**
 * Prepare the approved homepage artifact for the shared Next.js site chrome.
 * Keep the page sections and dialog intact, but let SiteChrome own the one
 * shared header, skip link, and main landmark.
 */
export function revampHomePageMarkupForLocale(locale: Locale) {
  const heroRevealMarkup = revampHomeMarkup
    .replace(
      '<span aria-hidden="true">#1 AI-powered <span class="rot rot--revenue">',
      '<span aria-hidden="true"><span class="tr" style="--i:0">#1</span> <span class="tr" style="--i:1">AI-powered</span> <span class="tr" style="--i:2"><span class="rot rot--revenue">',
    )
    .replace(
      "</span> technology</span></h1>",
      '</span></span> <span class="tr" style="--i:3">technology</span></span></h1>',
    );

  return enhanceRevampHomeJourney(
    localizeRevampHomeMarkup(
      localizeRevampHomeRoutes(heroRevealMarkup, locale),
      locale,
    ),
    locale,
  )
    .replace(/<a class="skip" href="#main">[\s\S]*?<\/a>\s*/, "")
    .replace(/<header class="nav" id="top">[\s\S]*?<\/header>\s*/, "")
    .replace('<main id="main">', "")
    .replace("</main>", "");
}
