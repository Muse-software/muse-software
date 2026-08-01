---
type: reference
created: 2026-07-30
updated: 2026-07-30
tags: [company, brand, reference]
---

# Brand Colour & Type

Colour is lifted from [[Brand Guideline PDF]] pages 17, 18 and 22 and should stay exact to it. Type no longer matches the deck: the English face was changed on 2026-07-30, see [[Decision Log]]. This note is the copy and paste source, and it wins over the deck where the two disagree.

## Primary

| Name | Hex | CMYK | Role |
|---|---|---|---|
| Muse Orange | `#FE4701` | 0 / 86 / 100 / 0 | The brand. Actions, accents, energy |
| Muse Maroon | `#4C0014` | 30 / 100 / 94 / 41 | The surface. Carries most of every layout |
| White | `#FFFFFF` | 0 / 0 / 0 / 0 | Type and negative space |

## Secondary

Accents only. Each one is capped at 5 percent of a composition.

| Name | Hex | CMYK |
|---|---|---|
| Yellow | `#FFBE0B` | 0 / 27 / 100 / 0 |
| Purple | `#6300FF` | 76 / 78 / 0 / 0 |
| Green | `#00DD88` | 66 / 0 / 68 / 0 |

## Gradients

| Name | Stops | Share |
|---|---|---|
| Warm | `#FE4701` to `#FFBE0B` | 3 percent |
| Cool | `#6300FF` to `#00DD88` | 2 percent |

## Mix ratio

The deck is explicit about this, and it is the single most useful page in it. Ignore the ratio and the brand stops looking like itself.

| Colour | Share |
|---|---|
| Maroon | 50 percent |
| Orange | 20 percent |
| White | 10 percent |
| Yellow | 5 percent |
| Purple | 5 percent |
| Green | 5 percent |
| Warm gradient | 3 percent |
| Cool gradient | 2 percent |

Read it as: maroon dominates, orange is the loudest thing in the room but not the largest, and the secondaries are seasoning.

## Type

Decided 2026-07-30. Space Grotesk for English, IBM Plex Sans Arabic for Arabic. This supersedes IBM Plex Sans as the English face, see [[Decision Log]].

| Script | Family | Notes |
|---|---|---|
| English | Space Grotesk | Headings and body. Headings light or regular at large sizes, with bold reserved for numerals and emphasis |
| Arabic | IBM Plex Sans Arabic | Not a fallback. Set Arabic in this, always |

Both are open source and free for commercial use. Neither has glyphs for the other script, which is useful rather than a problem: put Space Grotesk first in the stack and IBM Plex Sans Arabic second, and each script resolves to the right file on its own with no per run markup.

Space Grotesk is wider than IBM Plex Sans at the same point size, so anything ported from an older layout needs its type scale re checked rather than copied across.

The wordmark is a separate custom lettering, wide and rounded. It is not Space Grotesk, so never retype the logo, always place the file.

## Tokens

Paste ready for CSS. Naming matches [[Quality Bar]] expectations for design tokens.

```css
:root {
  --muse-orange:  #fe4701;
  --muse-maroon:  #4c0014;
  --muse-white:   #ffffff;
  --muse-yellow:  #ffbe0b;
  --muse-purple:  #6300ff;
  --muse-green:   #00dd88;
  --muse-grad-warm: linear-gradient(90deg, #fe4701, #ffbe0b);
  --muse-grad-cool: linear-gradient(90deg, #6300ff, #00dd88);
  --muse-font-latin: "Space Grotesk", system-ui, sans-serif;
  --muse-font-arabic: "IBM Plex Sans Arabic", "Space Grotesk", sans-serif;
}
```

## Accessibility, measured

Run on 2026-07-30 against WCAG 2.1 contrast, for [[Company Explainer]], the first real document to put this palette into body text. These are computed ratios, not estimates.

| Pair | Ratio | Verdict |
|---|---|---|
| White on `#4C0014` | 15.94:1 | Passes everything. The safe combination |
| `#4C0014` on white | 15.94:1 | Passes everything. Use maroon for body text, not black |
| `#FE4701` on `#4C0014` | 4.64:1 | Passes AA for body text, and clears 3:1 for non text UI comfortably |
| White on `#FE4701` | 3.43:1 | **Fails AA for body text.** Large text only, 18pt or 14pt bold and above |
| `#FE4701` on white | 3.43:1 | **Fails AA for body text.** Large text and rules only |
| `#FFBE0B` on white | 1.66:1 | **Fails everything.** Fill only, never text, and not even as a non text indicator |
| `#00DD88` on white | 1.80:1 | **Fails everything.** Same |
| `#FFBE0B` on `#4C0014` | 9.58:1 | Passes. Yellow only works as text on the maroon |
| `#00DD88` on `#4C0014` | 8.88:1 | Passes. Same |
| `#6300FF` on white | 7.06:1 | Passes |

What this changes in practice:

- **Body text is maroon on white or white on maroon.** Never white on orange
- **Orange is for numerals, rules, accents and large type.** It is the loudest thing in the room and it is not a body text colour on either background
- **Yellow and green cannot carry status on a light surface.** They are invisible as small marks on white, so a status indicator needs a text label rather than a colour swatch, or it sits on the maroon
- Still to check when this hits a product UI: contrast in dark mode, and focus ring visibility against both surfaces
