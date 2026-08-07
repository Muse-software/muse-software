# Experiment 2. Running several AI coding agents at once without breaking your repo

## 1. Premise and audience job

A workflow that is available now, not theoretical: each AI coding session gets its own Git worktree, an isolated copy of the repo [4]. It genuinely helps, and it has a real downside. The job for the reader: decide whether to try running agents in parallel, and know what to watch for before it turns into a pile of half-finished branches.

## 2. Best format and channel adaptation

X thread as the primary format, since a workflow reads well step by step, see `threads/exp-2-thread.md`. A short 5 slide carousel carries the same beats for Instagram. LinkedIn frames it as team throughput with a review gate, aimed at engineering leads rather than individual developers.

## 3. Truthful hook

"You can now run several AI coding agents at once without them fighting over your repo."

## 4. On-slide copy, 5 slides

**Slide 1**
Running two or three AI coding agents at once used to mean chaos in one working tree.

**Slide 2**
New in GitHub Copilot, July 2026: start a Copilot, Claude, or Codex session in its own Git worktree, an isolated copy of your repository [4].

**Slide 3**
Why it helps: each agent works on its own copy and branch. Nothing touches main until you review and merge.

**Slide 4**
Where it bites: one developer who tried this the first week had two agents "stomp on each other's edits inside about ninety seconds" before worktrees existed [27]. Isolation removes that failure mode. It does not remove the pile of half-finished branches you still have to reconcile. Cursor and Claude Code have their own versions of this.

**Slide 5**
Do you run agents in parallel yet? What is your review-and-merge routine before it turns into branch soup?

## 5. X thread version

See `threads/exp-2-thread.md`. Same argument, 6 posts, ready to paste.

## 6. Caption or opener

Parallel AI coding agents finally have a sane isolation model, one Git worktree per session. Here is why it helps, and where it still bites.

## 7. Discussion question

How do you keep parallel agents from becoming a pile of half-finished branches?

## 8. Why it can earn engagement, by behaviour

- Comments: people sharing their own parallel-agent setups and what broke before they had this
- Saves: a concrete workflow worth trying on a Sunday
- Shares: sent to a team lead who is already fielding merge conflicts from agent output
- Quote posts: engineers adding their own merge discipline or branch-review routine

## 9. Risks and how the published version avoids them

- Plumbing feature, easy to oversell. The copy keeps the honest downside in slide 4 instead of ending on the upside.
- Very fresh, one week old at most. Framed as early and promising, not proven, and the copy does not claim it is a finished solution.
- Reads as an ad for one vendor. GitHub's feature is the anchor, but slide 4 names Cursor and Claude Code as having their own versions, so it stays cross-vendor.

## 10. Distribution plan

Personal account first: the founder who owns engineering posts, ideally with a short screen clip of the real workflow, since this fits Muse's behind-the-scenes pillar. Muse amplifies within a few hours. LinkedIn adaptation: same substance, framed as team throughput with a review gate, posted a day or two later for buyers and engineering leads.

## 11. Founder first-day interaction plan

- Before posting: reply usefully to 3 to 5 recent posts from developers discussing parallel AI agent workflows, no link drops
- First 60 to 90 minutes: answer every substantive comment with a fact or a follow-up question; deepen the best comment with a real reply
- Quote-post targets: 1 to 2 respected developer-tools accounts who posted on the same changelog, quoted to extend the discussion
- Follow-up: if someone shares a clean review-and-merge routine, feature it with credit in a follow-up post

## 12. Success hypothesis and metrics

Hypothesis: a concrete, try-it-now workflow earns saves because people bookmark things before they act on them. Primary metric: saves. Secondary: shares, plus reach tracked but not celebrated on its own.

## 13. Source list

[4] GitHub Changelog, "GitHub Copilot in Visual Studio Code, July 2026 releases," 2026-07-30
[27] dev.to, Leo Baniak, "Copilot in VS Code gives each agent session its own git worktree," 2026-07-31 (corroborator)
Bench alternate mentioned in `sources/sources.md`: Figma Code Layers [5], not used as a claim in this copy. Full verbatim excerpts in `../sources/sources.md`.
