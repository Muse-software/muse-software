import { getTranslations } from "next-intl/server";
import Magnetic from "@/components/effects/Magnetic";
import DitherCursor from "../DitherCursor";
import DitherField from "../DitherField";
import MuseLogo from "../MuseLogo";
import PillButton from "../PillButton";
import WordReveal from "../WordReveal";

/**
 * Closing CTA: a rounded panel inset in the page black, with dither bands
 * inside its top and bottom edges and the pointer-driven ink shader running
 * between them.
 *
 * It was an orange panel with black ink until 2026-08-02, and the problem was
 * where it sits. This is the last thing before the footer, and the footer is a
 * full orange panel of its own — so the page ended on two orange blocks
 * stacked with a strip of black between them, and the CTA read as a piece of
 * the footer rather than as the close of the argument. Inverting it puts the
 * orange somewhere it does work: the type and the ink, on black.
 *
 * `bg-black` is a shade *under* the page's `#060608` rather than over it, so
 * the panel is not outlined by a lighter fill. What makes it read as a panel
 * is the hairline orange border and the dither reaching its edges — which is
 * the same thing the texture was doing on the orange version, just now
 * carrying the shape as well as the surface.
 *
 * The bands exist because the ink shader paints nothing at all until the
 * pointer moves: without them the panel was flat for anyone who scrolled here
 * and stopped, and flat forever on a phone. They dissolve toward the middle
 * from both ends, so the copy and the button sit on clean black.
 */
export default async function CTA() {
  const t = await getTranslations("CTA");

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div
        data-no-crosshair
        className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-3xl border border-[#fd4601]/25 bg-black px-6 py-16 text-center text-[#fd4601] md:rounded-[2rem] md:px-12 md:py-24"
      >
        {/* Decorative, desktop-only, and unmounted until the section is near
            the viewport — see DitherCursor. `absolute` keeps it inside the
            panel's rounded clip instead of covering the page. Orange now, and
            at full opacity: the old 10% was tuned for black ink bleeding into
            a saturated orange field, and orange on black has the opposite
            problem — too little of it and the stroke never resolves. */}
        <DitherCursor color="#fd4601" radius={0.1} opacity={0.55} position="absolute" />

        {/* The panel's two edges, as one masked field. Same noise-driven
            shader as the subpage heroes; the CSS lattice that was here first
            read as a halftone screen laid over the panel rather than as the
            panel's own surface. The mask is in `.cta-bands`. */}
        <DitherField className="cta-bands opacity-70" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <MuseLogo showWordmark={false} iconClassName="h-10 w-auto text-[#fd4601]" />

          <WordReveal
            as="h2"
            className="max-w-[18ch] font-space-grotesk text-4xl font-bold leading-[1.05] md:text-6xl"
          >
            {t("heading")}
          </WordReveal>

          {/* Full #fd4601, not a tint of it. The orange is 6.06:1 on black and
              passes AA comfortably; at 80% it drops to 4.14:1 and fails for
              body copy. So the subheading is separated from the heading by
              size and weight rather than by fading the colour, which is the
              move the orange panel could afford and this one cannot. */}
          <p className="max-w-[46ch] text-lg leading-relaxed">{t("subheading")}</p>

          <Magnetic strength={0.3} radius={100}>
            <PillButton href="/get-started" variant="onDark">
              {t("button")}
            </PillButton>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
