/**
 * DIMISIPEDIA evidence layer.
 *
 * Verification is a property of a CLAIM, never of a person. A claim's status is
 * derived from the evidence recorded against it — source tier, independence and
 * corroboration — rather than typed by hand in the UI.
 *
 * DATA INTEGRITY RULE: this module classifies existing sources. It never
 * invents a source, an authority level or a verification outcome.
 */

import { getSources, type InfoStatus, type Source, type SourceType } from "./knowledge";

export type SourceTier = "A" | "B" | "C" | "D";

export interface TierProfile {
  tier: SourceTier;
  label: string;
  independence: "Primary / authoritative" | "First-party" | "Independent" | "Community";
  authority: 1 | 2 | 3 | 4 | 5;
  description: string;
}

export const tierProfiles: Record<SourceTier, TierProfile> = {
  A: {
    tier: "A",
    label: "Primary / authoritative",
    independence: "Primary / authoritative",
    authority: 5,
    description:
      "Government records, statutory filings, official registries and institutional records. Highest confidence.",
  },
  B: {
    tier: "B",
    label: "First-party",
    independence: "First-party",
    authority: 4,
    description:
      "Published by the entity itself — official website, official profiles, own documentation. Reliable for self-description, but not independent verification.",
  },
  C: {
    tier: "C",
    label: "Independent",
    independence: "Independent",
    authority: 4,
    description:
      "Credible sources not controlled by the entity — established press, recognised publications, event organisers.",
  },
  D: {
    tier: "D",
    label: "Community / user-generated",
    independence: "Community",
    authority: 2,
    description:
      "Forums, aggregated directories and community posts. Useful as leads; not sufficient alone for biographical claims.",
  },
};

const tierByType: Record<SourceType, SourceTier> = {
  "Government Record": "A",
  "Institutional Source": "A",
  "Official Website": "B",
  "Company Announcement": "B",
  "Project Documentation": "B",
  "Social Profile": "B",
  "Press Coverage": "C",
  Interview: "C",
  "Event Page": "C",
  "Third-party Database": "D",
  Other: "D",
};

export function tierOf(source: Source): TierProfile {
  return tierProfiles[tierByType[source.type] ?? "D"];
}

export type VerificationLevel = "High" | "Moderate" | "Low" | "None";

export interface EvidenceRecord {
  source: Source;
  profile: TierProfile;
}

export interface VerificationAssessment {
  /** Status derived from the evidence actually recorded. */
  derived: InfoStatus;
  /** Status published on the page (explicit editorial status wins if stricter). */
  status: InfoStatus;
  level: VerificationLevel;
  evidence: EvidenceRecord[];
  independentCount: number;
  primaryCount: number;
  firstPartyCount: number;
  rationale: string;
}

/**
 * Derives a verification status from recorded evidence.
 * A source URL alone never produces "verified" — the tier and corroboration do.
 */
export function assessClaim(options: {
  sourceIds?: string[];
  declared?: InfoStatus;
  disputed?: boolean;
}): VerificationAssessment {
  const evidence: EvidenceRecord[] = getSources(options.sourceIds ?? []).map((source) => ({
    source,
    profile: tierOf(source),
  }));

  const primaryCount = evidence.filter((e) => e.profile.tier === "A").length;
  const firstPartyCount = evidence.filter((e) => e.profile.tier === "B").length;
  const independentCount = evidence.filter((e) => e.profile.tier === "C").length;

  // A source only counts once it has itself been checked.
  const confirmedPrimary = evidence.filter(
    (e) =>
      e.profile.tier === "A" && (e.source.status === "verified" || e.source.status === "official"),
  ).length;

  let derived: InfoStatus;
  let rationale: string;

  if (options.disputed) {
    derived = "disputed";
    rationale = "Credible sources currently disagree on this claim.";
  } else if (evidence.length === 0) {
    derived = "unverified";
    rationale = "No source is recorded against this claim.";
  } else if (confirmedPrimary > 0 || (primaryCount > 0 && independentCount > 0)) {
    derived = "verified";
    rationale = "Confirmed by a primary or authoritative record.";
  } else if (independentCount > 0 || firstPartyCount + primaryCount >= 1) {
    derived = "source-backed";
    rationale =
      independentCount > 0
        ? "Supported by an independent source, without primary confirmation."
        : "Supported by first-party material, which is not independent verification.";
  } else {
    derived = "needs-verification";
    rationale = "Recorded evidence is not sufficient to support this claim.";
  }

  // The published status never exceeds the evidence: editorial caution can lower
  // a status, but it can never raise it above what the sources support.
  const rank: Record<string, number> = {
    unverified: 0,
    disputed: 0,
    "needs-verification": 1,
    documented: 1,
    historical: 1,
    archived: 1,
    "source-backed": 2,
    official: 2,
    verified: 3,
  };
  const declared = options.declared;
  const status = declared && (rank[declared] ?? 0) < (rank[derived] ?? 0) ? declared : derived;

  const level: VerificationLevel =
    status === "verified"
      ? "High"
      : status === "source-backed" || status === "official"
        ? "Moderate"
        : status === "unverified"
          ? "None"
          : "Low";

  return {
    derived,
    status,
    level,
    evidence,
    independentCount,
    primaryCount,
    firstPartyCount,
    rationale,
  };
}

export const verificationScale: { status: InfoStatus; meaning: string }[] = [
  { status: "verified", meaning: "Confirmed by a highly authoritative or primary source." },
  {
    status: "source-backed",
    meaning: "Supported by a credible source, but not independently confirmed.",
  },
  {
    status: "needs-verification",
    meaning: "The claim exists, but recorded evidence is not yet sufficient.",
  },
  { status: "disputed", meaning: "Credible sources conflict; DIMISIPEDIA discloses both." },
  { status: "unverified", meaning: "No reliable source is currently recorded." },
];
