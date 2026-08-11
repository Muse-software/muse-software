# Muse Copy Revision Plan

Prepared for the Sonnet execution session. Deliverable of that session is edited
copy in `messages/en.json`, `messages/ar.json`, `lib/content/en|ar/services.ts`,
`lib/content/en|ar/careers.ts` plus `docs/copy-revision-report.md`. This file is
the instruction set. Every replacement below already honors the non-negotiable
rules; where a real call remains, it is raised in section 2, not silently made.

## 1. Executive summary

The Arabic homepage, `/about`, careers heroes, role blurbs, per-service CTA
verbs, FAQ and ticker are Abdullah's own or already reworked and are kept intact.
The English hero, tagline, subtitle, manifesto, pressure line, ticker, FAQ and
About are approved and kept. The revision is narrow and surgical: (a) strip the
handful of English lines still carrying tenex.co's or a model's fingerprints on
the three service pages, "engineering-as-a-service", "AI transformation partner,
end to end", "extension of your team", "mission critical", "frictionless"; (b)
clear the owed Arabic density backlog, the `/explore`, `/newsletter`, `/contact`,
`/get-started` subtitles and the `services.ts` `intro`/`approachIntro`
paragraphs, each getting one or two spoken markers, not a rewrite; (c) fix one
real inconsistency, the slide count reads 200 in the AI-transformation
`approachIntro` but 100 in the FAQ and the decided termbase line, so it moves to
100 in both locales. Borrowing is light and honest: most lines already pass, so
mozn.ai and salla supply a few structural swaps rather than a wholesale
re-skin. Nothing new is claimed; no pricing, client, result or team-size line is
added. `/ar` still cannot publish until the native review gate clears.

## 2. Decisions needed from Abdullah

Each is a real fork. Recommendation first, alternative second.

- **D1. The coined pair divergence (EN absent→native vs AR uses→builds).**
  Termbase flags this as "allowed but worth a decision, not decided." The pair
  strings are frozen by rule (g) either way.
  **Recommend: keep the divergence.** EN stays "Muse helps you shift from
  AI-absent to AI-native." and AR stays من شركة "تستخدم" الذكاء الاصطناعي، إلى
  شركة تبنيه. It is written-natively, not translated, and the AR framing
  (already dabbling, not at zero) is the sharper local argument.
  *Alternative:* realign EN to a uses→builds phrasing, e.g. "Muse helps you go
  from a company that uses AI to one that builds it." Not recommended, it drops
  the decided AI-absent/AI-native coinage that the ticker and cards lean on.

- **D2. "No 6-month diagnostics. No 200-slide presentations." (EN
  `services` AI-transformation `approachIntro[0]`).** The reference bank names
  this as a line the old main branch copied verbatim from tenex.co; Website
  Voice's own specificity table blesses "No 6 month diagnostics. No 200 slide
  presentations" as the model "passes" example. Genuine tension.
  **Recommend: keep "No 6-month diagnostics", replace the second sentence with
  the decided native line** → "No 6-month diagnostics. No 100-slide strategy
  decks with nothing behind them." This de-duplicates the Tenex phrasing, and
  fixes D3.
  *Alternative:* keep both sentences exactly (trusting the Website Voice table).
  Leaves the 100/200 clash in D3 unresolved.

- **D3. Slide count, 200 vs 100.** The AI-transformation `approachIntro` says
  200 slides in both locales; the home FAQ and the termbase "lines that do not
  survive literal translation" both fix it at 100. **Recommend: 100 everywhere**
  (folded into D2). One number, told the same way twice, is the specificity rule.

- **D4. Pressure section Arabic register.** Homepage AR runs the spoken
  تبنّي الذكاء الاصطناعي مو خيار. والانتظار هو الخطر. The termbase "does not
  survive literal translation" table records the decided form as the MSA
  الذكاء الاصطناعي ليس خيارًا. الانتظار هو المخاطرة. **Recommend: keep the
  spoken homepage line** (rule h, Abdullah's own copy; the homepage body is the
  spoken register by design). *Alternative:* switch to the termbase MSA form.
  Flag only; do not change without a call.

- **D5. English service summaries 1 and 2.** Summary 1 "Your enterprise AI
  strategy, architected and executed, not just decked." echoes the copied Tenex
  line "We set & execute your enterprise AI strategy". Summary 2 "High-velocity
  engineering-as-a-service, without sacrificing quality." uses the
  consultant-speak the brief flagged. **Recommend: rewrite both** (section 3).
  *Alternative:* keep summary 1 (its "not just decked" pivot is strong) and only
  fix summary 2. Acceptable; summary 2's fix is not optional.

- **D6. "We act as your AI transformation partner, end to end."** (EN
  `whatWeDoHeadline`). "AI transformation partner" is the second half of a
  copied Tenex line ("Your AI transformation partner"). **Recommend: rewrite**
  to "We run it with you, from the first audit to systems in production."
  *Alternative:* keep. Not recommended, it is a lifted phrase.

- **D7. English GetStarted points 2 and 3.** Point 2 "Get access to our senior
  product and engineering talent" reads body-shop; point 3 "Build a bespoke
  partnership scoped to your specific bottlenecks" is soft. **Recommend: rewrite
  both** (section 3), medium priority. *Alternative:* keep. Low risk either way.

