# AI CapEx Daily Close — 2026-11-10

**As-of:** 2026-11-10 16:34 EST (21:34 UTC); regular US equities session 09:30–16:00 EST. **PARTIAL / REGISTRY_RECONCILED / NO_CURRENT_V2_SCORE / NO_TRADE.** This is an evidence-limited research report, not a validated daily registry ledger.

## Canonical event ledger — November 10 (NY date)

| Priority | Canonical event | Source and PIT | Model route |
|---|---|---|---|
| CRITICAL | `EVT-20261110-8A35ECE41917` — SoftBank FY2026 Q2 | [Issuer results](https://group.softbank/en/event/earnings_2026q2); original minute UNKNOWN; conservative known-public-by 2026-11-10T19:05:20Z | R7 EARLY_WARNING LOW; project mapping unverified, not QUALIFIED |
| HIGH | `EVT-20261110-D3B018231628` — BLS October CPI | [BLS original](https://www.bls.gov/news.release/archives/cpi_11102026.htm); official 08:30 EST embargo, first-public minute not independently verified; conservative known-public-by 2026-11-10T19:05:20Z | MACRO_ONLY, no signed R3–R7 effect |
| CRITICAL | `EVT-20261110-5B07CE307DC3` — CoreWeave Q3 earnings | [SEC Exhibit 99.1](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000461/coreweave3q26earningspress.htm); original minute UNKNOWN, conservative late-discovery known-public-by 2026-11-10T22:52:43Z | R6 EARLY_WARNING IMPROVEMENT; no QUALIFIED event |

**PIT distinction:** CoreWeave was discovered after this report's original 21:34 UTC capture and after the US close. This ledger is an explicit subsequent reconciliation against the canonical registry, not a claim of contemporaneous live discovery. All three event IDs already exist in the registry and daily index; do not create duplicate events. CPI +0.4% headline m/m, +0.3% core m/m; October 2025 baseline remains unverified, so October 2026 YoY is UNKNOWN. CoreWeave reported $3.661bn revenue, $132.5bn backlog, >200MW incremental active power, $709m GAAP loss and $846m net interest; active power alone does not prove newly billable capacity.

### Unregistered secondary-source candidates — not part of canonical count

TSMC board authorization of up to $500m each for Anthropic/OpenAI ([Reuters](https://www.reuters.com/world/china/tsmc-invest-up-1-billion-anthropic-openai-2026-11-10/)) and Venture Global's prospective power-equipment agreements ([Reuters](https://www.reuters.com/business/energy/venture-global-raises-profit-forecast-expands-push-into-ai-data-center-power-2026-11-10/)) remain **UNVERIFIED CANDIDATES**, not registered HIGH events. Their original issuer releases, first-public bounds, priority, and causal novelty require separate verification before registration. Neither authorized investment nor future equipment constitutes realized R5/R6 effects.

## Markets and Asia

AP reports Nov 10 closing: S&P 500 **7,520.93 (−0.4%)**, Dow **52,231.89 (−0.3%)**, Nasdaq **25,065.87 (−0.7%)**: https://apnews.com/article/a97eb31c415811065561f2c2ac552cd7 . Reuters/FT report 10-year Treasury yield near/above 5% in response to CPI. South Korea KOSPI **+4.4%** (AP; same-day Asian session). Exact ETF closes **SMH/QQQ/SOXX/SPY UNKNOWN**: Massive grouped daily bars endpoint returned NOT_ENTITLED for the user's plan (https://massive.com/pricing); no substitute bars have been represented as Massive. Individual Asian semiconductor close timestamps and comprehensive cross-market reaction UNKNOWN. No causal attribution of all market movement to CPI is justified.

## Challenger v2.1 / Champion

Current canonical policy: Docs/AI_ROI_CHALLENGER_MODEL_v2.md + Docs/CHALLENGER_V2_EVENT_POLICY_V2_1.md, fixed cohort R1/R2/R4 (20:15:20), independent signed R3/R5/R6/R7, P1–P4 separate. CPI raises rate/discount and financing pressure (financial Champion F-layer), while TSMC's prospective investment and Venture Global equipment commitments support continued capital appetite; neither proves actual project unit economics or paid computing output. Technical F-layer: broad indices declined, ETF-specific technicals UNKNOWN. Institutional F-layer: TSMC authorization, but no verified completed cash investment. Fundamental F-layer: new power supply plans, no current commissioned paid MW. R1/R2/R4 no new validated fixed-cohort PIT capture; R3 no realized comparable compute cost; R5 no proven executed contractual/payment change; R6 no delivered billable MW; R7 no verified funded-project cancellation. P1–P4: announced prospective 11.5 GW is not delivered capacity. **No new production QUALIFIED** from this report; no recalculation triggered. Historical [46.36,53.64] is NOT today's score. **NO_CURRENT_V2_SCORE; LOW_COVERAGE; category=null; calibration=UNCALIBRATED; trading_signal=false; NO_TRADE.**

## Audit / persistence

Canonical index and registry reconciled for November 10: **3 HIGH/CRITICAL registered events**, matching all three IDs in this report. CoreWeave was registered by PR #193 and is explicitly a post-capture discovery. TSMC/Venture Global remain unverified secondary-source candidates and are excluded from the canonical count until original proof and registration. Report stays **PARTIAL** due to market/issuer-source coverage; no fresh Challenger score or trading signal is asserted. No historical Nov 9 duplication. The daily index may transition from PENDING_DAILY_REPORT to RECONCILED_TO_DAILY_LEDGER only with this report committed and validated.
