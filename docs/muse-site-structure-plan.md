# Muse Site Structure Plan

Working doc for the full muse.sa site, bilingual EN/AR. Abdullah reads this, picks
per line/section, then Sonnet implements. Written 2026-08-04 off the reference bank
(`docs/copy-reference-bank.md`) and the three research files.

**Reading rules, enforced throughout.**
- No line is invented. Every proposed line is either (a) verbatim from a real site
  (marked *verbatim, source*), (b) a stated near-adaptation (marked *adapted from X:*
  with the original shown), or (c) copy Muse already ships (marked *current*). Where
  nothing honest fits, the slot is marked **EMPTY** rather than padded.
- Arabic is written natively, never translated from the English. MSA spine for
  headings/labels/service names, Saudi spoken for body/CTAs, 1–2 markers per paragraph
  (`عشان وش مو اللي بس`), straight quotes only, no dashes, Western numerals. Per
  `Arabic Termbase.md`.
- **No claims not decided** (per `Website Voice.md#We do not claim what is not decided`):
  no client names/logos/quotes/results, no pricing on the site, no team-size claims we
  cannot field, no publishing history, and Arabic capability is *shown, not claimed*.
  Several of the sharpest borrowable lines are claims their owner earned and Muse has
  not. Those are flagged EMPTY-until-decided, not proposed as live copy.
- Tenex is US (NYC). Borrow its *mechanics* (short, specific, opinionated, two-tier CTA,
  marquee band), never its lines. Its lines are commitments Tenex made; copied across
  they become promises Muse has not decided.

---

## 1. Site map

Priority order = order a stranger meets us, and the order to build (section 7).

| # | Route | Purpose (one line) | Borrowed thinking |
|---|---|---|---|
| 1 | `/` (landing) | One scroll that turns a stranger into a lead: thesis → what we do → why now → who for → answer objections → act. | tenex homepage arc (hero → approach cards → ultimatum → marquee); mozn "outcomes, not tools"; zto audience-identity band |
| 2 | `/explore` (services overview) | The full version of the 3 approach cards, so a buyer can pick one door or combine. | tenex 3 approach cards + two-tier "Learn more → Get Started"; mozn "we deliver outcomes, not just tools" intro |
| 3 | `/services/ai-transformation` | Deep page for the flagship service: what, how, why us, what we do. | mozn solution-page arc (hero → what we do → approach → why → FAQ) |
| 4 | `/services/product-engineering` | Same arc, engineering. | as above |
| 5 | `/services/gamification` | Same arc, adoption/experience. | as above |
| 6 | `/about` | Who we are and why now, without inflation or fake proof. | zto about arc (hero → Why us? moment-framing → who we build for → how we work); lean category-owning "the" pattern (flagged) |
| 7 | `/careers` + `/careers/[slug]` | Turn a candidate into an applicant; role list + human fallback. | tenex "Come make history" dare (flagged) + "say hi anyway"; salla "نبحث عن الأفضل" and origin line; mozn "join the team building X" + know-how problem |
| 8 | `/contact` | Fastest path to a human, no sales layer. | zto conditional CTA; tenex human@ email; (mozn 2-tier CTA deliberately NOT used — see page) |
| 9 | `/get-started` | Structured intake for a scoped project. | tenex "Ready to [brand] your business?" brand-as-verb (already adopted); salla immediate-value bullets |
| 10 | `/newsletter` | Subscribe to the field notes. | thmanyah "تغنيك عن" value-prop, "زائد:" device, evocative product naming |
| 11 | `/privacy`, `/terms` | Legal. Leave as-is. | salla footer lists these as first-class |
| — | **cut:** `/playground`, `/playground/dither`, `/hero-preview`, `/preview`, `/preview/hero-dither` | Dev/preview routes. Not production. | see section 4 |

**Open question on a Work/Case-studies page:** not in the map yet, on purpose. No
delivered client work can be claimed (`Website Voice.md`). See section 6.

---

## 2. Per-page section plans

Format per section: **purpose** · **EN** · **AR** · **hover/desktop** · **mobile**.
Where a line already ships, it is marked *current* and kept unless a refinement is noted.

### 2.1 Landing (`/`)

#### S1 — Hero (keep Abdullah's described build, refine copy)
- **Purpose:** thesis in one screen; the pixel-plastic dither is the personality.
- **EN:**
  - Line 1 (highlight, white bg / black text): "Everyone has an AI strategy." *(current)*
  - Line 2 (highlight): "Almost nobody has shipped one." *(current)*
  - Bottom line 1: "We're a product team in Riyadh." *(current)*
  - Bottom line 2 (smaller): "We actually build the thing, not just the deck about the thing." *(current)*
  - CTA: "Get in touch" *(current)*
- **AR:**
  - Line 1: "الكل عنده استراتيجية للذكاء الاصطناعي." *(current)*
  - Line 2: "بس قليل جدًا اللي قدر ينفذها." *(current)*
  - Bottom 1: "احنا فريق منتجات في الرياض." *(current)*
  - Bottom 2: "نفكر، نصمّم، ونبني الشيء نفسه، لا العرض التقديمي عنه." *(current)*
  - CTA: "تواصل معنا" *(current)*
- **Refinement note:** copy is already Abdullah's own and passes the specificity test.
  Only refine if the dither/highlight timing changes. Do not swap in any tenex hero line.
- **Desktop:** dither does pixel-blast on click; arrow points at the CTA (hand-drawn/animated).
- **Mobile:** no arrow; dither reacts to tap (single blast, reduced particle count); CTA full-width.

#### S2 — Approach + 3 cards (keep)
- **Purpose:** name the shift and the three doors.
- **EN heading:** "Muse helps you shift from AI-absent to AI-native." *(current — eyebrow "Our approach")*
  - Cards: AI Transformation / Product Engineering / Gamification & Experience, bodies *current*.
- **AR heading:** "ناخذك من شركة \"تستخدم\" الذكاء الاصطناعي، إلى شركة تبنيه." *(current; note the scare quotes on تستخدم carry the argument — see `Arabic Termbase.md#The coined pair`)*
- **Desktop:** card hover raises + reveals its verb CTA (per-service verb, section 3).
- **Mobile:** cards stack; CTA verb always visible (no hover reveal).
- **Note:** "AI-absent to AI-native" is tenex's coined pair in EN. See section 6 decision.

