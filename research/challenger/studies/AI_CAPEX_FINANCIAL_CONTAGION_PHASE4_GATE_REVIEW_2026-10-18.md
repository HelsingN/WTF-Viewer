# Financial Contagion — Phase 4 Gate Decision & PIT Recovery, 2026-10-18

**Status: PHASE 4 GATE REVIEW COMPLETE / DEFER PREDICTIVE IMPLEMENTATION.** This is an evidence-based feasibility decision, NOT out-of-sample model validation. No change to Champion, Challenger, F1–F5/R1–R7/P1–P4, Macro, H, technical-v1, scores, trades or strategy. No local historical OHLCV sent to GitHub.

## 1. Decision

- **DEFER** any new numeric contagion / fragility scoring, predictive backtest, or trade gate. The preregistered [Phase 3 protocol](AI_CAPEX_FINANCIAL_CONTAGION_PHASE3_METHOD_SELECTION_2026-10-18.md) requires a first-public-availability series, independent qualifying financing events across structures and regimes, and comparison against existing F3/R4/M4/H. This pilot has **four design-case structures and zero independently held-out validation structures**. No incremental predictive performance can honestly be estimated.
- **ALLOW documentary event review ONLY INSIDE existing forensic-monitoring contract** ([credit stress contract](../AI_FINANCING_CREDIT_STRESS_CONTRACT_v1.md) and [monitor template](AI_FINANCING_CREDIT_STRESS_MONITOR_TEMPLATE.md)). No new pipeline or scheduled trading/alert component is authorized.
- **COLLATERAL/FIRE SALES: scenario only** with explicitly hypothetical price/haircut/LTV assumptions; no observed forced liquidation established.
- **DebtRank/CoVaR/SRISK/power-law criticality: DEFER**, due to exposure graph and power/PIT constraints.

## 2. Direct primary PIT recovery (new Phase 4 evidence)

SEC EDGAR *Filing Detail* archival index independently checked on 2026-10-18:

