#!/usr/bin/env python3
"""Generate document.html from capture-manifest.json, refs-manifest.json,
the current branch's messages/{en,ar}.json and document-data.json.

No screenshot path in document.html is hand-typed: every <img src> below is
built from the capture manifest or the refs manifest.
"""
import html
import json
import pathlib
import re

SRC = pathlib.Path(__file__).resolve().parent
REPO = SRC.parent.parent.parent  # docs/three-doors/direction-1-walkthrough-src -> repo root

DATA = json.loads((SRC / "document-data.json").read_text())
CAPTURE = json.loads((SRC / "capture-manifest.json").read_text())
REFS = json.loads((SRC / "refs-manifest.json").read_text())["refs"]
EN = json.loads((REPO / "messages" / "en.json").read_text())
AR = json.loads((REPO / "messages" / "ar.json").read_text())

SHOTS = CAPTURE["shots"]
YEAR = "2026"

TAG_STRIP = re.compile(r"</?(?:accent|role)>")


def plain(s: str) -> str:
    return TAG_STRIP.sub("", s)


def esc(s: str) -> str:
    return html.escape(s, quote=False)


def shots_for(section: str, locale: str, device: str) -> list:
    return sorted(
        [s for s in SHOTS if s["section"] == section and s["locale"] == locale and s["device"] == device],
        key=lambda s: (s.get("part") or ""),
    )


def caption_from(shot: dict, label: str) -> str:
    anchor = shot["anchor"].split(": ", 1)[-1]
    return f'<p class="plate-cap"><b>{label}.</b> {esc(anchor)}</p>'


def fig_block(section: str, locale: str, device: str, css_class: str, label: str) -> str:
    matches = shots_for(section, locale, device)
    if not matches:
        raise RuntimeError(f"no shots for {section}/{locale}/{device}")
    if len(matches) == 1:
        s = matches[0]
        img = f'<div class="shot"><img src="assets/screens/{locale}/{s["file"]}" alt="{esc(section)} {locale} {device}"></div>'
        cap = caption_from(s, label)
        return f'<div class="{css_class}">{img}{cap}</div>'
    parts_html = []
    for s in matches:
        letter = (s.get("part") or "").upper()
        parts_html.append(
            f'<div class="part"><p class="partlbl">Part {letter}</p>'
            f'<img src="assets/screens/{locale}/{s["file"]}" alt="{esc(section)} {locale} {device} part {letter}"></div>'
        )
    cap = caption_from(matches[0], label)
    return f'<div class="{css_class}"><div class="plate-split">{"".join(parts_html)}</div>{cap}</div>'


def visual_page(section_slug: str, locale: str, band_num: int, lead: str) -> str:
    sd = DATA["sections"][section_slug]
    lang_label = "English" if locale == "en" else "العربية"
    title = f'{sd["name_en"]} · {lang_label}'
    primary = fig_block(section_slug, locale, "desktop", "fig-primary", "Desktop")
    secondary = fig_block(section_slug, locale, "mobile", "fig-secondary", "Mobile")
    lead_html = f'<p class="lead{" ar" if locale == "ar" else ""}">{esc(lead)}</p>' if locale == "en" else f'<p class="lead ar">{lead}</p>'
    return f"""
<section class="page visual-page section-{esc(section_slug)} locale-{esc(locale)}">
  <header class="band"><span class="num">{band_num:02d}</span><h2>{esc(title)}</h2></header>
  <div class="wrap body">
    {lead_html}
    <div class="plate">{primary}{secondary}</div>
  </div>
  <div class="foot"><img src="assets/muse-08-maroon-crop.svg" alt=""><span class="pn">__PAGE__</span></div>
</section>"""


