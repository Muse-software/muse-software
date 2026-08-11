# Muse Site Structure — Implementation Brief

**Branch:** `structure/site-implementation` (off `copy/voice-revision`, which already carries the copy revision + docs).
**Target after implementation:** merge into `staging/bilingual-ar-en` and push. Never touch `main`.
**Date:** 2026-08-04

## Mission

Implement the site structure recommendations from `docs/muse-site-structure-plan.md` (the authoritative plan, 724 lines — READ IT FIRST, especially the "Build order" at the end) and archive the temporary 3D/dev routes. The final state must match the structure described in `Muse-Site-Structure.pdf` (committed at repo root; its source is `site-structure-src/document.html`).

This is a structure pass on top of an already-shipped copy revision. The copy voice work is DONE — do not re-litigate or re-rewrite existing strings unless a task below says so.

## Reference material (read before planning)

1. `docs/muse-site-structure-plan.md` — the full plan: 11 routes, per-section EN/AR copy, hover/mobile rules, interactions, 10 open decisions (with recommendations), build order.
2. `docs/copy-reference-bank.md` — verbatim borrowed lines with sources (zto.sa, mozn.ai, salla, lean.sa, tenex, thmanyah). Section G = thmanyah editorial voice.
3. `/Users/a/muse_copy_research.md`, `/Users/a/research_muse/copy_research_muse.md`, `/Users/a/thmanyah_copy_research.md` — the raw research hauls (verbatim quotes, sources).
4. `Muse Vault/01 Company/Website Voice.md`, `Muse Vault/01 Company/Arabic Termbase.md`, `Muse Vault/01 Company/Brand Voice.md` — voice rules are source of truth.

## Task 1 — Archive the dev/3D routes (the "floating 3D" pages)

These routes are marked in their own code comments as throwaway/TEMPORARY. They must be ARCHIVED (preserved in repo, removed from the live structure), not deleted:

- `app/[locale]/hero-preview/page.tsx` — the 3D monitor-wall hero preview (`components/hero3d/` — react-three-fiber scene). This is the "runway floating 3d" page the user remembers.
- `app/[locale]/playground/dither/page.tsx` — dither component playground.
- `app/[locale]/preview/hero-dither/page.tsx` — ink-dither hero comparison route.

Also archive the 3D machinery that only these routes use: `components/hero3d/` (whole dir), `components/sections/HeroMonitors.tsx`.

**How to archive:** create `archive/` at repo root; move the route folders + 3D components there preserving relative structure (e.g. `archive/app/[locale]/hero-preview/page.tsx`, `archive/components/hero3d/...`). Add `archive/README.md` explaining each archived item, why (superseded / not in the new structure), and the commit it was archived from. Fix nothing inside archive/ — it is frozen.

**Wiring cleanup (required so the build stays green):**
- `components/sections/HomeSections.tsx` — it has a `hero` prop (`"pixel" | "dither" | "monitors"`) + `monitorGrade` + `children` (CC-BY attribution) for the hero candidates. The live hero is `pixel` (the always-on orange pixel field). Drop the prop, the `HeroChoice` type, `HeroMonitors` import, `monitorGrade`, and the `children` attribution slot. Keep the pixel hero. Update the doc comment (no more hero-candidate table).
- Remove the three route directories from `app/`.
- Check `app/sitemap.ts`, `app/robots.ts`, nav links, footer links, and `lib/` for references to these routes (the dev routes were noindex and not in the sitemap, but verify nothing else links to them).

## Task 2 — Landing page additions (S4–S6 from the plan)

Current landing (`HomeSections`) order: Hero → Approach → Manifesto → Ticker → FAQ → CTA. Add:

- **S4 Who we build for** (borrowed from zto.sa): "aren't a general audience." Two audiences — founders shipping a first product; operators pulling an AI initiative out of pilot purgatory. Role nouns get the highlight sweep on scroll-into-view (reuse the existing marker-highlight mechanic from the hero if feasible).
- **S5 Outcomes band** (verbatim from mozn.ai): "We deliver outcomes, not just tools." Large, centered, no hover.
- **S6 Marquee**: keep the ticker mechanic; content decision per the plan — "Nothing ships that we wouldn't use ourselves" (NOT "trusted by leaders").

All copy into `messages/en.json` + `messages/ar.json` (AR written natively in Saudi register, never a literal translation of EN).

## Task 3 — Explore page build-out

