/**
 * DIMISIPEDIA — Mentorship & Advisory Dataset.
 *
 * DATA INTEGRITY RULE: Nothing in this file may be invented. Every statement is
 * derived directly from the authorized profile brief and verified institutional records.
 * Jayendra Pratap Singh's affiliation with DIMISI Technologies is strictly designated as
 * "First Mentor". No employment, directorship, or ownership status is claimed.
 */

import type { Entity, Relationship, Source } from "./knowledge";

const ORG = "DIMISI Technologies Private Limited";
const ADDED = "2026-09-13";
const REVIEWED = "2026-09-13";

/* ------------------------------------------------------------------ sources */

export const mentorSources: Source[] = [
  {
    id: "src-jp-dpiit-platinum",
    title: "DPIIT Mentorship Recognition — Platinum Badge Award",
    publisher: "Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India",
    type: "Government Record",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Platinum Badge awardee from DPIIT, recognizing the quality and impact of startup mentorship under government initiatives.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-jp-startup-india",
    title: "Startup India National Mentor Portfolio",
    publisher: "Startup India, DPIIT, Government of India",
    url: "https://www.startupindia.gov.in",
    type: "Government Record",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "National Mentor with Startup India, having mentored 50+ startups across team building, leadership, business strategy, and founder capability development.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-jp-iim-ranchi",
    title: "IIM Ranchi Alumni Record — Human Resources Management",
    publisher: "Indian Institute of Management Ranchi",
    type: "Institutional Source",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Postgraduate academic qualification in Human Resources from the Indian Institute of Management Ranchi (IIM Ranchi).",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-jp-dimisi-appointment",
    title: "Official Designation: First Mentor of DIMISI Technologies Private Limited",
    publisher: "DIMISI Technologies Private Limited",
    url: "https://dimisi.tech",
    type: "Company Announcement",
    relatedEntities: ["jayendra-pratap-singh", "dimisi-technologies"],
    claim:
      "Official recognition of Jayendra Pratap Singh (JP) as the First Mentor of DIMISI Technologies Private Limited, formalizing guidance across people, leadership, and startup building.",
    addedAt: ADDED,
    status: "official",
  },
  {
    id: "src-jp-axis-sharktank-chronicle",
    title: "DIMISI Technologies Founding Chronicle — Phase 5: Mentorship, The Library Wait & Shark Tank Pitch",
    publisher: "DIMISI Technologies Editorial & Historical Record",
    type: "Company Announcement",
    relatedEntities: ["jayendra-pratap-singh", "dimisi-technologies", "kalesh"],
    claim:
      "Mentored the founding team during their Startup & Entrepreneurship practical course at Axis College in December 2025, granted studio facilities for recording the Shark Tank India pitch video, and provided foundational startup orientation.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-jp-consulting-portfolio",
    title: "Jayendra Pratap Singh — Professional Practice & Client Training Engagements",
    publisher: "Professional Portfolio Record",
    type: "Project Documentation",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Delivered training and consulting interventions across diverse sectors for participants from organizations including Tech Mahindra, Samsung Electronics, Reliance Power, Decathlon, Godrej, ISGEC, L&T and educational institutions.",
    addedAt: ADDED,
    status: "source-backed",
  },
];

/* ------------------------------------------------------------ relationships */

export const mentorRelationships: Relationship[] = [
  {
    from: "jayendra-pratap-singh",
    type: "Associated with",
    to: "dimisi-technologies",
  },
];

/* ------------------------------------------------ structured mentor profile */

export interface MentorPillar {
  number: string;
  title: string;
  description: string;
}

export interface ExpertiseGroup {
  category: string;
  skills: string[];
}

export interface CareerMilestone {
  badge: string;
  title: string;
  description: string;
}

