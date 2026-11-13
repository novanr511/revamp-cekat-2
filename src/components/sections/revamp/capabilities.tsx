"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { RevampIcon } from "./icon";
import { ProductCanvas } from "./product-canvas";
import { useTranslations } from "next-intl";

export function RevampCapabilities({
  heading,
  benefits,
  product = "chat",
}: {
  heading: string;
  benefits: Array<{
    title: string;
    body: string;
    image?: string;
    imageAlt?: string;
  }>;
  product?: string;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const t = useTranslations("secondary");
  if (!benefits.length) return null;
  const current = benefits[active];
  return (
    <section id="capabilities" className="r-capabilities r-section">
      <div className="r-container">
        <div className="r-section-heading" data-r-reveal>
          <p className="r-kicker">{t("capabilities")}</p>
          <h2>{heading}</h2>
        </div>
        <div className="r-capabilities__layout">
          <div className="r-capabilities__list">
            {benefits.map((benefit, i) => (
              <div
                className={`r-capability ${active === i ? "is-active" : ""}`}
                key={benefit.title}
              >
                <h3>
                  <button
                    type="button"
                    id={`${id}-control-${i}`}
                    aria-expanded={active === i}
                    aria-controls={`${id}-content-${i}`}
                    onClick={() => setActive(i)}
                  >
                    <span aria-hidden className="r-capability__number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{benefit.title}</span>
                    <span aria-hidden className="r-capability__arrow">
                      <RevampIcon name="diagonal" />
                    </span>
                  </button>
                </h3>
                <div id={`${id}-content-${i}`} hidden={active !== i}>
                  <p>{benefit.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="r-capabilities__visual"
            role="region"
            aria-labelledby={`${id}-control-${active}`}
          >
            <span className="r-visual-label">
              <RevampIcon name="check" size="1rem" />
              {t("inside")}
            </span>
            {current.image ? (
              <div className="r-capabilities__image">
                <Image
                  src={current.image}
                  alt={current.imageAlt || current.title}
                  fill
                  sizes="(max-width: 900px) 90vw, 600px"
                  className="object-contain"
                />
              </div>
            ) : (
              <ProductCanvas product={product} compact />
            )}
            <span className="r-visual-caption">
              {t("illustration")}
              <span>
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(benefits.length).padStart(2, "0")}
              </span>
            </span>
          </div>
        </div>
        <noscript>
          <div className="r-capabilities__nojs">
            {benefits.slice(1).map((benefit) => (
              <article key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}
