# Experiment 3. Run the same benchmark twice and the winner can change

## 1. Premise and audience job

A 2026 paper found that reasoning-strategy scores on a benchmark are unstable across repeated runs, even at zero temperature [6]. The job for the reader, especially anyone who picks a model or an eval for their team: stop trusting a single leaderboard number, and start asking what happens on the second run.

## 2. Best format and channel adaptation

Instagram carousel as the primary format, since the finding is a clean visual idea, paired with an X post. LinkedIn frames it for teams that buy or standardise on a model, kept short.

## 3. Truthful hook

"Run the same benchmark twice and the winner can change."

## 4. On-slide copy, 5 slides

**Slide 1**
We treat one benchmark score as the answer.
It is one sample.

**Slide 2**
ReasonBENCH, an arXiv paper revised in May 2026, ran 10 reasoning strategies across 12 models and 6 tasks, 30 independent trials each [6].

**Slide 3**
The result: "the highest-performing strategy wins only 77% of head-to-head runs against its nearest competitor" [6]. That is a win rate across repeated runs, not an accuracy score.

**Slide 4**
Meaning: two close systems can swap places from one run to the next, and a single number can silently misrank them [6]. Run your eval more than once, report a range, and distrust a narrow win.

**Slide 5**
Have you seen a model win one day and lose the next on the same test? What do you do about eval variance?

## 5. X thread version

See `threads/exp-3-thread.md`. Same argument, 6 posts, ready to paste.

## 6. Caption or opener

A single benchmark score feels like the truth. Run it enough times and the ranking wobbles. Here is what a 2026 paper actually measured, and what it means for how you test.

## 7. Discussion question

How do you handle it when the same eval ranks models differently on a re-run?

## 8. Why it can earn engagement, by behaviour

- Comments: practitioners sharing their own eval-flakiness stories
- Saves: a testing rule of thumb worth keeping around
- Shares: sent to whoever on the team picks the model
- Quote posts: people arguing over whether leaderboards mean anything at all, which this is built to invite fairly

## 9. Risks and how the published version avoids them

- The 77% figure is a head-to-head win rate, easy to misread as an accuracy score. Slide 3 states the distinction directly rather than leaving it implicit.
- Overclaiming that all benchmarks are worthless would be dishonest to the paper's actual finding. The copy asks for repeated runs and a reported range, not for abandoning evaluation.
- Author affiliations on the paper could not be confirmed cleanly enough to name in copy, so none are named; the paper is cited by title and finding only.

## 10. Distribution plan

Personal account first: the founder who owns AI evaluation at Muse posts. Muse amplifies within a few hours. LinkedIn adaptation: same finding, framed for teams standardising on a model or a testing process, posted a day or two later.

## 11. Founder first-day interaction plan

- Before posting: reply usefully to 3 to 5 recent posts from people who run or discuss model evals, no link drops
- First 60 to 90 minutes: answer every substantive comment with a fact or a follow-up question; deepen the best comment
- Quote-post targets: 1 to 2 ML-evaluation researchers who posted recently, quoted respectfully to extend the discussion
- Follow-up: if a good testing heuristic surfaces in replies, save it for the next post in this thread of topics

## 12. Success hypothesis and metrics

Hypothesis: a counterintuitive, testable finding earns thoughtful replies from practitioners who actually run evals for a living. Primary metric: substantive replies. Secondary: quote posts, plus reach tracked but not celebrated on its own.

## 13. Source list

[6] arXiv 2512.07795, "ReasonBENCH: Benchmarking the (In)Stability of LLM Reasoning," v1 2025-12-08, v2 2026-05-30. Full verbatim excerpt in `../sources/sources.md`.
