# Cekat secondary-page art direction

## Thesis

One connected product, three distinct reading experiences. Keep the homepage's Google Sans Flex, Cekat blue/navy/cyan/orange, pill CTAs and revenue-loop positioning. Replace the secondary-page compositions, not the homepage or its navigation.

Industry pages are human and photo-led. Product pages are precise, spacious and interface-led. The journal is editorial, with a large masthead, image-led stories and a quieter, centered article reading experience. No generic glow, ornamental glass, copied assets or invented customer evidence.

## November 10 direction (current iteration)

Reading this as: connected-revenue SaaS for Indonesian operators, with human industry discovery, demonstrable product workflows and an editorial journal; ENERGY 2 / RHYTHM 3 / MOTION 2. Uses build-awwwards-quality-sites and the existing ui-ux-pro-max guidance with antislop DURING.

- Reference evidence: visually inspected all six homepage screenshots. Clay informs focal hierarchy; Aira informs separating offerings; Auxia informs negative space; Amplemarket informs usable product demonstrations; Apple informs human photography; Google informs lead-story hierarchy. No reference artwork, identity or copy is reused. Auxia's hero media was absent in its captured static frame.
- Industry hub: navy opening and four image-led destinations introduce real business contexts; a two-column thumbnail index makes the full directory scannable without thirty oversized cover cards.
- Industry detail: large left-aligned headline and separate explanatory column precede a panoramic photograph, so the human context is not squeezed beside a long headline. Existing accordion remains a compact workflow explorer.
- Product detail: asymmetric headline/summary above the working product stage; a chapter index and alternating full-length feature chapters expose every benefit without requiring accordion clicks. Product screenshots come from existing supplied assets.
- Journal: oversized brand masthead, dominant lead story and a smaller supporting-story rail establish editorial hierarchy. Article headers use a quieter split title/cover composition; the body retains its narrow reading measure and sticky TOC.
- Typography and color: Google Sans Flex, blue/navy and page-specific cyan/orange remain continuous with the homepage. Ivory makes editorial imagery and long reading gentler; navy belongs to business discovery, not a new dark-mode theme.
- Spacing/radius: generous openings, tighter directory rows, long feature chapters and a quiet reading column express different content jobs. Pill CTAs remain a brand convention; images have modest corners, not pill frames.
- Motion: existing GSAP intro/reveals and sole production Lenis engine, no new engine or Three.js. CSS hover/focus signals navigation; reduced motion renders complete static states.
- Asset attempt: one original clinic-reception photograph was requested with user permission but failed for insufficient provider funds. No generated file is used. Existing Cekat photography and WordPress covers retain their provenance qualifications.

The verification dated November 9 below predates this iteration and is not evidence of current validation.

## Reference study

Reviewed homepage and secondary-page evidence, November 2026:

- Clay: homepage, `/use-cases/crm-enrichment`, `/blog`, `/blog/gtm-engineering`. Useful principles: generous margins, strong typographic hierarchy, product demonstration before explanation, alternating feature chapters, restrained article measure.
- Aira: homepage, `/integrations/hubspot`, `/revenue-journal/revenue-journal`. Useful principles: human imagery, distinct editorial identity, detailed product chapters and numbered setup sequences.
- Auxia: homepage, `/agent-studio`, `/blog/the-age-of-the-supermarketer-introducing-auxia-agent-studio`. Useful principles: color-block section transitions, explicit product workflows, editorial metadata and persistent table of contents. Some scroll-revealed media did not render in browser captures; textual structure was checked separately.
- Amplemarket: homepage, `/unibox`, `/amplemarket-for-marketers`. Useful principles: a large live-product stage, feature overview followed by deeper demonstrations, person-led use-case openings, compact FAQ.
- Apple: `/business/`, `/business/enterprise/`, `/business/small-business/`. Browser connection failed; reviewed the page documents rather than claiming visual verification. Useful principles: chapter navigation, distinct product/value/proof sections, clear human versus technical content.
- Google Blog: homepage and `/innovation-and-ai/products/gemini-app/turn-drawings-into-apps-gemini/`. Browser connection failed; reviewed page documents. Useful principles: lead story hierarchy, category metadata, clean article sequence, related stories.

## System

- Hero: industry split copy/portrait with a small contextual product interface; product oversized copy over a wide original HTML dashboard; journal asymmetrical masthead and featured story.
- Type: existing locally hosted Google Sans Flex; display 44–80px, section titles 32–54px, body 16–20px. Sentence case, tight headings, no all-caps microcopy.
- Color: existing brand blue `#1352bf`, navy `#09214c`, cyan accents and warm ivory/orange fields. Page-specific semantic accents, not rainbow decoration.
- Sequence: hero → concise platform context → feature chapters → existing evidence → trust/control detail → FAQ → related exploration → conversion.
- Motion: GSAP one-way heading/block reveals. Existing site-wide Lenis remains the sole smooth-scroll engine (selected over adding Locomotive). No pinned/scrubbed sections, no additional scroll engine. Static content before/without animation, clean teardown, reduced-motion bypass.
- Three.js: deliberately omitted; it adds weight without clarifying these product and editorial pages.
- Skills: build-awwwards-quality-sites, ui-ux-pro-max, react-best-practices. Preserve established brand tokens over the database's generic glass/Jakarta recommendation.

