/**
 * DIMISIPEDIA — founding leadership dataset.
 *
 * DATA INTEGRITY RULE: nothing here is invented. Every statement is derived from
 * material supplied by DIMISI Technologies. Claims that are supplied but not
 * independently confirmed are marked "needs-verification"; claims sourced to a
 * person's own publication or profile are marked "source-backed" (self-reported).
 *
 * Type-only imports keep this module free of runtime cycles with knowledge.ts.
 */

import type {
  Claim,
  Entity,
  Relationship,
  Source,
  TimelineEntry,
} from "./knowledge";

const ORG = "DIMISI Technologies Private Limited";
const ADDED = "2026-08-15";
const EDITOR = "DIMISIPEDIA Editorial";

/* ------------------------------------------------------------------ sources */

export const founderSources: Source[] = [
  {
    id: "src-corporate-record",
    title: "DIMISI Technologies Private Limited — corporate information",
    publisher: "Corporate information supplied by DIMISI Technologies",
    type: "Company Announcement",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "Incorporation on 9 April 2026, CIN U62013UP2026PTC246506, registered office at MIG 3/131, Swarn Jayanti Vihar, Koyala Nagar, Kanpur, Uttar Pradesh, and the appointment of the founding directors.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-falconebiz-registry",
    title: "DIMISI Technologies Private Limited — corporate registry listing (MCA-derived)",
    publisher: "FalconEbiz",
    url: "https://www.falconebiz.com",
    type: "Government Record",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "Registry aggregation of Ministry of Corporate Affairs filings: registration timestamp, company status, paid-up capital and licensed parameters.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-tracxn-dimisi",
    title: "DIMISI Technologies — company profile and director listing",
    publisher: "Tracxn",
    url: "https://tracxn.com",
    type: "Third-party Database",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "Third-party listing of the co-directors, corporate timeline and registered address of DIMISI Technologies Private Limited.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-dimisi-website",
    title: "DIMISI Technologies — official website",
    publisher: "DIMISI Technologies",
    url: "https://dimisi.tech",
    type: "Official Website",
    relatedEntities: ["dimisi-technologies", "shikhar-dixit", "kalesh"],
    claim: "First-party description of the company, its services and its product portfolio.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-dimisi-linkedin",
    title: "DIMISI Technologies — company profile",
    publisher: "LinkedIn",
    url: "https://www.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["dimisi-technologies", "shikhar-dixit"],
    claim: "Company description and leadership listing published by DIMISI Technologies.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-shikhar-linkedin",
    title: "Shikhar Dixit — professional profile",
    publisher: "LinkedIn",
    url: "https://in.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["shikhar-dixit"],
    claim:
      "Self-reported role at DIMISI Technologies, education, and earlier positions at Degree2Destiny, Hunch and the Entrepreneurship Cell, IIT Bombay.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-shikhar-medium",
    title: "Shikhar Dixit — published writing (@dixitshikhar004)",
    publisher: "Medium",
    url: "https://medium.com/@dixitshikhar004",
    type: "Other",
    relatedEntities: ["shikhar-dixit", "kalesh"],
    claim:
      "Founder publication describing the origin and product direction of Kalesh, including a development start in late 2025.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-shikhar-crunchbase",
    title: "Shikhar Dixit — person record",
    publisher: "Crunchbase",
    url: "https://www.crunchbase.com",
    type: "Third-party Database",
    relatedEntities: ["shikhar-dixit", "dimisi-technologies"],
    claim: "Third-party database listing associating Shikhar Dixit with DIMISI Technologies.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-nishkarsh-linkedin",
    title: "Nishkarsh Mishra — professional profile",
    publisher: "LinkedIn",
    url: "https://www.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["nishkarsh-mishra"],
    claim:
      "Self-reported roles at DIMISI Technologies and educational history at Kanpur Institute of Technology and Axis Colleges.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-nishkarsh-crunchbase",
    title: "Nishkarsh Mishra — person record",
    publisher: "Crunchbase",
    url: "https://www.crunchbase.com",
    type: "Third-party Database",
    relatedEntities: ["nishkarsh-mishra", "dimisi-technologies"],
    claim: "Third-party database listing associating Nishkarsh Mishra with DIMISI Technologies.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-swatantra-video",
    title: "Swatantra Singh — recorded interview / video appearance",
    publisher: "YouTube",
    type: "Interview",
    relatedEntities: ["swatantra-singh"],
    claim:
      "Recorded appearance in which Swatantra Singh is presented in connection with DIMISI Technologies.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-swatantra-crunchbase",
    title: "Swatantra Singh — person record",
    publisher: "Crunchbase",
    url: "https://www.crunchbase.com",
    type: "Third-party Database",
    relatedEntities: ["swatantra-singh", "dimisi-technologies", "kalesh"],
    claim:
      "Third-party database listing describing Swatantra Singh's founding milestones, technical expertise and association with DIMISI Technologies.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-planetexim-director",
    title: "Swatantra Singh — director profile (MCA-derived)",
    publisher: "PlanetExim",
    url: "https://www.planetexim.net",
    type: "Government Record",
    relatedEntities: ["swatantra-singh", "dimisi-technologies"],
    claim:
      "Directory listing of the board appointment, director identifiers and registration status recorded against Swatantra Singh.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-zaubacorp-dimisi",
    title: "DIMISI Technologies Private Limited — company database record",
    publisher: "ZaubaCorp",
    url: "https://www.zaubacorp.com",
    type: "Government Record",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "MCA-derived company database record covering directorship, shareholding and registration parameters.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-kalesh-team",
    title: "Kalesh — platform team page",
    publisher: "Kalesh (DIMISI Technologies)",
    url: "https://thekalesh.com",
    type: "Official Website",
    relatedEntities: ["kalesh", "swatantra-singh", "mridul-mishra", "sheelu-singh"],
    claim:
      "First-party listing of the Kalesh platform team, executive technology roles and engineering responsibilities.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-kalesh-linkedin",
    title: "Kalesh — company page",
    publisher: "LinkedIn",
    url: "https://in.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["kalesh", "swatantra-singh", "mridul-mishra"],
    claim: "Product rollout, engineering and developer updates published on the Kalesh company page.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-sheelu-linkedin",
    title: "Sheelu Singh — professional profile",
    publisher: "LinkedIn",
    url: "https://in.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["sheelu-singh"],
    claim:
      "Self-reported Android and Flutter development work at DIMISI Technologies, education at Dr. A.P.J. Abdul Kalam Technical University and an SDE internship at Yahwey Software Solutions.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-sheelu-pulsjob",
    title: "Sheelu Singh — developer listing",
    publisher: "PulsJob",
    url: "https://www.pulsjob.com",
    type: "Third-party Database",
    relatedEntities: ["sheelu-singh"],
    claim: "Third-party listing describing mobile development skills attributed to Sheelu Singh.",
    addedAt: ADDED,
    status: "needs-verification",
  },
];



