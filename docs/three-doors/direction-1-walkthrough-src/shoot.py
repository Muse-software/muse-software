#!/usr/bin/env python3
"""Capture Direction 1 (The Studio) homepage screenshots for its walkthrough.

Desktop (1440x900) top + bottom viewport shots, a full-page mobile (390px)
shot, and a mid-page shot of the three-doors section, for home in both
locales. Output goes to assets/screens/ (gitignored; regenerate anytime).
"""
import asyncio
import pathlib

from playwright.async_api import async_playwright

BASE = "http://localhost:3100"
OUT = pathlib.Path(__file__).resolve().parent / "assets" / "screens"

DESKTOP = {"width": 1440, "height": 900}
MOBILE = {"width": 390, "height": 844}

# (locale, route, scroll-to-text or None)
SHOTS = [
    ("en", "", None, "desktop-top"),
    ("en", "", None, "desktop-bottom"),
    ("en", "", None, "mobile-top"),
    ("en", "", "Pick the door that matches you", "doors"),
    ("ar", "", None, "desktop-top"),
    ("ar", "", None, "desktop-bottom"),
    ("ar", "", None, "mobile-top"),
    ("ar", "", "اختر الباب اللي يناسبك", "doors"),
]


async def shot(page, path: pathlib.Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    await page.screenshot(path=str(path))
    print(f"  {path.name} ({path.stat().st_size // 1024} KB)")


async def main() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        for locale, route, scroll_text, kind in SHOTS:
            url = f"{BASE}/{locale}/{route}"
            print(f"== {url} [{kind}]")
            if kind == "mobile-top":
                page = await browser.new_page(
                    viewport=MOBILE,
                    locale="en" if locale == "en" else "ar-SA",
                    device_scale_factor=2,
                )
            else:
                page = await browser.new_page(
                    viewport=DESKTOP,
                    locale="en" if locale == "en" else "ar-SA",
                    device_scale_factor=1,
                )
            await page.goto(url, wait_until="networkidle")
            await page.evaluate("document.fonts.ready")
            await page.wait_for_timeout(1200)
            if kind == "desktop-bottom":
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await page.wait_for_timeout(900)
            elif kind == "doors" and scroll_text:
                await page.evaluate(
                    """(text) => {
                        const els = [...document.querySelectorAll('h1,h2,h3,p,span,div')];
                        const el = els.find(e => e.textContent.trim().startsWith(text));
                        if (el) el.scrollIntoView({ block: 'start' });
                    }""",
                    scroll_text,
                )
                await page.wait_for_timeout(900)
            name = route.replace("/", "_") or "home"
            await shot(page, OUT / locale / f"{name}-{kind}.png")
            await page.close()
        await browser.close()
    print("DONE")


if __name__ == "__main__":
    asyncio.run(main())
