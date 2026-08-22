/**
 * DIMISIPEDIA knowledge base (v1, file-backed).
 *
 * DATA INTEGRITY RULE: nothing in this file may be invented. Every value here
 * comes from information supplied by DIMISI Technologies. Where a value is not
 * known, the field exists but is left empty and the status is "needs-verification".
 */

export type EntityType = "organization" | "person" | "project" | "technology" | "event" | "article";

export type InfoStatus =
  | "verified"
  | "source-backed"
  | "documented"
  | "needs-verification"
  | "disputed"
  | "unverified"
  | "historical"
  | "archived"
  | "official";

export type LifecycleStatus =
  | "Concept"
  | "Research"
  | "Prototype"
  | "Development"
  | "Active"
  | "Paused"
  | "Archived"
  | "Discontinued";

export type SourceType =
  | "Official Website"
  | "Government Record"
  | "Company Announcement"
  | "Press Coverage"
  | "Interview"
  | "Event Page"
  | "Institutional Source"
  | "Project Documentation"
  | "Social Profile"
  | "Third-party Database"
  | "Other";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  publishedAt?: string;
  type: SourceType;
  relatedEntities: string[];
  claim: string;
  addedAt: string;
  status: InfoStatus;
}

export type RelationshipType =
  | "Founded by"
  | "Founded"
  | "Works at"
  | "Leads"
  | "Developed by"
  | "Develops"
  | "Maintained by"
  | "Created by"
  | "Associated with"
  | "Part of"
  | "Uses technology"
  | "Used by"
  | "Participated in"
  | "Documented by"
  | "Documents"
  | "Founder of"
  | "Co-Founder of"
  | "Director of"
  | "CEO of"
  | "CTO of"
  | "CMO of"
  | "COO of"
  | "Product leadership"
  | "Technical leadership"
  | "Engineering"
  | "Marketing"
  | "Growth"
  | "Operations"
  | "Operational association"
  | "Led by"
  | "Studied at"
  | "Worked at"
  | "Related to";

export interface Relationship {
  from: string;
  type: RelationshipType;
  to: string;
}

export interface Revision {
  n: number;
  date: string;
  editor: string;
  change: string;
}

export interface SectionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Section {
  id: string;
  heading: string;
  body: string[];
  images?: SectionImage[];
  status?: InfoStatus;
}

export interface Fact {
  label: string;
  value: string;
  status?: InfoStatus;
  sourceIds?: string[];
}

export type ClaimType =
  | "Confirmed role"
  | "Descriptive claim"
  | "Project association"
  | "Corporate claim"
  | "Historical claim"
  | "Educational claim";

export interface Claim {
  claim: string;
  claimType: ClaimType;
  sourceIds: string[];
  verification: InfoStatus;
  disputed?: boolean;
  dateAdded: string;
  lastVerified?: string;
  editor: string;
}

export interface RoleRecord {
  title: string;
  organization: string;
  status: InfoStatus;
  note?: string;
  sourceIds?: string[];
}

export interface EducationRecord {
  institution: string;
  qualification: string;
  field?: string;
  period?: string;
  result?: string;
  note?: string;
  status: InfoStatus;
}

export interface ExperienceRecord {
  organization: string;
  role: string;
  period?: string;
  note?: string;
  status: InfoStatus;
}

export interface ExternalProfile {
  label: string;
  url?: string;
  verified: boolean;
  note?: string;
}

export interface QA {
  q: string;
  a: string;
}

export interface Entity {
  id: string;
  slug: string;
  path: string;
  entityType: EntityType;
  name: string;
  subtitle: string;
  image?: string;
  shortDescription: string;
  answer: string; // AEO: direct factual answer
  lifecycle?: LifecycleStatus;
  areas?: string[];
  roles?: RoleRecord[];
  education?: EducationRecord[];
  experience?: ExperienceRecord[];
  externalProfiles?: ExternalProfile[];
  claims?: Claim[];
  questions?: QA[];
  faqs?: { question: string; answer: string }[];
  knowsAbout?: string[];
  sameAs?: string[];
  facts: Fact[];
  sections: Section[];
  coverage: { area: string; status: InfoStatus; note: string }[];
  officialLinks: { label: string; url: string; official: boolean }[];
  sourceIds: string[];
  revisions: Revision[];
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
  seoTitle: string;
  seoDescription: string;
}

import {
  founderEntities,
  founderRelationships,
  founderSources,
  founderTimeline,
  foundingLeadership,
} from "./founders";

export { foundingLeadership };

export const ORG_NAME = "DIMISI Technologies Pvt. Ltd.";

const baseSources: Source[] = [
  {
    id: "src-dimisi-official",
    title: "DIMISI Technologies — official website",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    url: "https://dimisi.tech",
    type: "Official Website",
    relatedEntities: ["dimisi-technologies"],
    claim: "Primary official web presence of DIMISI Technologies Pvt. Ltd.",
    addedAt: "2026-08-15",
    status: "official",
  },
  {
    id: "src-kalesh-official",
    title: "Kalesh — official website",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    url: "https://thekalesh.com",
    type: "Official Website",
    relatedEntities: ["kalesh"],
    claim: "Official web domain recorded for the Kalesh project.",
    addedAt: "2026-08-15",
    status: "source-backed",
  },
  {
    id: "src-incorporation",
    title: "Incorporation record — DIMISI Technologies Pvt. Ltd.",
    publisher: "Company records provided by DIMISI Technologies",
    type: "Company Announcement",
    relatedEntities: ["dimisi-technologies"],
    claim: "Incorporation date recorded as 9 April 2026, Kanpur, Uttar Pradesh, India.",
    addedAt: "2026-08-15",
    status: "needs-verification",
  },
  {
    id: "src-team-roster",
    title: "DIMISI Technologies team roster",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: [
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
      "sheelu-singh",
      "mridul-mishra",
    ],
    claim: "Names and current roles of DIMISI Technologies team members.",
    addedAt: "2026-08-15",
    status: "documented",
  },
  {
    id: "src-kalesh-docs",
    title: "Kalesh project documentation",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: ["kalesh"],
    claim:
      "Product concepts and prototype/development technology associated with the Kalesh project.",
    addedAt: "2026-08-15",
    status: "documented",
  },
  {
    id: "src-kalesh-msme",
    title: "Team Kalesh at the MSME Entrepreneurship Conclave & Exhibition",
    publisher: "LinkedIn — Shikhar Dixit",
    url: "https://www.linkedin.com/in/shikhar040",
    type: "Social Profile",
    relatedEntities: ["kalesh", "shikhar-dixit"],
    claim:
      "Public post recording Kalesh team participation in the MSME Entrepreneurship Conclave & Exhibition and naming team members.",
    addedAt: "2026-08-15",
    status: "source-backed",
  },
  {
    id: "src-kalesh-hiring",
    title: "Kalesh — Android Developer internship announcement",
    publisher: "LinkedIn",
    type: "Company Announcement",
    relatedEntities: ["kalesh"],
    claim:
      "Public hiring announcement documenting Flutter, Dart, Android development, REST API integration, real-time polling, backend APIs, Firebase/real-time databases and Git as technologies used on Kalesh.",
    addedAt: "2026-08-15",
    status: "source-backed",
  },
  {
    id: "src-dimisipedia-spec",
    title: "DIMISIPEDIA product requirements document",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: ["dimisipedia"],
    claim: "Purpose, architecture and editorial principles of DIMISIPEDIA.",
    addedAt: "2026-08-15",
    status: "documented",
  },
];

