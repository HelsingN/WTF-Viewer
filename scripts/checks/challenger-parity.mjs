import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import { evaluateChallenger, observablePolicy } from "../../lib/challenger-engine.ts";
import { calculateChallenger, prepareChallengerInput, referenceCode, referencePolicy, referencePolicyPath } from "../../lib/challenger-calculation.ts";
import { codePath, readPackage } from "../../lib/research-package.ts";

const readJson = path => JSON.parse(readFileSync(path, "utf8"));
const reference = "research/challenger/reference-python/src";
for (const [file, pin] of [[codePath, referenceCode], [referencePolicyPath, referencePolicy]]) {
  assert.equal(createHash("sha256").update(readFileSync(file)).digest("hex"), pin);
}
const paths = [
  "research/reports/attachments/data/research/weekly/archive/2026-11-04/weekly_challenger_v2_2026-11-04_r1.json",
  "research/reports/attachments/data/research/weekly/weekly_challenger_v2_2026-11-11_r1.json",
  "research/proposed/pr-231/data/research/weekly/weekly_challenger_v2_2026-11-18_r1.json",
];
const vectors = [];
const add = (name, input, invalid = false) => vectors.push({ name, input, invalid });
for (const path of paths) {
  const file = readJson(path);
  add(path, file.snapshot);
  const actual = evaluateChallenger(file.snapshot);
  for (const [key, expected] of Object.entries(file.published_result)) assert.deepEqual(actual[key], expected, `${path}:${key}`);
}
for (const path of readdirSync("research/challenger/calculations").sort()) {
  const capture = readJson(join("research/challenger/calculations", path));
  add(path, capture.snapshot);
  assert.deepEqual(evaluateChallenger(capture.snapshot), capture.evaluation, path);
}
const sample = readJson(paths[1]).snapshot;
const r6 = sample.events.find(event => event.factor === "R6");
const r3 = sample.events.find(event => event.factor === "R3");
assert.ok(r6 && r3);
const variant = (name, change, invalid = false) => {
  const copy = structuredClone(sample);
  change(copy);
  add(name, copy, invalid);
};
const state = (factor, id, change = {}) => {
  const event = structuredClone(factor === "R6" ? r6 : r3);
  return { ...event, id, causal_root_id: `root-${id}`, effect_id: `effect-${id}`, first_public_at: "2026-11-04T00:00:00Z", known_public_by_at: null,
    review_by: "2027-12-20T00:00:00Z", ...change };
};
const event = (id, publication, change) => state("R6", id, {
  kind: "EVENT", first_public_at: publication, expires_at: "2027-12-20T00:00:00Z", ...change,
});
variant("all unknown", s => { for (const f of Object.values(s.core)) f.observations = {}; s.events = []; });
variant("exact with reviewed level 1 throughout", s => {
  for (const f of Object.values(s.core)) {
    const obs = Object.values(f.observations).find(o => o.level != null);
    for (const issuer of Object.keys(f.roster)) f.observations[issuer] = { ...obs, level: 1, causal_root_id: issuer };
  }
  s.events = [];
});
variant("R4 strata threshold", s => { delete s.core.R4.observations.CRWV; delete s.core.R4.observations.IREN; s.events = []; });
variant("event caps and overlap of both types", s => {
  const root = s.core.R1.observations.MSFT.causal_root_id;
  s.events = [
    state("R6", "r6-1"), state("R6", "r6-2"), state("R6", "r6-3"), state("R3", "r3-1"),
    state("R6", "overlaps-core", { causal_root_id: root, independent_effect: false }),
    state("R6", "overlaps-other-event", { causal_root_id: "root-r6-3", independent_effect: false }),
  ];
});
variant("late supersession preserves only eligible effect", s => {
  s.events = [state("R6", "old"), state("R6", "new", { supersedes: ["old"] })];
});
variant("excluded superseder cannot hide eligible effect", s => {
  const root = s.core.R1.observations.MSFT.causal_root_id;
  s.events = [state("R6", "old"), state("R6", "new", { causal_root_id: root, independent_effect: false, supersedes: ["old"] })];
});
variant("occurrence decay and source bound", s => {
  s.events = [
    event("decay-r6", "2026-09-12T06:17:14Z"),
    event("bound-event", null, { known_public_by_at: "2026-10-11T01:00:00+02:00", occurred_at: "2026-10-07T10:05:00Z",
      availability_basis: "CONSERVATIVE_KNOWN_PUBLIC_BY", publication_proof_url: "https://example.com/review" }),
    event("missing-occurrence", null, { known_public_by_at: "2026-10-11T01:00:00+02:00",
      availability_basis: "CONSERVATIVE_KNOWN_PUBLIC_BY", publication_proof_url: "https://example.com/review" }),
    event("stale-event", "2026-01-10T00:00:00Z"),
    state("R3", "stale-state", { review_by: "2026-11-11T06:17:13.999999Z" }),
    state("R3", "at-review-boundary", { review_by: "2026-11-11T06:17:14Z" }),
    state("R3", "weak-source", { confidence: "LOW" }),
  ];
});
for (const [name, date] of [
  ["review boundary", "2026-11-11T09:21:01+02:00"], ["stale reviews", "2026-12-01T00:00:00Z"],
  ["stale sources", "2028-01-01T00:00:00Z"],
]) variant(name, s => { s.as_of = date; });

