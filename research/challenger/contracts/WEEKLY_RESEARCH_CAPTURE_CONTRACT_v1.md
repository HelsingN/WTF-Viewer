# Weekly Research Capture Contract v1

**Effective:** 2026-10-09  
**Scope:** research completeness and publication workflow; no scoring or runtime schema change  
**Owner:** AI CapEx Watch research collector; repository reviewer accepts persistence  
**Issue:** [#74](https://github.com/HelsingN/AI_CapEx_Reversal/issues/74)

**Version boundary (2026-11-04):** This v1 weekly manifest/validator schema, including the old seven-factor Challenger arithmetic, is retained solely to validate original historical captures dated before 2026-11-04. **New** Challenger research uses [v2](AI_ROI_CHALLENGER_MODEL_v2.md), approved research cohort, PIT/UNKNOWN intervals and signed independent event evidence; no v1 0–100 bands or levels may be published as a new Challenger result. The separately versioned [Challenger v2 weekly capture contract](WEEKLY_CHALLENGER_V2_CAPTURE_CONTRACT.md) and its validator apply to all **new** weekly reports dated 2026-11-04 onward. The legacy v1 validator remains solely for pre-cutover captures. New v2 weekly reports without a validated v2 manifest cannot claim `COMPLETE` (and fail CI). Champion and all other overlay contracts remain unchanged.

## Required coverage

The capture consists of the dated weekly report, explicitly linked append-only supplements, structured Challenger/Macro/Institutional observations and one coverage manifest per report date/revision under `data/research/weekly/`. The field inventory is `data/research/weekly/requirements_v1.json`. Every one of its blocks/fields is mandatory; unavailable inputs remain visible.

Coverage includes Champion/F1–F5/cash/technical/Asia/leadership, all five hyperscalers, GPU, financing/contracts/capacity, accelerators, memory/Cisco/peak earnings, six ROI questions, Challenger R1–R7/P1–P4/divergence, five efficiency questions, full Macro M1–M4/flags, full Institutional inputs/state/deltas and forward outcomes. Do not rely on an old automation prompt as the inventory.

Authoritative sources: [Strategy v1.3](AI_CapEx_Reversal_Strategy_v1.3.md), [Challenger v1 historical](archive/legacy/AI_ROI_CHALLENGER_MODEL_v1.md), [Macro Pain](MACRO_INPUT_COST_PAIN_OVERLAY_v1.md), [Institutional](INSTITUTIONAL_DERISKING_OVERLAY_v1.md), [efficiency](research/AI_COMPUTE_ECONOMICS_EFFICIENCY_FRAMEWORK_v1.md). New mandatory fields require a new inventory/contract version and adoption tests; weights remain owned by those models.

## Time and evidence

Record report_date, timezone-aware cutoff, last completed US session, original cutoff when known, capture time and reconstruction mode. A Wednesday morning Israel run normally uses Tuesday US close. A late reconstruction of Wednesday close is a separate supplement, never the original run's information set.

For each field record status, value or null, observation date, publication/availability date or null, capture time, evidence class, source URLs/local references and a note. Dates with unknown intraday publication precision cannot establish an executable intraday point-in-time decision. Explicitly exclude releases after cutoff even if their economic period precedes it.

Freshness budgets in the inventory are collection-review limits, not new runtime FundamentalSnapshot TTLs. Latest quarterly results can remain the latest disclosure; monthly CPI and twice-monthly short interest should respect their publication calendars. CFTC uses Tuesday positions released Friday, consistent TFF Futures Only consolidated codes 20974+ and 13874+, Leveraged Funds long/short/spreading/net, WoW/4W/13W. Do not mix Legacy non-commercial, mini contracts, options-combined or micro contract units.

## Publication states

- `COMPLETE`: required inputs resolved, all mandatory blocks present and validation passes.
- `PARTIAL`: all mandatory blocks/fields present, but unresolved/unknown/carried inputs are listed.
- `COLLECTION_FAILED` or `PERSISTENCE_FAILED`: operational failure, not an empty successful report.
- `VALIDATION_FAILED`: malformed/omitted coverage; repair before publication.

A structural PASS with PARTIAL data is allowed and must print an explicit unresolved count. It must never be described as “all numerical data collected.” UNKNOWN is not zero, NO, unchanged or evidence of safety.

Unavailable/carried inputs require attempted source(s), specific cause, responsible owner, next action and next_review. Numeric values cannot contain hidden UNKNOWN/null subvalues and still claim OBSERVED. ASSESSED research judgments retain their limitations and cannot masquerade as primary measurements.

## Collection and persistence sequence

1. Read current contracts, previous manifest and open collection gaps.
2. Collect every required family using primary source and available fallback; record entitlement, retrieval failure, publication lag, nonpublic disclosure and methodology mismatch separately.
3. Write report and structured observations. Preserve history; append a supplement/revision for repairs. No silent carry-forward.
4. Run `python scripts/research/validate_weekly_capture.py --latest` from repository root. Fix FAIL; print PARTIAL gaps.
5. Persist through issue → branch → PR → unique existing CI → reviewer PASS → merge, following [governance](REPOSITORY_GOVERNANCE.md). Confirm actual SHA.
6. Notify a substantive result or collection/persistence failure. Missing mandatory data/failure is substantive and cannot be suppressed by “no empty reports.”

Historical v1 validator checks required inventory, linked artifacts/sections, temporal validity, freshness, data-status consistency, historical Challenger v1 arithmetic, Macro ranges, Institutional CFTC arithmetic and required fields, latest-week coverage, immutable source blobs and trading-authority boundaries. It does not prove the truth of a source, paid-data entitlement, runtime/Pine parity, economic comparability or strategy profitability. Human source review remains required.

The existing `Python 3.11 safety and tests` CI job runs this validator offline; there is no new required job, paid API call or runtime decision. Reports before 7-Oct remain historical and are not rewritten to satisfy the new contract.

## Champion and shadow boundaries

Fresh canonical Combined Score remains null unless accepted normalized fundamentals, valid numeric Asia and canonical technical inputs exist. A research technical proxy or conditional old-fundamental calculation is labelled separately. Challenger/overlays never supply missing Champion inputs, create F6/R8/P5 or authorize trading.

All established gates remain: Core PASS, broker BLOCKED, Phase 2 NO, Live disabled, manual approval required.
