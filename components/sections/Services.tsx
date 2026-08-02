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
    <section className="relative bg-[#060608] py-20 md:py-28">
      <Glossy3D
        variant="ring"
        size={320}
        className="pointer-events-none absolute -end-24 top-10 hidden opacity-70 md:block"
      />
      <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <div className="flex flex-col gap-14">
          {getServices(locale).map((service) => (
            <div key={service.slug} className="border border-white/10">
              <div className="relative h-48 w-full md:h-64">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1100px) 1100px, 100vw"
                  className="object-cover"
                />
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

              <Link
                href={`/services/${service.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#fd4601] transition-colors hover:text-white"
              >
                {service.cta}
                <span aria-hidden="true" className="arrow-inline">→</span>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
