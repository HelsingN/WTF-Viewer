# Challenger v2 — one-time cutover and validation checklist

**Date:** 2026-11-03 · **Issue:** #131 · **Status:** 2026-11-04 RESEARCH-ONLY DOCUMENTATION AND TASK CUTOVER; PRODUCTION/TRADE CUTOVER NOT AUTHORIZED

**Detailed execution plan:** [CHALLENGER_V2_MIGRATION_EXECUTION_PLAN_2026-11-03.md](CHALLENGER_V2_MIGRATION_EXECUTION_PLAN_2026-11-03.md). This checklist preserves the original pre-cutover gates; the owner-directed 2026-11-04 research-only cutover archives v1 and redirects new research and existing event/daily scheduled task prompts to v2. It does NOT authorize numerical alert categories, trading or Champion integration.

## Non-negotiable design choices

- Keep one Challenger process, not two parallel weekly models. New versioned research prototype stays outside live/weekly pipelines pending acceptance.
- Archive Challenger v1 definition, all historical snapshots and reports unchanged; v1 scores (e.g. 67.5) are **not numerically comparable** with v2 0–100 normalization.
- Core R1/R2/R4 is scored from *fixed, versioned issuer rosters*, not whichever company reported last. Missing/expired company data yields intervals and a coverage measure.
- Archival sources with a publication day but no reliable exact minute use explicitly reviewed conservative `known_public_by_at` bounds, never an invented exact `first_public_at` time.
- Event factors R3/R5/R6/R7 are **both positive and negative**; only independent outcome observations qualify; expire or review stale effects without retroactively erasing facts.
- P1–P4 are separate context. No current Champion or trading changes.

## Remaining design approvals before active cutover

1. [x] Approve and version the **prospective research constituent roster** for each core factor, with weights and economic roles; see [approved cohort YAML](../../data/research/challenger/challenger_v2_research_approved_cohort_2026-11-04.yaml). R4 splits five large platforms 50% / public neocloud operators CRWV and IREN 50%, with explicit concentration bias. [Research review](CHALLENGER_V2_COHORT_LEVEL_THRESHOLD_REVIEW_2026-11-04.md) accepts this only for an uncalibrated stress-observation panel, not sector exposure. Actual prospective issuer PIT certification remains separately OPEN.
2. [x] Review R1 20pp growth-gap and R2 10pp FCF/OCF margin WATCH conditions as **research policy thresholds only**, not empirical forecasts, in [2026-11-04 review](CHALLENGER_V2_COHORT_LEVEL_THRESHOLD_REVIEW_2026-11-04.md). R4 level 2 requires actual refinancing/covenant distress or matched repricing with rollover stress. Validation of predictive thresholds and issuer evidence eligibility remains OPEN.
3. [x] Adopt >=70% fixed-weight research coverage minimum with UNKNOWN intervals, plus R4 >=60% platform-stratum and >=50% project-stratum coverage; policy accepted in [research review](CHALLENGER_V2_COHORT_LEVEL_THRESHOLD_REVIEW_2026-11-04.md). This does not authorize any alert category, nor claim predictive calibration.
4. [ ] Calibrate or explicitly mark as unvalidated the proposed R3/R5/R6/R7 caps (+/-4/3/4/4), half-lives (90/90/60/90 days) and additive correction. Require counterevidence, duplication controls, non-promotion safeguards.
5. [x] Conduct **one-off POST-HOC mechanical** replay on five archived cutoffs and three predeclared sensitivity settings; see [Phase D replay](CHALLENGER_V2_PHASE_D_ONE_OFF_REPLAY_2026-11-04.md). The proposed issuer cohort was selected in November, AFTER all historical cutoffs; this test demonstrates arithmetic/PIT exclusion and sensitivity ONLY, **not historical preregistration, predictive validation, calibrated alert bands or independent reviewer PASS**. Do not force v2 to match v1.
6. [ ] Choose new v2 bands or a non-numeric state rule after replay; **DO NOT reuse v1 thresholds by default**. Until then output numeric bounds and category=null.
7. [ ] Check research-only code tests, output version/schema, latest head/base CI and independent reviewer PASS under Docs/REPOSITORY_GOVERNANCE.md.
8. [ ] Explicitly approve effective cutover date. Then activate a **single** v2 run and retire automatic/regular v1 evaluation. Do not modify v1 historical YAML. No change to Champion/trading gates without separate formal Strategy approval.

## Source-budget stop condition for ongoing evaluation

Use a fixed observation checklist for each report: latest eligible issuer SEC/IR statement and preceding comparable report; a targeted independent cross-check when there is a serious contradiction; known project/contract event register. Assign one of ASSESSED / ASSESSED_WITH_UNCERTAINTY / UNKNOWN / BLOCKED. A SOURCE_MISSING or STALE observation is an *explicit result*, not an instruction to keep seeking inaccessible data.

Reopen on actual new public disclosures, the next issuer reporting cadence, an expiring event review, source-time issue, mistaken calculation or a material independent disconfirming observation. A previous audit's missing private GPU utilization, project IRR or non-public contract cancellation terms alone is not BLOCKED.

## Current implementation delivery

- Contract: Docs/AI_ROI_CHALLENGER_MODEL_v2.md
- Pure research calculator: src/scoring/challenger_v2.py
- Tests: tests/test_challenger_v2.py
- Read-only CLI: scripts/research/evaluate_challenger_v2.py
- Blank-input fixture for an approved roster: data/research/challenger/challenger_v2_input_template.yaml
- No weekly workflow or runtime changes. R2 v1 old audit left parked with documented alternative, not reopened.

## Operational governance

PR for #131 must have latest-head CI Python 3.11 safety and tests PASS, reviewed finite diff and explicit reviewer PASS before merge. A merged contract alone does **not** activate v2, migrate historical snapshots, change the Champion or authorize a trade. At most it makes the calculator available for manual research-only use.


## 2026-11-04 actual cutover scope and outstanding gates

- PR #132 merged at 2026-11-03 23:45:42 UTC, merge SHA e1c23e40bd16da389ec1fd70de7568def6fbd94e. Current research Challenger v2 contract is in main.
- Repository archive migration PR (this change): historical v1 definition moved under Docs/archive/legacy/; historical reports and YAML snapshots stay immutable; active README, rules, weekly contract and research prompt point to v2.
- Existing active automations AI CapEx Daily Close and AI CapEx Event Alerts updated on 2026-11-04 to v2-only new research, with unchanged schedules and no second numeric publisher. Legacy one-off Challenger v1 task remains disabled; historical weekly task remains disabled.
- **Research-method cutover is complete only after this migration PR merges.** Active operational numeric score publisher remains NONE for v2 until actual source-review and coverage. For new v2 observations report interval and LOW_COVERAGE/UNKNOWN as needed; category=null, calibration=UNCALIBRATED, trading_signal=false.
- Remaining original checklist items 4, 6, 7, 8 refer to **quantitative/operational** certification, not permission to archive v1 and direct future research to v2. They remain OPEN. Do not claim that daily scheduled tasks compute canonical v2 values without reviewed PIT issuer-level inputs.
