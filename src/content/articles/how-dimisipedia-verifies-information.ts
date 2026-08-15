import type { Article } from "@/data/articles";

/**
 * Editorial article describing DIMISIPEDIA's own verification architecture.
 * Every statement here describes the platform's published rules, which are
 * implemented in src/data/evidence.ts and documented at /methodology.
 */
export const article: Article = {
  id: "article-verification-architecture",
  slug: "how-dimisipedia-verifies-information",
  title: "How DIMISIPEDIA verifies information",
  excerpt:
    "DIMISIPEDIA verifies claims, not people. This article explains the five verification states, the four-tier source hierarchy and the rule that an editorial status can lower a claim's standing but never raise it.",
  authorId: "editorial",
  category: "Analysis",
  tags: ["verification", "sources", "editorial policy", "knowledge graph"],
  datePublished: "2026-08-15",
  dateModified: "2026-08-15",
  status: "published",
  featured: true,
  content: [
    {
      type: "p",
      text: "DIMISIPEDIA publishes structured records about DIMISI Technologies Pvt. Ltd. and the people, projects and technologies associated with it. Because those records concern living individuals and an operating company, the platform treats verification as a property of an individual claim rather than as a badge attached to a page or a person.",
    },
    { type: "h2", id: "five-states", text: "Five verification states" },
    {
      type: "p",
      text: "Each claim carries exactly one of five states. The states are ordered by the strength of the evidence recorded against the claim, not by editorial confidence.",
    },
    {
      type: "ul",
      items: [
        "Verified — confirmed by a primary or authoritative record.",
        "Source-backed — supported by a credible source, without independent confirmation.",
        "Needs verification — the claim exists, but recorded evidence is not yet sufficient.",
        "Disputed — credible sources conflict, and DIMISIPEDIA discloses the conflict.",
        "Unverified — no reliable source is currently recorded.",
      ],
    },
    { type: "h2", id: "source-tiers", text: "The four-tier source hierarchy" },
    {
      type: "p",
      text: "Every source in the registry is classified by type, and that type determines its tier. Tier A covers government records and institutional filings. Tier B covers first-party material published by the entity itself. Tier C covers independent sources not controlled by the entity. Tier D covers community and user-generated material, which is treated as a lead rather than as evidence.",
    },
    {
      type: "p",
      text: "The distinction that matters most in practice is between Tier B and Tier C. A company's own website is a reliable record of what the company says about itself; it is not independent verification of that statement. DIMISIPEDIA therefore does not promote a claim to verified on first-party material alone.",
    },
    { type: "h2", id: "derivation", text: "Status is derived, not typed" },
    {
      type: "p",
      text: "Verification status is computed from the sources attached to a claim. A URL alone never produces a verified state. Where an editor records a more cautious status than the evidence would allow, the cautious status is published: editorial judgement can lower a claim's standing, but it can never raise it above what the sources support.",
    },
    {
      type: "quote",
      text: "Verify the claim, not the person. A biography is a collection of separately evidenced statements, each of which can stand or fall on its own.",
      attribution: "DIMISIPEDIA editorial policy",
    },
    { type: "h2", id: "disclosure", text: "Disclosing absence of evidence" },
    {
      type: "p",
      text: "Where no source exists for a claim, DIMISIPEDIA states that no source exists rather than omitting the question or presenting the claim as established. Sections with no factual basis are not published at all, and no biographical detail — education, birthplace, family, awards — is inferred to fill a gap.",
    },
    { type: "h2", id: "entities", text: "Entities documented by this article" },
    { type: "entity", entityId: "dimisipedia", note: "The platform described here." },
    {
      type: "entity",
      entityId: "dimisi-technologies",
      note: "The organization whose records DIMISIPEDIA documents.",
    },
  ],
  sourceIds: ["src-dimisipedia-spec"],
  relatedEntities: ["dimisipedia", "dimisi-technologies"],
  seoTitle: "How DIMISIPEDIA verifies information — verification states and source tiers",
  seoDescription:
    "DIMISIPEDIA verifies claims rather than people: five verification states, a four-tier source hierarchy, and a derivation rule where editorial judgement can only lower a claim's status.",
};
