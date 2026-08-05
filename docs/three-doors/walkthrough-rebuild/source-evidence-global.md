# Global source-evidence shortlist for the walkthrough PDFs

**Live-check date:** 2026-08-05  
**Purpose:** screenshot evidence pages at the end of the rebuilt Muse PDFs—not a style moodboard and not a claim that Muse should imitate any one company.

## Selection criteria

The shortlist favors sections that (1) are live, (2) contain the relevant copy in the delivered HTML, (3) have an obvious desktop crop, and (4) prove one specific architectural move in the Muse system: an identity-first hero, three distinct lanes without card eyebrows, a problem/new-standard argument, visible proof, trust/FAQ, an editorial statement, or a decisive final CTA.

This pass deliberately goes beyond the named examples. **Every company below is outside the original list** (Mercury, Retool, Basecamp, Figma, Intercom, Webflow, Dropbox, and GitHub). Basecamp is treated as its own live product site, not as a substitute screenshot of the named 37signals corporate site.

## Verification legend

- **Browser-rendered:** loaded in the screenshot browser; headings, controls, and images appeared in the accessibility tree.
- **SSR/curl verified:** browser-UA request returned HTTP 200 at the final URL, with the quoted heading and adjacent copy in the delivered HTML. No challenge/interstitial text was found. This is sufficient for a normal browser screenshot, but capture should still be spot-checked immediately before PDF export because marketing pages drift.
- Selectors below are resilient **Playwright-style text locators**, not brittle generated class names. Where a crop spans several elements, the heading is the scroll anchor.

## Recommended 10-section evidence set

| # | Company / exact live section | Muse use | Verification / WAF | Recommended screenshot crop |
|---|---|---|---|---|
| 1 | Figma — “The intelligent canvas for infinite creativity” | Identity hero | HTTP 200; SSR/curl verified; no WAF/interstitial | Full hero from nav bottom through the first product-development line |
| 2 | Webflow — “Webflow is the agentic web marketing platform for high-performing brands” | Distinct lanes, no per-card eyebrows | HTTP 200; SSR/curl verified; no WAF/interstitial | Section title plus the complete Build / Publish / Optimize row |
| 3 | Basecamp — “Tell me if this sounds about right.” | Problem argument | HTTP 200; SSR/curl verified; no WAF/interstitial | Heading plus the first 3–4 paragraphs, ending on the longevity/proof sentence |
| 4 | Retool — “Why enterprises choose Retool” | New-standard / concrete contrast | HTTP 200; **browser-rendered**; no WAF | Heading plus all three argument columns; stop before proof heading |
| 5 | Retool — “Trusted by 10,000+ teams…” | Proof grid | HTTP 200; **browser-rendered**; no WAF | Proof heading plus the first visible row of quantified customer cards |
| 6 | Mercury — “You’re creating something to stand the test of time. So are we.” | Proof grid / trust | HTTP 200; **browser-rendered**; no WAF | Heading plus all four metrics and the next trust-line if it fits |
| 7 | Basecamp — “All these questions have the same answer: Yes!” | FAQ / confidence | HTTP 200; SSR/curl verified; no WAF/interstitial | Heading plus 4–6 question rows; omit unrelated sections above/below |
| 8 | Intercom — “A true partner with deep domain expertise” | Trust architecture | HTTP 200; SSR/curl verified; no WAF/interstitial | Heading, its two-line intro, and all three trust cards |
| 9 | GitHub — “The future of building happens together” | Manifesto / editorial identity | HTTP 200; SSR/curl verified; no WAF/interstitial | Full hero statement, subline, and both primary actions |
| 10 | Mercury — “Banking – redesigned from the ground up.” | Final CTA | HTTP 200; **browser-rendered**; no WAF | Tight closing band containing only statement + Open account / Contact sales |

---

## 1. Figma — identity-first hero

- **Live URL:** https://www.figma.com/
- **Exact section text:** `The intelligent canvas for infinite creativity`
- **Exact locator:** `main h1:has-text("The intelligent canvas for infinite creativity")`
- **Adjacent text to retain:** `One workspace for your entire product development process.` and `Made so your whole team can go from WIP to ship, together.`
- **What the screenshot proves:** A company with a broad product surface can open by naming an identity/world (“intelligent canvas”), not by enumerating services. Product scope arrives one beat later.
- **Muse direction / section supported:** **Identity hero**—lead with what Muse is and the world it enables, then reveal Build / Ventures / Think.
- **Accessibility / WAF status:** Browser-UA fetch returned **HTTP 200** at the same URL (about 1.60 MB). The exact `h1`, following `h2`, product headings, and CTA text are server-delivered. No security checkpoint or challenge copy detected. **SSR/curl verified.**
- **Recommended crop:** Desktop 16:9 or ~1440×900. Start directly below the global nav; include the complete hero, the “Get started” action, and the first two lines of the “One workspace…” section. Do not include the mega-footer or product-resource headings accidentally emitted near the top of the DOM.
- **Why it earns a source page:** It is the cleanest independent identity-hero reference in this set and avoids the more familiar Linear/Vercel category-language examples.

