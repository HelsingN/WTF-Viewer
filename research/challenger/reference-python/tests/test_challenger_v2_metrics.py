"""Measured, bounded issuer metrics from already saved 2026 research."""
import pytest

from pathlib import Path

import yaml

from scoring.challenger_v2_metrics import (
    build_recovered_metrics, r1_growth_gap, r2_cash_flow, r2_compare_periods,
    r4_documentary_gate,
)


def test_alphabet_r1_growth_gap_is_cross_scope_not_ai_roi():
    result = r1_growth_gap(
        monetization_growth_pct="103",
        capex_current="51.36",
        capex_previous="23.95",
        period_basis="YOY_QUARTER",
        scope_relation="CROSS_SCOPE_PROXY",
    )
    assert result["capex_growth_pct"] == "114.447"
    assert result["growth_gap_pp"] == "11.447"
    assert result["decision_eligible_without_independent_corroboration"] is False
    assert "NOT_AI_ROI" in result["qualification"]


def test_alphabet_matched_corporate_growth_yields_watch_candidate_not_ai_roi():
    result = r1_growth_gap(
        monetization_growth_pct="25",
        capex_current="51.36",
        capex_previous="23.95",
        period_basis="YOY_QUARTER",
        scope_relation="MATCHED_SCOPE",
    )
    assert result["growth_gap_pp"] == "89.447"
    assert result["risk_level_candidate"] == 1
    assert result["capex_to_revenue_intensity_change_pct"] == "71.557"
    assert "NOT marginal AI-only ROI" in result["qualification"]


def test_r1_rejects_cross_period_basis_and_missing_scope():
    base = dict(
        monetization_growth_pct="103", capex_current="51.36",
        capex_previous="23.95", scope_relation="MATCHED_SCOPE",
    )
    with pytest.raises(ValueError, match="matched YoY"):
        r1_growth_gap(**base, period_basis="QOQ_QUARTER")
    with pytest.raises(ValueError, match="scope"):
        r1_growth_gap(**{**base, "scope_relation": "INFERRED"}, period_basis="YOY_QUARTER")
    with pytest.raises(ValueError, match="positive"):
        r1_growth_gap(**{**base, "capex_previous": "0"}, period_basis="YOY_QUARTER")


def test_r2_cash_panel_reproduces_msft_alphabet_amazon_meta_oracle():
    msft = r2_cash_flow(operating_cash_flow="58", cash_ppe="39.367")
    goog = r2_cash_flow(operating_cash_flow="42.300", cash_ppe="51.360")
    amazon = r2_cash_flow(
        operating_cash_flow="42.422", cash_ppe="77.259", ppe_incentives="1.381",
    )
    meta = r2_cash_flow(
        operating_cash_flow="32.786", cash_ppe="33.942",
        ppe_incentives="0", finance_lease_principal="0.964",
    )
    oracle = r2_cash_flow(operating_cash_flow="23.103", cash_ppe="28.499")
    assert msft["gross_cash_ppe_proxy"] == "18.633"
    assert goog["gross_cash_ppe_proxy"] == "-9.060"
    assert amazon["gross_cash_ppe_proxy"] == "-34.837"
    assert amazon["net_cash_ppe_proxy"] == "-33.456"
    assert amazon["lease_inclusive_fcf"] is None
    assert meta["gross_cash_ppe_proxy"] == "-1.156"
    assert meta["lease_inclusive_fcf"] == "-2.120"
    assert oracle["gross_cash_ppe_proxy"] == "-5.396"
    assert msft["finance_lease_missing"] is True


def test_r2_meta_comparable_q2_q3_is_one_not_two():
    earlier = r2_cash_flow(
        operating_cash_flow="31.862", cash_ppe="30.116",
        ppe_incentives="0", finance_lease_principal="0.962",
    )
    later = r2_cash_flow(
        operating_cash_flow="32.786", cash_ppe="33.942",
        ppe_incentives="0", finance_lease_principal="0.964",
    )
    c = r2_compare_periods(
        earlier=earlier, later=later,
        accounting_basis="LEASE_INCLUSIVE_FCF",
        earlier_period="2026-Q2", later_period="2026-Q3", period_family="QUARTER",
    )
    assert c["earlier_fcf"] == "0.784"
    assert c["later_fcf"] == "-2.120"
    assert c["delta_fcf"] == "-2.904"
    assert c["risk_level_candidate"] == 1


