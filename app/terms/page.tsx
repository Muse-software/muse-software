import SubpageHero from "../../components/sections/SubpageHero";
import LegalContent from "../../components/sections/LegalContent";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of the Muse Studios website and services.",
  path: "/terms",
});

const sections = [
  {
    heading: "Acceptance of terms",
    body: "By using this website, you agree to these terms. If you don't agree, please don't use the site.",
  },
  {
    heading: "Use of this site",
    body: "This site is provided for the purpose of learning about Muse Studios and getting in touch about potential work. You agree not to misuse the site or interfere with its normal operation.",
  },
  {
    heading: "Intellectual property",
    body: "All content on this site — including the Muse Studios name, logo, and design — is the property of Muse Studios and may not be reproduced without permission.",
  },
  {
    heading: "No warranty",
    body: "This site is provided as-is, without warranties of any kind, express or implied.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.",
  },
  {
    heading: "Contact",
    body: "Questions about these terms can be sent to info@muse.sa.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero eyebrow="Legal" title="Terms of Service" />
      <LegalContent sections={sections} updated="July 2026" />
    </div>
  );
}
