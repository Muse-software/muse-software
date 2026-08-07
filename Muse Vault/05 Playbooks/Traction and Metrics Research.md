# Traction and Metrics Research

## TLDR
- Pick **one metric per product** (OMTM — "One Metric That Matters," from Croll & Yoskovitz's *Lean Analytics*). It's chosen by business model (transactional / SaaS / app / media / collaborative) and by stage (attention → need → MVP validation → feature-fit → business-model fit) — not fixed for the company's lifetime. [Rule of thumb, well-established framework]
- For MVP-stage validation, the dominant lens across a16z, Sequoia-adjacent operators, and YC is **retention** (cohort curve flattening), not signups or downloads. A flat, non-zero retention curve after the initial drop-off is the real signal. [Hard citation]
- Sean Ellis's "40% test" (% of users who'd be "very disappointed" without your product) is the most cited pre-revenue PMF proxy; ~40%+ is the traditional benchmark. [Rule of thumb popularized by a named source — treat the 40% number as directional, not universal law]
- For SaaS/enterprise, Andy Rachleff/Doug Leone's version of this is blunter: **pull the free trial early — if they don't pay, they weren't desperate, and you don't have PMF.**  [Hard citation, direct quote]
- There is **no single universally-cited numeric table** of "day-1/7/30 retention by category" from a16z/Sequoia/Reforge that we could verify with a live URL today — most-quoted versions trace back to old Andrew Chen / Mixpanel blog posts that have since moved or 404'd. Treat any specific % benchmark below flagged "directional" as an estimate, not gospel.
- Set your kill/invest threshold **before** you launch, in writing, tied to a cohort-based retention curve — not vibes, not raw signups, not "a few people love it."
- Cadence: **glance weekly**, but only make the kill/keep call at a **fixed pre-committed checkpoint — typically 4–8 weeks** post-launch, once you have 2+ cohorts to compare.

---

## Per-Product-Shape Table

| Product shape | Primary metric (OMTM) | Early-stage traction threshold | Source status |
|---|---|---|---|
| Logging/tracking apps (health, finance, habit logs) | Week-1 retention (% of new users still logging on day 7) | ~20–25% D7 retention is a commonly-cited "decent" bar for utility apps; top-quartile consumer apps often cited near 25%+ | **Directional estimate** — no single verifiable named-firm table found live; treat as rule of thumb |
| Daily habit apps (streak/gamified) | D1 → D7 → D30 retention curve shape (must flatten, not keep decaying) | D1 ~25–30%, D7 ~10–15%, curve flattening by D30 is the real pass/fail, not the absolute numbers | **Directional estimate** — retention-curve-flattening logic is well-documented (Lenny's Newsletter compilation, citing Casey Winters/Brian Balfour), specific % thresholds are rule of thumb |
| Transaction/booking apps | Repeat transactions per active user per week/month (2nd purchase rate) | 1 repeat transaction within 30–60 days from ~20%+ of first-time users is a reasonable early bar | **Directional estimate** — logic from Lean Analytics "transactional" KPI category (funnel + repeat-purchase) is a hard citation; the % is a rule of thumb |
| Content/learning apps | Week-4 completion or return-to-content rate | 15–20% of starters still actively returning at week 4 is a workable early signal | **Directional estimate** |
| **AI executive assistant / B2B SaaS productivity tool (Muse's venture)** | Weekly active use rate among onboarded accounts + willingness-to-pay-to-continue at trial end | Target: **≥30–40% of onboarded users still actively using weekly at week 4**, AND a real signal of "would pay/renew" (per Rachleff/Leone: pull the trial and see who pays) | Retention-as-signal is a **hard citation** (Lenny's Newsletter compilation of a16z/Rachleff/Leone); the specific 30–40% number is **our directional estimate**, not sourced |

## How to Set the Kill vs. Invest Threshold — Before Launch
1. Pick the ONE metric that matches your business model + current stage (see table). Write it down before you have any data, so you can't rationalize after the fact.
2. Define the number and the cohort window (e.g. "% of Week-1 signups still weekly-active at Week 4") — not a vanity number (signups, downloads, pageviews).
3. Set two numbers, not one: a **kill line** (below this, stop or pivot) and an **invest line** (above this, double down). Leave a "watch" zone in between where you gather one more cohort before deciding.
4. Base the line on the best comparable you can find for your category (see table), openly labeled as directional if you can't verify a real source — don't invent false precision.
5. Commit the decision rule in writing (Slack, doc, vault) with Abdullah's sign-off before launch, so the post-launch conversation is "did we hit the line," not "do we still like this."

## Review Cadence
- **Weekly**: a 5-minute glance at the OMTM trend line. No decisions made here — just tracking, catching integration bugs, sanity-checking data.
- **Real decision checkpoint: 4–8 weeks** post-launch, once you have at least 2 comparable cohorts. This is when you compare against your pre-set kill/invest lines and actually decide.
- Re-baseline the metric if you make a major product change (new onboarding, new core feature) — old cohorts aren't comparable to new ones.

## Sources
1. Croll, A. & Yoskovitz, B. — *Lean Analytics*, "The One Metric That Matters" — https://www.leananalyticsbook.com/one-metric-that-matters/ (hard citation, live verified)
2. Rachitsky, L. — "How to know if you've got product-market fit," Lenny's Newsletter — https://www.lennysnewsletter.com/p/how-to-know-if-youve-got-productmarket (hard citation, live verified; compiles direct quotes from Marc Andreessen, Elad Gil, Steve Blank, Casey Winters, Andy Rachleff, Sean Ellis/Rahul Vohra, Doug Leone, Michael Seibel, Sam Altman)
3. Sean Ellis's "40% test" / Survey.io — referenced within source #2; original Ellis material now lives on Substack (https://substack.com/@seanellis) — his standalone blog is archived/inactive, so the 40% figure is cited via source #2, not an independently-verified primary page.
4. Andrew Chen — retention/AI-apps commentary, "@andrewchen" on Substack — https://andrewchen.substack.com/ (existence and topic verified live; his older dedicated "app benchmarks" post has moved/404'd, so we could not pull the specific numeric table — flagged, not used as a hard number source here).

**Note on rigor**: Several commonly-repeated "day-1/7/30 retention by category" tables attributed to a16z/Sequoia/Reforge could not be located at a live, working URL during this research. Rather than cite a number we couldn't verify, this doc labels all specific percentage thresholds in the table above as directional estimates. The structural logic (one metric, cohort-based retention as the PMF signal, pull-the-trial-and-see-who-pays) is hard-cited from source #2.