`/explore` currently renders the three approach cards. Per the plan: each card gets a summary + two-tier CTA ("Learn more" → service page, "Get started" → get-started intake). Card summaries from the plan: AI Transformation — "Your AI strategy, executed all the way to production, not just decked." / Product Engineering — "Production-grade software, shipped fast, without dropping the quality bar." / Gamification & Experience — "Turn adoption into something people actually want to do." (Realize these in EN + AR.)

## Task 4 — Service pages

Three pages at `/services/[slug]`. Per the plan: shared arc (hero → why → what we do → approach → FAQ → CTA). Additions:
- **Per-service FAQ** (3–4 questions per service). Questions must be REAL (grounded in the copy that exists), not invented filler. Question-as-heading shape.
- **Sticky sub-nav** on desktop: Overview / Why / What we do / FAQ — collapses to a pill row on mobile. Only if it fits the current page component cleanly; otherwise document it as a follow-up in the report.

## Task 5 — About page

Add the **"Why Muse — the moment"** section (zto borrowing, per plan):
- Lead-in (zto verbatim): "Saudi Arabia's economy is going through a moment that doesn't repeat itself. Companies are being built from scratch, and a generation of founders and operators is building something genuinely new."
- Muse continuation: "Most of what gets shipped still isn't built to a standard that lasts. That's the gap Muse was built for."
- Arabic: "يمرّ الاقتصاد السعودي بمرحلة نوعية لم تتكرر مسبقًا" (zto verbatim) + native continuation with spoken markers (لسه/مو per termbase).
- Hero stays: "Riyadh-built. Globally standard." / "صُنع في الرياض. بمعيار عالمي." Do NOT mint a category-owning line.

## Task 6 — Careers page

Per the plan (copy into messages EN+AR):
- Hero stays: "Come build with us." / "We're a small, senior team based in Riyadh. Reach out even if nothing below is an exact match."
- Origin kicker (salla adapt): "من قلب الرياض إلى العالم" (from salla's "من قلب مكة إلى العالم").
- Why join (mozn): "Join the team building products people here actually use."
- Claim line (salla verbatim): "نبحث عن الأفضل".
- Human fallback (tenex): "No exact match? Say hi anyway." / "ما لقيت اللي يناسبك؟ سلّم علينا على أي حال."

## Task 7 — Contact + Get started

- Contact hero stays. Add conditional line (zto adapt): "If you're looking for a team to actually build the thing, not just deck it, talk to us."
- Do NOT add a sales layer. Do NOT invent a two-tier "contact sales" structure.

## Task 8 — Newsletter

- AR refinement (thmanyah adapt): "تغنيك عن متابعة أخبار الذكاء الاصطناعي العامة، ونختار لك اللي يستحق." — only if the newsletter page exists with copy to extend; otherwise flag.
- Keep hero: "Get the field notes in your inbox."
- Do not claim "best".

## Task 9 — Footer

Add the worldview line (tenex mechanic, our line): "We build the thing, not the deck about the thing." — if a footer copy slot exists (check layout/footer component); otherwise flag as follow-up.

## Hard constraints

1. **Zero hardcoded copy.** All new copy goes in `messages/en.json`, `messages/ar.json`, `lib/content/en/*.ts`, `lib/content/ar/*.ts`. Components stay fully i18n-ized.
2. **Borrow real lines only.** Every borrowed line must come from the reference bank / research files, verbatim or with only company-level word swaps. **Never invent copy.** If a line in the plan is marked EMPTY-until-real, leave it out and note it.
3. **Arabic is written, not translated.** Native Saudi register (عشان، وش، مو، على طول) per Arabic Termbase.md. EN and AR each stand alone.
4. **No superlatives/claims we haven't earned.** No "best", no "trusted by", no fake stats.
5. **Don't touch `main`.** Work only in this branch; the merge to `staging/bilingual-ar-en` happens after verification.
6. **Build must pass.** Repo engines require node ≥22. Use `~/.nvm/versions/node/v24.14.0/bin` for any build/typecheck (`export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"`), e.g. `npx tsc --noEmit` and/or `npm run build`.

## Deliverables

1. **Plan (by Opus):** `docs/structure-implementation-plan.md` — file-by-file change list, exact strings (EN + AR) for every addition, archive move list, risks, verification steps. Follow the plan's own build order.
2. **Execution (by Sonnet):** the code changes per the plan, archive/ populated, build verified, everything committed on `structure/site-implementation` (logical commits: archive, landing, explore, services, about, careers, contact, newsletter, footer).
3. **Report (by Sonnet):** `docs/structure-implementation-report.md` — what changed per task, what was flagged/deferred, verification evidence, and the list of strings left EMPTY awaiting a native Arabic review.
