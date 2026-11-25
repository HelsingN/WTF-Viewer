# AI CapEx Weekly Watch — 2026-11-25

**Report date:** 2026-11-25  
**Economic cutoff:** 2026-11-25 08:46:00 Israel / 06:46:00 UTC  
**Last completed US regular session:** 2026-11-24  
**Captured at:** 2026-11-25 08:55:00 Israel  
**Completeness:** **PARTIAL**. R4/MSFT and R4/GOOGL remain UNKNOWN; GPU utilization/renewals, same-variant CRB history, AI-sector OAS, securities lending and public prime-broker panels remain unavailable. The newly backfilled Cerebras service-credit event is registered and QUALIFIED, but the original 12-Nov Daily Close ledger did not contain this distinct missed occurrence; reconciliation is pending and blocks COMPLETE. No 25-Nov US session is admitted.

## Decision

**AI CapEx remains physically resilient at the accelerator/networking level, but the financial cycle and the lower memory/storage layer are now deteriorating faster.** The meaningful new fact is a realized rather than announced capacity problem: Cerebras disclosed that it delivered less OpenAI capacity than contemplated and that contractual service credits began accruing from 1-Oct. Separately, TrendForce moved NAND/eSSD from a narrow order warning toward an earlier 2Q27 oversupply and contract-price decline. Semiconductor equities weakened sharply, while NVIDIA/Cisco revenue evidence still contradicts a broad physical collapse.

| Required conclusion | Current state | Weekly change |
|---|---|---|
| Physical Cycle | **RESILIENT / MIXED, DETERIORATING AT EDGES** | First realized paid-capacity interruption at Cerebras; NVIDIA/Cisco still strong |
| Financial Cycle | **WARNING, WORSENING** | CoreWeave debt and interest burden plus cancellable-contract reclassification; Cerebras service credits |
| Credit State | **WATCH; FUNDING OPEN BUT HIGHLY DEPENDENT** | IG OAS 97bp, funding still open; neocloud leverage/prepayments/asset backing grow |
| Memory Cycle | **WATCH / CONFIRMED NAND WEAKNESS** | NAND oversupply and contract-price decline forecast pulled forward; HBM/server DRAM still tight |
| Cisco-2000 warning | **REAL SUBSEGMENT MECHANICS; BROAD COLLAPSE NOT CONFIRMED** | eSSD order/inventory/pricing chain plus one paid-capacity shortfall; no broad bookings/margin collapse |
| AI ROI / Payback | **ELEVATED EARLY WARNING WITH ONE REALIZED R6 EVENT** | Financing and delivery friction now has a realized contractual cost |
| Champion–Challenger divergence | **UNKNOWN formally** | Champion incomplete; Challenger worsens while accelerator supplier fundamentals remain strong |

## Champion — sole trading authority

**Champion State:** `UNKNOWN`. **Champion Trade State:** `NO_TRADE`. **Combined Score:** `null`. The accepted mandatory set remains incomplete; Challenger and overlays do not fill missing Champion inputs.

| Champion input | Observation | Status |
|---|---|---|
| F1 CapEx discipline | No new hyperscaler quarter; all five retain very high spending plans | CARRIED_RECHECKED |
| F2 GPU oversupply | H100 multi-provider snapshot fell 13.8%; spot/reserved discounts deep; utilization/renewals unavailable | UNKNOWN canonical / WATCH research |
| F3 neocloud/credit | CoreWeave $47.5bn debt and Q4 interest guidance $1.05–1.15bn; Cerebras service credits | WARNING |
| F4 semis/networking | NVIDIA/Cisco results strong; NAND/eSSD weakening; SMH/SOXX selloff | MIXED |
| F5 backlog quality | Cerebras paid service credits; CoreWeave $1.9bn deferred revenue reclassified as contracts became cancellable | WARNING |
| technical-v1 | SMH 426.75 vs MA50 543.58 and MA200 525.56; 36.48% below 252-session high | BREAKDOWN |
| Asia/leadership | HBM supply remains committed; full comparable Asia close/leadership panel unavailable | UNKNOWN |

