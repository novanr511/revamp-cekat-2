import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  MessagesSquare,
  Plus,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LandingContent } from "@/lib/registry/types";
import { ClinicMotion } from "./clinic-demo";
import { IndustryDemo, IndustryPreview } from "./industry-preview";
import { industryLabels, type IndustryLocale } from "./industry-labels";
import "./clinic.css";

/** Uses the healthcare visual language, while all industry claims and copy
 * continue to come from that industry's existing localized content. */
export function IndustryPage({
  content,
  title,
  photo,
  locale,
}: {
  content: LandingContent;
  title: string;
  photo?: string;
  locale: IndustryLocale;
}) {
  const labels = industryLabels[locale];
  const useCases = content.hero.useCases?.length
    ? content.hero.useCases
    : content.benefits.map((benefit) => benefit.title);
  return (
    <div className="clinic-page industry-page" id="clinic-top">
      <ClinicMotion />
      <div className="cl-wrap">
        <nav className="cl-crumb" aria-label="Breadcrumb">
          <Link href="/industries">{labels.industries}</Link>
          <ChevronRight size={12} />
          {title}
        </nav>
        <section className="cl-hero">
          <div className="cl-copy">
            <p className="cl-tag">
              <MessageCircle size={17} /> {labels.forIndustry}{" "}
              {content.hero.badge || title}
            </p>
            <h1>{content.hero.title}</h1>
            <p className="cl-intro">{content.hero.subtitle}</p>
            <div className="cl-actions">
              <a className="cl-btn" href="https://chat.cekat.ai/register">
                {labels.trial} <ArrowUpRight size={17} />
              </a>
              <a className="cl-textlink" href="#simulasi">
                {labels.how} <ArrowDownRight size={16} />
              </a>
            </div>
          </div>
          <IndustryPreview key={title} locale={locale} cases={useCases}>
            {photo && (
              <Image
                src={photo}
                fill
                preload
                sizes="(max-width: 800px) 90vw, 50vw"
                alt=""
              />
            )}
          </IndustryPreview>
        </section>
        {content.stats && content.stats.length > 0 && (
          <section
            className="cl-results industry-results"
            aria-label={labels.glance}
          >
            <div>
              <p className="cl-label">{labels.glance}</p>
              <h2>
                {labels.numbers} <em>{labels.numbersAccent}</em>
              </h2>
            </div>
            {content.stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`}>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </div>
            ))}
          </section>
        )}
        <section
          className="industry-definition"
          aria-label={`${labels.forIndustry} ${title}`}
        >
          <p className="cl-label">{labels.about}</p>
          <p>{content.definition}</p>
        </section>
        <IndustryDemo
          locale={locale}
          key={title}
          benefits={content.benefits}
          faq={content.faq}
          heading={content.benefitsHeading}
        />
        {content.caseStudy && (
          <section className="industry-story">
            <p className="cl-label">
              {labels.story} · {content.caseStudy.client}
            </p>
            <div>
              <h2>{content.caseStudy.title || content.caseStudy.client}</h2>
              <p>{content.caseStudy.body}</p>
            </div>
            <div className="industry-storyMetrics">
              {content.caseStudy.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {content.pillars.length > 0 && (
          <section className="industry-pillars">
            <div>
              <p className="cl-label">{labels.team}</p>
              <h2>
                {labels.tools} <em>{labels.toolsAccent}</em>
              </h2>
            </div>
            <div>
              {content.pillars.map((pillar) => (
                <article key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        {content.testimonial && (
          <section className="industry-quote">
            <p className="cl-label">{labels.story}</p>
            <blockquote>“{content.testimonial.quote}”</blockquote>
            <p>
              <strong>{content.testimonial.name}</strong>
              <br />
              {content.testimonial.role}
            </p>
          </section>
        )}
        <section className="cl-faq">
          <div>
            <p className="cl-label">{labels.faq}</p>
            <h2>
              {labels.before} <em>{labels.beforeAccent}</em>
            </h2>
          </div>
          <div>
            {content.faq.map(({ q, a }) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="cl-close">
          <MessagesSquare size={27} />
          <h2>{content.cta.heading}</h2>
          <p>{content.cta.body}</p>
          <Link className="cl-btn" href="/contact-sales">
            {labels.book} <ArrowUpRight size={17} />
          </Link>
        </section>
      </div>
    </div>
  );
}
