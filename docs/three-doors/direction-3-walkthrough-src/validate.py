#!/usr/bin/env python3
"""Validate capture-manifest.json against sections.json and disk.

Fails hard (non-zero exit) on any violation, per the walkthrough rebuild plan
Section 3. Run after capture.py and before any PDF build.
"""
import json
import pathlib
import subprocess
import sys

from PIL import Image

SRC = pathlib.Path(__file__).resolve().parent
CFG = json.loads((SRC / "sections.json").read_text())
MANIFEST_PATH = SRC / "capture-manifest.json"
SCREENS = SRC / "assets" / "screens"

TOLERANCE_PX = 6


def branch_name() -> str:
    return subprocess.run(
        ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        cwd=SRC, capture_output=True, text=True, check=True,
    ).stdout.strip()


def fail(msg: str, failures: list) -> None:
    failures.append(msg)
    print(f"FAIL  {msg}")


def main() -> int:
    failures: list = []
    manifest = json.loads(MANIFEST_PATH.read_text())
    shots = manifest["shots"]
    branch = branch_name()

    # 4. branch hero string
    if manifest.get("hero_assert_en") != CFG["hero_assert_en"]:
        fail("hero_assert_en in manifest does not match sections.json", failures)
    if manifest.get("hero_assert_ar") != CFG["hero_assert_ar"]:
        fail("hero_assert_ar in manifest does not match sections.json", failures)
    if manifest.get("branch") != branch:
        fail(f"manifest branch {manifest.get('branch')!r} != current branch {branch!r}", failures)

    # 1 + 3. file presence, nonzero/matching dimensions
    on_disk = {p.relative_to(SCREENS).as_posix() for p in SCREENS.rglob("*.png")}
    referenced = set()
    for s in shots:
        rel = f"{s['locale']}/{s['file']}"
        referenced.add(rel)
        path = SCREENS / rel
        if not path.exists():
            fail(f"missing file on disk: {rel}", failures)
            continue
        with Image.open(path) as im:
            w, h = im.size
        exp_w, exp_h = s["out_px"]["width"], s["out_px"]["height"]
        if w <= 0 or h <= 0:
            fail(f"{rel}: nonpositive dimensions {w}x{h}", failures)
        if abs(w - exp_w) > TOLERANCE_PX or abs(h - exp_h) > TOLERANCE_PX:
            fail(f"{rel}: dims {w}x{h} != manifest out_px {exp_w}x{exp_h} (tol {TOLERANCE_PX}px)", failures)

    orphans = on_disk - referenced
    for o in sorted(orphans):
        fail(f"orphan file not referenced by manifest: {o}", failures)

    # 2. manifest completeness -- every section x locale x device present
    # (D1 has no split cells by measurement; a section may still legitimately
    # emit >1 part, which is fine as long as at least one shot exists.)
    present = {(s["section"], s["locale"], s["device"]) for s in shots}
    for section in CFG["sections"]:
        for locale in ("en", "ar"):
            for device in CFG["viewports"]:
                key = (section["slug"], locale, device)
                if key not in present:
                    fail(f"missing expected cell: {key}", failures)

    for s in shots:
        rel = f"{s['locale']}/{s['file']}"

        # 5. locale + URL
        expected_dir = "ltr" if s["locale"] == "en" else "rtl"
        if s["html_lang"] != s["locale"]:
            fail(f"{rel}: html_lang {s['html_lang']!r} != locale {s['locale']!r}", failures)
        if s["html_dir"] != expected_dir:
            fail(f"{rel}: html_dir {s['html_dir']!r} != expected {expected_dir!r}", failures)
        if not s["url"].rstrip("/").endswith(f"/{s['locale']}"):
            fail(f"{rel}: url {s['url']!r} does not start with /{s['locale']}/", failures)

        # 6. exact element bounding box
        bbox = s["bbox"]
        if bbox["width"] <= 0 or bbox["height"] <= 0:
            fail(f"{rel}: bbox has nonpositive dimension {bbox}", failures)
        dsf = CFG["viewports"][s["device"]]["device_scale_factor"]
        exp_w = round(bbox["width"] * dsf)
        exp_h = round(bbox["height"] * dsf)
        if s["capture_mode"] == "bounded":
            viewport_w = CFG["viewports"][s["device"]]["width"] * dsf
            if s["out_px"]["width"] > viewport_w or s["out_px"]["height"] <= 0:
                fail(f"{rel}: bounded capture is outside viewport pixel bounds", failures)
        elif abs(s["out_px"]["width"] - exp_w) > TOLERANCE_PX or abs(s["out_px"]["height"] - exp_h) > TOLERANCE_PX:
            fail(f"{rel}: out_px does not equal bbox*{dsf} within tolerance", failures)

        # 7. section text included
        if not s.get("anchor"):
            fail(f"{rel}: missing anchor (section text not confirmed included)", failures)

        # 8. next section excluded
        if s["section"] != "footer" and not s["next_section_excluded"]:
            fail(f"{rel}: next_section_excluded is not true for a non-terminal section", failures)
        if s["section"] == "footer" and s["next_section_anchor"] is not None:
            fail(f"{rel}: footer must have next_section_anchor null", failures)

        # 9. sticky nav handling
        if s["section"] == "hero" and s["nav_hidden"]:
            fail(f"{rel}: hero shot must have nav_hidden false", failures)
        if s["section"] != "hero" and not s["nav_hidden"]:
            fail(f"{rel}: non-hero shot must have nav_hidden true", failures)

        # 10. D3 AR-English disclosure
        if branch == "direction/3-the-proof" and s["locale"] == "ar":
            expected_ar_english = s["section"] in {"hero", "proof", "cta", "footer"}
            if bool(s.get("ar_copy_is_english")) != expected_ar_english:
                fail(
                    f"{rel}: ar_copy_is_english={s.get('ar_copy_is_english')!r} "
                    f"but expected {expected_ar_english} for D3 section {s['section']!r}",
                    failures,
                )

    print(f"\n{len(shots)} shots checked, {len(failures)} failure(s)")
    if failures:
        print("\nFAIL")
        return 1
    print("\nall checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
