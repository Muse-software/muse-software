---
type: log
created: 2026-07-30
updated: 2026-08-01
tags: [decision]
---

# Decision Log

Structural decisions, newest first. Anything that would be expensive or confusing to reverse belongs here: strategy, brand, pricing, tooling, legal positions, which venture gets built.

## Format

```
## YYYY-MM-DD Short title

**Decision.** What was decided, in one or two sentences.

**Why.** The reasoning, and what alternative was rejected.

**Consequences.** What this commits us to, and what it rules out.
```

Full template in [[Decision]].

## Rules

- Record it the day it is made, while the reasoning is fresh
- Include what you rejected. In a year the rejected option will look attractive again, and the reason it lost is the valuable part
- Never delete a decision. When one is reversed, add a new entry that supersedes it and link back. The record of changing your mind is useful
- If it is not written here, it is not decided. That is what stops the same conversation happening four times

---

## 2026-08-08 The website understands before it proposes

**Decision.** The website's primary path is **Understanding First**. It starts from the visitor's situation, routes them across five capabilities, and moves the main conversion target from the retired `/get-started` form to a guided `/start` conversation. English remains the only published locale until the drafted Arabic service content receives native approval.

**Why.** The previous structure asked a visitor to choose a service before Muse had helped them name the problem. That was especially weak for Strategy & Discovery and Experience Design, which did not have complete routes. Rejected: adding more capability cards to the same brochure structure, because more options do not resolve uncertainty. Also rejected: publishing Arabic because the routes and RTL work, since functional completeness does not make draft copy approved public language.

**Consequences.** The public capability model now has five routes: Product Strategy & Discovery, Product Experience Design, AI Transformation, Product Engineering, and Gamification & Experience. The bare, English and Arabic `/get-started` URLs permanently redirect in one hop to `/start`; `/api/get-started` remains the submission endpoint. Navigation exposes all five capabilities and has an executable keyboard, scrolling, geometry, RTL and contrast contract. Sitemap and hreflang publish English only; Arabic stays functional but `noindex` until `PUBLISHED_LOCALES` changes after native review. The verified candidate is branch `direction/4-understanding-first`; implementation and evidence are recorded in [[2026-08-08 Website Direction 4]].

**Revisit.** After the native Arabic review, and after the first real `/start` submissions reveal whether the guided questions produce better briefs than the retired form.

---

## 2026-08-02 The dither is the house texture, and its marks are square

**Decision.** The dither is the only texture the website uses, and it carries meaning rather than decorating: density is a variable and should encode something, not sit at one setting. Its marks are squares, not circles, as of today. Its colour is restricted to three values already in the palette, page black, Muse Orange and white, in four fixed arrangements. The applied rules are in [[Brand Texture]]. This confirms and extends the crosshair removal of 2026-08-01, which took the deck's grid pattern off the website, see [[Brand Identity#Graphic system]].

**Why.** The texture was already doing two jobs it was never briefed for. It had replaced the crosshair, which read as wallpaper thrown on top of half empty sections, and it had replaced the maroon as the way of saying this section is different, because a flat colour block says that far too loudly while a texture that swells and fades across a boundary does it by rhythm and survives the boundary moving when copy changes. Neither was written down anywhere, so the texture existed as five unrelated background effects rather than as a system. The thing that turns it into one is that a dither is not a pattern, it is a way of converting a value into a countable number of marks, so density can carry emphasis, depth, progress and state. Square was chosen over round because the two pieces of brand artwork already drawn on a grid, the logo mark's stepped blocks and the pixel arrow on the buttons, both read as square, and a round mark was only ever matching a print halftone reference rather than anything of ours. Rejected: a second texture for variety, which is the exact mistake the crosshair removal corrected. Rejected: a fourth colour or a tint of the orange, since permuting three values keeps it one system and adding a hue does not. Rejected: fading the marks to suggest less, which is a screen with its opacity down and a different material.

