# Saudi / GCC source evidence for the Muse walkthrough rebuild

> **Purpose:** screenshot-ready evidence to place at the end of the rebuilt walkthrough PDFs. These are references for architecture and visual mechanics, not copy to reproduce.
>
> **Live verification:** 5 August 2026. Every included frame was checked in a live browser; key strings were also found in the fetched HTML. The set intentionally goes beyond the examples originally named by the user. New Saudi/GCC references are **Al Rajhi Bank, HungerStation, ATHR Gallery, and Almosafer**.

## Capture notes

- Capture at a desktop viewport around **1440 × 900** unless a crop below says otherwise.
- Hide or dismiss cookie/announcement overlays before capture.
- Prefer text-anchored locators over generated class names. Selectors below use Playwright-style `:has-text()` notation and remain understandable if implementation classes change.
- Preserve the site's natural reading direction. Do not mirror an RTL capture in post.
- “WAF status” describes this research browser session, not a permanent guarantee.

---

## 1. ATHR Gallery — bilingual identity system in the hero/navigation

- **Live URL:** https://athrart.com/
- **Language:** English primary, with visible `EN` / `AR` language controls
- **Exact section text / selector:** `main h1:has-text("HOME")`; hero slide `main h2:has-text("SENSITIVITY OF THE RUINS: HATEM AL AHMED | SOLO EXHIBITION")`; language controls `a:has-text("EN")` and `a:has-text("AR")`
- **What the screenshot proves:** A Saudi cultural brand can signal bilingual identity without duplicating the hero. The language pair lives in the global frame while the hero remains singular, image-led, and typographically confident.
- **Muse direction / section supported:** **Identity-led / editorial direction — bilingual identity hero.** Supports keeping one strong Muse thesis and a quiet AR/EN switch rather than two competing blocks of copy.
- **WAF status:** **Clear.** Live page rendered in the browser (HTTP 200); cookie banner may appear but is dismissible.
- **Recommended crop:** Full viewport from the ATHR wordmark/navigation through the complete first exhibition slide. Keep `EN / AR`, the image, title, date, and carousel arrows; trim before `ATHR AT ART BASEL`.

## 2. Al Rajhi Bank — native RTL promise-first hero

- **Live URL:** https://www.alrajhibank.com.sa/ar
- **Language:** Arabic, native RTL
- **Exact section text / selector:** `main h1:has-text("تجربة مصرفية صُمّمت لك")`; adjacent paragraph `p:has-text("تواكب احتياجات يومك وتدعم طموحات غدك")`
- **What the screenshot proves:** A large Saudi institution can open with a human promise rather than a product inventory or a translated English construction. Navigation, headline alignment, and product controls all read naturally from the right.
- **Muse direction / section supported:** **Arabic-first / institutional direction — RTL section opening and identity hero.** Useful evidence for a declarative Arabic Muse opening with no eyebrow label.
- **WAF status:** **Clear.** Live browser render succeeded and exposed the full accessibility tree. An announcement/privacy overlay may need closing.
- **Recommended crop:** Header plus hero statement and the first row of product tiles. Keep enough of the right edge to show authentic RTL alignment; stop before `فئات مصرفية متنوعة`.

## 3. HungerStation — Arabic-first offer lanes with local voice

- **Live URL:** https://hungerstation.com/sa-ar
- **Language:** Arabic, native RTL; Saudi colloquial heading
- **Exact section text / selector:** `section:has(h2:has-text("وش حاب تطلب اليوم؟"))` (the live accessibility role is a region named `وش حاب تطلب اليوم؟`); cards include `h3:has-text("المتاجر")`, `h3:has-text("هنقرستيشن ماركت")`, `h3:has-text("المقاضي")`, and repeated `a:has-text("اكتشف الان")`
- **What the screenshot proves:** Distinct offers can share one visual grammar while remaining immediately distinguishable. The dialect heading creates locality; image → title → one short explanation → one recurring CTA creates lane consistency.
- **Muse direction / section supported:** **Three doors / commercial direction — distinct offer lanes.** Supports Build / Ventures / Think as equal siblings with a shared card skeleton, not a generic services list.
- **WAF status:** **Clear.** Fully rendered in browser; HTTP 200.
- **Recommended crop:** Crop tightly from `وش حاب تطلب اليوم؟` through the first **three or four** cards, preserving the rightmost start of the RTL row. Exclude the hero above and `المناطق التي نخدمها` below.

## 4. Salla — deep but orderly capability lanes

