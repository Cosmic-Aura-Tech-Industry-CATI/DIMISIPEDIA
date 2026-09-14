/**
 * DIMISIPEDIA — Mentorship & Advisory Dataset.
 *
 * DATA INTEGRITY RULE: Nothing in this file may be invented. Every statement is
 * derived directly from the authorized profile brief, verified public institutional records,
 * and corroborated professional research.
 * Jayendra Pratap Singh's affiliation with DIMISI Technologies is strictly designated as
 * "First Mentor". No employment, directorship, or ownership status is claimed.
 */

import type { Entity, Relationship, Source } from "./knowledge";

const ORG = "DIMISI Technologies Private Limited";
const ADDED = "2026-09-13";
const REVIEWED = "2026-09-14";

/* ------------------------------------------------------------------ sources */

export const mentorSources: Source[] = [
  {
    id: "src-jp-linkedin",
    title: "Jayendra Pratap Singh — Official LinkedIn Profile",
    publisher: "LinkedIn",
    url: "https://www.linkedin.com/in/jayendra-pratap-singh-81ab9375",
    type: "Social Profile",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Verified LinkedIn profile for Jayendra Pratap Singh (JP), Startup Advisor at Wadhwani Foundation, IIM Ranchi alumnus, and startup mentor with ~18,000 followers and 500+ connections in Greater Delhi Area.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-jp-wadhwani",
    title: "Wadhwani Foundation — Startup Advisor Portfolio",
    publisher: "Wadhwani Foundation",
    url: "https://www.wadhwanifoundation.org",
    type: "Institutional Source",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Serving as Startup Advisor at Wadhwani Foundation since September 2024, facilitating venture development, startup mentorship, and entrepreneurship enablement.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-jp-dpiit-platinum",
    title: "DPIIT Mentorship Recognition — Platinum Badge Award",
    publisher: "Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India",
    url: "https://dpiit.gov.in",
    type: "Government Record",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Platinum Badge awardee from DPIIT, recognizing the sustained quality and impact of startup mentorship under national government initiatives.",
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
    id: "src-jp-aic-pecf",
    title: "AIC-PECF Mentor Empanelment — Atal Incubation Centre",
    publisher: "Atal Incubation Centre – Pondicherry Engineering College Foundation (AIC-PECF), supported by Atal Innovation Mission, NITI Aayog",
    url: "https://aicpecf.org",
    type: "Institutional Source",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Empanelled Startup Mentor with AIC-PECF, guiding early-stage technology and social-impact startups on team dynamics, founder leadership, and business strategy.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-jp-iim-ranchi",
    title: "IIM Ranchi Alumni Record — Post Graduate Diploma in Human Resource Management (PGDHRM)",
    publisher: "Indian Institute of Management Ranchi",
    url: "https://www.iimranchi.ac.in",
    type: "Institutional Source",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Postgraduate academic qualification in Human Resource Management (2013–2015) from IIM Ranchi. Member of SAMARPAN social responsibility club, Central Sponsorship Team, and completed an organizational psychometric analysis live project.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-jp-carpe-diem-2014",
    title: "Carpe Diem 2014 — Event Winner, IIM Calcutta",
    publisher: "Indian Institute of Management Calcutta / IIM Ranchi Annual Record",
    type: "Institutional Source",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Won first prize in the 'Minutes to Win' competition representing IIM Ranchi at Carpe Diem 2014, the annual cultural and management festival of IIM Calcutta.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-jp-jssaten",
    title: "JSS Academy of Technical Education, Noida — B.Tech Alumni Record",
    publisher: "JSS Academy of Technical Education, Noida (JSSATEN) / Dr. A.P.J. Abdul Kalam Technical University",
    url: "https://jssaten.ac.in",
    type: "Institutional Source",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Graduated with a Bachelor of Technology (B.Tech) in Electronics & Communication Engineering (ECE) from JSS Academy of Technical Education, Noida.",
    addedAt: ADDED,
    status: "verified",
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
    title: "Jayendra Pratap Singh — Multi-Sector Corporate HR & Consulting Record",
    publisher: "Professional Portfolio & Career Record",
    type: "Project Documentation",
    relatedEntities: ["jayendra-pratap-singh"],
    claim:
      "Professional trajectory spanning Godrej & Boyce (HR Manager), Reliance Power (Management Trainee HR), Tech Mahindra (Technical Associate), SAITM (Director T&P / Head HR), MediAro (Founder), and consulting interventions across Samsung Electronics, Decathlon, ISGEC, and L&T.",
    addedAt: ADDED,
    status: "source-backed",
  },
];

/* ------------------------------------------------------------ relationships */

