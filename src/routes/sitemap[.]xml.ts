import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { canonicalUrls, abs } from "@/lib/seo";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
    return c;
  });
}

/**
 * Canonical, indexable URLs with Google Image Sitemap metadata.
 * Search results, aliases/redirects and not-found routes are excluded.
 * lastmod comes from the entity's recorded updatedAt — never from build time.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = canonicalUrls().map((e) => {
          const lines = [
            `  <url>`,
            `    <loc>${abs(e.path)}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.priority === "1.0" ? "daily" : "weekly"}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
          ];

          if (e.image) {
            lines.push(
              `    <image:image>`,
              `      <image:loc>${escapeXml(e.image.loc)}</image:loc>`,
              `      <image:title>${escapeXml(e.image.title)}</image:title>`,
              `      <image:caption>${escapeXml(e.image.caption)}</image:caption>`,
              e.image.geoLocation
                ? `      <image:geo_location>${escapeXml(e.image.geoLocation)}</image:geo_location>`
                : null,
              e.image.license
                ? `      <image:license>${escapeXml(e.image.license)}</image:license>`
                : null,
              `    </image:image>`,
            );
          }

          lines.push(`  </url>`);
          return lines.filter(Boolean).join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
