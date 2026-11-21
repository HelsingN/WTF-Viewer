# AI CapEx Weekly Watch — 2026-11-11

**Report date:** 2026-11-11  
**Economic cutoff:** 2026-11-11 08:17:14 IST / 06:17:14 UTC  
**Last completed US regular session:** 2026-11-10  
**Captured at:** 2026-11-11 08:24:18 IST  
**Completeness:** **PARTIAL** — R4/MSFT and R4/GOOGL remain UNKNOWN; comparable GPU utilization/renewals, same-variant CRB history, AI-sector OAS, securities-lending and full prime-broker panels are unavailable; the 10-Nov Daily Close remains pending in the event index.  
**Evidence classes:** PRIMARY FACT, MANAGEMENT CLAIM and INDEPENDENT CONFIRMATION are separated. No source published after the cutoff and no 11-Nov US session is admitted.

## Decision

**AI CapEx remains physically resilient, while its financial cycle is beginning to slow and the market is demanding faster cash proof.** This week materially strengthens the financial-warning case: CoreWeave reported $3.661bn revenue and $2.256bn adjusted EBITDA, but also $846m quarterly net interest expense, a $709m net loss, $4.2bn of convertible issuance and reliance on about $9bn of expected customer prepayments. Semiconductor equities suffered a sharp liquidation even though memory contracts, HBM demand and revenue-generating data-center capacity remain firm.

| Required conclusion | Current state | Weekly change |
|---|---|---|
| Physical Cycle | **RESILIENT / MIXED** | Still anti-reversal in memory and deployed capacity; public GPU list prices softened modestly |
| Financial Cycle | **WARNING, WORSENING** | Financing burden, prepayments and loss absorption increased |
| Credit State | **WATCH, OPEN BUT EXPENSIVE** | CoreWeave funding available at SOFR+550 bp; IG OAS widened; no funding break |
| Memory Cycle | **TIGHT WITH FIRST DIVERGENCES** | Contracts/HBM strong; spot and consumer demand lag |
| Cisco-2000 warning | **VALUATION/CYCLE RISK; MECHANICS NOT CONFIRMED** | Equity collapse and capacity acceleration visible, but no bookings/pricing/margin collapse |
| AI ROI / Payback Risk | **ELEVATED EARLY WARNING** | More financing dependence and cash-cost evidence; no broad utilization failure |
| Champion–Challenger divergence | **UNKNOWN formally** | Champion input set incomplete; qualitative financial/physical divergence widened |

## Champion — sole trading authority

**Champion State:** `UNKNOWN`.  
**Champion Trade State:** `NO_TRADE`.  
**Combined Score:** `null` — mandatory canonical inputs are incomplete, so no fresh score is published.

| Champion input | Current research observation | Status |
|---|---|---|
| F1 CapEx discipline | All five issuers retain very high investment plans | carried primary facts; no new quarter this week |
| F2 GPU utilization/pricing | H100 on-demand $3.75, H200 $5.43, B200 $8.07; spot at 55–61% of on-demand; utilization and renewals unavailable | **UNKNOWN canonical / WATCH research** |
| F3 credit/backlog | CoreWeave backlog $132.5bn, 4.6GW contracted and expensive financing; credit remains available | **WARNING research** |
| F4 semiconductors | Memory contracts and HBM remain tight; no supplier order collapse | **NO PHYSICAL DETERIORATION research** |
| F5 contract quality | Customer prepayments, short-duration contract financing and concentrated backlogs remain material | **WARNING research** |
| technical-v1 | SMH 483.63 versus MA50 562.86 and MA200 522.62; −6.7% over five completed sessions | **BREAKDOWN** |
| Asia/leadership | Supplier fundamentals remain firm, but a full comparable completed Asia leadership panel was not recovered | **UNKNOWN** |

These observations do not replace the canonical F1–F5 calculation and do not authorize a trade.

## Challenger v2.1 — research only

