import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import { chromium } from "playwright";
import { fileDigest, packageHash, readPackage } from "../../lib/research-package.ts";

const server = new URL(process.argv[2]);
assert.equal(server.hostname, "127.0.0.1", "Run this suite only against an isolated loopback Worker");
const bundled = gunzipSync(readFileSync("public/research-package.json.gz"));
const pack = await readPackage(bundled.toString());
const fixtureDir = mkdtempSync(join(tmpdir(), "wtf-reader-"));
const ref = "refs/remotes/origin/develop";
const revisions = [
  "4992b4b6e48e247a8d18460ddbbeb8849660fb89",
  "5f0a115743a952b0d4d90a974fc9e4b39bc7eae0",
];
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
for (const sha of revisions) git("merge-base", "--is-ancestor", sha, ref);
for (const sha of revisions) {
  execFileSync(process.execPath, ["scripts/build-research-package.mjs", sha, "refs/heads/develop", join(fixtureDir, sha + ".json")],
    { stdio: "inherit" });
}
const report = pack.reports.find(item => item.kind === "weekly_report" && item.date === pack.snapshot?.data.report_date && item.origin === "MAIN");
assert.ok(report);
const url = path => new URL(path, server).href;

const workspace = url("/api/workspace");
const session = {
  "oai-authenticated-user-id": "reader-release-fixture",
  "oai-authenticated-user-email": "reader-release@example.invalid",
};
assert.equal((await fetch(workspace)).status, 401);
const emptyResponse = await fetch(workspace, { headers: session });
assert.equal(emptyResponse.status, 200);
const { state } = await emptyResponse.json();
state.checklist["release-fixture"] = ["pre-existing checkpoint"];
const saved = await fetch(workspace, { method: "POST", headers: { ...session, origin: server.origin, "content-type": "application/json" },
  body: JSON.stringify({ revision: 0, state, action: "release browser fixture" }) });
assert.equal(saved.status, 200);
const previous = await (await fetch(workspace, { headers: session })).json();
assert.equal(previous.revision, 1);
assert.deepEqual(previous.state.checklist["release-fixture"], ["pre-existing checkpoint"]);

const launch = process.env.WTF_CHROMIUM_EXECUTABLE
  ? { executablePath: process.env.WTF_CHROMIUM_EXECUTABLE, args: ["--single-process", "--no-zygote", "--disable-gpu"] }
  : {};