- **D8. AI-transformation `whyHeadline` Arabic.** EN moves to "Becoming
  AI-native is hard, and nobody does it for you." **Recommend: align AR** to
  البناء على الذكاء الاصطناعي صعب، ولا أحد سيقوم به نيابةً عنك. *Alternative:*
  keep the current clean AR البناء على الذكاء الاصطناعي صعب، لكنه حاسم (حاسم is
  not corporate in Arabic; the locales are allowed to differ). Either is fine.

- **D9. The word "pillars" in the EN AI-transformation `intro[1]`.** It reads
  "across three pillars: product, process, and people transformation." "Pillars"
  is the internal Business Lines term that Website Voice says never appears
  publicly. Different sense here (transformation areas), but a cheap collision to
  avoid. **Recommend: "across three fronts"**. *Alternative:* keep "pillars".

- **D10. Metadata/SEO polish depth.** The descriptions carry the voice
  adequately. **Recommend: keep all, no changes** beyond confirming none repeats
  a string being rewritten elsewhere (none does). *Alternative:* light-polish
  `explore.description` ("How Muse Studios builds." is flat). Optional.

## 3. Per-section plan

Format: **Element** — key path. Current EN / Current AR verbatim, verdict, then
the replacement in both languages. KEEP means the string ships unchanged and is
listed because the brief enumerates it. "n/a" means the locale has no such key.

### Home — hero, tagline, subtitle

- **Hero lead** `Home.hero.headlineLead`. EN "Everyone has an AI strategy." /
  AR "الكل عنده استراتيجية للذكاء الاصطناعي." **KEEP** (rule h, approved).
- **Hero turn** `Home.hero.headlineTurn`. EN "Almost nobody has shipped one." /
  AR "بس قليل جدًا اللي قدر ينفذها." **KEEP** (rule h).
- **Tagline** `Home.hero.tagline`. EN "We're a product team in Riyadh." /
  AR "احنا فريق منتجات في الرياض." **KEEP** (rule h).
- **Subtitle** `Home.hero.subtitle`. EN "We actually build the thing, not just
  the deck about the thing." / AR "نفكر، نصمّم، ونبني الشيء نفسه، لا العرض
  التقديمي عنه." **KEEP** (rule h; AR is the decided "does not survive literal
  translation" line).
- **Hero CTA** `Home.hero.cta`. EN "Get in touch" / AR "تواصل معنا". **KEEP**.

### Home — approach (heading, 3 cards, promises)

- **Approach eyebrow** `Home.approach.eyebrow`. EN "Our approach" / AR "منهجيتنا".
  **KEEP**.
- **Approach heading (coined pair)** `Home.approach.heading`. EN "Muse helps you
  shift from AI-absent to AI-native." / AR ناخذك من شركة "تستخدم" الذكاء
  الاصطناعي، إلى شركة تبنيه. **KEEP EXACT** (rule g; see D1).
- **Card ai-transformation body** `...cards.ai-transformation.body`. EN "Staying
  AI-absent isn't a neutral choice. We find the highest-leverage places to put
  AI to work in how your business actually runs, and stand up the systems that
  do it, with guardrails from day one." / AR contains the frozen echo أن تكتفي
  بـ"استخدام" الذكاء الاصطناعي مو خيار محايد ... **KEEP** (rule g pins the AR
  card echo; EN body is specific and passes).
- **Card ai-transformation promise** `...promise`. EN "Every engagement ends
  with something running in production, not a slide deck." / AR "كل مشروع ينتهي
  بشيء يعمل فعليًا، لا بعرض تقديمي." **KEEP** (Website Voice "passes" example).
- **Card product-engineering body/promise.** EN body "Good ideas stall when
  engineering can't move..." promise "You see it running early and often, not in
  one reveal at the end." / AR mirrors. **KEEP** (both pass; AR density fine).
- **Card gamification body/promise.** EN body "New tools compete with old
  habits..." promise "You're clicking through something real in the first
  week." / AR mirrors. **KEEP**.

### Home — manifesto (heading, 3 paragraphs)

- **Manifesto heading** `Home.manifesto.heading`. EN "The next decade of software
  gets decided in the next two years." / AR "عصر المنتجات الرقمية يتحدّد خلال
  السنتين الجاية." **KEEP** (reworked from, not equal to, the Tenex "Win the next
  decade"; makes a checkable timeline claim; AR is Abdullah's).
