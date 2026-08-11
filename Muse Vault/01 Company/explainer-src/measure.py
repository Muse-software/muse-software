#!/usr/bin/env python3
"""Measure how full each page is, and catch silent clipping.

Each .page is a fixed 297mm block with overflow hidden, so a page that spills
does NOT create an extra PDF page: it is clipped invisibly. This measures the
bottom edge of the last real content element against the page box and against
the footer rule, and flags anything that overflows or is under about half full.

Run:  python3 src/measure.py
"""
import asyncio
import pathlib

from playwright.async_api import async_playwright

SRC = pathlib.Path(__file__).resolve().parent
PX_PER_MM = 96 / 25.4

JS = """() => {
  const out = [];
  document.querySelectorAll('.page').forEach((pg, i) => {
    const pr = pg.getBoundingClientRect();
    const body = pg.querySelector('.body') || pg.querySelector('.mid');
    // Bottom edge of the last real child, via offsetTop/offsetHeight. Using the
    // container's scrollHeight instead would count its own padding-bottom as
    // content and report a false collision on the cover.
    // offsetTop is measured from .page (the nearest positioned ancestor), so it
    // already includes the masthead band. Do not add the container's own top.
    let contentBottom = 0;
    if (body) {
      [...body.children].forEach(el => {
        contentBottom = Math.max(contentBottom, el.offsetTop + el.offsetHeight);
      });
    }
    const foot = pg.querySelector('.foot') || pg.querySelector('.meta');
    const footTop = foot ? foot.getBoundingClientRect().top - pr.top : pr.height;
    out.push({
      i: i,
      pageH: pr.height,
      contentBottom: contentBottom,
      footTop: footTop,
      title: (pg.querySelector('h2') || pg.querySelector('h1') || {}).textContent || 'cover',
    });
  });
  return out;
}"""


async def main() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        page = await browser.new_page(viewport={"width": 900, "height": 1200})
        await page.goto((SRC / "explainer.html").as_uri(), wait_until="load")
        # Deliberately NOT emulate_media("print"): print emulation fragments the
        # layout into page boxes and clamps every rect to 297mm, which hides
        # exactly the overflow this script exists to find.
        await page.evaluate("document.fonts.ready")
        await page.add_style_tag(content=".page{overflow:visible !important}")
        rows = await page.evaluate(JS)
        await browser.close()

    print(f"{'pg':>3}  {'fill':>6}  {'content':>9}  {'footer':>8}  {'clear':>7}  title")
    bad = 0
    for r in rows:
        fill = r["contentBottom"] / r["pageH"] * 100
        clear_mm = (r["footTop"] - r["contentBottom"]) / PX_PER_MM
        flag = ""
        if clear_mm < 0:
            flag = "  <-- OVERFLOWS, CLIPPED"
            bad += 1
        elif fill < 50 and r["i"] != 0:
            flag = "  <-- under half full"
            bad += 1
        elif clear_mm < 4:
            flag = "  <-- tight against footer"
        print(
            f"{r['i'] + 1:>3}  {fill:5.1f}%  "
            f"{r['contentBottom'] / PX_PER_MM:7.1f}mm  "
            f"{r['footTop'] / PX_PER_MM:6.1f}mm  "
            f"{clear_mm:6.1f}mm  {r['title'].strip()[:44]}{flag}"
        )
    print("\nFAIL" if bad else "\nall pages within bounds")


if __name__ == "__main__":
    asyncio.run(main())