const browser = await chromium.launch(launch);
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, acceptDownloads: true, reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url("/"));
  const button = (name, scope = page) => scope.getByRole("button", { name, exact: true });
  const input = page.locator("input[type=file]");
  const source = page.locator(".research-source");
  const dialog = page.getByRole("dialog");
  const result = page.getByRole("region", { name: "LOCAL / UNPUBLISHED" });
  async function section(name, hash) {
    const link = page.getByRole("link", { name, exact: true });
    if (!await link.isVisible()) await page.locator(".reader-nav-toggle").click();
    await link.click();
    await page.waitForFunction(expected => document.querySelector(".research-nav [aria-current]")?.hash === expected, hash);
  }
  async function choose(sha) {
    await input.setInputFiles(join(fixtureDir, sha + ".json"));
    await dialog.getByText(sha, { exact: true }).waitFor();
    await button("Открыть локальный набор", dialog).click();
    await dialog.waitFor({ state: "hidden" });
    await source.getByText(sha.slice(0, 12), { exact: true }).waitFor();
  }
  await source.getByText(pack.manifest.target.commit.slice(0, 12), { exact: true }).waitFor();
  const damaged = JSON.parse(bundled.toString());
  damaged.files[report.path] += "\nDamaged bytes";
  for (const [payload, message] of [
    [damaged, "Контрольная сумма не совпадает."],
    [{ ...damaged, schema: "unsupported" }, "Формат или версия пакета не поддерживается."],
  ]) {
    await input.setInputFiles({ name: "invalid.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(payload)) });
    await page.getByRole("alert").filter({ hasText: message }).waitFor();
    await source.getByText(pack.manifest.target.commit.slice(0, 12), { exact: true }).waitFor();
  }

  await choose(revisions[0]);
  await section("Еженедельные", "#weekly");
  await page.getByRole("searchbox").fill(report.title);
  await button(report.title).click();
  const document = page.locator("#research-file-panel");
  await document.locator(".research-markdown table").first().waitFor();
  const link = document.getByRole("link", { name: "GitHub", exact: true }).first();
  assert.equal(await link.getAttribute("href"), `https://github.com/HelsingN/WTF-Viewer/blob/${revisions[0]}/${report.path}`);
  await button("EN").click();
  assert.equal(await page.getByRole("searchbox").inputValue(), report.title);
  await document.getByRole("heading", { name: report.title, exact: true }).first().waitFor();
  await button("Close file").press("Escape");
  await page.waitForFunction(title => document.activeElement?.textContent?.trim() === title, report.title);
  const [reportCsv] = await Promise.all([page.waitForEvent("download"), button("Export reports CSV").click()]);
  assert.ok(readFileSync(await reportCsv.path(), "utf8").includes(revisions[0]));
  await button("RU").click();

  await section("Challenger", "#challenger");
  const field = page.getByRole("textbox", { name: "Дата оценки", exact: true });
  await field.fill("invalid date");
  await field.press("Enter");
  await page.getByRole("alert").filter({ hasText: "Расчёт отклонён." }).waitFor();
  await field.fill(pack.snapshot.data.cutoff);
  await field.press("Enter");
  await result.locator(".reader-score").waitFor();
  async function exportCalculation() {
    const [file] = await Promise.all([page.waitForEvent("download"), button("Скачать локальный JSON").click()]);
    return JSON.parse(readFileSync(await file.path(), "utf8"));
  }
  const calculation = await exportCalculation();
  assert.match(calculation.input_hash, /^[a-f0-9]{64}$/);
  assert.equal(calculation.source.commit, revisions[0]);
  assert.equal(calculation.result.status, pack.snapshot.data.published_result.status);
  assert.deepEqual(calculation.result.final_interval, pack.snapshot.data.published_result.final_interval);
  assert.equal(calculation.result.final_exact_score, null);
  await page.reload();
  await result.locator(".reader-score").waitFor();
  assert.deepEqual(await exportCalculation(), calculation);

  await choose(revisions[1]);
  await page.reload();
  await source.getByText(revisions[1].slice(0, 12), { exact: true }).waitFor();
  await result.locator(".reader-score").waitFor();
  assert.equal((await exportCalculation()).source.commit, revisions[1]);
  for (const width of [1440, 1280, 768, 640, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, hash] of [["Обзор", "#overview"], ["Challenger", "#challenger"], ["Реестр событий", "#events"], ["Макроанализ", "#macro"]]) {
      await section(name, hash);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${hash} at ${width}`);
    }
  }
  assert.equal(await page.locator(".reader-primary").evaluate(el => getComputedStyle(el).transitionDuration), "0s");
  assert.deepEqual(errors, []);

  const markdown = JSON.parse(bundled.toString());
  markdown.files[report.path] += '\n\n<div data-test-raw>Raw fixture</div>\n\n[Email fixture](mailto:fixture@example.invalid)\n\n![Excluded image](https://example.invalid/example.png)\n\n[Primary source fixture](https://www.sec.gov/)\n';
  const manifestFile = markdown.manifest.files.find(item => item.path === report.path);
  Object.assign(manifestFile, await fileDigest(markdown.files[report.path]));
  const safe = await browser.newPage();
  const external = [];
  safe.on("request", request => { if (new URL(request.url()).origin !== server.origin) external.push(request.url()); });
  await safe.goto(url("/#weekly"));
  await safe.getByRole("button", { name: report.title, exact: true }).waitFor();
  markdown.manifest.target.commit = "a".repeat(40);
  markdown.manifest.target.committedAt = "2026-12-01T00:00:00Z";
  markdown.hash = await packageHash(markdown.manifest);
  await safe.locator("input[type=file]").setInputFiles({ name: "markdown-fixture.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(markdown)) });
  await safe.getByRole("dialog").getByRole("button", { name: "Открыть локальный набор", exact: true }).click();
  await safe.getByRole("dialog").waitFor({ state: "hidden" });
  await safe.getByRole("button", { name: report.title, exact: true }).click();
  const reader = safe.locator(".research-markdown");
  await reader.getByRole("link", { name: "Primary source fixture", exact: true }).waitFor();
  assert.equal(await reader.locator("[data-test-raw], img, a[href^=mailto]").count(), 0);
  assert.deepEqual(external, []);
  assert.deepEqual(await (await fetch(workspace, { headers: session })).json(), previous);
  assert.equal((await fetch(workspace)).status, 401);
  console.log("Reader, import, calculation cache, responsive layout, Markdown and local D1 continuity passed.");
} finally {
  await browser.close();
  rmSync(fixtureDir, { recursive: true, force: true });
}
