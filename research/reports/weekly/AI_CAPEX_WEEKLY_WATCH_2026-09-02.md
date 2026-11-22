# AI CapEx Weekly Watch — 2026-09-02

**Status:** RESEARCH CAPTURE / NORMALIZED  
**Research period:** 2026-08-29 through 2026-09-02  
**Previous fundamental snapshot:** `data/fundamental_snapshot_2026-08-28.yaml`  
**Successor snapshot:** `data/fundamental_snapshot_2026-09-02.yaml`  
**Decision scope:** research evidence only; no BUY/SELL authority

## 1. Executive outcome

```text
AI_CAPEX_REVERSAL:          NOT CONFIRMED
PHYSICAL_DEMAND:           VERY STRONG / SUPPLY-CONSTRAINED
HYPERSCALER_CAPEX:          EXPANDING
GPU_OVERCAPACITY:           NOT CONFIRMED
MEMORY_CYCLE:              SHORTAGE / TIGHT
PEAK_EARNINGS_RISK_MU:     HIGH
FINANCING_DEPENDENCE:      HIGH
CREDIT_MARKET:             NORMAL
COUNTERPARTY_CONCENTRATION:HIGH
CIRCULARITY_RISK:          ELEVATED
BACKLOG_QUALITY:           WATCH
TRADE_STATE:               NO_CONFIRMED_REVERSAL / NO_CANDIDATE
```

The weekly delta strengthens the separation between the physical and financial cycles. Physical demand remains strongly anti-reversal: NVIDIA demand/guidance, server AI demand and memory pricing continue to indicate shortage rather than excess capacity. The main deterioration is in financing architecture, concentration and backlog-quality risk. The new structural warning is `ghost demand`: announced/grid-requested data-center demand can materially exceed funded and ultimately energized demand.

## 2. Confirmed hyperscaler baseline

### Microsoft

Primary/official evidence:

- FY26 Q4 CapEx: about `$41B`, with `$35.8B` cash paid for PP&E;
- operating cash flow: `$55.4B`;
- free cash flow: `$19.6B`;
- commercial RPO: `$678B`, +84% YoY;
- management continued to describe strong cloud/AI demand and high infrastructure investment.

Interpretation: `ANTI_REVERSAL` on demand/CapEx; `WATCH` on cash conversion because FCF is materially below OCF due to infrastructure spending.

Source: https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4

### Amazon

Primary/official evidence:

- AWS Q2 sales: `$42.2B`, +37% YoY;
- trailing-12-month operating cash flow: `$161.4B`, +33%;
- trailing-12-month free cash flow: `-$7.6B` versus `+$18.2B` a year earlier;
- Amazon explicitly attributed the FCF deterioration primarily to a `$66.1B` YoY increase in PP&E purchases, mainly AI investment.

Interpretation: physical/cloud demand remains strong, but the financing/cash-conversion burden is now material.

Sources:
- https://www.aboutamazon.com/news/company-news/amazon-earnings-q2-2026-report
- https://www.sec.gov/Archives/edgar/data/1018724/000101872426000024/amzn-20260630xex991.htm

### Alphabet

Primary evidence:

- Q2 operating cash flow: `$39.1B`;
- Q2 CapEx: `$44.9B`;
- CapEx therefore exceeded quarterly OCF before other cash-flow items.

Interpretation: one of the clearest hyperscaler cash-pressure signals, but not a CapEx cut or demand-reversal signal.

Source: https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm

### Meta

Primary/official evidence:

- Q2 CapEx including finance-lease principal: `$31.08B`;
- operating cash flow: `$31.86B`;
- free cash flow: only `$784M`;
- long-term debt: `$83.66B`.

Interpretation: very high cash absorption from AI infrastructure; no confirmed CapEx discipline/reversal yet.

Sources:
- https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/default.aspx
- https://www.sec.gov/Archives/edgar/data/1326801/000162828026050596/meta-06302026xexhibit991.htm

## 3. NVIDIA / semiconductor physical confirmation

