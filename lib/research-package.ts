import { z } from "zod";

export const packageSchema = "wtf-viewer.research-package.v1";
export const repository = "HelsingN/WTF-Viewer";
export const migrationPath = "research/migration-manifest.json";
export const indexPath = "research/report-index.json";
export const registryPath = "research/challenger/events/challenger_v2_event_registry.json";
export const modelPath = "research/challenger/model/AI_ROI_CHALLENGER_MODEL_v2.md";
export const policyPath = "research/challenger/policy/CHALLENGER_V2_EVENT_POLICY_V2_1.md";
export const cohortPath = "research/challenger/inputs/challenger_v2_research_approved_cohort_2026-11-04.yaml";
export const codePath = "research/challenger/reference-python/src/scoring/challenger_v2.py";
export const modelVersion = "CHALLENGER_V2_RESEARCH_APPROVED_2026-11-04";
export const policyVersion = "OBSERVABLE_EVENT_QUALIFICATION_V2_1";
export const workspace = "ai-capex-signals";
export const bundledPackageUrl = "/research-package.json.gz";
export const maxPackageBytes = 10_000_000;

const encoder = new TextEncoder();
const sha = z.string().regex(/^[0-9a-f]{40}$/);
const digest = z.string().regex(/^[0-9a-f]{64}$/);
const label = z.string().trim().min(1);
const day = z.string().refine(value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(+date) && date.toISOString().slice(0, 10) === value;
}, "Expected a calendar date");
const time = z.string().datetime({ offset: true }).refine(value =>
  day.safeParse(value.slice(0, 10)).success && Number.isFinite(Date.parse(value))
  && /(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.test(value), "Expected a timezone-aware timestamp");
const path = z.string().max(500).regex(/^research\/(?:[\w.-]+\/)*[\w.-]+$/)
  .refine(value => value.split("/").every(part => part !== "." && part !== ".."), "Invalid research path");
export const refSchema = z.string().regex(/^refs\/(?:heads|tags)\/[\w./-]+$/)
  .refine(value => !value.includes("..") && !value.includes("//")
    && value.split("/").every(part => !part.startsWith(".") && !part.endsWith(".") && !part.endsWith(".lock")));
const origin = z.enum(["MAIN", "PROPOSED", "ARCHIVED"]);
const link = z.discriminatedUnion("resolution", [
  z.object({ resolution: z.literal("target"), link: label, target_path: path, fragment: z.string().nullable() }),
  z.object({ resolution: z.literal("source_archive"), link: label, source_url: z.string().startsWith("https://") }),
  z.object({ resolution: z.literal("unavailable_in_snapshot"), link: label, source_path: label }),
]);

const manifestSchema = z.object({
  workspace: z.literal(workspace),
  workspaceVersion: z.literal(1),
  target: z.object({ repository: z.literal(repository), ref: refSchema, commit: sha, committedAt: time }).strict(),
  versions: z.object({ model: z.literal(modelVersion), policy: z.literal(policyVersion), code: digest }).strict(),
  files: z.array(z.object({
    path, encoding: z.enum(["utf8", "base64"]), sha256: digest,
    bytes: z.number().int().min(0).max(maxPackageBytes),
  }).strict()).min(1).max(2000),
}).strict();
const payloadSchema = z.object({
  schema: z.literal(packageSchema),
  hash: digest,
  manifest: manifestSchema,
  files: z.record(path, z.string()),
}).strict();
export type PackageManifest = z.infer<typeof manifestSchema>;

const migrationSchema = z.object({
  schema: z.literal("wtf-viewer.research-migration.v1"),
  files: z.array(z.object({
    target_path: path, sha256: digest, bytes: z.number().int().nonnegative(), git_blob_sha: sha,
    source_repository: z.literal("HelsingN/AI_CapEx_Reversal"), source_commit: sha, source_path: label,
    source_ref: label, origin: z.enum(["MAIN", "PROPOSED"]), type: label, links: z.array(link).default([]),
  })).max(2000),
});
const kind = z.enum(["daily_report", "weekly_report"]);
const reportSchema = z.object({
  kind, date: day, title: label, path, origin,
  source_path_id: label.nullish(), source_commit: sha.nullish(),
  source_pr: z.number().int().positive().nullish(), source_pr_state: label.nullish(),
  cutoff_text_from_source: label.nullish(), status_text_from_source: label.nullish(),
  attachments: z.array(path).max(200).default([]),
});
const reportIndexSchema = z.object({
  schema: z.literal("wtf-viewer.report-index.v1"),
  reports: z.array(reportSchema).max(2000),
  archive_notes: z.array(z.object({ period: day, kind, status: label, path })).max(2000),
});
export type Report = z.infer<typeof reportSchema>;

const review = z.object({
  id: label.optional(), reviewed_at: time, reviewer: label, reason: label,
  decision: z.enum(["PENDING_REVIEW", "CORE_ONLY", "PHYSICAL_ONLY", "MACRO_ONLY", "NOT_QUALIFIED_CLOSED",
    "CONTEXT_ONLY", "EARLY_WARNING", "QUALIFIED", "EXCLUDED_DUPLICATE", "EXCLUDED_OUT_OF_SCOPE"]),
  factor: label.nullish(),
}).passthrough();
const event = z.object({
  id: z.string().regex(/^EVT-\d{8}-[A-F0-9]{12}$/),
  event_key: z.string().regex(/^[A-Z0-9][A-Z0-9_-]{5,119}$/),
  event_date: day, registered_at: time, entity: label, title: label,
  priority: z.enum(["HIGH", "CRITICAL"]),
  source_refs: z.array(label).min(1),
  source_precision: z.enum(["FIRST_PUBLIC_VERIFIED", "CONSERVATIVE_KNOWN_PUBLIC_BY"]),
  first_public_at: time.nullish(), known_public_by_at: time.nullish(),
  reviews: z.array(review).min(1).max(1000),
}).passthrough();
const registrySchema = z.object({
  schema: z.literal("ai-capex.challenger-v2.event-registry.v1"),
  events: z.array(event).max(10_000),
});

const snapshotSchema = z.object({
  schema: z.literal("ai-capex.weekly-challenger-v2.v1"),
  model_version: z.literal(modelVersion),
  report_date: day, cutoff: time, captured_at: time,
  data_status: z.enum(["COMPLETE", "PARTIAL"]),
  review_status: label,
  snapshot: z.object({
    schema: z.literal("ai-capex.challenger-observable.v2-draft"),
    as_of: time,
    cohort_frozen_at: time,
    cohort_version: z.literal(modelVersion),
    core: z.object({ R1: z.object({}).passthrough(), R2: z.object({}).passthrough(), R4: z.object({}).passthrough() }).strict(),
    events: z.array(z.object({}).passthrough()),
  }).passthrough(),
  published_result: z.object({ calibration: z.literal("UNCALIBRATED"), trading_signal: z.literal(false) }).passthrough(),
  unresolved: z.record(z.object({}).passthrough()),
});

export class PackageError extends Error {
  readonly code: "size" | "json" | "schema" | "hash" | "files" | "registry" | "history" | "stale" | "conflict";

  constructor(code: PackageError["code"], detail?: string) {
    super(detail ? `${code}: ${detail}` : code);
    this.code = code;
  }
}

function parse<T>(schema: z.ZodType<T, z.ZodTypeDef, unknown>, value: unknown, context: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new PackageError("schema", `${context} ${issue.path.join(".")}: ${issue.message}`);
  }
  return result.data;
}