No fresh canonical trading decision is formed.

## Challenger v2.1 — research only

**PIT:** 2026-11-25 08:46:00 Israel. **Policy:** `OBSERVABLE_EVENT_QUALIFICATION_V2_1`.  
**Core interval:** **[46.36, 53.64]**. **Final interval:** **[48.36, 55.64]**. **Coverage:** 92.73%; R4 80%, platform stratum 60%, project/neocloud 100%.  
**Status:** `BOUNDED_RESEARCH_WITH_UNCERTAINTY`; `category=null`; `calibration=UNCALIBRATED`; `trading_signal=false`; `NO_TRADE`.

The fixed R1/R2/R4 primary sources were reopened at this cutoff. No issuer released a new quarter, so the matched measurements are explicitly carried and revalidated, not presented as new disclosure. R4/MSFT and R4/GOOGL remain UNKNOWN. A distinct backfilled Cerebras economic occurrence is QUALIFIED under R6 at the single verified change tier; it contributes +2.00 points to the interval. The registrar's separate trigger-time recalculation used the last owner-accepted frozen-core fallback, whose source validity had expired, and therefore correctly returned `LOW_COVERAGE_BOUND_ONLY [2.00,100.00]`. That artifact is not substituted for the freshly rechecked weekly interval and demonstrates why owner acceptance matters.

| Factor | PIT result | Decision |
|---|---:|---|
| R1 Monetization vs CapEx | [1.00,1.00] | Five-issuer enterprise panel rechecked; not AI-only ROI |
| R2 Cash conversion / FCF | [1.00,1.00] | Same-period issuer cash panel rechecked; no new quarter |
| R3 Project economics | 0.00 event contribution | No new comparable realized task cost/unit yield |
| R4 Financing dependence | [0.80,1.20] | MSFT/GOOGL UNKNOWN; platform coverage at minimum gate |
| R5 Backlog/contract quality | 0.00 | CoreWeave cancellability is EARLY_WARNING, not actual cancellation/amendment |
| R6 Capacity conversion | **+2.00** | Cerebras/OpenAI service credits: QUALIFIED deterioration, single verified change |
| R7 Project attrition | 0.00 | No new funded-project economic cancellation/defer/restart |

**Cerebras R6 qualification.** PRIMARY FACT: the Q3 10-Q says delivered capacity was below the MRA amount; without adjustment for excused delays, service credits began accruing on 1-Oct and reduce later monthly service fees. This is a narrow realized paid interruption. Counterevidence: Q3 OpenAI revenue was $72.4m; no tranche termination was reported; under 5% of total committed capacity was forecast terminable in 2026; some delay may be excused. The event does not prove broad utilization weakness or project IRR failure. Canonical ID: `EVT-20261112-20386D220F23`; backfill discovery is not represented as a live 12-Nov signal.

| Physical confirmation | State | Evidence |
|---|---|---|
| P1 GPU compute | **WATCH** | H100 rental snapshot weaker; H200/B200 mixed; utilization/renewals UNKNOWN |
| P2 Memory | **WATCH** | NAND/eSSD oversupply/pricing weakness; HBM/server DRAM still undersupplied |
| P3 Semis/networking | **ANTI_REVERSAL** | NVIDIA/Cisco fundamentals strong; no new guidance cut |
| P4 Market/technical | **CONFIRMED_WEAKNESS** | SMH below MA50/MA200, -7.25% weekly; SOXX -9.08%; volatility backwardation |

**Formal divergence class: `UNKNOWN`** because Champion is unavailable. Challenger remains research-only.

## New evidence: primary facts, claims and confirmation

### PRIMARY FACT — Cerebras/OpenAI realized capacity penalty

