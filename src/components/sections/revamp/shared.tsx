import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AppAnchor } from "@/components/shared/app-anchor";
import { WhatsAppAnchor } from "@/components/shared/whatsapp-anchor";
import { REGISTER_URL } from "@/lib/links";
import { RevampIcon } from "./icon";
import { useTranslations } from "next-intl";

export function RevampActions({
  explore = "#capabilities",
  industry = false,
}: {
  explore?: string;
  industry?: boolean;
}) {
  const t = useTranslations("secondary");
  const homeHero = useTranslations("home.hero");
  return (
    <div className="r-actions">
      <AppAnchor
        href={REGISTER_URL}
        className="r-button r-button--primary"
        data-cta="secondary-hero"
      >
        {t("trial")}
      </AppAnchor>
      {industry ? (
        <WhatsAppAnchor
          className="r-button r-button--quiet"
          data-cta="industry-hero-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          {homeHero("ctaPrimary")}
        </WhatsAppAnchor>
      ) : (
        <a href={explore} className="r-button r-button--quiet">
          {t("how")}
        </a>
      )}
      <p className="r-reassurance">{t("reassurance")}</p>
    </div>
  );
}

export function RevampCloser({
  heading,
  body,
  industry = false,
}: {
  heading: string;
  body: string;
  industry?: boolean;
}) {
  const t = useTranslations("secondary");
  const homeHero = useTranslations("home.hero");
  return (
    <section className="r-closer">
      <div className="r-container r-closer__layout" data-r-reveal>
        <div>
          <p className="r-kicker">{t("next")}</p>
          <h2>{heading}</h2>
          <p className="r-lede">{body}</p>
        </div>
        <div className="r-closer__action">
          <AppAnchor
            href={REGISTER_URL}
            className="r-button r-button--white"
            data-cta="secondary-final"
          >
            {t("trial")}
            <RevampIcon />
          </AppAnchor>
          {industry ? (
            <WhatsAppAnchor
              className="r-closer__sales"
              data-cta="industry-final-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              {homeHero("ctaPrimary")}
              <RevampIcon name="diagonal" />
            </WhatsAppAnchor>
          ) : (
            <Link href="/contact-sales" className="r-closer__sales">
              {t("sales")}
              <RevampIcon name="diagonal" />
            </Link>
          )}
          <p>{t("trialNote")}</p>
        </div>
      </div>
    </section>
  );
}

export function RevampFaq({
  heading,
  items,
  industry = false,
}: {
  heading: string;
  items: Array<{ q: string; a: string }>;
  industry?: boolean;
}) {
  const t = useTranslations("secondary");
  const homeHero = useTranslations("home.hero");
  if (!items.length) return null;
  return (
    <section className="r-faq r-section">
      <div className="r-container r-faq__layout">
        <div data-r-reveal>
          <p className="r-kicker">{t("faq")}</p>
          <h2>{heading}</h2>
          <p className="r-lede">{t("faqBody")}</p>
          {industry ? (
            <WhatsAppAnchor
              className="r-text-link"
              data-cta="industry-faq-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              {homeHero("ctaPrimary")}
              <RevampIcon name="diagonal" />
            </WhatsAppAnchor>
          ) : (
            <Link href="/contact-sales" className="r-text-link">
              {t("ask")}
              <RevampIcon name="diagonal" />
            </Link>
          )}
        </div>
        <div>
          {items.map((item, i) => (
            <details key={item.q} className="r-faq__item" open={i === 0}>
              <summary>
                {item.q}
                <span aria-hidden className="r-faq__plus">
                  +
                </span>
              </summary>
              <div>
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RevampPlatformStrip() {
  const t = useTranslations("secondary");
  return (
    <section className="r-platform-strip">
      <div className="r-container">
        <p>{t("ecosystem")}</p>
        <div>
          {["marketing", "chat", "crm", "order"].map((product) => (
            <Link href={`/${product}` as "/chat"} key={product}>
              <Image
                src={`/revamp-web-cekat/assets/products/${product === "order" ? "automation" : product}.svg`}
                width={28}
                height={28}
                alt=""
              />
              <span>
                Cekat{" "}
                {product === "crm"
                  ? "CRM"
                  : product === "order"
                    ? "Automation"
                    : product[0].toUpperCase() + product.slice(1)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