function json(text: string, context: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    throw new PackageError("json", context);
  }
}

function unique<T>(items: readonly T[], key: (item: T) => string, context: string) {
  const ids = new Set<string>();
  for (const item of items) {
    const id = key(item);
    if (ids.has(id)) throw new PackageError("conflict", `${context}: ${id}`);
    ids.add(id);
  }
}

export function canonical(value: unknown, depth = 0): string {
  if (depth > 64) throw new PackageError("schema", "excessive nesting");
  if (Array.isArray(value)) return `[${value.map(item => canonical(item, depth + 1)).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
      .map(([key, item]) => `${JSON.stringify(key)}:${canonical(item, depth + 1)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function decodeBase64(content: string): Uint8Array<ArrayBuffer> {
  try {
    const decoded = atob(content);
    if (btoa(decoded) !== content) throw Error();
    return Uint8Array.from(decoded, character => character.charCodeAt(0));
  } catch {
    throw new PackageError("files", "invalid base64 attachment");
  }
}

export async function fileDigest(content: string | Uint8Array<ArrayBuffer>) {
  const bytes = typeof content === "string" ? encoder.encode(content) : content;
  const buffer = await crypto.subtle.digest("SHA-256", bytes);
  const sha256 = Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join("");
  return { bytes: bytes.length, sha256 };
}

export async function packageHash(manifest: PackageManifest) {
  return (await fileDigest(canonical(manifest))).sha256;
}

export function targetLink(commit: string, path?: string) {
  const base = `https://github.com/${repository}`;
  return path ? `${base}/blob/${commit}/${path.split("/").map(encodeURIComponent).join("/")}` : `${base}/commit/${commit}`;
}

async function validateRegistry(text: string) {
  const { events } = parse(registrySchema, json(text, registryPath), registryPath);
  unique(events, entry => entry.id, "event ID");
  unique(events, entry => entry.event_key, "event key");

  await Promise.all(events.map(async entry => {
    const { sha256 } = await fileDigest(entry.event_key);
    const expected = `EVT-${entry.event_date.replaceAll("-", "")}-${sha256.slice(0, 12).toUpperCase()}`;
    const published = entry.first_public_at || entry.known_public_by_at;
    if (entry.id !== expected || !published || Boolean(entry.first_public_at) === Boolean(entry.known_public_by_at)
      || entry.source_precision !== (entry.first_public_at ? "FIRST_PUBLIC_VERIFIED" : "CONSERVATIVE_KNOWN_PUBLIC_BY")
      || Date.parse(published) > Date.parse(entry.registered_at)) {
      throw new PackageError("registry", entry.id);
    }
    let previous = -Infinity;
    for (const item of entry.reviews) {
      const reviewed = Date.parse(item.reviewed_at);
      if (reviewed < Date.parse(entry.registered_at) || reviewed <= previous) {
        throw new PackageError("history", entry.id);
      }
      previous = reviewed;
    }
  }));
  unique(events.flatMap(entry => entry.reviews).filter(item => item.id), item => item.id!, "review ID");
  return events;
}

export async function readPackage(text: string) {
  if (text.length > maxPackageBytes || encoder.encode(text).length > maxPackageBytes) throw new PackageError("size");
  const { hash, manifest, files } = parse(payloadSchema, json(text, "package"), "package");
  if (await packageHash(manifest) !== hash) throw new PackageError("hash", "manifest");
  unique(manifest.files, entry => entry.path, "file path");
  const entries = new Map(manifest.files.map(entry => [entry.path, entry]));
  function required(key: string, textOnly = true) {
    if (!entries.has(key) || !Object.hasOwn(files, key) || textOnly && entries.get(key)?.encoding !== "utf8") throw new PackageError("files", key);
    return files[key];
  }

  if (Object.keys(files).some(key => !entries.has(key))) throw new PackageError("files", "undeclared content");
  await Promise.all(manifest.files.map(async entry => {
    const content = required(entry.path, false);
    const actual = await fileDigest(entry.encoding === "base64" ? decodeBase64(content) : content);
    if (entry.sha256 !== actual.sha256 || entry.bytes !== actual.bytes) throw new PackageError("hash", entry.path);
  }));
  if (manifest.versions.code !== entries.get(codePath)?.sha256
    || !required(policyPath).includes(`\`${policyVersion}\``)
    || !required(modelPath).trim()
    || !required(cohortPath).split(/\r?\n/).includes(`version: ${modelVersion}`)) throw new PackageError("schema", "model/policy/code");

  const migration = parse(migrationSchema, json(required(migrationPath), migrationPath), migrationPath);
  unique(migration.files, item => item.target_path, "migration target");
  const original = new Map(migration.files.map(item => [item.target_path, item]));
  for (const item of original.values()) required(item.target_path, false);
  const { reports, archive_notes: archiveNotes } = parse(reportIndexSchema, json(required(indexPath), indexPath), indexPath);
  unique([...reports, ...archiveNotes], item => item.path, "report path");
  unique(reports.filter(report => report.origin === "MAIN"), report => `${report.kind}/${report.date}`, "main report period");
  for (const item of [...reports, ...archiveNotes]) {
    if (!item.path.endsWith(".md") || !required(item.path).trim()) throw new PackageError("files", item.path);
  }
  for (const report of reports) {
    const previous = original.get(report.path);
    if (report.origin === "PROPOSED" && (!report.source_pr || !report.source_commit
      || !report.path.startsWith(`research/proposed/pr-${report.source_pr}/`))
      || report.origin !== "PROPOSED" && report.path.startsWith("research/proposed/")
      || previous && previous.sha256 === entries.get(report.path)?.sha256
        && report.source_commit !== previous.source_commit) {
      throw new PackageError("conflict", report.path);
    }
    unique(report.attachments, item => item, "report attachment");
    for (const attachment of report.attachments) required(attachment, false);
  }

  const events = await validateRegistry(required(registryPath));
  const snapshots = manifest.files
    .filter(item => /^research\/reports\/attachments\/.*\/weekly_challenger_v2_[\d-]+_r\d+\.json$/.test(item.path)
      && !item.path.includes("/archive/"))
    .map(item => ({ path: item.path, data: parse(snapshotSchema, json(required(item.path), item.path), item.path) }))
    .sort((a, b) => Date.parse(b.data.cutoff) - Date.parse(a.data.cutoff) || Date.parse(b.data.captured_at) - Date.parse(a.data.captured_at));
  const snapshot = snapshots[0] ?? null;
  for (const item of snapshots) {
    if (Date.parse(item.data.cutoff) !== Date.parse(item.data.snapshot.as_of)
      || Date.parse(item.data.snapshot.cohort_frozen_at) > Date.parse(item.data.cutoff)
      || Date.parse(item.data.captured_at) < Date.parse(item.data.cutoff)) {
      throw new PackageError("schema", item.path);
    }
  }

  const unavailable = migration.files.flatMap(item => item.links.filter(edge =>
    edge.resolution === "unavailable_in_snapshot" || edge.resolution === "target" && !entries.has(edge.target_path)));
  return { hash, manifest, files, entries, original, reports, archiveNotes, events, snapshot, unavailable };
}

export type ResearchPackage = Awaited<ReturnType<typeof readPackage>>;

export function comparePackages(current: ResearchPackage, candidate: ResearchPackage) {
  if (candidate.hash === current.hash) return "same";
  if (candidate.manifest.target.commit === current.manifest.target.commit) {
    // The same commit can be assembled under a different branch/tag name.
    const { target: a, ...left } = candidate.manifest;
    const { target: b, ...right } = current.manifest;
    if (a.committedAt === b.committedAt && canonical(left) === canonical(right)) return "same";
    throw new PackageError("conflict", candidate.manifest.target.commit);
  }
  if (Date.parse(candidate.manifest.target.committedAt) < Date.parse(current.manifest.target.committedAt)) {
    throw new PackageError("stale", candidate.manifest.target.commit);
  }

  const incoming = new Map(candidate.events.map(entry => [entry.event_key, entry]));
  for (const old of current.events) {
    const next = incoming.get(old.event_key);
    if (!next || next.id !== old.id || old.reviews.some((item, i) =>
      !next.reviews[i] || canonical(item) !== canonical(next.reviews[i]))) {
      throw new PackageError("history", old.id);
    }
  }
  return "update";
}
