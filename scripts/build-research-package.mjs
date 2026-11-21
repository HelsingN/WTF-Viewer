import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { gzipSync } from "node:zlib";
import { evaluateAt, prepareChallengerInput } from "../lib/challenger-calculation.ts";
import {
  codePath, fileDigest, maxPackageBytes, modelVersion, packageHash, packageSchema, policyVersion,
  readPackage, refSchema, repository, workspace,
} from "../lib/research-package.ts";

const [commit, ref, output, ...extra] = process.argv.slice(2);
if (!/^[a-f0-9]{40}$/.test(commit || "") || !refSchema.safeParse(ref).success || !output || extra.length) {
  throw Error("Usage: npm run research:package -- <full commit SHA> <refs/heads/branch or refs/tags/tag> <output.json[.gz]>");
}

function git(...args) {
  return execFileSync("git", args, { maxBuffer: maxPackageBytes, stdio: ["ignore", "pipe", "pipe"] });
}

const decoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });
const trackedRef = ref.replace(/^refs\/heads\//, "refs/remotes/origin/");
try {
  if (git("cat-file", "-t", commit).toString().trim() !== "commit") throw Error();
  git("show-ref", "--verify", "--", trackedRef);
  git("merge-base", "--is-ancestor", commit, trackedRef);
} catch {
  throw Error(`Commit ${commit} is not in the fetched history of ${ref}. Fetch that ref from origin first.`);
}

const committedAt = git("show", "-s", "--format=%cI", commit).toString().trim();
const tree = decoder.decode(git("ls-tree", "-rlz", commit, "--", "research")).split("\0").filter(Boolean);
let total = 0;
const files = Object.create(null);
const entries = [];
for (const row of tree) {
  const tab = row.indexOf("\t");
  const [mode, kind, blob, size] = row.slice(0, tab).trim().split(/\s+/);
  const path = row.slice(tab + 1);
  if (kind !== "blob" || mode !== "100644" && mode !== "100755") throw Error(`Unsupported research entry: ${path}`);
  total += Number(size);
  if (total > maxPackageBytes) throw Error("Research source exceeds package limit");
  const content = git("cat-file", "blob", blob);
  let encoding = "utf8";
  try {
    if (content.includes(0)) throw Error();
    files[path] = decoder.decode(content);
  } catch {
    encoding = "base64";
    files[path] = content.toString("base64");
  }
  entries.push({ path, encoding, ...await fileDigest(content) });
}
const manifest = {
  workspace,
  workspaceVersion: 1,
  target: { repository, ref, commit, committedAt },
  versions: { model: modelVersion, policy: policyVersion, code: entries.find(item => item.path === codePath)?.sha256 },
  files: entries,
};
const hash = await packageHash(manifest);
const text = JSON.stringify({ schema: packageSchema, hash, manifest, files }) + "\n";
const verified = await readPackage(text);
const calculatorInput = prepareChallengerInput(verified);
if (calculatorInput.state === "invalid") throw Error("Challenger snapshot cutoff requires an identical valid as_of");
if (calculatorInput.state === "ready") evaluateAt(calculatorInput, calculatorInput.cutoff);
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, output.endsWith(".gz") ? gzipSync(text, { level: 9 }) : text);
console.log(`${commit} · ${verified.manifest.files.length} files · ${verified.reports.length} reports · ${verified.events.length} events · SHA-256 ${hash}`);
