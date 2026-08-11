import { getTranslations } from "next-intl/server";

/** Editorial block above the role grid: origin banner, why-join, claim, purpose. */
export default async function CareersIntro() {
  const t = await getTranslations("Careers");

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
        <p className="font-space-grotesk text-sm font-semibold uppercase tracking-[0.25em] text-[#fd4601]">
          {t("origin")}
        </p>
        <h2 className="mt-4 font-space-grotesk text-2xl font-bold leading-[1.25] text-white md:text-4xl">
          {t("whyJoin")}
        </h2>
        <p className="mt-4 text-lg leading-8 text-white/70">{t("claim")}</p>
        <p className="mt-2 text-lg leading-8 text-white/70">{t("purpose")}</p>
      </div>
    </section>
  );
}
