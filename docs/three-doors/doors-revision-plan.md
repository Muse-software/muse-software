# Muse Homepage Revision Plan: Three Doors, Heroes, Punctuation, UI

Status: For orchestrator (Hermes) review, then per-branch execution by Sonnet
Date: 2026-08-05
Contract: `docs/three-doors/doors-revision-brief.md`. Every rule there is binding. This plan
resolves it into exact, mechanical edits. The executor should never have to make a judgment call;
where a judgment exists it is resolved in the Decisions table (Section 2) and applied in Section 3.

Reference banks (all quotes verified live 2026-08-05):
- `research/doors-ref-global.md`, `research/doors-ref-saudi.md`, `research/doors-ref-bigtech.md`
- `research/ui-patterns-global.md`, `research/ui-patterns-saudi.md`

Git identity reminder (brief §7): `~/Downloads/personal` repos commit as `alsubaieabdullah`
/ `abdullah.a.alsubaie@outlook.com`. Verify per repo before the first executor commit
(`git config user.name` / `git config user.email`), set locally if wrong. Do not rely on the
global identity. (This planning pass makes no commits.)

---

## 0. What actually exists on each branch (verified, not assumed)

The three branches are separate homepages. They do NOT share a `messages/Home` shape. Verified:

| | direction/1-the-studio | direction/2-the-thesis | direction/3-the-proof |
|---|---|---|---|
| Home render order (`HomeSections.tsx`) | Hero, **ThreeDoors**, Manifesto, OutcomesBand, Ticker, FAQ, CTA | Hero, **TheProblem**, **TheStandard**, **ThreeDoors**, Manifesto, OutcomesBand, Ticker, FAQ, CTA | Hero, **ProofWall**, **ThreeDoors**, Manifesto, OutcomesBand, Ticker, FAQ, CTA |
| Hero | Tenex line (replace) | Tenex line (replace) | "We don't pitch. / We ship." (APPROVED, keep) |
| Unique sections | — | theProblem (emoji), theStandard (em dashes) | proofWall (Tenet em dash) |
| `Home.doors` extra keys | has `product-engineering` / `ai-integration` / `brand-interface` (unrendered orphans) | none | none |

Facts that shape the edits:
- **`ThreeDoors.tsx` and `Hero.tsx` are byte-identical across all three branches** (verified `git diff`).
  So the door-component edit and the hero-component behaviour are the same everywhere; they are still
  applied per-branch because the branches are separate checkouts.
- `ThreeDoors.tsx` renders a **section eyebrow** (`t("eyebrow")`) and a **per-card eyebrow**
  (`door.eyebrow`). Removing eyebrows therefore requires a component edit AND key deletions in the same
  commit, or the build throws `MISSING_MESSAGE`.
- `TheProblem.tsx` renders `item.icon` (the emoji) in a `<p class="text-4xl">`. Emoji removal = component
  edit + drop the `icon` keys, same commit.
- `ProofWall.tsx` CTAs (`View live →`, `View case study →`) are hardcoded in the component, contain only a
  real arrow glyph, no dashes. The Tenet em dash lives in the JSON data only.
- Build tooling: `npm run build` (`next build`), lint `npm run lint`. Package manager: npm
  (`package-lock.json`). next-intl validates messages at build, so a key referenced by a component but
  missing in JSON is a build failure, not a silent gap.

Pre-existing issues surfaced (NOT introduced by this work), resolved in Section 2:
- **P-1 (D1 parity):** `Home.whoWeBuildFor` exists in `ar.json` but NOT `en.json` on direction/1. Only
  Home gap on D1 (verified by key-path diff). It is an unrendered orphan on D1 but breaks a strict
  EN/AR parity check.
- **P-2 (all branches):** the option KEYS in `Contact.form.budgets` and `GetStarted.form.revenueBands`
  contain en dashes (U+2013), e.g. `"50K–150K SAR"`, `"5M–20M SAR"`. The KEY has an en dash; the value
  uses a hyphen. These keys are echoed by hardcoded arrays in `ContactForm.tsx` / `GetStartedForm.tsx`.
- **P-3 (D3 only):** `ar.json` `Legal.terms.sections[2].body` (intellectual property) uses two em dashes;
  D1/D2 use a clean comma version. D3's AR diverged.
- **P-4 (D3, out of scope):** D3's `Home.hero` and `Home.proofWall` are untranslated English in `ar.json`,
  and proofWall contains invented client results ("94% accuracy", "40% retention lift", "PIF-level").
  The brief locks D3 scope to hero-stays + doors + punctuation, so this is flagged only, not changed.

---

## 1. Executive summary

**direction/1-the-studio.** New identity hero replacing the copied Tenex line: `We build our own software.`
/ `And yours, properly.` (highlighted) with tagline `We're a product company in Riyadh.` — drawn straight
from the Deck Copy one-liner, stating both lanes (own products + client work) instead of an AI-consultant
claim. The three doors are rebuilt: per-card eyebrows and the section eyebrow are removed (titles carry the
lane), Build becomes `Your product, built` and Ventures stays `Our own products` so the **Your vs Our**
pronoun is what separates client-work from own-products, each door keeps a distinct verb CTA
(Start / See / Read), and every body is re-sourced from the reference banks and the Deck. One parity add
(`en.json Home.whoWeBuildFor`) so EN/AR keys match.