def bilingual_block(rows: list) -> str:
    """rows: list of (label_en, text_en, label_ar, text_ar)."""
    out = ['<div class="cols2"><div>']
    out.append('<div class="subhead">English</div>')
    for label, text in rows[0]:
        out.append(f'<p><b>{esc(label)}:</b> {esc(text)}</p>' if label else f"<p>{esc(text)}</p>")
    out.append('</div><div>')
    out.append('<div class="subhead">العربية</div>')
    for label, text in rows[1]:
        out.append(f'<p class="ar"><b>{esc(label)}:</b> {text}</p>' if label else f'<p class="ar">{text}</p>')
    out.append("</div></div>")
    return "".join(out)


def content_page(section_slug: str, band_num: int, en_rows: list, ar_rows: list) -> str:
    sd = DATA["sections"][section_slug]
    anatomy = "".join(f"<li>{esc(a)}</li>" for a in sd["anatomy"])
    nav_note = ""
    if section_slug != "hero":
        nav_note = f'<div class="note">{esc(DATA["nav_method_note"])}</div>'
    return f"""
<section class="page content-page section-{esc(section_slug)}">
  <header class="band"><span class="num">{band_num:02d}</span><h2>{esc(sd["name_en"])} &middot; content and rationale</h2></header>
  <div class="wrap body">
    <p class="lead">{esc(sd["job"])}</p>
    <div class="subhead">Content anatomy</div>
    <ul class="dash">{anatomy}</ul>
    <div class="subhead">Verbatim copy</div>
    {bilingual_block([en_rows, ar_rows])}
    <div class="subhead">Why it sits here</div>
    <p>{esc(sd["position_rationale"])}</p>
    <div class="callout"><span class="lbl">Source</span><p>{esc(sd["source_attribution"])}</p></div>
    {nav_note}
  </div>
  <div class="foot"><img src="assets/muse-08-maroon-crop.svg" alt=""><span class="pn">__PAGE__</span></div>
</section>"""


def section_pages(slug: str, band_start: int, lead_en: str, lead_ar: str, en_rows: list, ar_rows: list) -> list:
    return [
        visual_page(slug, "en", band_start, lead_en),
        visual_page(slug, "ar", band_start + 1, lead_ar),
        content_page(slug, band_start + 2, en_rows, ar_rows),
    ]


# --------------------------------------------------------------------------
# Cover
# --------------------------------------------------------------------------

cover_html = f"""
<section class="page cover">
  <div class="top">
    <img class="mark" src="assets/muse-vertical-orange-crop.svg" alt="Muse Studios">
  </div>
  <div class="mid">
    <h1>Muse Site Walkthrough<br>{esc(DATA["direction_name"])}</h1>
    <p class="lede">{esc(DATA["one_liner"])} {esc(DATA["cover_body"])}</p>
    <p class="handback">{esc(DATA["cover_handback"])}</p>
  </div>
  <div class="meta">
    <div><div class="k">Date</div><div class="v">{CAPTURE["captured_at"][:10]}</div></div>
    <div><div class="k">Prepared by</div><div class="v">{esc(DATA["prepared_by"])}</div></div>
    <div><div class="k">Reference</div><div class="v">{esc(DATA["reference_code"])}</div></div>
    <div><div class="k">Status</div><div class="v">{esc(DATA["status"])} &middot; {esc(DATA["revision"])}</div></div>
  </div>
</section>"""

# --------------------------------------------------------------------------
# Section pages, in exact site order
# --------------------------------------------------------------------------

pages = [cover_html]
n = 1

# 1. Hero
pages += section_pages(
    "hero", n + 1,
    lead_en="First screen, full viewport, real fixed navigation visible. States the identity in two lines and opens one path forward.",
    lead_ar="أول شاشة بالصفحة، بعرض الشاشة الكامل، مع بقاء القائمة الثابتة ظاهرة. تحدّد الهوية بسطرين وتفتح طريقًا واحدًا للأمام.",
    en_rows=[
        ("Headline", EN["Home"]["hero"]["headlineLead"]),
        ("Headline, turn", EN["Home"]["hero"]["headlineTurn"]),
        ("Tagline", EN["Home"]["hero"]["tagline"]),
        ("Subtitle", EN["Home"]["hero"]["subtitle"]),
        ("CTA", EN["Home"]["hero"]["cta"]),
    ],
    ar_rows=[
        ("العنوان", AR["Home"]["hero"]["headlineLead"]),
        ("العنوان، التحول", AR["Home"]["hero"]["headlineTurn"]),
        ("الوسم", AR["Home"]["hero"]["tagline"]),
        ("العنوان الفرعي", AR["Home"]["hero"]["subtitle"]),
        ("الزر", AR["Home"]["hero"]["cta"]),
    ],
)
n += 3