## 2. Webflow — three equal lanes without card eyebrows

- **Live URL:** https://webflow.com/
- **Exact section text / anchor:** `Webflow is the agentic web marketing platform for high-performing brands`
- **Exact locator:** `main h2:has-text("Webflow is the agentic web marketing platform for high-performing brands")`
- **Lane texts to retain:**
  - `Build together` — `Bring team members and AI agents into one shared workspace, with design systems to keep everything on brand.`
  - `Publish at scale` — `Create and manage content in a visual, composable CMS — with built-in SEO and AEO to reach humans and machines alike.`
  - `Optimize for growth` — `Turn every page into a revenue driver with native analytics and AI that show you what's working and help you scale it.`
- **What the screenshot proves:** Three lanes can be distinguished by **verb + outcome titles** and equal anatomy, without a little category eyebrow above every card. The actions (`Start building`, `Start publishing`, and the third lane action) can vary while the cards remain one system.
- **Muse direction / section supported:** **Distinct Build / Ventures / Think lanes**—parallel visual weight, differentiated by the title and sentence rather than departmental labels.
- **Accessibility / WAF status:** Browser-UA fetch returned **HTTP 200** (about 754 KB); exact heading, three titles, descriptions, and CTAs are in delivered HTML. No challenge page detected. **SSR/curl verified.**
- **Recommended crop:** Scroll so the section heading sits in the top 20% and all three lane columns are visible in one frame. Exclude the preceding schema/debug-like text and the next section. Prefer 1440×950; if responsive stacking occurs, widen viewport rather than stitching.

## 3. Basecamp — specific problem argument

- **Live URL:** https://basecamp.com/
- **Exact section text:** `Tell me if this sounds about right.`
- **Exact locator:** `main h2:has-text("Tell me if this sounds about right.")`
- **Exact argument lines to retain:**
  - `You’re juggling people, projects, and expectations.`
  - `Unfortunately, most project management systems are bloated, complicated, and confusing. And software that’s hard to use doesn’t get used.`
  - `In software, longevity like this isn’t luck — it’s proof it works.`
- **What the screenshot proves:** A “problem” section need not be a generic pain-point grid. It can read as a short editorial letter: recognisable situation → explicit failed norm → reason the company built an alternative → proof.
- **Muse direction / section supported:** **Problem / standard argument**, especially a version that names what Muse refuses (fragmented delivery, generic transformation language, disconnected making/thinking) before introducing the three-door architecture.
- **Accessibility / WAF status:** Browser-UA fetch returned **HTTP 200** (about 54 KB); the entire section is plain, server-delivered text. No WAF or JS dependency. **SSR/curl verified; lowest capture risk in the set.**
- **Recommended crop:** Portrait editorial crop, roughly 1100×1400, beginning at the heading and ending after `In software, longevity like this isn’t luck — it’s proof it works.` Keep the left/right page margins so the letter-like typography is evident; do not reduce it to a text-only quote.

## 4. Retool — new-standard argument through concrete contrast

- **Live URL:** https://retool.com/
- **Exact section text:** `Why enterprises choose Retool`
- **Exact locator:** `main h2:has-text("Why enterprises choose Retool")`
- **Cards / exact headings:**
  - `Production-ready from day one`
  - `From one great app to operational excellence`
  - `More teams building, no new risk`
- **Key exact contrast:** `Don’t choose between moving fast or shipping something that'll actually pass a security review.`
- **What the screenshot proves:** A standard/approach section is stronger when each claim names a real trade-off and rejects it. Three parallel propositions can carry strategic argument, not just features.
- **Muse direction / section supported:** **Problem / new standard** immediately after the identity hero, or the argument above Build / Ventures / Think.
- **Accessibility / WAF status:** **Browser-rendered successfully** at the live URL; headings, paragraphs, links, and product imagery were present in the accessibility tree. Browser-UA curl also returned **HTTP 200** (about 561 KB). No WAF.
- **Recommended crop:** Heading plus all three columns/cards, with the next `Trusted by 10,000+ teams…` heading just outside the bottom edge. At 1440px wide, use a ~900–1050px-tall crop. Avoid capturing the sticky announcement bar if it obscures the heading.

## 5. Retool — quantified proof grid