**direction/2-the-thesis.** New thesis hero replacing the Tenex line: `Shipping is easy now.` /
`Shipping well isn't.` (highlighted) — a two-fragment position that the TheProblem and TheStandard sections
below then argue, tied to the page's own Manifesto ("the cost of building good software is collapsing").
The 🎯📝🏗️ emojis in TheProblem are removed (no icon, matching Linear/Vercel). The four em dashes in
TheStandard paragraphs and the one in a pillar body are rewritten as full stops / commas. The doors are
rebuilt identically to the other branches.

**direction/3-the-proof.** Hero is APPROVED and untouched. The doors are rebuilt identically to the other
branches (including fixing two AR typos in the current ventures copy). The Tenet card em dash
(`Not a wiki — a thinking partner.`) becomes a two-fragment full stop (`Not a wiki. A thinking partner.`),
in both `en.json` and `ar.json`. The divergent AR Legal em-dash string (P-3) is restored to the clean D1/D2
version.

**Shared across all three:** identical doors copy (EN + AR), identical `ThreeDoors.tsx` eyebrow-removal
edit, zero em/en dashes / curly quotes / guillemets / emoji in the homepage message copy, at most one
eyebrow per section and none inside cards.

---

## 2. Decisions needed

Each row: the open question, the recommendation (what Section 3 implements), and the alternative.

| # | Decision | Recommendation (implemented below) | Alternative |
|---|---|---|---|
| a | Doors section: keep a section-level eyebrow or go zero-eyebrow with a big-statement heading? | **Zero-eyebrow.** Delete `Home.doors.eyebrow` ("Three ways we work") and let the existing H2 `Pick the door that matches you` stand alone. Every one of the 11 UI-reference sites opens sections with a big statement, no eyebrow (Linear, Basecamp, Notion have zero eyebrows anywhere). | Keep one section eyebrow (Tenex "Our approach" / Netlify "How it works" model). Compliant with "at most one per section" but weaker per research. |
| b | How to make Build never read as Ventures? | **Pronoun contrast in the titles.** Build = `Your product, built`; Ventures = `Our own products`. "Your" vs "Our" is the distinction (ZTO own-vs-client "not the other way around"; Salla possessive "Your store. Your brand. Your future."). Bodies reinforce: Build = a client engagement model (squad inside your team, weeks not quarters); Ventures = our own apps (Arabic first, real data). | Keep noun titles ("Client software" / "Our products"). Clearer literally but loses the second-person register the vault requires and reads as departments, not ways to work. |
| c | Card CTA treatment: identical, distinct verb per door, or circular-arrow whole-card? | **Distinct verb CTA per door** (each door its own offer): `Start a build` / `See what we ship` / `Read the latest`. The whole card already is a `<Link>`, so the text CTA sits on a clickable card. Distinct verbs satisfy Website Voice §Applied ("the verb changes with the section") and Netlify's per-card verb model. | Circular-arrow whole-card link, no text (Linear/Notion). Cleanest look but drops the verb the vault wants; larger component change. Never: identical generic CTA on all three (banned by brief). |
| d | Think door: cards or a 37signals numbered list? | **Keep Think as the third equal card** (Linear keeps all doors identical weight), and adopt the 37signals/Thmanyah device *inside* the body as a lane list: `Articles, field notes, and a newsletter for people building here.` Preserves the balanced three-card grid and needs no extra component. | Full numbered-list ("NN.") Think door. Truer to 37signals but breaks the three-equal-card symmetry and needs a new component + layout; out of proportion to the brief. |
| e | New heroes for D1 and D2 (never the Tenex AI line). | **D1:** `We build our own software.` / `And yours, properly.` (Deck one-liner; both lanes). **D2:** `Shipping is easy now.` / `Shipping well isn't.` (thesis the page argues; ties to on-page Manifesto). Both keep tagline `We're a product company in Riyadh.` (Deck) and the existing subtitle. | D1 alt: category claim `The product studio for teams that ship` (Linear register) — strong but less identity-specific. D2 alt: `Good software is rare here.` / `We are the bar.` — sharper but flirts with the boast the vault avoids. |
| f | P-1: D1 EN/AR parity gap (`whoWeBuildFor` AR-only). | **Add `Home.whoWeBuildFor` to D1 `en.json`**, copying the exact EN text already shipped on D2/D3 (not invented). Restores parity; harmless because unrendered on D1. | Delete `whoWeBuildFor` from D1 `ar.json`. Also restores parity but discards real translated copy that a future D1 section may use. |
| g | P-2: en-dash option KEYS in budgets/revenueBands (Contact + GetStarted). | **DEFERRED by user (2026-08-05).** Keep en dashes in form option keys. Exception logged: the punctuation sweep excludes `Contact.form.budgets` / `GetStarted.form.revenueBands` keys; the values and all homepage copy are still swept. Rationale: no known downstream consumer, but the user prefers not to change submitted option values pre-launch. | Fix as its own commit (replace U+2013 with hyphen in KEY + hardcoded arrays). Rejected. |
| h | P-4: D3 AR hero/proofWall are English + proofWall has invented results. | **Flag only, do not change.** Brief locks D3 to hero-stays + doors + punctuation. | Localize + de-invent proofWall. Out of scope; raise as a separate follow-up so it is not silently shipped as "done". |

