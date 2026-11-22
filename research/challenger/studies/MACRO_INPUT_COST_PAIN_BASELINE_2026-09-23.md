# Macro / Input-Cost Pain Baseline — 2026-09-23

**Model:** `Docs/MACRO_INPUT_COST_PAIN_OVERLAY_v1.md`  
**Status:** RESEARCH-ONLY / no trade authority  
**Purpose:** calibrate the new overlay against 2000-01, 2006-08, 2018 and 2022, then establish the 2026-09-23 baseline.

## Executive conclusion

The historical review supports a **nonlinear pain zone**, but not a single magic rate or CRB level. The most useful interpretation is:

- below ~40: macro/input costs are unlikely to be the main reason a project breaks;
- 40-54: high stress, but many projects remain viable;
- **55-69: BREAK_ZONE** — marginal project IRR/NPV becomes highly sensitive to small additional shocks;
- >=70: crisis-transmission conditions are possible, but still require sector/project confirmation.

The overlay is **not a universal crash detector**. 2018 is an important negative control: the equity selloff was driven mainly by monetary/liquidity/valuation tightening while commodity/inflation pressure was modest, so this overlay would have remained low-to-moderate. 2022 is the opposite lesson: the overlay would have been very high and correctly captured severe duration/input-cost pain, yet no systemic corporate-investment collapse followed. Therefore Macro Pain must be combined with R7 project attrition and P1-P3 physical confirmation.

## Current baseline — 23 Sep 2026

### Known inputs

- US 10Y Treasury: **4.96%** on 21-Sep-2026; around +48 bp from early July.
- Fed target range after 17-Sep-2026 hike: **3.75-4.00%**.
- US CPI Aug-2026: **3.4% YoY**; monthly +0.4%.
- US energy CPI: **+16.3% YoY**.
- FTSE/CoreCommodity CRB variant matching the project TradingView/StockQ chart: approximately **418.7**; **+38.73% YTD**; approximately 21.6% above the shown ~260-day mean of 344.27.
- AI-related corporate spread: approximately **115 bp** versus approximately **78 bp** for broader corporate debt.
- Oracle-linked Project Jupiter loans: approximately **89-91 cents on the dollar** with reported syndication/distribution difficulty.

### Provisional component state

Because a clean 3-month time series for the **same** AI spread definition and exact 12-month CRB return is not yet stored in the project, governance requires a score range rather than invented precision.

```text
M1 Long-term funding pressure:   ~16 / 30
M2 Inflation persistence:        ~11 / 20
M3 Commodity/input pressure:     ~17 / 20
M4 Credit transmission:          ~8-18 / 30

Provisional total:               ~52-62 / 100
Raw state range:                 HIGH_STRESS -> BREAK_ZONE
FUNDING_BREAK_FLAG:              YES
STAGFLATION_TRAP_FLAG:           not yet fully triggered (CPI <3.5 threshold by 0.1 pp)
EASING_FAILURE_FLAG:             NO / not applicable; Fed is tightening, not easing
```

**Interpretation:** because `FUNDING_BREAK_FLAG=YES` and Challenger is already `ALERT / Stage 4`, the practical interpretation is **entry into BREAK_ZONE**, even though the exact point score is not pinned until spread velocity and same-variant CRB 12m data are stored.

## Historical calibration

The score ranges below are reconstructed from contemporaneous public data. They are intentionally approximate where historical sector-specific spread or same-variant CRB momentum is incomplete.

### 2000-01 — dot-com / telecom bust

Key facts:

- Fed target reached **6.50%** in May 2000 and stayed there through year-end.
- 10Y Treasury was about **6.26% in March 2000** and 6.44% in May.
- CPI increased **3.4% in 2000**.
- Backcast modern-CRB series reached a 2000 high around **204.64**, versus 157.69 at end-1999.

Approximate overlay state around the Nasdaq peak:

```text
Macro Pain: ~49-58
State: HIGH_STRESS / lower edge BREAK_ZONE
```

Lesson: a high long-term rate and rising input inflation were already restrictive, but the dot-com collapse did **not** require a 2008-style commodity extreme. This is important because many dot-com businesses were far less physically capital-intensive than current AI datacenter infrastructure.