- **paragraph1 / paragraph2 / paragraph3.** EN and AR both **KEEP** (rule h,
  AR is Abdullah's own; EN passes specificity, carries the decided "Day to day
  operations always win the calendar" line).
- **Manifesto CTA** `Home.manifesto.cta`. EN "Get started" / AR "ابدأ الآن".
  **KEEP**.

### Home — pressure, ticker

- **Pressure lead/emphasis** `Home.pressure`. EN "AI isn't optional." /
  "Waiting is the risk." AR "تبنّي الذكاء الاصطناعي مو خيار." / "والانتظار هو
  الخطر." **KEEP** (rule h; see D4 for the AR register flag).
- **Ticker** `Home.ticker`. EN "Built for the AI-native era" / AR "مبنيّ لعصر
  الذكاء الاصطناعي". **KEEP** (rule h; termbase عصر الذكاء الاصطناعي).

### Home — FAQ (5 Q&A)

All five Q&A **KEEP** in both locales (rule h, FAQ content approved; AR already
spoken with correct density). Verbatim retained:
1. "How is Muse different from a typical dev shop?" / "وش يفرقكم عن شركات
   التطوير الثانية؟"
2. "What does AI transformation actually mean?" / "ما معنى التحوّل بالذكاء
   الاصطناعي عمليًا؟"
3. "Who's on the team?" / "مين في الفريق؟"
4. "How does pricing work?" / "كيف يعمل التسعير؟"
5. "Who do you typically work with?" / "مع من تعملون بالعادة؟"
Note for the report: the EN answer to Q1 carries "No 100-slide strategy decks
with nothing behind them." — this is the number the AI-transformation
`approachIntro` must be aligned to (D2/D3), not changed here.

### Explore hero

- **Eyebrow/title** `Explore.hero`. EN "Explore" / "What we build." AR "استكشف"
  / "ما الذي نبنيه." **KEEP**.
- **Subtitle** `Explore.hero.subtitle`. **EN KEEP:** "Three ways we help teams
  move at startup speed. Pick one, or combine all three."
  **AR REWRITE** (density backlog). Current: "ثلاث طرق نساعد بها الفرق على
  التحرك بسرعة الشركات الناشئة. اختر واحدة، أو اجمع الثلاث."
  New AR: "ثلاث طرق نساعد فيها الفرق تتحرك بسرعة الشركات الناشئة. اختر وحدة، أو
  اجمعها كلها." (markers: dropped على + spoken وحدة/اجمعها كلها, ~1–2; keeps the
  termbase سرعة الشركات الناشئة.)

### Newsletter hero + 3 points

- **Eyebrow/title** `Newsletter.hero`. EN "Newsletter" / "Get the field notes in
  your inbox." AR "النشرة البريدية" / "تصلك ملاحظاتنا الميدانية في بريدك." **KEEP**.
- **Subtitle** `Newsletter.hero.subtitle`. **EN KEEP:** "The same thinking that
  goes into the work, sent directly. No need to check back."
  **AR REWRITE** (density backlog). Current: "التفكير نفسه الذي يقف خلف عملنا،
  يصلك مباشرة دون أن تعود للتفقّد."
  New AR: "نفس التفكير اللي وراء شغلنا، يوصلك مباشرة بدون ما ترجع تتفقّد."
  (markers: اللي, شغلنا, بدون ما — trimmed to read as 2 beats.)
- **Point 1** `Newsletter.points[0]`. EN "One short, opinionated read. No filler,
  no 10-tip listicles." **KEEP.** AR "قراءة واحدة قصيرة ولها رأي، بلا حشو وبلا
  قوائم من عشر نصائح." **KEEP** (already carries voice; MSA acceptable here).
- **Point 2** `[1]`. EN "What we're actually seeing across client engagements,
  not general AI news." **KEEP** (correction pivot). AR "ما نراه فعلًا في مشاريع
  عملائنا، لا أخبار الذكاء الاصطناعي العامة." **KEEP.**
- **Point 3** `[2]`. EN "Sent when there's something worth saying, not on a fixed
  schedule." **KEEP.** AR "ترسل حين يكون هناك ما يستحق القول، لا وفق جدول ثابت."
  **KEEP.**

### Contact hero + subtitle + methods

- **Eyebrow/title** `Contact.hero`. EN "Contact Us" / "Let's talk." AR "تواصل
  معنا" / "لنتحدث." **KEEP**.
- **Subtitle** `Contact.hero.subtitle`. **EN KEEP:** "Tell us what you're
  building. We usually reply the same day."
  **AR REWRITE** (density backlog). Current: "أخبرنا بما تبنيه، ونردّ عادة في
  اليوم نفسه."
  New AR: "قل لنا وش تبني، وغالبًا نردّ في نفس اليوم." (marker: قل لنا وش, matches
  the footer voice; 1 marker.)
- **Methods** `Contact.methods` EN "WhatsApp"/"Email", AR "واتساب"/"البريد
  الإلكتروني". **KEEP** (functional labels; MSA spine).
- **orFindUsOn / formHeading.** EN "Or find us on" / "Or send us a message". AR
  "أو تجدنا على" / "أو أرسل لنا رسالة". **KEEP**.

### Get-started hero + subtitle + 3 points

- **Eyebrow/title** `GetStarted.hero`. EN "Get Started" / "Ready to build with
  Muse?" AR "ابدأ الآن" / "مستعد تبني معنا؟" **KEEP**.
- **Subtitle** `GetStarted.hero.subtitle`. **EN KEEP:** "From product engineering
  to end-to-end AI transformation. Every engagement ends with something running
  in production."
  **AR REWRITE** (density backlog, light). Current: "من هندسة المنتجات إلى
  التحوّل الكامل بالذكاء الاصطناعي. كل مشروع ينتهي بشيء يعمل فعليًا."
  New AR: "من هندسة المنتجات إلى التحوّل الكامل بالذكاء الاصطناعي. وأي شغل نبدأه
  ينتهي بشيء يعمل فعليًا." (marker: شغل; keeps the service name MSA and the
  decided يعمل فعليًا.)
