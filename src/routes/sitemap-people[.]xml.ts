import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generatePeopleSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-people.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generatePeopleSitemapXml());
      },
    },
  },
});
