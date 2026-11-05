"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@iconify/react/offline";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  COMPANY_SIZE_OPTIONS,
  COUNTRY_OPTIONS,
  DEFAULT_COUNTRY_DIAL,
  JOB_TITLE_OPTIONS,
  digitsOnly,
  type CountryDial,
} from "@/lib/contact-sales";
import { WHATSAPP_URL } from "@/lib/links";
import {
  lucideAlertCircle,
  mdiCheckDecagramOutline,
  mdiWhatsapp,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type ErrorKind = "required" | "email" | "phone";
type FieldName =
  "fullName" | "company" | "email" | "phone" | "jobTitle" | "companySize";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  countryCode: CountryDial;
  phone: string;
  jobTitle: string;
  companySize: string;
};

const INITIAL: FormState = {
  fullName: "",
  company: "",
  email: "",
  countryCode: DEFAULT_COUNTRY_DIAL,
  phone: "",
  jobTitle: "",
  companySize: "",
};

const ERROR_MESSAGE_KEY: Record<ErrorKind, string> = {
  required: "errorRequired",
  email: "errorEmail",
  phone: "errorPhone",
};

const JOB_TITLE_MESSAGE_KEY: Record<
  (typeof JOB_TITLE_OPTIONS)[number],
  string
> = {
  staff: "jobTitleStaff",
  lead: "jobTitleLead",
  management: "jobTitleManagement",
  "c-level": "jobTitleCLevel",
};

const COUNTRY_FLAGS: Record<CountryDial, string> = {
  "+62": "🇮🇩",
  "+60": "🇲🇾",
  "+65": "🇸🇬",
  "+1": "🇺🇸",
  "+61": "🇦🇺",
  "+63": "🇵🇭",
  "+84": "🇻🇳",
  "+66": "🇹🇭",
  "+91": "🇮🇳",
  "+86": "🇨🇳",
  "+81": "🇯🇵",
  "+82": "🇰🇷",
  "+852": "🇭🇰",
  "+886": "🇹🇼",
  "+971": "🇦🇪",
  "+966": "🇸🇦",
  "+31": "🇳🇱",
  "+49": "🇩🇪",
  "+44": "🇬🇧",
};

function validate(state: FormState): Partial<Record<FieldName, ErrorKind>> {
  const errors: Partial<Record<FieldName, ErrorKind>> = {};
  const email = state.email.trim();

  if (!state.fullName.trim()) errors.fullName = "required";
  if (!state.company.trim()) errors.company = "required";
  if (!email) errors.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "email";
  }

  const phone = digitsOnly(state.phone);
  if (phone.length < 6 || phone.length > 20) errors.phone = "phone";
  if (!state.jobTitle) errors.jobTitle = "required";
  if (!state.companySize) errors.companySize = "required";

  return errors;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: ErrorKind;
  children: ReactNode;
}) {
  const t = useTranslations("contactSales.form");

  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
        <span aria-hidden="true" className="ml-0.5 text-destructive">
          *
        </span>
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="mt-1.5 flex items-start gap-1 text-xs font-medium text-[#bd2727]"
        >
          <Icon icon={lucideAlertCircle} className="mt-px size-3.5 shrink-0" />
          {t(ERROR_MESSAGE_KEY[error])}
        </p>
      ) : null}
    </div>
  );
}