/* ------------------------------------------------------------ relationships */

export const founderRelationships: Relationship[] = [
  { from: "shikhar-dixit", type: "Founder of", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "CEO of", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "Director of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "Co-Founder of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "Director of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "CMO of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "COO of", to: "dimisi-technologies" },
  { from: "swatantra-singh", type: "Co-Founder of", to: "dimisi-technologies" },
  { from: "swatantra-singh", type: "Director of", to: "dimisi-technologies" },
  { from: "swatantra-singh", type: "CTO of", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "Product leadership", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Product leadership", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Marketing", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Growth", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Operations", to: "kalesh" },
  { from: "swatantra-singh", type: "Operational association", to: "kalesh" },
  { from: "swatantra-singh", type: "Technical leadership", to: "kalesh" },
  { from: "sheelu-singh", type: "Engineering", to: "kalesh" },
  { from: "mridul-mishra", type: "Engineering", to: "kalesh" },
];


/* ----------------------------------------------------------------- timeline */

export const founderTimeline: TimelineEntry[] = [
  {
    date: "2025-11-01",
    displayDate: "Late 2025",
    title: "Kalesh development reportedly begins",
    description:
      "A founder publication states that development of Kalesh began in late 2025. Recorded as a historical claim pending an independent record.",
    related: ["kalesh", "shikhar-dixit"],
    category: "Project",
    status: "historical",
    sourceId: "src-shikhar-medium",
  },
];

/* ------------------------------------------------------------------ helpers */

const rev = (change: string) => [
  { n: 1, date: ADDED, editor: EDITOR, change: "Entity page created from documented DIMISI information." },
  { n: 2, date: ADDED, editor: EDITOR, change },
];

const claim = (
  c: string,
  claimType: Claim["claimType"],
  sourceIds: string[],
  verification: Claim["verification"],
): Claim => ({ claim: c, claimType, sourceIds, verification, dateAdded: ADDED, editor: EDITOR });

/* ------------------------------------------------------------ person: Shikhar */

