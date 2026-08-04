# Muse De-AI Copy Pass — Plan (exact strings, EN + AR, all pages)

**Branch:** `copy/de-ai-pass`
**Pipeline:** Hermes → Opus (this plan) → Sonnet (executes) → Hermes verifies → merge to `staging/bilingual-ar-en`. **Never `main`.**
**Date:** 2026-08-04
**Status legend:** **Y** = ships as-is · **F** = ships but flagged for the native-Arabic reviewer (gate before `/ar` publishes) · **E** = left empty intentionally (no honest line exists).

> Rule for the whole document: **EN is exact, AR is native — never a translation of the EN.** Every AR rewrite carries the same *meaning* in its own sentence, holding to 1–2 spoken markers (`عشان وش مو اللي بس`) per paragraph per `Arabic Termbase.md`. `Muse` stays Latin, Western numerals, straight quotes. Every borrowed line is tagged to a verbatim source. Nothing new is claimed (no pricing, clients, results, team size, stats).

## 0. Source note (read before executing)

The three external research files (`/Users/a/muse_copy_research.md`, `/Users/a/research_muse/copy_research_muse.md`, `/Users/a/thmanyah_copy_research.md`) are outside the repo and were **not readable in this planning session** (sandbox denied both the planner and three sub-agents). The verbatim corpus used for attribution below is taken from the two in-repo documents that were themselves built from those files and quote the originals verbatim: `docs/copy-reference-bank.md` and `docs/muse-site-structure-plan.md` §5 (borrowed-lines table). Every source tag in this plan traces to a verbatim original in one of those two files. Before the native-review gate, the Arabic reviewer should still have the raw research files to hand.

**Orchestrator note (Hermes):** the three external research files were read in full by the orchestrator on this machine, and the in-repo reference bank's quotes were verified against them — the bank quotes the originals accurately, so the source tags in this plan are sound.

## 1. What this pass targets (vs. the prior narrow pass)

The prior `copy-revision` pass fixed the service summaries, three EN headlines, the slide-count clash, GetStarted points, and AR subtitle density. It left the **AI-ish body of the service pages and the résumé-cadence** in place. This pass clears them: the zero-tolerance kill words still live in the code (`highest-leverage`, `bespoke`, `robust`, `holistic`, `quantify ROI`, `implementation roadmap`, `mission-critical`, `startup speed`, `accelerate your goals`, `stakeholder interviews`, `upskill`, `cultural buy-in`), the triple-verb "Pinpoint / measure / gauge" whatWeDo lists, and the translated-MSA parallelism those lists carry into Arabic.

**Frozen byte-for-byte (do not touch, coined pair):**
- `Home.approach.heading` EN `"Muse helps you shift from AI-absent to AI-native."`
- `Home.approach.heading` AR `ناخذك من شركة "تستخدم" الذكاء الاصطناعي، إلى شركة تبنيه.`
- The card echo *first sentence* AR `أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد.` (the rest of that card body IS in scope — see Home §2).
- `Services.detail.ticker` / `Home.ticker` era term (`عصر الذكاء الاصطناعي`).

**Do not regress structure-pass additions** (WhoWeBuildFor, OutcomesBand, retone ticker, ServiceSubnav, ServiceFAQ, contact conditional, footer worldview, careers intro, about moment, newsletter AR). Their strings are polished only where still AI-ish; their structure-pass **F flags stay F**.

**i18n parity confirmed:** the two message files are key-symmetric (same namespaces, same nested keys, `Home.faq.items`=5, `values`=6, `beliefs`=4, `leadership.team`=2, `Newsletter.points`=3, `GetStarted.points`=3 in both). `services.ts` = 3 records both locales with equal array lengths; `careers.ts` = 3 roles both locales. Every change below touches the **same key in both files**.

---

# PART A — `messages/en.json` + `messages/ar.json`

### Common — all KEEP
Functional labels / aria strings / socials. No AI tells. MSA spine in AR.

### Nav — all KEEP
Nav labels are MSA-spine (`الرئيسية / استكشف / من نحن / الوظائف …`). No changes.

### Footer — all KEEP
`blurb`, `cta`, `reachOut`, `location`, columns, `worldview` (structure-pass, reused hero line — good), `rights` (`{year}` intact, `Muse Studios` stays Latin), `privacy`, `terms`. All specific, on-voice.

### CTA — all KEEP
`heading` / `subheading` / `button`. AR carries the correction pivot (`مو مع فريق مبيعات`). Nothing to fix.

### Home

