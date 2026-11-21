# Challenger v2 — bounded final primary-source PIT and credit-entity review

**Reviewed:** 2026-11-04. **Snapshot target:** 2026-11-02 16:00 EST. **Branch:** PR #132. **Disposition:** finite source review COMPLETE for research inputs; predictive calibration, real-time dissemination proof and actual cutover NOT ACCEPTED.

## Scope and source-time rule

This targeted verification used existing primary SEC EDGAR filing-index pages and financing exhibits, NOT a new multi-company research audit. Full source and audit metadata is in [source eligibility register](../../data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml).

SEC **Accepted** timestamp is directly observable and recorded in ET. It is **not** automatically identical to the actual first dissemination time; do not call it first_public_at. For conservative periodic PIT eligibility this review proposes the **next full US business day at 12:00 ET** as known_public_by_at. This convention is deliberately later than acceptance, but still an operational inference rather than independent proof of the exact market distribution instant. If evidence of later dissemination emerges, mark the affected row UNKNOWN pending a dated source. For 2 Nov 16:00 ET every reviewed document was accepted days or weeks before cutoff. The intended v2 engine accepts the conservative basis only when explicitly recorded.

| Role | Issuer | SEC filing form / accession | Accepted, US Eastern time | Conservative public-by | Result |
|---|---|---|---|---|---|
| R1/R2 | Microsoft | 10-Q 0001193125-26-436133 | 28 Oct 2026 16:07:39 EDT | 29 Oct 12:00 EDT | SEC source timing verified |
| R1/R2 | Alphabet | 10-Q 0001652044-26-000084 | 28 Oct 2026 20:29:06 EDT | 29 Oct 12:00 EDT | SEC source timing verified |
| R1/R2 | Amazon | 10-Q 0001018724-26-000040; earnings 8-K -000038 | 29 Oct 18:20:46 EDT; 8-K 16:05:27 EDT | 30 Oct 12:00 EDT | SEC source timing verified |
| R1/R2 | Meta | earnings 8-K 0001628280-26-066700, EX-99.1 | 21 Oct 16:03:35 EDT | 22 Oct 12:00 EDT | SEC source timing verified |
| R1/R2 | Oracle | 10-Q 0001193125-26-389274 | 11 Sep 16:10:12 EDT | 14 Sep 12:00 EDT | SEC source timing verified |
| R4 | CoreWeave | Q2 10-Q 0001769628-26-000366, original 8-K -000129 | 11 Aug 19:24:42 EDT (ongoing state); 31 Mar 08:59:24 EDT (initial) | 12 Aug 12:00 EDT | PIT fresh August primary continuing-state evidence |
| R4 | IREN | 10-K 0001878848-26-000052 | 27 Aug 16:18:57 EDT | 28 Aug 12:00 EDT | PIT fresh August primary state evidence |

