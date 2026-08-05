---
type: note
created: 2026-07-31
updated: 2026-08-05
tags: [marketing, product]
status: active
---

# Website

What is actually built, read off the code on 2026-07-31, not off the plan. [[Marketing]] and [[Home]] both still say "In progress", which understates it. The site is close to complete as a build and blocked on content honesty, not on engineering.

This note is the state of the thing. It does not replace [[Deck Copy v0.03]], which is the copy source.

## Update 2026-08-05: Three homepage directions

The homepage is now explored through three complete direction branches rather than one settled composition. The canonical walkthrough record is [[2026-08-05 Walkthrough PDF Rebuild]].

- **Direction 1, The Studio:** identity-led. `We build our own software.` / `And yours, properly.`
- **Direction 2, The Thesis:** argument-led. `Shipping is easy now.` / `Shipping well isn't.`
- **Direction 3, The Proof:** evidence-led. `We don't pitch.` / `We ship.`

All three use the same Three Doors architecture: Build, Ventures and Think. The cards are title-first and carry no eyebrow labels. Each branch includes a bilingual screenshot-first walkthrough with live source evidence.

Important: the older `Homepage argument` and `No Arabic` sections below describe the 2026-07-31 to 2026-08-01 site snapshot. They are historical context, not the state of the three direction branches. Direction 3 still has explicit English-stored copy on parts of `/ar`; see the rebuild note for the exact sections and unresolved proof claims.

The next decision is selection or synthesis. No direction is recorded as final yet.

## Where it lives

