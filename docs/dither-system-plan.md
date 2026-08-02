# The Dither System: component catalogue + playground plan

Status: **the whole catalogue is built and verified** at `/[locale]/playground/dither`
(2026-08-02). Twenty-nine specimens across Phases 0 to 4. P3, P19 and P20 are cut for want of real
data, P9 is superseded, P18 is rescoped for the same reason P3 was, and P2b folded into P2. Nothing
is shipped: no live page has changed. Section 8 records what the three build passes found — eighteen
findings, most of them places this document turned out to be wrong. Written 2026-08-02.

A menu of dither-derived components to build behind one throwaway playground route so they can be
looked at on the real stack, in both locales, and picked from. Nothing here touches a shipped page
until something is chosen.

Companion to `docs/i18n-plan.md`. Governed by the same constraints as the rest of the site: strict
CSP (`next.config.ts`), Arabic-first RTL, and the standing rule that the dot dither is the site's
**only** texture.

---

## 0. The thesis

Right now the dither is a background. It sits behind the hero, behind subpage headers, inside the
CTA panel, and under the pointer on four card types. In every one of those it is wallpaper: pretty,
on-brand, and carrying no information.

The move that turns a texture into a design system is making **density mean something**. Dither is
not a pattern, it is a *quantiser*: it converts a continuous value into a countable number of dots.
That gives it a job nothing else in the kit can do. Density can encode depth, progress, emphasis,
confidence, proximity, temperature, state. Once density is a variable rather than a constant, the
same four gradient layers become a bar chart, a focus ring, a hover state, a section seam, and a
headline fill, and the site reads as one material rather than one wallpaper reused.

Everything below is an application of that single idea. The components that only decorate are marked
as such and ranked last.

---

## 1. What already exists

Three engines, three materials, three very different costs. Choosing wrong is the most common way
this goes bad, so this table is the first thing to read.

| Engine | File | Material | Cost | Where it runs today |
|---|---|---|---|---|
| **CSS lattice** | `.dither-*` in `app/globals.css` | Regular 2x2 Bayer grid, 4 offset dot layers, each with its own mask. Static. | Zero. Server-safe, no JS, no GL. | **Nothing.** See the warning below. |
| **PixelBlast field** | `components/PixelBlast.tsx` via `DitherField.tsx` / `PageDither.tsx` | Dots thresholded out of a **drifting noise field**. Scattered and moving. | 1 WebGL context each. | Subpage heroes, CTA panel bands, whole-page wash |
| **Shared card field** | `components/CardDither.tsx` | The same shader, one fixed viewport-sized canvas for the whole page, whose *mask* moves onto the hovered card. | 1 WebGL context total, for any number of cards. | Approach, CareersList, careers, contact, 404 |
| **Ink simulation** | `components/DitherCursor.tsx` + `DitherCursorScene.tsx` | R3F ping-pong sim, thresholded against an 8x8 Bayer matrix. Ink that spreads and decays. | 1 WebGL context, desktop only, unmounts when far from viewport. | CTA panel, optional hero variant |

> **The lattice is currently orphaned.** `components/Dither.tsx` and `components/DitherHover.tsx`
> were deleted on 2026-08-02 when `CardDither` took over the card hover. The `.dither` CSS block
> survives, but the only thing referencing it now is `components/playground/DitherLayers.tsx`. So
> the whole playground rests on a block of CSS that a routine dead-code sweep would remove, and
> every specimen would go blank at once. If anything here is picked, fold those rules into the
> component that keeps them; if nothing is, delete the block with the playground.

**The difference that matters.** The CSS lattice is a *regular* grid. At rest it reads as a printed
halftone screen, which is a different material from dither and looks laid-on-top. Under a moving
mask nobody notices, because the mask is doing the work. That is exactly why `DitherHover` (moving
brush) is CSS and `PageDither` (still field) is a shader; both decisions are already argued in
`app/globals.css:278-308` and `app/globals.css:447-479`. **Every new component has to answer the same
question: is my mask moving?** If yes, CSS. If it is a still field the eye can rest on, shader.

Existing primitives worth reusing rather than reinventing:

- `.dither-band` (`globals.css:334`) - covers only the near block edge, height from `--dither-band-height`
- `.dither-down` / `.dither-up` - staggered density falloff on the block axis
- `.dither-pointer` - four concentric radial masks scaled by `--dither-burst`
- `.dither-wash` - two of four layers at flat density, the honest no-pointer fallback
- `.dissolve-band` (`globals.css:266`) - softens all four edges, RTL-safe by symmetry
- `.cta-bands` (`globals.css:531`) - dense at both block edges, clear in the middle
- `.copper-bloom` - warm light under a band so dots read as texture over depth
- `.page-wash` - fixed canvas, scrolling mask, five blooms, mirrored under RTL

---

## 2. Rules any new dither component must obey

These are not style preferences, they are the constraints that already bit this codebase.

1. **The WebGL budget is real.** Browsers keep roughly 8 to 16 live contexts and silently drop the
   oldest. A page already spends up to three (page wash, subpage hero, CTA ink). **No component in
   this catalogue may default to a shader.** Shader variants are opt-in, capped, and only where a
   still field is the point.
2. **CSS lattice is the default engine.** If a component cannot be done on the lattice, say so and
   justify the context.
