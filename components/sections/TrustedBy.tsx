"use client";

import { useTranslations } from "next-intl";
import WordReveal from "../WordReveal";

/**
 * The "Trusted by" logo strip was removed on 2026-08-01. It listed Acme,
 * Globex, Initech and Vandelay, which are invented client names, and no
 * client work has been delivered yet.
 *
 * Do not add logos back until they are real clients who have agreed to be
 * named. See "We do not claim what is not decided" in the Website Voice
 * note in the vault. The component keeps its filename to avoid a rename
 * conflict on the next pull; what it renders now is the argument block.
 *
 * The background photo was dropped on the same day. The crosshair pattern
 * stays: it is the brand's recurring texture, see Brand Identity.
 */
export default function TrustedBy() {
  const t = useTranslations("Home.pressure");

  return (
    <section className="relative flex items-center overflow-hidden bg-[#060608] px-5 py-24 md:min-h-[50vh] md:px-10 md:py-32">
      <div className="pattern-crosshair pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="text-end">
          <p className="font-space-grotesk text-xl text-white/80 md:text-2xl">
            {t("lead")}{" "}
            <WordReveal
              as="span"
              className="font-space-grotesk font-bold text-[#fd4601] text-2xl md:text-4xl"
            >
              {t("emphasis")}
            </WordReveal>
          </p>
        </div>
      </div>
    </section>
  );
}
