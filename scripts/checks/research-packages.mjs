import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import { comparePackages, fileDigest, indexPath, maxPackageBytes, packageHash, readPackage, registryPath } from "../../lib/research-package.ts";

import { readCalculation, readWorkflowEvidence } from "../../lib/research-context.ts";

const bundledBytes = readFileSync("public/research-package.json.gz");
const bundledText = gunzipSync(bundledBytes).toString();
const base = await readPackage(bundledText);
const original = JSON.parse(bundledText);
assert.equal(comparePackages(base, await readPackage(bundledText)), "same");
assert.equal(base.reports.filter(item => item.origin === "MAIN" && item.kind === "daily_report").length, 19);
assert.equal(base.reports.filter(item => item.origin === "MAIN" && item.kind === "weekly_report").length, 8);
assert.equal(base.reports.filter(item => item.origin === "PROPOSED").length, 3);
assert.equal(base.archiveNotes.length, 1);
assert.equal(base.snapshot.data.report_date, "2026-11-11");
assert.equal(base.snapshot.data.data_status, "PARTIAL");
assert.equal(base.unavailable.length, 1);
assert.equal(base.events.length, 47);

const tmp = mkdtempSync(join(tmpdir(), "wtf-package-check-"));
try {
  const priorSha = "c79e9789da299c578e76cc11a7494e3ecf127b79";
  const trackedRef = "refs/heads/develop";
  const priorPath = join(tmp, "prior.json");
  const repeatedPath = join(tmp, "bundled.json.gz");
  const build = (commit, ref, output) => execFileSync(process.execPath, [
    "--experimental-strip-types", "scripts/build-research-package.mjs", commit, ref, output,
  ], { encoding: "utf8" });
  build(priorSha, trackedRef, priorPath);
  build(base.manifest.target.commit, base.manifest.target.ref, repeatedPath);
  assert.deepEqual(readFileSync(repeatedPath), bundledBytes);
  const prior = await readPackage(readFileSync(priorPath, "utf8"));
  assert.notEqual(prior.hash, base.hash);
  assert.deepEqual(prior.events.map(event => event.id), base.events.map(event => event.id));
  assert.equal(comparePackages(prior, base), "update");
  assert.throws(() => comparePackages(base, prior), { code: "stale" });
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

async function mutate(change) {
  const pack = structuredClone(original);
  await change(pack);
  pack.hash = await packageHash(pack.manifest);
  return JSON.stringify(pack);
}

async function changeDocument(pack, path, change) {
  const doc = JSON.parse(pack.files[path]);
  await change(doc);
  pack.files[path] = JSON.stringify(doc);
  Object.assign(pack.manifest.files.find(item => item.path === path), await fileDigest(pack.files[path]));
}

function nextCommit(pack) {
  pack.manifest.target.commit = "1".repeat(40);
  pack.manifest.target.committedAt = new Date(Date.parse(pack.manifest.target.committedAt) + 1000).toISOString();
}

await assert.rejects(readPackage(await mutate(pack => { pack.files[indexPath] += " "; })), { code: "hash" });
await assert.rejects(readPackage(await mutate(pack => { delete pack.files[indexPath]; })), { code: "files" });
await assert.rejects(readPackage(await mutate(pack => { pack.manifest.versions.policy = "unknown"; })), { code: "schema" });
await assert.rejects(readPackage(await mutate(pack => { pack.schema = "unknown"; })), { code: "schema" });
await assert.rejects(readPackage(" ".repeat(maxPackageBytes + 1)), { code: "size" });
await assert.rejects(readPackage(await mutate(pack => changeDocument(pack, indexPath, doc => {
  doc.reports[0].date = "2026-02-30";
}))), { code: "schema" });
await assert.rejects(readPackage(await mutate(pack => changeDocument(pack, indexPath, doc => {
  doc.reports[0].attachments = ["research/missing.png"];
}))), { code: "files" });
await assert.rejects(readPackage(await mutate(pack => changeDocument(pack, registryPath, doc => {
  doc.events.push(doc.events[0]);
}))), { code: "conflict" });
await assert.rejects(readPackage(await mutate(pack => changeDocument(pack, registryPath, async doc => {
  const event = structuredClone(doc.events[0]);
  event.event_date = "2026-11-20";
  event.id = `EVT-20261120-${event.id.slice(-12)}`;
  doc.events.push(event);
}))), { code: "conflict" });
await assert.rejects(readPackage(await mutate(pack => changeDocument(pack, registryPath, doc => {
  doc.events[0].id = doc.events[0].id.slice(0, -12) + "000000000000";
}))), { code: "registry" });

const changed = await readPackage(await mutate(async pack => {
  nextCommit(pack);
  await changeDocument(pack, registryPath, async doc => {
    const event = doc.events[0];
    event.reviews.push({
      reviewed_at: pack.manifest.target.committedAt, reviewer: "fixture", reason: "Append-only test",
      decision: "CONTEXT_ONLY",
    });
    const event_key = "FIXTURE_EVENT_UNIQUE";
    const hash = await fileDigest(event_key);
    doc.events.push({ ...event, event_key, id: `EVT-${event.event_date.replaceAll("-", "")}-${hash.sha256.slice(0, 12).toUpperCase()}`, reviews: [event.reviews[0]] });
  });
  const path = "research/reports/attachments/fixture.png";
  const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 0, 255]);
  pack.files[path] = Buffer.from(bytes).toString("base64");
  pack.manifest.files.push({ path, encoding: "base64", ...await fileDigest(bytes) });
  await changeDocument(pack, indexPath, doc => { doc.reports[0].attachments = [path]; });
}));
assert.equal(comparePackages(base, changed), "update");
assert.equal(changed.events.length, base.events.length + 1);
assert.equal(changed.events[0].reviews.length, base.events[0].reviews.length + 1);