# 2. Three doors
d_en, d_ar = EN["Home"]["doors"], AR["Home"]["doors"]
pages += section_pages(
    "doors", n + 1,
    lead_en="Section-exact capture: begins at the doors heading, ends before the Manifesto heading. No manifesto pixels in any doors image.",
    lead_ar="التقاط مضبوط على حدود القسم: يبدأ من عنوان الأبواب وينتهي قبل عنوان البيان. لا تظهر أي بكسلات من البيان في صور الأبواب.",
    en_rows=[
        ("Heading", d_en["heading"]),
        ("Build: title", d_en["build"]["title"]), ("Build: body", d_en["build"]["body"]),
        ("Build: promise", d_en["build"]["promise"]), ("Build: CTA", d_en["build"]["cta"]),
        ("Ventures: title", d_en["ventures"]["title"]), ("Ventures: body", d_en["ventures"]["body"]),
        ("Ventures: promise", d_en["ventures"]["promise"]), ("Ventures: CTA", d_en["ventures"]["cta"]),
        ("Think: title", d_en["think"]["title"]), ("Think: body", d_en["think"]["body"]),
        ("Think: promise", d_en["think"]["promise"]), ("Think: CTA", d_en["think"]["cta"]),
    ],
    ar_rows=[
        ("العنوان", d_ar["heading"]),
        ("بناء: العنوان", d_ar["build"]["title"]), ("بناء: النص", d_ar["build"]["body"]),
        ("بناء: الوعد", d_ar["build"]["promise"]), ("بناء: الزر", d_ar["build"]["cta"]),
        ("مشاريعنا: العنوان", d_ar["ventures"]["title"]), ("مشاريعنا: النص", d_ar["ventures"]["body"]),
        ("مشاريعنا: الوعد", d_ar["ventures"]["promise"]), ("مشاريعنا: الزر", d_ar["ventures"]["cta"]),
        ("فكر: العنوان", d_ar["think"]["title"]), ("فكر: النص", d_ar["think"]["body"]),
        ("فكر: الوعد", d_ar["think"]["promise"]), ("فكر: الزر", d_ar["think"]["cta"]),
    ],
)
n += 3

# 3. Manifesto
m_en, m_ar = EN["Home"]["manifesto"], AR["Home"]["manifesto"]
p_en, p_ar = EN["Home"]["pressure"], AR["Home"]["pressure"]
pages += section_pages(
    "manifesto", n + 1,
    lead_en="Section-exact capture including the embedded pressure statement and its CTA; ends before the Outcomes band.",
    lead_ar="التقاط مضبوط على حدود القسم يشمل جملة الضغط المدمجة وزر الدعوة الخاص بها؛ ينتهي قبل شريط النتائج.",
    en_rows=[
        ("Heading", m_en["heading"]),
        ("Paragraph 1", m_en["paragraph1"]), ("Paragraph 2", m_en["paragraph2"]), ("Paragraph 3", m_en["paragraph3"]),
        ("Pressure, lead", p_en["lead"]), ("Pressure, emphasis", p_en["emphasis"]),
        ("CTA", m_en["cta"]),
    ],
    ar_rows=[
        ("العنوان", m_ar["heading"]),
        ("الفقرة الأولى", m_ar["paragraph1"]), ("الفقرة الثانية", m_ar["paragraph2"]), ("الفقرة الثالثة", m_ar["paragraph3"]),
        ("جملة الضغط", p_ar["lead"]), ("التأكيد", p_ar["emphasis"]),
        ("الزر", m_ar["cta"]),
    ],
)
n += 3

