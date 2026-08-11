---
type: venture
id: V-002
status: idea
stage: Idea
category: Consumer health
reference: Lose It!
owner: unassigned
created: 2026-07-30
tags: [venture]
---

# V-002 Nutrition Tracker

Food and calorie tracking built for how people here actually eat. Reference product: Lose It!.

## Problem

Tracking food is tedious and gets abandoned in the first week. The apps that survive make logging fast and make the food database match what the user actually eats. For a Saudi user, both of those fail: the food is not in the database, or it is there as an American approximation.

## Why the reference works

Lose It! and its peers win on database coverage, barcode scanning and speed. The insight is that the moat is the data, not the interface.

## The local gap

This is the strongest opening of the three ventures, because the gap is structural rather than cosmetic.

- Saudi and Gulf dishes are missing or wrong in the global databases. Kabsa, jareesh, mutabbaq, margoog, saleeg, harees
- Portions are described differently. People eat from a shared platter, not a 100 gram serving
- Local restaurant chains and cafes are absent. Al Baik, Kudu, Herfy, local coffee chains, the shawarma place on the corner
- Local supermarket barcodes, Tamimi, Panda, Danube, Othaim, are hit and miss in global barcode databases
- Ramadan changes the entire eating pattern for a month. Two meals, different timing. Apps built around three meals and a daily total do not fit

## Why this is hard, and why that is good

Building the food database is the work. It is slow, unglamorous, and it is exactly what makes the product defensible. A competitor with a better interface and no local database loses. Consider:

- Seeding from public nutrition data plus lab or published values where they exist
- User submitted entries with review, which is how the global ones did it
- Restaurant partnerships for accurate menu data, which is also a business relationship worth having
- Barcode contributions from users, since the long tail is unwinnable any other way

AI has an honest use here: photo to estimated portion, and parsing a typed Arabic description of a mixed plate into components. Check against [[AI Guidelines]] rather than assuming.

## Open questions

- [ ] Run it through [[Idea Scoring]]
- [ ] How do we get the first ten thousand accurate local food entries, and what does it cost
- [ ] Is the database itself a product, licensable to gyms, clinics and other apps
- [ ] Does this pair with [[V-001 Workout Tracker]] as one product or two
- [ ] Regulatory question: health claims and dietary advice may be regulated. Check before shipping anything that looks like medical guidance

## Next action

Spend a day testing how badly the global apps handle a normal Saudi day of eating. Document the failures with screenshots. That document is both the validation and the pitch.
