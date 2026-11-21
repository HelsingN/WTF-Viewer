# Champion–Challenger Baseline — 2026-09-09

**Status:** RESEARCH / SHADOW COMPARISON  
**Champion:** `AI_CapEx_Reversal_Strategy_v1.2`  
**Challenger:** `AI_ROI_CHALLENGER_MODEL_v1`  
**Trading authority:** Champion only  
**Challenger trade authority:** NONE

## 1. Purpose

This is the first point-in-time comparison between the existing AI CapEx Reversal champion and the new financial-first ROI/payback challenger.

The experiment is intentionally designed to preserve disagreement rather than blend the models.

## 2. Champion state

From the 9-Sep weekly research and current fundamental context:

```text
AI_CAPEX_REVERSAL:    NOT CONFIRMED
CHAMPION POSTURE:     WATCH
TRADE_CANDIDATE:      NO_CANDIDATE
PHYSICAL_DEMAND:      STRONG
MEMORY:               SHORTAGE / TIGHT
GPU_OVERCAPACITY:     NOT CONFIRMED
```

The numeric Combined Score is not recomputed in this note because a complete current technical + Asia snapshot is not being regenerated here.

## 3. Challenger state

Initial shadow observation:

```text
CHALLENGER SCORE:      45 / 100
CHALLENGER STATE:      ELEVATED
CAUSAL STAGE:          STAGE 3 — FUNDING DEPENDENCE RISING
DIVERGENCE:            CHALLENGER_EARLY_WARNING
```

Component levels:

| Component | Level | Weight | Contribution |
|---|---:|---:|---:|
| R1 Monetization vs CapEx | 1 | 20 | 10.0 |
| R2 Cash Conversion / FCF | 1 | 15 | 7.5 |
| R3 Payback Duration / Economics | 1 | 15 | 7.5 |
| R4 Financing / Refinancing | 1 | 20 | 10.0 |
| R5 Backlog / Contract Quality | 1 | 10 | 5.0 |
| R6 Capacity Funnel / Ghost Demand | 1 | 10 | 5.0 |
| R7 Project Attrition | 0 | 10 | 0.0 |
| **Total** |  | **100** | **45.0** |

## 4. Why the challenger is more cautious

The challenger does not require physical demand to weaken first. It is responding to a different causal layer:

```text
strong AI demand
+
very high CapEx
+
weakening cash conversion at several hyperscalers
+
high financing dependence
+
CoreWeave credit deterioration
+
backlog / customer concentration concerns
+
ghost-demand / capacity-quality evidence
```

At the same time, the evidence required for a true reversal is still missing:

```text
broad project cancellations             NO
broad refinancing failure               NO
GPU utilization collapse                NO
HBM / server-memory oversupply           NO
semiconductor/networking order collapse NO
hyperscaler CapEx cuts                   NO
```

Therefore this is an **early financial warning**, not a reversal call.

## 5. Physical confirmation overlay

```text
P1 GPU compute:               WATCH
P2 Memory:                    ANTI_REVERSAL
P3 Semiconductor/networking:  ANTI_REVERSAL
P4 Market/technical:           UNKNOWN / not refreshed here
```

This is the exact type of divergence the shadow experiment is meant to observe:

```text
financial-first challenger = ELEVATED
while
physical cycle = still strong
```

If the challenger is useful, later evidence should increasingly propagate through the causal chain rather than simply remain elevated forever.

## 6. What would validate the challenger

Strong forward validation would look like:

```text
R4 financing stress rises
→ R7 project attrition activates
→ P1 GPU utilization/pricing weakens
→ P2 memory tightness normalizes
→ P3 hardware/networking guidance deteriorates
→ champion later moves ALERT / REVERSAL_CANDIDATE
```

The key research metric is **lead time with acceptable false positives**.

## 7. What would falsify / weaken the challenger

Examples:

```text
CapEx remains high but monetization and FCF catch up
CoreWeave / neocloud financing spreads normalize
project attrition remains absent
GPU utilization stays high despite lower rental prices
memory shortage persists while new capacity is absorbed
hyperscalers continue to expand with improving cash conversion
```

If these occur while the challenger remains elevated, the model may be too sensitive to financing headlines and should not be promoted.

## 8. Evaluation windows

Record outcomes without rewriting the original observation:

```text
+2 weeks
+4 weeks
+8 weeks
+12 weeks
next hyperscaler earnings cycle
```

The structured point-in-time record is stored at:

`data/research/challenger/ai_roi_challenger_2026-09-09.yaml`

## 9. Governance

During the shadow period:

```text
Champion weights:       unchanged
Champion thresholds:    unchanged
Challenger weights:     frozen
Combined model:         forbidden
Trade authority:        champion only
```

First formal promotion/retirement review should occur only after at least two hyperscaler earnings cycles plus accumulated weekly/event outcomes.
