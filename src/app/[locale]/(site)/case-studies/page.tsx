import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { RevampMotion } from "@/components/sections/revamp/motion";
import { RevampCloser } from "@/components/sections/revamp/shared";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import {
  CASE_STUDIES,
  CASE_STUDY_INDUSTRIES,
  filterCaseStudies,
  getCaseStudyIndustry,
  localizeCaseStudy,
} from "@/lib/case-studies";
import { localizeCaseStudyListing } from "@/lib/case-study-listing-copy";
import { metaSnippet, metaTitle, alternates, SITE_URL } from "@/lib/seo";

const COPY = {
  en: {
    eyebrow: "Customer case studies",
    title: "Real businesses, real results with Cekat.AI",
    lead: "See how teams across industries use Cekat.AI to respond faster, convert more, and run leaner operations.",
    featured: "Featured story",
    browse: "Explore customer stories",
    filterLabel: "Filter by industry",
    allIndustries: "All industries",
    caseStudies: "case studies",
    readCase: "Read case study",
    noResults: "No case studies match this industry.",
    breadcrumb: "Case Studies",
    ctaTitle: "What could this look like for your team?",
    ctaBody:
      "Tell us how your team works. We can explore where connected conversations would help.",
  },
  id: {
    eyebrow: "Kisah pelanggan",
    title: "Cara bisnis melayani pelanggan dengan Cekat.AI",
    lead: "Setiap tim punya tantangannya sendiri. Simak cara mereka memakai Cekat.AI untuk menanggapi pelanggan dan mengelola pekerjaan sehari-hari.",
    featured: "Kisah pilihan",
    browse: "Cerita dari pelanggan kami",
    filterLabel: "Pilih industri",
    allIndustries: "Semua industri",
    caseStudies: "studi kasus",
    readCase: "Baca kisahnya",
    noResults: "Belum ada studi kasus di industri ini.",
    breadcrumb: "Studi Kasus",
    ctaTitle: "Ingin membahas kebutuhan tim Anda?",
    ctaBody:
      "Ceritakan cara tim Anda melayani pelanggan. Kami bisa membantu melihat bagian mana yang dapat dibuat lebih mudah dengan Cekat.AI.",
  },
  jp: {
    eyebrow: "導入事例",
    title: "Cekat.AIと歩む、企業の成長ストーリー",
    lead: "さまざまな業界のチームがCekat.AIを活用し、迅速な顧客対応、コンバージョンの向上、効率的な業務運営を実現した事例をご紹介します。",
    featured: "注目の事例",
    browse: "お客様の事例を見る",
    filterLabel: "業界で絞り込む",
    allIndustries: "すべての業界",
    caseStudies: "件の導入事例",
    readCase: "事例を読む",
    noResults: "この業界の導入事例はまだありません。",
    breadcrumb: "導入事例",
    ctaTitle: "あなたのチームではどう活用できますか？",
    ctaBody: "現在の業務をお聞かせください。会話をつなぐ方法を一緒に考えます。",
  },
  kr: {
    eyebrow: "고객 사례",
    title: "Cekat.AI와 함께 만든 실제 고객 성과",
    lead: "다양한 업계의 팀이 Cekat.AI로 더 빠르게 응대하고 전환을 높이며 운영을 효율화한 사례를 확인해 보세요.",
    featured: "주요 사례",
    browse: "고객 사례 살펴보기",
    filterLabel: "업종별 필터",
    allIndustries: "전체 업종",
    caseStudies: "개 고객 사례",
    readCase: "사례 보기",
    noResults: "해당 업종의 고객 사례가 없습니다.",
    breadcrumb: "고객 사례",
    ctaTitle: "우리 팀에는 어떻게 적용할 수 있을까요?",
    ctaBody:
      "팀의 업무 흐름을 알려주세요. 고객 대화를 더 잘 연결할 방법을 함께 살펴보겠습니다.",
  },
  cn: {
    eyebrow: "客户案例",
    title: "真实团队，真实成效：Cekat.AI 客户案例",
    lead: "了解不同行业的团队如何借助 Cekat.AI 更快响应客户、提升转化，并提高运营效率。",
    featured: "精选案例",
    browse: "浏览客户案例",
    filterLabel: "按行业筛选",
    allIndustries: "全部行业",
    caseStudies: "个客户案例",
    readCase: "查看案例",
    noResults: "暂无符合该行业的客户案例。",
    breadcrumb: "客户案例",
    ctaTitle: "您的团队可以如何使用？",
    ctaBody: "告诉我们团队的工作流程，一起看看如何更好地连接客户对话。",
  },
} as const;

