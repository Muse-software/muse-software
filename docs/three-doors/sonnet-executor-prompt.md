You are executing an already-reviewed, already-approved revision plan for the Muse website. The plan is the contract. Do not improvise copy, do not skip steps, do not touch anything out of scope.

PLAN: /Users/a/Downloads/muse-doors-revision-plan.md (absolute path, read it in FULL first)
REPO: /Users/a/Downloads/personal/muse-software
BRANCH ORDER: direction/1-the-studio → direction/2-the-thesis → direction/3-the-proof

ENVIRONMENT
- Next.js 16 + next-intl + npm. Node for builds: export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" before any npm/node command.
- Git identity for this repo must be user.name=alsubaieabdullah, user.email=abdullah.a.alsubaie@outlook.com. Set it locally per checkout (git config user.name / user.email) if it is not already that.
- gh is already authenticated as alsubaieabdullah (correct for this repo). Do not switch accounts.

SCOPE (hard rules)
- ONLY touch: messages/en.json, messages/ar.json, components/sections/ThreeDoors.tsx, components/sections/TheProblem.tsx. Nothing else. Do not edit docs/, research files, or add any new files.
- Decision g (P-2): DEFERRED. Do NOT touch Contact.form.budgets / GetStarted.form.revenueBands keys or their component arrays (ContactForm.tsx / GetStartedForm.tsx stay untouched). Their en dashes are a logged exception.
- P-4 (D3 AR hero + proofWall untranslated, invented results): FLAG-ONLY. Do NOT change D3 hero, proofWall items other than the Tenet dash fix, or any Legal content other than the exact P-3 string the plan specifies.
- The plan's Section 3.0.C ThreeDoors.tsx edit and Section 3.2 TheProblem.tsx edit must be applied in the SAME commit as the corresponding JSON key deletions, or the build fails with MISSING_MESSAGE. Follow the plan's commit grouping exactly.
- Use the plan's EXACT commit messages. One logical commit per step, as in plan Section 6.

PER BRANCH
1. git checkout <branch> (verify you are on the right branch with git branch --show-current).
2. Apply the plan Section 6 steps for that branch (which reference Section 3.x copy and 3.0/3.0.C shared edits). The exact target strings are in the plan; use them byte-for-byte, including Arabic diacritics.
3. IMPORTANT drift check: if any "current" string in the plan does not match what is actually in the file (excluding the AR/D2-D3 variant rows which the plan annotates per-branch), STOP and report the mismatch. Do not guess.
4. After the branch's commits: verify, in order:
   a. npm run build → exit 0, no MISSING_MESSAGE / IntlError.
   b. npm run lint → clean (or report what it flags; do not fix out-of-scope lint).
   c. EN/AR parity: write a tiny python3 script to /tmp/parity.py that compares the full key-path sets of messages/en.json vs messages/ar.json (recursive, arrays by index) and prints EN-only and AR-only. Expect ZERO diffs on every branch (D1's whoWeBuildFor parity add closes its gap).
   d. Punctuation sweep: grep -nE '—|–|[“”‘’«»]' messages/en.json messages/ar.json → expect NO hits EXCEPT the deferred P-2 keys (Contact.form.budgets / GetStarted.form.revenueBands on all branches). Report any other hit as a failure and fix it (it is in scope if inside Home.* or the plan's named targets).
   e. Emoji sweep: grep -nE '🎯|📝|🏗️' messages/en.json messages/ar.json → expect ZERO hits everywhere.
   f. Eyebrow check: grep -n '"eyebrow"' messages/en.json messages/ar.json → the ONLY allowed hits are theSection.eyebrow (kept per plan) and any non-doors section eyebrow the plan KEEPS (e.g. theProblem.eyebrow, theStandard.eyebrow, proofWall.eyebrow). There must be NO "doors" eyebrow keys and no per-card eyebrow keys.
5. git push origin <branch> (push is expected; these are Vercel preview branches).
6. Move to the next branch.

FINAL REPORT (after all three branches)
- Per branch: commit list (short hashes + exact messages), build/lint/parity/sweep results, any drift encountered, any deviations.
- A one-line note per branch confirming: doors have zero eyebrows, heroes are per-plan (D1/D2 new, D3 untouched), emojis/dashes gone as planned.

Run everything yourself. Do not ask questions. If you hit a genuine blocker, stop, leave the tree clean, and report exactly what happened.
