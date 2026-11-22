# AI CapEx — consolidated event watch and baseline (2026-10-17)

**Status:** planning / research-only; calendar horizon 2026-10-19 through 2026-11-17. This is a prospective event-monitoring plan, **not** a new canonical Champion score or replacement for the 2026-10-14 weekly capture. Event timestamps must be revalidated immediately before release; conjectural earnings dates MUST NOT trigger a false report.

## Research baseline
Reference: [Weekly Watch 14 October](AI_CAPEX_WEEKLY_WATCH_2026-10-14.md) — partial research only. Champion fresh canonical state UNKNOWN, trade state NO_TRADE, combined score null. Challenger score 60/ALERT/Stage 5, P1–P4 WATCH/ANTI_REVERSAL/ANTI_REVERSAL/WATCH. Financial/funding selectivity risk worsened, while broad physical AI capacity reversal remains unconfirmed. Distinguish Asia-led price weakness from demonstrated Asia→US causal trigger.

Provider-specific Massive **previous daily session bar** sampled 2026-10-17: SMH close 539.79, QQQ close 709.80, NVDA close 214.13, MU close 878.84 (USD; returned ET epoch 1792180800000 = 2026-10-16 00:00 ET bar label; previous-bar close). These are snapshot reference points, not confirmed technical signal triggers or target prices; re-query with timestamp before each report.

## High/critical event calendar

| Date (US ET) | Event | Priority | Verification | Primary source / check | Thesis channel |
|---|---|---|---|---|---|
| Oct 19–23 | TSMC/Samsung/other Asia supplier reporting and regional market weakness watch | HIGH conditional | Release-date not yet certified | TSMC / Samsung IR & exchanges | P1–P4, physical evidence; FX |
| Oct 20–23 | Meta Q3, semiconductor equipment (LRCX/TXN), Tesla | HIGH | Precise per-company slot pending IR confirmation | issuer IR | Meta CapEx; bookings/equipment |
| Oct 27–28 | FOMC meeting; **Oct 28 14:00 ET** decision, **14:30 ET** press conference | CRITICAL | CONFIRMED | https://www.federalreserve.gov/newsevents/calendar.htm | yields, financing, risk premia |
| Oct 28 | Microsoft FY27 Q1 earnings **after US close** | CRITICAL | CONFIRMED | https://www.microsoft.com/en-us/investor/events/fy-2027/earnings-fy-2027-q1 | AI CapEx vs Azure / FCF |
| Oct 28 | Alphabet earnings (reported date) | CRITICAL | SECONDARY / recheck IR | https://abc.xyz/investor/ | Cloud TPU, CapEx/FCF |
| Oct 29 | Amazon, Apple results (indicative dates) | CRITICAL | TENTATIVE / recheck IR | https://ir.aboutamazon.com/ ; https://investor.apple.com/ | AWS, demand, CapEx/FCF |
| Nov 3 | US Congressional midterm election; outcomes over evening / subsequent days | CRITICAL | CONFIRMED calendar date | https://www.fec.gov/ | tariff/export/regulatory uncertainty |
| Nov 3 **10:00 ET** | JOLTS September | HIGH | CONFIRMED | https://www.bls.gov/schedule/2026/11_sched_list.htm | jobs / yields |
| Nov 4–6 | AMD Q3 and other AI infrastructure earnings | HIGH | TENTATIVE | https://ir.amd.com/ | GPU orders, demand |
| Nov 6 **08:30 ET** | Employment Situation October (NFP) | CRITICAL | CONFIRMED | https://www.bls.gov/schedule/2026/11_sched_list.htm | yields, Fed |
| Nov 10 **08:30 ET** | CPI October | CRITICAL | CONFIRMED | https://www.bls.gov/schedule/2026/11_sched_list.htm | valuations, Fed |
| Nov 13 **08:30 ET** | PPI October | HIGH | CONFIRMED | https://www.bls.gov/schedule/2026/11_sched_list.htm | input inflation |
| Nov 17 **08:30 ET** | Import/export price indices October | HIGH | CONFIRMED | https://www.bls.gov/schedule/2026/11_sched_list.htm | tariff/input pressures |
| Nov 18 (outside window) | October FOMC minutes | HIGH | CONFIRMED | https://www.federalreserve.gov/monetarypolicy.htm | next checkpoint |