**PIT:** 2026-11-11 08:17:14 IST. **Policy:** `OBSERVABLE_EVENT_QUALIFICATION_V2_1`.  
**Challenger result:** no point estimate; core interval **[46.36, 53.64]**, final interval **[46.36, 53.64]**.  
**Coverage:** 92.73%; R4 80.00%, large-platform stratum 60.00%, project/neocloud stratum 100.00%.  
**Status:** `BOUNDED_RESEARCH_WITH_UNCERTAINTY`; `category=null`; `calibration=UNCALIBRATED`; `trading_signal=false`.

| Factor | PIT result | Source/freshness and decision |
|---|---:|---|
| R1 Monetization vs CapEx | [1.00, 1.00] | Fixed five-issuer Q3/FY27Q1 panel, rechecked; no new issuer quarter |
| R2 Cash conversion / FCF | [1.00, 1.00] | Same matched five-issuer cash-flow panel, valid through 17-Nov |
| R3 Payback / project economics | +2.00 event contribution | Anthropic realized compute-intensity event remains QUALIFIED and valid at cutoff; no new R3 event |
| R4 Financing dependence | [0.80, 1.20] | CRWV refreshed with 10-Nov primary results; MSFT/GOOGL remain UNKNOWN |
| R5 Contract quality | 0.00 event contribution | No executed amendment, shortfall or enforced cancellation qualifies |
| R6 Capacity / ghost demand | −2.00 event contribution | Galaxy paid capacity remains QUALIFIED; TeraWulf remains EARLY_WARNING because a distinct new comparable MW change is not established |
| R7 Project attrition | 0.00 event contribution | SoftBank remains EARLY_WARNING; primary project-level mapping of the reported charge is absent |

The two qualified events offset: Anthropic R3 deterioration `+0.5` translates to +2.00, and Galaxy R6 improvement `−0.5` translates to −2.00. TeraWulf's 102MW and $63m lease revenue are real counterevidence to ghost demand, but the reported quarter does not establish a newly commissioned, causally distinct billable MW change. SoftBank's reported charge and plan change are economically concerning, yet the issuer landing page does not identify the funded project and exact primary line item. Both reviews are `FINAL_FOR_CUTOFF`; a calendar reminder alone does not reopen them.

| Physical confirmation | State | Observation |
|---|---|---|
| P1 GPU compute | **WATCH** | Public on-demand indices are flat/mixed and spot discounts are deep; utilization/renewals still unavailable |
| P2 Memory | **ANTI_REVERSAL** | Server DRAM contract prices rising, 2027 HBM supply substantially committed/sold out |
| P3 Semiconductor/networking | **ANTI_REVERSAL** | No order, shipment or supplier-margin deterioration confirmed |
| P4 Market/technical | **CONFIRMED_WEAKNESS** | SMH below MA50/MA200; NVDA −18.3%, MU −15.2%, SOXX −5.4% over Nov3→Nov10 |

**Formal divergence class:** `UNKNOWN`, because Champion State is unavailable. The qualitative split is material: financial and market confirmation deteriorated while physical supply-chain confirmation remains anti-reversal.

## Hyperscalers: cash, CapEx and market response

No hyperscaler reported a new quarter this week. The table is an explicitly carried, rechecked baseline and is not presented as a fresh observation.

| Issuer | PRIMARY FACT / latest comparable period | MANAGEMENT CLAIM / guidance | Nov3→Nov10 stock reaction |
|---|---|---|---:|
| Microsoft | Revenue $92.3bn; OCF $58.0bn; cash PPE $39.4bn; lease-inclusive CapEx $45.2bn; FCF proxy $18.6bn | H2 CapEx accelerates; 75% short-lived compute/storage | +2.3% |
| Alphabet | Revenue $127.6bn; OCF $42.3bn; CapEx $51.4bn; FCF −$9.1bn; Cloud $30.7bn +103% | 2026 CapEx $195–205bn; 2027 significantly higher | +2.6% |
| Amazon | Sales $201.9bn; AWS $46.0bn +39%; TTM OCF $168.3bn; TTM FCF −$42.4bn | 2026 cash CapEx about $220bn | +8.1% |
| Meta | OCF $32.79bn; CapEx $34.91bn; FCF −$2.12bn | 2026 CapEx $135–145bn; 2027 growth remains strong | +3.3% |
| Oracle | OCF $23.10bn; CapEx $28.50bn; FCF −$5.40bn; $11.36bn financing-component prepayments | RPO $664bn; >300k GPUs delivered | −6.5% |

