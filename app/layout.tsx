import type { Metadata } from "next";
import { Inter, Inter_Tight, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
    default: "Muse AI Agency",
    template: "%s | Muse AI Agency",
  },
  description:
    "Enterprise AI agency delivering transformation, engineering, and digital systems with measurable outcomes.",
  metadataBase: new URL("https://muse.ai"),
  openGraph: {
    title: "Muse AI Agency",
    description:
      "Enterprise AI agency delivering transformation, engineering, and digital systems with measurable outcomes.",
    url: "https://muse.ai",
    siteName: "Muse AI Agency",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muse AI Agency",
    description:
      "Enterprise AI agency delivering transformation, engineering, and digital systems with measurable outcomes.",
  },
  alternates: {
    canonical: "/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${interTight.variable} ${spaceGrotesk.variable} bg-[#060508] text-white antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
