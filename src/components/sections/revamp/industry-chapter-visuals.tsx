import { useTranslations } from "next-intl";
import type { IndustryVisualName } from "@/lib/registry/types";
import { RevampIcon } from "./icon";

export const INDUSTRY_CHAPTER_VISUALS = {
  airlines: [
    "industryKnowledge",
    "industryLanguages",
    "industryBroadcast",
    "industryHandoff",
  ],
  healthcare: ["industryBooking", "industryInbox", "industryTicketQueue"],
  barbershop: [
    "industryBooking",
    "industryAutomation",
    "industryContactRecord",
    "industryBroadcast",
  ],
  "beauty-wellness": [
    "industryBooking",
    "industryAutomation",
    "industryBroadcast",
    "industryInbox",
  ],
  clinics: [
    "industryBooking",
    "industryAutomation",
    "industryContactRecord",
    "industryHandoff",
  ],
  dental: [
    "industryBooking",
    "industryAutomation",
    "industryInbox",
    "industryKnowledge",
  ],
  education: [
    "industryInbox",
    "industryPipeline",
    "industryDocuments",
    "industryBroadcast",
  ],
  edutech: [
    "industryTicketQueue",
    "industryEnrollment",
    "industryAutomation",
    "industryAnalytics",
  ],
  entertainment: ["industryOrder", "industryBooking", "industryDispatch"],
  finance: [
    "industryInbox",
    "industryDocuments",
    "industryAnalytics",
    "industryContactRecord",
  ],
  fmcg: [
    "industryCatalog",
    "industryBroadcast",
    "industryTicketQueue",
    "industryAnalytics",
  ],
  fnb: ["industryKnowledge", "industryBooking", "industryOrder"],
  government: [
    "industryTicketQueue",
    "industryBooking",
    "industryAnalytics",
    "industryInbox",
  ],
  "gym-sports": [
    "industryBooking",
    "industryEnrollment",
    "industryAutomation",
    "industryBroadcast",
  ],
  hospitality: ["industryBooking", "industryDispatch", "industryInbox"],
  isp: [
    "industryTicketQueue",
    "industryDispatch",
    "industryBroadcast",
    "industryHandoff",
  ],
  logistics: [
    "industryDispatch",
    "industryTicketQueue",
    "industryBooking",
    "industryPipeline",
  ],
  nonprofit: [
    "industryInbox",
    "industryBroadcast",
    "industryAnalytics",
    "industryKnowledge",
  ],
  outsourcing: [
    "industryInbox",
    "industryKnowledge",
    "industryHandoff",
    "industryAnalytics",
  ],
  pharmacy: [
    "industryCatalog",
    "industryAutomation",
    "industryBooking",
    "industryHandoff",
  ],
  "professional-services": [
    "industryInbox",
    "industryBooking",
    "industryAutomation",
    "industryPipeline",
  ],
  property: [
    "industryPipeline",
    "industryBooking",
    "industryAutomation",
    "industryPipeline",
  ],
  retail: [
    "industryKnowledge",
    "industryOrder",
    "industryBroadcast",
    "industryContactRecord",
  ],
  saas: [
    "industryInbox",
    "industryTicketQueue",
    "industryHandoff",
    "industryAnalytics",
  ],
  schools: [
    "industryInbox",
    "industryPipeline",
    "industryDocuments",
    "industryBroadcast",
  ],
  "tech-startup": [
    "industryInbox",
    "industryAutomation",
    "industryHandoff",
    "industryAnalytics",
  ],
  transport: [
    "industryBooking",
    "industryDocuments",
    "industryBroadcast",
    "industryInbox",
  ],
  travel: ["industryLanguages", "industryContactRecord", "industryBooking"],
} as const satisfies Record<string, readonly IndustryVisualName[]>;

type VisualCopy = {
  workspace: string;
  active: string;
  sample: string;
  inbox: string;
  conversations: string;
  selected: string;
  customer: string;
  assigned: string;
  messagePreview: string;
  source: string;
  time: string;
  confirmed: string;
  available: string;
  stage: string;
  resolved: string;
  nextStep: string;
  priority: string;
  workflow: string;
  trigger: string;
  action: string;
  activity: string;
  today: string;
  newLead: string;
  contacted: string;
  proposal: string;
  won: string;
  qualified: string;
  received: string;
  performance: string;
  leads: string;
  tracked: string;
  handoff: string;
  context: string;
  allDeals: string;
  intent: string;
  agentReply: string;
  open: string;
  waiting: string;
  ticketLabel: string;
  customerName: string;
  customerShortName: string;
  customerSecondShortName: string;
  customerThirdShortName: string;
  weekdays: string;
};

