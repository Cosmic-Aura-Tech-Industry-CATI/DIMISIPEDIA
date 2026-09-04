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
  { to: "/journey", label: "Our Journey", note: "The complete founder's story" },
  { to: "/dimisi-technologies", label: "DIMISI Technologies", note: "The organization" },
  { to: "/people", label: "People", note: "Founders, leadership and team" },
  { to: "/projects", label: "Projects", note: "Kalesh, DIMISIPEDIA" },
  { to: "/technology", label: "Technology", note: "Documented engineering stack" },
  { to: "/timeline", label: "Timeline", note: "Chronological record" },
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

      {/* Featured Journey Spotlight */}
      <section aria-label="Featured Journey" className="border-b border-rule bg-surface/50">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid items-center gap-6 border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="label-mono text-primary">
                Featured Chronicle · 10 Chronological Phases
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                The Entrepreneurship Journey of Shikhar Dixit &amp; DIMISI Technologies
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                From a six-hour home engineering sprint for Axis College's Gandhigiri technical
                project presentation event to CATI, the Mumbai train ride, placement rejections, the
                late-night spark of Kalesh, incorporating on 9 April 2026, and landing the first
                client — an unfiltered founder narrative.
              </p>
            </div>
            <Link
              to="/journey"
              className="inline-flex shrink-0 items-center gap-2 border border-primary bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Read the Full Story <ArrowRight className="size-4" />
            </Link>
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
                  <ArrowRight
                    className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
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
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed">
              {organizationEntity.answer}
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              The company is associated with software development, digital products, web development
              and AI automation. Activities and statements are published here only with their
              verification status attached — information awaiting confirmation is labelled as such
              rather than presented as fact.
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
          <div>
            <p className="label-mono text-primary">Leadership &amp; Team</p>
            <h2 id="people-h" className="mt-1 text-2xl sm:text-3xl">
              People of DIMISI Technologies
            </h2>
          </div>
          <Link to="/people" className="text-sm text-muted-foreground hover:text-foreground">
            All people ({peopleEntities.length}) →
          </Link>
        </div>
        <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {peopleEntities.map((p) => (
            <li key={p.id}>
              <EntityLink
                to={p.path}
                className="flex h-full flex-col justify-between bg-surface p-5 transition-colors hover:bg-muted"
              >
                <div>
                  <div className="flex items-center gap-3.5">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`Portrait of ${p.name}`}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="size-12 rounded-none border border-rule object-cover"
                      />
                    ) : (
                      <div className="flex size-12 items-center justify-center border border-rule bg-muted font-serif text-sm font-medium">
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div>
                      <span className="font-serif text-lg font-medium leading-tight">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {p.subtitle}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {p.shortDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-rule/60 text-xs font-mono text-primary">
                  <span>View Profile</span>
                  <ArrowRight className="size-3.5" />
                </div>
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
          {[...projectEntities]
            .sort((a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99))
            .map((p) => (
            <li key={p.id}>
              <EntityLink
                to={p.path}
                className="flex h-full flex-col justify-between bg-surface p-6 transition-colors hover:bg-muted"
              >
                <div>
                  <div className="flex items-center gap-3">
                    {p.image ? (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded border border-rule bg-surface p-1">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="size-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div>
                      <span className="label-mono">
                        {p.category ?? "Project"} · {p.statusBadge ?? p.lifecycle}
                      </span>
                      <span className="mt-0.5 block font-serif text-xl">{p.name}</span>
                    </div>
                  </div>
                  <span className="mt-3 block text-sm text-muted-foreground">
                    {p.shortDescription}
                  </span>
                </div>
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
              Full timeline ({timeline.length} entries) →
            </Link>
          </div>
          <ol className="mt-6 divide-y divide-rule border-y border-rule">
            {[...timeline]
              .reverse()
              .slice(0, 5)
              .map((t) => (
                <li key={t.date + t.title} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]">
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
