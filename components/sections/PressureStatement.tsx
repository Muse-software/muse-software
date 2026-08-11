import { getTranslations } from "next-intl/server";

/**
 * The tension line that closes the argument: "AI isn't optional. Waiting is
 * the risk."
 *
 * It used to be a section of its own — the gutted `TrustedBy`, whose logo
 * strip and background photo were both removed on 2026-08-01, leaving 50vh of
 * flat crosshair holding one sentence pinned to the far edge. The two clauses
 * were also inline in a single paragraph at two different type scales, so
 * their baselines fought. Both clauses now sit at one scale on their own
 * lines, and the block goes where the argument it belongs to actually ends.
 *
 * The copy still lives under `Home.pressure` even though the About page uses
 * it too; moving the key would mean touching both locale files for no reader-
 * visible gain.
 */
export default async function PressureStatement({ className }: { className?: string }) {
  const t = await getTranslations("Home.pressure");

  return (
    <div className={`border-t border-white/20 pt-8 md:pt-10 ${className ?? ""}`}>
      <p className="font-space-grotesk text-2xl font-medium leading-[1.25] text-white md:text-3xl">
        {t("lead")}
      </p>
      <p className="font-space-grotesk text-2xl font-bold leading-[1.25] text-[#fd4601] md:text-3xl">
        {t("emphasis")}
      </p>
    </div>
  );
}
