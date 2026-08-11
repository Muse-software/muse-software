---
type: playbook
created: 2026-07-30
tags: [process, launch]
---

# Launch Checklist

Run before anything goes in front of real users, ours or a client's. Adapt per project, but do not skip sections silently.

## Product

- [ ] [[Quality Bar]] passed and actually verified, not assumed
- [ ] Arabic and English both checked on a real device
- [ ] All states seen: empty, loading, error, offline, first run
- [ ] Tested by someone who did not build it
- [ ] Old device and slow connection tested

## Measurement

- [ ] Analytics installed and events firing, verified in the dashboard rather than in the code
- [ ] The one metric that defines success is instrumented, see [[Measurement]]
- [ ] Crash and error reporting live, with alerts going somewhere a person reads
- [ ] Baseline recorded, so the after can be compared to the before

## Legal and compliance

- [ ] Privacy policy exists, in Arabic and English, and describes what the product actually does
- [ ] Terms of service exist
- [ ] Consent captured where personal data is collected, per data protection requirements
- [ ] For marketing messages, consent captured separately from the terms
- [ ] Where data is stored is a known and deliberate answer
- [ ] Store listings complete in both languages, including screenshots with Arabic UI

## Operations

- [ ] Support route exists and someone is behind it
- [ ] Someone is on call for the first week, named
- [ ] Rollback plan, and it has been tested
- [ ] Backups running and a restore has actually been attempted
- [ ] Domains, certificates and renewals not expiring in the next quarter
- [ ] Credentials stored somewhere the team can reach without asking one person

## Timing

- [ ] Not launching Thursday afternoon or Friday, since the local weekend means nobody is there when it breaks
- [ ] Not launching the day before a holiday or in the first days of Ramadan or Eid unless that is the point
- [ ] Someone available for the twenty four hours after launch

## Communication

- [ ] Client informed and aligned on what happens at launch, if applicable
- [ ] Announcement copy ready in both languages
- [ ] Screenshots and assets ready
- [ ] Anyone answering support knows what shipped

## After launch

- [ ] Watch the first day of real usage rather than moving straight to the next thing
- [ ] Review date set in the calendar, thirty days out
- [ ] Case study started while details are fresh
- [ ] Retrospective, and at least one playbook updated as a result
