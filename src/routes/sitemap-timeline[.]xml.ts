import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateTimelineSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-timeline.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateTimelineSitemapXml());
      },
    },
  },
});
