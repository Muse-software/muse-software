# X thread, Experiment 2. Agent worktrees

1/ You can now run several AI coding agents at once without them fighting over your repo.

2/ Running two or three AI agents at once used to mean chaos in one working tree.

3/ New in GitHub Copilot, July 2026: start a Copilot, Claude, or Codex session in its own Git worktree, an isolated copy of your repository [4].

4/ Why it helps: each agent works on its own copy and branch. Nothing touches main until you review and merge.

5/ Where it bites: one developer running two agents before this feature existed had them "stomp on each other's edits inside about ninety seconds" [27]. Isolation fixes that failure mode. It does not fix the pile of half-finished branches you still have to reconcile. Cursor and Claude Code have their own versions of this.

6/ Do you run agents in parallel yet? What is your review-and-merge routine before it turns into branch soup?

Sources: [4] github.blog changelog, 2026-07-30. [27] dev.to, Leo Baniak, 2026-07-31. Full register in sources/sources.md.
