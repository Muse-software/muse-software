import { getTranslations } from "next-intl/server";

export type LegalSection = { heading: string; body: string };

export default async function LegalContent({
  sections,
  updated,
}: {
  sections: LegalSection[];
  updated: string;
}) {
  const t = await getTranslations("Legal");

  return (
    <section className="bg-[#060608] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[800px] px-5 md:px-10">
        <p className="text-sm text-white/50">{t("lastUpdated", { updated })}</p>
        <div className="mt-8 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-space-grotesk text-xl font-bold text-white">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
