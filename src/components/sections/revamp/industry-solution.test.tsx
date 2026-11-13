import { describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { REGISTRY } from "@/lib/registry";
import { loadLandingContent } from "@/lib/registry/content";
import { routing } from "@/i18n/routing";
import { RevampDetail } from "./detail";
import { INDUSTRY_CHAPTER_VISUALS } from "./industry-chapter-visuals";
import id from "../../../../messages/id.json";
import en from "../../../../messages/en.json";
import cn from "../../../../messages/cn.json";
import jp from "../../../../messages/jp.json";
import kr from "../../../../messages/kr.json";

vi.mock("./motion", () => ({
  RevampMotion: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => <div className={`r-page ${className}`}>{children}</div>,
}));
vi.mock("@/i18n/navigation", () => ({ Link: "a" }));
vi.mock("@/components/shared/app-anchor", () => ({ AppAnchor: "a" }));
vi.mock("@/components/shared/whatsapp-anchor", () => ({ WhatsAppAnchor: "a" }));

const messages = { id, en, cn, jp, kr };

describe("industry chapter visuals", () => {
  it.each(REGISTRY.industries)(
    "$id maps every feature chapter to its product UI visual",
    async ({ id }) => {
      const content = await loadLandingContent("industries", id, "id");
      const chapterBenefits = content.benefits.slice(1);
      const automotiveVisuals = [
        "automotiveLeadQualification",
        "automotiveBooking",
        "automotiveServiceReminder",
        "automotiveCrmPipeline",
      ];

      expect(chapterBenefits.length).toBeGreaterThan(0);
      chapterBenefits.forEach((benefit, index) => {
        if (id === "automotive") {
          expect(id).toBe("automotive");
          expect(benefit.visual).toBe(automotiveVisuals[index]);
          expect(benefit.image).toBeUndefined();
          expect(benefit.visualAlt).toBeTruthy();
          return;
        }
        const industryVisuals =
          INDUSTRY_CHAPTER_VISUALS[id as keyof typeof INDUSTRY_CHAPTER_VISUALS];
        expect(industryVisuals).toBeDefined();
        expect(industryVisuals?.[index]).toMatch(/^industry/);
        expect(benefit.visual).toBe(industryVisuals?.[index]);
        expect(benefit.image).toBeUndefined();
        expect(benefit.visualAlt).toBeTruthy();
        expect(
          existsSync(
            path.join(
              process.cwd(),
              "public",
              `images/industries/${id}-chapter-${String(index + 1).padStart(2, "0")}.webp`,
            ),
          ),
        ).toBe(false);
      });
    },
  );

  it.each(routing.locales)(
    "renders converted automotive chapters as localized UI in %s",
    async (locale) => {
      const content = await loadLandingContent(
        "industries",
        "automotive",
        locale,
      );
      const markup = renderToStaticMarkup(
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <RevampDetail
            industry
            content={content}
            title="Automotive"
            photo="/images/industry-photo.jpg"
            industryId="automotive"
            faqHeading="FAQ"
          />
        </NextIntlClientProvider>,
      );
      const root = document.createElement("div");
      root.innerHTML = markup;
      const chapters = root.querySelectorAll(".r-industry-features .r-chapter");
      const converted = [
        ["r-auto-qualify", "r-auto-qualify__profile"],
        ["r-auto-booking", "r-auto-booking__details"],
        ["r-auto-reminder", "r-auto-reminder__preview"],
        ["r-auto-crm", "r-auto-crm__board"],
      ] as const;

      converted.forEach(([visualClass, detailClass], index) => {
        const chapter = chapters[index];
        const visual = chapter?.querySelector(`.${visualClass}`);
        expect(visual).toHaveAttribute(
          "aria-label",
          content.benefits[index + 1].visualAlt,
        );
        expect(chapter?.querySelector(`.${detailClass}`)).not.toBeNull();
        expect(chapter?.querySelector(".r-chapter__image")).toBeNull();
        expect(chapter?.querySelector("img")).toBeNull();
      });
    },
  );

  it.each(routing.locales)(
    "renders healthcare booking, inbox, and ticket UI in %s",
    async (locale) => {
      const content = await loadLandingContent(
        "industries",
        "healthcare",
        locale,
      );
      const healthcareCopy =
        messages[locale].secondary.preview.industryVisual.healthcare;
      const markup = renderToStaticMarkup(
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <RevampDetail
            industry
            content={content}
            title={content.hero.badge ?? "Healthcare"}
            industryId="healthcare"
            photo="/images/industries/healthcare-hero.webp"
            faqHeading="FAQ"
          />
        </NextIntlClientProvider>,
      );
      const root = document.createElement("div");
      root.innerHTML = markup;

      const heroImage = root.querySelector(
        ".r-detail-hero .r-industry-visual__photo img",
      );
      const booking = root.querySelector(
        ".r-industry-features .r-industry-ui--industryBooking",
      );
      const inbox = root.querySelector(
        ".r-industry-features .r-industry-ui--industryInbox",
      );
      const ticket = root.querySelector(
        ".r-industry-features .r-industry-ui--industryTicketQueue",
      );

      expect(heroImage).toHaveAttribute(
        "src",
        "/images/industries/healthcare-hero.webp",
      );
      expect(booking).toHaveTextContent(healthcareCopy.workspace);
      expect(booking).toHaveTextContent(healthcareCopy.patientName);
      expect(booking).toHaveTextContent(healthcareCopy.sample);
      expect(booking).toHaveTextContent(healthcareCopy.weekdays.split("|")[0]);
      expect(inbox).toHaveTextContent(healthcareCopy.inbox);
      expect(inbox).toHaveTextContent(healthcareCopy.patientSecondShortName);
      expect(inbox).not.toHaveTextContent("Rafi M.");
      expect(ticket).toHaveTextContent(healthcareCopy.ticketLabel);
      expect(ticket).toHaveTextContent(healthcareCopy.patientShortName);
    },
  );
});

describe("industry solution layout across all industries and locales", () => {
  it.each(
    REGISTRY.industries.flatMap((entry) =>
      routing.locales.map((locale) => ({ id: entry.id, locale })),
    ),
  )(
    "$id / $locale keeps blueprint sections and only links to available proof",
    async ({ id, locale }) => {
      const content = await loadLandingContent("industries", id, locale);
      const markup = renderToStaticMarkup(
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <RevampDetail
            industry
            content={content}
            title={id}
            industryId={id}
            faqHeading="FAQ"
            photo="/images/industry-photo.jpg"
          />
        </NextIntlClientProvider>,
      );
      const root = document.createElement("div");
      root.innerHTML = markup;
      const useCases = content.hero.useCases?.length
        ? content.hero.useCases
        : content.benefits.map((benefit) => benefit.title);
      const featureBenefits =
        content.benefits.length > 1
          ? content.benefits.slice(1)
          : content.benefits;
      if (id !== "automotive") {
        const chapters = root.querySelectorAll(
          ".r-industry-features .r-chapter",
        );
        expect(
          root.querySelectorAll(".r-industry-features .r-industry-ui"),
        ).toHaveLength(featureBenefits.length);
        chapters.forEach((chapter, index) => {
          const visual = chapter.querySelector(".r-industry-ui");
          expect(visual).toHaveClass(
            `r-industry-ui--${featureBenefits[index].visual}`,
          );
          expect(chapter.querySelector(".r-chapter__image")).toBeNull();
          expect(chapter.querySelector("img")).toBeNull();
        });
      }
      const caseStudyMetricValues = new Set(
        content.caseStudy?.metrics.map((metric) => metric.value.trim()) ?? [],
      );
      const visibleMetrics = (content.stats ?? []).filter(
        (stat) => !caseStudyMetricValues.has(stat.value.trim()),
      );
      expect(root.querySelector(".r-solution")).not.toBeNull();
      expect(root.querySelector(".r-capabilities")).toBeNull();
      expect(
        root.querySelectorAll(".r-solution-flow__thread > li"),
      ).toHaveLength(useCases.length);
      expect(
        [...root.querySelectorAll(".r-solution-flow__thread h3")].map(
          (heading) => heading.textContent,
        ),
      ).toEqual(useCases);
      expect(root.querySelector(".r-healthcare-showcase")).toBeNull();
      expect(
        [
          ...root.querySelectorAll(".r-industry-features .r-chapter__copy h3"),
        ].map((heading) => heading.textContent),
      ).toEqual(featureBenefits.map((benefit) => benefit.title));
      for (const link of root.querySelectorAll<HTMLAnchorElement>(
        ".r-solution-nav a",
      )) {
        expect(root.querySelector(link.hash)).not.toBeNull();
      }
      const hasProof = Boolean(content.caseStudy || content.testimonial);
      expect(Boolean(root.querySelector("#industry-proof"))).toBe(hasProof);
      expect(
        Boolean(
          root.querySelector('.r-solution-nav a[href="#industry-proof"]'),
        ),
      ).toBe(hasProof);
      if (content.caseStudy)
        expect(root.querySelector("#industry-proof")?.textContent).toContain(
          content.caseStudy.client,
        );
      if (content.testimonial)
        expect(root.querySelector("#industry-proof")?.textContent).toContain(
          content.testimonial.quote,
        );
      expect(
        root.querySelectorAll("#industry-metrics .r-metric-rail > div"),
      ).toHaveLength(visibleMetrics.length);
      expect(root.querySelector(".r-faq")).toBeNull();
      expect(root.querySelector(".r-related")).toBeNull();
      expect(root.querySelector(".r-principles")).toBeNull();
      expect(root.querySelector(".r-platform-strip")).toBeNull();
      const metricsSection = root.querySelector("#industry-metrics");
      const finalCta = root.querySelector(".r-closer");
      if (metricsSection && finalCta) {
        expect(
          metricsSection.compareDocumentPosition(finalCta) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
      }
      const orderedSections = [
        root.querySelector(".r-detail-hero"),
        root.querySelector("#industry-problem"),
        root.querySelector("#industry-path"),
        root.querySelector("#industry-features"),
        root.querySelector("#industry-proof"),
        metricsSection,
        finalCta,
      ].filter((section): section is Element => section !== null);
      expect(
        orderedSections.every(
          (section, index) =>
            index === 0 ||
            Boolean(
              orderedSections[index - 1].compareDocumentPosition(section) &
              Node.DOCUMENT_POSITION_FOLLOWING,
            ),
        ),
      ).toBe(true);
      expect(root.querySelectorAll("h1")).toHaveLength(1);
      expect(
        root.querySelector('[data-cta="industry-hero-whatsapp"]'),
      ).not.toBeNull();
      expect(
        root.querySelector('.r-closer [data-cta="industry-final-whatsapp"]'),
      ).not.toBeNull();
      expect(
        root.querySelector('.r-closer a[href="/contact-sales"]'),
      ).toBeNull();
    },
  );
});
