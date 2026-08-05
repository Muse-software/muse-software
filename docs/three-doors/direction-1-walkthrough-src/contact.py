#!/usr/bin/env python3
"""Build four labeled contact sheets (EN desktop, EN mobile, AR desktop, AR
mobile) from capture-manifest.json for visual QA inspection before any PDF
build. Renders one HTML grid per locale/device via Playwright.
"""
import asyncio
import html
import json
import pathlib

from playwright.async_api import async_playwright

SRC = pathlib.Path(__file__).resolve().parent
MANIFEST_PATH = SRC / "capture-manifest.json"
OUT = SRC / "_contact"

CSS = """
body { margin:0; padding:24px; background:#111; font-family:-apple-system,sans-serif; }
h1 { color:#fff; font-size:20px; margin:0 0 16px; }
.grid { display:flex; flex-wrap:wrap; gap:18px; align-items:flex-start; }
.cell { background:#1c1c1e; border:1px solid #333; padding:10px; width:340px; }
.cell img { width:100%; height:auto; display:block; background:#000; }
.cap { color:#ddd; font-size:12px; margin-top:8px; line-height:1.4; word-break:break-all; }
.cap b { color:#fd4601; }
.flag { color:#ff5555; font-weight:700; }
"""


def build_html(locale: str, device: str, shots: list) -> str:
    cells = []
    for s in shots:
        img_path = (SRC / "assets" / "screens" / s["locale"] / s["file"]).resolve().as_uri()
        flags = []
        if not s["next_section_excluded"] and s["section"] != "footer":
            flags.append("NEXT SECTION NOT EXCLUDED")
        if s["section"] != "hero" and not s["nav_hidden"]:
            flags.append("NAV NOT HIDDEN")
        flag_html = f'<div class="flag">{html.escape(" / ".join(flags))}</div>' if flags else ""
        cells.append(f"""
        <div class="cell">
          <img src="{img_path}" loading="eager">
          <div class="cap"><b>{html.escape(str(s['order']))}. {html.escape(s['section'])}</b> {html.escape(s.get('part') or '')}<br>
          {html.escape(s['file'])}<br>
          anchor: {html.escape(s['anchor'])}<br>
          mode: {html.escape(s['capture_mode'])} nav_hidden: {s['nav_hidden']}
          {flag_html}</div>
        </div>""")
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head>
<body><h1>Direction 1 contact sheet -- {locale.upper()} {device}</h1>
<div class="grid">{''.join(cells)}</div></body></html>"""


async def main() -> None:
    OUT.mkdir(exist_ok=True)
    manifest = json.loads(MANIFEST_PATH.read_text())
    shots = manifest["shots"]

    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        for locale in ("en", "ar"):
            for device in ("desktop", "mobile"):
                cell_shots = sorted(
                    [s for s in shots if s["locale"] == locale and s["device"] == device],
                    key=lambda s: (s["order"], s.get("part") or ""),
                )
                if not cell_shots:
                    print(f"WARNING: no shots for {locale}/{device}")
                    continue
                doc = build_html(locale, device, cell_shots)
                html_path = OUT / f"{locale}-{device}.html"
                html_path.write_text(doc)
                page = await browser.new_page(viewport={"width": 1500, "height": 1000})
                await page.goto(html_path.resolve().as_uri(), wait_until="load")
                out_png = OUT / f"contact-{locale}-{device}.png"
                await page.screenshot(path=str(out_png), full_page=True)
                await page.close()
                print(f"wrote {out_png}")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
