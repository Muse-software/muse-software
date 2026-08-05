#!/usr/bin/env python3
"""Section-exact homepage capture driver for Direction 3 (The Proof).

Reads sections.json, drives Playwright through the settle sequence described
in the walkthrough rebuild plan, and writes assets/screens/{locale}/*.png plus
capture-manifest.json. Replaces the old shoot.py, which only ever took four
generic viewport shots per locale.

Run:  python3 capture.py [--only SLUG[,SLUG...]]
"""
import argparse
import asyncio
import json
import pathlib
import subprocess
import sys
from datetime import datetime, timezone

from playwright.async_api import Locator, Page, async_playwright
from PIL import Image

SRC = pathlib.Path(__file__).resolve().parent
CFG = json.loads((SRC / "sections.json").read_text())
OUT = SRC / "assets" / "screens"
MANIFEST_PATH = SRC / "capture-manifest.json"

BASE = CFG["base_url"]
VIEWPORTS = CFG["viewports"]
BUDGETS = CFG["budgets"]
SETTLE_MS = CFG["settle_ms"]
SECTIONS = CFG["sections"]
OVERLAP_PX = 32

TICKER_PAUSE_CSS = ".ticker-track { animation-play-state: paused !important; }"


def branch_name() -> str:
    return subprocess.run(
        ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        cwd=SRC, capture_output=True, text=True, check=True,
    ).stdout.strip()


async def resolve_root(page: Page, section: dict, locale: str) -> Locator:
    """Resolve the section's root element, asserting exactly one match.

    CSS roots (hero, ticker, footer) are matched directly. Every other
    section is found by its exact heading/paragraph text, then the nearest
    ancestor <section> is used as the capture boundary -- the same fix the
    capture spike validated, replacing shoot.py's broad text scan.
    """
    root_cfg = section["root"]
    anchor = section[f"anchor_{locale}"]
    if root_cfg["type"] == "css":
        base = page.locator(root_cfg["selector"])
        count = await base.count()
        if count != 1:
            raise RuntimeError(
                f"[{section['slug']}/{locale}] selector {root_cfg['selector']!r} "
                f"matched {count} elements, expected exactly 1"
            )
        return base.first
    node = page.get_by_text(anchor, exact=False)
    count = await node.count()
    if count != 1:
        raise RuntimeError(
            f"[{section['slug']}/{locale}] anchor text {anchor!r} "
            f"matched {count} elements, expected exactly 1"
        )
    return node.first.locator("xpath=ancestor::section[1]")


async def hide_nav(page: Page) -> bool:
    hidden = await page.evaluate(
        """() => {
            let header = document.querySelector('body > header');
            if (!header) {
                header = [...document.querySelectorAll('header')].find(h => {
                    const cs = getComputedStyle(h);
                    return cs.position === 'fixed' || cs.position === 'sticky';
                }) || null;
            }
            if (!header) return false;
            header.dataset.walkthroughPrevVisibility = header.style.visibility || '';
            header.style.visibility = 'hidden';
            return getComputedStyle(header).visibility === 'hidden';
        }"""
    )
    return bool(hidden)


async def restore_nav(page: Page) -> None:
    await page.evaluate(
        """() => {
            const header = document.querySelector('body > header') ||
                [...document.querySelectorAll('header')].find(h => h.dataset.walkthroughPrevVisibility !== undefined);
            if (header) {
                header.style.visibility = header.dataset.walkthroughPrevVisibility || '';
                delete header.dataset.walkthroughPrevVisibility;
            }
        }"""
    )


async def next_section_box(page: Page, locale: str, idx: int):
    if idx + 1 >= len(SECTIONS):
        return None, None
    nxt = SECTIONS[idx + 1]
    anchor = nxt[f"anchor_{locale}"]
    root = await resolve_root(page, nxt, locale)
    box = await root.bounding_box()
    return anchor, box


