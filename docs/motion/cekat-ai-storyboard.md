# Cekat.AI — One customer. One connected journey.

Storyboard dan production brief untuk OpenDesign Motion • 6 November 2026

**Status:** storyboard siap produksi, bukan video yang sudah dirender. Seluruh aset visual dan source animasi harus dibuat di dalam project OpenDesign. Tidak menggunakan screenshot, gambar, video, logo hasil unduhan, atau aset UI dari website Cekat.ai. Website dan dokumentasi hanya menjadi sumber informasi fitur.

## 1. Konsep

**Film utama:** 60 detik, 1920 × 1080, 16:9, 30 fps, total 1.800 frame.

**Audience:** pemilik bisnis, sales leader, marketing leader, dan operations team. Visual copy berbahasa Inggris agar sesuai arah global SaaS; catatan produksi berbahasa Indonesia.

**Cerita:** ikuti Maya, pelanggan fiktif Aura Store, dari iklan Instagram sampai pembelian dan campaign berikutnya. Satu identitas pelanggan dan satu sumber campaign tetap terbawa antarproduk. AI membantu tim, bukan menggantikan semua keputusan manusia.

**Pesan utama:** Cekat bukan sekadar chatbot. Marketing, Chat, CRM, dan Orders bekerja sebagai satu perjalanan pelanggan yang terhubung.

**Motif pengikat:** satu titik kecil di jalur bersudut 45° dengan rounded corners. Titik berarti konteks pelanggan; jalur berarti perpindahan informasi. Warna berubah berdasarkan modul, tetapi identitas Maya tidak berubah.

**Format:** product film dengan interaksi yang diperagakan, bukan screen recording. MP4 tidak bisa diklik. Source preview boleh memiliki Play/Pause/Replay dan timeline scrubber; itu terpisah dari film yang dirender.

## 2. Referensi: yang diambil dan yang ditinggalkan

Keempat video ditinjau melalui metadata dan contact sheet 12 frame yang tersebar sepanjang setiap video. Catatan ini berdasarkan visual sampled frames, bukan analisis audio atau review frame-by-frame.

| Referensi lampiran | Durasi | Bahasa visual yang diambil | Yang tidak dibawa |
|---|---:|---|---|
| `b4e54adb…be6e.mp4` | 34,005 dtk | Kamera melewati banyak panel lalu mengunci satu panel penting; angka besar sebagai beat; ending bersih | Presenter, gambar pelikan, skor benchmark, nuansa meme, aset video |
| `29bfb9c8…24fe.mp4` | 54,728 dtk | Kinetic typography, pergantian skala, contrast beat, produk sebagai fokus | Foto sepatu, logo Adidas/Starbucks, persentase promosi, model produk |
| `1969c576…0863.mp4` | 28,970 dtk | Close-up fitur, whitespace, komposisi panel terang/gelap, hero product ending | Screenshot website Anker, foto produk, harga dan klaim Anker |
| `9ff37594…6a15.mp4` | 34,701 dtk | Layer yang terurai lalu menyatu, asset-board reveal, sistem modular | Maskot Duolingo, mobil, footage presenter, logo dan statistik pihak lain |

**Hasil art direction:** perpaduan editorial SaaS, UI motion yang menjelaskan sebab-akibat, dan dua-tiga beat tipografi. Bukan montage iklan fisik dan bukan dashboard penuh yang terus berputar.

## 3. Fitur yang menjadi dasar cerita

| Area | Fitur terverifikasi dari teks publik | Demonstrasi dalam film |
|---|---|---|
| Marketing | Reports lintas sumber; rincian campaign/ad; tracking perilaku website; atribusi dan kolom Order Events; Meta CAPI | Sumber campaign melekat pada chat; laporan berisi Spend, Chats, Paid orders, Revenue, ROAS; event kembali ke Meta |
| Chat | Inbox omnichannel; AI berbasis business knowledge; pemahaman konteks; labels; routing/handoff | WhatsApp, Instagram, Web chat masuk ke inbox; AI menjawab, memberi label, dan mengalihkan ke manusia ketika diminta |
| CRM | Contacts, custom fields, labels, search/filter; board dan berbagai views; riwayat pesan | Data Maya tampil dalam profil, berpindah Table → Kanban; tim memindahkan opportunity dan melihat sumber serta percakapan |
| Orders / OMS | AI dapat membuat order berdasarkan percakapan jika integrasi diaktifkan; produk, pelanggan, ongkir, total; invoice | Pesan pembelian berubah menjadi order yang terstruktur, bukan kartu order random |
| Payment | Manual atau payment link Xendit; paid status otomatis hanya pada payment link yang sudah dikonfigurasi | Payment link → pembayaran di luar Cekat → konfirmasi provider → Paid |
| Automation | Trigger dan action; label, ticket, notifikasi, data sync | Action nodes terhubung; notifikasi tim; event Purchase melalui konfigurasi label |
| Broadcast | Template dan campaign; analytics Sent, Delivered, Read, Failed, Replied | Segmen pelanggan opt-in → pesan personal → campaign terjadwal → hasil ilustratif |

