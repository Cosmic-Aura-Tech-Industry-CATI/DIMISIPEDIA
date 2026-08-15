import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { organizationEntity } from "@/data/knowledge";

/**
 * Alias route. The canonical organization URL is /dimisi-technologies, which is
 * already published; /organizations/<slug> permanently redirects to it so no
 * duplicate entity page can be indexed.
 */
export const Route = createFileRoute("/organizations/$slug")({
  beforeLoad: ({ params }) => {
    if (params.slug === organizationEntity.slug) {
      throw redirect({ to: "/dimisi-technologies", statusCode: 301 });
    }
    throw notFound();
  },
  component: () => null,
});