3. **Density is the only variable, and no new hue.** Not blur, not a new pattern, and never a fourth
   colour. What a component *may* do is rearrange the three values it already has: page black
   `#060608`, accent `#fd4601`, and white. `DitherPlate`'s tones are exactly that — which of the
   three is the plate, which is the dot, which is the type. A second brand hue is how this becomes
   wallpaper again; permuting the existing three is how it stays one system.
4. **RTL is a mask-axis question.** Masks on the block axis (`to bottom` / `to top`) or symmetric
   about the inline axis need no counterpart. Anything physical (`to right`, a corner, a bloom
   position) needs a `[dir="rtl"]` override, the way `.page-wash` does at `globals.css:522`. Every
   entry below states which it is.
5. **Three fallbacks, always.** Touch (no hover), reduced motion, and no-JS. `DitherHover` already
   models the pattern: server-render the honest static state (`wash`), upgrade to the interactive one
   only after the client confirms `(hover: hover) and (pointer: fine)` and no reduced-motion
   preference.
6. **Never texture for its own sake.** A dither behind a half-empty section reads as wallpaper thrown
   on top. That is why the brand crosshair and halftone patterns were removed on 2026-08-01. A new
   ambient field has to be doing a job the page cannot do without it.
7. **Body copy is never scroll-gated.** Reveal-on-scrub reads as a broken page. Headings may animate
   once. Paragraphs never. Scroll may drive a *rail's* density, never a paragraph's opacity.
8. **Contrast is not negotiable.** `#fd4601` is 6.06:1 on black and passes AA; at 80% it is 4.14:1
   and fails. Dither behind text must stay under roughly 25% effective coverage, or the text needs
   its own scrim. Verify per component, do not eyeball.
9. **No AI slop.** Anything that implies data (a stat, a meter, a logo wall, a progress rail) only
   ships if the number or the logo is real. A dither bar at "94%" of nothing is worse than no bar.
10. ~~**One rAF loop per card is not free.**~~ **Withdrawn.** This rule was written against
    `DitherHover`, which ran a loop per card. `CardDither` replaced it with one shared canvas whose
    mask moves to the hovered card, so a page pays one loop and one context regardless of how many
    cards it has. The rule that replaces it is narrower and still true: **only one card can be
    hovered at a time, so any per-card effect should be built once and moved, not built per card.**

---

## 3. Two new primitives everything else is built from

Build these first. Roughly 80% of the catalogue is a thin wrapper over one of the two.

### `DitherMask` - dither inside (or knocked out of) any shape

The single highest-leverage thing missing. It puts the dither *inside* live text, an icon, a number,
or a logo, in any script, with no SVG font embedding and no `mask-image: url(#id)` support gamble.

The technique is a `mix-blend-mode: multiply` sandwich inside an isolated stacking context:

```
<span class="dither-mask">               isolation: isolate; background: #000
  <Dither direction="wash" />            or a PixelBlast canvas, whichever engine
  <span class="dither-stencil">…</span>  mix-blend-mode: multiply
</span>
```

- **`mode="fill"`** - stencil is white text on a black ground. Multiply keeps the layer beneath
  wherever the stencil is white (inside the glyphs) and crushes everything else to black. Result:
  the dither is visible only inside the letterforms.
- **`mode="knockout"`** - stencil is black text on a white ground. Inverse: the field runs full
  bleed and the words are punched out of it as pure black holes.

Why this and not the alternatives: `background-clip: text` needs four duplicated copies of the text
(one per Bayer layer, because each layer carries its own mask) and they have to stay in pixel
lockstep. An SVG `<text>` in a `mask-image` data URI cannot load the page's webfont and does not fall
back reliably, which kills Arabic outright. The multiply sandwich keeps **one real text node**: it
stays selectable, it stays in the accessibility tree, it shapes Arabic natively, and it needs no
`aria-hidden` gymnastics.

Caveats to build in from the start: the wrapper's ground must be `#000` rather than `#060608` or the
knockout is a hair off page black (either accept the delta, or use it only on `bg-black` surfaces the
way `Hero` already is). Safari has historically been flaky about `mix-blend-mode` over a live canvas,
so the shader-backed variant needs a `@supports` guard falling back to solid white type.

### `.dither-ramp` - density as a value, 0 to 1

The rule from section 0, as four CSS declarations. A `--dither-level` variable drives four staggered
mask thresholds, so the layers switch on in Bayer order as the value rises. Below roughly 0.25 you
see one sparse grid; at 1.0 all four are solid.

```css
.dither-ramp .dither-layer:nth-child(1) { --dither-mask: linear-gradient(to top, #000 calc(var(--dither-level) * 100%), transparent 0); }
/* layers 2-4 the same, each thresholded later, so density ramps rather than the whole grid fading */
```

Block-axis, so RTL-safe by construction. This is what makes stats, meters, progress rails and
confidence indicators possible, and it is about fifteen lines of CSS.

Also worth adding while in there: `--dither-cell` is hard-coded at 6px with a 1.3px dot. That is
tuned for card-sized surfaces. Display type at 120px needs a 12 to 16px cell or the dots vanish into
the strokes; a 24px icon needs no lattice at all (see P8). Expose `sm` / `md` / `lg` / `xl` cell
presets rather than letting call sites invent numbers.

