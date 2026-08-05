#!/usr/bin/env python3
"""Capture the 6 live reference-evidence figures for Direction 3.

Navigates to each real source site (not localhost), dismisses ordinary
consent/banner overlays, re-resolves the registry anchor in the live DOM
today, and captures one bounded screenshot of the section it sits in. Fails
closed (raises) if an anchor no longer resolves rather than shipping a stale
or reconstructed image.
"""
import asyncio
import json
import pathlib
from datetime import datetime, timezone

from playwright.async_api import Page, async_playwright
from PIL import Image

SRC = pathlib.Path(__file__).resolve().parent
REGISTRY = json.loads((SRC / "refs-registry.json").read_text())["refs"]
OUT_DIR = SRC / "assets" / "refs"
MANIFEST_PATH = SRC / "refs-manifest.json"

VIEWPORT = {"width": 1440, "height": 900}
DSF = 2
MIN_H, MAX_H = 200, 1300

DISMISS_TEXTS = [
    "Accept All", "Accept all", "Accept all cookies", "Accept Cookies", "Accept",
    "Reject all", "Reject All", "Only necessary", "Necessary only",
    "I agree", "I Agree", "Got it", "Okay", "Allow all",
    "موافق", "قبول الكل", "قبول جميع الكوكيز", "قبول", "رفض الكل",
]


async def dismiss_banners(page: Page) -> None:
    for text in DISMISS_TEXTS:
        try:
            btn = page.get_by_role("button", name=text, exact=False)
            if await btn.count() > 0 and await btn.first.is_visible():
                await btn.first.click(timeout=1500)
                await page.wait_for_timeout(300)
        except Exception:
            pass
    for selector in (
        'button[aria-label*="Close" i]',
        'button[aria-label="Dismiss" i]',
        '[role="button"][aria-label*="Close" i]',
        'button[title*="Close" i]',
    ):
        try:
            btn = page.locator(selector)
            if await btn.count() > 0 and await btn.first.is_visible():
                await btn.first.click(timeout=1500)
                await page.wait_for_timeout(300)
        except Exception:
            pass


async def find_container(node) -> dict:
    """Climb from the anchor node to the nearest ancestor with a legible,
    section-sized bounding box. Falls back to a fixed clip anchored at the
    node's own position if nothing suitable is found -- still a crop of the
    real rendered page, never a fabricated composite."""
    box = await node.bounding_box()
    candidate = node
    best = box
    for _ in range(8):
        parent = candidate.locator("xpath=..")
        if await parent.count() == 0:
            break
        pbox = await parent.bounding_box()
        if pbox is None:
            break
        if MIN_H <= pbox["height"] <= MAX_H and pbox["width"] >= 700:
            best = pbox
        if pbox["height"] > MAX_H:
            break
        candidate = parent
    if best is None:
        return None
    return best


async def capture_ref(browser, entry: dict) -> dict:
    page = await browser.new_page(viewport=VIEWPORT, device_scale_factor=DSF)
    await page.goto(entry["url"], wait_until="load", timeout=45000)
    await page.wait_for_timeout(1500)
    await dismiss_banners(page)
    await page.wait_for_timeout(500)

    locator = page.get_by_role("heading", name=entry["anchor"], exact=True)
    if await locator.count() < 1:
        locator = page.get_by_text(entry["anchor"], exact=False)
    if await locator.count() < 1:
        scroll_height = await page.evaluate("document.documentElement.scrollHeight")
        for y in range(0, min(int(scroll_height), 16000), 700):
            await page.evaluate("y => window.scrollTo({ top: y, behavior: 'instant' })", y)
            await page.wait_for_timeout(300)
            if await locator.count() > 0:
                break
    node = locator.first
    try:
        await node.wait_for(state="visible", timeout=12000)
    except Exception as exc:
        raise RuntimeError(
            f"REFS FAIL-CLOSED: anchor {entry['anchor']!r} did not become visible on "
            f"{entry['url']} within 12 seconds. Not shipping stale evidence."
        ) from exc
    count = await locator.count()
    if count < 1:
        raise RuntimeError(
            f"REFS FAIL-CLOSED: anchor {entry['anchor']!r} no longer resolves live on "
            f"{entry['url']}. Not shipping a stale/reconstructed image -- update the registry."
        )
    await node.evaluate("el => el.scrollIntoView({ block: 'center' })")
    await page.wait_for_timeout(500)
    await node.evaluate("el => window.scrollBy({ top: el.getBoundingClientRect().top - 140, behavior: 'instant' })")
    await page.wait_for_timeout(1200)

    fname = f"{entry['slug']}.png"
    out_path = OUT_DIR / fname
    capture_mode = entry.get("capture_mode", "viewport")
    if capture_mode == "ancestor-element":
        root = node
        for _ in range(int(entry.get("ancestor_levels", 1))):
            root = root.locator("xpath=..")
        await root.evaluate("el => el.scrollIntoView({ block: 'center' })")
        await page.wait_for_timeout(1200)
        await root.screenshot(path=str(out_path))
    else:
        # A live viewport centered on the resolved anchor preserves the visible
        # surrounding cards and page context without fabricating a composite.
        await page.screenshot(path=str(out_path), full_page=False)
    with Image.open(out_path) as saved:
        saved_width, saved_height = saved.size
    await page.close()

    return {
        "slug": entry["slug"],
        "file": fname,
        "company": entry["company"],
        "url": entry["url"],
        "anchor": entry["anchor"],
        "pattern": entry["pattern"],
        "muse_section": entry["muse_section"],
        "influence_type": entry["influence_type"],
        "class": entry["class"],
        "capture_mode": capture_mode,
        "captured_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "out_px": {"width": saved_width, "height": saved_height},
    }


async def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    entries = []
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        for entry in REGISTRY:
            print(f"== {entry['company']} -> {entry['url']}")
            result = await capture_ref(browser, entry)
            print(f"   {result['file']}  {result['out_px']}")
            entries.append(result)
        await browser.close()
    MANIFEST_PATH.write_text(json.dumps({"refs": entries}, indent=2, ensure_ascii=False) + "\n")
    print(f"\nwrote {MANIFEST_PATH} ({len(entries)} refs)")


if __name__ == "__main__":
    asyncio.run(main())
