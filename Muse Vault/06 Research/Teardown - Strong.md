---
type: teardown
product: Strong
category: Workout tracking
status: draft
created: 2026-07-30
tags: [research]
---

# Teardown - Strong

Reference product for [[V-001 Workout Tracker]].

Status: written from general knowledge, not from a week of real use. Do that before relying on any of it.

## What it is

A workout logging app for people doing structured resistance training. Log exercises, sets, reps and weight during a session.

## Why it works

**Speed of entry is the product.** Logging happens mid session, between sets, one handed, with limited attention. Every design decision serves entry speed. Most competitors add features that slow it down.

**It remembers last time.** When you start an exercise, what you lifted last session is right there. This is the single highest value behaviour in the app: it removes the need to remember or look anything up, and it makes progression obvious without a chart.

**It fits an existing behaviour.** People doing structured training already track, on paper or in Notes. The app replaces a workflow that exists rather than creating one.

**Restraint.** It does not try to be a nutrition app, a social network or a coach. Focus is why it stays fast.

## Where it is weak

To verify by reading reviews and using it:

- Programme building is reportedly fiddly for anything complex
- Little support for the coach to trainee relationship
- Nothing about non gym training
- Free tier limits are a common complaint

## The lesson for us

The transferable insight is not the interface. It is that **in a logging product, friction at the moment of entry decides everything**. Any feature that adds a tap during a set is a net negative regardless of how good it looks in a screenshot.

Second lesson: remembering the user's last input is worth more than any analysis screen. Cheap to build, high value.

## What changes for Saudi Arabia

Against [[Localization Playbook]]:

- Arabic exercise naming is genuinely unsolved. Most gym vocabulary here is transliterated English, and a literal Arabic translation will read wrong to the people who use it. This needs field research, not a translator
- Full RTL for a screen used one handed, mid set, with a hand hovering over it. Reach and thumb zones matter more than usual here
- Ramadan training patterns break a normal weekly schedule
- Prayer time gaps affect session timing and length
- Women only and mixed gym contexts differ
- The trainer over WhatsApp workflow is a real local behaviour with no product serving it. This is the biggest opening and it is not something Strong is likely to build

## To do

- [ ] Use Strong properly for a week, in a real gym
- [ ] Read the one and two star reviews and note the recurring complaints
- [ ] Check what Saudi and regional gym apps already do
- [ ] Interview five trainers about how they currently send programmes
