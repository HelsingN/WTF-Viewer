> **LEGACY / DO NOT USE AS CURRENT SOURCE OF TRUTH.** Archived 2026-11-04. New research uses [Challenger v2](../../AI_ROI_CHALLENGER_MODEL_v2.md). The v1 weights, thresholds and 2026 historical scores are retained solely for provenance; do not run v1 for new observations.

# AI ROI / Payback Challenger Model v1

**Version:** 1  
**Created:** 2026-09-09  
**Status:** RESEARCH / SHADOW MODEL  
**Trading authority:** NONE  
**Champion model:** `Docs/AI_CapEx_Reversal_Strategy_v1.3.md`  
**Context contract:** `Docs/AI_ROI_PAYBACK_RISK_CONTRACT_v1.md`

> This document creates a **challenger** model that runs in parallel with the current F1..F5 / Combined Score champion. Strategy v1.3 preserves the same Champion F1..F5 weights/thresholds as v1.2 and adds Strategy D only as research-only. The challenger does not replace, modify, blend with, or override the champion. No challenger state may authorize a trade in Phase 1.

## 1. Why a challenger exists

The champion asks primarily:

```text
Has the AI CapEx reversal become sufficiently visible across fundamental,
credit/capacity, technical and cross-market evidence?
```

The challenger asks a deliberately different question:

```text
Are the economics of marginal AI infrastructure deteriorating before
physical demand and semiconductor orders visibly roll over?
```

Core causal hypothesis:

```text
AI demand can remain strong
        ↓
capacity / CapEx grows faster than monetizable demand
        ↓
cash conversion weakens / payback lengthens
        ↓
financing dependence rises
        ↓
financing terms tighten
        ↓
marginal projects are delayed / restructured / cancelled
        ↓
utilization / pricing weakens
        ↓
hardware / memory / networking roll over later
```

The purpose of the experiment is to test whether this financial-first path provides useful lead time without creating excessive false positives.

## 2. Champion–challenger separation

The models must remain independent during the shadow period.

```text
CHAMPION
F1..F5 + current Combined Score + technical + Asia
→ current Decision/Trade authority

CHALLENGER
ROI / payback / financing / capacity-quality causal model
→ research state only
```

Forbidden during shadow period:

```text
Final Score = Champion × x + Challenger × y
hidden new F6
changing champion weights because challenger is elevated
allowing challenger to bypass champion entry gates
allowing challenger to activate research-only Strategy D
```

Divergence is a research result, not a bug.

## 3. Challenger components

Each challenger component is scored:

```text
0 = absent / anti-warning
1 = WATCH / partial evidence
2 = confirmed / material deterioration
```

### R1 — Monetization vs CapEx — weight 20

Question:

```text
Is monetization keeping pace with capital deployment?
```

Evidence:

```text
AI/cloud revenue growth vs CapEx growth
incremental revenue vs incremental CapEx
CapEx / OCF
FCF after AI infrastructure spending
management ROI/payback commentary
market reaction to spending plans
```

Strong warning:

```text
CapEx continues to accelerate
+
monetization growth decelerates materially
+
management/market begins to demand slower spending or faster returns
```

Research observables (definitions and weekly capture: [Compute Economics / Efficiency](research/AI_COMPUTE_ECONOMICS_EFFICIENCY_FRAMEWORK_v1.md)):

- economic output per unit of compute; AI revenue / deployed compute and revenue per GPU/MW where comparable;
- tokens per GPU-hour, inference cost and cost per successful task at fixed quality;
- pricing discipline: flat subscriptions, quotas/throttling, usage pricing and cost pass-through.

Efficiency gains and pricing changes alone do not raise R1. Distinguish weaker monetizable demand from lower compute required for the same demand; pricing discipline may improve monetization.

### R2 — Cash Conversion / FCF Pressure — weight 15

Evidence:

```text
OCF trajectory
FCF trajectory
FCF after PP&E / finance leases
interest expense
cash conversion vs revenue growth
```

The model distinguishes accounting growth from cash-funded economics.

### R3 — Payback Duration / Project Economics — weight 15

Evidence where available:

```text
explicit payback periods
revenue / deployed MW
revenue / deployed GPU
project yield / IRR proxy
contract duration vs hardware economic life
power + memory + accelerator + construction costs
residual-value assumptions
```

Direct evidence of expected payback lengthening is stronger than analyst inference. Unknown project economics remain `UNKNOWN` rather than fabricated.

Additional R3 causal hypothesis: **Efficiency-Induced Overcapacity**. Model/hardware efficiency can reduce compute per useful task while adoption and revenue grow. A warning requires evidence that gains outpace induced demand and undermine utilization, realized revenue or payback assumptions of committed capacity. Record this in shadow research using the [framework](research/AI_COMPUTE_ECONOMICS_EFFICIENCY_FRAMEWORK_v1.md); no new component or automatic score adjustment.

### R4 — Financing / Refinancing Dependence — weight 20

Evidence:

```text
debt issuance growth
spread / coupon / financing yield
refinancing dependence
collateral requirements
covenant tightening
vendor guarantees / credit enhancement
customer prepayments
minimum-revenue commitments
maturity extensions
```

This is intentionally a high-weight component because the challenger is designed to detect a financial-first reversal.

### R5 — Backlog / Contract Quality — weight 10

Evidence:

```text
customer concentration
RPO/backlog quality
contract duration
cancellability
minimum-revenue / take-or-pay structure
counterparty funding dependence
renegotiation / deferral
```

Large headline backlog is not automatically high-quality monetized demand.

### R6 — Capacity Funnel / Ghost Demand — weight 10

Track the funnel:

```text
ANNOUNCED
→ GRID_REQUESTED
→ CONTRACTED
→ FUNDED
→ UNDER_CONSTRUCTION
→ ENERGIZED
→ UTILIZED
→ MONETIZED
→ ECONOMICALLY_PROFITABLE
```

Physical utilization does not establish monetization or economic profitability. Subsidized workloads can keep utilization high while project returns deteriorate; evidence must identify the observed funnel stage.

Warnings:

```text
duplicate project requests
large gap between requested and deposit-backed capacity
project attrition after funding verification
large announced GW with weak financing evidence
```

### R7 — Project Attrition — weight 10

Evidence:

```text
delays
deferrals
restructurings
contract downsizing
site cancellation
capacity release
refinancing failure
customer withdrawal
```

This component is deliberately late-causal and serves as an important bridge between financial deterioration and physical weakness.

## 4. Provisional shadow score

Research-only score:

```text
Challenger Score = Σ(weight_i × level_i / 2)
```

Weights:

| Component | Weight |
|---|---:|
| R1 Monetization vs CapEx | 20 |
| R2 Cash Conversion / FCF | 15 |
| R3 Payback Duration / Economics | 15 |
| R4 Financing / Refinancing | 20 |
| R5 Backlog / Contract Quality | 10 |
| R6 Capacity Funnel / Ghost Demand | 10 |
| R7 Project Attrition | 10 |
| **Total** | **100** |

Provisional interpretation:

```text
0–24    HEALTHY
25–44   WATCH
45–59   ELEVATED
60–74   ALERT
75–100  HIGH_REVERSAL_RISK
```

These thresholds are frozen for the shadow experiment but have **no trading meaning**. They may not be promoted into Strategy without formal validation/versioning.

## 5. Causal stage model

The score is accompanied by a separate causal stage. Do not infer a later stage solely from the numeric score.

```text
STAGE 0 — Healthy expansion
STAGE 1 — Cash conversion compression
STAGE 2 — ROI / payback concern
STAGE 3 — Funding dependence rising
STAGE 4 — Financing stress / lender tightening
STAGE 5 — Project attrition / restructurings / cancellations
STAGE 6 — Utilization / pricing / capacity weakness
STAGE 7 — Semiconductor / memory / networking deterioration
```