### Batas klaim

- Tampilan adalah **interpretasi UI untuk demo**, bukan rekonstruksi pixel-perfect dashboard asli.
- Semua nama, transaksi, jumlah audience, dan metrik adalah data ilustratif. Tampilkan `Illustrative demo` sepanjang adegan produk.
- Sumber awal dalam cerita adalah `Instagram ad · Summer essentials`. Jangan menggantinya menjadi TikTok di adegan berikutnya.
- Tidak ada klaim 10× produktivitas, #1, jaminan ROAS, revenue uplift, atau testimoni fiktif.
- Jangan menunjukkan AI mengetahui stok langsung tanpa sumber/integrasi yang disiapkan. AI hanya memakai katalog yang dikonfigurasi.
- Tidak menunjukkan shipping/fulfillment otomatis. Shipping dan Completed membutuhkan pembaruan oleh operator menurut dokumentasi order.
- Jangan mengartikan tersedianya beberapa channels sebagai pencocokan identitas lintas-channel otomatis. Maya hanya memakai WhatsApp dalam cerita ini; channel lain milik pelanggan lain.
- CAPI bukan robot pengalokasi budget. Tampilkan pengiriman event terkonfigurasi, bukan Meta otomatis menggandakan budget.
- Hubungan event Paid → label Purchase → CAPI merupakan workflow contoh yang harus dikonfigurasi dan divalidasi, bukan fitur default setiap akun.
- Segmen broadcast memerlukan opt-in dan template yang sesuai. Jangan tampilkan blast ke kontak tanpa izin.
- Clara, MCP, predictive churn, warehouse inventory, dan auto-fulfillment tidak dimasukkan karena bukan kebutuhan utama film dan status/konfigurasinya tidak diverifikasi untuk brief ini.

## 4. Art direction dan motion system

Palet mengacu pada `DESIGN.md` di workspace, bukan sampling gambar website. Penggunaan OMS sebagai navy merupakan keputusan untuk film, bukan klaim kategori warna brand resmi.

| Token | Nilai | Peran |
|---|---|---|
| Paper | `#F9FAFB` | Background utama |
| White | `#FFFFFF` | Product surfaces |
| Ink | `#09214C` | Headline; scene gelap; Orders |
| Cekat Blue | `#1352BF` | CRM; CTA; sistem utama |
| Logo blue | `#005FCA` | Wordmark teks sementara |
| Cyan | `#00B4C8` | Chat; connection |
| Cyan text | `#007380` | Teks di atas surface terang |
| Orange | `#F99500` | Marketing; acquisition |
| Orange text | `#9E3A00` | Teks di atas surface terang |
| Border | `#E5E9EF` | Border UI |
| Secondary text | `#505F73` | Deskripsi dan label |

