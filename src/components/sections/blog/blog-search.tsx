"use client";

import { useEffect, useId, useRef, useState } from "react";
import { getPathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Icon } from "@iconify/react/offline";
import { lucideSearch, lucideX } from "@/lib/icons";

/**
 * Blog search box. Submits to /blog?q=… so results are server-rendered and the
 * URL is shareable — which is also what the WebSite SearchAction advertises.
 */
export function BlogSearch({
  initialQuery = "",
  placeholder,
  label,
  clearLabel,
  openLabel = "Open search",
  closeLabel = "Close search",
}: {
  initialQuery?: string;
  placeholder: string;
  label: string;
  clearLabel: string;
  openLabel?: string;
  closeLabel?: string;
}) {
  const [value, setValue] = useState(initialQuery);
  const [mobileOpen, setMobileOpen] = useState(Boolean(initialQuery));
  const [instantMotion, setInstantMotion] = useState(false);
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const focusFrame = useRef<number | null>(null);
  const router = useRouter();
  const pathname = getPathname({
    href: "/blog",
    locale: useLocale() as Locale,
  });

  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    },
    [],
  );

  function closeSearch() {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
    setMobileOpen(false);
    toggleRef.current?.focus();
  }

  function submit(query: string) {
    const trimmed = query.trim();
    router.push(
      trimmed ? { pathname: "/blog", query: { q: trimmed } } : "/blog",
    );
  }

  return (
    <form
      role="search"
      action={pathname}
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        submit(value);
      }}
      className={`r-blog-search${mobileOpen ? " r-blog-search--open" : ""}`}
      data-motion={instantMotion ? "instant" : "pointer"}
      onKeyDown={(event) => {
        if (
          event.key === "Escape" &&
          mobileOpen &&
          window.matchMedia("(max-width: 700px)").matches
        ) {
          event.preventDefault();
          setInstantMotion(true);
          closeSearch();
        }
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        className="r-blog-search__toggle"
        aria-label={mobileOpen ? closeLabel : openLabel}
        aria-expanded={mobileOpen}
        aria-controls={id}
        onClick={(event) => {
          setInstantMotion(event.detail === 0);
          if (mobileOpen) {
            closeSearch();
          } else {
            setMobileOpen(true);
            if (focusFrame.current !== null)
              cancelAnimationFrame(focusFrame.current);
            focusFrame.current = requestAnimationFrame(() => {
              focusFrame.current = null;
              inputRef.current?.focus();
            });
          }
        }}
      >
        <Icon icon={mobileOpen ? lucideX : lucideSearch} aria-hidden />
      </button>
      <label htmlFor={id}>{label}</label>
      <Icon icon={lucideSearch} aria-hidden className="pointer-events-none" />
      <input
        ref={inputRef}
        id={id}
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => {
            setValue("");
            submit("");
          }}
        >
          <Icon icon={lucideX} className="size-4" aria-hidden />
        </button>
      )}
    </form>
  );
}
