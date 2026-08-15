import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About DIMISIPEDIA",
      description: "DIMISIPEDIA is the official public knowledge and documentation platform of DIMISI Technologies Pvt. Ltd. What it is, who operates it and how it is structured.",
      path: "/about",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "About DIMISIPEDIA" }],
          "/about",
        ),
      ],
    }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "About" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">About</p>
        <h1 className="mt-2 text-4xl">About DIMISIPEDIA</h1>
      </header>
      <div className="prose-editorial mt-8">
        <p>
          DIMISIPEDIA is the structured public knowledge layer of DIMISI Technologies Pvt. Ltd. It
          documents the organization, its people, projects, technology, history, activities and
          stated direction through source-backed, interconnected and continuously maintained
          entries.
        </p>
        <p>
          It is a first-party publication: operated by DIMISI Technologies, about DIMISI
          Technologies. Its value therefore rests on discipline rather than distance — every claim
          carries a status, every status has a definition, and every entry carries a public
          revision history.
        </p>
        <h2 className="mt-10 text-2xl">Contact</h2>
        <p>
          For corrections, additions or verification requests, contact DIMISI Technologies through{" "}
          <a href="https://dimisi.tech" target="_blank" rel="noreferrer noopener">
            dimisi.tech
          </a>
          .
        </p>
        <h2 className="mt-10 text-2xl">Related pages</h2>
        <p>
          <Link to="/credibility">How DIMISIPEDIA establishes information</Link> ·{" "}
          <Link to="/editorial-policy">Editorial policy</Link> ·{" "}
          <Link to="/projects/$slug" params={{ slug: "dimisipedia" }}>
            DIMISIPEDIA as an entity
          </Link>
        </p>
      </div>
    </div>
  );
}
