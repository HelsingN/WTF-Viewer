# Challenger v2 — Phase B decision rules for R2 and R4 (bounded review)

**Prepared:** 2026-11-04, after recovering the Nov-2 source-vintage issuer tables. **Status:** RESEARCH RULES PROPOSED / ISSUER CANDIDATES COMPUTED / NO APPROVED MODEL OR CUTOVER.  
**Companion:** Docs/research/CHALLENGER_V2_PHASE_B_QUANTITATIVE_DECISIONS_2026-11-03.md and src/scoring/challenger_v2_metrics.py. **Important:** the old v1 R2=2 remains archived; this file does not re-audit or change it.

## R2 — a numerical issuer score can be computed from *partially* normalized cash flow, but with a maximum justified strength

For each issuer, measure on a SAME-period/same-accounting-basis comparison:
- Gross cash flow after PP&E = operating cash flow − cash PP&E purchases.
- Net cash PP&E proxy = gross proxy + verified disclosed PP&E incentives.
- Lease-inclusive issuer FCF = net cash PP&E proxy − verified finance lease principal. Unknown lease/incentive is NULL, not 0.
- Define **FCF proxy / OCF margin** as (matched proxy / OCF) ×100, for OCF >0, and its **change in percentage points**.
- Compare matched quarter with prior-year quarter preferred. Sequential changes allowed only for clearly labeled comparable quarter series (e.g. Meta) with seasonality caveat. Never compare latest quarter with previous TTM.

**0** may be proposed only with verified complete lease-inclusive positive FCF for at least two comparable periods AND no material deterioration or independently adverse evidence. A large positive *gross* proxy alone is **not** enough.
**1 WATCH** may be proposed if latest matched FCF/proxy <0 OR (both OCF values positive AND matched FCF/OCF margin falls **>=10 percentage points**). For incomplete finance-lease basis, this remains a **proxy WATCH candidate, maximum strength 1**, not a certified issuer level 2. The 10pp diagnostic is a priori **proposed** and needs sensitivity testing.
**2 confirmed material worsening** requires (a) fully reconciled, same-definition lease-inclusive FCF negative in **two comparable periods with worsening**, with qualitative review for seasonality; OR (b) independently verified cash-flow emergency linked to underlying investment economics (not merely bond issuance). Two negative gross proxies are not sufficient for 2. Material contrary evidence must be explicitly considered.

### Results from the existing five-issuer paired panel

| Issuer | Earlier → latest matched cash FCF proxy (USD bn) | FCF proxy/OCF earlier → latest | Change in pp | Proposed R2 issuer WATCH | Caveat |
|---|---:|---:|---:|---|---|
| MSFT FY26Q1→FY27Q1 | +25.663 → +18.633 | +56.957% → +32.126% | **−24.831** | **1** via 10pp pressure | Positive cash proxy and strong Azure growth; finance leases missing |
| GOOGL CY26Q2→Q3 | approx −5.800 → −9.060 | −14.834% → −21.418% | **−6.585** | **1** latest negative | Cash PPE proxy; lease treatment and rounding incomplete |
| AMZN CY25Q3→CY26Q3 | +1.297 → −33.456 | +3.651% → −78.865% | **−82.516** | **1** latest negative | Net PP&E proceeds matched, lease principal not included; do not mix with TTM |
| META CY26Q2→Q3 | +0.784 → −2.120 | +2.461% → −6.466% | **−8.927** | **1** latest negative | Lease-inclusive issuer FCF; liquidity still strong |
| ORCL FY26Q1→FY27Q1 | −0.362 → −5.396 | −4.447% → −23.356% | **−18.909** | **1** latest negative | Cash PP&E proxy; current OCF includes financing-component prepayments |

These are 5/5 **arithmetic candidates**, not five PIT-certified core issuer inputs and not five independent observed economic failures. Note capital spending common cause overlaps R1; do not count as independent confirming events.

## R4 — distinguish real dependence, finance transaction and worsening credit terms

A documentary observation can propose an issuer level only when (i) the **legal borrower** (or separately named SPV) is verified, (ii) source is primary or independently confirmed, (iii) material opposing evidence was checked, and (iv) the underlying result belongs to that borrower.