export interface MentorProfileDetails {
  displayName: string;
  dimisiDesignation: string;
  statusBadge: string;
  professionalIdentity: string;
  experienceYears: number;
  sectors: string[];
  mentoredStartupsCount: string;
  ecosystemRole: string;
  mentorshipPhilosophyHeadline: string;
  mentorshipPhilosophyText: string;
  philosophySteps: { step: string; label: string; description: string }[];
  mentorshipValuePillars: MentorPillar[];
  expertiseGroups: ExpertiseGroup[];
  consultingOrganizations: string[];
  careerMilestones: CareerMilestone[];
  finalSummary: string;
  relatedTopics: { title: string; href?: string; note?: string }[];
}

export const jayendraProfileDetails: MentorProfileDetails = {
  displayName: "Jayendra Pratap Singh (JP)",
  dimisiDesignation: "First Mentor — DIMISI Technologies Private Limited",
  statusBadge: "DIMISIPEDIA • FIRST MENTOR",
  professionalIdentity:
    "HR & People Development Consultant | Leadership & Behavioural Transformation | Campus-to-Corporate | Executive Education | Startup Mentor",
  experienceYears: 14,
  sectors: ["Manufacturing", "Telecom", "IT", "Services", "Education"],
  mentoredStartupsCount: "50+",
  ecosystemRole: "National Mentor — Startup India",
  mentorshipPhilosophyHeadline: "Practical. Structured. Experiential. Outcome-Oriented.",
  mentorshipPhilosophyText:
    "JP's approach combines industry expectations with structured frameworks and experiential learning. His focus is on translating knowledge into practical capabilities and helping organizations and individuals build stronger capabilities, better leaders, and industry-ready talent.",
  philosophySteps: [
    {
      step: "01",
      label: "Industry Perspective",
      description: "Grounded in practical market expectations, evolving corporate standards, and cross-sector operational realities.",
    },
    {
      step: "02",
      label: "Structured Frameworks",
      description: "Rooted in academic rigor, proven HR methodologies, and repeatable organizational capability models.",
    },
    {
      step: "03",
      label: "Experiential Learning",
      description: "Interactive interventions, practical scenario analysis, and hands-on behavioral immersion.",
    },
    {
      step: "04",
      label: "Practical Outcomes",
      description: "Measurable workplace readiness, resilient leadership behaviors, and tangible capability building.",
    },
  ],
  mentorshipValuePillars: [
    {
      number: "01",
      title: "People",
      description: "Building stronger people systems, behavioral readiness, and collaborative team capabilities.",
    },
    {
      number: "02",
      title: "Leadership",
      description: "Supporting executive leadership development, strategic self-awareness, and mature decision-making capabilities.",
    },
    {
      number: "03",
      title: "Organizational Development",
      description: "Helping strengthen organizational capability, structural resilience, and functional alignment as the company grows.",
    },
    {
      number: "04",
      title: "Startup Perspective",
      description: "Bringing seasoned insights and pattern recognition from mentoring 50+ startups through national incubator ecosystems.",
    },
    {
      number: "05",
      title: "Industry Readiness",
      description: "Connecting academic potential with real-world corporate expectations to build high-performance, industry-ready talent.",
    },
  ],
  expertiseGroups: [
    {
      category: "People & Organizational Development",
      skills: [
        "People Development",
        "Organizational Development",
        "Capability Building",
        "Organizational Capability",
        "Talent Development",
      ],
    },
    {
      category: "Leadership",
      skills: [
        "Leadership Development",
        "Leadership Capability Building",
        "Leadership Behaviour",
        "Leadership Transformation",
      ],
    },
    {
      category: "Behavioural Transformation",
      skills: [
        "Behavioural Transformation",
        "Soft Skills",
        "Communication",
        "Professional Behaviour",
        "Workplace Readiness",
      ],
    },
    {
      category: "Campus-to-Corporate",
      skills: [
        "Campus-to-Corporate Readiness",
        "Employability",
        "Industry Readiness",
        "Student Development",
        "Graduate Capability Development",
      ],
    },
    {
      category: "Learning & Development",
      skills: [
        "Training Needs Analysis",
        "Customized Learning Interventions",
        "Competency Assessment",
        "Executive Education",
        "Corporate Training",
      ],
    },
    {
      category: "Startup Mentoring",
      skills: [
        "Startup Mentoring",
        "Team Building",
        "Leadership Guidance",
        "Business Strategy",
        "Founder & Team Capability Development",
      ],
    },
  ],
  consultingOrganizations: [
    "Tech Mahindra",
    "Samsung Electronics",
    "Reliance Power",
    "Decathlon",
    "Godrej",
    "ISGEC",
    "L&T",
  ],
  careerMilestones: [
    {
      badge: "14+ Years",
      title: "Cross-Sector Experience",
      description: "Multi-industry track record spanning Manufacturing, Telecom, IT, Services, and Higher Education.",
    },
    {
      badge: "IIM Ranchi",
      title: "Human Resources Alumnus",
      description: "Advanced academic perspective and strategic human capital development background from IIM Ranchi.",
    },
    {
      badge: "Engineering",
      title: "Electronics & Communications",
      description: "Technical foundation providing sharp analytical reasoning and technological empathy.",
    },
    {
      badge: "50+ Startups",
      title: "Startups Mentored",
      description: "Mentored early-stage and growth founders on team dynamics, leadership, and operational scale.",
    },
    {
      badge: "National Mentor",
      title: "Startup India",
      description: "Empanelled mentor in national startup initiatives, supporting founder capability and business strategy.",
    },
    {
      badge: "Platinum Badge",
      title: "DPIIT Recognition",
      description: "Awarded by Ministry of Commerce & Industry, Government of India, recognizing the high quality of mentorship.",
    },
    {
      badge: "First Mentor",
      title: "DIMISI Technologies",
      description: "Designated as the foundational First Mentor of DIMISI Technologies Private Limited.",
    },
  ],
  finalSummary:
    "Jayendra Pratap Singh (JP) brings 14 years of cross-sector experience in HR, people development, leadership, behavioural transformation, education, consulting, and startup mentoring. As an IIM Ranchi HR alumnus and Electronics & Communications Engineer, he combines academic perspective with practical industry experience. His work spans corporate professionals, students, organizations, educational institutions, and startups, with a strong focus on capability building and industry readiness. As a National Mentor with Startup India, he has mentored 50+ startups in areas including team building, leadership, and business strategy. He is also recognized as a Platinum Badge awardee by DPIIT and serves as the First Mentor of DIMISI Technologies Private Limited.",
  relatedTopics: [
    { title: "Startup Mentorship", note: "National Mentor — Startup India ecosystem" },
    { title: "Leadership Development", note: "Behavioral transformation & executive education" },
    { title: "People Development", note: "Organizational capability & human capital systems" },
    { title: "Human Resources", note: "Strategic talent management & competency models" },
    { title: "Behavioural Transformation", note: "Workplace readiness & professional behavior" },
    { title: "Campus-to-Corporate", note: "Graduate employability & industry transition" },
    { title: "Executive Education", note: "Corporate training & organizational learning" },
    { title: "Organizational Development", note: "Capability building & organizational scale" },
    { title: "Startup India", note: "DPIIT, Ministry of Commerce & Industry, Govt of India" },
    { title: "DPIIT", note: "Department for Promotion of Industry and Internal Trade" },
    { title: "DIMISI Technologies Private Limited", href: "/dimisi-technologies", note: "First Mentor relationship" },
  ],
};