const INDUSTRY_LABELS_ID: Record<string, string> = {
  Healthcare: "Kesehatan",
  "Food & Beverage": "Makanan & Minuman",
  Education: "Pendidikan",
  "Professional Services": "Layanan Profesional",
  Property: "Properti",
  Government: "Pemerintahan",
};

const INDUSTRY_LABELS_JP: Record<string, string> = {
  Healthcare: "ヘルスケア",
  "Food & Beverage": "飲食・ホスピタリティ",
  Education: "教育",
  "Professional Services": "専門サービス",
  Property: "不動産",
  Government: "政府・公共サービス",
};

const INDUSTRY_LABELS_KR: Record<string, string> = {
  Healthcare: "헬스케어",
  "Food & Beverage": "식음료·엔터테인먼트",
  Education: "교육",
  "Professional Services": "전문 서비스",
  Property: "부동산",
  Government: "정부·공공 서비스",
};

const INDUSTRY_LABELS_CN: Record<string, string> = {
  Healthcare: "医疗健康",
  "Food & Beverage": "餐饮与娱乐",
  Education: "教育",
  "Professional Services": "专业服务",
  Property: "房地产",
  Government: "政府与公共服务",
};

function copyFor(locale: string) {
  if (locale === "id") return COPY.id;
  if (locale === "jp") return COPY.jp;
  if (locale === "kr") return COPY.kr;
  if (locale === "cn") return COPY.cn;
  return COPY.en;
}

function industryLabel(locale: string, label: string) {
  if (locale === "id") return INDUSTRY_LABELS_ID[label] ?? label;
  if (locale === "jp") return INDUSTRY_LABELS_JP[label] ?? label;
  if (locale === "kr") return INDUSTRY_LABELS_KR[label] ?? label;
  if (locale === "cn") return INDUSTRY_LABELS_CN[label] ?? label;
  return label;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const copy = copyFor(locale);
  const title = metaTitle(`${copy.breadcrumb} — Cekat.AI`);
  const description = metaSnippet(copy.lead, 158);
  const { canonical, languages } = alternates(locale, "/case-studies");

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "CekatAI",
      locale:
        locale === "id"
          ? "id_ID"
          : locale === "jp"
            ? "ja_JP"
            : locale === "kr"
              ? "ko_KR"
              : locale === "cn"
                ? "zh_CN"
                : "en_US",
      type: "website",
      images: [
        { url: "/graph-image.jpg", width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/graph-image.jpg"],
    },
  };
}

