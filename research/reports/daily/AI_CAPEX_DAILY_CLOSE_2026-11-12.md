# AI CapEx Daily Close — 2026-11-12 (DRAFT, AUDIT CHANGES_REQUIRED)

## Event ledger — retrospective registry reconciliation (14 November)

This ledger is an append-only reconciliation of events independently registered in source-alert PRs. It is NOT a claim that all items were known by the original Daily Close cutoff. Original cutoff and partial-market-coverage caveats remain unchanged. The original narrative below is preserved as a contemporaneous research snapshot.

| Priority | Event / source provenance |
|---|---|
| CRITICAL | NVIDIA — leadership transition; original issuer timestamp not verified; CONTEXT_ONLY |
| CRITICAL | Nebius — Q3 2026 results and third-party capacity-delay guidance; CONTEXT_ONLY |
| HIGH | Applied Materials — FY2026 Q4 results after close; CONTEXT_ONLY |
| HIGH | Cerebras — Q3 2026 results and contracted capacity; EARLY_WARNING |
| HIGH | Cisco — FY2027 Q1 earnings and hyperscaler AI revenue outlook; CONTEXT_ONLY |


**Cutoff:** 2026-11-12 16:33 EST (21:33 UTC), after regular NYSE/Nasdaq 16:00 close. **NO_TRADE**. This is a contemporaneous partial collection, not a complete registered event ledger. Issue #206. No weekly manifest required for this Thursday Daily Close.

## Material events and PIT

1. **CRITICAL, NVIDIA leadership change:** Reuters and Financial Times reported Jensen Huang resigned on Nov 12; interim CEO CFO Colette Kress. NVIDIA declined sharply intraday and partially recovered. Secondary references: https://www.reuters.com/business/nasdaq-futures-fall-nvidia-turmoil-rattles-ai-stocks-2026-11-12/ and https://www.ft.com/content/a93307a7-e2cd-4abd-bd89-c38832d8c40e . **PRIMARY NVIDIA Nov 12 board announcement not yet located; first_public_at UNKNOWN, known_public_by_at not established by an immutable timestamp. REGISTRATION_PENDING.** Nov 8 board investigation is *carryover*, not a new Nov 12 event: https://investor.nvidia.com/news/press-release-details/2026/Statement-from-NVIDIA-Board-of-Directors/default.aspx . Treat allegations as unproven; do not turn them into economic loss.
2. **HIGH, Applied Materials Q4 FY26:** issuer release dated Nov 12: https://ir.appliedmaterials.com/node/29886/pdf . Revenue $10.409bn (+53% y/y); non-GAAP EPS $4.16 (+92% y/y); operating cash flow $3.30bn; quarterly FCF reported ~$2.6bn. Original exact publication minute UNKNOWN. Earnings call scheduled 16:30 EST, **after regular close**: https://ir.appliedmaterials.com/events/event-details/q4-2026-applied-materials-earnings-conference-call . Cannot attribute 16:00 close to release. Consensus as-of UNKNOWN; no surprise calculated. REGISTRATION_PENDING.
3. **Cisco Q1 FY27:** issuer earnings event scheduled Nov 12: https://investor.cisco.com/events-and-presentations/ . Actual 2026 results not independently extracted by cutoff; **PENDING, not a verified HIGH**. Do not substitute the Nov 12 **2025** Cisco Q1 release.
4. **Friday PPI** is forward calendar, not a Nov 12 release.

## Markets (regular session)

Reuters Nov 12 closing report: S&P 500 -0.34%, Nasdaq -0.40%, Dow -0.36%. Source: https://www.reuters.com/business/nasdaq-futures-fall-nvidia-turmoil-rattles-ai-stocks-2026-11-12/ . AP confirms rounded -0.4% and closing levels S&P 7592.40, Nasdaq 25366.09, Dow 52297.09: https://apnews.com/article/3f3668a937a11535103e3a5c8d82c9fc . NVDA intraday drawdown nearly 12-14% from secondary sources; **do not label intraday low as closing return**. Other AI chip vendors recovered, while some infrastructure/AI cloud shares fell. No defensible direct event-to-return causal decomposition.

Massive direct daily bars requested for SMH, QQQ, SOXX, SPY, NVDA on 2026-11-11..12, but response contained **only Nov 11** bars with t=1794373200000 (Unix milliseconds), close: SMH 506.96, QQQ 690.38, SOXX 155.40, SPY 759.81, NVDA 173.73. AMAT request hit RATE_LIMIT. **Nov 12 ETF close UNKNOWN; market coverage PARTIAL**, no fabricated ETF changes. Asia semiconductor timestamped comparable close UNKNOWN.

## Model mapping / competing evidence

- **Champion F1–F5:** F technical: volatile NVIDIA-led risk and modest index decline; F fundamental: strong AMAT vendor sales support equipment demand; F financial: valuation/financing and NVIDIA ecosystem concentration risk, no verified new contract loss; F institutional: retail NVDA dip buying reported by Reuters but no complete flow data; other layers UNKNOWN.
- **Challenger R1/R2/R4:** no new fixed-cohort PIT snapshot; keep UNKNOWN/STALE and R4 coverage requirements. No synthetic numeric calculation.
- **R3:** AMAT sales are vendor revenue, not end-customer realized compute unit economics. No QUALIFIED.
- **R5:** management disruption is not an executed payment amendment or default. No QUALIFIED.
- **R6:** no newly measured billable capacity change. No QUALIFIED.
- **R7:** no evidenced funded-site cancellation. No QUALIFIED.
- **P1–P4:** insufficient comparable physical dataset; separate from scored factors.

Countercase: continued equipment revenue and positive vendor cash flow argue against assuming all AI CapEx has already reversed. Conversely, high dependence on a central chip supplier and volatile financing exposures increase fragility. Neither argument alone proves actual CapEx contraction.

## Registry and audit

**REGISTRATION_PENDING / INDEX NOT RECONCILED**: no canonical registrar-generated EVT IDs for NVIDIA or AMAT in this branch. Do not mark COMPLETE. No production QUALIFIED and no trigger for frozen-core v2 recalculation. Prior event records must remain append-only; no double registration of Nov 8 investigation. Event source times and independent corroboration must be established before registry writes. Content audit **CHANGES_REQUIRED**: NVIDIA issuer original and PIT missing; AMAT precise publication time and consensus missing; Cisco actual results unverified; ETF/Asia quotes missing; registry/index not reconciled; exact-head CI and reviewer PASS pending. **NO_CURRENT_V2_SCORE / LOW_COVERAGE / calibration=UNCALIBRATED / category=null / trading_signal=false / NO_TRADE**. Historical [46.36,53.64] is not a new score.
