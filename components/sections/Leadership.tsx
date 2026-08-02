import { getTranslations } from "next-intl/server";

/**
 * Placeholder monogram avatars (not photos) until real headshots are
 * available — deliberately generic, not a stand-in photo of an unrelated
 * real person.
 */
type TeamMember = { name: string; title: string; initials: string; bio: string };

export default async function Leadership() {
  const t = await getTranslations("About.leadership");
  const team = t.raw("team") as TeamMember[];

  return (
    <section className="bg-[#060608] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          {t("eyebrow")}
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {team.map((person) => (
            <div key={person.name} className="border border-white/10 p-8">
              {/* Was a maroon tile; the maroon came off the site on
                  2026-08-02 (see Manifesto). An orange wash of the initials'
                  own colour keeps the tile reading as a tile without
                  reintroducing a second hue for one 64px square. */}
              <div className="flex h-16 w-16 items-center justify-center bg-[#fd4601]/12 font-space-grotesk text-xl font-bold text-[#fd4601]">
                {person.initials}
              </div>
              <h3 className="mt-5 font-space-grotesk text-xl font-bold text-white">
                {person.name}
              </h3>
              <p className="text-sm uppercase tracking-[0.2em] text-[#fd4601]">{person.title}</p>
              <p className="mt-4 text-base leading-7 text-white/70">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