#### S3 — Manifesto (keep, it is Muse's own)
- **Purpose:** the "why now" worldview.
- **EN:** "The next decade of software gets decided in the next two years." + 3 paragraphs *(current)*.
- **AR:** "عصر المنتجات الرقمية يتحدّد خلال السنتين الجاية." + paragraphs *(current)*.
- **Borrowed idea (structure only):** this is Muse's version of tenex's decade-worldview
  band and zto's "a moment that doesn't repeat itself." Keep Muse's line; do not import theirs.
- **Desktop/Mobile:** static type block, generous rhythm. No hover.

#### S4 — Who we build for (NEW — borrow zto audience-identity)
- **Purpose:** name the reader by role; makes the page feel written *for them*.
- **EN:** "The teams we work with aren't a general audience. They're founders shipping a
  first product, and operators trying to get an AI initiative out of pilot purgatory."
  *(adapted from zto.sa/en/about: "Our readers aren't a general audience. They're founders
  building private companies, investors allocating capital..., and executives and
  institutions..." — role nouns reused from Muse's own FAQ line)*
- **AR:** "الفرق اللي نشتغل معها مو جمهور عام. هم مؤسّسون يطلقون منتجهم الأول، ومسؤولون
  يحاولون يطلعون مبادرة ذكاء اصطناعي من مرحلة التجريب التي لا تنتهي." *(native; "مرحلة التجريب
  التي لا تنتهي" is the termbase rendering of pilot purgatory; markers: اللي، مو)*
- **Desktop:** the two role-nouns ("founders" / "operators") get the highlight-marker
  treatment on scroll-in (same effect family as the hero, dialed down).
- **Mobile:** highlight fires once on first view; no re-trigger on re-scroll.

#### S5 — Outcomes band (NEW — borrow mozn conviction line)
- **Purpose:** one-line objection kill between the soft middle and the FAQ.
- **EN:** "We deliver outcomes, not just tools." *(verbatim, mozn.ai)*
- **AR:** "كل مشروع ينتهي بشيء يعمل فعليًا، لا بعرض تقديمي." *(current Muse line — it already IS
  the outcomes-not-tools idea in Muse's voice; reuse rather than translate mozn)*
- **Desktop:** full-width, large, centered; the "not just tools" clause set in the
  accent. No hover.
- **Mobile:** same, single column.

#### S6 — Objection reframe / pressure (keep)
- **Purpose:** Muse's own version of tenex "AI isn't scary. Ignoring it is."
- **EN:** "AI isn't optional." / "Waiting is the risk." *(current)*
- **AR:** "تبنّي الذكاء الاصطناعي مو خيار." / "والانتظار هو الخطر." *(current)*
- **Note:** this section already executes the tenex reframe mechanic honestly. Do not
  add tenex's line on top of it.
- **Desktop:** the second line ("Waiting is the risk.") is the emphasised, shorter one
  (per `Arabic Termbase.md`). Reveal-on-scroll.
- **Mobile:** stacked, emphasis preserved.

#### S7 — Marquee band (keep the ticker mechanic; fix the content honesty)
- **Purpose:** tenex's full-width repeating marquee — slogan + social proof in one.
- **Current line:** "Built for the AI-native era" *(current ticker)*.
- **The tenex band is "Built by builders, trusted by leaders."** Do NOT adopt it: "trusted
  by leaders" is a client-trust claim Muse cannot make yet.
- **Honest Muse marquee options (pick one, section 6):**
  - Keep current: "Built for the AI-native era" *(current)*.
  - "Nothing ships that we wouldn't use ourselves" *(current — About ticker; a commitment,
    not a client claim; strongest of the three)*.
  - "Built by Saudi minds. To a global standard." *(adapted from tamkeentech.sa "Digitizing
    Innovation Developed by Saudi intelligent minds" + Muse's own "Riyadh-built. Globally
    standard.")*
- **AR:** "مبنيّ لعصر الذكاء الاصطناعي" *(current)* / or "لا نطلق ما لا نستخدمه نحن" *(current)* /
  or "صُنع في الرياض. بمعيار عالمي." *(current)*
- **Desktop:** infinite horizontal marquee, slow, pauses on hover.
- **Mobile:** marquee runs at reduced speed; static fallback under reduced-motion.

#### S8 — Two-audience line (NEW, flagged — borrow salla)
- **Purpose:** the "X for dreamers, Y for sellers" two-audience hook.
- **EN (flagged):** "Built for founders. Trusted by operators." *(adapted from salla.com/en:
  "Built for dreamers. Trusted by sellers.")* — **risk:** "Trusted by operators" reads as a
  client claim. Safe variant: "Built for founders. Built for operators."
- **AR:** "مبنيّ للمؤسّسين والمشغّلين على حد سواء." *(native, safe variant)* / flagged variant:
  "مبنيّ للمؤسّسين. موثوق من المشغّلين." *(risk: same trust-claim issue)*
- **Recommendation:** use the safe "Built for founders. Built for operators." until there
  is proof. See section 6.
- **Desktop/Mobile:** short centered band, can share the S5 slot if the page is long.

#### S9 — FAQ (keep)
- **EN:** "Questions? We have answers." + 5 items *(current)*.
- **AR:** "أكيد عندك أسئلة." + 5 items *(current)*.
- **Desktop:** accordion; one open at a time; chevron rotates on open.
- **Mobile:** accordion, full-width tap targets.

#### S10 — Final CTA (keep)
- **EN:** "Tell us what you're trying to build." / sub: "The first conversation is with the
  people who would build it, not a sales layer." / "Get started" *(current)*.
- **AR:** "علّمنا وش المشكلة اللي تواجهها، واترك بناء الحل علينا." / "أول محادثة تكون مع اللي
  بيشتغلون عليه، مو مع فريق مبيعات." / "ابدأ الآن" *(current)*.
- **Desktop:** the "not a sales layer" clause is the differentiator; keep it.
- **Mobile:** button full-width.

**Proof-as-story (salla "When commerce peaks, Salla keeps moving"):** **EMPTY** — Muse has
no proof story or peak-load stat. Do not fabricate one. Reserve the slot for the first
real shipped product (see section 6, Ventures-as-proof).

---

### 2.2 Explore / services overview (`/explore`)

Structure borrowed from tenex's 3 approach cards with the two-tier CTA. Currently the page
is a bare hero — this fills it out.

#### S1 — Hero (keep, add mozn conviction sub)
- **EN:** "What we build." / sub *(current)*: "Three ways we help teams move at startup
  speed. Pick one, or combine all three." — optional add-line: "We deliver outcomes, not
  just tools." *(verbatim, mozn.ai)*
- **AR:** "ما الذي نبنيه." / "ثلاث طرق نساعد فيها الفرق تتحرك بسرعة الشركات الناشئة. اختر
  وحدة، أو اجمعها كلها." *(current)* — optional add: "نسلّم أثرًا، لا مجرد أدوات." *(adapted from
  mozn "outcomes, not just tools"; native — flag to reviewer)*
- **Desktop/Mobile:** static hero.

#### S2 — The three cards, full (NEW layout — tenex approach cards)
- **Purpose:** each of the 3 services as a card with summary + two-tier CTA.
- **Per card content** *(all current, from `lib/content`)*:
  - AI Transformation — summary "Your AI strategy, executed all the way to production, not
    just decked." CTA verb "Plan the transformation" / "خطّط للتحوّل".
  - Product Engineering — "Production-grade software, shipped fast, without dropping the
    quality bar." CTA "Build the product" / "ابنِ المنتج".
  - Gamification & Experience — "Turn adoption into something people actually want to do."
    CTA "Design the experience" / "صمّم التجربة".
- **Two-tier CTA per card (borrow tenex):** "Learn more" → the service page, and "Get
  started" → intake. EN "Learn more" *(verbatim mechanic, tenex.co)* / AR "اعرف أكثر"
  *(native; do not use تعرف على المزيد corporate register)*.
- **Desktop:** card hover raises, image parallax, verb CTA underline draws in.
- **Mobile:** stacked; both CTAs visible; no parallax.

#### S3 — Final CTA (shared global CTA)
- Reuse S10 global CTA. Same copy.

---

### 2.3 Service pages (`/services/[slug]`)

All three share the mozn solution-page arc: **hero → why you need us → what we do →
approach/beliefs → why work with us → (NEW) FAQ → CTA**. Most content already exists in
`lib/content`. Additions are marked NEW.

#### Shared section order
1. **Hero** — title + summary *(current per service)*. CTA = the service verb.
2. **Why you need us** — `whyHeadline` + `whyReasons` *(current)*. This is the mozn "why
   MOZN leads" / tenex "hiring in-house is slow, risky, and important" slot.
3. **What we do** — `whatWeDoHeadline` + `whatWeDo` cards *(current)*.
4. **Approach / what we believe** — `approachHeading` + pillars *(current)*.
5. **Why work with us** — `whyWorkWithUs` cards *(current; AI-transformation lacks this —
   optional to add, or leave asymmetric)*.
6. **FAQ (NEW, per service)** — 3–4 questions scoped to that service. Borrow lean "What
   sets Lean apart?" question-as-heading shape. **Content: EMPTY** for now — draft from the
   service's real scope, do not import generic Q&A. Only build once Abdullah signs off the
   questions.
7. **CTA** — global CTA, but the button verb is the service verb (per-service CTA
   discipline, already in place).

#### Per-service specifics (all *current* unless noted)

**AI Transformation** — the mozn "forward-deployed" delivery line is a natural fit for the
"what we do" intro. Borrow (flagged, adapt): mozn "Our engineers work inside your
environment, not from a distance... proving value in weeks, not quarters."
- **EN (adapted):** "We run it with you, from the first audit to systems in production."
  *(current `whatWeDoHeadline`)* — already the honest Muse version; keep it, do not import
  mozn's "150 enterprise clients" framing.
- **AR:** "نشتغل معك، من أول مراجعة إلى أنظمة تعمل فعليًا." *(native; adapted from current
  `whatWeDoHeadline`; markable to reviewer)*.

**Product Engineering** — mozn AR forward-deployed line is directly borrowable as the "why
work with us" intro:
- **EN:** "We work inside your team, not from a distance." *(current `whatWeDoHeadline`; near-
  identical to mozn "Our engineers work inside your environment, not from a distance" —
  attribute the pattern to mozn.ai)*.
- **AR:** borrow the shape of mozn AR "يعمل مهندسونا داخل بيئتك التشغيلية... خلال أسابيع بدلاً
  من أشهر" → Muse native: "نشتغل جوّا فريقك، مو من بعيد." *(adapted from mozn.ai/ar; native)*.

**Gamification & Experience** — no external borrow needed; content is Muse-specific and
strong. Keep *current*.

- **Desktop (all service pages):** sticky sub-nav (Overview / Why / What we do / FAQ);
  cards hover-raise; per-service accent color.
- **Mobile:** sub-nav collapses to a scroll-spy pill row or is dropped; cards stack.

---

### 2.4 About (`/about`)

Restructure toward the zto about arc: **hero → Why Muse? (moment-framing) → who we build
for → how we work → team → careers teaser**. Keep Muse's existing honest content; add the
zto moment-framing section. Drop nothing that is real.

#### S1 — Hero (keep)
- **EN:** eyebrow "About Us" / "Riyadh-built. Globally standard." / "A product company
  working with businesses that want it built properly." *(current)*.
- **AR:** "من نحن" / "صُنع في الرياض. بمعيار عالمي." / "شركة منتجات رقمية، نشتغل مع الشركات اللي
  تريد منتجها مبني صح." *(current)*.
- **Lean category-owning "the" pattern (flagged):** lean owns "The digital enabler of
  healthcare in Saudi Arabia." Muse has no category to own honestly yet. Do **not** mint a
  fake "The [X] of [Y] in Saudi Arabia" line. See section 6.

#### S2 — Why Muse? / the moment (NEW — borrow zto moment-framing)
- **Purpose:** situate Muse in the Saudi software moment without cliché.
- **EN (adapted):** "Saudi Arabia's economy is going through a moment that doesn't repeat
  itself. Companies are being built from scratch, and a generation of founders and
  operators is building something genuinely new. Most of what gets shipped still isn't
  built to a standard that lasts. That's the gap Muse was built for." *(first two sentences
  adapted from zto.sa/en/about verbatim lines; the last two are Muse's own thesis restated,
  no new claim)*.
- **AR:** "يمرّ الاقتصاد السعودي بمرحلة نوعية لم تتكرر مسبقًا. شركات تُبنى من الصفر، وجيل من
  المؤسّسين والمشغّلين يبني شيئًا جديدًا فعلًا. لكن أكثر ما يُطلق لسه مو مبني بمعيار يبقى. وهنا
  وُجدت Muse." *(hero-half adapted verbatim from zto.sa/من-نحن: "يمرّ الاقتصاد السعودي بمرحلة
  نوعية لم تتكرر مسبقًا"; rest native; markers: لسه، مو — flag to reviewer, especially "لسه"
  which is spoken and may be one marker too many)*.
