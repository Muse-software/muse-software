#!/usr/bin/env python3
"""Verify a Muse walkthrough PDF with pypdfium2 only (no pdfminer deps)."""
import pathlib
import sys

import pypdfium2 as pdfium

PDF = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else
                   "/Users/a/Downloads/personal/muse-software/docs/three-doors/Direction-3-The-Proof-Walkthrough.pdf")
OUT = PDF.parent / "_verify"
OUT.mkdir(exist_ok=True)

doc = pdfium.PdfDocument(str(PDF))
n = len(doc)
print(f"pages: {n}")

banned = {"\u2014", "\u2013", "\u00ab", "\u00bb", "\u2018", "\u2019", "\u201c", "\u201d"}
hits = []
for i in range(n):
    text = doc[i].get_textpage().get_text_range() or ""
    for ch in text:
        if ch in banned:
            hits.append((i + 1, ch))
print("banned punctuation hits:", hits if hits else "none")

for i in range(n):
    page = doc[i]
    bmp = page.render(scale=80 / 72)
    img = bmp.to_pil()
    img.save(OUT / f"page-{i + 1:02d}.png")
print(f"rendered pages to {OUT}")
