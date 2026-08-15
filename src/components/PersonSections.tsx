import { Link } from "@tanstack/react-router";
import { StatusChip } from "./StatusChip";
import { EntityLink } from "./EntityLink";
import { relationsFor, timeline, type Entity } from "@/data/knowledge";
import { articlesByAuthor, articlesForEntity, articlePath } from "@/data/articles";

/**
 * Encyclopedia sections derived from the knowledge graph for a person entity.
 *
 * Every block renders only when supporting data exists — empty sections are
 * never shown, and nothing here invents a fact.
 */

export interface PersonSectionMeta {
  id: string;
  heading: string;
}

function relatedGroups(entity: Entity) {
  const rels = relationsFor(entity.id);
  const by = (type: Entity["entityType"]) => {
    const seen = new Set<string>();
    return rels.filter((r) => {
      if (r.entity.entityType !== type || seen.has(r.entity.id)) return false;
      seen.add(r.entity.id);
      return true;
    });
  };
  return {
    rels,
    organizations: by("organization"),
    projects: by("project"),
    technologies: by("technology"),
    events: by("event"),
  };
}

/** Section ids this person page will actually render, for the contents list. */
export function personSectionMeta(entity: Entity): PersonSectionMeta[] {
  const g = relatedGroups(entity);
  const out: PersonSectionMeta[] = [];
  if (g.organizations.length) out.push({ id: "organizations", heading: "Organizations" });
  if (g.projects.length) out.push({ id: "projects", heading: "Projects" });
  if (g.technologies.length) out.push({ id: "technologies", heading: "Technologies" });
  if (g.events.length) out.push({ id: "events", heading: "Events" });
  if (publicationsFor(entity).length || writingProfiles(entity).length)
    out.push({ id: "publications", heading: "Publications & writing" });
  if (personTimeline(entity).length) out.push({ id: "person-timeline", heading: "Timeline" });
  if (relatedPeople(entity).length) out.push({ id: "related-people", heading: "Related people" });
  return out;
}

function personTimeline(entity: Entity) {
  return timeline.filter((t) => t.related.includes(entity.id));
}

function relatedPeople(entity: Entity) {
  const direct = relationsFor(entity.id).filter((r) => r.entity.entityType === "person");
  const colleagues = relationsFor(entity.id)
    .filter((r) => r.entity.entityType === "organization")
    .flatMap((r) => relationsFor(r.entity.id))
    .filter((r) => r.entity.entityType === "person" && r.entity.id !== entity.id);
  const seen = new Set<string>();
  return [...direct, ...colleagues].filter((r) => {
    if (r.entity.id === entity.id || seen.has(r.entity.id)) return false;
    seen.add(r.entity.id);
    return true;
  });
}

/** First-party writing platforms recorded on the entity (Medium, blogs, etc.). */
function writingProfiles(entity: Entity) {
  return (entity.externalProfiles ?? []).filter(
    (p) => p.url && /medium|substack|dev\.to|hashnode|blog/i.test(p.label),
  );
}

