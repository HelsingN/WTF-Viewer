# Challenger v2.1 — bounded evidence replay, 10 November 2026

**Type:** New dated research assessment, not a development issue.  
**As-of:** 2026-11-10 (repository-evidence review; exact market-close cutoff NOT established).  
**Status:** PARTIAL_EVIDENCE_REPLAY / NO_CURRENT_V2_SCORE / UNCALIBRATED / NO_TRADE.  
**Important:** The existing Python evaluator was **not executed** in this GitHub-only session. This is an independently recomputed *arithmetic replay* of the last persisted, reproducible v2.1 inputs, **not a new current point-in-time certified model run**.

## Inputs actually inspected in main

- Core full-roster calculation: `data/research/challenger/challenger_v2_recalculation_summary_2026-11-04.yaml` and `Docs/research/CHALLENGER_V2_FULL_RECALCULATION_2026-11-04.md`.
- Last immutable event-triggered evaluation: `data/research/events/recalculations/EVT-20261102-6DFE079F76A6_20261104T072101Z_9287efcb.json`.
- Current canonical registry: `data/research/events/challenger_v2_event_registry.json` (31 event IDs; latest event_date Nov 4, no Nov 5–10 registrations in inspected main).
- Current daily index: `data/research/events/daily_high_critical_index.json`.
- Nov 4 Daily Close: `Docs/research/AI_CAPEX_DAILY_CLOSE_2026-11-04.md`.
- SoftBank Nov 10 research: `Docs/research/AI_CAPEX_SOFTBANK_PROCUREMENT_2026-11-10.md`; **source unverified**, not registered as QUALIFIED.

**Missing input:** no Nov 9/10 Daily Close found at `Docs/research/AI_CAPEX_DAILY_CLOSE_2026-11-09.md` or `...2026-11-10.md` in main. The daily automations may have produced messages elsewhere, but they have not been reconciled as canonical model inputs. Absence of a file is **not evidence of no economic events**.

## Bounded replay of last accepted evidence

Fixed core weights R1:R2:R4 = 20:15:20; fixed issuer cohorts unchanged. Recovered inputs are research candidates, not refreshed to Nov 10.

| Factor | Dated observed levels | Contribution |
|---|---|---|
| R1 | five platforms = 1 each | 18.18 |
| R2 | five platforms = 1 each | 13.64 |
| R4 | 5 of 7 = 1, MSFT and GOOGL UNKNOWN | [14.55,21.82] |
| **Core** | 92.73% weighted source coverage in historical Nov 4 run | **[46.36,53.64]** |
| R3 | Anthropic Nov 2, QUALIFIED deterioration +0.5 | **+2.00** |
| R5 | No persisted QUALIFIED effect | 0.00 |
| R6 | Galaxy Oct 27, QUALIFIED improvement −0.5 | **−2.00** |
| R7 | No persisted QUALIFIED effect | 0.00 |
| **Net overlay** | +2.00 − 2.00 | **0.00** |
| **Evidence-replay interval** | historical core plus persisted event overlay | **[46.36,53.64]** |

Arithmetic uses the documented formula `100*(20*R1+15*R2+20*R4)/(2*55)`; R4 bounds [0.8,1.2]. Precision is two decimals as in the immutable Nov 4 result. No midpoint is asserted. This is the last *reproducible observed-input interval*, not a new verified current risk reading.

## New observations, bounded eligibility

- **Nov 4:** four events in Daily Close were assessed MACRO_ONLY or CONTEXT_ONLY; none newly QUALIFIED; no event-triggered recalculation from them.
- **Nov 5–10:** registry has no registered economic events for these dates. The missing Daily Close material prevents completeness certification. Do not infer a zero economic effect from missing coverage.
- **Nov 10 SoftBank:** reported procurement losses and advances could potentially qualify under R5 if actual implemented/enforceable changes and dated public facts are independently verified. The existing research document explicitly marks figures and source PIT unverified. Thus **no signed R5 adjustment** can be applied here.
- **Existing QUALIFIED:** Anthropic R3 +2 and Galaxy R6 −2 remain in the latest saved immutable calculation. Do not accidentally omit them because the Nov 4 *core-only* summary shows zero event overlay.

## Final decision

`historical_replay_interval=[46.36,53.64]`  
`current_verified_interval=null`  
`final_exact_score=null`  
`category=null`  
`calibration=UNCALIBRATED`  
`trading_signal=false`  
`status=NO_CURRENT_V2_SCORE`

**Reason:** no current complete and PIT-verified Nov 10 core+events snapshot; no newly executed v2 evaluator run. Core source records may remain within their original Nov 17 validity windows, but this does not prove that all new Nov 5–10 economic outcomes were captured.

**Completion gate for an actual current recalculation:** reconcile Daily Close Nov 5, 6, 9 and 10, register independently confirmed eligible economic events with original public-by timestamps, run `scripts/research/challenger_v2_event_register.py --assess` for any newly QUALIFIED event (or a dated complete v2 evaluator snapshot), save immutable output JSON, check exact-head CI and reviewer PASS, then merge. Do not edit the Nov 4 historical files or fabricate new numerical inputs.
