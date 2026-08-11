"use client";

/**
 * Last-resort boundary: it replaces the entire tree, including
 * `app/[locale]/layout.tsx`, so it must render its own `<html>`/`<body>`.
 *
 * Everything here is inline-styled on purpose. The locale layout's fonts and
 * `globals.css` are gone by the time this renders, and an error page that
 * depends on the stylesheet pipeline is an error page that can fail for the
 * same reason the app did. The `lang`/`dir` are hardcoded because the locale
 * is not recoverable at this level.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#060608",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#fd4601",
            }}
          >
            Error
          </p>
          <h1
            style={{
              margin: "1rem 0 0",
              fontSize: "2rem",
              lineHeight: 1.15,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Something went wrong.
          </h1>
          <p
            style={{
              margin: "1.5rem 0 0",
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            An unexpected error stopped this page from loading. Try again, and if
            it keeps happening, email{" "}
            <a href="mailto:info@muse.sa" style={{ color: "#fd4601" }}>
              info@muse.sa
            </a>
            .
          </p>
          {error.digest ? (
            <p
              style={{
                margin: "1rem 0 0",
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2.5rem",
              padding: "0.75rem 1.5rem",
              border: "1px solid #000000",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