function Snippet({ text }: { text: string }) {
  return <span className="r-industry-ui__snippet">{text}</span>;
}

function Mark({ tone = "blue" }: { tone?: "blue" | "green" | "amber" }) {
  return <i className={`r-industry-ui__mark r-industry-ui__mark--${tone}`} />;
}

function IndustryInbox({
  type,
  title,
  body,
  copy,
}: {
  type: IndustryVisualName;
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className={`r-industry-ui__inbox r-industry-ui__inbox--${type}`}>
      <aside className="r-industry-ui__inbox-list">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.inbox}</strong>
          <span>03</span>
        </div>
        {[
          [copy.customerShortName, title, "10:42", true],
          [copy.customerSecondShortName, copy.nextStep, "10:18", false],
          [copy.customerThirdShortName, copy.context, "09:56", false],
        ].map(([name, detail, time, selected]) => (
          <div
            className={`r-industry-ui__thread${selected ? " is-selected" : ""}`}
            key={String(name)}
          >
            <span className="r-industry-ui__avatar">
              {String(name).slice(0, 1)}
            </span>
            <span className="r-industry-ui__thread-copy">
              <strong>{name}</strong>
              <small>{detail}</small>
            </span>
            <time>{time}</time>
          </div>
        ))}
      </aside>

      <div className="r-industry-ui__conversation">
        <div className="r-industry-ui__conversation-head">
          <span className="r-industry-ui__avatar r-industry-ui__avatar--large">
            {copy.customerShortName.slice(0, 1).toLocaleUpperCase()}
          </span>
          <span>
            <strong>{copy.customer}</strong>
            <small>{copy.selected}</small>
          </span>
          <span className="r-industry-ui__online">{copy.active}</span>
        </div>
        {type === "industryLanguages" && (
          <div className="r-industry-ui__language-pills">
            <span>EN</span>
            <span>日本語</span>
            <span>中文</span>
            <span>한국어</span>
          </div>
        )}
        <div className="r-industry-ui__message r-industry-ui__message--incoming">
          <small>{copy.customer} · 10:42</small>
          <strong>{title}</strong>
          <Snippet text={body} />
        </div>
        <div className="r-industry-ui__typing" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="r-industry-ui__message r-industry-ui__message--outgoing">
          <small>Cekat AI · 10:43</small>
          <Snippet text={copy.agentReply} />
        </div>
        {type === "industryHandoff" && (
          <div className="r-industry-ui__handoff-note">
            <RevampIcon name="check" size="0.8rem" />
            <span>{copy.handoff}</span>
            <strong>{copy.assigned}</strong>
          </div>
        )}
        <div className="r-industry-ui__composer">
          <span>{copy.messagePreview}</span>
          <b>
            <RevampIcon name="arrow" size="0.8rem" />
          </b>
        </div>
      </div>

      <aside className="r-industry-ui__customer-card">
        <span className="r-industry-ui__avatar r-industry-ui__avatar--profile">
          {copy.customerShortName.slice(0, 1).toLocaleUpperCase()}
        </span>
        <strong>{copy.customerName}</strong>
        <small>{copy.customer}</small>
        <div className="r-industry-ui__profile-field">
          <small>{copy.stage}</small>
          <strong>{copy.open}</strong>
        </div>
        <div className="r-industry-ui__profile-field">
          <small>{copy.assigned}</small>
          <strong>{copy.workspace}</strong>
        </div>
        <div className="r-industry-ui__profile-tag">
          <Mark tone="green" />
          {copy.context}
        </div>
      </aside>
    </div>
  );
}

