import { useTranslations } from "next-intl";
import type { LandingContent } from "@/lib/registry/types";

export function IndustryNarrative({ content }: { content: LandingContent }) {
  const t = useTranslations("secondary");
  const lead = content.benefits[0];
  const steps = content.hero.useCases?.length
    ? content.hero.useCases
    : content.benefits.map((benefit) => benefit.title);
  const hasProof = Boolean(content.caseStudy || content.testimonial);
  const caseStudyMetricValues = new Set(
    content.caseStudy?.metrics.map((metric) => metric.value.trim()) ?? [],
  );
  const hasMetrics = (content.stats ?? []).some(
    (stat) => !caseStudyMetricValues.has(stat.value.trim()),
  );
  const hasFeatures = content.benefits.length > 1;

  return (
    <>
      <nav
        className="r-solution-nav r-container"
        aria-label={t("industrySections")}
      >
        <a href="#industry-problem">{t("industryProblem")}</a>
        {steps.length > 0 && (
          <a href="#industry-path">{t("industryChatFlow")}</a>
        )}
        {hasFeatures && <a href="#industry-features">{t("capabilities")}</a>}
        {hasProof && <a href="#industry-proof">{t("industryProof")}</a>}
        {hasMetrics && <a href="#industry-metrics">{t("industryMetrics")}</a>}
      </nav>
      <section
        id="industry-problem"
        className="r-industry-story__challenge r-section"
      >
        <div className="r-container r-industry-story__challenge-layout">
          <div>
            <p className="r-kicker">{t("industryProblem")}</p>
            <h2>{lead?.title ?? content.hero.title}</h2>
          </div>
          <p className="r-lede">{lead?.body ?? content.definition}</p>
        </div>
      </section>

      {steps.length > 0 && (
        <section
          id="industry-path"
          className="r-industry-story__flow r-solution-flow r-section"
        >
          <div className="r-container">
            <header className="r-industry-story__heading">
              <p className="r-kicker">{t("industryChatFlow")}</p>
              <h2>{t("industryPath")}</h2>
              <p>{content.definition}</p>
              <p className="r-solution-flow__note">{t("industryPathNote")}</p>
            </header>
            <ol className="r-solution-flow__thread">
              {steps.map((step, index) => (
                <li key={`${index}-${step}`} data-r-reveal>
                  <span className="r-industry-story__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="r-solution-flow__step">
                    <div>
                      <h3>{step}</h3>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
