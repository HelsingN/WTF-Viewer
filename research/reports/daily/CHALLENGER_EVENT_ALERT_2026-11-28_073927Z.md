# Challenger 2.1: BACKFILL — Core Scientific / CoreWeave billable capacity

**Cutoff / assessment:** 2026-11-28T07:39:27Z (09:39:27 Israel).
**Decision:** QUALIFIED, R6 IMPROVEMENT, MEDIUM; BACKFILL.
**EVT:** EVT-20260930-BEBDA0A0773C.
**Canonical event_key:** CORE-SCIENTIFIC-COREWEAVE-BILLABLE-CAPACITY-Q3-2026.
**Persistence:** branch/PR review required; PENDING_MERGE. No automatic merge or owner acceptance claimed.

## Observable result

Core Scientific's Q3 earnings disclosure reports 485 MW of billable high-density colocation capacity at 30 September 2026, versus 395 MW at 30 June: +90 MW / +22.8%. Colocation revenue rose from $136.669m to $215.432m (+57.6%). Crucially, license fees excluding passed-through electricity rose from $98.812m to $157.265m (+59.2%); this is customer-billed AI hosting, rather than proposed electrical capacity.

Primary, dated 5 November:
- [Issuer SEC 8-K exhibit and comparable Q2/Q3 tables](https://investors.corescientific.com/sec-filings/all-sec-filings/content/0001839341-26-000028/q32026corescientificinc-ea.htm).
- [Q3 10-Q, distinct detailed filing used for the bounded counterevidence check](https://investors.corescientific.com/sec-filings/all-sec-filings/content/0001839341-26-000030/core-20260930.htm).
- [SEC acceptance proof](https://www.sec.gov/Archives/edgar/data/1839341/000183934126000028/0001839341-26-000028-index.htm): 5-Nov 07:04:47 EST = 12:04:47Z. This establishes `known_public_by_at`, not the earliest dissemination minute. Availability basis: CONSERVATIVE_KNOWN_PUBLIC_BY.

Economic period: Q3 2026, quarter-end snapshot 30 September. Exact commissioning dates within Q3 are unavailable; no invented occurrence timestamp. Registry event_date is the snapshot date, not publication date. Discovered in this 28-Nov review through [a retrospective comparison published 28-Nov 04:50 UTC](https://en.coinotag.com/core-scientific-q3-colocation-revenue-215-4-million). This is a coverage omission/BACKFILL, not a live November-5 or November-28 capacity signal.

## Qualification and limits

Policy OBSERVABLE_EVENT_QUALIFICATION_V2_1: REVENUE_GENERATING_CAPACITY. Billable MW and non-power license revenue provide comparable realized economic evidence. Use only SINGLE_VERIFIED_CHANGE: impact −0.5 of R6 cap 4 = −2 points. No full-step claim: the detailed 10-Q is another issuer disclosure, not independent external corroboration for a terminal/repeated outcome.

Counterevidence: $57.556m of Q3 revenue is electricity pass-through (Q2 $35.073m). Gross revenue is not cash yield. CoreWeave customer concentration, construction funding, project FCF and tenant GPU utilization remain unresolved. Company net income is heavily affected by noncash warrant gains. No R3 ROI or R5 collections adjustment is inferred.

STATE review_by: 2026-12-05T12:04:47Z, a conservative month from original disclosure, not a new month starting at rediscovery. The evidence measures the September snapshot; it is not a claim of a newly observed November deployment. After review_by its contribution becomes stale; a calendar deadline alone does not reopen the same audit.

Reopen only for a new primary billable-capacity/rent disclosure, a proven source/PIT error or restatement, or a demonstrated overlap with another scored customer-capacity outcome.

## Deduplication and relative strength

Compared canonical registry, all preserved studies/daily reports, open PR heads and branches in both repositories; no registered Core Scientific Q3 occurrence or prior delivered alert was found in the monitoring history. WTF develop baseline a9e4f26940d4957393f8bccd154b0f7f0392a2b5; registry blob 839596696c36cebbda49abb73c2a58d139d4a8cc. WTF had no open PR at run start; archive had the same nine open proposals and unchanged 119 branch heads.

Core Scientific rent conversion is economically distinct from CoreWeave R4 financing dependence. No Core Scientific fixed-core observation is added. The CoreWeave Q3 aggregate capacity headline remains EARLY_WARNING, so its MW are not separately scored. Reserve causal_root_id CORE_SCIENTIFIC_COREWEAVE_BILLABLE_CAPACITY_2026Q3 and effect_id CORZ_BILLED_IT_CAPACITY_395_TO_485MW; do not count these 90 MW again in later CoreWeave totals without a distinct outcome.

Magnitude equals the existing Cerebras/OpenAI single-change R6 deterioration (+2), with opposite sign. It is a different project/customer/economic effect. Galaxy Helios is a separate lessor and project, but its prior signed contribution is expired; no automatic reactivation. Anthropic's prior state is likewise stale. New links or elapsed reviews do not refresh either.

## Recalculation and validation

Executed canonical migrated `challenger_v2_event_register.py --register` and `--assess` → `evaluate_challenger_v2`, frozen approved cohort CHALLENGER_V2_RESEARCH_APPROVED_2026-11-04, as_of 2026-11-28T07:39:27Z. The registrar assigned the ID; no manual numbering.

- Approved-core fallback sources re-evaluated for PIT/freshness: R1/R2/R4 coverage **0%**, all absent/expired remain UNKNOWN/STALE in their fixed denominators.
- Core interval **[0,100]**, exact score null.
- Used events: Core Scientific −2; Cerebras +2. R6 net **0**, total signed adjustment **0**.
- Final interval **[0,100]**, **LOW_COVERAGE_BOUND_ONLY**. No carry-forward of the historical weekly interval.
- Galaxy and Anthropic excluded as STALE_STATE.
- calibration=UNCALIBRATED; category=null; trading_signal=false; NO_TRADE. Champion unchanged.
- Saved calculation: [immutable trigger artifact](../../challenger/calculations/EVT-20260930-BEBDA0A0773C_20261128T073927Z_adcc793a.json).

Recreated the canonical source tree using MAIN migration-manifest mappings plus current report attachments, calculations and ledger supplements. Existing calculation bytes restored unchanged after registrar execution; only the new artifact is proposed. `--check --base-registry base-registry.json` passed: 49 events, all historic reviews retained. Focused pytest execution could not start because pytest is absent; no test-pass claim. Exact-head GitHub native/reader CI must be checked separately in the PR.

A transient executor transport disconnect occurred before registration; execution recovered, and both registration and recalculation subsequently completed. There is no remaining RECALCULATION_BLOCKED claim.

## Monitoring coverage

Previous completed monitoring cutoff 28-Nov 06:32:48Z; this search used overlap from 06:00Z. Research source/registry/report heads remained unchanged. Primary operator status pages (CoreWeave, Nebius, OpenAI, Claude), fresh issuer/SEC searches and discovery feeds were checked. No additional new material qualification or revocation established in the new window. The Core Scientific finding is explicitly retrospective. Search coverage is bounded, not a claim that all global events were exhaustively captured.

New research is saved only in WTF-Viewer; inherited archive identities and calculations are preserved. No GitHub issue created. Next run should finish this same event/PR if persistence or CI requires retry, and must not send another market alert solely for that retry.
