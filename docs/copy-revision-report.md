# Muse Copy Revision — Execution Report

Executed against `docs/copy-revision-plan.md` section 3, applying the
RECOMMENDED option for every decision in section 2. No decisions were
re-opened or re-made; this is a record of what was applied, not a new review.

## Files changed

- `messages/en.json` — 2 strings changed (GetStarted points 2 and 3).
- `messages/ar.json` — 6 strings changed (Explore/Newsletter/Contact/
  GetStarted subtitles, GetStarted points 2 and 3).
- `lib/content/en/services.ts` — 9 strings changed (AI Transformation:
  summary, intro[0], intro[1], approachIntro[0], whyHeadline,
  whatWeDoHeadline — 6 values; Product Engineering: summary,
  whatWeDoHeadline, whyWorkHeadline — 3 values).
- `lib/content/ar/services.ts` — 10 strings changed (AI Transformation:
  intro[0], approachIntro[0], approachIntro[1], approachIntro[2],
  whyHeadline, whatWeDoHeadline; Product Engineering: summary, intro[0],
  whatWeDoHeadline, whyWorkHeadline; Gamification: intro[0]).
- `lib/content/en/careers.ts`, `lib/content/ar/careers.ts` — untouched (out
  of scope per plan section 3 / brief).

Exact per-file string counts (values changed, not counting KEEP entries):

| File | Strings changed |
|---|---|
| `messages/en.json` | 2 |
| `messages/ar.json` | 6 |
| `lib/content/en/services.ts` | 9 |
| `lib/content/ar/services.ts` | 11 |

## Applied decisions (section 2)

- **D1** (coined pair divergence): kept as-is, no change. Recommended option.
- **D2/D3** (slide count + second sentence): applied. AI-transformation
  `approachIntro[0]` now reads 100 slides in both locales, matching the FAQ.
  EN: "No 6-month diagnostics. No 100-slide strategy decks with nothing
  behind them." AR: "لا تشخيص يمتد ستة أشهر. ولا عروض استراتيجية من 100 شريحة
  لا شيء خلفها."
- **D4** (pressure section AR register): not changed, flagged only per the
  plan (recommend keep the spoken homepage line, no call was made here to
  change it).
- **D5** (EN summaries 1 and 2): both rewritten (recommended option, not the
  "keep summary 1" alternative).
- **D6** (`whatWeDoHeadline`, AI transformation): rewritten to "We run it
  with you, from the first audit to systems in production."
- **D7** (GetStarted points 2 and 3, EN + AR): both rewritten.
- **D8** (`whyHeadline` AR alignment): applied the recommended alignment —
  AR now reads "البناء على الذكاء الاصطناعي صعب، ولا أحد سيقوم به نيابةً
  عنك."
- **D9** ("pillars" → "fronts" in EN `intro[1]`): applied.
- **D10** (metadata/SEO): no changes, kept all as the plan directs.

## Per-section changes

### Home, About, Footer, CTA, Careers (messages.json)

No changes. All KEEP per plan section 3.

### Explore hero subtitle (AR density backlog)

- AR: "ثلاث طرق نساعد بها الفرق على التحرك بسرعة الشركات الناشئة. اختر واحدة،
  أو اجمع الثلاث." → "ثلاث طرق نساعد فيها الفرق تتحرك بسرعة الشركات الناشئة.
  اختر وحدة، أو اجمعها كلها." Markers: dropped على, spoken وحدة / اجمعها كلها
  (~1-2 markers). EN unchanged.

### Newsletter hero subtitle (AR density backlog)

- AR: "التفكير نفسه الذي يقف خلف عملنا، يصلك مباشرة دون أن تعود للتفقّد." →
  "نفس التفكير اللي وراء شغلنا، يوصلك مباشرة بدون ما ترجع تتفقّد." Markers:
  اللي, شغلنا, بدون ما. EN unchanged.

### Contact hero subtitle (AR density backlog)

- AR: "أخبرنا بما تبنيه، ونردّ عادة في اليوم نفسه." → "قل لنا وش تبني، وغالبًا
  نردّ في نفس اليوم." Marker: قل لنا وش, matching the footer voice. EN
  unchanged.

### GetStarted hero subtitle + points 2-3 (AR density backlog + D7)

- Subtitle AR: "من هندسة المنتجات إلى التحوّل الكامل بالذكاء الاصطناعي. كل
  مشروع ينتهي بشيء يعمل فعليًا." → "من هندسة المنتجات إلى التحوّل الكامل
  بالذكاء الاصطناعي. وأي شغل نبدأه ينتهي بشيء يعمل فعليًا." Marker: شغل. EN
  unchanged.
