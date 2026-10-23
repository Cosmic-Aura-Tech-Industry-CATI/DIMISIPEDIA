import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateRssFeedXml } from "@/lib/rss";

/**
 * RSS 2.0 Feed Alias (/rss.xml)
 */
export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = generateRssFeedXml();
        return new Response(xml, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
