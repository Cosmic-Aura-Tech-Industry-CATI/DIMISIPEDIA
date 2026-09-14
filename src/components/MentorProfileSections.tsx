import { Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Layers,
  Lightbulb,
  Milestone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  jayendraProfileDetails,
  type CareerMilestone,
  type CareerStage,
  type ExpertiseGroup,
  type IncubatorEmpanelment,
  type MentorPillar,
} from "@/data/mentors";
import { EXTERNAL_REL_VERIFIED } from "@/lib/url-safety";
import { EntityLink } from "./EntityLink";

export function MentorProfileSections() {
  const data = jayendraProfileDetails;

  return (
    <div className="space-y-16">
      {/* 0. VERIFIED PROFESSIONAL PRESENCE & CURRENT APPOINTMENTS BANNER */}
      <section id="verified-footprint" className="border border-primary/40 bg-surface p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 font-mono text-[11px] font-medium text-primary">
                <BadgeCheck className="size-3.5" aria-hidden />
                <span>Verified Entity Profile</span>
              </span>
              <span className="label-mono text-xs text-muted-foreground">
                Greater Delhi Area / Noida, India
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
              {data.displayName}
            </h2>
            <p className="text-sm font-medium text-primary">
              {data.currentRole} — {data.currentOrganization} &amp; First Mentor — DIMISI Technologies
            </p>
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              14+ years in HR, people development, leadership capability building, and startup mentorship.
              Alumnus of IIM Ranchi (Human Resources) and JSS Noida (Electronics &amp; Communication Engineering).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <a
              href={data.linkedInUrl}
              target="_blank"
              rel={EXTERNAL_REL_VERIFIED}
              className="inline-flex items-center gap-2 rounded border border-[#0077b5]/50 bg-[#0077b5]/10 px-4 py-2 font-mono text-xs font-semibold text-[#0077b5] transition-all hover:bg-[#0077b5] hover:text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
              </svg>
              <span>View Verified LinkedIn Profile</span>
              <ExternalLink className="size-3.5" />
            </a>
            <span className="font-mono text-[11px] text-muted-foreground">
              {data.linkedInStats}
            </span>
          </div>
        </div>
      </section>

      {/* 1. CAREER SNAPSHOT / MILESTONES */}
      <section id="career-snapshot" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Milestone className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Career Snapshot</h2>
          <span className="label-mono ml-auto">14+ Years Track Record</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Verified milestones and credentials across industry, academia, national startup mentoring,
          and institutional advisory.
        </p>
        <div className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {data.careerMilestones.map((m: CareerMilestone, idx: number) => (
            <div key={m.title} className="flex flex-col justify-between bg-surface p-5">
              <div>
                <span className="inline-block rounded border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
                  {m.badge}
                </span>
                <h3 className="mt-3 font-serif text-lg font-medium leading-snug">{m.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
              </div>
              <div className="mt-4 border-t border-rule/60 pt-2">
                <span className="label-mono text-[10px]">Verified Record #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 9-STAGE CAREER EVOLUTION PIPELINE */}
      <section id="career-pipeline" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <TrendingUp className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">9-Stage Career Evolution</h2>
          <span className="label-mono ml-auto">2006 – Present</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Chronological progression tracing JP&apos;s development from technical engineering, enterprise IT,
          and student coaching to premier management education at IIM Ranchi, corporate HR management,
          healthcare entrepreneurship, multi-incubator mentoring, and national startup advisory.
        </p>

        <div className="mt-6 space-y-4">
          {data.careerStages.map((st: CareerStage) => (
            <div
              key={st.step}
              className={`relative border p-5 transition-all ${
                st.highlight
                  ? "border-primary/60 bg-surface shadow-sm"
                  : "border-border bg-surface/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule/60 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded">
                    STAGE {st.step}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{st.period}</span>
                </div>
                {st.badge ? (
                  <span className="label-mono text-[11px] text-foreground bg-background border border-border px-2 py-0.5">
                    {st.badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-3">
                <h3 className="font-serif text-lg font-medium text-foreground">{st.role}</h3>
                <p className="font-mono text-xs text-primary font-medium mt-0.5">
                  {st.organization}
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DIMISI CONNECTION & FIRST MENTOR CALLOUT */}
      <section id="dimisi-first-mentor-callout" className="scroll-mt-24">
        <div className="overflow-hidden border border-primary/40 bg-surface">
          <div className="border-b border-primary/20 bg-primary/5 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                  Institutional Affiliation · First Mentor
                </span>
              </div>
              <span className="label-mono text-[11px] bg-background border border-border px-2 py-0.5">
                DIMISIPEDIA Record ID: MENTOR-001
              </span>
            </div>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl text-foreground font-medium">
              First Mentor of DIMISI Technologies Private Limited
            </h2>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <p className="font-serif text-lg leading-relaxed text-foreground">
              <strong>Jayendra Pratap Singh (JP) is the First Mentor of DIMISI Technologies Private Limited.</strong>
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              As DIMISI&apos;s First Mentor, JP brings his experience in people development,
              leadership, organizational capability building, behavioural transformation,
              executive education, and startup mentoring to the company&apos;s broader growth
              journey. His practitioner-led perspective provides DIMISI with valuable guidance
              around people, leadership, organizational development, team capability, and the
              development of industry-ready talent.
            </p>

            {/* Historical Founding Connection */}
            <div className="rounded border border-border bg-muted/40 p-5 mt-4">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-medium">
                <Sparkles className="size-3.5" aria-hidden />
                <span>Historical Milestone · December 2025 (Axis College)</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                During the formative semester of CATI / DIMISI Technologies, the founding team (
                <EntityLink to="/people/shikhar-dixit" className="underline font-medium">Shikhar Dixit</EntityLink>,{" "}
                <EntityLink to="/people/swatantra-singh" className="underline font-medium">Swatantra Singh</EntityLink>, and{" "}
                <EntityLink to="/people/nishkarsh-mishra" className="underline font-medium">Nishkarsh Mishra</EntityLink>
                ) enrolled in a practical course on Startup &amp; Entrepreneurship led by Jayendra Pratap Singh
                (affectionately known as <em>Jayant Sir</em>).
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                After the founders proved their resilience by waiting two hours outside the central library,
                Jayant Sir reviewed their blueprint, opened the college media studio for filming their
                official application video for Shark Tank India, and provided foundational mentorship
                that helped crystallize the team&apos;s early venture.
              </p>
            </div>

            {/* Governance & Distinction Notice */}
            <div className="border-l-2 border-primary bg-background/80 px-4 py-3 text-xs text-muted-foreground">
              <strong className="font-medium text-foreground">Governance Boundary:</strong> In
              strict compliance with DIMISIPEDIA credibility standards, Jayendra Pratap Singh&apos;s
              role is formally documented as <strong>First Mentor</strong>. He is not a co-founder,
              director, employee, shareholder, investor, or board member of DIMISI Technologies
              Private Limited.
            </div>
          </div>
        </div>
      </section>

      {/* 4. FIVE PILLARS OF MENTORSHIP VALUE TO DIMISI */}
      <section id="mentorship-value" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Layers className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">How JP&apos;s Expertise Supports DIMISI</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Five core capability pillars where Jayendra Pratap Singh&apos;s practitioner-led perspective
          actively reinforces DIMISI Technologies.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.mentorshipValuePillars.map((p: MentorPillar) => (
            <div
              key={p.number}
              className="relative flex flex-col justify-between border border-border bg-surface p-6 transition-colors hover:border-primary/50"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-primary">
                  PILLAR {p.number}
                </span>
                <h3 className="mt-2 font-serif text-xl font-medium text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <CheckCircle2 className="size-3.5 text-primary" aria-hidden />
                <span>Organizational Pillar</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MENTORSHIP PHILOSOPHY */}
      <section id="mentorship-philosophy" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Compass className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Mentorship Philosophy</h2>
        </div>
        <div className="mt-4 border border-border bg-surface p-6">
          <div className="max-w-3xl">
            <p className="font-mono text-sm font-semibold tracking-wider text-primary uppercase">
              Core Methodology
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium text-foreground">
              {data.mentorshipPhilosophyHeadline}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {data.mentorshipPhilosophyText}
            </p>
          </div>

          {/* 4-Step Pipeline Flow */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.philosophySteps.map((step, idx) => (
              <div
                key={step.step}
                className="relative border border-border bg-background p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">
                      STEP {step.step}
                    </span>
                    {idx < data.philosophySteps.length - 1 ? (
                      <span className="hidden lg:inline text-xs text-muted-foreground font-mono">
                        →
                      </span>
                    ) : null}
                  </div>
                  <h4 className="mt-2 font-serif text-base font-medium text-foreground">
                    {step.label}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STARTUP MENTORSHIP SHOWCASE (50+ Startups & Startup India) */}
      <section id="startup-mentorship" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Rocket className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Startup Mentorship</h2>
          <span className="label-mono ml-auto">Startup India</span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_1fr]">
          {/* Big Stat Box */}
          <div className="flex flex-col items-center justify-center border border-primary/40 bg-surface p-8 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Ecosystem Track Record
            </span>
            <span className="mt-3 font-serif text-6xl font-bold tracking-tight text-foreground">
              50+
            </span>
            <span className="mt-2 font-serif text-lg font-medium text-foreground">
              Startups Mentored
            </span>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary">
              <BadgeCheck className="size-3.5" aria-hidden />
              <span>National Mentor · Startup India</span>
            </div>
          </div>

          {/* Mentorship Narrative & Focus Areas */}
          <div className="flex flex-col justify-between border border-border bg-surface p-6 sm:p-8">
            <div>
              <h3 className="font-serif text-xl font-medium">National Mentor — Startup India</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                JP is an empanelled National Mentor with Startup India, having mentored 50+ startups on areas
                including team building, leadership, and business strategy. His interventions
                bridge the gap between early ideation and operational capability, helping founders
                scale robust organizational cultures and investor-ready teams.
              </p>

              <div className="mt-6 border-t border-rule pt-4">
                <p className="label-mono text-xs text-foreground">Key Mentorship Focus Areas:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Team Building",
                    "Founder Alignment",
                    "Leadership Development",
                    "Business Strategy",
                    "Capability Building",
                    "Startup Governance",
                  ].map((area) => (
                    <span
                      key={area}
                      className="border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-rule pt-3 text-[11px] text-muted-foreground font-mono">
              Data verified against Startup India mentorship roster &amp; national ecosystem records.
            </div>
          </div>
        </div>
      </section>

      {/* 7. INCUBATOR & ADVISORY ECOSYSTEM */}
      <section id="incubator-ecosystem" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Building2 className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Incubators &amp; Advisory Ecosystem</h2>
          <span className="label-mono ml-auto">National Network</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Empanelments across national entrepreneurship foundations, central government startup platforms,
          Atal Incubation Centres (NITI Aayog), and regional innovation bodies.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.incubatorEmpanelments.map((inc: IncubatorEmpanelment) => (
            <div
              key={inc.name}
              className="flex flex-col justify-between border border-border bg-surface p-5 transition-colors hover:border-primary/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                    {inc.role}
                  </span>
                  {inc.badge ? (
                    <span className="label-mono text-[10px] bg-background border border-border px-1.5 py-0.5">
                      {inc.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-serif text-lg font-medium text-foreground">{inc.name}</h3>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{inc.type}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {inc.description}
                </p>
              </div>

              {inc.url ? (
                <div className="mt-4 border-t border-rule/60 pt-2">
                  <a
                    href={inc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
                  >
                    <span>Visit Institution</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CORPORATE HR & ACADEMIC LEADERSHIP */}
      <section id="corporate-academic-career" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Briefcase className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Corporate HR &amp; Academic Leadership</h2>
          <span className="label-mono ml-auto">Institutional Roles</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Documented corporate management, academic administration, and venture leadership roles held
          across his professional career.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.corporateExperience.map((exp) => (
            <div key={exp.organization + exp.role} className="border border-border bg-surface p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-primary">{exp.period}</span>
              </div>
              <h3 className="mt-2 font-serif text-lg font-medium text-foreground">{exp.role}</h3>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">{exp.organization}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. DEFENCE & SERVICES SELECTION BOARD (SSB) MENTORING */}
      <section id="defence-ssb-mentoring" className="scroll-mt-24">
        <div className="border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-2 text-primary">
            <Award className="size-5" aria-hidden />
            <span className="label-mono uppercase text-primary font-semibold text-[11px]">
              Specialized Behavioural Practice
            </span>
          </div>
          <h2 className="mt-2 font-serif text-2xl font-medium text-foreground">
            {data.defenceMentoring.title}
          </h2>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
            <BadgeCheck className="size-3.5" />
            <span>{data.defenceMentoring.qualification}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {data.defenceMentoring.description}
          </p>
        </div>
      </section>

      {/* 10. RECOGNITION & ACHIEVEMENTS */}
      <section id="recognition-achievements" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Award className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Recognition &amp; Achievements</h2>
        </div>

        <div className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2">
          <div className="bg-surface p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="label-mono text-[11px]">Government Honor</span>
            </div>
            <h3 className="mt-2 font-serif text-xl font-medium">Platinum Badge Awardee</h3>
            <p className="mt-1 text-xs font-mono text-primary">
              DPIIT, Ministry of Commerce &amp; Industry, Government of India
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Highest-tier recognition associated with the sustained quality and impact of his startup mentorship
              across national incubation initiatives.
            </p>
          </div>

          <div className="bg-surface p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="label-mono text-[11px]">National Ecosystem</span>
            </div>
            <h3 className="mt-2 font-serif text-xl font-medium">National Mentor — Startup India</h3>
            <p className="mt-1 text-xs font-mono text-primary">Startup India Initiative</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Mentored 50+ startups across critical venture areas including team building, leadership,
              and business strategy.
            </p>
          </div>

          <div className="bg-surface p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="label-mono text-[11px]">Management Festival Honor</span>
            </div>
            <h3 className="mt-2 font-serif text-xl font-medium">Winner — Carpe Diem 2014</h3>
            <p className="mt-1 text-xs font-mono text-primary">IIM Calcutta (Representing IIM Ranchi)</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Won first prize in the &ldquo;Minutes to Win&rdquo; flagship competition at Carpe Diem 2014,
              the annual festival of the Indian Institute of Management Calcutta.
            </p>
          </div>

          <div className="bg-surface p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="label-mono text-[11px]">Technical &amp; Analytical Grounding</span>
            </div>
            <h3 className="mt-2 font-serif text-xl font-medium">B.Tech Electronics &amp; Communication</h3>
            <p className="mt-1 text-xs font-mono text-primary">JSS Academy of Technical Education, Noida</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Technical degree affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU / UPTU),
              providing rigorous analytical problem-solving capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* 11. AREAS OF PROFESSIONAL EXPERTISE */}
      <section id="areas-of-expertise" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Lightbulb className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Areas of Expertise</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Core consulting and capability-building disciplines across people, leadership, and startup ecosystems.
        </p>

        <div className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {data.expertiseGroups.map((grp: ExpertiseGroup) => (
            <div key={grp.category} className="bg-surface p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground">{grp.category}</h3>
                <ul className="mt-4 space-y-2">
                  {grp.skills.map((skill: string) => (
                    <li key={skill} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-primary/70 mt-1 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. 14 YEARS OF CROSS-SECTOR EXPERIENCE */}
      <section id="cross-sector-exposure" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Briefcase className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">14 Years of Cross-Sector Experience</h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          JP&apos;s professional experience spans multiple industries, allowing him to bring
          perspectives from business, technology, education, healthcare, people development, and organizational
          capability into his consulting and mentoring engagements.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.sectors.map((sector) => (
            <div
              key={sector}
              className="border border-border bg-surface p-4 text-center transition-colors hover:border-primary/50"
            >
              <Building2 className="mx-auto size-5 text-primary opacity-80" aria-hidden />
              <h3 className="mt-3 font-serif text-base font-medium text-foreground">{sector}</h3>
              <p className="mt-1 text-[11px] font-mono text-muted-foreground">Cross-Sector</p>
            </div>
          ))}
        </div>
      </section>

      {/* 13. ORGANIZATIONS & INDUSTRY EXPOSURE */}
      <section id="training-consulting-exposure" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Building2 className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Organizations &amp; Industry Exposure</h2>
          <span className="label-mono ml-auto">Training &amp; Consulting Exposure</span>
        </div>

        <div className="mt-4 border border-border bg-surface p-6">
          <p className="text-sm leading-relaxed text-foreground">
            JP has delivered training and consulting interventions for professionals and students
            across diverse organizations and sectors, including organizations such as:
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {data.consultingOrganizations.map((org) => (
              <div
                key={org}
                className="flex items-center justify-center border border-border bg-background px-4 py-3 text-center"
              >
                <span className="font-serif text-sm font-medium text-foreground">{org}</span>
              </div>
            ))}
            <div className="flex items-center justify-center border border-dashed border-border bg-background px-4 py-3 text-center">
              <span className="font-mono text-xs text-muted-foreground">+ Diverse Sectors</span>
            </div>
          </div>

          <div className="mt-6 rounded border border-rule bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">Documentation Standard:</strong> The
            supplied portfolio specifically describes these organizations in the context of{" "}
            <strong>training and consulting interventions</strong>. His direct corporate employment
            and management tenure includes Godrej &amp; Boyce, Reliance Power, Tech Mahindra, and SAITM.
          </div>
        </div>
      </section>

      {/* 14. PROFESSIONAL FOCUS */}
      <section id="professional-focus" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Sparkles className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Professional Focus</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Core domains and thematic focus areas reflected in his professional consulting engagements.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Startup Advisory",
            "People Development",
            "Leadership",
            "Behavioural Transformation",
            "Organizational Capability",
            "Campus-to-Corporate",
            "Executive Education",
            "Employability",
            "Incubator Mentoring",
            "Training & Development",
            "Industry Readiness",
            "Team Building",
            "Business Strategy",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border bg-surface px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 15. FINAL PROFILE SUMMARY */}
      <section id="final-summary" className="scroll-mt-24">
        <div className="border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="label-mono uppercase text-primary text-[10px] font-semibold">
              Authoritative Profile Synthesis
            </span>
            <span className="label-mono text-[10px]">DIMISIPEDIA Verified</span>
          </div>
          <p className="mt-4 font-serif text-base sm:text-lg leading-relaxed text-foreground">
            &ldquo;{data.finalSummary}&rdquo;
          </p>
          <div className="mt-6 border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-serif text-sm font-medium">Jayendra Pratap Singh (JP)</p>
              <p className="text-xs text-muted-foreground">
                Startup Advisor — Wadhwani Foundation · First Mentor — DIMISI Technologies · National Mentor — Startup India
              </p>
            </div>
            <span className="label-mono text-[10px] border border-border px-2 py-1 bg-background">
              Recorded in DIMISIPEDIA Entity Graph
            </span>
          </div>
        </div>
      </section>

      {/* 16. RELATED TOPICS */}
      <section id="related-topics" className="scroll-mt-24">
        <div className="flex items-center gap-2 border-b border-rule pb-2">
          <Layers className="size-5 text-primary" aria-hidden />
          <h2 className="text-2xl">Related Topics</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Knowledge topics and related institutional entities connected to Jayendra Pratap Singh&apos;s
          documented profile.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.relatedTopics.map((topic) => (
            <div
              key={topic.title}
              className="border border-border bg-surface p-4 transition-colors hover:border-primary/50"
            >
              {topic.href ? (
                <Link to={topic.href as unknown as "/"} className="block group">
                  <p className="font-serif text-base font-medium text-foreground group-hover:text-primary transition-colors">
                    {topic.title} →
                  </p>
                  {topic.note ? (
                    <p className="mt-1 text-xs text-muted-foreground">{topic.note}</p>
                  ) : null}
                </Link>
              ) : (
                <div>
                  <p className="font-serif text-base font-medium text-foreground">{topic.title}</p>
                  {topic.note ? (
                    <p className="mt-1 text-xs text-muted-foreground">{topic.note}</p>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
