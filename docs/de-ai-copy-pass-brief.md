# Muse De-AI Copy Pass — Brief (ALL pages, ALL content, EN + AR)

**Branch:** work branch to be created off `staging/bilingual-ar-en` (e.g. `copy/de-ai-pass`).
**Pipeline:** Hermes orchestrates → Claude **Opus** plans → Claude **Sonnet** executes → Hermes verifies → merge to `staging/bilingual-ar-en` → push. **Never touch `main`** (main still holds old Tenex copy).
**Status:** briefing doc — the single point of reference a new session reads first.

---

## 1. Mission (what Abdullah asked)

The structure pass shipped clean, but the **content itself still reads AI-ish** — especially the descriptions, subtexts, and body copy on most pages, and **especially the Arabic**. The previous copy revision only adapted a **few small things** from the research. This pass must go **beyond that and cover EVERY page and EVERY string**:

- Every description, subtitle, subtext, paragraph, success message, form label, FAQ answer, role blurb, meta description.
- Both languages: `messages/en.json` + `messages/ar.json`, `lib/content/en/*.ts` + `lib/content/ar/*.ts`.
- The goal: the site reads like a **Riyadh product team talking**, in EN and in native Saudi AR — not like a translation of an American AI-consultancy template.

> Abdullah's exact words: "the content especially the descriptions and stuff is from the old one and reads very ai especially the arabic one. u only adapted a few small things from doing the research and didnt go beyond that for all pages and all the content the descriptions/subtexts etc i need you to do that."

## 2. What "AI-ish" means here — concrete diagnosis (sampled from current code)

These patterns are the target. Examples are **live strings found today**:

**Consultant / agency jargon (EN):**
- "highest-leverage places to put AI to work" (approach card)
- "with guardrails from day one"
- "quantify ROI, and map an implementation roadmap" (ai-transformation approachIntro)
- "holistic and function-specific audits"
- "surface the most compelling AI use cases"
- "Pinpoint workflow challenges, measure business impact, and gauge readiness" (whatWeDo)
- "Understand leadership priorities, clarify strategic objectives, and identify the top AI opportunities"
- "Employee surveys and stakeholder interviews define high-impact opportunities"
- "Three ways we help teams move at startup speed. Pick one, or combine all three." (explore hero)
- "discuss how Muse can accelerate your goals" (get-started success message)
- "upskill teams on relevant AI tools and workflows", "Bespoke curricula", "Cultural buy-in", "stakeholder interviews", "cross-functional" wherever it appears

**Structural AI-isms:**
- Triple-verb parallelism ("Identify and qualify…", "Build and manage…", "Represent…") — reads like a résumé/template, especially in role blurbs and whatWeDo lists
- Every sentence doing "verb, noun, and verb" — the classic GPT cadence
- Generic corporate warmth in success/confirmation messages ("Our team will reach out… to discuss how Muse can accelerate your goals")
- "empower / streamline / robust / seamless / at scale / drive / leverage / cutting-edge / world-class" — if any of these appear, they are instant kills

**Arabic problem (the bigger one):**
- Most AR is still **formal/classical MSA translated from the EN** — the tell-tale AI-Arabic: correct grammar, zero personality, literal rendering of the EN structure
- Reads like a government brochure or a translated American studio, not a Riyadh product team talking
- Per `Muse Vault/01 Company/Arabic Termbase.md`: native Saudi register uses spoken markers **عشان / وش / مو / اللي / بس / على طول / بدل ما** — 1–2 per paragraph, MSA spine for headings, spoken for body/CTA, straight quotes, Western numerals, **Muse stays Latin**
- **Never a literal translation of EN.** The AR can carry the same meaning via a completely different sentence, or a Saudi idiom — it must stand alone as native copy

**Old Tenex echoes that may still lurk** (the copy this site was cloned from): "Win the next decade", "trusted by leaders", "AI-absent to AI-native" (kept deliberately — fine), "the next decade of software gets decided in the next two years" (manifesto — review; keep only if it survives the specificity test in `Website Voice.md`).

## 3. The method (Abdullah's permanent rule — saved in memory)

