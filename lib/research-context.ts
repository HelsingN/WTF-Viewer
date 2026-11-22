import type { ResearchPackage } from "./research-package.ts";

export type ResearchFields = Record<string, unknown>;

export function fields(value: unknown): ResearchFields {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as ResearchFields : {};
}

export function records(value: unknown) {
  return Array.isArray(value) ? value.map(fields).filter(item => Object.keys(item).length > 0) : [];
}

export function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && Boolean(item.trim())) : [];
}

export function display(value: unknown): string {
  return typeof value === "number" && Number.isFinite(value) || typeof value === "string" && value.trim()
    ? String(value) : "UNKNOWN";
}

export function interval(value: unknown) {
  return Array.isArray(value) && value.length === 2 && value.every(item => display(item) !== "UNKNOWN")
    ? value.map(display).join(" – ") : "UNKNOWN";
}

export function researchJson(pack: ResearchPackage, path: string) {
  if (pack.entries.get(path)?.encoding !== "utf8") return {};
  try {
    return fields(JSON.parse(pack.files[path]));
  } catch {
    return {};
  }
}

export function artifactOrigin(pack: ResearchPackage, path: string) {
  if (path.startsWith("research/proposed/") || pack.original.get(path)?.origin === "PROPOSED") return "PROPOSED";
  return path.startsWith("research/archive/") || path.includes("/archive/") ? "ARCHIVED" : "MAIN";
}

export function isCalculation(path: string) {
  return /^research\/challenger\/calculations\/.+\.json$/.test(path) || /\/weekly_challenger_v2_[\d-]+_r\d+\.json$/.test(path);
}

export function readCalculation(pack: ResearchPackage, path: string) {
  const artifact = researchJson(pack, path);
  const snapshot = fields(artifact.snapshot);
  const result = artifact.schema === "ai-capex.weekly-challenger-v2.v1" ? fields(artifact.published_result)
    : artifact.schema === "ai-capex.challenger-v2.event-recalculation.v1" ? fields(artifact.evaluation) : undefined;
  if (!result || !Object.keys(result).length) return;
  return { artifact, snapshot, result, asOf: artifact.cutoff ?? result.as_of ?? snapshot.as_of };
}

export function readWorkflowEvidence(report: ResearchPackage["reports"][number], key: "ci" | "review" | "merge") {
  const evidence = report.workflow?.[key];
  if (!evidence) return { status: "UNKNOWN", observed_at: undefined, inspected_sha: undefined, priorStatus: undefined };
  const status = report.source_commit === evidence.inspected_sha ? evidence.status : "UNKNOWN";
  return { ...evidence, status, priorStatus: status === "UNKNOWN" && evidence.status !== "UNKNOWN" ? evidence.status : undefined };
}
