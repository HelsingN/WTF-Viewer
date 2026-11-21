# Challenger v2 — Phase D replay preflight from archived PIT vintages

**Date:** 2026-11-03. **Status:** SOURCE VINTAGES LOCATED / NUMERIC REPLAY NOT RUN / BLOCKED ON COHORT APPROVAL. Research-only, no trading.

## Recovered historic v1 reference points

The following are **v1** references only; neither their combined scores nor R1/R2/R4 0/1/2 levels can be imported as **v2 issuer** levels:

| Research date | Archived v1 score/state (comparison only) | Existing weekly or PIT source | Historical as-of precision |
|---|---|---|---|
| 2026-09-09 | 45 ELEVATED | AI_CAPEX_WEEKLY_WATCH_2026-09-09.md | Date-level YAML; detailed source-public metadata to reconstruct |
| 2026-09-16 | 45 ELEVATED | AI_CAPEX_WEEKLY_WATCH_2026-09-16.md | Date-level YAML; event publication to verify |
| 2026-09-23 | 60 ALERT | AI_CAPEX_WEEKLY_WATCH_2026-09-23.md | Date-level YAML; SEC some historical timestamps available in Phase4 credit gate |
| 2026-09-30 | 60 ALERT | AI_CAPEX_WEEKLY_WATCH_2026-09-30.md | Date-level YAML; actual event/source timestamps not uniformly proved |
| 2026-10-07 | 60 ALERT | AI_CAPEX_WEEKLY_WATCH_2026-10-07.md | Source recovery on 7/8-Oct, original real-time cutoff UNKNOWN |
| 2026-10-14 | 60 ALERT | AI_CAPEX_WEEKLY_WATCH_2026-10-14.md | **Explicit** cutoff 2026-10-14T08:25:13+03:00 |
| 2026-11-02 | 67.5 ALERT partial | AI_ROI_CHALLENGER_PIT_REASSESSMENT_2026-11-02.md + R2 audit panel | **Explicit** cutoff 2026-11-02T16:00:00-05:00; report reconstructed 3-Nov |

Archive paths: data/research/challenger/ai_roi_challenger_YYYY-MM-DD.yaml; the September 16 vendor-supported demand file is an **alternate observation for the same date**, not an independent second weekly sample. Outcome reviews Oct14 and Oct28 are already in data/research/challenger/.

## Correct one-off replay protocol

1. Agree one versioned roster now. The proposed November roster is **not historically frozen** in September. For September/October dates, a v2 replay performed now must be expressly described as a **post-hoc methodological reconstruction**, not a true historically registered trading experiment. Do not lie to the v2 engine by backdating cohort_frozen_at.
2. Build strictly date-eligible issuer-level records from each saved primary report and independently justified conservative known-public-by times. Missing metadata or mismatched periods are UNKNOWN. The current v2 evaluator enforces cohort freeze earlier than PIT as-of, so a historical method test needs a **separate explicit replay mode / runner** which records the actual date of roster selection and does not claim a historically live v2 cohort. Until that safe mode is written, no v2 historic numeric replay is executed.
3. Predeclare the selected snapshots: 9-Sep, 23-Sep, 7-Oct, 14-Oct and 2-Nov; other vintages serve source-gap sensitivity. Avoid treating multiple weekly writebacks or a reused R4 score as independent evidence.
4. Include both negative cases (Oracle Jupiter credit stress, buyer cash compression) and opposing cases (Azure/AWS growth, Lambda financing, positive HBM supplier evidence *outside* v2 financial score).
5. One-off sensitivity to: baseline event caps, zero-event overlay, conservative overlay cap; vary ONE design set in advance, never tune a threshold to match the known v1 67.5. If categories differ due to incomplete data, report uncertain, not a retrospective win.
6. New v2 alert thresholds remain UNCALIBRATED. The replay cannot establish predictive validity from 5 hand-picked vintages; it is **reproducibility and contradiction screening only**.
7. Final acceptance requires identifiable tested code ref, PIT source manifest, missingness coverage and anti-evidence ledger; cannot promote v2 to trading.

## What is already sufficient and what genuinely blocks D

- **AVAILABLE:** Seven distinct baseline weekly dates; dated reports and several SEC issuer links; prior R2 cash panel; v2 pure calculation module and unit tests; proposed fixed issuer roster and Phase C event candidate inventory.
- **DATA MAY REMAIN UNKNOWN:** some public-release minutes, selected company AI-only denominators, project IRR, 90-day project outcomes, credit spreads. This is not an endless search assignment.
- **BLOCKERS TO NUMERIC REPLAY:** (a) actual issuer cohort and weights not approved, (b) issuer-level v2 0/1/2 classifications not yet adjudicated, (c) pre-registered-versus-posthoc replay distinction not implemented in historical runner. Source incompleteness alone is not a reason to restart all old audits.

**Decision:** Phase D evidence inventory preflight done; leave numerical replay NOT STARTED until bounded B review and a clearly labelled, safe post-hoc runner exist. No historical v1 mutation.