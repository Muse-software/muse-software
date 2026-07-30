import SubpageHero from "../../components/sections/SubpageHero";
import LegalContent from "../../components/sections/LegalContent";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Muse Studios collects, uses, and protects your information.",
  path: "/privacy",
});

const sections = [
  {
    heading: "Information we collect",
    body: "When you submit a form on this site (contact, get started, or newsletter signup), we collect the information you provide directly — such as your name, email address, and the details of your enquiry — along with technical data attached to that submission, including your IP address, browser/user-agent string, the page you submitted from, and a timestamp. We use this to respond to you and to identify and filter spam or abusive submissions.",
  },
  {
    heading: "How we use it",
    body: "We use this information to respond to enquiries, deliver the services you request, and improve this website. We do not sell your personal information to third parties.",
  },
  {
    heading: "Cookies",
    body: "This site may use cookies or similar technologies for basic analytics and to remember your preferences. You can control cookies through your browser settings.",
  },
  {
    heading: "Your rights",
    body: "You can request access to, correction of, or deletion of your personal information at any time by contacting us using the details below.",
  },
  {
    heading: "Contact",
    body: "Questions about this policy can be sent to info@muse.sa.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero eyebrow="Legal" title="Privacy Policy" />
      <LegalContent sections={sections} updated="July 2026" />
    </div>
  );
}
