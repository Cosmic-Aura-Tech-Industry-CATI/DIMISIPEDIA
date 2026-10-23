import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateImagesSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-images.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateImagesSitemapXml());
      },
    },
  },
});
