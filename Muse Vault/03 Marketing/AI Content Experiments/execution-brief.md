# Execution brief for Muse AI Content Experiments, Batch 01

Execute the approved plan at:

`Muse Vault/03 Marketing/AI Content Experiments/Plan.md`

This is a fresh execution session. Read the plan, the original planner brief, the relevant vault notes named in the plan, and the copied Muse PDF template under `batch-01/doc-src/` before writing.

## Scope

Create the complete Batch 01 artifact set under:

`Muse Vault/03 Marketing/AI Content Experiments/batch-01/`

Do not edit anything outside `Muse Vault/03 Marketing/AI Content Experiments/`. Do not run git commands. Do not commit or push.

## Sources and grounding

A citation ledger already exists at:

`batch-01/source-ledger.json`

It maps the 21 researched URLs to fixed numeric IDs. Read it. Use those exact IDs for inline citations in Markdown and condensed citations in the PDF. Do not reset, renumber, or hand-edit the ledger.

Re-fetch every source used in final copy with WebFetch or WebSearch plus WebFetch. The plan is reconnaissance, not evidence. For each used source, write a record to `batch-01/sources/sources.md` containing:

- Fixed citation ID from the ledger
- Exact URL
- Title
- Publisher or author
- Publication date
- The exact verbatim excerpt that supports the claim
- Which experiment and claim it supports
- Whether it is first-party, independent reporting, vendor-reported, self-reported, older than 90 days, or landmark research
- Any limitation or conflict of interest

If a primary page fails, use an already registered corroborator and say that clearly. If neither can be fetched, cut the claim. Never quote from Plan.md as if it were the original source.

Do not add new source URLs unless a selected claim genuinely cannot be supported by the registered set. If you must add one, list it in `sources/pending-sources.md` with the reason and do not use a new citation number or place it in the PDF. The orchestrator will register it later.

Every factual sentence in the editable experiment files must carry one or more inline `[n]` citations using the fixed IDs. Editorial advice, questions, Muse strategy, and hypotheses do not need citations.

## Required files

Create:

- `experiments/exp-1-model-picking.md`
- `experiments/exp-2-agent-worktrees.md`
- `experiments/exp-3-benchmark-variance.md`
- `experiments/exp-4-ai-and-confidence.md`
- `experiments/exp-5-code-maintainability.md`
- `experiments/exp-6-arabic-benchmarks.md`
- `threads/exp-1-thread.md` through `threads/exp-6-thread.md`
- `sources/sources.md`
- `post-log.md`
- `README.md`
- `doc-src/document.html`
- Adjust `doc-src/build.py` only as needed for the correct file name and stable build
- `AI-Content-Batch-01.pdf`

Do not create the Arabic translation file. English first. Experiment 6 can contain one short Arabic example only if it comes directly from a verified source or the vault. Do not machine-translate the carousel.

## Each experiment file must be complete

Include:

1. Premise and audience job
2. Best format and channel adaptation
3. Truthful hook
4. Full on-slide copy for exactly 5 slides, ready to paste into designed carousel cards
5. X thread version or exact note that the dedicated thread file is the X version
6. Caption or opener
7. Genuine discussion question
8. Why it can earn comments, saves, shares, and quote posts, separated by behaviour
9. Risks and how the published version avoids them
10. Distribution plan: personal account first, Muse amplification, LinkedIn adaptation
11. Founder first-day interaction plan: 3 to 5 useful pre-post replies, first 60 to 90 minute response routine, 1 to 2 quote-post targets by type, follow-up post or asset
12. Success hypothesis, one primary metric, and secondary diagnostics
13. Inline citations and a short source list generated from the source register

Threads must be ready to paste. Keep each post concise. Do not write long essay threads if the same idea works in 5 to 7 posts.

## Measurement

The PDF and `post-log.md` must include:

- One primary metric per experiment
- Raw primary count
- Reach
- Normalised primary-action rate per 1,000 reached
- Definitions of substantive reply and real conversation from the plan
- Quality notes from replies and DMs
- Confounds: account, channel, format, day and time, outside amplification
- Next decision: keep, re-run in another format or channel, or retire
- Clear warning that six posts show direction, not proof

Do not position followers, likes, impressions, or reach as success on their own.

## PDF

Use the copied Muse PDF system. Target exactly 12 A4 pages according to the approved page map. The PDF should be a readable strategy and experiment document, not six giant presentation slides.

Each experiment page must include enough of the actual carousel to judge it:

- Hook
- Five numbered slide summaries or compact slide-copy blocks
- The question
- Why it can engage
- Primary metric
- Condensed source citations

The full copy remains in the editable Markdown files.

Use Muse maroon and orange, Space Grotesk, sharp corners, no decoration beyond the house system. No stock imagery. No screenshots unless they are real, checked, legible, and necessary. The 12 pages should stand without screenshots.

## Voice and copy checks

- Human, warm, specific, not corporate
- No AI marketing language
- No fake conflict or empty engagement bait
- No attack on a named Saudi company
- No invented number, release, quote, or date
- No em dash, en dash, guillemets, curly quotes, or curly apostrophes
- No banned Muse phrases from the plan
- Straight ASCII quotes only
- No English-to-Arabic machine translation

## Build and verify before finishing

Use the working Playwright environment at `/Users/a/Downloads/personal/pdfenv/bin/python` when needed. Set `PLAYWRIGHT_BROWSERS_PATH=/Users/a/Library/Caches/ms-playwright`.

Run and resolve:

- PDF build from the shipped `doc-src`
- `measure.py`, no negative clearance and aim for at least 4mm
- Exactly 12 A4 pages
- Font check, no Times, Helvetica, Arial, or Segoe
- Extracted-text grep for banned punctuation and banned phrases
- Source-file grep for the same
- Hyperlink count and target inspection
- Render every page to PNG for orchestrator review

Do not claim success if a check fails. Fix and re-run. Return a compact completion note with exact file paths, source blockers or substitutions, build commands run, page count, measurement result, and any item the orchestrator must review independently.