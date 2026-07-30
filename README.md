# Muse Studios

Marketing site for Muse Studios — an AI transformation, product engineering, and gamification studio based in Riyadh. Built as a fully static-first Next.js site: every content page (insights, playbooks, services, newsletters, career listings) is pre-rendered at build time from a typed content model in `lib/content/`, not fetched from a CMS or database.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger (scroll-driven reveals, the nav panel), Motion/Framer Motion (rotating text), three.js (one decorative WebGL orb, with a CSS fallback) |
| Fonts | Space Grotesk (display), Inter / Inter Tight (body), self-hosted via `next/font` |
| Email | Resend (contact / get-started form delivery) |
| Deployment | Vercel — pushes to `main` auto-deploy |

No CMS, no database, no `NEXT_PUBLIC_*` environment variables, no client-side state library. Content lives in code; the only runtime state is form submissions and pagination/filter UI state.

## Getting started

```bash
npm install
npm run dev      # Turbopack dev server, http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

`RESEND_API_KEY` and `CONTACT_EMAIL_TO` are optional env vars for the contact/get-started forms — without them, submissions are still logged locally (see [Forms & submissions](#forms--submissions)) but no email is sent.

## Project structure

```
app/
  layout.tsx                 # Root layout: fonts, base metadata, nav, footer, page loader
  page.tsx                   # Homepage
  globals.css                # Tailwind entry + hand-authored CSS (ticker, loader, patterns)
  sitemap.ts / robots.ts     # Generated from the live content model, not hand-maintained
  opengraph-image.tsx        # Default branded OG image (next/og), used as a fallback
  about/, careers/, contact/, explore/, get-started/,
  insights/, newsletter/, playbooks/, privacy/, terms/, services/
                              # One folder per route; [slug] folders are dynamic content routes
  api/
    contact/, get-started/, subscribe/   # POST-only route handlers, rate-limited + validated

components/
  sections/                  # Page-level content blocks (Hero, Services, FAQ, ArticleDetail, ...)
  *.tsx                      # Cross-page primitives (StaggeredMenu, Pagination, PageLoader,
                              # Motion3D, WordReveal, Icon, MuseLogo, SocialLinks, ...)

lib/
  content/
    shared.ts                # Shared types (Insight, Playbook, Service, ...) + category helpers
    insights.ts / playbooks.ts / services.ts / newsletters.ts / careers.ts
                              # The actual content, plus each file's own derived category list
    index.ts                 # Barrel export — always import from "lib/content", not a subfile
  seo.ts                      # buildMetadata() / buildArticleJsonLd() / buildJobPostingJsonLd()
  email.ts                    # Shared Resend dispatch used by both form-backed API routes
  rateLimit.ts                # In-memory sliding-window limiter for the API routes
  submissions.ts               # Appends form submissions to a local JSONL log (PII, gitignored)
  validation.ts                # Email/length validation shared by the API routes
  useFormSubmit.ts              # Shared idle/submitting/success/error hook for the three forms
  useHorizontalScroll.ts        # Shared drag/wheel/button scroll-track behavior for card carousels

public/
  brand/                     # Logo marks, the looping Motion3D background frames
  photos/                    # Stock photography reused across content items
```

## Content model

Everything under `lib/content/` is a plain typed array — no CMS, no fetch, no database. Each file exports its array plus (for insights and playbooks) a **derived category list**:

```ts
// lib/content/insights.ts
export const insights: Insight[] = [ /* 43 items */ ];
export const insightCategories: InsightCategory[] =
  Array.from(new Set(insights.map((item) => item.category))).sort();