- **Point 1** `GetStarted.points[0]`. EN "Get a scoped plan for where AI actually
  removes friction in your business" **KEEP.** AR "احصل على خطة محدّدة تبيّن أين
  يزيل الذكاء الاصطناعي احتكاكًا فعليًا في عملك" **KEEP.**
- **Point 2** `[1]` (see D7). EN current "Get access to our senior product and
  engineering talent" → **REWRITE:** "Work directly with the senior team that
  builds it, not a sales layer." AR current "احصل على كفاءاتنا في المنتج
  والهندسة" → **REWRITE:** "تشتغل مباشرة مع الفريق اللي يبني، مو مع طبقة مبيعات."
- **Point 3** `[2]` (see D7). EN current "Build a bespoke partnership scoped to
  your specific bottlenecks" → **REWRITE:** "Scope the work to your actual
  bottlenecks, and see something running early." AR current "ابنِ شراكة مصمّمة
  على قياس اختناقاتك تحديدًا" → **REWRITE:** "نفصّل العمل على اختناقاتك بالذات،
  وتشوف شيء يعمل فعليًا مبكرًا."
  (Openings now vary Get / Work / Scope in EN, احصل / تشتغل / نفصّل in AR.)

### Footer blurb + CTA

- **Blurb** `Footer.blurb`. EN "Tell us what you're building. We'll tell you what
  it would take, and whether we're the right team for it." / AR "قل لنا وش تبني،
  ونقول لك وش يحتاج، وإذا كنا الفريق المناسب له." **KEEP** (both specific; AR
  spoken and clean).
- **CTA** `Footer.cta`. EN "Get started" / AR "ابدأ معنا". **KEEP**.
- **CTA block** `CTA.heading`/`subheading`/`button`. EN "Tell us what you're
  trying to build." / "The first conversation is with the people who would build
  it, not a sales layer." / "Get started". AR "علّمنا وش المشكلة اللي تواجهها،
  واترك بناء الحل علينا." / "أول محادثة تكون مع اللي بيشتغلون عليه، مو مع فريق
  مبيعات." / "ابدأ الآن". **KEEP** (correction pivot present; AR spoken).

### Metadata / SEO (all pages) — see D10

All **KEEP**. Confirmed none repeats a string being rewritten elsewhere.
- `siteDescription` EN "A product team in Riyadh. We build the thing, not the
  deck about the thing." / AR "فريق منتجات في الرياض. نبني الشيء نفسه، لا العرض
  التقديمي عنه." **KEEP.**
- `organizationDescription` EN/AR **KEEP** (uses the three service names).
- `home.title` / `home.description` EN/AR **KEEP** (home.description mirrors the
  approved hero; AR carries the decided لدى الجميع ... شغّلوها فعلًا line).
- `about` / `explore` / `careers` / `newsletter` / `contact` / `getStarted` /
  `privacy` / `terms` titles + descriptions EN/AR **KEEP.** Optional under D10:
  polish `explore.description` EN "...gamification & experience. How Muse Studios
  builds." → "...gamification & experience. What Muse builds, and how." (kept out
  of scope unless Abdullah opts in.)

### Services — summaries (3), intros, approachIntro, pillars, headlines, CTAs

**AI Transformation** (`services[0]`):
- **summary** (D5). EN current "Your enterprise AI strategy, architected and
  executed, not just decked." → **REWRITE:** "Your AI strategy, executed all the
  way to production, not just decked." AR current "استراتيجية الذكاء الاصطناعي
  لمؤسستك، مصمّمة ومنفّذة، لا معروضة في شرائح." → **KEEP** (clean MSA, keeps the
  pivot لا معروضة في شرائح).
- **cta** EN "Plan the transformation" / AR "خطّط للتحوّل". **KEEP** (rule i,
  verbs vary Plan/Build/Design).
- **intro[0]** (specificity; D3). EN current "As the cost of intelligence
  approaches zero, Saudi businesses that stay AI-absent will fall behind. The gap
  compounds every quarter you wait." → **REWRITE:** "The gap compounds every
  quarter you wait. Businesses that stay AI-absent get left behind by the ones
  that moved." AR current "مع اقتراب كلفة الذكاء من الصفر، الشركات السعودية التي
  تبقى غائبة عن الذكاء الاصطناعي ستتأخر. والفجوة تكبر كل ربع تنتظره." →
  **REWRITE:** "كل ربع تنتظره، تكبر الفجوة بينك وبين من تحرّك. والشركة اللي تبقى
  غائبة عن الذكاء الاصطناعي بتتأخر." (drops the grand "cost approaches zero"
  clause that duplicated the manifesto; markers: اللي, بتتأخر; keeps termbase
  غائب عن الذكاء الاصطناعي.)
