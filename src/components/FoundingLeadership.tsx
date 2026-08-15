import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { foundingLeadership, getEntity } from "@/data/knowledge";

const founders = foundingLeadership
  .map((f) => ({ ...f, entity: getEntity(f.id) }))
  .filter((f): f is typeof f & { entity: NonNullable<typeof f.entity> } => Boolean(f.entity));

export function FoundingLeadership() {
  return (
    <section id="leadership-cards" className="mt-12 scroll-mt-24">
      <h2 className="text-2xl">Founding leadership</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Each founder is a separate entity with its own roles, sources and verification record.
      </p>

      <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {founders.map((f) => (
          <li key={f.id}>
            <Link
              to={f.entity.path}
              className="group flex h-full flex-col bg-surface px-5 py-6 transition-colors hover:bg-muted"
            >
              {f.entity.image ? (
                <img
                  src={f.entity.image}
                  alt={`Portrait of ${f.entity.name}`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="mb-4 size-20 border border-rule object-cover"
                />
              ) : null}
              <span className="label-mono">Person</span>
              <span className="mt-1 font-serif text-xl leading-snug">{f.entity.name}</span>
              <span className="mt-1 text-sm text-muted-foreground">{f.roles}</span>
              <span className="mt-4 text-sm">
                {(f.entity.areas ?? []).join(" · ")}
              </span>
              <span className="mt-6 flex items-center gap-1.5 text-sm text-primary">
                View profile
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Documented roles and areas of work for the founding leadership of DIMISI Technologies
          </caption>
          <thead>
            <tr className="border-y border-rule">
              <th scope="col" className="py-3 pr-4 label-mono font-normal">Person</th>
              <th scope="col" className="py-3 pr-4 label-mono font-normal">Core roles</th>
              <th scope="col" className="py-3 label-mono font-normal">Documented areas</th>
            </tr>
          </thead>
          <tbody>
            {founders.map((f) => (
              <tr key={f.id} className="border-b border-rule align-top">
                <th scope="row" className="py-3 pr-4 font-normal">
                  <Link to={f.entity.path} className="underline underline-offset-4">
                    {f.entity.name}
                  </Link>
                </th>
                <td className="py-3 pr-4 text-muted-foreground">{f.roles}</td>
                <td className="py-3 text-muted-foreground">{f.areas}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-muted-foreground">
          These are the areas currently documented for each founder. They are not exclusive
          divisions of responsibility.
        </p>
      </div>
    </section>
  );
}