- Point 2 EN: "Get access to our senior product and engineering talent" →
  "Work directly with the senior team that builds it, not a sales layer."
  AR: "احصل على كفاءاتنا في المنتج والهندسة" → "تشتغل مباشرة مع الفريق اللي
  يبني، مو مع طبقة مبيعات."
- Point 3 EN: "Build a bespoke partnership scoped to your specific
  bottlenecks" → "Scope the work to your actual bottlenecks, and see
  something running early." AR: "ابنِ شراكة مصمّمة على قياس اختناقاتك
  تحديدًا" → "نفصّل العمل على اختناقاتك بالذات، وتشوف شيء يعمل فعليًا
  مبكرًا."

### Services — AI Transformation (`lib/content/en|ar/services.ts`)

- **summary** (D5). EN: "Your enterprise AI strategy, architected and
  executed, not just decked." → "Your AI strategy, executed all the way to
  production, not just decked." AR unchanged (KEEP).
- **intro[0]** (specificity + D3). EN: "As the cost of intelligence
  approaches zero, Saudi businesses that stay AI-absent will fall behind.
  The gap compounds every quarter you wait." → "The gap compounds every
  quarter you wait. Businesses that stay AI-absent get left behind by the
  ones that moved." AR: "مع اقتراب كلفة الذكاء من الصفر، الشركات السعودية
  التي تبقى غائبة عن الذكاء الاصطناعي ستتأخر. والفجوة تكبر كل ربع تنتظره." →
  "كل ربع تنتظره، تكبر الفجوة بينك وبين من تحرّك. والشركة اللي تبقى غائبة عن
  الذكاء الاصطناعي بتتأخر." Markers: اللي, بتتأخر.
- **intro[1]** (D9). EN: "We architect your AI strategy and execute it
  across three pillars: product, process, and people transformation." → "We
  build your AI strategy and run it across three fronts: product, process,
  and people." AR unchanged (KEEP, already uses محاور not the pillar term).
- **approachIntro[0]** (D2/D3). EN → "No 6-month diagnostics. No 100-slide
  strategy decks with nothing behind them." AR → "لا تشخيص يمتد ستة أشهر.
  ولا عروض استراتيجية من 100 شريحة لا شيء خلفها."
- **approachIntro[1]** (AR density). EN unchanged (KEEP). AR: "ندخل في
  الموضوع مباشرة: ..." → "ندخل في الموضوع على طول: ..." Marker: على طول.
- **approachIntro[2]** (AR density). EN unchanged (KEEP). AR: "...يستطيع
  فريقك العمل به، أو يعيده إلينا للتنفيذ." → "...يقدر فريقك يشتغل عليه، أو
  يرجّعه لنا عشان ننفّذه." Markers: يشتغل, عشان.
- **whyHeadline** (D8, recommended alignment). EN: "Becoming AI-native is
  difficult, but mission critical" → "Becoming AI-native is hard, and nobody
  does it for you." AR: "البناء على الذكاء الاصطناعي صعب، لكنه حاسم" →
  "البناء على الذكاء الاصطناعي صعب، ولا أحد سيقوم به نيابةً عنك."
- **whatWeDoHeadline** (D6). EN: "We act as your AI transformation partner,
  end to end." → "We run it with you, from the first audit to systems in
  production." AR: "نعمل شريكًا لك في التحوّل بالذكاء الاصطناعي، من طرف إلى
  طرف." → "نديره معك، من أول مراجعة حتى أنظمة تعمل فعليًا." (removes the
  calque من طرف إلى طرف.)

### Services — Product Engineering

- **summary** (D5). EN: "High-velocity engineering-as-a-service, without
  sacrificing quality." → "Production-grade software, shipped fast, without
  dropping the quality bar." AR: "هندسة عالية السرعة كخدمة، دون التنازل عن
  الجودة." → "برمجيات جاهزة للتشغيل، تُطلق بسرعة، بلا تنازل عن الجودة."
  (removes كخدمة / "as-a-service".)
- **intro[0]** (AR density). EN unchanged (KEEP). AR: "...دون خفض معيار
  الجودة للوصول إلى ذلك." → "...دون ما نخفض معيار الجودة عشان نوصل." Markers:
  دون ما, عشان.
- **whatWeDoHeadline** (borrowed from mozn.ai). EN: "We become an extension
  of your team, building whatever you need." → "We work inside your team,
  not from a distance." AR: "نصبح امتدادًا لفريقك، ونبني ما تحتاجه." → "نعمل
  داخل فريقك، لا من بعيد."
- **whyWorkHeadline**. EN: "We slot into your workflow for frictionless
  collaboration." → "We work inside the tools your team already uses." AR:
  "ندخل في سير عملك لتعاون بلا احتكاك." → "نعمل داخل الأدوات التي يستخدمها
  فريقك أصلًا." (kills "frictionless" / بلا احتكاك.)

### Services — Gamification & Experience