- **intro[1]** (D9). EN current "We architect your AI strategy and execute it
  across three pillars: product, process, and people transformation." →
  **REWRITE:** "We build your AI strategy and run it across three fronts:
  product, process, and people." AR current "نصمّم استراتيجيتك للذكاء الاصطناعي
  وننفّذها عبر ثلاثة محاور: تحوّل المنتج، وتحوّل العمليات، وتحوّل الناس." →
  **KEEP** (AR already uses محاور, not the pillar term).
- **approachHeading** EN "Strategy" / AR "الاستراتيجية". **KEEP** (MSA spine).
- **approachIntro[0]** (D2/D3). EN current "No 6-month diagnostics. No 200-slide
  presentations." → **REWRITE:** "No 6-month diagnostics. No 100-slide strategy
  decks with nothing behind them." AR current "لا تشخيص يمتد ستة أشهر. لا عروض
  من 200 شريحة." → **REWRITE:** "لا تشخيص يمتد ستة أشهر. ولا عروض استراتيجية من
  100 شريحة لا شيء خلفها." (matches the decided termbase line and the FAQ.)
- **approachIntro[1]** (density). EN current "We get straight to it. 2 to 6 week
  holistic and function-specific audits that surface the most compelling AI use
  cases, quantify ROI, and map an implementation roadmap." → **KEEP** (EN passes;
  varied, specific). AR current "ندخل في الموضوع مباشرة: مراجعات شاملة أو خاصة
  بوظيفة بعينها، مدتها من أسبوعين إلى ستة أسابيع، تُظهر أقوى حالات استخدام الذكاء
  الاصطناعي، وتقيس العائد على الاستثمار، وترسم خارطة طريق للتنفيذ." → **REWRITE**
  (1 marker): "ندخل في الموضوع على طول: مراجعة شاملة أو خاصة بوظيفة بعينها، من
  أسبوعين إلى ستة أسابيع، تُظهر أقوى حالات استخدام الذكاء الاصطناعي، وتقيس العائد
  على الاستثمار، وترسم خارطة طريق للتنفيذ." (marker: على طول; the verb chain
  تُظهر/تقيس/ترسم is the one allowed comma-chain beat; keeps termbase العائد على
  الاستثمار.)
- **approachIntro[2]** (density). EN current "Every engagement ends with a clear
  adoption report your team can run with, or hand back to us for execution." →
  **KEEP.** AR current "كل مشروع ينتهي بتقرير تبنٍّ واضح يستطيع فريقك العمل به،
  أو يعيده إلينا للتنفيذ." → **REWRITE** (markers): "كل مشروع ينتهي بتقرير تبنٍّ
  واضح يقدر فريقك يشتغل عليه، أو يرجّعه لنا عشان ننفّذه." (markers: يشتغل, عشان;
  keeps termbase التبنّي.)
- **pillars[0..2]** (Product/Process/People Transformation, EN + AR bodies).
  **KEEP** all six strings (specific, MSA spine; the crossLink label
  "Just interested in Product Engineering?" / "تهمّك هندسة المنتجات وحدها؟"
  stays).
- **whyHeadline** (D8). EN current "Becoming AI-native is difficult, but mission
  critical" → **REWRITE:** "Becoming AI-native is hard, and nobody does it for
  you." AR current "البناء على الذكاء الاصطناعي صعب، لكنه حاسم" → **REWRITE
  (recommended, see D8):** "البناء على الذكاء الاصطناعي صعب، ولا أحد سيقوم به
  نيابةً عنك." (or KEEP current per D8 alternative.)
- **whyReasons[0..3]** EN + AR. **KEEP** all (specific; AR clean MSA).
- **whatWeDoHeadline** (D6). EN current "We act as your AI transformation
  partner, end to end." → **REWRITE:** "We run it with you, from the first audit
  to systems in production." AR current "نعمل شريكًا لك في التحوّل بالذكاء
  الاصطناعي، من طرف إلى طرف." → **REWRITE:** "نديره معك، من أول مراجعة حتى أنظمة
  تعمل فعليًا." (removes the calque من طرف إلى طرف; keeps termbase مراجعة, يعمل
  فعليًا.)
- **whatWeDo[0..4]** (Process Survey, Executive Survey, Expert Interviews, Custom
  Training Programs, AI Tooling — EN + AR titles and bodies). **KEEP** all
  (concrete deliverable list; MSA spine).

**Product Engineering** (`services[1]`):
- **summary** (D5). EN current "High-velocity engineering-as-a-service, without
  sacrificing quality." → **REWRITE:** "Production-grade software, shipped fast,
  without dropping the quality bar." AR current "هندسة عالية السرعة كخدمة، دون
  التنازل عن الجودة." → **REWRITE:** "برمجيات جاهزة للتشغيل، تُطلق بسرعة، بلا
  تنازل عن الجودة." (removes كخدمة / "as-a-service"; keeps termbase جاهزة
  للتشغيل.)
- **cta** EN "Build the product" / AR "ابنِ المنتج". **KEEP** (rule i).
- **intro[0]** (density, AR). EN current "From first prototype to production
  scale, we design and ship production-grade software fast, without dropping the
  quality bar to get there." → **KEEP.** AR current "من النموذج الأوّلي الأول
  حتى التشغيل الكامل، نصمّم برمجيات جاهزة للتشغيل ونطلقها بسرعة، دون خفض معيار
  الجودة للوصول إلى ذلك." → **REWRITE** (markers): "من النموذج الأوّلي الأول حتى
  التشغيل الكامل، نصمّم برمجيات جاهزة للتشغيل ونطلقها بسرعة، دون ما نخفض معيار
  الجودة عشان نوصل." (markers: دون ما, عشان.)
