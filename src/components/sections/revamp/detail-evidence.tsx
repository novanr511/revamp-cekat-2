import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { LandingContent } from "@/lib/registry/types";
import { RevampIcon } from "./icon";

/** Evidence is sourced from page content, never generated from aggregate stats. */
export function DetailCaseStudy({
  study,
}: {
  study: NonNullable<LandingContent["caseStudy"]>;
}) {
  const t = useTranslations("secondary");
  return (
    <section className="r-proof r-section">
      <div className="r-container r-proof__layout" data-r-reveal>
        <div>
          <p className="r-kicker">{t("growth")}</p>
          <h2>{study.title || study.client}</h2>
          <p className="r-lede">{study.body}</p>
          <Link href="/case-studies" className="r-text-link">
            {t("stories")}
            <RevampIcon name="diagonal" />
          </Link>
        </div>
        <div className="r-proof__metrics">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
              <span>{study.client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailQuote({
  testimonial,
}: {
  testimonial: NonNullable<LandingContent["testimonial"]>;
}) {
  const t = useTranslations("secondary");
  return (
    <section className="r-quote r-section">
      <div className="r-container" data-r-reveal>
        <p className="r-kicker">{testimonial.heading || t("teams")}</p>
        <blockquote>“{testimonial.quote}”</blockquote>
        <div className="r-quote__author">
          {testimonial.image && (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <strong>{testimonial.name}</strong>
            <p>{testimonial.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
