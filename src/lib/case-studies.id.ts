import type { CaseStudyLocalizedCopy } from "./case-studies.ja";

/** Editorial copy for Indonesian case studies; official names and figures stay unchanged. */
export const CASE_STUDIES_ID: Record<string, CaseStudyLocalizedCopy> = {
  euromedica: {
    industry: "Kesehatan",
    useCases: ["CRM"],
    title: "Tingkat pemesanan Euromedica Group mencapai 25–30%",
    summary:
      "Euromedica Group menghubungkan percakapan, bantuan kecerdasan buatan, dan CRM agar calon pelanggan dari TikTok berlanjut hingga membuat janji di klinik.",
    outcomes: [
      {
        value: ">5×",
        label: "kenaikan tingkat pemesanan yang dilaporkan",
        detail:
          "Menurut Renny, balasan otomatis di luar jam kerja serta CRM untuk mengelola dan menindaklanjuti calon pelanggan turut mendorong kenaikan ini. Angka tersebut merupakan kenaikan yang dilaporkan di tingkat grup, bukan perubahan dalam poin persentase.",
      },
      {
        value: "25–30%",
        label: "tingkat pemesanan Euromedica Group",
        detail:
          "Renny menyebut angka ini sebagai tingkat pemesanan grup saat wawancara berlangsung. Kenaikan lebih dari lima kali menunjukkan pertumbuhan yang dilaporkan, sedangkan kisaran ini menunjukkan tingkat pemesanan pada saat itu.",
      },
      {
        value: "~3×",
        label: "rasio klik-tayang meningkat sekitar tiga kali lipat",
        detail:
          "Menurut Renny, rasio klik-tayang yang lebih tinggi membantu menekan biaya perolehan calon pelanggan. Wawancara hanya menyebut perkiraan kenaikannya, bukan angka sebelum dan sesudahnya.",
      },
      {
        value: "32%",
        label: "tingkat konversi yang dilaporkan",
        detail:
          "Renny menyebut angka ini sebagai ukuran konversi yang terpisah dari tingkat pemesanan. Wawancara tidak menjelaskan cara menghitungnya atau memberikan angka pembanding sebelum penggunaan Cekat.AI.",
      },
    ],
    interview: {
      name: "Renny Hasibuan",
      role: "Manajer Umum Pemasaran, Euromedica Group",
    },
    about: [
      "Euromedica Group mengelola jaringan klinik kecantikan dan estetika dengan 121 unit usaha di Indonesia. Merek-mereknya antara lain Skin+ Slim+ Clinic dan Yeuu Hair Lab, yang menggunakan teknologi perawatan rambut Korea.",
      "Bagi Euromedica, TikTok bukan sekadar tempat mengunggah konten, tetapi juga sumber calon pelanggan. Tim pemasaran perlu mengubah ketertarikan di internet menjadi percakapan dan kunjungan klinik, lalu melihat calon pelanggan mana yang akhirnya membuat janji.",
    ],
    challenge: {
      paragraphs: [
        "Calon pelanggan dari TikTok baru bernilai bagi Euromedica Group jika percakapannya berlanjut menjadi pemesanan dan kunjungan klinik. Banyaknya calon pelanggan perlu diimbangi dengan respons yang baik agar minat mereka tidak berhenti di pesan langsung.",
        "Asisten kecerdasan buatan dan staf perlu menangani banyak calon pelanggan sekaligus, termasuk pertanyaan tentang kondisi kulit dan berbagai promo. Tim pemasaran juga perlu tahu di tahap mana calon pelanggan berhenti sebelum membuat janji kunjungan.",
      ],
      quote:
        "Dari jumlah sebanyak itu, kami tetap bisa mendapatkan calon pelanggan yang berkualitas.",
    },
    solutions: {
      intro:
        "Euromedica Group menghubungkan proses sejak percakapan pertama hingga tindak lanjut oleh tim.",
      quote:
        "Asisten kecerdasan buatan harus bisa memberi saran sekaligus memahami perasaan pelanggan.",
      steps: [
        {
          title:
            "Satukan pesan TikTok dan percakapan calon pelanggan di satu tempat",
          body: "Euromedica memakai satu ruang kerja untuk melihat percakapan dari berbagai kanal, termasuk pesan langsung TikTok. Agen dapat menanggapi calon pelanggan tanpa berpindah-pindah aplikasi. Tampilan bersama ini membantu staf dan asisten kecerdasan buatan menangani percakapan serta proses pemesanan, termasuk saat banyak calon pelanggan menghubungi sekaligus.",
        },
        {
          title: "Jawab pertanyaan perawatan dengan empati dan jelaskan promo",
          body: "Asisten kecerdasan buatan menanggapi pertanyaan awal dengan nada yang hangat dan membantu, bukan langsung menyebut harga perawatan. Asisten ini juga mendukung pembayaran digital dan menghitung potongan harga dari berbagai promo. Saat pelanggan bertanya tentang masalah kulit, jawaban dapat disesuaikan dengan kebutuhannya sekaligus memperhitungkan promo dan cara pembayaran.",
        },
        {
          title: "Lacak tahap yang membuat calon pelanggan berhenti",
          body: "Fitur pelacakan CRM yang dapat disesuaikan menunjukkan perjalanan calon pelanggan dan tahap saat mereka berhenti. Tim dapat mengatur tahap yang ingin dipantau, melihat bagian yang perlu diperbaiki, lalu menentukan kapan perlu menindaklanjuti atau menjaga hubungan dengan pelanggan.",
        },
      ],
    },
    results: {
      intro:
        "Angka-angka berikut merangkum hasil yang tercatat dalam studi kasus ini.",
      quote: "Tingkat konversi kami sekarang 32%.",
    },
    profile: {
      location: "Indonesia",
      companySize: "121 unit usaha",
      services: ["Kotak Masuk Semua Kanal", "Asisten Kecerdasan Buatan", "CRM"],
    },
  },
  holywings: {
    industry: "Makanan & Minuman",
    useCases: ["Percakapan"],
    title: "HolyWings memantau lebih dari 90% alur konversi di setiap merek",
    summary:
      "Percakapan pelanggan dari berbagai merek restoran dan hiburan tersebar di banyak tempat. Tim pun kesulitan melihat percakapan mana yang berujung pada transaksi.",
    outcomes: [
      {
        value: "6–10%",
        label: "tingkat konversi",
        detail:
          "Materi studi kasus mencatat tingkat konversi 6–10% dalam alur interaksi yang dipantau. Angka ini berlaku untuk alur tersebut, bukan untuk setiap merek secara terpisah.",
      },
      {
        value: "<3 menit",
        label: "rata-rata waktu respons",
        detail:
          "Rata-rata waktu respons yang dilaporkan kurang dari tiga menit, sehingga pelanggan tidak perlu menunggu lama setelah menghubungi tim.",
      },
      {
        value: "<15%",
        label: "calon pelanggan yang berhenti di tengah proses",
        detail:
          "Kurang dari 15% calon pelanggan berhenti di tengah perjalanan yang dipantau. Tim dapat melihat pada tahap mana pertanyaan tidak berlanjut.",
      },
      {
        value: ">90%",
        label: "alur konversi yang terlihat di tiap merek",
        detail:
          "Pemantauan berdasarkan merek membantu grup melihat sebagian besar alur konversi tanpa kehilangan konteks masing-masing merek. Sumber tidak menyatakan bahwa angka ini berlaku secara terpisah untuk setiap merek.",
      },
    ],
    interview: {
      name: "Michelle Tan",
      role: "Kepala Operasional Merek",
    },
    about: [
      "HolyWings mengelola berbagai merek restoran dan hiburan. Pesan pelanggan bisa ditujukan ke merek atau cabang yang berbeda, jadi tim perlu merespons dengan cepat sambil tetap mengetahui perjalanan pelanggan di tiap merek.",
      "Pertanyaan dari calon pengunjung tidak selalu perlu ditangani oleh tim yang sama. Studi kasus ini membahas cara mengarahkan pesan sesuai merek dan melihat perjalanannya hingga menjadi calon pelanggan yang siap ditindaklanjuti.",
    ],
    challenge: {
      paragraphs: [
        "Sebelum menggunakan Cekat.AI, HolyWings melayani pelanggan dari berbagai merek restoran dengan keterbatasan dalam melihat seluruh prosesnya.",
        "Karena percakapan tersebar di berbagai merek, tim sulit mengetahui pertanyaan mana yang sudah dijawab, perlu ditindaklanjuti, atau harus diteruskan ke orang yang tepat. Akibatnya, balasan bisa terlambat dan calon pelanggan berisiko tidak melanjutkan percakapan.",
      ],
      quote:
        "Dengan banyaknya merek, kami mudah kehilangan jejak tim mana yang perlu menindaklanjuti sebuah percakapan.",
    },
    solutions: {
      intro:
        "HolyWings menghubungkan proses sejak pelanggan mengirim pesan hingga tim menindaklanjutinya.",
      quote:
        "Kami membutuhkan satu tampilan untuk melihat pesan masuk, tanpa menghilangkan konteks tiap merek bagi tim yang menanganinya.",
      steps: [
        {
          title: "Lihat percakapan semua merek tanpa mencampur konteksnya",
          body: "Kotak masuk yang menggabungkan berbagai kanal memberi grup satu tempat untuk melihat percakapan, sekaligus menjaga informasi tentang merek yang dituju. Pengelola dapat melihat pertanyaan yang belum dijawab, sementara petugas tetap tahu cabang atau merek yang perlu merespons.",
        },
        {
          title: "Tanggapi pertanyaan pengunjung tentang cabang dengan cepat",
          body: "Sistem percakapan membantu tim memberi jawaban awal tepat waktu dan mengarahkan pelanggan yang bertanya tentang layanan grup. Respons awal yang cepat menjaga minat pelanggan dan memperjelas langkah berikutnya.",
        },
        {
          title: "Arahkan setiap pertanyaan ke tim merek yang tepat",
          body: "Tim dapat memahami kebutuhan calon pelanggan lalu meneruskannya ke tim merek yang sesuai, alih-alih membiarkannya di antrean pesan umum. Dengan begitu, pertanyaan tidak tertahan di satu tempat setelah tim mengetahui siapa yang perlu menanganinya.",
        },
      ],
    },
    results: {
      intro:
        "Angka-angka berikut merangkum hasil yang tercatat dalam studi kasus ini.",
      quote:
        "Sekarang tim dapat melihat waktu respons dan perkembangan calon pelanggan di tiap merek, bukan memperlakukan semua pesan sebagai satu antrean.",
    },
    profile: {
      location: "Cabang di seluruh Indonesia (HW Group)",
      companySize: "501–1.000 karyawan",
      services: [
        "Kotak Masuk Semua Kanal",
        "Sistem Percakapan",
        "Penyaluran Calon Pelanggan",
      ],
    },
  },
  "sparks-sports-academy": {
    industry: "Pendidikan",
    useCases: ["Kecerdasan Buatan"],
    title:
      "Sparks Sports Academy memangkas waktu pelatihan staf baru hingga 50%",
    summary:
      "Pelatihan staf layanan pelanggan baru berlangsung lama dan tidak seragam. Akibatnya, cara mereka menangani percakapan pun berbeda-beda.",
    outcomes: [
      {
        value: "20–30%",
        label: "tingkat pemesanan dengan panduan kecerdasan buatan",
        detail:
          "Kisaran konversi yang dilaporkan berlaku bagi staf yang memakai panduan kecerdasan buatan dalam alur percakapan hingga pemesanan, bukan untuk semua percakapan di akademi.",
      },
      {
        value: "30–50%",
        label: "waktu pelatihan staf baru lebih singkat",
        detail:
          "Jalur belajar yang lebih terstruktur mengurangi waktu yang dibutuhkan staf baru untuk memahami alur kerja, sehingga mereka bisa lebih cepat mulai melayani pelanggan.",
      },
      {
        value: "80–90%",
        label: "skor kualitas penyelesaian pelatihan",
        detail:
          "Skor ini menunjukkan seberapa baik staf menyelesaikan proses pelatihan dengan dukungan sistem, bukan tingkat kepuasan pelanggan.",
      },
      {
        value: "Konsisten",
        label: "mutu pelatihan di setiap angkatan",
        detail:
          "Panduan yang sama mengurangi perbedaan mutu pelatihan antarangkatan. Sumber tidak mencantumkan angka persentase untuk hasil kualitatif ini.",
      },
    ],
    interview: {
      name: "Bagas Hidayat",
      role: "Kepala Pelatihan Layanan Pelanggan",
    },
    about: [
      "Staf layanan pelanggan Sparks Sports Academy membantu keluarga memilih program olahraga dan membuat pemesanan melalui percakapan. Saat staf baru bergabung, mutu layanan bergantung pada seberapa cepat mereka memahami panduan yang tepat.",
      "Studi kasus ini membahas proses belajar staf sekaligus layanan kepada pelanggan. Akademi membutuhkan cara untuk menyiapkan staf baru tanpa mengurangi konsistensi jawaban tentang kelas dan pemesanan.",
    ],
    challenge: {
      paragraphs: [
        "Sebelum menggunakan Cekat.AI, Sparks Sports Academy mengandalkan pelatihan awal dan pendampingan manual untuk menyiapkan staf layanan pelanggan. Saat kebutuhan pelatihan meningkat, tim kesulitan meningkatkan pemesanan dari percakapan, mempersingkat masa belajar, dan menjaga mutu tiap angkatan tetap konsisten.",
        "Pelatihan manual menyita waktu staf berpengalaman dan hasilnya bisa berbeda di tiap angkatan. Di saat yang sama, staf baru sudah harus menjawab pertanyaan pelanggan dan membantu mereka memesan program.",
      ],
      quote:
        "Setiap angkatan baru perlu didampingi, tetapi mutu percakapan dengan pelanggan juga harus tetap terjaga.",
    },
    solutions: {
      intro:
        "Sparks Sports Academy menggabungkan panduan saat staf melayani pelanggan dengan proses pelatihan yang dapat diulang.",
      quote:
        "Panduan saat percakapan berlangsung membantu staf baru menjawab dengan lebih yakin, tanpa harus menunggu pelatih memeriksa setiap pesan.",
      steps: [
        {
          title: "Dampingi staf saat menangani pertanyaan pemesanan",
          body: "Staf mendapat bantuan saat menjawab pertanyaan, termasuk saran langkah berikutnya agar percakapan dapat berlanjut ke pemesanan. Staf tetap menentukan jawaban akhir yang diberikan kepada keluarga.",
        },
        {
          title: "Siapkan jalur pelatihan yang bisa diikuti setiap staf baru",
          body: "Staf baru dapat berlatih melalui proses yang lebih terstruktur, tanpa sepenuhnya bergantung pada pendampingan satu per satu. Alur belajar bersama juga mengurangi ketergantungan pada ketersediaan dan kebiasaan satu pelatih tertentu.",
        },
        {
          title: "Jaga mutu jawaban tetap konsisten di setiap angkatan",
          body: "Panduan bersama menjadi acuan saat staf menjawab pertanyaan pelanggan. Tim dapat membandingkan kesiapan tiap angkatan berdasarkan standar yang sama, bukan hanya kesan pribadi.",
        },
      ],
    },
    results: {
      intro:
        "Angka-angka berikut merangkum hasil yang tercatat dalam studi kasus ini.",
      quote:
        "Manfaatnya terasa di dua sisi: staf lebih cepat siap, dan pelanggan mendapat jawaban yang lebih konsisten.",
    },
    profile: {
      location: "Jakarta Utara, Indonesia",
      companySize: "51–200 karyawan",
      services: [
        "Panduan Kecerdasan Buatan untuk Staf",
        "Otomatisasi Pelatihan Awal",
      ],
    },
  },
  "kb-insurance": {
    industry: "Layanan Profesional",
    useCases: ["Percakapan"],
    title: "Pusat layanan pelanggan KB Insurance siap melayani 24 jam",
    summary:
      "Waktu tunggu yang lama dan informasi yang tersebar membuat jawaban tidak konsisten dan keluhan pelanggan sering muncul.",
    outcomes: [
      {
        value: "24/7",
        label: "layanan pelanggan tersedia sepanjang waktu",
        detail:
          "Pelanggan dapat menghubungi pusat layanan kapan saja, termasuk di luar jam kerja. Ketersediaan ini berlaku untuk kanal layanan, bukan berarti semua klaim yang rumit diselesaikan otomatis.",
      },
      {
        value: "Lebih akurat",
        label: "jawaban dari panduan informasi terpusat",
        detail:
          "Jawaban menjadi lebih akurat karena alur respons merujuk pada satu sumber informasi yang dikelola bersama. Materi studi kasus menjelaskan hasil ini secara kualitatif dan tidak mencantumkan persentase.",
      },
      {
        value: "Lebih konsisten",
        label: "jawaban untuk setiap pertanyaan",
        detail:
          "Sumber informasi bersama mengurangi kemungkinan pelanggan menerima jawaban berbeda untuk pertanyaan yang sama, terutama saat mereka kembali bertanya.",
      },
      {
        value: "Berkurang",
        label: "jumlah keluhan pelanggan",
        detail:
          "Penanganan yang lebih cepat dan jelas menyertai penurunan keluhan yang dilaporkan. Sumber tidak menyebutkan jumlah keluhan sebelum dan sesudahnya.",
      },
    ],
    interview: {
      name: "Intan Maharani",
      role: "Manajer Layanan Pelanggan",
    },
    about: [
      "KB Insurance Indonesia menangani berbagai pertanyaan pelanggan, mulai dari informasi polis sehari-hari hingga permintaan bantuan mendesak. Pusat layanan perlu siap saat pelanggan menghubungi dan menggunakan sumber informasi yang sama.",
      "Pertanyaan yang masuk beragam: ada yang rutin, ada pula yang membutuhkan perhatian lebih. Studi kasus ini berfokus pada penggunaan acuan jawaban bersama agar pelanggan mendapat respons awal yang dapat diandalkan kapan saja.",
    ],
    challenge: {
      paragraphs: [
        "Sebelum menggunakan Cekat.AI, pelanggan KB Insurance harus menunggu lama dan kerap menerima jawaban yang berbeda. Informasi yang tersebar juga membingungkan dan memicu keluhan.",
        "Waktu tunggu yang lama dan informasi yang sulit dicari menyulitkan pelanggan maupun petugas. Ketika pertanyaan serupa dijawab dengan cara berbeda, pelanggan bisa kebingungan, menghubungi tim berulang kali, lalu menyampaikan keluhan.",
      ],
      quote:
        "Pelanggan harus menunggu lama. Jawaban yang berbeda untuk pertanyaan serupa membuat pengalaman mereka semakin sulit.",
    },
    solutions: {
      intro:
        "KB Insurance Indonesia menyatukan tampilan layanan, informasi yang dikelola bersama, dan respons awal yang tersedia setiap saat.",
      quote:
        "Dengan menempatkan informasi di satu tempat, tim dapat memberi jawaban yang seragam, termasuk saat pertanyaan masuk di luar jam kerja.",
      steps: [
        {
          title: "Satukan pertanyaan pelanggan dalam satu tampilan layanan",
          body: "Pertanyaan pelanggan masuk ke dalam satu alur layanan sehingga tim lebih mudah melihat persoalan yang belum selesai dan langkah selanjutnya. Petugas juga dapat melanjutkan penanganan tanpa meminta pelanggan mengulang seluruh ceritanya.",
        },
        {
          title: "Gunakan sumber informasi yang sama dan selalu diperbarui",
          body: "Balasan otomatis merujuk pada panduan informasi bersama agar pertanyaan berulang tentang polis dan layanan dijawab dengan lebih konsisten. Satu acuan juga mengurangi risiko perbedaan jawaban hanya karena pertanyaan diterima oleh petugas yang berbeda.",
        },
        {
          title: "Sediakan jawaban awal yang dapat diandalkan kapan saja",
          body: "Respons awal membantu menjawab pertanyaan umum dan menerima permintaan bantuan di luar jam kerja. Permintaan rutin dapat ditangani dengan cepat, sementara persoalan yang memerlukan pertimbangan tetap diteruskan kepada petugas.",
        },
      ],
    },
    results: {
      intro:
        "Angka-angka berikut merangkum hasil yang tercatat dalam studi kasus ini.",
      quote:
        "Pelanggan kini tahu harus mulai dari mana, dan tim punya acuan bersama saat sebuah kasus perlu ditangani lebih lanjut.",
    },
    profile: {
      location: "Jakarta, Indonesia",
      companySize: "51–200 karyawan",
      services: [
        "Pusat Layanan Pelanggan Semua Kanal",
        "Otomatisasi Basis Pengetahuan",
      ],
    },
  },
  "asuransi-simas-insurtech": {
    industry: "Layanan Profesional",
    useCases: ["Pesanan"],
    title:
      "Asuransi Simas Insurtech mempercepat waktu respons hingga lima kali lipat",
    summary:
      "Sistem yang terpisah menyulitkan tim menangani pertanyaan dan keluhan. Pemeriksaan manual juga memperlambat proses penentuan harga asuransi.",
    outcomes: [
      {
        value: "24/7",
        label: "layanan tersedia di semua kanal",
        detail:
          "Pelanggan dapat memulai percakapan kapan saja melalui sistem kontak terpadu, meski petugas khusus belum bisa langsung menangani kasus yang rumit.",
      },
      {
        value: "5×",
        label: "waktu respons lebih cepat",
        detail:
          "Peningkatan yang dilaporkan terjadi karena langkah manual antara pertanyaan masuk dan jawaban awal yang berguna menjadi lebih sedikit. Angka ini tidak berarti setiap permintaan selalu ditangani dengan kecepatan yang sama.",
      },
      {
        value: "Konversi meningkat",
        label: "berkat sistem kontak yang terpadu dan selalu tersedia",
        detail:
          "Jalur komunikasi yang konsisten membantu mengurangi hambatan saat pelanggan mencari informasi dan meminta harga. Sumber tidak mencantumkan persentase kenaikan konversi.",
      },
      {
        value: "Keluhan berkurang",
        label: "setelah sistem disatukan",
        detail:
          "Penanganan yang terpadu memberi tim jalur yang lebih jelas untuk menyelesaikan masalah dan menyertai penurunan keluhan yang dilaporkan. Sumber tidak menyebutkan jumlah keluhan.",
      },
    ],
    interview: {
      name: "Rizky Mahendra",
      role: "Manajer Operasional Pelanggan",
    },
    about: [
      "Asuransi Simas Insurtech melayani pelanggan yang membutuhkan informasi tentang polis, harga, dan klaim. Karena proses layanan bergantung pada beberapa sistem internal, informasi perlu tersedia dalam satu alur saat pelanggan menghubungi tim.",
      "Studi kasus ini mencakup jawaban atas pertanyaan pelanggan dan pemeriksaan data kendaraan untuk permintaan harga asuransi. Sebelumnya, kedua pekerjaan tersebut memakai alat yang berbeda dan memerlukan pemeriksaan manual.",
    ],
    challenge: {
      paragraphs: [
        "Sebelum menggunakan Cekat.AI, Simas Insurtech mengandalkan sistem yang terpisah-pisah. Tim pun kesulitan menangani pertanyaan dan keluhan dengan efisien, sementara proses manual memperlambat pemeriksaan harga asuransi.",
        "Petugas harus berpindah-pindah sistem saat menjawab pertanyaan dan keluhan. Pemeriksaan dokumen kendaraan secara manual menambah langkah dalam permintaan harga, sehingga pelanggan lebih lama menunggu jawaban yang berguna.",
      ],
      quote:
        "Petugas bisa sedang menjawab pelanggan sambil mencari informasi yang dibutuhkan di sistem lain.",
    },
    solutions: {
      intro:
        "Asuransi Simas Insurtech menghubungkan layanan pelanggan, pemeriksaan dokumen, dan bantuan awal.",
      quote:
        "Setelah alur layanan dan pembacaan dokumen terhubung, kami bisa memberi jawaban yang dibutuhkan dengan lebih sedikit langkah manual.",
      steps: [
        {
          title: "Tangani pertanyaan dan keluhan dalam satu alur layanan",
          body: "Percakapan pelanggan dan informasi dari sistem terkait disatukan agar pertanyaan maupun keluhan dapat ditangani dari awal sampai selesai. Konteks percakapan tetap tersimpan saat penanganan berlanjut dari jawaban awal ke kasus layanan yang lebih rumit.",
        },
        {
          title: "Baca dokumen kendaraan tanpa mengetik ulang semua data",
          body: "Teknologi OCR membaca dokumen kendaraan untuk mengurangi entri data berulang saat memeriksa harga asuransi. Tim tetap dapat memeriksa data yang tidak biasa, dengan lebih sedikit proses pemindahan informasi dari dokumen ke sistem.",
        },
        {
          title: "Sediakan bantuan awal di luar jam layanan",
          body: "Balasan otomatis menjaga kanal layanan tetap tersedia, sementara pertanyaan asuransi yang rumit tetap diteruskan melalui alur penanganan yang sesuai. Kasus yang membutuhkan pertimbangan khusus tentang polis tetap ditangani oleh petugas.",
        },
      ],
    },
    results: {
      intro:
        "Angka-angka berikut merangkum hasil yang tercatat dalam studi kasus ini.",
      quote:
        "Perubahan yang paling terasa adalah petugas bisa lebih cepat melihat konteks yang tepat saat menangani pertanyaan.",
    },
    profile: {
      location: "Jakarta, Indonesia",
      companySize: "51–100 karyawan",
      services: [
        "Layanan Kontak Terpadu",
        "Otomatisasi Pembacaan Dokumen (OCR)",
      ],
    },
  },
  "asri-agung-sedayu": {
    industry: "Properti",
    useCases: ["Pemasaran"],
    title: "ASRI meningkatkan interaksi pelanggan di mal hingga 500%",
    summary:
      "Nomor WhatsApp yang berbeda di setiap mal membuat data pelanggan terpencar dan interaksi sulit ditingkatkan.",
    outcomes: [
      {
        value: "1,5×",
        label: "kepuasan pelanggan meningkat (CSAT)",
        detail:
          "Kenaikan CSAT yang dilaporkan menunjukkan bahwa layanan yang lebih terhubung membantu menciptakan pengalaman pelanggan yang lebih baik.",
      },
      {
        value: "500%",
        label: "peningkatan interaksi melalui pesan masuk",
        detail:
          "Interaksi melalui pesan masuk meningkat setelah pelanggan memiliki jalur yang lebih jelas dan konsisten untuk menghubungi ASRI. Studi kasus tidak merinci kenaikan ini per lokasi.",
      },
      {
        value: "24/7",
        label: "layanan tersedia di setiap mal",
        detail:
          "Kanal bersama dapat menerima dan membantu menjawab pertanyaan di luar jam operasional tiap mal. Ketersediaan ini menjadi pintu masuk pertanyaan, bukan jaminan bahwa setiap kasus selesai otomatis.",
      },
      {
        value: "Loyalitas meningkat",
        label: "program loyalitas aktif di berbagai mal",
        detail:
          "Informasi pelanggan yang terpusat memudahkan tim menjalankan program loyalitas di berbagai lokasi. Sumber tidak menyebutkan angka kenaikan untuk hasil ini.",
      },
    ],
    interview: {
      name: "Nadia Pratama",
      role: "Kepala Pengalaman Pelanggan",
    },
    about: [
      "ASRI mengelola hubungan pelanggan di jaringan mal yang tersebar di Indonesia. Pengunjung bisa berinteraksi dengan beberapa mal, promo, dan program loyalitas. Tim layanan perlu melihat riwayat percakapan yang saling terhubung agar setiap interaksi tetap relevan.",
      "Studi kasus ini membahas layanan pelanggan di berbagai mal: bagaimana pengunjung menghubungi ASRI, bagaimana percakapan mereka tercatat, dan bagaimana informasi tersebut mendukung program loyalitas di lebih dari satu lokasi.",
    ],
    challenge: {
      paragraphs: [
        "Sebelum menggunakan Cekat.AI, ASRI mengelola banyak nomor WhatsApp untuk berbagai mal di Indonesia. Data pelanggan pun terpencar, komunikasi program loyalitas kurang efektif, dan interaksi pelanggan masih rendah.",
        "Dengan nomor WhatsApp yang terpisah, percakapan di satu mal tidak otomatis memberi konteks bagi mal lain. Catatan pelanggan dan komunikasi program loyalitas tersebar, sehingga tindak lanjut sulit dikoordinasikan dan pesan masuk tidak dimanfaatkan dengan baik.",
      ],
      quote:
        "Percakapan datang dari banyak mal, tetapi informasi tentang pelanggannya masih tersimpan di tempat yang berbeda-beda.",
    },
    solutions: {
      intro:
        "ASRI menghubungkan percakapan pelanggan, informasi lokasi, dan tindak lanjut program loyalitas.",
      quote:
        "Perubahan pentingnya adalah tim bisa melanjutkan percakapan dari satu tempat, mal mana pun yang pertama kali dihubungi pelanggan.",
      steps: [
        {
          title: "Satukan percakapan dari semua mal dalam satu kanal WhatsApp",
          body: "Dengan menyatukan percakapan dari berbagai mal ke satu kanal layanan berbasis kecerdasan buatan, tim memiliki satu tempat untuk mulai menangani pertanyaan. Jalur bersama ini juga memperjelas siapa yang bertanggung jawab memberi jawaban berikutnya.",
        },
        {
          title: "Hubungkan informasi pelanggan di setiap lokasi",
          body: "Data percakapan terpusat membantu tim melihat riwayat pelanggan dari berbagai titik interaksi, bukan hanya catatan di satu mal. Informasi dari pertanyaan sebelumnya tetap berguna saat pengunjung kembali melalui promo lain atau bertanya tentang mal yang berbeda.",
        },
        {
          title: "Jadikan tindak lanjut program loyalitas lebih terkoordinasi",
          body: "Otomatisasi pemasaran membantu tim mengirim pesan tindak lanjut dan informasi loyalitas yang lebih sesuai, tanpa meminta tiap mal mengelola prosesnya sendiri. Tim dapat menyusun tindak lanjut berdasarkan informasi yang terkumpul dari percakapan pelanggan.",
        },
      ],
    },
    results: {
      intro:
        "Angka-angka berikut merangkum hasil yang tercatat dalam studi kasus ini.",
      quote:
        "Dengan riwayat kontak yang saling terhubung, tim kami punya gambaran yang lebih jelas saat melayani pengunjung yang kembali.",
    },
    profile: {
      location: "Jakarta, Indonesia",
      companySize: "201–500 karyawan",
      services: ["WhatsApp Terpadu", "Otomatisasi Pemasaran", "CRM Loyalitas"],
    },
  },
  "bpjs-ketenagakerjaan": {
    industry: "Pemerintahan",
    useCases: ["Pembayaran"],
    title: "BPJS Ketenagakerjaan menggandakan kepatuhan pembayaran tepat waktu",
    summary:
      "Salah satu kantor cabang terbesarnya mengandalkan pengingat pembayaran manual. Akibatnya, tunggakan masih ada dan catatan sulit ditelusuri.",
    outcomes: [
      {
        value: "2×",
        label: "kepatuhan membayar tepat waktu meningkat",
        detail:
          "Uji coba di kantor cabang tersebut mencatat kepatuhan membayar tepat waktu meningkat dua kali lipat setelah pengingat dibuat lebih teratur. Hasil ini berasal dari uji coba di cabang tersebut.",
      },
      {
        value: "Keluhan berkurang",
        label: "kepuasan pelanggan meningkat",
        detail:
          "Komunikasi dan pencatatan yang lebih jelas disertai penurunan keluhan serta peningkatan kepuasan yang dilaporkan. Sumber tidak mencantumkan jumlah keluhan atau nilai kepuasannya.",
      },
      {
        value: "Biaya lebih rendah",
        label: "untuk setiap pengingat yang dikirim",
        detail:
          "Otomatisasi pengingat menurunkan biaya per pesan dibandingkan proses sebelumnya. Studi kasus tidak menyebutkan nominal biaya lama dan baru.",
      },
      {
        value: "Satu",
        label: "jalur kontak untuk semua pertanyaan",
        detail:
          "Peserta memiliki satu jalur untuk mengajukan pertanyaan, tanpa harus mencari kanal tindak lanjut yang berbeda. Jalur bersama ini membantu tim menentukan penanggung jawab dan meneruskan percakapan setelah pengingat dikirim.",
      },
    ],
    interview: {
      name: "Dimas Saputra",
      role: "Manajer Layanan Cabang",
    },
    about: [
      "BPJS Ketenagakerjaan mengelola program jaminan sosial bagi para pekerja. Studi kasus ini membahas uji coba di salah satu kantor cabang terbesarnya, tempat pengingat pembayaran dan pertanyaan peserta menambah beban administrasi tim.",
      "Uji coba ini berfokus pada komunikasi rutin dengan peserta: pengingat, pencatatan, dan jalur untuk mengajukan pertanyaan. Hasil yang dilaporkan berasal dari uji coba di cabang, bukan berarti proses yang sama sudah diterapkan secara nasional.",
    ],
    challenge: {
      paragraphs: [
        "Sebelum menggunakan Cekat.AI, salah satu kantor cabang terbesar BPJS Ketenagakerjaan mengirim pengingat pembayaran secara manual. Tunggakan masih ada dan catatan pun menumpuk.",
        "Proses pengingat manual menyulitkan tim menghubungi peserta secara teratur dan memperbarui catatan pembayaran. Tunggakan serta catatan tindak lanjut yang terpencar juga membuat tim sulit mengetahui kasus mana yang perlu ditangani lebih dulu.",
      ],
      quote:
        "Saat pengingat dikirim satu per satu, kami sulit mengetahui peserta mana yang sudah dihubungi dan siapa yang masih perlu diingatkan.",
    },
    solutions: {
      intro:
        "BPJS Ketenagakerjaan menyatukan pengingat pembayaran, pencatatan peserta, dan jalur komunikasi dalam satu proses.",
      quote:
        "Kami ingin pengingat dan catatan pertanyaan berada dalam proses yang sama, supaya tim tidak menghabiskan banyak waktu memilah pesan.",
      steps: [
        {
          title: "Kirim pengingat pembayaran secara teratur",
          body: "Pesan otomatis menggantikan pengingat manual yang berulang dan membantu peserta menerima pemberitahuan pembayaran secara terjadwal. Tim tidak perlu menyusun ulang setiap pesan, sehingga pengingat dapat dikirim dengan pola yang lebih konsisten.",
        },
        {
          title: "Kelompokkan kasus peserta agar tindak lanjut lebih jelas",
          body: "Percakapan dan kasus terkait pembayaran diberi label agar catatan lebih mudah disusun dan ditindaklanjuti. Label membantu tim membedakan pertanyaan pembayaran yang masih tertunda dari kasus yang sudah berlanjut ke tahap berikutnya.",
        },
        {
          title: "Sediakan satu jalur untuk semua pertanyaan",
          body: "Satu jalur komunikasi dan alur panduan membantu kantor cabang meneruskan pertanyaan sekaligus mengurangi pekerjaan administrasi berulang. Tim dapat melihat pertanyaan peserta bersama riwayat pengingat, bukan memperlakukan setiap pesan sebagai kasus baru.",
        },
      ],
    },
    results: {
      intro: "Angka-angka berikut merangkum hasil uji coba di kantor cabang.",
      quote:
        "Perubahan yang paling terasa adalah proses pengingat pembayaran kini bisa dipantau dengan catatan yang lebih rapi.",
    },
    profile: {
      location: "336 kantor layanan di seluruh Indonesia",
      companySize: "336 kantor cabang dan wilayah di seluruh Indonesia",
      services: ["Pengingat Pembayaran Otomatis", "Otomatisasi Alur Kerja"],
    },
  },
};
