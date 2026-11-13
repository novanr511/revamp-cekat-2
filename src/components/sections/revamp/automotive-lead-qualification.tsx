import { useTranslations } from "next-intl";
import { RevampIcon } from "./icon";

function VehicleIcon() {
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

export function AutomotiveLeadQualificationVisual({
  label,
}: {
  label: string;
}) {
  const t = useTranslations("secondary.preview.automotiveQualification");

  return (
    <div className="r-auto-qualify" role="img" aria-label={label}>
      <div className="r-auto-qualify__topbar">
        <div className="r-auto-qualify__brand">
          <span className="r-auto-qualify__brand-icon">
            <RevampIcon name="chat" size="1.15rem" />
          </span>
          <span className="r-auto-qualify__brand-copy">
            <strong>Cekat</strong>
            <span>{t("title")}</span>
          </span>
        </div>
        <span className="r-auto-qualify__online">
          <i />
          {t("active")}
        </span>
      </div>

      <div className="r-auto-qualify__workspace">
        <section className="r-auto-qualify__conversation">
          <div className="r-auto-qualify__conversation-head">
            <span className="r-auto-qualify__avatar">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 20c.5-3.5 2.7-5.25 6.5-5.25s6 1.75 6.5 5.25" />
              </svg>
            </span>
            <span className="r-auto-qualify__contact">
              <strong>{t("lead")}</strong>
              <span>{t("source")}</span>
            </span>
            <span className="r-auto-qualify__lead-status">
              <i />
              {t("qualified")}
            </span>
          </div>

          <div className="r-auto-qualify__thread">
            <span className="r-auto-qualify__date">{t("today")}</span>
            <div className="r-auto-qualify__message r-auto-qualify__message--buyer">
              <span>{t("customerMessage")}</span>
              <time>10:42</time>
            </div>
            <div className="r-auto-qualify__agent-label">
              <span>
                <RevampIcon name="chat" size="0.75rem" />
              </span>
              Cekat AI Agent
            </div>
            <div className="r-auto-qualify__message r-auto-qualify__message--agent">
              <span>{t("agentMessage")}</span>
              <time>
                10:43 <RevampIcon name="check" size="0.7rem" />
              </time>
            </div>
          </div>

          <div className="r-auto-qualify__composer">
            <span>{t("replyPlaceholder")}</span>
            <span className="r-auto-qualify__send">
              <RevampIcon name="arrow" size="0.9rem" />
            </span>
          </div>
        </section>

        <aside className="r-auto-qualify__profile">
          <div className="r-auto-qualify__profile-head">
            <div>
              <span className="r-auto-qualify__profile-icon">
                <RevampIcon name="chart" size="1rem" />
              </span>
              <strong>{t("profile")}</strong>
            </div>
            <span className="r-auto-qualify__qualified">
              <RevampIcon name="check" size="0.7rem" />
              {t("qualified")}
            </span>
          </div>

          <div className="r-auto-qualify__fields">
            <div className="r-auto-qualify__field">
              <span className="r-auto-qualify__field-icon">
                <VehicleIcon />
              </span>
              <span>
                <span className="r-auto-qualify__field-label">
                  {t("model")}
                </span>
                <strong>{t("modelValue")}</strong>
              </span>
            </div>
            <div className="r-auto-qualify__field">
              <span className="r-auto-qualify__field-icon r-auto-qualify__field-icon--budget">
                <span>IDR</span>
              </span>
              <span>
                <span className="r-auto-qualify__field-label">
                  {t("budget")}
                </span>
                <strong>{t("budgetValue")}</strong>
              </span>
            </div>
            <div className="r-auto-qualify__field">
              <span className="r-auto-qualify__field-icon r-auto-qualify__field-icon--trade">
                <RevampIcon name="check" size="1rem" />
              </span>
              <span>
                <span className="r-auto-qualify__field-label">
                  {t("tradeIn")}
                </span>
                <strong>{t("tradeInValue")}</strong>
              </span>
            </div>
          </div>

          <div className="r-auto-qualify__handoff">
            <span>
              <RevampIcon name="check" size="0.9rem" />
            </span>
            <span>
              <strong>{t("handoff")}</strong>
              <small>{t("sampleData")}</small>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
