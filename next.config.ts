import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// A nonce-based CSP (dropping 'unsafe-inline' from script-src) was tried via
// middleware and reverted: Next can only inject a fresh per-request nonce
// into dynamically-rendered HTML, so every statically-generated route's
// pre-rendered script tags carried a stale/mismatched nonce and got blocked
// outright, breaking hydration site-wide. Fixing it would mean forcing every
// route to dynamic rendering — an unacceptable trade against the static-first
// architecture this site otherwise relies on for performance. 'unsafe-inline'
// stays until inline scripts are eliminated entirely (there's currently one:
// the homepage JSON-LD block) or the site adopts per-route dynamic rendering.
const securityHeaders = [
  // Two `blob:` allowances were added for the 3D hero, both measured against a
  // real load rather than guessed at:
  //
  //   worker-src  three's DRACOLoader decompresses the monitor model in a
  //               worker it builds by inlining the decoder into a Blob. Without
  //               this it falls through to `default-src 'self'`, which does not
  //               cover `blob:`, and the model fails to load outright.
  //   connect-src GLTFLoader hands the model's embedded texture to
  //               ImageBitmapLoader as a blob URL, which fetches it. Blocked,
  //               the geometry still draws but every monitor renders untextured.
  //
  // Two things are deliberately *absent*. `'wasm-unsafe-eval'`: Draco ships a
  // faster WebAssembly decoder, but enabling wasm compilation relaxes
  // script-src for every script on the site, so the loader is pinned to the
  // plain-JS decoder instead (see useComputersModel.ts). And `blob:` in
  // script-src, which troika-three-text needs for its glyph worker — the hero
  // paints text with a 2D canvas texture instead, so it never comes up.
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' blob:; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

// Routes that exist at `/{locale}/{path}` and used to live at the bare path.
const LOCALE_INDEX_PATHS = [
  "explore",
  "about",
  "careers",
  "newsletter",
  "contact",
  "privacy",
  "terms",
];

// Sections with detail pages. `services` is here but not above on purpose:
// there is no `/services` index route, only `/services/[slug]`, so redirecting
// the bare path would 308 into a 404 instead of just 404ing.
const LOCALE_CHILD_PATHS = ["careers", "services"];

// Everything retired now lands on /explore, the surviving page that says what
// Muse actually does. Insights used to point at /playbooks; when the playbooks
// were archived that would have become a redirect chain ending in a 404, so
// they are repointed here rather than left to hop.
const RETIRED_SECTIONS = ["insights", "playbooks"];

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  /**
   * Two jobs, and the order matters — Next matches redirects top-down.
   *
   * 1. Retired sections. Insights, the newsletter back catalogue and now the
   *    playbooks are all gone (see archive/README.md), so the site publishes
   *    no article section at all. These are permanent so search engines drop
   *    the old URLs rather than keep recrawling them, and every retired
   *    article maps to /explore rather than a guessed one-to-one replacement,
   *    since none exists.
   *
   * 2. Locale prefixing. Every previously-indexed URL was English, so it must
   *    land on `/en/...`. Without these an inbound English link would fall
   *    through to the proxy, get locale-detected, and drop a visitor with an
   *    Arabic Accept-Language onto the Arabic page — silently changing the
   *    language of a link someone shared.
   *
   * `/` is deliberately absent: it belongs to the proxy so locale detection
   * runs there.
   */
  async redirects() {
    return [
      { source: "/get-started", destination: "/en/start", permanent: true },
      {
        source: "/:locale(ar|en)/get-started",
        destination: "/:locale/start",
        permanent: true,
      },
      ...RETIRED_SECTIONS.flatMap((section) => [
        { source: `/${section}`, destination: "/en/explore", permanent: true },
        { source: `/${section}/:slug`, destination: "/en/explore", permanent: true },
        {
          source: `/:locale(ar|en)/${section}`,
          destination: "/:locale/explore",
          permanent: true,
        },
        {
          source: `/:locale(ar|en)/${section}/:slug`,
          destination: "/:locale/explore",
          permanent: true,
        },
      ]),
      { source: "/newsletter/:slug", destination: "/en/newsletter", permanent: true },
      {
        source: "/:locale(ar|en)/newsletter/:slug",
        destination: "/:locale/newsletter",
        permanent: true,
      },
      ...LOCALE_INDEX_PATHS.map((path) => ({
        source: `/${path}`,
        destination: `/en/${path}`,
        permanent: true,
      })),
      ...LOCALE_CHILD_PATHS.map((path) => ({
        source: `/${path}/:slug+`,
        destination: `/en/${path}/:slug+`,
        permanent: true,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
