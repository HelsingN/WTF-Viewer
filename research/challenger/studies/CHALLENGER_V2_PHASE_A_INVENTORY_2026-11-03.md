# Challenger v2 migration — Phase A inventory of existing research and owners

**Checked:** 2026-11-03 (retrospective repository and automation inspection). **Status:** PHASE A DISCOVERY COMPLETE / NO CUTOVER. **Issue:** #131; draft PR #132.  
**Scope:** sources and known scheduled publishers. This is not a certification that every external human-managed process has been audited.

## A1. Single source of truth and archived historical evidence

GitHub repository: HelsingN/AI_CapEx_Reversal. Current main tree was enumerated by GitHub git/trees/main?recursive=1 (417 entries, no truncation). Versioned v1 snapshots already reside at:

- data/research/challenger/ai_roi_challenger_2026-09-09.yaml
- data/research/challenger/ai_roi_challenger_2026-09-16.yaml
- data/research/challenger/ai_roi_challenger_2026-09-16_vendor_supported_demand.yaml
- data/research/challenger/ai_roi_challenger_2026-09-23.yaml
- data/research/challenger/ai_roi_challenger_2026-09-30.yaml
- data/research/challenger/ai_roi_challenger_2026-10-07.yaml
- data/research/challenger/ai_roi_challenger_2026-10-14.yaml
- data/research/challenger/ai_roi_challenger_2026-11-02.yaml
- data/research/challenger/outcome_review_2026-10-14.json
- data/research/challenger/outcome_review_2026-10-14_2w_asof_2026-10-28.json

These remain read-only archival v1 documents; historic v1 score/level/stage cannot be relabelled as v2. A one-off v2 replay must distinguish *retrospective research* from a truly pre-committed historic live roster: the roster defined in November was NOT previously frozen in September; never backdate cohort_frozen_at.

## A2. Existing research documents to REUSE (source map, not mandatory re-audit)

| Topic | Existing indexed files | What can be reused | Known limit |
|---|---|---|---|
| Core R1 | Docs/research/AI_CAPEX_WEEKLY_WATCH_2026-09-09.md; AI_CAPEX_WEEKLY_WATCH_2026-10-14.md; AI_CAPEX_DAILY_CLOSE_2026-10-28.md; 2026-10-29.md | Azure/Google Cloud/AWS growth and capital deployment trajectory; issuer IR pointers | Cloud-segment sales and issuer-wide cash PPE are *not matched AI-only ROI*; Meta/Oracle monetization denominators incomplete |
| Core R2 | CHALLENGER_R2_CASH_FLOW_PANEL_2026-11-02.md; CHALLENGER_R2_PRIMARY_FILINGS_2026-11-03.md; CHALLENGER_R2_META_SEC_RECONCILIATION_2026-11-03.md; CHALLENGER_R2_AUDIT_2026-11-03.md; AI_ROI_CHALLENGER_PIT_REASSESSMENT_2026-11-02.md | Five issuer OCF/PP&E proxies, pre/after periods, verified Meta lease-inclusive FCF, SEC/IR source links | Missing lease normalization on other issuers, Oracle prepayments, Amazon quarter versus TTM and exact issuer release minutes. Working historic v1 R2=2 is not a v2 issuer-level input |
| Core R4 | AI_CAPEX_WEEKLY_WATCH_2026-09-23.md; 2026-10-07.md; 2026-10-14.md; AI_CAPEX_FINANCIAL_CONTAGION_PHASE4_GATE_REVIEW_2026-10-18.md; NVIDIA_FORENSIC_FINANCING_ADDENDUM_2026-08-27.md; AI_FINANCING_CREDIT_STRESS_MONITOR_TEMPLATE.md | Oracle Jupiter price/syndication reports; CoreWeave and IREN SEC filing chronologies; Lambda *successful* financing; Meta project-JV and NVIDIA guarantee distinctions | Borrower/project SPV != automatically parent credit; project OAS/CUSIP time-series not free/verified; financing proposal != drawn amount; favorable financing must remain counterevidence |
| Event overlays R3/R5/R6/R7 | AI_CAPEX_WEEKLY_WATCH_2026-10-14.md; AI_ROI_CHALLENGER_PIT_REASSESSMENT_2026-11-02.md; AI_COMPUTE_ECONOMICS_EFFICIENCY_FRAMEWORK_v1.md | Existing documented case candidates, contract/project conditions and opposing data | Actual project IRR, individual contract cancellability and utilized/profitable MW largely UNKNOWN; no blanket +points for missing data |
| Physical P1–P4 | AI_CAPEX_WEEKLY_WATCH_2026-10-14.md; AI_CAPEX_DAILY_CLOSE_2026-10-28.md; 2026-10-29.md; 2026-10-30.md; 2026-11-02.md | Physical supply/ordering anti-reversal evidence; limited GPU pricing; technical WATCH | P1 renewal/utilization unavailable; Massive ETF data entitlement/rate limit; P1–P4 stay OUTSIDE Challenger v2 numeric score |
| Quality and governance | Docs/audits/2026-10-09_weekly_capture_completeness_audit.md; Docs/research/CHALLENGER_EVIDENCE_SUFFICIENCY_PROTOCOL_2026-11-03.md; Docs/REPOSITORY_GOVERNANCE.md | Finite evidence gate, PIT and PR CI/reviewer rules | Old audit checklists sometimes demand impossible exhaustive private data; **do not** confuse missing routine fields with a hard failure |

