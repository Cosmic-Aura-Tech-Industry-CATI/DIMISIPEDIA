import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use | DIMISIPEDIA",
      description:
        "Terms governing the use of DIMISIPEDIA, the knowledge platform operated by DIMISI Technologies Pvt. Ltd.",
      path: "/terms",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "Terms of Use" }],
          "/terms",
        ),
      ],
    }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Terms" }]} />
      <h1 className="mt-6 text-4xl">Terms of Use</h1>
      <div className="prose-editorial mt-6">
        <p>
          DIMISIPEDIA is published by DIMISI Technologies Pvt. Ltd. Entries are provided for
          information and reference. Each entry states the status of its information; entries marked
          as needing verification should not be treated as confirmed statements of fact.
        </p>
        <p>
          Content, names, marks and graphics on this site belong to DIMISI Technologies Pvt. Ltd.
          unless attributed otherwise. Quotation with attribution and a link to the source entry is
          permitted.
        </p>
        <p>
          Corrections and verification requests may be sent to DIMISI Technologies through{" "}
          <a href="https://dimisi.tech" target="_blank" rel="noreferrer noopener">
            dimisi.tech
          </a>
          .
        </p>
      </div>
    </div>
  );
}