### 2006 — late housing/credit expansion

Key facts:

- Fed raised from 1.00% in 2004 to **5.25% by 29-Jun-2006** through seventeen consecutive 25-bp hikes, a cumulative +425 bp.
- Fed then held 5.25% until September 2007.
- 10Y Treasury averaged about **5.11% in May-June 2006**.
- CPI was **4.3% YoY in June 2006**.
- CRB annual high was about **365**.
- Investment-grade spreads were still tight before the credit break.

Approximate overlay:

```text
Macro Pain: ~45-52
State: HIGH_STRESS
```

Lesson: long-duration economics were already under pressure, but tight credit spreads delayed the break. This argues strongly against using rates or CRB alone.

### 2007 — equity peak / first credit deterioration

Key sequence:

- Fed held 5.25% until Sep-2007, then cut to 4.75% on 18-Sep, 4.50% in Oct and 4.25% in Dec.
- 10Y was about **5.10% in June 2007** and had fallen to roughly 4.5% by autumn.
- CPI ended 2007 at **4.1% YoY**.
- CRB ended 2007 near its annual high, about **358.7**.
- Credit spreads had begun widening.

Approximate overlay around Q3/Q4:

```text
Macro Pain: ~50-60
State: HIGH_STRESS -> BREAK_ZONE
```

Lesson: the equity market can peak while long yields are already falling. The critical signal was not the absolute 10Y level alone but the combination of prior prolonged tightening, persistent commodity inflation and widening credit stress.

### 2008 — commodity/inflation climax after Fed cuts

Key facts:

- Fed cut from 5.25% in Sep-2007 to **2.00% by Apr-2008**.
- 10Y fell to about **4.0% by mid-2008**.
- Nevertheless CPI reached **5.6% YoY in July 2008**.
- CRB reached approximately **473.97** in July 2008.
- Corporate credit spreads widened materially before Lehman and then exploded after Lehman; investment-grade spreads ultimately exceeded 500 bp during the crisis.

Approximate pre-Lehman overlay near the commodity peak:

```text
Macro Pain: ~60-70
State: BREAK_ZONE, approaching CRISIS_TRANSMISSION
```

Post-Lehman the credit component alone pushes the environment into clear `CRISIS_TRANSMISSION`.

**Critical lesson:** Fed cuts did not immediately relieve project/input stress. Commodities and headline inflation continued rising for months after easing began. This is the basis for `EASING_FAILURE_FLAG`.

### 2018 — useful negative control

Key facts:

- Fed raised four times in 2018, ending at **2.25-2.50%**.
- 10Y peaked near **3.24%** in early November.
- CPI was about **2.5% YoY in Oct-2018**, after 2.9% in mid-year.
- CRB was near **200** in October and finished 2018 down about **12%**.
- US IG spreads widened materially; one contemporary source reports about 96 bp at end-2017 and 154 bp at end-2018, with global US IG spreads peaking near 1.8% in the late-2018 stress.

Approximate overlay:

```text
Macro Pain: ~20-35
State: NORMAL / WATCH
```

Yet equities suffered an approximately 20% Q4 correction.

Lesson: **this overlay should not predict every equity correction.** 2018 was mainly a real-rate/liquidity/QT/valuation shock, not a commodity-driven CapEx pain event. This is a feature, not a bug, because the overlay is designed for capital-intensive AI infrastructure economics.

### 2022 — inflation / commodity / rates shock

Key facts:

- Fed raised from 0.25-0.50% in March to **4.25-4.50% by December 2022** — roughly +425 bp in nine months.
- CPI reached **9.1% YoY in June 2022**.
- CRB was about **325.8 on 13-Jun-2022** and was reported up roughly **37% YTD** around mid-June.
- 10Y rose rapidly, reaching 3.7-4.0% in late September and above 4% in October.
- Credit spreads widened but the corporate system did not experience a 2008-style funding shutdown.

Approximate mid-2022 overlay:

```text
Macro Pain: ~60-70
State: BREAK_ZONE / lower CRISIS_TRANSMISSION
```

