"use client";

import Image from "next/image";
import { useState } from "react";
import RotatingText from "../RotatingText";

export default function Hero() {
  const [gifError, setGifError] = useState(false);

  return (
    <section className="relative flex max-[479px]:h-auto max-[479px]:min-h-0 h-[70vh] md:h-screen flex-col overflow-hidden bg-[#060608]">
      {/* Statue GIF — centered */}
      <div className="absolute inset-0 bottom-40 md:bottom-28 flex items-center justify-center max-[479px]:relative max-[479px]:bottom-0 max-[479px]:pt-[18vh] max-[479px]:pb-8">
        <div className="relative w-[90vw] max-w-lg md:max-w-3xl aspect-square">
          {!gifError ? (
            <Image
              src="/hero-bg-new.gif"
              alt="Animated statue visual"
              fill
              className="object-contain object-center"
              priority
              unoptimized
              onError={() => setGifError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#060608]" />
          )}
        </div>
      </div>

      {/* Overlay headline */}
      <div className="relative z-10 flex flex-1 items-center justify-center pointer-events-none pb-32 md:pb-24 max-[479px]:absolute max-[479px]:inset-0 max-[479px]:pb-0">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10">
          <h1
            className="text-white font-bold font-space-grotesk text-center leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 6rem)" }}
          >
            Win the next decade.
          </h1>
        </div>
      </div>

      {/* Bottom tagline bar */}
      <div className="relative z-10 mt-auto pb-8 md:pb-12">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-6">
            {/* Left: tagline + subtitle */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <p className="font-semibold font-space-grotesk text-white leading-[1.1] tracking-tight flex flex-nowrap items-baseline gap-x-1.5 md:gap-x-3 text-2xl md:text-3xl lg:text-4xl">
                <span>Your</span>
                <RotatingText
                  texts={[
                    "AI Transformation",
                    "Digital Product",
                    "Gamification",
                    "Digital Experience",
                    "Agentic AI",
                    "Generative AI",
                    "Game Design",
                  ]}
                  mainClassName="text-[#fd4601] overflow-hidden inline-flex"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
                <span>partner.</span>
              </p>
              <p className="text-white text-base md:text-xl leading-[1.2] max-w-lg">
                We set &amp; execute your strategy at startup speed.
              </p>
            </div>

            {/* Arrow line + Learn more button */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs lg:mx-6">
              <div className="w-full h-px bg-white relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-white" />
              </div>
            </div>
            <a
              href="https://wa.me/966592731040"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-5 whitespace-nowrap border border-black bg-white text-black py-2 pl-5 pr-3 md:py-3 md:pl-6 md:pr-4 text-base md:text-lg font-medium font-space-grotesk hover:bg-[#fd4601] transition-colors duration-200 shrink-0"
            >
              Get in touch
              <svg width="16" height="16" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <rect width="30" height="30" fill="black" />
                <path d="M10.0066 22V21.0033H11.0053V20.0066H12.004V19.0099H13.0026V18.0132H14.0013V17.0165H15V16.0198H15.9987V15.0231H16.9974V14.0264H17.996V13.0297H18.9947V12.033H19.9934V17.0316H22V8H13.004V10.0026H18.0145V10.9993H17.0159V11.996H16.0172V12.9927H15.0185V13.9895H14.0198V14.9862H13.0211V15.9829H12.0225V16.9796H11.0238V17.9763H10.0251V18.973H9.02642V19.9697H8V21.9723H10.0066V22Z" fill="white" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
