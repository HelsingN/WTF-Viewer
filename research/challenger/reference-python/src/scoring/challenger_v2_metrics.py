"""Issuer-level metrics for Challenger v2 (RESEARCH ONLY).

All inputs come from independently reviewed dated sources. These routines
calculate reproducible quantities, NOT calibrated risk or trading signals.
Missing proceeds/lease principal never default to zero.
"""
from __future__ import annotations

from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from typing import Any, Mapping

Q = Decimal("0.001")


def _dec(value: Any, label: str) -> Decimal:
    if value is None or isinstance(value, bool):
        raise ValueError(f"{label}: missing or invalid")
    try:
        n = Decimal(str(value))
    except (InvalidOperation, ValueError, TypeError) as exc:
        raise ValueError(f"{label}: invalid decimal") from exc
    if not n.is_finite():
        raise ValueError(f"{label}: nonfinite decimal")
    return n


def _optional(value: Any, label: str) -> Decimal | None:
    return None if value is None else _dec(value, label)


def _fmt(x: Decimal) -> str:
    return str(x.quantize(Q, rounding=ROUND_HALF_UP))


def _positive(value: Any, label: str) -> Decimal:
    n = _dec(value, label)
    if n <= 0:
        raise ValueError(f"{label}: expected strictly positive")
    return n


def _nonnegative(value: Any, label: str) -> Decimal:
    n = _dec(value, label)
    if n < 0:
        raise ValueError(f"{label}: expected nonnegative")
    return n


def r1_growth_gap(
    *,
    monetization_growth_pct: Any,
    capex_current: Any,
    capex_previous: Any,
    period_basis: str,
    scope_relation: str,
) -> dict[str, Any]:
    """Matched year-on-year periods. Cross-scope yields a diagnostic only.

    Example: Google Cloud growth alongside Alphabet whole-company CapEx.
    A numerical gap is measurable, but cannot be labelled AI ROI.
    """
    if period_basis not in ("YOY_QUARTER", "YOY_TTM"):
        raise ValueError("R1: only matched YoY quarter/TTM comparisons")
    if scope_relation not in ("MATCHED_SCOPE", "CROSS_SCOPE_PROXY"):
        raise ValueError("R1: explicit scope classification required")
    revenue_growth = _dec(monetization_growth_pct, "monetization_growth_pct")
    if revenue_growth <= -100:
        raise ValueError("R1: impossible revenue growth")
    current = _positive(capex_current, "capex_current")
    previous = _positive(capex_previous, "capex_previous")
    capex_growth = (current / previous - 1) * 100
    gap = capex_growth - revenue_growth
    intensity_change = ((Decimal(1) + capex_growth / 100)
                        / (Decimal(1) + revenue_growth / 100) - Decimal(1)) * 100
    # One matched enterprise-wide period can only flag a WATCH candidate.
    # Persistent return deterioration for level 2 requires independent evidence.
    level = (
        1 if scope_relation == "MATCHED_SCOPE"
        and gap >= Decimal("20") and intensity_change > 0
        else None
    )
    return {
        "capex_growth_pct": _fmt(capex_growth),
        "monetization_growth_pct": _fmt(revenue_growth),
        "growth_gap_pp": _fmt(gap),
        "capex_to_revenue_intensity_change_pct": _fmt(intensity_change),
        "period_basis": period_basis,
        "scope_relation": scope_relation,
        "risk_level_candidate": level,
        "decision_eligible_without_independent_corroboration": scope_relation == "MATCHED_SCOPE",
        "qualification": (
            "MATCHED_ENTERPRISE_SCOPE_WATCH_MAX; this is NOT marginal AI-only ROI"
            if scope_relation == "MATCHED_SCOPE"
            else "CROSS_SCOPE_PROXY_NOT_AI_ROI; cannot alone establish R1 level"
        ),
    }


