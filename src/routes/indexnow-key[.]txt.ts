import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * IndexNow key file. Served from the server secret INDEXNOW_KEY so the key is
 * never committed to the repository. Referenced as `keyLocation` when
 * submitting URLs.
 */
export const Route = createFileRoute("/indexnow-key.txt")({
  server: {
    handlers: {
      GET: async () => {
        const key = process.env["INDEXNOW_KEY"];
        if (!key) return new Response("Not configured", { status: 404 });
        return new Response(key, {
          headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