Market reaction is multi-causal. The cross-section says investors still reward strong operating growth at Microsoft, Alphabet, Amazon and Meta, while penalizing the more financing-sensitive Oracle/CoreWeave structures. CRWV fell 9.3% and the semiconductor complex sold off despite strong issuer demand claims. That is evidence of a higher cash-proof threshold, not proof that AI demand has stopped.

## Neocloud and private AI financing

- **PRIMARY FACT — CoreWeave:** Q3 revenue $3.661bn; operating income $207m; interest expense $846m; net loss $709m; adjusted EBITDA $2.256bn. Backlog reached $132.5bn, active power exceeded 1.7GW and contracted power exceeded 4.6GW. The company raised $4.2bn of converts, arranged a $2.6bn delayed-draw term loan at SOFR+550 bp for short-duration contracts, and expects about $9bn of customer prepayments/deposits in the next three months.
- **MANAGEMENT CLAIM — CoreWeave:** funding sources and customer deposits provide sufficient flexibility. **Counterevidence:** interest expense exceeds operating income fourfold and expected Q4 interest is $1.05–1.15bn; backlog remains conditional on delivery and availability.
- **PRIMARY FACT — TeraWulf:** $76.2m revenue, of which $63.0m was HPC lease revenue; 102MW online and 336MW under construction. This confirms some capacity has reached ENERGIZED→MONETIZED. It does not prove project IRR or utilization of future MW.
- **PRIMARY FACT / INDEPENDENT CONFIRMATION — SoftBank:** independent reporting describes about $3.7bn of charges and advance-payment effects after US data-center plans changed, with possible future rebates. Until the exact primary statement maps the loss to a funded project and comparable baseline, this is R7 EARLY_WARNING, not QUALIFIED.
- **MANAGEMENT CLAIM — OpenAI:** its community compact promises financial assurances before project spending so customers are protected if a project is delayed or reduced. This acknowledges cancellation risk but is not evidence of an actual cancellation.

## Memory cycle, Micron and Cisco-2000 mechanics

TrendForce's 4-Nov bulletin says server DRAM contract prices continue rising, while spot momentum is limited; HBM4 volumes/prices for next year are largely agreed and Samsung next-year supply is sold out. LTAs increasingly include floors, volume commitments and prepayments. This supports the physical cycle but also raises two late-cycle risks: contract demand can obscure end sell-through, and prepayments can transfer financing risk to customers.

**Cisco-2000/2001 mechanics are not yet present.** Orders and capacity acceleration are present, and semiconductor equities have repriced sharply. Missing are broad cancellations, falling supplier bookings, contract-price collapse, expanding finished-goods inventory and gross-margin compression. The first divergence is narrower: weak consumer/spot momentum alongside strong server contracts and HBM.

Micron remains a **peak-earnings-trap risk**. Current earnings embed extraordinary memory prices and margins. A normalized view should use through-cycle gross margins and cash generation rather than the current P/E; normalization toward prior-cycle margins would compress earnings disproportionately even if AI bit demand continues growing. That is a valuation/cycle warning, not a forecast of an immediate physical downturn.

## AI ROI / Payback — six required answers

