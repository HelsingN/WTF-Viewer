# AI ROI / Payback Challenger — Observable Core v2

**Version:** 2.0.0-draft · **Date:** 2026-11-03 · **Issue:** #131
**Status:** CURRENT RESEARCH CHALLENGER FOR NEW OBSERVATIONS from 2026-11-04 after PR #132 merge and explicit owner-requested documentation/task cutover; numeric score publication remains conditional on PIT-valid reviewed observations and coverage; NOT an operational/trading model. Prospective frozen cohort: data/research/challenger/challenger_v2_research_approved_cohort_2026-11-04.yaml. Reviewer decision: research/CHALLENGER_V2_COHORT_LEVEL_THRESHOLD_REVIEW_2026-11-04.md.
**Trading authority:** NONE. Champion unchanged. Historical v1 immutable. No parallel recurring v1/v2 runs.

## Purpose and one-model rule

Use one future Challenger with an observable core (R1 monetization, R2 cash conversion, R4 financing) and four two-sided evidence adjustments (R3 payback, R5 contracts, R6 capacity conversion, R7 project attrition). P1–P4 remain an independent confirmation overlay, never secretly added again.

v2 replaces v1 for **all new Challenger research** from 2026-11-04; existing v1 research snapshots remain archived and comparable only to v1. Missing private data must not lead to indefinite audits, false zeros, silently neutral scores, hidden imputation or dropping issuers.

## Fixed roster, PIT and missing data

At each approved cohort version freeze, **before the PIT as-of time**, for each core factor, the issuer list, issuer weight summing to 1, economic role, source universe, accounting definitions and reporting cadence. Record mandatory cohort_version and cohort_frozen_at; the evaluator refuses after-as-of cohort selection. Include investment-grade and project/neocloud credit borrowers in R4 rather than equating their risks. No ex-post survivor or early-reporter selection.

For each issuer: reviewed level 0/1/2 or UNKNOWN, its own previous comparable period, source link, finite valid-until, explanation and counterevidence, unique causal root. **Availability is one of two explicitly tagged modes**: (a) `first_public_at` with `availability_basis=FIRST_PUBLIC_VERIFIED` when an exact first-public time was verified; or (b) `known_public_by_at` with `availability_basis=CONSERVATIVE_KNOWN_PUBLIC_BY` when issuer and dated historical source establish that the document was already public **by** a safely later, timezone-aware moment. Never mislabel a bound as the true release minute. A date-only document is not enough without recorded proof of its public-by bound; if no defensible bound exists, return UNKNOWN. Do not equate corporate CapEx with AI-only investment, TTM with a quarter, FCF gross cash PPE with lease-inclusive FCF, or a filing period-end with publication time. A company may be on an older quarter than peers if its last report remains fresh; issuer-to-issuer *levels*, not unrelated raw dollar amounts, aggregate.

Maximum source freshness: R1/R2 = 150 days after first publication, R4 = 180 days; a shorter documented valid-until overrides these maxima. UNKNOWN, expired, missing exact first-public time or unverified sources do not count as observed. Future information relative to as-of is an invalid PIT input. Fixed weights of UNKNOWN issuers **stay in the denominator**.

For each factor f on scale 0–2:
~~~text
L_f = sum(issuer_weight × observed_level)
U_f = L_f + 2 × sum(issuer_weight with UNKNOWN/stale observation)
coverage_f = sum(issuer_weight with eligible observation)
~~~
No renormalization of available issuers; no neutral midpoint fill. Research sufficiency guide is >=70% coverage per core factor (at least four of five equal issuers in R1/R2). For approved R4 also require >=60% within the platform stratum AND >=50% within the CRWV/IREN stratum. Failure produces LOW_COVERAGE and an interval, **not** a requirement to keep searching. Score point exists only if lower=upper; otherwise a bounded interval is the honest model output.

## Reproducible issuer classifications