---

## 4. The catalogue

Each entry: what you see, the idea underneath it, the engine, and the thing most likely to go wrong.
Numbered `P1`+ so specific ones can be picked or cut by number.

### 0. Square dots, not round

Decided 2026-08-02 and applied across the whole sheet. The lattice drew circles because `.dither`
was matched to `DitherField`, which asks PixelBlast for `variant="circle"`. The Hero asks for
`variant="square"`, and square is the blockier, more pixel-native reading — it also matches the pixel
arrow in `PillButton`, the one piece of brand artwork literally drawn on a grid, and the logo mark's
own stepped construction.

One conic gradient per dot, which is the only way to get a hard-edged square out of a tiling
background: a conic centred at `(s, s)` with its first 75% transparent leaves exactly the quadrant
where `x < s` and `y < s`, and bounded by the tile that quadrant *is* the square. Linear gradients
can only make stripes, and a data-URI `<rect>` cannot take a custom property. Icons follow with one
property, `stroke-linecap: square`, since a zero-length dash with a square cap is a square exactly as
a round cap is a circle.

Scoped to a `.dither-squares` ancestor so both can be compared. **The three shipped shader fields
(`DitherField`, `PageDither`, `CardDither`) still ask for circles** — if squares win, those three
switch too, and that is the one change here that touches live pages.

### A. Type and marks

**P1 - `DitherDisplay`** (dither inside a headline)
A display headline whose letterforms are filled with the halftone instead of solid white, with the
density ramping across the line so the last word is nearly dissolved. Reads as type that is
*arriving* or *departing* rather than type with a texture on it.
*Engine:* `DitherMask` fill mode + CSS lattice + `.dither-ramp` on the inline axis.
*Cost:* zero.
*RTL:* the ramp runs on the inline axis, so it needs a `[dir="rtl"]` override, otherwise the Arabic
line dissolves at the wrong end of the sentence.
*Risk:* Arabic glyphs are thinner and more connected than Latin. A 6px cell inside a 12px-wide Arabic
stroke shows two dots and reads as damage. Needs a per-script cell size, exactly like `.hero-highlight`
already carries per-script metrics at `globals.css:243-252`.

**P2 - `DitherPlate`** (a panel of dither with a headline in it) — **built, and rescoped**
Shipped in the sheet as `DitherPlate`, not `DitherKnockout`. The knockout was the original concept
and it turned out to be one option rather than the idea, so both the type placement and the colour
arrangement became props.

*Placement.* `over` puts solid type ON the field: no blend mode anywhere, so it is the only
arrangement with no Safari question mark and the only one reliably legible over a sparse or moving
field. `knockout` cuts the type out, which is more confident and depends entirely on the field
staying dense.

*Tone.* The plate colour, the dot colour and the type colour are one decision, so they move together:
`ink` (page black plate, orange dither, white type), `accentBlack` (orange plate, black dither, white
type), `accentWhite` (orange plate, white dither, black type).

*Engine:* lattice free, shader 1 context. *RTL:* none, the stencil is the text.
*Contrast, and it is not uniform:* white on `#060608` is 19.9:1; **white on the accent orange is
3.4:1, which clears the 3:1 bar for display type and fails everywhere else**; black on the accent
orange is 6.2:1 and is safe at any size. `accentWhite` is the accent tone with no restriction on it.
*Note:* knockout on the accent plate cannot use `multiply` — multiply only darkens and those
letterforms have to come back UP to the plate colour. `lighten` does it in one property.

**P2b - `DitherKnockout`** — folded into P2 above and the file deleted.

**P3 - `DitherNumeral`** (stat whose fill *is* the number)
A large figure where the dither fills the glyphs from the baseline up to the value: 42% renders 42%
full. The decoration is the datum. This is the clearest possible demonstration of the section 0 thesis
and the fastest way to tell whether the whole idea holds.
*Engine:* `DitherMask` fill + `.dither-ramp`.
*Cost:* zero.
*RTL:* block-axis ramp, safe. Western numerals in both locales per the i18n plan.
*Risk:* **rule 9.** Only ships against a real number. If Muse has no real metrics, this becomes a
"years / disciplines / languages" counter or it does not ship.

**P4 - `DitherGlyph`** (dither inside anything that is a fill) — **built**
Generalised from "the Muse mark, dissolving" once it was clear the same primitive covers the mark,
the pixel arrow, and the solid icon set. A fill has no stroke to dash, so these go through
`DitherMask` rather than P8's treatment.
*Engine:* `DitherMask` fill, lattice. Zero cost.
*Finding:* the mark is the best thing in the whole sheet. It is already drawn as a stepped, blocky
silhouette, so a square lattice inside it reads as the mark's own construction rather than as a
texture laid over it. It holds up at `lg`, `md` and `sm`.
*Finding:* the size floor is real. A glyph needs to be several cells across before the lattice inside
it reads as texture instead of damage, so this is for marks at 48px and up, not for inline icons.
*Finding:* only genuinely CLOSED shapes can be filled. Filling an outline icon built from open paths
(gear, chart, share, user) produces a blob, not a silhouette. Five of the fourteen survive.

### B. Separators and seams