1. **Is AI demand growing? Yes.** CoreWeave revenue/backlog, TeraWulf paid leases, HBM contracts and hyperscaler cloud growth confirm demand.
2. **Is monetization keeping up with capital deployment? No at consolidated cash-flow level.** The five-issuer R1/R2 panel remains at watch level; CoreWeave's interest and CapEx burden grows faster than cash proof.
3. **Is payback lengthening? Evidence is early but stronger.** Anthropic's qualified compute-intensity deterioration remains valid, while CoreWeave's interest/prepayment dependence and short-duration financing expose hardware-life/contract-duration mismatch. Comparable project IRR cohorts remain unavailable.
4. **Is financing becoming more necessary or expensive? Yes.** CoreWeave, Oracle, Meta, Amazon and project SPVs rely more on debt, equity, guarantees or prepayments. Access remains open, so this is dependence rather than a credit break.
5. **Are marginal projects delayed, restructured or cancelled? There is a credible SoftBank warning, but no newly QUALIFIED R7 event.** The required primary project mapping is missing.
6. **Is financial stress reaching utilization/pricing/hardware? It has reached equities and financing, not broad physical demand.** Public GPU prices are mixed/softer and spot discounts are deep, but utilization, renewals and supplier order weakness are unconfirmed.

The capacity funnel remains widest at ANNOUNCED/GRID_REQUESTED/CONTRACTED and narrows sharply toward UTILIZED/MONETIZED/ECONOMICALLY_PROFITABLE. Galaxy and TeraWulf provide real monetized-capacity counterexamples; future contracted GW cannot be treated as profitable end demand. The China-property analogy is limited to pre-funding, duplicated demand and marginal-project attrition. AI compute is more fungible, reprices faster and has a shorter hardware life, so the analogy does not imply an identical outcome.

## Macro/Input-Cost Pain overlay

**Score interval: 18–62 / 100.** The range is wide because October CPI lacks most year-over-year comparisons and same-variant CRB total-return history was not recovered. M1=15/30; M2=1–20/20; M3=0–20/20; M4=2–7/30.

- 10-year Treasury 4.88% on 9-Nov, about +16bp versus 10-Aug.
- October CPI +0.4% m/m after +0.6%; energy +0.7% after +5.2%. BLS could not publish most October year-over-year indexes because October 2025 inputs were unavailable.
- IG OAS 91bp on 9-Nov versus 78bp on 3-Aug: +13bp, still far from a funding break.
- `FUNDING_BREAK_FLAG=UNKNOWN`: no comparable debt-price-under-95 major-project panel.
- `STAGFLATION_TRAP_FLAG=UNKNOWN`: current comparable CPI YoY and same-variant CRB momentum are unavailable.
- `EASING_FAILURE_FLAG=UNKNOWN`: required inflation/commodity confirmation is incomplete.

## Institutional de-risking overlay

**H-state: `H3_ACTIVE_DERISK`; confidence MEDIUM; weekly delta sharply worse.** The conclusion is based on the Nov5 semiconductor/Nasdaq liquidation and independent reports of hedge funds cutting gross/net risk. There is no evidence of a systemwide margin-call spiral, so H4 is not used.

| Input | Latest PIT observation | Change / interpretation |
|---|---:|---|
| CFTC Nasdaq 20974+, leveraged funds | L 59,930 / S 53,816 / spread 9,583 / net +6,114 | WoW +11,733; 4W +32,852; 13W +106,754 |
| CFTC S&P 13874+, leveraged funds | L 122,566 / S 489,436 / spread 58,930 / net −366,870 | WoW +33,008; 4W +49,039; 13W −33,771 |
| Cboe put/call, 10-Nov near close | total 0.89 / index 1.04 / equity 0.81 | Index hedging elevated, equity flow not capitulation |
| SKEW / VIX, 10-Nov | 150.34 / 19.46 | Tail risk elevated; spot vol normalized after Nov5 shock |
| VIX futures, 10-Nov | Nov 19.9067 / Dec 19.5125 / Jan 20.0385 / Feb 20.3507 | Mild overall contango with a December dip |
| Prime-broker evidence | Independent reports of near-record tech selling and risk cuts | Supports active de-risking; full comparable PB panel unavailable |
| Securities lending / shorts | UNKNOWN | No current same-method public AI basket |
| Forced deleveraging | ACTIVE RISK CUTTING, no verified margin-call cascade | H3, not H4 |
| Price-positioning divergence | ADVERSE TIMING | CFTC positioning improved before the Nov5 crash, indicating crowded exposure |