**0** (anti-warning / absence of incremental deterioration): requires documentary evidence of accessible funding plus comparable stable or improving cost/terms and no observed material dependence deterioration. **A single successful bond closing is not enough to assert 0**; this is an issuer-level window judgment.
**1 WATCH**: new *material* financing dependence (e.g. financing necessary to acquire/deploy contracted assets with independently documented maturity/reuse risk, new substantial guarantees/recourse), or separately verified syndication selectivity, while access remains functional. Ordinary collateral that has always been standard to the instrument is insufficient: an explicit **incremental_material_dependence_verified** gate is required.
**2**: a confirmed refinancing failure, true covenant/default event, or **same-instrument** credit repricing deterioration paired with verified rollover dependence. Comparing IG and non-IG loan coupons, proposed facilities, optional undrawn lines, and negative rating outlooks cannot establish 2.

### Seven public-company R4 panel + private counterevidence

| Entity | Defensible source observation | Proposed new R4 level from existing finite docs | Counterevidence / limitation |
|---|---|---|---|
| MSFT | Preliminary borrowing document; demand reported | UNKNOWN | Existing bond-access indications; preliminary coupons incomplete |
| GOOGL | Nov-2 bond issuance and strong order book | UNKNOWN | Actual capital access opposes generalized credit freeze; no matched worsening of terms |
| AMZN | Optional up-to-$80bn tech-secured facility | UNKNOWN | Undrawn capacity is not financing distress or proceeds |
| META | Secondary-confirmed negative S&P *outlook* | UNKNOWN | No downgrade, default, issuer original action unresolved |
| ORCL | Project Jupiter loans reported 89–91c and distribution difficulty | UNKNOWN for **Oracle parent** | Actual project borrower is Blue Owl/STACK SPV: **do not shift project credit outcome to Oracle parent**. Lease/prepayments remain parent context |
| CRWV | Original March 8-K plus Aug 11 10-Q: CCAC VIII **$8.5bn DDTL 4.0** commitment, $2.837bn outstanding Jun30, non-recourse with limited parent bad-acts guarantee. The previously written $2.6bn relates to different DDTL 3.0 | **1 WATCH — subsidiary funding dependence documented** | Financing closed and covenant disclosures available; no parent default or matched repricing proof |
| IREN | 2026 10-K: IE US Hardware 3 LLC new **$3.645bn commitments**, split $1.545bn DDTL + $2.1bn notes; **$0.938bn funded by Jun30**, limited hedge/remarketing parent guarantees | **1 WATCH — subsidiary financing dependence documented** | Parent not generally liable for whole SPV debt; compliant covenants, Microsoft-backed demand and available facilities oppose crisis |
| Lambda (outside roster) | $1.008bn closed IG-offtake-backed project finance at 6.78% | **ANTI-WARNING CONTEXT ONLY** | Private disclosures not fully periodic; do not score as 0 or require as eighth issuer |

**Current R4 candidate weight coverage is 50%** (CRWV 25% + IREN 25%). The other 50% fixed cohort weight remains UNKNOWN; do NOT renormalize it to two stressed issuers, nor force those five issuers to 0 because no default was reported. Under proposed equal within-stratum / 50:50 weights this yields R4 level interval **[0.50, 1.50]** (not a point level) *if* those two candidates are independently accepted at the historical PIT cutoff.

## Bounded remaining gate

- Financial **metrics** are already recovered; **do not repeat** the five-issuer R2 audit. Confirm only source/PIT eligibility, account scope and any decision-changing discrepancy. Materiality 10pp and R1 20pp remain proposed; run one-time explicit sensitivity.
- R4 check *only* project borrower/parent mapping for two relevant cases, whether the new financing arrangements are material relative to a documented baseline, and substantial opposing funding-closure evidence. Preserve UNKNOWN for other issuers rather than going indefinitely into unavailable bond TRACE data.
- Reviewer must accept roster weights and proxy construct definitions before any official v2 score. A low R4 coverage is an honest research outcome; no invented value or legacy score carry-forward.
- Versioned source/coverage table and post-hoc one-off test, not a new daily recurring audit. **NO_TRADE**, no stage/promotional or Champion change.