**P5 - `DitherSeam`** (the boundary between two sections)
Replaces the hard section edge and the `bg-linear-to-t` scrim used in `SubpageHero.tsx:36` and
`Hero.tsx:85`. Two sections meet through a band of dither that is dense at the seam and dissolves
both ways, so the page reads as one surface with a rhythm rather than a stack of boxes. This is
`.cta-bands` promoted from one panel to a reusable divider, and it is probably the single most
*useful* thing in this document.
*Engine:* lattice with `.dither-band`, optional `.copper-bloom` underneath.
*Cost:* zero.
*RTL:* block axis, safe.
*Variants:* `pinch` (dense at both edges, clear centre), `dissolve-down`, `dissolve-up`, `hairline`
(a 1px orange rule that frays into dots at both ends).

**P6 - `DitherRule`** (an inline rule that frays)
The 1px `border-t` / `h-px bg-white` used throughout, replaced by a rule that is solid in the middle
and disperses into dots at both ends. Small, cheap, and it appears dozens of times across the site,
so it does more for perceived craft than any hero.
*Engine:* lattice, symmetric inline mask.
*RTL:* symmetric, so safe. A single-ended variant is not, and needs an override.

**P7 - `DitherRail`** (vertical process / timeline rail) — **built**
Against the five real stages of the AI Transformation engagement, which is the site's only genuinely
ordered published method and therefore the only thing that clears rule 9 here.
A stepped process (Approach, a future "how we work") where the connecting rail between steps is a
dither column whose density rises as each step passes. Progress as texture instead of a filled bar.
*Engine:* lattice + `.dither-ramp`, `--dither-level` written from one shared `IntersectionObserver`
(one observer for the whole rail, not one per step).
*RTL:* the rail sits on the inline start edge, so it must use `inset-inline-start`.
*Risk:* **rule 7.** Scroll may drive the rail's density and nothing else. The step copy is fully
visible at all times, no exceptions.

### C. Cards and surfaces

**P8 - `DitherIcon`** (dithered iconography, done at the right scale)
The important insight in this document: **at 24px the lattice is the wrong tool.** A 6px cell inside a
1.5px stroke is noise. What reads as dither at icon scale is the stroke itself becoming a dot run:
`stroke-dasharray: 0 3.2` with `stroke-linecap: round` turns any path in `components/Icon.tsx` into a
line of dots, with zero new geometry. Hover tightens the dash to solid, so the icon *resolves* under
attention.
*Engine:* SVG stroke, no lattice, no GL.
*Cost:* zero. Works on all 14 existing icons unchanged.
*RTL:* none.
*Risk:* dash phase on tight curves can look uneven; needs `pathLength` normalisation so every icon
has the same visual dot spacing regardless of path length. That detail is the difference between this
looking designed and looking broken.

**P9 - `DitherWick`** (the JS-free hover card, for grids) — **SUPERSEDED**
The ink pools at a fixed corner and grows on hover via a plain CSS transition on `--dither-burst`,
with no rAF loop. Built, and on the sheet next to the shipped treatment.
*Engine:* lattice, `.dither-pointer` masks with `--dither-x/y` pinned. Zero cost, zero JS.
*RTL:* the corner is physical, so `--dither-x` gets a `[dir="rtl"]` flip. Verified.
*Why superseded:* two independent reasons, both discovered after this was written. The cost argument
is gone, because `CardDither` already serves any number of cards on one context and one loop. And
`.card-dither`'s own note records that the CSS lattice was tried for exactly this job and rejected on
material grounds: it read as a printed halftone screen, too regular and motionless. This is that
material doing that job.
*Recommendation:* **cut**, unless a card hover has to survive with JavaScript disabled, which is the
one thing it still does that `CardDither` cannot. Compare them directly on the sheet before deciding.

**P10 - `DitherDuotone`** (photograph as duotone halftone) — **built, and renamed**
Specced here as `DitherPlate`, which is the name P2 took in the first pass. Shipped on the sheet as
`DitherDuotone`.
The site's stock imagery resolved into an orange-on-black halftone that returns to the real photo on
hover or in view. It gives the photography a house treatment instead of leaving it as generic stock,
which is currently the weakest visual layer on the site.
*Engine:* two options, and the choice matters. (a) CSS only: `grayscale(1) contrast(1.6)` plus the
lattice in `screen` blend. Cheap, works everywhere, but it is a screen laid over a photo, not a true
threshold, and it shows on faces. (b) A one-shot canvas 2D Bayer threshold at idle, cached as a
data URL. True 1-bit dither, roughly 8ms per image on a main-thread pass, no GL context.
*Recommendation:* build (a) for the playground, note (b) as the upgrade if the effect is chosen.
*Risk:* CSP allows `img-src data: blob:`, so (b) is permitted, but it must not run on the critical path.

**P11 - `DitherQuote`** (haze behind the words only)
A pull-quote where the dither is masked to the *text's own line boxes* rather than the panel, so the
haze is ragged-right and stops exactly where each line ends. Type-shaped atmosphere. Unusual, cheap,
and unmistakably deliberate.
*Engine:* `DitherMask` in a third mode: stencil is the text with a large `box-decoration-break: clone`
white highlight behind it, blurred, so the mask is the text's silhouette rather than its glyphs.
*RTL:* the rag flips with the text automatically.