export const mentorRelationships: Relationship[] = [
  {
    from: "jayendra-pratap-singh",
    type: "First Mentor",
    to: "dimisi-technologies",
  },
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

export interface CareerStage {
  step: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  badge?: string;
  highlight?: boolean;
}

export interface IncubatorEmpanelment {
  name: string;
  type: string;
  role: string;
  description: string;
  badge?: string;
  url?: string;
}

export interface MentorProfileDetails {
  displayName: string;
  dimisiDesignation: string;
  statusBadge: string;
  currentRole: string;
  currentOrganization: string;
  linkedInUrl: string;
  linkedInStats: string;
  location: string;
  professionalIdentity: string;
  experienceYears: number;
  sectors: string[];
  mentoredStartupsCount: string;
  ecosystemRole: string;
  mentorshipPhilosophyHeadline: string;
  mentorshipPhilosophyText: string;
  philosophySteps: { step: string; label: string; description: string }[];
  mentorshipValuePillars: MentorPillar[];
  careerStages: CareerStage[];
  incubatorEmpanelments: IncubatorEmpanelment[];
  corporateExperience: {
    role: string;
    organization: string;
    period: string;
    description: string;
  }[];
  defenceMentoring: {
    title: string;
    qualification: string;
    description: string;
  };
  academicHonors: {
    title: string;
    institution: string;
    description: string;
  }[];
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
  currentRole: "Startup Advisor",
  currentOrganization: "Wadhwani Foundation",
  linkedInUrl: "https://www.linkedin.com/in/jayendra-pratap-singh-81ab9375",
  linkedInStats: "~18,000 followers · 500+ connections",
  location: "Greater Delhi Area / Noida, India",
  professionalIdentity:
    "Startup Advisor (Wadhwani Foundation) | HR & People Development Consultant | Leadership & Behavioural Transformation | Startup India National Mentor | First Mentor, DIMISI Technologies",
  experienceYears: 14,
  sectors: [
    "Manufacturing",
    "Telecom",
    "IT & Technology",
    "Services",
    "Higher Education",
    "Healthcare",
    "Startup Ecosystem",
  ],
  mentoredStartupsCount: "50+",
  ecosystemRole:
    "Startup Advisor (Wadhwani Foundation) · National Mentor (Startup India) · Empanelled Mentor (AIC-PECF)",
  mentorshipPhilosophyHeadline: "Practical. Structured. Experiential. Outcome-Oriented.",
  mentorshipPhilosophyText:
    "JP's methodology integrates rigorous corporate frameworks with real-world entrepreneurial execution. Grounded in HR analytics and behavioral science, his focus is on translating knowledge into measurable capabilities — building resilient leadership, agile teams, and sustainable enterprise culture.",
  philosophySteps: [
    {
      step: "01",
      label: "Industry Perspective",
      description:
        "Grounded in practical market expectations, evolving corporate standards, and cross-sector operational realities.",
    },
    {
      step: "02",
      label: "Structured Frameworks",
      description:
        "Rooted in academic rigor, proven HR methodologies, and repeatable organizational capability models.",
    },
    {
      step: "03",
      label: "Experiential Learning",
      description:
        "Interactive interventions, practical scenario analysis, and hands-on behavioral immersion.",
    },
    {
      step: "04",
      label: "Practical Outcomes",
      description:
        "Measurable workplace readiness, resilient leadership behaviors, and tangible capability building.",
    },
  ],
  mentorshipValuePillars: [
    {
      number: "01",
      title: "People & Talent Systems",
      description:
        "Building scalable human resource foundations, competency frameworks, behavioral readiness, and collaborative high-performance team culture.",
    },
    {
      number: "02",
      title: "Executive Leadership",
      description:
        "Supporting founders and leadership teams with strategic self-awareness, emotional intelligence, and mature executive decision-making capabilities.",
    },
    {
      number: "03",
      title: "Organizational Capability",
      description:
        "Strengthening organizational architecture, governance resilience, functional alignment, and change management as early-stage ventures expand.",
    },
    {
      number: "04",
      title: "Startup Advisory & Scale",
      description:
        "Delivering venture pattern recognition from mentoring 50+ startups and advising through national incubator networks and Wadhwani Foundation.",
    },
    {
      number: "05",
      title: "Campus-to-Corporate Readiness",
      description:
        "Bridging academic potential with enterprise standards to develop industry-ready technical talent and confident professional communicators.",
    },
  ],
  careerStages: [
    {
      step: "01",
      period: "2006 – 2010",
      role: "Engineering Foundation",
      organization: "JSS Academy of Technical Education, Noida (JSSATEN)",
      description:
        "Graduated with B.Tech in Electronics & Communication Engineering (ECE), establishing a strong analytical grounding and technological empathy.",
      badge: "B.Tech ECE",
    },
    {
      step: "02",
      period: "2010 – 2013",
      role: "Campus-to-Corporate & Soft Skills Trainer",
      organization: "IIMT / NIET / Lord Krishna Group of Institutions",
      description:
        "Conducted training and placement (T&P) modules, employability workshops, and behavioral coaching for hundreds of graduating engineers.",
      badge: "T&P Executive",
    },
    {
      step: "03",
      period: "2011 – 2013",
      role: "Technical Associate",
      organization: "Tech Mahindra",
      description:
        "Delivered IT and enterprise telecommunication solutions, gaining hands-on corporate engineering exposure and cross-functional team execution experience.",
      badge: "Enterprise IT",
    },
    {
      step: "04",
      period: "2013 – 2015",
      role: "Management Studies — Human Resources",
      organization: "Indian Institute of Management Ranchi (IIM Ranchi)",
      description:
        "Completed PGDHRM in Human Resources. Active in SAMARPAN social responsibility club, Central Sponsorship Team, won Carpe Diem 2014 at IIM Calcutta, and led an organizational psychometric live project.",
      badge: "IIM Ranchi HR",
      highlight: true,
    },
    {
      step: "05",
      period: "2014 – 2016",
      role: "Corporate HR Management",
      organization: "Reliance Power & Godrej & Boyce Mfg. Co. Ltd.",
      description:
        "Managed human resources operations, talent acquisition, employee relations, and capability building across heavy manufacturing and energy infrastructure sectors.",
      badge: "Corporate HR",
    },
    {
      step: "06",
      period: "2017 – 2019",
      role: "Director – Training & Placement / Head of HR / Head of BBA",
      organization: "St. Andrews Institute of Technology & Management (SAITM)",
      description:
        "Directed institutional corporate relations, campus recruitment drives, student career development, and academic department administration.",
      badge: "Academic Leadership",
    },
    {
      step: "07",
      period: "2019 – 2023",
      role: "Founder",
      organization: "MediAro",
      description:
        "Founded and helmed an early-stage healthcare venture, spearheading product ideation, team recruitment, operational workflows, and founder problem-solving.",
      badge: "Startup Founder",
    },
    {
      step: "08",
      period: "2021 – Present",
      role: "National Mentor & DPIIT Platinum Badge Awardee",
      organization: "Startup India & National Incubator Network (AIC-PECF, StartupTN, IMPunjab)",
      description:
        "Empanelled as a National Mentor with Startup India; mentored 50+ startups on team dynamics, leadership, and scale; awarded the prestigious Platinum Badge by DPIIT, Ministry of Commerce & Industry.",
      badge: "DPIIT Platinum",
      highlight: true,
    },
    {
      step: "09",
      period: "2024 – Present",
      role: "Startup Advisor & First Mentor",
      organization: "Wadhwani Foundation & DIMISI Technologies Private Limited",
      description:
        "Serving as Startup Advisor at Wadhwani Foundation driving startup enablement, while acting as the foundational First Mentor of DIMISI Technologies Private Limited.",
      badge: "Current Mandates",
      highlight: true,
    },
  ],
  incubatorEmpanelments: [
    {
      name: "Wadhwani Foundation",
      type: "Global Entrepreneurship Foundation",
      role: "Startup Advisor",
      description:
        "Advising early-stage ventures, curriculum enablement, and founder mentorship across the foundation's national startup incubation pathways.",
      badge: "Current Role (Sep 2024–Present)",
      url: "https://www.wadhwanifoundation.org",
    },
    {
      name: "Startup India",
      type: "DPIIT, Ministry of Commerce & Industry, Govt. of India",
      role: "National Mentor",
      description:
        "Empanelled National Mentor guiding early-stage and growth startups on leadership, team structuring, go-to-market strategy, and organizational resilience.",
      badge: "50+ Startups Mentored",
      url: "https://www.startupindia.gov.in",
    },
    {
      name: "DPIIT Mentorship Platform",
      type: "Government of India Recognition",
      role: "Platinum Badge Awardee",
      description:
        "Awarded the highest mentor tier (Platinum Badge) recognizing exceptional engagement quality, founder feedback, and sustained contribution to the Indian startup ecosystem.",
      badge: "Highest Tier Recognition",
      url: "https://dpiit.gov.in",
    },
    {
      name: "AIC-PECF",
      type: "Atal Incubation Centre — PEC Foundation (NITI Aayog)",
      role: "Empanelled Startup Mentor",
      description:
        "Mentoring early-stage deeptech and innovation startups under the Atal Innovation Mission, focusing on founder mindset and institutional scale.",
      badge: "NITI Aayog Supported",
      url: "https://aicpecf.org",
    },
    {
      name: "StartupTN",
      type: "Tamil Nadu Startup and Innovation Mission",
      role: "Ecosystem Mentor",
      description:
        "Supporting state-level startup initiatives, regional incubators, and student innovators across South India.",
      badge: "State Initiative",
    },
    {
      name: "Innovation Mission Punjab (IMPunjab)",
      type: "State Innovation Hub",
      role: "Startup Mentor",
      description:
        "Advising emerging founders on capability building, venture strategy, and investor readiness across the northern ecosystem.",
      badge: "Regional Innovation",
    },
    {
      name: "Rohilkhand Incubation Foundation (RIF)",
      type: "University Incubation Centre",
      role: "Incubator Mentor",
      description:
        "Fostering grassroots entrepreneurship, campus venture incubation, and university innovation commercialization.",
      badge: "Grassroots Hub",
    },
    {
      name: "FasterCapital & Masters' Union",
      type: "Venture Accelerator & Business School",
      role: "Regional Partner & Guest Speaker",
      description:
        "Engaging with student founders, venture cohorts, and emerging corporate executives on leadership dynamics.",
      badge: "Academic & Accelerator",
    },
  ],
  corporateExperience: [
    {
      role: "Startup Advisor",
      organization: "Wadhwani Foundation",
      period: "September 2024 – Present",
      description:
        "Advises emerging startups, helps evaluate early-stage venture trajectories, and conducts structured capability mentoring across the foundation's initiatives.",
    },
    {
      role: "Founder",
      organization: "MediAro",
      period: "2019 – 2023",
      description:
        "Spearheaded early-stage healthcare venture building, gaining firsthand operational empathy for early-stage bootstrapping, team assembly, and market validation.",
    },
    {
      role: "Director – Training & Placement / Head of HR / Head of BBA",
      organization: "St. Andrews Institute of Technology & Management (SAITM)",
      period: "2017 – 2019",
      description:
        "Led corporate relations, campus placement drives, and student employability programs while overseeing faculty administration and departmental leadership.",
    },
    {
      role: "Human Resources Manager",
      organization: "Godrej & Boyce Mfg. Co. Ltd.",
      period: "2015 – 2016",
      description:
        "Managed talent management, employee relations, behavioral development, and organizational operations for one of India's premier manufacturing conglomerates.",
    },
    {
      role: "Management Trainee — Human Resources",
      organization: "Reliance Power",
      period: "2014",
      description:
        "Summer management stint focusing on organizational HR frameworks and workforce management in heavy infrastructure.",
    },
    {
      role: "Technical Associate",
      organization: "Tech Mahindra",
      period: "2011 – 2013",
      description:
        "Worked in technical delivery and telecommunication solutions, bridging analytical problem-solving with enterprise client needs.",
    },
    {
      role: "Personality Development Trainer & T&P Executive",
      organization: "Engineering & Management Colleges (IIMT, NIET)",
      period: "2010 – 2013",
      description:
        "Trained technical students in communication, campus-to-corporate readiness, group discussions, and interview psychology.",
    },
  ],
  defenceMentoring: {
    title: "Services Selection Board (SSB) & Defence Mentorship",
    qualification: "Indian Navy University Entry Scheme (UES) — Recommended 1st Attempt",
    description:
      "Having been recommended for the Indian Navy UES on his very first attempt, JP has conducted pro-bono mentoring and behavioral coaching for defence aspirants. His guidance focuses on officer-like qualities (OLQs), psychological tests, group testing officer (GTO) tasks, and authentic personal interview presentation.",
  },
  academicHonors: [
    {
      title: "Winner — 'Minutes to Win'",
      institution: "Carpe Diem 2014, IIM Calcutta",
      description:
        "Won first prize representing IIM Ranchi at Carpe Diem 2014, the annual cultural festival of the Indian Institute of Management Calcutta.",
    },
    {
      title: "SAMARPAN — Social Responsibility Club",
      institution: "IIM Ranchi (2013–2015)",
      description:
        "Active member organizing social outreach, ethical leadership initiatives, and community impact programs during his postgraduate studies.",
    },
    {
      title: "Central Sponsorship Team",
      institution: "IIM Ranchi",
      description:
        "Managed institutional sponsorship, corporate networking, and partner outreach for flagship management events.",
    },
    {
      title: "Organizational Psychometric Analysis Live Project",
      institution: "IIM Ranchi Live Research",
      description:
        "Executed live applied research analyzing organizational psychometric profiles, workplace personality traits, and team cohesion.",
    },
  ],
  expertiseGroups: [
    {
      category: "People & Organizational Development",
      skills: [
        "People Development",
        "Organizational Development (OD)",
        "Capability Building",
        "Talent Architecture",
        "Competency Mapping",
      ],
    },
    {
      category: "Leadership Transformation",
      skills: [
        "Executive Leadership Development",
        "Leadership Capability Building",
        "Leadership Behaviour & Psychology",
        "Founder Transition Management",
      ],
    },
    {
      category: "Behavioural & Workplace Skills",
      skills: [
        "Behavioural Transformation",
        "Soft Skills & Communication",
        "Professional Etiquette",
        "Workplace Readiness",
        "Psychometric Assessment",
      ],
    },
    {
      category: "Campus-to-Corporate",
      skills: [
        "Campus-to-Corporate Readiness",
        "Graduate Employability",
        "Industry-Academia Integration",
        "Student Capability Development",
        "Placement Training Strategy",
      ],
    },
    {
      category: "Learning & Development (L&D)",
      skills: [
        "Training Needs Analysis (TNA)",
        "Customized Learning Interventions",
        "Competency Assessment",
        "Executive Education",
        "Corporate Training Delivery",
      ],
    },
    {
      category: "Startup Advisory & Mentoring",
      skills: [
        "Early-Stage Startup Mentoring",
        "High-Performance Team Building",
        "Founder Dynamics & Alignment",
        "Venture Strategy & Scale",
        "Incubator Advisory Frameworks",
      ],
    },
  ],
  consultingOrganizations: [
    "Tech Mahindra",
    "Samsung Electronics",
    "Reliance Power",
    "Decathlon",
    "Godrej & Boyce",
    "ISGEC",
    "Larsen & Toubro (L&T)",
  ],
  careerMilestones: [
    {
      badge: "Current Mandate",
      title: "Wadhwani Foundation",
      description:
        "Serving as Startup Advisor (Sep 2024–present) facilitating venture development, startup mentoring, and entrepreneurship enablement.",
    },
    {
      badge: "Foundational Mentor",
      title: "DIMISI Technologies",
      description:
        "Designated as the foundational First Mentor of DIMISI Technologies Private Limited, guiding founders from early inception.",
    },
    {
      badge: "14+ Years",
      title: "Cross-Sector Experience",
      description:
        "Multi-industry track record spanning Manufacturing, Telecom, IT, Services, Education, Healthcare, and Startups.",
    },
    {
      badge: "IIM Ranchi",
      title: "Human Resources (HR)",
      description:
        "Postgraduate management studies from IIM Ranchi; Carpe Diem 2014 winner at IIM Calcutta; SAMARPAN social responsibility member.",
    },
    {
      badge: "Engineering",
      title: "B.Tech ECE (JSS Noida)",
      description:
        "Electronics & Communication Engineering background from JSSATEN providing rigorous analytical problem-solving skills.",
    },
    {
      badge: "50+ Startups",
      title: "Startups Mentored",
      description:
        "Mentored early-stage and growth founders across national incubator networks on team building, leadership, and operational scale.",
    },
    {
      badge: "National Mentor",
      title: "Startup India",
      description:
        "Empanelled mentor in national startup initiatives under DPIIT, supporting founder capability and business strategy.",
    },
    {
      badge: "Platinum Badge",
      title: "DPIIT Recognition",
      description:
        "Awarded by Ministry of Commerce & Industry, Government of India, recognizing the sustained high quality of mentorship.",
    },
  ],
  finalSummary:
    "Jayendra Pratap Singh (JP) brings 14 years of cross-sector experience spanning HR, people development, leadership, behavioural transformation, executive education, and startup advisory. As an IIM Ranchi HR alumnus and JSS Noida Electronics & Communication Engineer, he combines corporate analytical rigor with practical entrepreneurial mentorship. His career encompasses enterprise IT at Tech Mahindra, corporate HR at Godrej & Boyce and Reliance Power, academic leadership at SAITM, founding healthcare venture MediAro, and extensive startup mentorship across Startup India (50+ startups mentored) and AIC-PECF. Recognized with the prestigious Platinum Badge from DPIIT, Ministry of Commerce & Industry, he currently serves as Startup Advisor at Wadhwani Foundation and stands recorded as the foundational First Mentor of DIMISI Technologies Private Limited.",
  relatedTopics: [
    { title: "Wadhwani Foundation", note: "Startup Advisor role (September 2024–present)" },
    { title: "Startup India", note: "National Mentor (50+ startups mentored)" },
    { title: "DPIIT", note: "Platinum Badge Awardee, Ministry of Commerce & Industry" },
    { title: "AIC-PECF", note: "Atal Incubation Centre — NITI Aayog supported mentor" },
    { title: "DIMISI Technologies Private Limited", href: "/dimisi-technologies", note: "First Mentor relationship" },
    { title: "IIM Ranchi", note: "PGDHRM / Human Resources alumnus" },
    { title: "JSS Academy of Technical Education, Noida", note: "B.Tech in Electronics & Communication Engineering" },
    { title: "Leadership Transformation", note: "Behavioral transformation & executive education" },
    { title: "People Development", note: "Organizational capability & talent architecture" },
    { title: "Campus-to-Corporate", note: "Graduate employability & industry transition" },
    { title: "Executive Education", note: "Corporate training & organizational learning" },
    { title: "Defence & SSB Mentoring", note: "Indian Navy UES recommended; behavioural coaching" },
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
  aliases: ["jp", "jayant-sir", "jayendra-singh", "jayendra-pratap"],
  image: "/images/jayendra-pratap-singh.jpg",
  shortDescription:
    "Startup Advisor at Wadhwani Foundation, HR & People Development Consultant, Startup India National Mentor, DPIIT Platinum Badge awardee, and the First Mentor of DIMISI Technologies Private Limited.",
  answer:
    "Jayendra Pratap Singh (JP), also known as Jayant Sir, is an HR and People Development professional, consultant, corporate trainer, and startup mentor with 14 years of cross-sector experience spanning Manufacturing, Telecom, IT, Services, Higher Education, Healthcare, and Startups. An IIM Ranchi HR alumnus and JSS Noida Electronics & Communication Engineer, he serves as Startup Advisor at Wadhwani Foundation, the foundational First Mentor of DIMISI Technologies Private Limited, a National Mentor with Startup India (50+ startups mentored), an empanelled mentor with AIC-PECF (NITI Aayog), and a Platinum Badge awardee from DPIIT, Ministry of Commerce & Industry, Government of India.",
  lifecycle: "Active",
  facts: [
    { label: "Full Name", value: "Jayendra Pratap Singh", status: "verified" },
    { label: "Professional Name", value: "Jayendra Pratap Singh (JP)", status: "verified" },
    { label: "Also Known As", value: "Jayant Sir", status: "source-backed" },
    {
      label: "Current Role",
      value: "Startup Advisor — Wadhwani Foundation",
      status: "verified",
      sourceIds: ["src-jp-wadhwani", "src-jp-linkedin"],
    },
    {
      label: "DIMISI Designation",
      value: "First Mentor",
      status: "verified",
      sourceIds: ["src-jp-dimisi-appointment"],
    },
    { label: "Profession", value: "HR & People Development Consultant | Startup Advisor", status: "verified" },
    { label: "Experience", value: "14+ years cross-sector professional experience", status: "verified" },
    {
      label: "Industries",
      value: "Manufacturing, Telecom, IT, Services, Higher Education, Healthcare, Startups",
      status: "verified",
    },
    {
      label: "Postgraduate Education",
      value: "IIM Ranchi — PGDHRM / Human Resources (2013–2015)",
      status: "verified",
      sourceIds: ["src-jp-iim-ranchi", "src-jp-carpe-diem-2014"],
    },
    {
      label: "Undergraduate Education",
      value: "JSS Academy of Technical Education, Noida — B.Tech ECE",
      status: "verified",
      sourceIds: ["src-jp-jssaten"],
    },
    {
      label: "Startup Mentoring",
      value: "50+ startups mentored",
      status: "verified",
      sourceIds: ["src-jp-startup-india"],
    },
    {
      label: "Ecosystem Roles",
      value: "Startup Advisor (Wadhwani Foundation) · National Mentor (Startup India) · Mentor (AIC-PECF)",
      status: "verified",
      sourceIds: ["src-jp-wadhwani", "src-jp-startup-india", "src-jp-aic-pecf"],
    },
    {
      label: "Government Recognition",
      value: "Platinum Badge Awardee — DPIIT, Ministry of Commerce & Industry",
      status: "verified",
      sourceIds: ["src-jp-dpiit-platinum"],
    },
    {
      label: "Location",
      value: "Greater Delhi Area / Noida, Uttar Pradesh, India",
      status: "verified",
      sourceIds: ["src-jp-linkedin"],
    },
    { label: "Approach", value: "Practical + Structured + Experiential + Outcome-Oriented", status: "source-backed" },
  ],
  areas: [
    "Startup Advisory & Mentoring",
    "People Development",
    "Organizational Development (OD)",
    "Leadership Transformation",
    "Behavioural Transformation",
    "Campus-to-Corporate Readiness",
    "Executive Education",
    "Human Resources Strategy",
    "Team Building & Capability",
  ],
  knowsAbout: [
    "Startup Mentoring",
    "Human Resources Strategy",
    "Leadership Capability Building",
    "Behavioural Transformation",
    "Campus-to-Corporate Transition",
    "Training Needs Analysis (TNA)",
    "Competency Assessment",
    "Startup India Mentorship",
    "DPIIT Mentoring Frameworks",
    "Wadhwani Foundation Startup Ecosystem",
    "AIC-PECF Mentorship",
    "Executive Education",
    "DIMISI Technologies Mentorship",
    "Early-Stage Team Building",
    "Organizational Capability Development",
    "SSB Interview Psychology",
  ],
  disambiguatingDescription:
    "Indian Startup Advisor at Wadhwani Foundation, HR & People Development Consultant, Startup India National Mentor (50+ startups), DPIIT Platinum Badge awardee, and First Mentor of DIMISI Technologies Private Limited.",
  gender: "https://schema.org/Male",
  awards: [
    "Platinum Badge Awardee — Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India",
    "National Mentor Empanelment — Startup India",
    "Empanelled Startup Mentor — AIC-PECF (Atal Incubation Centre – PEC Foundation, supported by NITI Aayog)",
    "Winner — 'Minutes to Win', Carpe Diem 2014, Indian Institute of Management Calcutta (Representing IIM Ranchi)",
    "First Attempt Recommendation — Indian Navy University Entry Scheme (UES)",
  ],
  roles: [
    {
      title: "First Mentor",
      organization: ORG,
      status: "verified",
      note: "Designated as First Mentor of DIMISI Technologies Private Limited. Advisory and mentorship-focused role; does not constitute executive directorship, employment, or shareholding.",
      sourceIds: ["src-jp-dimisi-appointment"],
    },
    {
      title: "Startup Advisor",
      organization: "Wadhwani Foundation",
      status: "verified",
      note: "Serving since September 2024, facilitating venture growth, startup acceleration, and entrepreneurship enablement.",
      sourceIds: ["src-jp-wadhwani", "src-jp-linkedin"],
    },
    {
      title: "National Mentor",
      organization: "Startup India (DPIIT, Government of India)",
      status: "verified",
      note: "Mentored 50+ startups on team building, leadership, and business strategy; awarded Platinum Badge.",
      sourceIds: ["src-jp-startup-india", "src-jp-dpiit-platinum"],
    },
    {
      title: "Empanelled Startup Mentor",
      organization: "AIC-PECF (Atal Incubation Centre — PEC Foundation, NITI Aayog)",
      status: "verified",
      note: "Mentoring early-stage digital and tech ventures under Atal Innovation Mission.",
      sourceIds: ["src-jp-aic-pecf"],
    },
    {
      title: "HR & People Development Consultant",
      organization: "Independent Practice / Executive Consulting",
      status: "source-backed",
      note: "14+ years of cross-sector interventions across Manufacturing, Telecom, IT, Services, Education, and Healthcare.",
      sourceIds: ["src-jp-consulting-portfolio"],
    },
  ],
  education: [
    {
      institution: "Indian Institute of Management Ranchi (IIM Ranchi)",
      qualification: "Post Graduate Diploma in Human Resource Management (PGDHRM)",
      field: "Human Resources (HR)",
      period: "2013 – 2015",
      status: "verified",
      note: "Alumnus in Human Resource Management. Active member of SAMARPAN (Social Responsibility Club), Central Sponsorship Team, winner of Carpe Diem 2014 ('Minutes to Win' at IIM Calcutta), and executed an organizational psychometric live research project (Source: src-jp-iim-ranchi, src-jp-carpe-diem-2014).",
    },
    {
      institution: "JSS Academy of Technical Education, Noida (JSSATEN)",
      qualification: "Bachelor of Technology (B.Tech)",
      field: "Electronics & Communication Engineering (ECE)",
      period: "2006 – 2010",
      status: "verified",
      note: "Engineering degree affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU / UPTU), establishing structured analytical reasoning and technological literacy (Source: src-jp-jssaten).",
    },
  ],
  experience: [
    {
      organization: "Wadhwani Foundation",
      role: "Startup Advisor",
      period: "September 2024 – Present",
      status: "verified",
      note: "Guides early-stage startup ventures, participates in venture jury reviews, and advises founders on scaling capabilities (Source: src-jp-wadhwani, src-jp-linkedin).",
    },
    {
      organization: "DIMISI Technologies Private Limited",
      role: "First Mentor",
      period: "December 2025 – Present",
      status: "official",
      note: "Foundational mentorship originating at Axis College, facilitating the Shark Tank pitch studio, and providing ongoing guidance on people, leadership, and startup capability (Source: src-jp-dimisi-appointment, src-jp-axis-sharktank-chronicle).",
    },
    {
      organization: "Startup India & National Incubators (DPIIT, AIC-PECF, StartupTN, IMPunjab)",
      role: "National Startup Mentor & DPIIT Platinum Badge Awardee",
      period: "2021 – Present",
      status: "verified",
      note: "Mentored 50+ startups on team dynamics, founder alignment, and venture strategy across national and state incubation centers (Source: src-jp-startup-india, src-jp-dpiit-platinum, src-jp-aic-pecf).",
    },
    {
      organization: "MediAro",
      role: "Founder",
      period: "2019 – 2023",
      status: "source-backed",
      note: "Founded and led an early-stage healthcare venture, navigating product ideation, validation, team operations, and founder responsibilities.",
    },
    {
      organization: "St. Andrews Institute of Technology & Management (SAITM)",
      role: "Director – Training & Placement / Head of HR / Head of BBA",
      period: "2017 – 2019",
      status: "source-backed",
      note: "Spearheaded corporate relations, student employability, campus recruitment drives, and academic department administration.",
    },
    {
      organization: "Godrej & Boyce Mfg. Co. Ltd.",
      role: "Human Resources Manager",
      period: "2015 – 2016",
      status: "source-backed",
      note: "Managed corporate HR operations, employee relations, talent development, and organizational culture (Source: src-jp-consulting-portfolio).",
    },
    {
      organization: "Reliance Power",
      role: "Management Trainee — Human Resources",
      period: "2014",
      status: "source-backed",
      note: "Summer management stint during IIM Ranchi studies focusing on power infrastructure talent operations (Source: src-jp-consulting-portfolio).",
    },
    {
      organization: "Tech Mahindra",
      role: "Technical Associate",
      period: "2011 – 2013",
      status: "source-backed",
      note: "Technical associate delivery in enterprise systems and telecom technology (Source: src-jp-consulting-portfolio).",
    },
    {
      organization: "Technical Colleges & Institutions (IIMT, NIET, Lord Krishna Group)",
      role: "Personality Development Trainer & T&P Executive",
      period: "2010 – 2013",
      status: "source-backed",
      note: "Delivered campus-to-corporate readiness, communication modules, and behavioural transformation programs for graduating students.",
    },
    {
      organization: "SSB & Defence Services Mentoring",
      role: "Personality & SSB Interview Mentor",
      period: "Ongoing Pro-Bono Mentorship",
      status: "source-backed",
      note: "Recommended on first attempt for the Indian Navy University Entry Scheme (UES); coaches defence aspirants in behavioural psychology, interview facing, and officer-like qualities.",
    },
  ],
  externalProfiles: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jayendra-pratap-singh-81ab9375",
      verified: true,
      note: "Official LinkedIn profile with ~18,000 followers and 500+ connections in Greater Delhi Area.",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/jayendra-pratap-singh-81ab9375",
    "https://www.startupindia.gov.in",
    "https://dpiit.gov.in",
    "https://www.wadhwanifoundation.org",
    "https://www.iimranchi.ac.in",
    "https://jssaten.ac.in",
    "https://aicpecf.org",
  ],
  sections: [
    {
      id: "about",
      heading: "About Jayendra Pratap Singh",
      status: "verified",
      body: [
        "Jayendra Pratap Singh (JP), affectionately known in campus startup circles as Jayant Sir, is an HR and People Development consultant, corporate trainer, and startup advisor with 14 years of cross-sector experience spanning Manufacturing, Telecom, IT, Services, Higher Education, Healthcare, and Startups. [1][2][6]",
        "An alumnus of the Indian Institute of Management Ranchi (IIM Ranchi) in Human Resources and an Electronics & Communication Engineer from JSS Academy of Technical Education, Noida (JSSATEN), JP combines analytical rigor with extensive hands-on experience in leadership development and talent capability building. [3][6][8]",
        "He currently serves as Startup Advisor at Wadhwani Foundation (since September 2024) and stands recorded in DIMISIPEDIA as the foundational First Mentor of DIMISI Technologies Private Limited. [1][2][4]",
        "As a National Mentor with Startup India, he has mentored over 50 startups across team building, leadership, and business strategy, earning the prestigious Platinum Badge from the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India. [3][4]",
      ],
    },
    {
      id: "career-pipeline",
      heading: "9-Stage Career Evolution",
      status: "verified",
      body: [
        "JP's career trajectory traces a 9-stage progression: from technical engineering (JSS Noida) to enterprise IT (Tech Mahindra), student training (IIMT/NIET), premier management education (IIM Ranchi), corporate HR management (Reliance Power & Godrej & Boyce), higher education leadership (SAITM Director T&P / Head HR), healthcare entrepreneurship (MediAro), multi-incubator mentoring (Startup India, AIC-PECF, DPIIT Platinum), and institutional startup advisory (Wadhwani Foundation & DIMISI Technologies). [1][3][6][8]",
        "This multi-decade evolution equips him with a 360-degree understanding of talent lifecycle — from college classrooms and corporate boardrooms to fast-moving early-stage startup studios.",
      ],
    },
    {
      id: "consulting-practice",
      heading: "Consulting & Professional Practice",
      status: "source-backed",
      body: [
        "JP's consulting work focuses on people, capability, and organizational development. His work involves diagnosing organizational and talent requirements, identifying capability gaps, designing customized interventions, and developing people aligned with evolving business and workplace requirements. [6]",
        "His consulting and training practice spans Campus-to-Corporate readiness, leadership development, behavioural transformation, competency assessment, Training Needs Analysis (TNA), soft skills, communication, employability, executive education, organizational capability building, people development, and talent development. [6]",
        "Across his engagements, JP's methodology remains grounded in a clear operational philosophy: Practical + Structured + Experiential + Outcome-Oriented. [6]",
      ],
    },
    {
      id: "cross-sector-experience",
      heading: "14 Years of Cross-Sector Experience",
      status: "verified",
      body: [
        "JP's professional experience spans multiple industries — specifically Manufacturing, Telecom, IT, Services, Education, Healthcare, and Startups — allowing him to bring perspectives from business, technology, education, people development, and organizational capability into his consulting and mentoring engagements. [1][6]",
        "This multi-sector vantage point enables him to diagnose capability requirements across diverse operating environments, whether fast-moving tech startups, high-volume service organizations, heavy manufacturing plants, or academic campuses.",
      ],
    },
    {
      id: "organizations-exposure",
      heading: "Organizations & Industry Exposure",
      status: "source-backed",
      body: [
        "JP has delivered training and consulting interventions for professionals and students across diverse organizations and sectors, including organizations such as Tech Mahindra, Samsung Electronics, Reliance Power, Decathlon, Godrej & Boyce, ISGEC, and Larsen & Toubro (L&T). [6]",
        "Corporate Career Roles: In addition to client training engagements, his corporate career includes formal roles as Human Resources Manager at Godrej & Boyce Mfg. Co. Ltd., Management Trainee at Reliance Power, Technical Associate at Tech Mahindra, and Director of Training & Placement / Head of HR at St. Andrews Institute of Technology & Management. [1][6]",
      ],
    },
    {
      id: "startup-mentorship",
      heading: "Startup Advisory & Mentorship (50+ Startups)",
      status: "verified",
      body: [
        "JP serves as a National Mentor with Startup India, having mentored 50+ startups across critical areas including early team dynamics, leadership alignment, business model validation, and organizational scaling. [2]",
        "In recognition of his impactful contribution and high mentor ratings, he was conferred the Platinum Badge by DPIIT, Ministry of Commerce & Industry, Government of India. [2]",
        "His startup advisory footprint includes active empanelment with AIC-PECF (Atal Incubation Centre – Pondicherry Engineering College Foundation, supported by NITI Aayog), StartupTN (Tamil Nadu Startup Mission), Innovation Mission Punjab (IMPunjab), and Rohilkhand Incubation Foundation (RIF). [5]",
        "In September 2024, JP joined Wadhwani Foundation as Startup Advisor, guiding early-stage venture cohorts and supporting national entrepreneurship frameworks. [1]",
      ],
    },
    {
      id: "dimisi-first-mentor",
      heading: "First Mentor of DIMISI Technologies Private Limited",
      status: "official",
      body: [
        "Jayendra Pratap Singh (JP) is formally recorded as the First Mentor of DIMISI Technologies Private Limited. [4]",
        "Historical Founding Context: In December 2025, during the formative phase of CATI / DIMISI Technologies, the founding team (Shikhar Dixit, Swatantra Singh, Nishkarsh Mishra, and Shubham Dey) enrolled in a practical course on Startup & Entrepreneurship led by Jayendra Pratap Singh (affectionately known as Jayant Sir) at Axis College. The team delivered a passionate pitch for Kalesh. [5]",
        "After the founders demonstrated their perseverance during a two-hour wait outside the campus central library, Jayant Sir welcomed them in, evaluated their venture blueprint, granted access to the college media studio for filming their Shark Tank India application pitch video, and provided foundational startup orientation. [5]",
        "Ongoing Value: As DIMISI's First Mentor, JP brings his experience in people development, leadership, organizational capability building, behavioural transformation, executive education, and startup mentoring to the company's broader growth journey. [4]",
        "Governance & Factual Distinction: DIMISIPEDIA maintains a strict distinction between his professional advisory career and company governance. JP is designated as First Mentor and does not hold status as a co-founder, director, employee, shareholder, investor, or board member of DIMISI Technologies Private Limited. [4]",
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
      claim: "Startup Advisor at Wadhwani Foundation since September 2024.",
      claimType: "Confirmed role",
      sourceIds: ["src-jp-wadhwani", "src-jp-linkedin"],
      verification: "verified",
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
      claim: "Postgraduate qualification in Human Resource Management (PGDHRM) from IIM Ranchi (2013–2015).",
      claimType: "Educational claim",
      sourceIds: ["src-jp-iim-ranchi"],
      verification: "verified",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Bachelor of Technology in Electronics & Communication Engineering from JSS Academy of Technical Education, Noida.",
      claimType: "Educational claim",
      sourceIds: ["src-jp-jssaten"],
      verification: "verified",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Winner of 'Minutes to Win' at Carpe Diem 2014, Indian Institute of Management Calcutta, representing IIM Ranchi.",
      claimType: "Descriptive claim",
      sourceIds: ["src-jp-carpe-diem-2014"],
      verification: "source-backed",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Recommended on first attempt for Indian Navy University Entry Scheme (UES) and provides pro-bono SSB mentorship.",
      claimType: "Descriptive claim",
      sourceIds: ["src-jp-consulting-portfolio"],
      verification: "source-backed",
      dateAdded: ADDED,
      lastVerified: REVIEWED,
      editor: "DIMISIPEDIA Editorial",
    },
    {
      claim: "Corporate career including Godrej & Boyce (HR Manager), Reliance Power (Management Trainee HR), Tech Mahindra (Technical Associate), and SAITM (Director T&P).",
      claimType: "Corporate claim",
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
        "Jayendra Pratap Singh (JP), affectionately known in campus startup circles as Jayant Sir, is an HR & People Development professional, Startup Advisor at Wadhwani Foundation, and startup mentor with 14 years of cross-sector experience. He is an IIM Ranchi HR alumnus, a JSS Noida Electronics & Communication Engineer, a Startup India National Mentor (50+ startups mentored), a DPIIT Platinum Badge awardee, and the First Mentor of DIMISI Technologies Private Limited.",
    },
    {
      question: "What is Jayendra Pratap Singh's role at DIMISI Technologies?",
      answer:
        "Jayendra Pratap Singh is recognized as the First Mentor of DIMISI Technologies Private Limited. In this advisory capacity, he provides guidance on people development, leadership capability building, organizational readiness, and talent development. He is not an executive director, employee, co-founder, shareholder, or investor.",
    },
    {
      question: "What is his current primary organization and role?",
      answer:
        "Since September 2024, Jayendra Pratap Singh serves as Startup Advisor at Wadhwani Foundation, supporting entrepreneurship initiatives, venture acceleration, and startup capability building.",
    },
    {
      question: "What is the historical connection between JP (Jayant Sir) and DIMISI's founders?",
      answer:
        "In December 2025 at Axis College, the founding team (Shikhar Dixit, Swatantra Singh, Nishkarsh Mishra, and Shubham Dey) took a practical Startup & Entrepreneurship course under Jayendra Pratap Singh (Jayant Sir). After pitching Kalesh and demonstrating their commitment by waiting two hours outside the library, Jayant Sir reviewed their blueprint, granted access to the college media studio to record their application pitch video for Shark Tank India, and provided foundational startup orientation.",
    },
    {
      question: "What is Jayendra Pratap Singh's educational background?",
      answer:
        "Jayendra Pratap Singh completed his Post Graduate Diploma in Human Resource Management (PGDHRM) from the Indian Institute of Management Ranchi (IIM Ranchi, 2013–2015) and holds a Bachelor of Technology (B.Tech) in Electronics & Communication Engineering from JSS Academy of Technical Education, Noida (JSSATEN, 2006–2010).",
    },
    {
      question: "What recognitions has Jayendra Pratap Singh received in the startup ecosystem?",
      answer:
        "He has been awarded the prestigious Platinum Badge by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India. He is an empanelled National Mentor with Startup India (50+ startups mentored), an empanelled mentor with AIC-PECF (Atal Incubation Centre, NITI Aayog), StartupTN, and Innovation Mission Punjab.",
    },
    {
      question: "What corporate organizations has Jayendra Pratap Singh worked with or consulted for?",
      answer:
        "His corporate career includes roles as Human Resources Manager at Godrej & Boyce Mfg. Co. Ltd., Management Trainee at Reliance Power, Technical Associate at Tech Mahindra, and Director of Training & Placement at SAITM. In addition, he has conducted training interventions for participants from Samsung Electronics, Decathlon, ISGEC, and Larsen & Toubro.",
    },
  ],
  coverage: [
    {
      area: "DIMISI Mentorship Designation",
      status: "verified",
      note: "Officially documented as First Mentor of DIMISI Technologies Private Limited.",
    },
    {
      area: "Wadhwani Foundation & Current Role",
      status: "verified",
      note: "Serving as Startup Advisor since September 2024; corroborated via LinkedIn and institutional sources.",
    },
    {
      area: "Startup India & DPIIT Platinum Badge",
      status: "verified",
      note: "National Mentor empanelment (50+ startups) and DPIIT Platinum Badge award verified.",
    },
    {
      area: "Academic Credentials (IIM Ranchi & JSS Noida)",
      status: "verified",
      note: "IIM Ranchi PGDHRM and JSS Noida B.Tech in Electronics & Communication confirmed.",
    },
    {
      area: "Incubator Empanelments (AIC-PECF, StartupTN)",
      status: "verified",
      note: "Empanelled mentor roles across Atal Incubation Centre and state missions confirmed.",
    },
    {
      area: "Corporate Career History & Governance Boundary",
      status: "verified",
      note: "Formal HR & engineering roles documented; clearly separated from DIMISI executive management and equity structure.",
    },
  ],
  officialLinks: [
    {
      label: "LinkedIn Profile — Jayendra Pratap Singh",
      url: "https://www.linkedin.com/in/jayendra-pratap-singh-81ab9375",
      official: true,
    },
    {
      label: "Wadhwani Foundation — Official Website",
      url: "https://www.wadhwanifoundation.org",
      official: true,
    },
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
      label: "AIC-PECF — Atal Incubation Centre",
      url: "https://aicpecf.org",
      official: true,
    },
    {
      label: "IIM Ranchi — Official Website",
      url: "https://www.iimranchi.ac.in",
      official: true,
    },
    {
      label: "JSS Academy of Technical Education, Noida",
      url: "https://jssaten.ac.in",
      official: true,
    },
    {
      label: "DIMISI Technologies — Official Website",
      url: "https://dimisi.tech",
      official: true,
    },
  ],
  sourceIds: [
    "src-jp-linkedin",
    "src-jp-wadhwani",
    "src-jp-dpiit-platinum",
    "src-jp-startup-india",
    "src-jp-aic-pecf",
    "src-jp-iim-ranchi",
    "src-jp-carpe-diem-2014",
    "src-jp-jssaten",
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
    {
      n: 2,
      date: "2026-09-14",
      editor: "DIMISIPEDIA Editorial",
      change: "Comprehensive research integration: verified LinkedIn profile (~18k followers), Wadhwani Foundation Startup Advisor role, 9-stage career evolution, JSS Noida B.Tech, AIC-PECF empanelment, and Carpe Diem 2014 honor.",
    },
  ],
  createdAt: ADDED,
  updatedAt: REVIEWED,
  verifiedAt: REVIEWED,
  seoTitle: "Jayendra Pratap Singh (JP) — First Mentor, DIMISI Technologies | Profile",
  seoDescription:
    "Authoritative profile of Jayendra Pratap Singh (JP), First Mentor of DIMISI Technologies Private Limited. Startup Advisor at Wadhwani Foundation, IIM Ranchi HR alumnus, Startup India National Mentor (50+ startups), and DPIIT Platinum Badge awardee.",
};

export const mentorEntities: Entity[] = [jayendraPratapSingh];