const baseRelationships: Relationship[] = [
  { from: "sheelu-singh", type: "Works at", to: "dimisi-technologies" },
  { from: "mridul-mishra", type: "Works at", to: "dimisi-technologies" },

  { from: "dimisi-technologies", type: "Develops", to: "kalesh" },
  { from: "dimisi-technologies", type: "Develops", to: "dimisipedia" },
  { from: "dimisipedia", type: "Documents", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "Founder of", to: "kalesh" },
  { from: "shikhar-dixit", type: "CEO of", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Associated with", to: "kalesh" },
  { from: "swatantra-singh", type: "Technical leadership", to: "kalesh" },
  { from: "mridul-mishra", type: "Engineering", to: "kalesh" },
  { from: "sheelu-singh", type: "Engineering", to: "kalesh" },
  { from: "kalesh", type: "Uses technology", to: "flutter" },
  { from: "kalesh", type: "Uses technology", to: "dart" },
  { from: "kalesh", type: "Uses technology", to: "firebase" },
  { from: "kalesh", type: "Uses technology", to: "react" },
  { from: "kalesh", type: "Uses technology", to: "node-js" },
  { from: "kalesh", type: "Uses technology", to: "typescript" },
  { from: "kalesh", type: "Uses technology", to: "mongodb" },
  { from: "dimisipedia", type: "Uses technology", to: "react" },
  { from: "dimisipedia", type: "Uses technology", to: "typescript" },
];

const baseRevisions = (created: string): Revision[] => [
  {
    n: 1,
    date: created,
    editor: "DIMISIPEDIA Editorial",
    change: "Entity page created from documented DIMISI information.",
  },
];

const people: Entity[] = [
  ...founderEntities,
  {
    id: "sheelu-singh",
    slug: "sheelu-singh",
    path: "/people/sheelu-singh",
    entityType: "person",
    name: "Sheelu Singh",
    subtitle: "Android & Flutter Developer — DIMISI Technologies",
    image: "/images/sheelu-singh.png",
    shortDescription:
      "Mobile engineer at DIMISI Technologies; Android and Flutter developer for the Kalesh platform.",
    answer:
      "Sheelu Singh is a mobile application engineer at DIMISI Technologies Private Limited, working as the Android developer for Kalesh, the company's anonymous social platform. His recorded work covers Flutter-based cross-platform architecture, state and dependency management, payment gateway integration and mobile interface engineering.",
    facts: [
      { label: "Role", value: "Android & Flutter Developer", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Primary project", value: "Kalesh (mobile application)", status: "source-backed" },
      {
        label: "Education",
        value: "Computer Science Engineering — Dr. A.P.J. Abdul Kalam Technical University",
        status: "source-backed",
      },
      { label: "Core technologies", value: "Flutter, Provider, Firebase", status: "source-backed" },
    ],
    areas: ["Mobile development", "Cross-platform engineering", "UI/UX implementation"],
    roles: [
      {
        title: "Android Developer",
        organization: ORG_NAME,
        status: "source-backed",
        sourceIds: ["src-sheelu-linkedin", "src-kalesh-team"],
      },
    ],
    education: [
      {
        institution: "Dr. A.P.J. Abdul Kalam Technical University",
        qualification: "Computer Science Engineering",
        field: "Computer Science Engineering",
        status: "source-backed",
        note: "Affiliated college, enrolment dates and graduation status are not recorded.",
      },
    ],
    experience: [
      {
        organization: "Yahwey Software Solutions",
        role: "Software Development Engineer (SDE) Intern",
        note: "Recorded as cross-platform development work preceding his move to the DIMISI application team.",
        status: "source-backed",
      },
    ],
    externalProfiles: [
      {
        label: "LinkedIn",
        url: "https://in.linkedin.com",
        verified: false,
        note: "Directory-level link supplied; exact profile URL awaiting confirmation.",
      },
      {
        label: "DIMISI Technologies (LinkedIn)",
        url: "https://www.linkedin.com",
        verified: false,
        note: "Company directory listing.",
      },
      {
        label: "Kalesh platform",
        url: "https://thekalesh.com",
        verified: false,
        note: "First-party product site.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        status: "source-backed",
        body: [
          "Sheelu Singh is an engineering professional at DIMISI Technologies Private Limited, recorded primarily as the Android developer for the company's flagship anonymous social product, Kalesh. [1][2]",
          "He holds a background in Computer Science Engineering from Dr. A.P.J. Abdul Kalam Technical University, and before joining the DIMISI application team is recorded as having worked as a Software Development Engineer intern at Yahwey Software Solutions. [1]",
        ],
      },
      {
        id: "work",
        heading: "Work at DIMISI Technologies",
        status: "source-backed",
        body: [
          "Singh's recorded technical portfolio centres on mobile architecture design, using the Flutter framework to build cross-platform applications. [1][3]",
          "For the Kalesh mobile rollout, the responsibilities recorded for him include engineering the application codebase, managing structural dependencies such as Provider and Firebase, implementing payment gateway integrations, and maintaining application interfaces. [1][2]",
          "His described professional focus covers interface fluidity, responsive layouts built with typography themes (ThemeData) and mobile performance. [1][3] These are described responsibilities rather than independently audited contributions.",
        ],
      },
      {
        id: "biography",
        heading: "Biography",
        status: "needs-verification",
        body: [
          "No further biographical detail — date of birth, location or independent media coverage — has been supplied to DIMISIPEDIA. Fields are left empty rather than inferred.",
        ],
      },
    ],
    coverage: [
      { area: "Identity", status: "documented", note: "Supplied by the organization." },
      {
        area: "Role",
        status: "source-backed",
        note: "Android and Flutter development recorded through professional profile and product team material.",
      },
      {
        area: "Education",
        status: "source-backed",
        note: "Self-reported university background; institutional confirmation pending.",
      },
      {
        area: "Professional experience",
        status: "source-backed",
        note: "One prior internship recorded.",
      },
      { area: "Biography", status: "needs-verification", note: "Awaiting information." },
      { area: "Media", status: "needs-verification", note: "No independent coverage recorded." },
    ],
    officialLinks: [{ label: "thekalesh.com", url: "https://thekalesh.com", official: true }],
    sourceIds: [
      "src-sheelu-linkedin",
      "src-kalesh-team",
      "src-sheelu-pulsjob",
      "src-dimisi-linkedin",
      "src-team-roster",
    ],
    revisions: [
      ...baseRevisions("2026-08-15"),
      {
        n: 2,
        date: "2026-08-15",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Mobile engineering role, education, prior internship and Kalesh responsibilities added with claim-level sourcing.",
      },
    ],
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "Sheelu Singh — Android & Flutter Developer, DIMISI Technologies | DIMISIPEDIA",
    seoDescription:
      "Sheelu Singh is an Android and Flutter developer at DIMISI Technologies, engineering the Kalesh mobile application with Flutter, Provider and Firebase.",
  },
  {
    id: "mridul-mishra",
    slug: "mridul-mishra",
    path: "/people/mridul-mishra",
    entityType: "person",
    name: "Mridul Mishra",
    subtitle: "Founding Engineer — Kalesh, DIMISI Technologies",
    image: "/images/mridul-mishra.png",
    shortDescription:
      "Backend engineer and founding engineer for Kalesh, DIMISI Technologies' consumer social platform.",
    answer:
      "Mridul Mishra is a software engineer at DIMISI Technologies Private Limited and the founding engineer for Kalesh, the company's consumer social platform. His recorded work covers backend architecture, REST APIs, WebSocket-based real-time interaction, background job processing with BullMQ and Redis, MongoDB data optimisation and CI/CD pipelines.",
    facts: [
      { label: "Role", value: "Founding Engineer (Kalesh)", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Primary project", value: "Kalesh (backend platform)", status: "source-backed" },
      {
        label: "Core technologies",
        value: "Node.js REST APIs, WebSockets, BullMQ, Redis, MongoDB",
        status: "source-backed",
      },
    ],
    areas: ["Backend engineering", "Real-time systems", "Infrastructure & CI/CD"],
    roles: [
      {
        title: "Founding Engineer",
        organization: "Kalesh — DIMISI Technologies",
        status: "source-backed",
        sourceIds: ["src-kalesh-team", "src-kalesh-linkedin"],
      },
    ],
    externalProfiles: [
      {
        label: "Kalesh platform team page",
        url: "https://thekalesh.com",
        verified: false,
        note: "First-party product team listing.",
      },
      {
        label: "Kalesh company page (LinkedIn)",
        url: "https://in.linkedin.com",
        verified: false,
        note: "Directory-level link supplied.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        status: "source-backed",
        body: [
          "Mridul Mishra is a software engineer recorded as the founding engineer for Kalesh, the consumer platform venture of DIMISI Technologies. [1] He is positioned within the development team as the engineer responsible for building and maintaining the backend architecture that supports the platform's real-time social features. [1][2]",
        ],
      },
      {
        id: "work",
        heading: "Engineering work",
        status: "source-backed",
        body: [
          "His recorded contributions focus on backend data performance and persistent network connections: custom REST APIs for the platform, and WebSockets for instant, bidirectional user interaction. [1]",
          "For stability under load, background task scheduling and message queues are recorded as handled with BullMQ paired with Redis caching. [1] His workflow is further described as covering data storage optimisation within MongoDB clusters and automated continuous integration and deployment pipelines for production releases. [1]",
          "These are described responsibilities drawn from first-party product material and have not been independently audited.",
        ],
      },
      {
        id: "biography",
        heading: "Biography",
        status: "needs-verification",
        body: [
          "No education, prior employment, date of birth or independent media coverage has been supplied to DIMISIPEDIA for Mridul Mishra. These fields are left empty rather than inferred.",
        ],
      },
    ],
    coverage: [
      { area: "Identity", status: "documented", note: "Supplied by the organization." },
      {
        area: "Role",
        status: "source-backed",
        note: "Founding engineer role recorded through first-party product material.",
      },
      {
        area: "Education",
        status: "needs-verification",
        note: "Unknown — no information supplied.",
      },
      {
        area: "Professional experience",
        status: "needs-verification",
        note: "Unknown — no information supplied.",
      },
      {
        area: "Projects",
        status: "source-backed",
        note: "Kalesh backend architecture recorded in detail.",
      },
      { area: "Media", status: "needs-verification", note: "No independent coverage recorded." },
    ],
    officialLinks: [{ label: "thekalesh.com", url: "https://thekalesh.com", official: true }],
    sourceIds: ["src-kalesh-team", "src-kalesh-linkedin", "src-team-roster"],
    revisions: [
      ...baseRevisions("2026-08-15"),
      {
        n: 2,
        date: "2026-08-15",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Founding engineer role and documented Kalesh backend responsibilities added with sourcing.",
      },
    ],
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "Mridul Mishra — Founding Engineer, Kalesh (DIMISI Technologies) | DIMISIPEDIA",
    seoDescription:
      "Mridul Mishra is the founding engineer for Kalesh at DIMISI Technologies, working on REST APIs, WebSockets, BullMQ/Redis queues, MongoDB and CI/CD.",
  },
];

const organization: Entity = {
  id: "dimisi-technologies",
  slug: "dimisi-technologies",
  path: "/dimisi-technologies",
  entityType: "organization",
  name: "DIMISI Technologies",
  subtitle: "Organization",
  image: "/images/dimisi-logo.png",
  shortDescription:
    "Indian technology company associated with software development, digital products and emerging technology projects.",
  answer:
    "DIMISI Technologies Pvt. Ltd. is an Indian technology company recorded as incorporated on 9 April 2026 and based in Kanpur, Uttar Pradesh. It is associated with software development, digital products, web development and AI automation, and its documented project ecosystem includes Kalesh and DIMISIPEDIA.",
  lifecycle: "Active",
  facts: [
    {
      label: "Legal name",
      value: "DIMISI Technologies Private Limited",
      status: "needs-verification",
    },
    { label: "CIN", value: "U62013UP2026PTC246506", status: "needs-verification" },
    { label: "Organization type", value: "Private limited company", status: "needs-verification" },
    { label: "Founded", value: "9 April 2026", status: "needs-verification" },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "documented" },
    {
      label: "Registered office",
      value: "MIG 3/131, Swarn Jayanti Vihar, Koyala Nagar, Kanpur, Uttar Pradesh, India",
      status: "needs-verification",
    },
    { label: "Industry", value: "Information Technology", status: "documented" },
    { label: "Website", value: "dimisi.tech", status: "source-backed" },
    {
      label: "Founding leadership",
      value: "Shikhar Dixit, Nishkarsh Mishra, Swatantra Singh",
      status: "needs-verification",
    },
    { label: "Projects", value: "Kalesh, DIMISIPEDIA", status: "documented" },
    { label: "Current status", value: "Active", status: "documented" },
  ],
  sections: [
    {
      id: "overview",
      heading: "Overview",
      body: [
        "DIMISI Technologies Pvt. Ltd. is an Indian technology company associated with software development, digital products, technology initiatives and emerging technology projects. Its recorded base of operations is Kanpur, Uttar Pradesh, India, and its main website is dimisi.tech.",
        "The company's documented project ecosystem currently includes Kalesh, an anonymous social engagement platform, and DIMISIPEDIA, the organization's public knowledge and documentation platform.",
      ],
      status: "documented",
    },
    {
      id: "history",
      heading: "History",
      body: [
        "The earliest milestone currently recorded in DIMISIPEDIA is the incorporation date of 9 April 2026. Further historical detail will be published as it is documented and verified.",
      ],
      status: "needs-verification",
    },
    {
      id: "founding",
      heading: "Founding",
      body: [
        "Supplied corporate information records DIMISI Technologies Private Limited as incorporated on 9 April 2026 in Kanpur, Uttar Pradesh, India, under the corporate identity number U62013UP2026PTC246506. The registered-office information supplied to DIMISIPEDIA is held in the editorial record and is not published until it has been verified as appropriate for public display.",
        "Shikhar Dixit is recorded as the founder and chief executive officer. Nishkarsh Mishra and Swatantra Singh are recorded as co-founders and directors appointed at incorporation. These are corporate claims and require official corporate-record verification; DIMISIPEDIA does not describe them as registry-verified.",
        "Initial capital structure and shareholding particulars have not been supplied and are not published.",
      ],
      status: "needs-verification",
    },
    {
      id: "founding-leadership",
      heading: "Founding leadership",
      body: [
        "DIMISI Technologies' founding leadership is represented by Shikhar Dixit, Nishkarsh Mishra and Swatantra Singh. Their documented roles span executive leadership, technology, product development, operations, marketing and organizational development.",
        "Each person is connected to the organization through separate, individually verifiable role relationships rather than a single combined founder field, and each is connected in turn to the Kalesh project through the area of work associated with them. The comparison below records the areas currently documented for each founder; they are not exclusive divisions of responsibility.",
      ],
      status: "needs-verification",
    },
    {
      id: "mission",
      heading: "Mission",
      body: [
        "DIMISIPEDIA does not currently hold an official mission statement issued by DIMISI Technologies. This section will be published once an official statement has been supplied.",
      ],
      status: "needs-verification",
    },
    {
      id: "vision",
      heading: "Vision",
      body: [
        "No official long-term vision statement has been recorded yet. Awaiting an authorised statement from the organization.",
      ],
      status: "needs-verification",
    },
    {
      id: "projects",
      heading: "Products & Projects",
      body: [
        "Kalesh — an anonymous social engagement platform associated with DIMISI Technologies.",
        "DIMISIPEDIA — the official public knowledge, documentation and credibility platform of DIMISI Technologies.",
        "Future projects are added through the DIMISIPEDIA content system and are not published until confirmed by an administrator.",
      ],
      status: "documented",
    },
    {
      id: "services",
      heading: "Services",
      body: [
        "Activities currently associated with DIMISI Technologies include web development, software development, mobile development, digital products, social media marketing, AI automation and technology solutions.",
        "These activities are recorded as associated rather than confirmed. Each must be reviewed and approved by an authorised administrator before DIMISIPEDIA presents it as a definitive company statement.",
      ],
      status: "needs-verification",
    },
    {
      id: "team",
      heading: "Team",
      body: [
        "Beyond the founding leadership, two further team members are currently documented: Sheelu Singh (Android Developer) and Mridul Mishra (Backend Developer).",
        "Interns, alumni and contributors will be added as they are documented.",
      ],
      status: "documented",
    },
    {
      id: "technology",
      heading: "Technology",
      body: [
        "Technologies documented in association with DIMISI project work include React, Node.js, TypeScript, Express, MongoDB and Vite, together with deployment and process infrastructure such as DigitalOcean, Vercel/Netlify and PM2.",
        "Some of these represent prototype or development infrastructure and are not presented as a confirmed production stack.",
      ],
      status: "documented",
    },
    {
      id: "media",
      heading: "Media & Press",
      body: ["No independent press coverage has been recorded in DIMISIPEDIA yet."],
      status: "needs-verification",
    },
  ],
  coverage: [
    {
      area: "Identity",
      status: "documented",
      note: "Legal name, location and industry supplied by the organization.",
    },
    {
      area: "Leadership",
      status: "needs-verification",
      note: "Founding roles supplied as corporate information; awaiting official corporate record.",
    },
    {
      area: "Registration",
      status: "needs-verification",
      note: "CIN and incorporation date supplied; registry document not yet reviewed.",
    },
    {
      area: "Projects",
      status: "documented",
      note: "Kalesh and DIMISIPEDIA documented with official domains.",
    },
    {
      area: "Timeline",
      status: "needs-verification",
      note: "Only the incorporation date is currently recorded.",
    },
    { area: "Media", status: "needs-verification", note: "No independent coverage recorded." },
    {
      area: "Financials",
      status: "needs-verification",
      note: "No financial information recorded or claimed.",
    },
  ],
  officialLinks: [
    {
      label: "Official website",
      url: "https://dimisi.tech",
      official: true,
    },
    {
      label: "Kalesh platform",
      url: "https://thekalesh.com",
      official: true,
    },
  ],
  sameAs: [
    "https://dimisi.tech",
    "https://thekalesh.com",
    "https://www.crunchbase.com/organization/dimisi-technologies-private-limited",
    "https://www.linkedin.com/company/dimisi-technologies",
    "https://tracxn.com/d/companies/dimisi-technologies",
    "https://www.falconebiz.com",
  ],
  faqs: [
    {
      question: "What is DIMISI Technologies Private Limited?",
      answer:
        "DIMISI Technologies Private Limited (CIN: U62013UP2026PTC246506) is an Indian technology and software development company incorporated on 9 April 2026, headquartered in Kanpur, Uttar Pradesh.",
    },
    {
      question: "Who are the founders and directors of DIMISI Technologies?",
      answer:
        "DIMISI Technologies was founded by Shikhar Dixit (Founder & CEO), Swatantra Singh (Co-Founder & CTO), and Nishkarsh Mishra (Co-Founder & CFO/Operations), who serve as founding directors.",
    },
    {
      question: "How did DIMISI Technologies get its name?",
      answer:
        "The name DIMISI was created by founder Shikhar Dixit using the syllables of the founding directors' surnames: DI (Dixit) + MI (Mishra) + SI (Singh).",
    },
    {
      question: "What products and platforms does DIMISI Technologies build?",
      answer:
        "DIMISI Technologies builds consumer software platforms including Kalesh (an anonymous social polling and discussion platform), DIMISIPEDIA, custom web and mobile apps, and enterprise IT solutions.",
    },
    {
      question: "Where is DIMISI Technologies located?",
      answer:
        "DIMISI Technologies is registered and headquartered in Kanpur, Uttar Pradesh, India, with its registered office in Swarn Jayanti Vihar, Koyala Nagar.",
    },
  ],
  sourceIds: [
    "src-dimisi-official",
    "src-corporate-record",
    "src-incorporation",
    "src-dimisi-linkedin",
    "src-team-roster",
    "src-falconebiz-registry",
    "src-tracxn-dimisi",
    "src-zaubacorp-dimisi",
    "src-kalesh-team",
  ],
  revisions: [
    {
      n: 1,
      date: "2026-08-15",
      editor: "DIMISIPEDIA Editorial",
      change: "Organization entity created from documented DIMISI information.",
    },
    {
      n: 2,
      date: "2026-08-15",
      editor: "DIMISIPEDIA Editorial",
      change: "Added team, technology and services sections with verification status.",
    },
  ],
  createdAt: "2026-08-15",
  updatedAt: "2026-08-21",
  seoTitle: "DIMISI Technologies Private Limited — Official Knowledge Base | DIMISIPEDIA",
  seoDescription:
    "Official corporate overview, incorporation particulars (CIN: U62013UP2026PTC246506), leadership, products (Kalesh, DIMISIPEDIA), and history of DIMISI Technologies Private Limited.",
};

const projects: Entity[] = [
  {
    id: "kalesh",
    slug: "kalesh",
    path: "/projects/kalesh",
    entityType: "project",
    name: "Kalesh",
    subtitle: "Product — anonymous social media and opinion platform",
    image: "/images/kalesh-icon.png",
    shortDescription:
      "India-focused anonymous social media and opinion platform developed by DIMISI Technologies.",
    answer:
      "Kalesh is an India-focused anonymous social media and opinion platform developed by DIMISI Technologies Private Limited. It is built around anonymous profiles, real-time polls and private anonymous conversations, and its public company profile records it as founded in 2026, headquartered in Kanpur, Uttar Pradesh, and classified under Social Networking Platforms.",
    lifecycle: "Development",
    facts: [
      {
        label: "Type",
        value: "Anonymous social media & opinion platform",
        status: "source-backed",
        sourceIds: ["src-kalesh-official", "src-kalesh-linkedin"],
      },
      {
        label: "Industry",
        value: "Social Networking Platforms",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Organization",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
        sourceIds: ["src-dimisi-website", "src-shikhar-linkedin"],
      },
      {
        label: "Founded",
        value: "2026",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Headquarters",
        value: "Kanpur, Uttar Pradesh, India",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Company type",
        value: "Privately held",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Company size",
        value: "2–10 employees",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Founder & CEO",
        value: "Shikhar Dixit",
        status: "source-backed",
        sourceIds: ["src-shikhar-linkedin", "src-kalesh-linkedin"],
      },
      {
        label: "Website",
        value: "thekalesh.com",
        status: "source-backed",
        sourceIds: ["src-kalesh-official"],
      },
    ],
    questions: [
      {
        q: "What is Kalesh?",
        a: "Kalesh is an anonymous social media and opinion platform developed by DIMISI Technologies Private Limited, built around anonymous profiles, real-time polls and private anonymous conversations.",
      },
      {
        q: "Who owns Kalesh?",
        a: "Kalesh is identified on the DIMISI Technologies website as a flagship product of DIMISI Technologies Private Limited.",
      },
      {
        q: "Who founded Kalesh?",
        a: "Shikhar Dixit is publicly identified as the Founder and CEO of Kalesh, and the Kalesh company page independently lists him among its people.",
      },
      {
        q: "Where is Kalesh based?",
        a: "Kalesh's public company profile records its headquarters as Kanpur, Uttar Pradesh, India.",
      },
      {
        q: "Is Kalesh India's first anonymous social media platform?",
        a: 'Kalesh describes itself as "India\'s First Anonymous Social Media Platform" on its official website. DIMISIPEDIA records this as a first-party self-description; no independent source establishing it as a matter of fact has been recorded.',
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: [
          "Kalesh is an India-focused anonymous social media and opinion platform designed around the principle that a person's opinion should matter more than their identity. Its official website positions the product around anonymous profiles, real-time polls, private conversations and authentic opinion sharing. [1]",
          "Kalesh's public company profile classifies the organization under Social Networking Platforms, records it as privately held, gives its headquarters as Kanpur, Uttar Pradesh, states a company size of 2–10 employees, records 2026 as the founding year and lists thekalesh.com as its website. [2]",
          "The DIMISI Technologies website identifies Kalesh as a flagship product of DIMISI Technologies Private Limited and describes it as a social platform combining real-time polls, private chats and authentic opinion sharing with an emphasis on privacy. [3]",
        ],
        status: "source-backed",
        images: [
          {
            src: "/images/kalesh-icon.png",
            alt: "Kalesh product icon",
            caption: "Kalesh product icon",
          },
          {
            src: "/images/dimisi-logo.png",
            alt: "DIMISI Technologies brand mark",
            caption: "Developed by DIMISI Technologies",
          },
        ],
      },

      {
        id: "positioning",
        heading: "Self-description and positioning",
        body: [
          'The official Kalesh website describes the platform as "India\'s First Anonymous Social Media Platform" and summarises the concept as "a platform where your opinion matters, not your identity." [1]',
          "DIMISIPEDIA records these statements as first-party positioning published by the product itself. They are documented here as claims made by Kalesh, and are not recorded as independently established facts; no third-party source verifying priority in the Indian market has been recorded.",
          'The same material emphasises a judgment-free environment, described through the phrases "No Profile Pressure", "No Judgment" and "Just Honest Opinions". [1]',
        ],
        status: "source-backed",
      },
      {
        id: "features",
        heading: "Features",
        body: [
          "Anonymous profiles. The platform's core concept is participation without a real name, face or personal identity, described on the official website through the ideas of a hidden identity, an anonymous username and zero judgment. [1]",
          'Real-time polls. The polling system is presented as "Live Polls. Real Votes. Instant Results.", allowing users to create polls, collect opinions from other anonymous users and watch results update live. [1] The public company profile describes the product as an anonymous opinion and polling platform for Gen-Z. [2]',
          'Private anonymous chat. A second interaction layer is described as "Connect. Chat. Stay Anonymous.", with an anonymous matching approach that connects people around shared interests and thoughts while conversations remain private. [1]',
          'Poll creator tools. The website describes the creation flow as "Ask Anything. Get Real Opinions. Instantly.", positioning Kalesh as an opinion-gathering mechanism as well as a social product. [1]',
        ],
        status: "source-backed",
      },
      {
        id: "audience",
        heading: "Audience",
        body: [
          "Kalesh's public company material describes the product as a real-time anonymous opinion and polling platform being developed for Gen-Z, with a stated intention of creating a safe, judgment-free environment for honest opinions without identity pressure. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "organization",
        heading: "Organization",
        body: [
          "Kalesh is not a standalone unaffiliated website. The DIMISI Technologies website lists Kalesh among the company's products and categorises it as a social platform with real-time polls, private chats and authentic opinion sharing. [3]",
          "Shikhar Dixit is publicly associated with Kalesh as its Founder and CEO; his professional profile records him with DIMISI Technologies Pvt Ltd and describes him in that role. [4] The Kalesh company page independently lists him among the organization's people, providing a second public source for the association. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "team",
        heading: "Team",
        body: [
          "Public Kalesh material references a wider team including Shikhar Dixit, Nishkarsh Mishra, Swatantra Singh, Mridul Mishra and Sheelu Singh, alongside further members named in company updates. [2][5]",
          "Individual role assignments within the Kalesh product are recorded on each person's DIMISIPEDIA entity page where a source exists for that specific role; roles that are not separately sourced are not asserted here.",
        ],
        status: "source-backed",
      },
      {
        id: "technology",
        heading: "Technology",
        body: [
          "A publicly posted Kalesh Android Developer internship announcement describes development work involving Flutter, Dart, Android application development, REST API integration, real-time polling features, backend APIs, Firebase or comparable real-time databases, version control with Git and application performance work. [6]",
          "These are the technologies documented in public Kalesh material. Internal or unpublished parts of the stack are not recorded on this page.",
        ],
        status: "source-backed",
      },
      {
        id: "events",
        heading: "Events",
        body: [
          "Kalesh has publicly documented participation in the MSME Entrepreneurship Conclave & Exhibition. A public post by Shikhar Dixit describes the event as an opportunity for the Kalesh team to represent its vision and to interact with innovators, founders and industry leaders. [5]",
          "No award, government sponsorship or competitive outcome is recorded for this appearance, as no primary event source confirming one has been supplied.",
        ],
        status: "source-backed",
      },
      {
        id: "philosophy",
        heading: "Product philosophy",
        body: [
          "The recurring theme across Kalesh's public material is that identity should not determine the value of an opinion. The platform's messaging consistently emphasises opinion over identity, authentic expression, absence of profile pressure, anonymous participation and real-time engagement, rather than follower-based social networking. [1][2]",
        ],
        status: "source-backed",
      },
      {
        id: "launch",
        heading: "Launch & availability",
        body: [
          "No public launch date, app-store listing or release milestone for Kalesh has been recorded in DIMISIPEDIA.",
        ],
        status: "needs-verification",
      },
    ],
    coverage: [
      {
        area: "Identity",
        status: "source-backed",
        note: "Name, category, domain and company attributes recorded from first-party and public company sources.",
      },
      {
        area: "Features",
        status: "source-backed",
        note: "Feature set recorded from the official product website.",
      },
      {
        area: "Leadership",
        status: "source-backed",
        note: "Founder and CEO association recorded from two public sources.",
      },
      {
        area: "Technology",
        status: "source-backed",
        note: "Stack recorded from a public Kalesh hiring announcement.",
      },
      {
        area: "Events",
        status: "source-backed",
        note: "MSME Entrepreneurship Conclave participation recorded from a public post.",
      },
      {
        area: "Launch",
        status: "needs-verification",
        note: "No release date or store listing recorded.",
      },
      {
        area: "Independent coverage",
        status: "needs-verification",
        note: "No third-party press coverage recorded.",
      },
    ],
    officialLinks: [{ label: "thekalesh.com", url: "https://thekalesh.com", official: true }],
    sourceIds: [
      "src-kalesh-official",
      "src-kalesh-linkedin",
      "src-dimisi-website",
      "src-shikhar-linkedin",
      "src-kalesh-msme",
      "src-kalesh-hiring",
      "src-kalesh-team",
      "src-kalesh-docs",
    ],
    revisions: [
      ...baseRevisions("2026-08-15"),
      {
        n: 2,
        date: "2026-08-15",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Rebuilt as a source-backed article: company attributes, feature set, audience, organization link, team, technology and event participation cited to first-party and public company sources; self-description separated from established fact.",
      },
    ],
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "Kalesh — Anonymous Social Media & Opinion Platform | DIMISIPEDIA",
    seoDescription:
      "Kalesh is an India-focused anonymous social media and opinion platform by DIMISI Technologies: anonymous profiles, real-time polls, private chats, team, technology and sources.",
  },

  {
    id: "dimisipedia",
    slug: "dimisipedia",
    path: "/projects/dimisipedia",
    entityType: "project",
    name: "DIMISIPEDIA",
    subtitle: "Project — knowledge and documentation platform",
    shortDescription:
      "The official public knowledge, documentation and credibility platform of DIMISI Technologies.",
    answer:
      "DIMISIPEDIA is the official public knowledge, information and documentation platform of DIMISI Technologies Pvt. Ltd. It documents the organization, its people, projects, technology, history and activities as a set of source-backed, interconnected entities.",
    lifecycle: "Development",
    facts: [
      { label: "Type", value: "Knowledge platform", status: "documented" },
      { label: "Operated by", value: ORG_NAME, status: "documented" },
      { label: "Domain", value: "dimisipedia.me", status: "documented" },
      { label: "Status", value: "Development", status: "documented" },
    ],
    sections: [
      {
        id: "overview",
        heading: "What DIMISIPEDIA is",
        body: [
          "DIMISIPEDIA is the structured public knowledge layer of DIMISI Technologies. It combines a company encyclopedia, an entity database, a public archive and a source-backed information repository into a single reference platform.",
        ],
        status: "documented",
      },
      {
        id: "why",
        heading: "Why it exists",
        body: [
          "DIMISIPEDIA exists so that both people and machine-based search systems can understand DIMISI Technologies precisely: who founded it, what it builds, who works there, what technologies it uses and how each of those claims is evidenced.",
        ],
        status: "documented",
      },
      {
        id: "operator",
        heading: "Who operates it",
        body: [
          "DIMISIPEDIA is operated by DIMISI Technologies Pvt. Ltd. It is a first-party publication and is not an independent encyclopedia.",
        ],
        status: "documented",
      },
      {
        id: "architecture",
        heading: "Knowledge architecture",
        body: [
          "Every subject is modelled as an entity — organization, person, project, technology, event or article — with a slug, status, sources, relationships and a revision history. Relationships between entities form an internal knowledge graph, and structured data is generated from the same records that produce the readable page.",
        ],
        status: "documented",
      },
      {
        id: "credibility",
        heading: "Credibility system",
        body: [
          "Each claim carries an information status: verified, source-backed, documented, needs verification, historical or archived. DIMISIPEDIA does not publish credibility scores and does not display verification badges it has not earned.",
        ],
        status: "documented",
      },
      {
        id: "seo",
        heading: "Discoverability goals",
        body: [
          "Pages are built for search engines and answer engines alike: unique metadata, canonical URLs, breadcrumbs, semantic HTML, direct factual answers, structured data and stable human-readable URLs.",
        ],
        status: "documented",
      },
    ],
    coverage: [
      { area: "Identity", status: "documented", note: "Purpose and operator documented." },
      {
        area: "Architecture",
        status: "documented",
        note: "Defined in the product requirements document.",
      },
      {
        area: "Release history",
        status: "needs-verification",
        note: "Version milestones not yet recorded.",
      },
    ],
    officialLinks: [{ label: "dimisipedia.me", url: "https://dimisipedia.me", official: true }],
    sourceIds: ["src-dimisipedia-spec"],
    revisions: baseRevisions("2026-08-15"),
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "DIMISIPEDIA — Knowledge Platform of DIMISI Technologies",
    seoDescription:
      "DIMISIPEDIA is the official public knowledge and documentation platform of DIMISI Technologies Pvt. Ltd. Purpose, architecture and credibility system.",
  },
];

const techEntity = (id: string, name: string, answer: string, usedBy: string[]): Entity => ({
  id,
  slug: id,
  path: `/technology/${id}`,
  entityType: "technology",
  name,
  subtitle: "Technology",
  shortDescription: answer,
  answer,
  facts: [
    { label: "Category", value: "Software technology", status: "documented" },
    { label: "Used in", value: usedBy.join(", "), status: "needs-verification" },
  ],
  sections: [
    {
      id: "overview",
      heading: "Association with DIMISI",
      body: [
        `${name} is recorded in DIMISI project documentation in association with ${usedBy.join(" and ")}. Whether it forms part of a confirmed production stack has not been verified.`,
      ],
      status: "needs-verification",
    },
  ],
  coverage: [
    { area: "Association", status: "documented", note: "Recorded in project documentation." },
    {
      area: "Production use",
      status: "needs-verification",
      note: "Not confirmed by an administrator.",
    },
  ],
  officialLinks: [],
  sourceIds: ["src-kalesh-docs"],
  revisions: baseRevisions("2026-08-15"),
  createdAt: "2026-08-15",
  updatedAt: "2026-08-15",
  seoTitle: `${name} at DIMISI Technologies | DIMISIPEDIA`,
  seoDescription: answer,
});

const technologies: Entity[] = [
  techEntity(
    "react",
    "React",
    "React is a JavaScript library for building user interfaces, recorded in DIMISI project documentation.",
    ["Kalesh", "DIMISIPEDIA"],
  ),
  techEntity(
    "node-js",
    "Node.js",
    "Node.js is a JavaScript runtime recorded in DIMISI project documentation.",
    ["Kalesh"],
  ),
  techEntity(
    "typescript",
    "TypeScript",
    "TypeScript is a typed superset of JavaScript recorded in DIMISI project documentation.",
    ["Kalesh", "DIMISIPEDIA"],
  ),
  techEntity(
    "express",
    "Express",
    "Express is a Node.js web framework recorded in DIMISI project documentation.",
    ["Kalesh"],
  ),
  techEntity(
    "mongodb",
    "MongoDB",
    "MongoDB is a document database recorded in DIMISI project documentation.",
    ["Kalesh"],
  ),
  techEntity(
    "vite",
    "Vite",
    "Vite is a front-end build tool recorded in DIMISI project documentation.",
    ["Kalesh", "DIMISIPEDIA"],
  ),
  techEntity(
    "flutter",
    "Flutter",
    "Flutter is a cross-platform application framework documented in public Kalesh hiring material as part of the Kalesh mobile stack.",
    ["Kalesh"],
  ),
  techEntity(
    "dart",
    "Dart",
    "Dart is the programming language used with Flutter, documented in public Kalesh hiring material.",
    ["Kalesh"],
  ),
  techEntity(
    "firebase",
    "Firebase",
    "Firebase is a real-time backend platform documented in public Kalesh hiring material in connection with real-time polling features.",
    ["Kalesh"],
  ),
];

export const sources: Source[] = [...baseSources, ...founderSources];
export const relationships: Relationship[] = [...baseRelationships, ...founderRelationships];

export const entities: Entity[] = [organization, ...people, ...projects, ...technologies];

export const peopleEntities = people;
export const projectEntities = projects;
export const technologyEntities = technologies;
export const organizationEntity = organization;

export interface TimelineEntry {
  date: string;
  displayDate: string;
  title: string;
  description: string;
  related: string[];
  category: string;
  status: InfoStatus;
  sourceId?: string;
}

const baseTimeline: TimelineEntry[] = [
  {
    date: "2024-10-15",
    displayDate: "15 October 2024",
    title: "Gandhigiri Face Recognition project & Birth of CATI",
    description:
      "Shikhar Dixit and Swatantra Singh developed a working Face Recognition System in 6–7 hours at home to present at Axis College's Gandhigiri technical project presentation event, deciding that evening to become business partners and founding CATI (Cosmic Aura Tech Industry), joined by Nishkarsh Mishra in the AICTE lab.",
    related: ["shikhar-dixit", "swatantra-singh", "nishkarsh-mishra", "dimisi-technologies"],
    category: "Founding",
    status: "source-backed",
  },
  {
    date: "2025-01-28",
    displayDate: "28 January – 4 February 2025",
    title: "IIT Bombay E-Summit 2025 participation",
    description:
      "The founding team traveled from Kanpur to Mumbai to attend IIT Bombay E-Summit 2025, gaining foundational experience in startup dynamics, pitch evaluation, and tech entrepreneurship.",
    related: ["shikhar-dixit", "swatantra-singh", "nishkarsh-mishra"],
    category: "Event",
    status: "source-backed",
  },
  {
    date: "2025-11-13",
    displayDate: "13 November 2025",
    title: "Poll-Social prototype developed and deployed",
    description:
      "Following campus placement rejections and a late-night strategy discussion with Priya, Shikhar Dixit coded the initial anonymous social platform prototype (Poll-Social), deployed live on Netlify.",
    related: ["shikhar-dixit", "kalesh"],
    category: "Project",
    status: "source-backed",
  },
  {
    date: "2025-11-17",
    displayDate: "17 November 2025",
    title: "Project Kalesh team formation & core onboarding",
    description:
      "The project was named Kalesh with the tagline 'Chalo Kalesh Karey'. Sheelu Singh (Flutter Android Developer) and Mridul Mishra (Linux & Backend Developer) joined the core team, completing initial joining agreements under CATI.",
    related: [
      "kalesh",
      "shikhar-dixit",
      "swatantra-singh",
      "nishkarsh-mishra",
      "sheelu-singh",
      "mridul-mishra",
    ],
    category: "Team",
    status: "source-backed",
  },
  {
    date: "2025-12-05",
    displayDate: "December 2025",
    title: "Startup & Entrepreneurship evaluation and Shark Tank submission",
    description:
      "The team delivered their Kalesh presentation under the mentorship of Jayendra Pratap Singh (Jayant Sir) at Axis College, receiving media studio access and submitting an application video for Shark Tank India.",
    related: ["kalesh", "shikhar-dixit", "swatantra-singh", "nishkarsh-mishra"],
    category: "Mentorship",
    status: "source-backed",
  },
  {
    date: "2026-01-22",
    displayDate: "22 January 2026",
    title: "TheKalesh.com web platform deployed",
    description:
      "Development of the official Kalesh web platform began on 4 January 2026 with web developer Siddhant Shekhar joining the team, successfully deploying live on TheKalesh.com on 22 January by Mridul Mishra.",
    related: ["kalesh", "mridul-mishra", "shikhar-dixit"],
    category: "Project",
    status: "source-backed",
  },
  {
    date: "2026-02-01",
    displayDate: "February 2026",
    title: "Campus office space allocated in Sand Tank area",
    description:
      "Dedicated physical office space was officially allocated to the team in the Sand Tank area at the Axis College campus, establishing their first operational headquarters for development and team coordination.",
    related: [
      "kalesh",
      "dimisi-technologies",
      "shikhar-dixit",
      "swatantra-singh",
      "nishkarsh-mishra",
    ],
    category: "Operations",
    status: "source-backed",
  },
  {
    date: "2026-02-22",
    displayDate: "22 February 2026",
    title: "Internship cohort onboarded at Sand Tank office",
    description:
      "With college administration approval, four interns joined the team at the Sand Tank office: Saumya Shukla (Social Media Marketing), Niyati Gupta (Backend), Harsh Mishra (Video Editor), and Amit Kumar (Backend Intern).",
    related: ["kalesh", "dimisi-technologies"],
    category: "Team",
    status: "source-backed",
  },
  {
    date: "2026-03-15",
    displayDate: "March 2026",
    title: "Creation of the 'DIMISI' name formula",
    description:
      "Facing MCA trademark conflicts with CATI during mid-sem exams, Shikhar Dixit formulated the name DIMISI (DI from Dixit, MI from Mishra, SI from Singh) on the back of an exam sheet, clearing MCA verification with zero conflicts.",
    related: ["dimisi-technologies", "shikhar-dixit", "nishkarsh-mishra", "swatantra-singh"],
    category: "Organization",
    status: "source-backed",
  },
  {
    date: "2026-04-09",
    displayDate: "9 April 2026",
    title: "DIMISI Technologies Private Limited officially incorporated",
    description:
      "Official incorporation under Ministry of Corporate Affairs (CIN: U62013UP2026PTC246506) in Kanpur, Uttar Pradesh, with Shikhar Dixit, Nishkarsh Mishra, and Swatantra Singh appointed as founding directors.",
    related: ["dimisi-technologies", "shikhar-dixit", "nishkarsh-mishra", "swatantra-singh"],
    category: "Organization",
    status: "verified",
    sourceId: "src-corporate-record",
  },
  {
    date: "2026-05-16",
    displayDate: "16–17 May 2026",
    title: "Home headquarters inauguration and company board mounted",
    description:
      "Operations shifted to a dedicated home office in Swarn Jayanti Vihar, Kanpur, with family support; company board mounted at the entrance on 17 May for statutory and bank account opening verification.",
    related: ["dimisi-technologies", "shikhar-dixit"],
    category: "Operations",
    status: "source-backed",
  },
  {
    date: "2026-06-15",
    displayDate: "June 2026",
    title: "First commercial client contract: Rudra Tours & Travels",
    description:
      "Following an extensive cold-outreach phase, the company secured its first commercial website development contract with Rudra Tours & Travels, joined by Somya Tiwari for client coordination and delivery, followed by two additional client deals.",
    related: ["dimisi-technologies", "shikhar-dixit"],
    category: "Business",
    status: "source-backed",
  },
  {
    date: "2026-08-15",
    displayDate: "15 August 2026",
    title: "LinkedIn 30-Day Kalesh Promotion Contest & Awards Ceremony",
    description:
      "Culmination of the 30-day viral LinkedIn creator challenge for Kalesh with an official felicitation ceremony in Kanpur presenting the 1st Prize Winner with a Certificate of Achievement.",
    related: [
      "kalesh",
      "dimisi-technologies",
      "shikhar-dixit",
      "swatantra-singh",
      "nishkarsh-mishra",
    ],
    category: "Campaign",
    status: "source-backed",
  },
  {
    date: "2026-08-19",
    displayDate: "19–21 August 2026",
    title: "Architecture & documentation of DIMISIPEDIA",
    description:
      "Initiated development of DIMISIPEDIA as the structured public knowledge encyclopedia of DIMISI Technologies to document its entities, journey, people, technologies, and verifiable sources.",
    related: ["dimisipedia", "dimisi-technologies", "shikhar-dixit"],
    category: "Project",
    status: "documented",
    sourceId: "src-dimisipedia-spec",
  },
];

export const timeline: TimelineEntry[] = [...baseTimeline, ...founderTimeline].sort((a, b) =>
  a.date.localeCompare(b.date),
);

export const events: { title: string; note: string }[] = [];
export const articles: { title: string; note: string }[] = [];

export function getEntity(id: string): Entity | undefined {
  return entities.find((e) => e.id === id);
}

export function getSources(ids: string[]): Source[] {
  // Order-preserving: citation numbers follow the entity's own source order.
  return ids.map((id) => sources.find((s) => s.id === id)).filter((s): s is Source => Boolean(s));
}

export function relationsFor(id: string): { type: RelationshipType; entity: Entity }[] {
  const out: { type: RelationshipType; entity: Entity }[] = [];
  for (const r of relationships) {
    if (r.from === id) {
      const e = getEntity(r.to);
      if (e) out.push({ type: r.type, entity: e });
    } else if (r.to === id) {
      const e = getEntity(r.from);
      if (e) out.push({ type: inverse(r.type), entity: e });
    }
  }
  return out;
}

function inverse(t: RelationshipType): RelationshipType {
  switch (t) {
    case "Founded by":
      return "Founded";
    case "Founded":
      return "Founded by";
    case "Develops":
      return "Developed by";
    case "Developed by":
      return "Develops";
    case "Works at":
      return "Associated with";
    case "Leads":
      return "Led by" as RelationshipType;
    case "Uses technology":
      return "Used by";
    case "Documents":
      return "Documented by";
    case "Documented by":
      return "Documents";
    case "Founder of":
      return "Founded by" as RelationshipType;
    case "Co-Founder of":
      return "Co-founded by" as RelationshipType;
    case "Director of":
      return "Director" as RelationshipType;
    case "CEO of":
      return "Chief Executive Officer" as RelationshipType;
    case "CTO of":
      return "Chief Technology Officer" as RelationshipType;
    case "Technical leadership":
      return "Technical leadership by" as RelationshipType;
    case "Engineering":
      return "Engineering by" as RelationshipType;
    case "CMO of":
      return "Chief Marketing Officer" as RelationshipType;
    case "COO of":
      return "Chief Operating Officer" as RelationshipType;
    case "Product leadership":
      return "Product leadership by" as RelationshipType;
    case "Marketing":
      return "Marketing by" as RelationshipType;
    case "Growth":
      return "Growth by" as RelationshipType;
    case "Operations":
      return "Operations by" as RelationshipType;
    case "Operational association":
      return "Operational association" as RelationshipType;
    default:
      return "Related to";
  }
}

export const statusLabel: Record<string, string> = {
  verified: "Verified",
  "source-backed": "Source-backed",
  documented: "Documented",
  "needs-verification": "Needs verification",
  disputed: "Disputed",
  unverified: "Unverified",
  historical: "Historical",
  archived: "Archived",
  official: "Official source",
};

export interface SearchResult {
  name: string;
  type: string;
  description: string;
  path: string;
}

export function searchKnowledge(q: string): SearchResult[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];

  interface ScoredResult {
    result: SearchResult;
    score: number;
  }

  const scored: ScoredResult[] = [];

  for (const e of entities) {
    const nameLower = e.name.toLowerCase();
    const subtitleLower = (e.subtitle || "").toLowerCase();
    const descLower = (e.shortDescription || "").toLowerCase();
    const answerLower = (e.answer || "").toLowerCase();

    let score = 0;
    if (nameLower === query) {
      score += 100;
    } else if (nameLower.startsWith(query)) {
      score += 70;
    } else if (nameLower.includes(query)) {
      score += 50;
    } else if (subtitleLower.includes(query)) {
      score += 35;
    } else if (descLower.includes(query) || answerLower.includes(query)) {
      score += 20;
    }

    if (score > 0) {
      scored.push({
        result: {
          name: e.name,
          type: e.entityType.toUpperCase(),
          description: e.shortDescription,
          path: e.path,
        },
        score,
      });
    }
  }

  for (const t of timeline) {
    const titleLower = t.title.toLowerCase();
    const descLower = t.description.toLowerCase();

    let score = 0;
    if (titleLower.startsWith(query)) {
      score += 45;
    } else if (titleLower.includes(query)) {
      score += 30;
    } else if (descLower.includes(query)) {
      score += 15;
    }

    if (score > 0) {
      scored.push({
        result: {
          name: t.title,
          type: "TIMELINE",
          description: t.displayDate,
          path: "/timeline",
        },
        score,
      });
    }
  }

  for (const s of sources) {
    const titleLower = s.title.toLowerCase();
    const pubLower = s.publisher.toLowerCase();

    let score = 0;
    if (titleLower.startsWith(query)) {
      score += 40;
    } else if (titleLower.includes(query) || pubLower.includes(query)) {
      score += 25;
    }

    if (score > 0) {
      scored.push({
        result: {
          name: s.title,
          type: "SOURCE",
          description: s.publisher,
          path: "/sources",
        },
        score,
      });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.result)
    .slice(0, 12);
}
