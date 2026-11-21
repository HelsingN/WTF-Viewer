import { evaluateChallenger, timestamp, utcTimestamp } from "./challenger-engine.ts";
import { canonical, fileDigest } from "./research-package.ts";
import type { ResearchPackage } from "./research-package.ts";

export const calculatorVersion = "wtf-viewer.challenger.v1";
export const referenceCode = "56a6667fca94ab3df18380bf49af72311930285aaf6a2017345f3bda57336722";
export const referencePolicy = "a5917c846a0ed022a403dc2e62a417b2be86a620900378b6fe7c209a81be2dd6";
export const referencePolicyPath = "research/challenger/reference-python/src/scoring/challenger_v2_event_policy.py";

export function prepareChallengerInput(pack: ResearchPackage) {
  const { snapshot, manifest, entries } = pack;
  if (!snapshot) return { state: "missing" } as const;
  const policySha = entries.get(referencePolicyPath)?.sha256;
  if (manifest.versions.code !== referenceCode || policySha !== referencePolicy) return { state: "unsupported" } as const;
  if (snapshot.data.snapshot.posthoc_replay != null) return { state: "posthoc" } as const;
  try {
    if (timestamp(snapshot.data.cutoff, "snapshot cutoff") !== timestamp(snapshot.data.snapshot.as_of, "snapshot as_of")) {
      return { state: "invalid" } as const;
    }
  } catch {
    return { state: "invalid" } as const;
  }
  const fileSha = entries.get(snapshot.path)?.sha256;
  if (!fileSha) return { state: "missing" } as const;
  return {
    state: "ready",
    snapshot: snapshot.data.snapshot,
    cutoff: snapshot.data.cutoff,
    path: snapshot.path,
    sourceSha: fileSha,
    commit: manifest.target.commit,
    packageHash: pack.hash,
    versions: {
      model: manifest.versions.model, policy: manifest.versions.policy, code: manifest.versions.code,
      policyCode: policySha, calculator: calculatorVersion,
    },
  } as const;
}

type Input = Extract<ReturnType<typeof prepareChallengerInput>, { state: "ready" }>;
export type CalculationCache = { key: string; asOf: string; evaluatedAt: string; sourceSha: string };

export function evaluateAt(input: Input, requestedAsOf: string) {
  const asOf = timestamp(requestedAsOf.trim(), "evaluation_as_of");
  const cutoff = timestamp(input.cutoff, "snapshot cutoff");
  if (asOf === null || cutoff === null) throw Error("evaluation_as_of required");
  if (asOf < cutoff) throw Error("evaluation_as_of precedes reviewed snapshot cutoff");
  const normalized = utcTimestamp(asOf);
  return { asOf: normalized, result: evaluateChallenger({ ...input.snapshot, as_of: normalized }) };
}

export async function calculateChallenger(input: Input, requestedAsOf: string, cache: readonly CalculationCache[] = [], now = new Date()) {
  const { asOf, result } = evaluateAt(input, requestedAsOf);
  const { sha256: inputHash } = await fileDigest(canonical(input.snapshot));
  const { sha256: key } = await fileDigest(canonical({ inputHash, ...input.versions, asOf }));
  const cached = cache.find(entry => entry.key === key && entry.sourceSha === input.sourceSha);
  const evaluatedAt = cached?.evaluatedAt ?? now.toISOString();
  return {
    schema: "wtf-viewer.challenger-calculation.v1",
    publication_status: "LOCAL/UNPUBLISHED",
    key, input_hash: inputHash, evaluation_as_of: asOf, evaluated_at: evaluatedAt,
    source: { package_hash: input.packageHash, commit: input.commit, path: input.path, sha256: input.sourceSha, cutoff: input.cutoff },
    versions: input.versions, result,
  };
}

export type LocalCalculation = Awaited<ReturnType<typeof calculateChallenger>>;
