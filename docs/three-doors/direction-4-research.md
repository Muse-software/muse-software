# Direction 4 — Market Research (Intent-Led Routing & Guided /start)

**Status:** PLANNING research. Companion to `docs/three-doors/direction-4-understanding-first.md`.
**Brief:** `docs/three-doors/direction-4-source/Layan-Muse-Website-Direction-R3.txt`.
**Method:** every row marked **VERIFIED** was loaded live via web fetch and reflects what the server
returned. Where a flow is client-rendered (JavaScript) the fetch saw only the server shell — those are
marked **COULDN'T VERIFY** rather than reconstructed. Verbatim copy is quoted only where actually
observed. No quotes, metrics, clients, or flows are invented.

Two brief corrections surfaced by the research:
- **AZM X's real URL is `azmx.sa`** (the brief's `azm.x`/`azmx.co` is wrong). Confirmed live.
- **Netguru's estimate flow could not be verified** (steps are JS-rendered); only its intro + email
  fallback were readable. Reported honestly, not reconstructed.

---

## 1. Evidence table

Columns: Source · URL · Observed pattern (+ verbatim) · Relevance to Muse · Adaptation boundary · Verified.

### 1.1 Saudi / GCC sources

| Source | URL | Observed pattern (+ verbatim) | Relevance | Adaptation boundary | Verified |
|---|---|---|---|---|---|
| **AZM X** (local anti-pattern) | https://azmx.sa/ | Nav is **8 abstract service doors** (Artificial Intelligence, Customer Experience, Digital Maturity, Design Strategy, Digital Experience, Digital Products, Innovation Design, Studio Space). No goal/problem routing — the visitor must self-classify. Hero: *"Unleash your digital potential…"* CTA *"Create With Us."* | The exact "before" Muse's intent routing replaces: too many abstract doors, no way to find *your* problem. | Avoid entirely: abstract capability doors + vague aspirational hero. | VERIFIED |
| **Unifonic** | https://www.unifonic.com/en | Top nav by **customer-lifecycle intent, verb-first**: *"Attract & Convert" / "Engage & Support" / "Retain & Expand."* Hero: *"The AI-native platform for end-to-end customer experiences."* GCC trust: *"Build trust in regulated GCC industries with … local data residency."* AR toggle *"عربي."* CTAs *"Request a Demo," "Talk to an expert."* | Strongest **live GCC example of verb/intent-led top nav** — the closest analog to build / improve / explore-AI. Confirms local-data + Arabic framing reads as trust in-market. | Carries a 40+ enterprise **logo-wall carousel**. Borrow the intent nav + AR/RTL, not the logo wall. | VERIFIED |
| **TAM** | https://tam.sa | Routes by **outcome/domain**, not department: Public engagement; Mass capabilities development; Digital transformation & CX; Innovation & entrepreneurship; Delivery acceleration. Serves *"public and private sectors."* Hero: *"Transforming Challenges into Lasting Impact."* Has AR; default shown EN/LTR. | Saudi proof that **outcome-led routing** works for gov + enterprise buyers. Supports Layan's outcome-shaped intent labels. | Some labels are consultant-abstract ("Delivery acceleration"). Muse's intents must stay concrete and self-evident. | VERIFIED |
| **Intellias Saudi** | https://intellias.com/intellias-saudi/ | **Local operational legitimacy stack:** *"We operate within the local business ecosystem in a fully established legal entity," "7+ years in Saudi Arabia,"* two Riyadh offices, *"Vision 2030 support,"* government eHealth work. Hero: *"Powering Saudi Arabia's leap into a digital-first future."* EN/AR. | Blueprint for **trust without a logo wall**: legal entity, physical presence, years-in-KSA, Vision 2030 alignment. Directly informs "Why Muse". | These are true, verifiable facts *for Intellias*. Muse states only what is real (real entity, real Riyadh presence); never borrow gov-trust claims it hasn't earned. | VERIFIED |
| **Salla** | https://salla.com/ | **RTL/Arabic-first as default**, EN via toggle. Hero: *"سلة.. تجارة ذكيَّة وسهلة."* CTA *"أنشئ متجرك مجانًا."* Trust **without logos**: usage stats + named merchant stories + *"شركاء النجاح"* (Success Partners). | Proof that **AR-primary/RTL-default is fully credible** in-market, and that trust can come from real usage + named stories rather than corporate logos. | Nav is service-led (opposite of Muse's model). Borrow the RTL-default posture + trust approach, not the IA. | VERIFIED |
| **Zid** | https://zid.sa/ | Hybrid nav (service solutions + audience segmentation). RTL/Arabic default, EN at `/en/`. Hero: time-to-outcome — *"أنشئ متجرك الإلكتروني … وابدأ البيع في 24 ساعة."* Trust via metrics + named merchant cases, **no logo wall**. | Time-to-outcome headline is strong; shows a hybrid IA under which a capability layer can sit. | Its "intent" is really **persona segmentation** (who you are), not goal routing (what you want). Muse must route by **goal**, not persona. | VERIFIED |
| **Lucidya** | https://lucidya.com/ | Nav leads **Solutions by outcome** ("by Teams": Marketing & Brand, Customer Service, Research & Insights; then "by Industry"); Products second. Hero: *"Turn complex data into clear actions with real-time AI insights."* EN/AR. | Models **outcome-led entry with capability detail underneath** — Muse's intent-over-capability hierarchy. | Heavy trust stack (40+ logo carousel, G2/ISO/SOC 2). Enterprise-SaaS proof a new studio shouldn't replicate. | VERIFIED |
| **Wavespace (Riyadh)** | https://www.wavespace.agency/locations/ui-ux-agency-in-riyadh | Closest **Saudi product-studio** analog. Service nav; body segments by audience-intent (*"Early & Funded startups," "Enterprise & scale-ups," "Government & semi-government," "Regional expansion teams"*). Local anchor: *"UI UX design agency in Riyadh, built for Vision 2030 products."* CTAs *"Book your call," "Book a 30-min call."* | Direct competitor pattern: capability nav + segmented body + Vision-2030 anchor; shows how a studio frames MVP/AI-MVP routes and a book-a-call ending. | Two anti-patterns: a **logo wall + "550+ companies"** claim, and an **English-only page with no AR toggle** despite claiming bilingual work. Muse must *ship* AR/RTL, not assert it. | VERIFIED |

