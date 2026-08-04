"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SceneGrade } from "../hero3d/MonitorsScene";

/**
 * Candidate hero: the pmndrs monitor wall in place of the flat PixelBlast
 * field, with the same shader running on the screen of the centre CRT.
 *
 * The type layout diverges from `Hero.tsx` on purpose. The live hero centres
 * its headline in the middle of the viewport; here it is anchored bottom-left,
 * in the slot the tagline bar used to hold, so the wall is unobstructed. The
 * tagline and subtitle are gone rather than relocated — the headline now
 * occupies their row, and the offer clause it gained does their job.
 *
 * The 3D scene is client-only and heavy (a Draco-compressed model, a reflector
 * pass, ten live render targets, bloom and depth of field). `ssr: false` keeps
 * all of it out of the server render, and the dynamic boundary keeps it off the
 * critical path so the headline — the LCP element — still paints on time.
 */
const MonitorsScene = dynamic(() => import("../hero3d/MonitorsScene"), { ssr: false });

/**
 * Preview copy, deliberately not in the message catalogue.
 *
 * The other two lines come from `Home.hero.*`, which the live hero also reads —
 * editing those keys would silently change the shipped homepage, which is not
 * what a scratch route is for. This clause is new, so it sits here until the
 * hero is chosen. If it ships it needs a real key and an Arabic translation;
 * until then `/ar/hero-preview` renders this one sentence in English.
 */
const HEADLINE_OFFER = "Let us ship yours.";

/**
 * Shared by the h1 and the offer line so the three lines stay one block.
 *
 * Smaller than the live hero's `clamp(1.1rem, 5.2vw, 4.75rem)` in both
 * directions. That setting was tuned for type centred in the middle of the
 * viewport with nothing beside it; anchored bottom-left above a CTA row it
 * came out overbearing on desktop and crowded the button, so the ceiling drops
 * from 76px to 40px. The floor moves much less — 28px to about 26px — because
 * the phone layout was close to right already.
 */
const HEADLINE_SIZE = "clamp(1.6rem, 3vw, 2.5rem)";

export default function HeroMonitors({ grade }: { grade?: SceneGrade }) {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative flex min-h-[34rem] h-[70vh] md:h-screen flex-col overflow-hidden bg-[#060608]">
      {/* Decorative; the centre screen takes clicks. */}
      <div aria-hidden="true" className="absolute inset-0">
        <MonitorsScene grade={grade} />
      </div>

      {/* Same two jobs as the flat hero's fade: puts the tagline bar on solid
          dark, and resolves the scene into the page black so the hero meets the
          next section with no seam. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#060608] to-transparent" />

      {/* Bottom band: headline where the tagline bar used to be, CTA alongside.
          The headline is still HTML rather than drawn into the 3D scene — text
          on a canvas is invisible to search engines and to screen readers, and
          this is the page's LCP element.

          `mt-auto` alone pushes this to the bottom of the flex column; nothing
          fills the space above it. An empty `flex-1` spacer would do the same
          job visually and then quietly eat every pointer event over the middle
          of the wall, which is where the interactive monitor is.

          `pointer-events-none` here for the same reason: this band overlaps the
          lower half of the scene, and hover and clicks have to reach the canvas
          underneath it. The CTA opts back in. */}
      <div className="pointer-events-none relative z-10 mt-auto pb-8 md:pb-12">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10">
          {/* Three stacked rows: claim, turn, then the offer alongside the
              CTA. The headline keeps the full container width so neither of
              its lines has to compete with the button for space. */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Left-aligned and free to wrap, unlike the centred version this
                replaces — that one was `whitespace-nowrap` with a vw
                coefficient hand-tuned to the exact character count, which
                breaks the moment the copy changes. Bottom-left type has room
                to wrap, so it is allowed to. */}
            <h1
              className="flex flex-col items-start gap-2 text-white font-bold font-space-grotesk text-start leading-[1.05] tracking-tight md:gap-3"
              style={{ fontSize: HEADLINE_SIZE }}
            >
              <span className="block">{t("headlineLead")}</span>
              {/* `box-decoration-clone` keeps the white box intact if the line
                  wraps on a narrow screen; without it the box breaks into two
                  slabs with flat inner edges. */}
              <span className="hero-highlight box-decoration-clone block bg-white text-black">
                {t("headlineTurn")}
              </span>
            </h1>

            {/* The offer clause gets the row the tagline used to hold: it
                reads as the headline's third line, but it shares the rule and
                the button because it is the line that asks for the click.
                Same face and size as the h1 so the three lines scan as one
                block; it sits outside the h1 so the heading stays the claim. */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-6">
              <p
                className="font-bold font-space-grotesk text-white leading-[1.05] tracking-tight lg:flex-1"
                style={{ fontSize: HEADLINE_SIZE }}
              >
                {HEADLINE_OFFER}
              </p>

              <div className="hidden lg:flex items-center flex-1 max-w-xs lg:mx-6">
                <div className="w-full h-px bg-white relative">
                  <div className="arrow-inline absolute end-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-white" />
                </div>
              </div>
              <Link
                href="/contact"
                className="pointer-events-auto self-start inline-flex items-center gap-5 whitespace-nowrap border border-black bg-white text-black py-2 ps-5 pe-3 md:py-3 md:ps-6 md:pe-4 text-base md:text-lg font-medium font-space-grotesk hover:bg-[#fd4601] transition-colors duration-200 shrink-0"
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
      </div>
    </section>
  );
}
