import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WordReveal from "../WordReveal";
import PressureStatement from "./PressureStatement";

/**
 * The argument section, rebuilt on 2026-08-01. What was here before:
 *
 * - A bordered box whose background was `#4C0014`, the same maroon as the
 *   section behind it. The box had no job but to mask the crosshair pattern,
 *   so the pattern was only ever visible as a frame in the margin around a
 *   card — which is exactly why it read as thrown on. Box, corner brackets and
 *   pattern are all gone; the copy now sits on the maroon directly.
 *
 * - Every paragraph reveal ran on `mode="scrub"`, tying word opacity to scroll
 *   position. Arriving at the section you got sentences half-faded mid-line
 *   and a third paragraph that was barely there. Body copy is plain text now:
 *   it is legible the moment it is on screen. Only the heading animates.
 *
 * - The tension line that used to sit two sections below (see
 *   PressureStatement) now closes this argument instead of floating alone.
 *
 * The maroon itself went on 2026-08-02, here and on the three other sections
 * that used it. `#4C0014` was the site's only device for saying "this section
 * is different", and a flat colour block says it far too loudly — the page's
 * central argument read as a different site from the sections either side of
 * it. What marks this section now is the page wash swelling underneath it
 * (see PageDither) rather than a colour change: rhythm instead of a wall.
 */
export default async function Manifesto() {
  const t = await getTranslations("Home.manifesto");
  const paragraphs = [t("paragraph1"), t("paragraph2"), t("paragraph3")];

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="relative mx-auto w-full max-w-[1250px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-3xl font-bold leading-[1.15] text-white md:text-5xl"
        >
          {t("heading")}
        </WordReveal>

        {/* A measured column, nothing behind it but the page wash. */}
        <div className="mt-10 flex max-w-[58ch] flex-col gap-5 text-lg leading-8 text-white/75 md:mt-14 md:text-xl md:leading-9">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <PressureStatement className="mt-12 md:mt-16" />

        <Link
          href="/start"
          className="mt-10 inline-flex items-center gap-5 border border-black bg-white py-2 ps-5 pe-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] md:mt-12 md:py-3 md:ps-6 md:pe-4 md:text-lg"
        >
          {t("cta")}
          <svg width="16" height="16" viewBox="0 0 30 30" fill="none" className="arrow-inline" aria-hidden="true">
            <rect width="30" height="30" fill="black" />
            <path
              d="M10.0066 22V21.0033H11.0053V20.0066H12.004V19.0099H13.0026V18.0132H14.0013V17.0165H15V16.0198H15.9987V15.0231H16.9974V14.0264H17.996V13.0297H18.9947V12.033H19.9934V17.0316H22V8H13.004V10.0026H18.0145V10.9993H17.0159V11.996H16.0172V12.9927H15.0185V13.9895H14.0198V14.9862H13.0211V15.9829H12.0225V16.9796H11.0238V17.9763H10.0251V18.973H9.02642V19.9697H8V21.9723H10.0066V22Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
