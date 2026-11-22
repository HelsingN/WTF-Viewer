# Challenger v2 — first post-freeze full bounded recalculation (2026-11-04)

**Snapshot / information cutoff:** `2026-11-04T00:00:00Z` = 2026-11-03 19:00 EST / 2026-11-04 02:00 Israel. **Model cohort freeze:** 2026-11-03 22:28:54 UTC, based on review commit `cac10cb3f3d4aac8a61f66b75b7ec785941dcb7d`. **This is a NEW prospective research assessment using previously public sources after the cohort freeze**, not a rebranded 2-Nov post-hoc replay or a claim of predictive out-of-sample validation. No trade authority.

**Machine-readable full input:** [v2 prospective snapshot](../../data/research/challenger/challenger_v2_prospective_snapshot_2026-11-04T0000Z.yaml); deterministic evaluator `src/scoring/challenger_v2.py`; regression fixture `tests/test_challenger_v2_prospective_2026_11_04.py`.

**Decision:** `LOW_COVERAGE_BOUND_ONLY`; core **[42.73, 57.27]**, independent event overlay **+1.70** (R6), final bounded interval **[44.43, 58.97]** (normalized research units out of 100). **No point score, no categorical HEALTHY/WATCH/ALERT label**, no current trading signal. Source and economic judgments remain reviewable, thresholds/event caps `UNCALIBRATED`. The 2-Nov retrospective interval **[40.91, 59.09]** was POSTHOC and is NOT directly a prospective model trend comparator.

## 1. Coverage and exact arithmetic

Core factor weights are fixed R1:R2:R4 = **20:15:20**, denominator **2×55**. Within R1 and R2 five platform issuers each have 20% weight. Within R4 platforms MSFT/GOOGL/AMZN/META/ORCL each 10%, and CRWV/IREN each 25%. The 50% neocloud credit weight is an approved *stress sample*, not a sector-market-cap representation.

| Factor | Issuer research levels counted | Coverage | Strata / gate | Factor level range |
|---|---|---:|---|---:|
| R1 monetization/CapEx | MSFT 1, GOOGL 1, AMZN 1, META 1, ORCL 1 | **100%** | >=70% PASS | **[1.00,1.00]** |
| R2 cash conversion | MSFT 1, GOOGL 1, AMZN 1, META 1, ORCL 1 | **100%** | >=70% PASS | **[1.00,1.00]** |
| R4 credit/dependence | ORCL 1, CRWV 1, IREN 1; **MSFT, GOOGL, AMZN, META UNKNOWN** | **60%** | overall 70% FAIL; platforms 20% vs 60% FAIL; neoclouds 100% vs 50% PASS | **[0.60,1.40]** |

Total **weighted core coverage 85.45%**. Do not use this aggregate to override the independent R4 gate failure. Unknown issuer weights remain fixed and contribute 0..2 in bounds, not a zero label.

```text
Core lower = 100 × (20×1.00 + 15×1.00 + 20×0.60) / 110 = 42.727... -> 42.73
Core upper = 100 × (20×1.00 + 15×1.00 + 20×1.40) / 110 = 57.272... -> 57.27
R6 delta  = 4 × 0.5 × 2^(-14.1006944 / 60)            = +1.69936 -> +1.70
Final     = [44.42663, 58.97208] -> [44.43, 58.97]
```

R3,R5,R7 qualified event adjustments = **0.00 as a *ledger outcome***, not a claim that payback, contract or project attrition risk is zero. All numeric core levels are **issuer-scoped 1 WATCH**, NOT v1 aggregate scores; none has primary grounds for level 2 under the approved stricter rules.

## 2. R1 fully recomputed from each issuer's matched YoY corporate pair

USD billions; the gap and intensity are independently recomputed, not carried from v1. Figures are investment pacing at whole-company scope, NOT AI-only ROIC.

