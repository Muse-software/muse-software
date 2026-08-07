# Adaptation Boundary Research: How Close Is Too Close

*Status: Policy research draft for founder review. Not legal advice — see §5.*

## 1. TLDR — The Direct Answer

- **Generally safe to take** (idea/functional layer, not protectable under copyright almost anywhere): the problem being solved, the business model, information architecture, navigation flow, interaction patterns (swipe-to-match, driver-rating loops), and category conventions users already expect (cart icon, checkout steps).
- **Legally risky — avoid without explicit legal clearance**:
  - Copying literal UI screens, exact pixel layouts, custom iconography, or a distinctive visual "look and feel" (trade dress risk).
  - Reusing a competitor's brand assets, name, logo, tagline, or confusingly similar app name/domain (trademark risk).
  - Lifting proprietary marketing/UI copy, help text, or onboarding scripts verbatim (copyright — expression, not idea).
  - Scraping or reusing a competitor's proprietary datasets (menus, pricing, driver/user data) — copyright *and* trade-secret/data-protection exposure.
  - Implementing a mechanism that is the subject of a granted patent (e.g., a specific matching/routing algorithm claimed in a patent) — patent infringement is strict liability, independent invention is not a defense.
- **Rule of thumb**: rebuild from the *why* (user problem, unit economics, local constraints), not from screenshots of the *how*. If you can explain the feature without ever having looked at the competitor's screen, you're almost certainly clear.
- **Naming and branding must be original** even when the product concept is intentionally derivative (Careem is not "Uber Arabia"; Jahez is not "Uber Eats KSA").
- **The Careem/Jahez precedent is legitimate** precisely because they built independent brands, independent codebases, and localized UX for local payment rails, language, and logistics — they did not fork Uber's or DoorDash's code or assets.

## 2. Legal Primer (General Terms, Not Saudi-Specific)

**Copyright protects expression, not ideas or functionality.** This is the foundational doctrine (idea–expression dichotomy, codified in the US at 17 U.S.C. §102(b), and mirrored conceptually in Berne-derived laws worldwide, including Saudi Arabia's).
- *Lotus Development Corp. v. Borland Int'l*, 49 F.3d 807 (1st Cir. 1995), aff'd by an equally divided Supreme Court, 516 U.S. 233 (1996): Lotus 1-2-3's menu command hierarchy was ruled an uncopyrightable "method of operation," even though Borland copied it to let users switch spreadsheets. — https://cyber.harvard.edu/property/protection/lotus.html
- *Google LLC v. Oracle America, Inc.*, 593 U.S. 1 (2021): the Supreme Court held Google's reuse of ~11,500 lines of Java API declaring code was fair use, emphasizing that interfaces enabling interoperability sit closer to the "method of operation" boundary. Law-firm summary: https://www.skadden.com/insights/publications/2021/04/supreme-court-rules-in-favor-of-google
- *Feist Publications, Inc. v. Rural Telephone Service Co.*, 499 U.S. 340 (1991): factual compilations/data are not copyrightable absent original selection/arrangement — relevant to reusing a competitor's dataset. — https://supreme.justia.com/cases/federal/us/499/340/

**Trade dress protects distinctive, non-functional visual identity** (color schemes, packaging, a truly distinctive app look) once it acquires secondary meaning. *Two Pesos, Inc. v. Taco Cabana, Inc.*, 505 U.S. 763 (1992). — https://supreme.justia.com/cases/federal/us/505/763/

**Trademark protects names, logos, and source-identifying marks** — separate from copyright, and the fastest way to get sued/blocked from app stores. USPTO trademark basics: https://www.uspto.gov/trademarks/basics

**Patents protect specific, novel, non-obvious mechanisms** if filed and granted — e.g., a particular dynamic-pricing algorithm or matching method. Patent infringement does not require copying; independent reinvention still infringes if claims are met. USPTO utility patent basics: https://www.uspto.gov/patents/basics

## 3. Saudi Arabia Context

Saudi Arabia is a **Berne Convention** member (acceded 2004) and a **WTO/TRIPS** member (2005), meaning foreign works (competitor apps, UI, code, brand assets) receive copyright and trademark protection in Saudi courts, not just their home country's. Berne members: https://www.wipo.int/treaties/en/ip/berne/ — TRIPS overview: https://www.wto.org/english/tratop_e/trips_e/trips_e.htm. Saudi IP is administered domestically by the **Saudi Authority for Intellectual Property (SAIP)** under Copyright Law (Royal Decree M/41) and the Patent/Trademark regulations: https://www.saip.gov.sa/en/.

**Action item: before any venture that closely mirrors a specific named competitor (not just the category, but a particular company's product), Muse must get sign-off from a qualified Saudi IP lawyer** — this document is not a substitute.

## 4. Pre-Launch Checklist (Founder-Run, Legal-Reviewed)

| Check | Who | Pass condition |
|---|---|---|
| Name/logo trademark search (Saudi + GCC + source market) | Founder → legal counsel confirms | No confusing similarity, no existing SAIP filing |
| UI/UX built from original wireframes, not competitor screenshots | Design lead | No literal screen copies in Figma history |
| All copy (onboarding, legal, marketing) written fresh | Content lead | Zero verbatim strings from competitor |
| No competitor datasets scraped/reused | Eng lead | Data lineage documented as first-party or licensed |
| Patent landscape check for core mechanism (esp. algorithms, logistics tech) | Legal counsel | No blocking granted patent in target jurisdiction |
| Named-competitor proximity review | Legal counsel (mandatory if venture is a direct 1:1 mirror of one company) | Written go/no-go memo before launch |

**Go/No-Go framework**: Green = category-level inspiration, original assets, no named-competitor mirroring → proceed. Yellow = close functional mirror of a named competitor but original assets/code/copy → proceed only after legal counsel review. Red = any literal asset copying, scraped data, or known-patented mechanism → do not launch until resolved.

## 5. Disclaimer

This document is general business education compiled from public legal sources for internal policy planning. **It is not legal advice and creates no attorney-client relationship.** Muse must engage a qualified Saudi IP lawyer to review any venture — especially one closely mirroring a specific named competitor — before launch.