**P12 - `DitherPanel`** (framed panel, dither carries the frame) — **built**
The most reusable machinery in the catalogue after `DitherMask`: `emphasis` is a value, so P18 is one
prop of this rather than a component of its own.
The CTA panel's treatment (`CTA.tsx:36`) generalised: a bordered panel where the dither reaches the
edges and *is* what defines the shape, so the border can drop to a hairline or disappear. Reusable
for pricing tiers, engagement models, a featured playbook, an alert.

### D. Heroes

**P13 - `HeroHorizon`** — **built**
The field is dense along the bottom edge and thins upward, so the headline floats above a ground
rather than sitting on a flat wash. Depth from density alone, no gradient scrim, no parallax.
*Correction:* the ground has to be a `.dither-band` at a fixed height, not `.dither-up` across the
whole box. Across the box its height is a share of the content's, so a longer headline grows the
dense zone to meet it and no amount of padding helps. Finding 10.
*Engine:* lattice at a large cell with `.dither-up`, or the existing shader with a `to top` mask.
*Cost:* zero in the lattice version, which is the point: the current hero spends a context on a field
that is mostly uniform.

**P14 - `HeroAperture`** — **built**
*Correction:* the animation cannot wait for hydration. Rendering settled and flipping a state on
mount shows the finished frame and then plays the arrival. It belongs in the server HTML, with
reduced motion handled in the media query. Finding 17.
Page black on load. A circular dither aperture opens once from the centre over roughly 900ms,
revealing the field and the headline, then settles. One motion, on arrival, never again.
*Engine:* animate `--dither-burst` on `.dither-pointer` with the position centred.
*Reduced motion:* renders open, immediately, no animation.
*Note:* `PageLoader.tsx` already does a 100-cell halftone dissolve on every navigation. These two must
not both fire on the home page. Pick one.

**P15 - `HeroSplit`** — **built**
*Verified on /ar:* the two mirrorings are independent. Which half the field is on comes free from
grid writing order; which way it dissolves needs `.dither-ramp-inline-end`'s own `[dir="rtl"]`
counterpart. Getting the first right and the second wrong looks mirrored while putting the densest
part of the field behind the headline.
The composition divides on the inline axis: one half flat black carrying the headline, the other a
dense field, meeting on a dithered edge rather than a straight one.
*RTL:* fully physical. Needs a mirrored counterpart, same as `.page-wash`.

**P16 - `HeroTypeField`** (the strongest single idea here) — **built, and it is**
P2 at hero scale, and the answer to why the hero spends a WebGL context on decoration: the shader
field is visible **only inside the headline**. Everything else is pure black. The most expensive
effect on the site stops being background and becomes the subject.
*Engine:* `DitherMask` fill + `PixelBlast`.
*Cost:* 1 GL context, the one the hero already spends.
*Risk, and it turned out not to be one:* `fill` cannot fail the way `knockout` can. Drop the blend
and its stencil is white type on the ground, which IS the solid-white fallback — no `@supports`
guard needed, and none could have tested it anyway. Finding 11.
*Confirmed:* it does look better in Arabic. A fully connected word is a much better mask than a
Latin one, because the field survives inside continuous strokes and breaks up inside separated
Latin counters. Finding 12.

### E. Sections the site does not have yet

**P17 - `MethodGrid`** — **built.** A "how we work" section built on P7's rail plus P9 cards. The site describes
what Muse does and never how, which is the gap a services buyer actually asks about.

**P18 - `EngagementTiers`** - three P12 panels, and the dither density is what marks the recommended
tier instead of a coloured badge. Emphasis without a second colour (rule 3). — **built, RESCOPED.**
The "recommended tier" is rule 9: Muse publishes three services as peers and the Explore page says
to pick one or combine all three, so a statically denser panel asserts a ranking that does not
exist. Density encodes ATTENTION instead — the panel being pointed at — which is real state, the
identical mechanism, and costs no JS. The static version is one prop away if a real hierarchy ever
appears. Finding 13.

**P19 - `CapabilityMatrix`** - a services-by-discipline grid where each cell's dither density is the
depth of capability. Genuinely information-carrying, and **only if the matrix is real** (rule 9).

**P20 - `ProofWall`** - the deleted `TrustedBy` section rebuilt: marks at low dither density that
resolve to solid on hover. **Blocked on real client logos.** Explicitly do not build this against
placeholders; the 28 fabricated playbooks are exactly the mistake to not repeat.

**P21 - `DitherFAQ`** — **built.** The open accordion panel carries a wash, closed ones do not, so the open state
is a change of *material* rather than a rotated chevron.

### F. Micro-interactions

**P22 - `DitherUnderline`** - inline text links get a dotted underline that densifies to solid on
hover. Two declarations, appears everywhere, costs nothing.

**P23 - `PillButton` dither fill** — **built** (as a playground copy, so nothing shipped changes).
The existing button fills with dither from the arrow chip outward
on hover, on the way to its `rounded-[50px]` transition (`PillButton.tsx:85`). Extends a control that
is already good rather than adding a new one.