function publicationsFor(entity: Entity) {
  const authored = articlesByAuthor(entity.slug);
  const about = articlesForEntity(entity.id);
  const seen = new Set<string>();
  return [...authored, ...about].filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

function LinkList({
  items,
}: {
  items: { type: string; entity: Entity }[];
}) {
  return (
    <ul className="mt-5 grid gap-px border border-border bg-rule sm:grid-cols-2">
      {items.map((r, i) => (
        <li key={`${i}-${r.entity.id}`}>
          <EntityLink
            to={r.entity.path}
            className="block h-full bg-surface px-4 py-4 transition-colors hover:bg-muted"
          >
            <span className="label-mono">{r.type}</span>
            <span className="mt-1 block font-serif text-lg">{r.entity.name}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{r.entity.subtitle}</span>
          </EntityLink>
        </li>
      ))}
    </ul>
  );
}

function Block({
  id,
  heading,
  intro,
  children,
}: {
  id: string;
  heading: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-2xl">{heading}</h2>
      {intro ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{intro}</p> : null}
      {children}
    </section>
  );
}

export function PersonSections({ entity }: { entity: Entity }) {
  const g = relatedGroups(entity);
  const pubs = publicationsFor(entity);
  const events = personTimeline(entity);
  const people = relatedPeople(entity);
  const writing = writingProfiles(entity);

  return (
    <>
      {g.organizations.length > 0 ? (
        <Block
          id="organizations"
          heading="Organizations"
          intro="Organizations associated with this person in the DIMISIPEDIA entity graph."
        >
          <LinkList items={g.organizations} />
        </Block>
      ) : null}

      {g.projects.length > 0 ? (
        <Block
          id="projects"
          heading="Projects"
          intro="Projects this person is documented as being associated with."
        >
          <LinkList items={g.projects} />
        </Block>
      ) : null}

      {g.technologies.length > 0 ? (
        <Block
          id="technologies"
          heading="Technologies"
          intro="Technologies recorded against this person's documented work."
        >
          <LinkList items={g.technologies} />
        </Block>
      ) : null}

      {g.events.length > 0 ? (
        <Block id="events" heading="Events" intro="Documented events involving this person.">
          <LinkList items={g.events} />
        </Block>
      ) : null}

      {pubs.length > 0 || writing.length > 0 ? (
        <Block
          id="publications"
          heading="Publications & writing"
          intro="Articles written by this person or documenting them on DIMISIPEDIA, plus first-party publishing profiles recorded in the registry."
        >
          {writing.length > 0 ? (
            <ul className="mt-5 grid gap-px border border-border bg-rule sm:grid-cols-2">
              {writing.map((w) => (
                <li key={w.label}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="block h-full bg-surface px-4 py-4 transition-colors hover:bg-muted"
                  >
                    <span className="label-mono">Publishing profile</span>
                    <span className="mt-1 block font-serif text-lg">{w.label}</span>
                    {w.note ? (
                      <span className="mt-0.5 block text-xs text-muted-foreground">{w.note}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {pubs.length > 0 ? (
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {pubs.map((a) => (
              <li key={a.slug} className="py-4">
                <EntityLink
                  to={articlePath(a)}
                  className="font-serif text-lg underline-offset-4 hover:underline"
                >
                  {a.title}
                </EntityLink>
                <p className="mt-1 text-sm text-muted-foreground">{a.excerpt}</p>
                <p className="mt-2 label-mono">
                  {a.category} · {a.datePublished}
                  {a.status === "draft" ? " · Draft" : ""}
                </p>
              </li>
            ))}
          </ul>
          ) : null}
        </Block>
      ) : null}

      {events.length > 0 ? (
        <Block
          id="person-timeline"
          heading="Timeline"
          intro="Dated milestones recorded against this person. Only dates supported by source data appear."
        >
          <ol className="mt-5 border-l border-rule">
            {events.map((t) => (
              <li key={t.date + t.title} className="relative pb-6 pl-6 last:pb-0">
                <span
                  className="absolute left-0 top-2 size-1.5 -translate-x-1/2 rounded-full bg-primary"
                  aria-hidden
                />
                <p className="label-mono">{t.displayDate}</p>
                <p className="mt-1 font-serif text-lg">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusChip status={t.status} />
                  <span className="label-mono">{t.category}</span>
                </div>
              </li>
            ))}
          </ol>
        </Block>
      ) : null}

      {people.length > 0 ? (
        <Block
          id="related-people"
          heading="Related people"
          intro="People connected through documented organizational or project relationships."
        >
          <ul className="mt-5 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {people.map((r) => (
              <li key={r.entity.id}>
                <EntityLink
                  to={r.entity.path}
                  className="flex h-full items-center gap-3 bg-surface px-4 py-4 transition-colors hover:bg-muted"
                >
                  {r.entity.image ? (
                    <img
                      src={r.entity.image}
                      alt={`Portrait of ${r.entity.name}`}
                      width={44}
                      height={44}
                      loading="lazy"
                      className="size-11 shrink-0 border border-rule object-cover"
                    />
                  ) : null}
                  <span className="min-w-0">
                    <span className="block font-serif text-base">{r.entity.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {r.entity.subtitle}
                    </span>
                  </span>
                </EntityLink>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}
    </>
  );
}
