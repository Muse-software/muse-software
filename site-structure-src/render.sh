#!/bin/bash
# Render the Muse site structure PDF via headless Chromium.
set -e
cd /Users/a/Downloads/personal/muse-software/site-structure-src
export PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright"
/Users/a/Downloads/personal/pdfenv/bin/python - <<'PYEOF'
import asyncio
import pathlib

from playwright.async_api import async_playwright

SRC = pathlib.Path.cwd()
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


asyncio.run(main())
PYEOF
echo "DONE"
