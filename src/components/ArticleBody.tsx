import { EntityLink } from "./EntityLink";
import { entities } from "@/data/knowledge";
import type { Block } from "@/data/articles";

/**
 * Renders a source-controlled article body from structured blocks.
 * Blocks keep content portable and free of hand-written JSX in content files.
 */
export function ArticleBody({ content }: { content: Block[] }) {
  return (
    <div className="prose-editorial mt-8">
      {content.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="scroll-mt-24 text-2xl">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id} className="scroll-mt-24 text-xl">
                {b.text}
              </h3>
            );
          case "p":
            return <p key={i}>{b.text}</p>;
          case "ul":
            return (
              <ul key={i} className="list-disc pl-5">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-5">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-primary pl-5 not-italic">
                <p className="font-serif text-lg">{b.text}</p>
                {b.attribution ? (
                  <footer className="label-mono mt-2">{b.attribution}</footer>
                ) : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-8">
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className="w-full border border-rule object-cover"
                />
                {b.caption ? (
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    {b.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "entity": {
            const e = entities.find((x) => x.id === b.entityId);
            if (!e) return null;
            return (
              <EntityLink
                key={i}
                to={e.path}
                className="my-4 block border border-border bg-surface px-4 py-4 no-underline transition-colors hover:bg-muted"
              >
                <span className="label-mono">{e.entityType}</span>
                <span className="mt-1 block font-serif text-lg">{e.name}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {b.note ?? e.shortDescription}
                </span>
              </EntityLink>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
