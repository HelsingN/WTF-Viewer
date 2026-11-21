# Challenger v2 — Phase B: reuse existing source panels before new collection

**Prepared:** 2026-11-03 · **Status:** EXISTING DATA RECOVERED / ROSTER PROPOSED / CLASSIFICATION PENDING  
**Design issue:** #131 · **Draft PR:** #132. This is a migration source crosswalk, **not** a v2 score or approved PIT cohort.
**Quantitative follow-up (supersedes the incomplete R1 rows below):** A targeted primary-release comparison on 3-Nov recovered all five issuers' same-quarter prior-year total revenue and cash CapEx. Calculations, source links and contrary cloud-growth data are in [Phase B quantitative decisions](CHALLENGER_V2_PHASE_B_QUANTITATIVE_DECISIONS_2026-11-03.md). The earlier row-level gaps document the status *before* that finite source pass, not the current outstanding tasks. Five tentative R1 WATCH candidates are now measurable using enterprise-level (not AI-specific) ratios. Original source-public/PIT basis and the unvalidated 20pp threshold still require approval.


## B1. Proposed fixed rosters, not v2 issuer levels

Companion machine-readable design file: [candidate cohort YAML](../../data/research/challenger/challenger_v2_candidate_cohorts_2026-11-03.yaml).

- R1 = R2: MSFT, GOOGL, AMZN, META, ORCL; initial equal 20% per issuer, reflecting pre-existing AI CapEx Watch coverage. These weights do **not** claim equal economic dollar exposure; they are a falsifiable, simple issuer-panel proposal.
- R4: MSFT, GOOGL, AMZN, META, ORCL (50% total, 10% each) plus publicly filing CRWV and IREN (50% total, 25% each). Private Lambda remains **unscored documentary counterevidence**, since recurring private issuer data cannot reliably satisfy the core evidence contract. This deliberately includes strong-credit **counterexamples** and project-sensitive borrowers rather than selecting only observed failures. It is **not** a probability-weighted loss model; borrower legal entity / project SPV must be checked for every applicable row.
- The R4 50/50 stratification is an **unvalidated design choice**. Before approval, run one bounded sensitivity on parent/project composition, without creating two ongoing Challengers or optimizing for legacy v1 levels.
- This roster is **not yet frozen**, cannot be backdated to Sep or Oct, and must not be used to assert historic PIT scores. Any retrospective replay is marked post-hoc method test.

## B2. R1 observed monetization / investment anchors

| Issuer | Existing observations and comparable calculation | Opposing observations | Data suitability / essential gap | Existing repository source |
|---|---|---|---|---|
| MSFT | Azure YoY +43% FY26 Q4 to +48% FY27 Q1; cash PPE $35.8bn → $39.367bn, OCF $55.4bn → $58.0bn. Cash PPE / OCF ~64.6% → ~67.9% (two consecutive quarters; **not** AI ROI) | Azure accelerating and cash-PPE FCF proxy still **+$18.633bn** | PARTIAL. Azure is segment growth while PPE issuer-wide; comparing YoY Azure rate directly with **QoQ** PPE change would be invalid. Need consistent yoy CapEx or declare proxy only | Weekly 9-Sep; Daily 28-Oct; issuer MSFT FY26 Q4 / FY27 Q1 IR |
| GOOGL | Google Cloud Q3 YoY +103%; company cash CapEx ~$51.36bn vs ~$23.95bn Q3 prior year = **+114.4% YoY**, apparent growth-rate gap **+11.4 pp** | Cloud operating income ~$11.1bn and Cloud revenue growth strong | PARTIAL. Cloud revenue and total company CapEx have different business scope, and $51.36bn input is approximate until primary row reconciliation. The draft **20 pp** R1 diagnostic is not automatically triggered by this 11.4 pp proxy | Daily 28-Oct; Alphabet Q3 10-Q and 8-K references |
| AMZN | AWS Q2 YoY +37% → Q3 YoY +39.3%; Q3 AWS $45.984bn and AWS operating profit $17.773bn; company gross cash PP&E $77.259bn | AWS operating margin ~38.7%; revenue acceleration opposes broad failed monetization | PARTIAL. No matched Q3-vs-prior-year total CapEx growth independently extracted; AWS is a business subset. Annual ~$220bn cash CapEx is guidance, not Q3 realized numerator | Weekly 9-Sep; Daily 29-Oct; Amazon IR + SEC 10-Q |
| META | Advertising growth ~26% reported in 30-Oct research; Q3 issuer cash PPE $33.942bn vs Q2 **CapEx incl finance lease** $31.08bn previously reported | Positive advertising monetization and OCF despite company-wide spend | PARTIAL. Advertising is a monetization proxy, not AI compute revenue; Q2 capex number includes leases and cannot be compared naively with Q3 cash PPE | Weekly 9-Sep; Daily 30-Oct; Meta SEC exhibits |
| ORCL | Cloud/OCI momentum described as strong, FY27 Q1 cash CapEx $28.499bn and OCF $23.103bn; financing/prepayment mechanics already documented | Forward cloud demand / customer prepayments support deployments but are not earned project ROI | PARTIAL. Comparable prior OCI revenue, investment growth and source-time tables not yet in reviewed research source panel; avoid forced label | Weekly 23-Sep and 14-Oct; Oracle FY27 Q1 10-Q |