---

## 3. Per-branch section plan

Notation: `KEEP` = no change; `REWRITE` = new copy authored here; `BORROW` = adapted from a reference
(traced in Section 4); `CUT` = removed. Key paths are under `messages/{en,ar}.json` → `Home.…`.
"Current" strings are quoted verbatim from each branch (they differ slightly between branches; the exact
per-branch current value is what the executor matches with Edit).

Arabic is authored natively (not translated): MSA spine for titles, Saudi spoken for body/CTA, 1–2 markers
(عشان/وش/مو/اللي/بس) per paragraph max. Marker counts are annotated so the reviewer can verify.

### 3.0 SHARED — the doors (applies verbatim to D1, D2, D3)

This is the single canonical target for `Home.doors.build`, `.ventures`, `.think` and the section
`heading`/`eyebrow`, in both languages. Apply on every branch. On D1 the sibling keys
`doors.product-engineering` / `ai-integration` / `brand-interface` are **left untouched**.

**Section opener** — Decision (a):
- `doors.eyebrow` — EN `"Three ways we work"` / AR `"ثلاث طرق نشتغل بها"` → **CUT** (delete key in both langs).
- `doors.heading` — EN `"Pick the door that matches you"` / AR `"اختر الباب اللي يناسبك"` → **KEEP**.

**Per-card eyebrows** — `doors.build.eyebrow`, `doors.ventures.eyebrow`, `doors.think.eyebrow`
(EN `"Build"/"Ventures"/"Think"`, AR `"بناء"/"مشاريعنا"|"مبادرات"/"فكر"|"تفكير"`) → **CUT** all three, both
langs. (Titles now carry the lane.)

**Canonical EN doors (target):**

```jsonc
"build": {
  "title": "Your product, built",
  "body": "A senior squad builds inside your team, proving value in weeks, not quarters.",
  "promise": "Every engagement ends with something running in production, not a slide deck.",
  "cta": "Start a build"
},
"ventures": {
  "title": "Our own products",
  "body": "Arabic first, real data, and the details most products skip.",
  "promise": "We publish what we build, and keep going with whatever people actually use.",
  "cta": "See what we ship"
},
"think": {
  "title": "Knowledge and community",
  "body": "Articles, field notes, and a newsletter for people building here.",
  "promise": "The same thinking that goes into the work, published.",
  "cta": "Read the latest"
}
```

**Canonical AR doors (target):**

```jsonc
"build": {
  "title": "منتجك، مبنيّ كما يجب",
  "body": "فريق خبير يبني جنبك، ويثبت قيمته خلال أسابيع، مو شهور.",
  "promise": "كل مشروع ينتهي بشيء شغّال في الإنتاج، مو عرض تقديمي.",
  "cta": "ابدأ البناء"
},
"ventures": {
  "title": "منتجاتنا الخاصة",
  "body": "عربي أول، بيانات حقيقية، والتفاصيل اللي يتخطاها غيرنا.",
  "promise": "ننشر اللي نبنيه، ونكمل مع اللي يستخدمه الناس فعلًا.",
  "cta": "شوف اللي نطلقه"
},
"think": {
  "title": "معرفة ومجتمع",
  "body": "مقالات، ملاحظات ميدانية، ونشرة لناس تبني هنا.",
  "promise": "نفس التفكير اللي يدخل في الشغل، ننشره.",
  "cta": "اقرأ الجديد"
}
```

AR marker check (≤2 each): build.body → مو ×1; build.promise → مو ×1; ventures.body → اللي ×1;
ventures.promise → اللي ×2; think.body → 0 (spoken tone via "تبني هنا"); think.promise → اللي ×1. OK.
Balance check: EN titles 3/3/3 words; bodies 12/10/10 words; promises 12/13/9. Within ~2×.

**Verdicts and current values by field (what changes vs KEEP):**