**R1 scope decision (research proposal):** use matched total-company revenue growth against total-company same-basis capital expenditure growth for the same YoY reporting period as a **regular enterprise-level investment-intensity proxy**, rather than cloud-segment revenue divided by entire-company CapEx. Record cloud/Azure/AWS growth as material *counterevidence* to generalized AI monetization failure. This score reflects corporate investment pacing, **not a measured marginal AI-only ROIC**. A single matched period with >=20 percentage-point CapEx/revenue-growth divergence and rising CapEx/revenue intensity can propose level 1 only; level 2 needs additional independent yield/payback deterioration. The testable 20pp diagnostic remains provisional pending the one-off replay. Because R1 shares some CapEx input with R2, do not describe its evidence as fully statistically independent.

These are proposed v2 rules, not claims of optimized/validated predictive parameters. Each issuer's level must be justified by primary comparable data and material counterevidence; lack of essential comparability means UNKNOWN rather than a forced level 1.

| Factor | 0 | 1 | 2 |
|---|---|---|---|
| R1 monetization vs capex | Comparable monetization keeps pace and no material deterioration | One comparable period of material CapEx/monetization divergence (research diagnostic >=20 percentage points) plus an observable deterioration in capital intensity/unit monetization | Divergence persists in two comparable periods AND independent evidence shows worsened monetization/cash yield, weak project returns or revised investment expectations because of returns |
| R2 cash conversion / FCF | Positive, comparable *lease-inclusive* FCF for at least two periods, non-deteriorating and no strong contrary evidence | Latest same-basis negative FCF/proxy, OR >=10pp decline in (cash FCF proxy / OCF) across comparable positive-OCF periods; cash proxy maximum candidate 1 | At least two comparable negative **lease-inclusive** periods with worsening, or independently confirmed cash emergency rooted in underlying investment economics |
| R4 financing/refinancing | Verified accessible capital **and** comparable stable/improving terms without material incremental dependence | **Verified material incremental** guarantees/recourse/collateral financing dependence or issuer-linked syndication selectivity, even if credit remains available | Actual issuer-linked refinancing failure/covenant breach, OR **same-instrument** substantial repricing plus verified rollover dependence |

**Invariants:** high CapEx alone is not R1=2; revenue growth may refute deterioration. R2 use FCF definitions consistently, do not force a lease-null to zero; prior v1 R2=2 does not automatically map to every v2 issuer. R4 deal volume, optional undrawn facility, negative *outlook* or vendor support alone cannot yield 2. A single underlying economic event does not simultaneously raise multiple factors without separate observable consequences. The 20pp R1 and 10pp R2 diagnostics are accepted as **research decision thresholds only** in the 2026-11-04 method review, not estimated forecasting thresholds. R1 growth-gap and CapEx/revenue intensity are mathematically coupled, NOT two independent confirmations. The one-time historical replay tests reproducibility but does NOT validate predictive skill.

## Core weights and formula

Only relative old core weights 20:15:20 are preserved; normalized to 100 in v2 (old score and old alert bands **cannot** be carried over):
~~~text
Core_L = 100 × (20 L_R1 + 15 L_R2 + 20 L_R4) / (2 × 55)
Core_U = 100 × (20 U_R1 + 15 U_R2 + 20 U_R4) / (2 × 55)
~~~
Both are always produced; a single exact core score is null whenever they differ. Coverage must be reported separately (per factor and weighted aggregate). No v2 category can be claimed until new bands or explicit qualitative decision rules are independently accepted.

## Two-sided evidence adjustments R3/R5/R6/R7

Each qualified event has: event ID, issuer/project, primary owner factor, causal root ID, *distinct economic effect ID*, source classification PRIMARY_FACT or INDEPENDENT_CONFIRMATION, first-public timestamp, source URL, impact ±0.5 or ±1, confidence MEDIUM/HIGH, rationale, counterevidence, and either an expiry (transient EVENT) or review-by (persistent STATE). A MANAGEMENT_CLAIM alone or LOW confidence yields context only, **not** an adjustment.

