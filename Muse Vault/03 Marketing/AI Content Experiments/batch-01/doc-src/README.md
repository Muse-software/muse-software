# Muse document template

A working three page document using every component in the system. Copy this
whole folder, delete the demo copy, keep the structure.

```sh
cp -R ~/.claude/skills/muse-pdf/template  ./doc-src
python3 doc-src/build.py       # writes Muse-Document.pdf one level above doc-src
python3 doc-src/measure.py     # page fill and silent-overflow check
python3 doc-src/contrast.py    # palette contrast ratios
```

One time setup: `pip install playwright && playwright install chromium`.
`pdftotext`, `pdftoppm`, `pdfinfo` and `pdffonts` come from poppler.

## Files

| File | What it does |
|---|---|
| `document.html` | The document. All copy lives here, one `<section class="page">` per page |
| `house.css` | The style system: palette, type scale, bands, tables, both figures |
| `build.py` | Renders the HTML to PDF with headless Chromium |
| `measure.py` | Reports page fill and flags silent overflow. Run after every copy edit |
| `contrast.py` | WCAG contrast for the palette, or any pair you pass it |
| `crop-logos.py` | Regenerates the tight `-crop.svg` logos from the 1080x1080 brand exports |
| `fonts/` | Space Grotesk and IBM Plex Sans Arabic as woff2, committed |
| `assets/` | Muse logo SVGs, originals plus the cropped versions actually placed |

Rename `PDF` in `build.py` to whatever the document should be called.

## Two things that will bite you

**Pages are fixed 297mm blocks with `overflow: hidden`.** Content that spills is
clipped invisibly and the PDF still reports the expected page count, so the page
count proves nothing. `measure.py` is the check that matters: it reports the
bottom edge of the last element on each page against the footer rule, and
anything negative is being cut off.

**Measure in screen media, never print.** Print emulation fragments the layout
into page boxes and clamps every rect to 297mm, which hides exactly the overflow
you are looking for. `measure.py` deliberately skips `emulate_media("print")`.

## When a page overflows

In this order, and re-measure after each. Do not shrink body type, and do not
nibble at single words: **a trim that does not remove a whole line changes
nothing**, and a page can absorb several word-level edits with an identical
height.

1. Cut a whole block: a paragraph, a table row, a list item
2. Merge two paragraphs into one
3. Shorten table cells that wrap to a second line, worth about 10mm each
4. Tighten leading on short labelled blurbs, never on running prose
5. Adjust the chrome in `house.css`: band padding, `.body` padding-top, footer
   offset. This moves every page at once and is safe, because pages are fixed
   blocks and nothing reflows across them

A page under about half full gets merged into its neighbour, never padded.

## Page numbers

`.foot .pn` holds a literal string, because Chromium's footer template renders in
an isolated document that cannot load a webfont, so a number set there falls back
to Times. Renumber by hand when pages are added or removed.

## Before saying done

The full list is in `../reference/verification.md`. The short version:

```sh
python3 doc-src/measure.py
pdfinfo  out.pdf | grep Pages
pdffonts out.pdf | grep -Ei 'times|helvetica|arial'          # must print nothing
pdftotext -layout out.pdf - | grep -n '—\|–\|«\|»'           # must print nothing
pdftoppm -png -r 80 out.pdf pg                               # then look at every page
```
