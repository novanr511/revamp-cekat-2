# Pemeriksaan desain lokal `/cerita`

Status: **PASS untuk perubahan halaman ini**. Tidak ada deploy, push, atau perubahan halaman detail.

## Arah dan alasan desain

- Referensi: Apple Business Success Stories, diterapkan pada hierarki konten, bukan identitas mereknya.
- Dials: ENERGY 2 / RHYTHM 2 / MOTION 1.
- Warna: biru dan navy Cekat mempertahankan identitas; latar biru muda membedakan area wawancara dari pembuka.
- Tipografi: Google Sans Flex yang sudah dipakai situs dipertahankan untuk konsistensi dan keterbacaan.
- Tata letak: satu wawancara unggulan mendahului lima wawancara lainnya agar semua konten tidak bersaing dengan bobot yang sama.
- Panel kartu: foto dan panel putih menjadi satu kartu seperti koreksi referensi pengguna; nama perusahaan diikuti judul ringkasan cerita sebelum identitas narasumber dan tautan wawancara.
- Judul kartu: ringkasan topik mengacu pada thumbnail wawancara yang sudah ditampilkan (CRM AI Rumah Zakat, chatbot kampus MNP, pertumbuhan klinik VIO, teknologi DokterHub, dan peralihan usaha Threeland), tanpa angka baru.
- Jarak: pembuka yang lapang memberi fokus pada judul; jarak antarkartu memisahkan identitas pelanggan tanpa kotak dekoratif.
- Foto: potret Moir yang sudah tersedia dan thumbnail wawancara YouTube memakai sumber yang sudah ada, tanpa aset atau identitas buatan.
- Ikon: simbol play hanya menandai aksi video; tidak ada ikon dekoratif tambahan.
- Gerak: hanya umpan balik hover/active; animasi reveal lama dinonaktifkan khusus listing ini.
- Mobile: satu kolom dan tombol WhatsApp 56 × 56 px menjaga ruang baca; label aksesibel WhatsApp tetap tersedia.

## Hard Gate

- R-02 PASS: teks baru tidak menggunakan em dash; salinan halaman detail tidak diubah.
- R-03 PASS: Chromium pada 320, 390, 768, dan 1440 px tidak menemukan horizontal overflow; screenshot desktop/mobile diperiksa.
- R-17 PASS: tidak menambahkan angka hasil bisnis.
- R-18 PASS: enam identitas berasal dari registri wawancara pelanggan yang sudah ada.
- R-23 PASS: tidak membuat logo, foto, atau aset baru; perubahan susunan mengikuti permintaan pengguna.
- R-24 PASS: navigasi global tidak diubah dan tidak menambahkan rute baru.
- R-25 PASS: navy/putih 15,75:1, teks sekunder/latar biru muda 8,27:1, tautan biru/latar biru muda 6,37:1.
- R-26 PASS: masing-masing tombol foto dan teks pada enam kartu membuka video; tombol Tutup dan Escape menutupnya.
- R-27 PASS: daftar merupakan enam entri statis, tanpa pengambilan data remote; embed memiliki status loading dan tautan alternatif; kegagalan gambar memiliki fallback yang diuji.
- R-28 PASS: tidak menambahkan FAQ.
- R-32 PASS: aktivasi Enter, penutupan Escape, fokus di dialog, dan pengembalian fokus ke pemicu diperiksa di Chromium; indikator fokus tersedia.
- R-33 PASS: perubahan dibuat langsung melalui patch berkas sumber, bukan skrip penggantian CSS/source.
- R-34 PASS: tema terang merek dipertahankan; tidak menambahkan theme toggle.
- R-35 PASS: halaman dijalankan di localhost; seluruh 12 kontrol baru diuji pada empat lebar viewport; tidak ada page runtime error.
- R-36 PASS: headline unggulan memakai kutipan `home.trustedBy.quote`, bukan klaim baru.
- R-37 PASS: arah Cekat dari `DESIGN.md` dan referensi Apple digunakan sebelum implementasi.
- R-38 PASS: identitas, potret, dan video memakai konten yang sudah ada.
- R-39 PASS: kontrol berupa button/link native, dialog bernama, gambar ber-alt, ukuran target memadai, serta reduced motion dipenuhi.
- R-40 PASS: ruang gambar dan iframe dicadangkan dengan aspect ratio; gambar unggulan high priority; embed dimuat setelah tindakan pengguna. Lighthouse/Core Web Vitals tidak diukur.

## Purpose-Gate, liveliness, dan quality locks

- Purpose-Gate PASS: tujuan warna, layout, tipografi, jarak, media, ikon, dan gerak dicatat di atas; tidak menambahkan glow, glassmorphism, atau shadow kartu.
- Liveliness PASS: judul biru Cekat, potret unggulan, lalu grid wawancara memberikan titik fokus dan variasi sesuai dials.
- Craftsmanship PASS: konten asli, kontrol berfungsi, tampilan responsive, dan lokalisasi listing tersedia untuk id/en/cn/jp/kr; studi kasus yang sudah diterjemahkan tidak disentuh.

## Bukti interaksi dan validasi

- Moir Salon: foto dan Tonton wawancaranya → dialog video `ePdVgW7X01s`.
- Rumah Zakat: foto dan Tonton wawancaranya → dialog video `wvOip0Gkx30`.
- Multimedia Nusantara Polytechnic: foto dan Tonton wawancaranya → dialog video `O_xSafLehMQ`.
- VIO Optical Clinic: foto dan Tonton wawancaranya → dialog video `681luT0Aa68`.
- DokterHub: foto dan Tonton wawancaranya → dialog video `vmXUCHVo6k8`.
- Threeland Property: foto dan Tonton wawancaranya → dialog video `IezNIgsGH5I`.
- Semua dialog: Tutup/Escape → dialog tertutup, iframe dilepas, fokus kembali ke pemicu.
- Alternatif YouTube Moir → tab baru `https://www.youtube.com/watch?v=ePdVgW7X01s` terverifikasi; lima tautan lainnya memakai ID masing-masing dan diuji atributnya.
- `pnpm test`: 828 tes dalam 88 berkas lulus. Peringatan jsdom play/pause bawaan tetap muncul pada tes lama.
- `pnpm lint` dan `pnpm typecheck`: lulus.
- Prettier berkas perubahan dan `git diff --check`: lulus.
- Console diperiksa: ada kegagalan DNS pada analytics lama `grw.cekat.ai`; tidak ada page runtime error atau kegagalan kontrol baru. Analytics tidak diubah.
- Scope click-through adalah kontrol listing yang dibuat/diubah; menu/footer global yang tidak diubah tidak diaudit ulang secara menyeluruh.

Pratinjau: <http://localhost:4173/cerita>.