| Issuer and source quarter | Consolidated revenue growth YoY | Cash capital spending growth YoY | Growth gap, pp | Relative CapEx/revenue intensity change | v2 level |
|---|---:|---:|---:|---:|---:|
| MSFT FY27Q1 vs FY26Q1 | +18.804% | +102.985% | +84.181 | +70.857% | **1** |
| GOOGL CY26Q3 vs CY25Q3 | ~+25.000% | ~+114.447% | ~+89.447 | ~+71.557% | **1** |
| AMZN CY26Q3 vs CY25Q3 | +12.086% | +120.142% | +108.057 | +96.405% | **1** |
| META CY26Q3 vs CY25Q3 | +26.070% | +80.264% | +54.194 | +42.987% | **1** |
| ORCL FY27Q1 vs FY26Q1 | +29.606% | +235.203% | +205.597 | +158.633% | **1** |

Each is >=20 pp with rising cash CapEx intensity, so **R1=1 for all five** under the approved research diagnostic. R1=2 is not proven: rapid Azure, Google Cloud, AWS and OCI monetization, along with advertising cash generation, materially contradict any claim of already failed realized AI payback. CapEx-growth gap and intensity are mechanically related and **not two independent confirmations**. Alphabet's reported values were rounded; these estimates are deliberately approximate and far from the 20pp decision boundary.

