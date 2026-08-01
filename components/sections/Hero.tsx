"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * The shader background is client-only and pulls in three + postprocessing.
 * Deferring it into its own async chunk keeps that weight off the critical
 * path so the headline — the LCP element — isn't waiting on WebGL to paint.
 */
const PixelBlast = dynamic(() => import("../PixelBlast"), { ssr: false });

/**
 * The shader multiplies pixelSize by the device pixel ratio (PixelBlast.tsx,
 * `uPixelSize` in setSize), so a fixed 6 becomes 12 to 18 device pixels on a
 * phone and the field reads as coarse blocks rather than a dither. Step it
 * down with the viewport so the texture stays the same visual weight.
 *
 * pixelSize is in PixelBlast's effect dependency array, so a change here
 * rebuilds the WebGL context. That is fine because this only fires when a
 * breakpoint is actually crossed, not on every resize frame.
 */
const PIXEL_SIZES = { mobile: 4, tablet: 5, desktop: 6 } as const;

function useResponsivePixelSize() {
  const [size, setSize] = useState<number>(PIXEL_SIZES.desktop);

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 768px)");
    const desktop = window.matchMedia("(min-width: 1280px)");
    const update = () =>
      setSize(
        desktop.matches
          ? PIXEL_SIZES.desktop
          : tablet.matches
            ? PIXEL_SIZES.tablet
            : PIXEL_SIZES.mobile,
      );
    update();
    tablet.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      tablet.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return size;
}

export default function Hero() {
  const t = useTranslations("Home.hero");
  const pixelSize = useResponsivePixelSize();

  return (
    <section className="relative flex min-h-[34rem] h-[70vh] md:h-screen flex-col overflow-hidden bg-black">
      {/* Dithered pixel field — decorative; click anywhere for a ripple */}
      <div aria-hidden="true" className="absolute inset-0">
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

      {/* Overlay headline. The top padding is load-bearing on narrow screens:
          the headline runs to four lines under ~400px and would otherwise
          ride up under the fixed logo. Verified at 360px. */}
      <div className="relative z-10 flex flex-1 items-center justify-center pointer-events-none pt-16 pb-32 md:pt-0 md:pb-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10">
          {/* Both lines are nowrap and sized in vw so the second never breaks
              "one." onto its own line. The vw coefficient is set by the longer
              line (30 characters) and was tuned by measuring the rendered width
              against the padded container down to 360px. */}
          <h1
            className="mx-auto flex flex-col items-center gap-2 text-white font-bold font-space-grotesk text-center leading-[1.1] tracking-tight md:gap-3"
            style={{ fontSize: "clamp(1.1rem, 5.2vw, 4.75rem)" }}
          >
            <span className="block whitespace-nowrap">{t("headlineLead")}</span>
            {/* Highlighter, not a card: the fill hugs the glyphs. Gradient
                hairline comes from the two-layer background trick, maroon
                clipped to the padding box and the orange-to-amber ramp to the
                border box, showing through a transparent 1px border. Square
                corners are deliberate. */}
            <span
              className="block whitespace-nowrap px-[0.18em] py-[0.04em] text-[#fe4701]"
              style={{
                border: "1px solid transparent",
                borderRadius: 0,
                background:
                  "linear-gradient(#4C0014, #4C0014) padding-box, linear-gradient(100deg, #fe4701, #ffbd0a) border-box",
              }}
            >
              {t("headlineTurn")}
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom tagline bar */}
      <div className="relative z-10 mt-auto pb-8 md:pb-12">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-6">
            {/* Left: tagline + subtitle */}
            <div className="flex flex-col gap-2 lg:gap-3 lg:flex-1">
              {/* Sized under the headline on purpose. The h1 is nowrap, so it
                  lands around 20px on a phone; at the old text-2xl this line
                  outweighed it and the hierarchy read backwards. */}
              <p className="font-semibold font-space-grotesk text-white leading-[1.1] tracking-tight text-lg md:text-3xl lg:text-4xl">
                {t("tagline")}
              </p>
              <p className="text-white text-sm md:text-xl leading-[1.3] max-w-lg">
                {t("subtitle")}
              </p>
            </div>

            {/* Arrow line + Learn more button */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs lg:mx-6">
              <div className="w-full h-px bg-white relative">
                {/* CSS-triangle arrowhead on the end of the rule. The border
                    trick has no logical equivalent, so the shape itself is
                    mirrored under RTL rather than the properties: `end-0`
                    moves it to the left edge and `arrow-inline` flips the
                    triangle to point the same way the rule travels. */}
                <div className="arrow-inline absolute end-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-white" />
              </div>
            </div>
            <Link
              href="/contact"
              className="self-start inline-flex items-center gap-5 whitespace-nowrap border border-black bg-white text-black py-2 ps-5 pe-3 md:py-3 md:ps-6 md:pe-4 text-base md:text-lg font-medium font-space-grotesk hover:bg-[#fd4601] transition-colors duration-200 shrink-0"
            >
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 30 30" fill="none" className="arrow-inline" aria-hidden="true">
                <rect width="30" height="30" fill="black" />
                <path d="M10.0066 22V21.0033H11.0053V20.0066H12.004V19.0099H13.0026V18.0132H14.0013V17.0165H15V16.0198H15.9987V15.0231H16.9974V14.0264H17.996V13.0297H18.9947V12.033H19.9934V17.0316H22V8H13.004V10.0026H18.0145V10.9993H17.0159V11.996H16.0172V12.9927H15.0185V13.9895H14.0198V14.9862H13.0211V15.9829H12.0225V16.9796H11.0238V17.9763H10.0251V18.973H9.02642V19.9697H8V21.9723H10.0066V22Z" fill="white" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
