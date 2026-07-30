import { Suspense } from "react";
import SubpageHero from "../../components/sections/SubpageHero";
import InsightsList from "../../components/sections/InsightsList";
import { insights, toInsightSummary } from "../../lib/content";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description: "Field notes on AI transformation, engineering, and the Saudi digital economy.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="Insights"
        title="Field notes for the AI-native studio."
        subtitle="Short, opinionated writing on AI transformation, engineering, and building in Saudi Arabia's digital economy."
      />
      <Suspense fallback={null}>
        <InsightsList insights={insights.map(toInsightSummary)} activeCategory="All" />
      </Suspense>
    </div>
  );
}
