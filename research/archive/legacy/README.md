# Legacy documentation archive

This directory stores superseded Strategy, Architecture, Phase Plan, and other versioned source-of-truth documents.

## Policy

- Current source-of-truth documents live directly under `Docs/`.
- When a new versioned SoT becomes current, preserve the previous version here in the same migration that updates active pointers/tests.
- Normal archived SoT documents should begin with `LEGACY / DO NOT USE AS CURRENT SOURCE OF TRUTH`.
- A file intentionally preserved **verbatim** as immutable provenance may retain its historical bytes without a modern banner when the archive path, filename and this README clearly define its legacy status.
- Superseded Phase 1 Plans are archive-only; do not keep compatibility copies in the active `Docs/` root.
- Do not restore archived versions to the active `Docs/` root unless they become current again through an explicit versioning decision.
- Do not delete archived versions without a separate provenance decision.

## Archived versions

Superseded on 25 Aug 2026:

- `AI_CapEx_Reversal_Strategy_v1.1.md` → current: `Docs/AI_CapEx_Reversal_Strategy_v1.2.md`
- `AI_CapEx_Reversal_Architecture_v1.1.md` → current: `Docs/AI_CapEx_Reversal_Architecture_v1.2.md`
- `AI_CapEx_Reversal_Phase1_Plan_v2.2.md` → provenance pointer; later recovery line led to v2.4 and then v2.5; current roadmap v2.6

Superseded on 27 Aug 2026:

- `AI_CapEx_Reversal_Phase1_Plan_v2.3.md` → later recovery release v2.4; current: `Docs/AI_CapEx_Reversal_Phase1_5_Plan_v2.6.md`

Superseded on 9 Sep 2026:

- `FUNDAMENTAL_SNAPSHOT_CONTRACT_v1.md` → current: `Docs/FUNDAMENTAL_SNAPSHOT_CONTRACT_v2.md`
- `AI_CapEx_Reversal_Phase1_Plan_v2.4.md` → current: `Docs/AI_CapEx_Reversal_Phase1_5_Plan_v2.6.md`

Superseded on 20 Sep 2026:

- `CORE_SIM_E2E_CONTRACT_v1.md` → current: `Docs/CORE_SIM_E2E_CONTRACT_v2.md`

The archived Fundamental Snapshot Contract v1 is preserved from its historical blob. The active root path `Docs/FUNDAMENTAL_SNAPSHOT_CONTRACT_v1.md` is only a deprecation/compatibility pointer so older issues do not silently resolve to a missing path.

The archived `AI_CapEx_Reversal_Phase1_Plan_v2.4.md` is the complete final historical v2.4 body restored verbatim from Git blob `e2e2c3380b4f1af57f5898c53d2a6f2b04b8d15a`. Its internal `CURRENT SOURCE OF TRUTH` wording is historical provenance only. There is intentionally no active-root `Docs/AI_CapEx_Reversal_Phase1_Plan_v2.4.md` file after the v2.5 migration.

## Phase Plan provenance warning

Audit on 27-Aug-2026 found that commit `d5b33e12` unintentionally compacted/truncated the active v2.2 roadmap, removing Week 2 execution continuation, Week 3/4 reliability/failure work and final gates. v2.3 was created after that regression and inherited the shortened structure.

The last full pre-regression v2.2 is preserved **verbatim** at:

`AI_CapEx_Reversal_Phase1_Plan_v2.2_FULL_PRE_REGRESSION.md`

Git provenance:

```text
source commit: 431fb3232061e1cb503581a192376dcf00d95c6e
source blob:   9715d8ef393f2e70e4a1de9cb9202004432acb23
```

The regular archived path `AI_CapEx_Reversal_Phase1_Plan_v2.2.md` is intentionally a small provenance pointer rather than the misleading post-regression/truncated copy.

`Phase1_Plan_v2.4` was the consolidated recovery release: it restored the missing operational/final-gate structure while adapting it to Strategy/Architecture v1.2, BrokerAdapter/SimulatedBroker, Leadership/MARKET_REJECTION and the forensic financing layer.

`Phase1_Plan_v2.5` was the post-audit execution rebaseline, superseded on 8 Oct 2026. It preserves Strategy/Architecture semantics while shifting the remaining Phase 1 work into an execution-completion sprint focused on Decision → Proposal → Sim execution → Reconciliation → failure readiness.


## Superseded on 8 Oct 2026 — phase separation

- `AI_CapEx_Reversal_Phase1_Plan_v2.5.md` → current execution roadmap: `Docs/AI_CapEx_Reversal_Phase1_5_Plan_v2.6.md`.
- Accepted broker-independent Phase 1 results are recorded beside the active plan at `Docs/AI_CapEx_Reversal_Phase1_Completion_v1.0.md`.
- The final v2.5 is preserved verbatim from `main@0df7583598491014af782e4c857a7bb6804e851a`, Git blob `2273d6a3be82cf16c520f0c076d56bb5b34d73f0`; its historical CURRENT SOURCE OF TRUTH wording is not current status.
- All 27 unfinished Phase 1 checklist entries remain explicit inherited debt in v2.6; no acceptance is inferred from relocation.
- There is no active-root v2.5 compatibility copy. Structural/link checks migrate together with the new plan.


## Challenger v1 retirement (2026-11-04)

`AI_ROI_CHALLENGER_MODEL_v1.md` is the preserved historical shadow model definition. Its seven 0/1/2 factors, old fixed weights, v1 60/67.5 scores and HEALTHY/WATCH/ELEVATED/ALERT/HIGH_REVERSAL_RISK bands are **not active for new research**. Current research method: [Challenger v2](../../AI_ROI_CHALLENGER_MODEL_v2.md). Historical v1 structured observations stay in `data/research/challenger/ai_roi_challenger_2026-*.yaml` without rewriting.

The old root URL `Docs/AI_ROI_CHALLENGER_MODEL_v1.md` is retained only as a short **DEPRECATED** compatibility pointer so historical links continue resolving; the full v1 model exists solely in this archive.

## Challenger v2 event-qualification policy superseded on 4 Nov 2026

The pre-v2.1 Challenger v2 R3/R5/R6/R7 qualification implementation and historical tests are archived **verbatim** at [challenger_v2_event_qualification_pre_v2_1/](challenger_v2_event_qualification_pre_v2_1/README.md), sourced from `main@8192a4a754be58d08d2620ad99888fcbfd2a75d0` before [PR #151](https://github.com/HelsingN/AI_CapEx_Reversal/pull/151). Its old exact-timestamp qualification logic is research provenance only. For all new event reviews use [current observable policy v2.1](../../CHALLENGER_V2_EVENT_POLICY_V2_1.md); archived `.py.txt` files are not executable project modules.