NVIDIA Q2 FY27 remained strongly anti-reversal:

```text
Revenue:             $96.2B
Data Center:         $89.0B
Q3 revenue guidance: $108B +/-2%
```

Vera Rubin was described as ramping into full production across CoreWeave, Google Cloud, Microsoft Azure, Oracle and Nebius. No broad customer digestion/cancellation signal was disclosed in the earnings release.

Interpretation: `F4 semiconductor guidance deterioration` remains inactive. This is stronger evidence for a supply-constrained expansion regime than for near-term overcapacity.

Source: https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Second-Quarter-Fiscal-2027/default.aspx

## 4. Memory / Micron / Cisco-2000 warning

### Micron current cycle position

Primary facts from FQ3-26:

```text
Revenue:               $41.456B
GAAP gross margin:     84.6%
GAAP operating margin: 80.4%
Operating cash flow:   $25.39B
CapEx:                 $7.1B
Adjusted FCF:          $18.3B
Cloud Memory GM:       83%
Core Data Center GM:   87%
```

The margins are extraordinary relative to the prior-year company gross margin of 37.7%. This makes `peak_earnings_risk` HIGH: current P/E should not be treated as a normalized valuation anchor.

Source: https://investors.micron.com/financials/quarterly-results/

### Independent memory cross-check — 2 Sep 2026

TrendForce's 2-Sep DRAM bulletin states that PC DRAM contract-price increases were revised upward; HBM negotiations remain difficult but pricing retains significant upside. The 2-Sep NAND bulletin says Q3 contract prices were finalized on strong server/AI demand while consumer spot demand remains weak/flat.

Additional TrendForce evidence continues to show server DRAM undersupply, with 3Q26 contract-price increases around 13-18% QoQ and a structural capacity shift toward HBM/server memory.

Sources:
- https://www.trendforce.com/research/download/RP260902ZP
- https://www.trendforce.com/research/download/RP260902CD
- https://www.trendforce.com/presscenter/news/20260709-13140.html
- https://www.trendforce.com/price/dram/dram_contract

### SK hynix

SK hynix announced the Indiana HBM4E project and publicly stated that it expects memory demand/tightness to persist through 2030. This is a management claim, not independent proof of future shortage, but it is consistent with current pricing and NVIDIA demand evidence.

Source: https://www.reuters.com/world/asia-pacific/sk-hynix-holds-groundbreaking-ceremony-4-billion-indiana-ai-chip-packaging-2026-08-27/

### Cisco-2000 classification

Current evidence does **not** show the Cisco-2001 failure mechanics:

```text
bookings collapse       NOT CONFIRMED
inventory glut          NOT CONFIRMED
memory pricing decline  NOT CONFIRMED
HBM availability surge  NOT CONFIRMED
gross-margin reversal   NOT CONFIRMED
hyperscaler CapEx cuts  NOT CONFIRMED
```

The analogy remains useful only at the structural/cycle-risk level: exceptional margins + aggressive capacity expansion can eventually create a peak-earnings trap if demand growth slows before new supply is absorbed.

## 5. Financing / neocloud / infrastructure quality

### Anthropic / Nscale / Lambda

Reuters reported:

- Anthropic committed about `$45B` of compute spending with Nscale;
- Anthropic also signed about a `$35B` cloud deal with Nvidia-backed Lambda;
- Nscale is presenting roughly `$103B` of contracted revenue ahead of a possible IPO.

These figures are strongly anti-reversal for near-term contracted compute demand, but they also increase financing dependence and contract-quality scrutiny because a larger share of the ecosystem relies on very large long-duration commitments.

Sources:
- https://www.reuters.com/technology/artificial-intelligence/anthropic-was-cautious-mega-infra-deals-then-demand-surged-2026-09-02/
- https://www.reuters.com/technology/anthropic-signs-35-billion-cloud-deal-with-nvidia-backed-lambda-source-says-2026-08-31/
- https://www.reuters.com/business/media-telecom/nscale-touts-103-billion-contracted-revenue-ahead-potential-ipo-information-2026-09-02/

