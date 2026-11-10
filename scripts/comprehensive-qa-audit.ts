import {
  entities,
  getEntity,
  relationships,
  sources,
  peopleEntities,
  organizationEntity,
  productEntities,
  projectEntities,
  serviceEntities,
  eventEntities,
} from "../src/data/knowledge";
import { buildEntitySchema, buildEntityPageSchema, graph } from "../src/lib/seo";

console.log("=== COMPREHENSIVE QA AUDIT ===");

// 1. Entities Audit
console.log(`\n1. Entities Total: ${entities.length}`);
console.log(`- People: ${peopleEntities.length}`);
console.log(`- Organization: 1`);
console.log(`- Products: ${productEntities.length}`);
console.log(`- Projects: ${projectEntities.length}`);
console.log(`- Services: ${serviceEntities.length}`);
console.log(`- Events: ${eventEntities.length}`);

// Check Duplicate Slugs or IDs
const idCounts = new Map<string, number>();
const pathCounts = new Map<string, number>();
for (const e of entities) {
  idCounts.set(e.id, (idCounts.get(e.id) ?? 0) + 1);
  pathCounts.set(e.path, (pathCounts.get(e.path) ?? 0) + 1);
}
const duplicateIds = [...idCounts.entries()].filter(([, c]) => c > 1);
const duplicatePaths = [...pathCounts.entries()].filter(([, c]) => c > 1);
console.log(`- Duplicate IDs: ${duplicateIds.length ? JSON.stringify(duplicateIds) : "None"}`);
console.log(
  `- Duplicate Paths: ${duplicatePaths.length ? JSON.stringify(duplicatePaths) : "None"}`,
);

// 2. Relationship Deduplication & Integrity Audit
console.log(`\n2. Relationships Total: ${relationships.length}`);
const seenTriples = new Map<string, number>();
const duplicateTriples: string[] = [];
const brokenRelations: Array<{ from: string; type: string; to: string; reason: string }> = [];

for (const r of relationships) {
  const tripleKey = `${r.from}|${r.type}|${r.to}`;
  if (seenTriples.has(tripleKey)) {
    duplicateTriples.push(tripleKey);
  }
  seenTriples.set(tripleKey, (seenTriples.get(tripleKey) ?? 0) + 1);

  const fromEntity = getEntity(r.from);
  const toEntity = getEntity(r.to);
  if (!fromEntity) {
    brokenRelations.push({
      from: r.from,
      type: r.type,
      to: r.to,
      reason: `Source entity '${r.from}' does not exist`,
    });
  }
  if (!toEntity) {
    brokenRelations.push({
      from: r.from,
      type: r.type,
      to: r.to,
      reason: `Target entity '${r.to}' does not exist`,
    });
  }
}
console.log(`- Duplicate Active Relationships: ${duplicateTriples.length}`);
if (duplicateTriples.length > 0) {
  console.log(`  Duplicates: ${JSON.stringify(duplicateTriples.slice(0, 10))}`);
}
console.log(`- Broken Relationships: ${brokenRelations.length}`);
if (brokenRelations.length > 0) {
  console.log(`  Broken: ${JSON.stringify(brokenRelations)}`);
}

// 3. Source References Audit
console.log(`\n3. Sources Total: ${sources.length}`);
const sourceIdSet = new Set(sources.map((s) => s.id));
const missingSourceRefs: Array<{ entityId: string; sourceId: string }> = [];
for (const e of entities) {
  for (const sId of e.sourceIds) {
    if (!sourceIdSet.has(sId)) {
      missingSourceRefs.push({ entityId: e.id, sourceId: sId });
    }
  }
}
console.log(`- Missing / Broken Source References: ${missingSourceRefs.length}`);
if (missingSourceRefs.length > 0) {
  console.log(`  Missing: ${JSON.stringify(missingSourceRefs)}`);
}

// 4. Schema.org Compilation Audit
console.log(`\n4. Schema.org Compilation Audit:`);
let schemaErrors = 0;
for (const e of entities) {
  try {
    const s = buildEntitySchema(e);
    const p = buildEntityPageSchema(e);
    const g = graph([s, p]);
    const nodeStr = JSON.stringify(s);
    if (!g.includes("@context") || !g.includes("@graph") || !nodeStr.includes("@type")) {
      console.log(`  Invalid schema for ${e.id}: missing @context or @type`);
      schemaErrors++;
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Schema error";
    console.log(`  Schema exception for ${e.id}: ${msg}`);
    schemaErrors++;
  }
}
console.log(`- Schema Compilation Errors: ${schemaErrors}`);

// 5. Events Analysis
console.log(`\n5. Event Entities in services-and-events.ts:`);
eventEntities.forEach((ev) => {
  console.log(`  ID: ${ev.id} | Slug: ${ev.slug} | Path: ${ev.path}`);
});

console.log("\nAudit complete!");
