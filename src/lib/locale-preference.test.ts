import { beforeEach, describe, expect, it } from "vitest";
import { LOCALE_COOKIE } from "@/i18n/routing";
import {
  LOCALE_STORAGE_KEY,
  UI_LOCALE_STORAGE_KEY,
  rememberLocaleFromLinkTarget,
} from "./locale-preference";

describe("locale preference links", () => {
  beforeEach(() => {
    document.cookie = `${LOCALE_COOKIE}=; path=/; max-age=0`;
    window.localStorage.removeItem(LOCALE_STORAGE_KEY);
    window.localStorage.removeItem(UI_LOCALE_STORAGE_KEY);
  });

  it("persists Indonesian when its language-menu link is selected", () => {
    const link = document.createElement("a");
    link.dataset.locale = "id";
    const label = document.createElement("span");
    link.append(label);

    expect(rememberLocaleFromLinkTarget(label)).toBe(true);
    expect(document.cookie).toContain(`${LOCALE_COOKIE}=id`);
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("id");
    expect(window.localStorage.getItem(UI_LOCALE_STORAGE_KEY)).toBe("id");
  });

  it.each([
    ["cn", "zh-CN"],
    ["kr", "ko"],
    ["jp", "ja"],
    ["en", "en"],
  ])("maps %s to %s for the UI locale", (locale, uiLocale) => {
    const link = document.createElement("a");
    link.dataset.locale = locale;

    expect(rememberLocaleFromLinkTarget(link)).toBe(true);
    expect(window.localStorage.getItem(UI_LOCALE_STORAGE_KEY)).toBe(uiLocale);
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe(locale);
    expect(document.cookie).toContain(`${LOCALE_COOKIE}=${locale}`);
  });

  it("ignores links without a supported locale", () => {
    const link = document.createElement("a");
    link.dataset.locale = "unsupported";

    expect(rememberLocaleFromLinkTarget(link)).toBe(false);
    expect(document.cookie).not.toContain(LOCALE_COOKIE);
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem(UI_LOCALE_STORAGE_KEY)).toBeNull();
  });
});
