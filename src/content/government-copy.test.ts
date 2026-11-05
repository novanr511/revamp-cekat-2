import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.join(__dirname, "industries", "government");

const EXPECTED_HERO_TITLES = {
  id: "Layanan Publik yang Selalu Hadir untuk Warga",
  en: "Public Service, Ready When Citizens Need It",
  jp: "市民が必要とするとき、いつでもつながる公共サービス",
  kr: "시민이 필요할 때 언제든 연결되는 공공서비스",
  cn: "市民需要时，公共服务始终在线",
} as const;

const EXPECTED_BENEFITS_HEADINGS = {
  id: "Jawab dan Tindak Lanjuti Setiap Pertanyaan Warga",
  en: "Answer and Follow Up on Every Citizen Inquiry",
  jp: "市民からの問い合わせに答え、その後の対応まで追跡",
  kr: "시민 문의에 응답하고 후속 처리까지 추적하세요",
  cn: "回应市民咨询，并跟进后续处理",
} as const;

const REVENUE_LANGUAGE: Record<keyof typeof EXPECTED_HERO_TITLES, RegExp> = {
  id: /revenue|pendapatan|omzet/i,
  en: /revenue|sales|profit/i,
  jp: /収益|売上|利益/,
  kr: /매출|수익|이익/,
  cn: /收入|营收|利润/,
};

describe("government industry copy", () => {
  it("keeps the headline and supporting copy centered on public service in every locale", () => {
    for (const [locale, expectedTitle] of Object.entries(EXPECTED_HERO_TITLES)) {
      const content = JSON.parse(
        fs.readFileSync(path.join(ROOT, `${locale}.json`), "utf8"),
      ) as {
        hero: { title: string; subtitle: string; useCases: string[] };
        benefitsHeading: string;
        cta: { heading: string; body: string };
      };
      const visibleCopy = [
        content.hero.title,
        content.hero.subtitle,
        ...content.hero.useCases,
        content.benefitsHeading,
        content.cta.heading,
        content.cta.body,
      ].join(" ");

      expect(content.hero.title, `${locale} hero title`).toBe(expectedTitle);
      expect(content.benefitsHeading, `${locale} benefits heading`).toBe(
        EXPECTED_BENEFITS_HEADINGS[locale as keyof typeof EXPECTED_BENEFITS_HEADINGS],
      );
      expect(visibleCopy, `${locale} public-service copy`).not.toMatch(
        REVENUE_LANGUAGE[locale as keyof typeof EXPECTED_HERO_TITLES],
      );
    }
  });
});