Cerebras' 10-Q, accepted by the SEC on 12-Nov, reports 750MW committed to OpenAI, a $1.0bn working-capital loan, and $26.1bn RPO heavily tied to the MRA. It delivered less capacity than contemplated; service credits began accruing from 1-Oct and offset future monthly service fees. Delays may persist into 2027. This is the first weekly observation here in which a neocloud delivery shortfall has a disclosed realized contractual price rather than only a risk statement.

### PRIMARY FACT — CoreWeave financing and contract quality

CoreWeave's 10-Q reports **$47.5bn total indebtedness**, $18.7bn operating-lease liabilities, and high-coupon unsecured notes including 9.75%, 9.625% and 8.5% tranches. Management guided Q4 interest expense to **$1.05–1.15bn**. The company raised 2026 CapEx guidance to $37–39bn and reported more than 1.7GW active power, 4.6GW contracted power and $132.5bn backlog. It also reclassified **$1.9bn** of beginning deferred revenue to customer liabilities because contracts became cancellable during the quarter. This weakens backlog quality, but is not an actual cancellation or executed amendment; R5 remains EARLY_WARNING. Counterevidence includes $3.66bn Q3 revenue, growing active power and open funding access.

### INDEPENDENT CONFIRMATION — memory cycle

TrendForce's 20-Nov update says Chinese CSP enterprise-SSD cuts and consumer specification downgrades should push NAND into oversupply earlier, with contract prices turning down in 2Q27. AI inference/KV-cache demand drove record supplier revenue, but cannot absorb new capacity. DRAM remains undersupplied, price gains should narrow, and 2027 HBM purchasing is largely set. This is a split cycle: NAND has entered real order/inventory/pricing mechanics; HBM has not.

### GPU pricing and supplier demand

A 24-Nov cross-provider tracker showed H100 SXM at $1.95/GPU-hour, down 13.8%, while H200 was $3.00 and B200 $3.74; a broader index showed B200 on-demand $7.91 and spot $4.98. These series are provider-mix snapshots and do not establish matched utilization. NVIDIA's 17-Nov primary results remain strong: Data Center $107.6bn, +110% YoY, with Rubin racks running at multiple clouds. Pricing is a WATCH signal; supplier shipment/revenue is anti-reversal counterevidence.

## Hyperscaler cash/CapEx baseline and market response

No hyperscaler reported a new quarter. The primary baseline is carried and rechecked.

| Issuer | Latest comparable cash/CapEx fact | Guidance/claim | 17-Nov→24-Nov RTH |
|---|---|---|---:|
| Microsoft | Revenue $92.3bn; OCF $58.0bn; cash PPE $39.4bn; lease-inclusive CapEx $45.2bn; FCF proxy $18.6bn | H2 CapEx accelerates | -2.00% |
| Alphabet | Revenue $127.6bn; OCF $42.3bn; CapEx $51.4bn; FCF -$9.1bn | 2026 CapEx $195–205bn | -0.41% |
| Amazon | Sales $201.9bn; AWS $46.0bn; TTM OCF $168.3bn; TTM FCF -$42.4bn | 2026 cash CapEx about $220bn | -2.17% |
| Meta | OCF $32.79bn; CapEx $34.91bn; FCF -$2.12bn | 2026 CapEx $135–145bn | -4.69% |
| Oracle | OCF $23.10bn; CapEx $28.50bn; FCF -$5.40bn; $11.36bn financing-component prepayments | RPO $664bn | -4.78% |

Massive adjusted regular-session bars: NVDA -0.05%, AMD -17.91%, AVGO -11.86%, MU -11.60%, CRWV -14.60%, NBIS -17.66%, IREN -18.06%, CORZ -18.65%, SMH -7.25%, SOXX -9.08%, QQQ -2.87%, SPY -1.86%. The market is demanding a higher proof threshold from financing-dependent and second-tier hardware exposures, while NVIDIA itself held roughly flat after results. This is selective de-risking, not yet a market reward for explicit hyperscaler CapEx cuts.

