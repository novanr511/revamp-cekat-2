import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(await readFile(resolve(root, "product-pages.json"), "utf8"));
const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

const productLinks = [
  ["Chat", "/chat/", "chat"],
  ["CRM", "/crm/", "crm"],
  ["Marketing", "/marketing/", "marketing"],
  ["Automation", "/order/", "order"],
];

function header(active) {
  return `<a class="skip" href="#main">Skip to content</a>
  <header class="site-nav">
    <div class="wrap site-nav__row">
      <a class="site-nav__logo" href="/" aria-label="Cekat.AI home"><img src="/assets/logo-full.svg" width="124" height="30" alt="Cekat.AI"></a>
      <nav class="site-nav__links" id="site-nav-links" aria-label="Main navigation">
        <ul>${productLinks.map(([label, href, id]) => `<li><a href="${href}"${active === id ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}
          <li><a href="/pricing/"${active === "pricing" ? ' aria-current="page"' : ""}>Pricing</a></li>
          <li class="site-nav__mobile-cta"><a class="btn btn--primary" href="https://chat.cekat.ai/register">Start free trial</a></li>
        </ul>
      </nav>
      <div class="site-nav__actions"><a class="site-nav__sales" href="https://cekat.ai/contact-sales">Talk to sales</a><a class="btn btn--primary" href="https://chat.cekat.ai/register">Start free trial</a></div>
      <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav-links" aria-label="Open menu"><span></span><span></span></button>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="page-footer">
    <div class="wrap page-footer__main">
      <div class="page-footer__brand"><a href="/" aria-label="Cekat.AI home"><img src="/assets/logo-full.svg" width="124" height="30" alt="Cekat.AI"></a><p>One connected journey for every customer conversation.</p></div>
      <div class="page-footer__links"><div><h2>Products</h2><a href="/chat/">Chat</a><a href="/crm/">CRM</a><a href="/marketing/">Marketing</a><a href="/order/">Automation</a></div><div><h2>Explore</h2><a href="/pricing/">Pricing</a><a href="/#industries">Industries</a><a href="/#stories">Customer stories</a><a href="/#integrations">Integrations</a></div></div>
    </div>
    <div class="wrap page-footer__bottom"><span>© 2026 Cekat.AI</span><span>Jakarta · Tangerang · Singapore · Malaysia</span><a href="/">Back to home <span aria-hidden="true">↑</span></a></div>
  </footer>`;
}

function productPage(slug, product) {
  const title = `${product.name} | Cekat.AI`;
  const rootImage = (name) => `../assets/product-pages/${slug}/${name}`;
  const faq = product.faqs.map((item) => `<details class="faq-item"><summary>${esc(item.question)}<span aria-hidden="true"></span></summary><div class="faq-item__answer"><p>${esc(item.answer)}</p></div></details>`).join("\n");
  const pillars = product.pillars.map((pillar, index) => `<article class="value-card"><span class="value-card__number">0${index + 1}</span><h3>${esc(pillar.title)}</h3><p>${esc(pillar.body)}</p></article>`).join("\n");
  const steps = product.steps.map((step, index) => `<button class="feature-step${index === 0 ? " is-active" : ""}" type="button" data-feature-step="${index}" data-image="${esc(step.image)}" data-title="${esc(step.title)}" aria-pressed="${index === 0}">
      <span class="feature-step__top"><span class="feature-step__number">${String(index + 1).padStart(2, "0")}</span><span class="feature-step__title">${esc(step.title)}</span><span class="feature-step__chevron" aria-hidden="true">↗</span></span>
      <span class="feature-step__body">${esc(step.body)}</span>
    </button>`).join("\n");
  const testimonial = product.testimonial ? `<section class="proof-quote" aria-labelledby="proof-heading">
    <div class="wrap proof-quote__grid"><div><p class="eyebrow">Customer perspective</p><h2 id="proof-heading">${esc(product.testimonial.heading)}</h2></div>
    <figure class="quote-card"><span class="quote-card__mark" aria-hidden="true">“</span><blockquote>${esc(product.testimonial.quote)}</blockquote><figcaption><img src="${rootImage(product.testimonial.image)}" alt="${esc(product.testimonial.alt)}" width="56" height="56" loading="lazy"><span><strong>${esc(product.testimonial.name)}</strong><small>${esc(product.testimonial.role)}</small></span></figcaption></figure></div>
  </section>` : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(product.description)}">
  <link rel="icon" href="/assets/logo-mark.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css?v=61"><link rel="stylesheet" href="/secondary.css?v=1">
  <meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(product.description)}"><meta property="og:type" content="website">
</head>
<body class="secondary-page tone-${esc(product.tone)}">
${header(slug)}
<main id="main">
  <nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/#journey">Products</a><span aria-hidden="true">/</span><span aria-current="page">${esc(product.name)}</span></nav>
  <section class="product-hero" aria-labelledby="product-title">
    <div class="wrap product-hero__grid">
      <div class="product-hero__copy"><p class="product-eyebrow"><span class="product-eyebrow__dot"></span>${esc(product.category)}</p>
        <h1 id="product-title">${esc(product.title)}</h1><p class="product-hero__lede">${esc(product.subtitle)}</p>
        <div class="product-hero__actions"><a class="btn btn--primary btn--lg" href="https://chat.cekat.ai/register">Start free trial</a><a class="btn btn--ghost btn--lg" href="https://cekat.ai/contact-sales">Talk to sales <span aria-hidden="true">↗</span></a></div>
        <p class="assure">14-day free trial · No credit card required · Set up in about 10 minutes</p>
      </div>
      <figure class="product-visual"><div class="product-visual__halo" aria-hidden="true"></div><div class="product-visual__window">
        <div class="product-visual__chrome"><span></span><span></span><span></span><b>${esc(product.name)} workspace</b><i aria-hidden="true">•••</i></div>
        <img src="${rootImage(product.heroImage)}" alt="${esc(product.heroLabel)}" width="1080" height="1350" fetchpriority="high">
      </div><figcaption class="product-visual__caption"><span class="product-visual__caption-mark" aria-hidden="true">↗</span><span><strong>${esc(product.heroLabel)}</strong><small>Product interface preview</small></span></figcaption>
      <span class="product-visual__tag product-visual__tag--one">Customer context, connected</span><span class="product-visual__tag product-visual__tag--two">Built for real workflows</span></figure>
    </div>
  </section>
  <section class="brand-proof" aria-label="Trusted by businesses across industries"><div class="wrap brand-proof__row"><p>Trusted by teams at</p><div class="brand-proof__logos"><img src="/assets/logos/rumah-zakat.png" alt="Rumah Zakat" loading="lazy"><img src="/assets/logos/vio-optical-clinic.png" alt="VIO Optical Clinic" loading="lazy"><img src="/assets/logos/ancol.png" alt="Ancol" loading="lazy"><img src="/assets/logos/dokterhub.png" alt="DokterHub" loading="lazy"><img src="/assets/logos/kopi-kenangan.png" alt="Kopi Kenangan" loading="lazy"></div></div></section>
  <section class="product-value" aria-labelledby="difference-title"><div class="wrap"><header class="section-intro"><p class="eyebrow">Why ${esc(product.name)}</p><h2 id="difference-title">${esc(product.whatMakesHeading)}</h2></header><div class="value-grid">${pillars}</div></div></section>
  <section class="product-workflow" aria-labelledby="workflow-title" id="workflow"><div class="wrap"><header class="section-intro section-intro--wide"><p class="eyebrow">How it works</p><h2 id="workflow-title">${esc(product.stepsHeading)}</h2><p>Explore each part of the workflow. The supporting product view updates as you choose a step.</p></header>
    <div class="workflow-grid"><div class="feature-steps" aria-label="${esc(product.name)} workflow steps">${steps}</div>
      <figure class="workflow-visual"><div class="workflow-visual__meta"><span class="workflow-visual__product"><img src="/assets/products/${slug === "order" ? "automation" : slug}.svg" alt="" width="24" height="24">Cekat ${esc(product.name)}</span><span class="workflow-visual__count" data-feature-count>01 / ${String(product.steps.length).padStart(2, "0")}</span></div>
        <img class="workflow-visual__image" data-feature-image src="${rootImage(product.steps[0].image)}" alt="${esc(product.steps[0].title)}" width="1080" height="1350" loading="lazy">
        <figcaption class="workflow-visual__caption"><span class="workflow-visual__caption-index" data-feature-caption-index>01</span><span data-feature-caption>${esc(product.steps[0].title)}</span></figcaption>
      </figure></div></div></section>
  ${testimonial}
  <section class="product-faq" aria-labelledby="faq-title"><div class="wrap product-faq__grid"><div class="product-faq__intro"><p class="eyebrow">FAQ</p><h2 id="faq-title">${esc(product.faqHeading)}</h2><p>Still have questions? <a href="https://cekat.ai/contact-sales">Talk to our team <span aria-hidden="true">↗</span></a></p></div><div class="faq-list">${faq}</div></div></section>
  <section class="product-cta" aria-labelledby="product-cta-title"><div class="wrap product-cta__inner"><div><p class="eyebrow">Cekat ${esc(product.name)}</p><h2 id="product-cta-title">${esc(product.ctaTitle)}</h2><p>${esc(product.ctaBody)}</p></div><div class="product-cta__actions"><a class="btn btn--light btn--lg" href="https://chat.cekat.ai/register">Start free trial</a><a class="product-cta__sales" href="https://cekat.ai/contact-sales">Talk to sales <span aria-hidden="true">↗</span></a></div></div></section>
  <section class="next-product" aria-label="Explore another Cekat product"><div class="wrap next-product__inner"><p>Part of the connected Cekat platform</p><div>${productLinks.filter(([, , id]) => id !== slug).map(([label, href]) => `<a href="${href}">${label}<span aria-hidden="true">↗</span></a>`).join("")}</div><a class="next-product__pricing" href="/pricing/">Explore plans <span aria-hidden="true">→</span></a></div></section>
</main>
${footer()}
<script src="/secondary.js?v=1" defer></script>
</body></html>`;
}

