---
type: reference
created: 2026-08-01
updated: 2026-08-01
tags: [company, brand, writing, localization]
---

# Arabic Termbase

Batch 0 of the Arabic content programme, see `docs/i18n-plan.md` section 9. It is the highest leverage step in that programme and it comes before anybody drafts a sentence: deciding how the recurring terms render once, and applying the decision everywhere, is what stops the Arabic reading as translationese.

Governed by [[Localization Playbook]] and [[Brand Voice#Arabic voice]]. Where this note and a draft disagree, this note wins.

**Status: drafted, not reviewed, and now behind the register.** Every entry below is a proposal written to give a native Arabic reviewer something to correct rather than a blank page. Nothing here has passed the review gate in [[Brand Voice#Arabic voice]], and `/ar` stays unpublished until it does.

One extra thing to know before reading it: the register changed on 2026-08-01, after the draft was written. The term choices below are unaffected, since a term is a term in either register.

What changed in the copy itself, same day: the homepage turned out to be Abdullah's own writing and already spoken, so it only needed its errors fixed. `/about` and the careers copy were rewritten. What is still MSA and still owed a spoken pass is listed in [[Habbar Voice Study#What this leaves outstanding]].

## The register, decided

Two registers, split by page function. Decided 2026-08-01, superseding the single MSA register this note originally carried. See [[Decision Log]] and [[Habbar Voice Study]].

**The MSA spine.** Everything structural: page and section headings, service names, numbered process steps, nav labels, form labels, product UI strings, error messages, and all of legal, contracts and proposals. Clean plain MSA. Not the government form register, not the LinkedIn press release register.

**The spoken body.** The paragraphs underneath, on the marketing site, plus CTAs, careers copy and playbook intros. Saudi spoken, in the plain everyday form.

The two sit next to each other on the same page and that is the point. The MSA carries the credibility, the spoken register carries the personality, and neither has to do the other's job. A heading that reads التخطيط والتنفيذ over a paragraph that opens with نبني عشان works; the reverse does not.

### The markers, decided

In. These are plain, everyone reads them instantly, and they are what makes a paragraph sound like a person.

| Spoken | Replaces | Note |
|---|---|---|
| عشان | لكي، من أجل | The workhorse. Most paragraphs need only this one |
| وش | ما، ماذا | |
| مو | ليس، ليست | Carries the correction pivot, see [[Brand Voice#The correction pivot]] |
| اللي | الذي، التي، الذين | Invariant, which is half of why it sounds spoken |
| ما + verb | لا، لم + jussive | ما نعدّ rather than لا نعدّ |
| بس | فقط، لكن | Sparingly |
| كذا، عشان كذا | هكذا، لذلك | Sparingly |
| دايم | دائمًا | Sparingly |

Out, and this is the harder line:

- **Anything that needs a glossary.** Rare or classical vocabulary reaching for literary weight. This is the [[Habbar Voice Study#The classical vocabulary layer]] rule and it is the one Abdullah named first. نتفرّس is the type specimen
- **Deep dialect.** تبي، أبغى، أبشر، and Najdi particles. That is a person texting, not a company writing
- Colloquial anywhere in the MSA spine, and colloquial anywhere in legal, contracts, proposals or product UI

### The density rule

One or two markers per paragraph is the whole effect. A paragraph carrying five of them is performing the register rather than writing in it, which reads worse than plain MSA would have.

### Carried over unchanged

These held under the single register and they hold under both:

- Address the reader as a single person, second person masculine, through the verb: تبني، شركتك، أخبرنا. No حضرتكم, no أنتم for a single reader
- Muse speaks as نحن: نبني، نصمّم، نطلق
- Verbs over verbal nouns. نبني الأنظمة beats بناء الأنظمة wherever a sentence allows it
- Short sentences. If an Arabic sentence needs a و to survive, it probably needs a full stop. One exception, the verb chain in [[Brand Voice#The verb chain]], used once per section and never as the default sentence shape
- No exclamation marks anywhere, per [[Brand Voice#Applied]]
- Arabic punctuation: ، for comma, ؛ for semicolon, ؟ for question mark. Full stop is the Latin one
- Straight quotes only, no em dashes, no en dashes, no guillemets. This is the [[Brand Voice#Punctuation house rule]] and it applies to the Arabic first, since an Arabic line with an em dash in it looks machine written immediately
- Western numerals, 0 to 9, never Arabic-Indic. [[Localization Playbook]] and section 1 of the plan
- Gregorian dates with Arabic month names: 30 يوليو 2026
- Latin brand names stay Latin and are never transliterated: Muse, ChatGPT, LinkedIn, Google

## Muse stays Muse

The wordmark is Latin, so the brand is Latin in Arabic copy too. Not ميوز, not ميوس. Same for Muse Studios.

This puts a Latin run inside an Arabic sentence on almost every page, which is exactly the mixed direction case [[Localization Playbook]] flags as where RTL bugs concentrate. It is a deliberate cost and the reason the site loads a separate Arabic face rather than one font for both scripts.

## The coined pair

`AI-absent` to `AI-native` is one coined pair in English, used in the approach heading and again inside the first card. It has to be one decided pair in Arabic and used identically in both places, or the argument stops being an argument.

**Revised 2026-08-01.** The Arabic pair no longer tracks the English one, deliberately. Abdullah's heading reframed it from absent against native to **uses against builds**, which is the sharper argument here: the buyer who needs this is already dabbling, not sitting at zero. The card body was moved to match on the same day, since the two had drifted apart and the pair had stopped working.

| English | Arabic | Note |
|---|---|---|
| AI-absent | غائب عن الذكاء الاصطناعي | Still the term in isolation |
| AI-native | قائم على الذكاء الاصطناعي | Still the term in isolation |
| the heading pair | من شركة "تستخدم" الذكاء الاصطناعي، إلى شركة تبنيه | تستخدم against تبني. The scare quotes on تستخدم carry the whole argument and are not decoration |
| the card body echo | أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد | Must keep the quoted استخدام, or the pair breaks again |
| the AI-native era | عصر الذكاء الاصطناعي | The ticker. The long form does not fit and does not need to |

The English still runs absent to native. That is a live divergence between the locales on the central claim, allowed under the write natively rule but worth a decision rather than drift: either the English moves to uses against builds, or the two stay deliberately different. Not decided.

## Core terms

| English | Arabic | Rejected, and why |
|---|---|---|
| AI | الذكاء الاصطناعي | Never the bare Latin AI, and never الذكاء الصناعي |
| AI transformation | التحوّل بالذكاء الاصطناعي | Not التحوّل إلى الذكاء الاصطناعي, which reads as becoming an AI. The ب carries "by means of", which is the actual claim |
| product engineering | هندسة المنتجات | |
| gamification | التلعيب | The established term. Do not invent one |
| Gamification & Experience | التلعيب وتصميم التجربة | التلعيب والتجربة alone reads thin as a service name |
| playbook | دليل عملي, plural أدلة عملية | Not كتيّب, which is a pamphlet |
| newsletter | النشرة البريدية | |
| case study | دراسة حالة | |
| engagement, as in a client project | مشروع | Not ارتباط, which is an engagement to be married |
| discovery | الاستكشاف | |
| roadmap | خارطة الطريق | Feminine. Agreement catches people out: تعنينا, not يعنينا |
| agentic | وكلاء أذكياء | |
| guardrails | ضوابط | Not حواجز أمان, which is literally a crash barrier |
| in production | يعمل فعليًا | The plain form. بيئة الإنتاج is correct but reads like infrastructure documentation in a sentence that is trying to make a point |
| prototype | نموذج أوّلي | |
| to ship | يُطلق, or يُشغّل where the point is that it runs | |
| slide deck | عرض تقديمي | |
| dev shop | شركة تطوير عادية | |
| startup speed | سرعة الشركات الناشئة | |
| pilot purgatory | مرحلة التجريب التي لا تنتهي | Purgatory is religious adjacent English idiom with no Arabic equivalent worth reaching for. This is the plain description and it lands |
| stakeholder | المعنيّون in body copy, أصحاب المصلحة in service and proposal copy | The register genuinely differs between the two |
| onboarding | التهيئة | |
| upskilling | رفع المهارات | |
| adoption | التبنّي | |
| workflow | سير العمل | |
| audit | مراجعة | Not تدقيق, which pulls toward financial audit |
| ROI | العائد على الاستثمار | Spell it out. Not حرف ROI |
| SAR | ريال | ر.س only where space genuinely forces it |

## Lines that do not survive literal translation

Section 13 of the plan lists these as the ones carrying their force through English idiom or rhythm. The decisions taken:

| English | Arabic | What was preserved |
|---|---|---|
| Everyone has an AI strategy. Almost nobody has shipped one. | لدى الجميع استراتيجية للذكاء الاصطناعي. / وقليلون جدًا شغّلوها فعلًا. | The two beat reversal, rebuilt on لدى against شغّلوا rather than translated twice |
| We actually build the thing, not just the deck about the thing. | نبني الشيء نفسه، لا العرض التقديمي عنه. | الشيء نفسه carries the same dry understatement the repeated "the thing" does. This one survives almost intact, which is unusual |
| Day to day operations always win the calendar. | التشغيل اليومي يأخذ الوقت كله دائمًا. | Win the calendar is not an Arabic construction. This is the plain statement of what it means |
| instead of quietly dying | بدل أن يخبو بهدوء | يخبو is the register line. يموت is too blunt, يضمحل is too literary |
| No 100-slide strategy decks with nothing behind them. | لا عروض استراتيجية من 100 شريحة لا شيء خلفها. | The number stays. It is the specific bit doing the work |
| pilot purgatory | مرحلة التجريب التي لا تنتهي | See the table above |
| Riyadh-built. Globally standard. | صُنع في الرياض. بمعيار عالمي. | Two fragments, two full stops. Do not join them |
| AI isn't optional. / Waiting is the risk. | الذكاء الاصطناعي ليس خيارًا. / الانتظار هو المخاطرة. | The second half is the emphasised one and has to stay the shorter of the two |

## Plurals and numbers

Arabic has six plural categories and the read time on every playbook card hits three of them. The messages use ICU `plural` rather than a single form, and the numbering system is pinned to Latin in `i18n/request.ts`, because `Intl.NumberFormat("ar")` defaults to Arabic-Indic digits and would have quietly undone the numerals decision.

| Value | Form |
|---|---|
| 1 | دقيقة واحدة |
| 2 | دقيقتان |
| 3 to 10 | 8 دقائق |
| 11 and up | 15 دقيقة |

## What the reviewer is being asked to do

Not to proofread. The draft is grammatical. What it needs is the judgement a native writer brings and a drafter cannot:

1. **Register.** Does it read as a Riyadh product team talking, or as a translation of an American studio? That is the whole test and it is the one thing this draft is most likely to have got wrong
2. **The coined pair.** Does الغياب عن الذكاء الاصطناعي إلى البناء عليه actually land as a pair, or is it two phrases sitting next to each other
3. **The eight lines above.** Each was rebuilt rather than translated. Rebuilt wrong is worse than translated flat
4. **Term choices marked as rejecting an alternative.** Those are the contested ones
5. **The register split, in both directions.** Two failure modes now, not one. The draft's own weakness is drifting toward the government form register that [[Localization Playbook]] warns about, because that is where careful Arabic goes by default. The weakness introduced by the fix is the opposite, a body paragraph so loaded with عشان and اللي that it is performing rather than talking. The reviewer is the right person to say where each paragraph actually sits

## Reference

- [[Localization Playbook]] rule zero, and the checklist this feeds
- [[Brand Voice#Arabic voice]] the never machine translate rule and the review gate
- [[Website Voice]] the register the English is written in, which the Arabic has to match rather than copy
- `docs/i18n-plan.md` sections 9 and 13, the batch order and the approved English source
