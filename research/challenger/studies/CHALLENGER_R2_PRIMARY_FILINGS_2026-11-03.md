# R2 primary filings verification — 2026-11-03

Retrospective verification against the 2026-11-02 16:00 EST research cutoff. Source documents must have been public by the cutoff; **web crawl dates are not filing timestamps**. USD billions unless noted. Research only, no trade authority.

| Issuer | Primary SEC document | Verified figures | Interpretation |
|---|---|---|---|
| Microsoft FY27 Q1 | https://www.sec.gov/Archives/edgar/data/789019/000119312526436133/msft-20260930.htm | Quarter OCF 58.000, cash additions to PPE 39.367, cash-PPE proxy +18.633 | Positive; lease treatment remains open. |
| Alphabet CY26 Q3 | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/goog-20260930.htm | 10-Q explicitly says quarterly OCF ~42.3 and capex ~51.4, hence approx -9.1; precise 51.360 remains to reconcile from nine-month less six-month PPE | Positive operating cash, very large liquid securities; approximate Q3 proxy. |
| Amazon CY26 Q3 | https://www.sec.gov/Archives/edgar/data/1018724/000101872426000038/amzn-20260930xex991.htm and https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/amzn-20260930.htm | Research ledger OCF 42.422, gross PPE 77.259, PPE incentives 1.381, resulting -33.456; issuer earnings exhibit has quarter/9m/TTM columns | Confirm exact row definitions before treating issuer net-PPE proxy as lease-inclusive FCF. |
| Meta CY26 Q3 | https://www.sec.gov/Archives/edgar/data/1326801/000162828026066700/meta-09302026xexhibit991.htm | OCF 32.786, PPE 33.942, lease principal 0.964, issuer FCF -2.120 | Fully arithmetically reconciled for issuer definition. |
| Oracle FY27 Q1 | https://www.sec.gov/Archives/edgar/data/1341439/000119312526389274/orcl-20260831.htm and https://www.sec.gov/Archives/edgar/data/1341439/000119312526387905/orcl-ex99_1.htm | OCF 23.103, CapEx 28.499, issuer FCF -5.396; customer prepayments with financing component 11.363 | Prepayment-adjusted OCF 11.740 and proxy -16.759 are a *one-line sensitivity*, not issuer GAAP FCF. Prior baseline already included this quarter. |

## Source-timing and reliability status

- Oracle investor SEC filings index lists its 8-K on **10-Sep-2026** and 10-Q on **11-Sep-2026**. The latest available quarter was already known at 14-Oct baseline.
- Meta earnings exhibit dated **21-Oct-2026** (see dedicated reconciliation).
- Microsoft and Alphabet latest quarterly filings were located in SEC archives; **independently verified exact SEC acceptance/public release minutes remain OPEN**. These filings must not be assumed public before their earnings announcements, but 28-Oct results precede Nov2 cutoff.
- Amazon Q3 earnings and SEC filing were previously recorded as 29-Oct, preceding cutoff; independent exact filing acceptance minute and issuer definition reconciliation remain OPEN.
- A primary source confirms Oracle FCF, but the October 28 forward guidance to future positive FCF is **management forecast, not realized current cash conversion**.

## Methodological verdict

These SEC documents corroborate the scale and signs of cash conversion pressure; they do not eliminate inconsistent lease accounting, issuer FCF definitions, non-AI CapEx, or missing direct project economics. R2=2 remains a provisional qualitative judgment, not a threshold-based validated decision. Reproducible Challenger scores remain 60.0 (R2=1) and 67.5 (R2=2), both ALERT. Reviewer PASS and complete audit coverage still required.
