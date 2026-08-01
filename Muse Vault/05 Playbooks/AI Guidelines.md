---
type: playbook
created: 2026-07-30
tags: [process, ai]
---

# AI Guidelines

[[Product Philosophy]] says add AI where it creates genuine value. [[Brand Voice]] bans claiming it. This note is the test that separates the two.

## The test

Before adding AI to anything, answer all four:

1. **What specific job does it do?** Named, not "makes it smarter"
2. **What does the user do today instead?** If the manual path is already fast, AI adds latency and cost for nothing
3. **What happens when it is wrong?** It will be. If a wrong answer is expensive or unrecoverable, this is the wrong place for it
4. **Would the feature still be worth shipping if the AI part were replaced by something simple?** If yes, ship that first

If any answer is weak, the honest conclusion is no. Saying no to AI in a product is not a failure of ambition.

## Where it genuinely earns its place

Patterns that hold up:

- **Turning messy input into structured data.** A typed Arabic description of a meal into components and quantities, see [[V-002 Nutrition Tracker]]. High value because the alternative is a form nobody completes
- **Extraction from documents and images.** A trainer's programme sent as a photo turned into a structured plan, see [[V-001 Workout Tracker]]
- **Summarising volume.** A month of bookings into something an owner can read in thirty seconds
- **Natural language over a query.** Letting a business owner ask a question instead of learning a reports screen
- **Drafting, with the user editing.** A first draft of a reply or a campaign, never sent automatically
- **Internal leverage.** Our own delivery, research and drafting. Often the highest return use, and it never touches a user

## Where it usually does not

- A chatbot bolted onto a product that has a clear interface. Users prefer buttons for known tasks
- Recommendations with no data to base them on. A cold start recommendation is a random guess with a confident tone
- Anything where a wrong answer is harmful: medical, financial, legal, or an irreversible action
- Automating something users want control over
- AI added because a client asked for AI. Find the actual problem underneath. Sometimes the honest answer is that a rule and a query do the job better, and saying so is what makes us a partner rather than a vendor

## Rules for shipping it

- **Never present a guess as certain.** Show that it is an estimate, and make correcting it easy
- **Always leave the manual path.** The user must be able to do it themselves, always
- **Nothing irreversible without confirmation.** No auto sending, auto charging, auto deleting
- **Arabic must work properly.** Test Arabic input and output specifically. Models vary a lot in Arabic quality, and a feature that works in English and fails in Arabic is not shippable here, see [[Localization Playbook]]
- **Know what leaves the device.** What is sent to which provider, where it is processed, and whether that is compatible with the privacy policy and Saudi data protection requirements
- **Cost per use is a product decision.** Per request cost against what the user pays. A free tier feature with a real per call cost needs a limit designed in, not discovered on the bill
- **Latency is a design problem.** If a response takes seconds, the interface must handle the wait deliberately, see [[Quality Bar]]

## What we do not say

No "AI powered" in marketing copy. Describe what it does. "Photograph your meal and it logs it" is stronger than "AI powered nutrition tracking", and it stays true when the model changes. See [[Brand Voice#Banned phrases]].
