"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// Stable identifiers, not display labels — the visible text comes from the
// `About.tabs` messages, so switching locale never changes which tab is open.
const tabs = ["about", "mission", "vision", "values"] as const;
type Tab = (typeof tabs)[number];

type Value = { name: string; copy: string };

export default function AboutTabs() {
  const t = useTranslations("About");
  const values = t.raw("values") as Value[];
  const [active, setActive] = useState<Tab>("about");

  return (
    <section className="bg-[#060608] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`border px-5 py-2 text-sm font-medium transition-colors md:text-base ${
                active === tab
                  ? "border-[#fd4601] text-[#fd4601]"
                  : "border-white/35 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>

        <div className="mt-10 md:mt-14">
          {active === "about" && (
            <div className="max-w-[70ch] space-y-5 text-lg leading-8 text-white/70">
              <p>{t("about.paragraph1")}</p>
              <p>{t("about.paragraph2")}</p>
              <p>{t("about.paragraph3")}</p>
            </div>
          )}

          {active === "mission" && (
            <p className="max-w-[70ch] text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              {t("mission")}
            </p>
          )}

          {active === "vision" && (
            <p className="max-w-[70ch] text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              {t("vision")}
            </p>
          )}

          {active === "values" && (
            <div className="grid gap-8 md:grid-cols-2">
              {values.map((value) => (
                <div key={value.name}>
                  <h3 className="font-space-grotesk text-lg font-bold text-white">
                    {value.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-white/60">{value.copy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
