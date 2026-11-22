# Challenger v2 — finite issuer source/PIT and R4 legal-borrower review

**Prepared:** 2026-11-04. **Status:** FINITE SOURCE REVIEW COMPLETE / RESEARCH-ONLY / NO PR MERGE PASS / NO CUTOVER.
**Input registers:** data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml, challenger_v2_recovered_observables_2026-11-02.yaml; decision rules and research-approved prospective roster, both dated 2026-11-04.

## Scope and acceptance rule

Only seven relevant issuer source records were reviewed, not private project IRR, unknown GPU utilization, TRACE spreads or a full market-wide audit. Existing EDGAR accession metadata and same-issuer accounting comparisons were used, with a targeted independent source check for CRWV/IREN. Source accepted_at in SEC index is not a guaranteed first-public minute; the register uses **next full US business day at 12:00 ET** as a conservative **known-public-by policy bound**. The 2026-11-02 retrospective cutoff is **not** the prospective freeze date. Review does not imply an independently observed release time or a previously preregistered cohort.

## Decision register — seven fixed issuers

| Issuer | Source/PIT provenance | R1/R2 source and level decision | R4 borrower/credit decision | Final finite-review disposition |
|---|---|---|---|---|
| MSFT | SEC FY27Q1 10-Q accepted 2026-10-28 16:07:39 ET; public-by bound Oct29 noon | Comparable R1 enterprise gap +84.181pp, R2 cash proxy/OCF -24.831pp. 1/1 **conditional issuer WATCH**, incomplete lease normalization prevents R2 0 or 2 | Credit-access evidence incomplete, no matched incremental deterioration; UNKNOWN | SOURCE_TIME_ACCEPTED_BY_CONSERVATIVE_POLICY; CANDIDATE_LEVEL_1; R4 UNKNOWN |
| GOOGL | SEC 2026Q3 10-Q accepted Oct28 20:29:06 ET; Oct29 noon bound | R1 +~89.447pp approximate; R2 latest negative cash PPE proxy. 1/1 **conditional**; rounded R1 input does not threaten 20pp crossing | Successful bond access opposes freeze; terms baseline insufficient for 0; UNKNOWN | SOURCE_TIME_ACCEPTED_BY_CONSERVATIVE_POLICY; CANDIDATE_LEVEL_1; R4 UNKNOWN |
| AMZN | SEC 10-Q accepted Oct29 18:20:46 ET; earnings 8-K accepted Oct29 16:05:27; Oct30 noon bound | R1 +108.057pp; R2 negative net cash PPE proxy. 1/1 conditional; separate TTM not mixed | Optional/undrawn credit proposal is not actual distress; UNKNOWN | SOURCE_TIME_ACCEPTED_BY_CONSERVATIVE_POLICY; CANDIDATE_LEVEL_1; R4 UNKNOWN |
| META | SEC earnings 8-K accepted Oct21 16:03:35 ET; Oct22 noon bound | R1 +54.194pp; R2 issuer lease-inclusive FCF +0.784→-2.120 in sequential quarters, caveat seasonality; 1/1 conditional | Negative credit outlook alone insufficient; UNKNOWN | SOURCE_TIME_ACCEPTED_BY_CONSERVATIVE_POLICY; CANDIDATE_LEVEL_1; R4 UNKNOWN |
| ORCL | SEC FY27Q1 10-Q accepted Sep11 16:10:12 ET; Sep14 noon bound | R1 +205.597pp; R2 cash PPE proxy negative, OCF includes 11.363bn financing-component customer prepayment. 1/1 conditional | Jupiter/STACK/Blue Owl SPV stress NOT legally mapped to Oracle parent. UNKNOWN | SOURCE_TIME_ACCEPTED_BY_CONSERVATIVE_POLICY; CANDIDATE_LEVEL_1; R4 UNKNOWN |
| CRWV | SEC 2026Q2 10-Q accepted Aug11 19:24:42 ET, Aug12 noon bound; March30 agreement separately filed | Not in R1/R2 cohort | **R4=1 documentary research candidate accepted at consolidated financing-dependence scope only**: CCAC VIII, indirect subsidiary, new 8.5bn DDTL4 commitment, 2.837bn outstanding Jun30, non-recourse except limited bad-acts guarantee. SEC filing confirms successful credit access, liquidity and covenant constraints. NO parent default, NO claim full 8.5bn drawn or unconditional parent guarantee. | SOURCE_AND_BORROWER_ACCEPTED_CONDITIONAL_WATCH; **not R4=2** |
| IREN | SEC 2026 10-K accepted Aug27 16:18:57 ET, Aug28 noon bound | Not in R1/R2 cohort | **R4=1 documentary research candidate accepted at consolidated financing-dependence scope only**: IE US Hardware 3 LLC, 3.645bn committed = 1.545bn DDTL + 2.1bn notes, 0.938bn funded Jun30; limited parent hedge/remarketing support, covenants compliant. MSFT customer contract and successful funding are opposing evidence. NO general parent guarantee. | SOURCE_AND_BORROWER_ACCEPTED_CONDITIONAL_WATCH; **not R4=2** |

