# Challenger v2.1 — two-event controlled dry-run, 2026-11-04

**Experiment status:** retrospective policy demonstration on prior October/November public data, **not** an operational or historically preregistered signal; **not** a PR #151 merge approval. Source facts individually checked against first-party SEC filings and issuer-distributed release. Only test fixtures are changed, **not** `data/research/events/challenger_v2_event_registry.json` and **not** `main`.

**Review/cutoff chosen for reproducible test:** 2026-11-04T06:30:00Z. Source basis: existing approved one-time Challenger v2 core snapshot (original as-of 2026-11-04T00:00:00Z), revalidated at this cutoff, rather than a newly collected core. Original core interval `[46.36, 53.64]`, incomplete R4/MSFT and R4/GOOGL retained, research only. Fixed cohort and weights unchanged.

## Evidence and corresponding factor

| Stable source event ID | Observable first-party fact | Current new-policy proposed disposition | Limitations |
|---|---|---|---|
| `EVT-20261027-1C51396E8F19` — Galaxy R6 | Helios I Phase I: cumulative 133 MW delivered by **end Q2**, Q3 first full leasing quarter. Data-center leasing revenue **$79.068m** for Q3, adjusted data-centers EBITDA **$69m Q3 vs $11m Q2** | **QUALIFIED in dry-run**, R6 `REVENUE_GENERATING_CAPACITY`, improvement, single verified change, `impact=-0.5` | No new delivered MW in Q3; 830 MW Helios II unleased; no tenant GPU occupancy or asset-level ROIC. Narrow observation is **billed capacity**, not finished profitable GPU use. |
| `EVT-20261102-6DFE079F76A6` — Anthropic R3 | SEC S-1/A consolidated compute and infrastructure expense/revenue **48% Q2 2026 → 58% Q3 2026**, +10 percentage points; Q3 approximately **$9.9bn** costs | **QUALIFIED in dry-run**, R3 `REALIZED_COMPUTE_COST_INTENSITY`, deterioration, single verified change, `impact=+0.5` | Not private project-level IRR; 2025 Q3 compute intensity was 148%, so substantial **year-on-year improvement**. Q3 included higher-cost short-term compute, mix/delivery timing may confound extrapolation. No realized R5 contract failure. |

Primary sources:
- Galaxy [SEC Exhibit 99.1](https://www.sec.gov/Archives/edgar/data/1859392/000185939226000108/glxy-20260930xpressrelease.htm) (Data Centers, GAAP data-center lease line) and [issuer-distributed PRNewswire release](https://www.prnewswire.com/news-releases/galaxy-announces-third-quarter-2026-financial-results-302920339.html) timestamped Oct 27, 2026 07:00 ET; exact first-public timestamp previously documented in registry.
- Anthropic [SEC S-1/A](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm) quarterly financial statement ratios, and [SEC filing receipt index](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/0001628280-26-068676-index.htm) accepted 2026-11-02 09:24:24 ET. The registry's conservative `known_public_by_at=2026-11-04T01:00:00Z` is *not* the claimed earliest dissemination minute; signed STATE uses documented known-public-by and proof URL.

## Deterministic v2 recalculation — as-of 2026-11-04T06:30:00Z

| Dry-run input | R3 delta | R5 delta | R6 delta | R7 delta | Total overlay | Final research interval |
|---|---:|---:|---:|---:|---:|---|
| Approved core only | +0.00 | 0.00 | 0.00 | 0.00 | 0.00 | **[46.36, 53.64]** |
| Galaxy only, R6 | 0.00 | 0.00 | **−2.00** | 0.00 | **−2.00** | **[44.36, 51.64]** |
| Anthropic only, R3 | **+2.00** | 0.00 | 0.00 | 0.00 | **+2.00** | **[48.36, 55.64]** |
| Both qualified | **+2.00** | 0.00 | **−2.00** | 0.00 | **0.00** | **[46.36, 53.64]** |

`+2` or `−2` reflects provisional 0.5 × factor cap 4, **not** an observed 2% change in bankruptcy probability or economic value. Net zero does **not** erase the two independently recorded opposite effects; a dashboard/weekly capture must display gross contributions and event IDs. Both signed items are `STATE` with explicit 2026-11-11T06:30:00Z review_by, not re-dated transient market shocks.

### Dedup, PIT and research integrity
- Galaxy's recorded *paid leasing* consequence is scoped to R6 and distinguished from CoreWeave R4 financing; does not assert customer GPU utilization.
- Anthropic is outside R1/R2/R4's approved **hyperscaler/neocloud issuer rosters**; cost-intensity comparison is a separate company-level metric. Its $895.4bn future commitments are **not** simultaneously scored as R5.
- Original registry remains append-only and unchanged; no review is committed as QUALIFIED. Real production qualification would require a new dated source-checked review by the owner, and the registrar would then generate durable recalculation artifacts through the usual PR and CI process.
- Source dates must precede chosen cutoff; today's policy adoption is not pretended to exist at 2026-10-27 / 2026-11-02 release times.
- `UNCALIBRATED`, `category=null`, `trading_signal=false`, `NO_TRADE`. Model mechanical pass does not validate signed coefficient's forecasting skill.

**Reproducible tests:** `tests/test_challenger_v2_two_real_events_dry_run.py` verifies Galaxy-only, Anthropic-only, both together, non-addition of R5, no registered-root duplication, without touching persistent event registry.