- Font: Google Sans Flex jika tersedia dan lisensinya memungkinkan packaging; fallback Inter. Maksimal satu keluarga font. Source menyimpan font yang boleh didistribusikan atau mendokumentasikan fallback.
- Headline 76–104 px; subhead 36–44 px; UI utama 24–30 px; metadata 20–22 px. Jangan mengecilkan seluruh dashboard demi menampilkan semua fitur.
- Safe area 96 px dari semua sisi; satu headline dan satu interaksi utama per scene.
- Product window radius 24 px, cards 16 px, chips 10 px, buttons pill. Border 1–2 px. Shadow lembut hanya untuk window yang mengambang.
- Icons dibuat sebagai SVG original dengan stroke 2 px pada grid 24. Gunakan label teks channel, bukan download logo platform.
- Avatar Maya dan Rafi menggunakan initials `MY` dan `RF`, bukan stock photography.
- Product thumbnail botol dibuat dari primitive SVG; bukan foto atau gambar hasil scraping.
- Wordmark `Cekat.AI` dibuat sebagai teks editable. Jangan mengarang logogram lalu menyebutnya logo resmi. Logo resmi dapat menggantikannya nanti jika pemilik memberi file yang disetujui.
- 2.5D seperlunya: perspective rotation maksimal 6° pada transisi; UI kembali frontal saat dibaca. Tidak ada chrome sphere, glow neon, stock office footage, atau random particles.
- Ease masuk: `cubic-bezier(.22,1,.36,1)`; morph: `cubic-bezier(.65,0,.35,1)`; keluar 180–240 ms, masuk 450–650 ms; micro-feedback 140–220 ms; row stagger 60–90 ms.
- Tiap scene mempertahankan state final sebelum berganti. Maksimal satu gerakan kamera dominan, satu animasi konten dominan, dan satu cursor dalam waktu bersamaan.
- Cursor hanya untuk tindakan manusia. Tindakan AI/automation menggunakan state change dan connection pulse tanpa cursor.
- Hindari typing karakter-per-karakter untuk semua kalimat. Chat bubbles muncul utuh sesudah typing indicator singkat.

## 5. Storyboard 60 detik

Time range berurutan tanpa gap. Frame memakai start inclusive, end exclusive pada 30 fps.

### Scene 01 · Context gets lost
**00:00–00:04 · frame 0–119**

**Copy:** `Your customer journey shouldn't break between tools.`

**Komposisi:** paper background; empat panel terpisah: Marketing, Chat, CRM, Orders. Kartu kecil Maya berada di tengah, tetapi tiap panel memegang satu informasi berbeda.

**Action:** 0–1,0s headline reveal; 1,0–2,8s Maya melewati connector yang putus. Chip `Ad source`, `Conversation`, dan `Order` tertinggal di titik berbeda. 2,8–4,0s hold.

**Transition:** semua connector bergerak mendekat; jaraknya menjadi struktur jalur scene 02. Tidak ada logo kompetitor.

**Audio:** tiga soft clicks; satu low pulse saat connector putus. Tidak menambahkan error alarm.

### Scene 02 · The connected platform
**00:04–00:08 · frame 120–239**

**Copy:** `One customer. One connected journey.`
**Support labels:** `Marketing` · `Chat` · `CRM` · `Orders`

**Komposisi:** wordmark Cekat.AI di kiri atas. Empat modul membentuk satu jalur berbentuk U lebar, bukan orbit sci-fi. Maya menjadi titik aktif di jalur.

**Action:** 4,0–5,2s panel menyatu dalam satu workspace; 5,2–6,4s jalur tersambung; 6,4–7,2s semua chip informasi kembali ke kartu Maya; 7,2–8,0s hold.

**Transition:** push-in pada Marketing; garis orange menjadi highlight campaign row.

### Scene 03 · Know where the conversation starts
**00:08–00:13 · frame 240–389**

**Copy:** `Know what starts the conversation.`

**Komposisi:** report window yang dibuat baru, bukan screenshot. Header `Marketing / Campaigns`; tiga source rows: Paid ads, Organic, Links. Area fokus: campaign `Summer essentials` pada channel Instagram.

**Action:** 8,0–9,0s source rows masuk; 9,0–10,0s cursor klik campaign; 10,0–11,2s mini journey `Ad click → WhatsApp chat` menggambar; 11,2–13,0s satu incoming lead bernama Maya muncul dengan chip `Instagram ad · Summer essentials`.

**Transition:** chip sumber campaign ikut bergerak, match-cut ke header percakapan Maya. Kamera tidak menghilangkan chip.

**Batas:** ini Click-to-WhatsApp ad, bukan website view yang diklaim terjadi di perjalanan Maya. Website tracking boleh jadi secondary label, bukan langkah palsu dalam timeline.

### Scene 04 · AI that answers with context
**00:13–00:18 · frame 390–539**

**Copy:** `Answer with context. Around the clock.`

**Komposisi:** simplified inbox tiga kolom: channel rail, selected conversation, compact contact details. Channel labels `WhatsApp`, `Instagram`, `Web chat`. Hanya chat Maya menjadi fokus.

**Visible chat:**
- Maya: `Can I order two Aura bottles?`
- AI: `Yes. Two bottles are IDR 300,000, with free shipping.`

