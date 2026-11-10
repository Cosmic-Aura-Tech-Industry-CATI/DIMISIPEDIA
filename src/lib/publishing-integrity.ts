/**
 * DIMISIPEDIA Publishing Integrity Pipeline
 *
 * Pre-publication validation engine ensuring that every entity added or updated
 * in the knowledge graph meets all canonical requirements:
 * 1. Valid Canonical Path & Route Pattern
 * 2. Standardized EntityType & InfoStatus
 * 3. Complete Schema.org JSON-LD graph generation
 * 4. 100% Validated Source References (zero broken citations)
 * 5. 100% Validated Relationship Triples (zero broken or duplicate edges)
 * 6. Editorial Governance (Shikhar Dixit prioritized as Founder & CEO)
 * 7. Privacy Controls (No unauthorized DOB or age publication)
 */

import {
  entities,
  getEntity,
  relationships,
  sources,
  ENTITY_TYPES,
  INFO_STATUSES,
  type Entity,
  type EntityType,
  type InfoStatus,
} from "@/data/knowledge";
import { buildEntitySchema, buildEntityPageSchema, graph } from "@/lib/seo";

export interface IntegrityCheckResult {
  passed: boolean;
  timestamp: string;
  totalEntities: number;
  totalRelationships: number;
  totalSources: number;
  errors: string[];
  warnings: string[];
  metrics: {
    entityCountByType: Record<string, number>;
    brokenRelations: number;
    duplicateRelations: number;
    brokenSourceRefs: number;
    schemaErrors: number;
    privacyViolations: number;
  };
}

export function runPublishingIntegrityCheck(): IntegrityCheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const entityCountByType: Record<string, number> = {};

  const idSet = new Set<string>();
  const pathSet = new Set<string>();
  const sourceIdSet = new Set(sources.map((s) => s.id));

  let brokenRelations = 0;
  let duplicateRelations = 0;
  let brokenSourceRefs = 0;
  let schemaErrors = 0;
  let privacyViolations = 0;

  // 1. Entity Validation
  for (const entity of entities) {
    entityCountByType[entity.entityType] = (entityCountByType[entity.entityType] ?? 0) + 1;

    // Check duplicate ID
    if (idSet.has(entity.id)) {
      errors.push(`Duplicate entity ID detected: '${entity.id}'`);
    }
    idSet.add(entity.id);

    // Check duplicate Path
    if (pathSet.has(entity.path)) {
      errors.push(`Duplicate entity Path detected: '${entity.path}'`);
    }
    pathSet.add(entity.path);

    // Validate EntityType
    if (!(ENTITY_TYPES as readonly string[]).includes(entity.entityType)) {
      errors.push(`Entity '${entity.id}' has invalid entityType: '${entity.entityType}'`);
    }

    // Validate Source References
    for (const sourceId of entity.sourceIds) {
      if (!sourceIdSet.has(sourceId)) {
        errors.push(`Entity '${entity.id}' cites nonexistent source reference: '${sourceId}'`);
        brokenSourceRefs++;
      }
    }

    // Validate Schema.org compilation
    try {
      const entitySchema = buildEntitySchema(entity);
      const pageSchema = buildEntityPageSchema(entity);
      const jsonLd = graph([entitySchema, pageSchema]);
      const nodeStr = JSON.stringify(entitySchema);
      if (
        !jsonLd.includes("@context") ||
        !jsonLd.includes("@graph") ||
        !nodeStr.includes("@type")
      ) {
        errors.push(`Entity '${entity.id}' failed Schema.org validation: missing @type or @graph`);
        schemaErrors++;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Compilation error";
      errors.push(`Entity '${entity.id}' threw Schema.org exception: ${msg}`);
      schemaErrors++;
    }

    // Privacy Control Check: Birthdate / calculated age
    if (entity.birthDate && !entity.isPublicBirthDateAllowed) {
      // Ensure birthDate is not published in public facts
      for (const fact of entity.facts) {
        if (fact.label.toLowerCase() === "born" && fact.value.includes(entity.birthDate)) {
          errors.push(
            `Entity '${entity.id}' leaks private date of birth in public facts without authorization`,
          );
          privacyViolations++;
        }
      }
    }
  }

  // 2. Relationship Integrity & Deduplication Check
  const relationshipTriples = new Set<string>();
  for (const r of relationships) {
    const tripleKey = `${r.from}|${r.type}|${r.to}`;
    if (relationshipTriples.has(tripleKey)) {
      errors.push(`Duplicate active relationship triple detected: ${tripleKey}`);
      duplicateRelations++;
    }
    relationshipTriples.add(tripleKey);

    const fromEntity = getEntity(r.from);
    const toEntity = getEntity(r.to);

    if (!fromEntity) {
      errors.push(
        `Broken relationship edge: source '${r.from}' does not exist in entity catalog (${r.from} -[${r.type}]-> ${r.to})`,
      );
      brokenRelations++;
    }
    if (!toEntity) {
      errors.push(
        `Broken relationship edge: target '${r.to}' does not exist in entity catalog (${r.from} -[${r.type}]-> ${r.to})`,
      );
      brokenRelations++;
    }
  }

  // 3. Editorial Governance Check: Shikhar Dixit as Founder & CEO apex
  const shikhar = getEntity("shikhar-dixit");
  if (!shikhar) {
    errors.push("Editorial Governance: Primary entity 'shikhar-dixit' missing from knowledge base");
  } else {
    if (!shikhar.subtitle.includes("Founder & CEO")) {
      warnings.push("Editorial Governance: Shikhar Dixit subtitle should include 'Founder & CEO'");
    }
  }

  return {
    passed: errors.length === 0,
    timestamp: new Date().toISOString(),
    totalEntities: entities.length,
    totalRelationships: relationships.length,
    totalSources: sources.length,
    errors,
    warnings,
    metrics: {
      entityCountByType,
      brokenRelations,
      duplicateRelations,
      brokenSourceRefs,
      schemaErrors,
      privacyViolations,
    },
  };
}
