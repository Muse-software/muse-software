#!/usr/bin/env python3
"""Compute WCAG 2.1 contrast ratios for the Muse palette.

Run this before putting any new colour pairing into body text. The numbers in
reference/palette-and-type.md came from this script, and the rule that white on
orange is large-text-only came from the 3.43:1 it reports rather than from taste.

Run:  python3 contrast.py
      python3 contrast.py "#fe4701" "#4c0014"     # check one arbitrary pair
"""
import sys

PALETTE = {
    "orange": "#fe4701",
    "maroon": "#4c0014",
    "white": "#ffffff",
    "yellow": "#ffbe0b",
    "purple": "#6300ff",
    "green": "#00dd88",
}

PAIRS = [
    ("white on maroon", "white", "maroon"),
    ("maroon on white", "maroon", "white"),
    ("orange on maroon", "orange", "maroon"),
    ("white on orange", "white", "orange"),
    ("orange on white", "orange", "white"),
    ("yellow on maroon", "yellow", "maroon"),
    ("green on maroon", "green", "maroon"),
    ("purple on white", "purple", "white"),
    ("yellow on white", "yellow", "white"),
    ("green on white", "green", "white"),
]


def _linear(channel: int) -> float:
    c = channel / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _linear(r) + 0.7152 * _linear(g) + 0.0722 * _linear(b)


def ratio(fg: str, bg: str) -> float:
    a, b = luminance(fg), luminance(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def verdict(r: float) -> str:
    if r >= 7.0:
        return "AAA body. Safe anywhere"
    if r >= 4.5:
        return "AA body text"
    if r >= 3.0:
        return "Large text only (18pt, or 14pt bold). Fails AA for body"
    return "FAILS. Fill only, never text"


def main() -> None:
    if len(sys.argv) == 3:
        fg, bg = sys.argv[1], sys.argv[2]
        r = ratio(fg, bg)
        print(f"{fg} on {bg}   {r:5.2f}:1   {verdict(r)}")
        return

    print(f"{'pair':<20} {'ratio':>8}   verdict")
    print("-" * 74)
    for name, fg, bg in PAIRS:
        r = ratio(PALETTE[fg], PALETTE[bg])
        print(f"{name:<20} {r:7.2f}:1   {verdict(r)}")
    print(
        "\nRule of thumb for Muse documents: body text is maroon on white or white "
        "on maroon.\nOrange is numerals, rules and large type. Yellow and green are "
        "fills, never text on white."
    )


if __name__ == "__main__":
    main()