def r2_cash_flow(
    *,
    operating_cash_flow: Any,
    cash_ppe: Any,
    ppe_incentives: Any = None,
    finance_lease_principal: Any = None,
) -> dict[str, Any]:
    """Compute net and lease-inclusive FCF only when disclosed.

    All inputs use same currency/scale/window. A missing item is not 0.
    """
    ocf = _dec(operating_cash_flow, "operating_cash_flow")
    ppe = _nonnegative(cash_ppe, "cash_ppe")
    inc = _optional(ppe_incentives, "ppe_incentives")
    lease = _optional(finance_lease_principal, "finance_lease_principal")
    if inc is not None and (inc < 0 or inc > ppe):
        raise ValueError("ppe_incentives: outside purchase range")
    if lease is not None and lease < 0:
        raise ValueError("finance_lease_principal: negative")
    gross = ocf - ppe
    net = None if inc is None else gross + inc
    lease_inclusive = None if net is None or lease is None else net - lease
    return {
        "operating_cash_flow": _fmt(ocf),
        "gross_cash_ppe_proxy": _fmt(gross),
        "net_cash_ppe_proxy": _fmt(net) if net is not None else None,
        "lease_inclusive_fcf": _fmt(lease_inclusive) if lease_inclusive is not None else None,
        "ppe_incentives_missing": inc is None,
        "finance_lease_missing": lease is None,
        "qualification": (
            "LEASE_INCLUSIVE_COMPLETE" if lease_inclusive is not None
            else "CASH_PPE_PROXY_ONLY; do not zero-fill incentives or leases"
        ),
    }


def r2_compare_periods(
    *,
    earlier: Mapping[str, Any],
    later: Mapping[str, Any],
    accounting_basis: str,
    earlier_period: str,
    later_period: str,
    period_family: str,
    material_margin_decline_pp: Any = "10",
) -> dict[str, Any]:
    """Compare same-basis observations; caller must check matching windows."""
    basis_keys = {
        "GROSS_PPE_PROXY": "gross_cash_ppe_proxy",
        "NET_PPE_PROXY": "net_cash_ppe_proxy",
        "LEASE_INCLUSIVE_FCF": "lease_inclusive_fcf",
    }
    if accounting_basis not in basis_keys:
        raise ValueError("R2: invalid accounting basis")
    if period_family not in ("QUARTER", "TTM"):
        raise ValueError("R2: period family must be QUARTER or TTM")
    if not earlier_period or not later_period or earlier_period == later_period:
        raise ValueError("R2: distinct reporting windows required")
    key = basis_keys[accounting_basis]
    early = _optional(earlier.get(key), "earlier")
    late = _optional(later.get(key), "later")
    if early is None or late is None:
        return {
            "accounting_basis": accounting_basis,
            "period_family": period_family,
            "status": "UNKNOWN_MISSING_SAME_BASIS",
            "earlier_fcf": None,
            "later_fcf": None,
            "delta_fcf": None,
            "risk_level_candidate": None,
            "qualification": "Missing or mismatched accounting basis",
        }
    delta = late - early
    threshold = _dec(material_margin_decline_pp, "R2 margin decline threshold")
    if threshold < 0 or threshold > 100:
        raise ValueError("R2 material margin threshold must be in [0,100]")
    ocf_early = _optional(earlier.get("operating_cash_flow"), "earlier OCF")
    ocf_late = _optional(later.get("operating_cash_flow"), "later OCF")
    fcf_to_ocf_early = None
    fcf_to_ocf_late = None
    margin_change_pp = None
    if (ocf_early is not None and ocf_late is not None
            and ocf_early > 0 and ocf_late > 0):
        fcf_to_ocf_early = early / ocf_early * Decimal(100)
        fcf_to_ocf_late = late / ocf_late * Decimal(100)
        margin_change_pp = fcf_to_ocf_late - fcf_to_ocf_early
    material_margin_pressure = (
        margin_change_pp is not None and margin_change_pp <= -threshold
    )
    # 10pp FCF-to-OCF decline is a proposed v2 WATCH diagnostic, NOT a
    # validated predictive threshold. Positive gross FCF does not guarantee
    # positive lease-inclusive FCF, or the absence of cash-conversion risk.
    if accounting_basis != "LEASE_INCLUSIVE_FCF":
        candidate = 1 if late < 0 or material_margin_pressure else None
        qualification = "PROXY_WATCH_MAX; unknown lease/other flows forbid automatic 0 or 2"
    elif early < 0 and late < early:
        candidate = 2
        qualification = "Two negative lease-inclusive periods, worsening; review materiality"
    elif late < 0 or material_margin_pressure:
        candidate = 1
        qualification = "Negative FCF or at least 10pp deterioration in FCF-to-OCF"
    elif late > 0 and not material_margin_pressure and late >= early:
        candidate = 0
        qualification = "Positive, non-deteriorating complete FCF"
    else:
        candidate = None
        qualification = "Mixed: needs counterevidence and accounting review"
    return {
        "accounting_basis": accounting_basis,
        "period_family": period_family,
        "earlier_period": earlier_period,
        "later_period": later_period,
        "earlier_fcf": _fmt(early),
        "later_fcf": _fmt(late),
        "delta_fcf": _fmt(delta),
        "earlier_fcf_to_ocf_pct": _fmt(fcf_to_ocf_early) if fcf_to_ocf_early is not None else None,
        "latest_fcf_to_ocf_pct": _fmt(fcf_to_ocf_late) if fcf_to_ocf_late is not None else None,
        "fcf_to_ocf_change_pp": _fmt(margin_change_pp) if margin_change_pp is not None else None,
        "risk_level_candidate": candidate,
        "status": "CANDIDATE_REQUIRES_SOURCE_AND_REVIEW",
        "qualification": qualification,
    }