# 4. Outcomes band
pages += section_pages(
    "outcomes", n + 1,
    lead_en="Short band, element capture. One centered sentence between the Manifesto and the Ticker.",
    lead_ar="شريط قصير، التقاط للعنصر كاملًا. جملة واحدة في المنتصف بين البيان والشريط المتحرك.",
    en_rows=[("Heading", plain(EN["Home"]["outcomes"]["heading"]))],
    ar_rows=[("العنوان", plain(AR["Home"]["outcomes"]["heading"]))],
)
n += 3

# 5. Ticker
pages += section_pages(
    "ticker", n + 1,
    lead_en="Bounded clip around the ticker wrapper, animation frozen at its initial frame for a deterministic, legible capture.",
    lead_ar="التقاط محدود حول إطار الشريط المتحرك، مع تجميد الحركة عند إطارها الأول لالتقاط ثابت وواضح.",
    en_rows=[("Line", EN["Home"]["ticker"])],
    ar_rows=[("السطر", AR["Home"]["ticker"])],
)
n += 3

# 6. FAQ
f_en, f_ar = EN["Home"]["faq"], AR["Home"]["faq"]
faq_en_rows = [("Heading", f_en["heading"])] + [(it["q"], it["a"]) for it in f_en["items"]]
faq_ar_rows = [("العنوان", f_ar["heading"])] + [(it["q"], it["a"]) for it in f_ar["items"]]
pages += section_pages(
    "faq", n + 1,
    lead_en="Element capture, first accordion item open, the component's real default state (no state was forced for the shot).",
    lead_ar="التقاط للعنصر كاملًا، مع بقاء أول سؤال مفتوحًا كما هي الحالة الافتراضية الحقيقية للمكوّن.",
    en_rows=faq_en_rows,
    ar_rows=faq_ar_rows,
)
n += 3

# 7. Final CTA
c_en, c_ar = EN["CTA"], AR["CTA"]
pages += section_pages(
    "cta", n + 1,
    lead_en="Element capture of the closing panel only; the footer never appears on this page.",
    lead_ar="التقاط للوحة الختامية فقط؛ لا يظهر التذييل في هذه الصفحة.",
    en_rows=[("Heading", c_en["heading"]), ("Subheading", c_en["subheading"]), ("Button", c_en["button"])],
    ar_rows=[("العنوان", c_ar["heading"]), ("العنوان الفرعي", c_ar["subheading"]), ("الزر", c_ar["button"])],
)
n += 3

# 8. Footer
fo_en, fo_ar = EN["Footer"], AR["Footer"]
nav_en, nav_ar = EN["Nav"], AR["Nav"]
pages += section_pages(
    "footer", n + 1,
    lead_en="Element capture of body > footer, outside <main>; the only page in this walkthrough where the footer appears.",
    lead_ar="التقاط لعنصر body > footer، خارج main؛ الصفحة الوحيدة في هذا الدليل التي يظهر فيها التذييل.",
    en_rows=[
        ("Blurb", fo_en["blurb"]), ("CTA", fo_en["cta"]),
        ("Company column", nav_en["items"]["about"] + ", " + nav_en["items"]["careers"] + ", " + nav_en["items"]["contact"]),
        ("Explore column", nav_en["items"]["explore"] + ", " + nav_en["items"]["newsletter"] + ", " + nav_en["items"]["getStarted"]),
        ("Reach out", fo_en["reachOut"]), ("Worldview", fo_en["worldview"]),
        ("Location", fo_en["locationName"] + ", " + fo_en["location"]),
        ("Rights", fo_en["rights"].replace("{year}", YEAR)),
        ("Legal", fo_en["privacy"] + ", " + fo_en["terms"]),
    ],
    ar_rows=[
        ("النص التعريفي", fo_ar["blurb"]), ("الزر", fo_ar["cta"]),
        ("عمود الشركة", nav_ar["items"]["about"] + "، " + nav_ar["items"]["careers"] + "، " + nav_ar["items"]["contact"]),
        ("عمود استكشف", nav_ar["items"]["explore"] + "، " + nav_ar["items"]["newsletter"] + "، " + nav_ar["items"]["getStarted"]),
        ("تواصل معنا", fo_ar["reachOut"]), ("الرؤية", fo_ar["worldview"]),
        ("الموقع", fo_ar["locationName"] + "، " + fo_ar["location"]),
        ("الحقوق", fo_ar["rights"].replace("{year}", YEAR)),
        ("قانوني", fo_ar["privacy"] + "، " + fo_ar["terms"]),
    ],
)
n += 3

