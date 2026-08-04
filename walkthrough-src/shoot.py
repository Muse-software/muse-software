#!/usr/bin/env python3
"""Capture Muse site screenshots for the walkthrough PDF.

Desktop (1440x900) top + bottom viewport shots and a full-page mobile
(390px) shot, for every route in both locales. Output goes to
assets/screens/<locale>/<route>.png (gitignored; regenerate anytime).
"""
import asyncio
import pathlib
import sys

from playwright.async_api import async_playwright

BASE = "http://localhost:3100"
OUT = pathlib.Path(__file__).resolve().parent / "assets" / "screens"

ROUTES = [
    "",
    "explore",
    "services/ai-transformation",
    "services/product-engineering",
    "services/gamification-experience",
    "about",
    "careers",
    "contact",
    "get-started",
    "newsletter",
]
LOCALES = ["en", "ar"]
DESKTOP = {"width": 1440, "height": 900}
MOBILE = {"width": 390, "height": 844}


async def shot(page, path: pathlib.Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    await page.screenshot(path=str(path))
    print(f"  {path.name} ({path.stat().st_size // 1024} KB)")


async def main() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        for locale in LOCALES:
            for route in ROUTES:
                url = f"{BASE}/{locale}/{route}"
                print(f"== {url}")
                # desktop
                page = await browser.new_page(viewport=DESKTOP, locale="en" if locale == "en" else "ar-SA", device_scale_factor=1)
                await page.goto(url, wait_until="networkidle")
                await page.evaluate("document.fonts.ready")
                await page.wait_for_timeout(1200)
                await shot(page, OUT / locale / (route.replace("/", "_") + "-desktop-top.png"))
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await page.wait_for_timeout(900)
                await shot(page, OUT / locale / (route.replace("/", "_") + "-desktop-bottom.png"))
                await page.close()
                # mobile
                # mobile (viewport top; full-page is ~13k px tall, unusable in print)
                page = await browser.new_page(viewport=MOBILE, locale="en" if locale == "en" else "ar-SA", device_scale_factor=2)
                await page.goto(url, wait_until="networkidle")
                await page.evaluate("document.fonts.ready")
                await page.wait_for_timeout(1200)
                await shot(page, OUT / locale / (route.replace("/", "_") + "-mobile-top.png"))
                await page.close()
        await browser.close()
    print("DONE")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:  # noqa: BLE001
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
