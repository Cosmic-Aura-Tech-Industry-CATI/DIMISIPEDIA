import { createFileRoute, notFound } from "@tanstack/react-router";
import { EntityArticle } from "@/components/EntityArticle";
import { technologyEntities } from "@/data/knowledge";
import { entityHead, pageHead } from "@/lib/seo";

const trailFor = (name: string) => [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "Technology", to: "/technology" },
  { label: name },
];

export const Route = createFileRoute("/technology/$slug")({
  loader: ({ params }) => {
    const tech = technologyEntities.find((t) => t.slug === params.slug);
    if (!tech) throw notFound();
    return { tech };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Not found | DIMISIPEDIA",
        description: "This technology is not documented in DIMISIPEDIA.",
        path: "/technology",
        noindex: true,
      });
    }
    return entityHead(loaderData.tech, trailFor(loaderData.tech.name));
  },
  component: TechPage,
});

function TechPage() {
  const { tech } = Route.useLoaderData();
  return <EntityArticle entity={tech} trail={trailFor(tech.name)} />;
}