const pricingData = {
  chat: {
    label: "Chat plans",
    intro: "An AI agent that replies, qualifies, and closes across WhatsApp, Instagram, and every other channel. One inbox for the whole team.",
    tiers: [
      { name: "Starter", tagline: "For small teams starting to drown in chats.", facts: ["1 WhatsApp Business API number", "Up to 1,000 monthly active users", "5,000 AI credits", "3 seats", "AI Simple"] },
      { name: "Pro", tagline: "For full automation and tidy workflows at scale.", facts: ["1 WhatsApp Business API number", "Up to 3,000 monthly active users", "15,000 AI credits", "5 seats", "AI Simple", "Hotline support + account manager"] },
      { name: "Business", tagline: "For high chat volumes with a structured CS team.", popular: true, facts: ["3 WhatsApp Business API numbers", "Up to 10,000 monthly active users", "50,000 AI credits", "7 seats", "AI Full", "Flow Builder, automated follow-up & ticketing"] },
      { name: "Custom", tagline: "For custom integrations and enterprise scale.", facts: ["Capacity, seats & integrations tailored to your team", "Advanced automation & CSAT", "Priority support with a dedicated success team"] },
    ],
    rows: [
      ["Channels", "Multiple channels", "Multiple channels", "Multiple channels", "Custom"],
      ["WhatsApp Business API (WABA)", "1 number", "1 number", "3 numbers", "Custom"],
      ["MAU (Monthly Active Users)", "1,000", "3,000", "10,000", "Custom"],
      ["AI Credits", "5,000", "15,000", "50,000", "Custom"],
      ["AI Type", "AI Simple", "AI Simple", "AI Full", "AI Full"],
      ["Seats", "3", "5", "7", "Custom"],
      ["Open API", "Included", "Included", "Included", "Included"],
      ["Analytics", "Included", "Included", "Included", "Included"],
      ["Support", "Hotline", "Hotline + account manager", "Hotline + general account manager", "Hotline + WhatsApp group + key account manager"],
      ["Flow Builder", "—", "—", "Included", "Included"],
      ["Automated follow-up", "—", "—", "Included", "Included"],
      ["Ticketing", "—", "—", "Included", "Included"],
      ["Automation & CSAT", "—", "—", "—", "Included"],
    ],
  },
  crm: {
    label: "CRM plans",
    intro: "Every customer detail in one place: conversations, purchases, and a pipeline that updates itself straight from chat.",
    tiers: [
      { name: "CRM Pro", tagline: "For sales teams still tracking deals by hand.", facts: ["Up to 10,000 contacts", "Up to 3 agents, upgradable", "Unified customer data", "Unlimited boards & views"] },
      { name: "CRM Business", tagline: "For a customer database that keeps growing.", popular: true, facts: ["Up to 50,000 contacts", "Up to 3 agents, upgradable", "CRM automations", "Open API"] },
      { name: "CRM Enterprise", tagline: "For large customer bases across multiple branches.", facts: ["Up to 100,000 contacts", "Up to 3 agents, upgradable", "CRM automations", "Open API"] },
      { name: "CRM Custom", tagline: "For bespoke data and integration requirements.", facts: ["Unlimited contact storage", "Up to 3 agents, upgradable", "CRM automations", "Custom integrations & Open API"] },
    ],
    rows: [
      ["Contact & Company List", "Included", "Included", "Included", "Included"],
      ["Unified Customer Data Platform", "Included", "Included", "Included", "Included"],
      ["Unlimited Boards", "Included", "Included", "Included", "Included"],
      ["Unlimited Views", "Included", "Included", "Included", "Included"],
      ["Contact Storage", "Up to 10,000", "Up to 50,000", "Up to 100,000", "Unlimited"],
      ["Agents", "Up to 3, upgradable", "Up to 3, upgradable", "Up to 3, upgradable", "Up to 3, upgradable"],
      ["CRM Automations", "Included", "Included", "Included", "Included"],
      ["CRM Open API", "Included", "Included", "Included", "Included"],
    ],
  },
  marketing: {
    label: "Marketing plans",
    intro: "Broadcasts, segmentation, and retargeting you can actually measure. Know exactly which ads turned into sales.",
    tiers: [
      { name: "Pro", tagline: "To start broadcasting and measuring the results.", facts: ["Up to 3,000 monthly active users", "Performance analytics", "Ads tracking & attribution", "1-on-1 setup with an ads analyst"] },
      { name: "Business", tagline: "For regular campaigns to a large audience.", popular: true, facts: ["Up to 10,000 monthly active users", "Performance analytics", "Ads tracking & attribution", "Complete Cekat Marketing tools"] },
      { name: "Enterprise", tagline: "For marketing teams running many campaigns at once.", facts: ["Up to 30,000 monthly active users", "Performance analytics", "Ads tracking & attribution", "1-on-1 setup with an ads analyst"] },
      { name: "Custom", tagline: "For bespoke volume and integration requirements.", facts: ["Custom audience volume", "Performance analytics", "Ads tracking & attribution", "Plan and setup tailored to your team"] },
    ],
    rows: [
      ["MAU (Monthly Active Users)", "Up to 3,000", "Up to 10,000", "Up to 30,000", "Custom"],
      ["Support", "Included", "Included", "Included", "Included"],
      ["Performance Analytics", "Included", "Included", "Included", "Included"],
      ["Ads Tracking & Attribution", "Included", "Included", "Included", "Included"],
      ["Complete Cekat Marketing Tools", "Included", "Included", "Included", "Included"],
      ["1-on-1 Setup With an Ads Analyst", "Included", "Included", "Included", "Included"],
    ],
  },
};