# --------------------------------------------------------------------------
# Appendix: objections, open decisions, structure map, source map, refs
# --------------------------------------------------------------------------

objections_rows_en = [(it["q"], it["a"]) for it in EN["Home"]["faq"]["items"]]
objections_rows_ar = [(it["q"], it["a"]) for it in AR["Home"]["faq"]["items"]]
objections_html = f"""
<section class="page">
  <header class="band"><span class="num">{n + 1:02d}</span><h2>Objections answered</h2></header>
  <div class="wrap body">
    <p class="lead">{esc(DATA["objections_intro"])}</p>
    {bilingual_block([objections_rows_en, objections_rows_ar])}
  </div>
  <div class="foot"><img src="assets/muse-08-maroon-crop.svg" alt=""><span class="pn">__PAGE__</span></div>
</section>"""
pages.append(objections_html)
n += 1

decisions_items = "".join(
    f'<div class="subhead">{i + 1}. {esc(d["title"])}</div><p>{esc(d["body"])}</p>'
    f'<p class="pull small">{esc(d["recommendation"])}</p>'
    for i, d in enumerate(DATA["open_decisions"])
)
decisions_html = f"""
<section class="page">
  <header class="band"><span class="num">{n + 1:02d}</span><h2>Open decisions</h2></header>
  <div class="wrap body">
    <p class="lead">Each decision below carries a recommendation. A different answer from the team changes the plan.</p>
    {decisions_items}
  </div>
  <div class="foot"><img src="assets/muse-08-maroon-crop.svg" alt=""><span class="pn">__PAGE__</span></div>
</section>"""
pages.append(decisions_html)
n += 1

structure_rows = "".join(
    f'<tr><td class="k">{esc(r["n"])}</td><td>{esc(r["name"])}</td><td>{esc(r["job"])}</td></tr>'
    for r in DATA["structure_map"]
)
structure_html = f"""
<section class="page structure-page">
  <header class="band"><span class="num">{n + 1:02d}</span><h2>Structure map</h2></header>
  <div class="wrap body">
    <p class="lead">The homepage in exact rendered order, top to bottom, as it appears in {esc(EN.get('Metadata', {}).get('siteName', 'Muse'))}'s {esc(DATA['direction_name'])} build.</p>
    <table><thead><tr><th style="width:12mm">#</th><th style="width:38mm">Section</th><th>Job</th></tr></thead>
    <tbody>{structure_rows}</tbody></table>
  </div>
  <div class="foot"><img src="assets/muse-08-maroon-crop.svg" alt=""><span class="pn">__PAGE__</span></div>
</section>"""
pages.append(structure_html)
n += 1

