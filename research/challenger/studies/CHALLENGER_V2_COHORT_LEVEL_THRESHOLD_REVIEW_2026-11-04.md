# Challenger v2 — method review: issuer cohort, levels, thresholds

**Date:** 2026-11-04. **Scope:** research-method review, NOT predictive validation, engineering merge authorization or live cutover.
**Disposition:** RESEARCH METHOD ACCEPTED WITH EXPLICIT UNCERTAINTY. PR #132 remains Draft, Champion/automations/v1 untouched.

## 1. Material reviewed

Existing five-issuer matched R1 revenue/CapEx YoY pairs; five R2 issuer cash-flow comparisons and accounting-basis limitations; CoreWeave/IREN financing SEC filings; Oracle Jupiter borrower ambiguity; successful Lambda financing as opposing evidence; Phase C qualified-event triage; five-date one-time POSTHOC replay with three sensitivity settings. Primary source spot-check: Microsoft FY27Q1 investor financial tables confirm revenue 92.279/77.673, OCF 58.000/45.057, cash PPE 39.367/19.394 (USD bn); Oracle FY27Q1 SEC cash flow confirms OCF 23.103/8.140, CapEx 28.499/8.502 and 11.363 financing-component prepayments. The source panel has not been independently recertified for every other issuer/release minute.

## 2. Fixed cohort decision — ACCEPT for prospective RESEARCH only

| Factor | Frozen membership for next prospective research version | Fixed weights and role |
|---|---|---|
| R1 | MSFT, GOOGL, AMZN, META, ORCL | 20% each, same-issuer enterprise monetization/investment proxy |
| R2 | MSFT, GOOGL, AMZN, META, ORCL | 20% each, OCF/CapEx/cash-basis and lease reconciliation within each issuer |
| R4 | MSFT, GOOGL, AMZN, META, ORCL, CRWV, IREN | Five platforms 10% each = 50% of R4, two public neocloud operators 25% each = 50% |
| R4 contextual counterexamples | Private Lambda | ZERO core weight: executed IG-backed customer financing remains anti-credit-freeze evidence |

R4 is a deliberately stratified **stress-observation sample**. It is NOT a market cap, not a sector exposure weight, not a default probability. Concentration of 50% of R4 in CRWV+IREN is a major bias, and 30% project weighting in a sensitivity test was not empirically proved better. Keep the 50/50 proposal for **one forward research specification only** with mandatory platform/project stratum coverage and reassess after two public reporting cycles. Do not substitute a company merely because it has not reported. Keep UNKNOWN issuer weight in the denominator. First real cohort freeze timestamp must be taken from the versioned manifest commit, **not** backdated to Sep/Oct/2 Nov.

## 3. Research 0/1/2 classification and adopted initial operating diagnostics

The scale is ordinal: 0 = documented stable/improving/absence of watch, 1 = WATCH, 2 = confirmed material worsening, UNKNOWN = unclassifiable. These are *research decision conventions*, not statistically validated reversal predictors.

**R1:** Use same-company same-period YoY consolidated cash CapEx versus consolidated revenue. Level 1 if CapEx YoY growth − revenue YoY growth >= **20 percentage points** and CapEx/revenue intensity rises. Both tests are mathematically linked, not independent confirmation. Cloud-segment growth is independently retained as counterevidence. Level 0 needs stable/improving comparable ratio plus no adverse contrary facts. Level 2 requires repeated deteriorating observations **and separate source evidence** of weakening realized cash yield, payback or retrenchment caused by weak returns. High CapEx alone is never level 2. The measured condition is enterprise capital deployment pacing, **not AI-only project ROI**.

**R2:** Compute gross cash PPE proxy = OCF−cash PP&E; net proxy adds only proven incentives; lease-inclusive FCF subtracts only proven lease principal. Missing incentives/leases stay UNKNOWN, not 0. Level 1 if latest comparable FCF/proxy is negative OR if same-basis proxy/OCF margin declines >= **10 percentage points** and both OCFs are positive. A proxy has **maximum automatic candidate level 1**, never 0 or 2. For level 0 require two complete, non-deteriorating lease-inclusive positive periods and counterevidence review; level 2 requires two genuinely complete negative worsening periods with seasonality/materiality review, or independently documented cash-flow emergency caused by investment economics. The 10pp rule is a **provisional policy materiality gate**; 30pp was a one-off sensitivity scenario, not a parallel model.

**R4:** The legal borrower and parent/project-SPV attribution must be established. Level 0 requires funding availability with like-for-like stable/improving terms and no material incremental dependence. Level 1 requires documented **material incremental** borrower-specific guarantees, collateral, financing dependence or verified syndication difficulty against a meaningful baseline; ordinary customary collateral is insufficient. Level 2 requires actual issuer/structure refinancing failure, covenant breach, or *same-instrument* materially worse terms coupled with confirmed rollover dependence. Proposals, undrawn options, rating negative outlooks and heterogeneous bond coupons are not proof of level 2. Credit closings are mandatory contrary evidence.

