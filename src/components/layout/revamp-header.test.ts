import { describe, expect, it } from "vitest";
import cnMessages from "../../../messages/cn.json";
import { revampHeaderMarkup } from "./revamp-header-markup";
import { localizeRevampHeaderMarkup } from "./revamp-header";

const MENU_PREVIEW_COPY = [
  "Leads by source",
  "Meta ads",
  "Creator links",
  "TikTok ads",
  "Website",
  "Is this still in stock?",
  "Yes! Which size do you need?",
  "M, two please",
  "Done. Shall I send the payment link?",
  "Pipeline",
  "New",
  "Cafe chain",
  "Office supply",
  "Qualified",
  "Clinic group",
  "Won",
  "Retail restock",
  "Broadcast · Serum buyers",
  "Hi Rina, your 3-in-1 serum set is back in stock. Reorder today for free shipping.",
  "Sent 2,140",
  "Opened 68%",
  "Replied 31%",
  "When an order is paid",
  "Wait 3 days",
  "Send care tips on WhatsApp",
  "Add label: Repeat buyer",
  "Remind in 30 days",
  "This month",
  "Leads",
  "Proposal",
] as const;

describe("revamp header links", () => {
  it.each(["id", "en", "cn", "jp", "kr"] as const)(
    "links capability menus to standalone product pages in %s",
    (locale) => {
      const markup = localizeRevampHeaderMarkup(revampHeaderMarkup, locale);
      const prefix = locale === "id" ? "" : `/${locale}`;
      for (const [key, route] of [
        ["broadcasts", "broadcast"],
        ["automation", "otomatisasi"],
        ["analytics", "analitik"],
      ]) {
        expect(markup).toMatch(
          new RegExp(
            `<a class="mitem" href="${prefix}/${route}"[^>]*data-prev="${key}"`,
          ),
        );
      }
      expect(markup).toContain(
        `href="${prefix}/${locale === "id" ? "integrasi" : "integrations"}"`,
      );
    },
  );

  it.each([
    ["en", "Free trial", "Start free trial"],
    ["id", "Coba Gratis", "Mulai uji coba gratis"],
    ["cn", "免费试用", "开始免费试用"],
    ["jp", "無料体験", "無料トライアルを始める"],
    ["kr", "무료 체험", "무료 체험 시작"],
  ] as const)(
    "localizes a compact mobile trial CTA in %s and retains its full accessible label",
    (locale, mobileLabel, fullLabel) => {
      const markup = localizeRevampHeaderMarkup(revampHeaderMarkup, locale);

      expect(markup).toContain(`data-mobile-label="${mobileLabel}"`);
      expect(markup).toContain(`aria-label="${fullLabel}"`);
    },
  );

  it.each([
    ["en", "/en/blog", "/en/contact-us", "Blog", "Talk to sales"],
    ["id", "/blog", "/contact-us", "Blog", "Hubungi tim sales"],
    ["cn", "/cn/blog", "/cn/contact-us", "博客", "联系销售"],
    ["jp", "/jp/blog", "/jp/contact-us", "ブログ", "営業に相談"],
    ["kr", "/kr/blog", "/kr/contact-us", "블로그", "영업팀 문의"],
  ] as const)(
    "adds Blog and links sales CTAs to Contact Us in %s",
    (locale, blogHref, contactHref, blogLabel, salesLabel) => {
      const markup = localizeRevampHeaderMarkup(revampHeaderMarkup, locale);

      expect(markup).toContain(
        `<a class="mnav__link" href="${blogHref}">${blogLabel}</a>`,
      );
      expect(markup).toContain(
        `<a class="btn btn--ghost" href="${contactHref}">${salesLabel}</a>`,
      );
      expect(markup).not.toContain("data-demo>Talk to sales</button>");
    },
  );

  it("localizes the Indonesian dropdown previews", () => {
    const markup = localizeRevampHeaderMarkup(revampHeaderMarkup, "id");

    for (const translated of [
      "Ketahui iklan dan kreator yang menghasilkan pendapatan.",
      "Apakah ini masih tersedia?",
      "Perlengkapan kantor",
      "Kirim tips perawatan via WhatsApp",
      "Lihat semua industri",
    ]) {
      expect(markup).toContain(translated);
    }

    for (const source of [
      "Know which ads and creators bring revenue.",
      "Is this still in stock?",
      "Office supply",
      "Send care tips on WhatsApp",
      "Explore all industries",
    ]) {
      expect(markup).not.toContain(source);
    }
  });

  it("keeps the Chinese chat preview and product badge in Chinese", () => {
    const markup = localizeRevampHeaderMarkup(revampHeaderMarkup, "cn");

    for (const translated of [
      "这个还有库存吗？",
      "有的！您需要什么尺码？",
      "M码，两件。",
      "好了，需要我发送付款链接吗？",
    ]) {
      expect(markup).toContain(translated);
    }

    for (const source of [
      "Is this still in stock?",
      "Yes! Which size do you need?",
      "M, two please",
      "Done. Shall I send the payment link?",
    ]) {
      expect(markup).not.toContain(source);
    }

    expect(cnMessages.nav.chat).toBe("聊天");
  });

  it.each([
    [
      "id",
      "Broadcast · Pembeli serum",
      "Hai Rina, set serum 3-in-1 Anda tersedia kembali. Pesan ulang hari ini untuk mendapat gratis ongkir.",
      "Dikirim 2.140",
    ],
    [
      "cn",
      "广播 · 精华液购买者",
      "嗨，Rina，您的三合一精华套装已补货。今天重新下单即可享受免运费。",
      "已发送 2,140",
    ],
    [
      "jp",
      "配信 · 美容液の購入者",
      "Rinaさん、3-in-1美容液セットが再入荷しました。本日中の再注文で送料無料です。",
      "送信 2,140件",
    ],
    [
      "kr",
      "브로드캐스트 · 세럼 구매 고객",
      "Rina님, 3-in-1 세럼 세트가 재입고됐어요. 오늘 재주문하시면 배송비가 무료예요.",
      "발송 2,140",
    ],
  ] as const)(
    "localizes the broadcast preview and all menu preview copy in %s",
    (locale, title, message, sent) => {
      const markup = localizeRevampHeaderMarkup(revampHeaderMarkup, locale);

      for (const translated of [title, message, sent]) {
        expect(markup).toContain(`>${translated}<`);
      }

      for (const source of MENU_PREVIEW_COPY) {
        expect(markup).not.toContain(`>${source}<`);
      }
    },
  );
});
