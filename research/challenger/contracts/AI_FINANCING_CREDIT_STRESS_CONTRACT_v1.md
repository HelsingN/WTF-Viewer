# AI Financing / Circularity / Credit Stress Contract v1

**Дата:** 27 августа 2026  
**Last status sync:** 2026-09-09  
**Статус:** Phase 1 / Research + Paper-first  
**GitHub:** Issue #5 (runtime persistence/reader closed; Decision Engine consumption still open)

## 1. Назначение

Этот contract формализует forensic-слой проекта AI CapEx Reversal.

Главный вопрос слоя:

> **Какой экономический и кредитный механизм позволяет AI infrastructure demand продолжать расти, и существовал бы этот спрос в сопоставимом масштабе без внешнего финансирования, vendor support, guarantees, take-or-pay или credit enhancement?**

Слой не заменяет анализ физического спроса, memory cycle, technical regime или leadership. Его задача — обнаруживать ухудшение финансовой архитектуры **раньше**, чем оно обязательно проявится в GPU shipments, semiconductor revenue или headline CapEx.

## 2. Базовый принцип

Headline revenue, backlog, CapEx и management guidance не считаются достаточным доказательством устойчивости цикла.

Анализ должен разделять:

```text
physical demand
end-customer economics
financing architecture
cash conversion
counterparty concentration
credit-market validation
market / supply-chain confirmation
```

Пример двух разных режимов при одинаковом росте CapEx:

```text
A) CapEx funded from internal FCF + profitable workload demand

B) CapEx funded by debt + vendor guarantee + take-or-pay
   from a cash-burning AI lab + repeated refinancing need
```

Для reversal thesis это разные состояния даже при одинаковом reported CapEx.

## 3. Evidence taxonomy

Каждый material evidence record должен иметь `evidence_class`.

### PRIMARY_FACT

Предпочтительные источники:

```text
SEC / regulatory filing
audited or official financial statement
bond prospectus / credit agreement
material contract disclosure
official counterparty filing
rating-agency action / documented terms
```

`PRIMARY_FACT` означает, что зафиксирован сам раскрытый факт. Он не делает автоматически верной интерпретацию причины или будущего эффекта.

### MANAGEMENT_CLAIM

```text
earnings call
prepared remarks
investor presentation
management interview
guidance narrative
statements about utilization / ROI / demand / supply
```

Management claim является evidence того, **что management это заявил**, но не независимым подтверждением содержания заявления.

### INDEPENDENT_CONFIRMATION

```text
customer / supplier / lender disclosure
counterparty filing
credit spread / debt pricing / rating change
observable utilization / rental pricing
secondary-market pricing
supply-chain pricing / lead times
market reaction / cross-market evidence
```

Независимое подтверждение должно происходить из источника, который не является тем же economic actor, чьё утверждение проверяется.

### Evidence discipline

Нельзя автоматически повышать confidence только потому, что один и тот же management claim многократно повторяется в earnings call, presentation и media interview.

## 4. Extended evidence record

Минимальные поля существенного datapoint:

```text
entity
metric_or_claim
value_or_direction
as_of
evidence_class
source_type
source_reference
counterparty_if_any
independent_confirmation_state
confidence
interpretation
contradicting_evidence
notes
```

`independent_confirmation_state`:

```text
CONFIRMED
PARTIAL
UNCONFIRMED
CONTRADICTED
NOT_APPLICABLE
```

## 5. Financing architecture record

Для material financing / infrastructure contract по возможности сохранять:

```text
borrower
project
customer
lender
investor
arranger
vendor / equipment supplier
guarantor / credit enhancer
offtaker
collateral
amount
pricing / spread / coupon
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
```

Неизвестные поля должны оставаться `UNKNOWN`, а не заполняться предположениями.

## 6. Forensic dimensions

### 6.1 Physical Demand

```text
physical_demand_state:
STRONG
TIGHT
NORMALIZING
WEAKENING
OVERSUPPLY
UNKNOWN
```

Sensors:

```text
GPU / accelerator shipments
HBM / DRAM / NAND demand
networking shipments
lead times
rental pricing
availability
utilization
secondary-market supply
pushouts / cancellations
```

### 6.2 End-Customer Economics

```text
end_customer_economics_state:
STRONG
VIABLE_BUT_UNPROVEN
MIXED
DETERIORATING
UNSUSTAINABLE
UNKNOWN
```

Sensors:

```text
AI lab revenue / cash burn
inference economics
price-per-token / compute trends
customer ROI disclosures
monetization vs infrastructure spend
cash runway
external funding need
```

### 6.3 Financing Dependence

```text
financing_dependence_state:
LOW
NORMAL
ELEVATED
HIGH
CRITICAL
UNKNOWN
```

Sensors:

```text
share of CapEx financed externally
secured debt
project finance
vendor guarantees
credit enhancement
extended payment terms
take-or-pay support
minimum revenue commitments
refinancing frequency
```

### 6.4 Cash Conversion

```text
cash_conversion_state:
HEALTHY
WATCH
DETERIORATING
STRESSED
UNKNOWN
```

Sensors:

```text
OCF vs earnings
FCF
accounts receivable / DSO
inventory
customer prepayments
supplier prepayments
purchase commitments
lease obligations
capitalized costs
```

### 6.5 Counterparty Concentration

```text
counterparty_concentration_state:
LOW
MODERATE
HIGH
CRITICAL
UNKNOWN
```

Track customer / borrower / guarantor / offtaker concentration in:

```text
revenue
RPO / backlog
project finance
credit guarantees
capacity reservations
```

### 6.6 Credit-Market State

```text
credit_market_state:
EASY
NORMAL
TIGHTENING
STRESSED
DISLOCATED
UNKNOWN
```

Sensors:

```text
SOFR spread / coupon
new issue yield
oversubscription quality
rating / outlook
covenant tightening
collateral requirements
refinancing terms
HY / sector spreads
private-credit terms
```

Low spread or oversubscription is evidence of current credit access; it is **not** proof that the underlying project economics are sustainable.

### 6.7 Circularity Risk

```text
circularity_risk_state:
LOW
WATCH
ELEVATED
HIGH
UNKNOWN
```

Possible evidence:

```text
vendor equity investment into customer
vendor guarantee / credit enhancement
vendor or hyperscaler as offtaker supporting project debt
customer financing used to purchase vendor hardware
residual-value risk transferred back to vendor
related ecosystem participants funding each other's commitments
repeated refinancing needed to sustain contracted CapEx
```

`circularity_risk_state` is a structural-risk classification, **not an accusation of fraud, Ponzi scheme or illegal conduct**.

## 7. Credit deterioration ladder

Track progression rather than isolated debt amounts:

```text
equity funding
→ secured debt / project finance
→ vendor guarantee / credit enhancement
→ refinancing dependence
→ spread widening / covenant tightening
→ restructuring / maturity extension
→ cancellation / project delay / capacity release
```

A move rightward on this ladder is stronger reversal evidence than a large absolute debt balance by itself.

## 8. Circular financing graph

For major transactions, the research layer should be able to reconstruct economic links:

```text
capital provider
      ↓
AI lab / customer
      ↓ take-or-pay / capacity contract
hyperscaler / neocloud / project SPV
      ↓ debt / project finance
infrastructure purchase
      ↓
GPU / memory / networking vendor
```

Then separately annotate where the same vendor/hyperscaler also acts as:

```text
equity investor
guarantor
credit enhancer
offtaker
lender
residual-value backstop
```

The presence of a loop is a **research flag**. Risk increases when the loop becomes necessary for refinancing or payment capacity.

## 9. Management-claim verification protocol

Examples:

```text
Claim: demand exceeds supply
Verify with:
- supplier lead times
- memory pricing
- GPU rental availability / pricing
- inventory
- cancellations / pushouts

Claim: customers generate strong ROI
Verify with:
- customer revenue / cash generation
- unit economics
- external funding need
- independent customer disclosures

Claim: financing is prudent / limited
Verify with:
- guarantees
- credit enhancement
- receivable terms
- debt / collateral structure
- counterparty filings
```

A material contradiction must be stored explicitly as `contradicting_evidence`.

## 10. Relationship to Fundamental triggers

This layer strengthens the interpretation of existing Strategy triggers; it does **not** silently add a new Combined Score weight in v1.

Mapping:

```text
F1 Hyperscaler CapEx Discipline
← end-customer economics + cash conversion

F3 Neocloud / Credit Stress
← financing dependence + credit-market state + circularity risk

F5 RPO / Backlog Quality Deterioration
← counterparty concentration + take-or-pay quality + financing dependency

F4 Semiconductor Guidance
← remains physical-demand / supply-chain confirmation, not replaced by financing data
```

Any future change to Combined Score weights requires separate versioning and historical validation.

## 11. Reversal interpretation

Important combinations:

### Strong physical demand + rising financial risk

```text
physical_demand = STRONG
financing_dependence = HIGH
credit_market_state = NORMAL/TIGHTENING
```

Interpretation:

```text
NO physical-demand reversal yet
BUT financing layer may be a leading warning
```

### Financing stress + project restructuring

```text
financing_dependence = HIGH/CRITICAL
credit_market_state = STRESSED
restructuring / cancellation = CONFIRMED
```

This can activate stronger F3/F5 evidence even before semiconductor revenue rolls over.

### Physical oversupply without credit stress

Remains a valid reversal path through F2/F4 and memory/semiconductor signals.

## 12. Snapshot output

Fundamental snapshot should be able to carry at least:

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

Each state should include:

```text
current_state
previous_state
direction
confidence
primary_evidence_refs
contradicting_evidence_refs
```

## 13. Audit / anti-hindsight

For material event drills:

```text
freeze pre-event baseline
capture primary facts first
capture management claims separately
seek independent confirmation
record contradictory evidence
version the normalized snapshot
never silently rewrite prior snapshot
```

If later evidence invalidates an earlier interpretation, create a new snapshot / correction record rather than rewriting history.

## 14. Phase 1 implementation boundary

Phase 1 may still normalize this layer in Markdown / versioned snapshot records. Issue #5 closed the persistence/reader slice; it did not add a standalone `AI_FINANCING_STRESS` driver.

Completed via Issue #5:

```text
forensic evidence schema
financing architecture records
state persistence
latest-current snapshot reader
tests for evidence classification and fail-closed UNKNOWN states
```

Still open:

```text
Decision Engine / Proposal consumption
```

Until Decision consumption exists, this layer remains research/fundamental context and may strengthen F3/F5 confidence but may not create a hidden new trading trigger.

## 15. Research provenance

The immediate catalyst for formalization was the NVIDIA Event Drill 2026-08-26/27, where strong physical demand coexisted with increased visibility into financing support, guarantees, extended terms and third-party capital mobilization.

That event is **research provenance**, not a hard-coded assumption that all AI infrastructure demand is circular or financially unsustainable.