Source inventory reuse is prioritized: latest relevant SEC/IR release + predecessor already in these notes, with one targeted contradiction check only. Original filing line items need re-fetch ONLY if a selected decisive v2 classification depends on an unresolved difference.

## A3. Scheduled owners / integration points actually inspected

GitHub main tree contains .github/workflows/ci.yml and .github/workflows/issue31-sim-drill.yml; no dedicated Challenger-specific scheduled GitHub Actions job was identified. scripts/research/check_challenger_r2_2026_11_02.py is a **manual historic v1 arithmetic check**, not a recurring pipeline. scripts/research/validate_weekly_capture.py is CI quality checking, not a Challenger publication engine. v2 draft contains **no scheduler integration**.

Automations privately inspected via the connected Automations source (17 task records):

- **ACTIVE** AI CapEx Daily Close, task 6ad349b76e888191a0718c17490aecee: weekday consolidated report (scheduled until 17-Nov-2026) requests narrative Champion F1–F5 / Challenger R1–R7 / P1–P4 and tries GitHub persistence. This is a *report owner*, not evidence of a deterministic challenger recalculation on each run.
- **ACTIVE** AI CapEx Event Alerts, task 6ad3499ec12881919d2b53bbaac7d840: hourly event notice (limited date schedule) refers to Challenger R1–R7 alongside other states. It is a *notification owner*; do not publish a second numeric Challenger score for each alert.
- **DISABLED** Challenger — пересчёт 02.11, task 6ae996eeda108191bce7986037576203: historical one-time v1 recalculation, already inactive.
- **DISABLED** AI CapEx Watch, task 6a7b95e7a6b08191b33981ec69d01994: formerly weekly detailed AI CapEx monitoring, not currently a live parallel run.
- Other inspected active tasks concern vacancies; irrelevant to Challenger. This only covers the currently connected Automations account, not unknown separate cloud deployments or manually scheduled external software.

**Proposed single ownership after cutover:** one versioned Challenger v2 numerical snapshot is produced from one approved data bundle by one report owner (Daily Close or delegated single research collector); hourly Event Alerts report *new event provenance* and may reference the latest already accepted v2 snapshot, **but must not calculate or silently carry forward a fresh score**. Changing either existing automation's prompt must happen in the atomic cutover stage F, not now. They currently remain unchanged.

## A4. Known collision / migration risks

1. More than one narrative report may mention "Challenger R1–R7" and stale v1 67.5. All publishing prompts must explicitly say "v2" only **after** cutover and forbid v1 score carry-forward.
2. v2 needs fixed issuer cohorts; old v1 levels cannot be mapped directly into per-issuer R1/R2/R4 observations or a new v2 point score.
3. The existing v2 evaluator requires cohort_frozen_at <= as_of. September historical vintages cannot truthfully use a November cohort freeze date; the acceptance replay must clearly be labelled *post-hoc methodological research* or use a separate explicit replay mode rather than faking pre-registration.
4. Active alerts may end on Nov 17 by their existing schedule; any future continued operation needs separate consideration. Do not extend or alter schedule as part of discovery.
5. Large contract and financing headlines appear across R4/R5/R6/R7; keep unique root/economic-effect provenance and avoid same cash obligation in both core and overlay without a distinct observed outcome.

## A5. Phase A acceptance disposition

- [x] Main repository historical v1 snapshots and source paths enumerated.
- [x] Main-tree automation scripts and workflow paths inspected for direct Challenger scheduler.
- [x] Connected relevant active/disabled automations identified, prompts checked.
- [x] Reusable core and overlay research/audit document inventory with known PIT and comparability gaps.
- [x] Proposed single owner and explicit cutover instructions identified; **nothing activated**.
- [ ] At stage F reconfirm no separately managed external scheduler not exposed in this connected environment; cutover fails closed if conflicting external owner is discovered.

**Decision: PHASE A SOURCE/OWNER DISCOVERY ACCEPTED WITH EXPLICIT EXTERNAL-OWNER LIMIT. Proceed to B from existing documents.**
