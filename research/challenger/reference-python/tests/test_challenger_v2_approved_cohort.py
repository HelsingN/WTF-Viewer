"""Prospectively accepted v2 research cohort and 2-stratum R4 gate.

The contract is research-only; tests do NOT grant review or trading authority.
"""
from copy import deepcopy
from pathlib import Path
from decimal import Decimal

import pytest
import yaml

from scoring.challenger_v2 import (
    APPROVED_RESEARCH_COHORT_VERSION, APPROVED_RESEARCH_COHORT_AT,
    APPROVED_RESEARCH_ROSTERS, evaluate_challenger_v2,
)


def approved_manifest() -> dict:
    path = (Path(__file__).resolve().parents[1] /
            "data/research/challenger/challenger_v2_research_approved_cohort_2026-11-04.yaml")
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def full_snapshot() -> dict:
    doc = approved_manifest()
    observation = {
        "level": 1,
        "first_public_at": "2026-11-02T11:00:00-05:00",
        "availability_basis": "FIRST_PUBLIC_VERIFIED",
        "valid_until": "2026-11-30T00:00:00+00:00",
        "source_class": "PRIMARY_FACT",
        "source_url": "https://www.sec.gov/",
        "measurement": "Unit-test verified comparable inputs only",
        "rationale": "Unit test, not a real market level",
        "counterevidence": "Independent cloud and credit strength",
        "causal_root_id": "unit-test-source",
    }
    return {
        "schema": "ai-capex.challenger-observable.v2-draft",
        "cohort_version": doc["version"],
        "cohort_frozen_at": doc["cohort_frozen_at"],
        "as_of": "2026-11-04T10:00:00+02:00",
        "core": {
            name: {
                "roster": dict(factor["issuer_weights"]),
                "observations": {
                    issuer: {**observation, "causal_root_id": name + "-" + issuer}
                    for issuer in factor["issuer_weights"]
                },
            }
            for name, factor in doc["core"].items()
            if name in ("R1", "R2", "R4")
        },
        "events": [],
    }


def test_approval_manifest_matches_reviewed_code_and_freeze():
    manifest = approved_manifest()
    assert manifest["version"] == APPROVED_RESEARCH_COHORT_VERSION
    assert manifest["status"] == "RESEARCH_APPROVED_NOT_ACTIVE"
    assert manifest["cutover_authorized"] is False
    assert manifest["trading_signal"] is False
    assert manifest["core"]["R1"]["watch_growth_gap_pp"] == "20"
    assert manifest["core"]["R2"]["watch_margin_deterioration_pp"] == "10"
    assert manifest["core"]["R4"]["strata"]["large_platform"]["minimum_within_stratum_coverage"] == "0.60"
    assert manifest["core"]["R4"]["strata"]["project_neocloud"]["minimum_within_stratum_coverage"] == "0.50"
    assert APPROVED_RESEARCH_COHORT_AT.isoformat() == "2026-11-03T22:28:54+00:00"
    for f, approved in APPROVED_RESEARCH_ROSTERS.items():
        actual = manifest["core"][f]["issuer_weights"]
        assert {name: Decimal(weight) for name, weight in actual.items()} == approved
        assert sum(approved.values()) == Decimal("1")


def test_approved_snapshot_stays_research_only_and_shows_strata():
    r = evaluate_challenger_v2(full_snapshot())
    assert r["core_factors"]["R4"]["coverage_pct"] == "100.00"
    assert r["core_factors"]["R4"]["strata_coverage_pct"] == {
        "large_platform": "100.00", "project_neocloud": "100.00"}
    assert r["core_factors"]["R4"]["coverage_ok_for_research"] is True
    assert r["status"] == "EXACT_RESEARCH_ARITHMETIC"
    assert r["final_exact_score"] == "50.00"
    assert r["category"] is None
    assert r["trading_signal"] is False


def test_aggregate_r4_70pct_cannot_hide_insufficient_platform_representation():
    s = full_snapshot()
    r4 = s["core"]["R4"]["observations"]
    for issuer in ("AMZN", "META", "ORCL"):
        del r4[issuer]
    r = evaluate_challenger_v2(s)
    assert r["core_factors"]["R4"]["coverage_pct"] == "70.00"
    assert r["core_factors"]["R4"]["coverage_ok_70pct"] is True
    assert r["core_factors"]["R4"]["strata_coverage_pct"] == {
        "large_platform": "40.00", "project_neocloud": "100.00"}
    assert r["core_factors"]["R4"]["coverage_ok_for_research"] is False
    assert r["status"] == "LOW_COVERAGE_BOUND_ONLY"
    assert r["final_exact_score"] is None


def test_approved_cohort_refuses_cherry_picked_issuer_roster_or_changed_weights():
    s = full_snapshot()
    s["core"]["R4"]["roster"]["IREN"] = "0.15"
    with pytest.raises(ValueError, match="approved weight mismatch"):
        evaluate_challenger_v2(s)
    s = full_snapshot()
    del s["core"]["R1"]["roster"]["META"]
    with pytest.raises(ValueError, match="membership mismatch"):
        evaluate_challenger_v2(s)


def test_approved_cohort_refuses_fraudulent_freeze_and_backdated_pit():
    s = full_snapshot()
    s["cohort_frozen_at"] = "2026-11-02T22:28:54+00:00"
    with pytest.raises(ValueError, match="freeze timestamp differs"):
        evaluate_challenger_v2(s)
    s = full_snapshot()
    s["as_of"] = "2026-11-02T16:00:00-05:00"
    with pytest.raises(ValueError, match="frozen before PIT"):
        evaluate_challenger_v2(s)
    s = full_snapshot()
    del s["cohort_frozen_at"]
    s["posthoc_replay"] = {
        "mode": "POSTHOC_METHOD_REPLAY",
        "cohort_proposed_at": "2026-11-03T22:28:54+00:00",
        "claimed_preregistered": False,
    }
    with pytest.raises(ValueError, match="cannot be used as posthoc"):
        evaluate_challenger_v2(s)


def test_repository_research_input_template_parses_and_is_no_trade():
    """Prevent accidentally shipping a sample that YAML cannot parse."""
    example = (Path(__file__).resolve().parents[1]
               / "data/research/challenger/challenger_v2_input_template.yaml")
    payload = yaml.safe_load(example.read_text(encoding="utf-8"))
    assert isinstance(payload, dict)
    assert payload["core"]["R1"]["observations"] == {}
    assert payload["core"]["R2"]["observations"] == {}
    assert payload["core"]["R4"]["observations"] == {}
    report = evaluate_challenger_v2(payload)
    assert report["status"] == "LOW_COVERAGE_BOUND_ONLY"
    assert report["core_interval"] == ["0.00", "100.00"]
    assert report["final_interval"] == ["0.00", "100.00"]
    assert report["category"] is None
    assert report["trading_signal"] is False