function pricingCards(plan) {
  return plan.tiers.map((tier, index) => `<article class="pricing-card${tier.popular ? " is-popular" : ""}">
    ${tier.popular ? '<span class="pricing-card__badge">Most popular</span>' : ""}
    <div class="pricing-card__head"><div><p class="pricing-card__number">PLAN 0${index + 1}</p><h3>${esc(tier.name)}</h3></div><span class="pricing-card__arrow" aria-hidden="true">↗</span></div>
    <p class="pricing-card__tagline">${esc(tier.tagline)}</p>
    <div class="pricing-card__quote"><strong>Let’s find the right fit</strong><span>Talk to our team for a tailored quote.</span></div>
    <a class="btn ${tier.popular ? "btn--primary" : "btn--ghost"} pricing-card__button" href="https://wa.me/15559925888?text=Hi%21%20I%27d%20like%20to%20learn%20about%20Cekat%20${encodeURIComponent(tier.name)}." target="_blank" rel="noopener noreferrer">Chat via WhatsApp <span aria-hidden="true">↗</span></a>
    <ul class="pricing-card__facts">${tier.facts.map((fact) => `<li><span class="pricing-card__check" aria-hidden="true">✓</span>${esc(fact)}</li>`).join("")}</ul>
  </article>`).join("");
}

