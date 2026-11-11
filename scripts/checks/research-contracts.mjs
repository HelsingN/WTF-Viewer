import assert from 'node:assert/strict';
import fs from 'node:fs';
import { calcRow, emptyWorkspace, isAppendOnly, reportReady, gates } from '../../lib/workspace.ts';

// Synthetic fixtures only; no research data is required to verify these rules.
assert.equal(reportReady([], 'COMPLETE'), false);
assert.equal(reportReady(gates, 'COMPLETE'), true);
assert.equal(reportReady(gates.slice(1), 'COMPLETE'), false);
assert.equal(reportReady(gates, 'PARTIAL'), false);
const old = emptyWorkspace();
old.reviews.push({ id: 'synthetic-review' });
assert.equal(isAppendOnly(old, emptyWorkspace()), false);
assert.equal(isAppendOnly(old, { ...old, reviews: [...old.reviews, { id: 'second' }] }), true);
assert.equal(isAppendOnly(old, { ...old, reviews: [{ id: 'rewritten' }] }), false);
const good = {
  cutoff: '2026-01-01T00:00:00Z',
  published_result: {
    calibration: 'UNCALIBRATED', trading_signal: false,
    final_exact_score: null, final_interval: [20, 40],
    core_factors: { R2: { exact_level: null } },
    event_adjustments: { R3: 0, R5: 0, R6: 0, R7: 0 },
  },
};
assert.equal(calcRow(good).result.final_exact_score, null);
assert.equal(calcRow(good).result.core_factors.R2.exact_level, null);
for (const key of ['R3', 'R5', 'R6', 'R7']) {
  const missing = structuredClone(good);
  delete missing.published_result.event_adjustments[key];
  assert.throws(() => calcRow(missing), /Required components absent/);
}
const dateless = structuredClone(good); delete dateless.cutoff;
assert.throws(() => calcRow(dateless), /cutoff missing/);
const invalid = structuredClone(good); invalid.published_result.final_interval = [80, 20];
assert.throws(() => calcRow(invalid), /Invalid calculation interval/);
const tradable = structuredClone(good); tradable.published_result.trading_signal = true;
assert.throws(() => calcRow(tradable), /Research-only fields missing/);
const seed = JSON.parse(fs.readFileSync(new URL('../../lib/seed.json', import.meta.url), 'utf8'));
for (const key of ['events', 'history', 'reports', 'daily', 'prs']) assert.deepEqual(seed[key], []);
assert.deepEqual(seed.unresolved, {});
assert.deepEqual(seed.macro.rows, []);
assert.equal(seed.sha, '');
console.log('Research contracts passed: explicit unknowns, missing-factor rejection, append-only reviews, report gates, empty public dataset.');
