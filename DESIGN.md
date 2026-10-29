# DESIGN.md · cekat.ai landing page revamp

Direction file for the cekat.ai homepage. Sources: the Cekat.AI Brand Guidelines (2024), the "Website Revamp - New Structure" brief, the current cekat.ai site, and a review of the reference sites named in the brief (Notion, Calendly, Mintlify, Maze, Coda, Salesforce, ClickUp) plus a wider skim of top SaaS sites (Linear, Intercom, Attio and others). antislop (`antislop.md` + `antislop-ui`, `antislop-copywriting`, `antislop-layoutmobile`) is the filter on top of this file.

## Design Read

> Reading this as: a B2B revenue-platform landing page for Indonesian business owners and sales and marketing leads (SME to enterprise), in a brand-led, colourful, product-first language, dial **ENERGY 2 / RHYTHM 3 / MOTION 2**.

- **ENERGY 2:** The page should look confident and professional. The audience is buying a system that will run their revenue, so the page should feel like a serious tool, not a toy. Since the 2026-10-27 revision it is warmer and more colourful (Calendly-style hue backdrops), but the layout energy stays at 2.
- **RHYTHM 3:** The brief has 8 sections and each one has a different job. Each gets its own composition, so the page does not read as one repeated card grid.
- **MOTION 2:** Motion is used only to explain:
  - the pain cards widen to show what each tool misses (hover, focus or tap)
  - the funnel tabs switch, and each capability's window builds itself when it becomes active
  - the growth arrow draws once
  - nothing loops, except the trust marquee (owner override 2026-10-29, R-37), which pauses on hover and stops under reduced motion.

## Identity

