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
        className={`${inter.variable} ${interTight.variable} ${spaceGrotesk.variable} bg-[#060608] text-white antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
