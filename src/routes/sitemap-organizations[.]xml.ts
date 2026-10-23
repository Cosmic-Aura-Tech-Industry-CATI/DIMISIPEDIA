import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateOrganizationsSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-organizations.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateOrganizationsSitemapXml());
      },
    },
  },
});
