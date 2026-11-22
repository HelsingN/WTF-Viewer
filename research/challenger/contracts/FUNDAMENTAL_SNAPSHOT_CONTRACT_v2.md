# Fundamental Snapshot Contract v2

**Версия:** 2  
**Создан:** 9 сентября 2026  
**Last status sync:** 2026-09-23  
**Статус:** Phase 1 / Paper-first / CURRENT SOURCE OF TRUTH  
**Runtime schema:** `ai-capex.fundamental-snapshot.v2`  
**Tracking:** GitHub Issue #12; parent documentation audit Issue #11

> **v2 is a schema-governance boundary, not a trading-model retune.** Component scores, F1..F5 scale/values, Strategy weights, technical-v1, broker rules and execution rules are unchanged by this version transition.

## 1. Purpose

The Fundamental Snapshot is the strict normalized runtime boundary between research evidence and the deterministic Decision Engine.

```text
Weekly / event research
        ↓
evidence classification + forensic cross-check
        ↓
CURRENT Fundamental Snapshot v2
        ↓
strict validation
        ↓
SQLite persistence / latest-current reader
        ↓
Decision Engine input
```

Research prose may be richer than the runtime schema. A research-only field does not become a runtime field merely because it appeared in one weekly capture.

LLM/research output cannot directly authorize a trade.

## 2. Schema identity and version boundary

Current runtime payloads must declare exactly:

```text
schema: ai-capex.fundamental-snapshot.v2
```

The previous identifier:

```text
ai-capex.fundamental-snapshot.v1
```

is **legacy provenance only**. Historical v1 payloads are retained for audit/replay but are not accepted as current runtime inputs.

Reason for the version boundary:

- the original 19-Aug v1 predated the forensic extension;
- the 27-Aug forensic extension materially changed the required shape without changing the schema identifier;
- the 2-Sep research normalization added additional research-only top-level blocks and composite evidence-class labels that were not accepted by the strict runtime model;
- v2 restores one schema identifier → one strict runtime shape.

Do not regain compatibility by weakening `extra="forbid"`, making required forensic fields optional, or widening evidence enums ad hoc.

## 3. Repository layout

Current runtime-normalized snapshots:

```text
data/fundamentals/current/
```

Historical immutable provenance:

```text
data/fundamentals/history/
```

Current canonical fixture at v2 creation:

```text
data/fundamentals/current/fundamental_snapshot_2026-09-02-v2.yaml
snapshot_id = fundamental-2026-09-02-v2
```

Historical v1 files are not silently rewritten to conform to v2.

## 4. Required top-level fields

A current snapshot requires:

```text
schema
snapshot_id
as_of
created_at
status
confidence
components
triggers
forensic_states
```

Supported optional top-level fields include the explicitly modeled fields:

```text
research_period
supersedes
revision_decision
source_report
context
market_confirmation
memory_watch
key_evidence
financing_architecture
revision_summary
notes
peak_earnings_risk
market_wide_credit_stress
```

Unknown top-level fields fail closed.

In particular, one-off research structures such as:

```text
state_delta_vs_previous
backlog_quality_watch
```

do not become top-level runtime fields in v2. Their information may remain in the source research report, be represented by an already-modeled state/evidence record, or require a future versioned schema change if a durable runtime use case is proven.

## 5. Exact date and confidence semantics

`as_of`, `created_at`, and optional evidence `as_of` use date-only semantics:

```text
YYYY-MM-DD
```

Datetime/timestamp values in date-only fields fail closed rather than being truncated.

`confidence` is a finite JSON number in `[0.0, 1.0]`. Strings, booleans, NaN and infinity are invalid.

## 6. Component scores and Fundamental triggers

Normalized component scores remain `0..100`, where higher means stronger reversal/stress evidence:

```text
hyperscaler_capex
fcf_pressure
neocloud_credit
gpu_oversupply
semiconductor_guidance
rpo_backlog
```

Fundamental triggers retain the Strategy scale:

```text
F1 Hyperscaler CapEx Discipline          0..2
F2 GPU Compute Oversupply                0..2
F3 Neocloud / Credit Stress              0..2
F4 Semiconductor Guidance Deterioration  0..2
F5 RPO / Backlog Quality Deterioration   0..2

0 = absent
1 = weak/watch evidence
2 = confirmed
```

Schema v2 does not retune these values or introduce a hidden forensic score.

## 7. Required forensic states

Every v2 snapshot carries all eight states explicitly:

```text
physical_demand_state
end_customer_economics_state
financing_dependence_state
cash_conversion_state
counterparty_concentration_state
credit_market_state
circularity_risk_state
memory_cycle_state
```

Allowed vocabularies:

```text
physical_demand_state:
STRONG / TIGHT / NORMALIZING / WEAKENING / OVERSUPPLY / UNKNOWN

end_customer_economics_state:
STRONG / VIABLE_BUT_UNPROVEN / MIXED / DETERIORATING / UNSUSTAINABLE / UNKNOWN

financing_dependence_state:
LOW / NORMAL / ELEVATED / HIGH / CRITICAL / UNKNOWN

cash_conversion_state:
HEALTHY / WATCH / DETERIORATING / STRESSED / UNKNOWN

counterparty_concentration_state:
LOW / MODERATE / HIGH / CRITICAL / UNKNOWN

credit_market_state:
EASY / NORMAL / TIGHTENING / STRESSED / DISLOCATED / UNKNOWN

circularity_risk_state:
LOW / WATCH / ELEVATED / HIGH / UNKNOWN

memory_cycle_state:
SHORTAGE / TIGHT / BALANCED / DIGESTION / OVERSUPPLY / UNKNOWN
```

Insufficient evidence yields explicit `UNKNOWN`; it is not reconstructed by guesswork.

`circularity_risk_state` is a structural financing-risk classification, not an accusation of fraud or illegality.

## 8. Evidence taxonomy

Every `key_evidence` record uses exactly one frozen class:

```text
PRIMARY_FACT
MANAGEMENT_CLAIM
INDEPENDENT_CONFIRMATION
```

Composite ad-hoc classes such as:

```text
PRIMARY_FACT_AND_MANAGEMENT_DISCLOSURE
PRIMARY_FACT_PLUS_SECONDARY_ANALYSIS
```

are invalid in v2.

If one observation mixes materially different evidence types, split it into separate evidence records or keep the interpretive prose in the source research document.

Evidence fields supported by the runtime include:

```text
entity
metric
observation
direction
evidence_class
source_type
source_reference
counterparty_if_any
independent_confirmation_state
confidence
interpretation
contradicting_evidence
notes
as_of
```

`independent_confirmation_state` is a separate dimension:

```text
CONFIRMED
PARTIAL
UNCONFIRMED
CONTRADICTED
NOT_APPLICABLE
```

A `MANAGEMENT_CLAIM` never changes evidence class automatically merely because a separate confirmation exists.

## 9. Financing architecture

`financing_architecture` remains sparse-by-design. Supported fields include:

```text
borrower
customer
project
lender
investor
arranger
vendor
guarantor
credit_enhancer
offtaker
collateral
amount
pricing
spread
coupon
maturity
amortization
rating
covenants
take_or_pay
minimum_revenue_commitment
residual_value_guarantee
vendor_financing
extended_payment_terms
refinancing_dependency
customer_concentration
source_reference
confidence
notes
```

Unknown economics are left absent/unknown rather than fabricated.

## 10. Context blocks vs normalized decision identity

The runtime model permits explicit research/context blocks:

```text
context
market_confirmation
memory_watch
revision_summary
notes
```

They are preserved in the raw payload for forensic replay. The current SQLite normalized columns and immutable duplicate identity are based on the strict normalized fields, evidence and financing architecture already implemented by Issue #5.

Therefore Decision Engine code must not silently depend on a context-only field that is not part of the normalized persisted contract. Promoting such a field into deterministic runtime logic requires an explicit contract/schema/version decision.

`peak_earnings_risk` and `market_wide_credit_stress` are lifted from `context` into explicit normalized fields when present.

## 11. Persistence and physical DB schema

Logical snapshot schema version and physical SQLite schema version are separate concepts.

Current state:

```text
Fundamental logical schema: ai-capex.fundamental-snapshot.v2
SQLite physical schema:     v9 (PRAGMA user_version = 9)
```

The v2 logical boundary did **not** require a SQLite bump; v3 already persisted the required normalized fields, evidence, financing architecture, raw payload and append-only status events. v4 is additive (`decisions` table) and does not change fundamental snapshot tables. v5 is additive (`reversal_drivers`, `strategy_evaluations`) and does not change fundamental snapshot tables. v6 is additive (`instrument_candidates`) and does not change fundamental snapshot tables. v7 is additive (`option_candidates`) and does not change fundamental snapshot tables. v8 is additive (`risk_evaluations`) and does not change fundamental snapshot tables. v9 is additive (`trade_proposals`, `approval_records`) and does not change fundamental snapshot tables.