**R1 disposition:** 5/5 issuer names and at least one observable indicator found in earlier work; **not** 5/5 verified same-scope, same-period R1 decision records. Three large cloud segments are reasonably observable, while issuer-wide investment denominators require scope labels. An AI-only marginal ROI judgment **cannot** be inferred from these numbers. Reuse the panel, apply the frozen v2 classification only where fully supported, otherwise UNKNOWN.

## B3. R2 existing issuer cash-flow panel (USD billions)

Already tabulated and source-indexed in [R2 cash-flow panel](CHALLENGER_R2_CASH_FLOW_PANEL_2026-11-02.md) and [filing register](CHALLENGER_R2_PRIMARY_FILINGS_2026-11-03.md):

| Issuer | Most recent matched window | OCF | Cash PP&E / incentives known | Simple proxy / lease-inclusive | Prior comparable observation | Main quality limitation |
|---|---|---:|---|---|---|---|
| MSFT | FY27 Q1 | 58.000 | 39.367 gross | +18.633 *gross PPE proxy* | +19.600 prior gross-PPE proxy | Finance leases not reconciled |
| GOOGL | CY26 Q3 | ~42.300 | ~51.360 gross | ~−9.060 *gross PPE proxy* | ~−5.800 prior gross-PPE proxy | Approximate numerator, lease treatment |
| AMZN | CY26 Q3 | 42.422 | 77.259 PPE, 1.381 incentives | −33.456 *net cash PPE proxy* | TTM -7.600 → -42.357 (**TTM-only comparison**) | Do not compare Q3 with prior TTM; lease treatment and TTM definition |
| META | CY26 Q3 | 32.786 | 33.942 gross; lease principal 0.964 | **−2.120 lease-inclusive issuer FCF** | +0.784 prior lease-inclusive FCF | Most complete issuer reconciliation |
| ORCL | FY27 Q1 | 23.103 | 28.499 gross | −5.396 issuer/gross PPE FCF | No fresh comparable quarter | OCF includes $11.363bn significant-financing-component prepayments |

**R2 disposition:** numerical cash-flow source rows for **5/5** issuer candidates are already present; **only Meta 1/5** has a fully reconciled finance-lease-inclusive row in this panel. At least MSFT/GOOGL/META have prior matched comparable proxies; AMZN TTM comparison is conditional, ORCL has no newer paired report. This does **not** mean only Meta is usable: basis-consistent **proxy** assessments may be published with an explicit limitation, but avoid silently treating unknown lease principal as zero. **Historic v1 R2=2 is parked; do not force all v2 issuer levels to 2 or restart the entire old R2 audit.**

## B4. R4 financing — mixed credit structures with contrary evidence

