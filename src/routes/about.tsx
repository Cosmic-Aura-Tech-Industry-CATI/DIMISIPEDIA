import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About DIMISIPEDIA – DIMISI's Corporate Knowledge Base",
      description:
        "Learn about DIMISIPEDIA: DIMISI Technologies’ public knowledge platform documenting our organization, people, projects and technology.",
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
          carries a status, every status has a definition, and every entry carries a public revision
          history.
        </p>
        <h2 className="mt-10 text-2xl">Corporate Authority &amp; Independence</h2>
        <p>
          DIMISIPEDIA is an independent corporate knowledge platform owned and operated exclusively
          by DIMISI Technologies Pvt. Ltd. (CIN: U62013UP2026PTC246506). All documentation, entity
          chronicles, and architectural records are published directly by the enterprise as
          first-party corporate disclosures.
        </p>
        <h2 className="mt-10 text-2xl">Legal Disclaimers &amp; Non-Affiliation</h2>
        <p>
          DIMISIPEDIA is an independent entity knowledge registry. It is not affiliated with,
          sponsored by, authorized by, or endorsed by the Wikimedia Foundation, Wikipedia, or any
          third-party encyclopedia. DIMISIPEDIA does not provide user account registration, does not
          collect login credentials or passwords, and does not process financial transactions.
        </p>
        <h2 id="contact" className="mt-10 text-2xl scroll-mt-20">
          Contact &amp; Inquiries
        </h2>
        <p>
          For editorial inquiries, fact verification, or corporate business software requests,
          contact DIMISI Technologies at{" "}
          <a href="mailto:contact@dimisi.tech" className="text-primary hover:underline">
            contact@dimisi.tech
          </a>{" "}
          or visit the official company website at{" "}
          <a
            href="https://dimisi.tech"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary hover:underline"
          >
            dimisi.tech
          </a>
          . Registered office: Swarn Jayanti Vihar, Koyala Nagar, Kanpur, Uttar Pradesh 208011,
          India.
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
