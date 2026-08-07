#!/usr/bin/env python3
"""Regenerate the tightly cropped logo SVGs used on the cover and in the footer.

The brand exports in 99 Meta/Attachments/Brand are all 1080x1080 artboards with
the mark centred and a lot of empty space around it, so placing one directly
gives a mark that is much smaller than the box it occupies. This measures the
real content bounding box in Chromium and rewrites the viewBox to match, which
crops without touching a single path. The mark itself is never redrawn.

Run:  python3 src/crop-logos.py
"""
import asyncio
import pathlib
import re

from playwright.async_api import async_playwright

SRC = pathlib.Path(__file__).resolve().parent
FILES = [
    "assets/muse-vertical-orange.svg",    # cover
    "assets/muse-horizontal-orange.svg",
    "assets/muse-07-maroon.svg",
    "assets/muse-08-maroon.svg",          # page footer
]
PAD = 2  # viewBox units of breathing room

BBOX_JS = """() => {
    const s = document.querySelector('svg');
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    s.querySelectorAll('path,rect,polygon,circle,g').forEach(el => {
        if (!el.getBBox) return;
        let r; try { r = el.getBBox(); } catch (e) { return; }
        if (r.width === 0 || r.height === 0) return;
        x0 = Math.min(x0, r.x); y0 = Math.min(y0, r.y);
        x1 = Math.max(x1, r.x + r.width); y1 = Math.max(y1, r.y + r.height);
    });
    return {x0, y0, x1, y1};
}"""


async def main() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        page = await browser.new_page()
        for rel in FILES:
            path = SRC / rel
            await page.goto(path.as_uri(), wait_until="load")
            b = await page.evaluate(BBOX_JS)
            vb = (
                f"{b['x0'] - PAD:.2f} {b['y0'] - PAD:.2f} "
                f"{b['x1'] - b['x0'] + 2 * PAD:.2f} {b['y1'] - b['y0'] + 2 * PAD:.2f}"
            )
            text = re.sub(r'viewBox="[^"]+"', f'viewBox="{vb}"', path.read_text(), count=1)
            out = path.with_name(path.stem + "-crop.svg")
            out.write_text(text)
            print(f"{out.name}  viewBox={vb}")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
