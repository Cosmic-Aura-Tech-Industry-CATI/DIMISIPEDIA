import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { EntityArticle } from "@/components/EntityArticle";
import { serviceEntities } from "@/data/knowledge";
import { entityHead, pageHead } from "@/lib/seo";

const trailFor = (name: string) => [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "Services", to: "/services" },
  { label: name },
];

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (params.slug === "$slug" || params.slug.startsWith("$")) {
      throw redirect({ to: "/services" as unknown as "/", statusCode: 301 });
    }
    const service = serviceEntities.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { service?: (typeof serviceEntities)[0] } | undefined;
    if (!data?.service) {
      return pageHead({
        title: "Service Not Found | DIMISIPEDIA",
        description: "This service is not documented in DIMISIPEDIA.",
        path: "/services",
        noindex: true,
      });
    }
    return entityHead(data.service, trailFor(data.service.name));
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const data = Route.useLoaderData() as { service: (typeof serviceEntities)[0] };
  return <EntityArticle entity={data.service} trail={trailFor(data.service.name)} />;
}
