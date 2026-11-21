# Challenger R1–R7 and P1–P4 evidence-sufficiency review

**Review date:** 2026-11-03. **PIT as-of:** 2026-11-02 16:00 EST. **Outcome:** RESEARCH_ACCEPTED_WITH_UNCERTAINTY for an explicitly conditional shadow assessment, **not** certification of the primary R2=2 level. **NO_TRADE.**

## Scope and provenance

Desk review of repository baseline 2026-10-14 YAML, 2026-11-02 shadow YAML, 2026-11-02 PIT reassessment, 2026-11-03 R2 incremental audit, five-issuer cash-flow panel, primary filings inventory, reviewer gate and merged evidence-sufficiency protocol. This review **does not** independently re-fetch every SEC filing, validate all issuer acceptance minutes, run the repository Python script, inspect every unmerged branch or collect new Massive data. The original PR head CI passed; CI must be checked again after later edits. Those limits are disclosed, not treated as completeness achieved.

## R2 — critical differential check

Prior baseline already assigned level 1 based on Alphabet/Amazon/Oracle cash stress; the number of negative issuers is **not new evidence**. The incremental changes are:
- Microsoft: prior +19.600 vs latest +18.633 USD bn (gross cash-PPE proxy); -0.967, still strongly positive.
- Alphabet: prior ~-5.800 vs latest ~-9.060 (gross cash-PPE proxy); ~-3.260, approximate, lease normalization unresolved.
- Meta: prior +0.784 vs latest -2.120 (issuer lease-inclusive FCF); -2.904, issuer SEC exhibit reconciled in separate report.
- Amazon: earlier TTM -7.600 vs latest TTM -42.357; -34.757 **only conditional on consistent TTM definitions**. Separate Q3 proxy -33.456 must not be compared directly with prior TTM.
- Oracle: -5.396 previously known, **no new comparable quarter**, cannot count as an incremental worsening.

**Verdict:** material sequential deterioration at multiple buyers supports a *plausible* R2=2, but this review cannot establish that 2 is uniquely justified by the frozen qualitative definition. `R2=1–2`, selected research scenario 2 **LOW confidence**, alternative 1 **material**. **ASSESSED_WITH_UNCERTAINTY**, not reviewer-certified PASS for unconditional R2=2. No additional points for previously counted cash stress. R2 weight 15: contribution 7.5 or 15.0.

## R1–R7 factor review

| Factor | Weight | Primary research level | Contribution | Confidence | Assessment and counterevidence | Sensitivity |
|---|---:|---:|---:|---|---|---|
| R1 monetization/CapEx | 20 | 1 | 10 | MEDIUM | Strong cloud revenue growth offsets rapidly increasing spend; AI-only incremental revenue and spend not matched | 0–2 conceptually possible, no concrete alternative evidenced here |
| R2 cash conversion | 15 | 2 provisional | 15 | LOW | Incremental buyer deterioration vs positive Microsoft; mismatched cash/lease and Amazon TTM definitions | **1–2**, score 60.0–67.5 |
| R3 payback | 15 | 1 | 7.5 | LOW | Duration mismatch and Anthropic compute intensity; no project IRR/utilization/payback panel; no proof of confirmed broad payback failure | 1 retained; level 2 unsupported |
| R4 financing | 20 | 2 | 20 | MEDIUM | Conditional guarantees, new funding dependence and credit selectivity; capital market still open; level already 2 on Oct14 | unchanged at ceiling |
| R5 backlog quality | 10 | 1 | 5 | LOW | Large obligations are not realized cash or profitable demand; no broad cancellations/renegotiation series | level 2 unsupported |
| R6 capacity funnel | 10 | 1 | 5 | LOW | Contracted/energized/utilized/profitable MW unmatched; cannot infer ghost demand from financing | level 2 unsupported |
| R7 attrition | 10 | 1 | 5 | LOW | Localized inherited delays; no new broad economically motivated cancellation evidence | level 2 unsupported |

Levels R1/R3/R5/R6/R7 are **defensible WATCH classifications**, not proof that missing private evidence does not exist. R4 is a defensible research ceiling, not a measured systemic credit crisis. No new evidence reviewed here independently supports changing any of those six factors from the Nov2 shadow observation.

**Frozen arithmetic:** R1 10 + R2 (7.5 or 15) + R3 7.5 + R4 20 + R5 5 + R6 5 + R7 5 = **60.0 or 67.5**. Both map to **ALERT** (60–74). These are conditional point scores, **not a probabilistic confidence interval**. Stage 5 is **inherited localized attrition**, not inferred from score; no evidence of broad Stage 6–7.

## Physical overlay (excluded from score)

