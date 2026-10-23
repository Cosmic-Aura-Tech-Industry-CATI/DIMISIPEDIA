import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateEventsSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-events.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateEventsSitemapXml());
      },
    },
  },
});