### 1.2 Global sources

| Source | URL | Observed pattern (+ verbatim) | Relevance | Adaptation boundary | Verified |
|---|---|---|---|---|---|
| **thoughtbot** | https://thoughtbot.com | Homepage splits **capabilities** (Product Management; UX/UI & Product Design; MVP Development; AI/ML; Platform Engineering; Team Augmentation) from **how-we-work** authority. Hero *"When the stakes are high, experience matters."* CTAs *"Let's talk," "Let's get started!"* | Confirms the capability layer can sit distinct from the "who we are / how we work" layer — Muse's capabilities-support-intents split. | Still carries a client **logo wall** + case-study proof a new studio lacks. Borrow the split, not the proof scaffolding. | VERIFIED |
| **thoughtbot Playbook** | https://thoughtbot.com/playbook | Public methodology as authority. Divisions with outcome subtitles: **Strategy** — *"Ensure you're building the right thing"*; **Design Craft** — *"Build trust with users by focusing on visual detail"*; **Implementation** — *"Build for scale, performance, and best practices."* Creative Commons. | Strongest "how we work as trust" pattern for a firm with limited public proof — publish method instead of borrowing logos. Informs "Our approach". | Product of 15+ yrs. Muse publishes an honest, lighter method; don't fake a decade of depth. | VERIFIED |
| **MetaLab** | https://www.metalab.com | Extreme **hero discipline**: *"We make interfaces."* One supporting paragraph, no CTA clutter. | Model for a terse, declarative hero above the intent router — let routing carry the page. Supports Territory-A restraint. | MetaLab can be this terse because the brand is known; a new studio needs one more line of context but should still resist clutter. | VERIFIED |
| **Instrument** | https://www.instrument.com/contact/ | Contact page is a **pure intent router** — 4 parallel paths, no shared form: *"START A PROJECT," "WRITE US A NOTE," "Join the Team," "PRESS & MEDIA."* Heading *"Get in touch."* Start-a-project intro: *"Tell us about your project … we'll put you in touch with the right team."* Fallback partnerships@. | Exact model for Muse's ending: separate business intent from careers/press, and offer a lighter "note" path beside the heavier "start a project" path → maps to book-a-call vs write-to-us. | Don't copy the marquee client roster. Keep the intent split, not the proof. | VERIFIED |
| **Cuberto** | https://cuberto.com/contacts/ | Single-screen **selection-driven intake**. *"I'm interested in…"* chips (Site from scratch / UX/UI / Product design / Webflow / Motion / Branding / Mobile). *"Project budget (USD)"* ranges (10-20k … >100k). *"Add attachment."* Submit *"Send request."* | Closest live analogue to `/start`: intent via **tap-to-select chips (preselectable)** + one scope question on a single screen. Fits "max two screens." | Explicit USD tiers read transactional; a consultative Saudi studio should **omit/soften budget** and drop the playful tone if it wants gravitas. | VERIFIED |
| **Netguru — Estimate** | https://www.netguru.com/estimate-project | Server shell only: *"We're here to help." / "Let us know your needs – please fill in the form."* Fallback *"send your RFP or inquiry via hello@netguru.com."* Multi-step estimator is JS-rendered; steps not exposed. | The **email/RFP fallback** is a good skip-to-contact escape hatch for `/start`. | Cannot recommend copying step specifics not seen; do not reconstruct their flow. | COULDN'T VERIFY (flow client-rendered) |
| **Musemind** | https://musemind.agency | Traditional agency layout. Hero *"Leading Global UX Design Agency."* Services listed **by name** with benefit lines. CTAs *"Contact us," "Book a Quick Call."* | Counter-evidence: even a studio cited as "problem-first" actually leads capability-first — true intent routing is rare and differentiating. | Don't emulate *"Leading Global … Agency"* superlatives — unearned and tonally off for a new Saudi studio. | VERIFIED |
| **The Octalysis Group** | https://octalysisgroup.com | Gamification framed as **outcomes**, not mechanics. Hero *"Innovative Gamification Through Behavioral Science."* Outcome labels: Loyalty, Employee Engagement, Digital Transformation, Health & Wellness, L&D. | Models Muse's Gamification & Experience capability: sell **behavior change / results**, never points-and-badges. | Homepage leans on impact metrics (Revenue/KPI increase). Muse shouldn't display outcome metrics it can't substantiate. | VERIFIED |
| **Octalysis framework (Yu-kai Chou)** | https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/ | The 8 Core Drives (Epic Meaning; Development & Accomplishment; Empowerment of Creativity & Feedback; Ownership; Social Influence; Scarcity; Unpredictability; Loss & Avoidance). Framing: *"Human-Focused Design,"* explicitly beyond *"points, badges, and leaderboards."* | Source vocabulary for the gamification pitch — motivation/behavior language. | Academic/framework-heavy; translate to plain client-outcome language, don't lecture the framework. | VERIFIED |
| **DEPT / ustwo / Clay / Fantasy** | deptagency.com · ustwo.com · clay.global · fantasy.co | **DEPT:** intent/solution-led homepage incl. a first-class **"AI Transformation"** solution. **ustwo:** value-first hero *"Digital products people stick with,"* no guided flow. **Clay:** no routing — single `hey@clay.global` mailto + ~20-logo wall (anti-pattern). **Fantasy:** ~3 equal pillars (AI Strategy & Execution, Product Innovation, Brand & Identity), *"Let's talk."* | DEPT confirms **AI Transformation as a first-class intent**; Fantasy confirms **~3 pillars** is a digestible first-screen count; Clay is the low-conversion mailto default Muse should beat. | All lean on logo walls/tenure a new studio can't. Fantasy's pillars don't actually route — Muse should go further and **preselect** from them. | VERIFIED |

