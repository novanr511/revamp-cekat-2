import type { Locale } from "@/i18n/routing";

const JOURNEY_NAV_COPY: Record<
  Locale,
  { title: string; hint: string; stages: readonly string[] }
> = {
  en: {
    title: "Customer journey",
    hint: "Select a stage to see how Cekat helps.",
    stages: [
      "Attract customers",
      "Start conversations",
      "Move deals forward",
      "Bring customers back",
      "Understand results",
    ],
  },
  id: {
    title: "Perjalanan pelanggan",
    hint: "Pilih tahap untuk melihat peran Cekat.",
    stages: [
      "Jangkau calon pelanggan",
      "Bangun percakapan",
      "Dorong penjualan",
      "Dorong pembelian ulang",
      "Pahami hasil bisnis",
    ],
  },
  cn: {
    title: "客户旅程",
    hint: "选择一个阶段，了解 Cekat 如何提供帮助。",
    stages: [
      "吸引潜在客户",
      "开启客户对话",
      "推动销售成交",
      "促进客户回购",
      "了解业务成果",
    ],
  },
  jp: {
    title: "カスタマージャーニー",
    hint: "各段階でのCekatの役割を見るには、タブを選択してください。",
    stages: [
      "見込み顧客に届ける",
      "会話を始める",
      "商談を進める",
      "再購入につなげる",
      "成果を把握する",
    ],
  },
  kr: {
    title: "고객 여정",
    hint: "단계를 선택해 Cekat의 역할을 확인하세요.",
    stages: [
      "잠재 고객에게 도달",
      "고객과 대화 시작",
      "영업 기회 진전",
      "고객 재구매 유도",
      "비즈니스 성과 파악",
    ],
  },
};

/** Add navigation affordances without changing the approved stage content. */
export function enhanceRevampHomeJourney(markup: string, locale: Locale) {
  const copy = JOURNEY_NAV_COPY[locale];
  const productsMarkup = markup.match(
    /<div class="products">[\s\S]*?<\/div>/,
  )?.[0];
  let enhancedMarkup = markup;

  if (productsMarkup) {
    let slot = 0;
    const floatingDock = productsMarkup
      .replace(
        '<div class="products">',
        '<div class="products" data-active-count="2">',
      )
      .replace(
        /<li class="product" data-stages="([^"]+)"/g,
        (product, stages: string) => {
          if (!stages.split(" ").includes("acquire")) return product;
          slot += 1;
          return `${product.replace('class="product"', 'class="product is-on"')} data-floating-slot="${slot}"`;
        },
      );

    enhancedMarkup = enhancedMarkup
      .replace(productsMarkup, "")
      .replace(
        /(<div class="feat__stage">\s*)(<div class="feat__frame">)/,
        (_match, stage: string, frame: string) =>
          `${stage}${floatingDock}${frame}`,
      );
  }

  // Render the dock in its final desktop position to avoid showing the
  // original product strip while the client script initializes.
  return enhancedMarkup
    .replaceAll(
      /(<div class="panel[^"]*" role="tabpanel"[^>]*)(>)/g,
      '$1 tabindex="0">',
    )
    .replace(
      /<div class="rail"[^>]*>([\s\S]*?)<\/div>/,
      (_rail, tabs: string) => {
        let index = 0;
        const enhancedTabs = tabs.replace(
          /(<button\b[^>]*)(>)(<span class="rail__dot"><\/span>)([\s\S]*?)(<\/button>)/g,
          (
            _tab,
            opening: string,
            _end: string,
            _dot: string,
            label: string,
          ) => {
            const stageIndex = index++;
            return `${opening} type="button"><span class="rail__dot" aria-hidden="true">${String(stageIndex + 1).padStart(2, "0")}</span><span class="rail__copy"><span class="rail__label">${label}</span><span class="rail__description">${copy.stages[stageIndex]}</span></span><span class="rail__indicator" aria-hidden="true"></span></button>`;
          },
        );

        return `<aside class="journey__nav" aria-label="${copy.title}"><p class="journey__nav-title">${copy.title}</p><p class="journey__nav-hint" id="journey-nav-hint">${copy.hint}</p><div class="rail" role="tablist" aria-label="${copy.title}" aria-describedby="journey-nav-hint" aria-orientation="vertical">${enhancedTabs}</div></aside>`;
      },
    );
}
