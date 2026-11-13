"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { RevampIcon } from "./icon";
import { useTranslations } from "next-intl";

export type DirectoryEntry = {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  image?: string;
  category: string;
};
const GROUPS: Record<string, string[]> = {
  service: [
    "healthcare",
    "clinics",
    "dental",
    "pharmacy",
    "beauty-wellness",
    "barbershop",
    "gym-sports",
    "professional-services",
    "finance",
  ],
  commerce: [
    "retail",
    "fnb",
    "fmcg",
    "property",
    "automotive",
    "logistics",
    "transport",
    "travel",
    "hospitality",
    "airlines",
    "entertainment",
  ],
  community: [
    "education",
    "schools",
    "edutech",
    "government",
    "nonprofit",
    "saas",
    "tech-startup",
    "isp",
    "outsourcing",
  ],
};

export function HubDirectory({
  entries,
  industry,
  heading,
}: {
  entries: DirectoryEntry[];
  industry: boolean;
  heading: string;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const t = useTranslations("secondary");
  const categories = industry
    ? ["service", "commerce", "community"]
    : [...new Set(entries.map((e) => e.category))];
  const labels: Record<string, string> = {
    all: t("allIndustries"),
    service: t("service"),
    commerce: t("commerce"),
    community: t("community"),
    chat: "Chat",
    crm: "CRM",
    marketing: "Marketing",
    order: "Automation",
    ai: "AI Agent",
  };
  const filtered = entries.filter(
    (entry) =>
      (group === "all" ||
        (industry
          ? GROUPS[group]?.includes(entry.id)
          : entry.category === group)) &&
      `${entry.title} ${entry.tagline || ""}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim()),
  );
  return (
    <section id="directory" className="r-directory r-section">
      <div className="r-container">
        <div className="r-section-heading r-section-heading--row">
          <div>
            <p className="r-kicker">
              {t(industry ? "findFit" : "manyPossibilities")}
            </p>
            <h2>{heading}</h2>
          </div>
          <label className="r-directory__search">
            <span className="r-directory__search-label">{t("search")}</span>
            <RevampIcon name="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder={t("searchPlaceholder")}
            />
          </label>
        </div>
        <div
          className="r-directory__filters"
          role="group"
          aria-label={t("filter")}
        >
          {["all", ...categories].map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setGroup(category)}
              aria-pressed={group === category}
            >
              {category === "all" && !industry
                ? t("allFeatures")
                : labels[category] || category}
            </button>
          ))}
        </div>
        <p className="r-directory__count" role="status">
          {t("count", { count: filtered.length })}
        </p>
        <div
          className={`r-directory__grid ${industry ? "r-directory__grid--industries" : "r-directory__grid--features"}`}
        >
          {filtered.map((entry) => (
            <Link
              key={entry.id}
              href={{
                pathname: industry ? "/industries/[slug]" : "/features/[slug]",
                params: { slug: entry.slug },
              }}
              className="r-directory-card"
            >
              {entry.image ? (
                <div className="r-directory-card__image">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes={industry ? "96px" : "(max-width: 600px) 90vw, 30vw"}
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="r-directory-card__icon">
                  <RevampIcon
                    name={
                      entry.category === "marketing"
                        ? "chart"
                        : entry.category === "crm"
                          ? "shield"
                          : "chat"
                    }
                    size="1.75rem"
                  />
                </span>
              )}
              <div className="r-directory-card__copy">
                <h3>{entry.title}</h3>
                {entry.tagline && <p>{entry.tagline}</p>}
                <span className="r-directory-card__arrow" aria-hidden>
                  <RevampIcon name="diagonal" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="r-directory__empty">
            <h3>{t("empty")}</h3>
            <p>{t("emptyBody")}</p>
            <button
              type="button"
              className="r-button r-button--quiet"
              onClick={() => {
                setQuery("");
                setGroup("all");
              }}
            >
              {t("showAll")}
              <RevampIcon />
            </button>
          </div>
        )}
        <noscript>
          <style>{`.r-page .r-directory .r-directory__filters, .r-page .r-directory .r-directory__search { display: none; }`}</style>
        </noscript>
      </div>
    </section>
  );
}
