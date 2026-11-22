# Challenger evidence sufficiency and recalculation acceptance protocol

**Date:** 2026-11-03  
**Status:** PROPOSED GOVERNANCE / research-only  
**Scope:** Challenger R1–R7 and physical P1–P4 research observations. No alteration of frozen model v1 weights, thresholds, level meanings, Champion, historical observations, or trading authority.

## Principle

**Evidence sufficiency, not absolute evidence completeness.** The universe of private contracts, project economics and cash flows is not fully observable. A finite, auditable decision must be possible with known uncertainty. Missing evidence is never silently treated as zero, favorable, or unfavorable.

Separate (a) arithmetic reproducibility, (b) input reliability and PIT eligibility, (c) defensibility of factor classification, (d) research publication readiness, and (e) trading eligibility. Passing (a)–(d) does **not** confer (e).

## Required factor record

For each R1–R7, record: `as_of` and cutoff timezone; frozen weight; selected level 0/1/2 or UNKNOWN; weighted contribution or null; confidence LOW/MEDIUM/HIGH with rationale (qualitative, **not** a calibrated probability); evidence coverage (required sources checked, gaps, source first-public time); newly available evidence since previous snapshot; previously known evidence; counterevidence; comparable periods/definitions; plausible alternative levels; score sensitivity; reviewer disposition and rationale. Record P1–P4 separately with existing states and coverage, never blend into score.

No fabricated numerical precision: a level is an evidence-based **ordinal judgment**, not a continuously measured economic quantity. Where a factor is UNKNOWN, report total as UNKNOWN plus conditional scenarios, not a single authoritative score.

## Sufficiency decision rule

A factor is `ASSESSED` when (1) material available primary sources are reviewed within a predeclared source universe and PIT cutoff, (2) its selected level is justified against the **frozen** model's meaning, (3) material counterevidence and missing fields are disclosed, (4) reasonable alternative treatment is evaluated, and (5) no known material contradiction or source-time error invalidates the classification. Exhaustively obtaining unknowable private data is **not** required.

Use `ASSESSED_WITH_UNCERTAINTY` when a defensible primary level exists but material alternatives remain; publish the primary and sensitivity scenarios without claiming the primary is uniquely determined. Use `UNKNOWN` when no defensible level exists. Use `BLOCKED` only for concrete critical defects: broken PIT boundary, unsupported or contradictory primary evidence, unreproducible arithmetic, material unaddressed double counting, missing essential source verification, or a governance/CI failure required by repository rules. Do not classify routine incomplete coverage alone as BLOCKED.

## Incremental evidence and R2

For R2 specifically, compare **new** evidence to what was already known in the prior baseline. Count issuers and disclosures once; never count an old negative FCF a second time merely because it was re-reported. Separate quarter from TTM, OCF−cash PPE proxy from issuer FCF, and cash PP&E from lease principal. Identify AI vs non-AI CapEx limitations. Test whether lease normalization or issuer comparability could change the level.

For 2026-11-02 cutoff, the provisional R2=2 and Challenger=67.5 are **not automatically certified** by this protocol. The conservative R2=1 produces 60.0; both remain ALERT. The 60.0–67.5 range is **classification sensitivity, not a confidence interval**. Reviewer must determine whether incremental deterioration beyond 2026-10-14 suffices for level 2. If not, preserve R2 as 1 or 1–2 uncertain, with explicit rationale. No retroactive rewriting of 2026-10-14 YAML.

## Research acceptance checklist

- [ ] Confirm PIT source boundaries and provenance for decisive evidence.
- [ ] Confirm frozen factor definitions, weights, thresholds and no historical rewrite.
- [ ] Check incremental vs baseline evidence, periods, duplicate counting, and major counterevidence.
- [ ] Record selected level, confidence, coverage, UNKNOWN fields, alternative classifications and total-score sensitivity.
- [ ] Reproduce arithmetic deterministically; run applicable tests/CI against latest PR head, or disclose a specific technical blocker.
- [ ] Reviewer explicitly accepts **research sufficiency** or names a concrete blocking defect.

**Outcomes:** `RESEARCH_ACCEPTED`, `RESEARCH_ACCEPTED_WITH_UNCERTAINTY`, `RESEARCH_PARTIAL`, or `RESEARCH_BLOCKED`. These labels describe evidence governance, **not** predictive accuracy or permission to trade. `NO_TRADE` remains in force under current model governance.

## Relationship to PR #128

This protocol proposes replacing open-ended demands for *absolute* coverage with bounded source-universe review and explicit sensitivity analysis. It does not waive critical unresolved source/lease discrepancies, the latest-head CI requirement, or independent review. PR #128 should be reassessed against these explicit criteria, not auto-approved or auto-merged.
