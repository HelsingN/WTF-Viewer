# Challenger v2 — one-time post-hoc reproducibility and sensitivity replay

**Prepared:** 2026-11-04. **Status:** ONE-OFF METHOD CHECK, NOT OUT-OF-SAMPLE VALIDATION / NO CUTOVER.  
**Code:** scripts/research/one_off_challenger_v2_replay.py and tests/test_challenger_v2_posthoc_replay.py.  
**Inputs:** proposal cohort authored 2026-11-03T21:36:40Z (GitHub commit f98a8aff), recovered issuer evidence for R1/R2/R4, five historically dated checkpoints. No trade, no Champion, no parallel scheduled Challenger.

## Historical PIT safeguards

The candidate cohort was selected **AFTER** all five historical checkpoints. The runner uses an explicitly labeled POSTHOC_METHOD_REPLAY mode and claimed_preregistered=false; it never backdates the proposed roster. Every historic output is stamped POSTHOC_REPLAY_UNVALIDATED. Normal mode still rejects an after-as-of cohort freeze.

Issuer evidence now uses *conservative known-public-by* timestamps from [reviewed SEC acceptance/source register](../../data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml), not arbitrary dates of October research recapture. SEC acceptance is verified, exact first-public dissemination is **not**. Next-business-day noon ET is a deliberate conservative availability policy. CoreWeave's March loan agreement is old, but **11-Aug SEC Q2 10-Q reaffirms outstanding DDTL 4.0 debt**, providing a fresh observed financing state, while IREN's August 10-K confirms its financing. Future-than-cutoff sources are excluded and remain UNKNOWN. Historic issuer labels reconstructed now are **NOT** presented as actual real-time 2026 decisions or validated issuer levels.

## Five-date mechanical outcomes

| Historical cutoff | R1 / R2 / R4 eligible coverage | One-off v2 core **interval** | Meaning |
|---|---|---|---|
| 9 Sep 2026, 16:00 EDT | 0% / 0% / 50% | **[9.09,90.91]** | August 2026 filings already described credit dependence of CRWV/IREN; cloud issuer Q3 figures later |
| 23 Sep 2026, 16:00 EDT | 20% / 20% / 50% | **[15.45,84.55]** | Oracle Sep11 filing eligible alongside August CRWV/IREN; retrospective grading still unvalidated |
| 7 Oct 2026, 16:00 EDT | 20% / 20% / 50% | **[15.45,84.55]** | Oracle and both August credit disclosures eligible, remaining companies future/missing |
| 14 Oct 2026, 08:25:13 Jerusalem | 20% / 20% / 50% | **[15.45,84.55]** | Archived exact cutoff plus earlier filings; no later earnings backfill |
| 2 Nov 2026, 16:00 EST | 100% / 100% / 50% | **[40.91,59.09]** | R1 five provisional WATCH issuers, R2 five provisional WATCH issuers, R4 two provisional project-credit WATCH issuers |

**2-Nov arithmetic:** R1 factor bounds [1,1], R2 [1,1], R4 [0.5,1.5] with 50% fixed credit-roster coverage. Weighted total = 100 × (20 R1 + 15 R2 + 20 R4) / (2 × 55) → [40.91,59.09]. **R4 is under the proposed 70% minimum research coverage, so neither an exact v2 score nor an ALERT category is justified.** The four event adjustments remain zero *incremental points* because no independently qualified new economic outcome was accepted in this narrow initial ledger; this is NOT proof of no attrition. Legacy v1 score 67.5 is not used, calibrated or compared.

**Audit correction 2026-11-04:** Earlier one-off replay treated 15-Oct/19-Oct research-capture dates as conservative R4 publication dates. SEC primary evidence demonstrates the information was already available by August and the earlier outputs [0–100] and [6.36–93.64] were therefore **over-conservative source-capture artifacts**. The replay is corrected, not fitted to old v1 levels or later market outcomes. March CoreWeave DDTL 4.0 is counted as a continuing state only through the independent August 10-Q reaffirmation. The Nov-2 interval and one-time sensitivity remain unchanged.\n\n## Three predeclared sensitivity settings at 2-Nov

| Setting | R2 FCF/OCF deterioration threshold | R4 project-company weight share | Event overlay | Result |
|---|---:|---:|---|---|
| Base | ≥10 percentage points | 50% | No qualified events | **[40.91,59.09]** |
| No-event counterfactual | ≥10pp | 50% | Explicitly disabled | **[40.91,59.09]** |
| Conservative coverage stress | ≥30pp | 30% | No qualified events | **[34.55,65.45]** |

In the conservative stress MSFT positive FCF/PPE proxy has a 24.831pp margin deterioration, falling short of 30pp, so its R2 candidate is UNKNOWN (R2 coverage 80%). Project-financed R4 cases occupy only 30% fixed share, with 70% UNKNOWN (R4 coverage 30%). No-event and base agree because **no events were qualified**; therefore this replay does NOT validate the ±15 event caps or decay.

These variations are a *single one-time sensitivity check*, NOT two or three ongoing Challenger models and NOT optimized parameters.

## Limits, anti-evidence, source quality

- Azure, AWS, Google Cloud and Oracle cloud monetization growth and strong physical suppliers contradict a generalized immediate physical AI collapse. Physical P1–P4 do not join the numerical v2 core.
- Matched enterprise revenue/cash CapEx pairs do NOT equal AI-only project ROI. Five highly correlated issuer expansions are not five independent negative-ROI observations.
- Lease-inclusive issuer FCF is known for Meta, gross/net cash PPE proxies for other issuers; no negative cash-PPE proxy automatically justifies R2 level 2.
- Strong new bond market demand, Lambda successful IG-backed financing and CoreWeave financings oppose a universal credit shutdown; those are incorporated in R4 reasoning even when unable to assign a numeric 0.
- Sample is small and chosen retrospectively, without out-of-sample reversal outcomes, trustworthy category thresholds or calibrated predictive error. No claims about AUROC, false-positive frequency, successful early warnings or trading efficacy.

## Outcome

**Gate D: one-off arithmetic, coverage and PIT handling test COMPLETED with explicit unvalidated status.** It establishes reproducibility, not prospective forecasting skill.

**Still required before activation:** reviewer-approved cohort weights/issuer scores and evidence validity, decisions on proposed 10pp and 20pp gates, new v2 category thresholds or explicit unclassified research mode, latest-head CI, single schedule-owner/retirement check, and independent signoff. Unknown private data is not a mandate to continue auditing indefinitely. No historical v1 files or current monitoring schedules were changed.
