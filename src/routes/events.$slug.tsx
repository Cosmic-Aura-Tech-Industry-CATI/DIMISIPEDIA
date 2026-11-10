import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { EntityArticle } from "@/components/EntityArticle";
import { eventEntities } from "@/data/knowledge";
import { entityHead, pageHead } from "@/lib/seo";

const trailFor = (name: string) => [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "Events", to: "/events" },
  { label: name },
];

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    if (params.slug === "$slug" || params.slug.startsWith("$")) {
      throw redirect({ to: "/events" as unknown as "/", statusCode: 301 });
    }

    const slug = params.slug;

    // Direct match by canonical slug or id
    const directEvent = eventEntities.find((e) => e.slug === slug || e.id === slug);
    if (directEvent) {
      if (directEvent.slug !== slug) {
        throw redirect({
          to: `/events/${directEvent.slug}` as unknown as "/",
          statusCode: 301,
        });
      }
      return { event: directEvent };
    }

    // Match by alternate name / legacy alias and 301 redirect to canonical slug
    const aliasEvent = eventEntities.find((e) => e.alternateNames?.includes(slug));
    if (aliasEvent) {
      throw redirect({
        to: `/events/${aliasEvent.slug}` as unknown as "/",
        statusCode: 301,
      });
    }

    throw notFound();
  },
  head: ({ loaderData }) => {
    const data = loaderData as { event?: (typeof eventEntities)[0] } | undefined;
    if (!data?.event) {
      return pageHead({
        title: "Event Not Found | DIMISIPEDIA",
        description: "This event or achievement is not documented in DIMISIPEDIA.",
        path: "/events",
        noindex: true,
      });
    }
    return entityHead(data.event, trailFor(data.event.name));
  },
  component: EventDetailPage,
});

function EventDetailPage() {
  const data = Route.useLoaderData() as { event: (typeof eventEntities)[0] };
  return <EntityArticle entity={data.event} trail={trailFor(data.event.name)} />;
}
