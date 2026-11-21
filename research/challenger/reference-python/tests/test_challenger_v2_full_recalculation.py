"""Full approved v2 research recalculation must not fabricate complete R4 coverage."""
import sys
from copy import deepcopy
from pathlib import Path

import yaml
from scoring.challenger_v2 import evaluate_challenger_v2

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts/research"))
from one_off_challenger_v2_full_recalculation import calculate, AS_OF


def test_all_issuer_factor_slots_recalculated_and_missing_explicit():
    out = calculate()
    assert out["all_roster_slots_processed"] == 17
    assert out["evidence_cutoff"] == "2026-11-02T16:00:00-05:00"
    assert out["cohort_freeze"] == "2026-11-03T22:28:54+00:00"
    ev = out["evaluation"]
    assert ev["status"] == "BOUNDED_RESEARCH_WITH_UNCERTAINTY"
    assert ev["core_factors"]["R1"]["coverage_pct"] == "100.00"
    assert ev["core_factors"]["R2"]["coverage_pct"] == "100.00"
    assert ev["core_factors"]["R4"]["coverage_pct"] == "80.00"
    assert ev["core_factors"]["R4"]["coverage_ok_for_research"] is True
    assert ev["core_coverage_pct"] == "92.73"
    assert ev["core_factors"]["R4"]["strata_coverage_pct"] == {
        "large_platform": "60.00", "project_neocloud": "100.00"}
    assert ev["core_interval"] == ["46.36", "53.64"]
    assert ev["final_interval"] == ["46.36", "53.64"]
    assert ev["final_exact_score"] is None
    assert ev["category"] is None and ev["trading_signal"] is False
    assert out["no_current_authoritative_v2_score"] is True
    assert out["new_source_search_performed"] is True
    assert out["research_coverage_sufficient_but_score_bounded"] is True
    assert set(ev["core_factors"]["R4"]["missing_or_stale"]) == {"MSFT", "GOOGL"}
    for f in ("R1", "R2"):
        assert {issuer: x["level_candidate"] for issuer, x in
                out["issuer_decisions"][f].items()} == dict.fromkeys(
                    ["MSFT", "GOOGL", "AMZN", "META", "ORCL"], 1)
    assert out["issuer_decisions"]["R4"]["CRWV"]["level_candidate"] == 1
    assert out["issuer_decisions"]["R4"]["IREN"]["level_candidate"] == 1
    for issuer in ("AMZN", "META", "ORCL"):
        assert out["issuer_decisions"]["R4"][issuer]["level_candidate"] == 1
    for issuer in ("MSFT", "GOOGL"):
        assert out["issuer_decisions"]["R4"][issuer]["level_candidate"] is None


def test_frozen_cohort_cannot_be_backdated():
    with pytest.raises(ValueError, match="cannot predate"):
        calculate("2026-11-02T16:00:00-05:00")


def test_recalculation_has_no_new_independent_event_claims():
    out = calculate()
    assert out["snapshot"]["events"] == []
    assert out["evaluation"]["event_total_adjustment"] == "0.00"
    assert out["evaluation"]["calibration"] == "UNCALIBRATED"


def test_new_meta_issuer_r4_not_backdated_to_before_reuters_known_by():
    out = calculate()
    meta = out["snapshot"]["core"]["R4"]["observations"]["META"]
    assert meta["source_class"] == "INDEPENDENT_CONFIRMATION"
    assert meta["known_public_by_at"] == "2026-11-03T18:13:00-05:00"
    assert meta["level"] == 1


def test_amazon_80b_supplier_facility_is_not_assumed_drawn():
    out = calculate()
    amazon = out["issuer_decisions"]["R4"]["AMZN"]
    assert amazon["level_candidate"] == 1
    assert "ZERO assumption of current $80bn funding" in amazon["measurement"]


def test_new_meta_publication_cutoff_sensitivity_fails_platform_gate():
    out = calculate()
    snapshot = deepcopy(out["snapshot"])
    del snapshot["core"]["R4"]["observations"]["META"]
    stress = evaluate_challenger_v2(snapshot)
    assert stress["status"] == "LOW_COVERAGE_BOUND_ONLY"
    assert stress["core_factors"]["R4"]["coverage_pct"] == "70.00"
    assert stress["core_factors"]["R4"]["strata_coverage_pct"]["large_platform"] == "40.00"
    assert stress["final_interval"] == ["44.55", "55.45"]
    assert stress["final_exact_score"] is None


def test_persisted_summary_matches_deterministic_v2_calculation():
    summary = yaml.safe_load((ROOT / "data/research/challenger/challenger_v2_recalculation_summary_2026-11-04.yaml").read_text(encoding="utf-8"))
    out = calculate()
    calc = out["evaluation"]
    assert summary["status"] == calc["status"]
    assert summary["as_of"] == out["as_of"]
    assert summary["cohort_version"] == out["snapshot"]["cohort_version"]
    assert summary["final_interval"] == calc["final_interval"]
    assert summary["core_interval"] == calc["core_interval"]
    assert summary["core_coverage_pct"] == calc["core_coverage_pct"]
    assert summary["event_review"]["candidates_reviewed"] == out["event_candidates_reviewed"]
    assert summary["event_review"]["incremental_adjustment"] == calc["event_total_adjustment"]
    assert summary["independent_reviewer_approved"] is False
    assert summary["category"] is None
    assert summary["trading_signal"] is False
    for factor in ("R1", "R2", "R4"):
        assert summary["factor_results"][factor]["level_bounds"] == calc["core_factors"][factor]["level_bounds"]
        assert summary["factor_results"][factor]["coverage_pct"] == calc["core_factors"][factor]["coverage_pct"]
        for issuer, v in summary[factor.lower() + "_issuer_levels"].items():
            assert v == out["issuer_decisions"][factor][issuer]["level_candidate"]


def test_cutoff_must_not_include_later_published_meta_primary_before_public_by():
    out = calculate()
    meta = out["snapshot"]["core"]["R4"]["observations"]["META"]
    assert meta["availability_basis"] == "CONSERVATIVE_KNOWN_PUBLIC_BY"
    assert "first_public_at" not in meta
    assert meta["known_public_by_at"] == "2026-11-03T18:13:00-05:00"