## Memory, Micron and Cisco-2000 warning

**HBM/DRAM:** supply remains tight, 2027 HBM volumes are substantially contracted and server DRAM is undersupplied. Price growth is expected to slow as capacity/node migration rises.  
**NAND/eSSD:** Chinese CSP order cuts, high inventory, thin spot trading and growing supply now point to earlier oversupply and falling contract prices.  
**Micron:** the share fell 11.6% this week while the physical HBM evidence remains firm. Current earnings and margins reflect an exceptional pricing cycle. Normalized valuation should use through-cycle gross margin/cash generation and explicitly haircut NAND/DRAM ASPs; current P/E is therefore vulnerable to a peak-earnings trap even without immediate HBM weakness.

**Cisco-2000 mechanics:** real in a subsegment. The chain `orders/capacity acceleration → inventory/capacity availability → price pressure` is visible in NAND/eSSD, and Cerebras adds a distinct delivery/service-credit failure. The full 2000–01 pattern still lacks broad evidence: no system-wide accelerator/networking bookings collapse, no broad inventory liquidation, no HBM contract collapse and no supplier gross-margin collapse. Current status is cycle/valuation risk plus narrow physical confirmation, not a broad Cisco replay.

## AI ROI / Payback — six required answers

1. **Is AI demand growing? Yes.** NVIDIA/Cisco revenue, CoreWeave active power/revenue and Cerebras cloud revenue confirm growth.
2. **Is monetization keeping up with capital deployment? Not consistently.** R1/R2 stay at watch; CapEx and debt rise faster than consolidated cash proof at several issuers.
3. **Is payback lengthening? Evidence is still incomplete, but delivery friction now has realized cost.** Cerebras service credits shorten/discount economics; broad matched project payback data remain unavailable.
4. **Is financing more necessary or expensive? More necessary and expensive for neoclouds.** CoreWeave debt reaches $47.5bn with high coupons and >$1bn quarterly interest guidance; customer prepayments and asset-backed structures remain central.
5. **Are marginal projects delayed/restructured/cancelled? Delays and a paid service-credit consequence are confirmed; no new funded-project cancellation is verified.**
6. **Is financial stress reaching utilization/pricing/hardware? It has reached H100 rental pricing, NAND/eSSD orders/prices and a capacity-delivery penalty. It has not yet produced broad accelerator/networking revenue weakness or matched utilization decline.**

Capacity funnel: ANNOUNCED and CONTRACTED remain much larger than ENERGIZED/UTILIZED/MONETIZED/ECONOMICALLY_PROFITABLE. CoreWeave active power and NVIDIA running systems are real counterexamples to ghost demand. Cerebras demonstrates that a large contract/RPO does not guarantee on-time billable capacity. China property remains only a causal analogy for leverage, pre-funding and duplicated commitments; compute is fungible, globally redeployable and depreciates much faster.

## Macro / Input-Cost Pain

**Score interval: 18–59/100 (`NORMAL` to `BREAK_ZONE`).** M1=15/30; M2=1–17/20; M3=0–20/20; M4=2–7/30.

- US 10Y constant maturity was 4.92% on 23-Nov, +22bp from 24-Aug; term pressure eased from last week's 5.10%.
- Broad IG OAS was 97bp on 23-Nov, +16bp over three months: wider, but below the 100bp level threshold.
- Comparable CPI YoY remains unavailable under the current release gap; CRB same-variant history remains UNKNOWN.
- `FUNDING_BREAK_FLAG=NO`: funding access remains open and no major debt-below-95 plus failed-syndication pair was verified.
- `STAGFLATION_TRAP_FLAG=UNKNOWN`; `EASING_FAILURE_FLAG=UNKNOWN` because inflation/CRB prerequisites remain incomplete.

Macro pressure improved at the long end, but the observed neocloud service-credit and high-coupon debt effects persist.

