# Blog motion pilot

Scope: `/blog` listings in all existing locales. Article pages, other landing
pages, shared navigation and existing local work are not redesigned.

Direction: existing Cekat editorial layout and palette, ENERGY 2 / RHYTHM 3 /
MOTION 2. No new copy, imagery, fonts, geometry or claims.

Sources: `Cekat.ai Redesign Blueprint (2).html`, Motion section and generated
prompt rules; Emil Kowalski's `animate`, `choreograph`, `review-animations` and
`animate/RECIPES.md` at https://github.com/emilkowalski/skills.

## Entrance timeline

| Element         | Role    | Start | Duration | Motion                            | Relationship                               |
| --------------- | ------- | ----- | -------- | --------------------------------- | ------------------------------------------ |
| Blog title      | Lead    | 0ms   | 240ms    | 8px rise, opacity 0.9 to 1        | Establish the page                         |
| Featured copy   | Support | 50ms  | 200ms    | 6px rise, opacity 0.9 to 1        | Overlap title, lead into the story         |
| Featured visual | Support | 80ms  | 200ms    | Scale 0.99 to 1, opacity 0.8 to 1 | Overlap copy, no second container entrance |

Strong ease-out: `cubic-bezier(0.23, 1, 0.32, 1)`. CSS runs independently of
hydration. Readable initial opacity avoids concealing articles during loading.
No pointer lock, visibility gate, perpetual animation or scroll dependency.

## Interaction decisions

- Article images: 160ms, 1.025 hover zoom on fine pointers only. Text and hit
  targets stay still; the image confirms the whole story is clickable.
- Buttons, category links and pagination: scale 0.97 on pointer press, 160ms
  deliberate press and 100ms release. Focus-visible keyboard actions stay still.
- Mobile search: pointer-open input appears with a 200ms opacity/4px transition;
  layout updates immediately, never animating dimensions. Close is immediate.
  Enter/Space opens and Escape closes without animation. Focus frames cancel
  on rapid toggle and unmount; Escape returns focus to the toggle.
- Reduced motion: no entrances, zoom, displacement or press movement. Existing
  colors, underlines and visible focus still give feedback, without delays.
- No dependencies added. The listing no longer mounts the general GSAP/observer
  wrapper; its 800ms closing-section reveal is deliberately omitted here.

## What stays still

- Article rows and supporting-story rail: editorial scanning must not wait for
  staggered reveals or re-run when filters/pagination change.
- Categories and results: immediate navigation, no exit queue before fetching.
- CTA section: always visible rather than fading in on scroll.
- Badges, dates, backgrounds and header: motion adds no useful information.

## Feel check

Scrub the first 280ms: title should lead into the featured story, not make three
separate entrances. Rapidly hover in/out and toggle search mid-entry; controls
must respond immediately without late focus stealing. Repeat with reduced
motion and keyboard. Real-device gesture feel and field Web Vitals are not
inferred from code.

## Verified pilot results

- At 390 / 768 / 1440px, listing text and section/card rectangles match the
  pre-motion baseline exactly under reduced motion; no horizontal overflow.
  Desktop and mobile screenshots were visually reviewed.
- Browser animation scrubbing at 0 / 50 / 80 / 140 / 280ms confirms overlapping
  entrances and complete settling at 280ms. Switching reduced motion on at
  140ms immediately restores opacity 1, transform none, and animation none.
- Featured hover reaches scale 1.025 with a 160ms transition; hover-out restores
  transform none. Mobile pointer search uses 200ms transitions; Enter opens
  with 0ms transitions. Escape closes immediately and returns focus. Rapid
  open/close leaves focus on the toggle with no queued input focus.
- Search submission reaches `/blog?q=CRM`; category, pagination, article and
  closing CTA destinations remain present and unchanged. Search result loading
  and production runtime QA are blocked by upstream WordPress `/posts` HTTP
  500, so successful result rendering is not claimed. The cached dev listing
  at `http://localhost:4173/blog` remains available.
- Full suite: 83 test files / 762 tests pass. ESLint, TypeScript, production
  build (622 static pages), and `git diff --check` pass. Existing multiple-lockfile
  build and favicon manifest warnings remain outside this motion pilot.
- No commit/push, dependency installation, or unrelated page changes made for
  this pilot. The temporary production QA server was stopped; 4173 is untouched.
