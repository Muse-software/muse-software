# Batch 01, AI Content Experiments

Six content experiments, built from `../Plan.md` against the citation ledger in `source-ledger.json`. Full editable copy lives in `experiments/` and `threads/`. The branded PDF is generated from `doc-src/` and is a condensed, readable strategy document, not the full copy.

## What is here

```
batch-01/
  source-ledger.json           locked citation IDs, do not renumber
  sources/
    sources.md                 the verified register, one entry per source
    pending-sources.md         ledger corrections and confirmation that no unregistered source ships
  experiments/
    exp-1-model-picking.md
    exp-2-agent-worktrees.md
    exp-3-benchmark-variance.md
    exp-4-ai-and-confidence.md
    exp-5-code-maintainability.md
    exp-6-arabic-benchmarks.md
  threads/
    exp-1-thread.md ... exp-6-thread.md   X thread text, ready to paste
  post-log.md                  the measurement template, fill in as posts go out
  doc-src/                     the Muse PDF system, see below
  AI-Content-Batch-01.pdf      the generated deliverable
```

## Building the PDF

```sh
/Users/a/Downloads/personal/pdfenv/bin/python doc-src/build.py
PLAYWRIGHT_BROWSERS_PATH=/Users/a/Library/Caches/ms-playwright /Users/a/Downloads/personal/pdfenv/bin/python doc-src/measure.py
```

`build.py` writes `AI-Content-Batch-01.pdf` one directory above `doc-src/`, since that constant was renamed for this batch.

## Verify before calling anything done

```sh
python3 doc-src/measure.py                                       # no negative clearance, aim for 4mm or more
pdfinfo AI-Content-Batch-01.pdf | grep Pages                      # expect 12
pdffonts AI-Content-Batch-01.pdf | grep -Ei 'times|helvetica|arial|segoe'   # must print nothing
# then scan extracted text for Unicode punctuation code points U+2013, U+2014, U+00AB, U+00BB, U+2018, U+2019, U+201C and U+201D
python3 doc-src/contrast.py                                       # confirms the palette
pdftoppm -png -r 80 AI-Content-Batch-01.pdf pg                    # then look at every page
```

Also grep the extracted text and the markdown source files for the banned Muse phrases listed in `../Plan.md` section 8, and check hyperlink count and targets before signing off.

## Where the numbers come from

Every figure and quote in `experiments/` and the PDF traces to `sources/sources.md`, keyed by fixed IDs in `source-ledger.json`. Corrected live URLs were added through the ledger script as new IDs rather than substituted under broken historical IDs. If a number changes on the live page later, `sources.md` records what was checked on 2026-08-05.

## Arabic

English first. `exp-6-arabic-benchmarks.md` carries one verified Arabic word taken directly from its source, not a translation. A full native Arabic pass is a later step, written by someone who writes Arabic well, and is not a blocker for this English batch.

## Reusing this batch for future social content

1. Copy the `batch-01/` folder structure to a new `batch-02/` folder
2. Update `planner-brief.md` with new topic directions (same format as `../planner-brief.md`)
3. Run grounded research with the citation ledger script
4. Create experiment files following the same sections in `experiments/`
5. Create thread files in `threads/`
6. Update `doc-src/document.html` with the new slate
7. Build and verify the PDF using the commands below
8. Log results in a fresh `post-log.md`

The verification commands in this README are the checklist. Do not skip them.