**P24 - `DitherFocus`** - a focus-visible ring drawn as dots. *Considered and flagged:* a dotted ring
has lower effective contrast than a solid one and focus indication is a WCAG obligation, not a place
to be clever. Recommend building it as a dotted ring *outside* a solid 2px one, or not at all.
— **built, as the recommendation.** The solid 2px ring is untouched and the dither sits outside it,
so 2.4.11 compliance is unchanged and the house material is still what announces the focus. One
pseudo-element, two masks composited `exclude`. It costs nothing and belongs in Phase 1 with the
other freebies rather than down here.

### G. Layout

**P25 - `InverseBento`** — **built.** One continuous dither field spans an entire grid; the cards are transparent
windows onto it and the gutters are solid black. The texture belongs to the surface underneath the
layout rather than to each card, so the grid reads as holes cut in a page rather than tiles placed on
one.
*Cost:* one field for the whole grid regardless of card count, which is strictly cheaper than
per-card treatments and looks more considered.

---

## 5. The playground

Route: `app/[locale]/playground/dither/page.tsx`. Follows the precedent already set by
`app/[locale]/preview/hero-dither/page.tsx`: unlinked, `robots: { index: false, follow: false }`, and
deliberately **not** using `buildMetadata` so it emits no canonical or hreflang. Reachable on a deploy
preview, invisible to search.

Everything new lands in `components/playground/`, so nothing enters `components/` until it is picked
and the whole experiment deletes in one directory removal.

Page structure:

- **Header strip.** Locale toggle (both `/ar` and `/en` render, RTL is checked by looking, not by
  reasoning), a reduced-motion simulation toggle, and a **live WebGL context counter**. That last one
  is the point of doing this on a real page: rule 1 is invisible until you watch the number climb and
  a canvas somewhere go black.
- **One section per component.** Each gets: the component at real scale on real page black, its `P`
  number, the engine and cost, and one line on what it is for. Real copy from `messages/*.json`, never
  lorem, because Arabic line breaking and Latin line breaking fail differently.
- **A knob panel** writing `--dither-cell`, `--dither-dot`, `--dither-level` and `--dither-burst` live
  onto a scoped container, so cell sizes get chosen by looking at them rather than by argument. Every
  value that gets tuned here becomes a hard-coded default in the shipped component; no knobs survive.
- **A stress row** at the bottom: twelve P9 cards at once, to prove the no-rAF claim, and a deliberate
  four-context row to watch the budget break.

---

## 6. Build order

| Phase | Contents | Why here |
|---|---|---|
| **0** | `DitherMask`, `.dither-ramp`, cell-size presets, playground shell + context counter | Roughly 80% of the catalogue is a wrapper over these two. Nothing else can start. |
| **1** | P8 icons, P6 rule, P5 seam, P22 underline, P9 wick card | All zero-cost, all reusable immediately, all shippable independently of any decision about heroes. Highest value per hour in the document. |
| **2** | P1, P2, P3, P11 | The masked-type family, once P0 proves the multiply sandwich survives Arabic and Safari. |
| **3** | P13, P14, P16 heroes; P10 plate | The expensive and opinionated ones. P16 is the one to prototype first, because if it works the hero question is settled. |
| **4** | P17, P18, P21, P25 | New sections. Only after the vocabulary is fixed, and only P19/P20 if the underlying data is real. |

Phase 1 is worth shipping even if every hero idea is rejected.

All five phases are built. P10 shipped as `DitherDuotone`, not `DitherPlate` — that name went to P2
in the first pass and the collision is only visible if you read the two entries together, which is
the sort of thing a catalogue numbered by concept rather than by file will keep doing.

---

## 7. Considered and rejected

- **A global dither cursor trail sitewide.** `DitherCursor` already exists and is desktop-only and
  viewport-gated for good reasons. Site-wide it is a permanent GL context and a permanent rAF loop for
  an effect nobody looks at twice.
- **Animating the lattice at rest.** Animating `background-position` on four layers repaints the full
  compositing layer every frame. If a field needs to move it should be the shader, which is the
  argument `globals.css:447-479` already makes.
- **A second dither colour** (a cool tone for "technical" sections). Straight into rule 3, and it is
  how the maroon `#4C0014` problem happened the first time.
- **Dither behind body paragraphs.** Tried at page level already; that is what `.page-wash` is tuned
  down to 0.22 opacity to avoid. Any new field behind prose has the same ceiling.
- **A dither page-transition.** Already exists in `PageLoader.tsx`.
- **SVG `mask-image: url(#id)` for masked type.** Support for masking HTML with an SVG mask element is
  inconsistent, and the data-URI variant cannot load the page's webfont, which breaks Arabic outright.
  The multiply sandwich in section 3 exists specifically because of this.

---

## 8. What was built, and what it found

The catalogue is at **`/[locale]/playground/dither`** in both locales, unlinked and `noindex`.
Twenty-nine specimens, each printing its engine and cost, plus a live WebGL context meter and a
knob panel. `components/playground/` (24 files) + the marked block at the end of `app/globals.css`
+ the route: three deletes and it is gone. Nothing under `components/` or any live page has been
touched.

The three passes below are in the order they happened. Phases 0 to 2 first, then the square-dot and
plate-tone rework, then Phases 3 and 4 with the section B/C/F leftovers.

