# Challenger v2 — Phase B quantitative issuer measurements and remaining decisions

**Assessed:** 2026-11-03. **Evidence cutoff for the source panel:** 2026-11-02 16:00 EST; recovered retrospectively from source-linked research and filings.
**Status:** REPRODUCIBLE MEASUREMENTS + TENTATIVE ISSUER CLASSIFICATION / ROSTER NOT APPROVED / NOT LIVE PIT SCORE.
**Code:** src/scoring/challenger_v2_metrics.py. **Raw inputs:** data/research/challenger/challenger_v2_recovered_observables_2026-11-02.yaml.
**Run:** python scripts/research/measure_challenger_v2_observables.py --input data/research/challenger/challenger_v2_recovered_observables_2026-11-02.yaml

## What is measured vs what is inferred

- Measured arithmetic and source-dependent precision are distinct from *factor-level* economic conclusions. Corporate revenue and corporate CapEx can form a same-issuer, same-quarter **enterprise capital-intensity proxy**; this is **not AI-only ROI**. Cloud-segment growth is separately retained as strong opposing evidence rather than using unmatched Google Cloud revenue as a denominator for consolidated CapEx.
- For R2, gross cash-PPE FCF, net cash-PPE FCF and finance-lease-inclusive issuer FCF are DIFFERENT quantities. Null proceeds or leases never become 0.
- A documentary R4 financing item can support or refute risk but does not automatically determine the full issuer R4 0/1/2 regime, especially across legal entities and project SPVs.
- Proposed 20-percentage-point R1 divergence watch gate and R4 50/50 grouping are *unvalidated research design parameters*. They are not calibrated thresholds or decisions to trade.

## Quantitative R1 — five matched enterprise reporting pairs

A bounded targeted check of the issuers' existing comparative quarterly releases/SEC filings closed the remaining four year-ago cash CapEx denominator gaps. These data were **already public** by the 2-Nov 16:00 EST research cutoff; the original exact release minute must still be recorded as verified or a conservative known-public-by bound for each scored issuer. The exercise was performed on 3-Nov and is not a pre-registered September backtest.

| Company | Company revenue current / prior USD bn | Cash CapEx current / prior USD bn | Revenue YoY | CapEx YoY | Growth gap | CapEx/revenue intensity YoY | WATCH candidate |
|---|---|---|---:|---:|---:|---:|---|
| MSFT FY27Q1 | 92.279 / 77.673 | 39.367 / 19.394 | +18.804% | +102.985% | **+84.181 pp** | +70.857% | **1** |
| GOOGL CY26Q3 | total revenue +25% YoY (rounded in research) | 51.360 / 23.950 | +25.000% approx | +114.447% approx | **+89.447 pp** approx | +71.557% approx | **1** |
| AMZN CY26Q3 | 201.944 / 180.169 | 77.259 / 35.095 (gross purchases) | +12.086% | +120.142% | **+108.057 pp** | +96.405% | **1** |
| META CY26Q3 | 64.601 / 51.242 | 33.942 / 18.829 (gross purchases) | +26.070% | +80.264% | **+54.194 pp** | +42.987% | **1** |
| ORCL FY27Q1 | 19.345 / 14.926 | 28.499 / 8.502 | +29.606% | +235.203% | **+205.597 pp** | +158.633% | **1** |

**Formula:** revenue_growth = (revenue_current / revenue_previous − 1) ×100; capex_growth = (cash_capex_current / cash_capex_previous − 1) ×100; growth_gap_pp = capex_growth − revenue_growth; intensity_change_pct = ( (cash_capex_current / cash_capex_previous) / (revenue_current / revenue_previous) − 1 ) ×100. For Alphabet, reported +25% total revenue growth is rounded; amounts and results are therefore approximate. All comparisons are matching *within the issuer and YoY quarter*, not cross-issuer dollar sums.

