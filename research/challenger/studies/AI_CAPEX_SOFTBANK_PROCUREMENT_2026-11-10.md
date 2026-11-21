# SoftBank Group — AI data-center power equipment procurement and reported losses (10 November 2026)

**Artifact:** dated research report / preserved Event Alert; not a development issue.  
**As-of:** 2026-11-10, Israel. **Verification:** PARTIAL — primary document URL could not be retrieved independently during this revision.  
**Research policy:** Challenger v2.1 / OBSERVABLE_EVENT_QUALIFICATION_V2_1. No trading authority.

## Executive summary

A user-facing alert on 10 November reported that SoftBank Group recognized ¥597.2bn (approximately $3.73bn) of losses associated with revising power-equipment procurement for US AI data-center development, including PORTS-Pike, Ohio. The alert attributed $2.85bn to non-refundable advances and $0.88bn to contract changes. **These are preserved claims from the original alert, not newly source-verified facts.** The distinction is essential before adding a production event to the canonical registry.

## Reported figures and economic interpretation

| Item | Previously reported | Verification |
|---|---:|---|
| Recognized loss | ¥597.2bn / ~$3.73bn | Pending original issuer statement |
| Non-refundable advances | ~$2.85bn | Pending original accounting note |
| Contract changes | ~$0.88bn | Pending original accounting note |
| Procurement payments through 30 September | ~$9.48bn | Pending issuer reconciliation |
| Potential future conditional discounts | Up to ~$2.1bn | Pending; not an already recognized asset |
| Additional October investment in OpenAI | ~$10bn | Counterevidence candidate; independently unverified here |
| Aggregate OpenAI investment | ~$64.6bn | Counterevidence candidate; independently unverified here |

Do not infer from a recognized procurement loss that the underlying funded data center was cancelled. The specific contractual status and economic effects require direct issuer confirmation.

## Source register and point-in-time evidence

1. **Primary source claimed:** SoftBank Group consolidated financial report, FY2026 Q2: https://group.softbank/media/Project/sbg/sbg/pdf/ir/financials/financial_reports/financial-report_q2fy2026_01_en.pdf . This URL was not accessible through the available retrieval methods in this review. Original text, accounting footnote and figures remain **UNVERIFIED**.
2. **Secondary report claimed:** Reuters, Nov 10: https://www.reuters.com/world/asia-pacific/softbank-swings-7-billion-net-loss-second-quarter-2026-11-10/ . Not independently retrieved here.
3. **Publication PIT:** Original alert cited scheduled 15:30 JST, but scheduled time is **not** evidence of actual publication. Exact first_public_at UNKNOWN; independently documented known_public_by_at UNKNOWN. The time the alert was sent is not substituted for original public availability.
4. **Market:** Prior alert reported a ~13.9% SoftBank move before the release. No independently verified post-release quote with provider, timestamp and session classification. Do not attribute pre-release movement to this event.
5. **Consensus surprise:** Prior alert cited a roughly $7bn quarterly loss against forecasts; not independently verified. Period and comparison basis remain UNKNOWN.

## Challenger v2.1 assessment, bounded at this cutoff

| Dimension | Assessment | Why |
|---|---|---|
| News priority | HIGH/CRITICAL **candidate**, not production-confirmed | Primary document not independently verified |
| R5 | Potential executed payment/amendment, **PENDING_SOURCE_VERIFICATION** | Verify comparable executed contractual economic change, payment accounting, direction and causal dedup |
| R7 | Potential warning, **not QUALIFIED** | No proved funded-project economic defer/cancel/restart |
| R3 | No signed change | No verified like-for-like realized compute cost/yield |
| R6 | No signed change | No verified billable delivered capacity or paid interruption |
| R1/R2/R4 | No new approved core observation | Frozen issuer cohort and PIT rules unchanged |
| P1–P4 | Energy equipment context only | No independently measured physical outcome |
| F1–F5 | Capital-allocation risk hypothesis | Champion unchanged |

**Counterevidence:** SoftBank's continued AI investments (as reported in the prior alert) may counter an inference of broad withdrawal from AI CapEx, but the amounts and timing require source validation. Procurement strategy changes may also reflect reallocation or substitution rather than cancellation of committed capacity.

**Decision:** SOURCE_VERIFICATION_PENDING. This is a *research documentation status*, not a registrar decision and not an append-only production assessment. No canonical event_key or EVT ID is asserted; no new QUALIFIED event or recalculation JSON exists from this report. No synthetic v2 score; category=null, calibration=UNCALIBRATED, trading_signal=false, NO_TRADE.

## Reproducibility and remaining gates

- Obtain the original issuer filing, verify exact period, figures, executed amendments, counterparty and dated availability evidence.
- Check for a matching existing economic occurrence in `data/research/events/challenger_v2_event_registry.json` and the Nov 10 Daily Close before registering. Use the canonical registrar, never manually invent an EVT ID.
- Under v2.1 perform one bounded primary comparable-fact check and at most one independent contradiction check. Assign final QUALIFIED / EARLY_WARNING / NOT_QUALIFIED_CLOSED only with valid evidence, signed effect and PIT.
- A QUALIFIED transition must generate an immutable Challenger v2 recalculation JSON through `--assess`, with exact-head CI and authorized reviewer PASS before merge.
- No changes to trading, existing schedules, Champion or old historical scores.

**Editorial correction:** The earlier alert stated the amounts as confirmed, but this revision cannot independently substantiate them. They remain explicitly attributed, pending source verification, rather than silently discarded or falsely promoted to canonical facts.