- **Desktop/Mobile:** editorial block, no hover.

#### S3 — Who we build for (NEW — same as landing S4, or link)
- Reuse the zto audience-identity line (landing S4). On About it can run longer with the
  investor/executive role-nouns if Muse wants — but keep to roles Muse actually serves.

#### S4 — How we work / tabs (keep)
- **EN:** tabs About / Mission / Vision / Values + beliefs carousel *(all current)*.
- **AR:** نبذة / رسالتنا / رؤيتنا / قيمنا + "ما نؤمن به" *(current)*.
- **Desktop:** tab switch is instant; beliefs carousel has prev/next; values hover-reveal copy.
- **Mobile:** tabs become a horizontal scroll or accordion; carousel is swipeable.

#### S5 — Team / leadership (keep, watch the claim line)
- **EN/AR:** Abdullah + Mohammad bios *(current)*. **Note:** the site must not claim team
  size or roles it cannot field (`Website Voice.md`). Two named real founders is fine;
  don't add "a team of N" anywhere.
- **Desktop:** cards with initials monogram; hover reveals role.
- **Mobile:** stacked.

#### S6 — Careers teaser (keep)
- **EN:** "We're a small team, growing carefully." + "View careers" *(current)*.
- **AR:** "فريق صغير، ينمو بعناية." + "تصفّح الوظائف" *(current)*.

