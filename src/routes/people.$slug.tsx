import { createFileRoute, notFound } from "@tanstack/react-router";
import { EntityArticle } from "@/components/EntityArticle";
import { PersonSections, personSectionMeta } from "@/components/PersonSections";
import { peopleEntities } from "@/data/knowledge";
import { entityHead, pageHead } from "@/lib/seo";

const trailFor = (name: string) => [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "People", to: "/people" },
  { label: name },
];

export const Route = createFileRoute("/people/$slug")({
  loader: ({ params }) => {
    const person = peopleEntities.find(
      (p) => p.slug === params.slug || p.id === params.slug || p.aliases?.includes(params.slug),
    );
    if (!person) throw notFound();
    return { person };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Not found | DIMISIPEDIA",
        description: "This entity is not documented in DIMISIPEDIA.",
        path: "/people",
        noindex: true,
      });
    }
    return entityHead(loaderData.person, trailFor(loaderData.person.name));
  },
  component: PersonPage,
});

function PersonPage() {
  const { person } = Route.useLoaderData();
  return (
    <EntityArticle
      entity={person}
      trail={trailFor(person.name)}
      tocExtra={personSectionMeta(person)}
    >
      <PersonSections entity={person} />
    </EntityArticle>
  );
}
