# 2026-08-04 — Site Structure Implementation

## What shipped (structure/site-implementation → staging/bilingual-ar-en)

Site-structure pass executed via the Opus-plans → Sonnet-executes pipeline
(docs/structure-implementation-brief.md → plan.md → report.md). 10 commits:

1. **archive/** — dev/3D routes moved (git mv, frozen): `hero-preview` (3D
   monitor-wall), `preview/hero-dither`, `playground/dither` + their machinery
   (`components/hero3d/`, `HeroMonitors.tsx`, `components/playground/` 34
   files). HomeSections dropped the hero-prop/children slots; pixel hero is
   the one live hero. `archive/README.md` appended (not overwritten).
2. **Landing** — new `WhoWeBuildFor` (zto borrow, role-noun highlight,
   reduced-motion safe) + `OutcomesBand` (mozn verbatim, accent clause) +
   marquee retoned to "Nothing ships that we wouldn't use ourselves".
3. **Explore** — two-tier CTA per card (verb → service page, "Get started" →
   intake).
4. **Services** — per-service FAQ (3 Qs each, grounded in shipped copy) +
   sticky scroll-spy sub-nav (client island; anchors + ids in place).
5. **About** — "Why Muse / the moment" section (zto lead verbatim, Muse
   continuation, no category-owning line).
6. **Careers** — origin kicker (salla adapt "من قلب الرياض إلى العالم"),
   why-join (mozn adapt), claim line (salla verbatim), purpose (Muse line),
   human fallback (tenex adapt) → /contact.
7. **Contact** — conditional lead line (zto adapt). No sales layer.
8. **Newsletter** — AR subtitle → thmanyah "تغنيك عن" construction. EN untouched.
9. **Footer** — worldview line above rights ("We build the thing, not the deck
   about the thing.").
10. **Report** — per-task changelog, verification evidence, reviewer flags.

## Verification (all passed, node 24)

- `npx tsc --noEmit` clean; `npm run build` green (route table: no dev routes).
- Dead-route grep: zero hits in live tree (one benign comment in
  `pixelBlastShader.ts`).
- i18n key-parity: no asymmetry between en.json / ar.json.
- Sitemap/robots: untouched, still 9 static + content routes only.

## Fallbacks / deferrals

- **globals.css untouched** — plan's `.dither-pointer`/`@property` premise
  didn't hold on verification; orphan CSS left in place (harmless), documented.
- Sticky sub-nav SHIPPED (not the anchors-only fallback).
- Explore conviction sub-line skipped (duplicates Outcomes band).
- Habbar careers portrait line deferred (out of scope this pass).

## Flagged to native-Arabic reviewer (F strings, gate before /ar publishes)

1. Home.whoWeBuildFor.body (اللي، مو)
2. About.moment.lead + continuation (لسه، مو — lسه may be one marker too many)
3. Contact.conditional (مو، بس، تدوّر)
4. Newsletter.hero.subtitle (تغنيك عن adapt — ritual echo check)
5. Careers.whyJoin / noMatch / purpose
6. Service FAQ answers (all three services)

Next gate: native Arabic review of the F strings, then /ar can publish.
