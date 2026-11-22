"""ONE-TIME post-hoc method check, not an operational v2 Challenger run.

Uses only previously indexed issuer evidence from 2026. The proposed cohort
was selected 2026-11-03 (later than tested vintages) so this runner labels
EVERY output as POSTHOC_REPLAY_UNVALIDATED, never preregistered/PIT strategy.

Run:
  python scripts/research/one_off_challenger_v2_replay.py
No network, no schedules, no files mutated, no trades.
"""
from __future__ import annotations

import json
from decimal import Decimal
from datetime import datetime
from pathlib import Path
from typing import Any

import yaml

from scoring.challenger_v2 import evaluate_challenger_v2
from scoring.challenger_v2_metrics import build_recovered_metrics

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "data/research/challenger/challenger_v2_recovered_observables_2026-11-02.yaml"
ROSTER = ROOT / "data/research/challenger/challenger_v2_candidate_cohorts_2026-11-03.yaml"

# EDGAR acceptance times and conservative next-business-day source bounds
# are reviewed in a single registry. These are NOT exact first-public times.
REGISTRY = ROOT / "data/research/challenger/challenger_v2_source_eligibility_register_2026-11-04.yaml"
REGISTRY_DATA = yaml.safe_load(REGISTRY.read_text(encoding="utf-8"))
if REGISTRY_DATA.get("status") != "SOURCE_ACCEPTANCE_VERIFIED_PUBLIC_BY_CONSERVATIVE_POLICY":
    raise ValueError("source register must retain conservative PIT provenance")
SOURCE_DOCS = REGISTRY_DATA["issuer_documents"]
KNOWN_BY: dict[str, dict[str, str]] = {
    factor: {
        issuer: source["known_public_by_at"]
        for issuer, source in SOURCE_DOCS.items()
        if factor in source["role"]
    }
    for factor in ("R1", "R2", "R4")
}
R4_PRIMARY = {
    issuer: SOURCE_DOCS[issuer]["source_index"] for issuer in ("CRWV", "IREN")
}

VINTAGES = {
    "2026-09-09": "2026-09-09T16:00:00-04:00",
    "2026-09-23": "2026-09-23T16:00:00-04:00",
    "2026-10-07": "2026-10-07T16:00:00-04:00",
    "2026-10-14": "2026-10-14T08:25:13+03:00",
    "2026-11-02": "2026-11-02T16:00:00-05:00",
}
COHORT_PROPOSED_AT = "2026-11-03T21:36:40+00:00"  # GitHub proposal commit f98a8aff...


def source_record(
    *,
    source_url: str,
    measurement: str,
    factor: str,
    issuer: str,
    level: int,
) -> dict[str, Any]:
    return {
        "level": level,
        "known_public_by_at": KNOWN_BY[factor][issuer],
        "availability_basis": "CONSERVATIVE_KNOWN_PUBLIC_BY",
        "valid_until": "2026-11-17T23:59:59-05:00",
        "source_class": "PRIMARY_FACT",
        "source_url": source_url,
        "measurement": measurement,
        "rationale": "Provisional metric-based label from archived research; not independently approved",
        "counterevidence": "Cloud demand/credit closings and proxy construct limitations; see Phase B research decisions",
        "causal_root_id": f"{factor}-{issuer}-2026Q3-documentary",
    }