Verified in headless Chromium at 1400 and 390, `/en` and `/ar`: zero console errors, zero horizontal
scroll, both physical-axis masks mirroring correctly, and the shipped `--dither-burst` fallback
intact. Five things the browser said that this document did not.

**1. The em unit was resolving against the wrong font.** `.dither-mask-hug`'s padding sat on the
stencil wrapper, which inherits 16px, so `0.38em` bought 6px of padding for a 72px headline and the
first fix did nothing at all. It belongs on the element carrying the display size.

**2. Arabic descenders composited as pure white.** Glyph ink overflowing the blend sandwich has no
backdrop left to multiply against, so the two nuqta under the final ي of "في" hung below the band as
bright white marks. Measured rather than guessed, via canvas `TextMetrics` on the real string at
72px/1.05:

| | Latin | Arabic |
|---|---|---|
| ink descent | 0.208em | 0.458em |
| ink ascent | 0.722em | 0.861em |
| overflows the box | 0.03em | 0.28em |

Arabic is not "a bit deeper", it is more than twice as deep. Any future component that hugs its own
text inside `DitherMask` needs this, and RTL-first means catching it on `/ar` first.

**3. A rule is one row of dots, and the lattice is two-dimensional.** Layers 2 and 4 are offset half
a cell on the block axis, so a 12px-tall rule on a 6px cell renders three staggered rows and reads as
a woven ribbon. Dropping those two layers leaves a genuine density ramp on a single row: dots a full
cell apart at the ends, twice as dense through the middle.

**4. The shader knockout is worse than the lattice knockout, which is the opposite of the
prediction.** P2 assumed a still lattice would show its regularity at hero scale and the shader would
win. It does not: the shader's dots come and go with the noise, so stretches of the word land where
there happen to be none and the knockout breathes in and out of legibility. Both are on the sheet.
Related: a knockout is only as readable as the field is dense, so `DitherField`'s backdrop tuning
produces an invisible one — the shader branch needed roughly three times the density.

**5. Everything needed toning.** The lattice at full density is around 60% coverage, so an
unmodulated seam renders as a solid orange stripe and an even knockout field as a highlighter slab.
Every shipped call site of `.dither` already did this (`opacity-45` on the old hover cards); the
components now own it, at 0.55 for a seam, and the knockout carries a `crest` so the field has a
shape of its own rather than being a rectangle.

### Second pass (square dots, plate tones, filled glyphs)

**6. `--dither-color` cannot be set on an ancestor.** `.dither` declares `--dither-color:
currentColor` on itself, so a value inherited from a parent never reaches the layers. Every plate
tone silently drew its dots in the TYPE colour instead, which rendered the two accent tones exactly
inverted — white dots under white type, black under black. It has to be set on the `.dither`
descendant.

**7. `stroke-linecap: square` computed correctly and changed nothing visible.** At the brand's 1.5
icon weight a square dot and a round dot are the same 2.25 device pixels. The dot size *is* the
stroke width here, so the square only reads at 1.9. Worth knowing that "the CSS is right" and "the
change is visible" are separate checks.

**8. Fattening a stroke does not turn an outline icon into a silhouette.** The first attempt at the
filled set pushed the stroke to 3.4 so open paths would close into bars; at 44px on a 24-unit viewBox
that swallows every counter and a shield, a globe and a lock all become the same disc. The stroke
went back to near its original weight and only closed shapes are offered.

**9. The knockout is the weaker half of P2, on both engines.** Over the shader it is close to
illegible, and over the lattice it reads by texture rather than colour, which needs a dense field to
survive. White type over the field solves it outright and costs no blend mode. If P2 ships, `over` is
the default and `knockout` is the exception.

Two things worth knowing before picking: the whole playground rests on a CSS block nothing else
references any more (see section 1), and `mix-blend-mode` over a live canvas has historically been
unreliable in Safari — it fails open, to dark type on white, so P2's `knockout` branch needs a check
there before it goes anywhere near a real page. `over` is not exposed to it at all.

### Third pass (heroes, sections, micro-interactions)

Phases 3 and 4 plus the section B/C/F leftovers: P7, P10, P12, P13, P14, P15, P16, P17, P18, P21,
P23, P24, P25. Verified in headless Chromium at 1400 and 390, `/ar` before `/en`: zero console
errors, zero horizontal overflow at either width, every physical-axis mask mirroring, and a clean
production build with both locales prerendered. Nine more things the browser said.

**10. A percentage mask ties the ground to the content, so the content can walk into it.** P13 ran
`.dither-up` across the whole box, which makes the ground a *share* of the box height. A longer
headline therefore grows the dense zone to meet it, and padding the type upward cannot fix that —
more padding is a taller box is a taller ground. Caught on `/ar`, where the headline wraps a line
earlier than in English and the third line landed at roughly 60% coverage. `.dither-band` has been
in the shipped CSS the whole time with a `--dither-band-height` for exactly this. A horizon is a
distance, not a proportion.

**11. `fill` degrades correctly and `knockout` does not, which settles the Safari question for
P16.** Both are the same multiply sandwich, but they fail in opposite directions. Drop the blend and
`fill`'s stencil is white type on the ground — solid white type on black, which *is* the fallback
this document asked for. `knockout`'s is dark type on white, which is a white slab. So P16 arrives
at its own fallback by construction, with no `@supports` guard, which could not have tested the
thing that actually breaks anyway. P16 is the safer of the two masked-type ideas. The catalogue
assumed the reverse.