/* ------------------------------------------------------------ person: JP */

export const jayendraPratapSingh: Entity = {
  id: "jayendra-pratap-singh",
  slug: "jayendra-pratap-singh",
  path: "/people/jayendra-pratap-singh",
  entityType: "person",
  name: "Jayendra Pratap Singh",
  subtitle: "First Mentor — DIMISI Technologies Private Limited",
  statusBadge: "DIMISIPEDIA • FIRST MENTOR",
  category: "People & Leadership",
  aliases: ["jp", "jayant-sir", "jayendra-singh"],
  image: "/images/jayendra-pratap-singh.jpg",
  shortDescription:
    "HR and People Development Consultant, corporate trainer, Startup India National Mentor, and the First Mentor of DIMISI Technologies Private Limited.",
  answer:
    "Jayendra Pratap Singh (JP), also affectionately known as Jayant Sir, is an HR and People Development professional, consultant, corporate trainer, and startup mentor with 14 years of cross-sector experience spanning Manufacturing, Telecom, IT, Services, and Education. An IIM Ranchi alumnus in HR and an Electronics & Communications Engineer, he serves as the First Mentor of DIMISI Technologies Private Limited, a National Mentor with Startup India (mentoring 50+ startups), and a Platinum Badge awardee from DPIIT, Ministry of Commerce & Industry, Government of India.",
  lifecycle: "Active",
  facts: [
    { label: "Full Name", value: "Jayendra Pratap Singh", status: "verified" },
    { label: "Professional Name", value: "Jayendra Pratap Singh (JP)", status: "verified" },
    { label: "Also Known As", value: "Jayant Sir", status: "source-backed" },
    { label: "DIMISI Designation", value: "First Mentor", status: "verified", sourceIds: ["src-jp-dimisi-appointment"] },
    { label: "Profession", value: "HR & People Development Consultant", status: "verified" },
    { label: "Experience", value: "14 years cross-sector professional experience", status: "verified" },
    { label: "Industries", value: "Manufacturing, Telecom, IT, Services, Education", status: "verified" },
    { label: "Education", value: "IIM Ranchi (HR); Electronics & Communications Engineering", status: "verified", sourceIds: ["src-jp-iim-ranchi"] },
    { label: "Startup Mentoring", value: "50+ startups mentored", status: "verified", sourceIds: ["src-jp-startup-india"] },
    { label: "Ecosystem Role", value: "National Mentor — Startup India", status: "verified", sourceIds: ["src-jp-startup-india"] },
    { label: "Government Recognition", value: "Platinum Badge Awardee — DPIIT", status: "verified", sourceIds: ["src-jp-dpiit-platinum"] },
    { label: "Approach", value: "Practical + Structured + Experiential + Outcome-Oriented", status: "source-backed" },
  ],
  areas: [
    "People Development",
    "Organizational Development",
    "Leadership Transformation",
    "Behavioural Transformation",
    "Campus-to-Corporate Readiness",
    "Executive Education",
    "Startup Mentoring",
    "Team Building",
  ],
  knowsAbout: [
    "Human Resources Strategy",
    "Leadership Capability Building",
    "Behavioural Transformation",
    "Campus-to-Corporate Transition",
    "Training Needs Analysis (TNA)",
    "Competency Assessment",
    "Startup India Mentorship",
    "DPIIT Mentoring Frameworks",
    "Executive Education",
    "DIMISI Technologies Mentorship",
    "Early-Stage Team Building",
    "Organizational Capability Development",
  ],
  disambiguatingDescription:
    "Indian HR & People Development Consultant, Startup India National Mentor, DPIIT Platinum Badge awardee, and First Mentor of DIMISI Technologies Private Limited.",
  gender: "https://schema.org/Male",
  awards: [
    "Platinum Badge Awardee — Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India",
    "National Mentor Empanelment — Startup India",
    "Empanelled Mentor — State-Government Mentoring Initiatives",
  ],
  roles: [
    {
      title: "First Mentor",
      organization: ORG,
      status: "verified",
      note: "Designated as First Mentor of DIMISI Technologies Private Limited. Role is advisory and mentorship-focused; does not constitute executive directorship, employment, or shareholding.",
      sourceIds: ["src-jp-dimisi-appointment"],
    },
    {
      title: "National Mentor",
      organization: "Startup India (DPIIT, Government of India)",
      status: "verified",
      note: "Mentored 50+ startups on team building, leadership, and business strategy.",
      sourceIds: ["src-jp-startup-india", "src-jp-dpiit-platinum"],
    },
    {
      title: "HR & People Development Consultant",
      organization: "Independent Practice / Executive Consulting",
      status: "source-backed",
      note: "14 years of cross-sector interventions across Manufacturing, Telecom, IT, Services, and Higher Education.",
      sourceIds: ["src-jp-consulting-portfolio"],
    },
  ],
  education: [
    {
      institution: "Indian Institute of Management Ranchi (IIM Ranchi)",
      qualification: "Postgraduate Studies",
      field: "Human Resources (HR)",
      status: "verified",
      note: "Alumnus in Human Resources management and organizational behavior (Source: src-jp-iim-ranchi).",
    },
    {
      institution: "Engineering Institution",
      qualification: "Bachelor of Engineering / B.Tech",
      field: "Electronics & Communications Engineering",
      status: "verified",
      note: "Engineering background providing technical foundation and analytical framework.",
    },
  ],
  experience: [
    {
      organization: "Training & Consulting Interventions (Corporate & Institutional)",
      role: "Lead Consultant & Corporate Trainer",
      period: "14 years cumulative experience",
      status: "source-backed",
      note: "Delivered interventions for professionals and students across organizations including Tech Mahindra, Samsung Electronics, Reliance Power, Decathlon, Godrej, ISGEC, L&T, and higher education institutions (Source: src-jp-consulting-portfolio).",
    },
  ],
  sections: [
    {
      id: "about",
      heading: "About Jayendra Pratap Singh",
      status: "verified",
      body: [
        "Jayendra Pratap Singh (JP) is an HR and People Development professional, consultant, corporate trainer, and startup mentor with 14 years of cross-sector experience spanning Manufacturing, Telecom, IT, Services, and Education. [1][2]",
        "An IIM Ranchi alumnus in HR and an Electronics & Communications Engineer, JP brings a strong combination of industry experience, academic perspective, and hands-on consulting expertise. [3]",
        "His professional work focuses on people, capability, and organizational development. He works with organizations and educational institutions to identify capability gaps, design customized interventions, and build talent aligned with evolving business and workplace requirements. [6]",
        "His approach combines practical industry expectations with structured frameworks and experiential learning. [6]",
      ],
    },
    {
      id: "consulting-practice",
      heading: "Consulting & Professional Practice",
      status: "source-backed",
      body: [
        "JP's consulting work focuses on people, capability, and organizational development. His work involves understanding organizational and talent requirements, identifying capability gaps, designing customized interventions, and developing people aligned with evolving business and workplace requirements. [6]",
        "His consulting and training practice spans Campus-to-Corporate readiness, leadership development, behavioural transformation, competency assessment, Training Needs Analysis (TNA), soft skills, communication, employability, executive education, organizational capability building, people development, and talent development. [6]",
        "Across his engagements, JP's methodology remains grounded in a clear operational philosophy: Practical + Structured + Experiential + Outcome-Oriented. [6]",
      ],
    },
    {
      id: "cross-sector-experience",
      heading: "14 Years of Cross-Sector Experience",
      status: "verified",
      body: [
        "JP's professional experience spans multiple industries — specifically Manufacturing, Telecom, IT, Services, and Education — allowing him to bring perspectives from business, technology, education, people development, and organizational capability into his consulting and mentoring engagements. [6]",
        "This multi-sector vantage point enables him to diagnose capability requirements across diverse operating environments, whether fast-moving tech startups, high-volume service organizations, manufacturing facilities, or academic campuses.",
      ],
    },
    {
      id: "organizations-exposure",
      heading: "Organizations & Industry Exposure",
      status: "source-backed",
      body: [
        "JP has delivered training and consulting interventions for professionals and students across diverse organizations and sectors, including organizations such as Tech Mahindra, Samsung Electronics, Reliance Power, Decathlon, Godrej, ISGEC, L&T and others. [6]",
        "Important contextual note: In accordance with DIMISIPEDIA verification protocols, these organizations represent verified training, workshop, and consulting intervention exposure rather than direct corporate employment history.",
      ],
    },
    {
      id: "corporate-training-education",
      heading: "Corporate Training & Education",
      status: "source-backed",
      body: [
        "JP has delivered training and consulting interventions for corporate professionals and students across diverse organizations and sectors. His work combines industry expectations with structured learning frameworks and experiential learning, helping participants translate concepts into practical workplace capabilities. [6]",
        "Key participant segments and intervention themes include corporate professionals, students, educational institutions, organizations, leadership development, employability, communication, behavioural skills, industry readiness, and executive education.",
      ],
    },
    {
      id: "dimisi-first-mentor",
      heading: "First Mentor of DIMISI Technologies Private Limited",
      status: "official",
      body: [
        "Jayendra Pratap Singh (JP) is the First Mentor of DIMISI Technologies Private Limited. [4]",
        "As DIMISI's First Mentor, JP brings his experience in people development, leadership, organizational capability building, behavioural transformation, executive education, and startup mentoring to the company's broader growth journey. [4]",
        "His practitioner-led perspective provides DIMISI with valuable guidance around people, leadership, organizational development, team capability, and the development of industry-ready talent. [4]",
        "Historical Context: In December 2025, during the formative phase of CATI / DIMISI Technologies, the founding team (Shikhar Dixit, Swatantra Singh, Nishkarsh Mishra, and Shubham Dey) enrolled in a practical course on Startup & Entrepreneurship led by Jayendra Pratap Singh (affectionately known as Jayant Sir) at Axis College. For their practical assignment, the team delivered a passionate pitch for Kalesh. [5]",
        "After the founders demonstrated their commitment and perseverance during a two-hour wait at the campus library, Jayant Sir welcomed them in, evaluated their blueprint, granted access to the college media studio for filming their Shark Tank India pitch video, and provided foundational startup orientation. [5]",
        "Governance & Factual Distinction: DIMISIPEDIA maintains a strict distinction between his 14-year professional career and his advisory role at DIMISI. JP is designated as First Mentor and does not hold status as a co-founder, director, employee, shareholder, investor, or board member of DIMISI Technologies Private Limited. [4]",
      ],
    },
  ],
  claims: [
    {
      claim: "Jayendra Pratap Singh (JP) is the First Mentor of DIMISI Technologies Private Limited.",
      claimType: "Confirmed role",
      sourceIds: ["src-jp-dimisi-appointment", "src-jp-axis-sharktank-chronicle"],
      verification: "official",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "National Mentor with Startup India, having mentored 50+ startups on team building, leadership, and business strategy.",
      claimType: "Descriptive claim",
      sourceIds: ["src-jp-startup-india"],
      verification: "verified",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Platinum Badge awardee from DPIIT, Ministry of Commerce & Industry, Government of India, recognizing the quality of his startup mentorship.",
      claimType: "Descriptive claim",
      sourceIds: ["src-jp-dpiit-platinum"],
      verification: "verified",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Alumnus of the Indian Institute of Management Ranchi (IIM Ranchi) in Human Resources.",
      claimType: "Educational claim",
      sourceIds: ["src-jp-iim-ranchi"],
      verification: "verified",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Electronics & Communications Engineer with 14 years of cross-sector professional experience across Manufacturing, Telecom, IT, Services, and Education.",
      claimType: "Educational claim",
      sourceIds: ["src-jp-consulting-portfolio"],
      verification: "source-backed",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Delivered training and consulting interventions across organizations including Tech Mahindra, Samsung Electronics, Reliance Power, Decathlon, Godrej, ISGEC, and L&T.",
      claimType: "Project association",
      sourceIds: ["src-jp-consulting-portfolio"],
      verification: "source-backed",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Mentored the DIMISI founding team at Axis College in December 2025, granting studio facilities for recording their Shark Tank India pitch video.",
      claimType: "Historical claim",
      sourceIds: ["src-jp-axis-sharktank-chronicle"],
      verification: "source-backed",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
  ],
  faqs: [
    {
      question: "Who is Jayendra Pratap Singh (JP)?",
      answer:
        "Jayendra Pratap Singh (JP), affectionately known in campus startup circles as Jayant Sir, is an HR and People Development consultant, corporate trainer, and startup mentor with 14 years of cross-sector experience. He is an IIM Ranchi alumnus in HR, an Electronics & Communications Engineer, a Startup India National Mentor, a DPIIT Platinum Badge awardee, and the First Mentor of DIMISI Technologies Private Limited.",
    },
    {
      question: "What is Jayendra Pratap Singh's role at DIMISI Technologies?",
      answer:
        "Jayendra Pratap Singh is recognized as the First Mentor of DIMISI Technologies Private Limited. In this advisory capacity, he provides guidance on people development, leadership capability building, organizational readiness, and talent development. He is not an executive director, employee, co-founder, shareholder, or investor.",
    },
    {
      question: "What is the historical connection between JP (Jayant Sir) and DIMISI's founders?",
      answer:
        "In December 2025 at Axis College, the founding team (Shikhar Dixit, Swatantra Singh, Nishkarsh Mishra, and Shubham Dey) took a practical Startup & Entrepreneurship course under Jayendra Pratap Singh (Jayant Sir). After pitching Kalesh and proving their dedication by waiting at the campus library, Jayant Sir mentored them and arranged access to the college media studio to record their application pitch video for Shark Tank India.",
    },
    {
      question: "What government recognitions has Jayendra Pratap Singh received for mentoring?",
      answer:
        "Jayendra Pratap Singh has been empanelled with state-government mentoring initiatives, serves as a National Mentor with Startup India where he has mentored 50+ startups, and is a recipient of the prestigious Platinum Badge from the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India.",
    },
    {
      question: "What organizations has Jayendra Pratap Singh conducted training or consulting for?",
      answer:
        "JP has delivered training and consulting interventions across diverse sectors for participants from organizations including Tech Mahindra, Samsung Electronics, Reliance Power, Decathlon, Godrej, ISGEC, L&T and various higher education institutions. Note that these are documented as training and consulting intervention exposure rather than previous corporate employers.",
    },
    {
      question: "What is Jayendra Pratap Singh's educational background?",
      answer:
        "Jayendra Pratap Singh is an alumnus of IIM Ranchi in Human Resources (HR) and holds a degree in Electronics & Communications Engineering.",
    },
  ],
  coverage: [
    { area: "DIMISI Mentorship Designation", status: "verified", note: "Officially documented as First Mentor of DIMISI Technologies Private Limited." },
    { area: "Startup India & DPIIT Recognition", status: "verified", note: "National Mentor empanelment and DPIIT Platinum Badge award verified." },
    { area: "Academic Credentials", status: "verified", note: "IIM Ranchi HR alumni status and Engineering background confirmed." },
    { area: "Mentoring Record", status: "verified", note: "50+ startups mentored verified through Startup India portfolio." },
    { area: "Industry & Organization Exposure", status: "source-backed", note: "Client intervention list documented from professional portfolio." },
    { area: "Employment & Directorship Boundaries", status: "verified", note: "Clearly separated from DIMISI executive management and equity structure." },
  ],
  officialLinks: [
    {
      label: "Startup India — National Mentor Portal",
      url: "https://www.startupindia.gov.in",
      official: true,
    },
    {
      label: "DPIIT — Ministry of Commerce & Industry",
      url: "https://dpiit.gov.in",
      official: true,
    },
    {
      label: "DIMISI Technologies — Official Website",
      url: "https://dimisi.tech",
      official: true,
    },
  ],
  sourceIds: [
    "src-jp-dpiit-platinum",
    "src-jp-startup-india",
    "src-jp-iim-ranchi",
    "src-jp-dimisi-appointment",
    "src-jp-axis-sharktank-chronicle",
    "src-jp-consulting-portfolio",
  ],
  revisions: [
    {
      n: 1,
      date: "2026-09-13",
      editor: "DIMISIPEDIA Editorial",
      change: "Initial publication of verified profile for Jayendra Pratap Singh (JP), First Mentor of DIMISI Technologies Private Limited.",
    },
  ],
  createdAt: ADDED,
  updatedAt: REVIEWED,
  verifiedAt: REVIEWED,
  seoTitle: "Jayendra Pratap Singh (JP) — First Mentor, DIMISI Technologies | Profile",
  seoDescription:
    "Official profile of Jayendra Pratap Singh (JP), First Mentor of DIMISI Technologies Private Limited. HR & People Development Consultant, Startup India National Mentor (50+ startups), and DPIIT Platinum Badge awardee with 14 years cross-sector experience.",
};

export const mentorEntities: Entity[] = [jayendraPratapSingh];