function IndustryBooking({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__booking">
      <section className="r-industry-ui__booking-calendar">
        <div className="r-industry-ui__mini-heading">
          <span>
            <strong>{copy.available}</strong>
            <small>{copy.time}</small>
          </span>
          <span className="r-industry-ui__calendar-nav">‹　›</span>
        </div>
        <div className="r-industry-ui__date-grid">
          {["12", "13", "14", "15", "16", "17", "18"].map((date, index) => (
            <span className={index === 4 ? "is-selected" : ""} key={date}>
              <small>{copy.weekdays.split("|")[index]}</small>
              <strong>{date}</strong>
            </span>
          ))}
        </div>
        <div className="r-industry-ui__time-grid">
          {["09:00", "10:30", "13:00", "15:30", "16:00", "17:30"].map(
            (time, index) => (
              <span className={index === 1 ? "is-selected" : ""} key={time}>
                {time}
              </span>
            ),
          )}
        </div>
      </section>
      <aside className="r-industry-ui__booking-summary">
        <span className="r-industry-ui__icon-tile">
          <RevampIcon name="check" size="1rem" />
        </span>
        <small>{copy.selected}</small>
        <strong>{title}</strong>
        <Snippet text={body} />
        <div className="r-industry-ui__summary-line">
          <span>{copy.customer}</span>
          <b>{copy.customerShortName}</b>
        </div>
        <div className="r-industry-ui__summary-line">
          <span>{copy.time}</span>
          <b>10:30</b>
        </div>
        <span className="r-industry-ui__confirm-button">{copy.confirmed}</span>
      </aside>
    </div>
  );
}

function IndustryAutomation({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__automation">
      <section className="r-industry-ui__flow-canvas">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.workflow}</strong>
          <span>•••</span>
        </div>
        <div className="r-industry-ui__flow-node">
          <span className="r-industry-ui__flow-icon r-industry-ui__flow-icon--trigger">
            <RevampIcon name="chart" size="0.9rem" />
          </span>
          <span>
            <small>{copy.trigger}</small>
            <strong>{title}</strong>
          </span>
          <Mark tone="green" />
        </div>
        <i className="r-industry-ui__flow-connector" />
        <div className="r-industry-ui__flow-node">
          <span className="r-industry-ui__flow-icon r-industry-ui__flow-icon--action">
            <RevampIcon name="chat" size="0.9rem" />
          </span>
          <span>
            <small>{copy.action}</small>
            <strong>{copy.messagePreview}</strong>
          </span>
          <Mark />
        </div>
        <div className="r-industry-ui__flow-foot">
          <RevampIcon name="check" size="0.8rem" />
          {copy.activity}
        </div>
      </section>
      <aside className="r-industry-ui__automation-preview">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.messagePreview}</strong>
          <span className="r-industry-ui__channel-tag">WhatsApp</span>
        </div>
        <div className="r-industry-ui__preview-person">
          <span className="r-industry-ui__avatar">A</span>
          <span>
            <strong>Alya Pratama</strong>
            <small>{copy.customer}</small>
          </span>
        </div>
        <div className="r-industry-ui__message r-industry-ui__message--outgoing">
          <strong>{title}</strong>
          <Snippet text={body} />
        </div>
        <span className="r-industry-ui__confirm-button">{copy.nextStep}</span>
      </aside>
    </div>
  );
}

function IndustryKnowledge({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__knowledge">
      <aside className="r-industry-ui__knowledge-nav">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.source}</strong>
          <span>⌕</span>
        </div>
        {[copy.inbox, title, copy.context, copy.activity].map((item, index) => (
          <div
            className={`r-industry-ui__knowledge-item${index === 1 ? " is-selected" : ""}`}
            key={item}
          >
            <Mark tone={index === 1 ? "blue" : "green"} />
            <span>{item}</span>
          </div>
        ))}
      </aside>
      <section className="r-industry-ui__answer-card">
        <span className="r-industry-ui__eyebrow">
          <RevampIcon name="check" size="0.75rem" />
          {copy.qualified}
        </span>
        <h3>{title}</h3>
        <Snippet text={body} />
        <div className="r-industry-ui__source-list">
          <strong>{copy.source}</strong>
          <span>
            <Mark tone="green" />
            {copy.context}
          </span>
          <span>
            <Mark />
            {copy.activity}
          </span>
        </div>
      </section>
    </div>
  );
}

