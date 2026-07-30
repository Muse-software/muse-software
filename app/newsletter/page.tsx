import SubpageHero from "../../components/sections/SubpageHero";
import NewsletterForm from "../../components/sections/NewsletterForm";
import NewsletterList from "../../components/sections/NewsletterList";
import { newsletters, toNewsletterSummary } from "../../lib/content";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Newsletter",
  description: "Get Muse Studios' field notes on AI transformation and engineering in your inbox.",
  path: "/newsletter",
});

const points = [
  "One short, opinionated read — no filler, no 10-tip listicles.",
  "What we're actually seeing across client engagements, not general AI news.",
  "Sent when there's something worth saying, not on a fixed schedule.",
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="Newsletter"
        title="Get the field notes in your inbox."
        subtitle="The same thinking behind our Insights and Playbooks, sent directly — no need to check back."
      />

      <section className="bg-[#060608] pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[700px] px-5 md:px-10">
          <ul className="space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base text-white/70 md:text-lg">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <NewsletterList
        issues={[...newsletters]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(toNewsletterSummary)}
      />
    </div>
  );
}