export function ContactSalesForm() {
  const t = useTranslations("contactSales.form");
  const pageT = useTranslations("contactSales");
  const locale = useLocale();
  const uid = useId();
  const [state, setState] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<FieldName, ErrorKind>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");

  const id = (name: string) => `${uid}-${name}`;
  const invalid = (name: FieldName) => Boolean(errors[name]);
  const inputClass =
    "h-11 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-foreground transition-colors placeholder:text-subtle-foreground hover:border-subtle-foreground/50 focus:border-primary focus:ring-3 focus:ring-primary/15 focus:outline-none";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) =>
      previous[key as FieldName] ? { ...previous, [key]: undefined } : previous,
    );
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(state);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0] as FieldName | undefined;
      if (first) document.getElementById(id(first))?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          locale,
          page: window.location.pathname,
        }),
      });

      if (response.status === 400) {
        const body = (await response.json().catch(() => null)) as {
          field?: string;
        } | null;
        if (body?.field && body.field in INITIAL) {
          setErrors({ [body.field]: "required" } as Partial<
            Record<FieldName, ErrorKind>
          >);
          document.getElementById(id(body.field))?.focus();
        }
        setStatus("error");
        return;
      }

      if (!response.ok) throw new Error("Request failed");
      setState(INITIAL);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-6 sm:p-8"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-[#22a65a] text-white">
          <Icon icon={mdiCheckDecagramOutline} className="size-6" />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-[#172033]">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#667085]">
          {t("successBody")}
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
        >
          <Icon icon={mdiWhatsapp} className="size-4.5" />
          {t("whatsappCta")}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <h2 className="text-center text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {pageT("formHeading")}
      </h2>
      <p className="mt-2 text-center text-sm leading-5 text-muted-foreground">
        {pageT("formSubheading")}
      </p>

      <div className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2">
        <Field
          label={t("fullNameLabel")}
          htmlFor={id("fullName")}
          error={errors.fullName}
        >
          <input
            id={id("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={state.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            placeholder={t("fullNamePlaceholder")}
            aria-invalid={invalid("fullName")}
            aria-describedby={
              invalid("fullName") ? `${id("fullName")}-error` : undefined
            }
            className={cn(
              inputClass,
              invalid("fullName") && "border-destructive",
            )}
          />
        </Field>

        <Field
          label={t("companyLabel")}
          htmlFor={id("company")}
          error={errors.company}
        >
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            required
            value={state.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder={t("companyPlaceholder")}
            aria-invalid={invalid("company")}
            aria-describedby={
              invalid("company") ? `${id("company")}-error` : undefined
            }
            className={cn(
              inputClass,
              invalid("company") && "border-destructive",
            )}
          />
        </Field>

        <Field
          label={t("emailLabel")}
          htmlFor={id("email")}
          error={errors.email}
        >
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={state.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder={t("emailPlaceholder")}
            aria-invalid={invalid("email")}
            aria-describedby={
              invalid("email") ? `${id("email")}-error` : undefined
            }
            className={cn(
              inputClass,
              invalid("email") && "border-destructive",
            )}
          />
        </Field>

        <Field
          label={t("phoneLabel")}
          htmlFor={id("phone")}
          error={errors.phone}
        >
          <div
            className={cn(
              "flex h-11 min-w-0 items-center rounded-lg border border-border bg-white transition-colors hover:border-subtle-foreground/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15",
              invalid("phone") && "border-destructive",
            )}
          >
            <div className="relative flex h-full shrink-0 items-center gap-1.5 rounded-l-lg pr-2.5 pl-3 font-numeric text-sm text-foreground tabular-nums">
              <span aria-hidden="true">{COUNTRY_FLAGS[state.countryCode]}</span>
              <span aria-hidden="true">{state.countryCode}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-3.5 text-subtle-foreground"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className="sr-only" htmlFor={id("countryCode")}>
                {t("countryCodeLabel")}
              </label>
              <select
                id={id("countryCode")}
                name="countryCode"
                value={state.countryCode}
                onChange={(event) =>
                  update("countryCode", event.target.value as CountryDial)
                }
                aria-label={t("countryCodeLabel")}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {COUNTRY_OPTIONS.map((country) => (
                  <option key={country.dial} value={country.dial}>
                    {COUNTRY_FLAGS[country.dial]} {country.name} ({country.dial})
                  </option>
                ))}
              </select>
            </div>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              autoComplete="tel-national"
              inputMode="tel"
              required
              value={state.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder={t("phonePlaceholder")}
              aria-invalid={invalid("phone")}
              aria-describedby={
                invalid("phone") ? `${id("phone")}-error` : undefined
              }
              className="h-full min-w-0 flex-1 rounded-r-lg bg-transparent px-3 font-numeric text-sm text-foreground tabular-nums placeholder:text-subtle-foreground focus:outline-none"
            />
          </div>
        </Field>

        <Field
          label={t("jobTitleLabel")}
          htmlFor={id("jobTitle")}
          error={errors.jobTitle}
        >
          <select
            id={id("jobTitle")}
            name="jobTitle"
            required
            value={state.jobTitle}
            onChange={(event) => update("jobTitle", event.target.value)}
            aria-invalid={invalid("jobTitle")}
            aria-describedby={
              invalid("jobTitle") ? `${id("jobTitle")}-error` : undefined
            }
            className={cn(
              inputClass,
              "cursor-pointer appearance-none pr-10",
              !state.jobTitle && "text-subtle-foreground",
              invalid("jobTitle") && "border-destructive",
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E\")",
              backgroundPosition: "right 12px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "18px",
            }}
          >
            <option value="">{t("jobTitlePlaceholder")}</option>
            {JOB_TITLE_OPTIONS.map((title) => (
              <option key={title} value={title} className="text-[#202630]">
                {t(JOB_TITLE_MESSAGE_KEY[title])}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={t("companySizeLabel")}
          htmlFor={id("companySize")}
          error={errors.companySize}
        >
          <select
            id={id("companySize")}
            name="companySize"
            required
            value={state.companySize}
            onChange={(event) => update("companySize", event.target.value)}
            aria-invalid={invalid("companySize")}
            aria-describedby={
              invalid("companySize") ? `${id("companySize")}-error` : undefined
            }
            className={cn(
              inputClass,
              "cursor-pointer appearance-none pr-10",
              !state.companySize && "text-subtle-foreground",
              invalid("companySize") && "border-destructive",
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E\")",
              backgroundPosition: "right 12px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "18px",
            }}
          >
            <option value="">{t("companySizePlaceholder")}</option>
            {COMPANY_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size} className="text-[#202630]">
                {size}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-10 h-12 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>

      <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        {t("consentLead")}{" "}
        <Link
          href="/terms-and-conditions"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          {t("termsLink")}
        </Link>{" "}
        {t("consentAnd")}{" "}
        <Link
          href="/privacy-policy"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          {t("privacyLink")}
        </Link>
        .
      </p>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-destructive/25 bg-destructive/[0.06] px-4 py-3 text-sm font-medium text-destructive"
        >
          {t("error")}
          <span className="mt-0.5 block font-normal text-muted-foreground">
            {t("errorBody")}
          </span>
        </p>
      ) : null}
    </form>
  );
}