#### S7 — Ticker (keep)
- "Nothing ships that we wouldn't use ourselves" / "لا نطلق ما لا نستخدمه نحن" *(current)*.

---

### 2.5 Careers (`/careers` + `/careers/[slug]`)

Borrow tenex's dare + human fallback, salla's origin + purpose lines, mozn's "join the team
building X" + know-how problem. Careers copy runs in the **spoken** register.

#### S1 — Hero (keep; consider the tenex dare, flagged)
- **EN (current):** "Come build with us." / "We're a small, senior team based in Riyadh.
  These are the kinds of roles we typically grow into, so reach out even if nothing below is
  an exact match."
  - **Bolder option (flagged):** "Come make history." *(verbatim, tenex.co careers)* +
    "This is your moment. Don't let it pass you by." — **risk:** tenex worldview, reads
    borrowed; "Come build with us" is the honest Muse version. Recommend keeping current.
- **AR (current):** "تعال ابنِ معنا." / subtitle *current*.
  - **Origin line (NEW — borrow salla):** "من قلب الرياض إلى العالم" *(adapted from
    jobs.salla.com: "من قلب مكة إلى العالم")* — strong, culturally resonant, and honest for a
    Riyadh studio. Recommend adding as a hero kicker or careers-page banner.
- **Desktop:** if the origin line is added, it gets the visually-stretched treatment salla
  uses (letter-spacing on العالم). Arrow/scroll cue to the roles.
- **Mobile:** origin line wraps to two lines; no stretch effect.

#### S2 — Why join / the problem (NEW — borrow mozn)
- **EN (adapted):** "Join the team building products people here actually use." *(adapted
  from mozn.ai/careers "Join the Team Building Intelligence")* + honest Muse problem
  statement — **do not** borrow mozn's "AI rocketship" or headcount lines.
- **AR:** "انضم للفريق اللي يبني منتجات الناس هنا تستخدمها فعلًا." *(native; adapted from mozn
  pattern; marker: اللي)*.
- **The "we hire for" portrait (borrow habbar mechanic, drop the classical word):** second-
  person portrait of the person, not a requirements list. EN: "We look for passion,
  curiosity, and depth, because skills can be built." *(verbatim, habbar EN)*. AR native:
  "ندوّر على الشغف والفضول والعمق، لأن المهارة تنبني." *(adapted from habbar; native; the
  banned نتفرّس is NOT used)*.
- **Desktop/Mobile:** editorial block above the role grid.

#### S3 — The claim line (NEW — borrow salla)
- **EN:** "We look for the best." *(adapted from salla "نبحث عن الأفضل")*.
- **AR:** "نبحث عن الأفضل." *(verbatim, jobs.salla.com — MSA spine, works as a heading)*.
- **Purpose line (borrow salla shape, keep honest):** salla's "فتح أبواب الرزق للتجار" is
  salla's cause, not Muse's. **Muse native purpose:** "نشتغل عشان نرفع مستوى اللي يُبنى في
  المملكة." *(adapted from Muse's own mission in `About`; native; marker: عشان، اللي)*.

#### S4 — Open roles grid (keep)
- **EN:** department filter + role cards + "View full JD" *(current)*.
- **AR:** فلتر الأقسام + "اطّلع على الوصف الوظيفي" *(current)*.
- **Human fallback (borrow tenex "say hi anyway"):** already covered by the hero's "reach
  out even if nothing below is an exact match." If a dedicated no-match CTA is wanted:
  EN "No exact match? Say hi anyway." *(adapted from tenex "say hi anyway →")* / AR "ما لقيت
  اللي يناسبك؟ سلّم علينا على أي حال." *(native; marker: اللي)*.
