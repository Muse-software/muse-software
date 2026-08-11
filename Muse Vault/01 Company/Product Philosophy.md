---
type: note
created: 2026-07-30
updated: 2026-07-30
tags: [company, product, strategy]
---

# Product Philosophy

## The core belief

Plenty of excellent product ideas already exist and already work. Inventing from scratch is expensive, slow, and usually unnecessary. So we find products that are proven somewhere else, understand why they work, and build the version that fits here.

Abdullah's framing, kept because it is the actual policy: success is already proven, so why spend the time reinventing. There is a long local precedent for exactly this. Careem took the Uber model. Jahez and HungerStation took the delivery model. Haraj took classifieds. None of them needed a new idea. They needed the right execution in the right market.

The evidence, with real numbers, international examples and the published thinking behind the approach, is in [[Localisation Precedents]]. Read it before arguing this position with anyone, and read the counterargument in it too.

## Not a research project

This is the part that separates our approach from the usual startup advice, and it is deliberate.

We do not spend months validating whether people want the kind of product we are adapting. Millions already pay for the original. The expensive question is answered. What is unanswered is whether our version wins here, and no amount of interviewing settles that. Shipping settles it.

So the cost of an attempt is what we manage, not the certainty of it. Build a real MVP, publish it properly, and let the market answer. If something shows signs of life, put real money and time behind it. If it does not, we spent weeks rather than a year.

It only takes one of these to work.

## The loop

1. Find a proven product worth adapting, see [[Research]] and [[Inspiration Library]]
2. Understand why it works, which is usually one or two decisions rather than the whole feature list
3. Localise properly, see [[Localization Playbook]]
4. Improve the experience rather than porting it
5. Add the local hooks nobody outside could build, see below
6. Add AI only where it creates genuine value, see [[AI Guidelines]]
7. Ship, at our quality bar, see [[Quality Bar]]
8. Publish and measure, see [[Measurement]]
9. Invest more, or move on. See [[Venture Pipeline#Traction gate]]

## Localisation is the product, not a translation layer

The reason this is not cloning, and the part that matters most in this note. A translated copy of a foreign app is one App Store update away from being taken back. What cannot be taken back is depth in a market the original owner does not understand.

Three moves, and they apply to any category:

**Connect to the local institutions people already use.** The businesses, chains, platforms and services that exist here and that a foreign product has no relationship with. This is the hardest one to copy because it is relationships and integration work, not software.

**Know the local context and change the product because of it.** Not a setting. The product behaves differently because life here is different: the calendar, Ramadan, prayer times, the weekend, how families decide, how people pay, gender segregated contexts. See [[Localization Playbook]].

**Speak the language the way people actually speak it.** Native Arabic, including the vocabulary of that specific domain, which is usually where translated apps immediately give themselves away.

### A worked example

Abdullah used a fitness tracker to explain the idea, so it is the clearest illustration. It is an illustration, not a decision about what we build. Taking Strong as the reference:

- Direct integration with the gym chains people here actually use, so check in happens in our app
- Detecting which gym you are in and switching the app to that gym's real equipment list, so the workout you plan is one you can actually do
- An AI layer that looks at what you have trained, says which muscles you have been missing, and suggests something possible with the machines in front of you
- Arabic gym vocabulary as people here really say it, not a literal translation

Read the shape of that rather than the subject. Local institutions, local context, local language, plus one small addition the original does not have.

### The same shape in other categories

To make the point that this is a method and not a category:

| Category | Local institutions | Local context | The small addition |
|---|---|---|---|
| Nutrition tracking | Local restaurant and cafe chains, supermarket barcodes | Shared platter portions, Ramadan eating patterns | Photo or typed Arabic description of a mixed plate, broken into components |
| Personal finance | The banks and wallets people actually use, local merchant names | Salary timing, family obligations, no interest preferences | Categorisation that recognises local merchants correctly |
| Home services | Real local providers, not a directory of nobody | Weekend and prayer time scheduling, compound and villa realities | Trust signals that match how people here choose a stranger to let in |
| Learning or study | Local curricula, universities, certification bodies | The academic calendar here, exam periods | Arabic first content rather than translated courses |

Those are illustrations too. The candidate list should be much wider than any of them, see [[Inspiration Library]].

## Small additions on top

Every venture should carry one or two things the reference product does not do. Not a reinvention, a reason to switch.

The right size is small and obviously useful. In the fitness example it was the missed muscle suggestion: cheap to build, immediately understandable, and it makes the product feel like it was made for you. Every category has an equivalent, and finding it is part of the teardown, see [[Research#How to do a teardown properly]].

## The line we do not cross

The objective is not cloning. It is building a better localised version that solves a real problem. That is easy to say and hard to enforce, so it needs a written policy: what we take, what we never take, who checks, and when. Not written yet, see [[Open Questions#2. How close is too close]].

This matters more under this philosophy than it would under any other, because the whole approach starts from someone else's product. Get it wrong and it becomes a legal problem and a reputation problem at the same time.

## Non negotiables

- Real data only. No fake charts, no lorem, no placeholder states shipped to anyone
- Arabic and RTL are first class, not a later phase, see [[Localization Playbook]]
- Behaviour is predictable. Every state is designed, including empty, loading, error and offline
- Micro interactions matter. They are how quality is felt before it is understood
- Nothing ships without passing [[Quality Bar]]

MVP means small in scope. It does not mean rough. Shipping fast and shipping badly are different things, and the second one wastes the attempt.

## Products looked at so far

Three, from one conversation, all in one domain. Enough to explain the method, nowhere near enough to choose from.

| Product | Category | What it proves | Our note |
|---|---|---|---|
| Strong | Workout tracking | Logging friction is the whole product | [[Teardown - Strong]], [[V-001 Workout Tracker]] |
| Lose It! | Nutrition tracking | Food databases are the moat | [[V-002 Nutrition Tracker]] |
| Zombie style walking games | Fitness gamification | Story turns a chore into a habit | [[V-003 Walking Game]] |

The candidate list is the real input to this whole pillar, since the model works by taking enough cheap shots that one lands. Widening it is the first job in [[Ventures]]. Add to [[Inspiration Library]] whenever you notice a proven product with no decent local version, in any category.
