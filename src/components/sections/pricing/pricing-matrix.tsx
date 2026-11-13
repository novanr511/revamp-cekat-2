"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatIDR, showsPrices, type Plan } from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { PricingCell } from "./pricing-cell";

/**
 * Full feature matrix for one product. Scrolls horizontally on small screens
 * rather than squashing four tiers into a phone width.
 */
export function PricingMatrix({ plan }: { plan: Plan }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("pricing");
  const tp = useTranslations(`pricing.${plan.id}`);
  const value = (key: string) => t(`values.${key}`);
  const priced = showsPrices(locale);

  return (
    <div className="pricing-comparison mt-14">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id={`pricing-comparison-${plan.id}`}
          className="mb-4 font-numeric text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          {t("compareHeading")}
        </h2>
        <p className="font-numeric text-base text-muted-foreground">
          {t("compareIntro")}
        </p>
      </div>

      <div
        role="region"
        aria-labelledby={`pricing-comparison-${plan.id}`}
        tabIndex={0}
        className="pricing-table-scroll mt-8 overflow-x-auto rounded-[1.35rem] border border-border bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <table
          aria-labelledby={`pricing-comparison-${plan.id}`}
          className="w-full min-w-[46rem] border-collapse text-left"
        >
          <thead>
            <tr className="border-b border-border bg-surface-subtle">
              <th
                scope="col"
                className="px-4 py-3 font-numeric text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {t("featureColumn")}
              </th>
              {plan.tiers.map((tier) => (
                <th
                  key={tier.id}
                  scope="col"
                  className={cn(
                    "px-4 py-3 align-top",
                    tier.popular && "bg-primary/5",
                  )}
                >
                  <span className="block font-numeric text-sm font-semibold text-foreground">
                    {tp(`tiers.${tier.id}.name`)}
                  </span>
                  {/* Unpriced locales show the tier name alone. */}
                  {(priced || tier.quoteOnly) && (
                    <span className="mt-0.5 block font-numeric text-xs font-medium text-muted-foreground">
                      {tier.quoteOnly
                        ? t("customPrice")
                        : `${formatIDR(tier.priceIDR!, locale)}${t("perMonth")}`}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plan.rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-b-0"
              >
                <th
                  scope="row"
                  className="px-4 py-3 font-numeric text-sm font-medium text-foreground"
                >
                  {tp(`rows.${row.id}`)}
                </th>
                {row.cells.map((cell, index) => (
                  <td
                    key={plan.tiers[index].id}
                    className={cn(
                      "px-4 py-3",
                      plan.tiers[index].popular && "bg-primary/5",
                    )}
                  >
                    <PricingCell
                      cell={cell}
                      locale={locale}
                      value={value}
                      includedLabel={value("included")}
                      notIncludedLabel={value("notIncluded")}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