**Consequences.** Anything placing the texture now has a rule to follow and a contrast table to check, and one arrangement is restricted: white type on the orange is 3.4:1 and is display only, so a layout wanting body copy on orange takes black type and white marks. Arabic display type takes a finer cell than the Latin equivalent, because the same cell that reads as texture in English reads as damage against thinner and more connected Arabic strokes, which puts a per script metric into the texture as well as into the type, see [[Localization Playbook]]. Three background fields on the site still use round marks and are inconsistent until switched. It also surfaces three unreconciled gaps between this vault and the live site, listed in [[Brand Texture#Open]]: the orange is `#fd4601` on the site against `#FE4701` in the deck, with the home page hero still on the deck value so the largest orange field on the site is a different orange from the rest of it, the maroon is entirely absent, and the secondary palette is unused. None of those three are decided here.

**Revisit.** When the deck is next revised, since the crosshair, the maroon and the secondaries are all still correct for print and only the website has moved.

---

## 2026-08-01 The Arabic runs two registers, and we take two devices from Habbar

**Decision.** Arabic is written in two registers split by page function, not one. MSA for the spine, meaning headings, service names, numbered steps, nav, form labels, product UI and everything legal. Saudi spoken for the body paragraphs, CTAs, careers copy and social. This supersedes the single MSA register recorded in [[Arabic Termbase#The register, decided]], which was set the same day and lasted one afternoon. Two writing devices are adopted at the same time in both languages, the correction pivot and the bounded verb chain, both in [[Brand Voice#Two devices]]. The English register is otherwise unchanged.

**Why.** Abdullah read habbar.com and wanted how it sounds. The read is in [[Habbar Voice Study]] and the finding is that their Arabic is not one register: MSA heading, spoken paragraph directly under it, held consistently across every page. The MSA carries credibility and the spoken register carries personality, so neither has to do the other's job. Our single register was the safer reading of the standing not corporate at all instruction in [[Brand Voice#The public voice]] and probably not the truest one, since one register has to pick a failure mode and live with it everywhere: too formal reads as a government form, too loose reads as a personal account. Rejected: taking Habbar's voice wholesale, which would have brought their classical vocabulary layer, نتفرّس and الفِراسة and الاحتبارية. Abdullah named that as the part he does not want, and the test that generalises it is that a word needing a glossary is a liability on a page with one scroll to persuade a stranger. Also rejected: deep dialect, تبي and أبغى, which is a person texting rather than a company writing. Also rejected: loosening the English to match, since the two languages are written natively rather than in parallel, and their English is the weaker half of their site anyway.

**Consequences.** The drafted Arabic in `messages/ar.json` is now behind the register. Term choices survive, since a term is a term in either register, but the body copy was all written to MSA and needs a spoken pass before the native reviewer sees it. That pass is not done and it blocks the review gate, which in turn blocks `/ar` publishing through `PUBLISHED_LOCALES`. It also gives the reviewer a second thing to check and a second failure mode to catch, a paragraph so loaded with عشان and اللي that it performs the register instead of writing in it. The short sentence rule now has a named exception for the verb chain, which is the first time a shared principle has carried one, so it needs watching for drift. The correction pivot is one step from a known AI tell and ships with a gate on it, that the rejected half must describe something a competitor actually does.

**Revisit.** After the native review, which is the first real test of whether the split holds in our copy rather than theirs.

---

## 2026-08-01 The website gets its own voice register

**Decision.** The website is a third register, written down in [[Website Voice]]. Direct and confident, an operator talking rather than a consultant presenting. Two things follow from it and are decided at the same time. Arabic and RTL are demonstrated by the site being bilingual, never claimed in a sentence. The [[Business Lines]] pillars are internal language and never appear publicly.

**Why.** Abdullah's call, and it resolves a real gap: [[Brand Voice]] assigns a register to social and to documents, and the site is neither, so it defaulted to the corporate voice nobody chose. Rejected: writing the site in the social register, which is warm and personal and makes a company selling six figure engagements sound small. Also rejected: leading on Arabic and RTL, on the grounds that every studio here claims it, it is table stakes to a buyer here, and claiming it signals that we think it is hard. Tenex is the reference for sharpness, on Abdullah's read that nothing on their page is filler. Their specifics are not taken, because they are commitments that company made and we have not.

**Consequences.** Commits the site to a rule that copy cannot claim anything the vault has not decided, which currently rules out any pricing or estimation model, client names and results, staffing we cannot field, and Arabic capability. The pricing and story point copy inherited from the reference was removed from `/services/product-engineering` and the homepage on the same day. It also means the site stays silent on localisation until it is actually bilingual, so [[Website#Open questions]] item 3 now blocks a positioning claim rather than only a feature. Ventures gets no public page until a product ships, at which point it returns as proof rather than as structure.

**Revisit.** When Arabic lands, and when [[Scoping & Pricing]] is decided and the site is allowed to describe how we charge.

---

## 2026-08-01 The nav bar stays on the pre PR implementation

**Decision.** The site navigation runs the version from before PR #2, updated with the new logo and the nine live menu items. The nav that arrived in that PR is not used. See [[Website]].

**Why.** The new nav added an effect that moves keyboard focus into the menu panel the instant it opens, while the panel is still parked offscreen. The browser then scrolls the container to reveal that link, which drags the whole nav sideways in the middle of the open animation. Rejected: keeping the new nav and deleting only that one effect, which would have preserved the accessibility work that came with it. The older file was already known good after several rounds of tuning, and the new one also introduced a full screen black grid transition and two blurred header scrims, which are design changes rather than fixes. Unpicking three overlapping additions was the larger risk.

**Consequences.** Gives up two real accessibility fixes that shipped with the new nav. The closed panel is no longer marked `inert`, so its links can be reached by tabbing while it sits offscreen, and there is no Tab trap while it is open. Neither caused the break and both are worth adding back on their own. The nav file now differs from the PR branch, so the next pull touching it will conflict and whoever resolves it needs to know why, which is the reason this entry exists. Menu item type size also had to change, because the old size was set for a single menu item and nine do not fit at it.

**Revisit.** When the accessibility fixes are added back, or whenever the nav is next rebuilt.

---

## 2026-07-30 English is set in Space Grotesk

**Decision.** Space Grotesk is the English typeface. Arabic stays IBM Plex Sans Arabic. This replaces IBM Plex Sans as the Latin face in [[Brand Colour & Type]] and [[Brand Identity]].

**Why.** Abdullah's call, made while the first real document was being built. Space Grotesk carries more character in English without being a display face, and pairing it with IBM Plex Sans Arabic keeps the Arabic side unchanged. Rejected: keeping IBM Plex Sans for both scripts, which is the safer superfamily pairing and gives perfectly matched metrics, but reads as generic in English. The two faces have no overlapping glyph coverage, so a stack of Space Grotesk then IBM Plex Sans Arabic resolves each script correctly with no per run markup, which removes the usual cost of a two family pairing.

**Consequences.** The wordmark is unaffected, since it was always separate custom lettering. Space Grotesk sets wider than IBM Plex Sans at the same point size, so any layout ported from earlier work needs its type scale re checked rather than copied. Anything produced before this date is on the old face, including [[Brand Guideline PDF]] v0.02, which is now out of date on type. First applied in [[Company Explainer]].

---

## 2026-07-30 Three pillars, and marketing is one of them

**Decision.** The company runs three pillars: [[Ventures]], [[Marketing]] and [[Studio]] client services. Productised software sold to many local businesses is parked and is no longer a line, see [[Productised Solutions]].

**Why.** Abdullah's own framing, and it replaces the three lines described in the earlier strategy dump. Marketing was previously treated as a task nobody owned, which is why nothing has been published. Naming it a pillar is what gets it time and an owner. Local business solutions was rejected as a pillar because a fourth thing at this size starves the other three, and because the natural route into it is through client work rather than as a launched product line.

**Consequences.** Supersedes the previous Ventures, Studio Services, Local Business Solutions structure. Commits us to hiring or appointing a marketing owner, see [[Marketing Lead Brief]]. The `04 Solutions` folder was deleted and its useful findings preserved in [[Productised Solutions]].

---

## 2026-07-30 Capacity rule across the pillars

**Decision.** One person is responsible per pillar and everyone supports across all three. Client work has first call on shared capacity, and when there is no active client demand the default work is Ventures and Marketing rather than waiting. Owners keep their main focus through a busy period. See [[Business Lines#Who owns what]].

**Why.** Client services are the main income at the start, so they have to win when they exist. Rejected: reserving a fixed non negotiable share of every week for Ventures, which sounds disciplined but breaks the first time a client deadline moves, and then the rule is dead and nobody trusts the next one. Naming an owner per pillar whose main focus is protected is a stronger guarantee than a protected percentage of a week.

**Consequences.** Ventures progress becomes uneven and depends on the bench actually existing. The check is in [[Weekly Review]]. Three months of no venture progress means turning work down or hiring, and revisiting this rule.

---

## 2026-07-30 Ventures run as a portfolio, not as bets

**Decision.** Take proven products, build the localised version, publish a real MVP, and decide with the numbers at a traction gate. No upfront validation phase. See [[Product Philosophy#Not a research project]] and [[Venture Pipeline#Traction gate]].

**Why.** A product with users and revenue elsewhere has already answered whether anyone wants it. Months of local interviews cannot answer whether our version wins, and shipping can. Rejected: the standard validate before building sequence, on the grounds that it spends the budget of an attempt on producing an opinion. What matters instead is keeping the cost of each attempt low enough that one hit pays for the misses.

**Consequences.** More attempts, most of which will not work, and that is the model rather than a failure. Requires a traction bar set before launch, still open in [[Open Questions#3. What counts as traction]]. Also raises the stakes on the adaptation policy, since we now start from someone else's product without a long research phase in between, see [[Open Questions#2. How close is too close]]. MVP means narrow scope at full quality, never rough.

---

## 2026-07-30 The visual identity is v0.02, orange on maroon

**Decision.** [[Brand Guideline PDF]] v0.02 is the identity. The dark glassmorphism with gold, silver and bronze metallics direction from the earlier strategy dump is dropped. See [[Brand Identity]].

**Why.** The brand is finished, produced, and already being applied to the website and the social accounts. There is one real identity and one abandoned idea, and holding both was the largest source of confusion in this vault. Orange on maroon is also distinctive in a market where most tech brands look alike. Rejected: redoing the identity toward the metallic direction, which would waste finished work at the exact moment the accounts need a logo on them.

**Consequences.** Website, deck, social accounts and all company material use the maroon and orange system in [[Brand Colour & Type]]. Individual products may still get their own identity, decided per venture at [[Venture Pipeline#Shape]]. The accessibility checks in [[Brand Colour & Type]] now matter, since this palette is going into real interfaces.

**Note.** This one was inferred rather than stated outright, from the brand being finished and going live. It is a one line change if that reading is wrong.

---

## 2026-07-30 The deck's About, Mission and Vision are replaced

**Decision.** The v0.02 About, Mission and Vision copy is out. Replacement copy in English and Arabic is in [[Deck Copy v0.03]].

**Why.** The old text describes a Saudi company specialising in custom website development, aiming to be a leading digital studio for unique web experiences. That is not this company. It also uses most of the phrases banned in [[Brand Voice]], and Abdullah identified it as model generated rather than decided.

**Consequences.** Deck reissued as v0.03. Website and social bios take their copy from [[Deck Copy v0.03]]. The Arabic in that note is a draft and needs a native read before it goes public.

---

## 2026-07-30 The public voice is close to people, not corporate

**Decision.** Two registers, see [[Brand Voice]]. Everything public is human, warm and close to people, including behind the scenes content of the team working. Proposals, contracts and product copy stay precise. Premium in craft, not in tone.

**Why.** Abdullah's explicit instruction, and a positioning choice rather than a style preference. Every established local firm sounds the same, and sounding like them makes a small company sound smaller rather than larger. It is also what makes people reach out, since nobody refers a studio, they refer people they feel like they know. Rejected: the calm, refined, executive voice from the earlier strategy dump, which was consistent with the metallic visual direction and went with it.

**Consequences.** Content includes real working clips, named people, and unfinished work, see [[Content Engine]]. Requires people to be willing to be visible, which is a choice each person makes. The risk to watch is that close to people becomes an excuse for careless, so the quality bar on the work itself does not move.

---

## 2026-07-30 Brand, marketing and graphics are on the menu

**Decision.** Client services include brand identity, graphic design, marketing strategy, content and social work, see [[Service Catalogue#Brand and marketing]]. The earlier position that we do not sell standalone brand work is reversed.

**Why.** Abdullah's instruction, and it reflects what the team can actually deliver. Early on, a well paid identity project that funds two weeks of venture work is a good trade. The thing worth avoiding was never the category, it is being treated as interchangeable, which is a pricing and client selection problem, see [[Scoping & Pricing#Signals to decline]].

**Consequences.** Our own marketing goes quieter while a client brand or marketing project runs, since it is the same people. Accepted knowingly, and it makes the content buffer in [[Content Engine#Surviving a busy client month]] more important than it looks.

---

## 2026-07-30 Knowledge lives in an Obsidian vault

**Decision.** Company knowledge lives in this Obsidian vault, plain markdown in a folder, with the structure described in [[Vault Guide]].

**Why.** Plain markdown survives any tool company changing its pricing or shutting down. Local first, works offline, and the linking model suits how strategy notes actually reference each other. Alternatives rejected: Notion, better for collaboration but the content is hostage to the platform, and Google Docs, which has no useful structure between documents.

**Consequences.** Commits us to a backup and sync decision, still open in [[Tooling Stack#Back this vault up]]. Also commits to keeping it current, since a stale vault is worse than no vault because it is confidently wrong.

---

## Pending

Decisions that need making. Each links to the note holding the context.

| Decision | Blocks | Context |
|---|---|---|
| Who owns marketing | The whole pillar | [[Marketing Lead Brief]] |
| Which audience we build first | Content mix and channels | [[Open Questions#5. Which audience we build first]] |
| Starting channels and cadence | Publishing anything | [[Channels#Priorities]] |
| The traction bar per venture | Every launch, and every kill | [[Open Questions#3. What counts as traction]] |
| Adaptation policy | Every venture | [[Open Questions#2. How close is too close]] |
| First venture to build | Everything in Ventures | [[Ventures]] |
| Which category we start in, and wedge or spread | Every venture, and what Marketing builds an audience for | [[Open Questions#4. Which category we start in]] |
| Whether products inherit the Muse look | Product UI | [[Brand Identity]] |
| Name, trademark and handles | Signage, domains, filings | [[Open Questions#1. The name]] |
| Arrangements for each pillar owner | Onboarding people properly | [[Roles]] |
| Client work we decline | Protecting the other two pillars | [[Open Questions#6. Client work we decline]] |
| Pricing for the named engagement shapes | First proposal | [[Scoping & Pricing#Needs deciding]] |
| Vault backup and sync | Risk of losing all of this | [[Tooling Stack#Back this vault up]] |