**12. P16 is the strongest thing here, and it is better in Arabic.** Predicted in the entry and
confirmed by looking: a fully connected Arabic word is a much better mask than a Latin one, because
the field survives inside continuous strokes where it breaks up inside separated Latin counters.
That is a good story for an Arabic-first product and it is also just true.

**13. P18's premise was AI slop, and the component is better without it.** The entry specced density
marking the RECOMMENDED tier. Muse publishes no such ranking — the Explore page says in as many
words to pick one or combine all three — so a statically denser panel asserts a hierarchy that does
not exist. Rule 9 with the label filed off. Density encoding *attention* instead, the panel being
pointed at, is real state, is the identical mechanism, and costs no JS. The static-ranking version
is one prop away (`DitherPanel`'s `emphasis`) if a real hierarchy ever exists.

**14. The unlayered-block trap fired again, in the other direction.** P21's opacity was a Tailwind
`opacity-40` at the call site, while a `.dither-faq-panel .dither` rule sat in globals.css matching
nothing. The utility won because the selector was wrong, not because the cascade worked — and had
the selector been right it would have lost silently. One owner per number, and in this block that
owner has to be the CSS.

**15. "Looks busy" and "fails contrast" are different problems, and neither is visible by eye.**
P21's field read as heavy and measured fine: 0.26 opacity is ~15.6% effective coverage, and the
worst case a glyph can sit on — a dot pixel, `#fd4601` at 0.26 over page black — is 15.4:1 against
white. P25's read as fine and measured as a failure: white at 55% over a 0.55 dot pixel is 3.61:1,
under AA, now 80% for 5.97:1. Both took two minutes to compute and neither guess was right.

**16. The bento's gutters are its cells' borders, so an unfilled grid slot is not empty.** Nothing
paints over the field where there is no cell, so a row the cells do not fill renders a bare patch of
texture the size of a card. It is the one failure mode of the construction and it is invisible until
the cell count stops dividing into the columns.

**17. An arrival animation must not wait for hydration.** Rendering P14 settled and flipping a state
on mount shows the finished frame and *then* plays the arrival, which is worse than no animation at
all. The attribute belongs in the server HTML and `prefers-reduced-motion` belongs in the media
query. The client boundary is only there for a replay button, which is sheet furniture.

**18. Four WebGL contexts on one page.** `CardDither`, P2's two shader plates, and P16. Inside the 8
to 16 budget and half of a conservative one, on a page that exists to hold every specimen at once —
so no real page would ever approach it. Worth stating because the meter makes it visible, and the
number is the whole reason rule 1 exists.

---

## 9. Open questions

1. ~~How many of these do you want built?~~ **Answered: all of them.** Built.
2. ~~Do P3, P19 and P20 have real data?~~ **Answered: no.** `DitherNumeral`, `CapabilityMatrix` and
   `ProofWall` are cut rather than rendered against placeholders. They come back if and when there
   are real numbers, a real matrix, or real client logos. P18 hit the same wall and survived by
   changing what its density means — see finding 13.
3. **Which of the twenty-nine survive?** The only question left, and the whole reason the sheet
   exists. The build's own read, for whatever it is worth against actually looking:
   - *Ship on their own merits, cost nothing, need no decision about anything else:* P5 (seam),
     P6 (rule), P8 (icons), P22 (underline), P24 (focus ring).
   - *Strongest single ideas:* P16 (type field) and P4 (the mark), then P1 and P11.
   - *Most reusable machinery:* P12 (panel), which P18 is one prop of, and P7 (rail), which P17 is
     one composition of.
   - *Probably cut:* P9, superseded. P14 conflicts with `PageLoader`. P15 is the most RTL-exposed
     thing here for the least return.
4. **Is the hero question still open?** Narrower now. `preview/hero-dither` and the `HeroVariant`
   branch in `Hero.tsx` are still undecided, and there are now four hero answers on the sheet. P16
   is the one that makes an argument the others do not: it justifies the context the hero already
   spends instead of asking whether to spend it. If P16 wins, both branches and the preview route
   come out together.
5. **`PageLoader` vs `HeroAperture`.** Unchanged, and now testable side by side. Two dissolve
   moments back to back on the home page is one too many. If P14 is wanted, `PageLoader` goes.
6. **Does the lattice stay at all?** Still the load-bearing question, and the third pass sharpened
   it rather than answering it. `CardDither`'s note argues the lattice is the wrong material for a
   *moving* surface, and everything built since is either still (P5, P12, P13, P25), small enough
   that regularity never registers (P6, P8, P22, P24), or masked into a shape (P1, P4, P11, P16) —
   which is exactly the set the plan predicted would survive that argument. The one place the
   lattice moves is P23's burst, and it is under a pointer, which is the case where nobody notices.
   So the honest answer may be that the lattice stays for everything except a card hover, and
   `CardDither` keeps that job.
7. **Nothing here is in version control.** The playground, its CSS block and every component are
   untracked, and `.gitignore` excludes `/docs`, so this document exists only on one machine. Worth
   a deliberate decision either way before the next pass.