Primary sources: [MSFT 10-Q SEC](https://www.sec.gov/Archives/edgar/data/789019/000119312526436133/0001193125-26-436133-index.htm); [GOOGL SEC](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/0001652044-26-000084-index.htm); [AMZN SEC](https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/0001018724-26-000040-index.htm); [META SEC earnings exhibit](https://www.sec.gov/Archives/edgar/data/1326801/000162828026066700/0001628280-26-066700-index.htm); [ORCL SEC](https://www.sec.gov/Archives/edgar/data/1341439/000119312526389274/0001193125-26-389274-index.htm). Detailed numeric reconciliation is preserved in [Phase B](CHALLENGER_V2_PHASE_B_QUANTITATIVE_DECISIONS_2026-11-03.md) and the recovered-observables YAML.

## 3. R2 fully recomputed using comparable cash-flow definitions

Dollar amounts in USD bn. Each proxy is derived from **actual paired OCF and cash capital expenditures**; incentives subtracted from PPE purchases only when actually disclosed, lease principal subtracted only when available and applicable. This leaves limitations visible and does NOT silently replace null with zero.

| Issuer | Basis / matched period | Prior -> latest cash proxy | FCF/OCF margin delta | v2 level |
|---|---|---:|---:|---:|
| MSFT | Gross PPE proxy, FYQ1 YoY | +25.663 -> +18.633 | −24.831 pp | **1** |
| GOOGL | Gross PPE proxy, Q2→Q3 2026 | ~−5.800 -> ~−9.060 | ~−6.585 pp | **1** |
| AMZN | Net PPE proxy after disclosed incentives, Q3 YoY | +1.297 -> −33.456 | −82.516 pp | **1** |
| META | Issuer-reconciled lease-inclusive FCF, Q2→Q3 2026 | +0.784 -> −2.120 | −8.927 pp | **1** |
| ORCL | Gross PPE proxy, FYQ1 YoY | −0.362 -> −5.396 | −18.909 pp | **1** |

MSFT qualifies through **>=10pp decline in same-basis FCF/OCF ratio** despite still-positive gross proxy. The other four have a negative latest reviewed proxy, which is a permitted level-1 WATCH diagnostic but **not proof of two lease-inclusive negative quarters** or a level-2 crisis. Oracle latest $23.103bn OCF contains **$11.363bn financing-component customer prepayments**, which cannot be confused with repeatable operating economics. Meta has the separately verified lease-inclusive bridge. Amazon's TTM negative FCF cannot be interchanged with a Q3 point observation. Source/counterevidence line-items: [R2 audit and cash-flow panel](CHALLENGER_R2_CASH_FLOW_PANEL_2026-11-02.md), [Meta primary SEC reconciliation](CHALLENGER_R2_META_SEC_RECONCILIATION_2026-11-03.md).

## 4. R4 — true new November 2 financing evidence and complete seven-name credit review

**Four platforms remain UNKNOWN**, not 0. The October/November primary financing window was audited against older existing source work; absence of defaults is not proof of benign level 0.

| Issuer | Primary/documented financing and opposing evidence | Reviewer issuer status |
|---|---|---|
| MSFT | Nov2 SEC [424B2 $25bn senior unsecured notes](https://www.sec.gov/Archives/edgar/data/789019/000119312526442618/0001193125-26-442618-index.htm), various coupons/maturities; broad corporate proceeds and substantial operating cash. Issuance is not itself proof of **incremental distress dependence** or failed refinancing. | **UNKNOWN** |
| GOOGL | Nov2 approx €6bn multi-tranche issue and strong >€17bn orders according to existing daily research; accessible market is anti-freeze evidence but no benchmark-matched worsening or borrower dependence proof. | **UNKNOWN** |
| AMZN | Up to ~$80bn prospective optional credit facility cited in prior research; cannot count undrawn headroom as actual debt or a covenant failure. | **UNKNOWN** |
| META | Reported S&P negative outlook, not a downgrade or demonstrable issuer-level refinancing impairment; bond pricing/terms not sufficiently reconciled to a qualifying event. | **UNKNOWN** |
| ORCL | **NEW** Nov2 [issuer pricing](https://investor.oracle.com/investor-news/news-details/2026/Oracle-Announces-Pricing-of-20-Billion-of-Common-Stock-and-Senior-Notes/default.aspx): 86,206,897 shares at $116 (~$10bn gross equity) plus **$10bn senior notes** (7.00%, 7.45%, 7.85%, 8.00%, 8.65%, maturities 2029–2046); company's cash CapEx $28.499bn exceeds OCF $23.103bn in recent quarter and large debt already exists. **Closing expected Nov4, not yet received at this cutoff**; proceeds may be capex, debt repayment OR other corporate uses, so no 100% AI-project allocation. This material new financing alongside poor self-funding qualifies conditional issuer-level *incremental financing dependence* WATCH; success of pricing is explicit opposite evidence; no level 2 or broad credit freeze. | **1** (conditional research classification) |
| CRWV | SEC Aug11: **CCAC VIII** subsidiary DDTL4.0 $8.5bn commitment vs $2.837bn drawn Jun30; parent recourse limited to certain bad acts. Successful financing, no observed default. | **1** |
| IREN | Aug27 10-K: subsidiary **IE US Hardware 3 LLC** $3.645bn financing commitments, only $0.938bn funded by Jun30; limited parent hedge/remarketing support and covenant compliance. | **1** |

**Oracle R4=1 is the most material new reviewer judgment.** It is not simply “new bonds = risk”: the same issuer cash spending exceeded OCF, $20bn new equity+debt is material, and the funding is permitted for CapEx/indebtedness. Still, without a dedicated project-level financing-use allocation or distressed refinancing proof, it is research-conditional, not an automatic live label. **Robustness:** if stricter reviewers hold Oracle UNKNOWN, R4 falls to **50%** (platform 0%), core interval **[40.91,59.09]**, and full interval **[42.61,60.79]** with the same one R6 event; the LOW_COVERAGE decision is **unchanged**. Do not present the baseline point midpoint as certain.

See [seven issuer source times and CRWV/IREN subsidiary borrower audit](CHALLENGER_V2_SOURCE_PIT_AND_R4_FINAL_REVIEW_2026-11-04.md) and [source eligibility register](../../data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml). For Oracle's new offer, the issuer released pricing **Nov2**; conservative availability **Nov3 noon EST**, before the **Nov3 19:00 EST** snapshot. New notes are unsecured obligations of Oracle, not misassigned Jupiter/SPV debt. Do not mark expected Nov4 settlement completed.

## 5. Full R3/R5/R6/R7 independent signed-event review

No mechanically inherited v1 levels for R3/R5/R6/R7. Caps and half lives are **uncalibrated research** and every scored event must have primary event time, distinct root/effect, counterevidence and finite review.

| Event candidate | Relevant R | Qualification / deduplication decision |
|---|---|---|
| **NEXTDC M3 contracted capacity, grid delay and FY27 revenue guidance reduced, ASX 21 Oct 08:35 AEDT** | **R6**, +0.5 initial ×4 cap ×freshness = **+1.70** as of cutoff | **QUALIFIED**. Realized deferred energy/contracted delivery and reduced guidance (not just future announcement). Single issuer release counted ONCE; 14.1007 days old, transient 60-day half-life, expires at planned Nov20 update. Customer contracts remain in place, A$8.675bn liquidity and covenant compliance contradict a funding freeze. No duplicate R7 on same root. [Full issuer notice syndicated by EQS](https://www.ots.at/presseaussendung/EQS_20261020_EQS0010/eqs-adhoc-nextdc-limited-m3-melbourne-power-delay-and-revised-fy27-guidance) and [ASX disclosure timestamp](https://stocklight.com/stocks/au/asx-nxt/nextdc/announcements/2026-10-21-m3-melbourne-power-delay-revised-fy27-guidance). |
| **AWS Loudoun campus data-center application to be withdrawn** | R7 context | **NOT SCORED.** County's [Oct22 release](https://www.loudoun.gov/m/newsflash/home/detail/10944) confirms a preliminary housing/land-use deal in response to local opposition; no documented financial return/payback failure or funded project cancellation driven by economics. Site-level attrition is context only; not a systemic wave. |
| NEXTDC M3 contract termination rights and development hold | R5/R7 context | **NOT SCORED.** Termination rights were disclosed but no proven exercised customer termination/contractual default; new project hold and M3 same grid-root not independent R7. |
| Nov2 Oracle new equity and notes / Microsoft and Alphabet bond access | R3/R5/R7 possible interpretation | **NOT SCORED as add-on**. Oracle is already assessed in issuer R4; a single funding decision cannot be repeatedly scored as separate payback/contracts/attrition proof. Completed/successfully priced credit access is opposing evidence. |
| Anthropic disclosed customer/compute commitments and financing relationships, prior daily Nov2 source register | R3/R5 context | **NOT SCORED**: signed commitments, reported backlog or gross cost are not independent realized payback deterioration or actual default/cancellation. Preserve prior reports and uncertainty. |
| Strong cloud growth, NVIDIA delivered accelerator revenue, SK hynix/Micron memory profits and contracts | Signed contrary context | **NOT scored as negative R3/R5/R6/R7** absent independent project-level realization/recovery matching factor criteria. Strong opposing evidence is kept below in physical/counterevidence section rather than silently adding arbitrary negative points. |

Only **one +R6 event** meets this narrow ledger; **no other eligible positive or negative event** was accepted. This is **not** proof all other factors are healthy. No management-claim-only event gets numerical weight.

## 6. Independent physical confirmation P1–P4 (not included in score)

| Overlay | Research context at cutoff | Classification |
|---|---|---|
| **P1 GPU compute** | NVIDIA [FY27 Q2 actual Data Center revenue +117% YoY](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Second-Quarter-Fiscal-2027/) is strong anti-collapse evidence. **Actual GPU rental price, fleet occupancy, renewals and customer utilization** across hosts are not available at comparable freshness/coverage; supplier shipments are not end-customer ROIC. | **UNKNOWN**, anti-reversal supply demand context |
| **P2 Memory / HBM** | [SK hynix Q3 2026](https://news.skhynix.com/en/q3-2026-business-results/) reports record realized sales/profits, expanded HBM4 and signed LTAs covering >50% of 2027–2028 capacity. [Micron FY26 Q4](https://investors.micron.com/financials/quarterly-results/default.aspx) reports strong realized revenue and OCF and HBM4 shipments. No comparable realized HBM demand collapse. Management forecast of shortages until 2030 is **not an independent proof**. | **ANTI_REVERSAL** on latest primary memory results; cyclical outlook uncertain |
| **P3 Semiconductors/networking** | NVIDIA realized data-center revenues/production and ongoing supply constraints argue against a confirmed physical semiconductor collapse; no fresh complete NVDA/AMD/AVGO combined pricing/inventory downturn series. | **UNKNOWN** for broad sector, with strong supplier anti-collapse evidence |
| **P4 Market/technical** | Massive accessible daily bars stop at **Nov2 close**, not Nov3 cutoff; Nov2 vs Oct30: SMH $508.31 vs $522.49 (**−2.71%**), QQQ $681.09 vs $690.49 (**−1.36%**), SOXX $453.65 vs $471.51 (**−3.79%**), SPY $752.10 vs $755.72 (**−0.48%**). Nov3 EOD not returned for requested range; direct Nov3 open-close was **NOT_ENTITLED** for SMH, and then RATE_LIMIT for other ETFs. Technical-v1 signal, breadth and session-valid breakdown not independently reconstructed. | **UNKNOWN** for Nov3, with **earlier WATCH market weakness** |

No P-class adds points to R1–R7. Recent declines in SMH/SOXX are **not independent proof of the physical capacity turning point**.

## 7. Source-time / uncertainty controls

- For five R1/R2 SEC documents and CRWV/IREN filings, primary index acceptance times and conservative **known-public-by** were reviewed in [source register](../../data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml). These are not exact first publication minutes; one-business-day-noon policy is conservative but still an assumption. If later dissemination is established, affected issuer becomes UNKNOWN.
- Oracle pricing Nov2 is a new source since the historic Aug credit panel. `known_public_by_at = Nov3 12:00 EST` is a conservative post-release review boundary, not Oracle's claimed issuance settlement minute.
- NEXTDC actual issuer release timestamp is **Oct21 08:35 AEDT**, verified by multiple ASX announcement archives, with issuer text distributed independently via EQS; it appeared in older daily coverage as **historical Oct21 source gap**, so it is one continuing scored state, **not a newly published Nov3 surprise**.
- A Q3 quarter-end is not publication date; a credit commitment is not drawn debt; an announced offering is not settled proceeds; corporate FCF cash proxy is not AI project IRR. No prior v1 levels, R2=1 or 2, or stale 60/67.5 value is transferred.
- The model has 13 reviewed core issuer observations and one signed event in its one-time dated input. The `REQUIRES_HUMAN_REVIEW` output is deliberately retained: code cannot authenticate semantic issuer judgments. This memo documents reviewer-assessable rationale, not third-party independent validation.
- Analysis stops at the finite evidence universe above. Unpublished private GPU occupancy, contract economics, complete finance lease principal and project-level financial spreads remain UNKNOWN rather than triggering an unbounded audit.

## 8. Model interpretation, next issuer triggers and no-trade boundary

**What is supported:** in five large platforms, whole-company cash capital investment is growing much faster than near-term consolidated revenue, and current cash-flow conversion proxies deteriorate. Material external funding is documented at Oracle, CoreWeave and IREN, but money has been raised/accessed successfully; this is **financial dependence**, not a generalized closed credit market. NEXTDC shows **one real, local** funded/energized capacity timing bottleneck with deferred contracted revenues; strong cloud/HBM/NVIDIA sales and financing access directly oppose declaring a broad physical bust.

**What is not supported:** a fully covered R4, issuer-level uniform negative AI-only ROI, an observed system-wide financing freeze, a company-default wave, calibrated v2 alert bands, predictive skill validation, or an executable short/trade. **Champion** remains separate and its canonical Combined Score cannot be inferred from this Challenger snapshot. Qualitative divergence: `UNKNOWN` until comparable canonical Champion observation exists; **NO_TRADE** remains the only defensible trade-state conclusion for this research report.

**Bounded next-review triggers, not a task automation:** Oracle pricing settlement/updated 8-K and use of cash after Nov4; the next company-quarter filings especially CRWV/IREN; new verified platform-level borrower/credit-term comparisons for R4; NEXTDC shareholder update planned Nov20 or actual power/contract change; physical end-use utilization and GPU rental pricing if available. Do not automatically fill R4 gaps or carry this interval into later cutoffs without revalidating freshness.

**End state:** FULL_METHODOLOGICAL_RECALC_COMPLETED / NEW_PROSPECTIVE_RESEARCH_SNAPSHOT / LOW_COVERAGE_BOUND_ONLY / NO_EXACT_POINT_SCORE / NO_CATEGORY / NO_TRADING_AUTHORITY. Automation/weekly v2 schema intentionally untouched.