export default async function CaseStudiesIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ locale: rawLocale }, query] = await Promise.all([
    params,
    searchParams,
  ]);
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const [tb] = await Promise.all([
    getTranslations({ locale, namespace: "breadcrumb" }),
  ]);
  const copy = copyFor(locale);
  const queryCategory =
    typeof query.category === "string" ? query.category : undefined;
  const activeCategory = getCaseStudyIndustry(queryCategory);
  const studies = filterCaseStudies(queryCategory).map((study) =>
    localizeCaseStudyListing(localizeCaseStudy(study, locale), locale),
  );
  // Keep the hero editorial on the unfiltered directory. A selected industry
  // shows every matching story in the results grid, including the hero story.
  const featured = !activeCategory
    ? (studies.find((study) => study.slug === "euromedica") ?? studies[0])
    : undefined;
  const gridStudies = featured
    ? studies.filter((study) => study.slug !== featured.slug)
    : studies;
  const featuredMetric = featured?.outcomes.find(
    (outcome) => outcome.value === featured.featuredOutcome,
  );
  const listPath = getPathname({ href: "/case-studies", locale });
  const url = `${SITE_URL}${listPath}`;
  const homeUrl = `${SITE_URL}${getPathname({ href: "/", locale })}`;
  const categoryLabel = (label: string) => industryLabel(locale, label);
  const filters = [
    { slug: undefined, label: copy.allIndustries },
    ...CASE_STUDY_INDUSTRIES.map((industry) => ({
      slug: industry.slug,
      label: categoryLabel(industry.label),
    })),
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            url,
            name: `${copy.breadcrumb} — Cekat.AI`,
            description: copy.lead,
            items: CASE_STUDIES.map((study) => ({
              name: study.company,
              url: `${SITE_URL}${getPathname({
                href: {
                  pathname: "/case-studies/[slug]",
                  params: { slug: study.slug },
                },
                locale,
              })}`,
            })),
          }),
          breadcrumbJsonLd([
            { name: tb("home"), url: homeUrl },
            { name: copy.breadcrumb },
          ]),
        ]}
      />

      <RevampMotion className="r-case-index">
        <section className="r-case-index__opening">
          <div className="r-container">
            <header className="r-case-index__intro" data-r-hero>
              <p className="r-kicker">{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p className="r-lede">{copy.lead}</p>
            </header>

            {featured && (
              <div className="r-case-index__featured" data-r-reveal>
                <Link
                  href={{
                    pathname: "/case-studies/[slug]",
                    params: { slug: featured.slug },
                  }}
                  className="r-case-index__featured-link"
                >
                  <div className="r-case-index__featured-copy">
                    <p className="r-case-index__overline">{copy.featured}</p>
                    <div className="r-case-index__brand">
                      <Image
                        src={featured.logo}
                        alt={featured.logoAlt}
                        width={128}
                        height={40}
                      />
                      <span>{categoryLabel(featured.industry)}</span>
                    </div>
                    <h2>{featured.title}</h2>
                    <p className="r-case-index__summary">{featured.summary}</p>
                    {featuredMetric && (
                      <div className="r-case-index__featured-metric">
                        <strong>{featuredMetric.value}</strong>
                        <span>{featuredMetric.label}</span>
                      </div>
                    )}
                    <span className="r-case-index__read">
                      {copy.readCase} <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                  <div className="r-case-index__featured-image">
                    <Image
                      src={featured.image}
                      alt={`${featured.company} — ${categoryLabel(featured.industry)}`}
                      fill
                      priority
                      sizes="(max-width: 800px) 92vw, (max-width: 1200px) 45vw, 580px"
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="r-case-index__listing">
          <div className="r-container">
            <div className="r-case-index__heading">
              <div>
                <p className="r-kicker">{copy.eyebrow}</p>
                <h2>{copy.browse}</h2>
              </div>
              <p className="r-case-index__count" aria-live="polite">
                {studies.length} {copy.caseStudies}
              </p>
            </div>
            <nav
              aria-label={copy.filterLabel}
              className="r-case-index__filters"
            >
              {filters.map((filter) => {
                const selected = filter.slug === activeCategory;
                const href = filter.slug
                  ? `${listPath}?category=${encodeURIComponent(filter.slug)}`
                  : listPath;
                return (
                  <a
                    key={filter.slug ?? "all"}
                    href={href}
                    aria-current={selected ? "page" : undefined}
                  >
                    {filter.label}
                  </a>
                );
              })}
            </nav>

            {gridStudies.length > 0 ? (
              <div className="r-case-index__grid">
                {gridStudies.map((study) => {
                  const metric = study.outcomes.find(
                    (outcome) => outcome.value === study.featuredOutcome,
                  );
                  return (
                    <Link
                      key={study.slug}
                      href={{
                        pathname: "/case-studies/[slug]",
                        params: { slug: study.slug },
                      }}
                      className="r-case-index__card"
                      data-r-reveal
                    >
                      <div className="r-case-index__card-image">
                        <Image
                          src={study.image}
                          alt={`${study.company} — ${categoryLabel(study.industry)}`}
                          fill
                          sizes="(max-width: 700px) 92vw, (max-width: 1050px) 45vw, 380px"
                        />
                      </div>
                      <div className="r-case-index__card-body">
                        <div className="r-case-index__brand">
                          <Image
                            src={study.logo}
                            alt={study.logoAlt}
                            width={112}
                            height={36}
                          />
                          <span>{categoryLabel(study.industry)}</span>
                        </div>
                        <h3>{study.title}</h3>
                        <p className="r-case-index__summary">{study.summary}</p>
                        <div className="r-case-index__card-foot">
                          {metric && (
                            <div className="r-case-index__metric">
                              <strong>{metric.value}</strong>
                              <span>{metric.label}</span>
                            </div>
                          )}
                          <span className="r-case-index__read">
                            {copy.readCase} <span aria-hidden="true">↗</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="r-case-index__empty">{copy.noResults}</p>
            )}
          </div>
        </section>
        <RevampCloser
          heading={copy.ctaTitle}
          body={copy.ctaBody}
          salesLabel={locale === "id" ? "Bicarakan kebutuhan Anda" : undefined}
        />
      </RevampMotion>
    </>
  );
}
