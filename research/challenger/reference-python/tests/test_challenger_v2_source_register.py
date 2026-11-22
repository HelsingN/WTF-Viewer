"""SEC acceptance and legal borrower checks for v2 source register.

Tests verify traceable public-document metadata and conservative eligibility
conventions; they do NOT prove instant EDGAR dissemination or market outcomes.
"""
from datetime import datetime, timezone
from pathlib import Path

import yaml


SOURCE_PATH = (
    Path(__file__).resolve().parents[1]
    / "data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml"
)


def register():
    return yaml.safe_load(SOURCE_PATH.read_text(encoding="utf-8"))


def test_seven_sec_source_records_have_explicit_conservative_availability():
    data = register()
    assert data["newly_scored_observations_approved"] is False
    assert data["no_trading"] is True
    assert set(data["issuer_documents"]) == {
        "MSFT", "GOOGL", "AMZN", "META", "ORCL", "CRWV", "IREN"
    }
    cutoff = datetime.fromisoformat(data["assessment_cutoff"])
    for name, row in data["issuer_documents"].items():
        a = datetime.fromisoformat(row["accepted_at_et"])
        k = datetime.fromisoformat(row["known_public_by_at"])
        assert a.utcoffset() is not None
        assert k.utcoffset() is not None
        assert a < k <= cutoff, name
        assert row["availability_basis"] == "CONSERVATIVE_KNOWN_PUBLIC_BY"
        assert row["source_index"].startswith("https://www.sec.gov/Archives/edgar/")
        assert "FIRST_PUBLIC" not in row["status"], name


def test_r1_r2_share_sources_but_legal_borrowers_remain_distinct():
    docs = register()["issuer_documents"]
    assert {issuer for issuer, row in docs.items() if "R1" in row["role"]} == {
        "MSFT", "GOOGL", "AMZN", "META", "ORCL"
    }
    assert {issuer for issuer, row in docs.items() if "R2" in row["role"]} == {
        "MSFT", "GOOGL", "AMZN", "META", "ORCL"
    }
    assert {issuer for issuer, row in docs.items() if "R4" in row["role"]} == {
        "CRWV", "IREN"
    }
    crwv = docs["CRWV"]
    assert crwv["borrower_legal_name"] == "CoreWeave Compute Acquisition Co. VIII, LLC"
    assert crwv["facility_committed_usd_bn"] == "8.5"
    assert crwv["drawn_as_of_2026_06_30_usd_bn"] == "2.837"
    assert "000176962826000366" in crwv["source_index"]
    assert "000176962826000129" in crwv["original_agreement_source_index"]
    iren = docs["IREN"]
    assert iren["borrower_legal_name"] == "IE US Hardware 3 LLC"
    assert iren["facility_committed_usd_bn"] == "3.645"
    assert iren["total_funded_as_of_2026_06_30_usd_bn"] == "0.938"
    assert iren["parent_exposure"].startswith("limited")


def test_source_buffer_sufficiently_new_for_nov2_r4_without_republishing_march_loan():
    docs = register()["issuer_documents"]
    cutoff = datetime.fromisoformat("2026-11-02T16:00:00-05:00")
    for id in ("CRWV", "IREN"):
        source = datetime.fromisoformat(docs[id]["known_public_by_at"])
        assert (cutoff - source).days < 180
    # 31-Mar 8-K is NOT the fresh source for the 2-Nov determination.
    original = datetime.fromisoformat(docs["CRWV"]["original_agreement_accepted_et"])
    assert (cutoff - original).days > 180