**Watch-list continuing without fake dates:** NVDA (later November), MU/AVGO/ORCL (typically later), CRWV, AMD, hyperscalers MSFT/GOOGL/AMZN/META/AAPL; Asia TSMC, SK hynix, Samsung, Tokyo Electron, Advantest, Disco, Lasertec, MediaTek and Hon Hai. Poll their **official investor calendars** before setting any event alert. Do not label an uncertain date confirmed.

## Flexible reporting contract

1. **Hourly event watch, maximum possible polling frequency**, Asia/Jerusalem time, for qualifying HIGH or CRITICAL sources. For each actually released event create a brief self-contained analysis, ideally within an hour (best effort: hourly polling cannot guarantee 60-minute latency). Publish one brief per **distinct source event**, including same-day events, and cite original announcement and publish timestamp. If not confirmed released, DO NOT alert.
2. **One US post-close consolidated market-day report** each Monday–Friday at 23:30 Asia/Jerusalem (17-Oct DST assumptions reviewed each run) **only if at least one HIGH/CRITICAL event has been published that date**. Aggregate event briefs, after-hours earnings observed by cutoff, sector and cross-asset response, Champion/Challenger/physical/macro observations and explicit data gaps. If a scheduled company release occurs after cutoff, include its event brief then, roll reaction to next trading session, no invented closing reaction.
3. **Wednesday fallback:** if no material event actually published Wednesday and there is sufficient new evidence, publish **one weekly report** from the consolidated end-of-day task instead. If any HIGH/CRITICAL event published Wednesday, the consolidated report substitutes for the independent weekly; do not send both. Wednesday weekly baseline should still respect full coverage and completeness manifest; never make up a canonical score.
4. **Dedup key:** source event ID = issuer/agency + announcement permalink + publication timestamp + event type (or deterministic identifier for scheduled statistic), global across short/daily/weekly. Dedup by verified previously published message/report/ledger where accessible; if storage unavailable, clearly state duplicate uncertainty rather than promise strict once-only delivery.
5. **Local cutoffs:** US closing 16:00 America/New_York; 23:30 Asia/Jerusalem covers New York regular close across October–November DST shifts, but corporate announcements after 23:30 Israel will not be in that report. US holidays and early closings require market-calendar adjustment. Economic releases should use official **ET** schedules converted at runtime; never assume fixed UTC offset.
6. **Per-report checklist:** source timestamp and availability; surprise vs consensus where attributable; original transcript/10-Q; price move versus SMH/QQQ/SPY and Asia close with no invented cause; financing/capacity/ROI/memory/GPU interpretations; F1–F5/R1–R7/P1–P4 signal impact and contrary evidence; QUALITY/PARTIAL/UNKNOWN; implications with NO_TRADE default when canonical unavailable. Research only; no trading/execution changes.
7. **Failure states:** SOURCE_NOT_YET_PUBLISHED, COLLECTION_FAILED, PERSISTENCE_FAILED, PARTIAL, NO_MATERIAL_EVENT. Failures on significant releases must be surfaced rather than silently suppressed. GitHub persistence requires connector write permissions; automation runtime access to that connector is not guaranteed.
8. **Notification caveat:** ChatGPT task delivery/notifications may be disabled independently. Validate successful publication and delivery with a dry-run, not just a registered scheduled run. Scheduled polling is not a true push-driven release webhook and strict <60-minute SLA cannot be guaranteed.

## Sources
- https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm
- https://www.federalreserve.gov/newsevents/calendar.htm
- https://www.bls.gov/schedule/2026/11_sched_list.htm
- https://www.microsoft.com/en-us/investor/faq
- https://abc.xyz/investor/
- https://investor.atmeta.com/
- https://ir.aboutamazon.com/
- https://ir.amd.com/
- https://investor.nvidia.com/
- https://investors.micron.com/
- https://investors.coreweave.com/

**Governance:** proposal tied to issue #78; research-only, preserve weekly capture schema and no automatic trade or model modifications.
