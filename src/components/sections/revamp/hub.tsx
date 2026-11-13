import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { RevampMotion } from "./motion";
import { RevampIcon } from "./icon";
import { RevampActions, RevampCloser, RevampPlatformStrip } from "./shared";
import { HubDirectory, type DirectoryEntry } from "./hub-directory";
import { useTranslations } from "next-intl";

export function RevampHub({
  entries,
  industry,
  heading,
  body,
  definition,
  directoryHeading,
}: {
  entries: DirectoryEntry[];
  industry: boolean;
  heading: string;
  body: string;
  definition: string;
  directoryHeading: string;
}) {
  const t = useTranslations("secondary");
  const featured = industry
    ? ["healthcare", "retail", "education", "fnb"].flatMap(
        (id) => entries.find((e) => e.id === id) || [],
      )
    : ["chat", "crm", "marketing", "ai"].flatMap(
        (category) => entries.find((e) => e.category === category) || [],
      );
  return (
    <RevampMotion
      className={`r-hub ${industry ? "r-hub--industry" : "r-hub--features"}`}
      tone={industry ? "industry" : "crm"}
    >
      <section className="r-hub-hero">
        <div className="r-container">
          <p className="r-kicker" data-r-hero>
            {t(industry ? "industryKicker" : "featureKicker")}
          </p>
          <div className="r-hub-hero__heading">
            <h1 data-r-hero>
              {industry ? (
                <>
                  {t("business")}
                  <br />
                  <span>{t("possibilities")}</span>
                </>
              ) : (
                heading
              )}
            </h1>
            <div data-r-hero>
              <p className="r-lede">{body}</p>
              <RevampActions explore="#directory" />
            </div>
          </div>
          <div className="r-hub-featured" data-r-hero>
            {featured.map((entry, i) => (
              <Link
                key={entry.id}
                href={{
                  pathname: industry
                    ? "/industries/[slug]"
                    : "/features/[slug]",
                  params: { slug: entry.slug },
                }}
                className="r-hub-featured__card"
              >
                {entry.image ? (
                  <div className="r-hub-featured__image">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      preload
                      fetchPriority={i === 0 ? "high" : "auto"}
                      sizes="(max-width: 700px) 45vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="r-hub-featured__product">
                    <Image
                      src={`/revamp-web-cekat/assets/products/${entry.category === "ai" ? "chat" : entry.category === "order" ? "automation" : entry.category}.svg`}
                      alt=""
                      width={72}
                      height={72}
                    />
                    <span>
                      Cekat{" "}
                      {entry.category === "crm"
                        ? "CRM"
                        : entry.category === "ai"
                          ? "AI"
                          : entry.category}
                    </span>
                  </div>
                )}
                <div className="r-hub-featured__copy">
                  <div>
                    <span className="r-hub-featured__index">0{i + 1}</span>
                    <h2>{entry.title}</h2>
                    {entry.tagline && <p>{entry.tagline}</p>}
                  </div>
                  <RevampIcon name="diagonal" />
                </div>
              </Link>
            ))}
          </div>
          <div className="r-hub-hero__foot">
            <span>{t("smallTeams")}</span>
            <a href="#directory">
              {t("exploreAll")}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </section>
      <RevampPlatformStrip />
      <section className="r-hub-intro r-section">
        <div className="r-container r-introduction__layout" data-r-reveal>
          <p className="r-kicker">{t("foundation")}</p>
          <div>
            <h2>{t(industry ? "journey" : "teamFlow")}</h2>
            <p className="r-lede">{definition}</p>
          </div>
        </div>
      </section>
      <HubDirectory
        entries={entries}
        industry={industry}
        heading={directoryHeading}
      />
      <section className="r-hub-consult">
        <div className="r-container" data-r-reveal>
          <div>
            <p className="r-kicker">{t("unique")}</p>
            <h2>{t("specific")}</h2>
            <p>{t("specificBody")}</p>
          </div>
          <Link href="/contact-sales" className="r-button r-button--primary">
            {t("talk")}
            <RevampIcon name="diagonal" />
          </Link>
        </div>
      </section>
      <RevampCloser heading={t("hubCta")} body={t("hubCtaBody")} />
    </RevampMotion>
  );
}
