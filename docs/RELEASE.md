# Mosaic public release — September 2026

## Shipped experience

Mosaic is the main English/Arabic website. The refined homepage retains its pixel identity, softer hero transition, inset belief/closing panels, enlarged Arabic actions, responsive intent chooser and clearer service descriptions. English and Arabic share the same navigation and public service catalogue.

## Temporary contact mode

Project buttons open a localized email draft to `abdullah@muse.sa`. The input and three-step inquiry are removed from the live experience. Old contact URLs provide the address and WhatsApp as alternatives, with no forced app launch on page load. No form endpoint accepts visitor data.

WhatsApp: `https://wa.me/966592731040` (owner supplied).

Social destinations:
- Instagram: https://www.instagram.com/muse_software/ — live profile matched Muse Studios branding, Saudi software-studio description and muse.sa website link.
- X: https://x.com/muse_software — live profile matched Muse's name, handle and Saudi studio description.
- LinkedIn: https://www.linkedin.com/company/musesoftware/ — confirmed by the owner; public inspection requires sign-in.

## Public repository cleanup

Internal documentation, review evidence, archived directions, old form code, study assets, source presentations and unused graphics dependencies were preserved locally outside the repository. Their live archive routes and API routes are removed. Public technical documentation and tests remain in the repository. This cleanup changes the current tree, not historical Git commits.

## Verification and limits

The public smoke suite checks English/Arabic desktop and mobile rendering, mail/WhatsApp targets, chooser/FAQ/menu interactions, public services and contact fallback, absent forms, retired routes and automated accessibility. Graphics checks cover reduced motion and WebGL failure/recovery. External message delivery and physical device behavior require separate real-world checks.

Before reintroducing forms, restore the archived implementation deliberately with a configured provider, appropriate persistence and abuse controls, and end-to-end delivery verification. Do not reinstate abandoned routes or unpublished studio documents as part of that work.

The release updates Next.js and its lint configuration to 16.3.6 and refreshes compatible transitive dependencies. The dependency audit reports zero known vulnerabilities after these updates.

### Release validation — September 27, 2026

- Production webpack build, TypeScript and lint pass.
- Six browser configurations pass: English/Arabic at 320, 390 and 1440px. No automated WCAG A/AA violations were found in the homepage checks.
- Email/WhatsApp handoffs, social destinations, intent chooser, FAQ keyboard controls, mobile navigation and contact fallback pass without sending messages.
- About, careers and a career detail, legal pages, service detail, language switching, legacy redirects and generated social image pass.
- Eight graphics checks pass across both languages: motion lifecycle, shared card renderer, reduced-motion changes, unavailable WebGL and context-loss fallback.
- Retired forms, archive/newsletter routes and sitemap exclusions verified. Mobile hero, footer and contact captures inspected directly.
- External app delivery and physical-device behavior remain unverified. The build emits a metadata-base fallback warning for its internal fallback route; public localized pages set the Muse production metadata base.
