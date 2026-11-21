# AI CapEx — complete 38-event routing and relative-strength audit (2026-11-11)

**Research note / not a new Daily Close or Weekly Watch.** Registry snapshot: `6101a36bab3657fd0fcfc1cb8be06e17f36e938d`; fixed as-of: 2026-11-11, evidence cutoff the 2026-11-11 weekly capture (06:17:14 UTC). Five selected primary-source pages were spot-checked directly (listed below); this is primarily a **record-based consistency and materiality-evidence audit**, not independent re-verification of every original claim. The 38 historical event entries and their reviews remain unchanged.

## Decision

- **38/38** unique registry IDs present; all have at least one final review; **2 QUALIFIED, 3 EARLY_WARNING, 8 CORE_ONLY, 9 PHYSICAL_ONLY, 12 MACRO_ONLY, 4 CONTEXT_ONLY**.
- **32/38** have only one review; one review can be a substantive assessment, but registry text alone does not prove full independent source verification. `review_count` is a coverage indicator, not a failure verdict.
- **6/38** explicitly route to R3/R5/R6/R7 (2 QUALIFIED, 3 EARLY_WARNING, 1 CONTEXT_ONLY). Other 32: 7 R4, 2 R2, 1 R1, 9 PHYSICAL, 8 MACRO, 1 CONTEXT, 4 without factor.
- **5 routing-data quality flags**: four latest reviews have no `factor` (ADP, election, ISM Services, Arm); JOLTS says `factor=R4` while `decision=MACRO_ONLY`. These are *documentation mismatches*, not evidence for an additional signed R3/R5/R6/R7 effect.
- Current v2.1 **QUALIFIED decisions are retained** (Galaxy R6 improvement; Anthropic R3 deterioration). Three EARLY_WARNING decisions retain their finite source-reopen triggers. None is silently promoted or rescored. Review-by for the two signed STATE events occurs 2026-11-11 07:21 UTC, **after** weekly cutoff but before later research as-of; any new present-time score must re-check freshness rather than carry the weekly value.
- Cross-factor **economic materiality remains UNKNOWN** for all 38 as a comparable monetary-size ranking: heterogeneous MW, unit cost ratios, debt, supplier revenue, payrolls and stock movements cannot be pooled into one quantity without admissible denominators.

## Selected primary-source cross-checks (5 of 38)

This targeted verification checks only the five event records closest to signed or potential R3/R6/R7 effects, not all 38 issuers. Source publication chronology was **not independently re-established** beyond the saved PIT proofs.