- **Live URL:** https://retool.com/
- **Exact section text:** `Trusted by 10,000+ teams to generate production-ready AI applications`
- **Exact locator:** `main h2:has-text("Trusted by 10,000+ teams to generate production-ready AI applications")`
- **Exact first-row proof headings visible in source:**
  - `Ramp saved $8M and 20,000+ hours`
  - `10x reduction in dev time across 1600 studios`
  - `10x increase in patients treated`
  - `Doordash saved $6M and 36,000+ hours`
  - `$3M+ profit generated and 80% faster development`
- **What the screenshot proves:** Proof can be a designed grid of outcome headlines. The numbers are the card titles, rather than buried in testimonials or surrounded by decorative “case study” eyebrows.
- **Muse direction / section supported:** **Proof grid** for Muse—named or anonymized engagements/products should lead with concrete shipped outcomes, not a logo wall alone.
- **Accessibility / WAF status:** **Browser-rendered successfully**; exact proof heading and cards were present on the live page. HTTP 200; no WAF. The figures remain company marketing claims, so the PDF caption should call this a **presentation pattern**, not independent validation of Retool’s outcomes.
- **Recommended crop:** Section heading plus one complete row of outcome cards; include company marks only where they naturally appear in-card. A 1440×900 landscape crop should work. Do not extend into the `Start today` form.

## 6. Mercury — proof grid tied to a long-term standard

- **Live URL:** https://mercury.com/
- **Exact section text:** `You’re creating something to stand the test of time. So are we.`
- **Exact locator:** `main h2:has-text("You’re creating something to stand the test of time. So are we.")`
- **Exact metrics immediately below:** `300K+ / Entrepreneurs love us`; `1 in 3 / Startups choose Mercury`; `$20B+ / Monthly transaction volume`; `4.9 / Apple App Store rating` (the accessible text exposes the rating value with its label).
- **What the screenshot proves:** A proof grid works harder when its heading restates the company’s standard. Four numbers then substantiate durability, adoption, scale, and experience in one compact band.
- **Muse direction / section supported:** **Proof / trust** after the three doors; one section-level statement, then evidence across the whole Muse system rather than three mini-proof blocks.
- **Accessibility / WAF status:** **Browser-rendered successfully**; hero, accordion lanes, metrics, trust cards, and final CTA appeared in the accessibility tree. Browser-UA fetch also returned **HTTP 200** (about 847 KB). No WAF.
- **Recommended crop:** Start at the full heading and include all four metric cells. If space permits, include the next line `Standard protection stops short. Mercury goes further.` at the bottom as a bridge into trust; otherwise stop cleanly after the fourth metric. Use ~1440×800.

## 7. Basecamp — FAQ as confident editorial list

- **Live URL:** https://basecamp.com/
- **Exact section text:** `All these questions have the same answer: Yes!`
- **Exact locator:** `main h2:has-text("All these questions have the same answer: Yes!")`
- **Exact visible question starts:**
  - `Can I hide unfinished work from clients?`
  - `Can I link up Google Docs, Figma, Dropbox, etc?`
  - `Can I see all my tasks instantly anytime?`
  - `Can I see everything that’s overdue on one screen?`
- **What the screenshot proves:** FAQ/trust does not have to be a generic accordion headed “Frequently asked questions.” A strong statement can pre-answer the list and turn practical concerns into confidence.
- **Muse direction / section supported:** **FAQ / trust**, especially questions about how Muse engages, owns products, publishes thinking, handles confidentiality, and where a visitor should enter.
- **Accessibility / WAF status:** HTTP 200, fully server-rendered text, no WAF. **SSR/curl verified.**
- **Recommended crop:** Heading plus the first 4–6 question rows at readable size, ~1100×1200. Preserve the list rhythm and any native separators; stop before the next major section heading.

## 8. Intercom — trust as operating support, not badge wallpaper

- **Live URL:** https://www.intercom.com/
- **Exact section text:** `A true partner with deep domain expertise`
- **Exact locator:** `main h2:has-text("A true partner with deep domain expertise")`
- **Exact intro:** `We partner with you to set up and scale industry-leading customer experiences, with deep domain expertise, thought leadership, and education to give your team an edge`
- **Exact trust-card headings:** `The company you can trust`; `Expert support, at every stage`; `The AI Agent Blueprint`.
- **What the screenshot proves:** Trust can be structured as three operational promises—company reliability, expert support, and a documented method—rather than a row of security badges or logos detached from the proposition.
- **Muse direction / section supported:** **FAQ / trust** and the close of the Build lane: clarify the relationship, support, and method that make the work credible.
- **Accessibility / WAF status:** Browser-UA fetch returned **HTTP 200** (about 1.57 MB); exact heading, intro, and trust cards are server-delivered. No challenge/interstitial found. **SSR/curl verified.**
- **Recommended crop:** Heading + intro + all three cards in one landscape frame, roughly 1440×900. Keep the next `Transparent pricing` section out of frame so the evidence remains about trust architecture.

