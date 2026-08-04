# 2026-08-04 — De-AI Copy Pass (Full Site Content Revision)

**Branch:** `copy/de-ai-pass` → merged to `staging/bilingual-ar-en` (not main)
**Plan:** `docs/de-ai-copy-pass-plan.md` · **Report:** `docs/de-ai-copy-pass-report.md`
**Pipeline:** Hermes orchestrated → Opus planned → Sonnet executed → Hermes verified independently

## What shipped

Full pass over every page and every string, EN + AR — not just the few strings the earlier revision touched:

- **52 string changes** (29 EN + 23 AR) across 6 content files:
  `messages/{en,ar}.json`, `lib/content/{en,ar}/services.ts`, `lib/content/{en,ar}/careers.ts`
- **Consultant jargon killed** (zero grep hits now): highest-leverage, startup speed, accelerate your goals, holistic, quantify ROI, implementation roadmap, bespoke, stakeholder interviews, upskill, cultural buy-in, mission-critical, robust, demand-generation, the "progress, roadmap, and next steps" triad, and the résumé "Identify and qualify / Build and manage" verb-pair template in the careers responsibilities.
- **Career blurbs + responsibilities de-templated** — sentence shapes varied, job register kept factual.
- **JSON-LD job-posting labels** now reuse locale keys (`t("responsibilities")` / `t("requirements")`) instead of hardcoded English.
- **Coined pair untouched** byte-for-byte: the approach heading (EN + AR) and the AR card first sentence «أن تكتفي بـ"استخدام"…».

## Arabic

Every new AR string written natively (عشان/وش/مو/اللي/وين/لين/الحين/على طول), 1–2 markers per paragraph, never a literal EN translation — same meaning, own sentence. Deliverable lists stay on the MSA spine. **23 new + 17 carried = 40 strings F-flagged** for the native reviewer (full list in plan Part H / report).

## Verification (Hermes, independent — never trusted the self-report)

- `tsc --noEmit` clean · `next build` green (38/38) · EN/AR key-parity zero asymmetry (JSON + services + careers)
- Kill-list grep zero hits · no hardcoded copy · no new em/en dashes or curly quotes on changed lines
- Diff scope: only the 6 content files + 1 page + docs

## Notes for later

- One plain-word "stakeholders" KEEP string survives in the gamification FAQ (out of scope, not the consultant construction).
- Budget-band JSON *keys* carry pre-existing en-dashes (form option IDs, not prose) — left alone.