function comparisonTable(plan, key) {
  const columns = key === "chat" ? ["Starter", "Pro", "Business", "Custom"] : key === "crm" ? ["CRM Pro", "CRM Business", "CRM Enterprise", "CRM Custom"] : ["Pro", "Business", "Enterprise", "Custom"];
  return `<details class="pricing-compare"><summary><span><strong>Compare every feature</strong><small>See what is included in each ${esc(plan.label.toLowerCase().replace(" plans", " plan"))}.</small></span><span class="pricing-compare__icon" aria-hidden="true"></span></summary>
    <div class="pricing-compare__scroll" tabindex="0" role="region" aria-label="${esc(plan.label)} feature comparison">
      <table><caption>${esc(plan.label)} feature comparison</caption><thead><tr><th scope="col">Feature</th>${columns.map((column) => `<th scope="col">${esc(column)}</th>`).join("")}</tr></thead>
      <tbody>${plan.rows.map(([label, ...values]) => `<tr><th scope="row">${esc(label)}</th>${values.map((value) => `<td class="${value === "—" ? "is-unavailable" : ""}">${value === "Included" ? '<span class="pricing-check" aria-label="Included">✓</span>' : value === "—" ? '<span aria-label="Not included">—</span>' : esc(value)}</td>`).join("")}</tr>`).join("")}</tbody></table>
    </div></details>`;
}

