import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/logo";
import { ContactSalesForm } from "./contact-sales-form";
import { ContactSalesLogos } from "./contact-sales-logos";

/**
 * Standalone contact page, matching the live split hero/form/story layout.
 */
export function ContactSalesHero() {
  const t = useTranslations("contactSales");
  const support = useTranslations("contact.support");

  return (
    <section className="relative isolate grid min-w-0 overflow-x-clip lg:min-h-svh lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 lg:block">
        <Image
          src="/images/contact/bg-contact.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-[15%_35%]"
        />
        <div className="absolute inset-0 bg-[#0b1a33]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_35%_22%,rgb(11_26_51/0.2),transparent_75%)]" />
      </div>

      <div className="relative isolate min-w-0 px-4 pt-5 pb-8 sm:px-10 lg:px-14 lg:pt-8 lg:pb-6 xl:px-20">
        <div className="absolute inset-0 -z-10 lg:hidden">
          <Image
            src="/images/contact/bg-contact.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[15%_35%]"
          />
          <div className="absolute inset-0 bg-[#0b1a33]/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_35%_22%,rgb(11_26_51/0.2),transparent_75%)]" />
        </div>
        <Link
          href="/"
          aria-label={t("backHome")}
          className="grid size-11 place-items-center rounded-lg bg-white text-foreground shadow-card transition-colors hover:bg-surface-subtle focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-5"
          >
            <path
              d="M19 12H5m0 0 7 7m-7-7 7-7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="mt-8 max-w-lg text-3xl leading-tight font-light tracking-tight text-balance text-white sm:text-4xl lg:mt-14 lg:text-[3.25rem] lg:leading-[1.08]">
          {t("heroHeading")}
        </h1>
        <p className="mt-3 max-w-md text-base text-white/90 [text-shadow:0_1px_2px_rgb(0_0_0/0.25)] lg:text-lg">
          {t("heroSubheading")}
        </p>
      </div>

      <div className="relative min-w-0 bg-white px-4 pt-8 pb-10 sm:px-10 sm:pt-12 sm:pb-14 lg:row-span-2 lg:flex lg:items-center lg:px-14 lg:py-10 xl:px-20">
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <span className="absolute inset-y-0 left-8 border-l border-dashed border-border lg:left-12" />
          <span className="absolute inset-y-0 right-8 border-r border-dashed border-border lg:right-12" />
          <span className="absolute inset-x-0 top-8 border-t border-dashed border-border" />
          <span className="absolute inset-x-0 bottom-8 border-b border-dashed border-border" />
        </div>
        <div className="relative mx-auto w-full max-w-lg min-w-0">
          <Link
            href="/"
            aria-label="Cekat.AI"
            className="mx-auto mb-6 block w-fit"
          >
            <Logo className="h-auto w-[161px]" />
          </Link>
          <ContactSalesForm />

          <div className="mt-10 border-t border-dashed border-border pt-6">
            <p className="text-center text-sm leading-relaxed text-muted-foreground">
              {support("note")}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold text-primary">
              <a
                href="https://docs.cekat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {support("helpCentre")}
              </a>
              <a
                href="mailto:support@cekat.ai"
                className="inline-flex min-h-6 items-center underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {support("emailSupport")}
              </a>
              <a
                href="https://wa.me/628786761790"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {support("contactCentre")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactSalesLogos />
    </section>
  );
}
