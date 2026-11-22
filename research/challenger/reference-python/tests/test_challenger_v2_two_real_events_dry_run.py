"""Point-in-time RESEARCH DRY RUN of two already registered October/November events.

No registry persistence, no new live signal, no trade. The review timestamp
is retrospective to this policy decision; it must not be advertised as the
original October publication date or an actual historical market signal.
"""
from __future__ import annotations

from copy import deepcopy
from pathlib import Path
import sys
import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts/research"))
from challenger_v2_event_register import (
    REGISTRY, _read_json, assess, recalculate, validate_registry
)
from one_off_challenger_v2_full_recalculation import calculate

GALAXY = "EVT-20261027-1C51396E8F19"
ANTHROPIC = "EVT-20261102-6DFE079F76A6"
REVIEW_AT = "2026-11-04T06:30:00Z"
REVIEW_BY = "2026-11-11T06:30:00Z"
POLICY = "OBSERVABLE_EVENT_QUALIFICATION_V2_1"
GALAXY_IR = "https://www.sec.gov/Archives/edgar/data/1859392/000185939226000108/glxy-20260930xpressrelease.htm"
GALAXY_WIRE = "https://www.prnewswire.com/news-releases/galaxy-announces-third-quarter-2026-financial-results-302920339.html"
ANTHROPIC_IR = "https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm"
ANTHROPIC_INDEX = "https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/0001628280-26-068676-index.htm"


def galaxy_review():
    return {
        "id": GALAXY, "decision":"QUALIFIED", "factor":"R6",
        "reviewer":"retrospective-v2_1-dry-run-not-live",
        "reviewed_at":REVIEW_AT,
        "reason":"Paid commissioned capacity: Helios I Phase I all 133 MW delivered by Q2; Q3 first full quarter lease revenue, $79.068m booked; Q3 data-centers EBITDA $69m vs $11m Q2. R6 only, no tenant GPU ROI claim.",
        "publication_proof_url":GALAXY_WIRE,
        "first_public_at_verified":"2026-10-27T11:00:00Z",
        "scored_event":{
            "id":GALAXY, "factor":"R6", "impact":"-0.5",
            "source_class":"PRIMARY_FACT", "confidence":"MEDIUM",
            "first_public_at":"2026-10-27T11:00:00Z",
            "source_url":GALAXY_IR,
            "kind":"STATE", "review_by":REVIEW_BY,
            "causal_root_id":"GALAXY_HELIOS_I_RENTAL_OPERATIONS_Q3_2026",
            "effect_id":"133MW_REVENUE_GENERATING_LEASE_Q3_2026",
            "independent_effect":True,
            "rationale":"Real revenue-generating capacity is narrower than GPU utilization, and distinct from R4 CRWV financing/debt event.",
            "counterevidence":"133 MW had already been delivered by end Q2 (no new Q3 MW); 830 MW Helios II remain unleased; capex and project FCF prevent any payback inference.",
            "qualification_policy":POLICY,
            "observable_outcome":{
                "kind":"REVENUE_GENERATING_CAPACITY",
                "scope":"Galaxy Helios I Phase I leasing to CoreWeave, 133 MW",
                "observed_change":"Q3 first full quarter billable lease, $79.068m leasing revenue; Data Centers adjusted EBITDA $69m vs $11m Q2.",
                "comparison_basis":"Galaxy Q2/Q3 2026 segment financials and 133 MW delivered-to-date in both quarters",
                "independent_effect_reason":"Signed lease cash/revenue generation is a different observed effect from R4 borrowings or announced total 5.7GW pipeline.",
                "uncertainties":"Tenant GPU utilization, net project FCF, net economic return unobserved; Q3 did not add delivered MW",
                "impact_basis":"SINGLE_VERIFIED_CHANGE",
                "direction":"IMPROVEMENT",
            },
        },
    }


def anthropic_review():
    return {
        "id":ANTHROPIC, "decision":"QUALIFIED", "factor":"R3",
        "reviewer":"retrospective-v2_1-dry-run-not-live",
        "reviewed_at":REVIEW_AT,
        "reason":"SEC Q2 2026 compute and infrastructure / revenue = 48%; Q3 = 58%, +10pp sequential increase. Observable same-company cost intensity, not realized project IRR.",
        "public_by_verified_at":"2026-11-04T01:00:00Z",
        "publication_proof_url":ANTHROPIC_INDEX,
        "scored_event":{
            "id":ANTHROPIC, "factor":"R3", "impact":"0.5",
            "source_class":"PRIMARY_FACT", "confidence":"MEDIUM",
            "known_public_by_at":"2026-11-04T01:00:00Z",
            "availability_basis":"CONSERVATIVE_KNOWN_PUBLIC_BY",
            "publication_proof_url":ANTHROPIC_INDEX,
            "source_url":ANTHROPIC_IR,
            "kind":"STATE", "review_by":REVIEW_BY,
            "causal_root_id":"ANTHROPIC_REALIZED_COMPUTE_INTENSITY_2026Q3",
            "effect_id":"ANTHROPIC_COMPUTE_EXPENSE_RATIO_Q2_TO_Q3",
            "independent_effect":True,
            "rationale":"Issuer not in approved hyperscaler R1/R2/R4 cohort, so Anthropic's sequential compute intensity is a distinct issuer economic observation; R5 backlog not scored.",
            "counterevidence":"2026 Q3 58% remains better than Q3 2025 148%; revenue rose rapidly; Q3 short-term compute cost mix and contracted delivery timing may be transient.",
            "qualification_policy":POLICY,
            "observable_outcome":{
                "kind":"REALIZED_COMPUTE_COST_INTENSITY",
                "scope":"Anthropic quarter-on-quarter compute and infrastructure expenses / revenue",
                "observed_change":"Q2 2026 48% to Q3 2026 58% (+10 percentage points)",
                "comparison_basis":"SEC S-1/A Q2 and Q3 2026 consolidated quarterly expenses as % of revenue, same issuer and line-item",
                "independent_effect_reason":"Anthropic is outside fixed core issuer cohort, and the 895.4bn future commitments are not added as a second R5 adjustment.",
                "uncertainties":"Not per-GPU cost nor project ROIC; YoY cost ratio improved and quarter includes comparatively expensive short-term compute",
                "impact_basis":"SINGLE_VERIFIED_CHANGE",
                "direction":"DETERIORATION",
            },
        },
    }