def test_r2_alphabet_gross_ppe_proxy_cannot_certify_level_2():
    earlier = r2_cash_flow(operating_cash_flow="39.1", cash_ppe="44.9")
    later = r2_cash_flow(operating_cash_flow="42.3", cash_ppe="51.36")
    c = r2_compare_periods(
        earlier=earlier, later=later, accounting_basis="GROSS_PPE_PROXY",
        earlier_period="2026-Q2", later_period="2026-Q3",
        period_family="QUARTER",
    )
    assert c["earlier_fcf"] == "-5.800"
    assert c["later_fcf"] == "-9.060"
    assert c["delta_fcf"] == "-3.260"
    assert c["risk_level_candidate"] == 1


def test_r2_positive_but_materially_deteriorating_cash_margin_is_watch():
    earlier = r2_cash_flow(operating_cash_flow="45.057", cash_ppe="19.394")
    later = r2_cash_flow(operating_cash_flow="58", cash_ppe="39.367")
    c = r2_compare_periods(
        earlier=earlier, later=later,
        accounting_basis="GROSS_PPE_PROXY", earlier_period="FY26Q1",
        later_period="FY27Q1", period_family="QUARTER",
    )
    assert c["earlier_fcf_to_ocf_pct"] == "56.957"
    assert c["latest_fcf_to_ocf_pct"] == "32.126"
    assert c["fcf_to_ocf_change_pp"] == "-24.831"
    assert c["risk_level_candidate"] == 1
    assert "PROXY" in c["qualification"]


def test_r2_unknown_lease_stays_unknown_for_lease_comparison():
    earlier = r2_cash_flow(operating_cash_flow="55.4", cash_ppe="35.8")
    later = r2_cash_flow(operating_cash_flow="58.0", cash_ppe="39.367")
    c = r2_compare_periods(
        earlier=earlier, later=later,
        accounting_basis="LEASE_INCLUSIVE_FCF",
        earlier_period="FY26Q4", later_period="FY27Q1", period_family="QUARTER",
    )
    assert c["status"] == "UNKNOWN_MISSING_SAME_BASIS"
    assert c["risk_level_candidate"] is None
    gross = r2_compare_periods(
        earlier=earlier, later=later, accounting_basis="GROSS_PPE_PROXY",
        earlier_period="FY26Q4", later_period="FY27Q1", period_family="QUARTER",
    )
    assert gross["delta_fcf"] == "-0.967"
    assert gross["risk_level_candidate"] is None


def test_r2_two_negative_complete_lease_periods_are_level_2_candidate():
    earlier = r2_cash_flow(
        operating_cash_flow="30", cash_ppe="32",
        ppe_incentives="0", finance_lease_principal="1",
    )
    later = r2_cash_flow(
        operating_cash_flow="30", cash_ppe="35",
        ppe_incentives="0", finance_lease_principal="2",
    )
    c = r2_compare_periods(
        earlier=earlier, later=later, accounting_basis="LEASE_INCLUSIVE_FCF",
        earlier_period="Q1", later_period="Q2", period_family="QUARTER",
    )
    assert c["risk_level_candidate"] == 2


def test_r2_invalid_flows_and_incentives_fail():
    with pytest.raises(ValueError, match="outside purchase"):
        r2_cash_flow(operating_cash_flow="2", cash_ppe="1", ppe_incentives="2")
    with pytest.raises(ValueError, match="negative"):
        r2_cash_flow(operating_cash_flow="2", cash_ppe="1", finance_lease_principal="-1")
    with pytest.raises(ValueError, match="invalid"):
        r2_cash_flow(operating_cash_flow=True, cash_ppe="1")


def test_r4_credit_access_cannot_auto_prove_zero_and_outlook_not_downgrade():
    base = {"legal_borrower_verified": True, "evidence_class": "PRIMARY_FACT",
            "counterevidence_reviewed": True}
    for kind in ("CREDIT_ACCESS_CONFIRMED", "PROPOSED_FINANCING",
                 "UNDRAWN_OPTION", "NEGATIVE_OUTLOOK"):
        assert r4_documentary_gate(event_type=kind, **base)["risk_level_candidate"] is None
    assert r4_documentary_gate(
        event_type="GUARANTEE_OR_COLLATERAL", **base
    )["risk_level_candidate"] is None
    assert r4_documentary_gate(
        event_type="GUARANTEE_OR_COLLATERAL",
        incremental_material_dependence_verified=True, **base
    )["risk_level_candidate"] == 1


