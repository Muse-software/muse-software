import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";
import { allSocials } from "../components/SocialLinks";
import "./globals.css";

// Code-split GSAP (and the rest of the nav's animation logic) into its own
// chunk instead of the shared bundle every route pays for — still rendered
// server-side (no ssr:false) so the header/logo/toggle button are present
// in the initial HTML with no flash-of-missing-nav; only the JS weight is
// deferred to its own async chunk.
const StaggeredMenu = dynamic(() => import("../components/StaggeredMenu"));

const menuItems = [
  { label: "Home", ariaLabel: "Home", link: "/" },
  { label: "Explore", ariaLabel: "Explore", link: "/explore" },
  { label: "About Us", ariaLabel: "About us", link: "/about" },
  { label: "Careers", ariaLabel: "Careers", link: "/careers" },
  { label: "Insights", ariaLabel: "Insights", link: "/insights" },
  { label: "Playbooks", ariaLabel: "Playbooks", link: "/playbooks" },
  { label: "Newsletter", ariaLabel: "Newsletter", link: "/newsletter" },
  { label: "Contact Us", ariaLabel: "Contact us", link: "/contact" },
  { label: "Get Started", ariaLabel: "Get started", link: "/get-started" },
];

const socialItems = allSocials.map(({ label, href }) => ({ label, link: href }));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muse",
    template: "%s | Muse",
  },
  description:
    "We are your all-in-one partner helping you set & execute your digital strategy at startup speed.",
  metadataBase: new URL("https://muse.sa"),
  openGraph: {
    title: "Muse",
    description:
      "We are your all-in-one partner helping you set & execute your digital strategy at startup speed.",
    url: "https://muse.sa",
    siteName: "Muse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muse",
    description:
      "We are your all-in-one partner helping you set & execute your digital strategy at startup speed.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} ${spaceGrotesk.variable} bg-[#060608] text-white antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PageLoader />
        <StaggeredMenu
          position="right"
          isFixed={true}
          items={menuItems}
          socialItems={socialItems}
          colors={["#fd4601", "#c23800"]}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          accentColor="#fd4601"
          displayItemNumbering={true}
          displaySocials={true}
        />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