function IndustryBroadcast({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__broadcast">
      <section className="r-industry-ui__campaign-setup">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.performance}</strong>
          <span className="r-industry-ui__status-tag">{copy.active}</span>
        </div>
        <div className="r-industry-ui__campaign-title">
          <span className="r-industry-ui__icon-tile">
            <RevampIcon name="chart" size="1rem" />
          </span>
          <span>
            <small>{copy.stage}</small>
            <strong>{title}</strong>
          </span>
        </div>
        <div className="r-industry-ui__audience-count">
          <strong>2,480</strong>
          <span>{copy.customer}</span>
        </div>
        <div className="r-industry-ui__audience-rows">
          {[copy.qualified, copy.contacted, copy.open].map((item, index) => (
            <span key={item}>
              <Mark tone={index === 2 ? "green" : "blue"} />
              {item}
              <b>{["84%", "62%", "31%"][index]}</b>
            </span>
          ))}
        </div>
      </section>
      <section className="r-industry-ui__broadcast-preview">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.messagePreview}</strong>
          <span className="r-industry-ui__channel-tag">WhatsApp</span>
        </div>
        <div className="r-industry-ui__message r-industry-ui__message--outgoing">
          <small>Cekat.AI · {copy.today}</small>
          <strong>{title}</strong>
          <Snippet text={body} />
          <span className="r-industry-ui__confirm-button">{copy.nextStep}</span>
        </div>
        <div className="r-industry-ui__broadcast-stats">
          <span>
            <strong>96%</strong>
            <small>{copy.tracked}</small>
          </span>
          <span>
            <strong>1.8k</strong>
            <small>{copy.leads}</small>
          </span>
        </div>
      </section>
    </div>
  );
}

function IndustryContactRecord({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__record">
      <aside className="r-industry-ui__record-profile">
        <span className="r-industry-ui__avatar r-industry-ui__avatar--profile">
          A
        </span>
        <strong>Alya Pratama</strong>
        <small>{copy.customer}</small>
        <span className="r-industry-ui__record-badge">
          <Mark tone="green" />
          {copy.active}
        </span>
        <div className="r-industry-ui__record-fields">
          <span>
            <small>{copy.stage}</small>
            <b>{copy.qualified}</b>
          </span>
          <span>
            <small>{copy.assigned}</small>
            <b>{copy.workspace}</b>
          </span>
        </div>
      </aside>
      <section className="r-industry-ui__record-history">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.activity}</strong>
          <span>{copy.today}</span>
        </div>
        <h3>{title}</h3>
        <Snippet text={body} />
        <div className="r-industry-ui__timeline">
          <span>
            <Mark tone="green" />
            <b>{copy.received}</b>
            <small>09:12</small>
          </span>
          <span>
            <Mark />
            <b>{copy.intent}</b>
            <small>09:14</small>
          </span>
          <span>
            <Mark tone="green" />
            <b>{copy.nextStep}</b>
            <small>09:16</small>
          </span>
        </div>
      </section>
    </div>
  );
}

