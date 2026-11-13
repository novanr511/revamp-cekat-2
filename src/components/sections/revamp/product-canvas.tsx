"use client";

import Image from "next/image";
import { useState } from "react";
import { RevampIcon } from "./icon";
import { useTranslations } from "next-intl";

type Product = "marketing" | "chat" | "crm" | "order" | "ai";
const campaigns = [
  "Instagram · Summer collection",
  "Meta Ads · Click to WhatsApp",
  "TikTok Ads · New collection",
];

/** Original, interactive product illustration. Sample data is explicitly disclosed. */
export function ProductCanvas({
  product = "chat",
  compact = false,
}: {
  product?: string;
  compact?: boolean;
}) {
  const kind: Product = ["marketing", "crm", "order", "ai"].includes(product)
    ? (product as Product)
    : "chat";
  const [selection, setSelection] = useState(0);
  const t = useTranslations("secondary.preview");
  const chat = kind === "chat" || kind === "ai";
  const tabs = chat
    ? ["WhatsApp", "Instagram", "Web chat"]
    : kind === "crm"
      ? [t("allDeals"), t("priority")]
      : kind === "order"
        ? [t("workflow"), t("activity")]
        : [t("days", { days: 7 }), t("days", { days: 30 })];
  const name =
    kind === "crm"
      ? "CRM"
      : kind === "order"
        ? "Automation"
        : kind === "ai"
          ? "AI Agent"
          : kind === "marketing"
            ? "Marketing"
            : "Chat";
  return (
    <div
      className={`r-canvas ${compact ? "r-canvas--compact" : ""}`}
      data-product={kind}
    >
      <div className="r-canvas__top">
        <span className="r-canvas__brand">
          <Image
            src="/revamp-web-cekat/assets/logo-mark.svg"
            alt=""
            width={22}
            height={22}
          />
          Cekat {name}
        </span>
        <span className="r-canvas__workspace">
          {t("workspace")}
          <span className="r-status-dot" />
        </span>
      </div>
      <div className="r-canvas__body">
        <div className="r-canvas__sidebar" aria-hidden>
          <span className="r-canvas__nav-active">
            <RevampIcon name={chat ? "chat" : "chart"} />
          </span>
          <RevampIcon name="chart" />
          <RevampIcon name="shield" />
          <span className="r-canvas__sidebar-line" />
          <Image
            src="/revamp-web-cekat/assets/logo-mark.svg"
            alt=""
            width={22}
            height={22}
          />
        </div>
        <div className="r-canvas__main">
          <div className="r-canvas__heading">
            <div>
              <span className="r-canvas__eyebrow">
                {chat
                  ? t("inbox")
                  : kind === "crm"
                    ? t("salesWorkspace")
                    : kind === "order"
                      ? t("builder")
                      : t("overview")}
              </span>
              <strong className="r-canvas__title">
                {t(
                  chat
                    ? "chatTitle"
                    : kind === "crm"
                      ? "crmTitle"
                      : kind === "order"
                        ? "orderTitle"
                        : "marketingTitle",
                )}
              </strong>
            </div>
            <div className="r-canvas__tabs" role="group" aria-label={t("view")}>
              {tabs.map((tab, i) => (
                <button
                  type="button"
                  aria-pressed={selection === i}
                  onClick={() => setSelection(i)}
                  key={tab}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {chat ? (
            <div className="r-inbox">
              <div className="r-inbox__list">
                <div className="r-inbox__list-label">
                  {t("conversations")}
                  <span>3</span>
                </div>
                {[t("enquiry"), t("consultation"), t("followUp")].map(
                  (text, i) => (
                    <div
                      className={`r-inbox__contact ${i === 0 ? "is-selected" : ""}`}
                      key={text}
                    >
                      <span className="r-inbox__contact-icon">
                        <RevampIcon name="chat" />
                      </span>
                      <div>
                        <strong>{text}</strong>
                        <p>
                          {i === 0
                            ? tabs[selection]
                            : i === 1
                              ? "WhatsApp"
                              : "Instagram"}
                        </p>
                      </div>
                      <span className="r-status-dot" />
                    </div>
                  ),
                )}
              </div>
              <div className="r-conversation">
                <div className="r-conversation__header">
                  <span>{tabs[selection]}</span>
                  <span className="r-ai-status">
                    <RevampIcon name="check" size="0.9rem" />
                    AI Agent
                  </span>
                </div>
                <div className="r-conversation__messages" aria-live="polite">
                  <p className="r-bubble r-bubble--customer">
                    {t(
                      selection === 1
                        ? "customerInstagram"
                        : selection === 2
                          ? "customerWeb"
                          : "customerWhatsapp",
                    )}
                  </p>
                  <div className="r-agent-label">
                    <Image
                      src="/revamp-web-cekat/assets/logo-mark.svg"
                      width={17}
                      height={17}
                      alt=""
                    />
                    Cekat AI Agent
                  </div>
                  <p className="r-bubble r-bubble--agent">{t("agentReply")}</p>
                  <div className="r-booking">
                    <RevampIcon name="check" />
                    <div>
                      <strong>{t("context")}</strong>
                      <span>{t("handoff")}</span>
                    </div>
                  </div>
                </div>
                <div className="r-conversation__composer">
                  {t("composer")}
                  <RevampIcon name="arrow" />
                </div>
              </div>
            </div>
          ) : kind === "crm" ? (
            <div className="r-pipeline" aria-live="polite">
              {[t("newLead"), t("contacted"), t("proposal"), t("won")].map(
                (stage, i) => (
                  <div className="r-pipeline__column" key={stage}>
                    <div className="r-pipeline__stage">
                      <span />
                      {stage}
                      <small>{selection === 1 && i === 0 ? "0" : "1"}</small>
                    </div>
                    {!(selection === 1 && i === 0) && (
                      <div className="r-deal">
                        <span className="r-deal__source">
                          {i % 2 === 0 ? "WhatsApp" : "Instagram"}
                        </span>
                        <strong>
                          {
                            [
                              "Studio Aruna",
                              "Nusa Living",
                              "Atelier & Co.",
                              "Bumi Collective",
                            ][i]
                          }
                        </strong>
                        <p>{t("needs")}</p>
                        <span className="r-deal__value">
                          IDR {i + 1}5.000.000
                        </span>
                        <div className="r-deal__footer">
                          <span>{t(i === 3 ? "closed" : "scheduled")}</span>
                          <RevampIcon name="check" size="1rem" />
                        </div>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          ) : kind === "order" ? (
            <div className="r-automation" aria-live="polite">
              {selection === 0 ? (
                <>
                  {[
                    t("received"),
                    t("intent"),
                    t("createOrder"),
                    t("confirm"),
                  ].map((label, i) => (
                    <div className="r-flow-step" key={label}>
                      <span className="r-flow-step__number">0{i + 1}</span>
                      <RevampIcon
                        name={i === 0 ? "chat" : i === 3 ? "check" : "chart"}
                      />
                      <strong>{label}</strong>
                      <span className="r-flow-step__tag">
                        {t(i === 0 ? "trigger" : "action")}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="r-flow-activity">
                  <RevampIcon name="check" size="2rem" />
                  <h4>{t("activityTitle")}</h4>
                  <p>{t("activityBody")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="r-marketing" aria-live="polite">
              <div className="r-marketing__metrics">
                {[t("incoming"), t("qualified"), t("revenue")].map(
                  (label, i) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>
                        {i === 0
                          ? selection === 0
                            ? "1,248"
                            : "4,962"
                          : i === 1
                            ? selection === 0
                              ? "386"
                              : "1,540"
                            : selection === 0
                              ? "IDR 96.4M"
                              : "IDR 382M"}
                      </strong>
                      <small>
                        <RevampIcon name="diagonal" size="0.8rem" />
                        {t("source")}
                      </small>
                    </div>
                  ),
                )}
              </div>
              <div className="r-marketing__chart">
                <div className="r-marketing__chart-title">
                  <strong>{t("performance")}</strong>
                  <span>
                    <i />
                    {t("revenue")}
                    <i />
                    {t("leads")}
                  </span>
                </div>
                <div className="r-bars" role="img" aria-label={t("chart")}>
                  {[34, 48, 42, 62, 54, 73, 88, 72, 86, 95, 84, 100].map(
                    (h, i) => (
                      <div key={i}>
                        <span
                          style={{
                            height: `${selection === 0 ? h : Math.max(24, h - (i % 3) * 12)}%`,
                          }}
                        />
                        <span style={{ height: `${h * 0.6}%` }} />
                      </div>
                    ),
                  )}
                </div>
                <div className="r-bars__labels">
                  <span>{t("start")}</span>
                  <span>{t("today")}</span>
                </div>
              </div>
              <div className="r-campaigns">
                {campaigns.map((campaign, i) => (
                  <div key={campaign}>
                    <span className="r-campaigns__source">
                      <Image
                        src={`/revamp-web-cekat/assets/integrations/${i === 0 ? "instagram" : i === 1 ? "meta" : "tiktok"}.svg`}
                        width={20}
                        height={20}
                        alt=""
                      />
                      {campaign}
                    </span>
                    <span className="r-campaigns__track">{t("tracked")}</span>
                    <span>{["IDR 42.8M", "IDR 35.6M", "IDR 18M"][i]}</span>
                    <RevampIcon name="diagonal" size="1rem" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="r-canvas__foot">
        <span className="r-status-dot" />
        <span>{t("sample")}</span>
        <span>Cekat.AI</span>
      </div>
    </div>
  );
}
