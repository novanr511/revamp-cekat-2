import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  HeartPulse,
  MessagesSquare,
  Plus,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ClinicDemo, ClinicMotion, ClinicPreview } from "./clinic-demo";
import "./clinic.css";

export function ClinicPage({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <div className="clinic-page" id="clinic-top">
      <ClinicMotion />
      <div className="cl-wrap">
        <nav className="cl-crumb" aria-label="Breadcrumb">
          <Link href="/industries">Industri</Link>
          <ChevronRight size={12} />
          Kesehatan
        </nav>
        <section className="cl-hero">
          <div className="cl-copy">
            <p className="cl-tag">
              <HeartPulse size={17} /> Cekat.AI untuk Kesehatan
            </p>
            <h1>
              Klinik tutup.
              <br />
              Pasien tetap
              <br />
              <em>terlayani.</em>
            </h1>
            <p className="cl-intro">
              Jawab pertanyaan, atur janji temu, dan kirim pengingat lewat chat.
              Bahkan setelah lampu klinik dipadamkan.
            </p>
            <div className="cl-actions">
              <a className="cl-btn" href="https://chat.cekat.ai/register">
                Mulai uji coba gratis <ArrowUpRight size={17} />
              </a>
              <a className="cl-textlink" href="#simulasi">
                Coba simulasi <ArrowDownRight size={16} />
              </a>
            </div>
          </div>
          <ClinicPreview>
            <Image
              src="/images/industries/healthcare-hero.webp"
              fill
              preload
              sizes="(max-width: 800px) 94vw, 50vw"
              alt="Dua tenaga kesehatan melihat tablet bersama di klinik"
            />
          </ClinicPreview>
        </section>
        <section
          className="cl-results"
          aria-label="Hasil klinik pengguna Cekat.AI"
        >
          <div>
            <p className="cl-label">Hasil di klinik</p>
            <h2>
              Dari praktik
              <br />
              <em>sehari-hari.</em>
            </h2>
          </div>
          {[
            ["+50%", "Pendapatan bulanan", "Vio Optical Clinic"],
            ["25–30%", "Tingkat pemesanan", "Euromedica Group"],
            ["+15–20%", "Pendapatan tahunan", "Dokterhub"],
          ].map(([val, what, who]) => (
            <div key={who}>
              <strong>{val}</strong>
              <p>{what}</p>
              <small>{who}</small>
            </div>
          ))}
        </section>
        <ClinicDemo />
        <section className="cl-story">
          <div className="cl-storyImage">
            <Image
              src="/images/case-studies/euromedica.webp"
              fill
              sizes="(max-width: 800px) 90vw, 42vw"
              alt="Studi kasus Euromedica Group"
            />
          </div>
          <div>
            <p className="cl-label">Cerita klinik · Euromedica</p>
            <h2>
              Dari percakapan
              <br />
              ke <em>kunjungan.</em>
            </h2>
            <p>
              Bagaimana Euromedica menghubungkan chat, tindak lanjut, dan CRM
              hingga tingkat pemesanan grup mencapai 25–30%.
            </p>
            <Link
              className="cl-textlink"
              href={{
                pathname: "/case-studies/[slug]",
                params: { slug: "euromedica" },
              }}
            >
              Baca studi kasus <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="cl-faq">
          <div>
            <p className="cl-label">Tanya jawab</p>
            <h2>
              Sebelum
              <br />
              <em>memulai.</em>
            </h2>
          </div>
          <div>
            {faq.map(({ q, a }) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="cl-close">
          <MessagesSquare size={27} />
          <h2>
            Coba untuk <em>klinik Anda.</em>
          </h2>
          <p>Lihat alur layanan pasien bersama tim Cekat.AI.</p>
          <Link className="cl-btn" href="/contact-sales">
            Jadwalkan demo <ArrowUpRight size={17} />
          </Link>
        </section>
      </div>
    </div>
  );
}
