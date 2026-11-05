"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react/offline";
import { TRUSTED_LOGOS } from "@/components/sections/shared/trusted-logos";
import { logosMetaIcon } from "@/lib/icons";

const CUSTOMER_STORIES = [
  "threeland",
  "natureCraft",
  "putiih",
  "wallStreet",
  "rumahZakat",
] as const;

/** Rotating customer proof and client logos, as on the live contact page. */
export function ContactSalesLogos() {
  const t = useTranslations("contactSales");
  const stories = useTranslations("home.testimonials");
  const [activeId, setActiveId] = useState<(typeof CUSTOMER_STORIES)[number]>(
    "threeland",
  );

  return (
    <div className="relative flex min-w-0 justify-center bg-surface-muted px-4 py-8 sm:px-10 sm:py-12 lg:col-start-1 lg:row-start-2 lg:block lg:bg-transparent lg:px-14 lg:pt-2 lg:pb-10 xl:px-20">
      <article className="mx-auto w-full max-w-xl rounded-2xl border border-white/80 bg-white p-4 shadow-card sm:p-6">
        <div key={activeId} className="animate-swap-in">
          <div className="flex min-w-0 items-baseline gap-2 sm:gap-3">
            <p className="shrink-0 font-numeric text-2xl font-medium tracking-tight text-primary tabular-nums sm:text-3xl">
              {stories(`${activeId}.metricValue`)}
            </p>
            <p className="min-w-0 text-[13px] leading-snug text-muted-foreground">
              {stories(`${activeId}.metricLabel`)}
            </p>
          </div>

          <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
            “{stories(`${activeId}.quote`)}”
          </blockquote>

          <div className="mt-4 flex items-center gap-2.5">
            <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-subtle font-numeric text-[11px] font-semibold text-muted-foreground ring-1 ring-border">
              <Image
                src="/images/crm/adam-sulaiman.png"
                alt=""
                fill
                sizes="32px"
                className="object-cover"
              />
            </span>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {stories(`${activeId}.name`)}
              </span>
              <span aria-hidden="true"> · </span>
              {stories(`${activeId}.role`)}, {stories(`${activeId}.company`)}
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label={stories("heading")}
          className="mt-4 -ml-1.5 flex items-center"
        >
          {CUSTOMER_STORIES.map((storyId) => {
            const selected = activeId === storyId;

            return (
              <button
                key={storyId}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={stories(`${storyId}.company`)}
                onClick={() => setActiveId(storyId)}
                className="flex size-6 cursor-pointer items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`size-2.5 rounded-full transition-colors ${
                    selected
                      ? "bg-primary"
                      : "bg-foreground/25 hover:bg-foreground/40"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-3 border-t border-border/80 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
            <p className="font-numeric text-[0.68rem] font-semibold tracking-[0.14em] text-subtle-foreground uppercase">
              {t("proofTrusted")}
            </p>
            <p className="inline-flex min-w-0 items-center gap-2 font-numeric text-xs font-medium text-foreground">
              <Icon
                icon={logosMetaIcon}
                // A stable ID avoids Iconify's module-level counter producing
                // different gradient IDs during server and client rendering.
                id="contactMetaLogo"
                aria-hidden="true"
                className="h-3.5 w-auto"
              />
              {t("proofPartner")}
            </p>
          </div>

          <ul className="mt-4 grid grid-cols-5 items-center gap-x-6 gap-y-4">
            {TRUSTED_LOGOS.map((logo) => (
              <li key={logo.src}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="(min-width: 640px) 90px, 14vw"
                  className="mx-auto h-6 w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