variant("custom roster rounding", s => {
  s.cohort_version = "synthetic";
  const obs = s.core.R1.observations.MSFT;
  for (const factor of ["R1","R2","R4"]) s.core[factor] = {
    roster: { a: "0.34505", b: "0.65495" }, observations: { a: { ...obs, level: 1 } },
  };
  s.events = [];
});
variant("signed half-up rounding", s => {
  const e = event("r5-two-half-lives", "2026-05-15T06:17:14Z", { factor: "R5" });
  e.observable_outcome.kind = "EXECUTED_CONTRACT_AMENDMENT";
  s.events = [e];
});
variant("post-hoc labelled", s => {
  s.cohort_version = "synthetic";
  delete s.cohort_frozen_at;
  s.posthoc_replay = { mode: "POSTHOC_METHOD_REPLAY", claimed_preregistered: false, cohort_proposed_at: "2026-11-23T00:00:00Z" };
});
variant("claimed preregistered posthoc rejected", s => {
  s.cohort_version = "synthetic"; delete s.cohort_frozen_at;
  s.posthoc_replay = { mode: "POSTHOC_METHOD_REPLAY", claimed_preregistered: true, cohort_proposed_at: "2026-11-23T00:00:00Z" };
}, true);
variant("snapshot format", s => { s.schema = "wrong"; }, true);
variant("PIT no timezone", s => { s.as_of = "2026-11-11T08:17:14"; }, true);
variant("PIT calendar rollover", s => { s.as_of = "2026-02-30T08:17:14Z"; }, true);
variant("PIT lookahead core", s => {
  const o = s.core.R1.observations.MSFT;
  delete o.known_public_by_at;
  o.availability_basis = "FIRST_PUBLIC_VERIFIED";
  o.first_public_at = "2026-11-11T06:17:14.000001Z";
}, true);
variant("PIT unapproved freeze", s => { s.cohort_frozen_at = "2026-11-03T22:28:54.000001Z"; }, true);
variant("unapproved roster weights", s => { s.core.R4.roster.ORCL = "0.20"; }, true);
variant("weight not finite", s => { s.core.R4.roster.ORCL = "NaN"; }, true);
variant("fractional level", s => { s.core.R1.observations.MSFT.level = 1.25; }, true);
variant("outside roster", s => { s.core.R1.observations.OTHER = {}; }, true);
variant("future event", s => { s.events = [state("R3", "future", { first_public_at: "2028-01-01T00:00:00Z" })]; }, true);
variant("duplicate event", s => { s.events.push(s.events[0]); }, true);
variant("duplicate economic effect", s => { s.events = [state("R6", "one"), state("R6", "two", { causal_root_id: "root-one", effect_id: "effect-one" })]; }, true);
variant("wrong event type", s => { s.events = [state("R6", "wrong", { kind: "UNKNOWN" })]; }, true);
variant("invalid supersedes", s => { s.events = [state("R6", "new", { supersedes: ["absent"] })]; }, true);
variant("expiry before publication", s => { s.events = [event("bad-expiry", "2026-11-01T00:00:00Z", { expires_at: "2026-10-01T00:00:00Z" })]; }, true);
variant("qualification version", s => { s.events[0].qualification_policy = "legacy"; }, true);
variant("wrong factor rubric", s => { s.events[0].observable_outcome.kind = "EXECUTED_CONTRACT_AMENDMENT"; }, true);
variant("wrong evidence tier", s => { s.events[0].impact = "0.33"; }, true);
variant("wrong direction", s => {
  const e = s.events[0]; e.observable_outcome.direction = Number(e.impact) > 0 ? "IMPROVEMENT" : "DETERIORATION";
}, true);
variant("full impact needs corroboration", s => {
  s.events = [state("R6", "max", { impact: "-1", qualification_policy: observablePolicy })];
  s.events[0].observable_outcome = { ...s.events[0].observable_outcome, impact_basis: "REPEATED_OR_TERMINAL_CONFIRMED", direction: "IMPROVEMENT" };
  delete s.events[0].observable_outcome.corroboration_url;
}, true);

