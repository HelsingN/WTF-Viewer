#!/usr/bin/env python3
"""Validate a frozen, non-trading relative event-strength audit snapshot.

This validator is intentionally side-effect-free: it never adjusts Challenger,
reopens reviews, edits the canonical registry, or claims cross-factor monetary
materiality. Example:
 python scripts/research/validate_relative_event_strength.py --check
"""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REGISTRY = ROOT / "data/research/events/challenger_v2_event_registry.json"
SNAPSHOT = ROOT / "data/research/events/event_strength_audit_2026-11-11.json"
ALLOWED = {"QUALIFIED","EARLY_WARNING","CORE_ONLY","PHYSICAL_ONLY","MACRO_ONLY","CONTEXT_ONLY","NOT_QUALIFIED_CLOSED","EXCLUDED_DUPLICATE","PENDING_REVIEW"}


def validate(registry, snapshot):
    events = registry["events"]
    records = snapshot["rows"]
    assert snapshot["schema"] == "AI_CAPEX_EVENT_RELATIVE_STRENGTH_AUDIT_V1"
    assert snapshot["population_count"] == len(records)
    assert snapshot["unique_event_id_count"] == len(records)
    event_ids = [e["id"] for e in events]
    assert len(set(event_ids)) == len(event_ids), "Canonical duplicate EVT ID"
    assert len({e["event_key"] for e in events}) == len(events), "Duplicate event_key"
    assert {e["id"] for e in events} == {e["id"] for e in records}, "Registry changed: create a new dated snapshot"
    assert len(records) == len(set(r["id"] for r in records))
    scores = []
    lookup = {e["id"]: e for e in events}
    for row in records:
        e = lookup[row["id"]]
        last = e["reviews"][-1]
        assert row["latest_decision"] == last["decision"] in ALLOWED
        assert row["registered_factor"] == last.get("factor")
        assert row["review_count"] == len(e["reviews"])
        assert row["priority"] == e["priority"]
        assert row["direction"] == (last.get("scored_event") or {}).get("observable_outcome", {}).get("direction", last.get("direction","UNDETERMINED"))
        assert 0 <= row["directness"] <= 3
        assert 0 <= row["realized_evidence"] <= 3
        assert 0 <= row["quantifiability"] <= 2
        assert row["signed_independence"] in (0,2)
        if row["signed_independence"] == 2:
            assert last["decision"] == "QUALIFIED" and "scored_event" in last
        value = 4*row["directness"]+3*row["realized_evidence"]+2*row["quantifiability"]+row["signed_independence"]
        assert value == row["relative_signal_index"]
        tier = "A" if value >= 24 else "B" if value >= 18 else "C" if value >= 10 else "D"
        assert tier == row["relative_signal_tier"]
        assert row["materiality_cross_factor"] == "UNKNOWN_NOT_NORMALIZED"
        assert row["qualification_unchanged"] is True
        scores.append(value)
    for row in records:
        assert row["relative_rank"] == 1+sum(s > row["relative_signal_index"] for s in scores)
    assert snapshot["baseline_replay"]["event_total_adjustment"] == "0.00"
    assert snapshot["baseline_replay"]["final_interval"] == ["46.36","53.64"]
    assert snapshot["baseline_replay"]["calibration"] == "UNCALIBRATED"
    assert snapshot["baseline_replay"]["trading_signal"] is False
    assert snapshot["baseline_replay"]["materiality_weighted_counterfactual"].startswith("NOT_ESTIMABLE")
    return len(records)


if __name__ == "__main__":
    p=argparse.ArgumentParser()
    actions=p.add_mutually_exclusive_group(required=True)
    actions.add_argument("--check", action="store_true")
    actions.add_argument("--compare", action="store_true",
                         help="Compare a reviewer-assessed NEW event with the frozen 38-event benchmark")
    p.add_argument("--id", help="New canonical EVT ID (for --compare)")
    p.add_argument("--directness", type=int, choices=range(4))
    p.add_argument("--realized-evidence", type=int, choices=range(4))
    p.add_argument("--quantifiability", type=int, choices=range(3))
    p.add_argument("--signed-independence", type=int, choices=(0,2))
    args=p.parse_args()
    with REGISTRY.open(encoding="utf-8") as f: registry=json.load(f)
    with SNAPSHOT.open(encoding="utf-8") as f: snapshot=json.load(f)
    if args.check:
        print(f"PASS: {validate(registry,snapshot)} event assessments; no Challenger scoring changes")
    else:
        if not args.id or not args.id.startswith("EVT-"):
            p.error("--compare needs a canonical --id EVT-...")
        if args.id in {r["id"] for r in snapshot["rows"]}:
            p.error("This event is already in the frozen benchmark; use --check")
        required=(args.directness,args.realized_evidence,args.quantifiability,args.signed_independence)
        if any(value is None for value in required):
            p.error("--compare requires all four rubric dimensions")
        current={e["id"]:e for e in registry["events"]}
        if args.id not in current:
            p.error("The new EVT ID must first exist in the canonical registry")
        if args.signed_independence==2 and current[args.id]["reviews"][-1]["decision"]!="QUALIFIED":
            p.error("Signed independence=2 requires a QUALIFIED review in the registry")
        score=4*args.directness+3*args.realized_evidence+2*args.quantifiability+args.signed_independence
        peers=snapshot["rows"]
        stronger=sum(r["relative_signal_index"]>score for r in peers)
        tied=[r["id"] for r in peers if r["relative_signal_index"]==score]
        tier="A" if score>=24 else "B" if score>=18 else "C" if score>=10 else "D"
        print(json.dumps({"event_id":args.id,"benchmark_population":len(peers),
                          "relative_rank_if_added":stronger+1,"relative_signal_index":score,
                          "tier":tier,"ties_with_registered":tied,
                          "materiality_cross_factor":"UNKNOWN_NOT_NORMALIZED",
                          "qualification_mutated":False,
                          "warning":"Human-judged evidence rank, NOT actual monetary impact or trading signal"},
                         indent=2))
