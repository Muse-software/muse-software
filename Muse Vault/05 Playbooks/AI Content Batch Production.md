---
type: playbook
created: 2026-08-06
tags: [marketing, process, content, batch]
---

# AI Content Batch Production Playbook

This is the complete, self-contained process for producing a source-backed social content batch for Muse Studios. A future agent in a new session should read this file and the referenced vault notes, then execute the batch without additional guidance.

## Prerequisites (verify before starting)

- Repository: `/Users/a/Downloads/personal/muse-software` on branch `direction/3-the-proof`
- Python for citation scripts: `/Users/a/.hermes/hermes-agent/venv/bin/python3.11`
- PDF build environment: `/Users/a/Downloads/personal/pdfenv/bin/python`
- Muse PDF template: `/Users/a/Downloads/personal/muse-software/Muse Vault/03 Marketing/AI Content Experiments/batch-01/doc-src/` (copy to new batch)
- Citation ledger script: `/Users/a/.hermes/skills/research/grounded-citations/scripts/sources.py`

## Vault notes to read first (in this order)

1. `Muse Vault/01 Company/Positioning.md`
2. `Muse Vault/01 Company/Brand Voice.md`
3. `Muse Vault/03 Marketing/Marketing.md`
4. `Muse Vault/03 Marketing/Influence Strategy.md`
5. `Muse Vault/03 Marketing/Content Engine.md`
6. `Muse Vault/03 Marketing/Community & Events.md`
7. `Muse Vault/03 Marketing/Channels.md`
8. `Muse Vault/03 Marketing/Audience Research.md`
9. `Muse Vault/05 Playbooks/Measurement.md`
10. `Muse Vault/05 Playbooks/AI Guidelines.md`

## Batch folder structure

```
AI Content Experiments/
  planner-brief.md                    # batch brief, update per batch
  Plan.md                             # generated plan (from Claude research)
  execution-brief.md                  # execution instructions for agent
  batch-XX/
    source-ledger.json                # locked citation IDs, DO NOT RENUMBER
    sources/
      sources.md                      # verified register, one entry per source
      pending-sources.md              # corrections, confirmation no unregistered sources ship
    experiments/
      exp-1-<topic>.md                # 6 files, one per experiment
      exp-2-<topic>.md
      exp-3-<topic>.md
      exp-4-<topic>.md
      exp-5-<topic>.md
      exp-6-<topic>.md
    threads/
      exp-1-thread.md ... exp-6-thread.md   # X thread copy, ready to paste
    post-log.md                       # measurement template
    doc-src/                          # Muse PDF system (copy from batch-01)
    AI-Content-Batch-XX.pdf           # generated deliverable
    README.md                         # build and verify commands
```

## Step-by-step process

### 1. Create planner brief

Copy `planner-brief.md` and update:
- Current date (Riyadh time)
- Topic directions for the 6 experiments (maintain variety: model release, tool/workflow, research finding, behavioural economics, debatable opinion, Arabic/regional angle)
- Any new constraints or format preferences

### 2. Run grounded research and planning

Use the planner brief as input. The planning session should:
- Read all 10 vault notes above
- Use WebSearch/WebFetch for current reconnaissance (last 90 days preferred)
- Prefer first-party sources, original papers, official announcements, model cards, reputable labs, credible journalism
- Avoid SEO roundups and unattributed social posts
- Capture for every candidate: exact URL, title, publisher/author, date, verbatim excerpt, what is new/timely, what is interpretation, one independent corroborator for consequential claims
- Reject any candidate that cannot be fetched or verified
- Output `Plan.md` with all 8 required sections (synthesis, selection criteria, reconnaissance, proposed slate, file list, PDF page map, source verification checklist, mechanical checklist)

### 3. Create execution brief

Write `execution-brief.md` instructing the execution agent to:
- Read `Plan.md` and vault notes
- Create all experiment files, thread files, source register
- Build and verify PDF
- Do not edit outside the batch folder
- Do not run git commands

### 4. Execute the batch (production)

The execution agent creates:
- 6 experiment markdown files with all required sections (premise, format, 4-5 slide copy, hook, question, caption, why it earns engagement, risks, distribution, founder interaction playbook, success hypothesis, primary metric)
- 6 thread files (X/LinkedIn ready to paste)
- Source register via citation ledger script:
  ```sh
  /Users/a/.hermes/hermes-agent/venv/bin/python3.11 /Users/a/.hermes/skills/research/grounded-citations/scripts/sources.py register --ledger batch-XX/source-ledger.json --source "<title>" --url "<url>" --date "<date>" --excerpt "<verbatim>"
  ```
- `sources.md` rendered from ledger
- `pending-sources.md` confirming no unregistered sources
- `doc-src/document.html` updated with new slate
- PDF built and verified

### 5. Independent verification (mandatory)

After the execution agent finishes, independently verify:
- Every citation ID in `document.html` and experiment files exists in `source-ledger.json`
- No stale broken IDs (historical 7, 16-21) are cited
- All PDF pages pass layout checks (measure.py, no negative clearance)
- Fonts embedded (pdffonts shows no Times/Helvetica/Arial/Segoe)
- No banned Unicode punctuation (— – « » " " ' ')
- No banned Muse phrases in extracted text
- Arabic shaping verified visually on relevant pages
- Hyperlinks present and clickable in PDF
- `post-log.md` experiment table topics match actual content

### 6. Fix and rebuild

If verification finds issues:
- Correct claims in experiment files and thread files
- Update `document.html`
- Register corrected sources as NEW IDs in ledger (never overwrite historical IDs)
- Rebuild PDF
- Re-verify

### 7. Final deliverables

- `AI-Content-Batch-XX.pdf` (Muse-branded, 12 pages typical)
- All editable sources in `batch-XX/` for future modification
- Updated `post-log.md` ready for real posting data

## Verification commands (from batch README)

```sh
# Build
/Users/a/Downloads/personal/pdfenv/bin/python doc-src/build.py
PLAYWRIGHT_BROWSERS_PATH=/Users/a/Library/Caches/ms-playwright /Users/a/Downloads/personal/pdfenv/bin/python doc-src/measure.py

# Verify
python3 doc-src/measure.py
pdfinfo AI-Content-Batch-XX.pdf | grep Pages                      # expect 12
pdffonts AI-Content-Batch-XX.pdf | grep -Ei 'times|helvetica|arial|segoe'   # must print nothing
python3 doc-src/contrast.py
pdftoppm -png -r 80 AI-Content-Batch-XX.pdf pg                    # inspect every page
```

## Key rules carried from vault

- Voice: plain, specific, human, warm, not corporate. No AI marketing language.
- No invented numbers, fake certainty, or fake screenshots.
- No em dash, en dash, guillemets, curly quotes.
- No banned Muse phrases (see Brand Voice).
- Never attack a named Saudi company for reach.
- Respectful tension around a claim or trade-off is acceptable.
- English first. Arabic is a native-writing pass later, not machine translation.
- Primary metric per post: saves, substantive replies, quote posts, or real conversations.
- Rate over raw totals for fair comparison.
- Six posts show direction, not proof — re-run winners before scaling.

## For the next agent

Start by reading this file, then the 10 vault notes listed above, then the current `planner-brief.md`. The batch folder structure and citation ledger are the reusable infrastructure. Do not recreate them — copy and extend.