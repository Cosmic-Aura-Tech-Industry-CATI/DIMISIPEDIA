import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { EntityArticle } from "@/components/EntityArticle";
import { productEntities, projectEntities } from "@/data/knowledge";
import { entityHead, pageHead } from "@/lib/seo";

const trailFor = (name: string) => [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "Products", to: "/products" },
  { label: name },
];

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    if (params.slug === "$slug" || params.slug.startsWith("$")) {
      throw redirect({ to: "/products" as unknown as "/", statusCode: 301 });
    }
    const product = productEntities.find((p) => p.slug === params.slug);
    if (!product) {
      // Check if it's a project and redirect
      const isProject = projectEntities.some((proj) => proj.slug === params.slug);
      if (isProject) {
        throw redirect({
          to: `/projects/${params.slug}` as unknown as "/",
          statusCode: 301,
        });
      }
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { product?: (typeof productEntities)[0] } | undefined;
    if (!data?.product) {
      return pageHead({
        title: "Not found | DIMISIPEDIA",
        description: "This product is not documented in DIMISIPEDIA.",
        path: "/products",
        noindex: true,
      });
    }
    return entityHead(data.product, trailFor(data.product.name));
  },
  component: ProductPage,
});

function ProductPage() {
  const data = Route.useLoaderData() as { product: (typeof productEntities)[0] };
  return <EntityArticle entity={data.product} trail={trailFor(data.product.name)} />;
}