**Relationship of R1 and R2:** Both respond to the same CapEx surge. Their metrics cover different economic claims, but are correlated; no claim of independent probability confirmation or double counting as extra event points. Retain fixed relative factor ratios R1:R2:R4 = 20:15:20 for the single research model, not as estimated optimal weights.

## 4. Provisional issuer-level decisions from 2-Nov source observations

| Issuer | R1 | R2 | R4 | Core reasoning |
|---|---|---|---|---|
| MSFT | 1 candidate | 1 candidate | UNKNOWN | R1 growth gap +84.181pp; R2 margin 56.957%→32.126% (−24.831pp), cash proxy still positive; leases not fully normalized |
| GOOGL | 1 candidate | 1 candidate | UNKNOWN | R1 gap ~+89.447pp; Cloud +103% opposing monetization-collapse claim; negative cash PPE proxy |
| AMZN | 1 candidate | 1 candidate | UNKNOWN | R1 gap +108.057pp; negative net cash PPE proxy; profitable AWS; optional facility ≠ drawn debt |
| META | 1 candidate | 1 candidate | UNKNOWN | R1 +54.194pp; complete issuer FCF +0.784→−2.120 (one negative quarter); rating outlook not failure |
| ORCL | 1 candidate | 1 candidate | UNKNOWN | R1 +205.597pp; negative cash proxy; 11.363bn customer prepayment financing component; Jupiter SPV debt cannot automatically become Oracle parent risk |
| CRWV | n/a | n/a | 1 conditional candidate | SEC Aug11 Q2 10-Q confirms CCAC VIII $8.5bn DDTL4 commitment/$2.837bn funded Jun30, limited parent bad-acts guarantee; financing successfully accessed (not issuer default) |
| IREN | n/a | n/a | 1 conditional candidate | SEC Aug27 10-K confirms IE US Hardware 3 LLC $3.645bn commitments/$0.938bn actually funded Jun30; limited parent hedge/remarketing recourse and stated covenant compliance |

Lambda stays unscored anti-freeze context. **These labels are accepted only as provisional retrospective research classifications, NOT as fully PIT-certified prospective input**. No new combined v2 point score is approved, and the Nov-2 [40.91,59.09] range remains a POSTHOC, unvalidated arithmetic illustration.

## 5. Sufficiency and stop thresholds — ACCEPTED AS RESEARCH POLICY

- Each core factor requires >= **70% fixed-weight observed coverage** for a COVERAGE_OK label. With five equal 20% issuers this means at least **4/5** eligible. R4 additionally requires **>=60% of its large-platform sub-cohort** and at least **one of CRWV and IREN**; otherwise it is LOW_COVERAGE regardless of aggregate coverage. These coverage thresholds do not magically validate a factor and do not require more searching.
- Any unknown source/issuer contributes to the interval bounds, NOT a silently filled 0, 1 or mean. No exact score unless lower=upper.
- R3/R5/R6/R7 ±4/3/4/4 event caps and decay half-lives 90/90/60/90 days remain **bounded research guardrails**; economic predictive calibration is NOT accepted. Do not create events from the old v1 0/1/2 values.
- No v2 ALERT/ELEVATED category threshold is approved. The present output must have an uncalibrated/null category and NO_TRADE, and it may report LOW_COVERAGE.
- One finite issuer source check: current primary filing, comparable prior filing, and at most a targeted check if material counterevidence or borrower conflict exists. STOP with UNKNOWN or ASSESSED_WITH_UNCERTAINTY if unavailable; no endless private AI ROI project data search.

## 6. Explicit acceptance vs outstanding gates

**RESEARCH ACCEPTED:** fixed issuer roster, the disclosed 50:50 R4 panel convention, 20pp R1 and 10pp R2 WATCH diagnostics (not empirically calibrated), strict R4 materiality/borrower attribution, the 70% coverage floor plus R4 stratum checks, and preliminary individual WATCH candidates.

**NOT ACCEPTED AS LIVE:** certification of all original publication timestamps and source metadata, final CRWV/IREN parent/structure credit stress levels, predictive validation or v2 score bands, reviewer approval of the PR code and merge, scheduler cutover or trading authority. A proposed source-time claim does not become certified merely because it has a plausible date. Preserve old v1 immutable. Only one future regular Challenger after separate explicit effective-date cutover.

This is a **research method review** performed at the user's request; independent GitHub reviewer PASS is **not** implied. PR #132 remains Draft.
