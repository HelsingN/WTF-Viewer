# AI ROI / Payback Risk Contract v1

**Version:** 1  
**Created:** 2026-09-09  
**Status:** RESEARCH / CONTEXTUAL LAYER  
**Trading authority:** NONE  

> This contract formalizes the hypothesis that an AI infrastructure cycle can deteriorate even while end demand is still growing, if monetizable demand grows more slowly than deployed capacity or if the expected payback period materially lengthens. It does **not** change F1..F5, Combined Score weights, Strategy thresholds, or broker/execution rules.

## 1. Purpose

The project must distinguish three different statements:

```text
AI is economically useful
AI demand is growing
current marginal AI infrastructure investment earns an acceptable return on capital within the expected time
```

The first two can remain true while the third becomes false.

The core research hypothesis is:

```text
AI demand remains positive
        ↓
monetization grows slower than expected
        ↓
capacity / CapEx grows faster than monetizable demand
        ↓
payback period lengthens
        ↓
external funding / refinancing dependence rises
        ↓
marginal projects become uneconomic
        ↓
delays / restructurings / cancellations
        ↓
physical semiconductor / memory / networking demand rolls over later
```

This is a **financial-first reversal path**. It is complementary to, not a replacement for, the existing physical oversupply and Micron/Cisco cycle framework.

## 2. China property analogy — allowed use

The China property comparison is a **causal analogy**, not a forecast and not a chart-pattern analogy.

Useful shared mechanism:

```text
strong belief in a durable secular asset
→ rapid capital formation
→ rising asset/capacity values validate more investment
→ debt / prepayments / future commitments fund further expansion
→ headline demand can exceed economically productive use
→ financing conditions become critical
→ marginal projects fail before the underlying asset becomes useless
```

The analogy must never be simplified to:

```text
AI = Chinese housing
```

Important differences must be preserved:

- AI demand is currently growing rapidly; Chinese housing demand was already weakening materially near the crisis phase.
- GPU/AI infrastructure has a much shorter technological/economic life than residential property.
- AI capacity can become obsolete before nominal physical utilization reaches zero.
- Hyperscalers have stronger balance sheets than property developers, while neocloud/project structures are much more financing-sensitive.

The analogy becomes materially stronger only if the project observes a transition from **announced/contracted demand** to **funded but under-monetized capacity**, followed by financing stress and project cancellation.

## 3. Research-only state

Until historical validation exists, use a contextual state only:

```text
AI_ROI_PAYBACK_RISK:
LOW
WATCH
ELEVATED
HIGH
CRITICAL
UNKNOWN
```

This state is research metadata. It is **not** a hidden score input.

Current working interpretation as of 2026-09-09:

```text
AI_ROI_PAYBACK_RISK = WATCH / ELEVATED
```

Reason: physical demand remains strong, but FCF pressure, financing dependence, neocloud credit deterioration, ghost-demand concerns and rising lender safeguards make the payback-duration hypothesis increasingly relevant. This is not evidence of a confirmed CapEx reversal.

## 4. Capacity funnel

Weekly research should distinguish the following stages rather than treating all announced capacity as equivalent:

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

Where possible, evidence should identify which stage a project or commitment has actually reached.

A widening gap between early-stage pipeline and monetized/profitable capacity is a warning even if total announced GW or backlog continues to rise.

## 5. Core indicators

Track at least the following categories.

### 5.1 Hyperscaler monetization vs CapEx

```text
AI/cloud revenue growth
CapEx growth
incremental operating cash flow
incremental free cash flow
FCF after AI infrastructure spending
CapEx / OCF
CapEx / cloud revenue growth where useful
management payback / ROI commentary
stock reaction to CapEx changes
```

The key question is not whether CapEx is high, but whether **incremental monetization and cash generation keep pace with incremental capital employed**.

### 5.2 Compute economics

```text
GPU rental price by generation
availability
utilization
renewal rate
contract duration
reserved vs spot pricing
revenue per deployed GPU where observable
revenue per deployed MW where observable
customer acquisition / concentration
```

A price decline alone is not sufficient. Stronger evidence is:

```text
price ↓
+
availability ↑
+
utilization / renewal / duration ↓
```

Additional efficiency and monetization observables are defined in [AI Compute Economics / Efficiency](research/AI_COMPUTE_ECONOMICS_EFFICIENCY_FRAMEWORK_v1.md): economic output per compute, quality-adjusted inference/task cost, tokens per GPU-hour, pricing discipline and cost pass-through. API list-price equivalent consumption is not marginal cost, and tokens alone are not useful economic output.

### 5.3 Project economics

Where disclosed or inferable from primary financing documents:

```text
project cost
expected revenue
contracted revenue
project yield / IRR proxy
interest / debt-service burden
DSCR-style coverage where possible
power cost
memory / accelerator cost
construction cost inflation
hardware economic life
contract duration vs hardware life
residual-value assumptions
```

Unknown values remain `UNKNOWN`; do not fabricate project IRRs.

Track the separate **Efficiency-Induced Overcapacity** hypothesis: efficiency improves → compute per useful task falls → committed projects' utilization/revenue assumptions prove excessive → payback lengthens → marginal projects are deferred/cancelled. Efficiency is a warning only where it outpaces induced demand and worsens capacity economics. Growing adoption/revenue is compatible with this path, but efficiency alone does not confirm it.

