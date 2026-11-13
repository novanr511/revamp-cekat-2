import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getEntryById } from "@/lib/registry";
import { loadLandingContent } from "@/lib/registry/content";
import { localeValue } from "@/lib/locale-value";
import { alternates, metaSnippet, metaTitle, SITE_URL } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { LandingHero } from "./landing-hero";
import { Breadcrumbs } from "./breadcrumbs";
import { DefinitionBlock } from "./definition-block";
import { Pillars } from "./pillars";
import { AlternatingStory } from "./alternating-story";
import { RichFaq } from "./rich-faq";
import { LandingCta } from "./landing-cta";
import { SectionHeading } from "./section-heading";
import { EntryGrid, type EntryCardData } from "./entry-card";
import { ProductSurface } from "./product-surface";

export const FEATURE_PRODUCTS = {
  broadcast: {
    source: "whatsapp-broadcast",
    heroIndex: 0,
    tone: "marketing",
    serviceType: "Segmented WhatsApp broadcast campaigns",
    related: [
      "customer-segmentation",
      "follow-up-automation",
      "whatsapp-business-api",
    ],
    copy: {
      id: {
        label: "Broadcast",
        title: "Kirim Pesan yang Relevan, ke Customer yang Tepat",
      },
      en: {
        label: "Broadcast",
        title: "Reach the Right Customers with Relevant WhatsApp Campaigns",
      },
      cn: { label: "广播", title: "向合适的客户发送相关的 WhatsApp 营销消息" },
      jp: {
        label: "配信",
        title: "適切な顧客に、役立つWhatsAppキャンペーンを届ける",
      },
      kr: {
        label: "브로드캐스트",
        title: "적합한 고객에게 맞춤 WhatsApp 캠페인을 전달하세요",
      },
    },
  },
  otomatisasi: {
    source: "workflow-automation",
    heroIndex: 1,
    tone: "order",
    serviceType: "No-code business workflow automation",
    related: ["follow-up-automation", "crm-automation", "order-automation"],
    copy: {
      id: {
        label: "Otomatisasi",
        title: "Dari Chat Masuk ke Tindak Lanjut, Tanpa Kerja Berulang",
      },
      en: {
        label: "Automation",
        title: "From Incoming Chats to Follow-ups, without Repetitive Work",
      },
      cn: { label: "自动化", title: "从收到消息到后续跟进，告别重复工作" },
      jp: {
        label: "自動化",
        title: "受信チャットからフォローアップまで、繰り返し作業を自動化",
      },
      kr: {
        label: "자동화",
        title: "채팅 수신부터 후속 조치까지, 반복 업무 없이",
      },
    },
  },
  analitik: {
    source: "marketing-analytics",
    heroIndex: 1,
    tone: "marketing",
    serviceType: "Marketing attribution and revenue analytics",
    related: ["meta-ads-integration", "website-tracker", "ads-conversion-api"],
    copy: {
      id: {
        label: "Analitik",
        title: "Lihat Hubungan Iklan, Percakapan, dan Penjualan",
      },
      en: {
        label: "Analytics",
        title: "Connect Your Ads, Conversations, and Sales",
      },
      cn: { label: "分析", title: "看清广告、对话与销售之间的联系" },
      jp: { label: "分析", title: "広告、会話、売上のつながりを可視化" },
      kr: { label: "분석", title: "광고, 대화, 매출의 연결을 확인하세요" },
    },
  },
} as const;

export type FeatureProduct = keyof typeof FEATURE_PRODUCTS;
export type FeatureProductParams = Promise<{ locale: string }>;

const ARTWORK_NOTE: Record<Locale, string> = {
  id: "Gambar di halaman ini adalah ilustrasi fitur Cekat.AI. Data yang ditampilkan merupakan contoh, bukan hasil pelanggan.",
  en: "Images on this page illustrate Cekat.AI features. The data shown is sample data, not customer results.",
  cn: "本页图片用于展示 Cekat.AI 功能。其中的数据为示例，并非客户成果。",
  jp: "このページの画像はCekat.AIの機能を説明するものです。表示データはサンプルで、顧客の実績ではありません。",
  kr: "이 페이지의 이미지는 Cekat.AI 기능을 설명합니다. 표시된 데이터는 예시이며 고객 성과가 아닙니다.",
};

