import type { NextConfig } from "next";

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
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
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
};

export default nextConfig;
