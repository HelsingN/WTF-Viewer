"""Strategy v1.2 Combined Score. Weights come from config/strategy.json only."""

from __future__ import annotations

import json
from typing import Any

from settings import CONFIG_DIR

COMPONENT_WEIGHT_KEYS = (
    "hyperscaler_capex",
    "fcf_cash_pressure",
    "neocloud_credit",
    "gpu_pricing_utilization",
    "semiconductor_guidance",
    "rpo_backlog",
    "technical_us",
    "asia_confirmation",
)

def load_strategy_config() -> dict[str, Any]:
    payload = json.loads((CONFIG_DIR / "strategy.json").read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("strategy.json must be a JSON object")
    return payload


def score_components(
    *,
    snapshot_components: dict[str, int],
    technical_score: int,
    asia_score: int,
) -> dict[str, int]:
    values = {
        "hyperscaler_capex": snapshot_components["hyperscaler_capex"],
        "fcf_cash_pressure": snapshot_components["fcf_pressure"],
        "neocloud_credit": snapshot_components["neocloud_credit"],
        "gpu_pricing_utilization": snapshot_components["gpu_oversupply"],
        "semiconductor_guidance": snapshot_components["semiconductor_guidance"],
        "rpo_backlog": snapshot_components["rpo_backlog"],
        "technical_us": technical_score,
        "asia_confirmation": asia_score,
    }
    return {key: values[key] for key in COMPONENT_WEIGHT_KEYS}


def combined_score(components: dict[str, int], weights: dict[str, int]) -> float:
    numerator = 0
    for key in COMPONENT_WEIGHT_KEYS:
        numerator += components[key] * int(weights[key])
    return numerator / 100


def score_band(score: float, thresholds: dict[str, int]) -> str:
    if score <= thresholds["normal_max"]:
        return "NORMAL"
    if score <= thresholds["watch_max"]:
        return "WATCH"
    if score <= thresholds["alert_max"]:
        return "ALERT"
    if score < thresholds["confirmed_min"]:
        return "REVERSAL_CANDIDATE"
    return "CONFIRMED_REVERSAL"


def active_trigger_count(triggers: dict[str, int]) -> int:
    return sum(1 for key in ("F1", "F2", "F3", "F4", "F5") if int(triggers[key]) >= 1)