**KEEP:** `hero.*` (Abdullah's own, passes specificity), `approach.eyebrow`, `approach.heading` (frozen), cards `product-engineering.*` + `gamification-experience.*`, `manifesto.*`, `pressure.*`, `whoWeBuildFor.*` (structure; AR stays **F**), `outcomes.*` (mozn verbatim), `ticker`, `faq.items[0..3]`.

**CHANGE 1 — `Home.approach.cards.ai-transformation.body`** (kills `highest-leverage`, `guardrails from day one`)
- Current EN: `Staying AI-absent isn't a neutral choice. We find the highest-leverage places to put AI to work in how your business actually runs, and stand up the systems that do it, with guardrails from day one.`
- Current AR: `أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد. نحدّد المواضع الأعلى أثرًا لتشغيله داخل عمل شركتك كما يجري فعلًا، ونبني الأنظمة التي تقوم بذلك، بضوابط من اليوم الأول.`
- **Proposed EN:** `Staying AI-absent isn't a neutral choice. We find where AI actually earns its place in how your business runs, build the systems that do it, and put the guardrails in ourselves.`
- **Proposed AR:** `أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد. نلاقي وين الذكاء الاصطناعي يفيد فعلًا في طريقة شغل شركتك، ونبني الأنظمة اللي تسوي ذلك، ونحطّ الضوابط بأنفسنا.` *(sentence 1 preserved byte-for-byte; markers in the rewritten part: `وين`, `اللي`)*
- Source: Muse voice (Website Voice specificity; keeps termbase `ضوابط`). **EN: Y · AR: F**

**CHANGE 2 — `Home.faq.items[4].a`** (kills `startup speed` in EN; AR keeps the termbase term)
- Current EN: `Teams that want to move at startup speed. That runs from a founder shipping a first product to an enterprise team trying to get an AI initiative out of pilot purgatory.`
- Current AR: `فرق تريد التحرك بسرعة الشركات الناشئة. من مؤسّس يطلق منتجه الأول إلى مؤسسات وشركات كبيرة تحاول إخراج مبادرات ذكاء اصطناعي ومنتجات من مراحل تجريبية ونماذج أوّلية مالها نهاية.`
- **Proposed EN:** `Teams that want to move fast without dropping the quality bar. That runs from a founder shipping a first product to an enterprise team trying to get an AI initiative out of pilot purgatory.`
- **Proposed AR:** KEEP (`سرعة الشركات الناشئة` is the decided termbase rendering, not translationese — `Arabic Termbase.md#Core terms`).
- Source: Muse voice. **EN: Y · AR: KEEP**

### About

**KEEP** everything: `hero.*`, `about.paragraph1..3` (Abdullah's), `mission`, `vision`, `tabs`, `values[0..5]`, `beliefs.*`, `leadership.*` bios, `careersTeaser.*`, `ticker`. Reasons: About is Abdullah's own, approved, and specific; the leadership bios stay factual (no team-size claim beyond the two named founders). `About.moment.lead` + `.continuation` are structure-pass — **AR stays F**, EN Y, no string change.

### Explore

**CHANGE 3 — `Explore.hero.subtitle`** (kills `startup speed` in EN)
- Current EN: `Three ways we help teams move at startup speed. Pick one, or combine all three.`
- Current AR: `ثلاث طرق نساعد فيها الفرق تتحرك بسرعة الشركات الناشئة. اختر وحدة، أو اجمعها كلها.`
- **Proposed EN:** `Three ways we help teams ship faster, without cutting corners. Pick one, or combine all three.` *(orchestrator fix: dropped "lowering the bar" — echoed CHANGE 2's "quality bar")*
- **Proposed AR:** KEEP (termbase `سرعة الشركات الناشئة`; AR already de-densified in the prior pass and reads native).
- Source: Muse voice. **EN: Y · AR: KEEP (prior-pass F still pending gate)**

### Services (message strings)
All KEEP — `overview`, `whatThatLooksLike`, `getStarted`, `detail.*` labels, `detail.faq` (`Questions, answered.` / `أسئلة، وأجوبتها.`), `detail.nav.*`, `detail.ticker`. MSA-spine section labels, no AI tells.

### Careers (message strings)
**KEEP:** `hero.*`, `origin` (salla adapt, structure), `whyJoin`/`claim`/`purpose`/`noMatch` (structure — **AR stays F** for `whyJoin`, `purpose`, `noMatch`), `all`, `viewJd`, subjects, `departments.*`, `detail.*`. No new AI-ish tell; the role-level résumé cadence lives in `careers.ts` (Part C).

### Newsletter
**KEEP:** `hero.title`/`.eyebrow`, `hero.subtitle` (AR is the thmanyah "تغنيك عن" adapt — structure-pass **F**; EN unchanged), `points[0..2]`, `form.*` (labels + success + consent rich-text `<terms>`/`<privacy>` intact).

### Contact
**KEEP:** `hero.*`, `conditional` (structure; **AR stays F**), `methods.*`, `orFindUsOn`, `formHeading`, `form.*` (labels, success/error bodies, projectTypes, budgets). All functional or already on-voice.

### GetStarted

**KEEP:** `hero.*`, `points[0..2]` (rewritten in prior pass), all `form` labels + option maps, `successNoted`.

**CHANGE 4 — `GetStarted.form.successDelivered`** (kills `accelerate your goals` / `نسرّع أهدافك`)
- Current EN: `Your request has been received. Our team will reach out within 1 to 2 business days to discuss how Muse can accelerate your goals.`
- Current AR: `استلمنا طلبك، وسيتواصل معك فريقنا خلال يوم إلى يومي عمل لمناقشة كيف نقدر نسرّع أهدافك.`
- **Proposed EN:** `Your request has been received. We'll get back to you within 1 to 2 business days to talk through what you're building.`
- **Proposed AR:** `استلمنا طلبك، وبنرجع لك خلال يوم إلى يومين عمل عشان نفهم وش تبنيه.` *(markers: `عشان`, `وش`)*
- Source: Muse voice (drops corporate-warmth close; mirrors the hero's "what you're building"). **EN: Y · AR: F**

### Forms — all KEEP
Error strings are product-UI register (MSA spine in AR). No AI tells.

### Legal — all KEEP
Privacy + Terms sit correctly in the legal register in both locales; no marketing boilerplate, no AI tell to strip. Per the constraint, **no marketing line is borrowed into legal.** `info@muse.sa`, `{updated}` placeholder intact.

### NotFound — all KEEP
404 copy is plain and specific in both locales.

### Metadata (SEO — in scope)

**KEEP:** `siteName`, `titleTemplate`, `siteDescription`, `organizationDescription`, `home.*`, `about.*`, `careers.*`, `newsletter.*`, `contact.*`, `getStarted.*`, `privacy.*`, `terms.*`. All carry the voice and repeat no string being rewritten elsewhere.

**CHANGE 5 — `Metadata.explore.description`** (flat filler tail "How Muse Studios builds.")
- Current EN: `AI transformation, product engineering, and gamification & experience. How Muse Studios builds.`
- Current AR: `التحوّل بالذكاء الاصطناعي، وهندسة المنتجات، والتلعيب وتصميم التجربة. هذا ما نبنيه، وكيف نبنيه.`
- **Proposed EN:** `AI transformation, product engineering, and gamification & experience. What Muse builds, and how.` *(orchestrator fix: no em dash, house punctuation rule)*
- **Proposed AR:** KEEP (already reads native: `هذا ما نبنيه، وكيف نبنيه.`).
- Source: Muse voice (light polish). **EN: Y · AR: KEEP**

### LanguageSwitcher — KEEP.

---

# PART B — `lib/content/{en,ar}/services.ts`

## B.1 — AI Transformation (`services[0]`)

**KEEP:** `summary`, `cta`, `intro[0..1]`, `approachHeading`, `approachIntro[0]` (100-slide, fixed prior), `approachIntro[2]`, `pillars[0]` (Product Transformation + crossLink), `whyHeadline`, `whyReasons[0,1,3]`, `whatWeDoHeadline`, `faq[0..2]` (EN clean; **AR faq stays F**).

**CHANGE B1 — `pillars[1].body` (Process Transformation)** — kills `stakeholder interviews`, `high-impact opportunities`, `change management`
- Current EN: `Employee surveys and stakeholder interviews define high-impact opportunities; we implement automation guided by training and change management.`
- Current AR: `استبيانات الموظفين ومقابلات المعنيين تحدّد الفرص الأعلى أثرًا، ثم ننفّذ الأتمتة مدعومة بالتدريب وإدارة التغيير.`
- **Proposed EN:** `We look at how the work actually flows, automate the parts that are worth it, and train the team so the change holds.`
- **Proposed AR:** `نشوف كيف يجري العمل فعليًا، ونأتمت الأجزاء اللي تستاهل، وندرّب الفريق عشان التغيير يثبت.` *(markers: `اللي`, `عشان`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B2 — `pillars[2].body` (People Transformation)** — kills `Bespoke`, `upskill`
- Current EN: `Bespoke curricula and hands-on workshops that upskill your team on new tools and workflows, so adoption sticks.`
- Current AR: `مناهج مصمّمة على القياس وورش عملية ترفع مهارات فريقك على الأدوات وسير العمل الجديد، حتى يثبت التبنّي.`
- **Proposed EN:** `Training built for your team and the tools they'll actually use, run as hands-on workshops, not slideware.`
- **Proposed AR:** `تدريب مبني لفريقك وللأدوات اللي بيستخدمها فعلًا، ورش عملية مو شرائح.` *(markers: `اللي`, `مو`; correction pivot)*
- Source: Muse voice (correction-pivot device, `Brand Voice#Two devices`). **EN: Y · AR: F**

**CHANGE B3 — `whyReasons[2]`** — kills `Cultural buy-in`, `upskilling`
- Current EN: `Cultural buy-in needs careful communication and real upskilling, not a mandate.`
- Current AR: `القبول الثقافي يحتاج تواصلًا دقيقًا ورفعًا حقيقيًا للمهارات، لا تعميمًا إداريًا.`
- **Proposed EN:** `Getting people to actually use it takes real training and buy-in, not a memo from the top.`
- **Proposed AR:** `إقناع الناس يستخدمونه فعلًا يحتاج تدريب حقيقي، مو تعميم إداري.` *(marker: `مو`; correction pivot)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B4 — `approachIntro[1]`** — kills `holistic`, `surface the most compelling AI use cases`, `quantify ROI`, `implementation roadmap`
- Current EN: `We get straight to it. 2 to 6 week holistic and function-specific audits that surface the most compelling AI use cases, quantify ROI, and map an implementation roadmap.`
- Current AR: `ندخل في الموضوع على طول: مراجعة شاملة أو خاصة بوظيفة بعينها، من أسبوعين إلى ستة أسابيع، تُظهر أقوى حالات استخدام الذكاء الاصطناعي، وتقيس العائد على الاستثمار، وترسم خارطة طريق للتنفيذ.`
- **Proposed EN:** `We get straight to it. A 2 to 6 week audit that finds the AI use cases actually worth doing, what they're worth, and what it takes to ship them.`
- **Proposed AR:** `ندخل في الموضوع على طول: مراجعة من أسبوعين إلى ستة أسابيع، تحدّد حالات استخدام الذكاء الاصطناعي اللي تستاهل فعلًا، وقيمتها، وما يلزم لإطلاقها.` *(markers: `على طول`, `اللي`; drops the corporate roadmap phrasing while keeping the meaning)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B5 — `whatWeDo[0].body` (Process Survey)** — kills triple-verb `Pinpoint / measure / gauge`
- Current EN: `Pinpoint workflow challenges, measure business impact, and gauge readiness for AI-driven improvements.`
- Current AR: `تحديد تحديات سير العمل، وقياس أثرها على العمل، وتقدير الجاهزية للتحسينات المبنية على الذكاء الاصطناعي.`
- **Proposed EN:** `We find where the workflow actually breaks, and what fixing it is worth.`
- **Proposed AR:** `نلاقي وين يتعطّل سير العمل فعليًا، ووش قيمة إصلاحه.` *(markers: `وين`, `وش`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B6 — `whatWeDo[1].body` (Executive Survey)** — kills triple-verb `Understand / clarify / identify`
- Current EN: `Understand leadership priorities, clarify strategic objectives, and identify the top AI opportunities.`
- Current AR: `فهم أولويات القيادة، وتوضيح الأهداف الاستراتيجية، وتحديد أهم فرص الذكاء الاصطناعي.`
- **Proposed EN:** `We sit with leadership to get clear on the priorities, and where AI is actually worth doing.`
- **Proposed AR:** `نجلس مع القيادة عشان نفهم الأولويات، ووين الذكاء الاصطناعي يستاهل فعلًا.` *(markers: `عشان`, `وين`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B7 — `whatWeDo[2].body` (Expert Interviews)** — kills `stakeholders`, `validate insights`, `uncover targeted solutions`
- Current EN: `Speak with stakeholders across business units to validate insights and uncover targeted solutions.`
- Current AR: `الحديث مع المعنيين في وحدات العمل المختلفة للتحقق من النتائج والكشف عن حلول موجّهة.`
- **Proposed EN:** `We talk to the people who run each part of the business, so the plan matches how it really works.`
- **Proposed AR:** `نتكلم مع اللي يشغّلون كل جزء من العمل، عشان الخطة تطابق الواقع.` *(markers: `اللي`, `عشان`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B8 — `whatWeDo[3].body` (Custom Training Programs)** — kills `Bespoke`, `upskill`
- Current EN: `Bespoke curricula and hands-on workshops that upskill teams on relevant AI tools and workflows.`
- Current AR: `مناهج مصمّمة على القياس وورش عملية ترفع مهارات الفرق على أدوات الذكاء الاصطناعي وسير العمل ذي الصلة.`
- **Proposed EN:** `Training built around the AI tools your team will actually use, run hands-on.`
- **Proposed AR:** `تدريب مبني حول أدوات الذكاء الاصطناعي اللي بيستخدمها فريقك فعلًا، عملي بالكامل.` *(marker: `اللي`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B9 — `whatWeDo[4].body` (AI Tooling)** — kills `Marry strategy with implementation`
- Current EN: `Marry strategy with implementation using a mix of off-the-shelf tools, in-house IP, and custom builds.`
- Current AR: `نصل الاستراتيجية بالتنفيذ عبر مزيج من الأدوات الجاهزة، وملكيتنا الفكرية الخاصة، وبناء مخصص.`
- **Proposed EN:** `The actual systems, built from a mix of off-the-shelf tools, our own, and custom code.`
- **Proposed AR:** `الأنظمة نفسها، من مزيج بين أدوات جاهزة، وأدواتنا الخاصة، وكود مخصص.` *(0–1 marker — terse deliverable line, within density rule)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B16 — `whyWorkWithUs[3].body` (Regular Check-ins)** — kills the "progress, roadmap, and next steps" noun triad (GPT-cadence) *(orchestrator addition)*
- Current EN: `Calls to review progress, roadmap, and next steps.`
- Current AR: `مكالمات لمراجعة التقدّم وخارطة الطريق والخطوات القادمة.`
- **Proposed EN:** `Calls to review where things stand and what's next.`
- **Proposed AR:** `مكالمات نراجع فيها وين وصلنا ووش الجاي.` *(markers: `وين`, `وش`)*
- Source: Muse voice. **EN: Y · AR: F**

## B.2 — Product Engineering (`services[1]`)

**KEEP:** `summary`, `cta`, `intro[0]`, `approachHeading`, `pillars[0..3]`, `whyHeadline`, `whyReasons[1,3]`, `whatWeDoHeadline` (mozn adapt, prior), `whatWeDo[0]` (Application Development), `whyWorkHeadline` (fixed prior), `whyWorkWithUs[0,1,2,4,5]`, `faq[0..2]` (EN clean; **AR faq stays F**).

**CHANGE B10 — `whyReasons[0]`** — kills `mission-critical`
- Current EN: `Perfect-fit hires are mission-critical, but can take months to secure.`
- Current AR: `التعيينات المناسبة تمامًا حاسمة، وقد يستغرق تأمينها أشهرًا.`
- **Proposed EN:** `The right hire can take months to land, and you need them now.`
- **Proposed AR:** `التعيين المناسب قد ياخذ أشهر، وأنت محتاجه الحين.` *(marker: `الحين`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B11 — `whyReasons[2]`** — softens `Velocity … competitive advantage`
- Current EN: `Velocity is a real competitive advantage in a fast-moving market.`
- Current AR: `السرعة ميزة تنافسية حقيقية في سوق سريع الحركة.`
- **Proposed EN:** `Speed is a real edge when the market moves this fast.`
- **Proposed AR:** KEEP (`ميزة تنافسية` is standard Arabic, not a calque).
- Source: Muse voice. **EN: Y · AR: KEEP**

**CHANGE B12 — `whatWeDo[1].body` (Fine-Tuning Models)** — softens `business objectives`
- Current EN: `Aligning models to your specific business objectives and use cases.`
- Current AR: `مواءمة النماذج مع أهداف عملك وحالات استخدامك تحديدًا.`
- **Proposed EN:** `Tuning models to your actual use cases, not a generic benchmark.`
- **Proposed AR:** `نضبط النماذج على حالات استخدامك الفعلية، مو على معيار عام.` *(marker: `مو`; correction pivot)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B13 — `whatWeDo[2].body` (Code Migration & Refactors)** — drops soft `strategic`
- Current EN: `Language migrations, version upgrades, and strategic codebase restructuring.`
- Current AR: `الترحيل بين اللغات، وترقية الإصدارات، وإعادة هيكلة قواعد الشيفرة بشكل استراتيجي.`
- **Proposed EN:** `Language migrations, version upgrades, and codebase restructuring.`
- **Proposed AR:** `الترحيل بين اللغات، وترقية الإصدارات، وإعادة هيكلة قواعد الشيفرة.` *(spine-register deliverable line; deletion only)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE B14 — `whatWeDo[3].body` (Data Engineering & Analysis)** — kills `robust`
- Current EN: `Data warehouse migrations, cleaning, and robust preprocessing pipelines.`
- Current AR: `ترحيل مستودعات البيانات، وتنظيفها، وبناء مسارات معالجة أولية متينة.`
- **Proposed EN:** `Data warehouse migrations, cleaning, and preprocessing pipelines that hold up.`
- **Proposed AR:** KEEP (`متينة` is the correct native word, not a calque of "robust").
- Source: Muse voice. **EN: Y · AR: KEEP**

**CHANGE B15 — `whatWeDo[4].body` (Custom Agentic Solutions)** — softens `AI-powered … tailored specifically`
- Current EN: `Agentic, AI-powered features tailored specifically to your business.`
- Current AR: `خصائص مبنية على وكلاء أذكياء، مصمّمة خصيصًا لعملك.`
- **Proposed EN:** `AI agents built to do a specific job inside your business.`
- **Proposed AR:** KEEP (termbase `وكلاء أذكياء`; already specific).
- Source: Muse voice. **EN: Y · AR: KEEP**

## B.3 — Gamification & Experience (`services[2]`)
**All KEEP.** `summary`, `cta`, `intro[0]`, `pillars[0..2]`, `whyHeadline` (carries the decided `يخبو` register line), `whyReasons[0..3]`, `whatWeDoHeadline`, `whatWeDo[0..3]`, `whyWorkHeadline`, `whyWorkWithUs[0..2]`, `faq[0..2]` (EN clean; **AR faq stays F**). This service is Muse-specific and already free of AI tells — no borrow needed, per structure plan §2.3.

---

# PART C — `lib/content/{en,ar}/careers.ts`

The résumé cadence lives in the **blurbs** (two of three open with "Build …") and in the **Business Developer responsibilities** (the brief's quoted tell: "Identify and qualify…", "Build and manage…", "Represent…"). Blurbs are rewritten to vary sentence shape (C1/C3). Responsibilities are **de-templated** (C2): kept factual and in job-posting register, with sentence shapes varied and the parallel verb-pair pattern broken. `requirements` / `niceToHaves` / `location` / `compensation` already vary and are kept.

### KEEP (all three roles)
`title`, `department` (Latin union value — must stay, drives the filter), `location`, `employmentType`, `compensation`, `requirements[*]`, `niceToHaves[*]`. `responsibilities[*]` are KEEP only where C2 marks them so.

**CHANGE C1 — `business-developer.blurb`** (imperative verb-pair → portrait shape; `engagements` → `project`)
- Current EN: `Build and manage the pipeline that turns conversations into signed engagements.`
- Current AR: `ابنِ وأدر مسار الفرص اللي يحوّل المحادثات إلى مشاريع موقّعة.`
- **Proposed EN:** `You're the first person a prospective client talks to, and you carry that all the way to a signed project.`
- **Proposed AR:** `أنت أول من يتواصل معه العميل المحتمل، وتكمل معه لين توقيع المشروع.` *(marker: `لين`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE C2 — `digital-marketing-director.blurb`** — KEEP both. `Own how Muse shows up in public, and the demand that follows from it.` / `تملّك حضورنا أمام الناس، والطلب اللي يجي منه.` Already declarative and on-voice; keeping it also breaks the "every blurb is imperative" pattern.

**CHANGE C3 — `gtm-engineer.blurb`** (vary from the other "Build …" opener)
- Current EN: `Build the tooling and automation that makes go-to-market run like a product.`
- Current AR: `ابنِ الأدوات والأتمتة اللي تخلي دخول السوق يشتغل مثل المنتج.`
- **Proposed EN:** `Go-to-market should run like a product. You build the tooling and automation that gets it there.`
- **Proposed AR:** `دخول السوق لازم يشتغل مثل المنتج. أنت تبني الأدوات والأتمتة اللي توصله لهناك.` *(marker: `اللي`)*
- Source: Muse voice. **EN: Y · AR: F**

**CHANGE C2 — responsibilities de-templating** *(orchestrator addition; kills the brief's quoted triple-verb template "Identify and qualify…", "Build and manage…", "Represent…")*

`business-developer.responsibilities` — bullets 0,1,3,4 change; bullet 2 KEEP (already varied):

| # | Current EN | Proposed EN | Current AR | Proposed AR |
|---|---|---|---|---|
| 0 | `Identify and qualify new business opportunities across target industries` | `Qualify new business opportunities across our target industries` | `تحديد فرص الأعمال الجديدة وتأهيلها عبر القطاعات المستهدفة` | `تأهيل فرص الأعمال الجديدة في قطاعاتنا المستهدفة` |
| 1 | `Build and manage a pipeline of prospective clients, from first outreach to signed contract` | `Carry the pipeline from first outreach to signed contract` | `بناء مسار من العملاء المحتملين وإدارته، من أول تواصل حتى توقيع العقد` | `متابعة مسار الفرص من أول تواصل حتى توقيع العقد` |
| 2 | KEEP: `Represent Muse Studios in client meetings, presentations, and proposal negotiations` | — | KEEP: `تمثيل الاستوديو في اجتماعات العملاء والعروض والتفاوض على المقترحات` | — |
| 3 | `Work closely with the delivery team to scope engagements accurately before they're sold` | `Scope engagements with the delivery team before anything is promised to a client` | `العمل عن قرب مع فريق التنفيذ لتحديد نطاق المشاريع بدقة قبل بيعها` | `تحديد نطاق المشاريع مع فريق التنفيذ قبل أن نعد العميل بأي شيء` |
| 4 | `Maintain relationships with existing clients to identify expansion opportunities` | `Stay close to existing clients, and spot where we can do more for them` | `الحفاظ على العلاقات مع العملاء الحاليين لاكتشاف فرص التوسّع` | `البقاء قريبين من عملائنا الحاليين، ورصد أين يمكن أن نخدمهم أكثر` |

Source: Muse voice (JD register, shapes varied; `Muse` stays Latin). **EN: Y · AR: F**

`digital-marketing-director.responsibilities` — bullets 1,2 change; 0,3,4 KEEP (already varied):

| # | Current EN | Proposed EN | Current AR | Proposed AR |
|---|---|---|---|---|
| 1 | `Build and manage the content engine behind the newsletter and everything we publish` | `Run the content engine behind the newsletter and everything we publish` | `بناء وإدارة محرك المحتوى خلف النشرة البريدية وكل ما ننشره` | `تشغيل محرك المحتوى خلف النشرة البريدية وكل ما ننشره` |
| 2 | `Run demand-generation campaigns that turn attention into qualified leads` | `Run campaigns that turn attention into qualified leads` | `تشغيل حملات صناعة الطلب التي تحوّل الانتباه إلى فرص مؤهلة` | `تشغيل حملات تحوّل الانتباه إلى فرص مؤهلة` |

Source: Muse voice (drops `demand-generation` jargon; keeps the job register). **EN: Y · AR: F**

`gtm-engineer.responsibilities` — all KEEP (already varied sentence shapes, no template cadence). All `requirements[*]` and `niceToHaves[*]` for all three roles — KEEP (varied, factual, job-posting register per brief).

---

# PART D — Hardcoded component copy

**Finding: no in-scope marketing/body copy is hardcoded.** A full grep of `components/` + `app/` (all `*.tsx`) confirms every rendered page-UI string flows through `next-intl` (`t()` / `t.rich()` / `t.raw()`) or the content layer. All 22 section components and all 13 route pages are clean (Hero, Approach, Manifesto, WhoWeBuildFor, Services, OutcomesBand, CTA, FAQ, AboutMoment, AboutTabs, BeliefSlider, Leadership, CareersTeaser, CareersIntro, CareersList, ServiceSubnav, SubpageHero, PressureStatement, LegalContent, NewsletterForm, ContactForm, GetStartedForm; Footer, SiteHeader, LanguageSwitcher, MuseLogo).

The only literal strings found sit in three **provider-less / non-page-UI contexts** where next-intl cannot reach, and **none carries an AI-ish tell** (nothing to de-AI):

1. **`app/global-error.tsx`** — `"Error"`, `"Something went wrong."`, the retry-body sentence, `"Reference: {digest}"`, `"Try again"`. Next.js `global-error` **replaces the root layout, so the `NextIntlClientProvider` does not exist in its tree** (the file already hardcodes `lang="en"` / `dir="ltr"`). It cannot consume `t()` without re-mounting a provider. **Decision: keep English** — it is the ultimate crash fallback and the strings are already plain, matching `Forms.errors.generic` ("Something went wrong. Please try again."). Documented exception, not a regression. *(Not moved to `messages` — a move would either break the build or force a provider remount for a fallback page.)*
2. **`app/opengraph-image.tsx`** — `"Muse Studios"`, the alt text, and the `"AI Transformation, Product Engineering & Gamification — Riyadh"` subtitle. Edge-rendered `ImageResponse`; single-locale by design; cannot use next-intl. Standard practice. **Decision: keep** (no AI tell; `Muse Studios` stays Latin per termbase anyway).
3. **`app/[locale]/careers/[slug]/page.tsx` (lines ~55, 57)** — the template-literal labels `Responsibilities:` / `Requirements:` inside the **JSON-LD `JobPosting` schema `description`** (structured data, never rendered to a user).

**Executor step (only optional, low-priority, non-blocking):** for item 3, the two JSON-LD labels may reuse the *existing* keys `Careers.detail.responsibilities` / `Careers.detail.requirements` (already present in both locales) instead of English literals, for consistency in the `/ar` structured data. This is a keys-already-exist swap — **no new key, no parity work, no copy rewrite.** Items 1 and 2 are left as documented exceptions.

**Net: zero hardcoded user-facing *copy* to rewrite this pass.** No new message keys are created by Part D.

---

# PART E — Source-attribution table

Every non-Muse-voice line in scope, with its verbatim origin. (Most changes this pass are Muse-voice rewrites of deliverable descriptions — no market line does that exact job — so the borrows below are the structure-pass borrows this plan preserves plus the correction-pivot device.)

| Line (as it ships) | Adapts / device | Source (verbatim original) |
|---|---|---|
| `We deliver outcomes, not just tools.` (Home.outcomes — KEEP) | verbatim | mozn.ai: "…we deliver outcomes, not just tools." |
| `The teams we work with aren't a general audience…` (Home.whoWeBuildFor — KEEP) | adapt | zto.sa/en/about: "Our readers aren't a general audience. They're founders building private companies…" |
| `We run it with you, from the first audit to systems in production.` (AI-trans whatWeDoHeadline — KEEP) | adapt (mechanic) | mozn.ai: "…build and deploy production-ready solutions alongside your teams…" |
| `We work inside your team, not from a distance.` (Prod-eng whatWeDoHeadline — KEEP) | adapt | mozn.ai: "Our engineers work inside your environment, not from a distance." |
| `Saudi Arabia's economy is going through a moment that doesn't repeat itself…` (About.moment — KEEP) | verbatim + native | zto.sa: "يمرّ الاقتصاد السعودي بمرحلة نوعية لم تتكرر مسبقًا" |
| `من قلب الرياض إلى العالم` (Careers.origin — KEEP) | adapt | jobs.salla.com: "من قلب مكة إلى العالم" |
| `Join the team building products people here actually use.` (Careers.whyJoin — KEEP) | adapt | mozn.ai/careers: "Join the Team Building Intelligence" |
| `We look for the best.` / `نبحث عن الأفضل.` (Careers.claim — KEEP) | verbatim (AR) | jobs.salla.com: "نبحث عن الأفضل" |
| `No exact match? Say hi anyway.` (Careers.noMatch — KEEP) | adapt | tenex.co: "say hi anyway →" (mechanic; US, line-shape only) |
| `If you're looking for a team to actually build the thing…` (Contact.conditional — KEEP) | adapt | zto.sa: "إذا كنت تبحث عن شريك لتعزيز سردية شركتك…، تواصل معنا" |
| `تغنيك عن متابعة أخبار الذكاء الاصطناعي العامة…` (Newsletter.hero.subtitle AR — KEEP) | adapt (construction) | thmanyah نشرة أها!: "تغنيك عن التصفّح العشوائي لشبكات التواصل…" |
| `We build the thing, not the deck about the thing.` (Footer.worldview — KEEP) | own line reused | Muse hero (own) |
| Correction pivots this pass: `…not slideware`, `…not a memo from the top`, `…not a generic benchmark`; AR `مو شرائح`, `مو تعميم إداري`, `مو على معيار عام` (B2, B3, B12) | device: X-not-Y correction pivot | `Brand Voice#The correction pivot` (gate satisfied — each rejected half is a thing a real competitor does) |

No AR line in this plan is a translation of its EN counterpart; each was built natively and shares only meaning. Tenex supplies mechanics only (US company) — no Tenex line is shipped.

---

# PART F — Rules-compliance checklist (mirrors brief §8)

- **`tsc --noEmit` / `npm run build`** — no key added/renamed/removed; only string *values* change; `services.ts`/`careers.ts` array lengths, object shapes, `slug`/`icon`/`image`/`department`/`crossLinkSlug` unions untouched → types still satisfy `Service[]`/`CareerRole[]`. (Executor runs both with node 24.)
- **EN/AR key parity** — every CHANGE touches the same key in both files; no locale-only key introduced. Parity verified against the live files before writing this plan.
- **No hardcoded user-facing strings** — Part D scan; any hit moves into `messages` with both-locale keys.
- **Grep kills (EN → zero hits):** `highest-leverage` (CHANGE 1), `startup speed` (CHANGE 2, 3), `accelerate your goals` (CHANGE 4), `holistic` + `quantify ROI` + `implementation roadmap` (B4), `bespoke` (B2, B8), `stakeholder interviews` (B1) + `stakeholders` (B7), `upskill` (B2, B3, B8), `cultural buy-in` (B3), `mission-critical` (B10), `robust` (B14), `Marry strategy with implementation` (B9), `progress, roadmap, and next steps` triad (B16), `Identify and qualify` / `Build and manage` verb-pair template (C2), `demand-generation` (C2). Also swept clean earlier: `leverage / empower / streamline / seamless / frictionless / at scale / cutting-edge / world-class / cross-functional / drive growth` → no live hits.
- **AR register** — each AR rewrite lists its markers and sits at 1–2 per paragraph; MSA spine kept for headings/service names/labels/legal/forms; spoken only in bodies/CTAs. No classical (`نتفرّس`-type) and no deep dialect (`تبي/أبغى`). Second-person singular via the verb; Muse as `نحن`.
- **Punctuation/numerals** — straight quotes only, no em/en dashes, Arabic `،` with Latin full stop, Western numerals (`100`, `2`, `6`), Latin brand names untouched.
- **Coined pair frozen** — `Home.approach.heading` (EN + AR) and the card echo sentence `أن تكتفي بـ"استخدام"…` left byte-for-byte (CHANGE 1 preserves sentence 1 exactly).
- **No unearned claims** — no pricing/clients/results/stats/team-size/superlative introduced; the EMPTY-until-real slots stay empty (see Part G).
- **Structure-pass additions not regressed** — WhoWeBuildFor, OutcomesBand, ticker retone, ServiceSubnav, ServiceFAQ, contact conditional, footer worldview, careers intro, about moment, newsletter AR all KEEP; only their AI-ish strings (none found live) would be polished, and their F flags are carried.
- **Legal stays legal** — Privacy/Terms KEEP; no marketing line borrowed in.
- **Metadata in scope** — reviewed all; one light polish (CHANGE 5), rest KEEP.

---

# PART G — EMPTY (E) — intentionally left blank (no honest line)

Carried from the structure pass; do **not** fill until the backing fact is real:
- Proof-as-story band (salla peak-load) — no shipped-work proof.
- Category-owning "the … of … in Saudi Arabia" line (lean) — no category owned.
- Newsletter superlative "best" (thmanyah) — cannot claim.
- Local stat "1 in 3 …" (salla) — no verifiable number.
- "Trusted by leaders" marquee (tenex) — client-trust claim; the commitment line ships instead.
- Footer phone / Complaints link / street address — no real number or intake.
- Careers "Come make history" dare (tenex) — "Come build with us." stays.

---

# PART H — Consolidated F-flagged list (gate before `/ar` publishes)

**New AR rewrites this pass (F):**
1. `Home.approach.cards.ai-transformation.body` AR (rewritten portion; frozen sentence preserved) — CHANGE 1
2. `GetStarted.form.successDelivered` AR — CHANGE 4
3. `services[0]` (AI-trans) AR: `pillars[1].body` (B1), `pillars[2].body` (B2), `whyReasons[2]` (B3), `approachIntro[1]` (B4), `whatWeDo[0..4].body` (B5–B9)
4. `services[1]` (Product-eng) AR: `whyReasons[0]` (B10), `whatWeDo[1].body` (B12), `whatWeDo[2].body` (B13), `whyWorkWithUs[3].body` (B16)
5. `careers.ts` AR: `business-developer.blurb` (C1), `gtm-engineer.blurb` (C3)
6. `careers.ts` AR responsibilities (C2): `business-developer` ×4 (bullets 0,1,3,4), `digital-marketing-director` ×2 (bullets 1,2)

**Carried structure-pass F (flag stays, no string change unless noted):**
7. `Home.whoWeBuildFor.body` AR
8. `About.moment.lead` + `About.moment.continuation` AR
9. `Contact.conditional` AR
10. `Newsletter.hero.subtitle` AR
11. `Careers.whyJoin` / `Careers.noMatch` / `Careers.purpose` AR
12. `services[*].faq[*].a` AR — all three services' FAQ answers

**Carried prior-copy-pass AR (still ungated, not re-touched here):** the four subtitle density rewrites (`Explore`, `Newsletter`, `Contact`, `GetStarted` heroes) and the AI-trans/prod-eng/gamification `intro`/`approachIntro` AR rewrites remain within the standing `/ar` gate.

**General reviewer test** (`Arabic Termbase.md`): does each new paragraph read as a Riyadh product team talking, or as a translation of an American studio — and does it sit in the 1–2-marker band, neither government-form MSA nor performed spoken? The whole `/ar` surface is reviewed, not only this diff; `/ar` stays out of `PUBLISHED_LOCALES` until it clears.

---

# String-change count (by file)

| File | EN changes | AR changes |
|---|---|---|
| `messages/en.json` | 5 | — |
| `messages/ar.json` | — | 2 |
| `lib/content/en/services.ts` | 16 | — |
| `lib/content/ar/services.ts` | — | 13 |
| `lib/content/en/careers.ts` | 8 | — |
| `lib/content/ar/careers.ts` | — | 8 |
| **Total** | **29 EN** | **23 AR** |

**Grand total: 52 string changes** (29 EN + 23 AR) across 6 files.
**F count: 40** (23 new AR rewrites flagged this pass + 17 carried structure-pass AR strings).
