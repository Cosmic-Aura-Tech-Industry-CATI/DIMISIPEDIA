import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Compass,
  MapPin,
  Image as ImageIcon,
  ArrowRight,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Our Journey" }];

export const Route = createFileRoute("/journey")({
  head: () =>
    pageHead({
      title: "The Entrepreneurship Journey — Shikhar Dixit & DIMISI Technologies | DIMISIPEDIA",
      description:
        "The complete, unfiltered story of DIMISI Technologies: from a six-hour hackathon project in college to CATI, Kalesh, the Sinister Six, incorporation, and DIMISIPEDIA.",
      path: "/journey",
      schema: [
        buildBreadcrumbSchema(trail, "/journey"),
        {
          "@type": "Article",
          "@id": "https://dimisipedia.me/journey#article",
          headline: "The Entrepreneurship Journey of Shikhar Dixit and DIMISI Technologies",
          description:
            "From a 6-hour college hackathon to CATI, Kalesh, the Sinister Six, incorporation, and DIMISIPEDIA — an unfiltered founder narrative by Shikhar Dixit.",
          author: {
            "@type": "Person",
            "@id": "https://dimisipedia.me/people/shikhar-dixit#person",
            name: "Shikhar Dixit",
            jobTitle: "Founder & CEO",
            url: "https://dimisipedia.me/people/shikhar-dixit",
          },
          publisher: {
            "@id": "https://dimisipedia.me/dimisi-technologies#organization",
          },
          about: [
            { "@id": "https://dimisipedia.me/people/shikhar-dixit#person" },
            { "@id": "https://dimisipedia.me/dimisi-technologies#organization" },
          ],
          mainEntityOfPage: "https://dimisipedia.me/journey",
          datePublished: "2026-08-21",
          dateModified: "2026-08-21",
        },
      ],
    }),
  component: JourneyPage,
});

interface PhaseImage {
  src?: string;
  alt: string;
  caption: string;
  aspect?: string;
}

interface Phase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  quote?: { text: string; author: string };
  narrative: string[];
  highlights?: string[];
  image: PhaseImage;
}

