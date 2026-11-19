import type { CaseStudy } from "./case-studies";

type IndonesianListingCopy = {
  title: string;
  summary: string;
  featuredOutcomeLabel: string;
};

export const CASE_STUDY_LISTING_COPY_ID: Record<string, IndonesianListingCopy> =
  {
    euromedica: {
      title: "Tingkat pemesanan Euromedica Group mencapai 25–30%",
      summary:
        "Dari calon pelanggan yang datang lewat TikTok hingga pemesanan klinik, Euromedica Group menyatukan percakapan, bantuan kecerdasan buatan, dan pengelolaan hubungan pelanggan (CRM) lewat Cekat.AI.",
      featuredOutcomeLabel: "kenaikan tingkat pemesanan yang dilaporkan",
    },
    holywings: {
      title: "HolyWings memantau lebih dari 90% alur konversi di tiap merek",
      summary:
        "Percakapan dari berbagai merek restoran dan hiburan tersebar, sehingga tim sulit melihat pertanyaan mana yang berujung pada transaksi.",
      featuredOutcomeLabel: "alur konversi yang terpantau per merek",
    },
    "sparks-sports-academy": {
      title:
        "Sparks Sports Academy memangkas waktu pelatihan staf baru hingga 50%",
      summary:
        "Pelatihan manual yang tidak seragam membuat staf layanan pelanggan baru lebih lama siap menangani percakapan. Mutu jawaban pun berbeda di tiap angkatan.",
      featuredOutcomeLabel: "waktu pelatihan staf baru lebih singkat",
    },
    "kb-insurance": {
      title: "KB Insurance menjaga layanan pelanggan tetap tersedia 24 jam",
      summary:
        "Waktu tunggu yang lama dan informasi yang tersebar membuat jawaban tidak seragam dan keluhan pelanggan sering muncul.",
      featuredOutcomeLabel: "layanan pelanggan tersedia sepanjang waktu",
    },
    "asuransi-simas-insurtech": {
      title: "Asuransi Simas Insurtech merespons pelanggan 5 kali lebih cepat",
      summary:
        "Sistem yang terpisah menyulitkan tim menangani pertanyaan dan keluhan. Pemeriksaan manual juga memperlambat proses penentuan harga asuransi.",
      featuredOutcomeLabel: "waktu respons lebih cepat",
    },
    "asri-agung-sedayu": {
      title: "ASRI meningkatkan interaksi pelanggan di mal hingga 500%",
      summary:
        "Nomor WhatsApp yang berbeda di setiap mal membuat data pelanggan terpencar dan interaksi sulit ditingkatkan.",
      featuredOutcomeLabel: "peningkatan interaksi melalui pesan masuk",
    },
    "bpjs-ketenagakerjaan": {
      title:
        "BPJS Ketenagakerjaan menggandakan kepatuhan pembayaran tepat waktu",
      summary:
        "Di salah satu kantor cabangnya yang terbesar, pengingat pembayaran manual menyisakan tunggakan dan membuat catatan sulit ditelusuri.",
      featuredOutcomeLabel: "peningkatan kepatuhan membayar tepat waktu",
    },
  };

export function localizeCaseStudyListing(
  study: CaseStudy,
  locale: string,
): CaseStudy {
  if (locale !== "id") return study;

  const copy = CASE_STUDY_LISTING_COPY_ID[study.slug];
  if (!copy) return study;

  return {
    ...study,
    title: copy.title,
    summary: copy.summary,
    outcomes: study.outcomes.map((outcome) =>
      outcome.value === study.featuredOutcome
        ? { ...outcome, label: copy.featuredOutcomeLabel }
        : outcome,
    ),
  };
}
