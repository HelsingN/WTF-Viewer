# Challenger v2 — single-model migration execution plan

**Prepared:** 2026-11-03  
**Status:** ACTION PLAN / NOT EXECUTED / NO CUTOVER  
**Design issue:** [#131](https://github.com/HelsingN/AI_CapEx_Reversal/issues/131) · **Draft design PR:** [#132](https://github.com/HelsingN/AI_CapEx_Reversal/pull/132)  
**Authority:** research-only. No change to Champion, broker, decision engine, Strategy D or trading.  
**Goal:** replace the *regular* Challenger v1 evaluation with one v2 process without simultaneously running or publishing two recurring Challenger scores. Preserve v1 vintages as immutable history.

## 0. Execution order and critical path

| Gate | Priority | Concrete output | Acceptance / stop condition | State |
|---|---|---|---|---|
| **A. Inventory + freeze** | P0 | Current producers/consumers of Challenger score, dated v1 archive and exact activation surface | Known GitHub and connected Automations owners identified; verify unknown external owners again at cutover | DISCOVERY DONE / external check pending |
| **B. Fix core cohort & evidence definitions** | P0 | Three versioned issuer rosters, accounting crosswalk, scoring decision rules, missing-data policy | Prospective research cohort, weights and 20pp/10pp WATCH rules approved; issuer source/PIT and borrower-level certification still pending | RESEARCH METHOD APPROVED / SOURCE CERTIFICATION OPEN |
| **C. Register event overlays** | P0 | R3/R5/R6/R7 two-sided ledger rules and finite freshness/expiry | Existing cases inventoried; no unsupported positive/negative event points; reviewers approve qualifying future entries | INITIAL TRIAGE DONE / scoring gate OPEN |
| **D. One-time historical acceptance test** | P1 | Finite PIT replay, error register, 3 alternative parameter sets and chosen parameter manifest | Five dates and three predeclared settings tested as explicitly POSTHOC; no predictive validation or new alert bands | ARITHMETIC REPLAY DONE / ACCEPTANCE OPEN |
| **E. Approve v2 contract and research code (release 1)** | P1 | Reviewed PR #132 merged with latest-head CI; calculator remains dormant | Reviewer PASS + CI; no scheduled second model and no new trading authority | OPEN |
| **F. Atomic activation (release 2)** | P0 after E | Separate cutover PR and external scheduler change where applicable; exactly one regular Challenger | Named effective as-of, rollback procedure, explicit owner/reviewer PASS, no concurrent v1/v2 production | BLOCKED until A–E |
| **G. Verify first v2 observation** | P1 after F | Versioned v2 snapshot, quality/coverage report and single weekly/Daily Close Challenger section | Correct output schema, exact/interval and category handling; no stale v1 alert copied forward | BLOCKED until F |

**Critical path:** A → B/C → D → E → F → G. B and C can be developed together; do not start recurring v2 while D/E are open.

**Research review 4-Nov:** [cohort, levels and threshold decision](CHALLENGER_V2_COHORT_LEVEL_THRESHOLD_REVIEW_2026-11-04.md) and [prospective frozen YAML](../../data/research/challenger/challenger_v2_research_approved_cohort_2026-11-04.yaml) are now accepted as an uncalibrated research specification. This is NOT a PR reviewer PASS, not a live cutoff and not certification of every issuer source/time.

## A. Inventory: exact existing integration touchpoints

1. Inventory files, current Challenger observations and YAML schemas, source and report-producing scripts, GitHub Actions, and scheduled agent/report prompts.
2. GitHub main tree inspected 2026-11-03: .github/workflows/ci.yml and .github/workflows/issue31-sim-drill.yml; no dedicated Challenger production cron found *in these workflows*. This does **not** prove there is no external scheduler. The user has daily-close/event-alert research workflows; inspect their actual definitions before cutover and record which writes or repeats Challenger values.
3. Freeze the v1 historical artifact list and checksum/commit references (Sep 9/16/23/30, Oct 7/14, Nov 2 and outcome files). Do **not** re-label or retroactively recompute those scores. Store v1 final-current observation reference and its publication provenance.
4. Enumerate all human-readable weekly/daily report fields that currently display "Challenger score/state/stage"; identify every source that might copy forward old v1 output without recomputation.
5. **Gate A:** inventory names exactly one future owner for calculating and publishing Challenger, and identifies all v1 scheduled paths that must be retired together. Unknown external scheduler ownership is a cutover blocker, not a reason to rebuild v1.

## B. Core R1/R2/R4: fixed cohort, finite evidence and missing-data policy

1. Create versioned roster files for R1, R2 and R4, each including company ID, economic role, **fixed within-factor weight**, disclosure cadence, accepted source and accounting comparator. R1/R2 candidate issuers from existing research: MSFT, GOOGL, AMZN, META, ORCL; **candidates only**, not approved membership/weights. R4 must distinguish IG hyperscalers from public project-financed/neocloud borrowers (e.g. CoreWeave/IREN already in research); retain private Lambda financing as event-level **counterevidence**, not a mandatory recurring core issuer. Do not select issuers because of their current level or ease of reporting.
2. For each eligible issuer define *one* decisive within-company numerator/denominator and lookback: R1 growth in monetization versus matched investment with an observable deteriorating intensity cross-check; R2 same-definition OCF/cash-PPE/lease-inclusive FCF trends; R4 contracted/drawn financing, financing spreads/covenants/guarantees **separately**. Avoid assigning R4=2 merely on new debt or a negative outlook.
3. Choose evidence classifications (PRIMARY_FACT, INDEPENDENT_CONFIRMATION, other context only), first-public times, and data eligibility. Prefer direct issuer IR/SEC and contracted credit terms; if not obtainable, return UNKNOWN after bounded attempts.
4. Approve level 0/1/2 rules, including whether v2 draft R1 >=20pp divergence and two observations for R2 remain diagnostic thresholds. **Do not tune them to obtain the old 67.5.** Do not automatically transfer historical R2=2 to every v2 issuer.
5. Preserve fixed weights for missing issuers and compute interval [minimum, maximum] without renormalizing. A late quarterly filing updates only that issuer when public; newer reports cannot be backdated to period end. Apply the same cohort_version frozen before every PIT cutoff.
6. Reviewer decides provisional 70% coverage criterion and maximum staleness of 150d for R1/R2 and 180d for R4 (or revises by explicit version), while retaining a bounded result even below that coverage.
7. **Gate B:** one schema-validated roster plus source ledger per factor and documented handling for missing issuer, delayed report, stale issuer, incomparable lease treatment, and adverse/refuting observations. If crucial records are inaccessible, mark issuer UNKNOWN and **finish the bounded pass**; do not reopen a broad private-data investigation.

## C. Two-sided supplemental events R3/R5/R6/R7

1. Define one register with event ID, causal root, independently measured effect, company/project, factor, signed impact, source, first-public time, confidence, counterevidence, EVENT versus STATE, review/expiry and supersession.
2. Permit only reviewed, PIT-eligible events at HIGH/MEDIUM confidence. Examples: verified worsening and **improving** project payback (R3); contract cancellation versus fulfilled collection (R5); failed conversion versus independently evidenced utilization (R6); economic cancellation versus financing-backed restart (R7).
3. Non-observability is NOT_OBSERVED (zero **incremental** event points but not proof of neutral economic condition); do not require unpublished IRR, MW utilization or private terms.
4. Evaluate provisional caps ±4/±3/±4/±4 points, signed strength ±0.5/±1 and separate transient fading and persistent-state review-by. Document why events expire without erasing history; explicit supersession if project resumes.
5. Enforce one economic effect counted once. A common financing announcement cannot raise R4, R5, R6 and R7 absent independently verified, materially distinct consequences.
6. **Gate C:** include at least one accepted positive event, accepted negative event, expired event, context-only/LOW-confidence item and duplicate in test fixtures; score change and exclusions are explained.

## D. One-time historical check, not a second recurring Challenger

Use **only** the saved PIT research vintages, not retrospectively substituted future disclosures. Proposed sample: 2026-09-09, 2026-09-23, 2026-10-07, 2026-10-14 and 2026-11-02, plus one later falsifying/anti-reversal event if already public by its chosen cutoff. Vintages unavailable or lacking first-public proof become UNKNOWN; do not fabricate issuer events to complete a run.

1. Freeze both the parameter set and the input source manifests *before* running this one-off replay. Do not copy v1 level vectors into v2 core by default.
2. Record per-vintage coverage, factor intervals, event adjustment, exclusions, legacy reference label (informational only) and whether evidence would have permitted a narrower claim.
3. Run limited sensitivity on **three predeclared** event-cap/coverage settings (base, no-event-overlay, conservative) to identify excessive event dominance, category instability and missingness sensitivity. Do not optimize on a five-point historical sample or advertise predictive validation.
4. Test against factual counterexamples (successful credit closings, strong monetization, supplier anti-reversal) as well as negative cash/project signals. If records are too sparse, report "insufficient to calibrate"; do not infinite-loop sourcing.
5. Establish new v2 bands **or** deliberately keep category UNKNOWN/UNCALIBRATED while continuing research-only monitoring. Reuse of v1 ALERT thresholds without fresh justification is prohibited.
6. **Gate D:** documented reproducible bounded results and explicit acceptance of chosen provisional parameters, known weaknesses and false-positive risks. An uncalibrated result may be accepted as an *experimental numerical interval*, not an operational alert classification.

## E. Merge design safely, without activating a second model

1. PR #132 currently contains the contract, the pure calculator, CLI, input template, tests and cutover documentation. Keep it draft until finite review, then apply repository PR governance.
2. Ensure tests for: missingness without renormalization, mixed issuer report vintages, PIT chronology, event expiry, independently negative event influence, duplicate evidence, impossible dates, deterministic output, and NO_TRADE isolation. Latest branch CI PASS must correspond to exact head SHA and valid merge base.
3. Reviewer explicitly accepts code and **research-only** status. Merge this inactive module as release 1. The presence of code in main is *not* cutover approval.
4. **Gate E:** PR #132 accepted and merged after required CI + authorized reviewer PASS, with NO scheduled v2, no model-score input to Champion or broker, no historical rewrites.

## F. Atomic cutover to a single regular Challenger

**Requires explicit authorization of an effective date and the actual scheduled owner. Do not do this inside the current design PR.**

1. In a separate bounded activation PR based on updated main, wire **one** approved collector/report generator to the frozen roster and v2 schema. Disable every v1 regular calculation and stale-score carry-forward in the **same operational change**. For externally managed ChatGPT schedules/prompts, change the **existing** corresponding tasks rather than creating a concurrent v2 task; verify external modification separately.
2. Before switch, capture final v1 snapshot reference and last v1 as-of; configure v2 version and first permissible cutoff. Output new v2 score bounds plus source/coverage status; old v1 score is archival only.
3. Fail closed: if latest eligible evidence, roster, source timestamp, CI or scheduler ownership is insufficient, publish UNKNOWN/LOW_COVERAGE with reasons, **not** fallback to a v1 number or fake 0/1.
4. Refuse any new v2 "ALERT" when new bands are uncalibrated; research-only state is allowed. No Champion trading authorization.
5. **Gate F:** one scheduled owner, one produced Challenger record per reporting event, no simultaneous regular v1 score, latest head/base tests PASS, reviewer PASS, authorized effective cutoff documented. If uncertain, leave existing v1 process unchanged and v2 prototype dormant.

## G. Verify and operate with bounded ongoing work

1. Inspect **first v2 run**: one record, valid as-of, issuer coverage, bounded scores, event ledger, exclusions and source links; confirm reports and notifications do not claim v1 and v2 are directly comparable.
2. Add a weekly consistency test (schema version, first-public <= cutoff, cohort version, missing-data status, no duplicate economic effects, event expiry). Do not force new issuer research when sources have not updated.
3. Follow issuer disclosures and the ledger's next-review triggers. Each evaluation uses the finite source pass defined in v2 contract; store ASSessed/ASSESSED_WITH_UNCERTAINTY/UNKNOWN/BLOCKED with explicit reason. No perpetual R2 forensic loop without a new material contradiction.
4. Monitor outcome quality prospectively at 2/4/8/12 weeks and two earnings cycles if possible; **this validates the new model over time** but does not require keeping v1 running.
5. If a critical defect appears, stop publication of authoritative v2 classifications, retain read-only evidence and report UNKNOWN/RESEARCH_BLOCKED. Reversion to v1 requires a **separate explicit governance decision**, never automatic dual-running.
6. **Gate G:** versioned v2 record accepted, old v1 feed retired, tests and observability pass, no research score influencing trades.

## Finite stopping policy for every phase

Maximum required documentary pass per issuer/factor: (1) latest eligible primary disclosure, (2) previous within-issuer comparable disclosure, (3) at most targeted independent contradiction check where needed. Missing private data and inaccessible trade-level credit spreads remain declared UNKNOWN or ASSESSED_WITH_UNCERTAINTY. Critical errors (PIT leakage, bad definitions, double counting, unsound dates, invalid arithmetic) are BLOCKED until fixed. Escalate only a **named decision-material** discrepancy; do not audit all earlier research again.

## Completion definition

- ONE future Challenger; no regular two-model calculation.
- v1 historical observations unmodified and no legacy category imported.
- Fixed sample, visible coverage and uncertainty interval, two-sided evidence and expiry, PIT compliance, qualified counterevidence.
- One-time historical check and latest-head CI/reviewer approval documented.
- No Champion/broker/trading changes. Research-only results until separately validated.

**Progress recorded 2026-11-03:** Phase A source-and-owner inventory complete with an external-owner limitation: [phase A](CHALLENGER_V2_PHASE_A_INVENTORY_2026-11-03.md). Phase B direct issuer source-pair recovery gives 5/5 computed enterprise R1 WATCH candidates, **5/5 tentative R2 WATCH** under the proposed >=10pp cash-FCF/OCF deterioration rule, and 2/7 provisional R4 credit candidates, but **roster, levels and thresholds are not yet approved**: [quantitative decision report](CHALLENGER_V2_PHASE_B_QUANTITATIVE_DECISIONS_2026-11-03.md). Initial research and draft fixed-issuer cohort were catalogued in  [phase B](CHALLENGER_V2_PHASE_B_SOURCE_REUSE_2026-11-03.md) and [candidate YAML](../../data/research/challenger/challenger_v2_candidate_cohorts_2026-11-03.yaml). Phase C existing event triage is also saved: [phase C](CHALLENGER_V2_PHASE_C_EVENT_TRIAGE_2026-11-03.md); no unqualified historical v1 event levels were converted into new signed points. Conservative verified known-public-by PIT input support added. Source-limited one-time post-hoc replay and three sensitivity settings are documented in [Phase D one-off replay](CHALLENGER_V2_PHASE_D_ONE_OFF_REPLAY_2026-11-04.md); R2/R4 rules in [Phase B decision rules](CHALLENGER_V2_PHASE_B_R2_R4_DECISION_RULES_2026-11-04.md). No live v2 Score or validated category, and no activation; latest PR head CI must pass and reviewer must accept. PR #132 remains draft.