**Not reached / excluded from evidence:** work.co/contact (redirect/404), hanno.co/start (404), ueno.co
(403), sa.gov.sa (DNS failure), ramotion/clay contact (email-gate only). None used as evidence.

---

## 2. Synthesis — patterns Muse should borrow

### 2.1 For the intent homepage
1. **Verb-first, goal-based routing at the top** is the rarest, most differentiating pattern in-market.
   Only **Unifonic** runs true verb-led nav locally; **TAM** and **DEPT** route by outcome. Muse's
   *build / improve / explore-AI* sits in that best-in-class minority. (Unifonic, TAM, DEPT)
2. **Keep it to ~3 intents.** Fantasy, DEPT's core set, and thoughtbot's 3-part method converge on three
   digestible choices. Resist AZM X's eight abstract doors.
3. **Disciplined, declarative hero above the router** (MetaLab, thoughtbot) — a terse hero lets routing
   carry the page. Backs Layan's Territory A.
4. **Trust without a logo wall** — the single most important adaptation boundary. **Salla** and **Zid**
   prove the local playbook: real usage + named-partner stories + a "Success Partners" idea instead of
   corporate logos. (For Muse today: honest presence facts, not stats it lacks.)
5. **Local operational legitimacy, honestly stated** (Intellias Saudi): real entity, Riyadh, Vision 2030
   — claim only what is true. Feeds "Why Muse".
