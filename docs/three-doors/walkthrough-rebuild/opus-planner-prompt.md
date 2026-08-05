# Opus Planner Prompt: Rebuild Three Screenshot-First Walkthrough PDFs

You are the planning model. Do not edit code, screenshots, HTML, CSS or PDFs. Your only artifact is a detailed executable plan at:

`docs/three-doors/walkthrough-rebuild/opus-implementation-plan.md`

## Repository and branches

Repository: `/Users/a/Downloads/personal/muse-software`

Branches:

- `direction/1-the-studio`
- `direction/2-the-thesis`
- `direction/3-the-proof`

The current checkout may be Direction 1. Do not checkout or modify branches. Use `git show <branch>:<path>` when branch-specific inspection is required.

## Read first

1. `Muse Vault/09 Journal/2026-08-05 Walkthrough PDF Rebuild.md`
2. `docs/three-doors/walkthrough-rebuild/rebuild-brief.md`
3. `docs/three-doors/walkthrough-rebuild/audit-current.md`
4. `docs/three-doors/walkthrough-rebuild/capture-spike-verdict.md`
5. `docs/three-doors/walkthrough-rebuild/audit-d1.md`
6. `docs/three-doors/walkthrough-rebuild/audit-d2.md`
7. `docs/three-doors/walkthrough-rebuild/audit-d3.md`
8. `docs/three-doors/walkthrough-rebuild/source-evidence-global.md`
9. `docs/three-doors/walkthrough-rebuild/source-evidence-saudi.md`
10. `docs/three-doors/walkthrough-rebuild/source-feasibility.md`
11. Existing direction-specific PDF source directories under `docs/three-doors/`.
12. Existing research banks under `docs/three-doors/research/`.
13. Muse voice material under `Muse Vault/01 Company/`.

If a listed audit file is not present, say which input is missing in the plan instead of inventing its contents.

## User correction that governs the plan

The current PDFs are visually incomplete and misleading because screenshots are decorative fragments rather than section evidence. The user requires a screenshot-first sequence for every real homepage section:

1. English desktop and English mobile.
2. Arabic desktop and Arabic mobile.
3. Content table or explainer for that same section.
4. Repeat for the next section in actual homepage order.

After the final section only:

1. Objections answered.
2. Open decisions.
3. Structure map.
4. Sources and reference evidence.

Footer must appear only at the end of the walkthrough. Hero must not be paired with Footer. Doors must not bleed into Manifesto. Every real section requires dedicated web and mobile evidence in both locales.

The user also corrected the research behavior: examples are directional, not exhaustive. The plan must use independent research and its strongest recommendations, not mechanically repeat a user-provided list.

## Validated capture method

The spike proved that exact element screenshots work. It also proved:

- Force every target into view with `scrollIntoView({ block: "center" })`.
- Wait for Framer Motion to settle.
- Do not use a reduced-motion browser context.
- Do not disable animations in `locator.screenshot()`.
- Keep navigation in Hero only.
- Hide only the fixed navigation while capturing middle sections.
- Capture exact section roots so adjacent sections cannot bleed.
- Use dedicated targets for Ticker and Footer.

The implementation plan should turn this into a reusable branch-aware capture system with a manifest and validation.

## Planning requirements

Your plan must include all of the following.

### 1. Exact page architecture

Provide a numbered page sequence for each direction. Page count may differ by direction and should follow content, not a fixed quota.

For each real homepage section, identify:

- Section name.
- English visual page.
- Arabic visual page.
- Content and rationale page.
- Any justified split for tall mobile figures.

Explicitly cover:

- D1: Hero, Three Doors, Manifesto, Outcomes Band, Ticker, FAQ, CTA, Footer.
- D2: Hero, The Problem, The Standard, Three Doors, Manifesto, Outcomes Band, Ticker, FAQ, CTA, Footer.
- D3: Hero, Proof Wall, Three Doors, Manifesto, Outcomes Band, Ticker, FAQ, CTA, Footer.

Do not hide D3's known English fallback on the Arabic route. Plan to show the honest current state and label it as an open decision unless the scope explicitly changes.

### 2. Screenshot manifest

Define every expected screenshot filename by direction, locale, device and section. Include selectors or text anchors, branch-specific hero assertions, viewport settings, expected output dimensions, and how long mobile sections are handled.

### 3. Capture validation

Plan machine checks for:

- Expected file presence.
- Nonzero dimensions.
- Branch-specific hero string.
- Locale and URL.
- Exact element bounding box.
- Section text included.
- Next section text excluded.
- No sticky navigation over non-Hero captures.
- Complete capture manifest.

Plan visual QA contact sheets for all EN desktop, EN mobile, AR desktop and AR mobile images per direction.

### 4. Reference evidence

Select real live reference screenshots from the research inputs. Use sources that genuinely influenced the implemented patterns, plus independently researched examples where they validate the same pattern more clearly. Include at least one Saudi or Gulf source and one global source per direction. Prefer sources beyond the user's initial examples where they are stronger.

Every evidence item must be classified honestly as one of:

- `Direct input`: present in the original research trail and demonstrably used in the current website structure, interaction or copy rhythm.
- `Independent validation`: newly found during this rebuild and used to confirm or challenge the pattern, not falsely presented as the origin of existing Muse copy.

For every reference figure include:

- Company and page.
- Exact URL.
- Capture date.
- Visible pattern.
- What Muse adapted.
- Whether the influence is structure, interaction, copy rhythm or bilingual behavior.

Do not claim a relationship that the research does not support.

### 5. Reusable implementation

Recommend the smallest maintainable structure for:

- Shared capture library or configuration.
- Direction-specific section definitions.
- Shared PDF HTML/CSS patterns.
- Reference screenshot assets.
- Build, measure, verify and page-render scripts.

Avoid a large framework rewrite if a shared configuration and helpers are enough.

### 6. PDF QA

Plan all technical and visual gates:

- HTML page count.
- PDF page count.
- Bounds and overflow.
- No clipped screenshot frames.
- No unexpected blank pages.
- Correct screenshot filename on each page.
- Correct section order.
- Footer after CTA only.
- Reference figures and URLs present.
- Render every PDF page to PNG.
- Contact sheet and individual review for every rendered page.
- Rebuild after any source change before claiming success.

### 7. Branch execution

Give a safe branch or worktree sequence that prevents stale servers and wrong-branch screenshots. Every direction must:

1. Build successfully.
2. Kill any previous port 3100 listener.
3. Start its own branch.
4. Verify a unique hero string.
5. Capture.
6. Build PDF.
7. Verify.
8. Inspect all pages.
9. Commit and push to the matching remote direction branch.

### 8. Acceptance checklist

End with a strict checkbox list that an executor can mark. No item may rely on a subjective claim like "looks good" without a defined inspection.

## Quality bar

The plan should be detailed enough for a fresh Sonnet executor to follow without asking questions. Make concrete recommendations. When tradeoffs exist, choose and justify the recommended option rather than presenting a vague menu.