| Field | Verdict | EN current → target | AR current → target |
|---|---|---|---|
| build.title | REWRITE | `Production-grade software` → `Your product, built` | `برامج جاهزة للإنتاج` → `منتجك، مبنيّ كما يجب` |
| build.body | REWRITE (BORROW) | `Shippable AI features, real interfaces, stakeholder-friendly communication. Built fast, without dropping the quality bar.` → canonical | D1: `ميزات ذكاء اصطناعي تشتغل، واجهات حقيقية، تواصل يناسب أصحاب المصلحة. نبني بسرعة من غير ما نتنازل عن الجودة.` · D2/D3: `ميزات ذكاء اصطناعي قابلة للتسليم، واجهات حقيقية، تواصل يناسب غير المتخصصين. بناء سريع، بدون التخلي عن معيار الجودة.` → canonical |
| build.promise | KEEP (EN) / STANDARDIZE (AR) | `Every engagement ends with something running in production, not a slide deck.` (unchanged) | D1: `كل مشروع ينتهي بشيء شغّال في الإنتاج، مو عرض تقديمي.` (unchanged) · D2/D3: `كل مشروع ينتهي بشيء يشتغل بالإنتاج، مو عرض تقديمي.` → canonical (`شغّال في الإنتاج`) |
| build.cta | KEEP (EN) / STANDARDIZE (AR) | `Start a build` (unchanged) | D1: `ابدأ البناء` (unchanged) · D2/D3: `ابدأ مشروع بناء` → `ابدأ البناء` |
| ventures.title | KEEP | `Our own products` | `منتجاتنا الخاصة` |
| ventures.body | REWRITE (BORROW) | D1/D2: `We're hunting for the golden egg. Real pipeline, real progress. Open to collaborating with people who have ideas.` · D3: `We are hunting…` → canonical | D1: `نبحث عن البيضة الذهبية. خط أنابيب حقيقي، تقدم حقيقي. منفتحين على التعاون مع ناس عندهم أفكار.` · D2: `نطارد البيضة الذهبية. خطوط أنتاج حقيقية، تقدم حقيقي. مفتوحون للتعاون مع من عنده أفكار.` · D3: `نطادي البيضة الذهبية. …` → canonical |
| ventures.promise | REWRITE (BORROW) | `We ship our own MVPs and share what we learn along the way.` → canonical | D1: `نطلق نماذجنا الأولية (MVPs) ونشارك اللي نتعلمه.` · D2/D3: `نطلق MVPs بنا ونشارك ما نتعلمه.` → canonical |
| ventures.cta | REWRITE (BORROW) | `See the pipeline` → `See what we ship` | D1: `شوف الخط` · D2/D3: `شوف خط الإنتاج` → `شوف اللي نطلقه` |
| think.title | REWRITE (minor) | `Knowledge & community` → `Knowledge and community` | `معرفة ومجتمع` (KEEP) |
| think.body | REWRITE (BORROW) | D1/D2: `Articles, tutorials, showcases, newsletter. Building a name in the Saudi startup and ventures community. Not just sharing knowledge — building influence.` · D3: `… ventures community.` → canonical | D1: `مقالات، دروس، عروض، نشرة بريدية. نبني اسمًا في مجتمع الشركات الناشئة والمشاريع بالسعودية. مو بس مشاركة معرفة — نبني تأثيرًا.` · D2: `مقالات، شروحات، معارض، نشرة. بنبني اسمنا في مجتمع رواد الأعمال والمبادرات السعودية. ما نشارك معرفتنا، بنبني نفوذ.` · D3: `… المبادرات السعودية.` → canonical |
| think.promise | KEEP (EN) / STANDARDIZE (AR) | `The same thinking that goes into the work, published.` (unchanged) | D1: `نفس التفكير اللي يدخل في الشغل، ننشره.` (unchanged) · D2/D3: `نفس التفكير اللي نبنيه، منشور.` → canonical |
| think.cta | KEEP (EN) / STANDARDIZE (AR) | `Read the latest` (unchanged) | D1: `اقرأ الجديد` (unchanged) · D2/D3: `اقرأ الأحدث` → `اقرأ الجديد` |

Note the two AR typos this rewrite eliminates: `نطادي` (D3, should be نطارد) and `خطوط أنتاج` (D2/D3, should
be خطوط إنتاج) — both disappear because `ventures.body` is fully replaced.

### 3.0.C SHARED — `components/sections/ThreeDoors.tsx` edit (same on every branch)

Apply in the SAME commit as the doors JSON change (eyebrow keys are deleted, so the component must stop
referencing them or the build fails). Exact edits:

1. Delete the section eyebrow block:
   ```tsx
   <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
     {t("eyebrow")}
   </p>
   ```
2. On the section heading, drop the now-orphan top margin: `className="mt-4 font-space-grotesk …"` →
   `className="font-space-grotesk …"` (it is now the first child of its wrapper).
3. Delete the per-card eyebrow block:
   ```tsx
   <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
     {door.eyebrow}
   </p>
   ```
4. On the card title, drop the orphan top margin: `<h3 className="mt-4 font-space-grotesk …">` →
   `<h3 className="font-space-grotesk …">`.
5. In `type Door`, delete the line `  eyebrow: string;`.
6. In the `doors` array, delete the three `eyebrow: t("build.eyebrow"),` / `t("ventures.eyebrow")` /
   `t("think.eyebrow")` lines.

Result: section = H2 only; each card = title → body → promise → distinct verb CTA (with the existing arrow),
whole card clickable. Zero eyebrows.

### 3.1 direction/1-the-studio

**Hero** — REWRITE (Decision e). `ThreeDoors`-style highlighted second line; keep subtitle + CTA.

| Key | Verdict | EN current → target | AR current → target |
|---|---|---|---|
| hero.headlineLead | REWRITE | `Everyone has an AI strategy.` → `We build our own software.` | `الكل عنده استراتيجية للذكاء الاصطناعي.` → `نبني تطبيقاتنا الخاصة.` |
| hero.headlineTurn | REWRITE | `Almost nobody has shipped one.` → `And yours, properly.` | `بس قليل جدًا اللي قدر ينفذها.` → `ومنتجك، كما يجب.` |
| hero.tagline | REWRITE | `We're a product team in Riyadh.` → `We're a product company in Riyadh.` | `احنا فريق منتجات في الرياض.` → `احنا شركة منتجات في الرياض.` |
| hero.subtitle | KEEP | `We actually build the thing, not just the deck about the thing.` | `نبني الشيء نفسه فعلًا، مو بس عرض تقديمي عنه.` |
| hero.cta | KEEP | `Get in touch` | `تواصل معنا` |

