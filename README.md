# Muse — Mosaic

Muse's bilingual software-studio website. English uses Space Grotesk; Arabic uses IBM Plex Sans Arabic, RTL layouts and Western digits.

## Run

```sh
npm ci
npm run dev
```

The default address is http://localhost:3000. For the local production preview:

```sh
NEXT_OUTPUT_DIR=.next-muse-release npm run build -- --webpack
NEXT_OUTPUT_DIR=.next-muse-release npm start -- -p 3103 -H 127.0.0.1
```

Stop the preview before rebuilding its output directory. Use a separate output directory for a concurrent development server.

## Current contact mode

Project CTAs lead to the restored three-step enquiry at `/en/start` or `/ar/start`, preserving a selected project intent. Visitors choose a goal, describe the idea and timing, then enter their contact details. **Continue to email** opens a prepared draft addressed to **abdullah@muse.sa** with their answers and a localized subject. They review and send it from their own email app. The website never reports delivery as confirmed.

There is no submission API, email service, account requirement or automatic lead capture. Drafts are saved only in the current browser tab using session storage and can be restored or discarded on return, including across language changes. If storage is unavailable the form still works in memory. The handoff screen retains the full message, supports copying/manual selection, and explains that some email apps can truncate long mailto links.

Direct email and **+966 59 273 1040** WhatsApp (`https://wa.me/966592731040`) remain available in the footer and form sidebar. Social destinations and contact links are centralized in `lib/contact.ts`; draft formatting and validation live in `lib/project-inquiry.ts`.

## Architecture

- `app/[locale]`: localized routes, metadata and layouts.
- `components/mosaic`: homepage, native WebGL pixel hero, shared card hover renderer and particle marks. Reduced motion and graphics-failure fallbacks stay supported.
- `components/site`: navigation, footer, enquiry CTA, service/about/legal templates and shared styles.
- `components/inquiry`: restored bilingual guided form, browser-only draft recovery, and email handoff.
- `lib/studio-services.ts`: public bilingual service content.
- `lib/contact.ts`: email, WhatsApp and confirmed social destinations.
- `messages`: public metadata, navigation, careers and legal translations.

The active site does not depend on Three.js or postprocessing. Archived designs, form implementations, internal planning documents, review captures, source decks and unused assets are preserved outside this public repository. Archive URLs return 404; former creative-direction URLs redirect to the homepage. The unfinished newsletter route is also retired. Do not copy private company knowledge or visitor data into this repository.

The Arabic search-publication gate in `i18n/routing.ts` is retained: Arabic is browsable but remains noindex pending editorial publication approval.

## Validate

```sh
npm run lint
npx tsc --noEmit
npx playwright install chromium
MUSE_TEST_URL=http://127.0.0.1:3103 npm run test:public
MUSE_TEST_URL=http://127.0.0.1:3103 npm run test:motion
MUSE_TEST_URL=http://127.0.0.1:3103 npm run test:swipe
MUSE_TEST_URL=http://127.0.0.1:3103 npm run test:inquiry
MUSE_TEST_URL=http://127.0.0.1:3103 npm run test:performance
```

Use `MUSE_CHROMIUM` to select an existing Chromium executable. Browser evidence goes to ignored `test-results/`. Contact tests intercept email/WhatsApp navigation: they do not send messages. Run graphics/performance suites separately to avoid contention.

See [release notes](docs/RELEASE.md) for scope and verification. Before adding server-side form delivery later, configure a provider, abuse controls and appropriate storage/privacy handling, and verify real delivery end to end.

## UI conventions

Use the shared `components/Icon.tsx` Font Awesome SVG component for interface icons. Do not use emoji or Unicode arrow glyphs. Preserve IBM Plex Sans Arabic and Western digits for Arabic.

The mobile intent panel supports horizontal touch/pen swipes as well as its existing buttons. Swipe direction follows LTR/RTL reading order; vertical scrolling and pinch zoom remain native. The hero retains the original PixelBlast evolving FBM coverage and 0.6x clock, with Mosaic color, composition and fades applied independently of pixel coverage.
