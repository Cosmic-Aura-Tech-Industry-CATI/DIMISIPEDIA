import type { Article } from "@/data/articles";

/**
 * DRAFT — kept unpublished on purpose.
 *
 * It demonstrates the manual authoring workflow (structured blocks, a Person
 * author, entity links, sources) and shows that drafts render for preview but
 * are marked noindex and excluded from the sitemap. Flip `status` to
 * "published" once the technology claims below are independently corroborated.
 */
export const article: Article = {
  id: "article-kalesh-stack",
  slug: "kalesh-technology-stack",
  title: "The technology recorded behind Kalesh",
  excerpt:
    "A working note on the technologies currently recorded against the Kalesh project in the DIMISIPEDIA knowledge graph, and what is not yet documented about them.",
  authorId: "person:shikhar-dixit",
  category: "Engineering",
  tags: ["Kalesh", "engineering", "knowledge graph"],
  datePublished: "2026-08-15",
  dateModified: "2026-08-15",
  status: "draft",
  content: [
    {
      type: "p",
      text: "Kalesh is documented in DIMISIPEDIA as a project of DIMISI Technologies Pvt. Ltd. The knowledge graph currently records four technologies against it: React, Node.js, TypeScript and MongoDB. This note describes what those records mean and what they do not establish.",
    },
    { type: "h2", id: "recorded", text: "What is recorded" },
    {
      type: "p",
      text: "Each technology association is a relationship in the entity graph, drawn from project documentation supplied by the organization. A relationship records that a technology is associated with the project; it does not describe architecture, versions, deployment or scale, none of which are documented.",
    },
    { type: "entity", entityId: "kalesh", note: "Project entity." },
    { type: "h2", id: "not-recorded", text: "What is not recorded" },
    {
      type: "ul",
      items: [
        "No architecture diagram or service topology is documented.",
        "No release history, user numbers or performance figures are recorded.",
        "No independent source currently corroborates the technology list.",
      ],
    },
    {
      type: "p",
      text: "Because the only evidence is first-party project documentation, these associations are held as source-backed rather than verified, and this article remains a draft until independent corroboration exists.",
    },
  ],
  sourceIds: ["src-kalesh-docs", "src-kalesh-official"],
  relatedEntities: ["kalesh", "dimisi-technologies"],
  seoTitle: "The technology recorded behind Kalesh | DIMISIPEDIA",
  seoDescription:
    "Working note on the technologies recorded against the Kalesh project in DIMISIPEDIA, and the limits of the current documentation.",
};