Length note: `headlineTurn` is the highlighted nowrap line; `And yours, properly.` (20 chars) is shorter than
the current 30-char line, so it fits the vw sizing the component tunes to. AR `ومنتجك، كما يجب.` is short.

**Doors** — apply Section 3.0 (EN + AR) + 3.0.C component edit.

**Parity fix P-1** — Decision (f). Add to D1 `en.json` under `Home`, matching the shape already in
`ar.json` and the EN text shipped on D2/D3:
```jsonc
"whoWeBuildFor": {
  "heading": "The teams we work with aren't a general audience.",
  "body": "They're <role>founders</role> shipping a first product, and <role>operators</role> trying to get an AI initiative out of pilot purgatory."
}
```
(Unrendered on D1; this only closes the key gap so the parity check passes.)

**Change count D1:** EN — 3 hero + 7 doors value changes, +4 eyebrow deletions, +2 parity additions.
AR — 3 hero + 7 doors value changes, +4 eyebrow deletions. Components — `ThreeDoors.tsx` (6 edits).

### 3.2 direction/2-the-thesis

**Hero** — REWRITE (Decision e), thesis-first.

| Key | Verdict | EN current → target | AR current → target |
|---|---|---|---|
| hero.headlineLead | REWRITE | `Everyone has an AI strategy.` → `Shipping is easy now.` | `الكل عنده استراتيجية للذكاء الاصطناعي.` → `الإطلاق سهل.` |
| hero.headlineTurn | REWRITE | `Almost nobody has shipped one.` → `Shipping well isn't.` | `بس قليل جدًا اللي قدر ينفذها.` → `الإتقان مو سهل.` |
| hero.tagline | REWRITE | `We're a product team in Riyadh.` → `We're a product company in Riyadh.` | `احنا فريق منتجات في الرياض.` → `احنا شركة منتجات في الرياض.` |
| hero.subtitle | KEEP | `We actually build the thing, not just the deck about the thing.` | `نبني الشيء نفسه فعلًا، مو بس عرض تقديمي عنه.` |
| hero.cta | KEEP | `Get in touch` | `تواصل معنا` |

Two-fragment anaphora (`Shipping … / Shipping …`) is the designed device; AR keeps the parallel on
`الإطلاق … / الإتقان …` with one marker (مو). The problem/standard sections directly below now read as the
argument for this hero.

**theProblem** — CUT emoji, KEEP copy, KEEP eyebrow (one per section is compliant).

- `theProblem.eyebrow` (`The problem we see` / `المشكلة اللي نشوفها`) — KEEP.
- `theProblem.heading` (`Everyone has a strategy. Almost nobody ships.` / `الكل عنده استراتيجية. قليل اللي ينفذ.`) — KEEP.
- `theProblem.items[0..2].icon` = `🎯` / `📝` / `🏗️` (both langs) — **CUT** all three keys.
- `theProblem.items[*].title` / `.body` — KEEP (content is on-thesis; contains no dashes/emoji).

Component `components/sections/TheProblem.tsx` (same commit as the icon-key deletion):
1. Delete the emoji element:
   ```tsx
   <p className="text-4xl mb-4" aria-hidden="true">
     {item.icon}
   </p>
   ```
2. Update the map param type from `{ icon: string; title: string; body: string }` to
   `{ title: string; body: string }`.

(Decision: "no icon", per Linear/Vercel no-icon treatment — the simplest of the two brief options and it
needs no new asset. Alternative in the brief was a drawn SVG.)

**theStandard** — REWRITE the five dashed strings only (em dash → full stop, or comma inside a list).
Content otherwise KEEP. The PIF line stays: it states experience, not a client (allowed by brief §2).

| Key | EN current → target | AR current → target |
|---|---|---|
| theStandard.paragraph1 | `…The difference isn't talent — it's whether you're willing to do the work that nobody sees.` → `…The difference isn't talent. It's whether you're willing to do the work that nobody sees.` | `…الفرق مو موهبة — هو استعدادك تسوي الشغل اللي ما أحد يشوفه.` → `…الفرق مو موهبة. هو استعدادك تسوي الشغل اللي ما أحد يشوفه.` |
| theStandard.paragraph2 | `…That's not a slogan — it's a written checklist we run on every release.` → `…That's not a slogan. It's a written checklist we run on every release.` | `…مو شعار — هي قائمة تحقق مكتوبة نسويها على كل إطلاق.` → `…مو شعار. هي قائمة تحقق مكتوبة نسويها على كل إطلاق.` |
| theStandard.paragraph3 | `…That experience isn't the story — it's the reason the standard exists. Muse is the line.` → `…That experience isn't the story. It's the reason the standard exists. Muse is the line.` | `…التجربة مو القصة — هي السبب إن المعيار موجود. Muse هو الخط.` → `…التجربة مو القصة. هي السبب إن المعيار موجود. Muse هو الخط.` |
| theStandard.pillars[0].body | `…loading states — all real, all reviewed.` → `…loading states, all real, all reviewed.` | `…حالات تحميل — كلها حقيقية، كلها مراجعة.` → `…حالات تحميل، كلها حقيقية، كلها مراجعة.` |
| theStandard.eyebrow / heading | KEEP (`The standard we hold` / `Muse is the quality bar. The other choice.` and AR equivalents) | KEEP |

