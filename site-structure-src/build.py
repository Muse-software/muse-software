#!/usr/bin/env python3
"""Build Muse-Document.pdf from document.html with headless Chromium."""
import asyncio
import pathlib

from playwright.async_api import async_playwright

SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent
HTML = "document.html"
PDF = "Muse-Site-Structure.pdf"
MARGIN = {"top": "0", "bottom": "0", "left": "0", "right": "0"}


async def main() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        page = await browser.new_page()
        await page.goto((SRC / HTML).as_uri(), wait_until="load")
        await page.emulate_media(media="print")
        await page.evaluate("document.fonts.ready")
        await page.pdf(
            path=str(OUT / PDF),
            format="A4",
            print_background=True,
            margin=MARGIN,
            prefer_css_page_size=True,
        )
        await browser.close()
    out = OUT / PDF
    print(f"wrote {out}  ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