## Institutional de-risking

**H-state: `H3_ACTIVE_DERISK`; confidence MEDIUM; weekly delta WORSENING PRICE STRESS / MIXED POSITIONING.** No direct margin-call, haircut or forced-liquidation evidence supports H4.

| Input | Current observation | Weekly read |
|---|---:|---|
| CFTC Nasdaq 20974+ leveraged funds | L 51,699 / S 64,310 / spread 51,855 / net -12,611 | WoW -25,324; 4W -5,367; 13W +50,788 |
| CFTC S&P 13874+ leveraged funds | L 207,111 / S 417,742 / spread 846,168 / net -210,631 | WoW +65,516; 4W +138,043; 13W +56,878 |
| Cboe put/call, 19-Nov | total 1.01 / index 1.20 / equity 0.62 | Latest retrieved official day; 24-Nov UNKNOWN |
| SKEW / VIX | 140.37 (23-Nov) / 26.36 (24-Nov) | Tail/spot vol elevated |
| VIX futures, 24-Nov | Dec 23.98 / Jan 23.64 | Backwardation |
| Prime broker | UNKNOWN | No public same-method current panel |
| Lending/shorts | UNKNOWN | No comparable public AI basket |
| Forced deleveraging | NO direct evidence | H3, not H4 |
| Price-positioning divergence | YES | Nasdaq leveraged net flipped short while vendor fundamentals stayed strong |

CFTC uses TFF futures-and-options combined, consolidated codes and leveraged-fund category. Positions are Tuesday 17-Nov and publication Friday 20-Nov; all horizons use the same variant.

## AI Compute Economics / Efficiency

1. **Comparable task-cost change:** UNKNOWN. GPU-hour price changes are not quality-adjusted useful-task costs.
2. **Monetization/pricing discipline:** Mixed. Public GPU spot prices weakened, but supplier and neocloud revenue still grew.
3. **Induced demand/rebound:** Supported by NVIDIA/Cisco shipments and CoreWeave active power; end-customer economic causality remains incomplete.
4. **Committed-capacity economics:** Cerebras service credits prove that delayed delivery can reduce subsequent fees; CoreWeave's cancellable-contract reclassification and high interest burden raise contract-duration/hardware-life mismatch risk.
5. **Hypothesis assessment:** **Supported at the margin, not system-wide.** Capacity can outpace monetizable/on-time delivery before broad physical oversupply. Counterevidence is record vendor revenue and tight HBM. Next check: service-credit quantification, actual cancellations/renewals and whether NAND weakness spreads to HBM/networking.

## Coverage, unknowns and weekly change

| Block | Freshness | Status | Change vs 18-Nov |
|---|---|---|---|
| Champion | market through 24-Nov | PARTIAL | Technical breakdown deepened; Combined Score withheld |
| Challenger v2.1 | PIT 25-Nov 08:46 Israel | PARTIAL; [48.36,55.64] | New R6 +2.00 qualified service-credit effect |
| Hyperscaler cash/CapEx | latest quarters rechecked 25-Nov | CARRIED_RECHECKED | No new quarter |
| GPU compute | prices 24-Nov | PARTIAL | H100 snapshot weaker; utilization/renewals UNKNOWN |
| Memory/semis/networking | 20–24 Nov | PARTIAL | NAND oversupply/pricing mechanics broaden; HBM intact |
| Macro | 23-Nov | PARTIAL; 18–59 | 10Y eased, IG OAS widened |
| Institutional | CFTC 17-Nov; market 24-Nov | PARTIAL / H3 | Nasdaq leveraged net flipped short; sector selloff deepened |
| Event registry | review 25-Nov | PARTIAL | New canonical Cerebras event registered and QUALIFIED; old daily ledger reconciliation pending |

### Explicit unknowns and next actions