def test_r4_project_spv_mapping_and_same_instrument_repricing_required():
    base = {"evidence_class": "INDEPENDENT_CONFIRMATION",
            "counterevidence_reviewed": True}
    assert r4_documentary_gate(
        event_type="SYNDICATION_DIFFICULTY",
        legal_borrower_verified=False, **base
    )["risk_level_candidate"] is None
    assert r4_documentary_gate(
        event_type="MATERIAL_REPRICING", legal_borrower_verified=True,
        rollover_dependence_verified=True, repricing_matched_verified=False, **base
    )["risk_level_candidate"] is None
    assert r4_documentary_gate(
        event_type="MATERIAL_REPRICING", legal_borrower_verified=True,
        rollover_dependence_verified=True, repricing_matched_verified=True, **base
    )["risk_level_candidate"] == 2


def test_r4_failure_requires_real_primary_or_confirmed_evidence():
    assert r4_documentary_gate(
        event_type="REFINANCING_FAILURE", legal_borrower_verified=True,
        evidence_class="SECONDARY_UNCONFIRMED", counterevidence_reviewed=True,
    )["risk_level_candidate"] is None
    assert r4_documentary_gate(
        event_type="REFINANCING_FAILURE", legal_borrower_verified=True,
        evidence_class="PRIMARY_FACT", counterevidence_reviewed=True,
    )["risk_level_candidate"] == 2



def test_recovered_primary_and_secondary_audit_fixture_is_not_live_model():
    path = (Path(__file__).resolve().parents[1] / "data/research/challenger"
            / "challenger_v2_recovered_observables_2026-11-02.yaml")
    rows = yaml.safe_load(path.read_text(encoding="utf-8"))
    report = build_recovered_metrics(rows)
    assert report["is_v2_score"] is False
    assert report["trading_signal"] is False
    assert report["approved_cohort"] is False
    assert report["reviewer_pass"] is False
    assert report["candidate_counts"] == {"R1": 5, "R2": 5, "R4": 2}
    assert {k: v["metrics"]["growth_gap_pp"] for k, v in report["r1"].items()} == {
        "MSFT": "84.181",
        "GOOGL": "89.447",
        "AMZN": "108.057",
        "META": "54.194",
        "ORCL": "205.597",
    }
    assert all(x["risk_level_candidate"] == 1 for x in report["r1"].values())
    assert report["r1"]["GOOGL"]["counterevidence"].startswith("Google Cloud")
    assert report["r2"]["META"]["comparison"]["risk_level_candidate"] == 1
    assert report["r2"]["GOOGL"]["comparison"]["risk_level_candidate"] == 1
    assert report["r2"]["AMZN"]["latest"]["net_cash_ppe_proxy"] == "-33.456"
    assert report["r2"]["AMZN"]["comparison"]["earlier_fcf"] == "1.297"
    assert report["r2"]["AMZN"]["comparison"]["delta_fcf"] == "-34.753"
    assert report["r2"]["MSFT"]["comparison"]["earlier_fcf"] == "25.663"
    assert report["r2"]["MSFT"]["comparison"]["delta_fcf"] == "-7.030"
    assert report["r2"]["ORCL"]["comparison"]["earlier_fcf"] == "-0.362"
    assert report["r2"]["ORCL"]["comparison"]["delta_fcf"] == "-5.034"
    assert report["r2"]["MSFT"]["risk_level_candidate"] == 1
    assert report["r2"]["MSFT"]["comparison"]["fcf_to_ocf_change_pp"] == "-24.831"
    assert report["r4"]["ORCL"]["reason"] == "LEGAL_ENTITY_MAPPING_UNVERIFIED"
    assert report["r4"]["CRWV"]["risk_level_candidate"] == 1
    assert report["r4"]["LAMBDA_PRIVATE"]["risk_level_candidate"] is None


def test_recovered_research_fixture_rejects_tampered_approval_flag():
    with pytest.raises(ValueError, match="unapproved"):
        build_recovered_metrics({
            "schema": "ai-capex.challenger-v2.recovered-observables.v1",
            "status": "ACTIVE_MODEL",
        })



def test_raw_revenue_pair_required_for_matched_company_growth():
    path = (Path(__file__).resolve().parents[1] / "data/research/challenger"
            / "challenger_v2_recovered_observables_2026-11-02.yaml")
    rows = yaml.safe_load(path.read_text(encoding="utf-8"))
    del rows["r1"]["MSFT"]["revenue_previous"]
    with pytest.raises(ValueError, match="complete matched revenue pair"):
        build_recovered_metrics(rows)
