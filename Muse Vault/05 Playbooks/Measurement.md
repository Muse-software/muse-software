---
type: playbook
created: 2026-07-30
tags: [process, metrics]
---

# Measurement

[[Product Philosophy]] says measure and iterate. This note is what stops that from being a slogan. See [[Open Questions#7. What a good quarter looks like]].

It matters more under the venture model than it would otherwise, because the traction gate is a decision made with a number in front of you, see [[Venture Pipeline#Traction gate]]. No number, no gate, and a dead product survives for a year.

## One metric per product

Every product picks one number that tells you whether it is working. Not a dashboard, one number. Everything else is diagnostic.

The right one is usually about repeated use, not acquisition. Downloads measure the launch push. Retention measures the product.

| Product shape | Candidate metric |
|---|---|
| Logging or tracking product | Entries logged per active user per week |
| Daily habit product | Days used per user in the last week |
| Transaction or booking product | Completed transactions per user per month |
| Content or learning product | Sessions finished per user per week |
| Client project | Whatever the client's business outcome was, defined before build |

Note what these have in common: a count of the core action, per user, per time period. That shape is almost always right.

The value of that number that would justify investing more has to be set before launch, not after. See [[Open Questions#3. What counts as traction]].

## The three questions

**Does anyone come back?** Retention, measured in cohorts. Day 1, day 7, day 30. A product with poor day 7 retention has a product problem, and no amount of acquisition will fix it. Look at this before anything else.

**Does the core action happen?** Users who reach the thing the product is for, and how often. If people sign up and never do the main action, the problem is between those two points.

**Where do they stop?** The funnel to the first core action. There is always one step that loses most people. Fix that one rather than shipping five small improvements elsewhere.

## Instrument before launch

Analytics added after launch means the first month of data is gone, and the first month is the most informative. Events are defined during Shape, built during Build, and verified working before launch. See [[Launch Checklist#Measurement]].

Define a small number of events well rather than tracking everything. Fifteen well named events beat two hundred nobody understands.

Naming convention: `object_action`, past tense, lower case with underscores. `workout_logged`, `booking_created`, `reward_redeemed`. Pick it once and never mix styles.

## What not to do

- Do not celebrate vanity numbers. Installs, page views and signups feel good and tell you nothing about whether the product works
- Do not measure everything. A dashboard nobody reads is worse than one number everyone knows
- Do not decide from one week of data on a small user base. Direction over noise
- Do not replace users with analytics. Numbers tell you where the problem is, people tell you why

## Marketing

Same discipline, different numbers. [[Marketing]] is the pillar most easily measured by the wrong thing, because the flattering numbers are the ones the platforms put on the front page.

**What matters, in order**

1. **Real conversations.** How many people got in touch because of something we posted. This is the only number that connects to revenue, and it is countable by hand
2. **Saves and shares.** Someone keeping a post or sending it to a colleague is worth far more than a like. It is also the signal the algorithms actually reward
3. **Repeat viewers.** People coming back to our content, the audience equivalent of retention
4. **Audience composition.** Who is actually following, checked quarterly in [[Audience Research]]. A smaller audience of the right people beats a larger one of the wrong people
5. **Consistency.** Whether we published what we said we would. The most predictive number in the first year, since almost every content account dies of stopping rather than of bad content

**What not to celebrate.** Followers, likes, impressions, reach. They move for reasons unrelated to anything we did, and optimising for them produces content that gets attention and no clients.

**No invented numbers, ever.** Not in a deck, a pitch, or a post, see [[Audience Research#Rules]].

## Rhythm

- **Weekly**, glance at the one metric per live product during [[Weekly Review]], plus whether content went out
- **Monthly**, cohort retention properly, and inbound conversations from content
- **Quarterly**, audience composition, see [[Audience Research#What to check every quarter]]
- **At the review date set at launch**, invest or move on with the number in front of you, see [[Venture Pipeline#Traction gate]]

## Privacy

Analytics collect personal data. That has legal weight under Saudi data protection requirements, see [[Localization Playbook#Regulation to check]]. Collect what you will use, say so in the privacy policy, and do not ship a third party SDK without knowing what it sends and where.
