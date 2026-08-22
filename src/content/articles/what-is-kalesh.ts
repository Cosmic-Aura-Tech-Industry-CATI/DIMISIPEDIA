import type { Article } from "@/data/articles";

/**
 * Technical and product deep-dive article: What is Kalesh?
 */
export const article: Article = {
  id: "article-what-is-kalesh",
  slug: "what-is-kalesh",
  title: "What is Kalesh? The Anonymous Social Polling Platform",
  excerpt:
    "An architectural and conceptual breakdown of Kalesh: the anonymous social voting, campus sentiment, and debate platform created by Shikhar Dixit and engineered by DIMISI Technologies.",
  authorId: "person:shikhar-dixit",
  category: "Projects",
  tags: [
    "Kalesh",
    "Social Media",
    "Anonymous Polling",
    "DIMISI Technologies",
    "Flutter",
    "Node.js",
    "MongoDB",
  ],
  datePublished: "2026-08-21",
  dateModified: "2026-08-21",
  status: "published",
  featured: true,
  content: [
    {
      type: "p",
      text: "Kalesh is an anonymous social interaction and voting platform engineered by DIMISI Technologies Private Limited and architected by Shikhar Dixit. The application enables users across college campuses and regional communities to initiate anonymous opinion polls, participate in cultural debates, and express unfiltered perspectives under pseudonymous privacy safeguards.",
    },
    { type: "h2", id: "origin-concept", text: "Conceptual Origin and Tagline" },
    {
      type: "p",
      text: "Originally prototyped in November 2025 as 'Poll-Social', the platform was rebranded as Kalesh with the cultural tagline 'Chalo Kalesh Karey'. In Hindi pop-culture and Indian campus slang, 'Kalesh' playfully denotes lively debate, dramatic arguments, and viral conversations.",
    },
    { type: "h2", id: "key-features", text: "Key Functional Features" },
    {
      type: "ul",
      items: [
        "Anonymous Micro-Polls — Fast, real-time community voting on campus topics, tech debates, and trending culture.",
        "Zero-Identifier Privacy Architecture — Mathematical anonymity models ensuring vote privacy without storing identity trackers.",
        "Interactive Comment Threads — Nested discussion forums where users can defend or challenge opinions.",
        "Real-Time Sentiment Analytics — Live vote tallies and regional percentage breakdowns powered by WebSockets and Firebase.",
      ],
    },
    { type: "h2", id: "technical-stack", text: "Engineering & Architecture Stack" },
    {
      type: "p",
      text: "Kalesh is built upon a high-performance modern tech stack comprising Flutter (Dart) for cross-platform mobile apps, React and Vite for web client experiences, a scalable Node.js and Express.js backend cluster, MongoDB for flexible document persistence, and Firebase for low-latency real-time state synchronization.",
    },
    { type: "h2", id: "team-governance", text: "Engineering Team & Production Governance" },
    {
      type: "p",
      text: "The core engineering team includes Shikhar Dixit (Product Architect & Strategy), Swatantra Singh (System Architecture & Backend), Sheelu Singh (Lead Flutter Developer), and Mridul Mishra (Linux Infrastructure & API Engineering).",
    },
    { type: "h2", id: "entities", text: "Documented Entity Relationships" },
    {
      type: "entity",
      entityId: "kalesh",
      note: "The software application detailed in this article.",
    },
    {
      type: "entity",
      entityId: "dimisi-technologies",
      note: "The engineering organization developing Kalesh.",
    },
    {
      type: "entity",
      entityId: "shikhar-dixit",
      note: "The creator and product architect of Kalesh.",
    },
  ],
  sourceIds: ["src-kalesh-app", "src-dimisi-tech-web"],
  relatedEntities: [
    "kalesh",
    "dimisi-technologies",
    "shikhar-dixit",
    "flutter",
    "node-js",
    "mongodb",
  ],
  seoTitle: "What is Kalesh? Anonymous Social Polling Platform | DIMISIPEDIA",
  seoDescription:
    "Comprehensive guide to Kalesh: features, architecture, anonymity model, and engineering stack behind India's viral anonymous social polling platform.",
};