**Action:** 13,0–14,0s conversation terpilih; 14,0–14,6s typing indicator; 14,6–16,2s AI reply reveal; 16,2–17,0s label `Purchase intent` muncul dari aturan yang dikonfigurasi; 17,0–18,0s hold.

**Details:** kecil tetapi terbaca: `Knowledge: Aura product catalog`, `AI active`. Jangan menambahkan confidence percentage palsu.

**Transition:** panel contact details melebar menjadi handoff panel.

### Scene 05 · Human when it matters
**00:18–00:23 · frame 540–689**

**Copy:** `Bring in your team. Keep the context.`

**Visible chat:**
- Maya: `Can someone confirm the delivery details?`
- AI: `I'll connect you with our team.`

**Komposisi:** thread di kiri; Rafi/team card di kanan. Riwayat chat dan campaign source tetap terlihat. Jangan tampilkan AI-generated summary sebagai capability wajib; gunakan history yang sudah tersedia.

**Action:** 18,0–19,0s pesan masuk; 19,0–20,2s configured handoff pulse ke Sales team; 20,2–21,5s assignee `Rafi` dan state `Human agent active`; 21,5–23,0s hold pada source dan history yang tetap utuh.

**Transition:** contact card Maya keluar dari details drawer menuju CRM, dengan nama dan source tidak berubah.

### Scene 06 · Turn conversations into customer records
**00:23–00:29 · frame 690–869**

**Copy:** `Every conversation, a clearer next step.`

**Komposisi:** profil Maya + CRM board. Fields: `Maya`, `WhatsApp`, `Summer essentials`, `Interested in: 2 Aura bottles`, `Owner: Rafi`. Board: `New`, `Qualified`, `Ready to order`, `Won`.

**Action:** 23,0–24,0s profile fields reveal sebagai connected-record demo; 24,0–25,0s cursor pilih `Kanban`, tampilan Table morph menjadi board; 25,0–26,4s Rafi drag kartu Maya dari Qualified ke Ready to order; 26,4–27,6s card membuka drawer history; 27,6–29,0s hold.

**Batas:** gerakan ini diperagakan oleh pengguna. Jangan mengklaim AI conversation pipeline identik dengan semua CRM board automations. Penyimpanan fields customer dari chat membutuhkan setup integrasi yang sesuai.

**Transition:** tab `Orders` di drawer dipilih; bentuk card melebar menjadi order form.

### Scene 07 · From message to order
**00:29–00:35 · frame 870–1049**

**Copy:** `Turn buying intent into an order.`

**Visible chat:** Maya: `Confirmed. Two bottles, please.`

**Komposisi:** chat snippet di kiri, order form di kanan. Original bottle SVG dalam product tile; tidak ada photography.

**Action:** 29,0–30,0s confirmed chat reveal; 30,0–31,0s integration state `AI Orders connected`; 31,0–32,6s tokens `Maya`, `2`, `Aura bottle` masuk ke field yang sesuai; 32,6–33,8s order summary menghitung; 33,8–35,0s hold.

**Order data:**
- ID `#CKT-2048`
- Aura bottle × 2
- Unit price `IDR 150,000`
- Subtotal `IDR 300,000`
- Shipping `Free`
- Total `IDR 300,000`
- Payment status `Unpaid`

**Transition:** tombol/link payment keluar dari order menuju payment card. Jangan menampilkan Paid sebelum pembayaran.

### Scene 08 · Payment confirmed
**00:35–00:39 · frame 1050–1169**

**Copy:** `Payment confirmed. Team informed.`

**Komposisi:** order di kiri dan schematic external payment panel di kanan, diberi label `Payment provider · Xendit connected`. Bukan replika halaman Xendit.

**Action:** 35,0–36,0s payment link dikirim; 36,0–37,0s jump cut berlabel `After customer payment`; 37,0–38,0s provider confirmation pulse memperbarui Unpaid → Paid; 38,0–39,0s notification `Order #CKT-2048 paid` hold.

**Status terpisah:** `Payment: Paid` dan `Order: Pending`. Shipping tidak berjalan otomatis. Bila dipilih untuk revisi berikutnya, cursor operator harus memperbarui status shipping secara eksplisit.

