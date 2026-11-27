"use client";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import type { LandingContent } from "@/lib/registry/types";
import { industryLabels, type IndustryLocale } from "./industry-labels";

export function IndustryPreview({
  children,
  cases,
  locale = "id",
}: {
  children: ReactNode;
  cases: string[];
  locale?: IndustryLocale;
}) {
  const labels = industryLabels[locale];
  const [index, setIndex] = useState(0);
  return (
    <figure className="cl-figure">
      <div className="cl-photo">
        {children}
        <span className="cl-online">
          <i /> {labels.online}
        </span>
        <div className="cl-ticket industry-ticket" aria-live="polite">
          <div className="cl-ticketHead">
            <span>
              <MessageCircle size={16} /> {labels.example}
            </span>
          </div>
          <strong>{cases[index]}</strong>
          <p>{labels.handled}</p>
        </div>
      </div>
      <figcaption>
        <span>
          <i /> {labels.workflow}
        </span>
        <span>
          <button
            type="button"
            aria-label={labels.previous}
            onClick={() =>
              setIndex((i) => (i + cases.length - 1) % cases.length)
            }
          >
            <ArrowLeft size={14} />
          </button>
          {index + 1} / {cases.length}
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => setIndex((i) => (i + 1) % cases.length)}
          >
            <ArrowRight size={14} />
          </button>
        </span>
      </figcaption>
    </figure>
  );
}

export function IndustryDemo({
  benefits,
  conversations,
  heading,
  locale = "id",
}: {
  benefits: LandingContent["benefits"];
  conversations: NonNullable<LandingContent["conversations"]>;
  heading?: string;
  locale?: IndustryLocale;
}) {
  const labels = industryLabels[locale];
  const [index, setIndex] = useState(0),
    [question, setQuestion] = useState(0);
  const benefit = benefits[index];
  return (
    <section id="simulasi" className="cl-demo industry-demo">
      <p className="cl-label">{labels.demo}</p>
      <h2>{heading || labels.demoHeading}</h2>
      <div className="cl-demoGrid">
        <div className="cl-options">
          {benefits.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              <span>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {item.title}
                <ArrowRight size={16} />
              </span>
              {index === i && <p>{item.body}</p>}
            </button>
          ))}
        </div>
        <div className="cl-workspace">
          <div className="cl-window">
            <div className="cl-windowHead">
              <span className="cl-agentIcon">
                <MessageCircle size={20} />
              </span>
              <div>
                <strong>{labels.assistant}</strong>
                <small>{labels.preview}</small>
              </div>
              <button
                type="button"
                className="cl-reset"
                aria-label={labels.reset}
                onClick={() => {
                  setIndex(0);
                  setQuestion(0);
                }}
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="industry-feature" aria-live="polite">
              <span>{labels.selected}</span>
              <strong>{benefit.title}</strong>
              <p>{benefit.body}</p>
            </div>
            {conversations.length > 0 && (
              <div className="industry-questions">
                <span>{labels.sampleFaq}</span>
                <div
                  className="industry-questionButtons"
                  role="group"
                  aria-label={labels.choose}
                >
                  {conversations.map((q, i) => (
                    <button
                      key={q.q}
                      type="button"
                      aria-pressed={question === i}
                      onClick={() => setQuestion(i)}
                    >
                      {labels.question} {i + 1}
                    </button>
                  ))}
                </div>
                <div className="cl-chat" aria-live="polite">
                  <p className="cl-patient">
                    {conversations[question].q}
                    <CheckCheck size={13} />
                  </p>
                  <p className="cl-answer">{conversations[question].a}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