- **Brand idea:** "One Loop, No Revenue Leaks" (from the brand book's supergraphic page).
- **Logo:** Logogram (speech bubble inside a connection signal) plus logotype "Cekat.AI". The SVGs are extracted directly from the brand PDF vectors (`assets/logo-full.svg`, `assets/logo-mark.svg`).
  - Use it on white or alice-blue backgrounds, or in white on Cekat Blue.
  - No effects, no outlines, no gradients on the logo.
  - Minimum height is 30px on web.
- **Personality:** innovative, reliable, fast, solution-oriented, user-focused. Copy and UI should feel *precise* (Craftsmanship value) and *kind* (Courtesy value), and should not shout.

### Identity motif: the supergraphic path

The brand book builds its supergraphic by breaking the logogram's circular line into segments. The broken segments then join into one continuous path that ends in an upward arrow, so the shape goes from leaks to a unified flow to growth.

The page tells that same story in three beats:

| Beat | Section | Treatment |
|---|---|---|
| Leaks | Pain points | Each resting card carries a faded **broken** piece of the path. The last card, "The gap", shows the three tool segments apart, and the lead visibly loses context at each handoff. |
| One loop | Revenue journey | The five funnel stages sit on **one continuous line** with rounded 45° corners. |
| Growth | Final CTA | The six product tiles line up above the closing headline: every part of the loop, ready to start. |

- **Geometry:** Strokes run at 45° and corners use a generous radius, matching the brand book.
- **Weights:** 3px stroke at UI scale, 6px or more at supergraphic scale.

## Color

**Revision 2026-10-27 (owner direction: "more colorful, like Calendly").** The page now uses the brand book's three main colours (p.17 "Main Colors") and their three gradients (p.19). That is 3 core colours plus navy and neutrals, all from one documented brand system (R-29). The colourful feel comes from these brand hues only. There are no purples, pinks or rainbow gradients.

**Colour means something: each hue is a stage of the revenue journey.** The same hue marks the same idea everywhere on the page: the hero cards, the pain-point tools, the journey tabs and the release cards.

| Hue | Stands for | Journey stage |
|---|---|---|
| Orange | Marketing, attention | Acquire |
| Greeny Blue | Conversations | Engage |
| Cekat Blue | CRM and deals | Convert |
| Greeny Blue to Yellow | The loop back to a repeat order | Retain |
| Cekat Blue to Greeny Blue | The whole picture | Measure |

| Role | Token | Hex | Use |
|---|---|---|---|
| Core 1: Cekat Blue | `--blue` | `#1352BF` | Primary buttons, links, active states, CRM / Convert hue |
| Core 2: Greeny Blue | `--cyan` | `#00B4C8` | Conversations / Engage hue. Used for fills, gradients and icons. As text it uses `--cyan-700 #007380` (5.6:1 on white). |
| Core 3: Yellowish Orange | `--orange` | `#F99500` | Marketing / Acquire hue and the growth arrow. As text it uses `--orange-700 #9E3A00` (6.9:1 on white). |
| Yellow (orange ramp) | `--yellow` | `#FFCB41` | Gradient partner only, never text |
| Navy | `--navy` | `#09214C` | Headlines and dark panels. This is the deepest step of the Cekat Blue ramp. |
| Logo blue | `--logo` | `#005FCA` | Logo artwork only. The logo is drawn in this value in the brand PDF, so it is kept unchanged. |
| Tints | blue `#F3F6FD #E4EBF9 #CCDAF1 #9EB8E5` · cyan `#E6F7FA #A5E1E8 #78D1DE` · orange `#FFF9EB #FDF0CB` | | Surfaces, chips, soft frames |
| Neutrals | `#0D192E` `#3A4960` `#505F73` `#717B91` `#D5D9E2` `#E5E9EF` `#F9FAFB` | | Text and lines, from the brand neutral scale |

### Gradients

All gradients are built from the brand book's blue, cyan and orange gradients.

- **Gradient backdrop (from Calendly's feature cards):**
  - **Where:** behind each journey-stage product window and in the header of each release card. It is a flat gradient tile in that stage's hue with a white card on top. There is no blur and no glow effect (R-13).
  - **Reason:** it makes the stage colour legible at a glance while the content stays on white.
- **Hero frame:**
  - **What:** one large rounded panel with a soft blue, cyan and orange gradient wash behind the loop composition.
  - **Reason:** it introduces all three hues at once, in the order the lead travels through them.
- **Final CTA:**
  - **What:** a Cekat Blue to Greeny Blue gradient, with the orange growth arrow on top.
  - **Contrast:** text sits on the dark blue half only.
- **Not used:** radial orbs, mesh noise or a full-page coloured background. Text always sits on white, navy or the dark half of a gradient.

### Contrast (measured)

| Pair | Ratio |
|---|---|
| Body text `#3A4960` on white | 9.1:1 |
| Muted text `#505F73` on white | 6.5:1 |
| White on `#1352BF` | 7.0:1 |
| `#007380` on `#E6F7FA` | 5.1:1 |
| `#9E3A00` on `#FFF9EB` | 6.5:1 |
| Navy on orange | 7.0:1 |
| Navy on cyan | 6.3:1 |
| Orange on navy (story metrics) | 7.0:1 |
| Cyan on navy (story metrics) | 6.3:1 |

- `#717B91` is no longer used for text. The pain cards keep full-contrast text in every state; only the decorative path pieces fade.

## Typography

- **Typeface:** Google Sans Flex for everything, at weights 400, 500, 600 and 700. **Reason:** it is the typeface named in the brand book (Typography: Google Sans) and the one the live site already ships, so it is identity, not a default.
- **Headings:**
  - Sentence case, as the brand book requires ("Do not set in all caps or all lowercase").
  - Letter-spacing is -1px on smaller headlines and -2px on larger ones, per the brand book.
  - The brief's Title Case copy is converted to sentence case.
- **Scale:** fluid with `clamp()`.

| Style | Size | Weight / line-height |
|---|---|---|
| Display (H1) | 44–76px | 600, 1.04 |
| H2 | 32–52px | 600, 1.08 |
| H3 | 22–28px | 600 |
| Body large | 18–20px | 400, 1.55 |
| Body | 16px | 1.6 |
| Small | 14px | |
| UI micro text | 12–13px | Inside product mockups only |

- **No** wide-tracked uppercase labels and **no** monospace (R-06). Section kickers are plain sentence-case text in Cekat Blue at 15px/500.

## Shape, depth, spacing

- **Radius:**
  - Buttons are full pills (`--r-btn: 999px`, revised 2026-10-30, owner direction: the page is playful, square buttons felt stiff), with a slight lift on hover and a small press on click (none under reduced motion). Pill-shaped too: the mobile menu button, mock "Approve"/"Start chat" buttons and the tool-window tabs.
  - 12px for form inputs (`--r-field`), so fields stay easy to read
  - 12px for UI chips and small cards
  - 20px for content cards
  - 28px for the two big panels (customer story and final CTA)
  - No pills, except chat bubbles, which are speech bubbles by nature, like the logogram.
- **Shadow:** Used only on floating product windows, which sit above the page. Everything else is flat with 1px `#E5E9EF` borders.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
  - Section padding varies on purpose: 128px for story sections, 96px for catalogue sections, and a shorter blue band for trust.
  - Mobile uses roughly half.
- **Container:** 1200px content width, 24px gutter (16px on mobile).

## Section compositions (RHYTHM 3)

1. **Hero:** Centred headline and CTAs (Notion and Calendly pattern). **Rotating word (2026-10-29, owner direction, Notion pattern):** "revenue" in the headline sits in a tinted pill and cycles revenue → leads → traffic: the word erases, the pill takes the next colour and icon (revenue: blue, trend arrow; leads: orange, person-plus; traffic: cyan, cursor), types the next word, and holds about 2.6 seconds. The pill's width follows the text with Notion's easing (.3s cubic-bezier(.86, 0, .07, 1)). Screen readers get the fixed headline "#1 AI-powered revenue technology"; the animated copy is hidden from them. It pauses while the tab is hidden and does not run under reduced motion. It loops (owner override of MOTION 2, R-37); WCAG 2.2.2 asks for a way to stop motion longer than 5 seconds, which this does not offer. Below sits a wide product composition that shows **one full revenue loop** (revised 2026-10-29, owner direction): Acquire → Engage → Convert → Measure, then the insight goes back to Acquire.
   - **Acquire (orange):** a creator post (Kirana, Instagram Reel) with its own tracking link in Cekat's short-link format (`<business>.ckt.link/<creator>-ig`, from Creator Hub in `cekat-dashboard` / `cekat-track`), the tracked steps (views → link taps → chats), and the other tracked sources underneath (Click-to-WhatsApp ad, TikTok creator, website visit).
   - **Engage (cyan):** the WhatsApp chat that came "from Kirana's Reel"; the Cekat AI agent books a slot.
   - **Convert (blue):** the CRM pipeline at Booked, with the follow-up reminder and the revenue source credited to the Reel.
   - **Measure (blue → cyan):** analytics card "Cost per booking, by source" (the Marketing Reports metric family: cost per chat, paid orders and ROAS by source) with the insight "Creator posts book customers at the lowest cost."
   - **The return:** a line runs from Measure back under the cards and up into Acquire, labelled "Next campaign: brief more creators like Kirana, and Meta learns who booked". The second half is the Meta Conversions API signal Cekat already sends. This draws the brand's continuous loop literally.
   - **Arrows:** short arrows in the gaps, each in the colour of the stage it leads into. Cards are bottom-aligned so the arrows and the return line sit at one height.
   - **Under 1180px:** the cards stack along a vertical gradient line, and the "Next campaign" note closes the stack.
   - **Before launch:** confirm that creator-to-sale reporting is live. The internal wiki (Creator Hub, 2026-10-02) listed creator revenue reporting as outside that delivery. Names, link, costs and the clinic are illustrative and labelled so.
2. **Trust (revised 2026-10-29, owner direction: follow Salesforce):** a full-width Cekat Blue band with the claim centred in white on one line (from 1000px wide; it wraps on smaller screens), then real customer logos scrolling in one row, then a curved lower edge into the pain section.
   - **Logos (2026-10-29):** official files taken from each customer's own website and recoloured white in `assets/logos/` (Rumah Zakat, VIO Optical Clinic, Ancol, DokterHub, Kopi Kenangan, Moir Salon, Sozo Dental, mGanik, Politeknik Multimedia Nusantara, Rata). Each has its own display height (`--h`) so the marks look the same visual size. Nature Craft Indonesia and Threeland Property have no logo online yet and stay as white text until they send one. Confirm with each customer that their logo may be shown before launch.
   - **Marquee:** linear, about 40px per second (Salesforce runs about 37px/s), with an 8% fade at each edge. The list is copied until the row overflows twice, and the copies are hidden from screen readers, so the names are read once.
   - **Pause control: removed (owner override 2026-10-29, R-37).** The row pauses while the pointer is over it. Note: WCAG 2.2.2 asks for a way to pause motion that runs longer than 5 seconds, so keyboard and touch users now have no way to stop it; reduced-motion users get a still row.
   - **Reduced motion:** no scrolling; the logos wrap, centred.
   - **Contrast:** white on Cekat Blue is 6.6:1.
3. **Pain points:** Four expanding cards in a row (Calendly "Book / Prep / Capture / Follow up" pattern, revised 2026-10-27 at the owner's request; replaces the Coda scroll story).
   - **Cards:** Marketing (Acquire, orange), Chats (Engage, cyan), CRM (Convert, blue), and The gap (navy). Each card carries one line of the brief's copy verbatim, so the full pain statement is readable without interacting.
   - **Interaction:** hover (after 120ms, so passing the pointer across does not trigger it), keyboard focus or click widens a card (flex-grow 1 → 2.1, 500ms ease-in-out, Calendly's timing). The open card shows two things it does, one thing it misses, and a small tool window in a stage-hue gradient. The window rows build in with a 90ms stagger, like Calendly's availability rows. The card stays open after the pointer leaves.
   - **App glimpses (revised 2026-10-29, owner direction):** each open card shows a small window of the tools teams really use, with tabs to switch between them (WAI-ARIA tabs; click, arrow keys, Home/End). Marketing: AppsFlyer (attribution table, sales column unknown) and MoEngage (push funnel, bookings unknown). Chats: WhatsApp, Instagram DM and TikTok messages, each in its own colours, each ending with what it cannot tell you. CRM: HubSpot (deal record with "Original source: Offline ?") and Zapier (a zap whose HubSpot step has an empty ad source). Every window ends on the same dashed orange "?" so the gap reads the same way in every tool. Rows build in again on every tab change. Numbers are illustrative and labelled. These are generic glimpses, not copies of any product's screens.
   - **Card art (2026-10-29):** one wide graphic, the brand's broken loop drawn as a row of white arches with gaps, runs behind the whole row of cards. Each resting card shows its own slice of it over a soft wash of its stage hue (navy on The gap), so the shapes continue from card to card as on Calendly. A ResizeObserver keeps the slices lined up while cards widen and narrow. It hides when a card opens. A trial with one coloured line through all four cards was dropped because it felt too rigid.
   - **Tool windows show the named apps with their logos (decided 2026-10-29, reversing the unbranded trial):** AppsFlyer, MoEngage, WhatsApp, Instagram, TikTok, HubSpot and Zapier. Each tab and each sample window header carries the app's logo: the AppsFlyer and MoEngage favicons as images (`assets/apps/`), the others as Simple Icons shapes in the brand colour. Check with legal that showing these brands this way is acceptable.
   - **The gap card (revised 2026-10-29, owner direction: "more intuitive"):** always navy, so the turn of the story reads first. When opened, one lead, Rina, passes three stacked tool boxes: Marketing (Acquire) knows she came "from Instagram ad"; at the broken connector to Chats an "✕ Ad source" chip drops away, so Chats (Engage) shows "source?"; at the next break "✕ Chat history" drops, so CRM (Convert) shows "source?" and "history?". Then: "Every handoff drops context, so each team starts from zero." Plays once per opening (about 5 seconds); reduced motion shows the finished state with both dropped chips visible. The link goes to the revenue journey.
   - **Under 1080px:** the cards stack, all open, joined by dashed broken connectors. Each card's rows build as it scrolls into view (the Calendly scroll-list pattern).
   - **Reduced motion:** no width animation, no row build, and the dot is shown already fallen.
   - **Accessibility:** each card title is a button with `aria-expanded`. Closed-card details are `visibility: hidden`, so screen readers skip them.
4. **Revenue journey:** A five-stage rail on one continuous line (Calendly and Attio pattern). Each stage then uses Calendly's product feature list (revised 2026-10-29, owner direction).
   - The rail line runs as one gradient through the stage hues.
   - **Product lineup (2026-10-29, owner direction: "Cekat has many products that support every stage"):** under the section heading, "Six Cekat products, one customer context" shows a tile per product with its official icon (`assets/products/`) and the stages it powers: Cekat Marketing (Acquire), Cekat Chat (Engage), Cekat CRM (Convert, Retain), Cekat Broadcasts (Retain), Cekat Automation (Convert, Retain), Cekat Analytics (Acquire, Measure). Selecting a stage lifts the products it uses (white, shadow, coloured icon); the others step back (dashed outline, grey icon, text still readable). Inside each stage, "Powered by" is now a row of product pills with icons, right under the lede, instead of a text line at the bottom. "Cekat Campaign" was renamed "Cekat Broadcasts" to match the product icon set, including in the sales form.
   - **Placeholder:** no Marketing icon was supplied, so `assets/products/marketing.svg` is a megaphone drawn to match the set. Replace it with the official icon.
   - **Rail position (revised 2026-10-29, owner direction):** the rail is a sticky vertical line in its own left column (150px), so visitors can switch stage from anywhere in a long feature list without scrolling back up. Switching stage from deep in a list jumps to the top of the new stage. Arrow keys work in both directions. Under 900px it becomes a horizontal rail that sticks under the nav.
   - **Feature list:** stage chip, heading and lede, then every "your team can" capability as its own row with an icon, a title and a one-to-two-sentence explanation, separated by dividers. The active row is navy with a tinted icon; the others are muted but stay readable (AA), unlike Calendly's 20% fade.
   - **Illustrative window per capability (30 in total):** a sticky frame on the right (light top, white band with soft stripes, deep stage colour at the bottom, as on Calendly) holds one small white window per capability: a visitor timeline, lead sources, creator links, conversion events, KPI tiles, campaign ranking, unified inbox, an AI reply with its source, detected intent, qualification switches, routing, handover summary, a contact profile filling itself in, labels, a deal moving through the pipeline, priorities, automation rules, stage history, a segment builder, dormant win-backs, a lifecycle flow, a personalised broadcast, scheduled follow-ups, a restock funnel, the stage funnel, spend vs revenue, team performance, leakage, click-to-revenue and operations tiles. All numbers and names are illustrative and labelled.
   - **Activation:** the row crossing the middle of the screen becomes active as you scroll (Calendly's scroll list), and clicking a row activates it too.
   - **Motion:** each window builds itself when it becomes active: rows slide in with a 110ms stagger, bars grow, switches flip on, chat replies follow a typing indicator, form fields type themselves, a deal hops across pipeline columns, the stage-history line fills. Under reduced motion every window shows its finished state at once.
   - **Under 900px:** no sticky frame; tapping a capability opens its window directly under it, and only the active row shows its explanation.
5. **Start your trial, with Clara (revised 2026-10-29, owner direction):** the feeling to leave is "don't worry about configuration, Clara will help you", and not only at setup: Clara stays with you after you go live and helps proactively (a brief, not the on-page words). The 14-day free trial is the account's trial, not a Clara offer, so it is never written next to Clara's name.
   - **Left (kept short on purpose):** kicker "Meet Clara, your AI setup agent", headline "Clara handles the setup. You focus on your business.", lede "Share your website link and Clara sets up your AI agent, CRM, marketing and campaigns. Once you're live, she stays with you.", then three moments with Clara on a vertical brand-gradient line, each with an icon and a "when" label: Day 1 "Clara sets everything up with you", Every day "Ask Clara anything, on any page", As you grow "Clara spots what to improve, before you ask". Then the trial button and "14-day free trial · No credit card required".
   - **Right, the standout:** a soft three-hue field with dashed orbit rings and coloured nodes, Clara's mark large above the card, and a Clara console card that plays once on scroll (about 8 seconds): Clara greets, the user shares a link, Clara reads the site, the setup plan ticks 5 of 6 short items with stage chips (Business profile; Engage: AI agent; Convert: CRM pipeline; Acquire: Ad tracking; Retain: Follow-up campaign), an Action Card ("Connect WhatsApp Business", Approve) appears, then a "2 weeks later" divider and an unprompted "Tip from Clara" (18 chats waited over an hour last night; turn on an after-hours reply?). Chips "Training your AI agent" and "Building your CRM pipeline" pop in with the ticks and "Watching for ways to help" with the tip. Reduced motion shows the finished state.
   - **Source:** Clara's onboarding mode and page-aware sidebar chat in `cekataiofficial/ai-clara` (crawls the signup link, keeps a Setup Plan, proposes Action Cards the user approves; Clara never changes settings by itself). Proactive tips after go-live are the owner's product direction; confirm they ship before launch.
   - **Before launch:** confirm Clara onboarding and proactive tips are live for trial accounts. The clinic, link and counts are illustrative and labelled.
   - **Under 960px:** copy first, then the Clara card; the large mark and chips are hidden, and under 520px the status pill is hidden too.
   - **Cekat MCP, the second way in (2026-10-29, owner direction):** the feeling is "Clara helps you inside the dashboard, but if you'd rather use your own AI agent, connect it to our MCP and everything is there". Under a dashed divider in the same panel: kicker "Prefer your own AI agent?", heading "Connect it to Cekat with our MCP server", one line ("Sign in with your Cekat account from Claude, ChatGPT, Gemini or any MCP client. Your chats, CRM, campaigns and reports are right there."). The graphic: AI app chips (Claude, ChatGPT, Gemini, Any MCP client; Simple Icons shapes inlined as data URIs) wire into a central "Cekat MCP" hub with the Cekat mark, which wires out to the six product icons. It plays once on scroll: chips appear, wires draw into the hub, the hub pulses, wires draw out, product icons pop. Under 960px it stacks without wires.
   - **Source:** `cekataiofficial/ai-mcp`: one Streamable HTTP endpoint (`/mcp`) exposing each product's tools as `product.function`, with OAuth sign-in through Cekat's Supabase Auth. Confirm the public MCP URL, which products are exposed at launch (the example config shows chat and marketing), and which AI apps are supported before launch; the page names Claude, ChatGPT and Gemini as examples.
6. **Industries (revised 2026-10-29, owner direction: follow Salesforce's industry grid):** centred heading and lede, then a 4 × 2 grid of gradient cards (deep blue to Cekat Blue to a lighter blue), each with the industry name large in white, one line on what Cekat does there, a "Talk to us" link bottom-left, and a white round icon badge bottom-right with a two-tone illustration in brand colours. A faint ring of the brand loop sits behind the badge. The whole card opens the sales form with the industry prefilled; on hover the card lifts and the badge tilts. The cards are uniform **on purpose**: each industry has equal weight, and the grid is a menu.
   - **Industries:** Healthcare, Retail & F&B, Financial Services, Automotive, Logistics, Travel & Hospitality, plus Education and Property (both already listed as "also running on Cekat", with real customers on the page). The rest (beauty & wellness, e-commerce, non-profit) sit in one line under the grid. Education and Property were added to the sales form's industry list.
   - The Unsplash industry photos were dropped with this redesign.
7. **Customer stories (revised 2026-10-30, owner direction):** a carousel on a blue-to-cyan-to-peach gradient under "What changes when the journey is connected", combining three references.
   - **Calendly:** one open story in the middle with two neighbours on each side as narrowing slivers; clicking a sliver, the arrows, the dots or the arrow keys brings a story to the middle; widths ease over .5s.
   - **Notion:** slivers show the person's photo in grayscale tinted with the story's stage colour; the open card shows it in full colour with the brand name top-left.
   - **Card copy follows the owner's template:** brand and industry, a headline in the form "[Brand] keeps high-intent opportunities visible across the customer journey", then three metrics (for example +38% qualified lead rate, −62% first response time, +27% pipeline conversion).
   - **Sample content, by owner request:** six fictional businesses (Lumina Clinic, Kopi Senja, Arunika Residence, Kirana Beauty, Lintas Kirim, Cendekia Academy), dummy metrics, and Unsplash stock photos (`assets/stories/`, free Unsplash licence). A line under the carousel says they are samples for layout review. **Must be replaced with approved customer stories before launch** (antislop R-17/R-18: no fabricated results or testimonials on a live page). Cekat's real #SuccessStory videos (Rumah Zakat, Multimedia Nusantara Polytechnic, VIO Optical Clinic, DokterHub, Moir Salon, Threeland Property) and Nature Craft Indonesia's published numbers are good candidates.
   - **Under 860px:** one story at a time, photo on top, with the arrows and dots.
8. **Integrations (revised 2026-10-30, owner direction: like Calendly, Salesforce, Intercom, Freshworks; no grouping by stage):** centred kicker, heading "Connect Cekat with the tools you already use", one-line lede and an "Ask about an integration" link (opens the sales form). Below, Calendly's wall: three offset rows of soft-blue rounded tiles joined by short bridges, each with one brand-coloured icon; the name appears in a navy tooltip on hover (and is in the markup for screen readers). Tiles rise in once on scroll; under reduced motion they are simply there. Under 1080px the rows merge into one even grid. A Freshworks-style note under the wall: some integrations run through Cekat Automation, and third-party names and logos belong to their owners.
   - **What is shown (29), from Cekat's repos:** channels from `cekat-spec` (`channel.proto`: WhatsApp, Telegram, Instagram, web chat) and the dashboard (Messenger, TikTok, email); ad platforms from `cekat-dashboard/features/marketing-integrations` (Meta, Google Ads); Calendly from marketing events; Xendit from the dashboard; and apps available in Cekat Automation (`automation-activepieces` community pieces): Google Sheets, Gmail, Google Calendar, Google Drive, Slack, HubSpot, Salesforce, Notion, Airtable, Shopify, WooCommerce, Stripe, Mailchimp, Google Forms, OpenAI, Claude; plus Cekat Open API and Cekat MCP. Icons are Simple Icons in brand colours (`assets/integrations/`).
   - **Confirm before launch:** which Automation apps are switched on for customers (the fork contains hundreds of pieces; this shows a sample), and whether OrderOnline and Tokopedia should be added (both appear in the dashboard; no standard icon is available).
9. **What's new (added 2026-10-27, owner request):**
   - **Content:** The three latest entries from the real Cekat changelog (docs.cekat.ai "Changes Log"), shown as three cards. Each card has the release date, the product area and a one-line summary translated to English, and links to that entry.
   - **Colour:** Each card's hue comes from the product area it belongs to.
   - **Button:** "See all product updates" goes to the changelog page.
   - **Upkeep:** Update the three cards when a new entry is published.
10. **Final CTA (revised 2026-10-30, owner direction: like ClickUp, Salesforce, Freshworks; full width):** a full-bleed band from navy to Cekat Blue, edge to edge, no rounded panel. Centred: the six Cekat product icons (Marketing, Chat, CRM, Broadcasts, Automation, Analytics) as white app tiles in one straight, evenly spaced row (ClickUp's app tile, one per product; revised from a fanned hand at the owner's request). They rise in once on scroll; hovering a tile lifts it and shows the product name (Marketing, Chat, CRM, Broadcasts, Automation, Analytics) in a white pill above it, and screen readers get the full product names; then the headline in white, the lede, a white "Start free trial" pill and an outline "Talk to sales" pill (Freshworks), and the reassurance line. Four brand four-point stars in yellow, orange and light cyan drift gently around the edges (Salesforce); they loop (owner override of MOTION 2, R-37) and stay still under reduced motion. A particle stream was tried and removed at the owner's request.
11. **Footer:** A single compact row: logo, offices, Meta partner line. There is no 4-column template.

## Conversion: self-serve first (owner direction 2026-10-27)

**Goal:** a visitor starts the 14-day free trial in one click. Booking a demo becomes the secondary path.

**Research basis:** the hero, nav and closing CTAs of Calendly, ClickUp, monday.com, Intercom, Notion, Slack, Airtable, Attio, HubSpot, Freshdesk, Front and Mailchimp, plus the SEA competitors Barantum, Wati, respond.io and SleekFlow.

- **One primary action, one label, everywhere:** "Start free trial".
  - Wherever the trial is offered as a button, the label is the same. Only the closing headline changes its wording. Research pattern: monday repeats "Get Started" about 10 times, and Intercom pairs "Start free trial" with a demo option in every section.
  - **Destination:** `https://chat.cekat.ai/register`, Cekat's live sign-up page (email-first, sends a verification link). It opens in the same tab, so it is one click to the form.
  - The email is **not** passed in the URL. The register page does not read it, and personal data should not go into query strings.
- **Reassurance line under every trial button:** "14-day free trial · No credit card required · Set up in about 10 minutes". The onboarding band and the mobile sticky bar use the short form, "14-day free trial · No credit card required".
  - "14-day" is the owner's offer.
  - "No credit card required" was confirmed true by the owner on 2026-10-27 (R-36). It is the strongest reassurance line in the research (Intercom, ClickUp, Wati, Barantum).
  - "10 minutes" is the setup claim cekat.ai already makes.
  - The business-email requirement moved out of the reassurance line to keep it to three items. It is still stated in onboarding step 1 ("Enter your business email…"), so nobody is surprised on the register page.
- **Sales is demoted, not removed.** "Talk to sales" is a text link:
  - in the nav, as a link sitting before the filled button
  - under the hero buttons
  - in each journey panel
  - in the final CTA

  It opens the existing sales form. Research pattern: Calendly, monday, Slack and Notion all put "Log in", then sales as a link, then one filled sign-up button.
- **Nav order:** Log in (link to `chat.cekat.ai/login`), Talk to sales (soft blue pill), then the filled **Start free trial** pill.
- **Header menu (revised 2026-10-30, owner direction: like x.ai):** Products ▾, Solutions ▾, Resources ▾ and Pricing (cekat.ai/en/pricing) as pill-shaped triggers.
  - **Products:** the six products (icon, name, one line) on the left; on the right a live preview of the hovered product that builds itself (leads-by-source bars, a WhatsApp-style chat, a mini pipeline, a broadcast with its stats, an automation flow, a funnel). Each product link jumps to the revenue journey and opens that product's stage.
  - **Solutions:** the eight industries in two columns and an "Explore all industries" footer link. **Resources:** customer stories, what's new, integrations, Clara, the help center and the changelog (the last two open docs.cekat.ai in a new tab).
  - **Transition (x.ai):** one shared white box slides and resizes (.34s) to fit whichever menu is open, while the menus crossfade and slide 28px sideways in the direction the pointer moved; the chevron flips. Hover opens on desktop after 90ms (instantly when another menu is already open); moving to Pricing, the logo or the buttons, or leaving the header, closes it. Click, Enter, Arrow Down (opens and focuses the first link) and Escape work; focus leaving the header closes it. Reduced motion removes the slides.
  - **Under 1100px:** the hamburger panel lists the menus as accordions (no shared box, no previews).
- **Hero:**
  - Primary: **Start free trial**.
  - Secondary: **See how it works**, a ghost button that scrolls to the revenue journey. It replaces "Explore Cekat" (R-15).
  - Then the reassurance line and a "Prefer a walkthrough? Talk to sales" link.
- **Trial onboarding band (new section, after the revenue journey):**
  - **Content:** the real 3-step onboarding from docs.cekat.ai "Registrasi dan Onboarding": create your account, build and train your AI agent, connect your channels.
  - **Antislop note:** three steps here is the documented process, not the template "How it works" (R-05).
  - **Visual:** the journey's supergraphic line runs through the three steps and ends in the orange arrow pointing at the trial button. The motif carries the visitor to the CTA.
- **Mobile sticky trial bar (Airtable pattern):**
  - **What:** a slim bottom bar with "Start free trial". It appears once the hero buttons scroll out of view and hides when the final CTA is on screen. While it shows, the nav's trial button is hidden, so the page never shows two fixed trial buttons at once.
  - **Where:** phones only. On desktop the sticky nav already carries the button.
- **Not used:** countdown timers, "limited offer" banners, pre-checked plans, or three competing CTAs in the hero (research anti-patterns).

### Experiments to run after launch (A/B)

1. **Hero CTA copy:** "Start free trial" vs "Start your 14-day free trial" vs "Try Cekat free".
2. **Reassurance wording:** "No credit card required" ships on every line (confirmed 2026-10-27). Test its position: first item ("No credit card required · 14-day free trial") vs second, and whether naming the business-email requirement up front lowers sign-up starts but raises completed verifications.
3. **Google sign-up:** add "Sign up with Google" to the hero (the Calendly pattern; it needs Google SSO on chat.cekat.ai). Measure sign-up starts against completed verifications.
4. **Sales link visibility:** show "Talk to sales" in the hero vs only in the nav and final CTA. Watch trial starts and sales leads together, so self-serve does not quietly cost enterprise deals.

**Instrumentation:** tag every trial button with `data-cta="<location>"` (hero, nav, journey-<stage>, onboarding, final, sticky) so the analytics tool can attribute which placement drives sign-ups.

## Content rules

- **Icons:** brand icons are drawn with CSS masks whose shapes are inlined as data URIs (`--i-whatsapp` and so on in `:root`). Mask images loaded from files are blocked when the page is opened straight from disk (file://), which hid the icons in earlier reviews.

- **English only (owner direction 2026-10-29):** every visible string is English, including sample chats in product UI. Amounts use `IDR` with English number format (IDR 96.4M, IDR 42K); times use 24-hour `14:00`.
- **Stage chip placement (owner direction 2026-10-29):** every card or window that belongs to a journey stage starts with its stage chip **on the left of its header line**, followed by the card label: hero loop cards, pain cards, journey panel windows and release cards. Never right-aligned. The gap card has no stage, so it carries no chip; integrations are no longer grouped by stage.

- **Stats used** are only the figures the brief or cekat.ai provides:
  - 2M+ conversations processed per day
  - 15+ industries
  - 3,000+ businesses
  - Official Meta Business Partner
  - Nature Craft Indonesia: +50% revenue, closing rate up from under 20% to over 40%
- Product UI values are **illustrative** and labelled as such on the mockups.
- No em dashes. The brief's two em dashes are rewritten with commas.
- Customer logos are set as text wordmarks until official logo files are supplied (marked `[LOGO]` in code).

## Open decisions for the product owner (R-37)

These come from the brief's copy and collide with antislop rules. They are kept as written until the owner decides:

1. **The H1 "#1 AI-Powered Revenue Technology."** **Decided 2026-10-27: kept as written (owner override of R-16).** The owner is sourcing the "#1" claim. Before launch, the source must be cited on the page, for example as a footnote under the micro-proof line (R-36).
2. **The secondary CTA "Explore Cekat"** and the per-stage "Explore Cekat X" CTAs. **Resolved 2026-10-27 by the self-serve change:** the hero secondary is now "See how it works", and the per-stage CTAs are "Start free trial" plus a "Talk to sales" link.
3. **Product, industry and customer-story pages do not exist yet.** For now the industry links open the sales form with the industry pre-filled, so no link is dead.
4. **"No credit card required."** **Resolved 2026-10-27:** the owner confirmed the 14-day trial needs no card. It is now on every reassurance line, the sticky bar and the sales form (see Conversion).
