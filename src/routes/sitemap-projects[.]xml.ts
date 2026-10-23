import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateProjectsSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-projects.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateProjectsSitemapXml());
      },
    },
  },
});