| Thing | Value |
|---|---|
| Repo | `Muse-software/muse-software` on GitHub, private |
| Local | `musewebsite/`, this vault now sits inside it |
| Host | Vercel. A push to `main` deploys itself |
| Domain | `muse.sa`, set as canonical in code |
| Contact route | `info@muse.sa`, plus WhatsApp and socials, see [[Channels]] |
| Public state | Built and deployable. Not launch ready, see [[#Before this gets traffic]] |

## Product

### What is built

Eleven page types. Everything is one brand, dark, near black with the orange accent and the maroon block from [[Brand Colour & Type]].

| Route | What a visitor gets |
|---|---|
| `/` | The full pitch in nine scrolling blocks |
| `/explore` | Services overview and case studies |
| `/services/[slug]` | Three deep pages. AI Transformation, Product Engineering, Gamification & Experience |
| `/about` | Tabs, leadership, beliefs slider, careers teaser |
| `/insights` | 43 articles, six categories, each category its own real URL |
| `/playbooks` | 28 industry write ups, 22 categories, filtered in the browser |
| `/newsletter` | Signup plus 12 back issues |
| `/careers` | Three open roles, each with a full detail page |
| `/contact` | Form, WhatsApp, email, socials |
| `/get-started` | The qualification form. The main conversion target |
| `/privacy`, `/terms` | Legal |

### The homepage argument

The order is deliberate and it is an argument, not a brochure.

Seven blocks since the 2026-08-01 rewrite, down from nine. Full approved copy, including the three card promises and all five FAQ answers, is in `docs/i18n-plan.md` section 13, which doubles as the Arabic source.

1. **Hero.** "Everyone has an AI strategy. Almost nobody has shipped one." Then "We're a product team in Riyadh. We actually build the thing, not just the deck about the thing"
2. **Our approach.** Three service cards. "Muse helps you shift from AI-absent to AI-native". Each card now ends in one checkable promise, set apart from the body
3. **Manifesto.** The maroon block. "The next decade of software gets decided in the next two years"
4. **Playbooks.** Latest three. "Practical guides, not theory"
5. **Pressure.** "AI isn't optional. Waiting is the risk". Photo dropped, crosshair pattern kept. Still filed as `TrustedBy.tsx`, which is now a misleading filename
6. **Ticker.** "Built for the AI-native era"
7. **FAQ.** Five questions. Two duplicates were merged and "Who's on the team?" took the free slot
8. **Close.** "Tell us what you're trying to build"

Testimonials was removed with the invented quotes. The rotating service words went with the hero rewrite: seven overlapping labels, including AI Transformation, Agentic AI and Generative AI as separate items, read as keyword stuffing and made the value proposition mushy. `RotatingText.tsx` is still in the tree, unused.

Blocks 3 and 5 still carry the argument. Against the specificity test in [[Website Voice#The specificity test]], the page now passes where it failed: every headline except the ticker says something a competitor could not lift unchanged. The ticker is the last empty one.

What is still unwritten to the register: `/about`, which runs the dead v0.02 deck copy, and `/explore`.

### The three ways out

Every page funnels to one of three things: the get started form, the contact form, or the newsletter. Nothing else is asked of a visitor. That is the right number.

### Craft that is already there

Worth knowing about, because it is easy to break later without noticing.

- Word by word scroll reveals on most headings
- A looping copper object behind the hero, the subpage heroes and the closing block
- Rotating service words in the hero
- Horizontal card tracks that respond to a normal vertical mouse wheel, not just trackpad swipes
- A page loader on first load and on route change
- Every animation respects reduced motion

The sliding nav panel is the pre PR version, deliberately, see the 2026-08-01 entry in [[Decision Log]]. It is the one piece of the site running older code on purpose, so check that note before changing it or resolving a merge on it.

This clears [[Quality Bar]] on interaction. It does not clear it on content.

### No Arabic

The site is English only. No RTL, no Arabic route, no language switch. For a Riyadh studio whose strongest content territory is Arabic and RTL, see [[Content Engine#1. Useful craft content]] and [[Localization Playbook]], that is a real gap and it is a deliberate open question below, not an oversight to fix quietly.

## Business

### What it is for

Inbound, per [[Marketing#Why this is a pillar and not a task]]. It is the thing a referral checks before replying, and the thing a ministry contact opens after a meeting. It is not expected to generate cold leads on its own yet.

### The invented blocks, removed 2026-08-01

Was the top issue, and it is now resolved for client names. Recorded here rather than deleted, because the reasoning is what stops them coming back.

| Block | Where | What it said | State |
|---|---|---|---|
| Trusted by, logos | `/`, `/about` | Acme, Globex, Initech, Vandelay | Removed. The section keeps its "AI isn't optional. Waiting is the risk" argument block and its filename, and carries a comment saying why the logos went |
| Testimonials, three quotes | `/` | Attributed to Acme, Globex, Initech | Component deleted |
| Case studies, four cards | `/explore` | Acme, Globex, Initech, Vandelay, with invented result numbers | Component deleted |
| Leadership | `/about` | Monogram placeholders, no headshots | Still there. Real people, placeholder avatars, so it is a missing asset rather than an invented claim |

Principle, now written down in [[Website Voice#We do not claim what is not decided]]: removing a section is honest, keeping a fake one is not. [[Marketing#Where things stand today]] says case studies: none yet, no client work delivered. The site now agrees with that.

One consequence worth knowing. `/explore` lost its only maroon block, so the page runs near black end to end until something real replaces it. The `/about` ticker was the other loose end here and it was cleaned up on 2026-08-01, see below.

### The about page, rewritten 2026-08-01

`/about` had been running the dead v0.02 deck copy in both locales, the text the [[Decision Log]] killed on 2026-07-30 for describing a custom website development agency and for using five of the phrases banned in [[Brand Voice]]. Replaced from [[Deck Copy v0.03]]. The seven generic values went with it, replaced by the six in that note, each one line and each of them something a competitor could not post unchanged.

**One deliberate departure from the source, and it needs to be known.** [[Deck Copy v0.03]] leads on "we build and publish our own apps". That was written on 2026-07-30. [[Website Voice#We do not claim what is not decided]] came the day after and is stricter, and [[Ventures]] is three ideas with none built, so an unqualified claim of published apps would send a reader looking for a catalogue that does not exist. The Ventures half was dropped and the page now describes only the client work, the standard and the Saudi position, all of which are true today.

That leaves [[Deck Copy v0.03]] and the live site disagreeing on what Muse is. The deck says two pillars, the site says one. Worth resolving in the note rather than leaving the website as the accidental source of truth, and it resolves itself the day a venture ships.

The `/about` ticker went from "Built by builders, trusted by leaders" to "Nothing ships that we wouldn't use ourselves", which is a standard we actually hold rather than a trust claim we cannot support. The Arabic is "لا نطلق ما لا نستخدمه نحن", already the wording used in `lib/content/ar/services.ts`.

### The content history does not exist

A harder version of the same problem, and the one worth a real decision.

| Content | Count | Dates | Reads as |
|---|---|---|---|
| Insights | 43 | Spread across 2026-03 to 2026-07 | Five months of steady publishing |
| Playbooks | 28 | All 28 dated 2026-07-30 | A back catalogue created in one day |
| Newsletter | 12 issues | 2025-09 to 2026-07, roughly monthly | Eleven months of a running newsletter |

[[Marketing#Where things stand today]] says content: none published yet, and audience: none yet. So the site currently presents eleven months of publishing history and an audience that does not exist.

The playbooks are the sharper case. They are written in the third person about unnamed companies. Zero of the 28 say "we built" or "we helped". But they carry titles like "How an AI Customer Support Platform Reduced Response Time by 85% for a Growing SaaS Business", and specific numbers inside: eighteen minutes down to three, sixty five percent resolved without a human, satisfaction up twenty percent.

**Answered by Abdullah, 2026-08-01.** They are real. They are previous work and real experience turned into articles, written in the third person because most of those clients cannot be named. That resolves the open question this note had been carrying, and it changes the fix completely.

They are not filler and they do not need removing. What they need is framing, because right now the honest thing about them is invisible: a reader has no way to know these came from delivered work rather than from a content generator. The anonymity is doing the opposite of what it should, making real experience look synthetic.

Two consequences.

First, this is the strongest proof asset on the site, and it is currently presented as the weakest. It is the only thing on muse.sa that demonstrates delivered work. Worth saying somewhere on `/playbooks` that these are drawn from real engagements with clients anonymised, in one plain line, without turning them into claimed case studies.

Second, it partly reopens [[Marketing#Where things stand today]], which says case studies: none yet, no client work delivered. If there is delivered work behind 28 write ups, that line is wrong, or it means something narrower like no client has agreed to be named. Worth restating precisely, because two notes currently disagree.

Still open: the dates. All 28 carry 2026-07-30, which reads as a back catalogue created in one day. Real content, misleading timestamps, see [[#Open questions]] item 2.

### Leads can land nowhere

Traced through the code, not assumed.

The forms behave honestly to the visitor. If delivery fails they say "Got it, thanks" and point to WhatsApp, instead of claiming the message was sent. That part is good.

The risk is behind it.

1. Submissions are appended to a local file. On Vercel that write fails, gets logged, and is deliberately swallowed so it never breaks the form. So on the real host there is no stored copy
2. Email goes out through Resend, and only if `RESEND_API_KEY` is set. Without it the lead exists only in a Vercel runtime log
3. The sender is still `onboarding@resend.dev`, Resend's sandbox address. Assumption, needs checking in the Resend dashboard: with an unverified domain that will not deliver to `info@muse.sa`

So a real lead can submit the get started form, be told something reassuring, and reach nobody. Verify this end to end against a real inbox before any traffic arrives. Belongs in [[Launch Checklist]].

### Playbooks means two different things

The vault's `05 Playbooks` is how we work internally, see [[Playbooks]]. The website's `/playbooks` is 28 industry write ups for clients. Same word, unrelated meanings. Worth renaming one of them before anyone external hears both.

## Technical

### Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP with ScrollTrigger, Motion, three.js for one decorative orb |
| Type | Space Grotesk for display, Inter for body, self hosted |
| Email | Resend |
| Host | Vercel |

No CMS. No database. No client state library. See [[Tooling Stack]].

### The decisions that matter

- **Content lives in code.** Typed arrays in `lib/content/`. Adding an article is a commit, not a login. Fast for us, and it means marketing cannot publish without an engineer. That is a real constraint to accept knowingly, and it will matter once a marketing lead is hired, see [[Marketing Lead Brief]]
- **Categories are derived, not hardcoded.** The filter chips come from whatever categories exist in the data. Add an article with a new category and it appears by itself, with its own URL for insights
- **Almost everything is static.** Pages are pre-rendered HTML, so crawlers get the full text without running any JavaScript
- **Two taxonomies on purpose.** Insights sort by discipline, AI, machine learning, data engineering, product engineering, gamification, GTM engineering. Playbooks sort by industry, 22 of them
- **Insights category pages are real URLs.** `/insights/ai` is bookmarkable and crawlable. Playbooks filtering is browser side only, because with 28 items across 22 categories most categories hold one or two entries. Revisit if the catalogue grows

### Where it is already strong

- Metadata, canonicals, sitemap and robots all generate from the live content, so they cannot drift from what is published
- Article and job posting structured data on every detail page
- Security headers on every route, including a content security policy and HSTS
- No secrets reach the browser
- Forms are rate limited, validated, and the get started form has a bot honeypot
- The nav is genuinely keyboard accessible. Focus is trapped while open, returned on escape, and the closed panel cannot be tabbed into
- Heavy libraries load only on the pages that use them

### Known compromises

Both are documented in the repo README, and both are decisions rather than bugs.

- The content security policy still allows inline scripts. A stricter nonce based version was built, tested and reverted, because it breaks every statically generated page. Fixing it properly means giving up static rendering, which is not worth it
- One scroll reveal animation carries a deliberate workaround for headings already on screen when a page mounts. Read the comment in `WordReveal.tsx` before touching it

## Before this gets traffic

In order.

- [x] Remove the invented client blocks. Done 2026-08-01, see [[#The invented blocks, removed 2026-08-01]]
- [x] Replace the `/about` copy, which was still the dead v0.02 deck text, with [[Deck Copy v0.03]]. Done 2026-08-01, both locales, see [[#The about page, rewritten 2026-08-01]]
- [x] Drop the "trusted by leaders" ticker on `/about`. Done 2026-08-01, replaced with "Nothing ships that we wouldn't use ourselves", which is a real standard rather than a trust claim
- [x] Decide what the 28 playbooks are. Answered 2026-08-01, they are real anonymised work
- [ ] Say so on `/playbooks`, in one line, so real experience stops reading as generated
- [ ] Reconcile "no client work delivered" in [[Marketing#Where things stand today]] with 28 write ups of delivered work
- [ ] Test the get started form end to end into a real inbox. Verify the Resend domain
- [ ] Give leads a stored home that survives, since the current file does not on Vercel
- [ ] Real headshots for [[Roles]], or drop the leadership block
- [ ] Reconcile [[Marketing#Where things stand today]] with what is actually live
- [ ] Put the two nav accessibility fixes back, `inert` on the closed panel and a Tab trap while open. Dropped with the nav revert, neither caused the break
- [ ] Finish the Arabic spoken pass. The homepage was already spoken and `/about` and careers are done; what is left is the `/explore`, `/newsletter`, `/contact` and `/get-started` subtitles plus the intros in `lib/content/ar/services.ts`. See [[Habbar Voice Study#What this leaves outstanding]]. Has to happen before the native review, not after
- [ ] Decide whether the English approach heading follows the Arabic from AI-absent to uses against builds, or the two stay deliberately different. See [[Arabic Termbase#The coined pair]]
- [ ] Point the socials at it, see [[Channels#Activation checklist]]

## Open questions

1. ~~**What are the 28 playbooks?**~~ Answered 2026-08-01: real previous work, anonymised because most clients cannot be named. See [[#The content history does not exist]]. What remains is how to say so on the page, and whether to restate [[Marketing#Where things stand today]]
2. **Is a backdated archive acceptable?** Insights and the newsletter both carry dates implying a history we do not have. Either accept it as normal marketing practice and say so once, or restate the dates. Not something to leave undecided by accident
3. **When does Arabic land?** Built and drafted, not published. `/ar` is gated behind `PUBLISHED_LOCALES` until the native review in [[Brand Voice#Arabic voice]] passes, and the review is now behind the register change of 2026-08-01, so the spoken pass above comes first. Our claimed edge is Arabic and RTL, and a site that does not demonstrate it undercuts the pitch, which is what makes this the longest running open item rather than a nice to have
4. **Who publishes?** Content in code means every article needs an engineer. Fine now, a bottleneck the moment [[Marketing Lead Brief]] is filled
5. **What gets measured?** No analytics found in the code. Nothing currently tells us whether any of this works, see [[Measurement]]

## Reference

- [[Deck Copy v0.03]] the copy source for the site
- [[Website Voice]] the register the site is written in, and the rule on claiming what is not decided
- [[Brand Voice]] the three registers, and the words we do not use
- [[Brand Identity]] and [[Brand Colour & Type]] the palette and type the site uses
- [[Positioning]] what we say we are
- [[Content Engine]] where website content is supposed to come from
- [[Quality Bar]] what done means
- [[Launch Checklist]] where the pre traffic items belong
