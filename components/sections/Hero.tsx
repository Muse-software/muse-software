"use client";

import Image from "next/image";
import { useState } from "react";
import TextType from "../TextType";

export default function Hero() {
  const [gifError, setGifError] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center gap-8 overflow-hidden bg-[#060508]">
      {/* GIF — 90vw on mobile, capped on desktop */}
      <div className="relative w-[90vw] max-w-xl md:max-w-2xl aspect-square">
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

      {/* Text below GIF */}
      <TextType
        text={["قريبًا", "Coming Soon", "Próximamente", "Bientôt", "Demnächst", "もうすぐ"]}
        typingSpeed={75}
        deletingSpeed={50}
        pauseDuration={1500}
        showCursor
        cursorCharacter="▎"
        cursorBlinkDuration={0.5}
        className="text-white/90 font-bold font-space-grotesk"
        style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
      />
    </section>
  );
}