Lesson: high Macro Pain can cause a severe duration-asset and equity repricing without a systemic collapse. It is therefore a **fragility amplifier**, not a standalone crash probability.

## Which historical analogy is closest to Sep-2026?

The best description is a **hybrid**:

1. **2006-07 structure:** long rates around 5%, large capital-investment boom, physical demand still strong, credit still open but beginning to discriminate.
2. **2022 input shock:** rapid commodity/energy inflation and significant upward pressure on project input costs.
3. **Not yet 2008:** no broad physical-demand collapse, no memory/networking collapse, no generalized corporate funding freeze.
4. **Not 2018:** the current problem is much more directly tied to commodity/input costs and infrastructure financing than the 2018 valuation/liquidity correction.

The most important difference from 2006-08 is that large hyperscalers have much stronger balance sheets than subprime households/banks, while the weak link is concentrated in marginal projects, neocloud balance sheets, project-finance structures and very long contractual commitments.

## Current trigger map

The overlay should be treated as materially worse if any of the following occur:

### Macro escalation

- 10Y Treasury closes/holds **>=5.25%** for several weeks;
- CPI returns to **>=4.0%**;
- same-variant CRB remains >20% above its 12m mean and >35% YoY;
- AI/hyperscaler spreads widen to **>=150 bp** while broad IG remains materially tighter.

### Project-economics escalation

- repeated project debt below 95 cents;
- multiple failed/difficult syndications;
- project refinancing yields rise while contracted compute prices fall;
- construction/power delays increase expected payback by >=6-12 months;
- project cancellations/deferrals become economically motivated rather than permitting-only.

### Physical transmission

- GPU rental prices fall alongside availability **and** utilization/renewals weaken;
- HBM/DRAM contract prices roll over and inventory days rise;
- networking/accelerator orders weaken;
- hyperscaler CapEx guidance is cut for ROI/cash reasons.

## Research conclusion

The historical review does **not** support a single threshold such as `CRB=470` or `Fed Funds=5.25%` as a crash trigger. It supports a multi-factor cliff:

`high/rising term rates + persistent inflation + strong commodity momentum + widening credit spreads`.

The evidence suggests that **~55-60 on the proposed overlay is a reasonable BREAK_ZONE boundary** where marginal project economics become much more sensitive to small shocks. The present 2026 environment is approximately at that boundary, and Project Jupiter supplies the first explicit `FUNDING_BREAK_FLAG`. Physical confirmation is still absent, so this remains a financial-first warning rather than a confirmed AI CapEx collapse.

## Sources used for calibration

- Federal Reserve Open Market Operations historical target-rate table: https://www.federalreserve.gov/monetarypolicy/openmarket.htm
- FRED DGS10 / GS10 Treasury series: https://fred.stlouisfed.org/series/DGS10
- BLS CPI releases and historical tables: https://www.bls.gov/cpi/
- BLS July 2008 CPI release (5.6% YoY): https://www.bls.gov/news.release/archives/cpi_08142008.htm
- BLS June 2022 CPI release (9.1% YoY): https://www.bls.gov/news.release/archives/cpi_07132022.htm
- BLS August 2026 CPI release (3.4% YoY; energy +16.3%): https://www.bls.gov/news.release/archives/cpi_09112026.htm
- FTSE/CoreCommodity CRB methodology: https://www.lseg.com/content/dam/ftse-russell/en_us/documents/ground-rules/ftse-corecommodity-crb-index-methodology.pdf
- CRB historical/backcast context and annual levels: Commodity Research Bureau historical series / Stooq-derived historical tables; use same variant with caution.
- CME 2022 commodity/inflation review: https://www.cmegroup.com/insights/economic-research/2022/commodities-as-an-inflation-hedge.html
- Reuters 22-Sep-2026 AI debt spreads: https://www.reuters.com/legal/transactional/corporate-bond-buyers-get-picky-with-flood-ai-debt-2026-09-22/
- Reuters 18-Sep-2026 Project Jupiter debt: https://www.reuters.com/business/finance/oracles-18-billion-data-center-debt-under-pressure-ft-reports-2026-09-18/
