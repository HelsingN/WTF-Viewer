"""Prospective Challenger v2 weekly validation; v1 history is immutable."""
from __future__ import annotations

from copy import deepcopy
import json
from pathlib import Path
import sys

from scoring.challenger_v2 import (
    APPROVED_RESEARCH_COHORT_AT, APPROVED_RESEARCH_COHORT_VERSION,
    APPROVED_RESEARCH_ROSTERS, evaluate_challenger_v2,
)

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts/research"))
from validate_weekly_challenger_v2 import validate_capture, validate_repository  # noqa: E402

CUTOFF = "2026-11-04T00:00:00+00:00"
CAPTURE = "2026-11-04T06:00:00+00:00"


def template(tmp_path: Path):
    path = tmp_path / "Docs/research"
    path.mkdir(parents=True, exist_ok=True)
    (path / "AI_CAPEX_WEEKLY_WATCH_2026-11-04.md").write_text(
        "# Weekly watch\n\n## Challenger v2\nResearch-only bounded signal.\n", encoding="utf-8")
    core = {}
    unresolved = {}
    for factor, roster in APPROVED_RESEARCH_ROSTERS.items():
        core[factor] = {"roster": {ticker: str(weight) for ticker, weight in roster.items()},
                        "observations": {}}
        for ticker in roster:
            unresolved[f"{factor}/{ticker}"] = {
                "reason": "NO_ISSUER_RECONCILED_EVIDENCE_AT_CUTOFF",
                "sources_checked": ["https://example.test/fixed-cohort-review"],
                "owner": "Research reviewer", "next_action": "Check dated primary issuer source",
                "next_review": "2026-11-11", "note": "Unknown is not a zero rating",
            }
    snapshot = {
        "schema": "ai-capex.challenger-observable.v2-draft",
        "as_of": CUTOFF,
        "cohort_version": APPROVED_RESEARCH_COHORT_VERSION,
        "cohort_frozen_at": APPROVED_RESEARCH_COHORT_AT.isoformat(),
        "core": core, "events": [],
    }
    result = evaluate_challenger_v2(snapshot)
    published = {k: result[k] for k in (
        "status", "core_interval", "final_interval", "core_coverage_pct",
        "final_exact_score", "category", "calibration", "trading_signal",
        "event_total_adjustment", "event_adjustments", "core_factors")}
    panels = {
        factor: {"status": "ASSESSED_NO_QUALIFIED_EVENT",
                 "counterevidence": "Opposing primary evidence is acknowledged; no signed outcome",
                 "source_refs": ["https://example.test/dossier"],
                 "reviewed_at": CAPTURE,
                 "latest_source_public_by_at": "2026-11-03T18:00:00-05:00"}
        for factor in ("R3", "R5", "R6", "R7")
    }
    phys = {
        p: {"status": "UNKNOWN", "note": "Missing independent measurement",
            "source_refs": ["https://example.test/physical"],
            "latest_source_public_by_at": "2026-11-03T18:00:00-05:00",
            "next_action": "Collect canonical as-of measurements"}
        for p in ("P1", "P2", "P3", "P4")
    }
    return {
        "schema": "ai-capex.weekly-challenger-v2.v1",
        "report_date": "2026-11-04",
        "cutoff": CUTOFF,
        "captured_at": CAPTURE,
        "last_completed_us_session": "2026-11-03",
        "mode": "CONTEMPORANEOUS",
        "report": "Docs/research/AI_CAPEX_WEEKLY_WATCH_2026-11-04.md",
        "source_refs": ["https://example.test/issuer-reviews"],
        "trading_authority": "NONE",
        "model_version": APPROVED_RESEARCH_COHORT_VERSION,
        "data_status": "PARTIAL",
        "review_status": "REQUIRES_HUMAN_REVIEW",
        "snapshot": snapshot,
        "unresolved": unresolved,
        "event_assessments": panels,
        "physical": phys,
        "published_result": published,
    }


def test_complete_fixed_cohort_unknown_is_structurally_valid_partial(tmp_path):
    m = template(tmp_path)
    got = validate_capture(m, tmp_path)
    assert got["valid"], got["errors"]
    assert got["data_status"] == "PARTIAL"
    assert got["unresolved_count"] == 21  # 17 issuer slots + 4 physical
    assert m["published_result"]["final_interval"] == ["0.00", "100.00"]
    assert m["published_result"]["category"] is None


def test_no_unsupported_complete_or_exact_score(tmp_path):
    m = template(tmp_path)
    m["data_status"] = "COMPLETE"
    assert not validate_capture(m, tmp_path)["valid"]
    m = template(tmp_path)
    m["published_result"]["final_exact_score"] = "50.00"
    assert not validate_capture(m, tmp_path)["valid"]


