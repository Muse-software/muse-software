---
type: note
created: 2026-08-04
tags: [company, marketing, website, writing]
---

# Website Copy Revision — 2026-08-04

Night pass, planned by Claude Opus against [[Brand Voice]], [[Website Voice]],
[[Arabic Termbase]], [[Habbar Voice Study]] and the [[Localization Playbook]],
executed by Claude Sonnet. Branch `copy/voice-revision` off
`staging/bilingual-ar-en`. Full artifacts:
`docs/copy-revision-brief.md`, `docs/copy-reference-bank.md`,
`docs/copy-revision-plan.md`, `docs/copy-revision-report.md`.

## Why it happened

Abdullah flagged the site copy as vibe-coded and inhuman. Root cause found:
the old main-branch copy was literally lifted from **tenex.co** (a US/NYC
company — "Win the next decade", "Your AI transformation partner",
"AI-absent to AI-native", "No 6-month diagnostics"). The staging branch had
already replaced most of it with his own voice; this pass finished the job.

## What changed

- **EN**: removed the remaining Tenex echoes (enterprise AI strategy,
  engineering-as-a-service, AI transformation partner, frictionless);
  fixed the 200-vs-100 slide inconsistency (now 100 everywhere, matching the
  FAQ); "pillars" → "fronts"; borrowed mozn.ai's "work inside your team,
  not from a distance" shape; new whyHeadline "Becoming AI-native is hard,
  and nobody does it for you."
- **AR**: the owed density pass from [[Habbar Voice Study#What this leaves
  outstanding]] — explore/newsletter/contact/get-started subtitles plus
  services intro/approachIntro now carry 1–2 spoken markers each (اللي، وش،
  عشان، على طول، بدل ما) inside the MSA spine. Written natively, not
  translated.
- **Coined pair untouched** (D1: keep the EN absent→native vs AR
  uses→builds divergence).

## Still owed

1. **Native Arabic reviewer gate** before `/ar` publishes — nothing Arabic
   ships on this pass alone. See the report's sign-off checklist.
2. **D4 open**: homepage AR pressure line stays spoken
   (تبنّي الذكاء الاصطناعي مو خيار) vs the termbase's MSA form
   (الذكاء الاصطناعي ليس خيارًا). Flagged, not changed.
3. Reference research worth keeping: `docs/copy-reference-bank.md` —
   thmanyah (note: the real site is **thmanyah.com**, thamanyah.com is a
   Dubai perfume shop), zto.sa, mozn.ai, salla, tenex.co, lean.sa.