(Only the exact dash spans change; the leading text of each paragraph is quoted with `…` for brevity but the
Edit must preserve it exactly — the executor edits just the `— ` → `. ` / `, ` substring in each string.)

**Doors** — apply Section 3.0 (EN + AR) + 3.0.C component edit.

**Change count D2:** EN — 3 hero + 7 doors + 4 theStandard = 14 value changes; deletions: 3 icons + 4
eyebrows = 7. AR — 3 hero + 10 doors + 4 theStandard = 17 value changes; deletions: 3 icons + 4 eyebrows = 7.
(AR has more doors changes than EN because D2's AR build.promise/cta and think.promise/cta differ from
canonical.) Components — `ThreeDoors.tsx` (6 edits) + `TheProblem.tsx` (2 edits).

### 3.3 direction/3-the-proof

**Hero** — **KEEP unchanged** (`We don't pitch.` / `We ship.`; APPROVED by brief). No edit. (P-4: AR hero is
still English; flagged, not touched, per scope.)

**proofWall** — punctuation only.

- `proofWall.items[4].body` (Tenet) — REWRITE the dash: `AI-native knowledge base for teams that build. Not a wiki — a thinking partner. Early access live.`
  → `AI-native knowledge base for teams that build. Not a wiki. A thinking partner. Early access live.`
  Apply in **both `en.json` and `ar.json`** (the string is identical English in both files on D3).
  (Two-fragment full stop = Notion "Less tracking. More progress." pattern.)
- All other proofWall content — KEEP (out of scope; see P-4 flag — the invented results are NOT fixed here).

**Doors** — apply Section 3.0 (EN + AR) + 3.0.C component edit. (Note D3's AR doors carry the `نطادي` /
`خطوط أنتاج` typos, which the full-body replacement removes.)

**P-3 Legal AR fix** — `Legal.terms.sections[2].body` in D3 `ar.json` only:
`كل المحتوى على هذا الموقع — اسم Muse Studios، وشعاره، وتصميمه — مملوك لMuse Studios ولا يمكن إعادة إنتاجه بدون إذن.`
→ `جميع محتويات هذا الموقع، بما فيها اسم Muse Studios وشعاره وتصميمه، ملك لـ Muse Studios ولا يجوز إعادة إنتاجها دون إذن.`
(removes 2 em dashes and restores parity with D1/D2 AR).

**Change count D3:** EN — 7 doors value changes + 1 Tenet + 4 eyebrow deletions. AR — 10 doors value changes
+ 1 Tenet + 1 Legal + 4 eyebrow deletions. Hero: 0. Components — `ThreeDoors.tsx` (6 edits).

### 3.5 SHARED (optional, Decision g) — en-dash option KEYS (P-2)

Not homepage copy, but the brief's punctuation sweep says "zero en dashes anywhere in messages JSON," and
these live in `Contact.form.budgets` and `GetStarted.form.revenueBands` KEYS on all three branches. Fix as a
separate commit per branch. Replace U+2013 (`–`) with U+002D (`-`) in the KEY, in BOTH `en.json` and
`ar.json`, AND in the component arrays that echo the keys:

- `Contact.form.budgets`: `"50K–150K SAR"` → `"50K-150K SAR"`, `"150K–500K SAR"` → `"150K-500K SAR"`.
  Component: `components/sections/ContactForm.tsx` line ~17 array literal.
- `GetStarted.form.revenueBands`: `"5M–20M SAR"`, `"20M–75M SAR"`, `"75M–200M SAR"`, `"200M–500M SAR"` →
  hyphen. Component: `components/sections/GetStartedForm.tsx` lines ~12–17 array literal.

Keep each key and its array entry byte-identical after the swap (the value strings already use hyphens).

**Risk note (must be an explicit orchestrator call):** the key doubles as the submitted option value, so any
external system (CRM, webhook, spreadsheet) that keys on the literal en-dash string would see a changed value
after this fix. If no such consumer exists, apply it. If unknown, defer and record the deferral (do not mark
the punctuation sweep "clean" while these remain — log the exception).

---

## 4. Borrowing table (every new/changed content line → the reference it adapts)

Source URLs are the verified reference-bank entries. Heroes carry a dual trace: the FORM/register from a
reference site, the SUBSTANCE from the Deck Copy identity the brief mandates (§3) — this is required, not a
gap, so no hero line is BORROW-UNSUPPORTED. KEEP lines are existing sanctioned Muse copy and are listed for
provenance.

