# Direction 1: The Studio — Walkthrough

## Overview
The Studio is a portfolio-first, work-led website for Muse. The homepage leads with "here's what we do" rather than "here's what we believe." The three doors — Build, Ventures, Think — are the primary navigation and entry points.

## Branch
`direction/1-the-studio` — auto-deployed to Vercel on push.

## Homepage section order

1. **Hero** (existing `Hero.tsx`) — "Everyone has an AI strategy. Almost nobody has shipped one." We're a product team in Riyadh. Two-line rotating headline + CTA.
2. **Three Doors** (NEW `ThreeDoors.tsx`) — The core navigation. Three cards:
   - **Build** — Production-grade software, shippable AI features, real interfaces. Stakeholder-friendly.
   - **Ventures** — Our own products. Hunting for the golden egg. Real pipeline, real progress.
   - **Think** — Knowledge & community. Articles, tutorials, showcases, newsletter.
3. **Manifesto** (existing `Manifesto.tsx`) — "The next decade of software gets decided in the next two years." Thesis on software cost collapse and the execution gap.
4. **Outcomes Band** (existing `OutcomesBand.tsx`) — Trust signal: "Nothing ships that we wouldn't use ourselves."
5. **Ticker** (existing `Ticker.tsx`) — Rotating carousel marquee.
6. **FAQ** (existing `FAQ.tsx`) — Stakeholder objection handling.
7. **CTA** (existing `CTA.tsx`) — "Tell us what you're trying to build."

## Key changes from the current site

- **Removed**: `Approach.tsx` (AI-absent to AI-native consultant framing), `WhoWeBuildFor.tsx`, `CardDither` component, `<script>` JSON-LD from HomeSections
- **Added**: `ThreeDoors.tsx` — a new component presenting the three business lines as portfolio doors
- **Updated**: `messages/en.json` + `messages/ar.json` — replaced `Home.approach` with `Home.doors` content
- **Services reframed**: "Production-grade software, shippable AI features, real interfaces" instead of "AI Transformation"

## What to steal from Tenex

- Three-door layout with `eyebrow → title → body → promise → cta` pattern
- FAQ trust section for stakeholder objection handling  
- Playbooks/content ecosystem as proof of expertise (Newsletter on Muse)

## What to steal from Salla

- Stats bar + logo cloud for credibility (adapted: anonymized experience signal on About page)
- Six-door service layout on the Explore page (adapted: three doors on homepage)

## Files changed

- `components/sections/ThreeDoors.tsx` — NEW
- `components/sections/HomeSections.tsx` — updated section order
- `lib/content/en/services.ts` — rewritten content
- `lib/content/ar/services.ts` — Arabic content
- `messages/en.json` — updated
- `messages/ar.json` — updated
- `docs/three-doors/direction-1-the-studio.md` — planning doc

## Arabic support

Full EN+AR with RTL/LTR. Arabic content adapted from proven live sources (verified via DOM/grep, not vision). Directionality handled by `next-intl` + `<html dir="rtl">` on `/ar`.

## Usability fixes included

- Language switcher in SiteHeader (visible on all pages)
- Mobile nav: doors stack vertically, no horizontal overflow
- Keyboard-trap navigation preserved from visual direction

## What stays the same (locked)

- Dither hero background (`PageDither.tsx`)
- Maroon (#4C0014) / orange (#fd4601) color palette
- Motion design (framer-motion, reduced-motion respect)
- Pixel wash background
- All component styling and layout