function IndustryPipeline({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  const stages = [copy.newLead, copy.contacted, copy.proposal, copy.won];
  return (
    <div className="r-industry-ui__pipeline">
      {stages.map((stage, index) => (
        <section
          className={`r-industry-ui__pipeline-lane lane-${index + 1}`}
          key={stage}
        >
          <div className="r-industry-ui__mini-heading">
            <span>
              <Mark tone={index === 3 ? "green" : "blue"} />
              {stage}
            </span>
            <b>{["02", "03", "01", "01"][index]}</b>
          </div>
          {[0, 1].slice(0, index === 2 || index === 3 ? 1 : 2).map((item) => (
            <div className="r-industry-ui__lead-card" key={item}>
              <span className="r-industry-ui__avatar">
                {item === 0 ? "A" : "N"}
              </span>
              <span>
                <strong>{item === 0 ? "Alya P." : "Nadia K."}</strong>
                <small>{item === 0 ? title : copy.nextStep}</small>
              </span>
              <small>{item === 0 ? "10:30" : "11:15"}</small>
            </div>
          ))}
        </section>
      ))}
      <span className="r-industry-ui__pipeline-foot">
        <Snippet text={body} />
      </span>
    </div>
  );
}

function IndustryDocuments({
  type,
  title,
  body,
  copy,
}: {
  type: IndustryVisualName;
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  const steps = [copy.received, title, copy.qualified, copy.confirmed];
  return (
    <div
      className={`r-industry-ui__documents r-industry-ui__documents--${type}`}
    >
      <section className="r-industry-ui__document-list">
        <div className="r-industry-ui__mini-heading">
          <strong>
            {type === "industryEnrollment" ? copy.nextStep : copy.activity}
          </strong>
          <span>75%</span>
        </div>
        {steps.map((step, index) => (
          <div className="r-industry-ui__document-row" key={step}>
            <span
              className={`r-industry-ui__doc-check${index < 2 ? " is-done" : ""}`}
            >
              {index < 2 ? (
                <RevampIcon name="check" size="0.7rem" />
              ) : (
                index + 1
              )}
            </span>
            <span>
              <strong>{step}</strong>
              <small>{index < 2 ? copy.resolved : copy.waiting}</small>
            </span>
            <Mark tone={index < 2 ? "green" : "amber"} />
          </div>
        ))}
        <div className="r-industry-ui__progress">
          <i />
        </div>
      </section>
      <aside className="r-industry-ui__document-summary">
        <span className="r-industry-ui__icon-tile">
          <RevampIcon name="check" size="1rem" />
        </span>
        <small>{copy.selected}</small>
        <strong>{title}</strong>
        <Snippet text={body} />
        <div className="r-industry-ui__document-deadline">
          <Mark tone="amber" />
          {copy.time}
        </div>
      </aside>
    </div>
  );
}

function IndustryAnalytics({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__analytics">
      <div className="r-industry-ui__metric-row">
        {[
          [copy.conversations, "1,284", "+18%"],
          [copy.qualified, "846", "+12%"],
          [copy.resolved, "92%", "+8%"],
        ].map(([label, value, change]) => (
          <div className="r-industry-ui__metric" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
            <span>{change}</span>
          </div>
        ))}
      </div>
      <section className="r-industry-ui__chart-card">
        <div className="r-industry-ui__mini-heading">
          <strong>{title}</strong>
          <span>{copy.today}</span>
        </div>
        <div className="r-industry-ui__bar-chart" aria-hidden="true">
          {[36, 57, 43, 76, 52, 90, 66, 82, 48, 70, 94, 62].map(
            (height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ),
          )}
        </div>
        <Snippet text={body} />
      </section>
      <aside className="r-industry-ui__channel-card">
        <strong>{copy.source}</strong>
        <span>
          <Mark />
          WhatsApp <b>64%</b>
        </span>
        <span>
          <Mark tone="green" />
          Instagram <b>23%</b>
        </span>
        <span>
          <Mark tone="amber" />
          Web chat <b>13%</b>
        </span>
      </aside>
    </div>
  );
}

function IndustryTicketQueue({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__tickets">
      <aside className="r-industry-ui__ticket-list">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.inbox}</strong>
          <span>03</span>
        </div>
        {[
          ["#2048", title, "10:42", "urgent"],
          ["#2047", copy.nextStep, "10:18", "normal"],
          ["#2046", copy.context, "09:56", "resolved"],
        ].map(([id, subject, time, status], index) => (
          <div
            className={`r-industry-ui__ticket${index === 0 ? " is-selected" : ""}`}
            key={id}
          >
            <div>
              <strong>{id}</strong>
              <Mark
                tone={
                  status === "urgent"
                    ? "amber"
                    : status === "resolved"
                      ? "green"
                      : "blue"
                }
              />
            </div>
            <span>{subject}</span>
            <small>
              {time} ·{" "}
              {status === "resolved"
                ? copy.resolved
                : status === "urgent"
                  ? copy.priority
                  : copy.open}
            </small>
          </div>
        ))}
      </aside>
      <section className="r-industry-ui__ticket-detail">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.ticketLabel}</strong>
          <span className="r-industry-ui__status-tag">{copy.open}</span>
        </div>
        <h3>{title}</h3>
        <Snippet text={body} />
        <div className="r-industry-ui__ticket-meta">
          <span>
            {copy.customer}
            <b>{copy.customerShortName}</b>
          </span>
          <span>
            {copy.assigned}
            <b>{copy.workspace}</b>
          </span>
        </div>
        <div className="r-industry-ui__ticket-action">
          <RevampIcon name="check" size="0.8rem" />
          {copy.nextStep}
        </div>
      </section>
    </div>
  );
}