SOURCE_ROWS_PER_PAGE = 4
source_chunks = [
    DATA["source_map"][i:i + SOURCE_ROWS_PER_PAGE]
    for i in range(0, len(DATA["source_map"]), SOURCE_ROWS_PER_PAGE)
]
for source_i, source_chunk in enumerate(source_chunks):
    source_rows = "".join(
        f'<tr><td class="k">{esc(r["pattern"])}</td><td>{esc(r["source"])}</td><td>{esc(r["adaptation"])}</td></tr>'
        for r in source_chunk
    )
    source_title = f"Source map ({source_i + 1} of {len(source_chunks)})"
    source_intro = (
        '<p class="lead">External influences are indexed below. Muse-owned lines are labeled as such on their content pages. '
        'Six principal sources are shown as live evidence next; MOZN FAQ remains a research-bank reference, not a live plate in this appendix.</p>'
        if source_i == 0 else ""
    )
    source_callout = (
        '<div class="callout"><span class="lbl">No fabricated proof</span>'
        '<p>This direction uses no testimonials, client logos or performance metrics.</p></div>'
        if source_i == len(source_chunks) - 1 else ""
    )
    source_html = f"""
<section class="page source-page">
  <header class="band"><span class="num">{n + 1:02d}</span><h2>{esc(source_title)}</h2></header>
  <div class="wrap body">
    {source_intro}
    <table class="ctable"><thead><tr><th style="width:52mm">Pattern</th><th style="width:34mm">Source</th><th>Adaptation</th></tr></thead>
    <tbody>{source_rows}</tbody></table>
    {source_callout}
  </div>
  <div class="foot"><img src="assets/muse-08-maroon-crop.svg" alt=""><span class="pn">__PAGE__</span></div>
</section>"""
    pages.append(source_html)
    n += 1

# Reference evidence plates, 2 per page
REFS_PER_PAGE = 2
ref_page_count = (len(REFS) + REFS_PER_PAGE - 1) // REFS_PER_PAGE
for pi in range(ref_page_count):
    chunk = REFS[pi * REFS_PER_PAGE:(pi + 1) * REFS_PER_PAGE]
    plates = []
    for r in chunk:
        plates.append(f"""
        <div class="ref-plate">
          <div class="shot"><img src="assets/refs/{r['file']}" alt="{esc(r['company'])}"></div>
          <div class="meta">
            <span class="badge">{esc(r['class'])}</span>
            <p class="co">{esc(r['company'])}</p>
            <p class="row"><a href="{esc(r['url'])}">{esc(r['url'])}</a></p>
            <p class="row"><b>Captured</b> {esc(r['captured_at'][:10])}</p>
            <p class="row"><b>Pattern</b> {esc(r['pattern'])}</p>
            <p class="row"><b>Informs</b> {esc(r['muse_section'])}: {esc(r['influence_type'])}</p>
          </div>
        </div>""")
    title = "Reference evidence" if ref_page_count == 1 else f"Reference evidence ({pi + 1} of {ref_page_count})"
    intro = (
        '<p class="lead">Six live figures captured today: four direct inputs and two independent validations. '
        "Outcome or scale numbers shown on a source's own page are that company's marketing claim, "
        'not independently verified by Muse.</p>' if pi == 0 else ""
    )
    ref_html = f"""
<section class="page">
  <header class="band"><span class="num">{n + 1 + pi:02d}</span><h2>{esc(title)}</h2></header>
  <div class="wrap body">
    {intro}
    {''.join(plates)}
  </div>
  <div class="foot"><img src="assets/muse-08-maroon-crop.svg" alt=""><span class="pn">__PAGE__</span></div>
</section>"""
    pages.append(ref_html)

# --------------------------------------------------------------------------
# Assemble, number pages, write
# --------------------------------------------------------------------------

total = len(pages)
final_pages = []
for i, p in enumerate(pages):
    final_pages.append(p.replace("__PAGE__", f"{i + 1} / {total}"))

doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Muse Site Walkthrough: {esc(DATA["direction_name"])}</title>
<link rel="stylesheet" href="house.css">
<style>
.page .wrap.body {{ padding-bottom: 14mm; }}
.subhead {{ margin-top: 5mm; }}
.ctable td {{ font-size: 7.9pt; }}
.ctable td.ar {{ text-align: right; direction: rtl; }}
.cols2 p {{ font-size: 8.3pt; line-height: 1.5; margin: 0 0 2.6mm; }}
.cols2 p b {{ font-weight: 600; }}
</style>
</head>
<body>
{"".join(final_pages)}
</body>
</html>
"""

clean_doc = "\n".join(line.rstrip() for line in doc.splitlines()) + "\n"
(SRC / "document.html").write_text(clean_doc)
print(f"wrote document.html ({total} pages)")