const phases: Phase[] = [
  {
    id: "phase-1",
    number: "01",
    title: "The Six-Hour Project & The Spark of CATI",
    subtitle:
      "How an urgent hackathon at Axis College ignited the dream of building an IT company.",
    date: "15 October 2024",
    location: "Axis College, Kanpur",
    quote: {
      text: "If we could build a working face recognition system in six hours, why couldn't we build our own IT company?",
      author: "Shikhar & Swatantra",
    },
    narrative: [
      "It all began on 15 October 2024. Swatantra and I were sitting together at Axis College, where we were pursuing our B.Tech in Computer Science and Engineering, scrambling to complete an urgent project: a Face Recognition System for the college's Gandhigiri event.",
      "In about six to seven intense hours, we managed to build a fully functional Face Recognition System from scratch. Around 8 or 9 in the evening, while catching our breath and reflecting on what we had just pulled off, a bigger question struck us: If we could engineer something like this in a single afternoon, why couldn't we start our own startup and software company?",
      "Swatantra was in immediately. He was the kind of brother and friend who would jump into a well if I were jumping in. Right then and there, we shook hands and decided to become business partners. Within minutes, we chose our very first company name: CATI — Cosmic Aura Tech Industry.",
      "Soon after, in the lab of the AICTE Virtual Android Development Internship, we pitched the idea to Nishkarsh. He agreed on the spot to join our journey. Back then, we had no concrete product roadmap or business playbook — our vague initial plan was simply to get campus jobs first, save up, and then pursue our startup dream after graduation.",
    ],
    highlights: [
      "Built a full Face Recognition System in 6–7 hours for Gandhigiri event",
      "Founded partnership between Shikhar Dixit and Swatantra Singh",
      "Invented original company name: CATI (Cosmic Aura Tech Industry)",
      "Nishkarsh Mishra joined the founding trio in the AICTE Android lab",
    ],
    image: {
      src: "/images/the urgent project.jpeg",
      alt: "Gandhigiri event Face Recognition project and early CATI founding team at Axis College",
      caption:
        "Phase 1 Archive · 15 Oct 2024 — The working Face Recognition setup and the birth of CATI at Axis College.",
    },
  },
  {
    id: "phase-2",
    number: "02",
    title: "The Mumbai Reality Check at IIT Bombay",
    subtitle:
      "Taking an overnight train to E-Summit 2025 and seeing what real entrepreneurship feels like.",
    date: "4 January – 4 February 2025",
    location: "IIT Bombay, Mumbai",
    quote: {
      text: "That trip gave us our first raw reality check of what the startup world actually looked like.",
      author: "Founding Reflection",
    },
    narrative: [
      "On 4 January 2025, I stumbled across a LinkedIn post about the IIT Bombay E-Summit 2025. It promised job fair opportunities alongside a deep dive into genuine entrepreneurship.",
      "The three of us had an urgent discussion. It felt early, and booking last-minute train tickets to Mumbai was a stretch on our student pockets, but the event was set for 1 and 2 February. We knew we had to be there in person.",
      "We took the plunge and booked our tickets that very night. We arrived in Mumbai on 28 January 2025, immersed ourselves in the bustling ecosystem of founders, pitches, and tech builders, and boarded our return train on 4 February.",
      "The trip gave us an eye-opening reality check. We saw firsthand the grit, scale, and discipline of real startups. After returning to Kanpur, there was a long, quiet stretch — we had entered our final semester and had to gear up for grueling campus placement drives.",
    ],
    highlights: [
      "Urgent train booking from Kanpur to Mumbai for IIT Bombay E-Summit 2025",
      "Exposure to national-scale founders, pitching dynamics, and startup realities",
      "Return to Kanpur to face final-year B.Tech placement pressure",
    ],
    image: {
      src: "/images/THE LEARNING FROM MUMBAI.jpeg",
      alt: "Shikhar, Swatantra, and Nishkarsh at IIT Bombay E-Summit 2025 in Mumbai",
      caption: "Phase 2 Archive · Feb 2025 — The founding trio at IIT Bombay E-Summit, Mumbai.",
    },
  },
  {
    id: "phase-3",
    number: "03",
    title: "The 5th Rejection & The Midnight Call",
    subtitle:
      "Walking the road alone after placement heartbreak, and receiving the spark that created Poll-Social.",
    date: "13 November 2025",
    location: "Home street, Kanpur",
    quote: {
      text: "Why shouldn't you pursue your passion for entrepreneurship? If you have good partners, maybe this rejection is the right time to build CATI.",
      author: "Priya",
    },
    narrative: [
      "On the evening of 13 November 2025, I was pacing alone along the quiet road in front of my home, heavy-hearted and questioning my entire career. I had just faced rejection from my fifth consecutive placement drive, despite having poured countless hours into sharpening my skills and technical knowledge.",
      "Then my phone rang. It was my partner, Priya. She listened patiently as I vented my frustration, my doubts, and the sting of repeated rejections.",
      "During our conversation, she asked me a simple, grounding question: Why was I letting placement rejections define my worth instead of chasing my real passion? She reminded me that I already had trustworthy, talented co-founders in Swatantra and Nishkarsh, and suggested that maybe this closed door was the exact push we needed to finally build CATI for real.",
      "I asked her: 'What should I actually build?' She suggested creating an anonymous social media application where college students and young people could express their genuine thoughts freely, without the fear of judgment or public scrutiny.",
      "The idea clicked instantly. I had explored a similar concept during a previous internship, so I knew the technical architecture. That night, after hanging up, I sat at my desk and coded until dawn. I built the first web prototype, named it Poll-Social, and deployed it live on kaleshpro1.netlify.app — a link that remains live to this day.",
    ],
    highlights: [
      "Fifth placement drive rejection became the turning point",
      "Priya suggested the anonymous expression concept during a late-night call",
      "Shikhar built and deployed the initial prototype in a single overnight sprint",
      "Live deployment on Netlify under the initial moniker 'Poll-Social'",
    ],
    image: {
      src: "/images/5th rejection.jpeg",
      alt: "The original Poll-Social web application interface running on Netlify",
      caption:
        "Phase 3 Archive · 13 Nov 2025 — The turning point: 5th placement rejection and Poll-Social prototype.",
    },
  },
  {
    id: "phase-4",
    number: "04",
    title: "“Chalo Kalesh Karey” & Assembling the Core",
    subtitle: "The naming epiphany, lab debates, and bringing Sheelu and Mridul into the fold.",
    date: "14 – 17 November 2025",
    location: "Infosys AI/ML Lab & CodeVeda Club",
    quote: {
      text: "If people are anonymous and completely honest, there will naturally be a lot of kalesh. Why not call it Kalesh?",
      author: "Priya",
    },
    narrative: [
      "The next morning, during our AICTE Infosys AI/ML training lab, I pulled Swatantra and Nishkarsh aside to demo the prototype. Swatantra was excited on the spot. Nishkarsh, ever the practical pragmatist, immediately peppered me with hard-hitting questions: How will we build the Android client? How will the backend scale? What happens when edge cases break?",
      "I told him to have faith — if we committed to building it, I would assemble the exact talent needed to answer every single question.",
      "That evening around 9 PM, Priya called again to check on our progress. When I mentioned our search for the perfect, catchy identity, she suddenly said: 'What if you call it Kalesh? When people are anonymous and brutally honest, there's always going to be kalesh.' At first I laughed, thinking it was a joke, but she was dead serious.",
      "The next day, I pitched the name to the guys. Swatantra grinned and shouted what became our rallying cry: 'Chalo Kalesh Karey!'",
      "Now came recruitment. First, I reached out to Sheelu Singh — without question the sharpest Flutter and Dart mobile engineer in our college batch. I walked him through the startup vision and prototype, and he signed on without hesitation.",
      "Next, I approached Mridul Mishra, a Linux and backend powerhouse whom I had gotten to know through CodeVeda, the tech club I had founded on campus. To my relief and gratitude, Mridul also agreed immediately. By 17 November 2025, our internal joining paperwork for Project Kalesh under CATI was officially sealed.",
    ],
    highlights: [
      "Priya coined the name 'Kalesh', embraced with Swatantra's tagline 'Chalo Kalesh Karey'",
      "Recruited Sheelu Singh as Mobile Engineering Lead (Flutter/Dart)",
      "Recruited Mridul Mishra as Backend & Linux Systems Lead",
      "Founding agreement and paperwork completed on 17 November 2025",
    ],
    image: {
      src: "/images/chalo kalesh karey.jpeg",
      alt: "Kalesh early branding sketch and core engineering team gathering in the lab",
      caption:
        "Phase 4 Archive · Mid-Nov 2025 — Team formation and the official naming of Project Kalesh.",
    },
  },
  {
    id: "phase-5",
    number: "05",
    title: "Mentorship, The Library Wait & Shark Tank Pitch",
    subtitle:
      "Waiting two hours in the campus library, winning over Jayant Sir, and pitching Kalesh.",
    date: "December 2025",
    location: "Central Library, Axis College",
    quote: {
      text: "Maybe he's testing our patience. Let's wait as long as it takes.",
      author: "Nishkarsh Mishra",
    },
    narrative: [
      "During our semester exam period, we enrolled in a practical course on Startup & Entrepreneurship led by Jayendra Pratap Singh (affectionately known as Jayant Sir). For our practical assignment, our team — consisting of Swatantra, Nishkarsh, Shubham Dey, and myself — delivered a passionate presentation on Kalesh.",
      "While faculty usually treated student presentations as routine coursework, we were determined to prove that we were dead serious about building a real startup. Jayant Sir gave us a window to meet him.",
      "Around 4–5 December 2025, Nishkarsh and I called him and arrived at the campus central library as instructed. We ended up waiting outside for nearly two hours. When I began to lose my temper, Nishkarsh wisely pointed out: 'Maybe Sir is testing our patience. Let's stay.'",
      "When Jayant Sir finally called us in, we laid out our entire blueprint. He genuinely guided us, granted us access to the college studio for video shooting, and mentored us toward filling out the application form for Shark Tank India.",
      "Junior Harsh Mishra stepped in to help us edit our pitch video. Though we ultimately didn't make the final TV cut, the experience sharpened our vision and laid the groundwork for our upcoming incubation.",
    ],
    highlights: [
      "Pitched Kalesh in the Startup & Entrepreneurship academic evaluation",
      "Waited 2 hours at the library, proving commitment and grit to Jayant Sir",
      "Granted studio access for video production & guidance on startup building",
      "Filmed and submitted official Shark Tank India application video",
    ],
    image: {
      src: "/images/mentorship and library.jpeg",
      alt: "Kalesh presentation and studio pitch recording at Axis College",
      caption:
        "Phase 5 Archive · Dec 2025 — Meeting Jayant Sir at the central library and filming the Shark Tank pitch.",
    },
  },
  {
    id: "phase-6",
    number: "06",
    title: "The Sinister Six, Sand Tank Office & TheKalesh.com",
    subtitle:
      "Deploying TheKalesh.com, receiving campus office allocation in February, and hiring our first interns.",
    date: "January – February 2026",
    location: "Sand Tank Office & TheKalesh.com Dev Room",
    quote: {
      text: "We were the Sinister Six — six college engineers pushing code, now operating out of our newly allocated Sand Tank office.",
      author: "Shikhar Dixit",
    },
    narrative: [
      "With semester exams behind us, full-throttle development on the official Kalesh platform kicked off on 4 January 2026. The website was deployed live on 22 January 2026 on TheKalesh.com, orchestrated by Mridul.",
      "During this sprint, Siddhant Shekhar joined our ranks on 5 January as a dedicated web developer. Our core lineup was now complete — a squad we proudly dubbed the Sinister Six:",
      "• Shikhar Dixit — Chief Executive Officer\n• Swatantra Singh — Chief Technology Officer\n• Nishkarsh Mishra — Chief Financial & Operations Officer\n• Mridul Mishra — Backend & Infrastructure Engineer\n• Sheelu Singh — Android Mobile Engineer\n• Siddhant Shekhar — Frontend Web Developer",
      "Following the website deployment, in February 2026, we were officially allocated dedicated physical office space in the Sand Tank area on the Axis College campus.",
      "With official permission from college administration to hire from our new office, we brought four talented interns on board on 22 February 2026: Saumya Shukla (Social Media Marketing), Niyati Gupta (Backend), Harsh Mishra (Video Editor & Creative Lead), and Amit Kumar (Backend Intern). We had set our grand public launch target for 16 March 2026.",
    ],
    highlights: [
      "Official launch of TheKalesh.com on 22 January 2026",
      "Formation of 'The Sinister Six' core engineering and executive unit",
      "Officially allocated the Sand Tank campus office space in February 2026",
      "Recruited 4 student interns on 22 February 2026 with college administration approval",
      "Targeted public launch scheduled for 16 March 2026",
    ],
    image: {
      src: "/images/sand tank and sinister six.jpeg",
      alt: "The Sinister Six engineering team and interns working in the Sand Tank campus office",
      caption:
        "Phase 6 Archive · Feb 2026 — The Sand Tank campus office allocation and team expansion at Axis College.",
    },
  },
  {
    id: "phase-7",
    number: "07",
    title: "The Exam Hall Formula & Birth of DIMISI",
    subtitle:
      "Facing legal roadblocks, scribbling on the back of an exam paper, and incorporating DIMISI Technologies.",
    date: "March – 9 April 2026",
    location: "Exam Hall & MCA Registry",
    quote: {
      text: "DI from Dixit, MI from Mishra, SI from Singh. Together: DIMISI.",
      author: "The Naming Formula",
    },
    narrative: [
      "As 16 March approached, our high-speed momentum hit a sudden wall: Indian corporate and legal compliance. As final-year students with zero outside revenue and tight personal budgets, hiring premium corporate lawyers was out of reach.",
      "My father connected us with an experienced advocate who walked us through the differences between a Partnership firm and a Private Limited company. Swatantra, Nishkarsh, and I resolved to do things the right way and form a Private Limited entity.",
      "Then came another gut punch: CATI (Cosmic Aura Tech Industry) was rejected on the Ministry of Corporate Affairs (MCA) portal due to existing name conflicts. To make matters more stressful, our mid-semester exams were happening that very week.",
      "Sitting in the exam hall with the question paper in front of me, I could barely concentrate on the subject. My mind was racing, trying hundreds of name combinations on the back of my scrap sheet. Then, a formula clicked:",
      "DI (Dixit) + MI (Mishra) + SI (Singh) = DIMISI.",
      "After the exam, I gathered the team and proposed the name. Nishkarsh immediately asked his signature question: 'What does it mean and why?' When I explained the formula, everyone burst out laughing. But when we checked the MCA database, there was zero conflict. Not a single duplicate fragment existed.",
      "The laughter turned into smiles of relief. While letting go of CATI felt bittersweet — it had been our first love — we embraced our new identity. On 9 April 2026, we were officially appointed Directors of DIMISI Technologies Private Limited (CIN: U62013UP2026PTC246506).",
    ],
    highlights: [
      "Overcame legal compliance hurdles to establish a Private Limited entity",
      "Created the unique 'DI-MI-SI' formula on the back of an exam paper",
      "100% MCA clearance with zero name conflicts",
      "Incorporated DIMISI Technologies Pvt. Ltd. on 9 April 2026",
    ],
    image: {
      src: "/images/Exam Hall Formula.jpeg",
      alt: "The handwritten DIMISI naming formula and Ministry of Corporate Affairs incorporation certificate",
      caption:
        "Phase 7 Archive · April 2026 — Official incorporation of DIMISI Technologies Private Limited.",
    },
  },
  {
    id: "phase-8",
    number: "08",
    title: "Bringing DIMISI Home & Junior Energy",
    subtitle:
      "Adapting to final-year departures, setting up shop in a home bedroom, and mounting the company board.",
    date: "April – May 2026",
    location: "Swarn Jayanti Vihar, Kanpur",
    quote: {
      text: "We hung our official company board on the front gate on 17 May 2026. DIMISI had found its home.",
      author: "Office Inauguration",
    },
    narrative: [
      "Following incorporation, reality tested us again. As college wrapped up, team dynamics shifted: Saumya, Siddhant, and Niyati moved on to other commitments, while Sheelu relocated and transitioned to remote mobile development.",
      "At the same time, we crossed paths with a wave of passionate, high-energy juniors eager to learn and build alongside us: Prashant, Amrit, Anushka, Nisha, and Vinay.",
      "Needing a stable, cost-free base of operations, I spoke with my parents. With their full blessing and support, we converted one room of our family home into the official DIMISI Technologies headquarters.",
      "On 16 May 2026, we held a humble inauguration for our new office. The very next day, on 17 May 2026, we mounted the official DIMISI Technologies board on our front gate to complete our bank account verification. We were now a fully operational, licensed company ready to face the market.",
    ],
    highlights: [
      "Shifted operations to a dedicated home office in Kanpur with family support",
      "Welcomed junior contributors: Prashant, Amrit, Anushka, Nisha, and Vinay",
      "Official office inauguration on 16 May 2026",
      "Company board mounted on 17 May 2026 for banking and statutory verification",
    ],
    image: {
      src: "/images/bringing dimisi home.jpeg",
      alt: "The DIMISI Technologies company board on the office gate and home workstation setup",
      caption:
        "Phase 8 Archive · May 2026 — The official DIMISI Technologies office in Swarn Jayanti Vihar, Kanpur.",
    },
  },
  {
    id: "phase-9",
    number: "09",
    title: "The Midnight Walk & The First Client Deal",
    subtitle:
      "Enduring hundreds of cold calls and closing Rudra Tours & Travels when we needed it most.",
    date: "June – July 2026",
    location: "Kanpur",
    quote: {
      text: "After 100+ cold calls and dozens of dead ends, a casual conversation during a midnight walk turned into our first commercial contract.",
      author: "First Revenue Milestone",
    },
    narrative: [
      "Operating a company without revenue is brutal. With statutory filing fees and operational expenses looming, we spent weeks grinding: making hundreds of cold calls and attending dozens of client meetings across Kanpur without landing a single closed deal.",
      "One late night, thoroughly frustrated and exhausted, I went for a solitary walk down my home street to clear my head. A neighbor who saw me pacing approached and asked: 'Does your company build commercial websites? I run a tours and travels agency and desperately need an online platform.'",
      "That impromptu street conversation changed our trajectory. Over the following week, we finalized terms and officially closed our very first commercial client: Rudra Tours & Travels.",
      "Around this time, Somya Tiwari joined our team to assist with client management and frontend development. With our first delivery successfully completed, our confidence surged, and we soon secured two more commercial client contracts in rapid succession.",
    ],
    highlights: [
      "Overcame weeks of cold-outreach rejections with zero budget",
      "Signed first commercial client contract: Rudra Tours & Travels",
      "Somya Tiwari joined to bolster client communications and web delivery",
      "Successfully signed two subsequent commercial software development clients",
    ],
    image: {
      src: "/images/first client deal.jpeg",
      alt: "Rudra Tours & Travels website project delivery and client celebration",
      caption:
        "Phase 9 Archive · June 2026 — Sealing the first commercial deal with Rudra Tours & Travels.",
    },
  },
  {
    id: "phase-10",
    number: "10",
    title: "Building DIMISIPEDIA & The Road Ahead",
    subtitle:
      "Documenting our living history, staying accountable to truth, and moving forward with gratitude.",
    date: "August 2026 & Beyond",
    location: "DIMISIPEDIA Headquarters",
    quote: {
      text: "This is not the end of the story. It is simply where the story stands today. Thank you to everyone who believed in us.",
      author: "Shikhar Dixit",
    },
    narrative: [
      "On 19 August 2026, we began architecting DIMISIPEDIA — an open, structured knowledge encyclopedia built to document our company, our people, our technologies, and this unfiltered entrepreneurship story.",
      "Looking back from 21 August 2026, the journey that started with two friends hacking together a face recognition script in an Axis College classroom has evolved through CATI, the Mumbai train ride, placement rejections, the midnight idea of Kalesh, the Sand Tank office, the exam hall naming breakthrough, incorporation, and our first client breakthroughs.",
      "There are still daily hurdles to overcome, codebases to ship, and internal challenges to navigate. We don't pretend to have everything figured out. But we stand here with profound gratitude for everyone who has held the line with us:",
      "Our juniors with their tireless enthusiasm, my co-founders Swatantra and Nishkarsh for their unwavering loyalty and intellect, our core developers Mridul and Sheelu, my parents for giving us a roof to build under, and my life partner Priya for providing the spark, the courage, and the name that set everything in motion.",
      "This is not a finished tale — it is simply where we stand today, ready for the next chapter.",
    ],
    highlights: [
      "Commenced architecture of DIMISIPEDIA on 19 August 2026",
      "Public archival of all verifiable milestones, sources, and team history",
      "Deep gratitude to partners, core engineers, juniors, mentors, parents, and Priya",
      "A living, evolving entrepreneurship journey continuing into the future",
    ],
    image: {
      src: "/images/the road ahead.jpeg",
      alt: "The DIMISIPEDIA Knowledge Hub launch and the team looking toward the horizon",
      caption:
        "Phase 10 Archive · August 2026 — DIMISIPEDIA launched as the official knowledge archive.",
    },
  },
];