**Transition:** operator memberi configured label `Purchase · IDR 300,000`; chip event mengalir ke report. Eksekusi sambungan label dapat ditaruh pada 38,0–39,0s sebagai secondary highlight, bukan layar tambahan.

### Scene 09 · See what leads to revenue
**00:39–00:45 · frame 1170–1349**

**Copy:** `See which campaigns lead to revenue.`

**Komposisi:** `Marketing / Reports`, dengan filter `Last 30 days`, `Last click`, `All channels`. Tabel minimal: Campaign, Spend, Chats, Paid orders, Revenue, ROAS. Row Summer essentials menjadi fokus.

**Action:** 39,0–40,0s Paid-order record masuk report; 40,0–41,5s Paid orders 20 → 21 dan Revenue IDR 6.0M → IDR 6.3M; 41,5–42,5s ROAS 5.00× → 5.25×; 42,5–43,5s Purchase event chip bergerak melalui `Configured event → Meta CAPI`; 43,5–45,0s hold.

**Data:** Spend IDR 1.2M tetap; Chats 120 tetap. Revenue IDR 6.3M ÷ Spend IDR 1.2M = 5.25×. Angka menunjukkan contoh perhitungan, bukan hasil pelanggan Cekat.

**Batas:** waktu dipadatkan, bukan janji refresh instan. Atribusi bergantung model, tracking, dan konfigurasi. CAPI event berasal dari label Purchase/value yang dipetakan, bukan klaim default payment hook.

**Transition:** header Maya pada customer record menjadi segmen returning customers. Tambahkan time marker agar tidak terasa immediate re-marketing.

### Scene 10 · Give the next conversation a reason
**00:45–00:50 · frame 1350–1499**

**Copy:** `Keep the next conversation relevant.`

**Komposisi:** `Later · A new campaign`, segment builder di kiri, message preview di kanan. Rules: `Has purchased` + `Marketing opt-in = Yes`. Audience demo `240 contacts`, termasuk Maya yang ditunjukkan opted-in.

**Visible message:** `Hi {{first_name}}, explore what's new at Aura.`
**Maya preview:** `Hi Maya, explore what's new at Aura.`

**Action:** 45,0–46,0s rules dipilih oleh cursor; 46,0–47,0s template variable berubah menjadi Maya; 47,0–48,0s user klik Schedule, state `Scheduled`; 48,0–50,0s jump cut `After campaign delivery`, analytics masuk: Sent 240, Delivered 232, Read 186, Replied 28, Failed 0.

**Batas:** delivery bisa tertunda: 8 pesan belum delivered, bukan Failed. Analytics adalah snapshot ilustratif; tidak semua pengiriman otomatis sukses. Template approval dan opt-in tetap diperlukan.

**Transition:** pulse broadcast menghubungkan kembali Maya ke conversation node.

### Scene 11 · The whole journey, in view
**00:50–00:55 · frame 1500–1649**

**Copy:** `Marketing. Chat. CRM. Orders. Connected.`

**Komposisi:** kamera pull-out menjadi composition empat modul seperti scene 02, tetapi kini setiap modul memegang state nyata: campaign source, answered chat, customer record, paid order. Reports dan Broadcast hadir sebagai dua compact supporting panels di bawah, bukan produk baru yang mengalahkan empat modul utama.

**Action:** 50,0–51,6s zoom-out; 51,6–53,0s jalur continuous tersambung; 53,0–54,0s Maya melewati semua node dengan nama/source tetap; 54,0–55,0s hold.

**Transition:** empat panel merapat; connector menjadi underline halus di bawah closing headline. Bukan morph ke logo resmi yang tidak tersedia.

### Scene 12 · Branded close
**00:55–01:00 · frame 1650–1799**

**Copy:**
- `Cekat.AI`
- `From first chat to lifetime customer.`
- `Start free trial`
- `cekat.ai`

**Komposisi:** navy background, white headline, restrained blue/cyan connection accent. Wordmark editable, tidak diberi effect atau gradient.

**Action:** 55,0–56,0s closing reveal; 56,0–57,0s CTA settle; **57,0–60,0s full clean hold**. Tidak ada fake click atau redirect di MP4. CTA baru fungsional bila source interaktif memang dibuat.

**Audio:** resolved chord dan soft chime, tail selesai sebelum akhir. Tidak menambah claim trial duration tanpa kebutuhan.

## 6. Daftar aset yang wajib dibuat OpenDesign