## Assets and honesty

Existing Cekat product assets and industry photographs only. Industry provenance lives in `public/images/industries/CREDITS.md`; generated covers and photos without complete rights records retain their existing qualifications. Blog covers and author photos come from the existing WordPress integration. Original HTML product demonstrations are clearly labeled illustrative, not customer results. An attempted original healthcare photograph failed due to image-provider funds; no generated asset was added or represented as completed.

## Scope

Industry hub and all localized industry routes; product pages chat, CRM, marketing and order; feature hub and feature detail routes; blog listing and article layout. Existing route names, translated content, WordPress data, schema, filters, author links and conversion destinations remain intact. Pre-existing author-page changes are not reverted.

## Typography correction

The reported `/en/features/ai-chatbot` collision was reproduced at 1212, 1280 and 1440px: the `1,000,000+` text exceeded its own column. Its viewport-relative size and asymmetric cell padding caused the collision.

- Metrics now use equal zero-minimum grid tracks, a consistent 32px gap and column-relative type (`17cqi`, bounded to 32–52px at the default text size). Values and labels are unchanged.
- Four metrics retain four desktop columns. More than four use three roomy desktop columns; tablet uses two and mobile uses one. Dividers never appear at the start of a new row.
- Long labels can wrap without clipping; metrics and labels keep separate, content-driven blocks. The inherited mobile WhatsApp launcher becomes a labeled 52px icon on redesigned pages only.
- `scripts/check-metric-layout.py` checks actual browser text rectangles, intact long numbers, equal type sizes, label/number separation, row/column gaps, dividers and horizontal overflow. This is a geometry regression, not a jsdom visual approximation.

## Verification: November 9, 2026 (historical)

- Production build: 607 generated pages, no missing-message errors. Existing multiple-lockfile/workspace-root warning remains; unrelated lockfiles were not changed.
- Unit suite: 73 files / 513 tests passed, including five-locale client-provider coverage, feed identity/pagination, cancellation/retry, motion teardown, metric column counts, no-JS filter specificity and the no-photo fallback.
- Typecheck, targeted ESLint, authored-file Prettier check and `git diff --check` passed. Existing global CSS declarations differ only in formatting plus the scoped stylesheet import; homepage CSS values and composition are unchanged.
- Browser route/media checks: nine redesigned routes at 1440 and 390px, all HTTP 200 with no page errors, broken images, hidden sections or horizontal page overflow. Product preview switches, discovery filters, capabilities, article TOC and basic no-JS rendering passed.
- Metric geometry: 77 layouts across seven routes and eleven widths (320, 390, 600, 601, 768, 1024, 1050, 1051, 1212, 1280, 1440px) passed. Includes all five AI-chatbot locales, the five-metric dental page and healthcare. Final metric, hero and article-body screenshots were inspected.
- Heading/body geometry: 65 layouts across thirteen routes at 320, 390, 768, 1051 and 1440px; no checked heading, lead paragraph or article paragraph escaped its text block.
- Marketing-preview geometry: 25 layouts across all five locales at the same five widths; metric values, captions and supporting labels stayed inside their own cells.
- Extended browser interactions passed: keyboard controls and FAQ; feature/industry navigation; blog category, search and empty states; simulated feed failure and real retry; TOC, clipboard, share destinations and author links; five-locale preview translations; mobile back-link labels, compact launcher and 44px share targets; real no-JS pagination/GET search/directory; normal/reduced motion, client navigation and homepage isolation. The no-JS directory check exposed insufficient selector specificity; the scoped fallback styles and a regression test now cover it.

