import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";

export const Route = createFileRoute("/events")({
  head: () =>
    pageHead({
      title: "Events — DIMISI Technologies | DIMISIPEDIA",
      description:
        "Documented events involving DIMISI Technologies. No events have been recorded in DIMISIPEDIA yet.",
      path: "/events",
      schema: [
        buildBreadcrumbSchema([{ label: "DIMISIPEDIA", to: "/" }, { label: "Events" }], "/events"),
      ],
    }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Events" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity index · Event</p>
        <h1 className="mt-2 text-4xl">Events</h1>
      </header>
      <div className="prose-editorial mt-8">
        <p>
          DIMISIPEDIA does not currently have a documented event record for DIMISI Technologies.
          Events will appear here once they have been supplied with a date, a description and a
          source.
        </p>
        <p>
          In the meantime, the <Link to="/timeline">timeline</Link> holds the organization's
          recorded milestones.
        </p>
      </div>
    </div>
  );
}
