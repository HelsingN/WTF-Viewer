# PR #132 — Challenger v2 technical review (research-only release gate)

**Date:** 2026-11-04 (Israel). **Scope:** technical correctness and merger readiness of PR #132, NOT model predictive validation, NOT independent maintainer approval, NOT production activation.
**Reviewed branch:** research/challenger-v2-observable-core-2026-11-03 into main.
**Review recommendation:** **TECHNICAL PASS WITH DOCUMENTED LIMITATIONS, conditional on exact-head CI after this report.** No automated reviewer may self-issue the maintainer's formal PASS.
**Release type:** only a DORMANT, manually invoked, unclassified research module (not current Challenger, alerts, Champion or trading).

## Diff / deployment boundary

GitHub comparison against main@dd0afec2f959f83e3dbb436ae2f064aff03b2b4a showed **28 added files, no existing files modified or removed** (before this review note). The additions are the v2 design and five-step research reports, source registry and input manifests, pure Python scoring and calculations, three read-only research scripts, and test files. No modifications to existing package runtime, API, broker, strategy, automations, Docker/compose, scheduling hooks or .github/workflows were present in this PR. The diff is large (3k+ added lines, ~90 commits), but bounded to the distinct research-only capability. If the head or base changes, recheck this statement and CI.

## Five control areas — findings

| Control area | Finding | Evidence and residual limit |
|---|---|---|
| 1. Contract / model implementation | **TECHNICAL PASS — RESEARCH ONLY** | R1/R2/R4 factor weights 20:15:20; fixed R1/R2 5x20%, R4 five large x10% + CRWV/IREN x25%; explicit source 20pp R1/10pp R2 WATCH rules; R4 material incremental financing gate. Cohort YAML freeze is not backdated; tests reject mismatched weights/timestamps. |
| 2. PIT / missingness / arithmetic | **TECHNICAL PASS WITH SOURCE-MANUAL REVIEW** | Future-dated sources reject; date-only or unqualified source is UNKNOWN; conservative public-by explicitly distinguished from first-public; sources expire; unknown weights remain in intervals. R4 total >=70% AND platform >=60% AND project >=50% sufficiency. Five Sep–Nov historical periods were correctly labeled POSTHOC and are NOT an out-of-sample test. Source timestamps in registry still represent a conservative policy bound, not verified earliest dissemination. |
| 3. Event evidence / anti-double-count | **TECHNICAL PASS WITH UNCALIBRATED EFFECT SIZE** | Unique event IDs and (root,effect) key; exclude core-overlap unless distinct independently confirmed effect; supersession, status/expiry, stale state, confidence and signed two-sided effect tested. No new scored R3/R5/R6/R7 outcomes were accepted; ±4/3/4/4 caps not empirically calibrated. Different financial measurements of the same spending cycle are correlated, not statistically independent confirmations. |
| 4. Safety / integration | **TECHNICAL PASS** | All modified paths belong to new research source, tests, docs and data. Code is pure/read-only: evaluator returns JSON with category=None and trading_signal=False, CLI parses local YAML and prints results. No HTTP client, broker orders, mutation or scheduled execution in these modules; no legacy v1 historical edits. Merely merging files does not activate recurring v2 monitoring. |
| 5. Documentation / runnable example | **DEFECT FOUND AND FIXED — REQUIRES NEW CI** | The YAML template had an uncommented 4-space availability_basis line inside a commented example, making the file invalid for PyYAML. Corrected in data/research/challenger/challenger_v2_input_template.yaml and added regression test in tests/test_challenger_v2_approved_cohort.py checking YAML parse, interval [0,100], LOW_COVERAGE, category=null, trading_signal=False. The existing 596-test green run predates this fix and is NOT accepted for the new head. |

## Source / borrower assessment (bounded)

Existing seven-issuer source register stores SEC acceptance, next-business-day-noon conservative public-by, legal borrower's name and financing amounts. Five R1/R2 enterprise finance panels support conditional WATCH 1 research candidates, but the R1 enterprise CapEx/revenue growth signal is NOT project AI IRR and R2 non-Meta cash figures do not include every lease component. CoreWeave DDTL 4.0 $8.5bn *commitment*, $2.837bn drawn at Jun 30, SPV CCAC VIII and limited parent bad-acts guarantee; IREN IE US Hardware 3 LLC $3.645bn *commitments*, $0.938bn funded Jun 30 and limited parent support; successful borrowing is material opposite evidence, not credit stress level 2. The five major platform R4 issuer levels remain UNKNOWN; R4 known weighted coverage only 50% and platform coverage 0%, therefore a prospective research snapshot with only these observations MUST say LOW_COVERAGE, no exact forecast or alert category.

Sources: data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml; Docs/research/CHALLENGER_V2_SOURCE_PIT_AND_R4_FINAL_REVIEW_2026-11-04.md; Docs/research/CHALLENGER_V2_SOURCE_AND_R4_FINAL_FINITE_REVIEW_2026-11-04.md.

## Defect register

| ID | Severity | Description | Disposition |
|---|---|---|---|
| TECH-132-01 | MAJOR usability | YAML CLI input example invalid due to an uncommented field embedded in a comment-only sample. Existing unit suite did not assert example parse. | **FIXED IN BRANCH; REGRESSION TEST ADDED.** Verify new exact-head CI before any merge. |
| TECH-132-02 | DOCUMENTED MODEL LIMIT | Research user could supply a manually claimed issuer level even with contradictory evidence, because pure evaluator verifies syntax/provenance/PIT, not actual meaning or external source truth. | **ACCEPTED FOR DORMANT RESEARCH ONLY.** Production activation requires owned source-ingest/reviewer governance, cannot silently promote sample to canonical score. |
| TECH-132-03 | DOCUMENTED MEASUREMENT LIMIT | Incomplete R4 platform signal, conservative SEC accepted+lag rather than exact dissemination, capex-FCF correlated factors, no validated new alert threshold. | **ACCEPTED AS LOW_COVERAGE/UNKNOWN; NO CATEGORY AND NO_TRADE.** Future issuer refresh required for a real level; private unobservable facts do not mandate infinite audits. |
| TECH-132-04 | GOVERNANCE | Formal reviewer PASS and exact-head CI check are separate from this technical review. | **OPEN.** Maintainer must post explicit PASS, verify tested SHA and base under Docs/REPOSITORY_GOVERNANCE.md before Merge. |

## Release decision and remaining gates

**Recommended:** merge *only after* exact latest-head CI completes successfully, formal authorized maintainer/reviewer PASS, and base/head validation. For this dormant research-only PR, further market-wide source investigations or predictive recalibration are NOT prerequisites to storing the tools in main; they ARE prerequisites to treating v2 as an authoritative current alert. No simultaneous recurring v1/v2 run.

**Do not:** automatically activate v2, disable v1, modify AI CapEx Daily Close/Event Alerts, invent new threshold categories, infer risk level R4=0 for unknown platform creditors, enable trading, or count the 2-Nov posthoc range as a live score.

**Final review status:** TECHNICAL_REVIEW_DONE / RESEARCH_ONLY / MERGE_RECOMMENDED_CONDITIONALLY / FORMAL_REVIEWER_PASS_REQUIRED / ACTIVATION_BLOCKED. This report itself is not GitHub review approval.
