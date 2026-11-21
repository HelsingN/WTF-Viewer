# Challenger v2 — full fixed-roster reassessment, 2026-11-04

**Status:** SOURCE-REVIEWED RESEARCH CANDIDATES, COMPUTED BOUNDS, INDEPENDENT PR REVIEW PENDING. **Not an exact score, not a calibrated category and not a trading signal.**
**Issue:** #131; [PR #139](https://github.com/HelsingN/AI_CapEx_Reversal/pull/139). No automation or Champion modification.

## 1. Time boundary, cohort and evidence integrity

- Method/version frozen on **2026-11-03 22:28:54 UTC**. Prospective evaluation `as_of=2026-11-04T00:00:00Z` (Nov 3 19:00 EST), **after** the fixed cohort freeze. Not backdated to 2026-11-02.
- Historical R1/R2 and CRWV/IREN facts were recovered from primary-source panels with **Nov-2 16:00 EST evidence cutoff**, archived on Nov3. Finite new primary/independent **R4** sources through the evaluation as-of were separately checked for five platform issuers; see `data/research/challenger/challenger_v2_r4_platform_reassessment_2026-11-04.yaml`. The prior headline evidence_cutoff in the runner refers to the **reused panel**, not the new full review cutoff. Do not confuse the two.
- For historical SEC material, filing acceptance != original public dissemination; conservative next-business-day noon ET `known_public_by_at` used. Meta Nov3 bond information is confirmed by a **17:48 EST Reuters publication, updated 18:13 EST**, and that externally observed public-by bound (not a fabricated original SEC release timestamp) is before Nov3 19 EST. Tagged `INDEPENDENT_CONFIRMATION` and secondary-time provenance; no future SEC filing is smuggled into the historical panel.
- **17 issuer-factor positions** examined: R1 5, R2 5, R4 7. The three core weights are fixed **20:15:20** and cannot be replaced with the old v1 seven-weight sum. The level-1 classifications are **reviewed research candidates**; no independent external code-review/score acceptance is claimed.

## 2. Decision matrix — reassessment, not old v1 carry-forward

| Issuer | R1: comparable enterprise CapEx vs revenue YoY | R2: comparable cash conversion | R4: issuer-linked funding dependence |
|---|---|---|---|
| MSFT | **1**: +84.181pp growth gap; Azure +48% refutes generalized failed demand | **1**: cash PPE/OCF margin −24.831pp; cash proxy still +18.633bn and finance leases unverified | **UNKNOWN**: priced $25bn notes, broad capital access; debt issuance alone does not verify material deterioration/dependence |
| GOOGL | **1**: approx +89.447pp growth gap, rounded input | **1**: negative latest gross cash proxy; not lease-inclusive FCF | **UNKNOWN**: €6bn euro notes, >€17bn orders, some yield pressure but no comparable same-issue rollover distress |
| AMZN | **1**: +108.057pp gap; AWS strong growth | **1**: latest negative net PPE proxy and sharp margin fall; separate TTM not mixed | **1** research candidate: $17.5bn term **drawn**, up to $80bn technology supplier facility **conditional/not drawn**; long-term debt $65.648bn Dec25 → $173.125bn Sep26 |
| META | **1**: +54.194pp gap; advertising/customer growth remains | **1**: reconciled lease-inclusive FCF +$0.784bn → −$2.120bn, sequential seasonality caveat | **1** research candidate: Nov3 new $15bn US bond offering, earlier $25bn April notes, S&P negative **outlook** and expected future debt-funded cash shortfall; strong capital access contrary |
| ORCL | **1**: +205.597pp gap; OCI demand strong | **1**: negative gross cash proxy; OCF includes $11.363bn financing-component customer prepayments | **1** research candidate: issuer Feb plan $45–50bn funding specifically for OCI capacity; Nov2 priced $10bn debt + ~$10bn common equity (part of plan, **not in addition**); settlement expected Nov4 |
| CRWV | Outside R1 cohort | Outside R2 cohort | **1** research candidate: CCAC VIII $8.5bn committed DDTL4, $2.837bn drawn June30; borrower is subsidiary, limited bad-acts recourse, financing success contrary |
| IREN | Outside R1 cohort | Outside R2 cohort | **1** research candidate: IE US Hardware 3 $3.645bn commitments, $0.938bn funded June30; limited parent support, covenants compliant |

