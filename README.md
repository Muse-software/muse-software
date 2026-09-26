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

All project CTAs open an email draft addressed to **abdullah@muse.sa**, with a localized subject. There is no email input, automatic message sending, lead capture, browser draft, form API or email-provider credential requirement. Visitors send the email from their own app. Existing `/en/start`, `/ar/start` and `/contact` links lead to an email/WhatsApp contact page with a visible, copyable address.

WhatsApp uses **+966 59 273 1040** (`https://wa.me/966592731040`). The footer includes Instagram, LinkedIn and X. Destinations are centralized in `lib/contact.ts`. Email and WhatsApp handoff require a compatible app or web handler; they do not prove that a message was delivered.

## Architecture

- `app/[locale]`: localized routes, metadata and layouts.
- `components/mosaic`: homepage, native WebGL pixel hero, shared card hover renderer and particle marks. Reduced motion and graphics-failure fallbacks stay supported.
- `components/site`: navigation, footer, email CTA, service/about/legal templates and shared styles.
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
MUSE_TEST_URL=http://127.0.0.1:3103 npm run test:performance
```

Use `MUSE_CHROMIUM` to select an existing Chromium executable. Browser evidence goes to ignored `test-results/`. Contact tests intercept email/WhatsApp navigation: they do not send messages. Run graphics/performance suites separately to avoid contention.

See [release notes](docs/RELEASE.md) for scope and verification. To restore forms later, first agree on consent, provider/storage configuration, abuse protection, failure recovery and real delivery checks, then replace the centralized email entry points.