function IndustryDispatch({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__dispatch">
      <section className="r-industry-ui__route-map">
        <div className="r-industry-ui__map-grid" aria-hidden="true" />
        <svg
          viewBox="0 0 480 210"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M55 155 C105 143 112 72 190 88 S286 161 343 110 S399 49 435 57" />
          <circle cx="55" cy="155" r="7" />
          <circle cx="190" cy="88" r="7" />
          <circle cx="343" cy="110" r="7" />
          <circle cx="435" cy="57" r="8" />
        </svg>
        <span className="r-industry-ui__route-stop stop-a">
          {copy.received}
        </span>
        <span className="r-industry-ui__route-stop stop-b">
          {copy.nextStep}
        </span>
        <span className="r-industry-ui__route-stop stop-c">
          {copy.confirmed}
        </span>
        <span className="r-industry-ui__route-pin">
          <RevampIcon name="check" size="0.8rem" />
        </span>
      </section>
      <aside className="r-industry-ui__route-detail">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.activity}</strong>
          <span className="r-industry-ui__status-tag">{copy.active}</span>
        </div>
        <h3>{title}</h3>
        <Snippet text={body} />
        <div className="r-industry-ui__route-progress">
          <i />
        </div>
        <div className="r-industry-ui__route-stats">
          <span>
            {copy.stage}
            <b>03 / 04</b>
          </span>
          <span>
            {copy.time}
            <b>10:30</b>
          </span>
        </div>
      </aside>
    </div>
  );
}

function IndustryCatalog({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__catalog">
      <section className="r-industry-ui__catalog-list">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.available}</strong>
          <span>{copy.today}</span>
        </div>
        {[
          [title, "01", true],
          [copy.nextStep, "02", false],
          [copy.context, "03", false],
        ].map(([name, count, selected]) => (
          <div
            className={`r-industry-ui__catalog-item${selected ? " is-selected" : ""}`}
            key={String(count)}
          >
            <span className="r-industry-ui__catalog-icon">
              <RevampIcon name="check" size="0.9rem" />
            </span>
            <span>
              <strong>{name}</strong>
              <small>
                {copy.stage} · {count}
              </small>
            </span>
            <b>{selected ? "✓" : "›"}</b>
          </div>
        ))}
      </section>
      <aside className="r-industry-ui__catalog-detail">
        <span className="r-industry-ui__catalog-art">
          <RevampIcon name="chart" size="2rem" />
        </span>
        <small>{copy.selected}</small>
        <strong>{title}</strong>
        <Snippet text={body} />
        <span className="r-industry-ui__confirm-button">{copy.nextStep}</span>
      </aside>
    </div>
  );
}

