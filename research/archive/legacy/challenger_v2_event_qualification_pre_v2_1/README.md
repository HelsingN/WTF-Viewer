# Archived Challenger v2 event qualification — pre-v2.1 (2026-11-04)

**LEGACY / ARCHIVED / DO NOT USE AS CURRENT SOURCE OF TRUTH.**

This folder is a byte-identical snapshot of the former Challenger v2 event qualification logic immediately **before** the v2.1 finite-observable-qualification change in [PR #151](https://github.com/HelsingN/AI_CapEx_Reversal/pull/151), merged as `f62aa16201703b7569802b21ad2c3c4d319d0380`. Created under [issue #154](https://github.com/HelsingN/AI_CapEx_Reversal/issues/154).

- **Original Git ref / research state:** `8192a4a754be58d08d2620ad99888fcbfd2a75d0` (`main` preceding PR #151).
- **Current authoritative method:** [Challenger v2](../../../AI_ROI_CHALLENGER_MODEL_v2.md), especially [Observable event policy v2.1](../../../CHALLENGER_V2_EVENT_POLICY_V2_1.md).
- **Retired behavior:** older R3/R5/R6/R7 event qualification and source-timing validation, including the requirement for exact independently verified first-public timestamps, and the unbounded evidence-research failure mode that treated inaccessible private GPU utilization / project ROI as a practical blocker.
- **Purpose:** forensic reproducibility and audit only, not a second live Challenger or rollback instruction.
- **Unchanged:** historical event registry/reviews, v1 archived model, current scoring/registrar paths, tests and scheduled research tasks. Old artifacts must keep their actual PIT and original policy context.

## Exact source-blob manifest

| Prior active path (`8192a4a754be58d08d2620ad99888fcbfd2a75d0`) | Archived relative path | Original Git blob SHA |
|---|---|---|
| `Docs/AI_ROI_CHALLENGER_MODEL_v2.md` | `Docs/AI_ROI_CHALLENGER_MODEL_v2.md` | `519fdd57237b02f566c4b0b7aecb7b9cf6e37a68` |
| `Docs/CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md` | `Docs/CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md` | `db0a810e7735b90fa2ec3c4dd2be1e61b481aa00` |
| `scripts/research/challenger_v2_event_register.py` | `scripts/research/challenger_v2_event_register.py.txt` | `491472915d9c5fc6a318089dd8ef74adbf66a090` |
| `src/scoring/challenger_v2.py` | `src/scoring/challenger_v2.py.txt` | `10eebe3ead220f682e6c202cc9a45a3665d3a0b5` |
| `tests/test_challenger_v2.py` | `tests/test_challenger_v2.py.txt` | `8802ccd19fb0c1d2ed0d9965a28e05dbbce895ec` |
| `tests/test_challenger_v2_event_register.py` | `tests/test_challenger_v2_event_register.py.txt` | `dfcd650688eee8a77ea428d57487481fb81d0aad` |

All six archived objects reuse the exact **original Git blobs** from the source ref. The `.py.txt` path suffixes intentionally prevent Python imports and default test discovery in the active repo. Restoring the historical runnable tree must be done in an isolated Git worktree at the source commit, for example:

```bash
git show 8192a4a754be58d08d2620ad99888fcbfd2a75d0:scripts/research/challenger_v2_event_register.py
git worktree add --detach /tmp/challenger-v2-pre-v2-1 8192a4a754be58d08d2620ad99888fcbfd2a75d0
```

The current production/research algorithm remains `OBSERVABLE_EVENT_QUALIFICATION_V2_1`. Do not score a current event or run an automation from these archival copies. No model calibration or trading authority is implied.