const shikhar: Entity = {
  id: "shikhar-dixit",
  slug: "shikhar-dixit",
  path: "/people/shikhar-dixit",
  entityType: "person",
  name: "Shikhar Dixit",
  subtitle: "Founder & CEO · DIMISI Technologies",
  image: "/images/shikhar-dixit.png",
  shortDescription:
    "Indian technology entrepreneur and software developer; founder and chief executive officer of DIMISI Technologies Private Limited.",
  answer:
    "Shikhar Dixit is an Indian technology entrepreneur and software developer based in Kanpur, Uttar Pradesh. He is the founder and chief executive officer of DIMISI Technologies Private Limited and is associated with the development of Kalesh, an anonymous social polling and engagement platform built within the DIMISI ecosystem.",
  facts: [
    { label: "Occupation", value: "Technology entrepreneur, software developer", status: "source-backed" },
    { label: "Organization", value: ORG, status: "needs-verification" },
    { label: "Roles", value: "Founder · CEO · Director", status: "needs-verification" },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "source-backed" },
    { label: "Known for", value: "DIMISI Technologies, Kalesh", status: "source-backed" },
    { label: "Education", value: "B.Tech, Computer Science", status: "source-backed" },
  ],
  areas: ["Product", "Technology", "Entrepreneurship"],
  roles: [
    { title: "Founder", organization: ORG, status: "needs-verification", sourceIds: ["src-shikhar-linkedin", "src-corporate-record", "src-falconebiz-registry", "src-tracxn-dimisi"] },
    { title: "Chief Executive Officer", organization: ORG, status: "source-backed", sourceIds: ["src-shikhar-linkedin", "src-dimisi-linkedin"] },
    { title: "Director", organization: ORG, status: "needs-verification", note: "Requires official corporate-record verification.", sourceIds: ["src-corporate-record", "src-falconebiz-registry", "src-tracxn-dimisi"] },
  ],
  education: [
    {
      institution: "Dr. A.P.J. Abdul Kalam Technical University",
      qualification: "Bachelor of Technology",
      field: "Computer Science",
      status: "source-backed",
      note: "Enrolment dates, affiliated college and graduation status are not recorded.",
    },
  ],
  experience: [
    {
      organization: "Degree2Destiny",
      role: "AI Automation Intern",
      note: "Associated with workflow optimisation and AI automation work.",
      status: "source-backed",
    },
    {
      organization: "Hunch",
      role: "Campus Ambassador",
      period: "Six-month tenure (dates not recorded)",
      status: "source-backed",
    },
    {
      organization: "Entrepreneurship Cell, IIT Bombay",
      role: "Campus Ambassador",
      note: "Recorded as a campus leadership and community role. Not an institutional appointment by IIT Bombay.",
      status: "source-backed",
    },
  ],
  externalProfiles: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/shikhar040", verified: false, note: "Profile handle supplied by the subject: shikhar040." },
    { label: "Medium (@dixitshikhar004)", url: "https://medium.com/@dixitshikhar004", verified: false, note: "First-party personal publishing profile confirmed by the subject. Individual article titles are not yet recorded." },
    { label: "Crunchbase", url: "https://www.crunchbase.com", verified: false, note: "Directory-level link supplied; exact record URL awaiting confirmation." },
    { label: "DIMISI Technologies (official site)", url: "https://dimisi.tech", verified: false, note: "First-party company website." },
    { label: "Corporate registry (FalconEbiz)", url: "https://www.falconebiz.com", verified: false, note: "MCA-derived registry listing; deep link awaiting confirmation." },
    { label: "Tracxn company profile", url: "https://tracxn.com", verified: false, note: "Third-party corporate directory listing." },
  ],

  sections: [
    {
      id: "biography",
      heading: "Biography",
      status: "source-backed",
      body: [
        "Shikhar Dixit is an Indian technology entrepreneur and software developer based in Kanpur, Uttar Pradesh. [1] He is the founder and chief executive officer of DIMISI Technologies Private Limited, an information technology company associated with software development, digital platforms, automation and technology services. [1][4] His work has also been associated with the development of Kalesh, an anonymous social polling and engagement platform developed within the DIMISI ecosystem. [2][5]",
        "Dixit's documented activity spans two closely related areas: the executive direction of DIMISI Technologies as a company, and hands-on involvement in the products the company builds. DIMISIPEDIA records these as separate strands of evidence — corporate roles are drawn from corporate information supplied by the company, while product involvement is drawn largely from his own published writing and from the official Kalesh web presence. [2][3][5]",
        "Where an area of his work is described in interpretive language — for example characterisations of his approach or influence — DIMISIPEDIA records it as a descriptive claim rather than a confirmed fact, and does not restate it as an achievement.",
      ],
    },
    {
      id: "education",
      heading: "Early life and education",
      status: "source-backed",
      body: [
        "Dixit's academic background is in computer science. Supplied information records a Bachelor of Technology in Computer Science affiliated with Dr. A.P.J. Abdul Kalam Technical University. [1]",
        "Exact enrolment dates, the affiliated college, graduation status and any academic distinctions are not recorded in DIMISIPEDIA, and are not published in the absence of a source. His broader preparation for entrepreneurial work is described in supplied material as a combination of technology internships, campus leadership activity and independent product work rather than formal industry employment. [1]",
      ],
    },
    {
      id: "career",
      heading: "Career",
      status: "source-backed",
      body: [
        "Before concentrating on his entrepreneurial activity, Dixit gained practical experience through technology and community-oriented roles. His reported experience includes work as an AI Automation Intern at Degree2Destiny, where his associated work concerned workflow optimisation and automation; a Campus Ambassador role with Hunch, described as a six-month tenure; and participation as a Campus Ambassador for the Entrepreneurship Cell at IIT Bombay. [1]",
        "The Entrepreneurship Cell role is recorded as a campus leadership and community position. DIMISIPEDIA does not describe it as an appointment by the Indian Institute of Technology Bombay, because no source establishes that.",
        "The supplied material associates his subsequent work with software development, technology entrepreneurship, digital platforms, IT infrastructure and product development. These are recorded as areas of work associated with him rather than as a list of delivered outcomes. [1][2]",
      ],
    },
    {
      id: "dimisi",
      heading: "DIMISI Technologies",
      status: "needs-verification",
      body: [
        "Dixit is associated with the founding and leadership of DIMISI Technologies Private Limited, which supplied corporate information records as having been incorporated on 9 April 2026 with the corporate identity number U62013UP2026PTC246506. [3] The company was established in Kanpur, Uttar Pradesh, and operates in the information technology and software-development sector. [3][4]",
        "He serves in the company's executive leadership alongside co-founders Nishkarsh Mishra and Swatantra Singh. [3] DIMISIPEDIA holds his roles of founder, chief executive officer and director as three separate organisational relationships rather than one combined title, so that each can be verified — or withdrawn — on its own evidence.",
        "The incorporation particulars and the directorship remain marked as requiring official corporate-record verification until an administrator records the registry document itself. They are published here as supplied corporate information, not as confirmed registry facts.",
      ],
    },
    {
      id: "kalesh",
      heading: "Kalesh",
      status: "source-backed",
      body: [
        "Alongside his corporate responsibilities at DIMISI, Dixit has been involved in the development of Kalesh, an anonymous social polling and engagement platform. [2][5] The product is designed around anonymous participation, opinion sharing, polling and community interaction, with an emphasis on allowing users to take part without the social pressure associated with public identity and personal metrics. [5]",
        "A founder publication states that development of Kalesh began in late 2025. [2] DIMISIPEDIA records this as a historical claim pending an independent record.",
        "Positioning language recorded for Kalesh includes anonymous social platform, social polling, audience engagement, community discussion, anonymous expression, real-time interaction and opinion-focused interaction. Descriptions such as \"decentralised digital expression\" that appear in promotional material are treated as descriptive claims about intent; DIMISIPEDIA does not present Kalesh as running on decentralised infrastructure, because no source establishes that.",
      ],
    },
    {
      id: "colleagues",
      heading: "Founding leadership",
      status: "needs-verification",
      body: [
        "DIMISI's founding leadership is recorded as three people. Dixit is documented as founder and chief executive officer; Nishkarsh Mishra as co-founder, director, chief marketing officer and chief operating officer; and Swatantra Singh as co-founder and director. [3]",
        "The three are connected to the organisation through separate, individually verifiable role relationships, and each is connected in turn to Kalesh through the area of work associated with them. These connections are what the DIMISIPEDIA knowledge graph is generated from.",
      ],
    },
  ],
  claims: [
    claim("Shikhar Dixit is the founder of DIMISI Technologies Private Limited.", "Confirmed role", ["src-shikhar-linkedin", "src-corporate-record"], "needs-verification"),
    claim("Shikhar Dixit serves as Chief Executive Officer of DIMISI Technologies.", "Confirmed role", ["src-shikhar-linkedin", "src-dimisi-linkedin"], "source-backed"),
    claim("Shikhar Dixit is a registered director of DIMISI Technologies.", "Corporate claim", ["src-corporate-record"], "needs-verification"),
    claim("Shikhar Dixit is associated with the development of Kalesh.", "Project association", ["src-shikhar-medium", "src-kalesh-official"], "source-backed"),
    claim("Kalesh development began in late 2025.", "Historical claim", ["src-shikhar-medium"], "historical"),
    claim("Shikhar Dixit holds a Bachelor of Technology in Computer Science affiliated with Dr. A.P.J. Abdul Kalam Technical University.", "Educational claim", ["src-shikhar-linkedin"], "source-backed"),
    claim("Shikhar Dixit worked as an AI Automation Intern at Degree2Destiny.", "Confirmed role", ["src-shikhar-linkedin"], "source-backed"),
    claim("Shikhar Dixit held a Campus Ambassador role with Hunch for approximately six months.", "Historical claim", ["src-shikhar-linkedin"], "source-backed"),
    claim("Shikhar Dixit participated as a Campus Ambassador for the Entrepreneurship Cell, IIT Bombay.", "Descriptive claim", ["src-shikhar-linkedin"], "source-backed"),
  ],
  questions: [
    { q: "Who is Shikhar Dixit?", a: "An Indian technology entrepreneur and software developer based in Kanpur, Uttar Pradesh, and the founder and chief executive officer of DIMISI Technologies Private Limited." },
    { q: "Who founded DIMISI Technologies?", a: "Supplied corporate information records Shikhar Dixit as founder, with Nishkarsh Mishra and Swatantra Singh as co-founders and directors." },
    { q: "What is Shikhar Dixit's role at DIMISI?", a: "He is recorded in three separate roles: founder, chief executive officer and director." },
    { q: "What is his connection to Kalesh?", a: "He is associated with the development and product leadership of Kalesh, an anonymous social polling and engagement platform." },
    { q: "Where is Shikhar Dixit based?", a: "Kanpur, Uttar Pradesh, India." },
    { q: "What is his educational background?", a: "A Bachelor of Technology in Computer Science affiliated with Dr. A.P.J. Abdul Kalam Technical University." },
  ],
  coverage: [
    { area: "Identity", status: "source-backed", note: "Name, location and occupation from a professional profile." },
    { area: "Roles", status: "needs-verification", note: "Founder and directorship await official corporate-record verification." },
    { area: "Education", status: "source-backed", note: "Self-reported; institution recorded, dates not recorded." },
    { area: "Professional experience", status: "source-backed", note: "Self-reported roles at three organisations." },
    { area: "Projects", status: "source-backed", note: "Kalesh association recorded via founder publication and official site." },
    { area: "Media", status: "needs-verification", note: "No independent press coverage recorded." },
  ],
  officialLinks: [
    { label: "dimisi.tech", url: "https://dimisi.tech", official: true },
    { label: "thekalesh.com", url: "https://thekalesh.com", official: true },
  ],
  sourceIds: [
    "src-shikhar-linkedin",
    "src-shikhar-medium",
    "src-corporate-record",
    "src-dimisi-linkedin",
    "src-kalesh-official",
    "src-shikhar-crunchbase",
    "src-team-roster",
    "src-dimisi-website",
    "src-falconebiz-registry",
    "src-tracxn-dimisi",
  ],
  revisions: rev("Long-form biography, separated role relationships, education, professional experience and claim-level sourcing added."),
  createdAt: ADDED,
  updatedAt: ADDED,
  seoTitle: "Shikhar Dixit — Founder & CEO of DIMISI Technologies | DIMISIPEDIA",
  seoDescription:
    "Shikhar Dixit is an Indian technology entrepreneur and founder and CEO of DIMISI Technologies Private Limited in Kanpur, associated with the Kalesh platform. Roles, education, career and sources.",
};

