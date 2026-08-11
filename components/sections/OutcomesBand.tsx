import { getTranslations } from "next-intl/server";

/** Large, centered, no hover — a single line between Manifesto and Ticker. */
export default async function OutcomesBand() {
  const t = await getTranslations("Home.outcomes");

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1250px] px-5 md:px-10 text-center">
        <p className="font-space-grotesk text-3xl font-bold leading-[1.2] text-white md:text-6xl">
          {t.rich("heading", {
            accent: (chunks) => <span className="text-[#fd4601]">{chunks}</span>,
          })}
        </p>
      </div>
    </section>
  );
}