def replay_vintage(vintage: str, cutoff: str, raw: dict[str, Any],
                   roster: dict[str, Any], measured: dict[str, Any],
                   r4_project_stratum_weight: str | None = None) -> dict[str, Any]:
    if roster.get("status") != "PROPOSED_FROM_EXISTING_RESEARCH_NOT_APPROVED":
        raise ValueError("posthoc replay requires explicitly unapproved roster")
    if datetime.fromisoformat(COHORT_PROPOSED_AT) <= datetime.fromisoformat(cutoff):
        raise ValueError("design cohort must genuinely postdate historic cutoff")
    core: dict[str, Any] = {}
    for factor in ("R1", "R2", "R4"):
        weights = dict(roster["core"][factor]["roster"])
        if factor == "R4" and r4_project_stratum_weight is not None:
            share = Decimal(r4_project_stratum_weight)
            if share <= 0 or share >= 1:
                raise ValueError("project credit weight must lie strictly between 0 and 1")
            # One-time sensitivity ONLY: same fixed seven issuers, two strata.
            weights = {
                name: str(share / 2 if name in ("CRWV", "IREN")
                          else (Decimal(1) - share) / 5)
                for name in weights
            }
        observations: dict[str, Any] = {}
        for issuer in weights:
            candidate = measured[factor.lower()].get(issuer, {})
            level = candidate.get("risk_level_candidate")
            if level is None or issuer not in KNOWN_BY.get(factor, {}):
                continue
            public_by = datetime.fromisoformat(KNOWN_BY[factor][issuer])
            if public_by > datetime.fromisoformat(cutoff):
                continue  # exact historical PIT eligibility, never future input.
            original = raw[factor.lower()][issuer]
            url = original.get("source_original") or original.get("original_source")
            if factor == "R4":
                url = R4_PRIMARY[issuer]
            if not url or not str(url).startswith("https://"):
                continue
            # All reported figures are issuer-specific, not AI-only outcomes.
            measurement = (
                json.dumps(candidate.get("metrics") or candidate.get("comparison")
                           or candidate.get("latest") or candidate.get("event_type"))
            )
            observations[issuer] = source_record(
                source_url=str(url), measurement=measurement, factor=factor,
                issuer=issuer, level=level,
            )
        core[factor] = {"roster": weights, "observations": observations}
    sample = {
        "schema": "ai-capex.challenger-observable.v2-draft",
        "as_of": cutoff,
        "cohort_version": "POSTHOC_UNAPPROVED_CANDIDATE_2026-11-03",
        "posthoc_replay": {
            "mode": "POSTHOC_METHOD_REPLAY",
            "cohort_proposed_at": COHORT_PROPOSED_AT,
            "claimed_preregistered": False,
        },
        "core": core,
        "events": [],  # Phase C found no qualifying independent outcome.
    }
    result = evaluate_challenger_v2(sample)
    return {
        "vintage": vintage,
        "roster_retroactively_selected": True,
        "issuer_levels_unapproved": True,
        "not_historical_trading_simulation": True,
        "source_precision": "CONSERVATIVE_KNOWN_PUBLIC_BY",
        "result": result,
    }


def run_replay() -> dict[str, Any]:
    raw = yaml.safe_load(RAW.read_text(encoding="utf-8"))
    roster = yaml.safe_load(ROSTER.read_text(encoding="utf-8"))
    measured = build_recovered_metrics(raw)
    vintages = [replay_vintage(d, cutoff, raw, roster, measured)
                for d, cutoff in VINTAGES.items()]
    # Predeclared sensitivity probes. No new scheduled model and no fitting
    # against legacy 67.5. No qualifying events existed in this source panel;
    # therefore the no-event setting is mathematically identical to baseline.
    conservative = replay_vintage(
        "2026-11-02", VINTAGES["2026-11-02"], raw, roster,
        build_recovered_metrics(raw, r2_margin_threshold_pp="30"),
        r4_project_stratum_weight="0.30",
    )
    sensitivity = {
        "baseline": {
            "r2_margin_threshold_pp": 10,
            "r4_project_stratum_weight": "0.50",
            "event_overlay": "EMPTY_NOT_OBSERVED",
            "final_interval": vintages[-1]["result"]["final_interval"],
        },
        "zero_event_overlay": {
            "r2_margin_threshold_pp": 10,
            "r4_project_stratum_weight": "0.50",
            "event_overlay": "DISABLED_AS_FALSIFICATION",
            "final_interval": vintages[-1]["result"]["final_interval"],
        },
        "conservative": {
            "r2_margin_threshold_pp": 30,
            "r4_project_stratum_weight": "0.30",
            "event_overlay": "EMPTY_NOT_OBSERVED",
            "final_interval": conservative["result"]["final_interval"],
            "r2_coverage_pct": conservative["result"]["core_factors"]["R2"]["coverage_pct"],
            "r4_coverage_pct": conservative["result"]["core_factors"]["R4"]["coverage_pct"],
        },
    }
    return {
        "schema": "ai-capex.challenger-v2.one-off-posthoc-replay.v1",
        "status": "RESEARCH_ONLY_UNCALIBRATED_NOT_PIT_PREREGISTERED",
        "cohort_proposed_at": COHORT_PROPOSED_AT,
        "market_validation": "NOT_PERFORMED",
        "trading_signal": False,
        "vintages": vintages,
        "one_off_sensitivity": sensitivity,
    }


def main() -> None:
    print(json.dumps(run_replay(), indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
