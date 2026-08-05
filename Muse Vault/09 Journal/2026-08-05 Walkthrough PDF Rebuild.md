---
type: task
created: 2026-08-05
updated: 2026-08-05
tags: [website, walkthrough, pdf, screenshots]
---

# 2026-08-05 Walkthrough PDF Rebuild

## Trigger

The three direction walkthrough PDFs do not document the site visually in section order. Several screenshots are misaligned, cross section boundaries, repeat the footer beside the hero, or omit sections entirely.

## Required walkthrough sequence

For each homepage section, in actual site order:

1. English desktop and mobile.
2. Arabic desktop and mobile.
3. Content and explanation.
4. Then the next section.

After the site reaches the footer: objections answered, open decisions, structure, sourcing, and live reference-site screenshot evidence.

## Interpretation rule reinforced

Named sites and wording in a spoken brief are examples and directional input, not an exhaustive source list and not copy to use literally. Research beyond them, compare alternatives, and make an independent recommendation. If the intended interpretation materially changes the work, ask with separate options, state the recommendation, and state what was understood.

## Quality bar

- Exact section-bound captures, not random scroll positions.
- Hero never paired with footer.
- Doors never bleed into Manifesto.
- FAQ, Manifesto, CTA and Footer all receive real desktop and mobile visual coverage.
- Live source screenshots make architecture and borrowing claims auditable.
- Contact-sheet review for every capture.
- Inspect every rendered PDF page before delivery.

## Repo brief

`docs/three-doors/walkthrough-rebuild/rebuild-brief.md`

## Final state

Completed, visually inspected page by page, committed and pushed on 2026-08-05. Each direction branch contains its own PDF, capture manifest, section screenshots, live source screenshots and reproducible generation pipeline.

### Direction 1: The Studio

- Branch: `direction/1-the-studio`
- Hero: `We build our own software.` / `And yours, properly.`
- Homepage order: Hero, Three Doors, Manifesto, Outcomes, Ticker, FAQ, Final CTA, Footer.
- Walkthrough: `docs/three-doors/Direction-1-The-Studio-Walkthrough.pdf`
- Final length: 33 pages.
- Evidence set: Linear, Salla, 37signals and Thmanyah as direct inputs. Figma and GitHub as independent validation.

### Direction 2: The Thesis

- Branch: `direction/2-the-thesis`
- Hero: `Shipping is easy now.` / `Shipping well isn't.`
- Homepage order: Hero, Problem, Standard, Three Doors, Manifesto, Outcomes, Ticker, FAQ, Final CTA, Footer.
- Walkthrough: `docs/three-doors/Direction-2-The-Thesis-Walkthrough.pdf`
- Final length: 41 pages.
- Evidence set: Basecamp, Retool, Mozn, Salla and Netlify as direct inputs. Intercom as independent validation.

### Direction 3: The Proof

- Branch: `direction/3-the-proof`
- Hero remains: `We don't pitch.` / `We ship.`
- Homepage order: Hero, Proof Wall, Three Doors, Manifesto and pressure statement, Outcomes, Ticker, FAQ, Final CTA, Footer.
- Walkthrough: `docs/three-doors/Direction-3-The-Proof-Walkthrough.pdf`
- Final length: 40 pages.
- Evidence set: Stripe, Notion, Salla, Framer, Mercury and Al Rajhi Bank as direct inputs.
- The six-card mobile Proof Wall is split only between cards: heading plus cards 1 to 3, then cards 4 to 6.

## Shared Three Doors architecture

All directions use the same title-first offer architecture with three distinct lanes and no per-card eyebrow labels:

1. Build.
2. Ventures.
3. Think.

The directions differ in the argument that earns the right to present those doors: studio identity, a product-quality thesis, or shipped-work proof.

## Direction 3 truth and localization caveats

The `/ar` route currently stores English copy for Hero, Proof Wall, Final CTA, Footer and shared navigation. The walkthrough labels this state explicitly instead of presenting it as native Arabic parity. Doors through FAQ contain Arabic copy.

The Proof Wall includes quantitative or institutional claims that remain open until evidence is attached or the language is softened:

- 94 percent accuracy.
- 40 percent retention lift.
- PIF-level institutional reference.

These are recorded as open decisions, not treated as independently verified proof.

## What the walkthroughs now prove

- Every real homepage section appears in site order.
- Every section has English desktop and mobile, then Arabic desktop and mobile, followed by its content and rationale.
- Hero, CTA and Footer are separate sections.
- FAQ and Manifesto are no longer omitted.
- Exact section boundaries prevent neighboring headings from bleeding into a screenshot.
- Source evidence distinguishes direct input from later independent validation.
- Live reference screenshots include visible patterns, URLs, classifications and adaptation notes.

## Next product decision

Choose one direction to carry forward, or specify which parts should merge. The walkthroughs document the current branches; they do not select the final homepage direction.