Do not bump SQLite schema version solely to mirror the logical document version.

## 12. Immutability, duplicate and correction semantics

`snapshot_id` is immutable and database-unique.

Exact duplicate:

```text
same snapshot_id
same normalized fields + evidence + financing architecture
→ idempotent duplicate success
```

Conflict:

```text
same snapshot_id
different normalized content
→ fail closed
```

Never overwrite the first accepted logical snapshot.

Corrections/version changes are append-only:

```text
old snapshot remains
new snapshot_id created
supersedes points to prior logical record where appropriate
```

The current schema-v2 normalization is:

```text
fundamental-2026-09-02-v2
supersedes fundamental-2026-09-02-v1
```

because v2 is the schema-governed successor to the historical 2-Sep v1 normalization, not a rewrite of it.

## 13. Current-schema latest reader

`get_latest_current_snapshot()` may use only records whose stored `schema` equals the current `SCHEMA_NAME` (`ai-capex.fundamental-snapshot.v2`).

Historical v1 rows may remain physically present for provenance but must not become current Decision Engine input merely because their `status` field says `VALID`.

Current selection also excludes:

- snapshots effectively marked `OBSOLETE` through append-only status events;
- snapshots superseded by a later record in the stored lineage.

If no eligible current-schema snapshot exists:

```text
current fundamental state = UNKNOWN / no current snapshot
```

Do not silently fall back to a legacy schema.

## 14. Staleness

`as_of`, status and event-driven invalidation are part of the contract.

The project has not yet approved a universal time-based freshness TTL. Issue #5 intentionally did not invent one. TTL/freshness ownership remains a Decision Engine design item.

Until explicitly versioned/configured, do not add an arbitrary age threshold during schema or documentation cleanup.

## 15. Canonical v2 normalization — 2026-09-02

The v2 normalization preserves the approved 2-Sep research state:

```text
confidence                   0.90
hyperscaler_capex            15
fcf_pressure                 60
neocloud_credit              35
gpu_oversupply               10
semiconductor_guidance       20
rpo_backlog                  10
F1                           0
F2                           0
F3                           1
F4                           0
F5                           0
physical_demand_state        STRONG
financing_dependence_state   HIGH
cash_conversion_state        WATCH
counterparty_concentration   HIGH
credit_market_state          NORMAL
circularity_risk_state       ELEVATED
memory_cycle_state           SHORTAGE
```

No component or trigger was changed to make the file fit the schema.

The former 2-Sep `state_delta_vs_previous` and `backlog_quality_watch` structures remain research provenance in `Docs/research/AI_CAPEX_WEEKLY_WATCH_2026-09-02.md`; they are not silently promoted into the current runtime schema.

## 16. Auditability

For a future proposal it must be possible to reconstruct:

```text
proposal
→ fundamental snapshot_id
→ logical schema version
→ normalized components / F1..F5
→ forensic states
→ evidence records and evidence class
→ financing architecture where present
→ raw payload / source references
```

Proposal linkage is still a future Decision/Proposal slice; schema v2 does not claim that it already exists.

## 17. Change control

A backward-incompatible change to required fields, enums, normalized semantics or Decision Engine-consumed fields requires a new logical schema version.

Examples that require review/versioning:

```text
new required forensic dimension
widened evidence taxonomy
new normalized state consumed by Decision Engine
changed trigger/component semantics
changed immutable identity semantics
```

Examples that do not by themselves require a DB migration:

```text
new logical schema identifier using existing persisted columns
research prose changes
new source references
new historical provenance file
```

Any trading-meaning change must also follow Strategy/version governance. Fundamental schema evolution is not a back door for changing Combined Score weights or trade rules.

## 18. Related sources of truth

```text
Docs/AI_CapEx_Reversal_Strategy_v1.3.md
Docs/AI_CapEx_Reversal_Architecture_v1.2.md
Docs/AI_CapEx_Reversal_Phase1_5_Plan_v2.6.md
Docs/AI_FINANCING_CREDIT_STRESS_CONTRACT_v1.md
src/fundamentals/models.py
src/fundamentals/repository.py
data/fundamentals/README.md
```

Historical Contract v1 is retained for provenance under `Docs/archive/legacy/`; the compatibility pointer at `Docs/FUNDAMENTAL_SNAPSHOT_CONTRACT_v1.md` must not be treated as the current contract.