| New line (lang) | Adapts | Source |
|---|---|---|
| Build title `Your product, built` (EN) / `منتجك، مبنيّ كما يجب` (AR) | Possessive "Your …" framing + "build theirs properly" | Salla "Your store. Your brand. Your future." https://salla.com/en · Deck Copy v0.03 "help other businesses build theirs properly" |
| Build body `A senior squad builds inside your team, proving value in weeks, not quarters.` (EN) | "work inside your environment, not from a distance … proving value in weeks, not quarters" + "engineering squads" | Mozn https://www.mozn.ai/ · Tenex https://tenex.co |
| Build body `فريق خبير يبني جنبك، ويثبت قيمته خلال أسابيع، مو شهور.` (AR) | "يعمل مهندسونا داخل بيئتك التشغيلية … يظهر أثرها خلال أسابيع بدلاً من أشهر" (house pivot مو) | Mozn AR https://www.mozn.ai/ar |
| Build promise (KEEP, EN/AR) `Every engagement ends with something running in production, not a slide deck.` | Specificity-test PASS example + "No 200-slide presentations" | Website Voice.md (vault) · Tenex https://tenex.co |
| Build CTA `Start a build` (EN) / `ابدأ البناء` (AR) | Per-card verb CTA "Start building" / "Build now" | Netlify https://www.netlify.com |
| Ventures title (KEEP) `Our own products` / `منتجاتنا الخاصة` | Own-values vs client-work distinction ("not the other way around") | ZTO https://zto.sa/en/about |
| Ventures body `Arabic first, real data, and the details most products skip.` (EN) / `عربي أول، بيانات حقيقية، والتفاصيل اللي يتخطاها غيرنا.` (AR) | Deck identity for own products + two-fragment payoff form | Deck Copy v0.03 "Arabic first, real data … details most products skip" · Notion https://www.notion.com |
| Ventures promise `We publish what we build, and keep going with whatever people actually use.` (EN) / `ننشر اللي نبنيه، ونكمل مع اللي يستخدمه الناس فعلًا.` (AR) | Deck long About "publish it, and keep going with whatever people actually use" | Deck Copy v0.03 |
| Ventures CTA `See what we ship` (EN) / `شوف اللي نطلقه` (AR) | "Recently shipped" whole-card products lane | Vercel https://vercel.com/home |
| Think title `Knowledge and community` / `معرفة ومجتمع` | Knowledge/lane door | 37signals https://37signals.com · Thmanyah https://thmanyah.com |
| Think body `Articles, field notes, and a newsletter for people building here.` (EN) / `مقالات، ملاحظات ميدانية، ونشرة لناس تبني هنا.` (AR) | Four content lanes (المقالات / النشرات البريدية …) + Muse's own "field notes" | Thmanyah https://thmanyah.com · Muse Newsletter copy (existing) |
| Think promise (KEEP) `The same thinking that goes into the work, published.` / `نفس التفكير اللي يدخل في الشغل، ننشره.` | Knowledge-as-strong-titles, zero fluff | 37signals https://37signals.com · Muse Newsletter subtitle (existing) |
| Think CTA `Read the latest` (EN) / `اقرأ الجديد` (AR) | Reading a numbered essay list / "Take a 3 minute tour" | 37signals https://37signals.com · Basecamp https://basecamp.com |
| Doors heading (KEEP) `Pick the door that matches you` | Big-statement H2, no eyebrow | register per Linear https://linear.app / Basecamp https://basecamp.com |
| D1 hero `We build our own software.` / `And yours, properly.` (EN) + AR | FORM: stacked parallel claim / category register · SUBSTANCE: one-line identity | Basecamp https://basecamp.com · Linear https://linear.app · Deck Copy v0.03 one-line |
| D1 tagline `We're a product company in Riyadh.` / `احنا شركة منتجات في الرياض.` | "Muse is a product company in Riyadh" | Deck Copy v0.03 medium About |
| D2 hero `Shipping is easy now.` / `Shipping well isn't.` (EN) + `الإطلاق سهل.` / `الإتقان مو سهل.` (AR) | FORM: two-fragment payoff · SUBSTANCE: "cost of building good software is collapsing" + "raise the standard" + value الإتقان | Notion https://www.notion.com · Framer https://www.framer.com · Muse Manifesto (on-page) + Mission (Deck) |
| D2 theStandard dash rewrites (EN/AR) | Split on a full stop instead of an em-dash aside (two-fragment) | Notion https://www.notion.com (form only; no new claim) |
| D3 Tenet `Not a wiki. A thinking partner.` (EN/AR) | Two-fragment payoff replacing the em-dash aside | Notion "Less tracking. More progress." https://www.notion.com |

No line in this plan is BORROW-UNSUPPORTED. If the reviewer disputes any trace, that line does not ship until
it is re-sourced.

---

## 5. Rules checklist (verify on every branch before commit)

- [ ] Zero em dashes (`—`, U+2014) anywhere in `messages/*.json`.
- [ ] Zero en dashes (`–`, U+2013) anywhere in `messages/*.json` — **exception logged (Decision g): `Contact.form.budgets` and `GetStarted.form.revenueBands` KEYS keep their en dashes by user decision (2026-08-05). Sweep must report these as the ONLY permitted hits.**
- [ ] Zero curly quotes (`“ ” ‘ ’`) — straight quotes only.
- [ ] Zero guillemets (`« »`).
- [ ] Zero emoji (🎯 📝 🏗️ and any other) in `messages/*.json`.
- [ ] Zero eyebrows inside cards (`doors.*.eyebrow` deleted; `ThreeDoors.tsx` renders no per-card eyebrow).
- [ ] At most one eyebrow per section, none preferred: D1 Home = 0 eyebrows; D2 Home = theProblem +
      theStandard (1 each), doors 0; D3 Home = proofWall (1), doors 0. Compliant.
- [ ] Specificity test applied: every changed line is one only Muse could publish (Your-vs-Our contrast,
      "weeks, not quarters", "Arabic first, real data", "the same thinking … published"). No line a
      competitor could paste unchanged.