## 9. GitHub — manifesto-like identity hero

- **Live URL:** https://github.com/
- **Exact section text:** `The future of building happens together`
- **Exact locator:** `main h1:has-text("The future of building happens together")`
- **Exact supporting line:** `Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform.`
- **Exact actions:** `Sign up for GitHub`; `Try GitHub Copilot`.
- **What the screenshot proves:** A hero can function as a compact manifesto: future claim → enduring belief → company-specific convergence. The product does not need to be itemized before the point of view is clear.
- **Muse direction / section supported:** **Manifesto / editorial identity**, either as the opening hero or as the statement before the final invitation.
- **Accessibility / WAF status:** Browser-UA fetch returned **HTTP 200** (about 549 KB); exact `h1`, subline, CTAs, and subsequent feature headings are delivered. No WAF/interstitial detected. **SSR/curl verified.**
- **Recommended crop:** Hero only: full statement, subline, and both actions, with a small amount of the product visual below for context. Use 1440×850 and dismiss any alert/banner first.

## 10. Mercury — decisive final CTA

- **Live URL:** https://mercury.com/
- **Exact section text:** `Banking – redesigned from the ground up.`
- **Exact locator:** `main h2:has-text("Banking – redesigned from the ground up.")`
- **Exact actions:** `Open account`; `Contact sales`.
- **What the screenshot proves:** A final CTA does not need to recap every feature. One category-standard statement plus a direct/self-serve action and a human/sales action is enough.
- **Muse direction / section supported:** **Final CTA**—a thesis-aligned invitation with two paths (start a conversation / explore the work), rather than a generic “Contact us” footer.
- **Accessibility / WAF status:** **Browser-rendered successfully**, with heading and both actions in the accessibility tree. HTTP 200; no WAF.
- **Recommended crop:** Tight horizontal band, approximately 1440×500–650, containing only the statement and the two actions. Stop before `Mercury for business` / `Mercury for personal`; those are a separate section and dilute the close.

---

## Best mapping to the actual Muse PDF architecture

| Muse architecture need | Strongest primary evidence | Backup evidence |
|---|---|---|
| Identity hero | Figma | GitHub |
| Three distinct lanes, no card eyebrows | Webflow | Retool “Why enterprises choose Retool” |
| Problem / new-standard argument | Basecamp “Tell me…” | Retool “Why enterprises choose Retool” |
| Proof grid | Mercury metrics | Retool customer outcomes |
| FAQ / trust | Basecamp “All these questions…” | Intercom partner/trust cards |
| Manifesto / editorial statement | GitHub hero | Mercury “stand the test of time” |
| Final CTA | Mercury “Banking – redesigned…” | GitHub hero actions (if a hero/CTA hybrid is needed) |

## Capture guidance for the rebuilt PDFs

1. Capture at a consistent **1440px desktop viewport** and record the URL + capture date under each image.
2. Hide cookie banners and dismiss announcement bars, but do not alter page content or use devtools to create a state that a normal visitor cannot reach.
3. Keep enough native UI around each section to make the screenshot auditable; do not crop down to floating quotation text.
4. Label outcome figures as **the source company’s marketing claim/presentation pattern**, not as independently verified business results.
5. Re-run the exact text locator immediately before export. If it no longer resolves, do not use an old screenshot without marking its capture date.
6. Prefer one complete section per screenshot. Avoid stitched composites unless the PDF explicitly labels them as a composite.

## Candidates considered but not promoted

- **Dropbox** (https://www.dropbox.com/) was live (HTTP 200, about 563 KB) and had useful trust language—`Join the over 700 million registered users who trust Dropbox` and `Security never comes second`—but the selected Mercury and Intercom sections make the proof/trust mechanics more visually specific.
- **Slack** (https://slack.com/) was live (HTTP 200, about 255 KB) with a strong identity line—`All your people and AI agents working together.`—but it overlaps the Figma/GitHub hero role and adds less evidence for Muse’s three-door architecture.
- **Wise** (https://wise.com/) was live (HTTP 200, about 1.13 MB) and localized to Saudi Arabia in the retrieved page (`Do more with Wise in Saudi Arabia`). It was not selected because the homepage’s consumer-finance modules are less architecturally analogous to Muse than the ten sections above.
- **Dropbox, Slack, and Wise showed no WAF/interstitial in browser-UA fetches**, but were not browser-rendered in this pass because they were not promoted to the final evidence set.