/* ---------------------------------------------------------- person: Nishkarsh */

const nishkarsh: Entity = {
  id: "nishkarsh-mishra",
  slug: "nishkarsh-mishra",
  path: "/people/nishkarsh-mishra",
  entityType: "person",
  name: "Nishkarsh Mishra",
  subtitle: "Co-Founder, Director, CMO & COO · DIMISI Technologies",
  image: "/images/nishkarsh-mishra.png",
  shortDescription:
    "Technology entrepreneur, operations strategist and marketing executive; co-founder and director of DIMISI Technologies Private Limited.",
  answer:
    "Nishkarsh Mishra is an Indian technology entrepreneur, operations strategist and marketing executive based in Kanpur, Uttar Pradesh. He is recorded as a co-founder and director of DIMISI Technologies Private Limited, where he also holds the roles of chief marketing officer and chief operating officer, and is associated with the operations, marketing and growth of the Kalesh platform.",
  facts: [
    { label: "Occupation", value: "Technology entrepreneur, operations and marketing executive", status: "source-backed" },
    { label: "Organization", value: ORG, status: "needs-verification" },
    { label: "Roles", value: "Co-Founder · Director · CMO · COO", status: "needs-verification" },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "source-backed" },
    { label: "Known for", value: "DIMISI Technologies, Kalesh growth and operations", status: "source-backed" },
    { label: "Education", value: "Diploma CSE (2019–2022); B.Tech CSE (expected 2026)", status: "source-backed" },
  ],
  areas: ["Operations", "Marketing", "Growth"],
  roles: [
    { title: "Co-Founder", organization: ORG, status: "needs-verification", sourceIds: ["src-nishkarsh-linkedin", "src-corporate-record", "src-tracxn-dimisi"] },
    { title: "Director", organization: ORG, status: "needs-verification", note: "Requires official corporate-record verification.", sourceIds: ["src-corporate-record", "src-falconebiz-registry", "src-tracxn-dimisi", "src-zaubacorp-dimisi"] },
    { title: "Chief Marketing Officer", organization: ORG, status: "source-backed", sourceIds: ["src-nishkarsh-linkedin"] },
    { title: "Chief Operating Officer", organization: ORG, status: "source-backed", sourceIds: ["src-nishkarsh-linkedin"] },
  ],
  education: [
    {
      institution: "Kanpur Institute of Technology",
      qualification: "Diploma in Computer Science & Engineering",
      period: "2019–2022",
      result: "First Division",
      status: "source-backed",
    },
    {
      institution: "Axis Colleges",
      qualification: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      period: "Expected graduation 2026",
      status: "source-backed",
    },
  ],
  experience: [],
  externalProfiles: [
    { label: "LinkedIn", url: "https://www.linkedin.com", verified: false, note: "Directory-level link supplied; exact profile URL awaiting administrator confirmation." },
    { label: "Crunchbase", url: "https://www.crunchbase.com", verified: false, note: "Directory-level link supplied; exact record URL awaiting confirmation." },
    { label: "Tracxn company profile", url: "https://tracxn.com", verified: false, note: "Third-party corporate directory listing of DIMISI directors." },
    { label: "ZaubaCorp company record", url: "https://www.zaubacorp.com", verified: false, note: "MCA-derived company database record; deep link awaiting confirmation." },
    { label: "DIMISI Technologies (official site)", url: "https://dimisi.tech", verified: false, note: "First-party company website." },
    { label: "Kalesh platform", url: "https://thekalesh.com", verified: false, note: "First-party product site." },
  ],
  sections: [
    {
      id: "biography",
      heading: "Biography",
      status: "source-backed",
      body: [
        "Nishkarsh Mishra is an Indian technology entrepreneur, operations strategist and marketing executive based in Kanpur, Uttar Pradesh. [1] He is one of the founding members of DIMISI Technologies Private Limited, where supplied material records him as a co-founder and director as well as the company's chief marketing officer and chief operating officer. [1][3]",
        "His documented work sits at the intersection of company operations and market-facing activity: internal coordination, process and team management on one side, and marketing, user acquisition and product growth on the other. Within the DIMISI ecosystem this work is most visibly attached to Kalesh, the company's anonymous social polling and engagement platform. [1][2]",
        "DIMISIPEDIA records his four roles as four separate organisational relationships. Two of them — co-founder and director — carry corporate weight and remain marked as requiring official corporate-record verification; the officer titles are recorded as source-backed from professional profiles.",
      ],
    },
    {
      id: "education",
      heading: "Early life and education",
      status: "source-backed",
      body: [
        "Mishra's academic background is in computer science and engineering. Supplied educational information records a Diploma in Computer Science & Engineering at Kanpur Institute of Technology, undertaken between 2019 and 2022 and completed with a first-division result. [1]",
        "He subsequently pursued a Bachelor of Technology in Computer Science & Engineering at Axis Colleges, with an expected graduation in 2026. [1] The two qualifications are recorded separately, and the academic result attached to the diploma remains tied to its source rather than presented as an independent finding.",
      ],
    },
    {
      id: "career",
      heading: "Career",
      status: "source-backed",
      body: [
        "Supplied material describes Mishra's professional focus as operations management, marketing and information-technology strategy. Associated areas of work include process optimisation, team coordination, day-to-day operations, growth tracking, user acquisition, marketing strategy and product growth. [1][2]",
        "DIMISIPEDIA records these as responsibilities and areas of work associated with him. They are not presented as formally defined corporate duties, because no corporate document defining them has been recorded.",
      ],
    },
    {
      id: "dimisi",
      heading: "DIMISI Technologies",
      status: "needs-verification",
      body: [
        "Mishra is part of the founding leadership of DIMISI Technologies Private Limited alongside Shikhar Dixit, the company's founder and chief executive officer, and Swatantra Singh, co-founder and director. [3] The company was incorporated on 9 April 2026 in Kanpur, Uttar Pradesh, according to supplied corporate information. [3]",
        "Within the company his documented remit combines the operating and marketing functions: he is recorded as chief operating officer with responsibility for day-to-day operations and coordination, and as chief marketing officer with responsibility for positioning, marketing strategy and growth. [1]",
        "Because the same person holds both a corporate position (director) and executive titles, DIMISIPEDIA keeps the evidence for each separate. A change to one does not silently alter the others.",
      ],
    },
    {
      id: "kalesh",
      heading: "Kalesh",
      status: "source-backed",
      body: [
        "Mishra is associated with Kalesh across four documented areas: product leadership, marketing, growth and operations. [1][2] Supplied material describes his involvement in growth frameworks, user acquisition, digital marketing, consumer-product scaling, Gen-Z positioning and community growth.",
        "These are recorded as documented areas of involvement. Specific campaigns, metrics or outcomes are not recorded, and DIMISIPEDIA publishes no user, revenue or reach figures for Kalesh in the absence of evidence.",
      ],
    },
    {
      id: "colleagues",
      heading: "Founding leadership",
      status: "needs-verification",
      body: [
        "The founding leadership of DIMISI Technologies is recorded as Shikhar Dixit, Nishkarsh Mishra and Swatantra Singh. [3] Their documented areas differ: product and technology direction for Dixit, operations and market-facing work for Mishra, and corporate and operational leadership for Singh.",
        "These areas describe what is currently documented about each founder. They are not exclusive divisions of responsibility.",
      ],
    },
  ],
  claims: [
    claim("Nishkarsh Mishra is a co-founder of DIMISI Technologies Private Limited.", "Confirmed role", ["src-nishkarsh-linkedin", "src-corporate-record"], "needs-verification"),
    claim("Nishkarsh Mishra is a registered director of DIMISI Technologies.", "Corporate claim", ["src-corporate-record"], "needs-verification"),
    claim("Nishkarsh Mishra serves as Chief Operating Officer of DIMISI Technologies.", "Confirmed role", ["src-nishkarsh-linkedin"], "source-backed"),
    claim("Nishkarsh Mishra serves as Chief Marketing Officer of DIMISI Technologies.", "Confirmed role", ["src-nishkarsh-linkedin"], "source-backed"),
    claim("Nishkarsh Mishra completed a Diploma in Computer Science & Engineering at Kanpur Institute of Technology between 2019 and 2022 with a first-division result.", "Educational claim", ["src-nishkarsh-linkedin"], "source-backed"),
    claim("Nishkarsh Mishra is pursuing a B.Tech in Computer Science & Engineering at Axis Colleges with expected graduation in 2026.", "Educational claim", ["src-nishkarsh-linkedin"], "source-backed"),
    claim("Nishkarsh Mishra is involved in the marketing, growth and operations of Kalesh.", "Project association", ["src-nishkarsh-linkedin"], "source-backed"),
  ],
  questions: [
    { q: "Who is Nishkarsh Mishra?", a: "A technology entrepreneur, operations strategist and marketing executive based in Kanpur, and part of the founding leadership of DIMISI Technologies Private Limited." },
    { q: "Is Nishkarsh Mishra a co-founder of DIMISI?", a: "Supplied material records him as a co-founder and director; the corporate record for both remains to be verified." },
    { q: "What is his role at DIMISI?", a: "Four separate roles are recorded: co-founder, director, chief marketing officer and chief operating officer." },
    { q: "What are his responsibilities?", a: "Documented areas include operations management, marketing, IT strategy, process optimisation, team coordination, user acquisition and product growth." },
    { q: "What is his educational background?", a: "A Diploma in Computer Science & Engineering from Kanpur Institute of Technology (2019–2022, first division) and a B.Tech in Computer Science & Engineering at Axis Colleges, expected 2026." },
    { q: "What is his connection to Kalesh?", a: "He is associated with Kalesh through product leadership, marketing, growth and operations." },
  ],
  coverage: [
    { area: "Identity", status: "source-backed", note: "Name, location and occupation from a professional profile." },
    { area: "Roles", status: "needs-verification", note: "Co-founder and directorship await official corporate-record verification." },
    { area: "Education", status: "source-backed", note: "Two qualifications with periods recorded; self-reported." },
    { area: "Projects", status: "source-backed", note: "Kalesh involvement documented across four areas." },
    { area: "Professional experience", status: "needs-verification", note: "No prior employment recorded." },
    { area: "Media", status: "needs-verification", note: "No independent press coverage recorded." },
  ],
  officialLinks: [],
  sourceIds: ["src-nishkarsh-linkedin", "src-nishkarsh-crunchbase", "src-corporate-record", "src-team-roster", "src-tracxn-dimisi", "src-zaubacorp-dimisi", "src-dimisi-website", "src-kalesh-official"],
  revisions: rev("Long-form biography, four separated role relationships, education records and claim-level sourcing added."),
  createdAt: ADDED,
  updatedAt: ADDED,
  seoTitle: "Nishkarsh Mishra — Co-Founder, COO & CMO of DIMISI Technologies | DIMISIPEDIA",
  seoDescription:
    "Nishkarsh Mishra is a co-founder and director of DIMISI Technologies Private Limited, serving as COO and CMO, with documented work in operations, marketing and Kalesh growth.",
};

