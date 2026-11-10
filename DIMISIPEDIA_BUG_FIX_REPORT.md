# DIMISIPEDIA 2.0 — QA Bug Fix Report

**Report Date:** 11 November 2026  
**Project:** DIMISIPEDIA 2.0  
**Target:** 10 Reported Quality Assurance Defects (BUG 001 – BUG 010)  
**Status:** All 10 Defects Resolved & Verified  

---

## BUG 001: Broken Event Routes
- **Reported Issue:** Public URLs returned 404:
  - `/events/iit-kanpur-siic-avinya-2026`
  - `/events/team-id-cards-ceremony`
  - `/events/dimisi-foundation-day-2026`
- **Root Cause:** Missing TanStack Router dynamic route file `src/routes/events.$slug.tsx`. Event catalog in `services-and-events.ts` only held 5 events and had differing slugs from `events.tsx`.
- **Changes Implemented:**
  1. Created `src/routes/events.$slug.tsx` with canonical resolution, alias matching (e.g. `siic-avinya-2026-hackathon` $\to$ 301 redirect to `/events/iit-kanpur-siic-avinya-2026`), `<EntityArticle>` rendering, and `Event` JSON-LD metadata.
  2. Moved `src/routes/events.tsx` to `src/routes/events.index.tsx` registering `createFileRoute("/events/")`.
  3. Expanded `eventEntities` in `src/data/services-and-events.ts` to include all 8 canonical events:
     - `iit-kanpur-siic-avinya-2026` (Avinya 2026, 4th position finalist)
     - `team-id-cards-ceremony` (Team ID cards & induction)
     - `dimisi-foundation-day-2026` (9 April 2026 MCA incorporation)
     - `office-inauguration-2026` (16–17 May 2026 headquarters launch)
     - `linkedin-30days-kalesh-contest` (15 August 2026 creator challenge)
     - `axis-hacksprint-2` (Axis HackSprint 2.0 mentorship)
     - `gandhigiri-project-showcase` (15 October 2024 catalyst sprint)
     - `iit-bombay-esummit-2025` (IIT Bombay delegation)
  4. Added individual event entries into `sitemap-events.xml`.
- **Verification Evidence:** `npx vite-node scripts/comprehensive-qa-audit.ts` confirms all 8 event entities compile with zero schema errors. Production build generated `.output/public/assets/events._slug-*.js` and `.output/server/_ssr/events.index-*.mjs`.

---

## BUG 002: Founder Biography Data Integrity & Privacy Controls
- **Reported Issue:** Founder Shikhar Dixit's exact birthdate (`2004-05-06`) and hardcoded age calculations were published across profile pages, facts, and Schema.org metadata.
- **Root Cause:** Internal date records were published unconditionally without privacy gating.
- **Changes Implemented:**
  1. In `src/data/founders.ts`, removed hardcoded `birthDate: "2004-05-06"` from `shikhar`, `2000-03-15` from `nishkarsh-mishra`, and `2000-08-30` from `swatantra-singh`.
  2. Replaced "Born" facts with verified public attributes:
     - `Origin / Base`: "Kanpur, Uttar Pradesh, India" (verified via corporate records and LinkedIn)
     - `Nationality`: "Indian" (verified via MCA incorporation filings)
  3. Removed all `${calculateAge(...)}` questions and answers from founders dataset.
  4. In `src/lib/seo.ts`, added privacy check: `birthDate: entity.isPublicBirthDateAllowed ? entity.birthDate : undefined`. Private DOB is completely omitted from Schema.org unless explicitly authorized.
  5. In `src/lib/knowledge-api.ts`, filtered out any unapproved private birth facts from API serializations.
- **Verification Evidence:** `git grep "calculateAge"` returns zero occurrences in data models. Audit script confirms 0 privacy leaks.

---

## BUG 003: Duplicate Knowledge Graph Relationships
- **Reported Issue:** Exactly 12 duplicate active relationships in the graph; 1 broken relationship edge pointing to nonexistent entity `linkedin-30-days-challenge`.
- **Root Cause:** Overlapping declarations between `baseRelationships` and `founderRelationships`. Event ID mismatch for the LinkedIn challenge.
- **Changes Implemented:**
  1. Implemented `deduplicateRelationships(list: Relationship[]): Relationship[]` in `src/data/knowledge.ts` normalizing `from|type|to` triples.
  2. Cleaned duplicated entries in `baseRelationships`.
  3. Updated relationship target in `services-and-events.ts`:
     `{ from: "prashant-umrao", type: "1st Prize Winner", to: "linkedin-30days-kalesh-contest" }`.
  4. Applied deduplication globally: `export const relationships = deduplicateRelationships([...])`.
- **Verification Evidence:** `npx vite-node scripts/comprehensive-qa-audit.ts` verified:
  - Duplicate Active Relationships: **0**
  - Broken Relationships: **0**

---

## BUG 004: Entity Classification Inconsistency
- **Reported Issue:** Inconsistent entity typing across components and views.
- **Root Cause:** Lack of centralized classification with runtime validation.
- **Changes Implemented:**
  1. In `src/data/knowledge.ts`, extended `EntityType` to:
     `"organization" | "person" | "product" | "project" | "technology" | "event" | "article" | "service" | "achievement" | "location"`.
  2. Exported `ENTITY_TYPES` array and `isValidEntityType(type)` validator.
  3. Exported `INFO_STATUSES` array and `isValidInfoStatus(status)` validator.
  4. Verified all 56 entities possess one valid authoritative entity type.