The research focus is the transition:

```text
STAGE 3 → STAGE 5
```

because it may provide lead time before the physical cycle clearly reverses.

## 6. Physical confirmation overlay — not in challenger score

To preserve model independence, physical confirmation is recorded separately rather than added into R1..R7.

```text
P1 GPU compute: price + availability + utilization / renewals
P2 Memory: HBM/DRAM/NAND pricing + inventory + lead times
P3 Semiconductor/networking: bookings/orders/guidance/margins
P4 Market/technical: leadership rejection / sector breakdown
```

Possible states:

```text
ANTI_REVERSAL
NEUTRAL
WATCH
CONFIRMED_WEAKNESS
UNKNOWN
```

A challenger ALERT with physical `ANTI_REVERSAL` is a valid early divergence to observe, not a trading signal.

## 7. Required weekly output

Every weekly review should include the concise `AI Compute Economics / Efficiency` subsection defined in [the framework](research/AI_COMPUTE_ECONOMICS_EFFICIENCY_FRAMEWORK_v1.md), including `UNKNOWN` or no material update when appropriate. These observations remain outside scoring and P1..P4 states until independently supported under existing criteria.

Every material weekly/event review should persist:

```text
as_of
champion_state
champion_trade_state
challenger_score
challenger_state
challenger_stage
R1..R7 levels
physical_confirmation P1..P4
divergence_class
key evidence
forward outcome placeholders
```

Divergence classes:

```text
ALIGNED_HEALTHY
ALIGNED_WARNING
CHALLENGER_EARLY_WARNING
CHAMPION_EARLY_WARNING
MATERIAL_CONFLICT
UNKNOWN
```

## 8. Forward-outcome evaluation

Each observation should later be checked at approximately:

```text
2 weeks
4 weeks
8 weeks
12 weeks
next relevant earnings cycle
```

Evaluate:

```text
lead time
persistence of warning
false positives
false negatives
project attrition after warning
propagation financial → physical
subsequent market/technical confirmation
```

Do not judge the challenger only by whether stock prices fell immediately. The causal hypothesis predicts that financing/project evidence may lead physical and market confirmation.

## 9. Promotion / retirement gate

The challenger remains shadow-only until there is enough evidence to evaluate it.

Minimum review gate:

- at least two full hyperscaler earnings cycles;
- several event drills and financing events;
- recorded divergence/outcome history;
- false-positive and false-negative review;
- evidence that the challenger adds independent information rather than duplicating F1/F3/F5;
- documented lead-time analysis;
- explicit Strategy version decision.

Possible outcomes after validation:

```text
KEEP AS SHADOW MODEL
PROMOTE AS CONTEXT OVERLAY
IMPORT SELECTED FACTORS INTO CHAMPION
REPLACE / REDESIGN CHAMPION
RETIRE CHALLENGER
```

No outcome is preferred in advance.

## 10. Current governance

```text
Champion weights:       FROZEN
Champion thresholds:    FROZEN
Challenger weights:     FROZEN FOR SHADOW TEST
Trading authority:      CHAMPION ONLY
Strategy D authority:   NONE / RESEARCH ONLY
Live execution:         FORBIDDEN IN PHASE 1
```

The experiment exists specifically to avoid retuning the production research model based on a compelling but still unvalidated narrative.

## 11. Related sources

```text
Docs/AI_CapEx_Reversal_Strategy_v1.3.md
Docs/AI_ROI_PAYBACK_RISK_CONTRACT_v1.md
Docs/AI_FINANCING_CREDIT_STRESS_CONTRACT_v1.md
Docs/FUNDAMENTAL_SNAPSHOT_CONTRACT_v2.md
Docs/research/AI_CAPEX_WEEKLY_WATCH_2026-09-09.md
```
