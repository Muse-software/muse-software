---
type: note
status: draft
created: 2026-07-30
tags: [company, brand, writing]
---

# Company Explainer

Plan for a PDF that explains what Muse is and how it works. Abdullah's reference copy, and the thing a new team member reads on day one so the strategy does not have to be explained from scratch every time.

This note is the brief. Another agent builds the document from it. Everything needed to execute is here or one link away.

## What it is

| | |
|---|---|
| Working title | Muse Studios: how this company works |
| Audience | Abdullah first, then anyone joining. Assume a smart person who knows nothing about Muse |
| Purpose | Explain the three pillars and the thinking behind them, well enough that someone can repeat it accurately |
| Length | 10 pages: cover, 9 sections. Not a deck, not a manual |
| Language | English. An Arabic version is a separate build, see [[#Open, for Abdullah]] |
| Status | Internal. Not a client document and not a pitch deck |

## Hard rules

Non negotiable, and worth reading before writing a word.

- **No AI writing slop.** No filler, no throat clearing, no "in today's fast paced landscape". If a sentence would survive being deleted, delete it. Banned phrases are in [[Brand Voice#Banned phrases]]
- **Straight to the point.** General understanding, not detail. Anyone who wants detail opens the vault, and the document should say so
- **Real things only.** Every number, quote and claim is sourced or it does not appear. Anything marked unverified in [[Localisation Precedents]] stays out unless someone checks it first
- **Punctuation.** No em dashes, no en dashes, no guillemets, straight quotes only. Same rule as everything else we write
- **No emojis, no stock photography, no decoration.** Sharp corners, no shadows, no gradients
- **Tone is explaining, not instructing.** This document circulates to colleagues, so it reads as context rather than as a rulebook. See the tone section of the `pdf-house-style` skill. Open by handing the work back: this is the thinking, not orders
- **No timelines.** No week counts, no phase durations, no dates on a process

## Build approach

Use the `pdf-house-style` skill, with one deliberate departure.

**Engine: HTML to PDF via headless Chromium**, per that skill's `reference/rtl-html-system.md`, rather than the default ReportLab path.

**Why the departure.** The ReportLab house system is strict greyscale with Space Grotesk. That is right for proposals and annexes. This document is about Muse and gets read by people forming their first impression of the brand, so it should look like Muse. The skill explicitly allows the project's own palette on the HTML path. It also makes the logo rows and the diagram far easier.

Everything else in the skill still applies in full: the punctuation rule, no decoration, sharp corners, real content only, and the verification pass at the end.

**Palette and type** come from [[Brand Colour & Type]], which has paste ready CSS tokens. Hold the mix ratio in that note: maroon dominates, orange is the loudest thing but not the largest. Type is IBM Plex Sans, with IBM Plex Sans Arabic if any Arabic appears.

**Before building, run the accessibility checks** listed at the bottom of [[Brand Colour & Type]]. They have never been run, and this is the first real document to put the palette into body text.

## Page plan

One section per page. If a page comes out thin, merge it into its neighbour rather than padding it.

**Cover.** Muse logo, title, one line description, prepared by Abdullah Alsubaie, date, reference. Name only, no job title.

**01. What Muse is.** The one line from [[Positioning]]. The three pillars and what each is for. How they feed each other, and the ownership model from [[Business Lines#Who owns what]] stated plainly: one person responsible per pillar, everyone supporting across all three, client work first on shared capacity. Roles only, no individual names anywhere in this document. Carries the three pillars diagram. This page alone should let someone explain the company in a lift.

**02. The model: build what already works.** The core belief from [[Product Philosophy]]. Then the evidence, which is the point of the page: the Saudi precedents table and the published thinking, both in [[Localisation Precedents]]. Include the honest counterargument in two or three lines. A document that only argues one side reads as marketing.

**03. What localisation actually means.** The most important page. The three moves from [[Product Philosophy#Localisation is the product, not a translation layer]], then the fitness worked example, clearly labelled as an illustration rather than a plan, then the table showing the same shape in other categories. Grab and Gojek as proof that this is what wins, from [[Localisation Precedents#International precedents]].

**04. Pillar one: our own apps.** Portfolio logic. Most attempts will not work and that is the model. Cheap attempts, published properly, and the traction gate decides. Abdullah's framing is the right frame for this page: keep taking cheap shots until one of them is the golden egg, then put real weight behind it. Note that a design lead owns this pillar and keeps it as their main focus, with technical support coming in early rather than at handover. Say clearly that no category is chosen yet and the candidate list is being widened, see [[Open Questions#4. Which category we start in]].

**05. Pillar two: brand and marketing.** What it is for, the four uses in [[Influence Strategy]]. What we actually post, the pillars in [[Content Engine]] in about five lines. The voice rule, close to people and not corporate, from [[Brand Voice#The public voice]]. Say the accounts are live but not yet activated, because honesty about the starting point is the tone of the whole document.

**06. Pillar three: client work.** What we sell, grouped as in [[Service Catalogue]], including brand and marketing work. Why it is the main income now and why that is the plan rather than a compromise. How it funds the other two.

**07. How we work.** The standard, from [[Quality Bar]] and [[Product Philosophy#Non negotiables]]. Real data only, Arabic and RTL first class, every state designed, micro interactions, nothing ships below the bar. Short page, mostly a list. This is the page that tells a new joiner what will get their work sent back.

**08. Where we are today.** Honest status, and what is still open. Brand done, website in progress, accounts not activated, no clients yet, no product built, category not chosen. Then the live questions from [[Open Questions]] in one short table. A new joiner who reads this knows what they can still influence, which is the most useful thing this page can do.

**09. Sources and further reading.** Live links, from [[Localisation Precedents#Sources]]. Plus a note that the full detail lives in the vault and how to get access.

## Figures and assets

| Ref | What | Where it comes from |
|---|---|---|
| Muse logo | Cover and footer | `99 Meta/Attachments/Brand/`. Icon or vertical lockup for tight spaces, see [[Brand Identity]] |
| F1 | Three pillars diagram | Built in HTML and CSS, not an image. Three blocks, what each is for, arrows for how they feed each other |
| F2 | Saudi precedents logo row | Careem, Jahez, HungerStation, Haraj |
| F3 | International precedents logo row | Grab, Gojek, Meituan |
| F4 | The three moves of localisation | Built in HTML and CSS. Local institutions, local context, local language |
| F5 | Optional, only if genuinely captured | A real screenshot of a global app failing on local input, for example a calorie app searching for a Saudi dish. Strong evidence, but only if somebody actually takes the screenshot |

**Sourcing logos.** Official press kit or brand page only. Do not recreate a logo, do not pull a low resolution version off a search results page, and do not stretch anything. If a clean asset cannot be found for one company, drop that logo and keep the name in text. A row of five clean logos and one blurry one looks worse than five.

**On using other companies' logos.** This is an internal reference document naming real companies factually, which is ordinary and fine. Keep it internal. If any of this content later moves into a public deck or the website, that is the point to look at it properly rather than now.

**On F5 and any screenshot.** The rule from the skill applies: never describe a screen nobody has looked at. If the screenshot does not get taken, the figure does not go in.

## Verification before it is called done

From the skill, and not optional.

- [ ] Render it and look at every page, not just the page count
- [ ] Measure page fill and fix anything under about half full by merging sections, not by padding
- [ ] Grep the extracted text for banned punctuation
- [ ] Confirm hyperlinks were parsed rather than escaped
- [ ] Check every claim against [[Localisation Precedents]], and confirm nothing marked unverified made it in
- [ ] Read it once as someone who has never heard of Muse. If any page is only there for completeness, cut it
- [ ] Ship the source alongside the PDF so it can be rebuilt

## Open, for Abdullah

Worth answering before the build starts, though none of them block a first draft.

- **Arabic version?** Probably yes eventually, since new joiners are Saudi and the company says Arabic first. It is a separate build rather than a translation, and it needs a native writer, see [[Brand Voice#Arabic voice]]. Reasonable to ship English first and decide after reading it
- **How much of the client work page can be specific** when there are no clients and no case studies yet
- **Where the file lives** so it stays findable and stays current. A stale explainer is worse than none

## After the first version

- Keep this note as the brief, and update it when the document changes rather than letting the PDF drift from the plan
- The explainer will go out of date fastest on page 08. Worth rebuilding whenever the status changes materially
- Much of this content is also the raw material for the website and for [[Deck Copy v0.03]], so keep them consistent