- [ ] No invented claims: no client names/logos/results, no pricing, no team size, no publishing history
      added. PIF stays framed as experience (D2 theStandard, unchanged). (P-4 invented proofWall results are
      flagged, not added to — and not "fixed" either, per scope.)
- [ ] AR is native, not translated: MSA titles, Saudi-spoken body/CTA, ≤2 markers/paragraph (annotated in 3.0).
- [ ] EN/AR key parity holds per branch (D1 closed via P-1 add).

Sweep command (run per branch; expect no hits, or only the P-2 keys if Decision g is deferred):
```
grep -nE '—|–|[“”‘’«»]' messages/en.json messages/ar.json
grep -noE '[🎯📝🏗️]|[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' messages/en.json messages/ar.json
```

---

## 6. Execution order + verification (one logical commit per step)

General: each branch is a separate checkout; check it out, verify git identity (Section 0), make the edits,
build, run the checks, commit. next-intl validates messages at build, so JSON+component edits that reference
each other go in the SAME commit. Build with the executor's permission override (acceptEdits denies build).

### direction/1-the-studio
1. **Hero** — edit `en.json` + `ar.json` `Home.hero` (3 leaves each per 3.1). Commit:
   `direction-1: identity hero (replace Tenex line)`.
2. **Doors** — edit `ThreeDoors.tsx` (3.0.C) + `Home.doors` build/ventures/think + delete 4 eyebrow keys, in
   `en.json` + `ar.json` (3.0). Commit: `direction-1: rebuild three doors, drop eyebrows`.
3. **Parity** — add `Home.whoWeBuildFor` to `en.json` (3.1 P-1). Commit: `direction-1: EN/AR parity for whoWeBuildFor`.
4. **Verify:** `npm run build` clean; `npm run lint`; EN/AR key-path parity zero-diff; punctuation+emoji sweep
   zero hits; eyeball the doors + hero.
5. (Skipped — Decision g DEFERRED by user: no P-2 hyphenation.)

### direction/2-the-thesis
1. **Hero** — `Home.hero` (3.2). Commit: `direction-2: thesis hero (replace Tenex line)`.
2. **Doors** — `ThreeDoors.tsx` + `Home.doors` (3.0 / 3.0.C). Commit: `direction-2: rebuild three doors, drop eyebrows`.
3. **theProblem** — `TheProblem.tsx` (remove emoji element + type) + delete 3 `icon` keys in `en.json`+`ar.json`.
   Commit: `direction-2: remove problem-card emoji`.
4. **theStandard** — rewrite the 4 dashed strings in `en.json` + `ar.json` (3.2). Commit:
   `direction-2: remove em dashes in theStandard`.
5. **Verify:** build + lint clean; parity zero-diff; sweep zero hits (confirm 🎯📝🏗️ gone); eyeball
   problem/standard/doors/hero.
6. (Skipped — Decision g DEFERRED by user: no P-2 hyphenation.)

### direction/3-the-proof
1. **Hero** — NO CHANGE (approved). No commit.
2. **Doors** — `ThreeDoors.tsx` + `Home.doors` (3.0 / 3.0.C). Commit: `direction-3: rebuild three doors, drop eyebrows`.
3. **proofWall Tenet** — rewrite `proofWall.items[4].body` em dash in `en.json` + `ar.json` (3.3). Commit:
   `direction-3: fix Tenet card em dash`.
4. **Legal AR (P-3)** — rewrite `Legal.terms.sections[2].body` in `ar.json` (3.3). Commit:
   `direction-3: remove em dashes in AR legal terms`.
5. **Verify:** build + lint clean; parity zero-diff; sweep zero hits; eyeball doors (hero untouched).
6. (Skipped — Decision g DEFERRED by user: no P-2 hyphenation.)

### Verification helpers
- Parity (per branch): compare `Home` key paths between en/ar (jq: `.Home | [paths] | map(join("."))[]`,
  diff EN vs AR — expect empty).
- Build: `npm run build` must exit 0 with no `MISSING_MESSAGE` / `IntlError`.
- After all three branches: re-shoot screenshots and regenerate the 3 walkthrough PDFs (brief §6.5), then
  report what changed and what is flagged for native-AR review (the new AR door/hero copy, and P-4).

---

## 7. Flags for the orchestrator (things I will not decide unilaterally)

- **P-4 (D3):** AR hero + proofWall are untranslated English and proofWall states invented client results
  ("94% accuracy", "40% retention lift", "PIF-level financial institution", "200k daily transactions").
  This violates the vault's "no invented claims / no client results" rule but is outside the brief's D3
  scope. Recommend a separate follow-up branch task; do not let the "done" report imply D3 is voice-clean.
- **Decision g (P-2) — RESOLVED: DEFERRED by user (2026-08-05).** The en-dash option keys keep their en dashes; exception logged in the sweep checklist. If a downstream consumer ever keys on the literal string, revisit. The form VALUE strings already use hyphens and are untouched either way.
  any downstream consumer keys on the literal string.
- **Native-AR review:** all new AR door and hero copy in 3.0–3.3 is a native first draft and should get the
  "someone who writes Arabic well" pass the vault requires before it ships (Brand Voice §Arabic voice,
  Deck Copy checklist).
