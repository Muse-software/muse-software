import { notFound } from "next/navigation";
import SubpageHero from "../../../components/sections/SubpageHero";
import { careerRoles } from "../../../lib/content";
import { buildMetadata, buildJobPostingJsonLd } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return careerRoles.filter((role) => role.slug).map((role) => ({ slug: role.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = careerRoles.find((item) => item.slug === slug);
  if (!role) return {};
  return buildMetadata({
    title: role.title,
    description: role.blurb,
    path: `/careers/${slug}`,
  });
}

export default async function CareerRolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = careerRoles.find((item) => item.slug === slug);
  if (!role) return notFound();

  const applyHref = `mailto:info@muse.sa?subject=${encodeURIComponent(
    `Application: ${role.title}`
  )}`;

  const description = [
    role.blurb,
    role.responsibilities?.length
      ? `Responsibilities: ${role.responsibilities.join("; ")}`
      : null,
    role.requirements?.length ? `Requirements: ${role.requirements.join("; ")}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const jsonLd = buildJobPostingJsonLd({
    title: role.title,
    description,
    path: `/careers/${slug}`,
    location: role.location,
    employmentType: role.employmentType,
  });

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHero eyebrow={`Careers · ${role.department}`} title={role.title} subtitle={role.blurb} />

      <section className="bg-[#060608] pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[800px] px-5 md:px-10">
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10 pb-8 text-sm text-white/60">
            {role.location && <span>{role.location}</span>}
            {role.employmentType && <span>{role.employmentType}</span>}
            {role.compensation && <span>{role.compensation}</span>}
          </div>

          {role.responsibilities && (
            <div className="mt-10">
              <h2 className="font-space-grotesk text-xl font-bold text-white">Responsibilities</h2>
              <ul className="mt-4 space-y-3">
                {role.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-7 text-white/70">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.requirements && (
            <div className="mt-10">
              <h2 className="font-space-grotesk text-xl font-bold text-white">Requirements</h2>
              <ul className="mt-4 space-y-3">
                {role.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-7 text-white/70">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.niceToHaves && (
            <div className="mt-10">
              <h2 className="font-space-grotesk text-xl font-bold text-white">Nice to have</h2>
              <ul className="mt-4 space-y-3">
                {role.niceToHaves.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-7 text-white/70">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={applyHref}
            className="mt-12 inline-flex items-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601]"
          >
            Apply for this role
          </a>
        </div>
      </section>
    </div>
  );
}
