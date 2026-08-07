"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { useResponsivePixelSize } from "@/lib/use-responsive-pixel-size";

/**
 * The shader background is client-only and pulls in three + postprocessing.
 * Deferring it into its own async chunk keeps that weight off the critical
 * path so the headline — the LCP element — isn't waiting on WebGL to paint.
 */
const PixelBlast = dynamic(() => import("../PixelBlast"), { ssr: false });

/** Coarser than DitherField's 3/4/5: this is the blocky, jittered hero field,
 *  not the fine dot dissolve behind the subpage headers. */
const PIXEL_SIZES = { mobile: 4, tablet: 5, desktop: 6 } as const;

export default function Hero() {
  const t = useTranslations("Home.hero");
  const pixelSize = useResponsivePixelSize(
    PIXEL_SIZES.mobile,
    PIXEL_SIZES.tablet,
    PIXEL_SIZES.desktop,
  );

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden bg-black pb-10 pt-28 md:h-screen md:pb-12 md:pt-0"
    >
      {/* Decorative background field. `.copper-bloom` is a CSS-only radial
          wash in the locked brand orange (globals.css) that sits behind
          PixelBlast at all times — the hero's base surface, not a fallback
          bolted on for one failure case. If PixelBlast cannot mount at all
          (no WebGL context available — see the probe in PixelBlast.tsx), the
          hero still reads as an intentional, on-brand surface rather than
          flat, empty black. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="copper-bloom absolute inset-0" />
        <PixelBlast
          variant="square"
          pixelSize={pixelSize}
          color="#FE4701"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.4}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.2}
          transparent
        />
      </div>

      {/* Bottom fade, doing two jobs: it puts the tagline bar on solid dark, and
          it resolves the section's burgundy into the page black (#060608) so the
          hero meets the next section with no visible seam. Anchored to the
          bottom only — nothing tints the pixel field above it. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#060608] to-transparent" />

      {/* Headline. Mobile stacks headline -> tagline -> CTA in one natural
          flow: the section no longer forces a `70vh` box that this block
          centred inside, which is what stranded the tagline/CTA far below
          it with a dead gap on short copy. Desktop keeps the original
          spacious, vertically centred composition via `md:h-screen` on the
          section plus `md:flex-1`/`md:justify-center` here. */}
      <div className="relative z-10 pointer-events-none md:flex md:flex-1 md:items-center md:justify-center">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10">
          {/* Both lines are nowrap and sized in vw so the second never breaks
              "one." onto its own line. The vw coefficient is set by the
              longer of these two lines (21 characters) and tuned against the
              padded container at 390px — recalibrated 2026-08-08 for
              Territory A's shorter copy; the previous coefficient was tuned
              for a 30-character line and rendered this one far smaller than
              IntentRouter's heading below it. */}
          <h1
            className="mx-auto flex flex-col items-center gap-2 text-white font-bold font-space-grotesk text-center leading-[1.1] tracking-tight md:gap-3"
            style={{ fontSize: "clamp(2rem, 7.6vw, 5.25rem)" }}
          >
            <span className="block whitespace-nowrap">{t("headlineLead")}</span>
            {/* Highlighter, not a card: a plain white fill hugging the glyphs,
                no outline, square corners. The box metrics are per-script and
                live in globals.css under `.hero-highlight` — Arabic ink is
                half again as tall as Latin and its descenders drop twice as
                far, so one line-height cannot hug both. */}
            <span className="hero-highlight block whitespace-nowrap bg-white text-black">
              {t("headlineTurn")}
            </span>
          </h1>
        </div>
      </div>

      {/* Tagline + subtitle + CTA, one coherent block. `mt-10` gives mobile a
          fixed, deliberate gap under the headline; `md:mt-auto` switches to
          pinning the whole block to the section's bottom edge once
          `md:h-screen` gives the flex column real leftover space to push
          into. The old decorative rule-and-arrowhead between the copy and
          the button carried no information — it only filled the gap on wide
          screens — so it is gone; `md:justify-between` does that job. */}
      <div className="relative z-10 mt-10 md:mt-auto">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="flex flex-col gap-2 md:max-w-xl md:gap-3">
              {/* Sized under the headline on purpose. The h1 is nowrap, so it
                  lands around 20px on a phone; at the old text-2xl this line
                  outweighed it and the hierarchy read backwards. */}
              <p className="font-semibold font-space-grotesk text-white leading-[1.15] tracking-tight text-lg md:text-3xl lg:text-4xl">
                {/* "Muse" is a Latin run opening an Arabic sentence in `ar`.
                    `<bdi>` isolates it from the surrounding RTL paragraph so
                    the bidi algorithm can't reorder it against the Arabic
                    that follows — the same class of bug the phone/email
                    `dir="ltr"` spans on /contact and /start exist to prevent. */}
                {t.rich("tagline", { brand: (chunks) => <bdi>{chunks}</bdi> })}
              </p>
              <p className="max-w-lg text-sm leading-[1.5] text-white md:text-xl">
                {t("subtitle")}
              </p>
            </div>

            <Link
              href="/start"
              className="min-h-11 self-start inline-flex items-center gap-3 whitespace-nowrap border border-black bg-white px-5 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] md:px-6 md:text-lg shrink-0"
            >
              {t("cta")}
              {/* A plain forward chevron, not the up-right "external link"
                  glyph this replaced — `/start` is an internal route, and
                  the old glyph read as if it opened somewhere else. Matches
                  the arrow IntentRouter's rows use just below. */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="arrow-inline" aria-hidden="true">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
