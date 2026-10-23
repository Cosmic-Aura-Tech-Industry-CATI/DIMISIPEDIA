import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateTechnologySitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-technology.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateTechnologySitemapXml());
      },
    },
  },
});