- **Desktop:** filter pills; card hover-raise; JD opens the detail route.
- **Mobile:** filter is a horizontal scroll; cards stack.

#### S5 — Role detail (`/careers/[slug]`) (keep)
- **EN:** Responsibilities / Requirements / Nice to have / "Apply for this role" *(current)*.
- **AR:** المسؤوليات / المتطلبات / يفضّل توفره / "تقدّم لهذه الوظيفة" *(current)*.

---

### 2.6 Contact (`/contact`)

Borrow zto's second-person conditional CTA and tenex's human@ email. Deliberately **not**
mozn's 2-tier "Get in touch / Contact sales" — Muse's whole pitch is "no sales layer," so a
"Contact sales" button would contradict the copy.

#### S1 — Hero (keep, add zto conditional)
- **EN (current):** "Let's talk." / "Tell us what you're building. We usually reply the same
  day."
  - **Conditional CTA line (NEW — borrow zto):** "If you're looking for a team to actually
    build the thing, not just deck it, talk to us." *(adapted from zto.sa/من-نحن: "إذا كنت
    تبحث عن شريك لتعزيز سردية شركتك وتمييزها في السوق، تواصل معنا")*.
- **AR (current):** "لنتحدث." / "قل لنا وش تبني، وغالبًا نردّ في نفس اليوم."
  - **Conditional line:** "إذا كنت تدوّر على فريق يبني الشيء نفسه، مو بس يسوي عرض عنه، تواصل
    معنا." *(adapted from zto verbatim conditional shape; native; markers: مو، بس)*.
- **Desktop/Mobile:** hero + method buttons.

#### S2 — Methods (keep)
- **EN:** WhatsApp / Email + "Or find us on" socials *(current)*.
- **AR:** واتساب / البريد الإلكتروني / "أو تجدنا على" *(current)*.
- **human@ email (borrow tenex mechanic):** tenex uses "human@tenex.co" as positioning.
  Muse currently uses info@muse.sa. **Recommendation:** consider "hello@muse.sa" or keep
  info@ — a "human@" address only works if it routes to a human. See section 6. WhatsApp is
  the primary channel per `Localization Playbook.md`.

#### S3 — Form (keep)
- **EN:** Name / Email / Company (optional) / Project type / Budget range / "What are you
  building?" / "Send message" *(current)*.
- **AR:** *current*.
- **Note:** budget *ranges* are collected on the form (private intake), which is different
  from publishing pricing on the site. That is allowed.

---

### 2.7 Get started (`/get-started`)

Already adopts the tenex brand-as-verb headline mechanic. Keep, add salla immediate-value
framing to the bullets if wanted.

#### S1 — Hero (keep)
- **EN:** "Ready to build with Muse?" *(current — Muse's honest version of tenex "Ready to
  Tenex your business?"; brand-as-verb mechanic borrowed, tenex line NOT used)* / subtitle
  *current*.
- **AR:** "مستعد تبني معنا؟" *(current)* / subtitle *current*.

#### S2 — Value bullets (keep, optional salla-style sharpening)
- **EN (current):** "Get a scoped plan for where AI actually removes friction..." / "Work
  directly with the senior team that builds it, not a sales layer" / "Scope the work to your
  actual bottlenecks, and see something running early."
  - **salla immediacy note:** salla repeats "start selling today" / "getting started has
    never been easier." Muse's honest immediacy is "see something running early" — already
    present. No change needed; do not promise same-day delivery.
- **AR:** *current bullets*.

#### S3 — Form (keep)
- Full intake form *(current)* — first/last name, work email, phone, company, revenue band,
  services, needs, how-did-you-hear.

---

### 2.8 Newsletter (`/newsletter`)

The single richest borrow here is thmanyah's "تغنيك عن" value-prop and the "زائد:" device.
The daily-coffee framing does **not** fit — Muse sends "when there's something worth
saying," not daily — so borrow the construction, not the ritual.

#### S1 — Hero (keep title, refine AR sub with "تغنيك عن")
- **EN (current):** "Get the field notes in your inbox." / "The same thinking that goes into
  the work, sent directly. No need to check back."
  - **Superlative pattern (flagged):** thmanyah owns "أفضل محتوى عربي على الإنترنت." Muse
    cannot claim "best." Do not adapt this into a superlative. See section 6.
- **AR (current):** "تصلك ملاحظاتنا الميدانية في بريدك." / sub *current*.
  - **"تغنيك عن" refinement (NEW — borrow thmanyah construction):** "تغنيك عن متابعة أخبار
    الذكاء الاصطناعي العامة، ونختار لك اللي يستحق." *(adapted from thmanyah نشرة أها!: "تغنيك
    عن التصفّح العشوائي لشبكات التواصل، وتختار لك من عوالم الإنترنت"; native; ritual/daily
    framing dropped because Muse is occasional)*.
- **Desktop/Mobile:** hero + form.

#### S2 — What you get (keep)
- **EN:** 3 points *(current)*: "One short, opinionated read..." etc.
- **AR:** 3 points *(current)*.
- **"زائد:" device (NEW — borrow thmanyah):** for future issue titles / a secondary-hook
  line in the archive, use "زائد:" as the kicker before a second angle. EN equivalent:
  "Plus:". *(verbatim device, thmanyah)*. Not a live section yet — note for the content
  engine.

