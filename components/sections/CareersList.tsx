"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CareerRole } from "../../lib/content";

// `ALL` is a sentinel, not a department name: the visible "All" label is a
// translated string. `department` itself stays an English union value in both
// locales — it is the filter's comparison key, not display copy, the same
// stable-value rule the form selects follow.
//
// The other half of that rule had not been built, though. A stable English
// *value* is only correct if something resolves it to a *label*, and nothing
// did: both the filter chips and the card eyebrows rendered `role.department`
// straight, so /ar/careers showed "Strategy", "Marketing" and "Engineering" in
// Latin among Arabic role titles — twice each, once in the filter row and once
// per card. `Careers.departments` is that lookup, keyed by the union value so a
// role cannot carry a department the catalogue has no name for.
const ALL = "__all__";

export default function CareersList({ roles: allRoles }: { roles: CareerRole[] }) {
  const t = useTranslations("Careers");
  const [active, setActive] = useState<string>(ALL);

  const departments = [ALL, ...Array.from(new Set(allRoles.map((role) => role.department)))];
  const roles =
    active === ALL ? allRoles : allRoles.filter((role) => role.department === active);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
        <div className="flex flex-wrap gap-3">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setActive(dept)}
              className={`border px-5 py-2 text-sm font-medium transition-colors md:text-base ${
                active === dept
                  ? "border-[#fd4601] text-[#fd4601]"
                  : "border-white/35 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {dept === ALL ? t("all") : t(`departments.${dept}`)}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
          {roles.map((role) => {
            const content = (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  {t(`departments.${role.department}`)}
                </p>
                <h3 className="mt-2 font-space-grotesk text-lg font-bold text-white md:text-xl">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{role.blurb}</p>
                {role.slug && (
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#fd4601]">
                    {t("viewJd")} <span aria-hidden="true" className="arrow-inline">→</span>
                  </span>
                )}
              </>
            );
            const className =
              "group block border border-white/10 p-6 transition-colors duration-300 hover:border-[#fd4601] md:p-8";

            return role.slug ? (
              <Link
                key={role.title}
                href={`/careers/${role.slug}`}
                data-dither-card
                className={className}
              >
                {content}
              </Link>
            ) : (
              <a
                key={role.title}
                /* The subject line is copy the reader sees in their own mail
                   client, so it is translated like any other string. It was a
                   hard-coded English sentence, which put "Interested in joining
                   Muse Studios" in the compose window of someone who had read
                   an entirely Arabic page. */
                href={`mailto:info@muse.sa?subject=${encodeURIComponent(t("generalSubject"))}`}
                data-dither-card
                className={className}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
