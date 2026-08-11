import { IBM_Plex_Sans_Arabic, Inter, Inter_Tight, Space_Grotesk } from "next/font/google";

/**
 * Fonts live here rather than inline in the layout so more than one place can
 * apply them without instantiating a second copy — importing this module
 * reuses the same `next/font` instances.
 *
 * The second consumer is `app/[locale]/not-found.tsx`. When `notFound()`
 * fires, Next serves its own document shell (`<html id="__next_error__">`) and
 * the locale layout's `<html>`/`<body>` attributes are dropped, taking the
 * font CSS variables with them — `--font-sans` and friends are declared by
 * these classNames, not in globals.css. Without re-applying them on a wrapper,
 * the 404 silently falls back to a system font.
 */
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The Arabic face, per [[Brand Colour & Type]]: Space Grotesk for English,
 * IBM Plex Sans Arabic for Arabic.
 *
 * It is appended to every family stack rather than swapped in on `/ar`, and
 * that is deliberate. Space Grotesk, Inter and Inter Tight carry no Arabic
 * glyphs at all, so a stacked `font-family` resolves each script by itself:
 * Latin runs hit the Latin face first and never fall through, Arabic runs miss
 * every Latin face and land here. That covers the mixed-direction case the
 * Localization Playbook flags — an Arabic sentence containing "Muse" or a
 * service name renders both scripts in their own type with no per-run markup,
 * and it works in the other direction too (an Arabic word inside the English
 * site is not left to a system fallback).
 *
 * `subsets: ["arabic"]` controls which subset gets *preloaded*, not which
 * @font-face rules exist. Google's stylesheet for this family still declares
 * Latin and Cyrillic faces, so Plex Arabic does answer for Latin wherever it
 * sits ahead of a Latin face in a stack. That is fine, and intended, for body
 * copy on an Arabic page: Plex Arabic's Latin is IBM Plex Sans, drawn to pair
 * with the Arabic. It is not fine for brand type, so `app/globals.css` puts
 * Space Grotesk ahead of it under `.font-space-grotesk`. See the note there.
 */
export const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const fontVariables = `${inter.variable} ${interTight.variable} ${spaceGrotesk.variable} ${plexArabic.variable}`;