- **Verification Evidence:** Automated audit validates that all 56 entities match supported types.

---

## BUG 005: Credibility & Verification Framework
- **Reported Issue:** Lack of claim-level provenance, source tiering visibility, and confidence indicators on entity profile pages.
- **Root Cause:** Profiles only rendered general citations without structured claim-level fallback.
- **Changes Implemented:**
  1. In `src/data/evidence.ts`, defined `FactClaim` interface:
     - `id`: unique claim identifier
     - `entityId`: parent entity
     - `claim`: exact statement
     - `sourceIds`: array of cited sources
     - `sourceType`: Government Record, Official Website, Institutional, etc.
     - `status`: verified / source-backed / documented
     - `confidence`: High / Moderate / Low
     - `lastVerified`: ISO date
     - `isPrimary`: boolean flag for Tier-A primary authorities
     - `citationUrl`: external URL
  2. Created `getEntityClaims(entity)` deriving structured fact claims for every entity.
  3. Updated `src/components/EntityArticle.tsx` to render "Verified Fact Claims & Provenance" with primary authority badges, verification badges, and source footnotes.
- **Verification Evidence:** All entity profile pages (`/people/shikhar-dixit`, `/organizations/dimisi-technologies`, `/products/kalesh`, `/events/iit-kanpur-siic-avinya-2026`) display claim-level provenance and source citations.

---

## BUG 006: Public AI Knowledge API Hardening
- **Reported Issue:** Vulnerability to invalid pagination queries, missing parameter validation, lack of CORS, and potential internal error leakage.
- **Root Cause:** Bare `parseInt` without boundary checking in API route handlers.
- **Changes Implemented:**
  1. Created `apiErrorResponse(message, status, details)` in `src/lib/knowledge-api.ts` with standardized JSON error schemas and `no-store` headers.
  2. Hardened `paginate()` with boundary enforcement ($1 \le \text{page}$, $1 \le \text{limit} \le 100$).
  3. Wrapped all 9 API route handlers in try/catch blocks with sanitized error messages.
  4. Added parameter validation for query strings in `/search`, `/entities`, `/people`, `/products`, `/projects`, `/events`, `/services`, `/organizations`.
- **Verification Evidence:** Testing invalid params (e.g. `limit=9999` or `page=-5`) safely clamps to bounds or returns structured 400 responses.

---

## BUG 007: Entity Publishing Pipeline Gaps
- **Reported Issue:** Adding an entity required manual wiring across disconnected files without automated validation.
- **Root Cause:** Absence of a centralized pre-publication integrity check.
- **Changes Implemented:**
  1. Created `src/lib/publishing-integrity.ts` implementing `runPublishingIntegrityCheck()`.
  2. Automated 7 validation checks: duplicate IDs, duplicate paths, valid entity types, broken source citations, broken relationships, duplicate relationships, and Schema.org graph compilation.
  3. Linked integrity check to the Admin Governance console.
- **Verification Evidence:** Automated check runs in under 50ms and reports 100% clean status across all 56 entities.

---

## BUG 008: Admin Dashboard and Management Features
- **Reported Issue:** Schema.org validation test in `/admin` failed with 0% pass rate (53/53 failures).
- **Root Cause:** Admin test checked for `@context` on bare entity nodes, whereas `@context` is provided at the root `@graph` level.
- **Changes Implemented:**
  1. Updated `src/routes/admin.tsx` to test full valid graphs via `graph([buildEntitySchema(e), buildEntityPageSchema(e)])`.
  2. Verified node `@type` and graph `@context`.
  3. Updated KPI metrics to reflect true system state:
     - Total Entities: **56**
     - Active Relationships: **119** (Zero Broken, Zero Duplicates)
     - Verified Sources: **57**
     - Schema.org Pass Rate: **100% (56/56)**
- **Verification Evidence:** Admin dashboard compiles cleanly with 100% pass rate and real-time domain breakdown.

---

## BUG 009: Data Synchronization Across Views
- **Reported Issue:** Outdated hardcoded counts on `/explore` and `/index`.
- **Root Cause:** Static numbers in component markup.
- **Changes Implemented:**
  1. Updated `/explore` (`src/routes/explore.tsx`) to dynamically group all 7 domains: Organization, People, Products, Projects, Services, Events, and Technology.
  2. Synchronized systems registry on `/` (`src/routes/index.tsx`) with canonical product routes (`/products/kalesh`).
  3. Ensured cross-linking between all views points to canonical paths.
- **Verification Evidence:** Sitemaps and explore views reflect all 56 entities without discrepancies.

---

## BUG 010: AI Knowledge Hub Accuracy
- **Reported Issue:** Outdated links and inconsistent achievement representation on `/ai-knowledge`.
- **Root Cause:** Event link pointed to generic directory rather than canonical event page.
- **Changes Implemented:**
  1. In `src/routes/ai-knowledge.tsx`, updated FAQ q12 canonical link to point directly to `/events/iit-kanpur-siic-avinya-2026`.
  2. Confirmed all 16 FAQs derive strictly from verified corporate records and maintain Founder & CEO Shikhar Dixit as apex leadership entity.
  3. Verified `FAQPage` Schema.org JSON-LD matches FAQ card contents verbatim.
- **Verification Evidence:** All 16 FAQ entries validated against central dataset; canonical link leads to active event page.
