import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WordReveal from "../WordReveal";

type StudioItem = { title: string; body: string; href: string; external?: boolean };

/**
 * None of Layan's named artifacts (Muse Experiments, Tenet, Notes, "How we
 * built this site") are live in this repo (plan §5.1) — so `Home.fromStudio.
 * items` ships empty at launch and this section renders nothing at all. It
 * stays in `HomeSections.tsx` as a structural slot so a real item can be
 * added later without touching the page's composition, but nothing renders
 * a placeholder, a "coming soon", or a substitute (newsletter/careers) card
 * in its place — an honest absence, not a stand-in.
 */
export default async function FromTheStudio() {
  const t = await getTranslations("Home.fromStudio");
  const items = t.raw("items") as StudioItem[];

  if (!items || items.length === 0) return null;

  return (
    <section id="from-the-studio" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="max-w-2xl">
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

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              data-dither-card
              className="group border border-white/15 p-6 transition-colors duration-300 hover:border-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601] md:p-8"
            >
              <h3 className="font-space-grotesk text-xl font-bold text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-sm leading-6 text-white/60 md:text-base">
                {item.body}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
