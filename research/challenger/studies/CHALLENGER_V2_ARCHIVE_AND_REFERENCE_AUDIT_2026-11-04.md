# Challenger v1 archival and v2 reference audit — 2026-11-04

**Owner request:** Merge PR #132, archive v1, and direct all new Challenger research and scheduled tasks to v2. **Scope:** documentation/task research cutover; no trading or calibrated v2 numeric publication.

## Provenance and current sources

- [PR #132](https://github.com/HelsingN/AI_CapEx_Reversal/pull/132) merged at 2026-11-03 23:45:42Z; merge SHA `e1c23e40bd16da389ec1fd70de7568def6fbd94e`.
- **Current:** [Docs/AI_ROI_CHALLENGER_MODEL_v2.md](../AI_ROI_CHALLENGER_MODEL_v2.md), [approved research cohort](../../data/research/challenger/challenger_v2_research_approved_cohort_2026-11-04.yaml), [v2 PIT source register](../../data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml), [cutover checklist](CHALLENGER_V2_CUTOVER_2026-11-03.md).
- **Archived:** [Docs/archive/legacy/AI_ROI_CHALLENGER_MODEL_v1.md](../archive/legacy/AI_ROI_CHALLENGER_MODEL_v1.md). Historical v1 weekly reports, original Challenger YAML, outcome reviews and prior research preserved in original paths without rewriting facts or historical cutoff.
- The v1 0–100 score and thresholds are not comparable to v2 normalized observable core. No carry-forward of 60/67.5.

## Reference and enforcement inventory

| Surface | New rule | Verification |
|---|---|---|
| README current source of truth and ROI section | v2 is current; v1 archive-only | Active documentation link checks and repo layout tests |
| .cursor/rules/documentation-consistency.mdc | New Challenger work must use v2; archive v1; preserve PIT/UNKNOWN/no-trade | Source-of-truth tests |
| config/research/ai_capex_watch_prompt_v1.txt | Historical filename retained for compatibility, **content migrated to v2** | v1 score formula removed; unit test guards prompt |
| Docs/WEEKLY_RESEARCH_CAPTURE_CONTRACT_v1.md | Legacy manifest v1 is historical, not valid for new v2 weekly data | Explicit version boundary |
| scripts/research/validate_weekly_capture.py | v1 arithmetic allowed only report_date < 2026-11-04 | New regression test; old weekly captures unchanged |
| Docs/AI_ROI_CHALLENGER_MODEL_v2.md and cutover checklist | Owner-directed research-only cutover; numeric/production gates remain separate | Current status recorded |
| ChatGPT AI CapEx Daily Close task | Existing active schedule preserved; prompt augmented with v2 PIT, bounds, no v1 bands | Task update confirmed success |
| ChatGPT AI CapEx Event Alerts task | Existing active schedule preserved; prompt augmented with v2 PIT, bounds, no v1 bands | Task update confirmed success |
| ChatGPT AI CapEx Watch weekly task | Already disabled; prompt rewritten for v2 if ever reenabled | Task update confirmed; stays disabled |
| ChatGPT Challenger v1 one-off recalc | Already disabled; renamed archived, prompt prohibits new v1 runs | Task update confirmed; stays disabled |
| Champion/Strategy, broker, trading, .github/workflows | **Unchanged** | PR diff |

## Important compatibility boundary

Some immutable **historical** research documents and YAML contain references to the old `Docs/AI_ROI_CHALLENGER_MODEL_v1.md` and past Challenger levels. These are historical provenance, not active source-of-truth instructions; their original text is not rewritten. The relocated v1 document can be found at `Docs/archive/legacy/AI_ROI_CHALLENGER_MODEL_v1.md`. A **deprecated root compatibility pointer** at `Docs/AI_ROI_CHALLENGER_MODEL_v1.md` preserves old Markdown/GitHub deep-link resolution while linking to the full archive and the current v2 method. The pointer contains no v1 scoring instructions.

**Open technical gap:** existing `data/research/weekly/requirements_v1.json` and `scripts/research/validate_weekly_capture.py` validate legacy seven-factor v1 structured observations. This PR intentionally **rejects** future dates in that schema instead of falsely validating a new v2 observation. A versioned weekly v2 capture manifest/validator (covering approved issuer roster, PIT, intervals, signed events, no v1 category) remains to be built and adopted in a dedicated follow-up PR. Until then v2 research may be published as clearly labelled dated observation and coverage with `VALIDATION_PENDING_V2_WEEKLY_SCHEMA`; not as a fully validated new weekly manifest.

**No current authoritative v2 point score** is asserted by this migration. Missing/expired issuer observations yield bounded intervals and LOW_COVERAGE. v2 calibration=UNCALIBRATED, category=null, trading_signal=false. Champion trading gates remain unchanged.

## Final merge gate for this PR

Require exact-head GitHub Actions `Python 3.11 safety and tests` PASS, explicit reviewer acceptance, and fresh base/head verification. If the PR cannot be merged, report **PERSISTENCE_PENDING** and do not claim v1 was archived in main.