function pricingPage() {
  const tabs = [["chat", "Chat"], ["crm", "CRM"], ["marketing", "Marketing"], ["three-sixty", "Cekat 360"]];
  const panels = Object.entries(pricingData).map(([key, plan], index) => `<section class="pricing-panel" id="pricing-panel-${key}" role="tabpanel" aria-labelledby="pricing-tab-${key}"${index ? " hidden" : ""}>
    <header class="pricing-panel__intro"><div><p class="eyebrow">${esc(plan.label)}</p><h2>${esc(plan.label.replace(" plans", ""))}, built around your team</h2></div><p>${esc(plan.intro)}</p></header>
    <div class="pricing-cards">${pricingCards(plan)}</div>${comparisonTable(plan, key)}
  </section>`).join("");
  const threeSixty = `<section class="pricing-panel" id="pricing-panel-three-sixty" role="tabpanel" aria-labelledby="pricing-tab-three-sixty" hidden>
    <header class="pricing-panel__intro"><div><p class="eyebrow">Cekat 360</p><h2>One team, one system, one contract</h2></div><p>Chat, CRM, and Marketing brought together, with our team building it for you. Made for businesses that would rather not stitch it together themselves.</p></header>
    <div class="three-sixty-card"><div class="three-sixty-card__copy"><p class="eyebrow">A connected platform, set up with you</p><h3>Keep every team moving from one shared system.</h3><p>For businesses whose customer service, sales, and marketing tools—and data—need to work together.</p><h4>Right for you if you</h4><ul><li>Have CS, sales, and marketing teams still working in separate tools</li><li>Already use several tools whose data never quite connects</li><li>Need results quickly without adding load to your internal team</li></ul></div>
      <div class="three-sixty-card__includes"><h4>What you get</h4><ul><li>Every Chat, CRM, and Marketing feature on one platform</li><li>Full onboarding: we set up your AI agent, chat flows, and pipeline</li><li>A dedicated success manager watching your performance</li><li>Custom integrations into the systems you already run</li><li>Priority support and a direct WhatsApp group with our team</li></ul><p>Pricing is built around your team size and conversation volume.</p><a class="btn btn--primary btn--lg" href="https://wa.me/15559925888?text=Hi%21%20I%27d%20like%20a%20Cekat%20360%20consultation." target="_blank" rel="noopener noreferrer">Talk to our team <span aria-hidden="true">↗</span></a><small>A free 30-minute consultation, no commitment. We map out what you actually need first.</small></div></div>
  </section>`;
  const faqs = [
    ["Do your quotes include VAT?", "No. Quotes from our sales team exclude VAT as required by local regulation, and you get the full breakdown before you subscribe."],
    ["What counts as an MAU (Monthly Active User)?", "An MAU is a unique customer who interacts with your business in a given month. One customer counts once, no matter how many messages they send that month."],
    ["What is the difference between AI Simple and AI Full?", "AI Simple answers questions from the knowledge base you provide. AI Full adds the ability to run more complex flows such as lead qualification, follow-ups, and taking action inside the chat."],
    ["Can I start with just one plan?", "Yes. Many businesses start with Chat and add CRM or Marketing once the team settles in. Everything runs on the same platform, so your data connects the moment you add a product."],
    ["What if I need more than the largest plan?", "Take the Custom plan. We size the capacity, seats, and integrations around your requirements, and confirm the commercial terms with you first."],
    ["Are there setup fees or minimum contracts?", "Regular plans carry no separate setup fee and no minimum contract. For Custom, the commercial terms are agreed with our sales team before you begin."],
  ];
  return `<!doctype html><html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cekat.AI Pricing | Chat, CRM &amp; Marketing Plans</title><meta name="description" content="Explore Cekat.AI Chat, CRM, Marketing and Cekat 360 plans. Compare features and get a tailored quote for your team.">
  <link rel="icon" href="/assets/logo-mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css?v=61"><link rel="stylesheet" href="/secondary.css?v=1"><meta property="og:title" content="Cekat.AI Pricing"><meta property="og:description" content="Compare Cekat.AI plans and request a tailored quote."><meta property="og:type" content="website">
  </head><body class="secondary-page tone-blue pricing-page">${header("pricing")}
  <main id="main"><nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Pricing</span></nav>
    <section class="pricing-hero"><div class="wrap pricing-hero__inner"><p class="product-eyebrow"><span class="product-eyebrow__dot"></span>Pricing</p><h1>Clear pricing that scales with your business</h1><p>Pick what you need: an AI agent that answers chats 24/7, a CRM that keeps customer data in order, or marketing automation that measures campaign performance. Combine them any time.</p><div class="pricing-hero__actions"><a class="btn btn--primary btn--lg" href="https://wa.me/15559925888?text=Hi%21%20I%27d%20like%20a%20free%20Cekat%20consultation." target="_blank" rel="noopener noreferrer">Free consultation <span aria-hidden="true">↗</span></a><a class="btn btn--ghost btn--lg" href="https://chat.cekat.ai/register">Try free for 14 days</a></div><p class="pricing-hero__note">Start with one product and add the others whenever you are ready. Pricing is tailored to your region and requirements; ask our team for a full quote.</p></div><div class="pricing-hero__orbit pricing-hero__orbit--one" aria-hidden="true"></div><div class="pricing-hero__orbit pricing-hero__orbit--two" aria-hidden="true"></div></section>
    <section class="pricing-studio" aria-label="Compare plans"><div class="wrap"><div class="pricing-tab-wrap"><div class="pricing-tabs" role="tablist" aria-label="Choose a product">${tabs.map(([key, label], index) => `<button class="pricing-tab${index === 0 ? " is-active" : ""}" id="pricing-tab-${key}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="pricing-panel-${key}" tabindex="${index === 0 ? "0" : "-1"}" data-pricing-tab="${key}">${label}</button>`).join("")}</div><p class="pricing-currency-note">No public prices for your region? We’ll provide a quote for your market.</p></div><div class="pricing-panels">${panels}${threeSixty}</div></div></section>
    <section class="pricing-trust"><div class="wrap pricing-trust__inner"><div><p class="eyebrow">Trusted by growing teams</p><h2>3,000+ businesses trust Cekat</h2></div><div class="brand-proof__logos"><img src="/assets/logos/rumah-zakat.png" alt="Rumah Zakat" loading="lazy"><img src="/assets/logos/vio-optical-clinic.png" alt="VIO Optical Clinic" loading="lazy"><img src="/assets/logos/ancol.png" alt="Ancol" loading="lazy"><img src="/assets/logos/dokterhub.png" alt="DokterHub" loading="lazy"><img src="/assets/logos/kopi-kenangan.png" alt="Kopi Kenangan" loading="lazy"></div></div></section>
    <section class="pricing-faq"><div class="wrap product-faq__grid"><div class="product-faq__intro"><p class="eyebrow">FAQ</p><h2>Pricing questions</h2><p>Want help choosing? <a href="https://wa.me/15559925888?text=Hi%21%20I%20have%20a%20question%20about%20Cekat%20pricing." target="_blank" rel="noopener noreferrer">Talk to our team <span aria-hidden="true">↗</span></a></p></div><div class="faq-list">${faqs.map(([question, answer]) => `<details class="faq-item"><summary>${esc(question)}<span aria-hidden="true"></span></summary><div class="faq-item__answer"><p>${esc(answer)}</p></div></details>`).join("")}</div></div></section>
    <section class="pricing-last-cta"><div class="wrap pricing-last-cta__inner"><div><p class="eyebrow">Not sure where to start?</p><h2>Let’s find the plan that makes sense for your team.</h2><p>Tell us about your team and chat volume. We’ll recommend the right fit—not the most expensive option.</p><ul><li>30-minute consultation</li><li>A plan recommendation for your needs</li><li>No commitment</li></ul></div><a class="btn btn--light btn--lg" href="https://wa.me/15559925888?text=Hi%21%20I%27d%20like%20help%20choosing%20a%20Cekat%20plan." target="_blank" rel="noopener noreferrer">Talk to our team <span aria-hidden="true">↗</span></a></div></section>
  </main>${footer()}<script src="/secondary.js?v=1" defer></script></body></html>`;
}

for (const [slug, product] of Object.entries(products)) {
  const folder = resolve(root, slug);
  await mkdir(folder, { recursive: true });
  await writeFile(resolve(folder, "index.html"), productPage(slug, product));
  console.log(`Generated /${slug}/`);
}

const pricingFolder = resolve(root, "pricing");
await mkdir(pricingFolder, { recursive: true });
await writeFile(resolve(pricingFolder, "index.html"), pricingPage());
console.log("Generated /pricing/");
