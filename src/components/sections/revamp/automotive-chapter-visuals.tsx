import { useTranslations } from "next-intl";
import { RevampIcon } from "./icon";

function CalendarGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7.5 3.5v3M16.5 3.5v3M4 9.5h16M8 13h2m4 0h2m-8 3h2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CarGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m4 11 1.4-4.1A2 2 0 0 1 7.3 5.5h9.4a2 2 0 0 1 1.9 1.4L20 11v6.5h-2v-2H6v2H4V11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M4.5 11h15M7 12.5h.01m9.99 0h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ServiceGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.2 6.1a5 5 0 0 0-6.3 6.3L3.4 17a2.1 2.1 0 0 0 3 3l4.6-4.5a5 5 0 0 0 6.4-6.3l-3 3-3.2-3.2 3-2.9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function BellGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 12h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function AutomotiveBookingVisual({ label }: { label: string }) {
  const t = useTranslations("secondary.preview.automotiveBooking");
  const days = [
    ["dayThu", "17"],
    ["dayFri", "18"],
    ["daySat", "19"],
    ["daySun", "20"],
    ["dayMon", "21"],
  ] as const;
  const slots = ["09:00", "10:30", "13:00", "15:30"];

  return (
    <div className="r-auto-booking" role="img" aria-label={label}>
      <header className="r-auto-booking__topbar">
        <div className="r-auto-booking__brand">
          <span className="r-auto-booking__brand-icon">
            <CalendarGlyph />
          </span>
          <span>
            <strong>Cekat</strong>
            <small>{t("title")}</small>
          </span>
        </div>
        <span className="r-auto-booking__live">
          <i />
          {t("active")}
        </span>
      </header>

      <div className="r-auto-booking__workspace">
        <section className="r-auto-booking__scheduler">
          <div className="r-auto-booking__tabs">
            <span className="is-active">
              <CarGlyph />
              {t("testDrive")}
            </span>
            <span>
              <ServiceGlyph />
              {t("service")}
            </span>
          </div>

          <div className="r-auto-booking__schedule-body">
            <div className="r-auto-booking__section-title">
              <div>
                <strong>{t("chooseSlot")}</strong>
                <small>{t("month")}</small>
              </div>
              <span className="r-auto-booking__month-nav" aria-hidden="true">
                ‹ <i /> ›
              </span>
            </div>

            <div className="r-auto-booking__days">
              {days.map(([day, date], index) => (
                <span
                  className={`r-auto-booking__day${index === 1 ? " is-selected" : ""}`}
                  key={day}
                >
                  <small>{t(day)}</small>
                  <strong>{date}</strong>
                </span>
              ))}
            </div>

            <div className="r-auto-booking__slots-heading">
              <strong>{t("availableTimes")}</strong>
              <small>{t("timezone")}</small>
            </div>
            <div className="r-auto-booking__slots">
              {slots.map((slot) => (
                <span
                  className={slot === "10:30" ? "is-selected" : ""}
                  key={slot}
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="r-auto-booking__details">
          <div className="r-auto-booking__details-heading">
            <span className="r-auto-booking__details-icon">
              <CarGlyph />
            </span>
            <span>
              <small>{t("bookingFor")}</small>
              <strong>{t("customer")}</strong>
            </span>
          </div>

          <div className="r-auto-booking__vehicle">
            <span className="r-auto-booking__vehicle-art">
              <CarGlyph />
            </span>
            <span>
              <small>{t("vehicle")}</small>
              <strong>{t("vehicleValue")}</strong>
            </span>
          </div>

          <div className="r-auto-booking__appointment">
            <small>{t("selectedTime")}</small>
            <strong>{t("selectedDate")}</strong>
            <span>{t("duration")}</span>
          </div>

          <div className="r-auto-booking__assignment">
            <span className="r-auto-booking__assignment-icon">
              <BellGlyph />
            </span>
            <span>
              <small>{t("notifyTeam")}</small>
              <strong>{t("team")}</strong>
            </span>
          </div>

          <div className="r-auto-booking__confirmed">
            <span>
              <RevampIcon name="check" size="0.9rem" />
            </span>
            <span>
              <strong>{t("confirmed")}</strong>
              <small>{t("illustrative")}</small>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function AutomotiveServiceReminderVisual({ label }: { label: string }) {
  const t = useTranslations("secondary.preview.automotiveReminder");

  return (
    <div className="r-auto-reminder" role="img" aria-label={label}>
      <header className="r-auto-reminder__topbar">
        <div className="r-auto-reminder__brand">
          <span className="r-auto-reminder__brand-icon">
            <RevampIcon name="chart" size="1.1rem" />
          </span>
          <span>
            <strong>{t("title")}</strong>
            <small>{t("subtitle")}</small>
          </span>
        </div>
        <span className="r-auto-reminder__status">
          <i />
          {t("active")}
        </span>
      </header>

      <div className="r-auto-reminder__workspace">
        <section className="r-auto-reminder__flow">
          <div className="r-auto-reminder__flow-heading">
            <span>{t("flowTitle")}</span>
            <span aria-hidden="true">•••</span>
          </div>

          <div className="r-auto-reminder__flow-node">
            <span className="r-auto-reminder__node-icon r-auto-reminder__node-icon--trigger">
              <CalendarGlyph />
            </span>
            <span>
              <small>{t("trigger")}</small>
              <strong>{t("due")}</strong>
              <em>{t("dueDetail")}</em>
            </span>
            <b>01</b>
          </div>
          <span className="r-auto-reminder__connector" aria-hidden="true">
            <i />
          </span>
          <div className="r-auto-reminder__flow-node">
            <span className="r-auto-reminder__node-icon r-auto-reminder__node-icon--action">
              <RevampIcon name="chat" size="1rem" />
            </span>
            <span>
              <small>{t("action")}</small>
              <strong>{t("sendMessage")}</strong>
              <em>{t("channel")}</em>
            </span>
            <b>02</b>
          </div>

          <div className="r-auto-reminder__flow-footer">
            <span className="r-auto-reminder__flow-check">
              <RevampIcon name="check" size="0.75rem" />
            </span>
            <span>
              <strong>{t("personalized")}</strong>
              <small>{t("history")}</small>
            </span>
          </div>
        </section>

        <section className="r-auto-reminder__preview">
          <div className="r-auto-reminder__preview-head">
            <span>{t("previewTitle")}</span>
            <span className="r-auto-reminder__channel">WhatsApp</span>
          </div>

          <div className="r-auto-reminder__recipient">
            <span className="r-auto-reminder__recipient-avatar">
              <CarGlyph />
            </span>
            <span>
              <strong>{t("recipient")}</strong>
              <small>{t("lastService")}</small>
            </span>
            <span className="r-auto-reminder__bell">
              <BellGlyph />
            </span>
          </div>

          <div className="r-auto-reminder__message-wrap">
            <span className="r-auto-reminder__message-label">Cekat Motors</span>
            <div className="r-auto-reminder__message">
              <span>{t("message")}</span>
              <time>09:00</time>
            </div>
            <span className="r-auto-reminder__message-cta">
              {t("bookService")}
              <RevampIcon name="diagonal" size="0.75rem" />
            </span>
          </div>

          <div className="r-auto-reminder__sent">
            <span>
              <RevampIcon name="check" size="0.8rem" />
            </span>
            <span>
              <strong>{t("sent")}</strong>
              <small>{t("illustrative")}</small>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

function VehicleKeyGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m11 12 8-8 2 2-2 2 2 2-3 3-2-2-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="8" cy="15" r="1" fill="currentColor" />
    </svg>
  );
}

export function AutomotiveCrmPipelineVisual({ label }: { label: string }) {
  const t = useTranslations("secondary.preview.automotivePipeline");
  const leadCards = [
    { name: t("leadOne"), model: t("familySuv"), meta: t("budget") },
    { name: t("leadTwo"), model: t("cityCar"), meta: t("testDrive") },
    { name: t("leadThree"), model: t("premiumMpv"), meta: t("followUp") },
    { name: t("leadFour"), model: t("familySuv"), meta: t("offerSent") },
    { name: t("leadFive"), model: t("hybridSedan"), meta: t("decision") },
    { name: t("leadSix"), model: t("citySuv"), meta: t("won") },
  ];
  const lanes = [
    {
      label: t("newLead"),
      count: "02",
      tone: "new",
      cards: leadCards.slice(0, 2),
    },
    {
      label: t("contacted"),
      count: "02",
      tone: "contacted",
      cards: leadCards.slice(2, 4),
    },
    {
      label: t("proposal"),
      count: "01",
      tone: "proposal",
      cards: leadCards.slice(4, 5),
    },
    {
      label: t("won"),
      count: "01",
      tone: "won",
      cards: leadCards.slice(5),
    },
  ];

  return (
    <div className="r-auto-crm" role="img" aria-label={label}>
      <header className="r-auto-crm__topbar">
        <div className="r-auto-crm__brand">
          <span className="r-auto-crm__brand-icon">
            <CarGlyph />
          </span>
          <span>
            <strong>{t("title")}</strong>
            <small>{t("subtitle")}</small>
          </span>
        </div>
        <span className="r-auto-crm__search">
          <RevampIcon name="search" size="0.9rem" />
          {t("search")}
        </span>
      </header>

      <div className="r-auto-crm__steps" aria-hidden="true">
        {lanes.map((lane, index) => (
          <span
            className={`r-auto-crm__step r-auto-crm__step--${lane.tone}`}
            key={lane.tone}
          >
            {lane.label}
            {index < lanes.length - 1 && <i />}
          </span>
        ))}
      </div>

      <div className="r-auto-crm__board">
        {lanes.map((lane) => (
          <section
            className={`r-auto-crm__lane r-auto-crm__lane--${lane.tone}`}
            key={lane.tone}
          >
            <div className="r-auto-crm__lane-head">
              <span>
                <i />
                {lane.label}
              </span>
              <b>{lane.count}</b>
            </div>
            <div className="r-auto-crm__cards">
              {lane.cards.map((card, index) => (
                <div className="r-auto-crm__card" key={card.name}>
                  <span className="r-auto-crm__card-main">
                    <span className="r-auto-crm__car-icon">
                      <CarGlyph />
                    </span>
                    <span className="r-auto-crm__card-copy">
                      <strong>{card.name}</strong>
                      <small>{card.model}</small>
                    </span>
                  </span>
                  <span className="r-auto-crm__card-meta">
                    <i />
                    {card.meta}
                  </span>
                  {lane.tone === "won" && index === 0 && (
                    <span className="r-auto-crm__won-check">
                      <RevampIcon name="check" size="0.7rem" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="r-auto-crm__deal-note">
        <span className="r-auto-crm__deal-check">
          <RevampIcon name="check" size="1rem" />
        </span>
        <span className="r-auto-crm__deal-copy">
          <strong>{t("dealWon")}</strong>
          <small>{t("dealSynced")}</small>
          <em>{t("illustrative")}</em>
        </span>
        <span className="r-auto-crm__key-icon">
          <VehicleKeyGlyph />
        </span>
      </div>
    </div>
  );
}