- **approachHeading** EN "What we believe" / AR "ما نؤمن به". **KEEP**.
  `approachIntro` is `[]` in both — no string.
- **pillars[0..3]** (We hire the best / We use AI (a lot) / written quality bar /
  measure on what shipped — EN + AR). **KEEP** all (strong, specific).
- **whyHeadline** EN "Hiring in-house is slow, risky, and extremely important" /
  AR "التوظيف الداخلي بطيء ومحفوف بالمخاطر وبالغ الأهمية". **KEEP** (passes).
- **whyReasons[0..3]** EN + AR. **KEEP** all.
- **whatWeDoHeadline.** EN current "We become an extension of your team, building
  whatever you need." → **REWRITE** (borrow mozn.ai): "We work inside your team,
  not from a distance." AR current "نصبح امتدادًا لفريقك، ونبني ما تحتاجه." →
  **REWRITE:** "نعمل داخل فريقك، لا من بعيد." (mirrors mozn AR داخل بيئتك ... لا
  من بعيد.)
- **whatWeDo[0..4]** (Application Development, Fine-Tuning Models, Code Migration
  & Refactors, Data Engineering & Analysis, Custom Agentic Solutions — EN + AR).
  **KEEP** all (concrete; AR uses termbase وكلاء أذكياء).
- **whyWorkHeadline.** EN current "We slot into your workflow for frictionless
  collaboration." → **REWRITE:** "We work inside the tools your team already
  uses." AR current "ندخل في سير عملك لتعاون بلا احتكاك." → **REWRITE:** "نعمل
  داخل الأدوات التي يستخدمها فريقك أصلًا." (kills "frictionless"/بلا احتكاك, near
  the banned "seamless"; matches the Shared Tracking card.)
- **whyWorkWithUs[0..5]** (Dedicated Team, Agile By Default, Shared Tracking,
  Regular Check-ins, Something Working Early, Shared Comms — EN + AR). **KEEP**
  all.

**Gamification & Experience** (`services[2]`):
- **summary** EN "Turn adoption into something people actually want to do." / AR
  "حوّل التبنّي إلى شيء يريد الناس فعله." **KEEP** (specific; termbase التبنّي).
- **cta** EN "Design the experience" / AR "صمّم التجربة". **KEEP** (rule i).
- **intro[0]** (density, AR). EN current "Interactive, rewarding digital
  experiences that make change stick instead of stalling out." → **KEEP.** AR
  current "تجارب رقمية تفاعلية ومجزية تجعل التغيير يثبت بدل أن يتعثر." →
  **REWRITE** (markers): "تجارب رقمية تفاعلية ومجزية تخلّي التغيير يثبت بدل ما
  يتعثّر." (markers: تخلّي, بدل ما.)
- **approachHeading** EN "What we believe" / AR "ما نؤمن به". **KEEP**.
  `approachIntro` is `[]`.
- **pillars[0..2]** (Behavior beats decoration / first win matters most /
  Prototypes beat specs — EN + AR). **KEEP** all.
- **whyHeadline** EN "Adoption dies quietly, long before anyone notices" / AR
  "التبنّي يخبو بهدوء، قبل أن ينتبه أحد بوقت طويل". **KEEP** (carries the decided
  يخبو register line).
- **whyReasons[0..3]** EN + AR. **KEEP** all.
- **whatWeDoHeadline** EN "We design the experience people actually stick with."
  / AR "نصمّم التجربة التي يبقى الناس عليها فعلًا." **KEEP**.
- **whatWeDo[0..3]** (Reward System Design, Onboarding Journeys, Interactive
  Prototypes, Engagement Analytics — EN + AR). **KEEP** all.
- **whyWorkHeadline** EN "We build the experience and the engineering behind it."
  / AR "نبني التجربة والهندسة التي خلفها." **KEEP**.
- **whyWorkWithUs[0..2]** (One Team Start to Finish, Weekly Playable Builds, Data
  From Day One — EN + AR). **KEEP** all.

### Services message strings (`messages.Services`)

- `overview`, `whatThatLooksLike`, `detail.eyebrow`, `detail.getStarted`,
  `detail.whyYouNeedUs`, `detail.whatWeDo`, `detail.whyWorkWithUs`,
  `detail.ticker` — EN/AR **KEEP** all (MSA spine section labels; ticker matches
  Home).

### Careers — hero subtitle + 3 role blurbs

- **Hero title/subtitle** `Careers.hero`. EN "Come build with us." / "We're a
  small, senior team based in Riyadh. These are the kinds of roles we typically
  grow into, so reach out even if nothing below is an exact match." AR "تعال ابنِ
  معنا." / "احنا فريق صغير من أصحاب الخبرة، مقرّه الرياض. هذه الأدوار اللي ننمو
  نحوها عادة، وتواصل معنا حتى لو ما ينطبق عليك شيء منها بالضبط." **KEEP** (rule h;
  AR already spoken; "reach out even if" is the wanted say-hi-anyway beat).
