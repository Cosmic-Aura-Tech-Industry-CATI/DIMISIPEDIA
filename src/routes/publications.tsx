import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Alias route: publications are documented at the canonical /articles URL.
 * Redirecting prevents a duplicate, thin directory page from being indexed.
 */
export const Route = createFileRoute("/publications")({
  beforeLoad: () => {
    throw redirect({ to: "/articles", statusCode: 301 });
  },
  component: () => null,
});