CFTC data use the same TFF Futures Only, consolidated contract codes and leveraged-fund category; positions are as of Tuesday 3-Nov and were published Friday 6-Nov.

## Efficiency framework

| Required question | Answer |
|---|---|
| Comparable task-cost change | UNKNOWN quality-adjusted; public GPU list prices are not comparable task cost |
| Monetization/pricing discipline | Mixed: cloud and neocloud revenue strong, financing and spot discounts rise |
| Induced demand | Supported by active MW, backlog and paid leases; causality remains incomplete |
| Utilization/revenue/payback | Revenue is observable; utilization and project IRR remain largely private |
| Efficiency hypothesis | Compatible with expanding demand and lengthening financial payback; not yet proof of physical oversupply |

## Coverage, unknowns and weekly change

| Block | Freshness | Status | Change from 4-Nov |
|---|---|---|---|
| Champion F1–F5 | market through 10-Nov; issuer baseline unchanged | PARTIAL / Combined Score null | Technical and credit warning worse |
| Challenger v2.1 | PIT 11-Nov 08:17 IST | PARTIAL; [46.36,53.64] | Interval unchanged after fresh PIT recheck; CRWV evidence refreshed |
| Hyperscaler cash/CapEx | latest five quarters, rechecked | CARRIED | No new quarter; do not relabel as fresh |
| GPU/renewals/utilization | prices through 10-Nov | PARTIAL | P1 moved ANTI_REVERSAL→WATCH; utilization still UNKNOWN |
| Neocloud/private AI | CRWV 10-Nov; WULF 6-Nov; SBG 10-Nov | PARTIAL | Financing/payback warning materially worse |
| Memory/semis/networking | TrendForce 4-Nov, issuers current | PARTIAL | Physical strength persists; spot/consumer divergence clearer |
| Macro Pain | CPI 10-Nov; rates/OAS 9-Nov | PARTIAL, 18–62 | Current inflation methodology gap widened interval |
| Institutional | CFTC 3-Nov; market/options 10-Nov | PARTIAL / H3 | Changed H1→H3 after liquidation and risk cuts |
| Event registry | 37 events through 10-Nov | PARTIAL | Two new events registered; 10-Nov index remains pending Daily Close |

### Explicit unknowns and next actions

- `R4/MSFT`, `R4/GOOGL`: no eligible incremental financing-dependence observation; recheck next filing or matched financing event on 18-Nov.
- GPU utilization, renewals and comparable contract duration: non-public/non-standardized; reopen only on a material primary or independently verified disclosure.
- SoftBank project-level primary line item: unavailable in the issuer landing-page material checked; reopen on exact financial-statement mapping.
- Same-variant CRB total-return 12-month and 260-day history: provider comparability failure; do not substitute a price/CFD variant.
- AI-sector OAS and debt-price-under-95 panel: no stable public comparable methodology.
- Prime-broker and securities-lending panels: subscription/private or non-comparable; public reporting is used only as independent context.
- 10-Nov Daily Close: events are registered, but the index remains `PENDING_DAILY_REPORT`; this blocks COMPLETE.

## Audit verdict

**PASS for a PARTIAL research report; owner reviewer PASS still required.** New evidence is separated from carried baselines, Challenger v2.1 uses the frozen cohort and two qualified events only, TeraWulf/SoftBank remain non-qualified with bounded reasons, P1–P4 are separate, and the canonical Champion score is withheld. Material limitations are the unresolved R4 issuers, private utilization/renewal data, wide Macro interval and pending 10-Nov Daily Close reconciliation.

## Source register

Primary sources: CoreWeave Q3 results, TeraWulf Q3 results and 10-Q, BLS October CPI, US Treasury rates, CFTC TFF, Cboe market statistics/futures, issuer hyperscaler filings, Anthropic S-1/A, Galaxy Q3 filing, Micron/SK hynix releases. Independent sources: TrendForce memory bulletin, 06.ai/GPUeconomy public pricing panels, ICE/FRED IG OAS, Reuters market/financing reports and Massive adjusted US RTH bars. Exact URLs and PIT timestamps are preserved in the structured manifests.