#### S3 — Evocative product name (Open decision, section 6)
- The newsletter currently has no name. thmanyah names its products evocatively ("بين
  الخطوط", "مصدر مطّلع"). **Candidate names (all adapted from real thmanyah/lean lines):**
  - AR "بين الأنظمة" *(adapted from thmanyah "بين الخطوط" + lean "systems began to speak one
    language")* — "between the systems."
  - AR "مصدر مطّلع" *(verbatim thmanyah newsletter name — likely too close to reuse; listed
    for the register, not to copy)*.
  - EN "Field Notes" *(already implied by current copy)*.
- **Recommendation:** pick one AR name + keep "Field Notes" EN, or stay unnamed. See section 6.

#### S4 — Form (keep)
- Email + Subscribe + consent *(current)*.

---

### 2.9 Footer (global)

Borrow lean/salla trust pattern (local address + phone + Complaints), tenex human@ email
and worldview line, salla's first-class legal links.

- **Current:** blurb + "Get started" + "Reach out to us" + Riyadh location + Company/Explore
  columns + "© {year} Muse Studios. All rights reserved." + Privacy / Terms.
- **Add (borrow salla footer pattern):**
  - Local phone number — **only if one exists.** salla shows "+966 ...". **EMPTY** until Muse
    has a number to publish. Do not invent one.
  - Physical location line — Riyadh is present; a full address adds legitimacy (salla shows
    city + country). Keep "Riyadh, Saudi Arabia" *(current)*; a street address is optional.
  - **Complaints link (borrow salla GCC-transparency norm):** salla lists "Complaints" as a
    first-class footer item. **Recommendation:** only add if there's a real intake for it;
    otherwise a "Contact" link covers it. Flag, section 6.
- **Worldview footer line (borrow tenex mechanic):** tenex closes with "Stay on the right
  side of history." Muse's honest equivalent, reusing its own line: EN "We build the thing,
  not the deck about the thing." / AR "نبني الشيء نفسه، لا العرض التقديمي عنه." *(current
  hero line, reused as the footer worldview beat)*.
- **human@ email:** see Contact S2 and section 6.
- **Rights line:** "© {year} Muse Studios. All rights reserved." *(current)*. AR: keep the
  Latin "Muse Studios" per `Arabic Termbase.md#Muse stays Muse`.

---

## 3. Global interaction & mobile rules

### Dither hero
- Pixel-plastic background + large animated dither object. **Click (desktop) / tap (mobile)**
  triggers a pixel-blast. Mobile uses a single blast with a reduced particle budget for
  frame rate.
- **Reduced-motion:** dither renders as a static textured still; blast is disabled; no
  auto-animation. This is a hard requirement, not optional.

### Highlight effect (hero + role-noun reveals)
- White background / black text marker sweep on the two hero lines. Fires on load (hero) or
  on scroll-into-view (landing S4 role nouns), **once** — never re-triggers on re-scroll, to
  avoid a flickering page on mobile.

### Hover states
- **Cards (approach, services, roles):** raise + shadow + the per-service verb CTA underline
  draws in. Image cards get a subtle parallax on desktop only.
- **Links:** underline draws from the leading edge. In **RTL that leading edge flips to the
  right** — the underline must originate from the right in Arabic.
- **CTAs:** the primary button fills/darkens; the arrow-at-CTA on the hero is desktop-only.

### Arrow-on-desktop CTA
- Hand-drawn/animated arrow points at the hero "Get in touch" button on **desktop only**.
- **RTL:** the arrow mirrors — it points from the opposite side so it still aims *at* the
  button, not away from it. A naive mirror that points the arrow off-screen is the bug to
  avoid (`Localization Playbook.md`: icons with direction must mirror).
- **Mobile:** no arrow, either direction.

### Marquee / ticker
- Infinite horizontal scroll, slow. **Direction flips in RTL** (Arabic marquee travels the
  other way). Pauses on hover (desktop). Reduced-motion → static centered line.

### RTL mirroring (per `Localization Playbook.md`)
- Full layout mirror: nav, chevrons, carousels, progress, back gestures, sliders.
- Mixed-direction strings (Latin "Muse" / ChatGPT / phone numbers inside Arabic sentences)
  are where RTL bugs concentrate — test every one. Muse's wordmark stays Latin on every
  Arabic page, so this case is on almost every screen.
- Arabic runs shorter but taller — line-height/vertical rhythm needs its own pass, not just
  a width mirror.
- Numerals stay Western (0–9) in Arabic; pinned in `i18n/request.ts`.

### Touch / mobile variants (summary)
- No hover-reveal anywhere: any content gated behind hover must be visible by default on
  touch (verb CTAs, values copy, role details).
- Filter pill rows and sub-navs become horizontal scrollers or collapse.
- Accordions for FAQ and About tabs.

### Reduced-motion fallback (global)
- Dither static, marquee static, highlight instant (no sweep), card parallax off, arrow
  hidden. Honor `prefers-reduced-motion` everywhere.

---

## 4. Cut / merge recommendations

1. **Cut the dev/preview routes from production:** `/playground`, `/playground/dither`,
   `/hero-preview`, `/preview`, `/preview/hero-dither`. These are build scaffolding. Gate
   behind a dev-only flag or delete before launch. They should never be crawlable.
2. **Ticker/pressure sections — keep, don't stack.** The landing has manifesto (S3),
   pressure/objection (S6), and ticker/marquee (S7) all doing "why now" work. That's fine as
   long as each has a distinct job: manifesto = worldview, pressure = objection reframe,
   marquee = slogan. Do **not** add the tenex ultimatum ("Disrupt yourself. Or be disrupted")
   on top — it duplicates the pressure section and imports a tenex line.
3. **`/explore` vs the landing cards — keep both, differentiate.** Landing S2 is the teaser
   (3 cards, one line each). `/explore` is the full version (cards + summaries + two-tier
   CTA). If `/explore` stays thin, consider merging it into a landing anchor and dropping the
   route. Recommendation: build `/explore` out (section 2.2) rather than merge.
4. **AI Transformation service page is asymmetric** — it has no `whyWorkWithUs` block while
   the other two do. Either add one or accept the asymmetry deliberately. Low priority.
5. **Merge the two "who we build for" placements** — landing S4 and About S3 use the same
   zto-borrowed line. Write it once in `messages`, render in both. Don't diverge the copy.
6. **Newsletter daily-ritual framing — do not port from thmanyah.** Muse is occasional;
   the coffee-ritual line would misdescribe the product. Borrow only "تغنيك عن."

---

## 5. Borrowed-lines table

Every proposed line, verbatim, with source. "Adapt" = near-adaptation (original shown).
"Live?" = safe to ship now (Y), or flagged/decide (F), or EMPTY-until-real (E).

| # | Proposed use | Line (as proposed) | Source (verbatim original) | Type | Live? |
|---|---|---|---|---|---|
| 1 | Landing S4 / About S3 audience | "The teams we work with aren't a general audience. They're founders shipping a first product, and operators trying to get an AI initiative out of pilot purgatory." | zto.sa/en/about: "Our readers aren't a general audience. They're founders building private companies, investors..., executives..." | Adapt | Y |
| 2 | Landing S5 outcomes band | "We deliver outcomes, not just tools." | mozn.ai: "…we deliver outcomes, not just tools." | Verbatim | Y |
| 3 | Landing S7 marquee (option) | "Built by Saudi minds. To a global standard." | tamkeentech.sa: "Digitizing Innovation Developed by Saudi intelligent minds" | Adapt | Y |
| 4 | Landing S8 two-audience | "Built for founders. Trusted by operators." | salla.com/en: "Built for dreamers. Trusted by sellers." | Adapt | F |
| 4b | Landing S8 safe variant | "Built for founders. Built for operators." | (as above, trust-claim removed) | Adapt | Y |
| 5 | Explore S1 / service intro | "We deliver outcomes, not just tools." (EN); "نسلّم أثرًا، لا مجرد أدوات." (AR) | mozn.ai (EN + AR pattern) | Verbatim/Adapt | Y/F |
| 6 | Explore/service two-tier CTA | "Learn more" → "Get started" | tenex.co (mechanic) | Verbatim (mechanic) | Y |
| 7 | Product Eng "what we do" | "We work inside your team, not from a distance." | mozn.ai: "Our engineers work inside your environment, not from a distance." | Adapt | Y |
| 8 | Service FAQ heading shape | "What sets Muse apart?" | lean.sa: "What sets Lean apart?" | Adapt | Y |
| 9 | About S2 moment-framing (EN) | "Saudi Arabia's economy is going through a moment that doesn't repeat itself. Companies are being built from scratch…" | zto.sa/en/about (both sentences verbatim) | Verbatim | Y |
| 9b | About S2 moment-framing (AR) | "يمرّ الاقتصاد السعودي بمرحلة نوعية لم تتكرر مسبقًا. شركات تُبنى من الصفر…" | zto.sa/من-نحن: "يمرّ الاقتصاد السعودي بمرحلة نوعية لم تتكرر مسبقًا" | Verbatim + native | F (reviewer) |
| 10 | Careers hero origin (AR) | "من قلب الرياض إلى العالم" | jobs.salla.com: "من قلب مكة إلى العالم" | Adapt | Y |
| 11 | Careers hero dare (option) | "Come make history." / "This is your moment. Don't let it pass you by." | tenex.co careers (verbatim) | Verbatim | F |
| 12 | Careers why-join | "Join the team building products people here actually use." | mozn.ai/careers: "Join the Team Building Intelligence" | Adapt | Y |
| 13 | Careers portrait | "We look for passion, curiosity, and depth, because skills can be built." | habbar.com/en (verbatim) | Verbatim | Y |
| 14 | Careers claim (AR) | "نبحث عن الأفضل." | jobs.salla.com (verbatim) | Verbatim | Y |
| 15 | Careers no-match fallback | "No exact match? Say hi anyway." | tenex.co: "say hi anyway →" | Adapt | Y |
| 16 | Contact conditional CTA (EN) | "If you're looking for a team to actually build the thing, not just deck it, talk to us." | zto.sa/من-نحن: "إذا كنت تبحث عن شريك لتعزيز سردية شركتك…، تواصل معنا" | Adapt | Y |
| 16b | Contact conditional CTA (AR) | "إذا كنت تدوّر على فريق يبني الشيء نفسه، مو بس يسوي عرض عنه، تواصل معنا." | zto (shape) | Adapt/native | F (reviewer) |
| 17 | Contact/footer email | "hello@muse.sa" (or human@ if it routes to a human) | tenex.co: "human@tenex.co" | Adapt (mechanic) | F |
| 18 | Get started hero | "Ready to build with Muse?" | tenex.co: "Ready to Tenex your business?" | Adapt (already live) | Y |
| 19 | Newsletter "تغنيك عن" (AR) | "تغنيك عن متابعة أخبار الذكاء الاصطناعي العامة، ونختار لك اللي يستحق." | thmanyah نشرة أها!: "تغنيك عن التصفّح العشوائي لشبكات التواصل، وتختار لك من عوالم الإنترنت" | Adapt | F (reviewer) |
| 20 | Newsletter issue kicker | "زائد:" (AR) / "Plus:" (EN) | thmanyah (verbatim device) | Verbatim (device) | Y |
| 21 | Newsletter name (option) | "بين الأنظمة" | thmanyah "بين الخطوط" + lean "systems began to speak one language" | Adapt | F |
| 22 | Careers purpose (AR) | "نشتغل عشان نرفع مستوى اللي يُبنى في المملكة." | Muse's own mission (About) restated | Native (own) | Y |
| 23 | Footer worldview beat | "We build the thing, not the deck about the thing." | Muse hero (own, reused) | Own | Y |
| — | Proof-as-story band | — | salla "When commerce peaks, Salla keeps moving." | — | E |
| — | Category-owning "the" line | — | lean "The digital enabler of healthcare in Saudi Arabia" | — | E |
| — | Superlative | — | thmanyah "أفضل محتوى عربي على الإنترنت." | — | E |
| — | Local stat | — | salla "1 in 3 shoppers in Saudi Arabia…" | — | E |
| — | "Trusted by leaders" marquee | — | tenex "Built by builders, trusted by leaders" | — | E |

---

## 6. Open decisions for Abdullah

Each with a recommendation.

1. **Keep "AI-absent to AI-native"?** It is tenex's coined pair (`Arabic Termbase.md` notes
   the AR already diverged to تستخدم/تبني). **Recommendation:** keep the AR (تستخدم/تبني — it's
   sharper and already Muse's), and move the **EN** to match the same "uses vs builds" idea,
   or keep EN on absent/native knowingly. Lowest-risk: keep both as they are; they're already
   live and the AR is de-tenexed. Decision is EN-only.

2. **Adopt "Built for founders. Trusted by operators."?** The "Trusted by" half is a client
   claim Muse can't back yet. **Recommendation:** ship the safe variant "Built for founders.
   Built for operators." now; upgrade to "Trusted by operators" once there's a real operator
   client to stand behind it.

3. **Use "من قلب الرياض إلى العالم"?** **Recommendation:** yes. It's a clean adapt of salla's
   Mecca→world origin line, honest for a Riyadh studio, and culturally strong. Best placed as
   a careers-page banner or About kicker.

4. **The marquee content.** Options: keep "Built for the AI-native era"; use "Nothing ships
   that we wouldn't use ourselves"; or "Built by Saudi minds. To a global standard."
   **Recommendation:** "Nothing ships that we wouldn't use ourselves" — it's a commitment, not
   a claim, and it's the most Muse line on the site.

5. **Proof sections with no client claims.** The honest options for a studio with no shipped
   client work: (a) leave proof slots EMPTY and say less (current approach — correct per
   `Website Voice.md`); (b) use Muse's own **shipped product** as proof when one exists
   ("Ventures as proof," per `Website Voice.md#The pillars are internal`) — a product Muse
   built is stronger than any testimonial; (c) named *constraints* as proof (written quality
   bar, "every state designed, real data only") which Muse already uses. **Recommendation:**
   (a) + (c) now; add a Work page only when (b) is real.

6. **Does Muse need a Work / Case-studies page?** **Recommendation:** not yet. Building the
   route now forces either fake content or an empty page. Add it the day the first shipped
   product (client or Muse's own) can be shown. Until then, the "proof" is the constraints
   language and the quality of the site itself.

7. **human@ / hello@ email.** tenex's "human@" is positioning. **Recommendation:** only adopt
   a "human@" address if it genuinely routes to a founder, not a shared inbox — otherwise it's
   theatre. Safe middle: "hello@muse.sa." Keep info@ if nothing changes operationally.

8. **Newsletter name.** **Recommendation:** name it. "بين الأنظمة" (AR) + "Field Notes" (EN) is
   my pick; evocative, honest, in the thmanyah register without copying a thmanyah name. Or
   stay unnamed and lose the personality. Low-stakes, reversible.

9. **Superlatives and stats (thmanyah "best," salla "1 in 3").** **Recommendation:** hold. No
   "best content on the internet," no invented penetration stat. Revisit only when a real,
   verifiable number exists.

10. **Footer phone / Complaints link.** salla/lean publish a local phone and a Complaints
    item for GCC transparency. **Recommendation:** add the phone only when there's a real
    number to answer it; skip a Complaints link until there's an intake, since a dead
    Complaints link reads worse than none.

11. **Careers hero: "Come make history" vs "Come build with us."** **Recommendation:** keep
    "Come build with us." The tenex dare is memorable but reads borrowed and slightly grand
    for a small studio; the honest line is on-voice.

---

## 7. Build order

Ship incrementally; each step is independently launchable.

1. **Cut dev routes** (`/playground`, `/hero-preview`, `/preview*`) and confirm they're not
   indexed. Zero-risk cleanup, do first.
2. **Landing refinements** — add S4 (who we build for), S5 (outcomes band), decide the S7
   marquee line (decision 4). Hero/approach/manifesto/pressure/FAQ/CTA already ship. This is
   the highest-traffic page; land it first.
3. **Explore build-out** (section 2.2) — turn the bare hero into the full 3-card page with
   two-tier CTAs. Small, self-contained.
4. **Service pages** — add the per-service FAQ slot (content EMPTY until Abdullah drafts the
   questions) and the mozn-adapted "inside your team" intros. Otherwise already complete.
5. **About restructure** — insert S2 (Why Muse / moment-framing) and S3 (who we build for,
   shared with landing). Keep everything else.
6. **Careers** — add origin line (decision 3), why-join + portrait + claim line (S2–S3), and
   the no-match fallback. Role grid already ships.
7. **Contact / Get started** — add the zto conditional CTA to Contact; decide the email
   address (decision 7). Both pages otherwise ship.
8. **Newsletter** — refine AR sub with "تغنيك عن," decide the name (decision 8). Wire "زائد:"
   into the content engine later, not now.
9. **Footer** — add the worldview beat; phone/Complaints only if decisions 10 resolve yes.
10. **Native Arabic review pass** across everything new before `/ar` publishes the new copy
    (gate below).

---

## What still needs a native Arabic reviewer

Per `Brand Voice.md#Arabic voice`, nothing new goes live on `/ar` until a native Arabic
writer signs off. Specifically flag these to the reviewer (they are the rebuilt-not-
translated lines, most likely to read as translationese or to over-perform the register):

- **About S2 moment-framing (AR)** — the zto half is verbatim, but the Muse-thesis
  continuation and the marker "لسه" need a check; "لسه" may be one spoken marker too many in a
  credibility paragraph.
- **Contact conditional CTA (AR)** — "إذا كنت تدوّر على فريق… مو بس يسوي عرض عنه" carries two
  markers (مو، بس) plus تدوّر; confirm it lands as talking, not performing.
- **Newsletter "تغنيك عن" line (AR)** — borrowed construction, new object; confirm the
  daily-ritual echo is fully gone and it reads native.
- **Careers portrait and why-join (AR)** — adapted from habbar/mozn; confirm none of it drifts
  toward the banned classical layer (نتفرّس etc.) and the second-person address is consistent.
- **"نسلّم أثرًا، لا مجرد أدوات."** — the only fully-new AR conviction line; confirm أثر vs a
  better native choice, and whether to just reuse Muse's existing "شيء يعمل فعليًا" instead.
- **Two-audience AR ("مبنيّ للمؤسّسين…")** and **marquee AR options** — confirm register and
  whether "موثوق من المشغّلين" should be avoided entirely on the claim grounds in section 6.
- **Newsletter name "بين الأنظمة"** — confirm it reads evocative-not-obscure and isn't
  awkward next to the Latin "Muse."

General instruction to the reviewer (from `Arabic Termbase.md`): the test is *does it read as
a Riyadh product team talking, or as a translation of an American studio* — and does each new
paragraph sit in the 1–2-marker band, neither government-form MSA nor performed spoken.
