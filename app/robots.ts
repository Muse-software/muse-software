import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

// The demo/* layout already sets a per-page `robots: noindex`, which stops
// indexing but not crawling. Disallowing the tree here as well keeps crawl
// budget off a section that is never meant to rank.
const demoPaths = routing.locales.map((locale) => `/${locale}/demo/`);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", ...demoPaths] }],
    sitemap: "https://muse.sa/sitemap.xml",
  };
}