### Ghost demand — new structural warning

Reuters reported more than `700 GW` of U.S. data-center grid-connection requests, far above current actual data-center power use. Texas and other regions are tightening verification/deposit rules; some utilities have reduced forecasts after imposing stronger project requirements.

This is the most important new `backlog quality` warning of the week:

```text
announced / requested capacity
>
funded capacity
>
constructed capacity
>
energized capacity
```

It does **not** prove a current hardware-demand reversal. It does show that headline GW/project pipelines can include duplicated, speculative or insufficiently funded demand.

Source: https://www.reuters.com/business/texas-halt-powering-data-centers-reflects-us-reckoning-over-ghost-demand-2026-09-01/

### SB Energy — concentration sensor

SB Energy filed an S-1 on 1-Sep-2026. The filing confirms that this is now a public-markets financing object worthy of permanent monitoring. High-quality press analysis notes that its data-center commitments are highly concentrated in OpenAI/SoftBank-related demand and that current operating revenue is still primarily legacy energy rather than operating data centers.

Primary filing:
https://www.sec.gov/Archives/edgar/data/2133037/000162828026059639/0001628280-26-059639-index.htm

Secondary analysis:
https://www.reuters.com/commentary/breakingviews/sb-energys-giant-ipo-is-getting-ahead-itself-2026-09-01/

Interpretation: `counterparty_concentration = HIGH`; `F5` remains inactive because deterioration/cancellation has not yet occurred.

## 6. Weekly delta vs 28-Aug snapshot

```text
PHYSICAL_DEMAND:             STRONG -> STRONG
GPU_OVERSUPPLY:              NOT CONFIRMED -> NOT CONFIRMED
MEMORY_CYCLE:                SHORTAGE -> SHORTAGE
PEAK_EARNINGS_RISK_MU:       ELEVATED -> HIGH
FINANCING_DEPENDENCE:        ELEVATED -> HIGH
CASH_CONVERSION:             WATCH -> WATCH
CREDIT_MARKET:               NORMAL -> NORMAL
COUNTERPARTY_CONCENTRATION:  HIGH -> HIGH
CIRCULARITY_RISK:            ELEVATED -> ELEVATED
BACKLOG_QUALITY:             NORMAL/LOW RISK -> WATCH
```

No validated F1-F5 trigger crosses a new threshold this week. The evidence is important enough to create a successor snapshot because financing dependence and backlog-quality risk are materially clearer, while physical reversal remains unconfirmed.

## 7. Normalized decision

```text
F1 Hyperscaler CapEx Discipline:          0
F2 GPU Compute Oversupply:                0
F3 Neocloud / Credit Stress:              1
F4 Semiconductor Guidance Deterioration:  0
F5 RPO / Backlog Quality Deterioration:   0

DECISION_STATE:       NO_CONFIRMED_REVERSAL
ACTIVE_DRIVER:        NONE
ACTIVE_WARNING:       FINANCING_DEPENDENCE / BACKLOG_QUALITY / END_CUSTOMER_ECONOMICS
TRADE_CANDIDATE:      NO_CANDIDATE
```

The system remains in a `WATCH` research posture, not an `ALERT` reversal state.

## 8. What would change the regime

Escalation requires evidence such as:

```text
project cancellations / deferrals
refinancing spread widening / covenant tightening
credit-market deterioration
HBM/DRAM lead-time compression + pricing weakness
GPU rental price decline + availability increase + utilization decline
Micron/SK hynix/Samsung inventory build
semiconductor guidance cuts
hyperscaler CapEx guidance cuts
strong positive fundamentals repeatedly rejected by sector price action
```

## 9. Provenance note

This research note processes the 2-Sep weekly AI CapEx Watch into the repository evidence format. It does not ingest unrelated personal-finance data. The uploaded Discount/credit-card transaction workbook is outside the AI CapEx research domain and was deliberately excluded from this record.
