# Challenger R2 quarterly cash-flow panel — 2026-11-02 PIT

Status: PARTIAL / research-only. USD billions. Missing means unknown, never zero. Retrospectively assembled 2026-11-03 from the dated repository evidence; issuer first-public timestamps are not all independently recertified.

| Issuer | Window | OCF | Cash PPE purchases | PPE incentives/proceeds | Finance-lease principal | OCF - net cash PPE | Lease-inclusive FCF | Earlier comparable | Evidence and limits |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Microsoft | FY27 Q1 | 58.000 | 39.367 | unknown | unknown | 18.633 (gross PPE) | unknown | FY26 Q4 +19.600 gross PPE | [FY27 Q1 issuer earnings](https://www.microsoft.com/en-us/investor/earnings/fy-2027-q1/press-release-webcast); leases not normalized |
| Alphabet | CY26 Q3 | ~42.300 | ~51.360 | unknown | unknown | ~-9.060 (gross PPE) | unknown | CY26 Q2 ~-5.800 gross PPE | [28-Oct research](AI_CAPEX_DAILY_CLOSE_2026-10-28.md); rounded inputs, issuer primary line-item check open |
| Amazon | CY26 Q3 | 42.422 | 77.259 | 1.381 | unknown | -33.456 (net PPE) | unknown | Earlier TTM -7.600; current TTM -42.357; **TTM only** | [issuer release](https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/default.aspx); PPE includes non-AI |
| Meta | CY26 Q3 | 32.786 | 33.942 | 0 | 0.964 | -1.156 (gross PPE) | **-2.120** | CY26 Q2 lease-inclusive +0.784 | [SEC issuer exhibit](https://www.sec.gov/Archives/edgar/data/1326801/000162828026066700/meta-09302026xexhibit991.htm); see [primary reconciliation](CHALLENGER_R2_META_SEC_RECONCILIATION_2026-11-03.md) |
| Oracle | FY27 Q1 | 23.103 | 28.499 | unknown | unknown | -5.396 (gross PPE) | unknown | Same previously known quarter; new matched quarter unavailable | [14-Oct weekly](AI_CAPEX_WEEKLY_WATCH_2026-10-14.md); OCF includes customer prepayments 11.363 |

## Definitions and comparability

- `net_cash_ppe = cash_ppe_purchases - cash_ppe_incentives` only when incentives are known; otherwise report gross PPE proxy and mark incentives UNKNOWN.
- `cash_ppe_proxy = ocf - net_cash_ppe`. Do not silently substitute a zero for missing incentives.
- `lease_inclusive_fcf = ocf - net_cash_ppe - finance_lease_principal` only if all relevant line items are known and treatment is consistent with issuer reconciliation.
- Amazon TTM observations are separate from quarterly observations; no sum or average across heterogeneous issuers/windows.
- Cash PPE is not necessarily AI-only; revenue growth, cash balances, prepayments and lease classification are counterevidence/qualifications.
- The R2 contract has qualitative 0/1/2 levels but no frozen numeric FCF escalation threshold. Sequential deterioration is evidence, not an automatic rule.
- Evidence chronology: 14-Oct baseline; Meta Oct21; Microsoft/Alphabet Oct28; Amazon Oct29; all prior to 2-Nov 16:00 EST. The exact first-public SEC/issuer timestamps for each underlying row still need verification.

## Computations and sensitivity

Microsoft 58.000 - 39.367 = +18.633; Alphabet ~42.300 - 51.360 = ~-9.060; Amazon 42.422 - (77.259 - 1.381) = -33.456; Meta 32.786 - 33.942 - 0.964 = -2.120; Oracle 23.103 - 28.499 = -5.396.

Sequential comparable proxy changes: Microsoft +19.600 to +18.633 = -0.967; Alphabet ~-5.800 to ~-9.060 = -3.260; Meta +0.784 to -2.120 = -2.904. Amazon earlier TTM -7.600 to current TTM -42.357 = -34.757, conditional on identical issuer FCF definitions. Oracle has no fresh matched comparison.

**Research interpretation:** Three issuer comparisons worsen, one remains positive, Oracle's earlier negative cash flow is already embedded in the 14-Oct R2=1 baseline. R2=2 is plausible but remains **PROVISIONAL** pending complete source/lease and issuer-period normalization. Frozen-weight Challenger sensitivity: R2=1 => 60.0 ALERT; R2=2 => 67.5 ALERT. No trading authority, no historical YAML mutation.
