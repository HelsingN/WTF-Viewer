# Institutional De-risking Baseline — 2026-09-23

**Status:** RESEARCH / SHADOW ONLY  
**Contract:** `Docs/INSTITUTIONAL_DERISKING_OVERLAY_v1.md`  
**Trading authority:** NONE  
**Purpose:** establish the first point-in-time baseline for institutional hedging / de-risking evidence to be carried into future weekly research.

## Executive state

```text
Institutional State:          H1_QUIET_HEDGING
Institutional Confidence:     MEDIUM
CFTC Nasdaq Leveraged Net:    NET SHORT, but materially LESS short WoW
CFTC S&P Leveraged Net:       NET SHORT, but LESS short WoW
Options Hedging:              WATCH, not acute stress
VIX Term Structure:           CONTANGO
Prime-Broker Positioning:     HEDGING / PROFIT-TAKING evidence, but latest public detail is not same-week
Securities Lending / Shorts:  WATCH / broad aggregate only
Forced Deleveraging:          NO broad confirmation
Price-Positioning Divergence:  PARTIAL / WATCH
Weekly Delta:                 mixed; no acceleration into H3
```

Current interpretation: professional risk positioning shows evidence of caution and hedging, but **not** a broad transition into active de-risking. The strongest current primary positioning data actually moved *less bearish* during the latest CFTC week. This prevents narrative-fitting: the institutional overlay does not currently confirm the Challenger's Stage-4 financial warning with an H3 signal.

## PRIMARY_POSITIONING_DATA — CFTC TFF

Latest available weekly Traders in Financial Futures data are for positions as of **15-Sep-2026**.

### Nasdaq-100 consolidated

Leveraged Funds:

```text
Long:       46,085
Short:      59,137
Spreading:  30,161
Net L-S:   -13,052 contracts
```

Week-over-week change from 08-Sep:

```text
Long change:   +4,045
Short change: -19,789
Net change:   +23,834 contracts
```

Interpretation: leveraged-fund Nasdaq futures positioning remained directionally net short, but the net short **narrowed sharply** rather than intensifying. This is inconsistent with a claim that leveraged funds are currently accelerating into a broad Nasdaq short.

Source: CFTC Traders in Financial Futures, futures-only, positions as of 15-Sep-2026.

### S&P 500 consolidated

Leveraged Funds:

```text
Long:      146,263
Short:     458,094
Spreading: 183,336
Net L-S:  -311,831 contracts
```

Week-over-week change from 08-Sep:

```text
Long change:   +6,985
Short change: -43,271
Net change:   +50,256 contracts
```

Interpretation: the leveraged-fund category remains heavily net short S&P futures, but again the latest weekly move was **less short**, not more short. Because futures can hedge cash-equity longs, the level alone cannot be interpreted as a directional hedge-fund crash call.

## PRIMARY_POSITIONING_DATA — volatility / options

Cboe data on 23-Sep showed VIX spot around **14.6**. The listed VIX futures curve was upward sloping: October around 17.5, November around 19.1, December around 19.3 and early-2027 contracts around 20+. That is **contango**, not acute backwardation.

Interpretation: there is no broad volatility-market evidence of H4 forced deleveraging or even a clean H3 acute de-risking regime.

Cboe SKEW was around the mid-140s in the latest available daily data, indicating non-trivial tail-risk pricing, but elevated skew with low spot VIX and contango is better classified as **tail-risk insurance demand / H1-style caution** than as an imminent crash signal.

Cboe daily put/call data should be tracked as a time series from the next observation onward. A single daily reading is not used to promote the state.

## PRIME_BROKER_PUBLISHED

Goldman Sachs Prime Services reported in May 2026 that hedge-fund clients were taking profits in semiconductor and semiconductor-equipment names while hedging broader market exposure, with unusually high macro/index/ETF short exposure. Goldman explicitly characterized the semiconductor selling as profit-taking rather than evidence of a fundamental regime shift away from AI.

This is useful structural evidence for the **H1_QUIET_HEDGING** pattern, but it is months old and therefore cannot be treated as same-week positioning evidence.

Morgan Stanley's 2026 hedge-fund commentary also emphasized increasing dispersion / stock-picking around AI rather than uniform thematic exposure. That supports the usefulness of H2 as a future state, but it is not sufficient to classify the current week as H2 without fresher positioning data.

## Securities lending / shorting proxies

OCC reported August 2026 average daily securities-loan value around **$226.5B**, roughly **24% above August 2025**. This shows elevated securities-lending activity at the aggregate market level, but it is not AI-specific and therefore remains contextual only.

Security-level short interest / borrow data for NVDA, AVGO, MU, CRWV, SMH/QQQ and key hyperscalers should be added when reliable comparable histories are available.

## Interaction with current AI CapEx research

Current research stack as of 23-Sep:

```text
Champion:             WATCH / NO_CANDIDATE
Challenger:           ALERT / Stage 4
Macro Pain:           HIGH_STRESS -> BREAK_ZONE boundary / funding-break evidence present
Physical confirmation: still largely ANTI_REVERSAL
Institutional state:  H1_QUIET_HEDGING
```

This is a meaningful divergence:

- credit / project-financing evidence is deteriorating;
- macro/input-cost fragility is elevated;
- institutional positioning shows caution but **not** an accelerating broad exit;
- physical AI demand remains strong.

Therefore institutional evidence currently supports **preparedness**, not bearish execution.

## What would promote H1 -> H2/H3

Watch for a persistent combination of:

1. Nasdaq / SMH near highs while CFTC leveraged-fund net exposure worsens for multiple weeks;
2. fresh prime-broker evidence that technology / semiconductor net exposure is falling materially;
3. rising index / ETF short exposure rather than one-week noise;
4. sustained increase in put skew / put-call ratios while headline prices remain resilient;
5. short-interest / securities-lending acceleration in fragile AI names;
6. widening AI credit spreads at the same time;
7. falling gross longs / net beta in published prime-broker data.

H3 should require at least two independent positioning families and persistence. H4 requires direct forced-liquidation / funding evidence.

## Weekly research integration

Beginning with the next substantive weekly report, include the mandatory `Institutional De-risking` block from `INSTITUTIONAL_DERISKING_OVERLAY_v1.md` alongside:

- Champion state
- Challenger state
- Physical P1..P4
- Macro / Input-Cost Pain Overlay
- credit / financing state

This overlay never changes Champion thresholds and never creates a trade signal by itself.
