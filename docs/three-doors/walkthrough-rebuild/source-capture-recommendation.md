# Recommended Reference Evidence Set

Date: 2026-08-05

This set balances sources that directly informed the current directions with new independent validation. A new source must never be presented as the origin of existing Muse copy.

## Direction 1: The Studio

### Salla solutions, Direct input

- URL: https://salla.com/
- Anchor: `حلول سلة تدعمك بكل خطوة من مشوارك التجاري`
- Capture: heading, lane navigation and the first two complete lane panels. Use a bounded viewport, not the full 4,000px container.
- Proves: native RTL, shared card grammar, distinct capability lanes, title + promise + detail.
- Maps to: Three Doors and Arabic behavior.

### Linear value system, Direct input

- URL: https://linear.app/
- Anchor: `A new species of product tool.`
- Capture: heading plus the complete visible value-card trio in a bounded viewport.
- Proves: title-first parallel cards, no per-card eyebrows, equal visual weight.
- Maps to: Three Doors and Manifesto rhythm.

### 37signals knowledge index, Direct input

- URL: https://37signals.com/
- Capture: first viewport containing the numbered Signals list.
- Proves: public thinking can be a first-class product surface rather than a generic blog card.
- Maps to: Knowledge and community door.

### HungerStation offer lanes, Independent validation

- URL: https://hungerstation.com/sa-ar
- Anchor: `وش حاب تطلب اليوم؟`
- Capture: heading plus first three or four complete offer cards after dismissing consent.
- Proves: local voice can route distinct offers through one repeated card system.
- Maps to: Three Doors and native Arabic tone.

## Direction 2: The Thesis

### Basecamp problem argument, Direct input

- URL: https://basecamp.com/
- Anchor: `Tell me if this sounds about right.`
- Capture: the complete `.content.content--columns` argument block.
- Proves: a problem section can read as a specific editorial argument, not a generic pain-point grid.
- Maps to: The Problem.

### Netlify sequential paths, Direct input

- URL: https://www.netlify.com/
- Anchor: `Build your way. Ship on one platform.`
- Capture: exact `section#section-get-started` after dismissing consent and any removable test strip.
- Proves: three actions can form a logical sequence with balanced titles and bodies.
- Maps to: The Standard and Three Doors.

### MOZN FAQ, Direct input

- URL: https://www.mozn.ai/
- Anchor: `Frequently asked questions`
- Capture: exact English `.section_faqs`. Do not use the currently empty Arabic FAQ.
- Proves: objection handling as a designed trust section.
- Maps to: FAQ and post-walkthrough objections.

### Retool new standard, Independent validation

- URL: https://retool.com/
- Anchor: `Why enterprises choose Retool`
- Capture: heading plus all three argument cards after closing the promotional modal.
- Proves: a standard section works when each card names and rejects a concrete tradeoff.
- Maps to: The Standard.

## Direction 3: The Proof

### Framer shipped work, Direct input

- URL: https://www.framer.com/
- Anchor: `Shipped with Framer`
- Capture: exact section after dismissing consent.
- Proves: shipped work can be the content surface, not decoration around a claim.
- Maps to: Proof Wall.

### Salla metrics, Direct input

- URL: https://salla.com/
- Anchor: `أكبر منصَّة سعودية للتجارة الإلكترونية في الشرق الأوسط`
- Capture: proposition and settled metric blocks. Do not capture counters at zero.
- Proves: a compact claim plus metrics can establish scale without a fake logo wall.
- Maps to: proof hierarchy.

### Mercury metrics, Independent validation

- URL: https://mercury.com/
- Anchor: `You’re creating something to stand the test of time. So are we.`
- Capture: heading plus all four metric cells.
- Proves: proof cards can cover adoption, scale, durability and experience as one designed system.
- Maps to: Proof Wall.
- Caption rule: Mercury figures are source-company marketing claims and are shown only as a presentation pattern.

### Al Rajhi metrics, Independent validation

- URL: https://www.alrajhibank.com.sa/ar
- Anchor: `لأرقامنا بصمة`
- Capture: heading, context and full five-cell metrics row after animations settle.
- Proves: native RTL can treat proof as a dedicated editorial chapter.
- Maps to: Arabic Proof Wall and proof hierarchy.

## Live failures and substitutions

- Webflow's previously researched heading has changed. Do not use the stale locator.
- MOZN's `Globally Recognized Technologies` section is hidden. Do not use it.
- MOZN Arabic FAQ is currently empty. Do not use it as a successful pattern.
- ATHR's initial viewport was mostly blank before consent in the live feasibility pass. It is not preferred over the cleaner references above.
- Any selected anchor that no longer resolves at final capture time fails closed and must be replaced, not reconstructed from old screenshots.