def historical_before_v2_1_review():
    """Restore in-memory historical registry fixture; never modify persisted reviews."""
    original = _read_json(ROOT / REGISTRY)
    for entry in original["events"]:
        if entry["id"] in {GALAXY, ANTHROPIC}:
            assert entry["reviews"][-1]["decision"] == "QUALIFIED"
            assert entry["reviews"][-1]["scored_event"]["qualification_policy"] == POLICY
            entry["reviews"].pop()
            assert entry["reviews"][-1]["decision"] == "EARLY_WARNING"
    validate_registry(original, ROOT)
    return original


def replay():
    original = historical_before_v2_1_review()
    validate_registry(original, ROOT)
    galaxy = assess(original, galaxy_review(), ROOT)
    both = assess(galaxy, anthropic_review(), ROOT)
    base = calculate()["snapshot"]
    a = recalculate(galaxy, GALAXY, galaxy_review(), ROOT, base_snapshot=deepcopy(base))
    b = recalculate(both, ANTHROPIC, anthropic_review(), ROOT, base_snapshot=deepcopy(base))
    return original, galaxy, both, a, b


def test_galaxy_qualifies_with_narrow_paid_capacity_r6_without_private_roi():
    original, galaxy, _, solo, _ = replay()
    assert original["events"] != galaxy["events"]  # changes in memory only
    assert solo["evaluation"]["used_event_ids"] == [GALAXY]
    assert solo["evaluation"]["event_adjustments"]["R6"] == "-2.00"
    assert solo["evaluation"]["core_interval"] == ["46.36", "53.64"]
    assert solo["evaluation"]["final_interval"] == ["44.36", "51.64"]
    assert solo["research_only"] is True and solo["trading_signal"] is False


def test_anthropic_qualifies_cost_intensity_r3_without_project_irr():
    _, _, both, _, combined = replay()
    assert {GALAXY, ANTHROPIC} == set(combined["evaluation"]["used_event_ids"])
    assert combined["evaluation"]["event_adjustments"]["R3"] == "2.00"
    assert combined["evaluation"]["event_adjustments"]["R6"] == "-2.00"
    assert combined["evaluation"]["event_total_adjustment"] == "0.00"
    assert combined["evaluation"]["final_interval"] == combined["evaluation"]["core_interval"]
    assert combined["evaluation"]["calibration"] == "UNCALIBRATED"


def test_anthropic_contract_obligation_does_not_become_extra_r5():
    _, _, _, _, both = replay()
    assert both["evaluation"]["event_adjustments"]["R5"] == "0.00"
    assert both["evaluation"]["event_adjustments"]["R7"] == "0.00"


def test_same_event_cannot_claim_two_independent_r6_economic_outcomes():
    _, _, both, _, _ = replay()
    ghost = deepcopy(galaxy_review())
    ghost["id"] = ANTHROPIC
    ghost["reviewed_at"] = "2026-11-04T06:30:01Z"
    ghost["scored_event"]["id"] = ANTHROPIC
    ghost["scored_event"]["causal_root_id"] = galaxy_review()["scored_event"]["causal_root_id"]
    ghost["scored_event"]["effect_id"] = galaxy_review()["scored_event"]["effect_id"]
    with pytest.raises(ValueError):
        assess(both, ghost, ROOT)


def test_anthropic_individually_has_plus_two_and_no_other_factor_effect():
    original = historical_before_v2_1_review()
    only_anthropic = assess(original, anthropic_review(), ROOT)
    outcome = recalculate(only_anthropic, ANTHROPIC, anthropic_review(), ROOT,
                          base_snapshot=calculate()["snapshot"])
    assert outcome["evaluation"]["used_event_ids"] == [ANTHROPIC]
    assert outcome["evaluation"]["event_adjustments"] == {
        "R3":"2.00", "R5":"0.00", "R6":"0.00", "R7":"0.00"}
    assert outcome["evaluation"]["final_interval"] == ["48.36", "55.64"]
