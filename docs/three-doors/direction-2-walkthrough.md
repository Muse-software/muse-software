# Direction 2: The Thesis — Walkthrough

## Overview
The Thesis is a mission-led website that leads with WHY Muse exists. The frustration with slop, the quality bar, "the other choice." The homepage thesis is the hero argument — not a service menu or portfolio grid. The three doors are still there but presented as consequences of the thesis, not the primary navigation.

## Branch
`direction/2-the-thesis` — auto-deployed to Vercel on push.

## Homepage section order

1. **Hero** (existing `Hero.tsx`) — "Everyone has an AI strategy. Almost nobody has shipped one." Same visual, same copy. Sets up the thesis.
2. **The Problem** (NEW `TheProblem.tsx`) — What we see in the market: AI strategies nobody ships, content farms, fake case studies. Three cards with icons.
3. **The Standard** (NEW `TheStandard.tsx`) — What Muse holds: real data, every state designed, nothing shipped we wouldn't use ourselves. The quality bar, presented as three pillars + background maroon.
4. **Three Doors** (existing `ThreeDoors.tsx`) — Build / Ventures / Think — as expressions of the standard.
5. **Manifesto** (existing `Manifesto.tsx`) — "The next decade of software gets decided in the next two years."
6. **Outcomes Band** (existing `OutcomesBand.tsx`) — Trust signal.
7. **Ticker** (existing `Ticker.tsx`) — Rotating marquee.
8. **FAQ** (existing `FAQ.tsx`) — Objection handling.
9. **CTA** (existing `CTA.tsx`) — "Tell us what you're trying to build."

## Key changes from the current site

- **Added**: `TheProblem.tsx` — new section calling out market slop directly
- **Added**: `TheStandard.tsx` — new section defining the quality bar with maroon background
- **Imported**: `ThreeDoors.tsx` from Direction 1 (reused component)
- **Removed**: `Approach.tsx` (consultant framing), `WhoWeBuildFor.tsx`, `CardDither`
- **Updated**: `messages/en.json` — replaced `Home.approach` with `Home.theProblem` + `Home.theStandard`
- **Updated**: `messages/ar.json` — full Arabic translations for new sections

## What to steal from Tenex

- Thesis-first framing: the hero headline IS the argument, not a teaser
- Confident, direct tone that calls out problems explicitly

## What to steal from 10x

- "AI strategy vs shipped" framing adapted to product (not consultancy)
- Statistical proof over name-dropping (adapted: PIF-level experience reference)

## What to steal from Linear

- Mission-led, product-first positioning without generic "we believe" copy
- Published working principles openly

## What to steal from Vercel

- Developer-focused, confident messaging
- "Shipped beats planned" as a cultural principle

## Files changed

- `components/sections/TheProblem.tsx` — NEW
- `components/sections/TheStandard.tsx` — NEW
- `components/sections/ThreeDoors.tsx` — imported from Direction 1
- `components/sections/HomeSections.tsx` — updated section order: Hero → TheProblem → TheStandard → ThreeDoors → Manifesto → OutcomesBand → Ticker → FAQ → CTA
- `messages/en.json` — updated with theProblem + theStandard content
- `messages/ar.json` — updated with full Arabic translations
- `docs/three-doors/direction-2-the-thesis.md` — planning doc

## Arabic support

Full EN+AR with RTL/LTR. Arabic content adapted from proven live sources. The "The Standard" section uses maroon background (#4C0014) consistent across both languages.

## Usability fixes included

- Language switcher in SiteHeader
- Mobile nav: problem/standard cards stack vertically, no overflow
- Keyboard-trap navigation preserved

## What stays the same (locked)

- Dither hero background
- Maroon (#4C0014) / orange (#fd4601) color palette
- Motion design (framer-motion, reduced-motion respect)
- Pixel wash background
- All component styling and layout

## Key difference from Direction 1

Direction 1 leads with "what we do" (portfolio doors first). Direction 2 leads with "why we exist" (thesis → problem → standard → doors). The doors in Direction 2 are downstream of the argument, not the entry point.