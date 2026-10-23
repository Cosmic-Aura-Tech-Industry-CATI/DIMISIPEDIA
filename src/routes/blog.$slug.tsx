import { createFileRoute, redirect } from "@tanstack/react-router";
import { getArticle } from "@/data/articles";

/**
 * Route handler for /blog/$slug
 * Redirects permanently (301) to the canonical article route (/articles/$slug)
 * to prevent duplicate content indexing while supporting intuitive /blog links.
 */
export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    const article = getArticle(params.slug);
    if (article) {
      throw redirect({ to: "/articles/$slug", params: { slug: article.slug }, statusCode: 301 });
    }
    throw redirect({ to: "/blog", statusCode: 301 });
  },
  component: () => null,
});
