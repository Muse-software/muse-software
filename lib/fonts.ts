import { IBM_Plex_Sans_Arabic, Space_Grotesk } from "next/font/google";

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
export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The single face for Arabic routes, including Latin words and Western digits.
 * The locale override in globals.css applies it to every component. English
 * routes retain their existing art-direction fonts; Arabic in mixed English
 * copy can still fall back to this face.
 */
export const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const fontVariables = `${spaceGrotesk.variable} ${plexArabic.variable}`;