6. **"How we work" as authority** (thoughtbot Playbook): publish an honest, lighter method to earn
   credibility without a track record. Feeds "Our approach".
7. **Capabilities support intents, never compete with them** (thoughtbot, Lucidya): outcomes/intents
   first, capabilities underneath. Gamification framed as behavior/outcomes (Octalysis), never mechanics.

### 2.2 For the `/start` guided flow
1. **Route intent before the form** (Instrument): pick the path first; the lighter "write us a note"
   path *is* the skip-to-contact escape hatch beside the heavier "start a project → book a call". Maps
   1:1 to Muse's book-a-call vs write-to-us ending.
2. **Screen 1 = tap-to-select chips, not typed fields** (Cuberto): 3-7 preselectable toggles; if the
   visitor already clicked an intent on the homepage, carry it in pre-selected.
3. **Screen 2 = light qualification + free text**, then submit to the chosen outcome. Two screens max.
4. **Always offer an email fallback** (Netguru, Instrument) for people who won't do a form.
5. **Soften/defer budget** — Cuberto's explicit USD tiers read transactional; a consultative Saudi
   studio should omit budget from `/start` (also required by Layan: no pricing anywhere in the flow).

### 2.3 Guided-flow teardowns (only what was actually reached)
- **Instrument (VERIFIED):** Step 0 router (Start a project / Write us a note / Join / Press) → branched
  forms; email fallback on each. Model for the two-outcome ending chosen up front.
- **Cuberto (VERIFIED):** one screen — interest chips → budget range → free text + attachment → *"Send
  request."* The chips-for-intent + one-scope-question core fits max-two-screens.