async def compute_split_parts(root: Locator, box: dict, budget: float):
    """Split a too-tall section at real child boundaries, 32px CSS overlap."""
    children = root.locator(":scope > *")
    n = await children.count()
    child_boxes = []
    for i in range(n):
        cb = await children.nth(i).bounding_box()
        if cb:
            child_boxes.append(cb)
    if len(child_boxes) < 2:
        # No internal structure to split on; ship as one oversized part
        # rather than cut through content.
        return [{"y": box["y"], "bottom": box["y"] + box["height"]}]

    mid = box["y"] + box["height"] / 2
    split_i = next(
        (i for i, b in enumerate(child_boxes) if b["y"] + b["height"] / 2 > mid),
        len(child_boxes) - 1,
    )
    split_i = max(1, split_i)
    part_a_bottom = child_boxes[split_i - 1]["y"] + child_boxes[split_i - 1]["height"]
    part_b_top = max(box["y"], child_boxes[split_i]["y"] - OVERLAP_PX)
    return [
        {"y": box["y"], "bottom": part_a_bottom},
        {"y": part_b_top, "bottom": box["y"] + box["height"]},
    ]


async def capture_section(page: Page, section: dict, locale: str, device: str,
                           dsf: int, idx: int, out_dir: pathlib.Path) -> list:
    root = await resolve_root(page, section, locale)
    # Tall sections can contain multiple `whileInView(..., once:true)` groups.
    # Reveal the top and bottom before centering so the exact element capture
    # does not preserve invisible motion content outside the current viewport.
    await root.evaluate("el => el.scrollIntoView({ block: 'start' })")
    await page.wait_for_timeout(900)
    root_height = await root.evaluate("el => el.getBoundingClientRect().height")
    viewport_height = await page.evaluate("window.innerHeight")
    if root_height > viewport_height:
        await root.evaluate(
            "el => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().bottom - window.innerHeight + 16, behavior: 'instant' })"
        )
        await page.wait_for_timeout(900)
    await root.evaluate("el => el.scrollIntoView({ block: 'center' })")
    await page.wait_for_timeout(SETTLE_MS)

    nav_was_hidden = False
    if section["nav_hidden"]:
        nav_was_hidden = await hide_nav(page)

    box = await root.bounding_box()
    if box is None:
        raise RuntimeError(f"[{section['slug']}/{locale}] root has no bounding box")

    anchor_text = section[f"anchor_{locale}"]
    anchor_in_root = await root.get_by_text(anchor_text, exact=False).count()
    if anchor_in_root < 1:
        raise RuntimeError(
            f"[{section['slug']}/{locale}] anchor {anchor_text!r} not found inside captured root"
        )

    next_anchor, next_box = await next_section_box(page, locale, idx)
    if next_box is None:
        next_excluded = True
    else:
        next_excluded = next_box["y"] >= (box["y"] + box["height"] - 1)

    hidden_next = None
    if not next_excluded and section.get("hide_overlapping_next") and idx + 1 < len(SECTIONS):
        hidden_next = await resolve_root(page, SECTIONS[idx + 1], locale)
        await hidden_next.evaluate(
            "el => { el.dataset.walkthroughPrevVisibility = el.style.visibility || ''; el.style.visibility = 'hidden'; }"
        )
        next_excluded = True

    budget = BUDGETS[device]
    hint = section.get("capture_mode_hint", "element")
    entries = []

    html_lang = await page.evaluate("document.documentElement.lang")
    html_dir = await page.evaluate("document.documentElement.dir")
    url = page.url
    fname_base = f"home-{section['order']:02d}-{section['slug']}-{locale}-{device}"
    root_selector_desc = (
        section["root"]["selector"] if section["root"]["type"] == "css"
        else f"nearest <section> ancestor of {section['anchor_tag']}:{anchor_text!r}"
    )

    def make_entry(file, part, bbox, capture_mode):
        with Image.open(out_dir / file) as saved:
            saved_width, saved_height = saved.size
        return {
            "file": file,
            "section": section["slug"],
            "order": section["order"],
            "locale": locale,
            "device": device,
            "part": part,
            "url": url,
            "html_lang": html_lang,
            "html_dir": html_dir,
            "anchor": f"{section['anchor_tag']}: {anchor_text}",
            "root_selector": root_selector_desc,
            "capture_mode": capture_mode,
            "nav_hidden": bool(nav_was_hidden),
            "bbox": {"x": bbox["x"], "y": bbox["y"], "width": bbox["width"], "height": bbox["height"]},
            "out_px": {"width": saved_width, "height": saved_height},
            "next_section_anchor": next_anchor,
            "next_section_excluded": next_excluded,
            "ar_copy_is_english": bool(section.get("ar_copy_is_english")) if locale == "ar" else False,
            "notes": "",
        }

    if hint == "semantic-cards" and device == "mobile":
        cards = root.locator(section["split_card_selector"])
        card_count = await cards.count()
        expected_cards = int(section.get("split_card_count", 6))
        split_after = int(section.get("split_after_card", expected_cards // 2))
        if card_count != expected_cards or split_after < 1 or split_after >= card_count:
            raise RuntimeError(
                f"[{section['slug']}/{locale}] semantic split expected {expected_cards} cards "
                f"and split_after={split_after}, found {card_count}"
            )
        before_box = await cards.nth(split_after - 1).bounding_box()
        after_box = await cards.nth(split_after).bounding_box()
        if before_box is None or after_box is None:
            raise RuntimeError(f"[{section['slug']}/{locale}] semantic card boundary has no box")
        boundary_css = (
            (before_box["y"] + before_box["height"] + after_box["y"]) / 2 - box["y"]
        )
        overlap_css = 16
        temp_path = out_dir / f".{fname_base}-full.png"
        await root.screenshot(path=str(temp_path))
        with Image.open(temp_path) as full:
            full_width, full_height = full.size
            part_a_bottom = min(full_height, round((boundary_css + overlap_css) * dsf))
            part_b_top = max(0, round((boundary_css - overlap_css) * dsf))
            if part_a_bottom <= 0 or part_b_top >= full_height or part_b_top >= part_a_bottom:
                raise RuntimeError(
                    f"[{section['slug']}/{locale}] invalid semantic split pixels "
                    f"A={part_a_bottom}, B={part_b_top}, full={full_height}"
                )
            part_specs = [
                ("a", 0, part_a_bottom),
                ("b", part_b_top, full_height),
            ]
            for letter, top_px, bottom_px in part_specs:
                fname = f"{fname_base}-{letter}.png"
                crop = full.crop((0, top_px, full_width, bottom_px))
                crop.save(out_dir / fname, optimize=True)
                crop_bbox = {
                    "x": 0,
                    "y": top_px / dsf,
                    "width": full_width / dsf,
                    "height": (bottom_px - top_px) / dsf,
                }
                entries.append(make_entry(fname, letter, crop_bbox, "semantic-split"))
        temp_path.unlink(missing_ok=True)
    elif box["height"] > budget and hint not in {"bounded", "force-element", "semantic-cards"}:
        parts = await compute_split_parts(root, box, budget)
        letters = "abcdefg"
        for i, part in enumerate(parts):
            clip = {"x": box["x"], "y": part["y"], "width": box["width"], "height": part["bottom"] - part["y"]}
            fname = f"{fname_base}-{letters[i]}.png"
            path = out_dir / fname
            await page.screenshot(path=str(path), clip=clip)
            entries.append(make_entry(fname, letters[i], clip, "split"))
    elif hint == "bounded":
        clip = {"x": box["x"], "y": box["y"], "width": box["width"], "height": box["height"]}
        fname = f"{fname_base}.png"
        path = out_dir / fname
        await page.screenshot(path=str(path), clip=clip)
        entries.append(make_entry(fname, None, clip, "bounded"))
    else:
        fname = f"{fname_base}.png"
        path = out_dir / fname
        await root.screenshot(path=str(path))
        entries.append(make_entry(fname, None, box, "element"))

    if hidden_next is not None:
        await hidden_next.evaluate(
            "el => { el.style.visibility = el.dataset.walkthroughPrevVisibility || ''; delete el.dataset.walkthroughPrevVisibility; }"
        )
    if nav_was_hidden:
        await restore_nav(page)

    return entries


async def assert_hero_string(page: Page, locale: str) -> None:
    expected = CFG[f"hero_assert_{locale}"]
    h1_text = await page.locator("h1").first.inner_text()
    if expected not in h1_text:
        raise SystemExit(
            f"ABORT: hero assertion failed for locale={locale!r}. "
            f"Expected {expected!r} inside h1, got {h1_text!r}. "
            "Stale server or wrong branch -- refusing to capture."
        )


async def run() -> list:
    br = branch_name()
    if br != CFG["branch"]:
        raise SystemExit(f"ABORT: on branch {br!r}, sections.json expects {CFG['branch']!r}")

    filt = None
    if "--only" in sys.argv:
        filt = set(sys.argv[sys.argv.index("--only") + 1].split(","))

    devices = list(VIEWPORTS)
    if "--device" in sys.argv:
        devices = sys.argv[sys.argv.index("--device") + 1].split(",")
    locales = ["en", "ar"]
    if "--locale" in sys.argv:
        locales = sys.argv[sys.argv.index("--locale") + 1].split(",")

    # Merge onto any prior manifest so running one cell at a time (to stay
    # inside a bounded foreground timeout) does not clobber the others.
    prior_entries = []
    if MANIFEST_PATH.exists():
        prior = json.loads(MANIFEST_PATH.read_text())
        prior_entries = [
            s for s in prior.get("shots", [])
            if not (
                s["device"] in devices
                and s["locale"] in locales
                and (not filt or s["section"] in filt)
            )
        ]

    all_entries = list(prior_entries)
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        for device in devices:
            vp = VIEWPORTS[device]
            for locale in locales:
                out_dir = OUT / locale
                out_dir.mkdir(parents=True, exist_ok=True)
                context = await browser.new_context(
                    viewport={"width": vp["width"], "height": vp["height"]},
                    locale=("en" if locale == "en" else "ar-SA"),
                    device_scale_factor=vp["device_scale_factor"],
                )
                await context.add_init_script(
                    f"""() => {{
                        const s = document.createElement('style');
                        s.textContent = {json.dumps(TICKER_PAUSE_CSS)};
                        document.documentElement.appendChild(s);
                    }}"""
                )
                page = await context.new_page()
                url = f"{BASE}/{locale}/"
                print(f"== {device} {locale} -> {url}", flush=True)
                await page.goto(url, wait_until="domcontentloaded", timeout=30000)
                await page.wait_for_load_state("load", timeout=30000)
                await page.evaluate("document.fonts.ready")
                await page.add_style_tag(content=TICKER_PAUSE_CSS)
                await page.wait_for_timeout(800)
                await assert_hero_string(page, locale)

                for idx, section in enumerate(SECTIONS):
                    if filt and section["slug"] not in filt:
                        continue
                    entries = await capture_section(page, section, locale, device, vp["device_scale_factor"], idx, out_dir)
                    for e in entries:
                        print(f"   {e['file']}  {e['capture_mode']}  {e['out_px']}", flush=True)
                    all_entries.extend(entries)

                await context.close()
        await browser.close()

    manifest = {
        "branch": br,
        "hero_assert_en": CFG["hero_assert_en"],
        "hero_assert_ar": CFG["hero_assert_ar"],
        "captured_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "shots": all_entries,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    print(f"\nwrote {MANIFEST_PATH} ({len(all_entries)} shots)")
    return all_entries


if __name__ == "__main__":
    asyncio.run(run())
