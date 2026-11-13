# Footer: Kolom link

Reference: `Cekat.ai Redesign Blueprint (2).html`, Footer variation “Kolom link”.
Implemented in the shared `src/components/layout/footer.tsx`, across locales.

- Brand, social links and app badges on the left; Products, Features,
  Industries, Solutions and Legal aligned in five desktop columns.
- Three link columns at tablet sizes and two on mobile. Existing link labels,
  destinations, partner badge, legal content and copyright retained.
- Offices occupy a separate full-width row below the links. Indonesia,
  Singapore and Malaysia remain selectable, with the original company names
  and addresses. All three buttons fit mobile without horizontal scrolling.
- Removed decorative meteors and oversized closing logo to match the simpler
  column-link variation. Office content switches immediately, without blur.
- Existing homepage/secondary-page tab target sizing remains supported.

QA: desktop and mobile screenshots reviewed; 38 footer link destinations and
labels match the pre-change baseline (ignoring whitespace). No footer overflow
at 360, 390, 768, 1024 or 1440px. All three country selections work; keyboard
Space activates the focused country. All five locales checked at 360px: no
clipped tab text or footer overflow, with office panels present for each country.