def r4_documentary_gate(
    *,
    event_type: str,
    legal_borrower_verified: bool,
    evidence_class: str,
    counterevidence_reviewed: bool,
    rollover_dependence_verified: bool = False,
    repricing_matched_verified: bool = False,
    incremental_material_dependence_verified: bool = False,
) -> dict[str, Any]:
    """A financing event can justify 1/2, or remain inconclusive."""
    allowed = {
        "CREDIT_ACCESS_CONFIRMED", "PROPOSED_FINANCING", "UNDRAWN_OPTION",
        "NEGATIVE_OUTLOOK", "GUARANTEE_OR_COLLATERAL", "FUNDING_DEPENDENCE",
        "SYNDICATION_DIFFICULTY", "REFINANCING_FAILURE", "COVENANT_BREACH",
        "MATERIAL_REPRICING",
    }
    if event_type not in allowed:
        raise ValueError("R4: unsupported event type")
    if evidence_class not in ("PRIMARY_FACT", "INDEPENDENT_CONFIRMATION") or not counterevidence_reviewed:
        return {"risk_level_candidate": None, "reason": "NOT_QUALIFIED"}
    if not legal_borrower_verified:
        return {"risk_level_candidate": None, "reason": "LEGAL_ENTITY_MAPPING_UNVERIFIED"}
    if event_type in ("REFINANCING_FAILURE", "COVENANT_BREACH"):
        return {"risk_level_candidate": 2, "reason": "DOCUMENTED_MATERIAL_CREDIT_FAILURE"}
    if event_type == "MATERIAL_REPRICING":
        if rollover_dependence_verified and repricing_matched_verified:
            return {"risk_level_candidate": 2, "reason": "MATCHED_REPRICING_AND_ROLLOVER_STRESS"}
        return {"risk_level_candidate": None, "reason": "UNMATCHED_REPRICING_OR_NO_ROLLOVER_PROOF"}
    if event_type in ("GUARANTEE_OR_COLLATERAL", "FUNDING_DEPENDENCE", "SYNDICATION_DIFFICULTY"):
        if incremental_material_dependence_verified:
            return {"risk_level_candidate": 1, "reason": "MATERIAL_INCREMENTAL_FINANCING_DEPENDENCE"}
        return {"risk_level_candidate": None, "reason": "STANDARD_OR_UNPROVEN_INCREMENTAL_STRUCTURE"}
    return {
        "risk_level_candidate": None,
        "reason": "COUNTEREVIDENCE_OR_CONTEXT_ONLY; cannot prove no deterioration",
    }