- R4/MSFT, R4/GOOGL: no eligible matched financing observation; next material filing/event only, 2-Dec.
- GPU utilization, renewals and comparable contract duration: non-public/non-standard; reopen on new primary evidence, not calendar alone.
- Same-variant CRB momentum/mean: retrieval/methodology gap; no proxy mixing.
- AI-sector OAS, prime-broker and securities-lending panels: unavailable subscription/non-comparable methodology.
- 24-Nov Cboe total/index/equity put/call: dated official page not retrieved; latest accepted is 19-Nov.
- HBM sell-through, inventory days and double-ordering: no comparable public weekly series.
- Cerebras service-credit amount and excused-delay adjustment: not disclosed.
- 12-Nov Daily Close reconciliation: missed distinct service-credit occurrence requires append-only historical supplement/index revision; COMPLETE remains blocked.

## Audit verdict

**CHANGES_REQUIRED before owner acceptance; valid as a PARTIAL research package.** The report contains a material new primary fact and a defensible narrow R6 qualification, with counterevidence and no claim of broad reversal. Frozen cohort, PIT, separate P1–P4, category null, UNCALIBRATED and NO_TRADE are preserved. The main defects are the unreconciled 12-Nov daily ledger backfill, unavailable private/comparable panels and pending GitHub owner review. Validator and exact-head CI results must be stated separately after the PR runs; this content verdict is not owner reviewer PASS.

## Source ledger (PIT and evidence class)

| Observation / publication availability | Evidence class | Source |
|---|---|---|
| Cerebras Q3 10-Q; SEC accepted 12-Nov-2026 17:11:09 EST; known public by 22:11:09Z | PRIMARY FACT | [SEC filing](https://www.sec.gov/Archives/edgar/data/2021728/000162828026073494/cbrs-20260930.htm), [acceptance index](https://www.sec.gov/Archives/edgar/data/2021728/000162828026073494/0001628280-26-073494-index.htm) |
| CoreWeave Q3 10-Q, filed 10-Nov-2026; rechecked 25-Nov | PRIMARY FACT | [SEC filing index](https://www.sec.gov/Archives/edgar/data/1878848/000187884826000052/0001878848-26-000052-index.htm), [issuer results](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Reports-Strong-Third-Quarter-2026-Results/default.aspx) |
| NAND/DRAM contract-price outlook, published 20-Nov-2026 | INDEPENDENT CONFIRMATION | [TrendForce NAND research](https://www.trendforce.com/research/category/Semiconductors/NAND%20Flash?type=6) |
| NVIDIA fiscal Q3 results, published 17-Nov-2026 | PRIMARY FACT / COUNTEREVIDENCE | [NVIDIA investor release](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/) |
| GPU rental snapshots observed 24-Nov-2026 | PROVIDER OBSERVATION | [Frenzy GPU prices](https://www.frenzycap.com/gpu-prices), [06.ai compute index](https://06.ai/trackers/gpu-compute-price-index/) |
| CFTC TFF positions 17-Nov, published 20-Nov-2026 | PRIMARY FACT | [CFTC futures-and-options combined](https://www.cftc.gov/dea/options/financial_lof.htm) |
| Put/call 19-Nov and VIX futures 24-Nov-2026 | PRIMARY MARKET DATA | [Cboe put/call](https://www.cboe.com/markets/us/options/market-statistics/daily?dt=2026-11-19), [Cboe futures settlements](https://www.cboe.com/markets/us/futures/market-statistics/settlement/futures/daily) |
| DGS10 and IG OAS observations through 23-Nov-2026 | PRIMARY MARKET DATA | [FRED DGS10](https://fred.stlouisfed.org/series/DGS10), [FRED BAMLC0A0CM](https://fred.stlouisfed.org/series/BAMLC0A0CM) |

Hyperscaler observations are carried, rechecked primary filings listed in the structured Challenger manifest. Adjusted equity returns use matched 17-Nov and 24-Nov regular-session bars; after-hours prices are excluded.
