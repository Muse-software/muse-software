You are planning a copy+UI revision of the Muse website homepage, across three git branches:
direction/1-the-studio, direction/2-the-thesis, direction/3-the-proof. The plan must be exact
enough that a Sonnet-class executor can apply it mechanically per branch.

MANDATORY READING (in this order):
1. docs/three-doors/doors-revision-brief.md — the brief. It is the contract. Every rule in it is non-negotiable.
2. docs/three-doors/research/doors-ref-global.md (66 verbatim quotes: tenex, 37signals, basecamp, vercel, linear, netlify)
3. docs/three-doors/research/doors-ref-saudi.md (75 verbatim quotes: salla, mozn, zto, lean, thmanyah)
4. docs/three-doors/research/doors-ref-bigtech.md (31 verbatim quotes: stripe, shopify, notion, framer)
5. docs/three-doors/research/ui-patterns-global.md (11 sites, UI mechanics)
6. docs/three-doors/research/ui-patterns-saudi.md (11 Saudi sites, UI mechanics)
7. Muse Vault/01 Company/Website Voice.md, Brand Voice.md, Deck Copy v0.03.md — the voice law.
8. The CURRENT content: messages/en.json and messages/ar.json on the CURRENT branch
   (direction/1-the-studio is checked out). Also read components/sections/HomeSections.tsx,
   components/sections/ThreeDoors.tsx, components/sections/TheProblem.tsx,
   components/sections/TheStandard.tsx, components/sections/ProofWall.tsx to know what exists.

WHAT TO PRODUCE: docs/three-doors/doors-revision-plan.md with exactly these sections:
1. Executive summary: what changes on each branch, in one paragraph per branch.
2. Decisions-needed table: each open decision, a recommendation, an alternative. Include at
   minimum: (a) whether to keep any eyebrow at the doors section level or go zero-eyebrow
   with a big-statement heading; (b) how to differentiate Build from Ventures in the titles
   so they never read as the same thing; (c) card CTA treatment (identical vs distinct verb
   per door, or circular-arrow whole-card link); (d) Think door treatment (cards vs numbered
   list, per 37signals Signal NN. model); (e) hero for Direction 1 and Direction 2
   (direction-specific, never Tenex's AI-consultant line, must reflect Muse's real identity:
   "A Saudi product company. We build our own software, and we help other businesses build
   theirs properly.").
3. Per-branch section plan: for each section (doors, hero, theProblem, theStandard,
   proofWall as applicable per branch), current EN/AR verbatim + verdict
   (KEEP/REWRITE/BORROW/CUT) + EXACT replacement copy in BOTH English and Arabic.
   Arabic is written natively, NOT translated from English: MSA spine for headings, Saudi
   spoken for body/CTAs (عشان وش مو اللي بس, 1-2 markers per paragraph max). No literal
   translations.
4. Borrowing table: every new line -> the reference line it adapts -> source URL. Every
   content line MUST trace to a real reference in the research files. If a line has no
   reference, mark it BORROW-UNSUPPORTED and do not ship it.
5. Rules checklist: zero em dashes, zero en dashes, zero curly quotes, zero emoji, zero
   guillemets, zero eyebrows inside cards, at most one eyebrow per section (prefer none),
   straight quotes only, specificity test applied to every sentence, no invented claims.
6. Execution order + verification: step-by-step per branch (edit -> build -> parity check ->
   punctuation sweep), one logical commit per step.

CONSTRAINTS (hard):
- NEVER write Abdullah's spoken words into copy. The brief quotes what he said only to show
  what to AVOID. The doors content must be adapted from the reference banks.
- The three doors MUST read as three different ways to work: Build = software we build for
  clients (the engagement model, per Tenex/Mozn: squads, outcome-based, "you pay for
  features delivered, not hours logged", "weeks, not quarters"); Ventures = our own
  products (per ZTO's distinction of own-values vs client-work, Salla's "Your store. Your
  brand. Your future.", Notion's two-fragment payoff); Think = knowledge & community (per
  37signals Signal NN. list, Thmanyah lanes, ZTO editorial-independence framing).
- No per-card eyebrows. Titles carry the lane. Balanced word counts across the three doors
  (title 1-4 words, one-liner 6-14 words, body optional but within ~2x of each other).
- Distinct verb CTA per door (e.g. Start a build / See the pipeline / Read the latest as
  the OLD copy — replace with verb CTAs adapted from references), or circular-arrow
  whole-card link. Never identical generic "Get in touch" on all three.
- Direction 3 hero ("We don't pitch. / We ship.") is APPROVED and stays unchanged.
- Direction 1 and 2 heroes get NEW direction-specific copy.
- The problem-card emojis in Direction 2 (🎯📝🏗️) are removed; replaced by no icon or
  drawn SVG (per research: no reference uses emoji).
- The em/en dashes in theStandard paragraphs and proofWall Tenet card and doors think body
  are rewritten without dashes.
- Keep keys in messages/en.json and messages/ar.json structurally identical (same keys,
  same array lengths). The plan states for each change the exact key path and before/after.
- After the plan: it will be reviewed against the brief by an orchestrator, then executed
  per branch by Sonnet. Write the plan so the executor never has to make a judgment call.

Write the plan to docs/three-doors/doors-revision-plan.md. Then report: the plan path,
the number of changes per branch (EN/AR), the open decisions with recommendations, and any
reference lines you found that support each major move.