- **Role blurb business-developer** EN "Build and manage the pipeline that turns
  conversations into signed engagements." / AR "ابنِ وأدر مسار الفرص اللي يحوّل
  المحادثات إلى مشاريع موقّعة." **KEEP**.
- **Role blurb digital-marketing-director** EN "Own how Muse shows up in public,
  and the demand that follows from it." / AR "تملّك حضورنا أمام الناس، والطلب
  اللي يجي منه." **KEEP**.
- **Role blurb gtm-engineer** EN "Build the tooling and automation that makes
  go-to-market run like a product." / AR "ابنِ الأدوات والأتمتة اللي تخلي دخول
  السوق يشتغل مثل المنتج." **KEEP**.

(Careers responsibilities/requirements/niceToHaves and the About page, values,
beliefs, leadership bios, legal, forms, nav and departments are out of scope per
the brief and rule h; not touched.)

## 4. Reference borrowings table

Borrowing is deliberately light: most lines already pass, so the bank supplies
structure, not sentences. Sources are in `docs/copy-reference-bank.md`.

| New line | Adapts | Source |
|---|---|---|
| EN "We work inside your team, not from a distance." (product-eng `whatWeDoHeadline`) | "Our engineers work inside your environment, not from a distance." | mozn.ai |
| AR "نعمل داخل فريقك، لا من بعيد." | يعمل مهندسونا داخل بيئتك التشغيلية ... (the داخل / لا-من-بعيد shape) | mozn.ai |
| EN "We run it with you, from the first audit to systems in production." (AI-trans `whatWeDoHeadline`) | "They build and deploy production-ready solutions alongside your teams, proving value in weeks, not quarters." (the alongside-you, to-production mechanic; the weeks/quarters ROI claim deliberately NOT taken) | mozn.ai |
| EN "Businesses that stay AI-absent get left behind by the ones that moved." (AI-trans `intro[0]`) | "It's time to base your decisions on intelligence, not chance." (X-not-Y thesis rhythm) | mozn.ai |
| EN summaries kept lean around "production", "quality bar" | "we deliver outcomes, not just tools." (outcomes-not-tools discipline) | mozn.ai |
| EN "Work directly with the senior team that builds it, not a sales layer." (GetStarted point 2) | "No contracts, just easy connection" (fear-killer, X-not-Y) | salla.com |
| Careers "reach out even if nothing below is an exact match" (kept) | "say hi anyway" / "View open roles" CTA discipline | tenex.co |

No AR line is a translation of an English line; each AR rewrite was built
natively and only shares meaning. Salla's Arabic delegation register
(خل التسويق علينا) and zto's conditional contact CTA were considered for the
contact/footer lines but the existing spoken Muse copy already lands, so they
were not used, per "cut/keep rather than pad."

## 5. Rules compliance checklist

- **(a) Specificity test.** Every rewrite names something checkable: "to
  production", "the first audit", "the tools your team already uses", "100-slide
  strategy decks", "the ones that moved". The three lines a competitor could
  publish unchanged ("engineering-as-a-service", "extension of your team",
  "frictionless collaboration", "mission critical") are removed.
- **(b) No undecided claims.** No pricing, client names/logos/results,
  team-size or publishing-history line is added. mozn's "proving value in weeks,
  not quarters" was explicitly not borrowed because it is an ROI-timeline
  commitment Muse has not decided. "Senior team" language already exists in the
  approved FAQ/careers copy and is not extended.
- **(c) Arabic register.** MSA spine kept for headings, service names, section
  labels, form/nav/legal. Spoken markers added only to marketing bodies and
  subtitles, held to 1–2 per paragraph (each rewrite lists its markers). Second
  person singular via the verb (تبني، تشتغل، تشوف); Muse as نحن (نعمل، نديره،
  نفصّل). Verbs over verbal nouns.
- **(d) No classical (نتفرّس-type), no deep dialect (تبي/أبغى).** Markers used
  are only the decided plain set: اللي، وش، عشان، مو، بدون ما، على طول، بالذات،
  شغل. None needs a glossary; none is Najdi particle dialect.
- **(e) Banned phrases.** "frictionless" (adjacent to banned "seamless")
  removed; none of the banned list is introduced. Checked against Brand Voice
  list.
- **(f) Punctuation and numerals.** Straight quotes only; no em/en dashes in any
  new string. Western numerals (100, 6, 2, 500). Arabic punctuation ، and the
  Latin full stop. Latin brand names (Muse, ChatGPT, LinkedIn) untouched.
- **(g) Coined pair frozen.** EN "Muse helps you shift from AI-absent to
  AI-native.", AR heading من شركة "تستخدم" الذكاء الاصطناعي، إلى شركة تبنيه, AR
  card أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد — all left byte-for-byte
  (D1 only asks a direction question, does not change them).
- **(h) Approved lines stay.** EN hero 2-liner, tagline, subtitle; AR hero +
  manifesto; About page, values, beliefs; FAQ; ticker; pressure — all KEEP.
