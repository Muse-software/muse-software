"use client";

import Image from "next/image";
import { motion } from "motion/react";
import WordReveal from "../WordReveal";

// Placeholder logos — swap for real client marks once brand assets land.
const logos = ["Acme", "Globex", "Initech", "Vandelay"];

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden bg-[#060608] px-5 py-20 md:px-10 md:py-32">
      <div className="pattern-crosshair pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[70%] w-[45vw] max-w-[520px] opacity-25">
        <Image
          src="/photos/cover-red-light-figure.jpg"
          alt=""
          fill
          sizes="(min-width: 1156px) 520px, 45vw"
          className="object-cover [mask-image:linear-gradient(to_top,black_40%,transparent_100%)]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="text-right">
          <p className="font-space-grotesk text-xl text-white/80 md:text-2xl">
            AI isn&rsquo;t optional.{" "}
            <WordReveal
              as="span"
              className="font-space-grotesk font-bold text-[#fd4601] text-2xl md:text-4xl"
            >
              Waiting is the risk.
            </WordReveal>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0.1, 1] }}
          className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-10 md:mt-32 md:flex-row md:items-center md:gap-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Trusted by teams like
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <span
                key={name}
                className="font-space-grotesk text-xl font-semibold text-white/50 md:text-2xl"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