**Key R1/R2 conclusion:** all five issuer-level *matched/proxy* 1 diagnostics are retained only after re-examining sources, data definitions and counterevidence. None qualifies for 2: enterprise revenue is not AI-specific realized marginal yield; incompletely lease-normalized FCF is not 2-period confirmed cash emergency; R1 and R2 share CapEx underlying drivers and cannot be represented as ten independent adverse economic events. No issuer is set to 0 by absence of evidence.

**Key R4 conclusion:** the three new platform 1 candidates require a *material financing-reliance* economic argument, not just the existence of an issue:
- **Amazon:** combined **actual** $17.5bn drawn incremental financing, documented large increase in debt outstanding, and technology-purchase secured facility architecture. The $80bn facility is a conditional future ceiling, not drawn capital. Existing $15bn+$5bn revolvers renewed, not new additional $20bn liquidity. Strong AWS/record operating margin and access oppose near-term funding failure. Primary [Q3 10-Q](https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/amzn-20260930.htm).
- **Meta:** a new Nov3 $15bn US bond **offering** reported by Reuters and documented in a preliminary SEC prospectus; prior Apr bond and S&P Oct30 outlook combined with explicit debt-financed future FOCF risk. No assumed proceeds before settlement and no assertion of rating downgrade, 2026 insolvency, 2-level default or mathematically matched spread widening. [Nov3 independent public time](https://www.marketscreener.com/news/meta-raises-15-billion-in-five-part-us-bond-sale-ce785fdedf89f120), [SEC preliminary filing](https://www.sec.gov/Archives/edgar/data/1326801/000119312526444440/d135326d424b5.htm), [Reuters](https://www.reuters.com/technology/meta-raises-15-billion-in-five-part-us-bond-sale-2026-11-03/).
- **Oracle:** issuer explicitly announced funding required to build contracted OCI infrastructure, then priced equity+debt raising, at high 7.000–8.650% coupons. The Nov2 ~$20bn is **within**, not above, the Feb $45–50bn plan; issuer funding remains accessible and **Nov4 settlement was future as of Nov3 19 EST**. Crucially Project Jupiter SPV stress is **not** assigned to Oracle parent. [Issuer funding plan](https://investor.oracle.com/investor-news/news-details/2026/Oracle-announces-Equity-and-Debt-Financing-Plan-for-Calendar-Year-2026/default.aspx?embed=true), [pricing release](https://investor.oracle.com/investor-news/news-details/2026/Oracle-Announces-Pricing-of-20-Billion-of-Common-Stock-and-Senior-Notes/default.aspx), [SEC final term sheet](https://www.sec.gov/Archives/edgar/data/1341439/000119312526443918/d87441dfwp.htm).

MSFT and GOOGL stay **UNKNOWN**, not 0 or 1; demonstrating successful access does not certify stable same-basis financing/dependence or justify level 0, and material issuance without demonstrable incremental reliance does not automatically justify 1. Both have explicit source and revisiting triggers in the R4 registry.

## 3. Full quantitative recalculation

Core: `100 × (20*R1 + 15*R2 + 20*R4) / (2×55)`. Unknown R4 weight stays in the denominator.

| Factor | Issuers covered | Weighted factor coverage | Factor level bounds | Coverage gate |
|---|---:|---:|---:|---|
| R1 | 5/5 | **100%** | **[1.00,1.00]** | PASS, candidate only |
| R2 | 5/5 | **100%** | **[1.00,1.00]** | PASS, candidate only |
| R4 | 5/7 (two projects and three platforms) | **80%** | **[0.80,1.20]** | PASS: >=70% overall; >=60% platform, >=50% project |
| R4 large-platform stratum | 3/5 | **60% within stratum** | 2/5 UNKNOWN remain | PASS at minimum |
| R4 project-neocloud stratum | 2/2 | **100% within stratum** | CRWV=1, IREN=1 | PASS |

Weighted overall core source coverage = **92.73%** (51 / 55). **Core interval [46.36,53.64]**. The v2 formula **does not renormalize away** MSFT/GOOGL, invent their zero risk or fill a neutral midpoint. The prior preliminary **[40.91,59.09]** is **superseded for this after-freeze as-of by the new R4 review**; the change comes from new evidence and stronger attributable issuer judgments, not a v1 value or posthoc trading-fit optimization.

## 4. Two-sided R3/R5/R6/R7, independent anti-evidence and P1–P4

A **separate 12-candidate event register** was reviewed at `data/research/challenger/challenger_v2_event_review_2026-11-04.yaml` including both positive/deterioration and negative/counterevidence directions. **Eligible signed outcomes: 0 positive, 0 negative.** The signed incremental adjustment is therefore **+0.00**, **not** a claim that R3/R5/R6/R7 underlying risks are zero.

- R3: CoreWeave debt/customer tenor mismatch and Anthropic revenue-to-compute ratio do not establish realized project payback; SpaceX CFO claim is unverified realised ROI.
- R5: future Anthropic commitments or AWS RPO are not default or **realized collection** proof; new bond access belongs to R4 and cannot also be a separate signed R5 adjustment.
- R6: Nscale UK grid and Australian Project Ares permitting delays are not verified funded-to-utilized negative project economics. CBRE H1 tight vacancy/absorption is material **anti-collapse context**, but aggregate asking rents are not realized project economics.
- R7: Project Jupiter financing and power delay cannot double count R4; Sydney regulatory withdrawal and Firmus alternative fundraising are not proven economically induced cancellations.
- **P1–P4:** separate physical/technical assessment: no fresh complete canonical per-overlay timestamped data at this exact as_of, so each remains `UNKNOWN_CURRENT_MEASUREMENT`. Prior HBM/orders, supplier demand and tight vacancy are explicit context; do not claim inherited P state as newly measured.

**Final interval = [46.36,53.64].** `final_exact_score=null`, `category=null`, `calibration=UNCALIBRATED`, `trading_signal=false`. Status is **BOUNDED_RESEARCH_WITH_UNCERTAINTY**, not low coverage. No inference of the old v1 ALERT or a trading instruction.

## 5. Evidence sufficiency versus numeric precision, sensitivity and stop rule

**Source coverage passes**, but only conditionally reviewed issuer-level 1 judgments and two R4 UNKNOWN remain. This **does not create an exact score** and remains subject to independent code and source reviewer approval. An explicit counterfactual excluding Meta Nov3 bond source: R4 falls to 70% weighted total but **40% platform coverage**, fails >=60% stratum; the score interval widens to **[44.55,55.45]** and evidence becomes LOW_COVERAGE again. This demonstrates material reliance on the Nov3 time-provenanced Meta evidence rather than pretending full robustness.

Finite next verification triggers: (a) new MSFT/GOOGL same-basis financing necessity or stable comparable terms; (b) material source or loan legal-entity contradiction for Amazon/Meta/Oracle; (c) genuine independently realized project economics, contract enforcement, funded-utilized changes or financially caused cancellations; (d) v2 calibration/outcome validation. **Do not search inaccessible private project IRR or keep endlessly auditing to force a single number.**

**Reproduction:** `PYTHONPATH=src python scripts/research/one_off_challenger_v2_full_recalculation.py`, the fixed cohorts, two dated source registries and dated event ledger. The exact head must pass CI and human review before merge. The historical v1 snapshots and Champion/Strategy are untouched; scheduling/weekly validator **not** implemented in this PR.

## 6. Bottom line

**Full 17-slot R1/R2/R4 and finite two-sided R3/R5/R6/R7 review completed, research coverage now sufficient (92.73% aggregate), but two platform R4 levels remain UNKNOWN, so only bounded score [46.36,53.64] is justified.** The new evidence documents a material **financing-first pressure** even while customers, financing markets and physical capacity absorption contradict an immediate systemwide collapse. No proved sector-wide financial-to-physical reversal, no trade.