- **Live URL:** https://salla.com/
- **Language:** Arabic, native RTL; an English language option is present
- **Exact section text / selector:** `h2:has-text("حلول سلة تدعمك بكل خطوة من مشوارك التجاري")`; lane titles `p:has-text("إنشاء وتدشين المتجر")`, `p:has-text("تصميم المتجر")`, `p:has-text("المدفوعات")`, `p:has-text("الشحن والتوصيل")`, `p:has-text("أدوات التسويق")`, `p:has-text("التوسّع")`
- **What the screenshot proves:** A broad platform can group many capabilities into named lanes without flattening them into indistinct feature cards. Every lane carries a title, a promise line, supporting detail, and the same conversion action.
- **Muse direction / section supported:** **Three doors / systems direction — distinct offer lanes.** Supports giving each Muse door its own promise and detail while retaining one shared interaction model.
- **WAF status:** **Clear.** Live page and all six lane texts rendered; HTTP 200.
- **Recommended crop:** Start at the section heading and capture the first **two complete lane panels** side by side/stacked as rendered. If a single active panel is shown at the chosen width, include the lane navigation and active panel together. Avoid a full six-panel long-page screenshot.

## 5. Salla — quantified proof directly after the thesis

- **Live URL:** https://salla.com/
- **Language:** Arabic, native RTL
- **Exact section text / selector:** `h2:has-text("أكبر منصَّة سعودية للتجارة الإلكترونية في الشرق الأوسط")`; proof sentence `p:has-text("أكثر من 68 ألف متجر نشط")`; hero trust line `text="+68,000 متجر إلكتروني نشط في السعودية والإمارات"`
- **What the screenshot proves:** Proof can arrive as one large market-position statement plus two high-salience metrics, rather than a wall of client logos. The metrics are visually attached to the proposition they validate.
- **Muse direction / section supported:** **Proof-led direction — proof / metrics band.** Supports a compact Muse credibility section immediately after the thesis or doors.
- **WAF status:** **Clear.** Live rendered counters were present; note that animated numeric values may begin at `+0` until animation settles.
- **Recommended crop:** Wait for counter animation to finish. Capture from the H2 through both metric blocks; exclude `شركاء النجاح` unless a small strip is needed as the lower edge.

## 6. Al Rajhi Bank — institutional scale as a dedicated metrics chapter

- **Live URL:** https://www.alrajhibank.com.sa/ar
- **Language:** Arabic, native RTL
- **Exact section text / selector:** `section:has(h2:has-text("لأرقامنا بصمة"))` or text anchor `h2:has-text("لأرقامنا بصمة")`; supporting paragraph begins `تأسس مصرف الراجحي أكبر المصارف العالمية عام 1957م`
- **What the screenshot proves:** A proof section can feel like its own chapter: a short editorial heading, one contextual sentence, then a row of equal numeric cells. The heading literally frames numbers as a brand imprint rather than dashboard data.
- **Muse direction / section supported:** **Institutional / credibility direction — proof and metrics.** Useful for years of experience, shipped work, ventures, or audience reach without resorting to testimonial clutter.
- **WAF status:** **Clear.** Section loaded in the live browser. Some numeric values are animated/graphical, so capture only after they settle.
- **Recommended crop:** Heading and context paragraph plus the entire five-cell metrics row and `لمعرفة المزيد عنّا`; do not include the news carousel above.

## 7. Salla — founder/customer voices as trust evidence

- **Live URL:** https://salla.com/
- **Language:** Arabic, native RTL
- **Exact section text / selector:** `section:has(h2:has-text("كن صاحب قصة النجاح القادمة"))`; verified visible quote begins `“أنا مريت بتجارب وواجهت تحديات` and attribution `محمد خالد` / `متجر أسناس`
- **What the screenshot proves:** Trust is made tangible through named operators and their own language, while the section heading turns proof into an invitation. The card structure keeps quote, person, and venture/store attribution separate.
- **Muse direction / section supported:** **Human / venture direction — trust and founder proof.** Supports demonstrating Muse’s experience through makers and outcomes rather than an anonymous logo wall.
- **WAF status:** **Clear.** Testimonial carousel rendered live; HTTP 200.
- **Recommended crop:** Section heading plus **two complete testimonial cards**, including names and store attributions. Avoid cutting a quote mid-sentence or capturing carousel controls without their cards.

## 8. MOZN — trust architecture in the footer, not a generic FAQ

- **Live URL:** https://www.mozn.ai/ar
- **Language:** Arabic page with English brand lockup and some English utility labels
- **Exact section text / selector:** `footer h3:has-text("Intelligence That Matters")`; footer link `a:has-text("Trust Center")`; location links `a:has-text("المملكة العربية السعودية")` and `a:has-text("الإمارات العربية المتحدة")`
- **What the screenshot proves:** Trust can be persistent infrastructure: brand thesis, trust center, direct email addresses, and real regional locations are grouped in the final global frame. This is stronger evidence than a decorative “trusted by” claim.
- **Muse direction / section supported:** **System / institutional direction — trust close and footer.** Supports a Muse footer that repeats the thesis and gives concrete trust/contact paths.
- **WAF status:** **Clear.** Arabic homepage and footer rendered live. Important live-state note: the homepage heading `الأسئلة الشائعة` currently displays `No items found.`; **do not screenshot or cite that FAQ as a successful pattern.**
- **Recommended crop:** Footer only, from `Intelligence That Matters` through the columns containing `Trust Center`, contact emails, and Saudi/UAE locations. Exclude the empty FAQ above.

