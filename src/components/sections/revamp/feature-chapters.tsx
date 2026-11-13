import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProductCanvas } from "./product-canvas";
import { AutomotiveLeadQualificationVisual } from "./automotive-lead-qualification";
import {
  AutomotiveBookingVisual,
  AutomotiveCrmPipelineVisual,
  AutomotiveServiceReminderVisual,
} from "./automotive-chapter-visuals";
import { IndustryChapterVisual } from "./industry-chapter-visuals";
import type { IndustryVisualName, LandingContent } from "@/lib/registry/types";

type Benefit = LandingContent["benefits"][number];

function isIndustryVisualName(
  visual: Benefit["visual"],
): visual is IndustryVisualName {
  return typeof visual === "string" && visual.startsWith("industry");
}

/** Server-rendered chapters: every product benefit is readable without JS. */
export function FeatureChapters({
  heading,
  benefits,
  product,
  industryId,
}: {
  heading: string;
  benefits: Benefit[];
  product: string;
  industryId?: string;
}) {
  const t = useTranslations("secondary");
  if (!benefits.length) return null;
  return (
    <section id="capabilities" className="r-chapters">
      <div className="r-container r-chapters__heading" data-r-reveal>
        <p className="r-kicker">{t("capabilities")}</p>
        <h2>{heading}</h2>
      </div>
      <nav className="r-container r-chapters__index" aria-label={heading}>
        {benefits.map((benefit, index) => (
          <a href={`#feature-${index + 1}`} key={benefit.title}>
            <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            {benefit.title}
          </a>
        ))}
      </nav>
      {benefits.map((benefit, index) => (
        <article
          id={`feature-${index + 1}`}
          className="r-chapter"
          key={benefit.title}
        >
          <div className="r-container r-chapter__layout">
            <div className="r-chapter__copy" data-r-reveal>
              <span className="r-chapter__number" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </div>
            <figure className="r-chapter__visual" data-r-reveal>
              {benefit.visual ? (
                benefit.visual === "automotiveLeadQualification" ? (
                  <AutomotiveLeadQualificationVisual
                    label={benefit.visualAlt || benefit.title}
                  />
                ) : benefit.visual === "automotiveBooking" ? (
                  <AutomotiveBookingVisual
                    label={benefit.visualAlt || benefit.title}
                  />
                ) : benefit.visual === "automotiveServiceReminder" ? (
                  <AutomotiveServiceReminderVisual
                    label={benefit.visualAlt || benefit.title}
                  />
                ) : isIndustryVisualName(benefit.visual) ? (
                  <IndustryChapterVisual
                    type={benefit.visual}
                    title={benefit.title}
                    body={benefit.body}
                    label={benefit.visualAlt || benefit.title}
                    industryId={industryId}
                  />
                ) : (
                  <AutomotiveCrmPipelineVisual
                    label={benefit.visualAlt || benefit.title}
                  />
                )
              ) : benefit.image ? (
                <div className="r-chapter__image">
                  <Image
                    src={benefit.image}
                    alt={benefit.imageAlt || benefit.title}
                    fill
                    quality={90}
                    sizes="(max-width: 900px) 90vw, 640px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <ProductCanvas product={product} compact />
              )}
              <figcaption>{t("illustration")}</figcaption>
            </figure>
          </div>
        </article>
      ))}
    </section>
  );
}
