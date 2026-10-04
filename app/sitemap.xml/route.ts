import { sitemapEntries } from "@/lib/sitemap";

// Built once at build time, like the other static routes.
export const dynamic = "force-static";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/**
 * Hand-rendered so the file is indented and readable, and so browsers can
 * show it through /sitemap.xsl. Search engines ignore the stylesheet and read
 * the standard sitemaps.org markup: <loc>, <lastmod>, <changefreq>,
 * <priority>, then one xhtml:link per language alternate.
 */
export function GET() {
  const urls = sitemapEntries().map((entry) => [
    "  <url>",
    `    <loc>${escape(entry.url)}</loc>`,
    `    <lastmod>${entry.lastModified.toISOString()}</lastmod>`,
    `    <changefreq>${entry.changeFrequency}</changefreq>`,
    `    <priority>${entry.priority.toFixed(1)}</priority>`,
    ...Object.entries(entry.alternates).map(
      ([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${escape(lang)}" href="${escape(href)}"/>`
    ),
    "  </url>",
  ].join("\n"));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
