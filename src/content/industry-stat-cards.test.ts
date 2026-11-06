import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const CONTENT_ROOT = path.join(__dirname, "industries");
const INDUSTRIES = [
  "healthcare",
  "finance",
  "logistics",
  "education",
  "retail",
  "automotive",
  "travel",
  "property",
] as const;
const LOCALES = ["id", "en", "cn", "jp", "kr"] as const;

const REPLACEMENT_CARDS = {
  finance: {
    id: { value: "UU PDP", label: "akses data nasabah berbasis peran" },
    en: { value: "Role-based", label: "access to sensitive customer data" },
    cn: { value: "角色权限", label: "客户数据仅对授权团队开放" },
    jp: {
      value: "ロールベース",
      label: "権限を持つスタッフのみ顧客情報を閲覧",
    },
    kr: { value: "역할 기반", label: "권한 있는 팀만 고객 데이터에 접근" },
  },
  logistics: {
    id: { value: "API", label: "status kiriman terhubung ke data order" },
    en: { value: "API", label: "tracking reads the latest order data" },
    cn: { value: "API", label: "追踪状态关联最新订单数据" },
    jp: { value: "API", label: "追跡が最新の注文データと連携" },
    kr: { value: "API", label: "배송 추적이 최신 주문 데이터와 연동" },
  },
  automotive: {
    id: { value: "CRM", label: "pipeline untuk leads, test drive, dan servis" },
    en: {
      value: "CRM",
      label: "pipeline for leads, test drives, and service bookings",
    },
    cn: { value: "CRM", label: "线索、试驾与维修预约统一管理" },
    jp: { value: "CRM", label: "リード、試乗、サービス予約を一元管理" },
    kr: { value: "CRM", label: "리드, 시승, 정비 예약을 한곳에서 관리" },
  },
} as const;

function readStats(industry: string, locale: (typeof LOCALES)[number]) {
  const file = path.join(CONTENT_ROOT, industry, `${locale}.json`);
  const content = JSON.parse(fs.readFileSync(file, "utf8")) as {
    stats: Array<{ value: string; label: string }>;
  };
  return content.stats;
}

describe("industry stat cards", () => {
  it.each(INDUSTRIES)(
    "renders exactly four stats for %s in every locale",
    (industry) => {
      for (const locale of LOCALES) {
        const stats = readStats(industry, locale);

        expect(stats, `${industry}/${locale}`).toHaveLength(4);
        expect(
          stats.some((stat) => ["3.000+", "3,000+"].includes(stat.value)),
          `${industry}/${locale} must not show the businesses claim`,
        ).toBe(false);
      }
    },
  );

  it("uses the approved, page-supported replacements instead of new numeric claims", () => {
    for (const [industry, localizedCards] of Object.entries(
      REPLACEMENT_CARDS,
    )) {
      for (const locale of LOCALES) {
        expect(readStats(industry, locale)).toContainEqual(
          localizedCards[locale],
        );
      }
    }
  });
});