const historicalPath = base.manifest.files.find(item => item.path.includes("EVT-20261027-1C51396E8F19_")).path;
assert.equal(readCalculation(base, historicalPath).result.final_interval[0], "44.36");
assert.equal(readCalculation(base, base.snapshot.path).result.final_interval[0], "46.36");

const observedAt = "2026-11-18T10:04:00Z";
const differentRevision = "2".repeat(40);
const evidencePack = await readPackage(await mutate(pack => changeDocument(pack, indexPath, doc => {
  const report = doc.reports.find(item => item.source_pr === 231);
  report.workflow = {
    ci: { status: "SUCCESS", observed_at: observedAt, inspected_sha: report.source_commit },
    review: { status: "APPROVED", observed_at: observedAt, inspected_sha: differentRevision },
    merge: { status: "MERGED", inspected_sha: report.source_commit },
  };
})));
const evidence = evidencePack.reports.find(item => item.source_pr === 231);
assert.deepEqual(readWorkflowEvidence(evidence, "ci"), {
  status: "SUCCESS", priorStatus: undefined, observed_at: observedAt, inspected_sha: evidence.source_commit,
});
assert.deepEqual(readWorkflowEvidence(evidence, "review"), {
  status: "UNKNOWN", priorStatus: "APPROVED", observed_at: observedAt, inspected_sha: differentRevision,
});
assert.equal(readWorkflowEvidence(evidence, "merge").status, "UNKNOWN");

const rewritten = await readPackage(await mutate(async pack => {
  nextCommit(pack);
  await changeDocument(pack, registryPath, doc => { doc.events[0].reviews[0].reason = "Rewrite a prior review"; });
}));
assert.throws(() => comparePackages(base, rewritten), { code: "history" });
const sameShaConflict = await readPackage(await mutate(pack =>
  changeDocument(pack, indexPath, doc => { doc.reports[0].title += " changed"; })));
assert.throws(() => comparePackages(base, sameShaConflict), { code: "conflict" });
assert.equal(base.events.length, 47);
console.log("Research package checks passed: pinned bytes, revision update, no-op, stale, partial, hash/version/size/date, attachments, event identity and append-only history.");
