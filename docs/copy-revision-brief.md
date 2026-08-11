# Muse Website Copy Revision — Brief

## Mission

Make the Muse website (muse.sa, bilingual EN/AR) stop reading vibe-coded and
inhuman. The rewrite must borrow REAL words and sentences from reputable local
(Saudi/regional) companies — taken as-is where they fit — never invented
AI-sounding copy. Arabic and English are written natively in parallel, NOT
translated from each other. If the Arabic carries the same meaning without
literal translation, that is the goal.

## Context

- Muse = Riyadh product company: AI transformation, product engineering,
  gamification & experience. Premium, startup-speed, long-term product
  company — not an agency, not a freelancer collective.
- Site is bilingual via next-intl, `[locale]` routing. Copy surface:
  - `messages/en.json` + `messages/ar.json` (all pages: home, about, careers,
    newsletter, contact, get-started, legal, forms, metadata/SEO)
  - `lib/content/en/services.ts` + `lib/content/ar/services.ts` (service detail)
  - `lib/content/en/careers.ts` + `lib/content/ar/careers.ts` (job listings)
- Components are fully i18n-ized. Do NOT add inline copy to components.

## The vault is the source of truth — READ THESE FIRST

All under `Muse Vault/01 Company/` (also `05 Playbooks/`):

1. `Brand Voice.md` — three registers; banned phrases; punctuation house rule
   (straight quotes only, NO em dashes/en dashes anywhere); Arabic voice rules.
2. `Website Voice.md` — the website register: "Direct and confident. An
   operator talking, not a consultant presenting." Specificity test (see
   below). "We do not claim what is not decided." Section shape: headline
   (a position) → body (specific proof) → one action (verb that varies).