**Source lineage, primary original tables:** [Microsoft FY27 Q1 IR](https://www.microsoft.com/en-us/Investor/earnings/FY-2027-Q1/press-release-webcast), [Alphabet CY26 Q3 SEC](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/goog-20260930.htm) plus saved Oct28 daily research, [Amazon CY26 Q3 IR](https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/default.aspx), [Meta CY26 Q3 IR](https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/), [Oracle FY27 Q1 SEC](https://www.sec.gov/Archives/edgar/data/1341439/000119312526389274/orcl-20260831.htm). Amazon Q3 is 77.259 vs 35.095 cash purchases; **not** AWS segment net asset additions or TTM PPE.

**Counterevidence and construct validity:** Azure +48%, Google Cloud +103%, AWS +39.3% and OCI +121% YoY are real rapid cloud monetization and argue against generalized AI demand failure. The above enterprise proxy includes each firm's non-AI businesses and cash-investment timing, so the five WATCH candidates mean *investment growth outruns same-company near-term revenue growth*, NOT that each AI project has negative returns or a bubble burst. All five share a common rapid-buildout mechanism and thus their WATCH labels are correlated; five issuers cannot be marketed as five independent failures. A level-2 issuer outcome still requires persistent deterioration and independently verified economic yield/payback evidence.

**R1 disposition:** 5/5 issuer-specific YoY corporate source pairs and 5/5 **conditional level-1 WATCH candidates** computed under a *proposed, uncalibrated* 20pp diagnostic. This resolves the raw corporate financial-data availability issue. What remains is explicit source availability/PIT certification and method calibration, NOT private GPU/project IRR. It is not yet an approved R1 core level or v2 full score.

## Quantitative R2 — recovered five paired cash-flow comparisons (USD bn)

The same limited primary filing pass also recovered Q3 2025 for Amazon, FY26 Q1 for Microsoft and Oracle. These are not hypothetical or TTM extrapolations. Comparison is *within each company* and explicitly labeled quarterly.

| Company | Earlier comparable | Latest amount | Computed change | Tentative issuer candidate | Accounting caveat |
|---|---:|---:|---:|---|---|
| MSFT | **+25.663 FY26 Q1** gross cash PPE proxy | **+18.633 FY27 Q1** gross proxy | **−7.030 YoY** | **1 WATCH candidate**: FCF/OCF margin 56.957% → 32.126%, **−24.831pp** | The >=10pp proxy pressure test is PROPOSED, not calibrated; lease principal unknown |
| GOOGL | **~−5.800 CY26 Q2** gross cash PPE proxy | **~−9.060 CY26 Q3** gross proxy | **~−3.260 QoQ** | **1 WATCH**, proxy only | Proceeds/leases not fully normalized; no automatic 2 |
| AMZN | **+1.297 CY25 Q3** net cash PPE proxy | **−33.456 CY26 Q3** net proxy | **−34.753 YoY** | **1 WATCH**, proxy only | Earlier OCF35.525 − (PPE35.095 − proceeds0.867)=+1.297; current 42.422−(77.259−1.381)=−33.456; TTM is **separate** |
| META | **+0.784 CY26 Q2** issuer lease-inclusive FCF | **−2.120 CY26 Q3** issuer lease-inclusive FCF | **−2.904 QoQ** | **1 WATCH**, first negative after positive | Same SEC reconciliation with lease principal, cash and liquidity counterevidence |
| ORCL | **−0.362 FY26 Q1** cash CapEx FCF proxy | **−5.396 FY27 Q1** cash CapEx proxy | **−5.034 YoY** | **1 WATCH**, proxy only | SEC 10-Q reports OCF8.140/PPE8.502 prior versus 23.103/28.499 current; current OCF includes significant-financing-component prepayments |

Primary comparative statements were checked in [Microsoft FY27Q1 investor release](https://www.microsoft.com/en-us/Investor/earnings/FY-2027-Q1/press-release-webcast), [Amazon Q3 issuer release](https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/default.aspx), and [Oracle FY27Q1 10-Q](https://www.sec.gov/Archives/edgar/data/1341439/000119312526389274/orcl-20260831.htm), along with previously checked Meta and Alphabet rows. The reconstructed research panel used in the existing v1 audit is preserved as history, not overwritten.

**All five issuers now have valid within-company paired financial metrics**, not fully identical FCF definitions. **Five tentative WATCH candidates**, including Microsoft via the explicitly PROPOSED >=10pp cash-FCF-proxy/OCF deterioration gate. Missing finance-lease amounts must not be substituted with zero; gross/net cash PPE negative values can support conservative WATCH but never automatically a level 2. Historic aggregate v1 R2=2 remains archived and does not auto-populate any v2 issuer level.

## R4 documentary financing evidence (not a matched spread series)

In the earlier evidence register, 8 named case rows are available, but **the proposed recurring R4 core roster now has only 7**: MSFT, GOOGL, AMZN, META, ORCL, CRWV, IREN. **Lambda PRIVATE is retained as a non-scored credit-access counterexample** because public financial reporting does not match regular SEC-filing issuers. The initial, UNVALIDATED R4 design remains 50% five larger platform issuers / 50% two publicly filing project-financed borrowers, with within-stratum weights 0.10/0.25.

| Entity | Existing evidence | Tentative gate result | Why not stronger |
|---|---|---|---|
| MSFT | Preliminary 424B2 and strong reported bond demand | UNKNOWN | Not proof of worsening terms; preliminary face/coupon blank |
| GOOGL | ~€6bn bond offering, orders >€17bn | UNKNOWN + explicit anti-warning credit access | Completed/issued amount and benchmark-adjusted funding stress not established |
| AMZN | Up to ~$80bn *undrawn optional* secured facility | UNKNOWN | Not debt already borrowed, nor drawn dependence |
| META | Negative S&P *outlook*, reported secondarily | UNKNOWN | Not rating downgrade, source primary pending |
| ORCL | Jupiter project loans around 89–91c and syndication difficulty | UNKNOWN for **Oracle parent** | SPV ownership and borrower liability unverified; cannot migrate project debt stress to parent rating |
| CRWV | CCAC VIII $8.5bn DDTL 4.0 commitment; $2.837bn outstanding as of Jun30; supported in Aug11 2026 SEC 10-Q | **1 WATCH candidate at consolidated credit-dependence level** | Subsidiary non-recourse debt, limited parent bad-acts guarantee, funding successfully closed; not $8.5bn fully drawn nor parent unconditional guarantee |
| IREN | IE US Hardware 3 LLC $3.645bn SPV commitments; $938mn funded Jun30; explicit limited parent hedge/remarketing guarantees | **1 WATCH candidate at consolidated credit-dependence level** | Non-recourse to general parent credit except limited guarantees; covenants complied with |
| Lambda (context only) | Closed ~$1.008bn IG-backed fixed 6.78% project financing | **ANTI_CREDIT_FREEZE / no numeric level** | Private, incomplete regular issuer statements; cannot infer broad stable terms from one issue |

**R4**: 2/7 recurring issuer *documentary WATCH candidates* (in a ledger containing 8 historical rows), not a fully scored 2/7. Missing legal/entity mappings and private disclosure do not impose an unlimited source-research mandate. Credit access counterevidence must appear in every period's interpretation.

## Decision gate: what blocks active v2 versus what can remain UNKNOWN

**Must resolve before an active production v2:** (1) true future-dated approval/freeze of final issuer cohorts; (2) consistent R1 enterprise-level proxy semantics and transparent cloud counterevidence; (3) economic-materiality thresholds for R2 positive declines and risk thresholds; (4) R4 mapping of parent vs SPV and minimum acceptable documentary evidence; (5) direct issuer source timestamp or independently defensible conservative known-public-by bounds for any **scored** source, (6) fixed output status and source coverage, reviewer PASS and current-head CI.

**May remain UNKNOWN without blocking an individual research calculation:** AI-only project IRR, financed MW utilization, completely private lease terms, unquoted non-public project bond spreads, all corporate finance lease components where not needed for a conservative WATCH candidate.

**Finite next-source pass (do not reopen all audits):** R1 corporate issuer pairs are now recovered for all five companies. Certify exact or conservative source-public availability bounds for proposed scored observations; then targeted validation of R2 1/2 materiality and R4 parent/SPV mappings for cases affecting eligibility. Check critical contrary evidence once and stop. If labels still uncertain, preserve score bounds and report LOW_COVERAGE rather than inventing certainty.

**Cutover remains OFF.** This research metrics report is never a current Challenger v2 Score or trade signal.