Seluruhnya dibuat di project, bukan diambil dari Cekat website atau dipotong dari video referensi.

1. Editable text wordmark, brand palette/tokens, typography styles.
2. Continuous path SVG, customer context dot, broken connector variation.
3. Consistent app shell, navigation, cursor, click feedback, tabs, buttons, badges, toasts.
4. Original module icons: Marketing, Chat, CRM, Orders, Reports, Broadcast.
5. Original generic channel glyphs + text labels WhatsApp, Instagram, Web chat; bukan logo palsu yang diakui resmi.
6. Campaign table, attribution/source chip, miniature journey strip.
7. Inbox columns, chat bubbles, typing indicator, knowledge source chip, assignee state.
8. Contact profile, Table view, Kanban view, history drawer.
9. Original bottle SVG, product card, order fields, line items, calculated summary, invoice/payment status.
10. Generic provider panel and Xendit text label, external-payment time jump, confirmation connection.
11. Reports table, numeric animations, configured Purchase event route to Meta text label.
12. Segment builder, template preview, Schedule state, campaign analytics.
13. Overview composition, closing card, MP4 thumbnail, 12 storyboard keyframes.
14. Original locally generated music/sound effects if supported; silent version regardless. No paid external generation service without approval.

Prefer HTML/CSS/SVG yang editable untuk teks, icons, diagram, tabel, dan charts. Hindari rasterizing seluruh UI: setiap bagian yang bergerak harus menjadi layer tersendiri.

## 7. Audio

Default tanpa voiceover. Film tetap bisa dipahami ketika muted.

- Original instrumental direction: minimal electronic, sekitar 108–112 BPM, soft pulse, warm synth, tanpa vocal.
- Edit tidak harus memaksa semua cut tepat ke beat bila mengorbankan waktu baca.
- SFX: source click, subtle typing, assignment tick, card snap, payment chime, event pulse.
- Hindari stock music yang tidak berlisensi dan music extraction dari lampiran.
- Jika local audio tidak dapat dibuat: render silent MP4 dan nyatakan audio belum tersedia. Jangan menganggap prompt musik sebagai bukti audio sudah dibuat.

## 8. Produksi di OpenDesign

Panduan resmi menggunakan **Motion design**: brief → source/assets → render MP4 → inspect → revise → download. Source contoh menggunakan HTML dan GSAP; jangan mengasumsikan MP4 ada hanya karena preview bergerak.

1. Pilih **Motion design**, bukan Prototype. `Product Promo` cocok sebagai starting direction; `One-Shape UI Motion` cocok untuk transition language. Adaptasi, bukan reuse aset template.
2. Upload empat referensi bila UI mendukung. Jika tidak, gunakan deskripsi visual pada brief. Tidak perlu meminta OpenDesign membaca path lokal dari komputer ini.
3. Paste file `cekat-ai-opendesign-prompt.md`. Produksi dapat dilakukan bertahap di project yang sama, tetapi deliverable akhirnya satu film 60 detik.
4. Minta keyframe dan component review dulu bila perlu; lanjutkan ke actual render. Review ini bukan hasil final.
5. Periksa MP4 yang selesai, bukan hanya source preview. Scrub scene boundaries dan ending.
6. Revisi satu masalah spesifik, tetap di project sama. Simpan v1 dan render v2, jangan overwrite video lama tanpa kebutuhan.
7. Download checked MP4 dan source. Pastikan file lokal ada dan bisa diputar.

### Struktur deliverable yang diminta

```text
motion-source/cekat-ai/
  index.html
  animation.js
  styles.css
  assets/
  fonts/
  audio/
  demo-data.json
  README.md
exports/
  cekat-ai-connected-journey-v1.mp4
  cekat-ai-connected-journey-v1-silent.mp4
  cekat-ai-connected-journey-poster.png
storyboard/
  scene-01.png ... scene-12.png
  contact-sheet.png
  scene-manifest.json
```

Nama file adalah kontrak output yang diminta, bukan file yang sudah dibuat oleh brief ini. OpenDesign boleh memakai struktur internal lain bila output/source tetap lengkap dan path aktual dilaporkan. ZIP source harus dibuat bila export packaging tersedia; bila tidak, pertahankan project dan laporkan cara mengunduh source.

## 9. QC sebelum publish