- **intro[0]** (AR density). EN unchanged (KEEP). AR: "تجارب رقمية تفاعلية
  ومجزية تجعل التغيير يثبت بدل أن يتعثر." → "تجارب رقمية تفاعلية ومجزية تخلّي
  التغيير يثبت بدل ما يتعثّر." Markers: تخلّي, بدل ما.
- Everything else KEEP (summary, cta, pillars, whyHeadline, whyReasons,
  whatWeDoHeadline, whatWeDo, whyWorkHeadline, whyWorkWithUs).

### Careers

No changes. Hero subtitle and all three role blurbs are KEEP per plan;
responsibilities/requirements/niceToHaves are out of scope.

## Reference phrases borrowed (from `docs/copy-reference-bank.md`)

| New line | Adapts | Source |
|---|---|---|
| EN "We work inside your team, not from a distance." (product-eng `whatWeDoHeadline`) | "Our engineers work inside your environment, not from a distance." | mozn.ai |
| AR "نعمل داخل فريقك، لا من بعيد." | يعمل مهندسونا داخل بيئتك التشغيلية ... (the داخل / لا-من-بعيد shape) | mozn.ai |
| EN "We run it with you, from the first audit to systems in production." (AI-trans `whatWeDoHeadline`) | "They build and deploy production-ready solutions alongside your teams, proving value in weeks, not quarters." (alongside-you, to-production mechanic only; the weeks/quarters ROI claim was NOT taken) | mozn.ai |
| EN "Businesses that stay AI-absent get left behind by the ones that moved." (AI-trans `intro[0]`) | "It's time to base your decisions on intelligence, not chance." (X-not-Y thesis rhythm) | mozn.ai |
| EN "Work directly with the senior team that builds it, not a sales layer." (GetStarted point 2) | "No contracts, just easy connection" (fear-killer, X-not-Y) | salla.com |

No AR line is a translation of an English line; each AR rewrite was built
natively and only shares meaning, per the brief's "written natively, not
translated" rule.

## Verification results

- **JSON validity**: both `messages/en.json` and `messages/ar.json` parse
  clean via `node -e "JSON.parse(...)"`.
- **Key symmetry**: programmatic key-set diff between `en.json` and
  `ar.json` (including array lengths and nested object keys) returns zero
  differences in both directions.
- **TypeScript**: `npx tsc --noEmit` (node v24.14.0) passes with no output,
  no errors — services/careers arrays still satisfy `Service[]` /
  `CareerRole[]`.
- **Locale symmetry (services.ts)**: programmatic check confirms both
  locale files have 3 service records, and `intro`, `approachIntro`,
  `pillars`, `whyReasons`, `whatWeDo`, `whyWorkWithUs` arrays are the same
  length per record across EN and AR. No mismatches found.
- **Punctuation/numeral sweep**: grepped the full diff (all six copy files)
  for em dash, en dash, curly quotes, guillemets, and Arabic-Indic digits.
  Zero hits on any of these in the changed lines.
- **Placeholders/ICU/keys**: no key was added, renamed, or removed in either
  JSON file; `{year}`, `{role}`, `{department}`, `{updated}` and the
  `<terms>`/`<privacy>` tags all sit outside the touched strings and are
  untouched.

## Still needs Abdullah's sign-off / native Arabic reviewer

Per the plan's closing note, none of this Arabic ships on the strength of
this execution pass. A native Saudi writer must still confirm:

1. The five density-pass AR rewrites in `services.ts` (AI-transformation
   `intro[0]`, `approachIntro[1]`, `approachIntro[2]`; product-engineering
   `intro[0]`; gamification `intro[0]`) plus the four subtitle rewrites in
   `ar.json` (Explore, Newsletter, Contact, GetStarted) — confirm each still
   reads as a Riyadh product team talking, at 1-2 markers, not more.
2. The coined pair (untouched, still ungated regardless of this revision).
3. The three rebuilt AR headlines: "نديره معك، من أول مراجعة حتى أنظمة تعمل
   فعليًا", "نعمل داخل فريقك، لا من بعيد", and "نعمل داخل الأدوات التي
   يستخدمها فريقك أصلًا" — rebuilt, not translated, so rebuilt-wrong is the
   risk to check for.
4. The `whyHeadline` AR alignment applied under D8 ("البناء على الذكاء
   الاصطناعي صعب، ولا أحد سيقوم به نيابةً عنك") — a register decision that
   was applied per the plan's recommendation but still wants a native ear.
5. The pressure-line register (D4) — flagged only, not changed; still an
   open register question if it's revisited later.
6. The homepage and About AR copy already in place — carried over untouched
   but still un-gated; the reviewer should check the whole `/ar` surface,
   not only this diff.

`/ar` stays out of `PUBLISHED_LOCALES` until the native review gate clears,
per the standing status in Arabic Termbase.
