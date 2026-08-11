/**
 * Renders the Arabic Open Graph card to `public/og/opengraph-image-ar.png`.
 *
 * Why a build script and a static PNG, when English uses the `next/og`
 * (Satori) route at `app/opengraph-image.tsx`:
 *
 * Satori shapes Arabic glyphs correctly — letters join — but it does not run
 * the bidi algorithm. Words come out in logical order laid left to right, so
 * an Arabic sentence renders mirrored. Measured on Next 16.1.6: `direction:
 * rtl`, a `dir="rtl"` attribute, and the Unicode control characters RLE/PDF
 * and RLM all change nothing, and the control characters additionally render
 * as visible tofu boxes. The only thing that works inside Satori is reversing
 * the word order by hand before handing it over, which is hand-rolled bidi and
 * fails the moment a string mixes scripts in a way the naive rule does not
 * cover.
 *
 * Headless Chromium does correct, standard UAX#9 bidi and complex-script
 * shaping. The card is fixed per locale — it carries no per-page content — so
 * generating it once is not a loss of anything, and it removes a runtime code
 * path that could break silently on a copy change nobody previews.
 *
 * The layout below deliberately mirrors `app/opengraph-image.tsx`. Change one,
 * change the other, and re-run this script.
 *
 * Run: node scripts/build-og-image-ar.mjs
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const FONT_DIR = path.join(ROOT, "assets", "fonts");
const OUT_DIR = path.join(ROOT, "public", "og");
const OUT = path.join(OUT_DIR, "opengraph-image-ar.png");

const SIZE = { width: 1200, height: 630 };

// Same path and viewBox as app/opengraph-image.tsx.
const ICON_PATH =
  "M132.15,469.56h52.3c2.89,0,5.23,2.34,5.23,5.23v17.5c0,2.89,2.34,5.23,5.23,5.23h74.6c2.89,0,5.23,2.34,5.23,5.23v16.97c0,2.89,2.34,5.23,5.23,5.23h74.5c2.89,0,5.23,2.34,5.23,5.23v17.5c0,2.89-2.34,5.23-5.23,5.23h-47.07c-2.89,0-5.23,2.34-5.23,5.23v47.07c0,2.89-2.34,5.23-5.23,5.23h-17.5c-2.89,0-5.23-2.34-5.23-5.23v-74.5c0-2.89-2.34-5.23-5.23-5.23h-46.54c-2.89,0-5.23,2.34-5.23,5.23v47.07c0,2.89-2.34,5.23-5.23,5.23h-17.5c-2.89,0-5.23-2.34-5.23-5.23v-75.02c0-2.89-2.34-5.23-5.23-5.23h-46.65c-2.89,0-5.23,2.34-5.23,5.23v47.07c0,2.89-2.34,5.23-5.23,5.23h-17.5c-2.89,0-5.23-2.34-5.23-5.23v-75.02c0-2.89,2.34-5.23,5.23-5.23h22.73Z";

const b64 = async (file) => (await readFile(path.join(FONT_DIR, file))).toString("base64");

const [plexSemiBold, plexRegular, spaceGrotesk] = await Promise.all([
  b64("IBMPlexSansArabic-SemiBold.ttf"),
  b64("IBMPlexSansArabic-Regular.ttf"),
  b64("SpaceGrotesk[wght].ttf"),
]);

// Read the tagline from the catalogue rather than restating it here, so the
// card cannot drift from the copy the Arabic reviewer signs off on.
const messages = JSON.parse(await readFile(path.join(ROOT, "messages", "ar.json"), "utf8"));
const TAGLINE = messages.Metadata.organizationDescription;

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: "Plex Arabic";
    font-weight: 400;
    src: url(data:font/ttf;base64,${plexRegular}) format("truetype");
  }
  @font-face {
    font-family: "Plex Arabic";
    font-weight: 600;
    src: url(data:font/ttf;base64,${plexSemiBold}) format("truetype");
  }
  @font-face {
    font-family: "Space Grotesk";
    font-weight: 400 700;
    src: url(data:font/ttf;base64,${spaceGrotesk}) format("truetype");
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${SIZE.width}px;
    height: ${SIZE.height}px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 80px;
    background-color: #060608;
    background-image: linear-gradient(225deg, rgba(253,70,1,0.18) 0%, rgba(6,6,8,0) 55%);
    font-family: "Plex Arabic", sans-serif;
  }
  .wordmark {
    margin-top: 44px;
    font-size: 64px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
    /* Latin brand type: Space Grotesk named literally so the Arabic face
       never answers for it. "Muse" is not transliterated (plan section 9). */
    font-family: "Space Grotesk", sans-serif;
  }
  .tagline {
    margin-top: 20px;
    font-size: 30px;
    line-height: 1.45;
    color: rgba(255,255,255,0.65);
    max-width: 900px;
  }
</style>
</head>
<body>
  <svg width="120" height="70" viewBox="96 461 272 157" fill="#fd4601"><path d="${ICON_PATH}"/></svg>
  <div class="wordmark" dir="ltr">Muse Studios</div>
  <div class="tagline">${TAGLINE}</div>
</body>
</html>`;

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: SIZE, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

const shot = await page.screenshot({ type: "png" });
await writeFile(OUT, shot);
await browser.close();

console.log(`wrote ${OUT} (${shot.length} bytes)`);
console.log(`tagline: ${TAGLINE}`);
