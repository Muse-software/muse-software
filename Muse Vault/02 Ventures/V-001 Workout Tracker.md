---
type: venture
id: V-001
status: idea
stage: Idea
category: Consumer fitness
reference: Strong
owner: unassigned
created: 2026-07-30
tags: [venture]
---

# V-001 Workout Tracker

A workout logging app for the Saudi gym market. Reference product: Strong.

## Problem

Serious lifters need to log sets, reps and weight fast, between sets, one handed, sweaty, without breaking focus. Most people currently use the Notes app, a paper notebook, or an app built for a different kind of user. Logging friction is the entire product.

## Why the reference works

See [[Teardown - Strong]]. Short version: Strong wins on speed of entry and on remembering what you did last time, not on features.

## The local gap

Unverified assumptions, mark each one as you check it:

- [ ] Gym culture in Riyadh and Jeddah has grown fast, so the audience exists and is young and iOS heavy
- [ ] Women's fitness segment is large and underserved by apps that assume a mixed gym environment
- [ ] Local gym chains have their own apps, which are usually about membership and check in, not training
- [ ] Personal trainers here work over WhatsApp, sending programmes as images or PDFs. That is a real workflow with no product behind it

That last one is the most interesting thing on this page. A trainer to trainee product might be the actual opening, with logging as the surface. Strong does not serve it well anywhere.

## Possible shape of v1

- Fast logging, previous session visible without tapping
- Programme templates, including what local trainers actually prescribe
- Arabic first, full RTL, exercise names that people here actually use rather than literal translations
- Trainer link: a trainer assigns a programme, sees whether it was done. This is the differentiator

## Localisation notes

- Exercise naming in Arabic is genuinely unsolved. Most gym vocabulary here is transliterated English. Get this wrong and it reads as a machine translation
- Ramadan training patterns, night training, changed schedules. A calendar that assumes a normal week is a bug
- Prayer time gaps affect session timing
- Women only gyms and mixed gyms are different contexts and may need different content

## Open questions

- [ ] Run it through [[Idea Scoring]]
- [ ] Is the trainer angle the product, with logging as the feature, rather than the reverse
- [ ] Free or paid, and where does the paywall sit
- [ ] Does this share an audience with [[V-002 Nutrition Tracker]] and [[V-003 Walking Game]], and if so should they be one product or one brand

## Next action

Run [[Idea Scoring]], then do the week of real use and the local failure document in [[Venture Pipeline#What replaces a validation phase]]. Talking to a few trainers and serious gym goers is useful and cheap, but it is not a gate and it does not come before shaping.
