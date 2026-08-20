import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy | DIMISIPEDIA",
      description:
        "How DIMISIPEDIA, operated by DIMISI Technologies Pvt. Ltd., handles visitor information.",
      path: "/privacy",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "Privacy" }],
          "/privacy",
        ),
      ],
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Privacy" }]} />
      <h1 className="mt-6 text-4xl">Privacy</h1>
      <div className="prose-editorial mt-6">
        <p>
          DIMISIPEDIA is a public reading platform operated by DIMISI Technologies Pvt. Ltd. It does
          not require an account to read any published entry and does not ask visitors for personal
          information in order to browse.
        </p>
        <p>
          A formal privacy statement covering analytics, contact submissions and contributor
          accounts will be published here once those features are introduced. Until then, no such
          data is collected through this site.
        </p>
        <p>
          Questions can be directed to DIMISI Technologies through{" "}
          <a href="https://dimisi.tech" target="_blank" rel="noreferrer noopener">
            dimisi.tech
          </a>
          .
        </p>
      </div>
    </div>
  );
}
