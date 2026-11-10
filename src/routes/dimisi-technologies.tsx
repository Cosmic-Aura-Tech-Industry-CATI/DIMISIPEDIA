import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy URL alias permanently redirecting to canonical /organizations/dimisi-technologies
 */
export const Route = createFileRoute("/dimisi-technologies")({
  beforeLoad: () => {
    throw redirect({
      to: "/organizations/dimisi-technologies" as unknown as "/",
      statusCode: 301,
    });
  },
  component: () => null,
});
