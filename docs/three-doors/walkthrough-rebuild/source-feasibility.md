# Live Source Screenshot Feasibility

Date: 2026-08-05
Viewport tested: 1440 x 900
Method: live Playwright navigation and screenshot, not cached research images

## Clean, readable candidates

### Linear

- URL: https://linear.app
- HTTP 200.
- Clean marketing page.
- Strong evidence for title-first sections, balanced lanes, no per-card eyebrows and dark product framing.

### Salla

- URL: https://salla.com/en
- HTTP 200.
- Clean marketing page.
- Strong Saudi evidence for balanced solution lanes and bilingual card-density comparison.

### Mozn

- URL: https://www.mozn.ai/
- HTTP 200.
- Real page with a narrow announcement strip only.
- Strong Saudi evidence for domain lanes, Forward-Deployed Engineering and FAQ structure.

### 37signals

- URL: https://37signals.com
- HTTP 200.
- Clean, highly legible knowledge index.
- Strong evidence for treating published thinking as a first-class door rather than a generic blog card.

### Basecamp

- URL: https://basecamp.com
- HTTP 200.
- Clean and highly legible.
- Strong evidence for sentence-led argument sections and title plus one-line navigation pairs.

### Notion

- URL: https://www.notion.com
- HTTP 200.
- Clean marketing page.
- Strong evidence for stacked statement rhythm, title-first bento sections and whole-card navigation.

### Stripe Payments

- URL: https://stripe.com/payments
- HTTP 200.
- Clean marketing page.
- Strong evidence for proof-rich product UI, structured bento layouts and restrained card boundaries.

### Thmanyah

- URL: https://thmanyah.com
- HTTP 200.
- Clean Arabic editorial page.
- Strong Saudi evidence for native RTL editorial structure, section headings without eyebrows and published knowledge as product.

## Usable after consent or banner cleanup

### Netlify

- URL: https://www.netlify.com
- HTTP 200.
- Real page, but the top testing strip and bottom consent widget should be removed or dismissed before final evidence capture.
- Potential evidence for path sequencing and distinct verb CTAs.

### Framer

- URL: https://www.framer.com
- HTTP 200.
- Real page, but a small consent bubble should be dismissed.
- Potential evidence for live product previews and shipped-work presentation.

### HungerStation

- URL: https://hungerstation.com/sa-ar
- HTTP 200.
- Real Arabic page, but a bottom consent bar should be dismissed.
- Potential evidence for colloquial Arabic section openings and consistent card CTAs.

## Rejected from the evidence appendix

### ATHR Gallery

- URL: https://athrart.com
- HTTP 200.
- The first viewport renders mostly blank before consent and is poor evidence at the current capture state.
- Do not include merely because it appeared in earlier research.

## Recommended evidence allocation

### Direction 1

- Salla: balanced solution lanes and EN/AR density.
- Linear: title-first equal lanes without per-card eyebrows.
- 37signals or Thmanyah: public thinking treated as a real product lane.

### Direction 2

- Basecamp: sentence-led argument flow.
- Netlify: sequential paths and distinct verb CTAs, only after clean capture.
- Mozn: local how-we-work and FAQ structure.

### Direction 3

- Stripe: product UI and proof-rich bento organization.
- Notion: shipped-work framing and whole-card navigation.
- Framer or Mozn: visible product previews or local proof, only if the final capture cleanly shows the cited pattern.

Every final evidence figure still needs an exact section target, a visible pattern caption, capture date and direct URL.

## Expanded independent set, live recheck

The broader independent shortlist was also browser-rendered on 2026-08-05.

### Clean or easy to clean

- Figma, HTTP 200. Live identity hero. A temporary event strip must be dismissed before capture.
- Retool, HTTP 200. The required Standard and quantified proof headings remain live. A central promotional modal must be closed before capture.
- Mercury, HTTP 200. Clean hero, metrics statement and final CTA headings remain live.
- Intercom, HTTP 200. The trust architecture heading remains live. A narrow announcement strip may be removed if it enters the crop.
- GitHub, HTTP 200. Clean manifesto-like hero remains live.
- Al Rajhi Bank, HTTP 200. Native RTL hero and `لأرقامنا بصمة` metrics heading remain live.
- Almosafer, HTTP 200. Native RTL action-first hero remains live.

### Live drift that affects selection

- Webflow is live, but the previously researched `Webflow is the agentic web marketing platform...` section text has changed. Current top-level language is `Make your website a growth engine`, with current lane headings exposed elsewhere as Build, Manage, Optimize and Extend. Do not use the stale locator or claim the older wording is still live.
- MOZN English FAQ is live and populated. The Arabic FAQ was reported empty in the live research pass. Use the EN FAQ only if selected and do not present the AR FAQ as a successful pattern.
- MOZN `Globally Recognized Technologies` remains in the DOM inside a hidden section and is not eligible as visible proof evidence.

The final capture script must re-resolve every text anchor immediately before export. Any stale or hidden anchor fails closed and must be replaced, not reconstructed.