### 5.4 Financing dependence

```text
debt issuance
secured financing
refinancing dependence
spread / coupon changes
covenant tightening
collateral requirements
vendor guarantees / credit enhancement
customer prepayments
take-or-pay commitments
minimum revenue commitments
maturity extensions
restructurings
```

A project that remains viable only because refinancing terms, guarantees or prepayments become progressively more important is a stronger ROI-duration warning.

### 5.5 Backlog quality / ghost demand

Track:

```text
announced GW
verified / deposit-backed GW
funded GW
under-construction GW
energized GW
actual utilized capacity
customer duplication risk
project withdrawals
connection-request attrition
contract cancellations / deferrals
```

Headline backlog or grid requests must not be treated as equivalent to profitable end demand.

## 6. AI Payback Gap — research concept

The project may use the phrase `AI Payback Gap` for the difference between **expected payback assumptions** and **observed monetization/cash-conversion progress**.

Do not hard-code a numeric formula in v1 because comparable public data are incomplete and inconsistent across hyperscalers, neoclouds and project-finance structures.

A future formula requires:

- stable data definitions;
- at least several quarters of comparable observations;
- historical validation;
- explicit versioning before Decision Engine use.

Possible future building blocks:

```text
incremental CapEx growth
vs incremental AI/cloud revenue growth
vs incremental OCF/FCF

capacity growth
vs utilization / rental-price trend

funding cost
vs contracted project economics
```

## 7. Escalation ladder

Research should classify progression qualitatively:

```text
Stage 0 — strong demand + strong monetization + easy funding
Stage 1 — strong demand + rising CapEx + cash conversion weakens
Stage 2 — payback expectations lengthen / ROI questions increase
Stage 3 — debt/refinancing/guarantees become more important
Stage 4 — project economics deteriorate / lender terms tighten materially
Stage 5 — deferrals / restructurings / cancellations / capacity release
Stage 6 — utilization/pricing weakness becomes physical oversupply
Stage 7 — semiconductor/memory/networking guidance and margins roll over
```

The project is primarily interested in the **Stage 3 → Stage 5 transition**, because it may precede obvious physical reversal.

## 8. Relationship to F1..F5

This layer does not create F6.

It supplies contextual evidence to existing triggers:

```text
F1 Hyperscaler CapEx Discipline
← worsening cash conversion / ROI sensitivity / actual CapEx cuts

F2 GPU Compute Oversupply
← utilization + pricing + availability deterioration

F3 Neocloud / Credit Stress
← refinancing dependence / debt-service burden / financing terms

F4 Semiconductor Guidance Deterioration
← eventual hardware-order / utilization rollover

F5 RPO / Backlog Quality Deterioration
← ghost demand / cancellations / concentration / weak contract economics
```

A research-layer deterioration may increase scrutiny/confidence requirements, but cannot change trigger values without evidence that satisfies the Strategy contract.

## 9. Weekly Watch requirements

Every weekly AI CapEx Watch must include a short `AI Compute Economics / Efficiency` subsection using the linked framework, preserving missing data as `UNKNOWN`. It is research-only and does not create R8, F6 or P5, change weights/thresholds, or revise historical observations.

Every weekly AI CapEx Watch should include a concise `AI ROI / Payback Risk` block when there is material new evidence.

At minimum compare:

```text
CapEx growth vs monetization growth
OCF/FCF trajectory
funding-cost / refinancing changes
compute price + availability + utilization
announced vs funded/energized capacity
contract quality / cancellations
hardware-life vs contract-duration risk where observable
```

The weekly conclusion should explicitly answer:

1. Is AI demand still growing?
2. Is monetization keeping pace with capital deployment?
3. Is the expected payback period showing evidence of lengthening?
4. Is financing becoming more necessary or more expensive?
5. Are marginal projects being delayed, restructured or cancelled?
6. Is financial stress beginning to propagate into physical utilization/pricing?

## 10. Evidence discipline

Use the existing evidence taxonomy:

```text
PRIMARY_FACT
MANAGEMENT_CLAIM
INDEPENDENT_CONFIRMATION
```

Prefer filings, official earnings, financing documents, counterparties/lenders and observable pricing/utilization before press interpretation.

Statements such as `ROI is strong`, `capacity is sold out` or `demand exceeds supply` are management claims until independently cross-checked.

Do not infer economically profitable utilization merely from physical utilization.

## 11. Model-integration gate

Before any numeric weight, new trigger or Decision Engine dependency is allowed, require:

- multi-quarter comparable data;
- at least one historical stress/reversal sample where feasible;
- documented false-positive analysis;
- clear distinction between hyperscaler and neocloud economics;
- explicit Strategy/Architecture version review;
- tests proving no hidden score change.

Until then:

```text
AI ROI / Payback Risk = RESEARCH CONTEXT ONLY
```

## 12. Related sources of truth

```text
Docs/FUNDAMENTAL_SNAPSHOT_CONTRACT_v2.md
Docs/AI_FINANCING_CREDIT_STRESS_CONTRACT_v1.md
Docs/AI_CapEx_Reversal_Strategy_v1.3.md
Docs/AI_CapEx_Reversal_Architecture_v1.2.md
Docs/research/AI_CAPEX_WEEKLY_WATCH_2026-09-09.md
```
