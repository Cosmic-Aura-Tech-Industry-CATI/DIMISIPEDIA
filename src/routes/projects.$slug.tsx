import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { EntityArticle } from "@/components/EntityArticle";
import { projectEntities, productEntities } from "@/data/knowledge";
import { entityHead, pageHead } from "@/lib/seo";

const trailFor = (name: string) => [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: name },
];

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    if (params.slug === "$slug" || params.slug.startsWith("$")) {
      throw redirect({ to: "/projects", statusCode: 301 });
    }
    // If slug is a product (e.g. kalesh, kaand, dimisi-ops), 301 redirect to canonical /products/$slug
    const isProduct = productEntities.some((p) => p.slug === params.slug);
    if (isProduct) {
      throw redirect({
        to: `/products/${params.slug}` as unknown as "/",
        statusCode: 301,
      });
    }
    const project = projectEntities.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Not found | DIMISIPEDIA",
        description: "This project is not documented in DIMISIPEDIA.",
        path: "/projects",
        noindex: true,
      });
    }
    return entityHead(loaderData.project, trailFor(loaderData.project.name));
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  return <EntityArticle entity={project} trail={trailFor(project.name)} />;
}
