# Direction 4 Start Conversation Gate

Date: 2026-08-08
Branch: `direction/4-understanding-first`
Base: `3fba9e2`
Scope: Direction 4 Phase 4 only, the real guided `/start` flow and its required `/api/get-started` contract.

## Scope boundary

This gate includes:

- A guided `/start` conversation in English and Arabic.
- Five visitor intents: build, improve, AI, capability, unsure.
- Intent deep links and browser History behavior.
- Lightweight context questions with an explicit skip-to-contact path.
- Real submission to `/api/get-started`.
- Call and written-contact preferences.
- Honest delivered and undelivered outcomes.
- Keyboard, RTL, reduced-motion, validation, and direct API checks.

This gate does not include the two missing capability pages, navigation/redirect cleanup, sitemap updates, Vault update, push, or final release QA. Those remain later phases.

## TDD receipts

The delegated implementation produced the initial RED receipt at:

- `docs/three-doors/_verify-d4-start/red.txt`

Independent visual review then rejected the first mechanically-green implementation. Additional RED receipts captured the missing behavior before fixes:

- `docs/three-doors/_verify-d4-start/correction-red.txt`
  - Visible progress missing.
  - Intent choices were 38px chips rather than full-width mobile cards.
  - Empty context advanced without validation.
  - `source:start` API accepted a missing `preferredContact`.
- `docs/three-doors/_verify-d4-start/email-red.txt`
  - `test@localhost` reached the API instead of being blocked locally and linked to its field error.
- `docs/three-doors/_verify-d4-start/outcome-red.txt`
  - Contact actions were not a compact group.
  - Undelivered copy implied the request had been noted.
  - Delivered copy lacked a clear closure instruction.
- `docs/three-doors/_verify-d4-start/outcome-a11y-red.txt`
  - The undelivered heading received focus, but the outcome region lacked `role="alert"`.
- `docs/three-doors/_verify-d4-start/reviewer-red.txt`
  - `null` JSON produced 500, arrays were misclassified, and object-valued fields were accepted.
  - The selected-card assertion was replaced after an independent reviewer proved that transparent `rgba` and `oklab` serializations caused a false positive.

The corrected behaviors were moved into the permanent verifier before the temporary correction scripts were removed.

## Final automated gate

Command:

```bash
node scripts/d4-verify-start.mjs
```

Result:

- **42/42 checks passed**
- Production server, not dev server.
- Report: `docs/three-doors/_verify-d4-start/report.json`

Coverage:

- EN and AR at 1440×900 and 390×844.
- Correct `lang`, `dir`, HTTP 200, no horizontal overflow, no page/console errors.
- Visible progress and five full-width, minimum-48px mobile intent cards.
- Valid and invalid intent deep links.
- All five branches compose human-readable `needs` and submit `source:start`.
- Delivered and undelivered outcomes have truthful copy, correct `status`/`alert` semantics, focused headings, selected contact-card state, and compact action grouping.
- Undelivered WhatsApp/email fallbacks are complete links with LTR-isolated details.
- Server failure retains field values and exposes `role="alert"`.
- Required fields, required context, local dotted-domain email validation, and call-without-phone validation.
- Keyboard-only radio, back, skip, heading-focus flow.
- Browser Back restores Screen 0 and clears the intent query.
- EN and AR reduced-motion flow completion.
- Legacy API validation preserved.
- Direct API rejection for missing `preferredContact` and call-without-phone.
- Direct API acceptance for valid call and written-contact shapes without retired qualification fields.
- Runtime rejection of `null`, array, and non-string-field JSON as `400 invalid_body`.
- Rate-limit boundary proof: requests one through five reach validation; request six returns `429`.
- Selected and unselected contact cards are compared after transition settlement. The final computed backgrounds are transparent for the unselected card and orange at alpha ≥ 0.08 for the selected card.

## Supporting gates

Final results after the Phase 4 changes:

```text
npm run build                 PASS
npx tsc --noEmit              PASS
scoped ESLint                 PASS
git diff --check              PASS
Direction 4 homepage gate     PASS, 8/8
Direction 4 Phase 1 gate      PASS, 22/22
```

Build emitted existing project warnings about `metadataBase` fallback and edge-runtime static generation. It emitted no `MISSING_MESSAGE`, `INVALID_MESSAGE`, `IntlError`, CSS optimizer, TypeScript, or ESLint failure.

## Visual gate

Twenty full-page screenshots were regenerated from the corrected Production build:

- Five states per locale and viewport: initial, context, contact, delivered, undelivered.
- English and Arabic.
- Desktop 1440px and mobile 390px.

Representative final review:

- EN mobile initial: PASS.
- AR mobile context: PASS.
- EN desktop contact: PASS after visible progress, optional labels, card-level selected state, and compact action grouping.
- EN mobile delivered: PASS after truthful receipt and closure copy.
- AR mobile undelivered: PASS after explicitly stating that the request was not sent and exposing direct fallbacks.

The screenshot helper scrolls to the top before capture. This prevents a sticky header from obscuring the outcome heading and avoids reusing the earlier misleading evidence.

## Honest delivery behavior

- `delivered:true` means the email provider confirmed delivery handling. The UI says the message was received and identifies the response channel without inventing a response deadline.
- `delivered:false` does **not** claim persistence or receipt. The UI says the request was not sent and offers direct WhatsApp and email links.
- A server error retains entered values and displays an accessible error.
- A call request means Muse will contact the visitor to arrange the call. No calendar or availability is fabricated.

## Known later work

- Add the two truthful capability pages.
- Update global navigation and legacy redirects.
- Update sitemap/SEO coverage.
- Run final route and GPU-backed browser QA before release.
- Update Muse Vault and deliver/push only when explicitly authorized.
