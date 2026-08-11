---
type: playbook
created: 2026-07-30
tags: [process, quality]
---

# Quality Bar

What done means. Applies to our own products and client work identically. [[Positioning]] claims craftsmanship, and this is the only thing that makes that claim true.

## The five standards

**1. Production grade.** No prototype code in production. No hardcoded values that should be configuration. No commented out blocks left behind. If it is temporary, it has a note saying when it goes.

**2. Real data only.** No lorem ipsum, no placeholder charts, no fake numbers, no sample avatars. If real data does not exist yet, the design uses realistic data that a person from here would recognise. Fake data hides real problems: the name that is too long, the price that has three digits, the empty state nobody designed.

**3. Known, predictable behaviour.** Every state is designed and built:

- Empty, before any data exists
- Loading, and what happens if it takes longer than expected
- Error, with something the user can actually do about it
- Offline
- First run, for a user who has never seen this
- Full, for the user with three hundred items
- Permission denied, where relevant

If you cannot say what the product does in a state, it is not finished.

**4. Micro interactions.** Transitions, feedback on tap, focus states, keyboard behaviour, scroll behaviour, haptics where they help. This is how quality gets felt before it gets understood, and it is the difference between something that works and something that feels expensive.

Rules: nothing moves without a reason, nothing takes longer than it needs to, and every action gets acknowledged immediately even when the result takes time.

**5. Arabic and RTL are first class.** Not a phase. See [[Localization Playbook]]. A product that only holds up in English is not done.

## Before saying done

- [ ] Works in Arabic and English, both directions, on a real device
- [ ] Every state above exists and has been seen
- [ ] No fake data anywhere
- [ ] Tested on the oldest device we care about, not just the newest
- [ ] Someone other than the author has used it without instructions
- [ ] Accessible: contrast checked, touch targets large enough, works with larger system text
- [ ] Nothing in the console. No errors, no warnings we have stopped noticing
- [ ] Copy reviewed. Arabic by someone who writes Arabic well
- [ ] Analytics in place, see [[Measurement]]

## Right sizing

Not everything needs the same treatment. Be explicit about which of the three a piece of work is:

- **Throwaway**, an internal experiment nobody outside will see. Speed over polish, and it never becomes production without a rewrite
- **Internal**, a tool our team uses. Correct and clear. Polish optional
- **Shipped**, anyone outside the company can see it. Full bar, no exceptions

The failure is a throwaway drifting into shipped without anyone deciding. Name it at the start.

## Verify before done

Claiming something works without seeing it work is the fastest way to lose trust, internally and with clients. Run it. Look at it. In both languages. Then say it is done.