| Event | Checked official source | Independent outcome check |
|---|---|---|
| Galaxy R6 QUALIFIED | [SEC issuer Exhibit 99.1](https://www.sec.gov/Archives/edgar/data/1859392/000185939226000108/glxy-20260930xpressrelease.htm) | Confirms 133 MW revenue-generating load **unchanged Q2→Q3**; $79.068m quarterly data-center lease income; segment EBITDA $69m vs $11m Q2. No verified incremental deployed MW this quarter. |
| Anthropic R3 QUALIFIED | [SEC S-1/A](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm) | Direct ratio table shows compute/infrastructure expense as percent of revenue **48% Q2 → 58% Q3 2026**, but **148% Q3 2025**, a substantial contrary historical improvement. |
| TeraWulf R6 EARLY_WARNING | [Issuer 6-Nov release](https://investors.terawulf.com/news-events/press-releases/detail/149/terawulf-reports-third-quarter-2026-results) | $63m HPC lease revenue and 102 MW operational IT capacity confirmed. Prior comparable billable-MW baseline still unproven by this limited check. |
| CoreWeave R6 EARLY_WARNING | [SEC issuer Exhibit 99.1](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000461/coreweave3q26earningspress.htm) | >200 MW additional **active power**, >1.7GW active total; $3.661bn revenue and $846m net interest expense. Active MW still are not proof of independently new paid MW. |
| SoftBank R7 EARLY_WARNING | [Issuer quarterly-earnings page](https://group.softbank/en/event/earnings_2026q2) | Earnings page exists; **does not itself substantiate** a specific funded AI-project cancellation or realized impairment size. No promotion to signed R7. |

These checks support retaining the **existing** qualified/warning dispositions at the selected evidence cutoff. They do not establish independent double-count testing across every historical source, or new eligibility after an expired `review_by`.

## Separate macro track — 12 events and joint effect

**Macro observations are not directly comparable with corporate R1–R7 events, paid-MW events, supplier economics or the single-event signed Challenger delta.** The older 38-row evidence-link index below is retained as an auditable all-ID inventory, but its macro `relative_rank` is **not** an economically meaningful rank relative to issuer events. **For macro comparisons, the authoritative independent ranking is [12-event macro analysis](AI_CAPEX_MACRO_EVENT_COMPARISON_2026-11-11.md)** and `data/research/events/macro_event_comparison_2026-11-11.json`.

In that track, each `MACRO_ONLY` event receives a fresh **within-macro** transparent score based on rates/credit transmission, observed comparable change or pre-release surprise, incremental information relative to previous macro releases, and source quality. Events are not added as independent shocks: PCE/CPI, ADP/JOLTS/NFP and ISM/GDP share causal channels. The **collective potential effect** of the 12 observations is `MIXED_FINANCING_HEADWIND_WITH_DEMAND_RESILIENCE`: borrowing-rate pressure versus broad real-demand resilience, with disinflationary productivity as an offset. Actual AI-specific cash-flow and cancellation effects are **NOT_IDENTIFIABLE**, not zero.

The separate weekly Macro Pain M1–M4 score remains **[18,62]** (wide uncertainty, not re-run); it already includes overlapping rate/price/credit inputs and cannot be summed with event indices or assigned to Challenger as a new QUALIFIED event.

## Strength ranking: what it does and does not mean

`relative_signal_index` (0–27) orders **strength of evidence linking an event to AI CapEx economics**, rather than size of dollars lost, modeled market impact or QUALIFIED status. Four explicit human-reviewed components: directness (0–3), realized economic evidence (0–3), quantifiability within scope (0–2), signed independence (0 or 2). Formula: **4×directness + 3×realized_evidence + 2×quantifiability + signed_independence**. Tie ranks use competition ranking over all 38 registered events. The weights are **research triage heuristics, not calibrated predictors**, and are prohibited from entering Challenger's numeric scoring. `UNKNOWN_NOT_NORMALIZED` never means an event has zero economic size. Tier A >=24, B >=18, C >=10, D <10. A CORE_ONLY source can rank strongly on disclosure/economic relevance yet **must not count as an extra signed-event delta**.

This ranking is cross-factor *signal quality*, **not cross-factor economic force**; a defensible monetary force ranking requires comparable issuer/project denominators and issuer-weighted transmission links. Within-factor quantitative examples (from saved reviews): Galaxy R6 paid 133MW / $79.068m Q3 lease income; Anthropic R3 compute expense intensity 48%→58% Q/Q. They are not made commensurate by the rubric.

## Full comparative ranking

| Rank (ties) | Score / tier | Date | Event | Route / decision | Direction | Audit flag |
|---:|---:|---|---|---|---|---|
| 1 | 27 / A | 10-27 | Galaxy Digital / CoreWeave — 133 MW revenue-generating delivered IT load and segment EBITDA (`EVT-20261027-1C51396E8F19`) | R6 / QUALIFIED | IMPROVEMENT | SIGNED_REVIEW_BY_CHECK |
| 1 | 27 / A | 11-02 | Anthropic — SEC S-1/A compute economics and future commitments (`EVT-20261102-6DFE079F76A6`) | R3 / QUALIFIED | DETERIORATION | SIGNED_REVIEW_BY_CHECK |
| 3 | 25 / A | 10-28 | Microsoft — FY27Q1 earnings and Azure growth (`EVT-20261028-1A2A9654B98C`) | R1 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 3 | 25 / A | 10-28 | Alphabet — Q3 earnings Cloud and CapEx cash-flow gap (`EVT-20261028-2CD983B9205C`) | R2 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 3 | 25 / A | 10-29 | Amazon — Q3 AWS growth and negative cash PPE FCF proxy (`EVT-20261029-0265FD8103A5`) | R2 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 6 | 20 / B | 11-06 | TeraWulf Inc. — Q3 2026: $63m HPC leasing revenue and 102MW revenue-generating Lake Mariner capacity (`EVT-20261106-4821AD973FCB`) | R6 / EARLY_WARNING | IMPROVEMENT | NEW_PRIMARY_FOR_PROMOTION |
| 6 | 20 / B | 11-10 | CoreWeave Inc. — Q3 2026 results: $3.661bn revenue, 200MW+ additional active power, financing costs (`EVT-20261110-5B07CE307DC3`) | R6 / EARLY_WARNING | IMPROVEMENT | NEW_PRIMARY_FOR_PROMOTION |
| 8 | 16 / C | 10-29 | Microsoft — Senior notes offering (`EVT-20261029-E6D43C7AB9FB`) | R4 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 8 | 16 / C | 11-02 | Oracle — Debt and equity financing pricing (`EVT-20261102-470CF3B26AEB`) | R4 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 8 | 16 / C | 11-02 | Alphabet — EUR bond issuance and strong order book (`EVT-20261102-F3412A927717`) | R4 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 11 | 14 / C | 10-30 | Meta / S&P Global — S&P negative credit outlook for Meta (`EVT-20261030-12BB151B63C3`) | R4 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-27 | Corning — Optical networking revenue and AI orders (`EVT-20261027-CBFCDAC5D4BA`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-28 | GE Vernova — Power equipment growth and project pipeline (`EVT-20261028-2E0677183D70`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-28 | Amphenol — Q3 communication infrastructure growth (`EVT-20261028-7A2314216CBC`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-28 | KLA — Q1 FY27 semiconductor equipment results (`EVT-20261028-90CD64BCCC19`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-28 | Vertiv — Q3 supplier orders and free cash flow (`EVT-20261028-BB024372A0E3`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-29 | STMicroelectronics — Q3 chip manufacturing results (`EVT-20261029-5708B81ECA7D`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-29 | Intel — Q3 DCAI strength and weaker Q4 revenue guidance (`EVT-20261029-AD65F9A50BB5`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 10-30 | Intel — Intel five-year CDS widening (`EVT-20261030-6FCBD43088D8`) | R4 / CONTEXT_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 11-02 | Palantir — Q3 AI software revenue beat (`EVT-20261102-3494488216EC`) | R3 / CONTEXT_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 12 | 12 / C | 11-04 | Arm Holdings — Arm fiscal 2027 Q2 issuer results published Nov 4 after close (`EVT-20261104-FBF1ADCE4DE8`) | UNSET / CONTEXT_ONLY | UNDETERMINED | FACTOR_UNSET |
| 22 | 11 / C | 10-27 | NVIDIA / Meta — Supplier equity participation and AI deployment partnership (`EVT-20261027-696CA8EB6128`) | R4 / CORE_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 23 | 10 / C | 10-30 | US semiconductor market — Broad AI semiconductors repricing (`EVT-20261030-141B0E39EB0B`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 23 | 10 / C | 11-05 | US listed semiconductor sector / Nasdaq — Nov 5 AI semiconductor equity drawdown: SOX -12%, Nasdaq -5.52% (`EVT-20261105-D4225EF30E14`) | CONTEXT / CONTEXT_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 25 | 8 / D | 11-10 | SoftBank Group Corp. — SoftBank FY2026 Q2 earnings publication; AI infrastructure economics subject to source verification (`EVT-20261110-8A35ECE41917`) | R7 / EARLY_WARNING | DETERIORATION | NEW_PRIMARY_FOR_PROMOTION |
| 26 | 7 / D | 11-02 | Marvell / Lumentum — Optical infrastructure all-stock merger (`EVT-20261102-691158BC3105`) | PHYSICAL / PHYSICAL_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 10-27 | US Census — September durable goods release (`EVT-20261027-8B285369BF04`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 10-28 | US Federal Reserve — October FOMC hold (`EVT-20261028-23996215D697`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 10-29 | US BEA — Q3 GDP advance (`EVT-20261029-6022D9525B63`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 10-29 | US BEA — September PCE/inflation (`EVT-20261029-C5D91EE82978`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 11-02 | Institute for Supply Management — October manufacturing PMI (`EVT-20261102-B5D7531BA811`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 11-03 | US Bureau of Labor Statistics — September 2026 JOLTS release (`EVT-20261103-01AFF3D32721`) | R4 / MACRO_ONLY | UNDETERMINED | FACTOR_DECISION_MISMATCH |
| 27 | 6 / D | 11-04 | ADP Research — October 2026 ADP US private employment report (`EVT-20261104-01B78A7859FE`) | UNSET / MACRO_ONLY | UNDETERMINED | FACTOR_UNSET |
| 27 | 6 / D | 11-04 | Institute for Supply Management — October 2026 US ISM Services PMI official release (`EVT-20261104-1DD90E723871`) | UNSET / MACRO_ONLY | UNDETERMINED | FACTOR_UNSET |
| 27 | 6 / D | 11-05 | US Bureau of Labor Statistics — 2026 Q3 preliminary nonfarm productivity +3.6%, unit labor costs -0.7% (`EVT-20261105-8FE101712C8E`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 11-06 | U.S. Bureau of Labor Statistics — October 2026 Employment Situation: +165k payrolls, 4.1% unemployment (`EVT-20261106-E44CA00A9292`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 27 | 6 / D | 11-10 | U.S. Bureau of Labor Statistics — October 2026 CPI: headline +0.4% m/m, core +0.3% m/m (`EVT-20261110-D3B018231628`) | MACRO / MACRO_ONLY | UNDETERMINED | SINGLE_PASS_REASON_ONLY |
| 38 | 3 / D | 11-04 | US midterm congressional control — Nov 4 provisional congressional-control election outcome (`EVT-20261104-0A094097F23D`) | UNSET / MACRO_ONLY | UNDETERMINED | FACTOR_UNSET |

## Routing audit outcomes and targeted data checks

**Core overlap (R1/R2/R4).** Frozen issuer cohort facts (Microsoft R1, Alphabet/Amazon R2 and six issuer-credit R4 items) must be considered through existing same-period issuer panels, **not double counted** as R3/R5/R6/R7. JOLTS needs metadata cleanup to MACRO, not automatic scoring. This audit does not alter frozen core roster, issuer weights, or levels.

**Physical layer.** Nine supplier/semiconductor/optical/capacity supply-chain events currently explain physical-cycle conditions but do not establish an independently realized R3/R5/R6/R7 project consequence. The next source-based analysis may map to P1–P4 without adding those P-indicators to the v2 numeric formula. Do not infer AI unit ROI from supplier demand.

**Macroeconomic layer.** Twelve MACRO_ONLY final decisions (including four with nonstandard factor metadata) and four CONTEXT_ONLY decisions are not qualified by headline impact, surprise magnitude, election outcome or SOX moves. A new signed effect would require primary, issuer- or project-linked realized economic proof; the old source alone is not a reopen trigger.

**Scoped high-priority review of currently eligible evidence:** 
1. Galaxy / CoreWeave R6 QUALIFIED: retained, source review states real billable 133MW and $79.068m lease revenue; independently scored as **IMPROVEMENT**, not an extra R4 financing effect. Review-by freshness requires checking for a new score after 07:21 UTC.
2. Anthropic R3 QUALIFIED: retained, within-issuer 48%→58% reported compute+infra cost intensity Q/Q; significant contrary evidence is year-over-year improvement. No executed R5 payment failure is implied by future commitments.
3. TeraWulf R6 EARLY_WARNING: primary $63m HPC lease revenue, 102MW operating; no comparable incremental billable-MW baseline. **No promotion** without new baseline or provenance correction.
4. CoreWeave R6 EARLY_WARNING: active power +200MW and quarterly revenue $3.661bn are not proof of incremental paid MW; financing context overlaps R4. **No promotion** on the saved source.
5. SoftBank R7 EARLY_WARNING LOW: official earnings publication is not primary proof of a funded-project cancellation/impairment, so quantitative impact **UNKNOWN**; verify actual affected funded project before any promotion.

## Proposed factor-specific economic materiality — NOT YET IDENTIFIED

These are **candidate normalization definitions**, not an approved numerical Challenger revision. Each needs primary-source matched denominators, accounting scope, point-in-time verification and causal independence.

| Factor | Candidate within-factor materiality ratio | Required missing-data treatment |
|---|---|---|
| R3 | Same-issuer change in realized compute/infrastructure cost **as share of comparable revenue**, or cost per matched inference task (percentage points) | Unknown if denominator, task mix or prior comparable period absent |
| R5 | Enforced cancelled/changed contract value or realized collections shortfall / same-scope active, enforceable contracted value | Announced backlog or expected prepayment is NOT an executed cash flow |
| R6 | Incremental **paid/billable MW** / prior billable MW, alongside realized lease income, where matched | Grid-connected or active power is not assumed paid; do not divide incompatible locations/quarters |
| R7 | Economically deferred/cancelled **funded investment** / previously committed funded project investment | Announced or permitted but unfunded projects are excluded |

Cross-factor loss equivalents (e.g., R3 percent points against R6 MW or R7 capex) require a calibrated translation and cannot be derived from the present 38 records. Even within-factor ranking may be unavailable when only one comparable event exists. **Do not force zero, invent peer denominators, apply single-supplier dollars to the market, or change signed-event impacts in this PR.**

## New-event comparison procedure (research layer)

After canonical registration, independently review the four rubric components and compare a newly registered event to this frozen benchmark:

```bash
python scripts/research/validate_relative_event_strength.py --check
python scripts/research/validate_relative_event_strength.py --compare \
  --id EVT-YYYYMMDD-XXXXXXXXXXXX \
  --directness 2 --realized-evidence 2 --quantifiability 1 --signed-independence 0
```

The values above are **CLI illustration only**, not a real event assessment. The comparator requires that the ID is actually registered, then returns its rank against the saved 38 and its tied peers. **It does not persist a new review**, edit the model, replace a source investigation or rank against later events not yet recorded in a new dated audit. For the next publication, first update the dated comparison population explicitly; keep older snapshots immutable.

## Frozen Challenger v2.1 event-only replay / proposal comparison

On the existing **2026-11-11 weekly cutoff** (not a refreshed present-time score), stored inputs show:

| Measure | Frozen v2.1, unchanged | Relative rank experiment |
|---|---|---|
| Core interval | `46.36–53.64` | Exactly unchanged |
| R3 signed adjustment | `2.00` | Unchanged; only Anthropic qualified |
| R5 signed adjustment | `0.00` | Unchanged |
| R6 signed adjustment | `-2.00` | Unchanged; only Galaxy qualified |
| R7 signed adjustment | `0.00` | Unchanged |
| Total signed adjustment | `0.00` | `0.00`: no new signings |
| Final interval | `46.36–53.64` | Exactly unchanged |
| Exact scalar / trading signal | `null` / `false` | Exactly unchanged |

This is **an event-inventory replay**, not a rerun of primary issuer scoring or a magnitude-weighted counterfactual. A genuinely magnitude-weighted challenger alternative is **NOT_ESTIMABLE** using just the 38 existing registry reviews. No honest comparison of model predictive quality can be claimed from two qualified observations and no realized reversal labels.

## Research decision

**KEEP THE ONLY APPROVED CHALLENGER v2.1 NUMERIC METHOD.** Do not revise ±0.5/±1, factor caps, half-lives, core weights, historic EVT IDs, or the signed reviews. Adopt the **separate reproducible ordinal evidence ranking** for research triage, linked to immutable IDs and scored as a 38-event snapshot. Prospective process: when new registrations arrive, record an explicit rubric assessment against the *current* registered comparison population; update and validate the sidecar before publishing a new ranking; do not auto-label UNKNOWN materiality as zero. Do not mutate the legacy registry in an audit PR.

Reopen a past decision only upon new dated material primary evidence, verified independent counterevidence or a provable source/PIT error. For a future economic-force model, first obtain factor-specific matched-denominator panels and run a held-out prospective evaluation; do not add arbitrary dollar weights just to obtain a point estimate.

## Reproducibility and audit caveats

- Machine-readable assessment: `data/research/events/event_strength_audit_2026-11-11.json`. The source of event IDs, review text, factors and provenance is `data/research/events/challenger_v2_event_registry.json` at snapshot SHA above; the replay uses the immutable `weekly_challenger_v2_2026-11-11_r1.json`.
- Validate with `python scripts/research/validate_relative_event_strength.py --check` (requires the registry on the same 38-ID population; future new entries require a new dated audit snapshot, not retroactive overwrite).
- This is a **review of existing saved evidence and routing consistency**, not verification of every original source link, new market data collection, numerical score recalculation, an approved materiality-weighted model, or a trading decision.
- `calibration=UNCALIBRATED`, `category=null`, `trading_signal=false`.
- Model contracts: [Challenger v2](../AI_ROI_CHALLENGER_MODEL_v2.md), [qualification v2.1](../CHALLENGER_V2_EVENT_POLICY_V2_1.md), [registry contract](../CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md).