- **Netguru (COULDN'T VERIFY):** intro + `hello@netguru.com` fallback only; steps behind JS. The
  reusable, verified takeaway is the email/RFP fallback.

---

## 3. Claim-truth audit (Muse artifacts & statements)

Governing rule (Vault, *Website Voice*): **"We do not claim what is not decided."** No client
names/logos/quotes/results; no pricing; no capability claims we cannot show; no publishing history we
don't have; **Arabic is shown, not claimed.** Full audit and honest alternatives also live in the plan
file §5; summarized here against Layan's proposals.

| Layan proposal / statement | Verifiable in repo/vault? | Verdict | Honest alternative |
|---|---|---|---|
| **From the studio: Muse Experiments (open source)** | No repo/link/code reference | **NOT LIVE** | Omit at launch; add a slot only when a real public repo exists. |
| **From the studio: Tenet (early access)** | No product/route/link anywhere | **NOT LIVE** | Omit; do not name an unshipped product. |
| **From the studio: Notes (our writing)** | `/notes` absent; `insights`/`playbooks` **retired → 301 `/explore`** in `next.config.ts` | **NOT LIVE** | Omit, or point to `/newsletter` (real) as where writing lands. |
| **From the studio: "How we built this site"** | No such page/article | **NOT LIVE** | Omit at launch; a genuine candidate to author later (it would be true). |
| **"From the studio" as a grid of slots for future client work** | Structure is fine; content is the issue | **OK as structure** | Build the section to render **only** live items; if none qualify, it does not render. No placeholders. |
| **"Genuinely Saudi and in Riyadh" ("Why Muse")** | TRUE (Vault Positioning; `/about`) | **OK** | State plainly (Intellias-style honest legitimacy, minus unearned gov claims). |
| **Specialist depth in AI & engagement design** | Backed by two signature service pages | **OK** | Signature treatment on AI + Gamification capabilities. |
| **Five capabilities on their own pages** | Only **3** service pages exist | **PARTIAL** | Keep 5 in the band; author 2 **honest, proof-free** pages (Strategy & Discovery, Design). |
| **Guided `/start` conversation** | `/get-started` is a revenue-band qualification form | **MISMATCH** | Build `/start`; retire the form; reuse `/api/get-started` honest delivery. |
| **Playbooks / insights as proof** | **Retired in code** (301 → `/explore`) | **DO NOT USE** | Do not resurrect or cite; the Vault's `Website.md` note here is stale vs. code. |
| **Any pricing / packages / timelines** | Vault: not decided; forbidden in flow | **NOT ALLOWED** | None on the site or in `/start` (Layan agrees). |
| **Client logos / testimonials / case-study metrics** | Removed 2026-08-01; none real | **NOT ALLOWED** | Trust via honest presence + craft of the site itself. |

**Net:** the intent/capability architecture and the "Why Muse" / "Our approach" content are truthful and
buildable now. The only material honesty risk is **"From the studio"**, which must ship live-only or be
cut, and the **five-capabilities** claim, resolved by authoring two proof-free pages.

---

## 4. Architecture recommendation & risks

### 4.1 Recommendation
Adopt Layan's model, validated by the evidence:
- **Homepage:** declarative Territory-A hero (MetaLab discipline) → **three verb-led intent cards**
  (Unifonic/DEPT rarity; Fantasy's ~3-count) → **five capabilities underneath** (thoughtbot/Lucidya
  hierarchy; Octalysis framing for gamification) → **"Our approach"** as published method
  (thoughtbot Playbook) → **"Why Muse"** as honest local legitimacy (Intellias, minus unearned claims) →
  **"From the studio"** live-only slots → buying-question FAQ → **"Start a conversation."**
- **Conversion:** a `/start` router-first flow (Instrument) with chip-based, preselectable Screen 1
  (Cuberto), a light Screen 2, book-a-call **or** write-to-us ending, and an always-visible
  email/skip-to-contact fallback (Netguru/Instrument). Two screens max, no budget/pricing.
- **Trust posture:** Salla/Zid playbook adapted to Muse's reality — since Muse lacks usage stats and
  named clients, lead with honest presence facts and let the craft of the site itself carry proof.
- **Bilingual:** ship genuine AR/RTL (Salla/Unifonic prove it reads as credible locally); do **not**
  repeat Wavespace's "bilingual claim, English-only page" mistake.

### 4.2 Risks (and mitigations)
1. **Honesty gap in "From the studio"** (highest). Named artifacts don't exist. → Ship live-only or cut;
   never render placeholders. (Plan §5, §7.6.)
2. **Five-vs-three capabilities.** Claiming five with only three pages risks thin/fake pages. → Author
   two proof-free "what/how" pages from Vault substance; no metrics/clients. (Plan §8.)
3. **Intent watered down into persona segmentation** (the Zid/Wavespace trap). → Route strictly by
   **goal** (build/improve/explore-AI), not by who the visitor is.
4. **Superlative/borrowed-authority tone** (Musemind/Wavespace "leading/global/550+"). → Website Voice
   specificity test; ban unearned superlatives; no logo walls or metrics.
5. **Guided flow becoming a form** (the `/get-started` failure mode). → Router-first, chips, two screens,
   no budget; email fallback; honest delivered/undelivered success copy.
6. **RTL / mixed-direction defects** in `/start` inputs and intent cards. → Deterministic EN+AR probes,
   overflow checks, `dir="ltr"` on email/phone, `.arrow-inline` mirroring. (Plan §12.)
7. **Link/redirect drift** when `/get-started` is retired. → Single-hop 308 to `/start` + full internal
   link + sitemap sweep. (Plan §10.6.)

---

## 5. Sources index
Saudi/GCC: AZM X (azmx.sa), Unifonic, TAM, Intellias Saudi, Salla, Zid, Lucidya, Wavespace (Riyadh).
Global: thoughtbot (+ Playbook), MetaLab, Instrument, Cuberto, Netguru*, Musemind, The Octalysis Group,
Yu-kai Chou, DEPT, ustwo, Clay, Fantasy. (*COULDN'T VERIFY the flow.)
