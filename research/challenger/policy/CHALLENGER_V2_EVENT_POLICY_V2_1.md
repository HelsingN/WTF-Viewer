# Challenger v2.1 — finite observable event qualification

Research-only policy: `OBSERVABLE_EVENT_QUALIFICATION_V2_1`. This changes **how new R3/R5/R6/R7 event reviews qualify**, not the approved v2 R1/R2/R4 issuer roster, core weights, score bands, Champion or trading permissions. Historical event reviews and calculation artifacts are append-only. Research coefficients are **not calibrated for predictive performance**.

## Correct question

A signed event no longer requires discovering private project-level IRR or GPU occupancy. It requires a dated, comparable, primary-source **observable economic change** in the selected factor. The qualification describes only that measured scope, not a stronger inferred outcome.

| Factor | Observable signed economic effect | Insufficient by itself |
|---|---|---|
| R3 | Like-for-like realized compute-cost/revenue intensity, task cost, observed unit yield or reported project cash return, including worsening and improvement | Future ROI forecast, unsupported comparison, the same R1 monetization divergence counted again |
| R5 | Implemented/enforceable amendment, realized payment/collection or shortfall, actual counterparty cancellation | Unperformed commitments, ordinary large backlog, announced negotiations |
| R6 | Billable/revenue-producing delivered capacity, documented paid capacity interruption, commercially resumed service | Proposed MW, grid queue, financing alone, assumed tenant GPU utilization |
| R7 | Documented **funded** project economically deferred, cancelled, restructured or resumed with identifiable economic consequence | Early-stage planning permit withdrawal, unchanged financing route, hypothetical default |

The approved 0.5/1 research impact tiers stay frozen. `SINGLE_VERIFIED_CHANGE` = **±0.5** of the factor cap (R3 4, R5 3, R6 4, R7 4); `REPEATED_OR_TERMINAL_CONFIRMED` = **±1** and demands a separate corroborating HTTPS source. DETERIORATION is positive, IMPROVEMENT negative. No midpoint guess or precision claim; for unusual ambiguous magnitude, choose the smaller tier or do not qualify. Do not treat a signed event as proof of the overall reversal.

Every newly QUALIFIED signed payload must include `qualification_policy` and `observable_outcome` fields: `kind`, `scope`, `observed_change`, `comparison_basis`, `independent_effect_reason`, `uncertainties`, `impact_basis`, `direction`, and `corroboration_url` for the full tier. The code checks schema, direction, tiers, source bounds, PIT, duplicates and recalculation. A reviewer must independently establish measurement truth and materiality before signing.

Source timing may be exact verified `first_public_at`, or a conservatively demonstrated `known_public_by_at` plus `availability_basis=CONSERVATIVE_KNOWN_PUBLIC_BY` and original publication proof URL. Never invent an original publication minute. For transient EVENT with a later known-public-by bound, a separately verified `occurred_at` is required to avoid resetting the decay clock when the article is rediscovered. Ongoing observable STATE uses an explicit `review_by`.

## Hard stop instead of recurring audits

One bounded assessment is **the decision for that evidence cutoff**: check latest primary document and comparable predecessor, then at most one targeted independent contradiction check. Decide `QUALIFIED`, `EARLY_WARNING` (decision for *now*, not pending an infinite audit), or `NOT_QUALIFIED_CLOSED` with reason and sources. Unobserved private IRR cannot be an automatic research blocker.

`NOT_QUALIFIED_CLOSED` contains `counterevidence`, `evidence_refs`, and finite `reopen_only_on` facts. The registrar rejects a later review absent a genuinely new HTTPS primary source dated later than the previous decision or a specifically proven source/PIT error. A due warning's date indicates freshness checking, not permission for a new identical investigation. No repeated follow-up solely because private information remains unavailable.

Past entries remain intact and **do not automatically become QUALIFIED** under a newly relaxed rule. Applying v2.1 to existing Galaxy / Anthropic evidence requires an explicitly dated append-only reclassification at its new as-of, a check against all active core causal roots, and a saved newly calculated Challenger v2 result if QUALIFIED. That is a retrospective policy reassessment and should be labeled as such, never represented as an original October signal. Both favorable and adverse outcomes must receive equal eligibility treatment.

Qualification still triggers `scripts/research/challenger_v2_event_register.py --assess` → `evaluate_challenger_v2()` → immutable dated recalculation JSON → CI → reviewer PASS → PR merge. A green test does not establish a new market observation. Trading remains forbidden.

## Prior policy archival provenance

The superseded pre-v2.1 event-qualification algorithm, its registry contract, scorer/registrar implementation, and historical tests are stored as [read-only archival snapshots](archive/legacy/challenger_v2_event_qualification_pre_v2_1/README.md), copied byte-for-byte from `main@8192a4a754be58d08d2620ad99888fcbfd2a75d0`. They are **not** alternative executable policy for new research; current `OBSERVABLE_EVENT_QUALIFICATION_V2_1` remains the sole active event-qualification method.