function PhaseImageCard({ image, phaseNumber }: { image: PhaseImage; phaseNumber: string }) {
  if (image.src) {
    return (
      <figure className="my-8 overflow-hidden border border-rule bg-surface shadow-xs">
        <div className="flex max-h-[540px] w-full items-center justify-center bg-muted/20 dark:bg-muted/10">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="max-h-[540px] w-full object-contain transition-transform duration-300 hover:scale-[1.005]"
          />
        </div>
        <figcaption className="border-t border-rule bg-surface px-4 py-2.5 font-mono text-xs text-muted-foreground">
          {image.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="my-8 overflow-hidden border border-dashed border-border bg-surface/60 transition-colors hover:border-primary/50">
      <div className="flex aspect-video w-full flex-col items-center justify-center p-6 text-center">
        <div className="grid size-12 place-items-center rounded-full border border-border bg-background text-muted-foreground shadow-sm">
          <ImageIcon className="size-5" />
        </div>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Phase {phaseNumber} Image Placeholder
        </p>
        <p className="mt-1 max-w-md text-xs text-muted-foreground/80">{image.alt}</p>
      </div>
      <div className="border-t border-rule bg-background/50 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        {image.caption}
      </div>
    </div>
  );
}

function JourneyPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumbs trail={trail} />

      {/* Hero Header */}
      <header className="mt-6 border-b border-rule pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-primary">
            <Compass className="size-3.5" /> Founder's Chronicle
          </span>
          <span className="label-mono">October 2024 – Present</span>
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">
          The Entrepreneurship Journey of Shikhar Dixit &amp; DIMISI Technologies
        </h1>
        <p className="mt-5 max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground sm:text-2xl">
          From a six-hour college hackathon to CATI, Kalesh, the Sinister Six, incorporation, and
          DIMISIPEDIA — an unfiltered personal narrative.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2 text-foreground">
            <span className="font-serif font-medium">By Shikhar Dixit</span>
            <span className="label-mono">(Founder &amp; CEO)</span>
          </span>
          <span className="label-mono">10 Key Phases</span>
          <span className="label-mono">~12 min read</span>
          <span className="label-mono">Documented 21 August 2026</span>
        </div>
      </header>

      {/* Quick Summary / Chapter Index */}
      <section aria-label="Journey Phases" className="mt-10 border border-border bg-surface p-6">
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <p className="label-mono">Chronological Phases</p>
          <span className="font-mono text-xs text-muted-foreground">2024 — 2026</span>
        </div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {phases.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="group flex items-start gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-xs font-semibold text-primary">{p.number}.</span>
                <div>
                  <span className="font-serif group-hover:underline">{p.title}</span>
                  <span className="block text-xs text-muted-foreground/70">{p.date}</span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Main Narrative Phases */}
      <div className="mt-16 space-y-20">
        {phases.map((phase) => (
          <article
            key={phase.id}
            id={phase.id}
            className="scroll-mt-24 border-b border-rule pb-16 last:border-0"
          >
            {/* Phase Badge & Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary">
                  {phase.number}
                </span>
                <span className="label-mono">Phase {phase.number}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" /> {phase.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> {phase.location}
                </span>
              </div>
            </div>

            <h2 className="mt-4 font-serif text-3xl leading-snug sm:text-4xl">{phase.title}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{phase.subtitle}</p>

            {/* Image Placeholder / Photo for this phase */}
            <PhaseImageCard image={phase.image} phaseNumber={phase.number} />

            {/* Pull Quote */}
            {phase.quote ? (
              <blockquote className="my-6 border-l-2 border-primary bg-surface/80 px-5 py-4">
                <p className="font-serif text-lg italic text-foreground sm:text-xl">
                  “{phase.quote.text}”
                </p>
                <cite className="mt-2 block font-mono text-xs not-italic uppercase tracking-[0.1em] text-muted-foreground">
                  — {phase.quote.author}
                </cite>
              </blockquote>
            ) : null}

            {/* Story Paragraphs */}
            <div className="prose-editorial mt-6 space-y-4 text-[15px] leading-relaxed">
              {phase.narrative.map((para, i) => (
                <p key={i} className="text-foreground/90">
                  {para}
                </p>
              ))}
            </div>

            {/* Key Milestones in this Phase */}
            {phase.highlights && phase.highlights.length > 0 ? (
              <div className="mt-8 border border-border bg-surface p-5">
                <p className="label-mono">Phase {phase.number} Key Takeaways</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {phase.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {/* Epilogue / Closing Dedication */}
      <section className="mt-16 border border-border bg-surface p-8 sm:p-10">
        <div className="flex items-center gap-2">
          <Heart className="size-5 text-primary" />
          <p className="label-mono">Founder's Note &amp; Gratitude</p>
        </div>
        <h2 className="mt-3 font-serif text-3xl">To Everyone Who Walked This Path</h2>
        <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground">
          Whether you are our juniors who joined with wide eyes, our co-founders who weathered every
          storm, our parents who gave us a roof, or Priya who gave us the courage to start — DIMISI
          exists because of you.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          This chronicle is part of the permanent DIMISIPEDIA archive, preserved as living proof of
          what student founders can achieve with grit, friendship, and relentless curiosity.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/dimisi-technologies"
            className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 text-sm transition-colors hover:border-primary"
          >
            Explore DIMISI Technologies <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/people"
            className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 text-sm transition-colors hover:border-primary"
          >
            Meet the Team <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/timeline"
            className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 text-sm transition-colors hover:border-primary"
          >
            View Technical Timeline <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
