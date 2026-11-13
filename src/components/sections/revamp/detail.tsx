import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { LandingContent } from "@/lib/registry/types";
import type { ComponentProps, CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { RevampMotion } from "./motion";
import { RevampIcon } from "./icon";
import { ProductCanvas } from "./product-canvas";
import { DetailCaseStudy, DetailQuote } from "./detail-evidence";
import { FeatureChapters } from "./feature-chapters";
import { IndustryNarrative } from "./industry-narrative";
import {
  RevampActions,
  RevampCloser,
  RevampFaq,
  RevampPlatformStrip,
} from "./shared";

export type RevampRelated = {
  title: string;
  tagline?: string;
  href: ComponentProps<typeof Link>["href"];
  icon?: string;
};

export function RevampDetail({
  content,
  title,
  industry = false,
  industryId,
  photo,
  product = "chat",
  related = [],
  faqHeading,
}: {
  content: LandingContent;
  title: string;
  industry?: boolean;
  industryId?: string;
  photo?: string;
  product?: string;
  related?: RevampRelated[];
  faqHeading: string;
}) {
  const t = useTranslations("secondary");
  const displayTitle = content.hero.title.replace(/[.!]$/, "");
  const industryFeatureBenefits =
    content.benefits.length > 1 ? content.benefits.slice(1) : content.benefits;
  const caseStudyMetricValues = new Set(
    content.caseStudy?.metrics.map((metric) => metric.value.trim()) ?? [],
  );
  const metricStats = (content.stats ?? []).filter(
    (stat) => !industry || !caseStudyMetricValues.has(stat.value.trim()),
  );
  const metricColumns = metricStats.length
    ? metricStats.length > 4
      ? 3
      : metricStats.length
    : 0;
  const metricRail = metricStats.length > 0 && (
    <div
      className="r-container r-metric-rail"
      data-metric-columns={metricColumns}
      style={
        {
          "--r-metric-columns": metricColumns,
        } as CSSProperties
      }
    >
      {metricStats.map((stat) => (
        <div key={stat.label}>
          <strong>{stat.value}</strong>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
  const deepFeatures = content.tabs && content.tabs.length > 0 && (
    <section className="r-deep-features r-section">
      <div className="r-container">
        <p className="r-kicker">{t("more")}</p>
        <div className="r-deep-features__grid">
          {content.tabs.map((tab, i) => (
            <article key={tab.label} data-r-reveal>
              <span className="r-stage-chip">{tab.label}</span>
              <h3>{tab.title}</h3>
              <p>{tab.body}</p>
              {tab.image && (
                <div className="r-deep-features__image">
                  <Image
                    src={tab.image}
                    alt={tab.title}
                    fill
                    sizes="(max-width: 700px) 90vw, 45vw"
                    className="object-contain"
                  />
                </div>
              )}
              <span className="r-deep-features__number" aria-hidden>
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
  const principles = content.pillars.length > 0 && (
    <section className="r-principles r-section">
      <div className="r-container">
        <div className="r-section-heading" data-r-reveal>
          <p className="r-kicker">{t("aiControl")}</p>
          <h2>{t("principles")}</h2>
        </div>
        <div className="r-principles__grid">
          {content.pillars.map((pillar, i) => (
            <article key={pillar.title} data-r-reveal>
              <span className="r-principle-icon">
                <RevampIcon
                  name={i === 0 ? "shield" : i === 1 ? "chat" : "chart"}
                  size="1.75rem"
                />
              </span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
  return (
    <RevampMotion
      className={industry ? "r-industry r-solution" : "r-product"}
      tone={industry ? "industry" : product}
    >
      <section
        className={`r-detail-hero ${industry ? "r-detail-hero--industry" : "r-detail-hero--product"}`}
      >
        <div className="r-container">
          <nav className="r-breadcrumb" aria-label={t("breadcrumb")}>
            <Link href="/">Cekat.AI</Link>
            <span aria-hidden>/</span>
            <Link href={industry ? "/industries" : "/features"}>
              {t(industry ? "industries" : "features")}
            </Link>
            <span aria-hidden>/</span>
            <span>{title}</span>
          </nav>
          <div className="r-detail-hero__layout">
            <div className="r-detail-hero__copy">
              <p className="r-kicker" data-r-hero>
                {content.hero.badge || title}
              </p>
              <h1 data-r-hero>
                {displayTitle}
                <span className="r-title-period">.</span>
              </h1>
            </div>
            <div className="r-detail-hero__summary" data-r-hero>
              <p className="r-lede">{content.hero.subtitle}</p>
              <div data-r-hero>
                <RevampActions
                  explore={industry ? "#industry-path" : undefined}
                  industry={industry}
                />
              </div>
              {!industry && content.hero.useCases && (
                <div className="r-use-cases" data-r-hero>
                  {content.hero.useCases.map((useCase) => (
                    <span key={useCase}>
                      <RevampIcon name="check" size="1rem" />
                      {useCase}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {industry && (
              <div
                className={`r-industry-visual ${!photo ? "r-industry-visual--product" : ""} ${photo === "/images/industries/healthcare-hero.webp" ? "r-industry-visual--healthcare" : ""}`}
                data-r-hero
              >
                {photo ? (
                  <div className="r-industry-visual__photo">
                    <Image
                      src={photo}
                      alt={title}
                      fill
                      preload
                      fetchPriority="high"
                      unoptimized={photo.endsWith("-hero.webp")}
                      sizes="(max-width: 900px) 90vw, 1200px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ProductCanvas product="chat" compact />
                )}
                {photo && (
                  <div className="r-industry-visual__card">
                    <div>
                      <Image
                        src="/revamp-web-cekat/assets/logo-mark.svg"
                        width={26}
                        height={26}
                        alt=""
                      />
                      <span>Cekat AI Agent</span>
                      <span className="r-ai-status">24/7</span>
                    </div>
                    <p>{content.hero.useCases?.[0] || t("conversation")}</p>
                    <span className="r-industry-visual__card-bottom">
                      <RevampIcon name="check" size="1rem" />
                      {t("control")}
                    </span>
                  </div>
                )}
                <span className="r-industry-visual__caption">
                  {t("people")}
                </span>
              </div>
            )}
          </div>
          {!industry && (
            <div className="r-product-stage" data-r-hero>
              <div className="r-product-stage__label">
                <span className="r-stage-chip">
                  {product === "marketing"
                    ? "Acquire"
                    : product === "crm"
                      ? "Convert"
                      : product === "order"
                        ? "Automate"
                        : "Engage"}
                </span>
                <span>{t("picture")}</span>
                <span className="r-product-stage__hint">
                  {t("explorePreview")}
                  <RevampIcon name="diagonal" size="1rem" />
                </span>
              </div>
              <ProductCanvas product={product} />
            </div>
          )}
        </div>
      </section>
      {industry ? (
        <IndustryNarrative content={content} />
      ) : (
        <>
          <RevampPlatformStrip />
          <section className="r-introduction r-section">
            <div className="r-container r-introduction__layout" data-r-reveal>
              <p className="r-kicker">{t("closer")}</p>
              <div>
                <h2>{t("flow")}</h2>
                <p className="r-lede">{content.definition}</p>
              </div>
            </div>
            {metricRail}
          </section>
        </>
      )}
      {industry ? (
        <div id="industry-features" className="r-industry-features">
          <FeatureChapters
            heading={content.benefitsHeading || t("benefits")}
            benefits={industryFeatureBenefits}
            product={product === "industry" ? "chat" : product}
            industryId={industryId}
          />
        </div>
      ) : (
        <FeatureChapters
          heading={content.benefitsHeading || t("benefits")}
          benefits={content.benefits}
          product={product}
        />
      )}
      {industry ? (
        <>
          {deepFeatures}
          {(content.caseStudy || content.testimonial) && (
            <div id="industry-proof" className="r-solution-proof">
              {content.caseStudy && (
                <DetailCaseStudy study={content.caseStudy} />
              )}
              {content.testimonial && (
                <DetailQuote testimonial={content.testimonial} />
              )}
            </div>
          )}
          {metricStats.length > 0 && (
            <section
              id="industry-metrics"
              className="r-industry-metrics r-section"
            >
              <div className="r-container">
                <div className="r-section-heading" data-r-reveal>
                  <h2>{t("industryMetrics")}</h2>
                </div>
              </div>
              {metricRail}
            </section>
          )}
        </>
      ) : (
        <>
          {deepFeatures}
          {content.caseStudy && <DetailCaseStudy study={content.caseStudy} />}
          {principles}
          {content.testimonial && (
            <DetailQuote testimonial={content.testimonial} />
          )}
        </>
      )}
      {!industry && (
        <RevampFaq
          heading={faqHeading}
          items={content.faq}
          industry={industry}
        />
      )}
      {!industry && related.length > 0 && (
        <section className="r-related r-section">
          <div className="r-container">
            <div className="r-section-heading r-section-heading--row">
              <div>
                <p className="r-kicker">{t("keepExploring")}</p>
                <h2>{t(industry ? "relatedIndustry" : "relatedProduct")}</h2>
              </div>
              <Link
                href={industry ? "/industries" : "/features"}
                className="r-text-link"
              >
                {t("viewAll")}
                <RevampIcon />
              </Link>
            </div>
            <div className="r-related__grid">
              {related.slice(0, 4).map((item) => (
                <Link
                  href={item.href}
                  className="r-related__card"
                  key={item.title}
                >
                  <RevampIcon name="diagonal" />
                  <h3>{item.title}</h3>
                  {item.tagline && <p>{item.tagline}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <RevampCloser
        heading={content.cta.heading}
        body={content.cta.body}
        industry={industry}
      />
    </RevampMotion>
  );
}