/* ---------------------------------------------------------- person: Swatantra */

const swatantra: Entity = {
  id: "swatantra-singh",
  slug: "swatantra-singh",
  path: "/people/swatantra-singh",
  entityType: "person",
  name: "Swatantra Singh",
  subtitle: "Co-Founder & CTO · DIMISI Technologies",
  image: "/images/swatantra-singh.png",
  shortDescription:
    "Technology executive and engineer; co-founder, director and chief technology officer of DIMISI Technologies Private Limited.",
  answer:
    "Swatantra Singh is a technology executive and engineer associated with DIMISI Technologies Private Limited in Kanpur, Uttar Pradesh. He is recorded as a co-founder, director and chief technology officer of the company, responsible for platform architecture, software development and backend engineering across the company's technology consulting work and the Kalesh platform, alongside Shikhar Dixit and Nishkarsh Mishra.",
  facts: [
    { label: "Occupation", value: "Technology executive, engineer", status: "source-backed" },
    { label: "Organization", value: ORG, status: "needs-verification" },
    { label: "Roles", value: "Co-Founder · Director · Chief Technology Officer", status: "needs-verification" },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "needs-verification" },
    { label: "Known for", value: "DIMISI Technologies, Kalesh platform architecture", status: "source-backed" },
    { label: "Education", value: "B.Tech, Computer Science & Engineering — Axis Colleges (2023–2026)", status: "source-backed" },
  ],
  areas: ["Platform architecture", "Backend engineering", "Technical scalability"],
  roles: [
    { title: "Co-Founder", organization: ORG, status: "needs-verification", sourceIds: ["src-corporate-record", "src-tracxn-dimisi"] },
    { title: "Director", organization: ORG, status: "needs-verification", note: "Recorded as an active corporate director appointed on 9 April 2026; requires official corporate-record verification.", sourceIds: ["src-corporate-record", "src-falconebiz-registry", "src-planetexim-director", "src-tracxn-dimisi"] },
    { title: "Chief Technology Officer", organization: ORG, status: "source-backed", note: "Reported through first-party product material and a third-party database record.", sourceIds: ["src-kalesh-team", "src-swatantra-crunchbase"] },
  ],
  education: [
    {
      institution: "Axis Colleges",
      qualification: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      period: "September 2023 – September 2026",
      status: "source-backed",
      note: "Graduation status is not independently confirmed.",
    },
  ],
  experience: [],
  externalProfiles: [
    { label: "Recorded video appearance", verified: false, note: "Supplied as a source; URL awaiting administrator confirmation." },
    { label: "Crunchbase", url: "https://www.crunchbase.com", verified: false, note: "Directory-level link supplied; exact record URL awaiting confirmation." },
    { label: "Kalesh platform team page", url: "https://thekalesh.com", verified: false, note: "First-party product team listing." },
    { label: "Kalesh company page (LinkedIn)", url: "https://in.linkedin.com", verified: false, note: "Directory-level link supplied." },
    { label: "DIMISI Technologies (official site)", url: "https://dimisi.tech", verified: false, note: "First-party company website." },
    { label: "Corporate registry (FalconEbiz)", url: "https://www.falconebiz.com", verified: false, note: "MCA-derived registry listing; deep link awaiting confirmation." },
    { label: "Director profile (PlanetExim)", url: "https://www.planetexim.net", verified: false, note: "MCA-derived director listing; deep link awaiting confirmation." },
    { label: "Tracxn company profile", url: "https://tracxn.com", verified: false, note: "Third-party corporate directory listing of DIMISI directors." },

  ],
  sections: [
    {
      id: "biography",
      heading: "Biography",
      status: "source-backed",
      body: [
        "Swatantra Singh is a technology executive and engineer associated with DIMISI Technologies Private Limited in Kanpur, Uttar Pradesh. [1][5] He is recorded as a co-founder of the company, as an active corporate director, and as its chief technology officer, alongside Shikhar Dixit, the company's founder and chief executive officer, and Nishkarsh Mishra, co-founder, director, chief marketing officer and chief operating officer. [1][4]",
        "Supplied educational information records a Bachelor of Technology in Computer Science & Engineering at Axis Colleges, with a study period running from September 2023 to September 2026. [5] Where dates, graduation status or earlier employment are not documented, DIMISIPEDIA leaves the field empty rather than inferring a value.",
      ],
    },
    {
      id: "education",
      heading: "Education",
      status: "source-backed",
      body: [
        "Singh is recorded as studying for a Bachelor of Technology in Computer Science & Engineering at Axis Colleges between September 2023 and September 2026. [5] The record is self-reported through professional and database profiles and has not been confirmed against an institutional source, so completion is not asserted.",
      ],
    },
    {
      id: "dimisi",
      heading: "DIMISI Technologies",
      status: "needs-verification",
      body: [
        "Supplied corporate information records that DIMISI Technologies Private Limited was incorporated on 9 April 2026 under CIN U62013UP2026PTC246506, that Singh was appointed to the board upon incorporation, and that he is registered as an active corporate director. [1] Directory records derived from Ministry of Corporate Affairs filings list the same appointment and director identifiers. [2][3][4]",
        "These remain corporate claims. DIMISIPEDIA does not describe them as registry-verified, because no registry document has yet been reviewed directly by an editor; the directory listings supplied are aggregators of the underlying filings rather than the filings themselves.",
        "His three relationships with the company — co-founder, director and chief technology officer — are held separately, so that the founding claim, the statutory directorship and the executive appointment can each be evidenced independently.",
      ],
    },
    {
      id: "responsibilities",
      heading: "Technical responsibilities",
      status: "source-backed",
      body: [
        "As chief technology officer, Singh is described as leading platform architecture, software development, technical scalability and backend engineering across both the company's business technology consulting work and the Kalesh application. [5][6]",
        "Earlier supplied material also associates him with organisational operations, business infrastructure, corporate structure, operational stability, coordination of technical resources and risk management. [10][1]",
        "These are recorded as described responsibilities rather than legally defined duties. They describe how his work has been characterised in supplied and first-party material; no corporate document setting out a formal remit has been reviewed.",
      ],
    },
    {
      id: "kalesh",
      heading: "Kalesh",
      status: "source-backed",
      body: [
        "Singh is listed on the Kalesh platform team as its executive technology lead, with responsibility for the technical architecture of the anonymous social network developed within the DIMISI ecosystem. [6] Product and engineering updates for the platform are published through its company page. [7]",
        "Individual code-level contributions have not been documented. The relationship is held in the knowledge graph so that specific contributions can be attached to it as evidence becomes available.",
      ],
    },
    {
      id: "colleagues",
      heading: "Founding leadership",
      status: "needs-verification",
      body: [
        "Singh's relationships with his co-founders are recorded through the organisation rather than as personal associations: all three are connected to DIMISI Technologies through separate founding and executive relationships, and each is connected in turn to Kalesh through the area of work associated with them. [1][8][9]",
        "This structure allows the founding team to be understood as a group without asserting anything about the individuals beyond what has been documented.",
      ],
    },
  ],
  claims: [
    claim("Swatantra Singh is a co-founder of DIMISI Technologies Private Limited.", "Corporate claim", ["src-corporate-record", "src-tracxn-dimisi"], "needs-verification"),
    claim("Swatantra Singh is a registered active director of DIMISI Technologies.", "Corporate claim", ["src-corporate-record", "src-falconebiz-registry", "src-planetexim-director"], "needs-verification"),
    claim("Swatantra Singh was appointed to the board upon incorporation on 9 April 2026 under CIN U62013UP2026PTC246506.", "Corporate claim", ["src-corporate-record", "src-falconebiz-registry", "src-planetexim-director"], "needs-verification"),
    claim("Swatantra Singh is the chief technology officer of DIMISI Technologies.", "Corporate claim", ["src-kalesh-team", "src-swatantra-crunchbase"], "source-backed"),
    claim("Swatantra Singh studied B.Tech Computer Science & Engineering at Axis Colleges from September 2023 to September 2026.", "Educational claim", ["src-swatantra-crunchbase"], "source-backed"),
    claim("Swatantra Singh leads platform architecture, software development, technical scalability and backend engineering for DIMISI and Kalesh.", "Descriptive claim", ["src-kalesh-team", "src-swatantra-crunchbase"], "source-backed"),
    claim("Swatantra Singh is associated with organisational operations, business infrastructure and risk management at DIMISI.", "Descriptive claim", ["src-swatantra-video", "src-corporate-record"], "needs-verification"),
    claim("Swatantra Singh has an executive and technical association with Kalesh.", "Project association", ["src-kalesh-team", "src-kalesh-linkedin"], "source-backed"),
  ],
  questions: [
    { q: "Who is Swatantra Singh?", a: "A technology executive and engineer recorded as co-founder, director and chief technology officer of DIMISI Technologies Private Limited." },
    { q: "What is his role at DIMISI?", a: "Three roles are recorded: co-founder, statutory director and chief technology officer, covering platform architecture, software development, scalability and backend engineering." },
    { q: "When was he appointed a director?", a: "Supplied and directory records state an appointment on 9 April 2026, at incorporation, under CIN U62013UP2026PTC246506; the underlying registry filing has not yet been reviewed by an editor." },
    { q: "What did he study?", a: "A B.Tech in Computer Science & Engineering at Axis Colleges, recorded for September 2023 to September 2026." },
    { q: "What is his connection to Kalesh?", a: "He is listed as the platform's executive technology lead, responsible for its technical architecture and backend engineering." },
  ],
  coverage: [
    { area: "Identity", status: "needs-verification", note: "Name supplied by the organization; independent identity sources limited." },
    { area: "Roles", status: "needs-verification", note: "Co-founder and directorship await official corporate-record verification; CTO title is source-backed." },
    { area: "Education", status: "source-backed", note: "Axis Colleges B.Tech recorded from self-reported and database profiles." },
    { area: "Professional experience", status: "needs-verification", note: "No prior employment recorded." },
    { area: "Projects", status: "source-backed", note: "Technical leadership of Kalesh recorded through first-party product material." },
    { area: "Media", status: "needs-verification", note: "One recorded video appearance supplied; not independently reviewed." },
  ],
  officialLinks: [
    { label: "dimisi.tech", url: "https://dimisi.tech", official: true },
    { label: "thekalesh.com", url: "https://thekalesh.com", official: true },
  ],
  sourceIds: [
    "src-corporate-record",
    "src-falconebiz-registry",
    "src-planetexim-director",
    "src-tracxn-dimisi",
    "src-swatantra-crunchbase",
    "src-kalesh-team",
    "src-kalesh-linkedin",
    "src-dimisi-website",
    "src-dimisi-linkedin",
    "src-swatantra-video",
    "src-team-roster",
  ],
  revisions: [
    ...rev("Long-form biography, separated co-founder and director relationships, described responsibilities and claim-level sourcing added."),
    { n: 3, date: ADDED, editor: EDITOR, change: "Chief Technology Officer role, education record, technical responsibilities and MCA-derived directory sources added." },
  ],
  createdAt: ADDED,
  updatedAt: ADDED,
  seoTitle: "Swatantra Singh — Co-Founder & CTO of DIMISI Technologies | DIMISIPEDIA",
  seoDescription:
    "Swatantra Singh is co-founder, director and chief technology officer of DIMISI Technologies Private Limited in Kanpur, leading platform architecture and backend engineering for the Kalesh platform.",
};


export const founderEntities: Entity[] = [shikhar, nishkarsh, swatantra];

export const foundingLeadership = [
  { id: "shikhar-dixit", roles: "Founder, CEO", areas: "Product, technology, entrepreneurship" },
  { id: "nishkarsh-mishra", roles: "Co-Founder, Director, CMO, COO", areas: "Operations, marketing, growth" },
  { id: "swatantra-singh", roles: "Co-Founder, Director, CTO", areas: "Platform architecture, backend engineering, scalability" },
];