## 9. ATHR Gallery — editorial statement as the section opening

- **Live URL:** https://athrart.com/
- **Language:** English with Arabic language control; mixed-language press content appears in the feed
- **Exact section text / selector:** `main h2:has-text("ATHR AT ART BASEL, BASEL 2026")`; following carousel includes `Zahrah Alghamdi`, `Streams Move Oceans, 2026`, `Woven cotton, thread and polyester`, and `600 x 1500 cm`
- **What the screenshot proves:** An editorial/manifesto-like chapter does not need an eyebrow plus marketing paragraph. A bold statement can be followed by evidence-rich cultural metadata—maker, work, year, material, scale—letting curation itself communicate point of view.
- **Muse direction / section supported:** **Editorial / Think direction — manifesto or point-of-view statement.** Supports introducing Muse Think with a decisive line and curated evidence rather than explanatory corporate copy.
- **WAF status:** **Clear.** Carousel, metadata, and heading rendered live.
- **Recommended crop:** Start at `ATHR AT ART BASEL, BASEL 2026` and include one full artwork frame plus its artist/title/material/dimensions. End before `GALLERY NEWS`.

## 10. Salla — final CTA as a concise bookend

- **Live URL:** https://salla.com/
- **Language:** Arabic, native RTL
- **Exact section text / selector:** `h3:has-text("امتلك متجرًا احترافيًا في سلة")`; body `p:has-text("أنشئ متجرك الآن بأدوات مرنة وحلول متكاملة")`; CTA `a:has-text("أنشئ متجرك مجانًا")`
- **What the screenshot proves:** The final conversion block can be a compact restatement of the value proposition plus one action, rather than another feature section. It closes the page with the same verbal promise and CTA used earlier.
- **Muse direction / section supported:** **All directions — final CTA.** Supports a Muse closing statement that returns to the core identity and offers one unmistakable next step.
- **WAF status:** **Clear.** Final CTA rendered live near the footer; HTTP 200.
- **Recommended crop:** Capture only the CTA band: headline, one-sentence body, and button. Include a small amount of surrounding background to show the section boundary; exclude footer navigation.

## 11. Almosafer — action-first RTL hero with utility lanes

- **Live URL:** https://www.almosafer.com/ar
- **Language:** Arabic, native RTL
- **Exact section text / selector:** `h1:has-text("العالم ينتظرك")`; `h2:has-text("سافر حول العالم مع أكثر من 450 شركة طيران مميزة")`; service links immediately below include headings `النقل من المطار`, `eSIM`, `أرويا كروز`, and `قطار الحرمين`
- **What the screenshot proves:** A hero can combine an emotional identity line with a real action surface, then expose secondary lanes immediately below. The architecture moves cleanly from promise → task → adjacent offers.
- **Muse direction / section supported:** **Product / Build direction — identity hero plus offer routing.** Supports pairing Muse’s thesis with a concrete primary action and a compact set of downstream doors.
- **WAF status:** **Clear.** Full Arabic booking interface and service row rendered live; HTTP 200. The DOM is large and dynamic but usable.
- **Recommended crop:** Full-width hero from headline through the search module and the complete seven-item service-icon row. Stop before `عروض مميزة منّا لك`.

---

## Recommended evidence assignment to the walkthroughs

| Muse walkthrough moment | Primary screenshot | Alternate |
|---|---|---|
| Bilingual identity hero | ATHR Gallery (#1) | MOZN footer identity (#8) |
| Native RTL opening | Al Rajhi Bank (#2) | Almosafer (#11) |
| Distinct offer lanes | HungerStation (#3) | Salla (#4) |
| Proof / metrics | Salla (#5) | Al Rajhi Bank (#6) |
| Trust / credibility | Salla stories (#7) | MOZN trust footer (#8) |
| Manifesto / editorial statement | ATHR Art Basel (#9) | ATHR hero (#1) |
| Final CTA | Salla final CTA (#10) | HungerStation app CTA within the live page |

## Reachability / exclusion note

Tamkeen Bahrain was also re-checked because it is a useful Arabic-first GCC reference. Its HTML was retrievable and contained the previously banked text (`تمكين البحرينيين من الازدهار والمساهمة في تعزيز الاقتصاد الوطني`, `لطالما كانت تمكين محركا رئيسيا لاقتصاد البحرين`), but the visual browser received **403 Forbidden**. It is therefore **not included as screenshot evidence** here. This avoids presenting an uncapturable or reconstructed frame as live proof.
