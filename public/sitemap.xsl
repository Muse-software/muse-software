<?xml version="1.0" encoding="UTF-8"?>
<!--
  Human-readable view of /sitemap.xml in a browser. Search engines ignore
  this stylesheet and read the sitemap XML directly.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap | Muse Studios</title>
        <style>
          :root { color-scheme: light dark; --bg: #f6f4f1; --card: #ffffff; --ink: #1b1a19; --muted: #6b6560; --line: #e4dfd9; --accent: #c73a00; }
          @media (prefers-color-scheme: dark) { :root { --bg: #09090b; --card: #141216; --ink: #f4f1ec; --muted: #a49d96; --line: #2c262b; --accent: #fe8a5e; } }
          * { box-sizing: border-box; }
          body { margin: 0; padding: 40px 16px; background: var(--bg); color: var(--ink); font: 14px/1.6 -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; }
          main { max-width: 1040px; margin: 0 auto; }
          h1 { font-size: 24px; margin: 0 0 6px; }
          p { margin: 0 0 24px; color: var(--muted); }
          .card { background: var(--card); border: 1px solid var(--line); border-radius: 8px; overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }
          th { font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }
          tr:last-child td { border-bottom: 0; }
          td.num { color: var(--muted); width: 1%; }
          td.small { color: var(--muted); white-space: nowrap; }
          a { color: var(--accent); text-decoration: none; word-break: break-all; }
          a:hover { text-decoration: underline; }
          .lang { display: inline-block; margin-right: 6px; padding: 0 6px; border: 1px solid var(--line); border-radius: 4px; font-size: 12px; color: var(--muted); }
        </style>
      </head>
      <body>
        <main>
          <h1>Muse Studios sitemap</h1>
          <p><xsl:value-of select="count(s:urlset/s:url)"/> pages listed for search engines. This page is a readable view of the XML sitemap at muse.sa/sitemap.xml.</p>
          <div class="card">
            <table>
              <thead>
                <tr><th>#</th><th>Page</th><th>Languages</th><th>Last modified</th><th>Change</th><th>Priority</th></tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td class="num"><xsl:value-of select="position()"/></td>
                    <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                    <td><xsl:for-each select="xhtml:link"><span class="lang"><xsl:value-of select="@hreflang"/></span></xsl:for-each></td>
                    <td class="small"><xsl:value-of select="substring(s:lastmod, 1, 10)"/></td>
                    <td class="small"><xsl:value-of select="s:changefreq"/></td>
                    <td class="small"><xsl:value-of select="s:priority"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