All times are supported by publicly viewable SEC filing details: [Microsoft](https://www.sec.gov/Archives/edgar/data/789019/000119312526436133/0001193125-26-436133-index.htm), [Alphabet](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/0001652044-26-000084-index.htm), [Amazon 10-Q](https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/0001018724-26-000040-index.htm), [Amazon 8-K](https://www.sec.gov/Archives/edgar/data/1018724/000101872426000038/0001018724-26-000038-index.htm), [Meta](https://www.sec.gov/Archives/edgar/data/1326801/000162828026066700/0001628280-26-066700-index.htm), [Oracle](https://www.sec.gov/Archives/edgar/data/1341439/000119312526389274/0001193125-26-389274-index.htm), [CoreWeave Q2 10-Q](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000366/0001769628-26-000366-index.htm), [CoreWeave initial 8-K](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000129/0001769628-26-000129-index.htm), [IREN 10-K](https://www.sec.gov/Archives/edgar/data/1878848/000187884826000052/0001878848-26-000052-index.htm).

## R4 specific materiality and borrower-mapping decisions

### CRWV — borrower-specific WATCH 1 defensible, NOT parent refinancing failure

Original [8-K](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000129/crwv-20260330.htm) identifies **CoreWeave Compute Acquisition Co. VIII, LLC** as indirect subsidiary borrower. The actual 2026 DDTL **4.0 commitment is $8.5bn, not $2.6bn**. The latter refers to *different DDTL 3.0*. The Q2 [10-Q](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000366/crwv-20260630.htm) states **$2.837bn DDTL 4.0 outstanding at 30 Jun 2026** (approximately $1.4bn floating, $1.5bn fixed); contracted capital is not the same as borrowed balance. The subsidiary has secured assets/covenants; **DDTL 4.0 is non-recourse** to the parent except limited guarantee for specified bad acts, unlike other facilities whose guarantee structures differ. Investor access was demonstrably open, and the group had both financing and substantial cash/available facilities. Borrowing dependence is material on consolidated financial exposures, but this is **not proof of failed refinancing, direct unconditional parent guarantee, downgrade or distressed mark**.

**R4 assessment: documented material project/asset-financing dependence supports a conditional level 1 for the CRWV consolidated group; level 2 is unsupported.** Data evidence PASS at documentary borrower level and PIT fresh using Aug 11 10-Q; confidence MEDIUM, not a certified market spread. Do not repeatedly count March facility and August outstanding balance as two events.

### IREN — borrower-specific WATCH 1 defensible, NOT full parent recourse

The [FY26 10-K](https://www.sec.gov/Archives/edgar/data/1878848/000187884826000052/iren-20260630.htm) identifies **IE US Hardware 3 LLC** as a consolidated limited-purpose borrower financing the Microsoft contract. A **$3.645bn** GPU financing package consists of **$1.545bn** DDTL plus **$2.100bn** notes. On 30 Jun the SPV had received **$0.413bn** DDTL and **$0.525bn** notes (**$0.938bn funded**). The remainder is commitments subject to conditions, not yet received funds. Limited IREN parent guarantees concern hedge, remarketing and performance obligations; the general financing is SPV non-recourse beyond specified cases. The filing explicitly reports **covenant compliance** and strong customer-linked financing access, which weighs against a current credit breakdown.

**R4 assessment: material new project financing reliance supports conditional level 1 for IREN's consolidated exposure, not a level-2 parent default.** Borrower/legal structure and financial amounts verified in original 10-K + exhibits. Confidence MEDIUM; no comparable project spread series required. Do not equate conditional guarantee with face amount of the $3.645bn debt.

## R1/R2 acceptance scope

The primary-source acceptance metadata for all **five** public issuers is now confirmed. Existing source-linked audit rows give same-issuer enterprise R1 metrics and same-basis R2 cash-flow proxies. Numeric rows with missing lease principal remain *proxy-level* data; Meta has its own reconciled lease-inclusive issuer FCF. Alphabet rounded capex numbers remain approximate. A confirmed SEC index is not itself proof of every historic transcription's exact precision or the first-public minute. No issuer may obtain R1=2 from CapEx intensity alone or R2=2 from gross cash PPE alone.

For the *research-method* snapshot, R1=1 and R2=1 are defensible **candidates** for all five, provided per-row numeric source and counterevidence remain attached. Actual publishable prospective observations should be produced at a cutoff **after the genuine 2026-11-03 22:28:54Z cohort freeze**, never backdated to 2 Nov. The 2-Nov score [40.91,59.09] remains a POSTHOC sensitivity illustration, not a newly accepted live score.

## Historical replay correction

The early replay used October **research-capture dates** for CRWV/IREN although primary evidence was public in August. A new single-source SEC index register corrects that chronology without changing model parameters, cohort or current-Nov2 results. It is explicitly unregistered post-hoc analysis and cannot validate future prediction. See [replay report](CHALLENGER_V2_PHASE_D_ONE_OFF_REPLAY_2026-11-04.md).

## Gate decisions

| Gate | Decision | Meaning |
|---|---|---|
| Bounded SEC filing-acceptance and conservative public-by | PASS for dated *research* sources, not proof of first dissemination instant | Seven issuers, nine filing indexes/earnings exhibits, timezone-aware metadata |
| CRWV/IREN borrower, $ commitments vs actual funding, limited recourse | PASS at subsidiary-financing structure | R4 conditional WATCH 1 is supported by *material financing dependence*, **not** credit-market failure |
| R1/R2 financial basis | ASSESSED_WITH_UNCERTAINTY | All five issuer research inputs recoverable; lease/basis limitations disclosed |
| Sector-level R4 coverage | LOW_COVERAGE | 2/7 issuer credit-level candidates, **50% R4 weight; platform stratum 0%**. No arbitrary 0 for other five |
| R3/R5/R6/R7 signed event evidence | NONE QUALIFIED in prior bounded review | No synthetic +/− points; not a claim of zero economic risk |
| Research methodology and code PR | READY FOR INDEPENDENT CODE REVIEW after latest-head CI PASS | Does **not** self-grant an explicit maintainer/reviewer PASS |
| Trading, Champion, daily/alert task cutover | BLOCKED / UNCHANGED | No calibrated v2 bands, no atomic schedule switch, no authorised trade |

**Stop rule:** No more general market/issuer SEC search is needed to finish this research-only PR. Next review is one bounded **per-source record** check when a new company filing, source correction, review expiry or material contradictory evidence appears. Missing private project ROI, complete leases and issue-level credit spreads remain disclosed as UNKNOWN instead of perpetually blocking research code review.
