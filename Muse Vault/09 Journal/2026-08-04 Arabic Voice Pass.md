# 2026-08-04 — Arabic Voice Pass (de-AI the AR copy)

## What
Full AR register pass on the site copy after Abdullah flagged the "X، لا Y" antithesis construction («شيء يعمل فعليًا، لا بعرض تقديمي») as pure AI slop. 56 strings rewritten across `messages/ar.json`, `lib/content/ar/services.ts`, `lib/content/ar/careers.ts`. Merged to `staging/bilingual-ar-en`, pushed. `main` untouched.

## The principle (user-defined)
- The formal "X، لا Y" slogan structure is not how Saudis write — killed everywhere it appeared (about 20 instances) and replaced with the spoken pivot "مو" (or "ما").
- Dictionary-ese terms killed: تبنّي/تبنٍّ (adoption → الاستخدام), من طرف إلى طرف (end-to-end → من البداية للنهاية / من أول يوم لين التشغيل), طبقة مبيعات (→ فريق مبيعات), مرونة افتراضية (→ أجايل بالأساس), مهندس دخول السوق (→ مهندس GTM, the Saudi convention), احتكاك/اختناقات (friction/bottlenecks), لنتحدث (→ تعال نتكلم).
- Keep-tweaks applied: newsletter «العامة» → «المكررة»; «بسرعة الشركات الناشئة» → «تطلق أسرع» (EN says "ship faster"); «مبني صح» unified on About; «تشوف المنتج يشتغل قدامك طول الوقت» unified across PE card/FAQ.

## Attribution (market-first, borrowed patterns)
- mozn.ai (AR): "نوصّل نتيجة فعلية، مو مجرد أدوات" family; "التحوّل بالذكاء الاصطناعي" phrasing; "داخل بيئتك/جوهر المنتج" framing; months-vs-weeks cadence.
- Thmanyah (AR): "تغنيك عن" newsletter promise (kept).
- Salla (AR): "نبحث عن الأفضل" careers claim (kept).
- Habbar voice study + Saudi spoken register: مو pivot, عشان, وش, قدامك, بدري, من بدري, لين, يستاهل.

## Verification
- `tsc --noEmit` CLEAN; `next build` 38/38.
- EN/AR parity PASS (331/331 message keys; services/careers structural symmetry).
- Kill-grep zero: تبنّي, من طرف إلى طرف, طبقة مبيعات, الشركات الناشئة, احتكاك, اختناقات, لنتحدث, بلا تنازل, مرونة افتراضية, دخول السوق (title), ثلاث جبهات, الحالة الوحيدة, لا بعرض/لا في عرض/لا معروضة/لا مركّبًا/لا طابور/لا تراجع/لا مضاف/لا وفق/لا أخبار/لا كثلاث/لا عند نقطة/لا في الجلسة/لا من بعيد/لا في الوكالات.
- Frozen coined pair (ناخذك من شركة "تستخدم"… إلى شركة تبنيه / أن تكتفي بـ"استخدام") byte-identical.
- Punctuation: new content zero em/en dashes, zero curly quotes (remaining hits = budget-band option-ID keys + a code comment, both pre-existing).
- Register readback: 1–2 spoken markers per line, verbs over nouns.

## Note
The de-AI copy pass report (`docs/de-ai-copy-pass-*`) and reference bank (`docs/copy-reference-bank.md`) remain the source of truth for voice decisions. Walkthrough PDF now shows pre-pass AR on its pages — re-render `walkthrough-src/` if the visual doc needs to match.
