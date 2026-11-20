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

export function IndustryPreview({
  children,
  cases,
}: {
  children: ReactNode;
  cases: string[];
}) {
  const [index, setIndex] = useState(0);
  return (
    <figure className="cl-figure">
      <div className="cl-photo">
        {children}
        <span className="cl-online">
          <i /> Asisten aktif
        </span>
        <div className="cl-ticket industry-ticket" aria-live="polite">
          <div className="cl-ticketHead">
            <span>
              <MessageCircle size={16} /> Contoh penggunaan
            </span>
          </div>
          <strong>{cases[index]}</strong>
          <p>Ditangani dalam percakapan bersama Cekat.AI</p>
        </div>
      </div>
      <figcaption>
        <span>
          <i /> Contoh alur layanan
        </span>
        <span>
          <button
            type="button"
            aria-label="Contoh sebelumnya"
            onClick={() =>
              setIndex((i) => (i + cases.length - 1) % cases.length)
            }
          >
            <ArrowLeft size={14} />
          </button>
          {index + 1} / {cases.length}
          <button
            type="button"
            aria-label="Contoh berikutnya"
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
  faq,
  heading,
}: {
  benefits: LandingContent["benefits"];
  faq: LandingContent["faq"];
  heading?: string;
}) {
  const [index, setIndex] = useState(0),
    [question, setQuestion] = useState(0);
  const benefit = benefits[index];
  const questions = faq.slice(0, 3);
  return (
    <section id="simulasi" className="cl-demo industry-demo">
      <p className="cl-label">Lihat cara kerja Cekat.AI</p>
      <h2>{heading || "Dari percakapan ke langkah berikutnya."}</h2>
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
                <strong>Asisten Cekat.AI</strong>
                <small>Contoh tampilan layanan</small>
              </div>
              <button
                type="button"
                className="cl-reset"
                aria-label="Mulai ulang contoh"
                onClick={() => {
                  setIndex(0);
                  setQuestion(0);
                }}
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="industry-feature" aria-live="polite">
              <span>Fitur yang dipilih</span>
              <strong>{benefit.title}</strong>
              <p>{benefit.body}</p>
            </div>
            {questions.length > 0 && (
              <div className="industry-questions">
                <span>Contoh tanya jawab</span>
                <div
                  className="industry-questionButtons"
                  aria-label="Pilih contoh pertanyaan"
                >
                  {questions.map((q, i) => (
                    <button
                      key={q.q}
                      type="button"
                      aria-pressed={question === i}
                      onClick={() => setQuestion(i)}
                    >
                      Pertanyaan {i + 1}
                    </button>
                  ))}
                </div>
                <div className="cl-chat" aria-live="polite">
                  <p className="cl-patient">
                    {questions[question].q}
                    <CheckCheck size={13} />
                  </p>
                  <p className="cl-answer">{questions[question].a}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