3. `Arabic Termbase.md` — DECIDED terms (AI = الذكاء الاصطناعي, AI
   transformation = التحوّل بالذكاء الاصطناعي, product engineering = هندسة
   المنتجات, gamification = التلعيب, guardrails = ضوابط, in production =
   يعمل فعليًا, prototype = نموذج أوّلي, onboarding = التهيئة, audit = مراجعة,
   playbook = دليل عملي, startup speed = سرعة الشركات الناشئة...). Use the
   table, do not re-invent terms. Includes the coined pair and the lines that
   do not survive literal translation (section "Lines that do not survive
   literal translation").
4. `Habbar Voice Study.md` — the two-register Arabic mechanic (MSA spine +
   Saudi spoken body), correction pivot, verb chain, per-service verb CTAs,
   second-person-portrait careers copy. Includes the outstanding-work list.
5. `Localization Playbook.md` — RTL/register checklist.
6. `Deck Copy v0.03.md` — approved About/Mission/Vision (EN + AR native).
7. `Positioning.md` + `Business Lines.md` — what Muse is; internal pillar names
   (Ventures/Studio/Marketing) never appear publicly.

## Non-negotiable rules (from the vault)

1. **Specificity test**: any sentence a competitor could publish unchanged is
   filler — cut it or make it only-ours. Fails: "Win the next decade",
   "We deliver exceptional digital experiences". Passes: "No 6-month
   diagnostics. No 200-slide presentations.", "Every engagement ends with
   something running in production, not a slide deck".
2. **No claims that are not decided**: no pricing/billing model, no client
   names/logos/quotes/results, no team-size or staffing claims we cannot
   field, no publishing history. Real data only.
3. **Arabic two registers**: MSA spine (headings, service names, numbered
   steps, nav, forms, product UI, legal) + Saudi spoken body (marketing
   paragraphs, CTAs, careers copy, social). Spoken markers in: عشان، وش، مو،
   اللي، بس، كذا، دايم (sparingly). Max 1–2 markers per paragraph — five
   markers is performing, not writing.
4. **No classical/rare vocabulary** (نتفرّس-type words that need a glossary).
   **No deep dialect** (تبي، أبغى، أبشر, Najdi particles).
5. **Verbs over verbal nouns** (نبني الأنظمة beats بناء الأنظمة). Second
   person singular for the reader (تبني، شركتك). Muse speaks as نحن.
6. **Banned phrases** (enforce literally): innovative solutions, cutting edge
   technology, disrupting the industry, seamless, synergy, leveraging,
   empowering, unlocking, passionate about, best in class, next level,
   thrilled to announce, excited to share.
7. **Punctuation**: straight quotes only; no em dashes, no en dashes, no
   guillemets. Arabic: ، ؛ ؟ and the Latin full stop. Western numerals
   0–9 only. Gregorian dates with Arabic month names. Latin brand names stay
   Latin (Muse, ChatGPT, LinkedIn) — never transliterated.
8. **The coined pair stays EXACT** (decided 2026-08-01):
   - EN heading: "Muse helps you shift from AI-absent to AI-native."
   - AR heading: من شركة "تستخدم" الذكاء الاصطناعي، إلى شركة تبنيه
   - AR card echo: أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد
   - EN still runs absent→native; AR runs uses→builds. This divergence is
     deliberate (written natively). Do not re-align them.
9. **Approved lines that stay** (decided or Abdullah's own writing): EN hero
   "Everyone has an AI strategy. / Almost nobody has shipped one.", "We're a
   product team in Riyadh.", "We actually build the thing, not just the deck
   about the thing."; AR hero + manifesto (Abdullah's own copy); About page
   ("Riyadh-built. Globally standard." / صُنع في الرياض. بمعيار عالمي.),
   Mission, Vision, Values, beliefs; FAQ content; the ticker.
10. **Per-service CTA verbs vary** (already done in AR: خطّط للتحوّل، ابنِ
    منتجك، صمّم التجربة — keep that pattern; EN equivalents should vary too:
    not four identical "Get in touch").
11. **Arabic is shown, not claimed**: no sentence saying "we do Arabic
    properly". The site being genuinely native in both scripts is the claim.

## The defined backlog (from Habbar Voice Study "What this leaves outstanding")

Do these first; they are already owed:

- AR `/explore`, `/newsletter`, `/contact`, `/get-started` subtitles: still
  MSA, need 1–2 spoken markers each (light touch, not a rewrite).
- AR `intro` + `approachIntro` in `lib/content/ar/services.ts`: strong MSA,
  needs 1–2 markers per paragraph under the density rule.
- EN equivalents of the above should be checked against the specificity test
  and the English register.

## Also review (my scouting pass — verify and fix where real)

- EN: "Your enterprise AI strategy, architected and executed, not just
  decked." (decent but check), "As the cost of intelligence approaches zero,
  Saudi businesses that stay AI-absent will fall behind." (specificity?),
  "Becoming AI-native is difficult, but mission critical" ("mission critical"
  leans corporate), "High-velocity engineering-as-a-service, without
  sacrificing quality" ("engineering-as-a-service" is consultant-speak),
  "We become an extension of your team", FAQ answers, GetStarted points,
  Newsletter points, Footer blurb, Metadata/SEO descriptions (all pages —
  these are visible in search and should carry the voice).
- AR: same areas — density rule check, any translationese, any term that
  violates the termbase, any em dash or Arabic-Indic numeral.
- Both: any line that fails the specificity test → rewrite with a real
  reference phrase or cut.
- Do NOT touch: legal/terms/privacy bodies, form validation errors (functional),
  route/plumbing, design.

## Method — borrow, don't invent

- Source material: `docs/copy-reference-bank.md` (real verbatim quotes from
  thamanyah.com, zto.sa, Tenex, habbar.com, other local studios — with URLs).
  Use phrases as-is where they fit Muse (swap only company-specific words).
  When nothing fits, prefer cutting to inventing.
- If a reference phrase needs light adaptation, keep its structure and voice.
- Never produce generic AI copy ("unlock your potential", "supercharge",
  "revolutionize", "seamless journey", "elevate your business").
- Arabic written natively, Saudi-flavored plain register for bodies, MSA for
  spine. Never translate the English; rebuild the meaning.

## Deliverables

1. Edited copy files (messages/*.json, lib/content/en|ar/*.ts).
2. A short `docs/copy-revision-report.md`: what changed per section (EN + AR),
   which reference phrases were borrowed (with source), and what still needs
   a native Arabic reviewer's gate.

## Constraints

- Keep JSON valid; keep every key and placeholder ({year}, {role}, ICU
  plural keys) intact; keep the same key structure in both locales.
- No em dashes or en dashes in any new or edited string.
- Don't add sections/pages; only edit copy.
- Run `npx tsc --noEmit` (or the repo's typecheck) after edits and fix what
  breaks. JSON parse check on both message files.
