import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { KnowledgeField } from "@/components/KnowledgeField";
import { SiteSearch } from "@/components/SiteSearch";
import { StatusChip } from "@/components/StatusChip";
import { EntityLink } from "@/components/EntityLink";
import { organizationEntity, peopleEntities, projectEntities, timeline } from "@/data/knowledge";
import { SITE_URL, buildOrganizationSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "DIMISIPEDIA — Knowledge Base of DIMISI Technologies",
      description:
        "DIMISIPEDIA is an entity knowledge platform documenting DIMISI Technologies Pvt. Ltd. — its people, projects, technologies, milestones and sources, each with a verification status.",
      path: "/",
      schema: [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: "DIMISIPEDIA — Knowledge Base of DIMISI Technologies",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/dimisi-technologies#organization` },
        },
        buildOrganizationSchema(organizationEntity),
      ],
    }),
  component: Home,
});

const explore = [
  { to: "/dimisi-technologies", label: "DIMISI Technologies", note: "The organization" },
  { to: "/people", label: "People", note: "Founders, leadership and team" },
  { to: "/projects", label: "Projects", note: "Kalesh, DIMISIPEDIA" },
  { to: "/technology", label: "Technology", note: "Documented engineering stack" },
  { to: "/timeline", label: "Timeline", note: "Chronological record" },
  { to: "/events", label: "Events", note: "Documented company events" },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule">
        <KnowledgeField />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <p className="label-mono">Official knowledge platform · DIMISI Technologies Pvt. Ltd.</p>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">DIMISIPEDIA</h1>
          <p className="mt-4 max-w-2xl font-serif text-xl text-muted-foreground sm:text-2xl">
            The Knowledge Encyclopedia of DIMISI Technologies
          </p>
          <p className="mt-4 max-w-xl text-[15px] text-muted-foreground">
            Explore the people, projects, technology, history, milestones and ideas behind DIMISI.
          </p>
          <div className="mt-8 max-w-xl">
            <SiteSearch placeholder="Search DIMISI knowledge — people, projects, technology…" />
          </div>
        </div>
      </section>

      <section aria-labelledby="explore-h" className="mx-auto max-w-6xl px-5 py-16">
        <h2 id="explore-h" className="text-2xl">
          Explore DIMISI
        </h2>
        <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {explore.map((e) => (
            <li key={e.to}>
              <Link
                to={e.to}
                className="group flex h-full flex-col justify-between bg-surface px-5 py-6 transition-colors hover:bg-muted"
              >
                <span className="font-serif text-xl">{e.label}</span>
                <span className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                  {e.note}
                  <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="overview-h" className="border-y border-rule bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <p className="label-mono">Knowledge overview</p>
            <h2 id="overview-h" className="mt-2 text-3xl">
              What is DIMISI Technologies?
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed">{organizationEntity.answer}</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              The company is associated with software development, digital products, web
              development and AI automation. Activities and statements are published here only
              with their verification status attached — information awaiting confirmation is
              labelled as such rather than presented as fact.
            </p>
            <Link
              to="/dimisi-technologies"
              className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-primary"
            >
              Read the organization entry <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <dl className="divide-y divide-rule border border-border bg-background">
            {organizationEntity.facts.slice(0, 6).map((f) => (
              <div key={f.label} className="px-4 py-3">
                <dt className="label-mono">{f.label}</dt>
                <dd className="mt-1 text-sm">{f.value}</dd>
                {f.status ? (
                  <dd className="mt-1.5">
                    <StatusChip status={f.status} />
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="people-h" className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-baseline justify-between">
          <h2 id="people-h" className="text-2xl">
            People
          </h2>
          <Link to="/people" className="text-sm text-muted-foreground hover:text-foreground">
            All people →
          </Link>
        </div>
        <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {peopleEntities.map((p) => (
            <li key={p.id}>
              <EntityLink to={p.path} className="block h-full bg-surface px-5 py-5 transition-colors hover:bg-muted">
                <span className="font-serif text-lg">{p.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{p.subtitle}</span>
              </EntityLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="projects-h" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex items-baseline justify-between">
          <h2 id="projects-h" className="text-2xl">
            Projects
          </h2>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
            All projects →
          </Link>
        </div>
        <ul className="mt-6 grid gap-px border border-border bg-rule md:grid-cols-2">
          {projectEntities.map((p) => (
            <li key={p.id}>
              <EntityLink to={p.path} className="block h-full bg-surface px-5 py-6 transition-colors hover:bg-muted">
                <span className="label-mono">Project · {p.lifecycle}</span>
                <span className="mt-1 block font-serif text-xl">{p.name}</span>
                <span className="mt-2 block text-sm text-muted-foreground">{p.shortDescription}</span>
              </EntityLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="timeline-h" className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-baseline justify-between">
            <h2 id="timeline-h" className="text-2xl">
              Recent record
            </h2>
            <Link to="/timeline" className="text-sm text-muted-foreground hover:text-foreground">
              Full timeline →
            </Link>
          </div>
          <ol className="mt-6 divide-y divide-rule border-y border-rule">
            {timeline.map((t) => (
              <li key={t.date + t.title} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
                <span className="label-mono">{t.displayDate}</span>
                <div>
                  <p className="font-serif text-lg">{t.title}</p>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t.description}</p>
                  <div className="mt-2">
                    <StatusChip status={t.status} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