def test_no_lookahead_or_unreviewed_issuer_levels(tmp_path):
    m = template(tmp_path)
    m["snapshot"]["core"]["R1"]["observations"]["MSFT"] = {
        "level": 1, "known_public_by_at": "2026-11-05T00:00:00+00:00",
        "availability_basis": "CONSERVATIVE_KNOWN_PUBLIC_BY",
        "valid_until": "2026-11-17T23:59:59-05:00",
        "source_class": "PRIMARY_FACT",
        "source_url": "https://example.test/earnings",
        "measurement": "cash PPE versus revenue YOY", "rationale": "source test",
        "counterevidence": "Cloud demand", "causal_root_id": "R1-MSFT",
    }
    assert not validate_capture(m, tmp_path)["valid"]


def test_immutable_roster_and_cohort_freeze(tmp_path):
    m = template(tmp_path)
    m["snapshot"]["core"]["R4"]["roster"]["MSFT"] = "0.20"
    assert not validate_capture(m, tmp_path)["valid"]
    m = template(tmp_path)
    m["snapshot"]["cohort_frozen_at"] = "2026-11-04T00:00:01+00:00"
    assert not validate_capture(m, tmp_path)["valid"]


def test_missing_unknown_issuer_manifest_fails_closed(tmp_path):
    m = template(tmp_path)
    del m["unresolved"]["R2/META"]
    assert not validate_capture(m, tmp_path)["valid"]


def test_published_interval_coverage_and_category_must_match_calculator(tmp_path):
    m = template(tmp_path)
    m["published_result"]["final_interval"] = ["50.00", "50.00"]
    assert not validate_capture(m, tmp_path)["valid"]
    m = template(tmp_path)
    m["published_result"]["category"] = "ALERT"
    assert not validate_capture(m, tmp_path)["valid"]


def test_events_cannot_double_claim_no_event(tmp_path):
    m = template(tmp_path)
    m["event_assessments"]["R3"]["status"] = "ASSESSED_WITH_EVENTS"
    assert not validate_capture(m, tmp_path)["valid"]


def test_physical_overlay_must_be_separately_present(tmp_path):
    m = template(tmp_path)
    del m["physical"]["P3"]
    assert not validate_capture(m, tmp_path)["valid"]


def test_report_date_stale_week_and_source_path_validation(tmp_path):
    m = template(tmp_path)
    m["report_date"] = "2026-10-14"
    assert not validate_capture(m, tmp_path)["valid"]
    m = template(tmp_path)
    m["source_refs"] = ["../../secret"]
    assert not validate_capture(m, tmp_path)["valid"]


def test_v1_cannot_be_published_under_new_v2_manifest(tmp_path):
    m = template(tmp_path)
    m["schema"] = "ai-capex.weekly-capture.v1"
    assert not validate_capture(m, tmp_path)["valid"]


def test_ci_rejects_new_report_without_v2_manifest(tmp_path):
    template(tmp_path)
    got = validate_repository(tmp_path)
    assert len(got) == 1
    assert not got[0]["valid"]
    assert "no matching v2 coverage manifest" in got[0]["errors"][0]


def test_ci_accepts_matching_valid_v2_report_manifest(tmp_path):
    m = template(tmp_path)
    folder = tmp_path / "data/research/weekly"
    folder.mkdir(parents=True)
    (folder / "weekly_challenger_v2_2026-11-04_r1.json").write_text(
        json.dumps(m), encoding="utf-8")
    result = validate_repository(tmp_path)
    assert len(result) == 1
    assert result[0]["valid"], result[0]["errors"]
    assert result[0]["unresolved_count"] == 21


def test_idle_ci_gate_reports_not_started_not_complete(tmp_path):
    (tmp_path / "Docs/research").mkdir(parents=True)
    (tmp_path / "data/research/weekly").mkdir(parents=True)
    result = validate_repository(tmp_path)
    assert len(result) == 1 and result[0]["valid"]
    assert result[0]["data_status"] == "NOT_STARTED"


def test_malformed_v2_weekly_filename_rejected(tmp_path):
    m = template(tmp_path)
    folder = tmp_path / "data/research/weekly"
    folder.mkdir(parents=True)
    (folder / "weekly_challenger_v2_2026-11-04_r0.json").write_text(
        json.dumps(m), encoding="utf-8")
    assert not all(row["valid"] for row in validate_repository(tmp_path))


def test_future_dated_event_context_cannot_backfill_historical_cutoff(tmp_path):
    m = template(tmp_path)
    m["event_assessments"]["R5"]["latest_source_public_by_at"] = "2026-11-04T06:00:00+00:00"
    assert not validate_capture(m, tmp_path)["valid"]


def test_future_dated_physical_context_fails_pit(tmp_path):
    m = template(tmp_path)
    m["physical"]["P1"]["latest_source_public_by_at"] = "2026-11-04T05:00:00+00:00"
    assert not validate_capture(m, tmp_path)["valid"]


def test_manifest_filename_must_equal_report_date(tmp_path):
    m = template(tmp_path)
    folder = tmp_path / "data/research/weekly"
    folder.mkdir(parents=True)
    (folder / "weekly_challenger_v2_2026-11-05_r1.json").write_text(
        json.dumps(m), encoding="utf-8")
    results = validate_repository(tmp_path)
    assert not all(row["valid"] for row in results)
    assert any("filename/report_date mismatch" in str(row.get("errors")) for row in results)
