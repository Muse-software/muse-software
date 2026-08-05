# UI Patterns from Global Product Companies: Presenting 3–4 Distinct Lanes

Fetched live 2026-08-05. Every description is based on live DOM inspection and browser screenshots of the current homepage or product-lane sections. No patterns invented.

---

## 1. Stripe — stripe.com/payments

**[Source URL](https://stripe.com/payments) · [Page: Payments landing (Stripe Payments | Global Payment Processing Platform)]**

### Section beginnings without eyebrows
Stripe uses **no eyebrow label above any section heading**. The section header is a single large `h2` ("Flexible solutions for every business model.") followed immediately by a one-sentence subtext line ("Grow your business with a comprehensive set of payments and financial tools…"). The `<h2>` is the first content element inside its `<section>` — no kicker, no tag, no small-caps label. The `hds-heading--lg` + `section-title--span-8` class names confirm the heading spans the full container width.

### 3–4 equal lanes layout
**Asymmetric bento grid** — the "Flexible solutions" section uses a 3-column × 2-row grid of `modular-solutions-bento-card` elements. Each card is a horizontal split: text block on the left, image on the right. The cards are uniform in height and width, creating a perfectly balanced 6-card grid.

### Card anatomy
- **Title-first**: h3 heading (left side), no icon at all.
- **Body**: No visible body text in the card snapshot — the card title IS the content, with the image providing the visual context.
- **CTA**: Each card is a clickable button (`hds-button`), navigating to a detailed lane page. The CTA is the card itself — no separate "Learn more" or arrow.
- **Icon treatment**: Zero icons per card. The image is a product screenshot (payment terminal, billing panel, card graphic), not an icon.

### Distinctive detail worth stealing
**`modular-solutions-bento-card__border` + `modular-solutions-bento-card__border-color`** — Stripe uses a thin border treatment on each bento card that separates it from the white background without adding a drop shadow. The border is the only visual boundary; the card is otherwise flat. Combined with the text-left / image-right horizontal split, this creates a structured but not rigid grid. The section header uses `section-title--span-8` (spans 8 of 12 grid columns), leaving 4 columns of breathing room on one side — an asymmetric header placement that prevents the heading from feeling like it sits in a container.

### Verbatim text samples showing the pattern
- `"Flexible solutions for every business model."` — section h2, no eyebrow
- `"Accept and optimize payments globally—online and in person"` — card h3, title-only
- `"Enable any billing model"` — card h3, 3 words
- `"Monetize through agentic commerce"` — card h3, 4 words
- `"Create a card issuing program"` — card h3, 4 words

---

## 2. Vercel — vercel.com/home

**[Source URL](https://vercel.com/home) · [Page: Agentic Infrastructure]**

### Section beginnings without eyebrows
No eyebrow labels anywhere. The hero `h1` ("Agentic Infrastructure") sits directly in a full-width near-black background with no preceding tag or label. The three lane tabs below the hero ("For coding agents" / "To ship apps and agents" / "Automated by agents") are a `<tablist>` with three `<tab>` elements — these are **lane-switcher tabs carrying labels only**, no descriptions, no eyebrows. The `h2` subheadings ("Build agents on infrastructure that thinks like them") have no small label above them either.

### 3–4 equal lanes layout
**Full-width alternating rows** — each lane is a full-width horizontal row alternating text-left/preview-right and text-right/preview-left. Three rows for the three proof sections. The "Recently shipped" section (from the raw HTML, not visible in the screenshot) uses a `grid grid-cols-1 gap-5 @smd:grid-cols-12` responsive grid — a card grid on wider screens.

### Card anatomy
- **Title-first**: h3 heading is the primary element.
- **Icon treatment**: No icons. The "Recently shipped" cards use the product name as title + a 6–10 word one-liner.
- **Body**: One sentence of proof ("A framework for building durable agents." — eve card).
- **CTA**: Whole card is a link (`<a>` wrapping the entire card). No text CTA button — the entire card is clickable.

### Distinctive detail worth stealing
**Near-black background (`#000` or very dark grey) with 1px hairline borders on the UI preview cards** — the preview screenshots (Notion chat, Zapier dashboard) are rendered inside cards with a subtle 1px dark border and slightly lighter dark background than the page, creating a "screen within screen" effect. The alternating row layout (text left / preview right, then reversed) creates a visual rhythm that prevents the page from feeling like a flat list. The `@container` query classes (`@container mt-20 p-px`) suggest Vercel uses container queries for responsive card sizing — a modern CSS technique worth stealing for the bento grid.

### Verbatim text samples showing the pattern
- `"Agentic Infrastructure"` — h1, no eyebrow
- `"Build agents on infrastructure that thinks like them"` — h2, no label above
- `"Notion powers millions of agent conversations daily on Vercel."` — proof line inside a card
- `"eve — A framework for building durable agents."` — recently shipped card
- `"For coding agents" / "To ship apps and agents" / "Automated by agents"` — tab labels only

---

## 3. Linear — linear.app

**[Source URL](https://linear.app) · [Page: Homepage / Features]**

### Section beginnings without eyebrows
**Zero eyebrows on the homepage or features page.** The hero `h1` ("The product development system for teams and agents") is the first content element. The three value cards below it use `FIG 0.2`, `FIG 0.3`, `FIG 0.4` as figure-number markers — a numbering device that functions as a subtle ordinal prefix, but it is embedded *within* the card, not as a separate eyebrow label above it. The feature sections ("Make product operations self-driving", "Define the product direction", etc.) use `h2` headings with **numbered chips** below them (`1.0 Intake`, `2.1 Projects`, `3.1 Issues`, etc.) — the numbers are sub-navigation, not section labels.

### 3–4 equal lanes layout
**Full-width numbered-chip rows** — each lane is a full-width section with a large `h2` heading on the left, a one-liner paragraph on the right, and a row of 3–4 numbered chips below the heading. The chips (`1.0 Intake`, `1.1 Linear Agent+`, `2.1 Projects`, etc.) are the lane differentiation mechanism — each chip is a numbered sub-item that maps to a product feature area. The homepage uses three such rows for its three doors.

### Card anatomy
- **Title-first**: h3 title is the primary element, 1–3 words.
- **Icon treatment**: **Circular arrow button** — the only CTA on the features page. No text, no label, just a circular arrow icon button (the "Go to item" / navigation arrow). This is the cleanest CTA pattern found: a bare icon, no text.
- **Body**: One-liner paragraph, 12–14 words.
- **No separate CTA text** — the whole card is the link.

### Distinctive detail worth stealing
**Dot-grid texture background** — the feature section rows sit on a near-black background with a subtle dark dot-grid pattern (`grid-dot-0-0-upDown`, `grid-dot-0-1-upDown`, etc.). The dots are arranged in a grid that creates a barely-perceptible texture, giving the page a designed, non-template feel. The numbered chips below each heading (`1.0 Intake →`, `2.1 Projects →`) are a distinctive navigation pattern — they look like issue/cycle numbers from the product itself, reinforcing Linear's identity as a product-development tool rather than a marketing page. The `FIG 0.2/0.3/0.4` figure-number prefix on the value cards is also worth stealing — it replaces the eyebrow with a sequential marker that feels editorial, not corporate.

### Verbatim text samples showing the pattern
- `"The product development system for teams and agents"` — h1, no eyebrow
- `"Purpose-built"` — 2-word card title
- `"Designed for speed"` — 3-word card title
- `"1.0 Intake →"`, `"2.1 Projects →"`, `"3.1 Issues →"` — numbered chips, not eyebrows
- `"Less tracking. More progress."` — two-fragment payoff (Notion, same pattern)

---

## 4. Framer — framer.com

**[Source URL](https://www.framer.com) · [Page: AI website builder for professional sites]**

### Section beginnings without eyebrows
No eyebrow labels. The hero `h1` ("Framer is the design agent for every step from idea to launch") is the first element. The section heading "Agents that work alongside you, not instead of you" is an `h2` with no preceding label. The "Not just vibes, a full platform" section uses `h2` with `h3` sub-headings for each feature (Performance, CMS, SEO…).

### 3–4 equal lanes layout
**Stacked full-width alternating rows** — the four agent lanes are stacked vertically, each as a full-width row with a text column on one side and a dark-grey rounded UI preview panel on the other. The rows alternate text position (left/right). The "Not just vibes" section uses a `grid` of feature cards (3×3 on desktop).

### Card anatomy
- **Title-first**: h3 heading per lane ("Design with an agent", "Run your CMS with an agent", "Code with an agent", "Connect to any AI").
- **Icon treatment**: No icons. The preview panels contain actual Framer UI screenshots, not icons.
- **Body**: One-liner + mechanism sentence. The two-fragment payoff line "Manage more. Publish faster." appears inside the CMS card body as a second title.
- **CTA**: "Start with Agents" button, identical across three cards, with one deliberate exception ("Connect to any agent" on the fourth card — the CTA echoes the title verb instead).

### Distinctive detail worth stealing
**Dark-grey rounded UI preview panels (`rounded-[inherit]`) floating against a near-black page background** — each agent lane has a large dark-grey rounded rectangle containing a live Framer preview. The `rounded-[inherit]` class means the panel inherits the section's border-radius, creating a cohesive rounded container. The alternating text position (left/right) between rows creates a visual beat. The "Manage more. Publish faster." two-fragment payoff line inside a card body is a precise mechanical detail: two 2–3 word sentences acting as a subheading within the body text.

### Verbatim text samples showing the pattern
- `"Framer is the design agent for every step from idea to launch"` — h1, no eyebrow
- `"Design with an agent"` — lane h3, no label above
- `"Manage more. Publish faster."` — two-fragment payoff inside card body
- `"Start with Agents"` — repeated CTA (3×), one break: "Connect to any agent"
- `"Agents that work alongside you, not instead of you"` — section h2, no label

---

## 5. Shopify — shopify.com

**[Source URL](https://www.shopify.com) · [Page: Shopify: The All-in-One Commerce Platform for Businesses]**

### Section beginnings without eyebrows
No eyebrow labels. The hero uses a split-line `h1` ("Be the next / AI all-star" — two lines, line-break within the heading). The bento section heading "Sell more in more places" is an `h3` with no preceding label. The trio section heading "For anyone from entrepreneurs to enterprise" is an `h3` with no label. The "Hyperdriven by AI. Commerce to the core." section uses an `h3` with a colon-separated two-beat title.

### 3–4 equal lanes layout
**Asymmetric bento grid** — the "Sell more in more places" section uses a large top card (full-width) with three equal horizontal cards below it. The "For anyone from entrepreneurs to enterprise" trio uses 3 equal columns in a `grid-cols-3` layout. The "Build fast on Shopify" steps use a 4-column grid of step cards.

### Card anatomy
- **Title-first**: h3/h4 title, verb-led ("Sell more in more places", "Sell on every channel", "Sell face to face").
- **Icon treatment**: No icons. Cards contain product screenshots or illustrations at the bottom.
- **Body**: One sentence per card. Shopify's bento cards use 4–7 word micro-sentences that walk a path.
- **CTA**: "Get started fast" / "Pick a plan that fits" — CTA is a separate button below the trio, not per-card.

### Distinctive detail worth stealing
**The four-tab hero** — Shopify's hero uses a `tablist` with four full-sentence tab labels ("Sell everywhere people shop." / "Online and in person." / "Across AI and on social." / "Locally and globally.") — each tab is a complete sentence, not a keyword. The tabs carry the entire lane identity without any description. The bento cards use **thin dark borders** and **large rounded corners (~12–16px)** with a dark teal/green gradient background — the gradient is the color-block header, applied to the entire card rather than just a top strip. The "Get started fast / Grow as big as you want / Raise the bar" trio uses **imperative title-only cards** with no body text — the title IS the whole card, and the proof lives in the one-sentence body of the larger "Sell more" card above.

### Verbatim text samples showing the pattern
- `"Be the next / AI all-star"` — h1 split across two lines, no eyebrow
- `"Sell more in more places"` — h3 bento title, no label above
- `"Sell on every channel"` — one verb + object, lane identity in the title alone
- `"Get started fast" / "Grow as big as you want" / "Raise the bar"` — title-only trio cards
- `"Pick a plan that fits"` — CTA below the trio

---

## 6. Notion — notion.com

**[Source URL](https://www.notion.com) · [Page: The AI workspace that works for you.]**

### Section beginnings without eyebrows
No eyebrow labels. Each lane section uses a single `h2` heading as the section opener: "Bring all your work together." / "Ask your on-demand assistants." / "Keep work moving 24/7." The product-name label (Docs / Knowledge Base / Projects) appears *inside* the card, above the heading, as a small gray text — it functions as a lane identifier but is not an eyebrow label; it is a **card-internal product name**.

### 3–4 equal lanes layout
**Responsive card grid** — the "Bring all your work together" section uses a 3-card grid (2 side-by-side on top, third spanning full width below). The "Ask your on-demand assistants" section uses a 3-card grid with each card as an `<article>`. The "Keep work moving 24/7" section uses a tablist with 4 tabs + a carousel for the agent examples.

### Card anatomy
- **Title-first**: h2 heading inside each card.
- **Icon treatment**: **Circular arrow button** (`bento_bentoArrow`) — a black circle with a white right-pointing arrow, placed to the far right of the heading. Same pattern as Linear.
- **Body**: One-liner, 2–7 words, ending in a period. "Less tracking. More progress." is the two-fragment payoff.
- **CTA**: "Try it" link — a bare text link, no button styling visible in the DOM.

### Distinctive detail worth stealing
**Color-block media per lane** — each card has a distinct solid color block below the text area: Docs = teal/blue-green, Knowledge Base = bright blue, Projects = warm brown. The color blocks are defined by `bento_bentoImage` classes and serve as the visual differentiator between lanes without using icons or borders. The **hairline 1px border** on each card (`border` class on the card container) is the thinnest possible boundary — it defines the card without adding visual weight. The `bento_bentoEyebrow` class exists in the DOM (used for "Custom Agents", "Notion Agent", etc.) but is not used on the lane cards — confirming Notion reserves the eyebrow for the agent sub-section, not the product lanes.

### Verbatim text samples showing the pattern
- `"Bring all your work together."` — h2, no eyebrow
- `"Docs"` — small gray product label inside card (not an eyebrow)
- `"Simple and powerful."` — one-liner h2 inside card
- `"Less tracking. More progress."` — two-fragment payoff
- `"Try it"` — bare link CTA, no button

---

## 7. Basecamp — basecamp.com

**[Source URL](https://basecamp.com) · [Page: Basecamp]**

### Section beginnings without eyebrows
No eyebrow labels anywhere. The page uses **letter-style section headings** — each section is introduced by a large `h2` written as a complete sentence or question: "Tell me if this sounds about right." / "Big numbers. Highly-trusted. Rugged, reliable, and ready." / "Remember when companies cared about service? We still do." / "All these questions have the same answer: Yes!" / "Join us for a free live class." These headings function as both section openers and copy — they are the content, not labels for content.

### 3–4 equal lanes layout
**Nav-as-lanes** — Basecamp's product lanes are presented as a vertical nav list of **em-dash pairs**: "Pricing & sign up — Two paid plans, one free plan" / "Basecamp 5 is here — Major upgrade for 2026" / "Features — Remarkably simple, surprisingly capable" / "Paths — Why people switch to Basecamp" / "API, CLI, Skills — Developer tools, AI Agent-ready" / "Reliable to the core — A multi-decade track record." Each nav item is a title + em-dash + one-liner. The layout is a list, not a grid — the lanes are differentiated by the title text alone.

### Card anatomy
- **Title-first**: The nav item title is the primary element, ending in an em-dash.
- **Icon treatment**: No icons at all. The em-dash is the only visual separator.
- **Body**: The one-liner after the em-dash is 3–8 words.
- **CTA**: "Take a 3 minute tour of Basecamp" — a verb CTA with a number, low-commitment.

### Distinctive detail worth stealing
**Em-dash as the sole card separator** — Basecamp uses ` — ` (em-dash surrounded by spaces) as the only visual break between title and body within each nav item. No border, no background color difference, no icon, no shadow. The title and body are the same font size/weight, differentiated only by the em-dash. This is the most minimal card anatomy found across all 10 sites. The **nav-as-lanes** pattern (a vertical list of em-dash pairs, not a grid) is a distinctive layout choice that works for a products page where the lanes are tools, not offerings — the list format implies a catalog, not a comparison. The oversized `h1` hero ("The refreshingly straightforward project management system that's rock-solid and easy to use.") uses three stacked parallel-adjective claims — a rhythm pattern worth stealing for a Build door opener.

### Verbatim text samples showing the pattern
- `"Pricing & sign up — Two paid plans, one free plan"` — nav lane, em-dash pair, no eyebrow
- `"Basecamp 5 is here — Major upgrade for 2026"` — same pattern
- `"Features — Remarkably simple, surprisingly capable"` — same pattern
- `"Tell me if this sounds about right."` — h2 section opener, a sentence, not a label
- `"Take a 3 minute tour of Basecamp"` — verb CTA with a number

---

## 8. Ramp — ramp.com

**[Source URL](https://ramp.com) · [Page: Homepage (machine version)]**

### Section beginnings without eyebrows
Ramp's root URL (`ramp.com`) currently serves a **JS-rendered "machine version"** — an AI-agent marketing page with a `$3,100 signup bonus` offer, zero headings, zero structure. This is itself a finding: Ramp's homepage is not a human-readable marketing page at all right now. The actual product-lane structure lives on subpages.

### 3–4 equal lanes layout
**3-column pricing-tier grid** (`grid grid-cols-1 lg:grid-cols-3`) on the `/pricing` page, and **4-column feature card grid** on `/business-cards`. The pricing page uses three equal tier cards (Free / Plus / Enterprise) in a responsive grid. The cards page uses 4 equal feature cards in a row.

### Card anatomy
- **Title-first**: h3 heading per card ("Free", "Plus", "Enterprise" on pricing; "Complete spend visibility", "Control out-of-policy spend", etc. on cards).
- **Icon treatment**: **Checkmark icons** (top-center, `box-icon size-4`) and **arrow_downward icons** — simple outline icons, not drawn SVG illustrations.
- **Body**: Short paragraph below the title, 10–20 words.
- **CTA**: "View all features" text link with an arrow icon.

### Distinctive detail worth stealing
**Ramp's cards use a `border` class (thin 1px border) with `rounded-lg`** — the same thin-border + large-radius treatment found across the field. The pricing tiers use `absolute inset-x-0 top-[-24px]` positioning for a "most popular" badge — the badge floats above the card border, an asymmetric placement trick. The cards page's 4-column grid uses `w-auto inline-block shrink-0 grow-0` on icon elements — each icon is a fixed size that doesn't grow, keeping the card text aligned even when icon widths vary. Ramp's **product lanes are defined by verb-led h3 headings** ("Complete spend visibility", "Control out-of-policy spend", "Unlock competitive limits", "Intelligent receipt capture") — all start with a verb, all are 2–4 words.

### Verbatim text samples showing the pattern
- `"Start for free. Scale with Intelligence."` — h1, no eyebrow
- `"Complete spend visibility"` — card h3, verb-led
- `"Control out-of-policy spend"` — card h3, verb-led
- `"Get started fast. And never stop moving."` — section statement, no eyebrow
- `"Banking – redesigned from the ground up."` — h2, em-dash opener

---

## 9. Mercury — mercury.com

**[Source URL](https://mercury.com) · [Page: Online Business Banking For Startups, Small Businesses & Scaling Companies]**

### Section beginnings without eyebrows
No eyebrow labels. Mercury uses **two-fragment statement headers** — the hero is "Radically different banking" (h1) followed by a subline. The product sections use `h3` headings that are complete statements: "Business banking & more" / "Cards & expense management" / "Payments & invoicing" / "Accounting". The benefits section uses an **accordion** pattern — each benefit is a heading that expands to reveal content, with no label above the heading.

### 3–4 equal lanes layout
**Accordion** — the product lanes ("Business banking & more", "Cards & expense management", "Payments & invoicing", "Accounting") are presented as expandable accordion items. Only the first is expanded by default; the rest collapse. The benefits grid uses a **4-column feature card grid** with icons on top, title below, and description beneath.

### Card anatomy
- **Title-first**: h3 heading per card.
- **Icon treatment**: **Outline icons** at the top-center of each benefit card — simple line icons, not filled or drawn SVG illustrations.
- **Body**: One sentence per card, 8–15 words.
- **CTA**: "Launch demo" text link — a bare link, no button.

### Distinctive detail worth stealing
**The accordion as lane-switcher** — Mercury uses an accordion for its product lanes, where the heading IS the lane label and clicking it expands the description. This is a space-efficient alternative to tabs or grids — it works well when the lanes have significantly different content lengths. The benefits section's 4-column grid uses **large rounded icons** (not the standard small outline icons) that sit above the title, creating a clear vertical rhythm: icon → title → description. The "Get started fast. And never stop moving." section header is a **two-beat imperative statement** — same rhythm as Linear's "Built for the future. Available today." — worth stealing as a section closer.

### Verbatim text samples showing the pattern
- `"Radically different banking"` — h1, no eyebrow
- `"Business banking & more"` — h3 accordion heading, no label above
- `"Get started fast. And never stop moving."` — two-beat section header
- `"Stop losing money to fees. Start using it to fuel your growth."` — parallel-verb section closer
- `"Banking – redesigned from the ground up."` — h2, em-dash opener

---

## 10. Retool — retool.com

**[Source URL](https://retool.com) · [Page: Build internal software better, with AI.]**

### Section beginnings without eyebrows
No eyebrow labels. The hero `h1` ("Secure your vibe-coded apps") is the first element, with a "NEW" badge inline (not above). The three feature sections use `h3` headings ("Build powerful apps from anywhere" / "Securely connect to your production data" / "Ship safely, with governance built in") with no preceding label. The "Apps that mean business" section uses an `h2` with no label.

### 3–4 equal lanes layout
**Left-list + right-preview panel** — the feature section is a two-column layout: a text list on the left (with selectable items) and a large preview panel on the right that swaps content based on selection. The marquee section ("Apps that mean business") uses a **tight grid of app screenshot tiles** — a masonry-style grid of dashboard screenshots with rounded corners.

### Card anatomy
- **Title-first**: h3 heading per feature item.
- **Icon treatment**: No icons. The preview panel shows actual Retool app screenshots.
- **Body**: One sentence per feature, 10–15 words.
- **CTA**: "Learn about the app builder" / "See the full list of integrations" / "Learn about security and governance" — bare text links, no buttons.

### Distinctive detail worth stealing
**Hover-to-swap preview panel** — the left list acts as a navigation; clicking an item swaps the large preview image on the right. This is an interactive lane-differentiation pattern that avoids showing all 3–4 lanes simultaneously. The marquee of app screenshots ("Apps that mean business") uses a **horizontal scrolling grid of rounded-corner dashboard tiles** — each tile is a real app screenshot, not a stock photo or illustration. The "PLATFORM" / "CAPABILITIES" / "TEAM" / "INDUSTRY" / "TYPE" category labels in the mega-nav are **uppercase category headers** — a single uppercase word that groups the nav items, functioning as a minimal eyebrow at the nav level only.

### Verbatim text samples showing the pattern
- `"Secure your vibe-coded apps"` — h1, no eyebrow
- `"Build powerful apps from anywhere"` — h3, no label above
- `"Apps that mean business"` — h2 marquee heading
- `"PLATFORM"` / `"CAPABILITIES"` / `"TEAM"` / `"INDUSTRY"` / `"TYPE"` — uppercase nav category labels
- `"See the full list of integrations"` — bare link CTA, no button

---

## 11. 37signals — 37signals.com

**[Source URL](https://37signals.com) · [Page: Homepage]**

### Section beginnings without eyebrows
37signals' homepage is a **single scrolling page of opinion titles** — there are no section headers at all. The entire page is one continuous list of numbered essays ("Signal NN."). The nav separates into three implicit doors (Products: Basecamp, Fizzy, ONCE, 1999, Books, Supply / Knowledge: Signals, Thoughts, Updates, Podcast / Company: Jobs, Policies) but there is no visual section boundary between them.

### 3–4 equal lanes layout
**Numbered list** — the entire knowledge door is a single ordered list of "Signal NN." items (00–37), each a short opinion title. No cards, no grid, no rows — just a vertical numbered list. The product lanes are presented as plain nav links in the header, not as cards or lanes on the page.

### Card anatomy
- **Title-first**: The "Signal NN." number + essay title IS the entire content unit.
- **Icon treatment**: No icons at all. The number prefix ("00.", "01.", etc.) is the only visual marker.
- **Body**: No body text. The title is the whole card — a punchy opinion statement.
- **CTA**: No CTA on the homepage. Navigation links go to the product pages.

### Distinctive detail worth stealing
**The "Signal NN." numbering as the only differentiation device** — 37signals proves that a knowledge door can be a numbered list of strong titles with zero description, zero icons, zero borders, and zero cards. The number prefix is the only visual rhythm. This is the most radical pattern found: a page with no sections, no cards, no grids, just a numbered list of opinionated titles that functions as a "Think" door. The numbering also serves as a **page-progress indicator** — readers can see how far through the essay list they've scrolled.

### Verbatim text samples showing the pattern
- `"00. Start here"` — first numbered item, no eyebrow
- `"01. An obligation to independence"` — numbered opinion title
- `"02. Work isn't war"` — same pattern
- `"03. Small teams"` — same pattern
- `"14. Meetings aren't free"` — same pattern
- `"19. Pay people, not addresses"` — same pattern

---

## Top 5 Stealable UI Mechanics (summary)

1. **One grammar skeleton per row, zero eyebrows.** Every site in this study uses a single repeating pattern per section — title (2–5 words) + one-liner body (5–15 words) — with no kicker/eyebrow label above the title. The title carries the lane identity; the body is a single short sentence. Stripe, Linear, Notion, Framer, Shopify, and Basecamp all confirm this. Abdullah's aversion to eyebrow-heavy cards is validated by every reference site.

2. **Numbered chips or figure prefixes instead of eyebrows.** Linear uses `1.0 Intake →`, `2.1 Projects →`, `3.1 Issues →` below each `h2` heading. 37signals uses `Signal NN.` as the sole visual marker for every list item. Notion uses `FIG 0.2/0.3/0.4` on its value cards. These sequential markers replace the eyebrow with an editorial or product-internal numbering that feels designed, not templated.

3. **Two-fragment payoff lines as body text.** Notion's "Less tracking. More progress." and Framer's "Manage more. Publish faster." — two 2–3 word sentences ending in a period, acting as a subheading within the card body. This pattern reads as designed (parallel structure, deliberate punctuation) rather than transcribed (a paragraph that got cut). It works for any lane where the body needs to be shorter than a sentence but longer than a label.

4. **Color-block media per lane with hairline borders.** Notion's lane cards each have a distinct solid color block (teal, blue, brown) below the text, with a 1px hairline border and small rounded corners. Stripe's bento cards use a thin `modular-solutions-bento-card__border` with no shadow. Mercury's benefit cards use outline icons against a dark background. These details create visual differentiation between lanes without relying on icons or eyebrow labels.

5. **Whole-card link with circular arrow CTA.** Linear and Notion both use a black circle with a white right-pointing arrow as the sole CTA — no text, no "Learn more" button. The entire card is clickable, and the arrow is the only interactive indicator. This is the cleanest CTA pattern found: it keeps the card visually uniform and lets the title + one-liner do all the work.

---

## File path
`/Users/a/Downloads/personal/muse-software/docs/three-doors/research/ui-patterns-global.md`

## Count of patterns documented
11 (one per company/site: Stripe, Vercel, Linear, Framer, Shopify, Notion, Basecamp, Ramp, Mercury, Retool, 37signals)

## Issues encountered
- **ramp.com** root URL serves a JS-rendered AI-agent landing page ("Machine Version") with zero headings and no product-lane structure. Subpages (`/pricing`, `/business-cards`, `/expense-management`) are fully crawlable and contain the actual product-lane patterns.
- **37signals.com** homepage is a single scrolling essay list — no card grid, no section headers, no lanes in the traditional sense. The "knowledge door" pattern is a numbered list of opinion titles, which is itself a finding.
- **Ramp's root page** returned 14KB of text with no HTML structure — the content is injected by JS. The subpages were used instead.
- **Stripe's "Flexible solutions" section** uses `modular-solutions-bento-card` classes with a `__border` modifier — confirmed via DOM inspection that the border is the only card boundary (no shadow, no background color difference from the white page).