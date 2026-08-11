---
type: playbook
created: 2026-07-30
tags: [process]
---

# Build Loop

The default way work moves here. Five steps, repeated, deliberately small.

## 1. Understand

Before anything is designed, know: who this is for, what they do today instead, and what "better" means in a way you could measure.

For ventures this is the teardown and the local check in [[Venture Pipeline#What replaces a validation phase]], which takes days rather than months. For client work it is [[Engagement Lifecycle#4. Discovery]].

The failure mode is skipping this because the answer feels obvious. It is obvious to you because you are not the user.

## 2. Decide

Write down the decision and the reason, then stop discussing it. Reopening settled decisions is the most expensive habit a small team can have.

Anything structural goes in [[Decision Log]]. A decision recorded badly costs an hour. A decision not recorded costs the same argument three more times.

## 3. Shape

Smallest version that a real person could use and get value from. Write what is out of scope with the same care as what is in.

Non negotiable at this step:

- Arabic and RTL are in the design from the first screen, see [[Localization Playbook]]
- Every state is designed: empty, loading, error, offline, first run, and the state where the user has too much data
- Real content in the design. Real names, real prices, real Arabic. No lorem, no placeholder charts

## 4. Build and ship

In slices. Each slice should be individually usable rather than a layer of a cake that only works when complete.

Check against [[Quality Bar]] before saying done. Run [[Launch Checklist]] before real users see it.

## 5. Learn

Instrumentation exists before launch, see [[Measurement]]. After launch:

- Look at what people actually did, not what they said in a survey
- Pick the single biggest drop off and fix that, rather than shipping five small improvements
- Write anything reusable into a playbook

Then back to step one.

## The rhythm

Ship something every week, even something small. A team that ships weekly stays honest about scope, because the deadline is never far enough away to hide behind. A team that ships quarterly discovers its problems in month three.

## What breaks this loop

- Designing before understanding
- Building before deciding, so the build becomes the argument
- Shipping without instrumenting, then guessing
- Iterating on opinion instead of evidence
- Treating localisation as a phase after launch