const python = spawnSync(process.env.PYTHON ?? "python3", ["-I", "-B", "-c", `
import json, sys
sys.path.insert(0, sys.argv[1])
from scoring.challenger_v2 import evaluate_challenger_v2
results = []
for case in json.load(sys.stdin):
    try:
        results.append({"value": evaluate_challenger_v2(case["input"])})
    except ValueError as exc:
        results.append({"error": str(exc)})
print(json.dumps(results, ensure_ascii=False))
`, reference], { input: JSON.stringify(vectors), encoding: "utf8", maxBuffer: 4_000_000 });
assert.equal(python.status, 0, python.stderr?.trim() || python.error?.message || "Python reference did not complete");
const expected = JSON.parse(python.stdout);
assert.equal(expected.length, vectors.length);
for (const [i, vector] of vectors.entries()) {
  assert.equal(Object.hasOwn(expected[i], "error"), vector.invalid, `${vector.name}: ${expected[i].error ?? "accepted"}`);
  if (vector.invalid) {
    assert.throws(() => evaluateChallenger(vector.input), error => error.message === expected[i].error, vector.name);
  } else {
    assert.deepEqual(evaluateChallenger(vector.input), expected[i].value, vector.name);
  }
}
const bundle = await readPackage(gunzipSync(readFileSync("public/research-package.json.gz")).toString());
const accepted = prepareChallengerInput(bundle);
assert.equal(accepted.state, "ready");
assert.equal(accepted.path, paths[1]);
const first = await calculateChallenger(accepted, accepted.cutoff, [], new Date("2026-11-22T10:00:00Z"));
const cache = [{ key: first.key, sourceSha: first.source.sha256, evaluatedAt: first.evaluated_at, asOf: first.evaluation_as_of }];
const again = await calculateChallenger(accepted, first.evaluation_as_of, cache, new Date("2026-11-23T10:00:00Z"));
assert.deepEqual(again, first);
const later = await calculateChallenger(accepted, "2028-01-01T00:00:00Z", cache);
assert.notEqual(later.key, first.key);
assert.equal(later.input_hash, first.input_hash);
assert.equal(later.result.core_coverage_pct, "0.00");
assert.equal(prepareChallengerInput({ ...bundle, snapshot: null }).state, "missing");
assert.equal(prepareChallengerInput({ ...bundle, manifest: { ...bundle.manifest, versions: { ...bundle.manifest.versions, code: "0".repeat(64) } } }).state, "unsupported");
assert.equal(prepareChallengerInput({ ...bundle, snapshot: {
  ...bundle.snapshot,
  data: { ...bundle.snapshot.data, cutoff: "2026-11-11T06:17:14.000001Z" },
} }).state, "invalid");
await assert.rejects(() => calculateChallenger(accepted, "2026-11-11T06:17:13.999999Z"), /precedes reviewed snapshot cutoff/);
console.log(`Challenger parity: ${vectors.length} full-result/error vectors, five historical artefacts, bundled input and local cache verified.`);
