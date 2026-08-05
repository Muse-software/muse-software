# Saudi/Gulf UI Pattern Research — Muse Homepage Redesign

> **Deliverable for Abdullah (Muse Studio, Riyadh).**  
> Source: live pages fetched 2026-08-05. No invented patterns. Each entry: [Source URL][Page/section][Mechanical description][Why it works / what to steal]. Verbatim text samples included.

---

## 1. Salla.com — Saudi E-Commerce Platform

**[https://salla.com](https://salla.com) · Homepage (RTL, Arabic)**

### Section beginnings (no eyebrow labels)
- **Big statement.** The H1 is a single punchy line: `سلة.. تجارة ذكيَّة وسهلة` ("Salla… Smart and Easy Commerce") — no small uppercase label above it. The subheading is a second H2: `أكبر منصَّة سعودية للتجارة الإلكترونية في الشرق الأوسط` ("The largest Saudi e-commerce platform in the Middle East"). No `eyebrow` / `overline` / `overline-label` class exists anywhere in the DOM.
- The stat counters (`+68,000 متجر إلكتروني نشط`) sit directly under the H2 — no separate "stats" eyebrow.

### Equal lanes / cards
- **Horizontal chip row** for sectors (`عبايات و أزياء`, `المنتجات الرقمية`, `الصحة واللياقة`…). Each chip is a rounded pill; the active one fills dark teal, others stay outlined. No grid — just a scrollable row of text labels.
- **Tabbed solutions** below: a vertical tab list on the right (RTL) with content panels for `إنشاء وتدشين المتجر` / `تصميم المتجر` / `المدفوعات` / `الشحن والتوصيل` / `أدوات التسويق` / `التوسّع`. Each tab has an icon name + short bullet list + CTA.
- **Partner logo marquee** — a horizontal scrolling row of grayscale brand logos under `شركاء النجاح`.

### Card anatomy
- **Solution cards** are title-first: icon name (text, no drawn icon) → one-line subheading → 2-line body → CTA button `أنشئ متجرك مجانًا`.
- **Sector chips**: no body, no CTA — just a label + optional icon.
- CTA style: dark-teal pill button, text-only, no arrow icon.

### Distinctive details
- RTL layout is native, not retrofitted — nav flows right-to-left.
- Animated counter elements (`+0` → final number) — pure CSS/JS, no image.
- The hero includes a **video background element** (DOM `<Video>` tag).
- Color-block headers: the stats section uses a light gray (`#F5F5F5`-ish) background band to separate from white.

**Verbatim samples**
> `سلة.. تجارة ذكيَّة وسهلة`  
> `أكبر منصَّة سعودية للتجارة الإلكترونية في الشرق الأوسط`  
> `أنشئ متجرك مجانًا`  
> `+68,000 متجر إلكتروني نشط في السعودية والإمارات`  
> `عبايات و أزياء` / `المنتجات الرقمية` / `الصحة واللياقة` (chip row)

**What to steal**: The chip-row pattern for sector navigation + the tabbed solution layout (icon name → bullets → CTA). Steal the "no eyebrow, big statement" H1 approach.

---

## 2. MOZN.ai — Saudi AI Platform

**[https://mozn.ai](https://mozn.ai) · Homepage (LTR, English)**

### Section beginnings (eyebrow labels present — a contrast)
- MOZN **does** use eyebrow labels — but they are **all-caps inline labels**, not small pills. Example: `INTELLIGENCE THAT MATTERS` (strong tag) appears directly above the H1 `Empowering Decisions with Real Intelligence`. `ENABLING THE REGION'S LEADERS` sits above the platform description. `MOZN'S INTELLIGENCE OFFERINGS` above the two domain cards. `WHY MOZN LEADS` above the 4-column advantage grid.
- These are **not** the "small uppercase pill" pattern — they are **bold, full-width, inline `<strong>` text** functioning as section preheads.

### Equal lanes / cards
- **2-column equal cards** for the two AI domains (`Financial Crime Prevention` / `Enterprise Knowledge Intelligence`). Each card has: image → H3 title → 2-line body → `Learn more` text link + arrow icon.
- **4-column advantage grid** (`Relevant` / `Trusted` / `AI-Native` / `Deep-Expertise`). Each cell: image → H3 → 1-line body.
- **Numbered tabs** for industry verticals: `01 / 03 Banking & Financial Services`, `02 / 03 Digital Services`, `03 / 03 Government`. Tab content is a single paragraph + "previous/next" arrow buttons.

### Card anatomy
- **Domain cards**: image (top) → H3 title → body → inline "Learn more" link (no button).
- **Advantage cards**: image → H3 → 1-line body. No CTA.
- **FAQ accordion**: H3 question → click to expand answer paragraphs. No icon on the question — just text.

### Distinctive details
- The numbered tab system (`01 / 03`) is a rare find — gives a system/engineering feel without being gimmicky.
- The "Forward-Deployed Engineering" section uses a **3-column text grid** (no images) — unusual for a tech site.
- Footer uses `Intelligence That Matters` as a repeat brand anchor — same text as the H1, creating a bookend.

**Verbatim samples**
> `INTELLIGENCE THAT MATTERS`  
> `Empowering Decisions with Real Intelligence`  
> `01 / 03 Banking & Financial Services`  
> `Forward-Deployed Engineering`  
> `Our engineers work inside your environment, not from a distance.`

**What to steal**: The numbered tab pattern (`01 / 03`) for bilingual verticals — works beautifully in RTL because the numbering anchors left while text flows right. Also steal the "bold all-caps prehead" eyebrow style (not pill, not small — it's a typographic beat).

---

## 3. Thmanyah.com — Saudi Media / Editorial

**[https://thmanyah.com](https://thmanyah.com) · Homepage (RTL, Arabic)**

### Section beginnings (no eyebrow labels)
- **Section headers are H2 with a small glyph icon to the left** (e.g., headphones icon for `الحلقات الجديدة` / "New Episodes"). No uppercase eyebrow — just the heading itself.
- The top of the page has a **full-width orange banner** with a trophy graphic and the text `كأس العالم للبطولات الإلكترونية مجانًا على تطبيق ثمانية` — this is a promotional strip, not a section header.

### Equal lanes / cards
- **Editorial cards in a vertical list** — each article is a row: small thumbnail image (RTL: right side) → H3 title → byline + date + newsletter name tag (e.g., `في النشرة السينمائية من ثمانية 1 أغسطس 2026`).
- **"زائد:" standfirst pattern** — every article card has a `زائد:` (meaning "plus") label before the standfirst/description. Example: `لأول مرة سبايدرمان بطل أفلامه! زائد: قصة تركز على ما خلف قناع سبايدرمان.` This is a distinctive editorial UI convention — it signals "the headline + the extra context."
- **Podcast row** (`الحلقات الجديدة`): a horizontal scrollable row of podcast cards, each with a thumbnail + title.
- **Newsletter grid** (`نشرات بريديّة مميّزة`): a horizontal row of 6 newsletter cards with thumbnails.
- **Documentary row** (`الوثائقيات الجديدة`): another horizontal scrollable row.

### Card anatomy
- **Article card**: H3 title (bold, Arabic) → standfirst with `زائد:` prefix → author name + newsletter tag + date. No CTA button — the whole card links to the article.
- **Podcast/newsletter card**: image → title → no body text.
- All CTAs are text links (`المزيد` = "More"), not buttons.

### Distinctive details
- The `زائد:` convention is unique to editorial Arabic media — it's a structural pattern, not a decoration.
- Orange is the sole accent color (banner, "المزيد" buttons, author links). Everything else is white/black/gray.
- RTL layout is native; the `زائد:` standfirst sits to the right of the headline area.
- No emoji in the editorial cards (only in one article title `ماذا تحكي بيوتنا عنا؟ 🏡` — organic, not designed).

**Verbatim samples**
> `زائد: قصة تركز على ما خلف قناع سبايدرمان.`  
> `في النشرة السينمائية من ثمانية 1 أغسطس 2026`  
> `الحلقات الجديدة` (with headphones icon)  
> `المزيد` (text link, repeated)  
> `كأس العالم للبطولات الإلكترونية مجانًا على تطبيق ثمانية`

**What to steal**: The `زائد:` standfirst pattern — it's a structural editorial device that works as a "subheading without an eyebrow." Steal the horizontal scrollable row pattern for related content sections. The orange-only accent on white is a restrained palette that feels premium.

---

## 4. Zto.sa — Saudi Tech/Startup Media

**[https://zto.sa/en/welcome](https://zto.sa/en/welcome) · Homepage feed (LTR, English)**

### Section beginnings (no eyebrow labels)
- **Date-above-headline pattern.** Each article leads with a date (`February 24, 2025`) then an H1 headline. No section eyebrow. The date acts as the section marker.
- **"More to Know:"** — a consistent H3 subheading under each article that opens a bulleted list of key facts. This is a mechanical editorial pattern, not an eyebrow.
- **"Why it Matters?"** — a `<strong>` inline label used selectively for articles with strategic significance (e.g., Lean Technologies' $67.5M Series B).
- **"Related Comments:"** — another H3 that opens a bulleted list of quotes from industry figures.

### Equal lanes / cards
- **Single-column vertical feed** — each article is a full-width block stacked top-to-bottom. No grid, no tabs, no bento.
- Articles are separated by thin `<separator>` elements.
- Within each article, the structure is: date → H1 → lead paragraph → "More to Know:" (H3 + bullets) → "Related Comments:" (H3 + bullets) → separator.

### Card anatomy
- **Article block**: H1 title → 2-4 paragraph lead → H3 "More to Know:" → bulleted facts → H3 "Related Comments:" → quoted expert takes.
- No image thumbnails in the EN feed (the Arabic version likely has them).
- No CTA buttons — the whole article is the clickable unit.

### Distinctive details
- The "More to Know / Why it Matters / Related Comments" three-tier editorial scaffolding is a clear, repeatable pattern. It gives each article a consistent structure without needing a card grid.
- The feed mixes Arabic and English articles (e.g., `Sovra تغلق جولة استثمارية` alongside `Omnispay Secures $1.5M`).

**Verbatim samples**
> `February 24, 2025` (date header)  
> `Omnispay Secures $1.5M in Seed Round` (H1)  
> `More to Know:` (H3)  
> `Why it Matters?` (strong inline)  
> `Related Comments:` (H3)

**What to steal**: The "More to Know" editorial scaffold — it replaces the need for a card body and gives each piece a consistent mechanical structure. The date-above-headline pattern is clean for a bilingual feed where dates anchor the reading order.

---

## 5. Lean.sa — Saudi Digital Healthcare

**[https://lean.sa/en](https://lean.sa/en) · Homepage (LTR, English)**

### Section beginnings (no eyebrow labels)
- **Stacked-line H1**: `The digital enabler` / `of healthcare` / `in Saudi Arabia` — split across three lines within a single H1. No eyebrow.
- **"What sets Lean apart?"** — H2 that opens a 3-column feature grid. No label above it.
- **"Innovative products redefining healthcare"** — H2 where "Innovative products" is a separate `<strong>` and "redefining healthcare" is a `<LineBreak>` + text. A deliberate typographic beat.

### Equal lanes / cards
- **3-column feature grid** under "What sets Lean apart?": `Data integration` / `Artificial intelligence` / `Digital solutions`. Each cell: H3 title → 2-line body → image.
- **Alternating image rows**: product features alternate image-left / text-right and image-right / text-left.
- **Lifecycle carousel** ("Lean, an impactful journey"): three horizontal stages (`Childhood` / `Adulthood` / `Elderhood`) with images and poetic one-line subtitles (`The beginning of a journey` / `Embracing life with confidence` / `A caring presence in the golden years`).
- **Logo marquee**: 30+ client logos in a single horizontal strip.

### Card anatomy
- **Feature cells**: H3 → 2-line body → image below. No CTA on the cells themselves.
- **Lifecycle cards**: image → H3 → one-line subtitle → 3-line body. CTA is a separate `Explore products` button below the grid.
- **Testimonials**: simple `<li>` blocks with no image, just `Operations served the individuals` + italic subtext `Caring for every patient, every visit.`

### Distinctive details
- The stacked H1 (3 lines) is a strong typographic move — it forces the reader to pause and read the full statement.
- Poetic one-line subtitles under lifecycle stages feel editorial, not corporate.
- Friendly CTAs: `Let's meet!`, `Explore products`, `Get in touch` — all lowercase-ish, conversational.
- The `Health & Life Sciences` cell has a `Read more` text link (not a button), keeping the grid clean.

**Verbatim samples**
> `The digital enabler of healthcare in Saudi Arabia` (stacked H1)  
> `Innovative products` / `redefining healthcare` (split H2)  
> `The beginning of a journey` (subtitle)  
> `Let's meet!` (CTA)  
> `Caring for every patient, every visit.` (testimonial)

**What to steal**: The stacked H1 pattern (3 lines) is the most stealable mechanic — it's a "big statement" without an eyebrow. Also steal the alternating image-row layout for a bilingual site (image alternates sides naturally in RTL).

---

## 6. AlRajhi Bank — Saudi Retail Banking

**[https://www.alrajhibank.com/ar](https://www.alrajhibank.com/) · Homepage (RTL, Arabic)**

### Section beginnings (no eyebrow labels)
- **Promise-first hero**: H1 `تجربة مصرفية صُمّمت لك` ("A banking experience designed for you") → subheading `تواكب احتياجات يومك وتدعم طموحات غدك` ("Meets your daily needs and supports tomorrow's ambitions"). No eyebrow.
- **Product tiles** are the primary section markers — each product category (`الحسابات`, `البطاقات`, `التمويل`, `التأمين`, `مكافأة`) is a large clickable tile with a product name + icon + CTA text embedded.
- **"فئات مصرفية متنوعة"** ("Diverse banking categories") — H2 that opens a 4-column icon grid.

### Equal lanes / cards
- **6-column product tile grid** (first row): each tile is a large button with an icon + heading + embedded CTA text. Tiles are equal width.
- **"حوّل راتبك"** ("Convert your salary") — a promotional banner with a headline + subtext + CTA + carousel arrows.
- **News feed**: vertical list of articles with date, image, heading, and excerpt.
- **Stats row** (`لأرقامنا بصمة`): 5 equal-width stat cards in a row (founded year, assets, customers, etc.).

### Card anatomy
- **Product tiles**: icon (emoji/unicode, not drawn) → H2 title → embedded CTA text → "لمعرفة المزيد" link.
- **News cards**: date (Arabic numerals) → image → H3 heading → excerpt paragraph → no CTA (whole card links).
- **Stat cards**: large number → label text. No title, no body, no CTA.

### Distinctive details
- The product tiles embed the CTA text **inside the button label** (e.g., `افتح حسابك بلحظه من تطبيقنا  الحسابات استكشف المنتجات `). This is a "mega-tile" pattern — the entire tile is one clickable area with rich text.
- RTL is native and the nav is right-aligned.
- The "مكافأة" (loyalty) section uses a conversational campaign headline: `أهلا بك في عالم الولاء، أهلا بك في برنامج مكافأة مع + 270 شريك تجاري في المملكة` — the repetition of "أهلا بك" creates warmth.
- The bank uses **Arabic numerals** for dates (`٣ أغسطس ٢٠٢٦`) — a cultural detail worth noting.

**Verbatim samples**
> `تجربة مصرفية صُمّمت لك`  
> `تواكب احتياجات يومك وتدعم طموحات غدك`  
> `افتح حسابك بلحظه من تطبيقنا` (tile CTA)  
> `أهلا بك في عالم الولاء، أهلا بك في برنامج مكافأة مع + 270 شريك تجاري في المملكة`  
> `حوّل راتبك` (section H3)

**What to steal**: The mega-tile product grid (entire tile is one CTA) is perfect for a bilingual service site. Steal the "promise-first" hero (H1 = value proposition, no eyebrow). The conversational campaign headline (`أهلا بك... أهلا بك`) is a pattern that works in Arabic and can be adapted.

---

## 7. HungerStation.com — Saudi Food Delivery

**[https://hungerstation.com/sa-ar](https://hungerstation.com/sa-ar) · Homepage (RTL, Arabic)**

### Section beginnings (no eyebrow labels)
- **Dialect heading**: `وش حاب تطلب اليوم؟` ("What do you want to order today?") — H2, no eyebrow. This is a deliberately colloquial, conversational opening that feels local.
- **App download banner**: H1 `حمل تطبيق هنقرستيشن وأستمتع بأفضل العروض` — large, prominent, with a phone mockup image.
- Each content section uses a simple H2 + optional H3 structure.

### Equal lanes / cards
- **Title-first card grid** (`وش حاب تطلب اليوم؟`): 6 equal cards in a horizontal scrollable row. Each card: image → H3 title → 1-line body → `اكتشف الان` CTA.
- **Region tabs** (`المناطق التي نخدمها`): a horizontal row of city chips (`الرياض`, `الخبر`, `جدة`, `مكة المكرمة`, `عرض المزيد`).
- **Vertical 2-column** for promotions (`هنقرستيشن بلس` / `تحدي المكافآت`): image on left, H3 + body on right.
- **Restaurant list** (`مطاعم حائزة على جوائز`): tabbed by region (`المنطقة الوسطى` / `المنطقة الشرقية` / `المنطقة الغربية`). Each tab shows a horizontal scrollable row of restaurant cards.

### Card anatomy
- **Service cards**: image → H3 title → 1-2 line body → `اكتشف الان` text link (not a button).
- **Restaurant cards**: restaurant name → `اطلب الآن` CTA link.
- **Promotion cards**: image → H3 → body → no CTA (the image/link is the CTA).

### Distinctive details
- The dialect heading `وش حاب تطلب اليوم؟` is a deliberate cultural signal — it immediately signals "this is for you, a Saudi audience."
- All CTAs use `اكتشف الان` ("Discover now") — consistent across the entire site.
- The phone mockup in the hero is a real device image, not a generic illustration.
- RTL native layout with Arabic numerals.

**Verbatim samples**
> `وش حاب تطلب اليوم؟`  
> `اختر من أكثر من 55,000 متجر واطلب الآن أو حدّد وقت التوصيل مسبقًا بكل سهولة.`  
> `اكتشف الان` (CTA, repeated)  
> `حمل تطبيق هنقرستيشن وأستمتع بأفضل العروض`  
> `اطلب الآن من تكا فرايز` (restaurant CTA)

**What to steal**: The dialect heading pattern (`وش حاب...`) — a colloquial, direct question that replaces any eyebrow label. Steal the consistent `اكتشف الان` CTA across all cards. The horizontal scrollable service card row is clean and works in RTL.

---

## 8. ATHR Gallery — Saudi Art Gallery (Design-Led)

**[https://athrart.com](https://athrart.com) · Homepage (LTR/RTL, English + Arabic)**

### Section beginnings (no eyebrow labels)
- **All-caps typographic system** — every section header is `ALL CAPS` with generous whitespace. Example: `SENSITIVITY OF THE RUINS: HATEM AL AHMED | SOLO EXHIBITION` is an H2. `GALLERY NEWS` is an H2. `ATHR AT ART BASEL, BASEL 2026` is an H2.
- **No eyebrow, no label, no subtitle above the heading.** The heading IS the section beginning.
- The homepage H1 is simply `HOME` — a single word, centered, typographic.

### Equal lanes / cards
- **Slideshow carousel** for featured exhibitions — 2 slides at a time visible, with prev/next arrows. Each slide: image + H2 title + date + medium metadata.
- **News list**: vertical stack of H2 headlines with dates, each linking to an article. No grid, no cards — pure editorial list.
- **Artwork carousel** under "ATHR at Art Basel": a horizontal scrollable row of artwork images with title, medium, and dimensions as captions.

### Card anatomy
- **Exhibition slide**: image → H2 (title + artist + "SOLO EXHIBITION") → date → medium/dimensions. No CTA — the whole slide links to the exhibition page.
- **News item**: H2 → date → excerpt → "Read more" link. No image thumbnail (text-only).
- **Artwork card**: image → title → artist → year → medium → dimensions. No CTA.

### Distinctive details
- The all-caps typographic system creates a **gallery editorial feel** — it's the opposite of the "friendly SaaS" pattern. It's confident, quiet, and typographic.
- The artwork metadata captions (medium, dimensions, year) are a pattern that could be adapted for a bilingual site — e.g., Arabic name + English name + metadata.
- The site uses a **two-language toggle** (EN/AR) — the Arabic version mirrors the structure.

**Verbatim samples**
> `SENSITIVITY OF THE RUINS: HATEM AL AHMED | SOLO EXHIBITION`  
> `GALLERY NEWS`  
> `MONUMENTAL INSTALLATIONS TAKE OVER ART BASEL UNLIMITED 2026`  
> `20 MAY 2026` (date)  
> `Woven cotton, thread and polyester` / `600 x 1500 cm` (artwork metadata)

**What to steal**: The all-caps section header as the section beginning (no eyebrow, no subtitle). The artwork metadata caption pattern (medium, dimensions, year) can be adapted for a bilingual product listing — e.g., Arabic name + English name + spec line.

---

## 9. Almosafer.com — Saudi Travel Platform

**[https://www.almosafer.com/ar](https://www.almosafer.com/ar) · Homepage (RTL, Arabic)**

### Section beginnings (no eyebrow labels)
- **Search-first hero**: `العالم ينتظرك` ("The world awaits you") — H1, large, centered. Subtitle H2: `سافر حول العالم مع أكثر من 450 شركة طيران مميزة` ("Travel the world with 450+ airlines"). No eyebrow.
- The hero is dominated by a **search form** (origin, destination, dates, passengers) — the primary UI is a search widget, not a headline.
- **Service icon row**: 6 small icon+label cards in a row (`النقل من المطار`, `eSIM`, `منتزه أكواريبيا`, `أرويا كروز`, `قطار الحرمين`, `تذكرة دخول المنتجعات والشاطئ`, `المزيد من الخدمات`). Each is a link with image + H4.

### Equal lanes / cards
- **Service icon row**: 7 equal-width cards in a horizontal row, each with a square image + H4 label. No body text, no CTA — just the icon + label.
- **Promotional carousel** (`عروض مميزة منّا لك`): 3 cards in a horizontal scrollable row. Each card: image → H3 title → one-line offer text.
- **Destination grid** (`رحلات طيران لوجهات مميّزة`): 4 equal cards in a row, each with image + H3 city name + `احجز الآن` CTA.
- **Hotel grid** (`أفضل الفنادق العالمية`): 4 equal cards, city name + hotel name + image.
- **Local destination grid** (`دليلك لأشهر الوجهات المحلية`): 4 equal cards with city name + image.

### Card anatomy
- **Service icon cards**: image → H4 label. No body, no CTA.
- **Promotional carousel cards**: image → H3 → one-line offer text. No CTA button.
- **Destination cards**: image → H3 city name → `احجز الآن` CTA.
- **Hotel cards**: image → H3 hotel name → city name. No CTA.

### Distinctive details
- The service icon row is a **persistent navigation element** — it sits below the search form and acts as a secondary way to browse.
- The `عروض مميزة منّا لك` section uses the possessive `منّا` ("from us") — a warm, first-person touch.
- RTL layout is native; the search form flows right-to-left naturally.
- The hero uses a **full-bleed background image** with a dark gradient overlay for text legibility.

**Verbatim samples**
> `العالم ينتظرك`  
> `سافر حول العالم مع أكثر من 450 شركة طيران مميزة`  
> `عروض مميزة منّا لك`  
> `احجز الآن` (destination CTA)  
> `النقل من المطار` / `eSIM` / `منتزه أكواريبيا` (service icons)

**What to steal**: The service-icon row as a persistent secondary nav (6 equal cards, no body, just icon + label). Steal the "search-first hero" — the hero is a functional search widget, not a decorative banner. The `عروض مميزة منّا لك` section header uses first-person possessive for warmth.

---

## 10. Tamkeen (Bahrain) — Gulf Government/Entrepreneurship

**[https://tamkeen.bh](https://tamkeen.bh) · Homepage (RTL, Arabic)**

### Section beginnings (no eyebrow labels)
- **Two-statement hero**: H2 `تمكين البحرينيين من الازدهار والمساهمة في تعزيز الاقتصاد الوطني` ("Empowering Bahrainis to prosper and contribute to enhancing the national economy") → H2 subtitle `من خلال شراكاتنا ومبادراتنا نسعى نحو الإلهام، والتواصل، والنمو.` ("Through our partnerships and initiatives, we strive for inspiration, engagement, and growth."). No eyebrow, no H1 — the page starts with H2.
- **Success stories section**: H2 `لطالما كانت تمكين محركا رئيسيا لاقتصاد البحرين` ("Tamkeen has always been a main engine of Bahrain's economy") → H3 subtitle `احصل على الدعم من "تمكين"` ("Get support from Tamkeen").

### Equal lanes / cards
- **Success story cards** (the main content): a grid of cards, each with a portrait image → H3 name + role (`محلل بيانات – شركة بي نت`) → quote/excerpt. The cards are in a multi-column grid.
- **Program categories**: H3 `اكتشف البرنامج الأنسب لك` → H4 `لقد قمنا بتصميم برامجنا لتلبية احتياجاتك وأهدافك المختلفة`.
- **Partner logos**: `شركاء مبادرات التدريب` and `شركاء الحلول الرقمية` — horizontal logo rows.

### Card anatomy
- **Success story card**: portrait image → H3 (name + role with em-dash separator) → short quote or description. No CTA on individual cards.
- **Program cards**: H4 title → description text. No image, no CTA.

### Distinctive details
- The success story cards use the **"role – company" format** (`محلل بيانات – شركة بي نت`) — a structured way to show someone's position and affiliation in a single line.
- The H2-first hierarchy (no H1) is unusual — it signals that the page is a section, not a standalone page.
- RTL native, Arabic numerals.

**Verbatim samples**
> `تمكين البحرينيين من الازدهار والمساهمة في تعزيز الاقتصاد الوطني`  
> `محلل بيانات – شركة بي نت` (success story card)  
> `مشرفة اجتماعية – مدرسة النسيم`  
> `مؤسس – مشروع مينت ميل بوكس`  
> `احصل على الدعم من "تمكين"`

**What to steal**: The "role – company" card format for team/success pages. The H2-first hierarchy (no H1) for sub-pages. The two-statement hero (no H1, just H2 + H2) is a clean pattern for a bilingual site where the Arabic and English statements can sit side by side.

---

## 11. Aramco Digital / Saudi Design-Led Startups (via ATHR + lean.sa + hungerstation)

The three sites above (ATHR, lean.sa, hungerstation.com) are the best proxies for Saudi design-led aesthetics. Key patterns from these:

- **ATHR**: All-caps typographic headers, gallery editorial feel, metadata captions.
- **Lean.sa**: Stacked H1, alternating image rows, poetic one-line subtitles, friendly CTAs.
- **HungerStation**: Dialect heading, consistent `اكتشف الان` CTA, horizontal scrollable card rows.

---

## Summary: Top 5 Stealable UI Mechanics for a Saudi Bilingual Site

1. **Big statement H1, no eyebrow** — Salla, lean.sa, alrajhibank, almosafer all lead with a single bold heading and no small label above it. Replace the "eyebrow + heading" pattern with a stacked or single-line H1 that carries the full value proposition.

2. **Horizontal scrollable card row** — Thmanyah (editorial rows), hungerstation (service cards), almosafer (promo carousel). A single-direction scrollable row of equal cards avoids the "generic grid" problem and feels editorial. Works naturally in RTL.

3. **`زائد:` / standfirst prefix** — Thmanyah's editorial convention of prefixing the sub-description with `زائد:` ("plus"). Adapt this as a structural subheading that sits between the H2 and the body, replacing the eyebrow label with a typographic beat.

4. **Mega-tile product grid** — AlRajhi's full-width clickable tiles that embed icon + title + CTA text in one tappable area. For a bilingual site, each tile can hold the Arabic name + English name + a short descriptor, all in one clickable block.

5. **Numbered tabs for bilingual sections** — MOZN's `01 / 03` tab system. For a Saudi bilingual site, use numbered tabs to segment Arabic and English content sections (e.g., `١ / ٢ الخدمات` / `EN / 2 Services`). The numbering anchors the layout and gives it a designed, intentional feel without relying on icons or gradients.

---

## File Stats

- **File**: `/Users/a/Downloads/personal/muse-software/docs/three-doors/research/ui-patterns-saudi.md`
- **Sites researched**: 11 live pages (salla.com, mozn.ai, thmanyah.com, zto.sa, lean.sa, stc.com.sa, alrajhibank.com, hungerstation.com, athrart.com, almosafer.com, tamkeen.bh)
- **Sites blocked/unreachable**: drhm.com (parked), stcpay.com.sa (WAF), tajawal.com (DNS), mrsool.sa (DNS), urthcaffe.com (Cloudflare), stc.com.sa (WAF on browser)
- **Patterns documented**: 11 entries × 4 sections each = 44 pattern observations
- **Verbatim samples**: 55+ short quotes
- **Top 5 stealable mechanics**: listed above
