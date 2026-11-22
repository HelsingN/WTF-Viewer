# Challenger v2.1 — control replay and current-snapshot readiness (2026-11-10)

## Verified run
- Source: GitHub Actions workflow run [42867792858](https://github.com/HelsingN/AI_CapEx_Reversal/actions/runs/42867792858), commit `9357db1efe4d6e846e90659c5fc8c07a73ca340b` (pre-merge PR #185).
- Workflow: **SUCCESS**; event registrar output: `{"events":35,"qualified_current":2,"recalculations_written":[],"status":"VALIDATED"}`.
- Tests: **654 passed, 1 warning**.
- This establishes a validated **event-registry replay**, not a fresh current numerical score.

## Event impact
- Nov 5: BLS productivity `MACRO_ONLY`; semiconductor market selloff `CONTEXT_ONLY`.
- Nov 6: BLS employment `MACRO_ONLY`; TeraWulf paid HPC capacity `R6 EARLY_WARNING` (not QUALIFIED).
- No new QUALIFIED event in the Nov 5–6 records. Two pre-existing QUALIFIED events remain. Do not count R6 early warning as scored or invent an overlay.

## Current snapshot gate
- As of this audit, `Docs/research/AI_CAPEX_DAILY_CLOSE_2026-11-09.md` and `Docs/research/AI_CAPEX_DAILY_CLOSE_2026-11-10.md` were **absent from main**. The Nov 9 report exists in draft PR #180 and is not a reconciled, approved current data source.
- The one-off script `scripts/research/one_off_challenger_v2_full_recalculation.py` is pinned to Nov 4 research evidence, including exact as-of review gates. Its historical bounded interval is **not** a verified Nov 10 score.
- **Decision: NO_CURRENT_V2_SCORE / UNCALIBRATED / NO_TRADE.** Do not roll the Nov 4 interval forward as though independently remeasured.

## Next bounded action
1. Reconcile Nov 9 and Nov 10 Daily Close event registries, with PIT source checks, without retroactive event changes.
2. Check fresh, approved issuer observations for fixed R1/R2/R4 cohort; record explicit UNKNOWN for missing observations.
3. Only then run the current numerical snapshot and compare against Nov 4 historical baseline; no numerical score when gates fail.

This audit records an observed CI result; it does not claim a new calculation or change trading status.