| Factor | Positive (supports deterioration) | Negative (opposes deterioration) | Cap |
|---|---|---|---:|
| R3 payback | Confirmed worsening realized project payback / unit economics | Verified improvement in realized project economics | ±4 |
| R5 contract quality | Actual renegotiation/cancellation/counterparty loss | Realized collections, performance and enforceable improved contracts | ±3 |
| R6 capacity | Confirmed funded→energized→utilized deployment failure | Verified use and economic deployment | ±4 |
| R7 attrition | Economically caused site deferral/restructuring/cancellation | Verified restart/resolution with financing or delivery | ±4 |

An oversized obligation, missing MW occupancy, hypothetical IRR or uncompleted funding proposal is not independently qualified. Two opposite observations can net out, but both remain in the ledger.

~~~text
Δ_f = clip(sum(eligible independent impact × freshness × cap_f), -cap_f, +cap_f)
Final_L = clip(Core_L + Δ_R3 + Δ_R5 + Δ_R6 + Δ_R7, 0, 100)
Final_U = clip(Core_U + Δ_R3 + Δ_R5 + Δ_R6 + Δ_R7, 0, 100)
~~~

Maximum theoretical combined cap is ±15 points, a **provisional research choice**, not an empirically calibrated coefficient. R3/R5/R6/R7 adjustment does not create a second score. If core data are missing, their interval persists after adjustment.

Double counting: one unique (causal root ID, economic effect ID) counts at most once across factors/articles. An event sharing a core causal root is excluded unless independently confirmed as a **distinct** effect and expressly marked independent. Same-root events across factors require distinguishable effects and explicit independence. Never add the same loan, capex, guaranty or site delay repeatedly under different labels.

Freshness:
- Transient EVENT contribution = initial impact × 2^(-age_days / factor_half_life_days); fixed half-lives R3 90, R5 90, R6 60, R7 90; no score contribution after twice the half-life.
- Persistent STATE does not decay while independently confirmed and before explicit review-by. An expired review date makes the *contribution* stale, not the historical event false or a sign of recovery.
- All sources must precede as-of. Supersession of old records requires explicit review, not silent overwriting. Events have a finite next review trigger.

## Stop rules and output

One bounded source pass per report/factor: official latest report and comparable predecessor; targeted independent check for a material contradiction; decide ASSESSED, ASSESSED_WITH_UNCERTAINTY, UNKNOWN or BLOCKED with a *named* critical error. Stop when this bounded universe has been checked. Private project economics, contract terms and GPU occupancy cannot be an infinite research blocker.

Reopen only for a new primary disclosure, verified contrary evidence, PIT/source/accounting error, a genuine duplicate or a freshness/review trigger **that changes input admissibility**. A date on its own does NOT trigger a fresh search for unchanged evidence. An event assessed once may end as a preserved non-scoring EARLY_WARNING with `FINAL_FOR_CUTOFF` and `MATERIAL_NEW_EVIDENCE_ONLY`: risk remains visible while no additional investigation is due. Monitoring new disclosures is not reopening an audit. A new material source starts one bounded pass, not an indefinite investigation. The old v1 R2 audit is not restarted by this redesign.

Calculator output: as_of, schema version, factor coverage/intervals and excluded reasons, core interval, signed adjustments and contributing/excluded event IDs, final interval or exact score, evidence sufficiency, calibration=UNCALIBRATED, trading_signal=false. P1–P4 separate. No automatic old ALERT labels or causal Stage 5 extrapolation. If any input dates or deduplication violate rules the research calculation must fail closed.

## Acceptance and cutover

The implementation is an isolated, deterministic research calculator under scoring.challenger_v2, **not imported by Champion, production decision, broker, scheduled alerts or weekly runtime**. The merged PR #132 and owner-requested 2026-11-04 cutover designate v2 as the sole new research method. The old v1 is archive-only; no old scheduled score may be carried forward. Numeric v2 observations still require reviewed PIT issuer data, sufficiency, and disclosure of UNCALIBRATED model limitations; no category or trading authority. Retire recurring v1 calculations: **one operational Challenger only**, historical v1 untouched. Approval does not grant trading authority.

See issue #131, the cutover checklist at research/CHALLENGER_V2_CUTOVER_2026-11-03.md, and historical Docs/archive/legacy/AI_ROI_CHALLENGER_MODEL_v1.md.