**Market-first. Never reinvent the wheel. Never invent copy.**
1. For every string that reads AI-ish, find a **real, verbatim line** from a reputable Saudi/GCC or global company that does the same job.
2. **Borrow it as-is** — only swap company-level words (Muse for their name, our services for theirs).
3. If no real line fits, **rewrite in Muse's own voice** (per vault rules) — but the default move is borrowing.
4. **Never fabricate**: no invented stats, no "trusted by", no superlatives, no claims we can't back. The EMPTY-until-real rule from the structure plan still applies (things like "1 in 3…" stay out until there's a real number).
5. Attribute mentally: the plan/report should note *where each line came from* (salla / zto / mozn / thmanyah / lean.sa / tamkeen / Tenex).

## 4. Sources — read these in this order

| Source | Path | What's in it |
|---|---|---|
| **This brief** | `docs/de-ai-copy-pass-brief.md` | mission, diagnosis, method, constraints |
| Structure docs | `docs/muse-site-structure-plan.md`, `docs/structure-implementation-report.md` | what already shipped; what the F-flagged strings are |
| Reference bank | `docs/copy-reference-bank.md` (125 lines) | condensed borrowed lines + sources (a summary — see below) |
| **Full research** | `/Users/a/muse_copy_research.md` (16 KB) | Tenex + EN products verbatim quotes |
| | `/Users/a/research_muse/copy_research_muse.md` (20 KB) | zto.sa / mozn.ai / salla / lean.sa / tamkeen verbatim quotes |
| | `/Users/a/thmanyah_copy_research.md` (18 KB) | 48 verified thmanyah quotes (نشرة أها! register, "تغنيك عن", زائد:, best AR constructions) |
| Voice rules | `Muse Vault/01 Company/Website Voice.md` | banned phrases, specificity test (its FAILS column literally lists "Win the next decade") |
| | `Muse Vault/01 Company/Arabic Termbase.md` | Saudi register markers, dos/don'ts |
| | `Muse Vault/01 Company/Brand Voice.md`, `Habbar Voice Study.md`, `Deck Copy v0.03.md` | brand voice layers |
| Prior copy docs | `docs/copy-revision-brief.md`, `docs/copy-revision-plan.md`, `docs/copy-revision-report.md` | how the first 28-string pass was done — replicate the method at full scale |

> The reference bank is a **summary** — the Opus planner must re-read the three research files for full quotes and context before choosing lines.

## 5. Scope — everything to pass through (file-by-file)

