import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default async function CareersTeaser() {
  const t = await getTranslations("About.careersTeaser");

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <Image
        src="/photos/hero-group-silhouette.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      {/* The scrim that keeps the copy legible over the photo. It was three
          stops of `#4C0014` before the maroon came off the site; it is the
          page black now, and it runs on the block axis rather than `to-r` —
          the physical direction meant the text column sat on the transparent
          end of its own scrim once the layout mirrored into Arabic. */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/85 to-black/45" />
      <div className="relative mx-auto flex w-full max-w-[1000px] flex-col items-start gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-space-grotesk text-2xl font-bold text-white md:text-3xl">
            {t("heading")}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-white/70">
            {t("body")}
          </p>
        </div>
        <Link
          href="/careers"
          className="inline-flex shrink-0 items-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601]"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
