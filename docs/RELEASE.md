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

### Icon and interaction refinement

Public navigation, project actions, service links, careers, contact and error-state arrows use bundled Font Awesome Free SVGs through a shared component. FAQ disclosure marks use the same icon source. UI conventions explicitly prohibit emoji and text-arrow substitutes.

The hero again uses the original PixelBlast noise coverage, 0.6x clock, randomized initial phase and jitter. Mosaic's color and directional composition remain as opacity treatment rather than a fixed density ribbon. Reduced-motion, visibility suspension and graphics fallbacks are retained.

The mobile intent chooser keeps its layout and gains direction-aware touch/pen swiping across the entire panel. Selection stops at either end; vertical scrolling, pinch zoom, direct button taps and keyboard operation remain available. Horizontal drags cannot accidentally launch the email action.

Browser touch checks pass at 320px and 390px in English and Arabic, including both directions, boundaries, swipes over controls, quick follow-up taps, short/cancelled gestures and vertical scrolling. Physical iOS/Android device testing remains unverified.

### Restored enquiry with email handoff

The previous three-step Mosaic form is public again at the localized `/start` routes. Project CTAs enter the form and preserve the selected intent; footer email and WhatsApp links remain direct. No API or external delivery service was restored.

The final action prepares a localized email to abdullah@muse.sa containing goal, timing, note, name, reply address, optional company and requested phone contact. Visitors send it themselves. The handoff screen offers reopening, full-message copy, manual selection when clipboard access fails, and editing. Long notes remain complete in the on-page message and encoded draft; a notice explains email-app length limits.

Tab-scoped draft recovery, invalid input, blocked storage and language changes are supported. Arabic keeps IBM Plex Sans Arabic, RTL alignment and Western digits; icons use Font Awesome. Privacy text now describes local drafts accurately.

Validation covers English/Arabic at 320, 390 and 1440px, malformed contact details, phone digit normalization, subject/body encoding, interrupted drafts, long Arabic notes and denied clipboard access. Browser tests intercept mailto handoffs: real email-app behavior and delivery remain unverified.