function IndustryOrder({
  title,
  body,
  copy,
}: {
  title: string;
  body: string;
  copy: VisualCopy;
}) {
  return (
    <div className="r-industry-ui__order">
      <section className="r-industry-ui__order-items">
        <div className="r-industry-ui__mini-heading">
          <strong>{copy.activity}</strong>
          <span>{copy.open}</span>
        </div>
        {[title, copy.nextStep, copy.context].map((item, index) => (
          <div className="r-industry-ui__order-row" key={item}>
            <span className="r-industry-ui__order-thumb">
              <RevampIcon name="check" size="0.85rem" />
            </span>
            <span>
              <strong>{item}</strong>
              <small>
                {copy.stage} · 0{index + 1}
              </small>
            </span>
            <Mark tone={index === 2 ? "green" : "blue"} />
          </div>
        ))}
        <div className="r-industry-ui__order-total">
          <span>{copy.confirmed}</span>
          <strong>3 {copy.activity}</strong>
        </div>
      </section>
      <aside className="r-industry-ui__order-status">
        <span className="r-industry-ui__icon-tile">
          <RevampIcon name="check" size="1rem" />
        </span>
        <small>{copy.selected}</small>
        <strong>{title}</strong>
        <Snippet text={body} />
        <div className="r-industry-ui__order-steps">
          {[copy.received, copy.action, copy.resolved].map((step, index) => (
            <span key={step}>
              <i className={index < 2 ? "is-done" : ""} />
              {step}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}

export function IndustryChapterVisual({
  type,
  title,
  body,
  label,
  industryId,
}: {
  type: IndustryVisualName;
  title: string;
  body: string;
  label: string;
  industryId?: string;
}) {
  const p = useTranslations("secondary.preview");
  const t = useTranslations("secondary.preview.industryVisual");
  const h = useTranslations("secondary.preview.industryVisual.healthcare");
  const sharedCopy: VisualCopy = {
    workspace: t("workspace"),
    active: t("active"),
    sample: t("sample"),
    inbox: p("inbox"),
    conversations: p("conversations"),
    selected: t("selected"),
    customer: t("customer"),
    assigned: t("assigned"),
    messagePreview: t("messagePreview"),
    source: t("source"),
    time: t("time"),
    confirmed: t("confirmed"),
    available: t("available"),
    stage: t("stage"),
    resolved: t("resolved"),
    nextStep: t("nextStep"),
    priority: p("priority"),
    workflow: p("workflow"),
    trigger: p("trigger"),
    action: p("action"),
    activity: p("activity"),
    today: p("today"),
    newLead: p("newLead"),
    contacted: p("contacted"),
    proposal: p("proposal"),
    won: p("won"),
    qualified: p("qualified"),
    received: p("received"),
    performance: p("performance"),
    leads: p("leads"),
    tracked: p("tracked"),
    handoff: p("handoff"),
    context: p("context"),
    allDeals: p("allDeals"),
    intent: p("intent"),
    agentReply: p("agentReply"),
    open: t("open"),
    waiting: t("waiting"),
    ticketLabel: t("ticketLabel"),
    customerName: "Alya Pratama",
    customerShortName: "Alya P.",
    customerSecondShortName: "Rafi M.",
    customerThirdShortName: "Nadia K.",
    weekdays: "M|T|W|T|F|S|S",
  };
  const copy: VisualCopy =
    industryId === "healthcare"
      ? {
          ...sharedCopy,
          workspace: h("workspace"),
          active: h("active"),
          sample: h("sample"),
          inbox: h("inbox"),
          selected: h("selected"),
          customer: h("customer"),
          assigned: h("assigned"),
          messagePreview: h("messagePreview"),
          time: h("time"),
          confirmed: h("confirmed"),
          available: h("available"),
          stage: h("stage"),
          resolved: h("resolved"),
          nextStep: h("nextStep"),
          priority: h("priority"),
          open: h("open"),
          waiting: h("waiting"),
          context: h("context"),
          agentReply: h("agentReply"),
          ticketLabel: h("ticketLabel"),
          customerName: h("patientName"),
          customerShortName: h("patientShortName"),
          customerSecondShortName: h("patientSecondShortName"),
          customerThirdShortName: h("patientThirdShortName"),
          weekdays: h("weekdays"),
        }
      : sharedCopy;

  return (
    <div
      className={`r-industry-ui r-industry-ui--${type}${industryId === "healthcare" ? " r-industry-ui--healthcare" : ""}`}
      role="img"
      aria-label={label}
    >
      <header className="r-industry-ui__topbar">
        <div className="r-industry-ui__brand">
          <span className="r-industry-ui__brand-icon">
            <RevampIcon name="chat" size="1rem" />
          </span>
          <span>
            <strong>Cekat.AI</strong>
            <small>{copy.workspace}</small>
          </span>
        </div>
        <span className="r-industry-ui__brand-status">
          <Mark tone="green" />
          {copy.active}
        </span>
      </header>
      <div className="r-industry-ui__body">
        {type === "industryInbox" ||
        type === "industryLanguages" ||
        type === "industryHandoff" ? (
          <IndustryInbox type={type} title={title} body={body} copy={copy} />
        ) : type === "industryKnowledge" ? (
          <IndustryKnowledge title={title} body={body} copy={copy} />
        ) : type === "industryBooking" ? (
          <IndustryBooking title={title} body={body} copy={copy} />
        ) : type === "industryAutomation" ? (
          <IndustryAutomation title={title} body={body} copy={copy} />
        ) : type === "industryBroadcast" ? (
          <IndustryBroadcast title={title} body={body} copy={copy} />
        ) : type === "industryContactRecord" ? (
          <IndustryContactRecord title={title} body={body} copy={copy} />
        ) : type === "industryPipeline" ? (
          <IndustryPipeline title={title} body={body} copy={copy} />
        ) : type === "industryDocuments" || type === "industryEnrollment" ? (
          <IndustryDocuments
            type={type}
            title={title}
            body={body}
            copy={copy}
          />
        ) : type === "industryAnalytics" ? (
          <IndustryAnalytics title={title} body={body} copy={copy} />
        ) : type === "industryTicketQueue" ? (
          <IndustryTicketQueue title={title} body={body} copy={copy} />
        ) : type === "industryDispatch" ? (
          <IndustryDispatch title={title} body={body} copy={copy} />
        ) : type === "industryCatalog" ? (
          <IndustryCatalog title={title} body={body} copy={copy} />
        ) : (
          <IndustryOrder title={title} body={body} copy={copy} />
        )}
      </div>
      <footer className="r-industry-ui__sample">{copy.sample}</footer>
    </div>
  );
}
