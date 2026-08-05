# Three Directions Walkthrough PDF Rebuild Brief

Date: 2026-08-05
Status: planning input
Output: corrected walkthrough PDFs for Direction 1, Direction 2 and Direction 3

## Why this rebuild exists

The current PDFs treat screenshots as supporting decoration instead of the evidence of the walkthrough. Several captures are misaligned, show two sections at once, or are missing entirely.

Confirmed failures in the current files:

- Direction 1 has no dedicated Manifesto screenshot and no FAQ screenshot.
- Direction 1's Doors captures include the opening of Manifesto.
- Hero pages pair the first screen with the final CTA and footer. That breaks the page order and makes the walkthrough read backwards.
- Mobile captures are mostly only the hero plus the beginning of the next section. They are not section captures.
- Direction 2 has Problem and Standard screenshots, but each can bleed into the next section. It lacks visual coverage for Doors, Manifesto, Outcomes, Ticker, FAQ and the final CTA as distinct sections.
- Direction 3's current `home-doors.png` is not a Doors capture. It shows the hero. It lacks most later section visuals.
- Existing PDF pages use the same footer screenshot in more than one unrelated explanation.
- The sources pages name websites but do not show the visual evidence from those websites.

## Interpretation of the user's request

The examples named by the user are starting points, not an exhaustive source list and not instructions to copy literally. Research must widen beyond them, compare alternatives and recommend the strongest relevant pattern.

When meaning is genuinely ambiguous, ask a multiple-choice question with:

1. Separate options.
2. A recommendation.
3. A short statement of what was understood from the user's wording.

This task itself is not ambiguous enough to stop. Use the complete sequence below.

## Required order inside every PDF

The PDF is a visual walkthrough first, then analysis and sourcing.

For each real homepage section, in the exact order it appears on the site:

1. English desktop screenshot.
2. English mobile screenshot.
3. Arabic desktop screenshot.
4. Arabic mobile screenshot.
5. A non-screenshot content and explanation page. This can use a bilingual table, concise rationale, section job, content anatomy and source attribution.
6. Then move to the next section.

After the final site section, continue with the non-screenshot appendix:

1. The objections answered.
2. Open decisions, each with a recommendation.
3. Site structure and section order.
4. Content and UI sourcing.
5. Reference evidence plates with real screenshots from the live source websites, source URLs and precise notes on what was borrowed or adapted.

Do not place final CTA or footer screenshots on the Hero pages. CTA and footer are separate sections at the end.

## Direction section orders

### Direction 1: The Studio

1. Hero
2. Three Doors
3. Manifesto
4. Outcomes Band
5. Ticker
6. FAQ
7. Final CTA
8. Footer

### Direction 2: The Thesis

1. Hero
2. The Problem
3. The Standard
4. Three Doors
5. Manifesto
6. Outcomes Band
7. Ticker
8. FAQ
9. Final CTA
10. Footer

### Direction 3: The Proof

1. Hero
2. Proof Wall
3. Three Doors
4. Manifesto
5. Outcomes Band
6. Ticker
7. FAQ
8. Final CTA
9. Footer

Direction 3's Hero stays unchanged. Direction 3 Arabic proof content that falls back to English must be shown honestly and labelled. Do not invent Arabic to make the screenshot look complete.

## Screenshot capture rules

### Capture the section, not a random viewport

- Use the actual section element as the capture boundary whenever possible.
- The first pixel belongs to the section being documented.
- The final pixel belongs to the same section.
- A Doors screenshot must not show the Manifesto title.
- A Problem screenshot must not show the Standard heading.
- A Hero screenshot must not show the Footer, CTA or next section.
- A Footer screenshot must only appear at the end.

### Navigation handling

- Keep the real navigation visible on Hero captures.
- For middle-section plates, either align the section below the sticky navigation or hide the navigation only during the capture. Do not allow it to cover headings.
- Record this behavior in the capture manifest. It is presentation cleanup, not a change to the section.

### Desktop

- Browser viewport: 1440 x 900.
- Device scale factor: 1 or 2 if needed for legibility.
- Prefer an element screenshot for a complete section.
- If a section is taller than a useful page figure, split only at real internal boundaries such as card rows. Never split through a heading or card.

### Mobile

- Browser viewport: 390 x 844.
- Device scale factor: 2.
- Capture the actual mobile layout of each section, not only the homepage hero.
- For long sections such as FAQ, split at card boundaries and place the parts together on the same visual page or on consecutive labelled pages.
- Never shrink a 3000px tall mobile screenshot into an unreadable strip.

### Exactness and auditability

For every generated screenshot, store:

- Branch.
- Locale.
- Device.
- Section name.
- Page URL.
- Selector or exact heading used to find the section.
- Capture method: element, bounded viewport, or split.
- Pixel dimensions.
- Timestamp.

Write this to a machine-readable `capture-manifest.json` in each walkthrough source folder.

### Screenshot QA gate

Before a PDF build:

1. Make a labelled contact sheet of every screenshot.
2. Inspect every image.
3. Confirm the intended heading or copy is visible.
4. Confirm the next section heading is absent.
5. Confirm sticky navigation does not cover the section heading.
6. Confirm Arabic is shaped and the layout is RTL.
7. Confirm no screenshot file is accidentally from another branch or a stale server.
8. Confirm all section, locale and device matrix entries exist.

The stale-server failure that produced a Direction 3 Doors file containing Direction 2's Hero must be impossible in the new script. Before shooting, the script must validate a branch-specific expected hero string from the live DOM and abort on mismatch.

## PDF page architecture

Use Muse's A4 fixed-page system and current palette. Do not squeeze this into 10 pages. Clarity beats a short page count.

### Cover

- Direction name.
- One-sentence explanation of the direction.
- Prepared by Abdullah Alsubaie.
- Reference MUSE-DIR-01, MUSE-DIR-02 or MUSE-DIR-03.
- Status: Review.
- Revision 3.

### Visual section group

Each site section gets:

1. English visual page: desktop screenshot as the primary figure, mobile screenshot as the secondary figure, concise captions.
2. Arabic visual page: desktop screenshot as the primary figure, mobile screenshot as the secondary figure, concise captions.
3. Content and explanation page: the section's job, verbatim EN and AR content, the actual content anatomy, why it sits here, and inline source attribution.

For a small band such as Outcomes or Ticker, the English and Arabic visual plate can share one page only if both remain large and readable. Do not combine merely to reduce page count.

### Appendix after all visual groups

1. Objections answered.
2. Open decisions.
3. Structure map.
4. Source map.
5. Reference evidence plates.

### Reference evidence plates

These are not logo lists. Each evidence entry includes:

- A real screenshot from the live source website.
- Site name.
- Live source URL as a clickable link.
- Page or section name.
- Capture date.
- A factual caption: what is on screen and the exact Muse section it informed.
- A note distinguishing direct copy borrowing from UI or architecture borrowing.

Use 6 to 10 strong evidence figures per PDF. Do not repeat every source simply to fill space. Pick evidence that proves the strongest architecture, UI and content claims for that direction.

Research beyond the original examples. At least one third of the evidence set should come from strong relevant sites outside the user's example list, but only when they genuinely support what was built.

## Content rules

- Website copy is quoted verbatim from branch content files.
- Source-site quotes are verbatim from the live page.
- Do not say a screenshot proves something it does not visibly show.
- No invented metrics, testimonials or claims.
- No em dashes, en dashes, curly quotes or guillemets.
- No emojis.
- English and Arabic are presented independently. Arabic is not described as a translation.
- The PDF is standalone. Do not narrate the revision history in the reader-facing pages.
- Avoid insider wording such as "we fixed" or "the old version". Present the direction as a complete proposal.

## Branch and build discipline

Each direction's source and PDF stay on its direction branch.

- `direction/1-the-studio`
- `direction/2-the-thesis`
- `direction/3-the-proof`

Before starting a capture:

1. Confirm current branch.
2. Build with Node 24.
3. Start one tracked local server.
4. Verify readiness.
5. Verify the branch-specific hero string in the DOM.
6. Run the capture.
7. Stop the server before changing branch.

Do not reuse port 3100 across branches without proving the previous server is dead.

## Verification before delivery

For each direction:

1. `npm run build` passes.
2. Screenshot matrix is complete.
3. Every screenshot passes contact-sheet inspection.
4. PDF builds successfully.
5. `measure.py` reports every page within bounds.
6. `verify.py` reports the expected page count and no banned punctuation.
7. Render every PDF page.
8. Inspect every page visually, not a sample.
9. Inspect figure and Arabic pages at higher resolution.
10. Confirm clickable source links exist.
11. Confirm PDF and sources are committed on the correct branch.
12. Push and compare local and remote tips.
13. Copy final PDFs to `/Users/a/Downloads/` and send them in the chat as media.

## Planning and execution workflow

1. Complete independent branch audits and broader source-evidence research.
2. Opus writes the implementation plan against this brief plus the audit files.
3. Hermes reviews and patches the plan.
4. A fresh Sonnet session executes the plan branch by branch.
5. Hermes independently verifies screenshots, PDFs, git and remote state.
