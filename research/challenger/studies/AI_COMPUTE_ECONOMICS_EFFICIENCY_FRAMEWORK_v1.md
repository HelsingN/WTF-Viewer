# AI Compute Economics / Efficiency — Research Framework v1

**Created:** 2026-09-30  
**Status:** RESEARCH / SHADOW OBSERVATIONS  
**Trading authority:** NONE  
**Scope:** R1/R3 research observables; no scoring-model change

## Purpose and hypothesis

Distinguish (a) capacity growing faster than monetizable demand from (b) capacity assumptions exceeding compute actually required for monetizable demand.

**Efficiency-Induced Overcapacity:** AI adoption and monetization may grow while falling compute required per unit of useful economic output reduces returns on previously financed infrastructure.

Causal path: efficiency improves → compute intensity falls → committed capacity utilization/revenue assumptions weaken → payback lengthens → marginal projects are deferred → GPU rental pricing/orders weaken → memory/networking weaken. Each arrow requires evidence; this is a hypothesis, not an observed sequence.

Efficiency improvements are not intrinsically bearish. Rebound/induced demand, new workloads and better margins may absorb all savings. A warning needs both comparable efficiency evidence and deterioration in committed capacity economics after accounting for demand growth.

## Weekly observables

| Observable | Research mapping | Interpretation constraint |
|---|---|---|
| AI revenue / deployed compute; revenue per GPU/MW | R1, R3 | Match entity, period and deployed/energized denominator; distinguish allocated from realized revenue |
| Tokens per GPU-hour; inference cost | R1 | Match hardware, precision, model, context, workload, latency and quality; tokens are not economic output |
| Cost per successful useful/agent task | R1, R3 | Fixed task/success standard; include retries and supporting compute |
| Efficiency vs assumed utilization/payback | R3 | Separate training/inference and new/committed hardware cohorts; document original assumptions |
| Flat subscription → quotas/throttling → usage pricing / price increases | R1 | May indicate cost pressure or improved monetization; no automatic warning |
| Minimum commitments and inference cost pass-through | R1, R3; existing R5 context | Contract obligation does not establish realized profitable end demand |

Observe distillation, quantization, MoE/routing, caching, inference optimization, small/local models and custom accelerators only when their economic impact is measurable. Do not turn weekly research into an AI technology survey.

Follow relevant public pricing/disclosures from OpenAI, Anthropic, Google, Microsoft, Cursor and other material agent products. Record access price separately from metered consumption. Subscription/API list-price comparisons do not establish marginal cost or company losses.

## Evidence and capture

Use existing PRIMARY_FACT / MANAGEMENT_CLAIM / INDEPENDENT_CONFIRMATION taxonomy. Treat forecasts, benchmarks and causal interpretation explicitly as such; management claims about profitable tokens are not independent evidence of end-customer ROI.

For each material observation record:

- observation ID, entity, workload/hardware cohort;
- metric, numerator/denominator, units, period, quality/success definition and comparability limits;
- source URL/document, publication time, earliest availability time, capture time and evidence class;
- observed value or UNKNOWN; baseline and change where comparable;
- efficiency gain, induced-demand evidence and committed-capacity economics separately;
- symmetric interpretation, counterevidence, missing data and next review date.

Preserve point-in-time provenance. Do not backfill later information as known at an earlier decision. Unsupported transcript claims are research leads only. Retain historical weekly reports and challenger YAML unchanged; add new dated observations rather than rewriting them.

## Required weekly subsection

### AI Compute Economics / Efficiency

1. Comparable efficiency/task-cost change: evidence or UNKNOWN.
2. Monetization/pricing discipline: evidence or no material update.
3. Induced demand/rebound: evidence or UNKNOWN.
4. Committed capacity utilization/revenue/payback implications: evidence or UNKNOWN.
5. Hypothesis assessment: supported / contradicted / inconclusive, with counterevidence and next check.

Use this compact section even when public data are insufficient. No new active machine-readable runtime fields are introduced by this extension.

## Shadow evaluation and gates

Start prospective observations with the next weekly. Evaluate at 2/4/8/12 weeks and relevant earnings cycles under the existing challenger outcome process. After at least two full hyperscaler earnings cycles, assess independent lead time, data comparability, false positives/negatives and whether the extension adds information beyond existing R1/R3 and P1..P4.

Champion F1..F5/Combined Score, R1..R7 weights (20/15/15/20/10/10/10), scoring criteria/thresholds and P1..P4 remain unchanged. No R8, F6 or P5. This extension alone does not change the 2026-09-30 recorded score 60 / ALERT / Stage 5, Champion WATCH / NO_CANDIDATE, or physical states.

Any future scoring integration requires explicit validation and Strategy/Architecture version review. No trading, execution or gate authority is added.

## Sources of truth

- [Current Challenger v2](../AI_ROI_CHALLENGER_MODEL_v2.md) (historical v1: [archive](../archive/legacy/AI_ROI_CHALLENGER_MODEL_v1.md))
- [ROI / Payback contract](../AI_ROI_PAYBACK_RISK_CONTRACT_v1.md)
- [Strategy v1.3](../AI_CapEx_Reversal_Strategy_v1.3.md)
