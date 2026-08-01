---
type: playbook
created: 2026-07-30
tags: [process, localization]
---

# Localization Playbook

The most important playbook in this vault. [[Product Philosophy]] rests on adapting products for the Saudi market, and the difference between adapting and translating is everything. This is also the hardest thing for an outside competitor to copy.

Anything marked verify is a working assumption that needs checking against current sources before it drives a decision.

## Rule zero

Arabic is not a feature. It is the first language of the product, and English is the second. Build the Arabic version first and the RTL problems never accumulate. Build English first and you will spend a month retrofitting.

## Language and script

- Arabic written natively, not translated. See [[Brand Voice#Arabic voice]]
- Full RTL layout mirroring: navigation, icons with direction, progress, sliders, carousels, back gestures, charts
- Numerals: decide once whether the product uses Arabic-Indic or Western numerals in Arabic, and apply it consistently. Most Saudi digital products use Western numerals, verify against the audience
- Text expansion and contraction. Arabic often runs shorter than English but taller, so line height and vertical rhythm need attention more than width
- Mixed direction strings, an Arabic sentence with a Latin brand name or a phone number in it, are where RTL bugs live. Test them specifically
- Names: many people have long multi part names. Single first and last name fields break
- Sorting and search must work in Arabic, including with and without diacritics, and with alef variants normalised

## Time and calendar

- Hijri and Gregorian. Which one is primary depends on the product, but both usually need to be visible somewhere
- Ramadan changes behaviour for a month. Eating, sleeping, working, shopping and exercise all shift. Any product with a daily rhythm needs a Ramadan mode, not an apology
- Prayer times structure the day. Five interruptions, and many businesses close during them. Booking, scheduling, delivery and notifications all need to respect this
- Weekend is Friday and Saturday. A calendar that starts the week on Monday and greys out Saturday and Sunday is wrong
- Eid holidays are major commerce and travel moments. Dates move each year

## Payments

Verify all of this against current sources before building.

- Mada is the domestic debit network and card presence is high
- Apple Pay adoption is strong, so it belongs in any checkout
- Buy now pay later is widely used, Tabby and Tamara being the well known names
- STC Pay and similar wallets matter for some audiences
- Bank transfer is still a normal way for a business to pay a monthly invoice, which matters for anything billed monthly
- Cash on delivery persists in some categories
- Currency is SAR. Two decimal places, and decide the symbol treatment in both scripts
- VAT applies. Whether prices are shown inclusive and how invoices are issued has a compliance dimension, see [[Company Setup]]

## Identity and trust

- Nafath and Absher are the national identity and government service platforms. For anything gov adjacent or high trust, users expect national identity login rather than an email and password
- National Address is the standard addressing format. Free text address fields produce unusable data
- Phone number is the primary identifier for most consumer products, not email

## Channels

- WhatsApp is the default communication channel for both consumers and small businesses. Transactional messages, reminders and support all live there. Email is for receipts and formality
- SMS still works for OTP
- Push notifications compete with a crowded lock screen, so they need to be worth it
- Instagram, Snapchat and X are significant. Platform mix varies sharply by age, verify against current data before planning any launch

## Devices and infrastructure

- iOS share is high compared with global averages, and iOS users skew toward the audiences that pay. This affects build order. Verify the current split
- Mobile data is fast and widely available, but design for the lift transition and the underground car park anyway
- Test on real devices in real conditions, including in sunlight, since a dark maroon interface behaves differently outdoors

## Culture and content

- Gender segregated contexts exist in many businesses, and products serving them need to reflect that in structure rather than as an afterthought. See [[Productised Solutions#Local requirements worth remembering]] for concrete cases
- Photography and illustration should show people from here. Stock imagery of the wrong context is immediately obvious and undermines trust
- Family and group dynamics matter. Many decisions are made collectively, so a product designed around a lone individual user may be modelling the wrong thing
- Formality register in Arabic is a real design decision. Too casual reads as unprofessional, too formal reads as a government form

## Regulation to check

Not advice, just the list of things to ask a qualified person about. See [[Company Setup]].

- Personal data protection law and its implementing regulations. Where data may be stored, what consent looks like, what rights users have
- Health data and anything clinical carries additional requirements
- Financial services and anything touching payments has its own regime
- Unsolicited commercial messaging rules, relevant to any marketing message or campaign, see [[Content Engine]]
- E-invoicing requirements for anything issuing invoices

## Checklist for any project

- [ ] Arabic designed first, English second
- [ ] Every screen checked in RTL, including mixed direction strings
- [ ] Hijri handled where relevant
- [ ] Prayer times and Friday to Saturday weekend respected
- [ ] Ramadan behaviour considered
- [ ] Payment methods match how people here actually pay
- [ ] Phone number as identity, National Address where addresses are needed
- [ ] WhatsApp as the notification channel where appropriate
- [ ] Real local content in the design, no translated placeholders
- [ ] Reviewed by someone who writes Arabic well
