# Muse — Mosaic

Muse's bilingual software-studio website. English uses Space Grotesk; Arabic uses IBM Plex Sans Arabic, RTL layouts and Western digits.

## Run

```sh
npm ci
cp .env.example .env   # then set CAPTCHA_SECRET (openssl rand -base64 48)
npm run dev
```

`next.config.ts` refuses to start without a valid `CONTACT_EMAIL` and a `CAPTCHA_SECRET` of at least 32 characters. `CONTACT_EMAIL` is the single source for every mailto link, the footer, careers, legal copy (`{email}` in `messages/*.json`) and SEO data. It is inlined at build time, so rebuild after changing it.

The default address is http://localhost:3000. For the local production preview:

```sh
NEXT_OUTPUT_DIR=.next-muse-release npm run build -- --webpack
NEXT_OUTPUT_DIR=.next-muse-release npm start -- -p 3103 -H 127.0.0.1
```

Stop the preview before rebuilding its output directory. Use a separate output directory for a concurrent development server.

## Current contact mode

Project CTAs lead to the three-step enquiry at `/en/start` or `/ar/start`, preserving a selected project intent. Visitors choose a goal, describe the idea and timing, enter their contact details and solve a security check, then **Send enquiry** posts to `POST /api/inquiry`.

- **Validation** lives in `validateInquiry` (`lib/project-inquiry.ts`) and runs in the browser (on blur and submit) and again on the server, with the same bilingual messages.
- **Captcha**: `components/captcha/Captcha.tsx` is a reusable six-character, case-sensitive hexadecimal challenge (`0-9 a-f A-F`). `GET /api/captcha` returns an SVG drawn from stroked paths plus a signed, single-use token valid for 10 minutes; `verifyCaptcha` in `lib/captcha.ts` checks it. Any attempt burns the token, so the component loads a new image after every rejection. To protect another form, render `<Captcha ref={captcha}/>`, send `captcha.current.value()` with the request, and call `verifyCaptcha(token, answer)` before storing.
- **Storage**: after validation and captcha verification, `saveSubmission` (`lib/submissions.ts`) writes one pretty-printed JSON file per submission, keyed `<form>/<yyyy>/<mm>/<timestamp>_<id>.json`. Files hold the project and contact details plus user agent, referrer and an HMAC of the IP address.
  - **On Vercel nothing is stored**: the team email is the only copy (Vercel's filesystem is read-only, and email is enough for current volume). The email is therefore sent *before* replying. If it fails, or Microsoft credentials are missing, the visitor gets an error with the prepared-email fallback, so an enquiry is never silently lost. Logs show `NOT delivered and not stored` in that case.
  - **Locally and on self-hosted servers** they go to `data/submissions/` (override with `SUBMISSIONS_DIR`), mode 0600 and git-ignored, and the email is sent after the reply with retries.
  - Force a mode with `SUBMISSIONS_STORAGE=disk` or `SUBMISSIONS_STORAGE=none`.

- **Team notification**: after the response is sent (`after()`), `lib/inquiry-notification.ts` emails the enquiry from `MAIL_FROM` to `MAIL_TO` with `MAIL_CC` copied, Reply-To set to the visitor. Mail goes through Microsoft Graph (`lib/mailer.ts`) as the Microsoft 365 shared mailbox `noreply@muse.sa`. Each record's `notification` field tracks `pending` / `sent` / `failed` / `skipped`. Failures are retried after later submissions, up to 5 attempts within 7 days. Without `MS_*` credentials, mail runs in dry-run mode: it is logged, marked `skipped`, and never replayed.

- **Rate limiting** (`lib/rate-limit.ts`), in memory, sliding windows, HTTP 429 with `Retry-After`:
  - `POST /api/inquiry`: 8 per 10 minutes and 30 per day per IP; 100 per hour site-wide. Every attempt counts, including wrong captchas. The limit is checked before the captcha, so a limited visitor keeps their typed code.
  - `GET /api/captcha`: 30 per 10 minutes per IP; 3000 per hour site-wide.
  - The client IP is the `X-Forwarded-For` entry added by the nearest trusted proxy (`TRUSTED_PROXY_HOPS`, default 1). Run the app behind a reverse proxy that sets this header: without one, visitors can forge it, and only the site-wide caps still hold. Limits reset on restart and are per process.

Drafts are saved in the current browser tab using session storage, can be restored or discarded on return (including across language changes), and are cleared after a successful send. If sending fails, the form offers a prepared email as a fallback.

Direct email and **+966 59 273 1040** WhatsApp (`https://wa.me/966592731040`) remain available in the footer and form sidebar. Social destinations and contact links are centralized in `lib/contact.ts`; draft formatting and validation live in `lib/project-inquiry.ts`.

## Email notification setup (Microsoft 365)

One-time admin steps. `noreply@muse.sa` is an existing shared mailbox.

1. **Entra admin center → App registrations → New registration** (single tenant, for example "Muse website mailer"). Copy the *Directory (tenant) ID* and *Application (client) ID*.
2. **API permissions → Add → Microsoft Graph → Application permissions → `Mail.Send`**, then **Grant admin consent**.
3. **Certificates & secrets → New client secret.** Copy the value and note its expiry date: mail stops when it expires.
4. **Restrict the app to `noreply@muse.sa`.** Without this, `Mail.Send` can send as any mailbox. In Exchange Online PowerShell:
   ```powershell
   Connect-ExchangeOnline
   New-DistributionGroup -Name "Website mail senders" -Alias website-mail-senders -Type Security
   Set-DistributionGroup website-mail-senders -HiddenFromAddressListsEnabled $true
   Add-DistributionGroupMember website-mail-senders -Member noreply@muse.sa
   New-ApplicationAccessPolicy -AppId <CLIENT_ID> -PolicyScopeGroupId website-mail-senders -AccessRight RestrictAccess -Description "Website sends only as noreply@muse.sa"
   Test-ApplicationAccessPolicy -Identity noreply@muse.sa -AppId <CLIENT_ID>   # AccessCheckResult: Granted
   Test-ApplicationAccessPolicy -Identity info@muse.sa -AppId <CLIENT_ID>      # AccessCheckResult: Denied
   ```
   Policy changes can take up to an hour to apply.
5. Set `MS_TENANT_ID`, `MS_CLIENT_ID` and `MS_CLIENT_SECRET` in the server's `.env` and restart. Logs show `[inquiry] notification sent for <REF>` on success, or the Graph error on failure.

## Architecture

- `app/[locale]`: localized routes, metadata and layouts.
- `components/mosaic`: homepage, native WebGL pixel hero, shared card hover renderer and particle marks. Reduced motion and graphics-failure fallbacks stay supported.
- `components/site`: navigation, footer, enquiry CTA, service/about/legal templates and shared styles.
- `components/inquiry`: bilingual guided enquiry form with draft recovery.
- `components/captcha`: reusable case-sensitive hexadecimal captcha.
- `app/api/captcha`, `app/api/inquiry`: captcha issue and enquiry submission endpoints.
- `lib/captcha.ts`, `lib/submissions.ts`: captcha signing/verification and JSON submission storage (server-only).
- `lib/mailer.ts`, `lib/inquiry-notification.ts`: Microsoft Graph sender, enquiry email template, and retry of failed notifications (server-only).
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

Use `MUSE_CHROMIUM` to select an existing Chromium executable. Browser evidence goes to ignored `test-results/`. Contact tests intercept email/WhatsApp navigation, and the inquiry test stubs `/api/captcha` and `/api/inquiry` to assert the submitted payload without writing files. Run graphics/performance suites separately to avoid contention.

See [release notes](docs/RELEASE.md) for scope and verification. Burned captcha tokens are tracked in process memory, so a multi-instance deployment needs a shared store.

## UI conventions

Use the shared `components/Icon.tsx` Font Awesome SVG component for interface icons. Do not use emoji or Unicode arrow glyphs. Preserve IBM Plex Sans Arabic and Western digits for Arabic.

The mobile intent panel supports horizontal touch/pen swipes as well as its existing buttons. Swipe direction follows LTR/RTL reading order; vertical scrolling and pinch zoom remain native. The hero retains the original PixelBlast evolving FBM coverage and 0.6x clock, with Mosaic color, composition and fades applied independently of pixel coverage.