### 5a. `messages/en.json` + `messages/ar.json` (top-level namespaces, all of them)
- `Common` — buttons, labels, skip-links, aria labels
- `Nav` + `Footer` — link labels, footer worldview line (added last pass — keep, it's good), rights line, socials
- `CTA` — the shared call-to-action block
- `Home` — hero, approach (3 cards incl. bodies + promises), manifesto (3 paragraphs), whoWeBuildFor, outcomes, ticker, faq
- `About` — hero, moment (added last pass — review AR flags), about paragraphs 1–3, mission, vision, careersTeaser
- `Explore` — hero subtitle ("startup speed" = kill), card list
- `Services` — detail nav, faq heading, getStarted label
- `Careers` — hero, origin, whyJoin, claim, purpose, noMatch
- `Newsletter` — hero title/subtitle (AR was refined last pass — confirm), fields, success
- `Contact` — hero, conditional (added last pass), form labels, success/error messages
- `GetStarted` — hero, form labels, success/error messages ("accelerate your goals" = kill)
- `Forms` — shared form strings
- `Legal` — privacy + terms body copy (review for AI-ish boilerplate, but stay within legal register — do NOT borrow marketing lines into legal text)
- `NotFound`, `Metadata` — 404 copy + **all meta titles/descriptions** (these are SEO-visible and currently likely template-y)
- `LanguageSwitcher`

### 5b. `lib/content/en/services.ts` + `lib/content/ar/services.ts` (the biggest chunk)
All three services (`ai-transformation`, `product-engineering`, `gamification-experience`):
- `summary` (card line)
- `intro` paragraphs
- `approachHeading` + `approachIntro` paragraphs
- `pillars` (3 each) — titles + bodies
- `whyHeadline` + `whyReasons` (4 each)
- `whatWeDoHeadline` + `whatWeDo` items (4–6 each)
- `faq` (3 each, added last pass — the AR answers are F-flagged, review them here)
- Any other fields (crossLink labels, etc.)

### 5c. `lib/content/en/careers.ts` + `lib/content/ar/careers.ts`
- Every role: `blurb` (the résumé-ese is strong here), `responsibilities`, `requirements`, `niceToHaves`, `location`, `compensation`
- The "triple-verb template cadence" is the main AI tell — rewrite blurbs human, vary the sentence shapes, keep responsibilities/requirements factual (job-posting register is fine, just de-template it)

### 5d. Component-level copy (check for hardcoded strings — there should be none)
- `components/sections/*.tsx` — verify nothing user-facing is hardcoded (all must come from messages/content). If any hardcoded copy is found, **it must be moved into the message files** as part of this pass.

## 6. Hard constraints (non-negotiable)

1. **Zero hardcoded copy.** Every string lands in `messages/{en,ar}.json` or `lib/content/{en,ar}/*.ts`. Components read via next-intl / the content layer only.
2. **i18n parity.** Every new/changed key exists in BOTH languages. Run the key-diff after every commit.
3. **AR is written, not translated.** Saudi register per Arabic Termbase (markers عشان/وش/مو/اللي/بس, 1–2 per paragraph; MSA spine for headings; spoken for body/CTA; Muse stays Latin; Western numerals; straight quotes).
4. **Borrow real lines only.** Traced to the research files. Never invent. Attribute in the plan/report.
5. **No unearned claims.** No "best", "trusted by", invented stats, superlatives. EMPTY-until-real applies.
6. **Build must pass** after every step: node ≥22 → `export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"`, then `npx tsc --noEmit` + `npm run build`.
7. **Don't regress what already shipped.** The structure additions (WhoWeBuildFor, OutcomesBand, ticker, careers intro, contact conditional, footer worldview, newsletter AR) are approved — polish if needed, don't gut.
8. **Don't touch the new ServiceSubnav / ServiceFAQ structure** — only their strings if they read AI-ish.

## 7. Pipeline & shipping (Abdullah's standing instruction)

1. **Hermes** writes/updates this brief → launches Claude **Opus** (`--model opus`) with it → Opus reads brief + research + vault + live code, produces `docs/de-ai-copy-pass-plan.md` with **exact EN + exact AR strings for every change** (file, key, before → after, source tag, status Y/F).
2. **Hermes** reviews the plan → launches Claude **Sonnet** (`--model sonnet`, `--max-turns 100`, resume on max_turns) → Sonnet executes step-by-step, one logical commit per step, tsc+build after every step.
3. **Hermes verifies** (never trusts the self-report): tsc, full build, key-parity diff, grep for hardcoded copy, spot-check AR register.
4. **Merge to `staging/bilingual-ar-en`** (fast-forward/merge), push, write `docs/de-ai-copy-pass-report.md` + vault journal (`Muse Vault/09 Journal/2026-08-04 De-AI Copy Pass.md`).
5. **Flagged strings** for the native-Arabic reviewer are listed at the end of the report (F status, gate before `/ar` publishes). PR to staging is optional; the user is fine with direct-to-staging since staging is the review environment.

**Git identity** (already set locally, personal account): `alsubaideabdullah` / `abdullah.a.alsubaie@outlook.com`. Repo: `Muse-software/muse-software`. Work branch name suggestion: `copy/de-ai-pass`.

## 8. Verification checklist (run before declaring done)

- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` green (node 24), all static params resolve
- [ ] EN/AR key-parity diff: zero asymmetry
- [ ] No hardcoded user-facing strings in components
- [ ] Grep kills: `leverage|empower|streamline|robust|seamless|at scale|cutting-edge|world-class|drive growth|accelerate your goals|startup speed|highest-leverage|quantify ROI|implementation roadmap` → zero hits in EN
- [ ] AR spot-check: each new paragraph sits in the 1–2-marker band and reads as Riyadh-native, not translated
- [ ] `main` untouched; staging receives the merge; both pushed
- [ ] Report written with source attributions + F-flagged AR list
