"""One-off posthoc Challenger v2 checks; no historical preregistration claims."""
from copy import deepcopy

import pytest

from scripts.research.one_off_challenger_v2_replay import run_replay
from scoring.challenger_v2 import evaluate_challenger_v2


def test_bounded_posthoc_replay_uses_unapproved_cohort_and_never_trades():
    report = run_replay()
    assert report["trading_signal"] is False
    assert report["market_validation"] == "NOT_PERFORMED"
    assert len(report["vintages"]) == 5
    assert all(x["roster_retroactively_selected"] is True for x in report["vintages"])
    assert all(x["result"]["status"] == "POSTHOC_REPLAY_UNVALIDATED"
               for x in report["vintages"])
    assert all(x["result"]["historically_preregistered"] is False
               for x in report["vintages"])
    assert all(x["result"]["trading_signal"] is False
               and x["result"]["category"] is None for x in report["vintages"])


def test_old_cutoffs_do_not_import_new_issuer_disclosures():
    report = run_replay()
    old = report["vintages"][0]["result"]
    assert report["vintages"][0]["vintage"] == "2026-09-09"
    assert old["core_interval"] == ["9.09", "90.91"]
    assert old["core_factors"]["R1"]["coverage_pct"] == "0.00"
    assert old["core_factors"]["R2"]["coverage_pct"] == "0.00"
    assert old["core_factors"]["R4"]["coverage_pct"] == "50.00"

    oct14 = report["vintages"][3]["result"]
    assert report["vintages"][3]["vintage"] == "2026-10-14"
    assert oct14["core_factors"]["R1"]["coverage_pct"] == "20.00"
    assert oct14["core_factors"]["R2"]["coverage_pct"] == "20.00"
    assert oct14["core_factors"]["R4"]["coverage_pct"] == "50.00"
    assert oct14["core_interval"] == ["15.45", "84.55"]


def test_nov2_posthoc_is_interval_not_legacy_v1_score():
    report = run_replay()
    nov2 = report["vintages"][-1]["result"]
    assert report["vintages"][-1]["vintage"] == "2026-11-02"
    assert nov2["core_factors"]["R1"]["coverage_pct"] == "100.00"
    assert nov2["core_factors"]["R2"]["coverage_pct"] == "100.00"
    assert nov2["core_factors"]["R4"]["coverage_pct"] == "50.00"
    assert nov2["core_interval"] == ["40.91", "59.09"]
    assert nov2["final_interval"] == ["40.91", "59.09"]
    assert nov2["final_exact_score"] is None
    assert nov2["event_total_adjustment"] == "0.00"
    assert nov2["core_factors"]["R4"]["coverage_ok_70pct"] is False


def test_one_off_three_case_sensitivity_is_explicit_and_nonpredictive():
    data = run_replay()
    sensitivities = data["one_off_sensitivity"]
    assert sensitivities["baseline"]["final_interval"] == ["40.91", "59.09"]
    assert sensitivities["zero_event_overlay"]["final_interval"] == ["40.91", "59.09"]
    assert sensitivities["conservative"]["final_interval"] == ["34.55", "65.45"]
    assert sensitivities["conservative"]["r2_coverage_pct"] == "80.00"
    assert sensitivities["conservative"]["r4_coverage_pct"] == "30.00"
    assert data["market_validation"] == "NOT_PERFORMED"


def test_normal_engine_refuses_posthistorical_cohort_unless_flagged():
    report = run_replay()
    # Independent guard via minimal unscored, structurally valid cohort:
    snapshot = {
        "schema": "ai-capex.challenger-observable.v2-draft",
        "as_of": "2026-11-02T16:00:00-05:00",
        "cohort_version": "design-not-frozen",
        "cohort_frozen_at": "2026-11-03T21:36:40Z",
        "core": {
            f: {"roster": {"A": "1"}, "observations": {}}
            for f in ("R1", "R2", "R4")
        },
        "events": [],
    }
    with pytest.raises(ValueError, match="frozen before PIT"):
        evaluate_challenger_v2(snapshot)

    snapshot.pop("cohort_frozen_at")
    snapshot["posthoc_replay"] = {
        "mode": "POSTHOC_METHOD_REPLAY",
        "cohort_proposed_at": "2026-11-03T21:36:40Z",
        "claimed_preregistered": False,
    }
    r = evaluate_challenger_v2(snapshot)
    assert r["status"] == "POSTHOC_REPLAY_UNVALIDATED"
    assert r["cohort_frozen_at"] is None

    snapshot["posthoc_replay"]["claimed_preregistered"] = True
    with pytest.raises(ValueError, match="non-preregistered"):
        evaluate_challenger_v2(snapshot)


def test_sec_timestamps_register_uses_fresh_august_credit_sources():
    from scripts.research.one_off_challenger_v2_replay import SOURCE_DOCS, KNOWN_BY
    assert SOURCE_DOCS["CRWV"]["facility_committed_usd_bn"] == "8.5"
    assert SOURCE_DOCS["CRWV"]["drawn_as_of_2026_06_30_usd_bn"] == "2.837"
    assert SOURCE_DOCS["IREN"]["facility_committed_usd_bn"] == "3.645"
    assert SOURCE_DOCS["IREN"]["total_funded_as_of_2026_06_30_usd_bn"] == "0.938"
    assert KNOWN_BY["R4"]["CRWV"] == "2026-08-12T12:00:00-04:00"
    assert KNOWN_BY["R4"]["IREN"] == "2026-08-28T12:00:00-04:00"
    assert SOURCE_DOCS["GOOGL"]["accepted_at_et"] == "2026-10-28T20:29:06-04:00"
    assert SOURCE_DOCS["META"]["accepted_at_et"] == "2026-10-21T16:03:35-04:00"
