#!/usr/bin/env python3
"""Validate dated relative MACRO_ONLY priority and non-additive synthesis; no changes to scoring."""
import argparse
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
REGISTRY=ROOT/"data/research/events/challenger_v2_event_registry.json"
MACRO=ROOT/"data/research/events/macro_event_comparison_2026-11-11.json"
RUBRIC={"transmission_relevance":(0,3),"comparable_surprise_or_change":(0,2),
        "incremental_information":(0,2),"source_reliability":(0,2)}
def validate(registry,macro):
    events={x["id"]:x for x in registry["events"]}
    macro_ids={k for k,v in events.items() if v["reviews"][-1]["decision"]=="MACRO_ONLY"}
    rows=macro["rows"]
    ids=[x["id"] for x in rows]
    assert len(ids)==len(set(ids))==12==macro["event_count"]
    assert set(ids)==macro_ids, "Macro population changed: create new snapshot, preserve dated prior"
    values=[]
    for x in rows:
        e=events[x["id"]]
        assert e["priority"]==x["priority"]
        assert x["latest_decision"]=="MACRO_ONLY"
        assert x["original_registered_factor"]==e["reviews"][-1].get("factor")
        assert x["model_numeric_effect"] is None
        assert x["macro_contribution"]=="QUALITATIVE_ONLY"
        assert x["not_independently_additive"] is True
        for field,(low,high) in RUBRIC.items():
            assert low<=x[field]<=high
        score=3*x["transmission_relevance"]+2*x["comparable_surprise_or_change"]+x["incremental_information"]+x["source_reliability"]
        assert score==x["priority_index"]
        assert x["tier"]==("A" if score>=15 else "B" if score>=11 else "C" if score>=7 else "D")
        values.append(score)
    for x in rows: assert x["rank"]==1+sum(v>x["priority_index"] for v in values)
    macro_groups=macro["overlap_groups"]
    assert set(k for group in macro_groups.values() for k in group)==macro_ids
    assert sum(len(group) for group in macro_groups.values())==len(ids)
    agg=macro["aggregate"]
    assert agg["numeric_aggregate_estimate"]=="NOT_IDENTIFIABLE_FROM_CURRENT_12_EVENTS"
    assert agg["challenger_event_delta"]==0
    assert agg["scored_qualified_macro_event_ids"]==[]
    assert agg["approved_macro_pain_interval"]==[18,62]
    assert agg["trading_signal"] is False and agg["calibration"]=="UNCALIBRATED"
    for c in agg["channels"]:
        for k in ("anchors","reinforcing","counterevidence"):
            assert set(c[k]).issubset(macro_ids)
    return len(rows)

if __name__=="__main__":
    p=argparse.ArgumentParser()
    actions=p.add_mutually_exclusive_group(required=True)
    actions.add_argument("--check",action="store_true")
    actions.add_argument("--compare",action="store_true",
                         help="Assess a new registered MACRO_ONLY event against the frozen 12")
    p.add_argument("--id", help="Canonical event ID, for --compare only")
    p.add_argument("--transmission-relevance",type=int,choices=range(4))
    p.add_argument("--comparable-surprise-or-change",type=int,choices=range(3))
    p.add_argument("--incremental-information",type=int,choices=range(3))
    p.add_argument("--source-reliability",type=int,choices=range(3))
    args=p.parse_args()
    with REGISTRY.open(encoding="utf-8") as f: r=json.load(f)
    with MACRO.open(encoding="utf-8") as f: m=json.load(f)
    if args.check:
        print(f"PASS: {validate(r,m)} macro events ranked separately; channel effect non-additive; no Challenger delta")
    else:
        if not args.id or not args.id.startswith("EVT-"):
            p.error("A canonical --id EVT-... is required")
        if args.id in {x["id"] for x in m["rows"]}:
            p.error("Already in dated benchmark: use --check, not --compare")
        registered={e["id"]:e for e in r["events"]}
        if args.id not in registered:
            p.error("First register a new canonical EVT ID")
        if registered[args.id]["reviews"][-1]["decision"]!="MACRO_ONLY":
            p.error("The latest review must be MACRO_ONLY; other events use the nonmacro rubric")
        vals=[args.transmission_relevance,args.comparable_surprise_or_change,
              args.incremental_information,args.source_reliability]
        if any(v is None for v in vals):
            p.error("--compare requires all four human-reviewed rubric dimensions")
        score=3*vals[0]+2*vals[1]+vals[2]+vals[3]
        peers=m["rows"]
        stronger=sum(x["priority_index"]>score for x in peers)
        tied=[x["id"] for x in peers if x["priority_index"]==score]
        tier="A" if score>=15 else "B" if score>=11 else "C" if score>=7 else "D"
        print(json.dumps({"event_id":args.id,"benchmark_macro_events":len(peers),
                          "rank_if_added":1+stronger,"priority_index":score,"tier":tier,
                          "ties_with":tied,"joint_macro_direction":"NOT_AUTOMATICALLY_CALCULATED",
                          "model_numeric_effect":None,"warning":"Potential transmission triage only, NOT aggregate economic effect, monetary size or trade signal"},
                         indent=2))