To repeat the metric regression after starting a production build:

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
python3 scripts/check-metric-layout.py --base http://localhost:4174
```

Screenshots and additional browser checks are local review artifacts rather than shipped site assets. Changes remain uncommitted.

## Verification: November 10, 2026

- Fresh production build passed and generated 607 pages. The existing multiple-lockfile workspace-root warning remains; no lockfiles were changed.
- `pnpm typecheck`, targeted ESLint and Prettier checks, and `git diff --check` passed. `pnpm exec vitest run --maxWorkers=2` passed 74 files and 520 tests.
- Full-document axe audit passed on ten redesigned routes at 390px and 1440px: 20 snapshots, zero violations. Footer office tabs measure 44px at both widths on every route.
- Browser click-through passed 164 checks with no page errors. This includes product previews, chapter anchors, FAQ, industry capabilities, directory filters/search/reset, blog categories/search/loading/error/retry, article TOC/copy/share/author, desktop and mobile navigation, no-JS states, and normal motion. Per-control results are recorded in [secondary-redesign-interactions.json]. The selected article has no tags, so no empty tag section or dead tag link is rendered.
- All 110 unique internal destinations returned HTTP 200.
- Homepage isolation passed: the homepage route file is unchanged, its `SiteChrome` branch keeps the default footer, and the homepage CSS declarations match after normalizing whitespace and equivalent decimal formatting. Two same-build screenshots are pixel-identical. The earlier JPEG comparison against the saved baseline has a 0.90 mean absolute pixel difference and 2.61% changed pixels; visual composition and source isolation remain unchanged.

## Antislop delivery gate: November 10, 2026

### Hard gate

- R-02 PASS: newly authored UI copy contains no em dash.
- R-03 PASS: responsive screenshots and geometry checks found no overflow or escaped text; mobile navigation and targets were exercised.
- R-17 PASS: this iteration adds no statistics; the homepage remains outside scope and unchanged.
- R-18 PASS: no fictional testimonials or generated people were added.
- R-23 PASS: existing sourced imagery is reused; no generated asset was added.
- R-24 PASS: 110 collected internal destinations returned HTTP 200.
- R-25 PASS: the contrast review passed; the current full-page axe audit has zero violations.
- R-26 PASS: 164 browser interactions passed across links, buttons, search, filters, tabs, accordions, and sharing.
- R-27 PASS: blog and directory empty states, feed loading, failure, and retry states were exercised.
- R-28 PASS: FAQs address the specific product or industry workflows shown.
- R-32 PASS: keyboard activation, focus visibility, Escape behavior, and mobile navigation passed.
- R-33 PASS: behavior is implemented in application source; no source-rewriting patch script was used.
- R-34 PASS: no theme toggle is shipped; the existing light brand treatment is preserved.
- R-35 PASS: production build passed; 164 interactions ran with no page errors.
- R-36 PASS: no customer, security, compliance, or performance claim was invented.
- R-37 PASS: explicit Cekat brand direction and the declared ENERGY 2 / RHYTHM 3 / MOTION 2 dials guided the design.
- R-38 PASS: no fabricated feature, identity, testimonial, statistic, or destination was added.
- R-39 PASS: 20 axe snapshots have zero violations; office tabs are 44px, controls have names, and media have text alternatives or decorative alt text.
- R-40 PASS: media geometry, reserved image space, and high-priority hero loading were checked; no render-blocking third-party script was introduced.

### Purpose gate

- R-01 PASS: brand gradients distinguish Cekat page tones and hierarchy; their purpose is recorded above.
- R-04 PASS: product and channel marks identify the workflows they accompany; no generic AI icon motif was added.
- R-06 PASS: locally hosted Google Sans Flex continues the existing Cekat brand and supports the editorial/product hierarchy.
- R-07 PASS: no decorative grid or blueprint background is used.
- R-08 PASS: arrows are limited to directional navigation cues, not repeated as default CTA decoration.
- R-09 PASS: no context-free AI, beta, or new-status capsule was introduced.
- R-10 PASS: the redesigned pages do not rely on glassmorphism.
- R-12 PASS: shadows are selective and identify interface elevation rather than floating every section.
- R-13 PASS: no decorative glow treatment was added.
- R-14 PASS: industry stories, product chapters, and editorial stories use different compositions to match their content.
- R-19 PASS: existing motion guides attention; reduced-motion states remain complete and static.
- R-22 PASS: product demonstrations and existing photographs replace generic illustrations.

### Liveliness and direction

- Dials PASS: ENERGY 2 / RHYTHM 3 / MOTION 2 are explicitly declared above.
- Rhythm PASS: industry discovery, product demonstrations, and editorial reading have distinct section sequences.
- Focal point PASS: each route opens on its primary industry context, product stage, or lead story.
- Whitespace PASS: spacing separates the directory, feature chapters, and reading measure by content role.
- Accent PASS: Cekat blue anchors the interface while page-specific cyan and orange are used sparingly.
- Identity PASS: the Cekat palette, Google Sans Flex, and connected-revenue workflow motif carry across the redesigned pages.
- Design Read PASS: the audience, page kind, visual language, and three dials were written before implementation.

### Craftsmanship and quality locks

- C-1 PASS: visual and copy decisions have concise reasons in the art direction above.
- C-2 PASS: the exercised interactive elements produce their intended action or state change.
- C-3 PASS: sections serve industry discovery, product explanation, or editorial reading.
- C-4 PASS: tested breakpoints, empty/loading/error states, keyboard use, no-JS rendering, and reduced motion remain functional.
- C-5 PASS: no fabricated evidence, testimonials, or statistics were added.
- R-05 PASS: varied, content-driven section compositions replace a repeated landing-page template.
- R-11 PASS: radius varies by control and content role; not every surface is pill-shaped.
- R-15 PASS: conversion actions name their actual action and route.
- R-16 PASS: no new generic AI marketing buzzwords were introduced.
- R-20 PASS: the pages retain a distinct Cekat identity through color, type, and workflow-led composition.
- R-21 PASS: the established light brand theme is preserved rather than defaulting to dark styling.
- R-29 PASS: brand blue/navy, page-specific accents, and neutrals remain within the documented design system.
- R-30 PASS: references informed hierarchy and pacing only; no reference artwork or visual identity was copied.
- R-31 PASS: the purpose for major palette, typography, layout, spacing, motion, and imagery decisions is recorded above.
