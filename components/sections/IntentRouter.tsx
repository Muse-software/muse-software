import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WordReveal from "../WordReveal";

/**
 * Three intents, not a card grid. From `md:` up, each row is a full-width
 * hairline listing with a growing inline-start offset — 01 sits flush, 03
 * sits deepest — so the section reads as a short, deliberate list a visitor
 * steps through rather than three equal boxes competing for the same glance.
 * The stair uses explicit responsive logical-padding classes, so it applies
 * at `md:` and above only. At phone widths the indent ate directly into the
 * title/body measure, so mobile rows stay flush. Logical padding still flips
 * correctly under RTL once the desktop stair applies.
 *
 * Rows reuse `data-dither-card`, the same shared-canvas hover material as
 * `Approach.tsx`'s cards, so hovering an intent reads as the site's own
 * surface rather than a second, competing hover language.
 */
const INTENTS = [
  { key: "build", indent: "md:ps-0" },
  { key: "improve", indent: "md:ps-10" },
  { key: "ai", indent: "md:ps-20" },
] as const;

export default async function IntentRouter() {
  const t = await getTranslations("Home.intents");

  return (
    <section id="intents" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="max-w-2xl">
          {/* `text-2xl` on mobile, not the `text-4xl` this used to share with
              desktop — Hero's `h1` above it needs headroom to read as
              clearly larger without its own nowrap headline overflowing a
              390px viewport (see the clamp() comment in Hero.tsx). A 24px
              heading over an 18px lede is still a normal step, not a
              compressed one. */}
          <WordReveal
            as="h2"
            className="font-space-grotesk text-2xl font-bold leading-[1.1] text-white md:text-5xl md:leading-[1.05]"
          >
            {t("heading")}
          </WordReveal>
          <p className="mt-4 max-w-lg text-lg leading-7 text-white/70 md:text-xl">
            {t("lede")}
          </p>
        </div>

        <div className="mt-10 border-t border-white/15 md:mt-16">
          {INTENTS.map((intent, i) => (
            <Link
              key={intent.key}
              href={`/start?intent=${intent.key}`}
              data-dither-card
              className={`group grid gap-3 border-b border-white/15 py-8 transition-colors duration-300 hover:border-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601] md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-10 ${intent.indent}`}
            >
              <span className="font-space-grotesk text-sm text-white/40 md:text-base">
                {`0${i + 1}`}
              </span>
              <div className="max-w-[56ch]">
                <h3 className="font-space-grotesk text-2xl font-bold text-white md:text-3xl">
                  {t(`cards.${intent.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/60 md:max-w-[60ch] md:text-base">
                  {t(`cards.${intent.key}.body`)}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="arrow-inline mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-white/35 text-white transition-colors duration-300 group-hover:border-[#fd4601] group-hover:text-[#fd4601] md:mt-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
        {/* Restored now that Capabilities (§7.3) exists below and `#capabilities`
            is a real target — see the removal note this replaced in the
            Phase 1 gate for why it was withheld until now. */}
        <a
          href="#capabilities"
          className="mt-10 inline-block text-sm text-white/60 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-[#fd4601] hover:decoration-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601] md:mt-14 md:text-base"
        >
          {t("capabilityLink")}
        </a>
      </div>
    </section>
  );
}