```

**Categories are not a hardcoded enum.** `InsightCategory` is just `string` — the set of categories that actually exist is computed from whatever's in the data. Add a new insight or playbook with a new `category` value and it automatically appears in the filter chips and (for insights) gets its own indexable URL on the next build. No type or list to update by hand.

This is deliberate: Insights and Playbooks currently use **two unrelated taxonomies**, computed independently:

- **Insights** (43 items): a skill/discipline taxonomy — AI, Machine Learning, Data Engineering, Product Engineering, Gamification, GTM Engineering.
- **Playbooks** (28 items): an industry-vertical taxonomy — FinTech, Healthcare, E-Commerce, Manufacturing, Government, Cybersecurity, and 16 others — since these are project case studies, not how-to guides.

| Content type | Count | Has categories | Dedicated category URLs |
|---|---|---|---|
| `services` | 3 | — | — |
| `insights` | 43 | ✅ dynamic | ✅ `/insights/[category]` |
| `playbooks` | 28 | ✅ dynamic | client-side filter only |
| `newsletters` | 12 | — | — |
| `careerRoles` | 3 | — | — |

Every content item is passed through a `Pick<>`-based **summary type** (`InsightSummary`, `PlaybookSummary`, `NewsletterSummary`) before being handed to a client list component — list/grid views never receive an article's full body or FAQs, only what the card actually renders. Since props into a `"use client"` component serialize fully into the React Flight payload, this keeps full article bodies out of the JS shipped for list pages.

## Routing architecture

Almost the entire site is statically generated (`generateStaticParams` + `dynamicParams = false`) — content routes are pre-rendered HTML, not server-rendered per request. The one deliberately dynamic-per-request piece is `app/opengraph-image.tsx` (default social-share image, edge runtime).

**`/insights/[slug]` does double duty.** It serves both individual articles (`/insights/where-ai-creates-roi`) and SEO-friendly category pages (`/insights/ai`, `/insights/gtm-engineering`). Next can't have `[slug]` and `[category]` as sibling dynamic routes at the same path — they'd collide — so both sets of static params are generated from the same file, and the page branches at request time on whether the incoming slug matches a known category slug first, falling through to an article lookup otherwise. The two slug spaces are verified not to collide (no article is slugged `ai`, `machine-learning`, etc.). Category chips are real `<Link>`s to these URLs, not client-side query-param state — each category is bookmarkable, shareable, and crawlable with real content in its initial HTML.

Playbooks intentionally do **not** get the same per-category URL treatment yet — with 28 items and 22 categories, most categories have only 1–2 entries; the filter is client-side state in `PlaybooksList`. Revisit if the catalog grows enough to justify indexable category pages.

## Forms & submissions

Three forms (`ContactForm`, `GetStartedForm`, `NewsletterForm`) share one state-machine hook (`useFormSubmit`) and hit three API routes (`/api/contact`, `/api/get-started`, `/api/subscribe`). Each route:

1. Rate-limits by IP (`lib/rateLimit.ts` — in-memory sliding window, 5 requests/minute, with a periodic sweep so the map doesn't grow unbounded).
2. Validates email format and caps field lengths (`lib/validation.ts`) before touching anything else.
3. Appends the submission to `data/submissions.jsonl` (`lib/submissions.ts`) — JSONL specifically because appending a line is safe under concurrent requests, unlike a read-modify-write of one JSON array. **This directory is gitignored and contains visitor PII; it only persists on a host with a real writable filesystem** — on serverless (Vercel), writes here fail loudly rather than silently, and would need swapping for a real datastore before going live serverless.
4. Sends via Resend if `RESEND_API_KEY` is set (shared dispatch logic in `lib/email.ts`); otherwise logs a warning and still returns success, so the form works end-to-end in local dev without a provider configured.
5. `GetStartedForm` additionally has a honeypot field (`tabIndex={-1}` + `aria-hidden`, excluded from tab order and assistive tech) to filter bot submissions.

## SEO strategy

- **`lib/seo.ts`** is the single source of truth for page metadata — every page builds its `<title>`/description/canonical/OG/Twitter tags through `buildMetadata()` rather than a bare object literal. Without it, `alternates.canonical` and `openGraph`/`twitter` silently inherit the root layout's values (this was a real bug: every subpage briefly shared the homepage's canonical URL and share preview).
- **`app/opengraph-image.tsx`** generates a branded default OG image; pages with their own featured image (articles, jobs) pass it explicitly, everything else falls back to this.
- **Article/JobPosting JSON-LD** (`buildArticleJsonLd`, `buildJobPostingJsonLd`) on every article-type detail page and career listing.
- **`app/sitemap.ts`** is generated from the live content arrays — every insight, playbook, newsletter, career role, service, and insight category page is included automatically, with real per-item `lastModified` dates (not a uniform "everything changed today").
- **`app/robots.ts`** disallows `/api/*` (POST-only endpoints, nothing to index).
- Every content detail page is a real `async` Server Component — full text is in the initial server-rendered HTML for every crawler, not hydration-only.

## Security

- **CSP + standard hardening headers** applied to every route via `next.config.ts`: `Content-Security-Policy`, `Strict-Transport-Security` (2yr, preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, and `poweredByHeader: false`.
- **`'unsafe-inline'` is still in the CSP's `script-src`/`style-src`, deliberately.** A nonce-based CSP was implemented and tested, then reverted — Next can only inject a fresh per-request nonce into *dynamically*-rendered HTML, so every statically-generated route's pre-rendered script tags carried a stale nonce and got blocked outright, breaking hydration site-wide. Fixing it properly would mean forcing the whole site to dynamic rendering, an unacceptable trade against the static-first architecture everything else here depends on. This stays until the one remaining inline script (the homepage's JSON-LD block) is eliminated or the site adopts per-route dynamic rendering.
- **No secrets reach the client** — zero `NEXT_PUBLIC_*` variables; `process.env` access is confined to server-only route files.
- **Rate limiting + input validation** on all three form-backed API routes (see [Forms & submissions](#forms--submissions)).
- **No `dangerouslySetInnerHTML` on user input anywhere** — the only uses are static, code-authored JSON-LD blocks (`type="application/ld+json"`).

## Performance

- **GSAP and three.js are code-split via `next/dynamic()`**, not in the shared bundle every route pays for — `StaggeredMenu` (nav) and `Glossy3D` (decorative WebGL orb) both load their heavy libraries only where used.
- **`Glossy3D` fails safe**: a WebGL context creation failure (sandboxed environments, some headless browsers) falls back to a CSS approximation instead of a blank page.
- **Motion3D** (the looping copper-object background used in Hero/SubpageHero/CTA) takes an explicit `priority` prop, set only on the one instance per page that's actually the LCP candidate (Hero/SubpageHero) — never on CTA's instance, which sits below the fold on first load.
- The homepage hero animation ships as a hand-tuned animated WebP (halved frame count from the original export, quality-tuned, alpha preserved) rather than the original 3.4MB unoptimized asset.
- Every horizontal card carousel (Testimonials, BeliefSlider, OutlineTrack, Playbooks-adjacent tracks) shares one hook (`useHorizontalScroll`) that also remaps a plain vertical mouse-wheel gesture to horizontal scroll — `overflow-x: auto` alone only responds to touch/trackpad swipes and the prev/next buttons.

## Accessibility

- The nav panel (`StaggeredMenu`) uses `inert` (not just `aria-hidden`) while closed, so its links can't be tabbed into while off-screen; traps focus while open; returns focus to the toggle button on Escape; and exposes a real `<nav aria-label="Main menu">` landmark.
- Root layout has a working skip link and a real `<main>` landmark.
- Form error messages use `role="alert"`; all three forms have real `<label>`s (including a `sr-only` one on the newsletter form) and a correct `<fieldset>`/`<legend>` for the service-selection radio group.
- Every animation respects `prefers-reduced-motion`, including the page-load/route-change loader and the word-reveal scroll animations.

## Known animation gotcha (dev-mode only)

`WordReveal` (the scroll-triggered word-by-word reveal used for most headings) is deliberately **not** ScrollTrigger-driven for elements that are already in the viewport the moment they mount — which is every hero heading, on every page. A ScrollTrigger created after its element has already crossed its own "start" point is documented to fire immediately, but that path proved unreliable specifically on client-side navigation: opacity would resolve correctly while the position transform stayed permanently pinned at its hidden state, visually overlapping the content above it. If you see overlapping headings after a soft navigation, check `WordReveal.tsx`'s in-view bypass before reaching for a scroll-position or timing fix — the actual bug was a GSAP/ScrollTrigger `toggleActions` timing nuance, not a CSS or React issue.

## Deployment

Deployed via Vercel. Pushes to `main` trigger automatic deployments. The `data/` submission log is filesystem-based and does not persist on Vercel's serverless runtime — see [Forms & submissions](#forms--submissions) if this ships there without a datastore swap.
