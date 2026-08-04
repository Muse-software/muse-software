# 2026-08-04 — Site Walkthrough PDF

## Deliverable
`Muse-Site-Walkthrough.pdf` (17 pages, ~7.5MB, repo root): every route in EN+AR — landing, explore, 3 services, about, careers, contact, get-started, newsletter — with desktop (top + footer) and mobile hero screenshots, verbatim copy tables, and legal/404/string-inventory pages. Muse maroon/orange styling, Space Grotesk + IBM Plex Sans Arabic.

## What it covers
- 10 routes, each shown with the first desktop screen, the last desktop screen (footer), and the mobile hero screen, in EN and AR.
- Key copy quoted verbatim from `messages/*.json` + `lib/content/*.ts`, both locales.
- Landing and the three service pages get a full page per language; explore/about/careers/contact/get-started/newsletter get one compact bilingual page each.
- Last page: legal summaries (privacy 5 sections, terms 6), 404, and where the strings live.

## Update 2026-08-04 (evening): re-rendered after the Arabic Voice Pass
56 AR strings changed site-wide (de-AI pass); the walkthrough was re-built so screenshots and quoted copy match the new voice:
- `shoot.py` re-run against the post-pass production build (60 fresh screenshots, gitignored).
- 2 stale AR quotes in `document.html` updated (explore subtitle → "تطلق أسرع، من غير ما تتنازل عن الجودة"; get-started hero → "وأي مشروع نشتغله نسلّمه شغّال فعلًا."). All other quoted AR cells verified current by diffing against the content files.
- Verified: measure.py all 17 pages within bounds; fonts pure Space Grotesk + IBM Plex Sans Arabic; zero em/en dashes + curly quotes; vision-checked AR pages render the new copy (e.g. "ننفّذ استراتيجيتك للذكاء الاصطناعي، مو نعرضها في شرائح.") with correct RTL/shaping.

## Hotfix 2026-08-04 (night): last "X، لا Y" survivors + caption sweep
Abdullah caught the hero subtitle still using the killed formula: "نبني الشيء نفسه، لا العرض التقديمي عنه." — my original kill-grep only matched the indefinite «لا بعرض», missing the definite «لا العرض». Fixed:
- 3 content strings in `messages/ar.json` (hero.subtitle, Footer.worldview, Metadata.siteDescription) → «نبني الشيء نفسه فعلًا، مو بس عرض تقديمي عنه.» / «نبني الشيء نفسه، مو العرض اللي يشرحه.».
- Rebuilt `document.html` caption sweep: my earlier checker only scanned `<td class="ar">` cells, missing `.shotcap` captions. Found + fixed 5 stale AR caption quotes (old CTA heading, AI summary, PE summary «بلا تنازل», gamification «التبنّي», contact «لنتحدث»). Full sweep of all 79 quoted fragments (cells + captions, EN + AR) now passes against current content.
- Verified: «، لا» count ZERO in all AR content; tsc clean; build green; parity PASS; DOM check on live page confirms new hero subtitle renders and old string absent; PDF re-rendered (17 pages within bounds, fonts + punctuation clean).

## Notes
- Screenshots taken from the local staging build (1440px + 390px viewports).
- Mobile full-page screenshots are ~13,000px tall, so the mobile hero screen stands in for them; quoted copy covers the rest (noted on the legend page).
- Build source in `walkthrough-src/` (committed): `document.html`, `shoot.py`, `build.py`, `measure.py`, `dump.mjs` + `dump-nested.mjs`, `house.css`, `fonts/`, `assets/`. Screenshots gitignored, regenerable via `shoot.py`.
- Built on the muse-pdf system, same as the structure walkthrough.
