"use client";

import Icon from "@/components/Icon";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CareerRole } from "@/lib/content";
const ALL = "__all__";
export default function CareersList({
  roles: allRoles,
}: {
  roles: CareerRole[];
}) {
  const t = useTranslations("Careers");
  const ar = useLocale() === "ar";
  const [active, setActive] = useState(ALL);
  const departments = [
    ALL,
    ...new Set(allRoles.map((role) => role.department)),
  ];
  const roles =
    active === ALL
      ? allRoles
      : allRoles.filter((role) => role.department === active);
  return (
    <section className="career-list shell" aria-labelledby="open-roles">
      <div className="career-list-heading">
        <h2 id="open-roles">{ar ? "أدوار في ميوز" : "Roles at Muse"}</h2>
        <p role="status">
          {ar
            ? `${roles.length} فرص`
            : `${roles.length} ${roles.length === 1 ? "role" : "roles"}`}
        </p>
      </div>
      {allRoles.length > 0 && (
        <div
          className="career-filters"
          role="group"
          aria-label={ar ? "تصفية حسب المجال" : "Filter by department"}
        >
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              aria-pressed={active === dept}
              onClick={() => setActive(dept)}
            >
              {dept === ALL ? t("all") : t(`departments.${dept}`)}
            </button>
          ))}
        </div>
      )}
      <div className="career-rows">
        {roles.map((role) => (
          <Link
            key={role.slug || role.title}
            href={
              role.slug
                ? `/careers/${role.slug}`
                : `mailto:abdullah@muse.sa?subject=${encodeURIComponent(t("generalSubject"))}`
            }
            className="career-row"
          >
            <div>
              <span className="role-department">
                {t(`departments.${role.department}`)}
              </span>
              <h3>{role.title}</h3>
              <p>{role.blurb}</p>
            </div>
            <div className="career-row-meta">
              <span>{role.location}</span>
              <span>{role.employmentType}</span>
              <span className="text-link">
                {t("viewJd")}{" "}
                <Icon name="arrow-up-right" className="arrow-inline"/>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!roles.length && (
        <p className="career-empty">
          {ar
            ? "لا توجد فرص منشورة حاليًا. تقدر تعرّفنا بنفسك بالإيميل أدناه."
            : "No roles are listed right now. You can still introduce yourself by email below."}
        </p>
      )}
    </section>
  );
}