- [ ] Actual MP4 60 detik, 1920 × 1080, 30 fps; tidak berhenti pada preview atau render error.
- [ ] Empat modul utama terbaca dan ditunjukkan melalui action, bukan hanya disebut di text slide.
- [ ] Maya, Aura Store, dan Summer essentials konsisten di seluruh scene.
- [ ] Quantity 2 × IDR 150,000 = IDR 300,000; shipping Free; total sama di order, payment, dan Purchase value.
- [ ] Paid baru muncul setelah provider confirmation; status Order tetap Pending.
- [ ] ROAS 6.3M ÷ 1.2M = 5.25×; demo data label terlihat.
- [ ] CAPI route diberi konteks configured event; tidak mengklaim autonomous ad buying.
- [ ] Broadcast audience opt-in; template sesuai; Sent ≥ Delivered ≥ Read, Replied tidak melebihi Delivered.
- [ ] Tidak ada third-party screenshots, scraped images, stock portraits, customer logos, atau extraction dari referensi.
- [ ] UI text merupakan text layers, icons/paths editable SVG; tidak ada gambar dashboard flattened.
- [ ] Transisi tidak mengubah source campaign, reset order, atau membuat Maya menjadi pelanggan lain.
- [ ] Last three seconds clean hold; tidak memotong CTA dan audio.
- [ ] Source bisa diputar ulang; fonts/assets/audio resolve tanpa file missing; timing deterministic.
- [ ] Jika browser preview disediakan, kontrol keyboard dan reduced-motion tersedia; UI preview controls tidak masuk frame MP4.

## 10. Cutdown opsional, bukan scope render utama

**30 detik:** 0–3 intro; 3–7 marketing; 7–12 chat; 12–17 CRM → order; 17–21 paid; 21–25 report; 25–30 CTA. Kurangi handoff/broadcast, bukan mempercepat semua adegan 2×.

**15 detik:** 0–2 intro; 2–5 AI reply; 5–8 CRM → order; 8–11 payment/report; 11–15 close. Bukan pengganti film utama untuk menjelaskan semua fitur.

**9:16:** re-layout chat dan order vertically; headline 2–3 baris; satu panel per scene. Jangan crop versi landscape langsung. Render tambahan hanya setelah versi utama disetujui.

## 11. Sumber riset

Dibaca 6 November 2026. Teks saja untuk riset; gambar dari sumber tidak digunakan sebagai aset produksi.

- https://open-design.ai/help/motion/ — creation type, brief, local motion/audio example, editable HTML/GSAP source, actual MP4 verification, revision dan download.
- https://cekat.ai — empat area produk dan positioning customer journey.
- https://cekat.ai/en/marketing — attribution, behavior tracking, centralized marketing reports.
- https://cekat.ai/en/chat — knowledge-based AI, omnichannel, human escalation.
- https://cekat.ai/en/crm — records, pipeline/boards, customer journey, filtering.
- https://cekat.ai/en/order — multi-step automation, trigger/action, ticket dan notifications. Halaman ini membahas automation, bukan bukti lengkap fitur OMS.
- https://docs.cekat.ai/llms.txt — indeks dokumentasi untuk menemukan fitur spesifik.
- https://docs.cekat.ai/ai-integration/orders.md — AI Orders berdasarkan percakapan; shipping/payment setup; Xendit atau manual.
- https://docs.cekat.ai/order/orders-page/create-and-order-details.md — order fields, invoice, Paid otomatis via payment link, fulfillment status manual.
- https://docs.cekat.ai/marketing/reports.md — reports, source hierarchy, attribution model, custom columns dan Order Events.
- https://docs.cekat.ai/marketing-legacy/meta-pixel-integration-capi.md — Create Conversation/Add Label triggers, Purchase value, configured event mapping; dokumen legacy, validasi implementasi account terbaru sebelum publish.
- https://docs.cekat.ai/chat/broadcasts/broadcast-message-analytics.md — Sent, Delivered, Read, Failed, Replied.
- https://docs.cekat.ai/ai-and-platform/ai-agent/tampilan-baru-ai-agent/ai-actions-and-routing.md — Agent Transfer, Conversation Label, Conversation Pipeline; tidak disamakan tanpa bukti dengan semua CRM board actions.
- `DESIGN.md` — brand palette, typography, source claim cautions di workspace; digunakan sebagai arahan internal, bukan bukti produk shipped.
- Empat MP4 lampiran pengguna — komposisi dan transition language saja.
