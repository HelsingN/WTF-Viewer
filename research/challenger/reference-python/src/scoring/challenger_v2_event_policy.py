"""Prospectively versioned, observable event qualification policy.

Policy sets defensible coarse research adjustments from independently evidenced
economic changes. It does NOT calculate private ROI or create trading signals.
"""
from __future__ import annotations

from decimal import Decimal
from typing import Mapping, Any

POLICY = "OBSERVABLE_EVENT_QUALIFICATION_V2_1"
OUTCOMES = {
    "R3": {"REALIZED_COMPUTE_COST_INTENSITY", "OBSERVED_UNIT_REVENUE_OR_YIELD", "REPORTED_PROJECT_CASH_RETURN"},
    "R5": {"EXECUTED_CONTRACT_AMENDMENT", "REALIZED_COLLECTION_OR_SHORTFALL", "ENFORCED_CONTRACT_CANCELLATION"},
    "R6": {"REVENUE_GENERATING_CAPACITY", "PAID_CAPACITY_INTERRUPTION", "REVENUE_GENERATING_CAPACITY_RESTART"},
    "R7": {"FUNDED_SITE_ECONOMIC_DEFERRAL", "FUNDED_SITE_CANCELLATION", "FUNDED_PROJECT_RESTRUCTURING", "RESUMED_FUNDED_SITE"},
}
LEVELS = {"SINGLE_VERIFIED_CHANGE": Decimal("0.5"),
          "REPEATED_OR_TERMINAL_CONFIRMED": Decimal("1")}


def validate_observable_qualification(ev: Mapping[str, Any]) -> None:
    """Validate prospective evidence/rubric; old frozen replays aren't rewritten.

    Mechanical check cannot certify external truth. A human must verify named
    project/entity and causal independence against the actual core snapshot.
    """
    if ev.get("qualification_policy") != POLICY:
        raise ValueError("QUALIFIED requires current observable-event qualification policy")
    f = ev.get("factor")
    outcome = ev.get("observable_outcome")
    if not isinstance(outcome, dict) or outcome.get("kind") not in OUTCOMES.get(f, set()):
        raise ValueError("QUALIFIED requires supported factor-specific observable economic change")
    required = ("scope", "observed_change", "comparison_basis", "independent_effect_reason", "uncertainties")
    if any(not isinstance(outcome.get(k), str) or not outcome[k].strip() for k in required):
        raise ValueError("QUALIFIED observable outcome lacks scope, comparable measurement or independence rationale")
    basis = outcome.get("impact_basis")
    if basis not in LEVELS:
        raise ValueError("QUALIFIED needs an explicit pre-specified impact basis")
    impact = Decimal(str(ev.get("impact", "NaN")))
    if not impact.is_finite() or abs(impact) != LEVELS[basis]:
        raise ValueError("QUALIFIED impact does not match observable evidence tier")
    direction = outcome.get("direction")
    if direction not in ("DETERIORATION", "IMPROVEMENT"):
        raise ValueError("QUALIFIED needs signed economic direction")
    if (impact > 0) != (direction == "DETERIORATION"):
        raise ValueError("QUALIFIED impact sign conflicts with economic direction")
    if basis == "REPEATED_OR_TERMINAL_CONFIRMED":
        corroboration = outcome.get("corroboration_url")
        if not isinstance(corroboration, str) or not corroboration.startswith("https://"):
            raise ValueError("maximum event magnitude requires independent corroboration")
