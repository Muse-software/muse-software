---
type: note
created: 2026-08-02
updated: 2026-08-02
tags: [company, brand, reference]
---

# Brand Texture

The dither is the house texture. It is the only one. It replaced two things at once on the website: the thin crosshair grid the deck uses as its recurring pattern, see [[Brand Identity#Graphic system]], and the maroon surface that used to carry every layout, see [[Brand Colour & Type#Mix ratio]]. Both changes were made on the website first and are recorded in [[Decision Log]].

This note is the applied version, written for anyone placing the texture in a layout. The engineering detail lives in `docs/dither-system-plan.md` in the website repo and does not need reading to use this.

## What it is

A halftone. A field of small marks on a grid, where the number of marks in an area carries the value, not the brightness of the marks themselves. Fewer marks reads as less, more marks reads as more, and every mark is the same colour at full strength.

That distinction is the whole thing and it is easy to lose. A field that fades is a screen with the opacity turned down. A field that dithers keeps every dot solid and drops dots instead. The second one is ours.

## Square, not round

Decided 2026-08-02. The marks are squares.

Round was the original because it matched a halftone print reference. Square is the blockier and more native reading, and it agrees with two pieces of artwork that were already on a grid: the logo mark, which is built from stepped blocks, see [[Brand Identity#The mark]], and the arrow glyph used on buttons, which is drawn pixel by pixel.

Applied everywhere on the website except three background fields that were built before the decision and have not been switched yet. Listed under Open below.

## Density means something

The most useful rule here, and the one that separates the texture from wallpaper.

Density is a variable, so it should carry information rather than sit at one setting. Denser can mean nearer, more emphasis, further through a process, higher confidence, a live state. A field at a single uniform density everywhere is decoration, and decoration is what got the crosshair pattern removed.

| Density | Reads as |
|---|---|
| Sparse | Background. Present but not the subject |
| Building | Approach, arrival, progress |
| Dense | Emphasis, foreground, the point of the composition |
| Falling away | Departure, dissolve, the edge of a section |

## Colour arrangements

The texture never introduces a new colour. It rearranges three values already in the palette: page black, Muse Orange and white. Which one is the surface, which one is the mark and which one is the type is a single decision, not three.

| Arrangement | Surface | Mark | Type | Use |
|---|---|---|---|---|
| Ink | Page black | Orange | White | The default. Any section, any size of type |
| Accent, black mark | Orange | Black | White | Loud. Display type only, see the contrast note |
| Accent, white mark | Orange | White | Black | Loud and the safest of the two accent options |
| Knocked out | Orange or black | Either | The surface colour | The words are holes in the field. Needs a dense field or it disappears |

## Contrast, measured

Computed ratios, run 2026-08-02, consistent with the table in [[Brand Colour & Type#Accessibility, measured]].

| Pair | Ratio | Verdict |
|---|---|---|
| White on page black | 19.9:1 | Passes everything |
| Black on Muse Orange | 6.2:1 | Passes everything. The safe accent arrangement |
| White on Muse Orange | 3.4:1 | **Fails AA for body text.** Large type only, 18pt or 14pt bold and above |

Two consequences worth stating plainly.

**The accent arrangement with white type is for headlines and nothing else.** It is the most striking of the four and it is the one that cannot carry a paragraph. If a layout needs body copy on the orange, it takes black type and white marks.

**Marks under type reduce contrast locally.** A dense field behind text pulls the effective ratio toward the mark colour, so text over the texture holds at roughly a quarter coverage or less, or it gets its own clear panel. Body copy never sits on a dense field.

## Scale

The grid has a cell size, and it has to suit what the texture is inside.

| Where | Cell | Why |
|---|---|---|
| Full sections and backgrounds | Medium | Reads as surface, not as pattern |
| Display type filled with the texture | Large or extra large | Below this the marks vanish into the letter strokes |
| Arabic display type | One step finer than the Latin equivalent | Arabic strokes are thinner and more connected, so the same cell that reads as texture in English reads as damage in Arabic. See [[Localization Playbook]] |
| A logo or a solid mark | Small | Needs several cells across the shape or it reads as damage rather than texture |
| Icons at interface size | None | Too small for a grid. The icon's own stroke becomes the run of marks instead |

The floor is real. Anything under about 48 pixels across cannot hold a grid, and the answer there is to dot the stroke rather than fill the shape.

## Allowed

- The texture as a section background, at low density
- The texture inside display type, a logo, or any solid mark
- The texture as a seam between two sections, densest at the boundary
- The texture as a rule, dispersing at both ends
- The texture as a highlight behind a line of type, at half density
- The texture appearing on hover, on a card or a control
- Any of the four colour arrangements above

## Not allowed

- A second texture. There is one, and adding another is what the crosshair removal was about
- A colour outside page black, Muse Orange and white
- A field at uniform density behind a half empty section. That is wallpaper
- Body copy on a dense field
- White type on the orange arrangement at body size
- Fading the marks instead of dropping them. Density falls, opacity does not

## Open

Three things the website has already decided in practice that this vault has not caught up with. None of them are settled and all three need a call.

**The orange is two different values.** [[Brand Colour & Type]] gives Muse Orange as `#FE4701`, lifted from [[Brand Guideline PDF]]. The website is almost entirely `#fd4601`, and its code comments call `#fe4701` a typo. Three files still use the deck value, one of which is the home page hero, so the largest orange field on the site is a different orange from every other orange on the site. One digit, visually almost nothing, but the two cannot both be the brand. Someone needs to open the PDF and settle it.

**The maroon is gone from the website.** `#4C0014` is 50 percent of the deck's mix ratio and it is not on the site at all. The texture is what replaced it as the way of saying this section is different, because a flat colour block says it far too loudly and a texture that swells and fades across a boundary does the same job by rhythm. That may be right for the website and wrong for print and the deck. Not decided.

**The secondary palette is unused.** Yellow, purple and green are 5 percent each in the deck and appear nowhere on the site. Either they are for print and decks only, or they are dropped.

## Where it runs today

The home page hero, the subpage headers, the closing call to action panel, a wash under whole pages, and the hover state on every card. A catalogue of further uses is built and previewable, and none of it is decided. See `docs/dither-system-plan.md`.