|Case / exact issuer accession|Economic as-of / event|Filing Date|SEC 'Accepted' Eastern Time (EDT)|Derived UTC, America/New_York DST|Validated information and boundary|
|---|---|---|---|---|---|
|CoreWeave 8-K [0001769628-26-000129](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000129/0001769628-26-000129-index.htm)|2026-03-30 facility agreement|2026-03-31|**2026-03-31 08:59:24 ET**|**2026-03-31T12:59:24Z**|8-K lists entry into credit agreement and material obligation; filed EX-10.1. Time is SEC acceptance, NOT proven earliest prior press release or instantaneous public dissemination.|
|IREN annual 10-K [0001878848-26-000052](https://www.sec.gov/Archives/edgar/data/1878848/000187884826000052/0001878848-26-000052-index.htm)|2026-06-30 balance sheet|2026-08-27|**2026-08-27 16:18:57 ET**|**2026-08-27T20:18:57Z**|SEC 10-K lists EX-10.35 credit agreement, EX-10.36 note purchase, EX-10.37 common terms, EX-10.38 limited parent guarantee. **Do NOT backdate** June balance disclosures to June trading decisions.|

SEC's [EDGAR submissions API](https://www.sec.gov/search-filings/edgar-application-programming-interfaces) provides public, keyless entity filings data with acceptedDateTime; SEC says responses are updated as filings disseminate, but publication/dissemination delay can vary. The index 'Accepted' time is **not automatically an independently verified actual dissemination/terminal-read timestamp**. Preserve accepted_at separately from available_at; require verification of no earlier independent disclosure before using it as earliest public knowledge.

**Remaining two cases (partial date only):** Meta / Blue Owl Hyperion: issuer IR announcement [2025-10-21](https://investor.atmeta.com/investor-news/press-release-details/2025/Meta-Announces-Joint-Venture-with-Funds-Managed-by-Blue-Owl-Capital-to-Develop-Hyperion-Data-Center/default.aspx), intraday publisher timestamp and revisions not established. Lambda: [2026-08-12 pricing](https://lambda.ai/blog/lambda-prices-926-million-senior-secured-term-loan-b-facility), [2026-08-27 closing](https://lambda.ai/blog/lambda-closes-926-million-senior-secured-term-loan-b-facility), [2026-10-01 closing](https://lambda.ai/blog/lambda-closes-1-billion-senior-secured-fixed-rate-financing); exact first-publication timestamps and stable original page versions **UNKNOWN**. No next-day heuristic may be labeled PIT-certified.

## 3. Credit price feasibility refresh

|Source|Verified capability|What cannot be assumed|Assessment|
|---|---|---|---|
|[FINRA Bond Facts / Market Data Center](https://syndication.finra.org/content/just-factsbond-facts)|Public lookup for CUSIP and extended security trade history for individuals|Automated bulk point-in-time issuer-level bond curves, complete liquidity and intraday coverage|**MANUAL FREE / AUTOMATED BULK UNKNOWN**: first check candidate CUSIP eligibility and trade history, log instrument and timestamps; do not scrape against terms|
|[FINRA TRACE overview](https://www.finra.org/sites/default/files/TRACE_Overview.pdf)|Price/yield/time of disseminated eligible corporate bond trades; delayed viewing may be free for nonprofessionals|Unlimited historic transaction research dataset free of licensing; enhanced historical TRACE is subject to agreements/fees|**NOT PROVEN FREE for full historical project**|
|[ALFRED vintage series example](https://alfred.stlouisfed.org/series?seid=BAMLC0A1CAAA)|Public *macro index* vintages and timing for broad OAS index|Exact neocloud/project-level spread; index is not bond-specific. ICE BofA FRED series note says beginning Apr 2026 only trailing ~3 yrs, which limits historical regime replay|**FREE macro control, NOT project signal**|

Historical TRACE intraday/secondary quote data and actual GPU collateral mark-to-liquidate datasets are not demonstrated freely available for this cohort. Do not fabricate bond repricing trajectories by comparing different borrowers or loans with different tenors and guarantees.

## 4. Baseline overlap audit and falsification

|Observation|Already in project|Incremental uniqueness in present pilot|Decision|
|---|---|---|---|
|Successful CoreWeave facility and debt service covenant|F3, R4, forensic credit_state|Publication timestamp, contractual exhibit cross-reference|**DATA QUALITY IMPROVEMENT only**, not new predictive signal|
|IREN committed vs drawn, limited guarantees, customer offtake|F3/F5; R3/R4/R5; forensic ledger|Delayed SEC disclosure vs 30 Jun period-end; detailed contract index|**ANTI-LEAKAGE IMPROVEMENT**, not validated early-warning|
|Meta–Blue Owl JV residual-value guarantee and lease mismatch|Forensic ledger, R3/R4/R5|Distinct campus-building collateral vs GPUs, guarantee overlap|**CAUSAL CLASSIFICATION IMPROVEMENT** only|
|Lambda executed attractive IG/customer-secured closings|R4 and documented credit access|Negative / anti-shutdown control|**PRESERVE COUNTEREVIDENCE**; not crisis evidence|

**Falsification:** if CFF produces only a second ledger of the same public financing events already counted in F3/R4/M4, its incremental value is NULL. It must not count one underlying financing agreement three times. Debt closure at decent terms and covenant compliance are contradictory evidence against immediate stress; do not suppress them.

## 5. Frozen go/no-go gates and observed status

|Gate from Phase 3|Required|Observed at Phase 4|Verdict|
|---|---|---|---|
|PIT|First-public availability with defensible document version per signal|2 SEC accepted times, 2 issuer-only events remain calendar-day, first availability not exhaustively proven|**FAIL / PARTIAL**|
|Matched credit market data|Comparable real issue-specific dated spread/yield and benchmark if testing spread signals|No matched bond yield series independently acquired|**FAIL**|
|Independent event/sample floor|At least 30 independent eligible events, 10 unrelated structures, >1 market/financing regime, with power assessment|Four selected design cases, zero held-out cohorts; rates and historic failure events not enumerated|**FAIL**|
|Outcome/censoring and counterevidence|90-day confirmed financing deterioration separately from leading observation, unknown/censored handled|Some closings known; insufficient independent outcome data, some cases not yet completed 90-day windows|**FAIL**|
|Incremental vs baseline|Earlier novel documentary warnings than unchanged F3/R4/M4/H, false alarms quantified|No empirical comparison possible, and key observations overlap existing forensic ledger|**NOT DEMONSTRATED**|
|Trading authority|No promotion without separate audit/versioned governance|None requested/implemented|**PASS**|

## 6. Concrete resumption checklist

1. Obtain verified first-public timestamps (EDGAR accepted metadata plus dissemination checks, issuer release page revisions) for 3–5 more examples and register economic-event date separately.
2. Conduct an instrument-identified *manual* FINRA lookup pilot (CUSIP, dates, quotation and trade count) for a genuinely public AI-project issuer bond; if absence/price gating, mark source ineligible. No API scraping or inferred marks.
3. Expand beyond the four design cases to an **unbiased prospective event cohort**, including financing closures, withdrawn/failed syndications and companies that disappeared/restructured; record all candidates and censoring.
4. Only once sufficient independent cohorts and market regimes exist, implement the preregistered 90-day outcome evaluation versus **frozen baseline**. Report intervals, reporting delays and false alarms; otherwise **DEFER**.
5. If document-only evidence cannot beat existing F3/R4/M4 forensic capture, **REJECT** standalone CFF candidate and invest effort into source-timestamp quality and credit monitoring instead.

## 7. Final governance and research disposition

**PHASE 4 FINISHED AS GATE REVIEW. Result: DEFER quantitative predictive implementation.** Conditional manual/documentary capture remains under *existing* financing-monitoring authority (research only), not a separate new model. This is an explicit negative/insufficient-data outcome, not a claim that a new model was trained, tested or failed on adequate sample.

Review and merge lineage: Phase 1 PR #82 → Phase 2 PR #83 → Phase 3 PR #84 → Phase 4 stacked PR; all were open when this review started. Merge in order and inspect CI/review. No local market data copied.
