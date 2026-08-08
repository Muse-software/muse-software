import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Icon from "../Icon";
import { getServices } from "../../lib/content";
import type { Locale } from "@/i18n/routing";

// three.js (~518KB) code-split into its own chunk for this purely
// decorative, aria-hidden orb — still SSR'd (Glossy3D's own render is a
// plain container until its effect sets up WebGL), just not bundled into
// the shared JS every route pays for.
const Glossy3D = dynamic(() => import("../Glossy3D"));

export default async function Services({ locale }: { locale: Locale }) {
  const t = await getTranslations("Services");

  return (
    /*
      `overflow-x-clip` for the orb below, and it is a real bug rather than
      tidying: `-end-24` is a 96px overhang, and on which edge it lands depends
      on `dir`. Overflow past the inline START edge does not extend
      `scrollWidth`, overflow past the END edge does — so the same declaration
      is free on /ar and costs 96px of page-level horizontal scroll on /en.

      Measured at 1440: /en/explore reported scrollWidth 1536 against
      clientWidth 1440 and `window.scrollTo(9999, 0)` moved the page 96px;
      /ar/explore moved 0. The `overflow-x: clip` backstop on `html` did not
      catch it, because the root's overflow propagates to the viewport and the
      propagated value still permits programmatic and keyboard scrolling — it
      suppresses the scrollbar, not the scrollable area.

      Clipping here rather than repositioning the orb, because /ar has been
      showing the clipped composition all along (224px of a 320px ring). This
      makes /en match it instead of inventing a third arrangement.
    */
    <section className="relative overflow-x-clip bg-[#060608] py-20 md:py-28">
      <Glossy3D
        variant="ring"
        size={320}
        className="pointer-events-none absolute -end-24 top-10 hidden opacity-70 md:block"
      />
      <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <div className="flex flex-col gap-14">
          {getServices(locale).map((service) => (
            <div key={service.slug} className="border border-white/10">
              <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_40%,rgba(253,70,1,0.22),transparent_42%),linear-gradient(135deg,#16080a,#060608)] md:h-64">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1100px) 1100px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <Icon name={service.icon} className="h-20 w-20 text-[#fd4601]/70" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#060608] via-[#060608]/20 to-transparent" />
              </div>
              <div className="p-8 md:p-12">
              <div className="flex items-start justify-between gap-6">
                <h2 className="font-space-grotesk text-2xl font-bold text-white md:text-3xl">
                  {service.title}
                </h2>
                <Icon name={service.icon} className="h-8 w-8 shrink-0 text-[#fd4601]" />
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                    {t("overview")}
                  </p>
                  {service.intro.map((paragraph, i) => (
                    <p key={i} className="mt-3 text-base leading-7 text-white/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                    {t("whatThatLooksLike")}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {service.whatWeDo.map((item) => (
                      <li
                        key={item.title}
                        className="flex items-start gap-3 text-base text-white/70"
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#fd4601]" />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#fd4601] transition-colors hover:text-white"
                >
                  {service.cta}
                  <span aria-hidden="true" className="arrow-inline">→</span>
                </Link>
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
                >
                  {t("getStarted")}
                  <span aria-hidden="true" className="arrow-inline">→</span>
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