export function featureProductStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function featureProductMetadata(
  product: FeatureProduct,
  params: FeatureProductParams,
): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const config = FEATURE_PRODUCTS[product];
  const content = await loadLandingContent("features", config.source, locale);
  const { canonical, languages } = alternates(locale, `/${product}`);
  const title = metaTitle(
    `${config.copy[locale].label}: ${config.copy[locale].title}`,
  );
  const description = metaSnippet(content.definition, 158);
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "CekatAI",
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

/** New product destinations reuse localized capability copy, not aggregate results.
 * Open alternating chapters explain each capability; curated feature links
 * provide the next level of detail.
 */
export async function FeatureProductLanding({
  product,
  params,
}: {
  product: FeatureProduct;
  params: FeatureProductParams;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const config = FEATURE_PRODUCTS[product];
  const [content, t, tb] = await Promise.all([
    loadLandingContent("features", config.source, locale),
    getTranslations({ locale, namespace: "landing" }),
    getTranslations({ locale, namespace: "breadcrumb" }),
  ]);
  const copy = config.copy[locale];
  const hero = content.benefits[config.heroIndex];
  const url = `${SITE_URL}${getPathname({ locale, href: `/${product}` })}`;
  const related: EntryCardData[] = config.related.flatMap((id) => {
    const entry = getEntryById("features", id);
    const slug = entry?.slugs[locale];
    if (!entry || !slug) return [];
    return [
      {
        title: localeValue(entry.title, locale) ?? entry.id,
        tagline: entry.tagline ? localeValue(entry.tagline, locale) : undefined,
        href: { pathname: "/features/[slug]", params: { slug } },
      },
    ];
  });

  return (
    <ProductSurface product={product}>
      <JsonLd
        data={[
          serviceJsonLd({
            name: `${copy.label} Cekat.AI`,
            description: content.definition,
            url,
            serviceType: config.serviceType,
          }),
          breadcrumbJsonLd([
            {
              name: tb("home"),
              url: `${SITE_URL}${getPathname({ locale, href: "/" })}`,
            },
            { name: copy.label, url },
          ]),
          faqPageJsonLd(content.faq),
        ]}
      />
      <div className="cv-auto">
        <LandingHero
          badge={copy.label}
          title={copy.title}
          subtitle={content.hero.subtitle}
          productImage={hero?.image}
          imageAlt={hero?.imageAlt ?? copy.label}
          visualLabel={hero?.title}
          tone={config.tone}
          staticVisual
        />
      </div>
      <Container>
        <p className="py-4 text-sm leading-relaxed text-muted-foreground">
          {ARTWORK_NOTE[locale]}
        </p>
      </Container>
      <Breadcrumbs
        items={[{ label: tb("home"), href: "/" }, { label: copy.label }]}
      />
      <div className="cv-auto">
        <DefinitionBlock definition={content.definition} />
      </div>
      <div className="cv-auto">
        <Pillars
          eyebrow={t("pillarsEyebrow")}
          heading={t("pillarsHeading")}
          pillars={content.pillars}
        />
      </div>
      <div className="cv-auto">
        <AlternatingStory
          eyebrow={t("benefitsEyebrow")}
          heading={t("tabsHeading")}
          benefits={content.benefits}
        />
      </div>
      <div className="cv-auto">
        <RichFaq
          label={t("faqLabel")}
          heading={t("faqHeading", { title: copy.label })}
          items={content.faq}
        />
      </div>
      {related.length > 0 && (
        <section className="border-t border-foreground/8 bg-surface-muted py-16 md:py-20">
          <Container>
            <SectionHeading
              eyebrow={t("relatedEyebrow")}
              heading={t("related.features")}
            />
            <div className="mt-8">
              <EntryGrid items={related} readMore={t("readMore")} />
            </div>
          </Container>
        </section>
      )}
      <div className="cv-auto">
        <LandingCta heading={content.cta.heading} body={content.cta.body} />
      </div>
    </ProductSurface>
  );
}
