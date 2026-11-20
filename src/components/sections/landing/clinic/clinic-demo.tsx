"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Bell,
  CalendarDays,
  CheckCheck,
  MessageCircle,
  RotateCcw,
  UsersRound,
} from "lucide-react";

const previews = [
  {
    icon: CalendarDays,
    name: "Janji temu",
    title: "Konsultasi terkonfirmasi",
    detail: "Besok, 09.30 · Poli Umum",
    status: "Terkirim ke pasien",
    time: "21.08 WIB",
  },
  {
    icon: Bell,
    name: "Pengingat kunjungan",
    title: "Saatnya bersiap ke klinik",
    detail: "Hari ini, 09.30 · Poli Umum",
    status: "Pengingat terkirim",
    time: "07.30 WIB",
  },
  {
    icon: UsersRound,
    name: "Bantuan staf",
    title: "Terhubung ke front desk",
    detail: "Riwayat chat disertakan",
    status: "Diterima oleh staf",
    time: "08.05 WIB",
  },
];
export function ClinicPreview({ children }: { children: React.ReactNode }) {
  const [i, set] = useState(0);
  const item = previews[i];
  const Icon = item.icon;
  return (
    <figure className="cl-figure">
      <div className="cl-photo">
        {children}
        <span className="cl-online">
          <i />
          Asisten aktif
        </span>
        <div className="cl-ticket" key={i} aria-live="polite">
          <div className="cl-ticketHead">
            <span>
              <Icon size={16} />
              {item.name}
            </span>
            <small>{item.time}</small>
          </div>
          <strong>{item.title}</strong>
          <p>{item.detail}</p>
          <div className="cl-ticketFoot">
            <span>
              <Check size={13} />
              {item.status}
            </span>
            <small>WhatsApp</small>
          </div>
        </div>
      </div>
      <figcaption>
        <span>
          <i />
          Contoh alur pasien
        </span>
        <span>
          <button
            aria-label="Contoh sebelumnya"
            onClick={() => set((i + 2) % 3)}
          >
            <ArrowLeft size={14} />
          </button>
          0{i + 1} / 03
          <button
            aria-label="Contoh berikutnya"
            onClick={() => set((i + 1) % 3)}
          >
            <ArrowRight size={14} />
          </button>
        </span>
      </figcaption>
    </figure>
  );
}

export function ClinicMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    let alive = true,
      cleanup: (() => void) | undefined;
    void import("gsap").then(({ gsap }) => {
      if (!alive || media.matches) return;
      const ctx = gsap.context(() => {
        gsap.from(".cl-copy > *, .cl-figure", {
          y: 12,
          duration: 0.58,
          stagger: 0.055,
          ease: "power2.out",
          clearProps: "transform",
        });
      }, document.getElementById("clinic-top")!);
      cleanup = () => ctx.revert();
    });
    return () => {
      alive = false;
      cleanup?.();
    };
  }, []);
  return null;
}

const scenes = [
  {
    name: "Jawab pertanyaan",
    icon: MessageCircle,
    desc: "Gunakan informasi layanan klinik untuk menjawab pertanyaan rutin, termasuk di luar jam buka.",
    prompt: "Malam, besok poli umum buka jam berapa?",
    reply:
      "Halo! Besok poli umum buka pukul 08.00–16.00. Mau lihat pilihan jadwal?",
    actions: ["Lihat jadwal"],
  },
  {
    name: "Atur janji temu",
    icon: CalendarDays,
    desc: "Dengan integrasi sistem jadwal klinik, pasien bisa memilih waktu dan menerima konfirmasi di percakapan yang sama.",
    prompt: "Saya mau konsultasi besok pagi.",
    reply: "Untuk besok, ada dua waktu yang tersedia. Mana yang paling sesuai?",
    actions: ["09.30 WIB", "11.00 WIB"],
  },
  {
    name: "Alihkan ke staf",
    icon: UsersRound,
    desc: "Teruskan pertanyaan yang perlu ditangani manusia, beserta riwayat chat agar pasien tidak mengulang cerita.",
    prompt: "Saya ingin bicara dengan petugas klinik.",
    reply: "Tentu. Saya bisa teruskan percakapan ini ke tim front desk.",
    actions: ["Hubungkan ke staf"],
  },
];
export function ClinicDemo() {
  const [index, select] = useState(0),
    [result, setResult] = useState("");
  const scene = scenes[index];
  function change(i: number) {
    select(i);
    setResult("");
  }
  return (
    <section id="simulasi" className="cl-demo">
      <p className="cl-label">Simulasi layanan pasien</p>
      <h2>
        Satu chat, <em>tiga kemungkinan.</em>
      </h2>
      <div className="cl-demoGrid">
        <div className="cl-options">
          {scenes.map(({ name, icon: Icon, desc }, i) => (
            <button
              key={name}
              type="button"
              aria-pressed={index === i}
              onClick={() => change(i)}
            >
              <span>
                <small>0{i + 1}</small>
                <Icon size={20} />
                {name}
                <ArrowRight size={16} />
              </span>
              {index === i && <p>{desc}</p>}
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
                <strong>Asisten Klinik</strong>
                <small>Simulasi WhatsApp</small>
              </div>
              <button
                type="button"
                className="cl-reset"
                aria-label="Mulai ulang simulasi"
                onClick={() => change(0)}
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="cl-chat" key={index} aria-live="polite">
              <span className="cl-day">Hari ini</span>
              <p className="cl-patient">
                {scene.prompt}
                <CheckCheck size={13} />
              </p>
              <p className="cl-answer">{scene.reply}</p>
              {result ? (
                <>
                  <p className="cl-patient">
                    {result}
                    <CheckCheck size={13} />
                  </p>
                  <p className="cl-answer">
                    {index === 1
                      ? `Jadwal besok pukul ${result} terkonfirmasi. Sampai jumpa di klinik!`
                      : "Percakapan diteruskan ke front desk. Staf akan membaca riwayat chat Anda."}
                  </p>
                </>
              ) : (
                <div className="cl-replies">
                  {scene.actions.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => (index === 0 ? change(1) : setResult(a))}
                    >
                      {a}
                      <ArrowRight size={13} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
