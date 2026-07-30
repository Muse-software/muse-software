import SubpageHero from "../../components/sections/SubpageHero";
import PlaybooksList from "../../components/sections/PlaybooksList";
import { playbooks, toPlaybookSummary } from "../../lib/content";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Playbooks",
  description: "Practical, step-by-step guides for scoping and shipping AI and engineering work.",
  path: "/playbooks",
});

export default function PlaybooksPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="Playbooks"
        title="Practical guides, not theory."
        subtitle="Step-by-step frameworks we actually use when scoping and shipping client work."
      />
      <PlaybooksList playbooks={playbooks.map(toPlaybookSummary)} />
    </div>
  );
}
