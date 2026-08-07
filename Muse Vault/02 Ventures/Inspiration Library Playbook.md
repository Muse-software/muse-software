---
type: playbook
status: active
created: 2026-08-07
updated: 2026-08-07
tags: [venture, process, research]
---

# Inspiration Library Playbook

You are an AI agent running this on your own, probably with no other context loaded. This note is written so you do not need any. Read it once, then run it.

## What this is for

Muse builds one product per category, adapted from something already proven outside Saudi Arabia and the GCC, then localised deep enough that it could not have been built by the original team. See [[Product Philosophy]] for the full method. This note is the intake pipeline: how you find candidates, how you judge them, and how you hand a shortlist to Abdullah for final domain selection.

You are not choosing what Muse builds. You are widening and scoring the list Abdullah chooses from. Do not skip categories because you personally think they are boring or unlikely. The point of this list is coverage, not taste.

## The SPREAD rule, stated plainly

Muse is running a spread strategy, not a wedge. That means: **one product per category domain, never two.** If a domain already has a picked venture, or an existing strong candidate on the shortlist, do not bring a second product from that same domain. Bring the next domain instead.

- "Category domain" means the underlying problem space a normal person would name it by: fitness, personal finance, food delivery, home services, education, productivity, social, health, transport, e-commerce, and so on. Two products that both live inside "personal finance" are the same domain even if one is budgeting and the other is investing. If in doubt, ask: would a user describe both as solving the same kind of problem in their life? If yes, same domain.
- Check the current picks before you start a session. Read [[Ventures]] for anything past Idea stage, and read the shortlist section at the bottom of this note for anything already logged and not yet rejected.
- **Do not resurface fitness tracking, nutrition tracking, or walking games / fitness gamification.** These were used once as an illustrative example in [[Product Philosophy#A worked example]] and are not live candidates. Treat them as already-covered domains for the purpose of this exercise, even though nothing has formally shipped there.
- Do not resurface an executive assistant / employee hub / workplace productivity tool for teams. That domain is already being built as Muse's first venture, separately from this pipeline. It is off limits here.
- When two candidates from your own session land in the same domain, keep the stronger one and drop the other, or note both under the same domain entry with a comment on which is stronger. Never let both go forward as separate cards.

## How to source candidates

Run all of these each session. Do not stop after the first one that produces hits; different sources surface different kinds of gaps.

1. **App store rankings, outside KSA/GCC.** Check top charts (free and grossing) in the US, UK, and a couple of emerging markets (India, Indonesia, Brazil) across categories: productivity, health & fitness, finance, food & drink, lifestyle, shopping, education. Note anything with strong, sustained ranking (not a one-week spike) that is not obviously already served locally.
2. **YC and Product Hunt.** Scan recent YC batches and Product Hunt's top products by category for consumer or SMB products with real traction (funding raised, user counts mentioned, repeat "top product of the day/week"). These surface newer proven models before they are obvious from app store charts alone.
3. **Google Trends, KSA and GCC.** For any candidate found above, or any category hunch, check search interest in Saudi Arabia and the wider GCC. Rising or sustained interest with no dominant local app answering it is a signal. Flat or declining interest is a reason to deprioritize, not necessarily to drop.
4. **Local app store search, direct.** Search the Saudi App Store and Google Play directly for the category term (in English and Arabic) and actually open the top 5-10 results. Read recent reviews. You are looking for: no real local option, options that are clearly translated/foreign with no local depth, or options with poor ratings and specific, recurring complaints. All three are gaps worth logging.
5. **Local competitor and incumbent research.** Search for "[category] Saudi Arabia" and "[category] KSA app" in Arabic and English. Check who the named local incumbents are (if any), when they last updated, what their reviews say, and whether they connect to any real local institution (banks, chains, government services) or are a generic template.
6. **Failed-locally list.** While researching, note anything that tried in this market and visibly failed or stalled (dead app, no updates in 2+ years, abandoned). This tells you about local constraints, not just opportunity, and it belongs in the log even though it is not a candidate card. Keep a running "graveyard" section at the bottom of this note.

Search patterns that work, adapt the bracket:
- "[category] app" site:producthunt.com
- "[category] app" India OR Indonesia OR Brazil top charts
- "[app name] alternative Saudi Arabia"
- "أفضل تطبيق [الفئة بالعربي]" (best app for [category in Arabic])
- "[category] Saudi Arabia" reviews complaints
- Google Trends: compare the English and Arabic term for the category, KSA + GCC, past 12 months

## How to evaluate a candidate

Score every candidate you seriously consider, not just the ones you like. Five factors, 1 to 5 each, 25 max.

| Factor | What you're checking | 1 (weak) | 5 (strong) |
|---|---|---|---|
| Market proof | Does the reference product have real, sustained users and revenue elsewhere? | Anecdotal, unclear if it makes money | Verifiable revenue, funding, or scale numbers |
| Local gap | Is there no good local version, or is the existing one weak? | A strong, modern, well-funded local incumbent already owns this | No credible local player, or all options are outdated/foreign/badly reviewed |
| Feasibility | Can a small team actually build and ship v1 in a reasonable window? | Needs licenses, hardware, large capital, or years of data to be usable | Software-only, buildable MVP in weeks by a small team |
| Localization angle | Is there a real, specific local institution/context/language angle, not just Arabic UI strings? | Only translation is available as a localization move | Clear local institutions to integrate, clear behavioral quirks to design around |
| The small addition | Is there one small, cheap, obviously useful thing Muse could add that the original lacks? | Nothing specific comes to mind beyond "better design" | A concrete, buildable feature that would make someone switch |

Total score guide:
- 20-25: strong candidate, write the full card, flag for Abdullah
- 13-19: worth logging, needs more digging before it is shortlist-ready
- Below 13: log briefly in the graveyard/rejected list with the reason, do not write a full card

A candidate cannot score well on "local gap" if a serious, funded, actively maintained local competitor already exists and does the job adequately. Score that factor low and let the total reflect it, rather than talking yourself into it because the rest of the card is good.

## Candidate card template

One card per candidate that scores 13+. Copy this block, fill it in, append it under "Logged candidates" below.

```markdown
### [Product name] — [Category domain]

- **Proof it works elsewhere:** [Numbers if you have them: users, revenue, funding, ranking. Cite where you got it.]
- **Local players and the gap:** [Who exists locally today, if anyone, and what specifically is missing or bad about them. Be concrete: "app X exists but hasn't updated since 2022 and reviews complain about Y."]
- **Why no one owns this locally well:** [Your read on why the gap exists. Cost to build, no institutional relationships, wrong incentives, market too new, etc.]
- **Local institutions to integrate:** [Named banks, chains, government services, universities, whatever is specific to this domain. Real names, not "local partners."]
- **Local behavioral quirks:** [What changes because life here is different: prayer times, Ramadan, the weekend, family decision-making, cash vs. card habits, gender-segregated contexts, whatever applies to this domain specifically.]
- **One small addition:** [The one cheap, obviously useful thing beyond the reference product. Should be small enough to describe in one sentence and buildable by a small team.]
- **Estimated build complexity:** [Low / Medium / High, with one line why. Low = mostly software, no data moat needed. High = needs licenses, hardware, large datasets, or long trust-building.]
- **Score:** [X/25, factor by factor if useful]
- **Spread-fit note:** [Confirm which existing picks/shortlist entries exist and confirm this domain does not overlap with any of them. Name the domains it was checked against.]
- **Source notes:** [Where you found this: app store rank, PH link, Trends check, etc. So the next person can verify without redoing the search.]
```

## Session process

Run this as a repeatable unit of work, not a one-off sweep.

1. **Before starting:** read [[Ventures]] and the "Logged candidates" section below to know which domains are already covered or already on the shortlist.
2. **Per session, aim for 5 to 8 new candidate cards across at least 5 different domains.** Do not spend a whole session digging into one domain. Breadth first; depth comes later once Abdullah picks a direction.
3. **Run all six sourcing methods above at least once per session.** Skipping a method is how you end up with a list that is all app-store-chart products and no local-competitor-gap products, or vice versa.
4. Score everything you seriously look at. Log 13+ as full cards. Log rejects (below 13, or same-domain duplicates) as one-line entries in "Rejected / same domain" so nobody re-researches them.
5. Log anything you find that already failed locally in "Graveyard," one line, with why it failed if you can tell.
6. **Never let two full cards in the same session share a domain.** Check as you go, not just at the end.
7. At the end of the session, write a short summary (3-5 sentences) at the top of the new session's log: what you covered, what stood out, what you'd chase next session.

## Logging and handing off to Abdullah

- All candidate cards live in this note, under "Logged candidates" below, newest session on top.
- Each session gets its own dated subheading: `## Session YYYY-MM-DD`.
- When a session is done, the handoff to Abdullah is: the session summary, the full cards for anything that scored 20+, and a one-line list of everything else logged that session with its score. He does not need to read every card to decide; he needs the strong ones in full and a scan list for the rest.
- Abdullah picks the domain. This note does not decide, rank across sessions, or recommend a winner. Its job is to surface well-scored, spread-safe options. Once he picks, update [[Ventures]] with the new venture entry and mark the corresponding card here as `Selected` so the domain is locked and nobody proposes it again.
- If a card sits for 3+ sessions without a decision, that is fine. Do not chase a decision. Keep widening the list instead.

## Logged candidates

_Newest session first. Add new `## Session YYYY-MM-DD` blocks above older ones._

## Rejected / same domain

_One line each: product, domain, score, reason. Keeps future sessions from re-researching the same dead end._

## Graveyard (tried locally, failed)

_One line each: product/attempt, domain, what happened, source if you have one._
