# Challenger v2 weekly capture contract (research-only)

**Effective:** 2026-11-04 for new weekly AI CapEx Watch reports. **Current event qualification:** [v2.1 policy](CHALLENGER_V2_EVENT_POLICY_V2_1.md) (`OBSERVABLE_EVENT_QUALIFICATION_V2_1`) is mandatory for new R3/R5/R6/R7 reviews. Legacy event policy is archive-only. **Owner issue:** [#140](https://github.com/HelsingN/AI_CapEx_Reversal/issues/140). **Model:** [Challenger v2](AI_ROI_CHALLENGER_MODEL_v2.md). **Prior approved one-time calculation:** [4 November initial full reassessment](research/CHALLENGER_V2_FULL_RECALCULATION_2026-11-04.md). The previous [v1 weekly contract](WEEKLY_RESEARCH_CAPTURE_CONTRACT_v1.md) and original dated v1 report captures remain immutable and historically valid only.

## Principle

A new weekly Challenger calculation is accepted **only** as research evidence with frozen issuer cohort, source publication times, expiry, explicit missingness and fully reproducible **interval arithmetic**, never as the old v1 60/67.5 or HEALTHY/WATCH/ALERT category. Do not assume a prior exact result is current. Do not invent observations, zero-fill UNKNOWN, backdate cohort selection, double count finance/CapEx news, or silently promote a research number to a trading decision.

**This schema is a validation contract, not an auto-data collector.** It does not fetch external APIs, open trades, create recurring Challenger jobs or activate any Champion strategy. It validates future reports as they are committed.

## File / schema / time

- One report: `Docs/research/AI_CAPEX_WEEKLY_WATCH_YYYY-MM-DD.md`, including the text **Challenger v2**, dated observations and coverage.
- One or more revision manifests: `data/research/weekly/weekly_challenger_v2_YYYY-MM-DD_rN.json` (N >= 1); schema `ai-capex.weekly-challenger-v2.v1`. Every revision remains independently valid; no deletion of original history.
- The manifest contains `report_date`, timezone-aware `cutoff`, timezone-aware `captured_at`, `last_completed_us_session`, `mode` (CONTEMPORANEOUS or LATE_RECONSTRUCTION), relative `report` path, `source_refs` and `trading_authority=NONE`.
- The approved fixed `model_version=CHALLENGER_V2_RESEARCH_APPROVED_2026-11-04`, `snapshot.cohort_frozen_at=2026-11-03T22:28:54Z` and `snapshot.as_of==cutoff` are mandatory. The published reporting/capture time must be after cutoff; no retrospective move of approval time.
- `snapshot` is the input structure for the **existing** `src/scoring/challenger_v2.py:evaluate_challenger_v2`; R1 and R2 each fixed to MSFT/GOOGL/AMZN/META/ORCL, weight 20% each; R4 fixed to those five at 10% each plus CRWV and IREN at 25% each.
- Scores, `core_factors`, `final_interval`, `core_interval`, `status`, `core_coverage_pct`, signed event adjustments, `calibration`, `category`, `final_exact_score` and `trading_signal` must match the independent evaluator output **exactly** through `published_result`. Research has `category=null`, `calibration=UNCALIBRATED`, `trading_signal=false`. Numerical point estimates permitted only by evaluator if *every* issuer input is accepted and no unknown bounds remain; this is not classification or trading authority.
- Evaluator checks core source/provenance, first-public or conservative known-public-by, expiry, issuer coverage/strata, positive/negative event eligibility, age, confidence, effect IDs, supersession and no double counting. Those validations are **mechanical eligibility**, not an independent audit of a filing's truth.

**Independent event-register reference:** [Challenger v2 HIGH/CRITICAL event workflow](CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md) binds every saved daily priority event to a stable ID, review outcome and, when QUALIFIED, a persisted point-in-time v2 recalculation. A HIGH/CRITICAL priority is not itself an admissible event adjustment. The event registry validator must pass alongside this weekly capture validator.

## Mandatory unresolved + two-sided review

- `unresolved` must contain **exactly** one keyed record for every issuer slot emitted by the evaluator under `core_factors.<R>.missing_or_stale`, e.g. `R4/MSFT`; an entry requires `reason`, `sources_checked` (real URL or existing repo file), `owner`, `note`, `next_action` and `next_review`. A missing level never becomes 0 or a neutral 1.
- `event_assessments` must name **all R3/R5/R6/R7** and distinguish `ASSESSED_NO_QUALIFIED_EVENT`, `ASSESSED_WITH_EVENTS`, and `UNKNOWN`. Each has `reviewed_at`, **`latest_source_public_by_at` (must be <= cutoff)**, source references and a substantive `counterevidence` field; UNKNOWN also needs `next_action`. No qualified event is **not** evidence of zero financial risk. A used factor must have at least one scored event and a non-overlapping causal root.
- `physical` must separately name **P1–P4**, each `OBSERVED`, `ASSESSED` or `UNKNOWN`, with source, **`latest_source_public_by_at` <= cutoff**, and explanatory note; non-UNKNOWN needs an `observed_at` time before cutoff; UNKNOWN requires next action. No P category is added to the numeric Challenger core.
- `data_status=PARTIAL` is required if any issuer, physical field or event review is unresolved; the validator prints unresolved counts. `COMPLETE` requires **zero** unresolved records and all factor/stratum coverage gates, not simply 70% overall. Full coverage does **not** mean predictive calibration.
- `review_status` must be `REQUIRES_HUMAN_REVIEW` or `REVIEWER_ACCEPTED_RESEARCH_ONLY`. The latter is a documented human research assertion, not an independent GitHub PR approval automatically inferred by code. Repo governance still requires reviewer PASS and exact latest-head green CI.
- `source_refs` accept only https:// sources or existing repo-relative files; traversal/missing paths fail.

## Offline validation and CI

```bash
python scripts/research/validate_weekly_capture.py --latest
python scripts/research/validate_weekly_challenger_v2.py --latest
python scripts/research/validate_weekly_challenger_v2.py --manifest data/research/weekly/weekly_challenger_v2_YYYY-MM-DD_r1.json
```

Existing CI job `Python 3.11 safety and tests` executes **both** validators before tests. Historical legacy v1 reports before 2026-11-04 stay in the first validator; new reports on/after this date **must** have at least one valid v2 manifest, checked by the second validator. The new validator rejects malformed v2 manifests, stale/unknown inputs not explicitly recorded, incorrect numeric scores, future input/source timestamps, changed cohort/weights, bogus `COMPLETE`, missing report/references and any trading-authority expansion.

**Bootstrap state:** if no weekly reports dated >=2026-11-04 have been committed, the second validator explicitly prints `NOT_STARTED` / `NO_V2_WEEKLY_REPORTS_YET` and may pass CI for a code-only adoption. This is not a collection success, not a validated live observation, not a complete weekly report and not a scheduled recalculation.

**Operational sequence:** collect report -> construct source-grounded v2 snapshot -> independently evaluate -> include actual full evaluator result and unresolved/event/physical metadata -> validate -> PR -> exact-head green CI -> owner review PASS -> merge. An omitted post-cutover weekly report manifest is a CI failure. If a relevant source is unavailable, keep PARTIAL/UNKNOWN with bounded conclusion, not an indefinite source investigation.

## Out of scope

The weekly schema is *not* a vehicle for migrating old v1 historical numeric levels, modifying Champion/Strategy, activating trading, adding paid API collection, adding a second parallel scheduled Challenger, or calibrating v2 alert bands. Provider/issuer factual attribution, predictive calibration and later periodic scheduled capture require separately reviewed work. None of these are silently implied by a green validator.