| Proposed entity | Observed supporting evidence | Documented contrary evidence / caveat | v2 qualification work |
|---|---|---|---|
| MSFT | SEC preliminary 424B2 (29-Oct), reports of ~$25bn prospective issuance | Indications of ~$115bn orders; issuer already cash-generative. Preliminary prospectus had blank coupons/amounts; NOT raised cash | Final priced/settled terms if material; optional, otherwise source status partial |
| GOOGL | 2-Nov €6bn bond placement reported; capital investment/lease obligations | Order book >€17bn, access demonstrably open; not proof of distress | Exact issuer bond term and first-public, if needed for chosen level |
| AMZN | Q3 10-Q up to ~$80bn *optional* secured technology facility; large CapEx | Undrawn line is NOT $80bn borrowed; prior sterling bond market access, strong AWS growth | Distinguish facility availability, actual draws and covenants |
| META | S&P negative **outlook** (30-Oct after close), project financing and guarantees | Outlook is NOT a rating downgrade; strong advertising cash generation; original S&P action pending | Primary rating action or label secondary-only |
| ORCL | FY27 Q1 lease/prepayment/debt; Project Jupiter loans ~89–91 cents and difficulty distributing debt per Reuters/FT | Borrower/project SPV not necessarily identical to Oracle parent; funding remains accessible; 2-Nov proposal is not settled proceeds | Resolve contract/entity mapping and source class, not a fake OAS curve |
| CRWV | SEC 31-Mar financing agreement (Accepted 08:59:24 ET); higher-coupon senior financing, revenue/interest burden; later debt stack and vendor facilities | Successful $4.2bn convertibles and signed facilities; lower convertible coupon is **not** directly comparable to secured yield | Contract-level instrument terms and same-instrument comparisons only |
| IREN | SEC 10-K accepted 27-Aug 16:18:57 ET, disclosed credit/note/limited-guarantee exhibits | Confirmed financing and customer offtake; issued vs committed and drawn conditions distinct | Separate legal entity/guarantee, drawn vs unutilized |
| LAMBDA_PRIVATE | Closed 1-Oct $1.008bn IG-backed fixed 6.78% financing, prior $926mn term-loan history | Strong **counterevidence** to shut credit markets; private entity has incomplete financial statements | Issuer-disclosed terms may suffice for access signal, but full refinancing capacity stays UNKNOWN |

**R4 disposition:** **8/8 case names have documentary or dated reporting anchors**, NOT eight directly comparable issuer-spread observations and NOT eight eligible levels. CRWV and IREN have independently identified SEC acceptance times from the Phase4 gate; Lambda source minute remains UNKNOWN, others vary by transaction. The [Phase4 credit contagion decision](AI_CAPEX_FINANCIAL_CONTAGION_PHASE4_GATE_REVIEW_2026-10-18.md) expressly rejected a new quantitative credit-contagion layer due to zero matched bond-spread sample and no outcome validation: v2 must **reuse the documentary signal**, not revive the invalidated numerical contagion research.

## B5. Decisive known gaps ONLY

| Gate | Bounded required task | What is NOT required |
|---|---|---|
| Cohort governance | Reviewer approves one fixed roster and one set of weights; record true approval/freeze time and version before future PIT use | Retroactively pretend the November roster was frozen for September |
| R1 measurement | Choose allowed *corporate proxy* definition and test historic v2 diagnostic against at least one strong-cloud counterexample; if no scope-consistent comparison, UNKNOWN | Obtain confidential AI-only project IRR |
| R2 issuer eligibility | Match issuer within-report gross/net PPE and lease basis only where it changes a candidate level; document period and source class | Reaudit every historic v1 R2 reference or force five issuers to have fully private finance lease data |
| R4 borrower legal mapping | Check only R4 cases influencing chosen level, and distinguish actual draw, proposal and guarantee | Purchase/derive unavailable CUSIP CDS curves or compare structurally different coupons as identical spread |
| PIT fields | For sources with only publication day, use verified **conservative publicly-known-by timestamp** with an explicit availability_basis; never invent exact first-public minute. Code currently expects first_public_at; this is a **design gap** to resolve before full panel use | Search an infinite archive solely for minute precision when next-day public availability is sufficient |
| Old v1 vs new v2 | One-off historical **post-hoc method replay** with a clear vintage disclaimer | A second recurring active Challenger or an after-the-fact v1 score transplant |

## B6. Proposed next bounded package

1. Convert this candidate roster into reviewer-approved versioned cohort; keep proposal status until explicit acceptance, without invalid retrospective as-of timestamps.
2. Resolve **only** the input contract issue of partial publication timestamps by introducing source precision/basis (exact first-public OR conservative known-public-by) with no lookahead.
3. Build v2 issuer-level evidence rows using the above cited reports; where insufficient, mark UNKNOWN with reason, not fabricated 0/1/2.
4. Define unit tests for selected R1/2/4 proxy decision rules and a finite manual reviewer checklist. No v2 point score until the actual roster and labels are accepted.
5. Move to stage C after B's source/PIT policy accepted; do not reopen v1 R2 in the meantime.

**Stage B result at 2026-11-03:** existing research recovered, first candidate roster proposed and reproducible core source crosswalk drafted. **NOT accepted as an operational v2 cohort; no issuer levels yet; no recalculation performed.**