def build_recovered_metrics(
    payload: Mapping[str, Any], *, r2_margin_threshold_pp: Any = "10"
) -> dict[str, Any]:
    """Compile recovered raw issuer inputs; NOT a v2 score.

    Caller must substantiate source PIT dates, issuer eligibility and reviewer
    decisions before any resulting candidate level enters the v2 core panel.
    """
    if payload.get("schema") != "ai-capex.challenger-v2.recovered-observables.v1":
        raise ValueError("wrong recovered-observables schema")
    if payload.get("status") != "RESEARCH_DATA_RECOVERY_NOT_REVIEWED_MODEL_INPUT":
        raise ValueError("recovered data must remain explicitly unapproved")
    r1: dict[str, Any] = {}
    for issuer, row in payload.get("r1", {}).items():
        if "comparison_status" in row:
            r1[issuer] = {
                "status": str(row["comparison_status"]),
                "risk_level_candidate": None,
                "source_research": row.get("source_research"),
            }
        else:
            # Prefer raw prior/current company revenue from a single issuer
            # comparative table. The percentage is derived, not hand-imputed.
            has_current = "revenue_current" in row
            has_previous = "revenue_previous" in row
            if has_current != has_previous:
                raise ValueError(f"R1/{issuer}: complete matched revenue pair required")
            if has_current:
                revenue_growth = (
                    _positive(row["revenue_current"], f"R1/{issuer} current revenue")
                    / _positive(row["revenue_previous"], f"R1/{issuer} previous revenue")
                    - Decimal(1)
                ) * 100
            else:
                revenue_growth = row["monetization_growth_pct"]
            measured = r1_growth_gap(
                monetization_growth_pct=revenue_growth,
                capex_current=row["capex_current"],
                capex_previous=row["capex_previous"],
                period_basis=row["period_basis"],
                scope_relation=row["scope_relation"],
            )
            r1[issuer] = {
                "metrics": measured,
                "risk_level_candidate": measured["risk_level_candidate"],
                "status": "PROVISIONAL_ENTERPRISE_SCOPE_DIAGNOSTIC",
                "source_research": row.get("source_research"),
                "counterevidence": row.get("counterevidence"),
            }
    r2: dict[str, Any] = {}
    for issuer, row in payload.get("r2", {}).items():
        latest = r2_cash_flow(**row["later"])
        earlier = r2_cash_flow(**row["earlier"]) if row.get("earlier") is not None else None
        comparison = (
            r2_compare_periods(
                earlier=earlier,
                later=latest,
                accounting_basis=row["basis_for_comparison"],
                earlier_period=row["earlier_period"],
                later_period=row["later_period"],
                period_family=row["period_family"],
                material_margin_decline_pp=r2_margin_threshold_pp,
            )
            if earlier is not None
            else None
        )
        candidate = comparison["risk_level_candidate"] if comparison else None
        if comparison is None or candidate is None:
            # A standalone negative cash-only proxy supports WATCH at most;
            # a standalone positive number does NOT prove risk absent.
            comparable_field = {
                "GROSS_PPE_PROXY": "gross_cash_ppe_proxy",
                "NET_PPE_PROXY": "net_cash_ppe_proxy",
                "LEASE_INCLUSIVE_FCF": "lease_inclusive_fcf",
            }[row["basis_for_comparison"]]
            current = latest[comparable_field]
            if current is not None and _dec(current, "current proxy") < 0:
                candidate = 1
        r2[issuer] = {
            "latest": latest,
            "earlier": earlier,
            "comparison": comparison,
            "risk_level_candidate": candidate,
            "source_research": row.get("source_research"),
            "status": "PROVISIONAL_ISSUER_EVIDENCE_ONLY",
        }
    r4: dict[str, Any] = {}
    for issuer, row in payload.get("r4", {}).items():
        result = r4_documentary_gate(
            event_type=row["event_type"],
            legal_borrower_verified=row["legal_borrower_verified"],
            evidence_class=row["evidence_class"],
            counterevidence_reviewed=row["counterevidence_reviewed"],
            incremental_material_dependence_verified=row.get(
                "incremental_material_dependence_verified", False
            ),
        )
        r4[issuer] = {
            **result,
            "event_type": row["event_type"],
            "source_research": row.get("source_research"),
            "status": "PROVISIONAL_DOCUMENTARY_EVENT_NOT_FULL_ISSUER_LEVEL",
        }
    return {
        "schema": "ai-capex.challenger-v2.issuer-measurement-report.v1",
        "evidence_cutoff": payload.get("evidence_cutoff"),
        "assembled_on": payload.get("assembled_on"),
        "calibration": "UNVALIDATED",
        "approved_cohort": False,
        "reviewer_pass": False,
        "is_v2_score": False,
        "trading_signal": False,
        "r1": r1,
        "r2": r2,
        "r4": r4,
        "candidate_counts": {
            "R1": sum(x.get("risk_level_candidate") is not None for x in r1.values()),
            "R2": sum(x.get("risk_level_candidate") is not None for x in r2.values()),
            "R4": sum(x.get("risk_level_candidate") is not None for x in r4.values()),
        },
    }