- **(i) Per-service CTA verbs vary.** Plan / Build / Design (خطّط / ابنِ / صمّم)
  untouched. GetStarted point openings also varied (Get / Work / Scope).
- **(j) Keys and placeholders.** No key added, renamed or removed. `{year}`,
  `{role}`, `{department}`, `{updated}`, ICU plural forms, and the `<terms>` /
  `<privacy>` rich-text tags are all untouched (none sits in a rewritten
  string).
- **(k) Locale symmetry.** Every rewrite touches the same key in both files; no
  key exists in one locale only after the edit. Services/careers array lengths
  and object shapes unchanged.
- **(l) Arabic written natively.** Each AR rewrite carries the English meaning
  in a different sentence, not a translated one (e.g. intro[0] rebuilds around
  كل ربع تنتظره rather than tracking "as the cost of intelligence approaches
  zero").

## 6. Execution order for the Sonnet session + verification

Do the edits in this order so the risky, decision-gated changes come after the
owed, unambiguous ones.

1. **Confirm decisions.** Get Abdullah's calls on D1–D10 before writing. D2/D3
   (slide count) and D5/D6 (EN summaries + Tenex-echo headline) gate real string
   changes; D4/D8 gate register choices. Nothing below is written until these
   are settled.
2. **Arabic density backlog (owed, low-risk first).** In this order:
   `ar.json` Explore, Newsletter, Contact, GetStarted subtitles → `GetStarted`
   points 2–3 (if D7 yes) → `ar/services.ts` AI-transformation `intro[0]`,
   `approachIntro[1]`, `approachIntro[2]`, product-engineering `intro[0]`,
   gamification `intro[0]`. Keep each to 1–2 markers; re-read against the list in
   section 3.
3. **The slide-count fix (D2/D3).** `en/services.ts` and `ar/services.ts`
   `approachIntro[0]` → 100. Cross-check the number now matches the home FAQ in
   both locales.
4. **English service rewrites (D5/D6).** `en/services.ts` summaries 1–2, AI-trans
   `intro[0]`, `intro[1]` (D9), `whyHeadline` (D8), `whatWeDoHeadline`;
   product-eng summary, `whatWeDoHeadline`, `whyWorkHeadline`. Mirror the AR
   headline/summary rewrites named in section 3.
5. **Report.** Write `docs/copy-revision-report.md`: per-section EN+AR changes,
   the section-4 borrowings, and the native-review note below.

**Verification steps (run after edits, fix anything that breaks):**

- **JSON validity:** parse both message files, e.g.
  `node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))"`
  and the same for `ar.json`. Must exit clean.
- **Keys and placeholders intact:** diff the key sets of `en.json` vs `ar.json`
  (they must be identical), and grep the changed strings for `{year}`, `{role}`,
  `{department}`, `{updated}`, ICU `plural`, and `<terms>`/`<privacy>` to confirm
  none was dropped. Only string *values* changed, never keys.
- **Types:** `npx tsc --noEmit` (repo typecheck). The services/careers arrays
  must still satisfy `Service[]` / `CareerRole[]`; `slug`, `icon`, `image`,
  `crossLinkSlug`, `department` union values are unchanged, so this should pass.
- **Locale symmetry:** confirm `services.ts` and `careers.ts` have the same
  number of records and the same array lengths (`intro`, `approachIntro`,
  `pillars`, `whyReasons`, `whatWeDo`, `whyWorkWithUs`, `points`) in EN and AR.
- **Punctuation sweep:** grep all changed files for em dash, en dash, guillemets
  and Arabic-Indic digits; expect zero hits.
- **Build smoke (optional):** `npm run build` or the repo's lint to catch a
  malformed rich-text tag in the newsletter consent string (untouched, but cheap
  insurance).

## Note — what still needs a native Arabic reviewer before `/ar` goes public

Per the Brand Voice review gate and the standing status in Arabic Termbase
("drafted, not reviewed"; `/ar` stays out of `PUBLISHED_LOCALES` until it
passes), none of the Arabic here ships on the strength of this plan. A native
Saudi writer must still sign off on:

1. **The density-pass rewrites** (the four subtitles and the five
   `services.ts` paragraphs). The judgement call is exactly the one the termbase
   flags: does each now read as a Riyadh product team talking, or has a marker
   like شغل / على طول / بالذات tipped it into performing the register? Confirm
   each paragraph still sits at 1–2 markers, not more.
2. **The coined pair**, من شركة "تستخدم" الذكاء الاصطناعي، إلى شركة تبنيه and its
   card echo — does it land as one pair, unchanged by this revision but never yet
   gated.
3. **The new AR headlines**, نديره معك، من أول مراجعة حتى أنظمة تعمل فعليًا and
   نعمل داخل فريقك، لا من بعيد and نعمل داخل الأدوات التي يستخدمها فريقك أصلًا —
   rebuilt, not translated, so rebuilt-wrong is the risk.
4. **The pressure-line register (D4)** and **the whyHeadline choice (D8)** —
   both are register decisions a native ear should confirm, not just the drafter.
5. **The homepage and about copy already in place** — carried over untouched but
   still un-gated; the reviewer checks the whole `/ar` surface, not only the
   diff, so it is checked here too.
