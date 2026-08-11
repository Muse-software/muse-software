---
type: note
status: paused
created: 2026-07-30
tags: [studio, strategy]
---

# Productised Solutions

Parked. Not one of the three pillars in [[Business Lines]].

## What the idea was

Software for local businesses, sold to many of them: booking for salons, barbers, clinics and vets, loyalty for cafes, restaurants and retail. Build once per vertical, sell it many times, monthly per location.

It was line three in the original strategy dump. It is not a pillar now because Abdullah's three are [[Ventures]], [[Marketing]] and [[Studio]], and adding a fourth thing at this size would starve all of them.

## Why it is worth keeping the note

The idea is sound and it may arrive naturally through client work. The realistic route in is not to launch a product line, it is to build something once for a real paying client, notice that the next three businesses in that vertical need the same thing, and only then productise it.

If that happens, this becomes a venture and goes through [[Venture Pipeline]] like anything else.

## What made it hard, preserved so it is not rediscovered from scratch

The software is the easy part. These are the things that decide whether it works.

**Distribution.** Reaching a thousand small businesses is a sales problem, not a product problem. Direct, resellers, an existing platform, or franchise groups where one deal delivers many locations. This is the question that determines everything else.

**Support.** A cafe owner whose booking system is down at 8pm calls someone. Who, in what language, how fast, and at what cost per customer per month.

**Payments.** Recurring billing in SAR, VAT invoicing, and the fact that small businesses here often prefer bank transfer to cards, see [[Localization Playbook#Payments]].

**Saying no.** Every customer asks for the one thing only they need. Building those turns a product into forks nobody can maintain. Rule if this ever restarts: it gets built when three customers ask independently.

## Local requirements worth remembering

These were the genuinely useful findings, and they apply to any product for local businesses, ours or a client's. Unverified, but worth checking rather than rediscovering.

- **WhatsApp is the channel** for confirmations and reminders, not email and not push. Check current Business API rules and per message cost, since it lands directly on unit economics
- **Arabic first, full RTL**, especially for the staff interface. The receptionist is the heaviest user
- **Prayer times must block the calendar.** A system that offers a slot during prayer is broken
- **Friday and Saturday is the weekend,** and Friday has its own shape
- **Ramadan hours are completely different,** often night heavy. A schedule mode, not manual editing of every day
- **Prepaid packages and balances** are normal in salons. Ten sessions bought up front
- **Walk ins exist** alongside appointments. A pure appointment model does not match how a barber works
- **Women's salons may not display staff names or photos publicly.** Design for it rather than patching it
- **Wallet passes beat apps** for loyalty. Nobody downloads an app for one cafe
- **Phone number is the identity,** not email
- **The till moment is the whole product** for loyalty. If claiming a stamp takes more than a few seconds in a queue, staff stop offering it and the programme dies
- **Health data is regulated.** Verify obligations with someone qualified before storing a single patient record, see [[Company Setup]]

## If this ever restarts

- Pick one vertical and go deep rather than building something generic for all of them
- Decide distribution before building anything
- Cost the support model honestly before pricing
