"use client";

import Image from "next/image";
import { useState } from "react";
import RotatingText from "../RotatingText";

export default function Hero() {
  const [gifError, setGifError] = useState(false);

  return (
    <section className="relative flex h-[70vh] md:h-screen flex-col overflow-hidden bg-[#060508]">
      {/* Statue GIF — centered, constrained to not overflow */}
      <div className="absolute inset-0 bottom-40 md:bottom-28 flex items-center justify-center">
        <div className="relative w-[80vw] max-w-md md:max-w-2xl aspect-square">
          {!gifError ? (
            <Image
              src="/hero-bg.gif"
              alt=""
              fill
              className="object-contain object-center"
              priority
              unoptimized
              onError={() => setGifError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#060508]" />
          )}
        </div>
      </div>

      {/* Overlay headline */}
      <div className="relative z-10 flex flex-1 items-center justify-center pointer-events-none pb-32 md:pb-24">
        <h1
          className="text-white font-bold font-space-grotesk text-center leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
        >
          Win the next decade.
        </h1>
      </div>

      {/* Bottom tagline bar */}
      <div className="relative z-10 mt-auto px-5 md:px-12 pb-6 md:pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          {/* Left: tagline + subtitle */}
          <div className="flex flex-col gap-1.5 md:gap-2">
            <p
              className="font-bold font-space-grotesk text-white leading-tight flex flex-wrap items-center gap-x-1.5 md:gap-x-2"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.75rem)" }}
            >
              <span>Your</span>
              <RotatingText
                texts={[
                  "Artificial Intelligence",
                  "Digital Transformation",
                  "Gamification",
                  "Digital Experience",
                  "Agentic AI",
                  "Generative AI",
                  "Game Design",
                ]}
                mainClassName="px-1.5 md:px-3 bg-[#fd4601] text-white overflow-hidden py-0.5 md:py-1 rounded-md md:rounded-lg inline-flex"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
              <span>partner.</span>
            </p>
            <p className="text-white/60 text-xs md:text-base max-w-md">
              We set &amp; execute your enterprise AI strategy at startup speed.
            </p>
          </div>

          {/* Right: arrow + learn more button */}
          <div className="flex items-center gap-6">
            <div className="hidden md:block w-40 lg:w-56 h-px bg-white/30 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-white/30" />
            </div>
            <a
              href="#next-section"
              className="inline-flex items-center gap-2 border border-white/80 text-white px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium font-space-grotesk hover:bg-white hover:text-black transition-colors duration-200"
            >
              Learn more
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="md:w-3.5 md:h-3.5">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
