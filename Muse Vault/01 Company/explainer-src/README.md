# Muse explainer, build source

Regenerates `Muse-Studios-Explainer.pdf`, the ten page company document. Edit the
source here and rebuild. Never hand edit the PDF.

## Rebuild

```sh
pip install playwright && playwright install chromium   # once
python3 explainer-src/build.py                          # writes the PDF next to this folder
python3 explainer-src/measure.py                        # page fill and overflow check
```

## What each file is

| File | What it does |
|---|---|
| `explainer.html` | The document. All copy lives here, one `<section class="page">` per page |
| `house.css` | The style system: Muse palette, type scale, bands, tables, the two figures |
| `build.py` | Renders the HTML to PDF with headless Chromium |
| `measure.py` | Reports how full each page is and flags silent overflow. Run after every copy edit |
| `crop-logos.py` | Regenerates the tight `-crop.svg` logo files from the 1080x1080 brand exports |
| `fonts/` | Space Grotesk for Latin, IBM Plex Sans Arabic for Arabic. Committed so a rebuild needs no download |
| `assets/` | Muse logo SVGs, copied from `99 Meta/Attachments/Brand`, plus the cropped versions actually placed |

## Two things that will bite you

**Pages are fixed 297mm blocks with `overflow: hidden`.** Content that spills is
clipped invisibly and the PDF still reports ten pages, so the page count proves
nothing. `measure.py` is the check that matters. It reports the bottom edge of
the last element on every page against the footer rule, and anything negative is
being silently cut off.

**Measure in screen media, never print.** Print emulation fragments the layout
into page boxes and clamps every rect to 297mm, which hides exactly the overflow
you are looking for. `measure.py` deliberately skips `emulate_media("print")`.

## House rules this document is held to

- No em dashes, no en dashes, no guillemets, straight quotes only. Check with
  `pdftotext -layout ../Muse-Studios-Explainer.pdf - | grep -n "banned chars"`
- Sharp corners, no shadows, no gradients, no emojis, no stock imagery
- Roles only. No individual team member names anywhere in the document
- Every fact traces to `06 Research/Localisation Precedents.md`. Anything marked
  unverified in that note stays out, including as a disclaimed aside
- No timelines: no week counts, no phase durations, no dates on a process

## Palette and type

Maroon `#4c0014` carries the surface, orange `#fe4701` is the loudest thing and
not the largest, white is type and negative space. Contrast was measured before
the build:

| Pair | Ratio | Use |
|---|---|---|
| White on maroon | 15.94:1 | Bands, cover, table headers |
| Maroon on white | 15.94:1 | Body text |
| Orange on maroon | 4.64:1 | Numerals and accents on dark |
| White on orange | 3.43:1 | Large type only, fails AA for body |
| Orange on white | 3.43:1 | Large type and rules only, never body |
| Yellow on white | 1.66:1 | Fails. Not used |
| Green on white | 1.80:1 | Fails. Not used |

Type is Space Grotesk for Latin and IBM Plex Sans Arabic for Arabic runs, which
matches `01 Company/Brand Colour & Type.md` and the entry in the decision log
for 2026-07-30.

## Figures

F1, the three pillars, and F4, the three moves of localisation, are built in
HTML and CSS rather than placed as images, so they restyle with the palette.

F2 and F3, the precedent logo rows, are not in the document. Clean first party
assets could only be found for two of the seven companies, and the sourcing rule
in the brief says to drop a logo rather than ship a mixed quality row. The
companies are carried in the tables and prose instead. F5 is not in the document
because the screenshot it depends on was never taken.