Primary original links are preserved in the source eligibility register; spot-checks:
- CoreWeave SEC 10-Q https://www.sec.gov/Archives/edgar/data/1769628/000176962826000366/crwv-20260630.htm and March 8-K https://www.sec.gov/Archives/edgar/data/1769628/000176962826000129/crwv-20260330.htm.
- IREN SEC 2026 10-K https://www.sec.gov/Archives/edgar/data/1878848/000187884826000052/iren-20260630_htm.xml and filed annual report https://www.sec.gov/Archives/edgar/data/1878848/000114036126039453/ny20078226x3_ars.pdf.
- The original EDGAR index for each issuer and accepted_at/public-by policy are in the repository register; they remain auditable rather than copied as unqualified real-time market observations.

## Sufficiency and exact research boundary

The five R1 and five R2 source records have **conservative source-public availability support**, but all issuer 0/1/2 levels remain *conditional research classifications*, not prospective investor observations. R4 CRWV/IREN source, borrower and financing structure are sufficiently documented to accept **conditional 1** at consolidated financing-reliance scope; their known counterevidence explicitly limits risk interpretation. No reason to reopen an unlimited private borrower investigation.

R4 platforms remain five UNKNOWN (fixed total 50%); CRWV/IREN observed conditional candidates total 50%. **R4 overall coverage 50% (<70%), platform-stratum coverage 0% (<60%), project-stratum 100% (>=50%)**. Hence R4 is LOW_COVERAGE. The historical 2-Nov interval [40.91,59.09] is only an unvalidated retrospective mechanical illustration. No exact prospective core or final score, no calibrated v2 alert category.

## Engineering/merge decision

**Source review: PASS WITH EXPLICIT LIMITATIONS.** Research specification and source register sufficient for an *unclassified, research-only* v2 calculator. The input model must enforce source public-by time, source expiry and borrower attribution for all scored rows. No new source data may be backdated to earlier vintages.

**PR readiness: REQUIRES INDEPENDENT CODE REVIEW AND CURRENT-HEAD CI**; do not equate this source-review PASS with the repository governance PR PASS. The next finite engineering step is ensure the CLI/report clearly returns LOW_COVERAGE and category=null for approved research roster when R4 platform data are UNKNOWN; verify no existing scheduled Challenger v1 job is modified by merging this research-only PR. The PR may be made ready for reviewer after that gate, but **do not activate v2, delete v1 history or create parallel recurring monitoring**.

**Stop rule:** source and borrower verification complete. Reopen only on a new public issuer filing, materially contradictory borrower/parent legal documentation, demonstrated misstatement or source availability discrepancy; missing nonpublic IRR, spreads and GPU occupancy do not block research.
