# Direction 3: The Proof — Walkthrough

## Overview
The Proof is a work-led website that leads with WHAT Muse has shipped. No thesis statement upfront — just the work. The homepage is a curated proof wall: anonymized case studies, live venture experiments, content shipped. The three doors appear as ways to access that work, not as navigation.

## Branch
`direction/3-the-proof` — auto-deployed to Vercel on push.

## Homepage section order

1. **Hero** (existing `Hero.tsx`) — "We don't pitch. We ship." Everything below is real work. Same visual, minimal copy.
2. **Proof Wall** (NEW `ProofWall.tsx`) — Grid of work cards:
   - Enterprise: Core banking platform (PIF-level, anonymized)
   - AI Feature: Automated underwriting engine (Saudi fintech, 12min decisions)
   - Brand Interface: Consumer app redesign (500k users, 40% retention lift)
   - Venture: Muse Experiments (live lab, open source)
   - Venture: Tenet (AI-native knowledge base, early access)
   - Content: Field Notes Newsletter
3. **Three Doors** (`ThreeDoors.tsx`) — "Want this built for you?" / "Want to build with us?" / "Want to learn how we think?" — presented as CTAs.
4. **Manifesto** (existing `Manifesto.tsx`) — "The next decade of software gets decided in the next two years."
5. **Outcomes Band** (existing `OutcomesBand.tsx`) — Trust signal.
6. **Ticker** (existing `Ticker.tsx`) — Rotating marquee.
7. **FAQ** (existing `FAQ.tsx`) — Objection handling.
8. **CTA** (existing `CTA.tsx`) — "Tell us what you're trying to build."

## Key changes from the current site

- **Added**: `ProofWall.tsx` — new component presenting a grid of anonymized case studies, live experiments, and shipped content
- **Imported**: `ThreeDoors.tsx` from Direction 1 (reused component)
- **Updated**: Hero headline/subtitle to work-first framing ("We don't pitch. We ship.")
- **Updated**: `messages/en.json` — replaced `Home.approach` with `Home.proofWall` content. Added `Home.doors` with CTA-style wording
- **Updated**: `messages/ar.json` — complete rewrite with proper Arabic translations for all sections including proof wall items and doors

## What to steal from Stripe

- Proof wall: logo grid → quantified metrics → "Read story" links
- Segment proof by audience type
- Never show a metric without naming the sector

## What to steal from Vercel

- Live project showcase: screenshot + one-liner + link to live site
- "Recently shipped" pattern on homepage
- Open submission with curated review

## What to steal from Linear

- "Build in public" methodology as credibility
- Let the number be the proof (no fake testimonials)
- Published working principles openly

## What to steal from Framer

- Community gallery with video previews
- Embed playable previews in a grid
- Show engagement signals, not fake testimonials

## Anonymized case study approach

All enterprise/PIF-level work is anonymized:
- No client names on the homepage
- Only metrics + tech stack + outcome shown
- PIF-level experience referenced in About page, not homepage
- Real numbers (40+ services, 200k transactions, 94% accuracy, 40% retention lift)

## Files changed

- `components/sections/ProofWall.tsx` — NEW
- `components/sections/ThreeDoors.tsx` — imported from Direction 1
- `components/sections/HomeSections.tsx` — updated: Hero → ProofWall → ThreeDoors → Manifesto → OutcomesBand → Ticker → FAQ → CTA
- `messages/en.json` — complete restructure with proofWall + doors content
- `messages/ar.json` — complete rewrite with Arabic translations
- `docs/three-doors/direction-3-the-proof.md` — planning doc

## Arabic support

Full EN+AR with RTL/LTR. Arabic content includes:
- Proof wall items translated with correct terminology (PIF-level as "مؤسسات مستوى PIF")
- Doors with CTA-style wording ("ابدأ مشروع بناء", "شوف خط الإنتاج", "اقرأ الأحدث")
- All metadata, legal, contact, newsletter, careers pages in Arabic
- RTL layout with proper text direction handling

## Usability fixes included

- Language switcher in SiteHeader
- Mobile nav: proof wall cards stack vertically, no overflow
- Keyboard-trap navigation preserved
- External links on venture experiments open in new tabs

## What stays the same (locked)

- Dither hero background
- Maroon (#4C0014) / orange (#fd4601) color palette
- Motion design (framer-motion, reduced-motion respect)
- Pixel wash background
- All component styling and layout

## Key difference from Directions 1 & 2

Direction 1: "Here's what we do" (portfolio doors first)
Direction 2: "Here's why we exist" (thesis → problem → standard → doors)
Direction 3: "Here's what we've built" (proof wall first, doors as CTAs)

Direction 3 is the most opinionated toward "show, don't tell." No problem sections, no quality bar statements — just the work speaking for itself.