| Overlay | State | Confidence | Limits |
|---|---|---|---|
| P1 GPU compute | WATCH | LOW | Older-GPU rental dispersion, no matched utilization/renewal/price panel |
| P2 memory | ANTI_REVERSAL | MEDIUM | Realized Micron/HBM/supplier strength; no proof of future inventory conditions |
| P3 semiconductor/networking | ANTI_REVERSAL | MEDIUM | Positive Vertiv/KLA evidence vs Intel-specific weakness; broad bookings not collapsing on available record |
| P4 technical | WATCH | LOW | Selloff observed, but synchronized Nov2 Massive SMH/QQQ/SOXX/SPY and canonical technical inputs unavailable |

P1–P4 are separate, not blended into Challenger or Champion.

## Review acceptance and remaining concrete tasks

- [x] Frozen definitions, weights, score bands and historical baseline preserved.
- [x] Incremental R2 comparisons distinguished from already-known negatives; quarter/TTM and lease gaps explicitly flagged.
- [x] R1–R7, P1–P4 reviewed with counterevidence, confidence and sensitivity.
- [x] Conditional arithmetic independently checked by addition in this review.
- [ ] Reconcile Amazon earlier/current TTM definitions from issuer exhibits, plus Alphabet and Microsoft exact lease treatment.
- [ ] Independently verify decisive first-public times for all five issuers; no after-cutoff evidence.
- [x] Latest-head GitHub Actions CI **PASS** for PR #130 head `1d09d467c4e793de8431cd818cddc7031e398805`: [run 41704426909](https://github.com/HelsingN/AI_CapEx_Reversal/actions/runs/41704426909), conclusion `success`. This confirms repository CI only; it does not independently certify economic data.
- [ ] Execute the specific R2 arithmetic script and record output; not separately verified in this review.
- [ ] Complete canonical Champion/technical and outcome panels if used for predictive-performance claims.
- [ ] Independent reviewer approval for final R2=2, if required by repository governance.

**Disposition:** research **conditional score is usable for monitoring** with 60.0–67.5 sensitivity; unconditional acceptance of 67.5 is **NOT PASSED**. Do not rewrite 14-Oct YAML, change 2-Nov YAML or Champion, promote Challenger, or authorize trades. Existing PR #128 was already merged at review time; this note is an explicit post-merge qualification, not an assertion it remains open.

## Focused non-R2 decision (2026-11-03)

**R2 review is parked**: retain level 2 as the working research scenario and the already documented alternative; do not restart its audit absent specific new contradictory evidence. The next iteration must prioritize R1, R3, R4, R5, R6 and R7.

| Factor | Independent decision | What would justify change | Priority |
|---|---|---|---|
| R1=1 | RETAIN. Cloud revenue expansion is substantial despite CapEx acceleration; no demonstrated broad monetization failure. | Comparable incremental AI revenue/cost cohorts and persistent deterioration in returns, or stronger evidence for level 0 | HIGH |
| R3=1 | RETAIN WITH LOW CONFIDENCE. Compute-spend/revenue ratios and duration mismatch are proxies, not realized project payback. | Direct contracted project returns, utilization-adjusted realized payback or material renegotiation based on returns | HIGH |
| R4=2 | RETAIN BUT CHALLENGE CEILING. Multiple funding structures and credit selectivity support material dependence; strong bond books and access oppose systemic funding freeze. | Evidence financing dependence was misclassified as stress, or material credit repricing/refinancing failure | **HIGHEST** |
| R5=1 | RETAIN. Commitments and backlog alone neither prove cash quality nor widespread default. | Contract cancellation, counterparty nonpayment, take-or-pay enforceability and concentration evidence | MEDIUM |
| R6=1 | RETAIN. Large announced pipeline cannot be equated with utilized or profitable capacity. | Dated project-level funnel conversion, funded-to-energized attrition and realized utilization | HIGH |
| R7=1 | RETAIN, **STAGE 5 QUALIFIER REQUIRED**. Existing localized project delays do not establish broad project attrition. | Independently verified project cancellations/restructurings with economic causes and scope | **HIGHEST** |

**Important interpretation correction:** A Stage 5 label in the stored snapshot must be read strictly as *localized inherited project attrition*. It must not be reported as sector-wide Stage 5 confirmation. No R1/R3/R4/R5/R6/R7 numeric change is warranted from evidence currently reviewed; this is an explicit factor-by-factor decision, not a carry-forward by default.

**Next evidence work package:** (1) challenge R4=2 against financing access and credit terms, (2) separate R7 site delays from actual cancellations and audit causal Stage 5, (3) R1 and R3 monetization/payback denominator definitions, (4) R6 project MW funnel, (5) R5 contract quality. No additional R2 research in this work package.
