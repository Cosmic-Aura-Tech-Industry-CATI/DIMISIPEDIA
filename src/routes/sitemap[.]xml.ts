import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateSitemapIndexXml, sitemapResponse } from "@/lib/sitemap";

/**
 * Enterprise XML Sitemap Index (/sitemap.xml)
 * Inspired by Tech Mahindra and enterprise discovery architecture.
 * Serves a master sitemapindex pointing to domain-partitioned child sitemaps.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = generateSitemapIndexXml();
        return sitemapResponse(xml);
      },
    },
  },
});
