# Challenger v2 event registry and QUALIFIED-triggered recalculation

**Sole current qualification policy:** [Observable event policy v2.1](CHALLENGER_V2_EVENT_POLICY_V2_1.md) (`OBSERVABLE_EVENT_QUALIFICATION_V2_1`). All active registration and reassessments use this policy; the preceding event qualification method is preserved for historical audit only. An independently evidenced observable economic change is sufficient; private GPU utilization and exact project IRR are not universal prerequisites. QUALIFIED signed payloads require the versioned observable-outcome fields and a coarse predeclared 0.5/1 impact tier.

**Contract:** research only. **Issue:** [#143](https://github.com/HelsingN/AI_CapEx_Reversal/issues/143).
This connects the existing hourly AI CapEx Event Alerts, Daily Close, weekly watch and
Challenger v2 scoring engine **without a second Challenger model**.
It never authorizes trades, automatically merges a PR or assigns old v1 alert bands.

## Event life cycle

```text
Source released → HIGH/CRITICAL classification (news priority)
→ REGISTERED (canonical economic event_key + deterministic EVT ID)
→ source/time/PIT and economic outcome review
     PENDING_REVIEW | NOT_QUALIFIED_CLOSED | CORE_ONLY (R1/R2/R4) | PHYSICAL_ONLY (P1-P4)
     MACRO_ONLY | CONTEXT_ONLY | EXCLUDED_DUPLICATE/OUT_OF_SCOPE
     QUALIFIED only when independent realized R3/R5/R6/R7 effect proven
→ append a review to the same durable event ID
→ on QUALIFIED (or later removal/correction of QUALIFIED):
     re-evaluate approved Challenger v2 frozen core AND all still-eligible
     independently signed events at this review cutoff
     preserve computed JSON under data/research/events/recalculations/
     and GitHub Actions run artifact → PR exact-head CI → human PASS → Merge
```

**Priority is not qualification.** Every HIGH/CRITICAL receives a registry ID
immediately after source publication is known, with original first-public
timestamp if actually verified, otherwise an explicitly labeled *conservative
known-public-by* timestamp and review PENDING/CONTEXT. A single economic
occurrence retains its identity across articles. An additional source URL does
not create a new economic event. The registration time must not predate public
availability; retrospective registrations are explicitly labeled BACKFILL and
do not pretend to have been captured live.

Stable IDs: `EVT-YYYYMMDD-XXXXXXXXXXXX`, where the 12 hex digits are the
first 12 digits of SHA-256 of the uppercase canonical `event_key`. The ID is
stable across subsequent assessments. Every event contains `source_refs`,
`priority`, `entity`, `event_date`, original/public-by publication time,
`registered_at` and **append-only** `reviews`, including reviewer,
`reviewed_at`, factor route and reason.

**PIT:** a known-public-by bound is not a precise first-public minute. Under the v2.1 observable-event policy it may qualify with an original dated proof URL and explicit public-by basis (never fictional first-public precision). Transient events require a separate verified occurrence time for proper decay. Promotion to QUALIFIED requires a
verified original availability time or conservatively proven public-by bound and original proof URL; the original registration
remains unchanged. `QUALIFIED` is allowed only with an admissible signed
`scored_event`: factor R3/R5/R6/R7, distinct `causal_root_id/effect_id`,
`PRIMARY_FACT` or `INDEPENDENT_CONFIRMATION`, MEDIUM/HIGH confidence,
independent counterevidence review, event type EVENT with expiry or STATE with
review-by, impact ±0.5/±1. The existing
`src/scoring/challenger_v2.py` checks duplicates, core overlap, freshness
and independent event effects. A news designation HIGH/CRITICAL never bypasses
these requirements.

## Early warning layer (does not change numeric v2)

An event with a credible but not yet QUALIFIED R3/R5/R6/R7 consequence may be
assigned an append-only `EARLY_WARNING` review. It is a **research observation
only**, not a new score or new event ID, and it must not contain `scored_event`.
A valid warning must record:
- `factor` R3/R5/R6/R7; `direction` DETERIORATION, IMPROVEMENT or MIXED;
  `confidence` LOW/MEDIUM/HIGH;
- evidence URLs or existing repository references, a substantive `reason`,
  `counterevidence`, and explicit `qualification_triggers`;
- `reviewed_at` and future `next_review_at`, so stale warnings are visible
  rather than silently disappearing.

Use `python scripts/research/challenger_v2_event_register.py --warnings`
to list current warnings and overdue reviews. A new review can retain,
downgrade, revoke or promote a warning to `QUALIFIED` only on new material evidence or proven error. A review deadline must not trigger a duplicate investigation with unchanged evidence. `NOT_QUALIFIED_CLOSED` provides the explicit stop-rule disposition and requires counterevidence, source references and specific reopen triggers. Only verified,
independent realized economic consequences with the signed-event payload
may trigger numerical Challenger v2 recalculation. A warning can be
actionable for monitoring without pretending the outcome is already realized.

### Dated research reviews (4 November 2026)

- **Galaxy Digital / CoreWeave** `EVT-20261027-1C51396E8F19`:
  R6 `EARLY_WARNING` direction IMPROVEMENT, MEDIUM. The issuer reported
  133 MW delivered, producing rent; Q3 data-center adjusted EBITDA
  increased. The 133 MW were already delivered by Q2; tenant GPU utilization,
  project FCF and return on deployed capital remain unresolved.
  Follow up: independently verify utilization, paid MW and project cash yield.
- **Anthropic amended SEC S-1/A** `EVT-20261102-6DFE079F76A6`:
  R3 `EARLY_WARNING` direction DETERIORATION, MEDIUM, R5 watch.
  Compute expense intensity increased quarter over quarter and very large
  future commitments were disclosed. Rapid revenue growth and substantial
  multi-period improvement are counterevidence. There is no verified
  project-level realized ROI collapse or counterparty cancellation/default.
  SEC acceptance timestamp establishes the source-availability upper bound,
  not necessarily the earliest public dissemination minute.

These reviews are appended to the original backfill entries; they do not
rewrite registration metadata and contribute **zero** signed delta while
in EARLY_WARNING. See the current registry for proof links, follow-up dates
and specific criteria for promotion to QUALIFIED.

## Storage and daily reconciliation

- `data/research/events/challenger_v2_event_registry.json`: durable identity +
  all dated review decisions.
- `data/research/events/daily_high_critical_index.json`: all HIGH/CRITICAL IDs
  by New York report date, plus daily count and source report status.
- `data/research/events/recalculations/EVT-..._TIMESTAMP_HASH.json`: immutable
  calculation outcome for each qualifying review and every later transition
  *out of QUALIFIED* (including correction, withdrawal, or changed evidence).
- `scripts/research/challenger_v2_event_register.py`: deterministic
  register/assess/check workflow, source chronology and recalculation.
- `Docs/research/AI_CAPEX_DAILY_CLOSE_YYYY-MM-DD.md`: original market-event
  inventory. The index and saved report must agree; missing registry IDs
  block a structurally validated COMPLETE review. The v2 signed event list
  is a subset of *qualified* registered high/critical occurrences, not all
  high/critical headlines.

During the **hourly** event-watch interval, before Daily Close exists,
registration can occur with an original HTTPS source. The daily index then
shows `PENDING_DAILY_REPORT` and never claims reconciliation. After the daily
report appears, update the index to `RECONCILED_TO_DAILY_LEDGER`. A new
dated Daily Close without a corresponding index fails CI. A pending HIGH/
CRITICAL candidate remains named and visible — it does not disappear into an
empty signed-event list.

Backfill: 26 unique saved HIGH/CRITICAL events dated 27-Oct–2-Nov 2026 have
been registered with stable IDs and **retrospective** availability bounds.
Galaxy Digital's revenue-generating 133 MW and Anthropic S-1/A compute/cash
economics are explicitly left PENDING for independent R6 and R3/R5 review.
There are **zero QUALIFIED claims** in this backfill; no fabricated numerical
event adjustment or new prospectively observed score is introduced.

## Operational commands (run from repo root, Python 3.11)

Register original source event:
```bash
python scripts/research/challenger_v2_event_register.py --register event_input.json
```

`event_input.json` contains at least:
```json
{
  "event_key": "EXAMPLE-ECONOMIC-OCCURRENCE-20261104",
  "event_date": "2026-11-04",
  "priority": "HIGH",
  "entity": "Sample issuer",
  "title": "A specifically dated and independently sourced event",
  "source_refs": ["https://issuer.example.com/filing"],
  "first_public_at": "2026-11-04T10:00:00-05:00",
  "source_precision": "FIRST_PUBLIC_VERIFIED",
  "registered_at": "2026-11-04T10:08:00-05:00"
}
```
The script assigns the ID deterministically and appends an initial
`PENDING_REVIEW`. It also updates the daily index even if Daily Close is
not yet published.

Assess the event by supplying a separate review JSON with `id`,
`decision`, `factor`, `reason`, `reviewer`, `reviewed_at`.
Only for QUALIFIED, add `scored_event` matching the signed-event schema
in `Docs/AI_ROI_CHALLENGER_MODEL_v2.md`. If the original registration
contained `known_public_by_at` rather than verified exact time, the review
must also supply `first_public_at_verified` and
`publication_proof_url`.

```bash
python scripts/research/challenger_v2_event_register.py --assess review.json
python scripts/research/challenger_v2_event_register.py --reconcile-date 2026-11-04
python scripts/research/challenger_v2_event_register.py --check
```

On QUALIFIED, the **same --assess operation** runs
`evaluate_challenger_v2()` at the actual review time and saves a new
recalculation JSON. Later corrections that remove qualification also
recalculate rather than silently retaining the old effect.

Core source selection is **latest reviewed eligible weekly v2 snapshot** if
available; otherwise, the previous one-off reviewed source panel is used
with all source PIT/expiry constraints re-evaluated at the new cutoff.
This fallback is *not new issuer data*. After source expiry, R1/R2/R4
observations become UNKNOWN and the recalculated interval widens; an
accepted signed event does not guarantee a precise or even sufficiently
covered current core.

CI runs the same validation on every PR and main push; missing, altered,
backdated or improperly qualified events **fail**. Read-only CI uploads
recalculated JSON into its GitHub Actions artifacts (30-day retention) for
independent audit. The **durable** canonical copy belongs in the PR under
`data/research/events/recalculations/`, and the PR must pass CI before
owner review and merge. CI never directly pushes to main.

**Important practical limit:** scripts do not search public news by themselves.
AI CapEx Event Alerts and Daily Close still collect and source-classify
announcements. The connected automation must actually save the event
through GitHub issue → branch → PR (or report a collection/persistence
failure) to invoke this pipeline. No uncommitted ChatGPT response is
misrepresented as a saved registered event.

## Reviewer checklist

- Stable occurrence key, no repeat of same issuer economic outcome under new
  article URL, source PIT and counterevidence verified.
- All HIGH/CRITICAL in saved Daily Close are represented and explained, not
  merely QUALIFIED examples.
- Scored events are independently realized outcomes, not announced plans,
  hypothetical ROI or repeated R1/R2/R4 credit/CapEx facts.
- QUALIFIED transition produced a matching saved recalculation artifact;
  v2 factor coverage, bounds and expiry were recomputed, not carried over.
- CI latest tested SHA PASS and explicit human reviewer PASS, then merge.
- `calibration=UNCALIBRATED`, `category=null`,
  `trading_signal=false`; no broker, Champion or scheduling cutover.
