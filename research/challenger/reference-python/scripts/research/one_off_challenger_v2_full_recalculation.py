"""One-time Challenger v2 full-roster research recalculation, never a live score.

All 17 fixed issuer-factor slots are processed, including explicit R4 UNKNOWN.
Source records are dated and the frozen roster is not backdated. No network,
no schedules, no trading, no legacy Challenger arithmetic.
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any

import yaml

from scoring.challenger_v2 import evaluate_challenger_v2
from scoring.challenger_v2_metrics import build_recovered_metrics

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "data/research/challenger"
RAW_PATH = BASE / "challenger_v2_recovered_observables_2026-11-02.yaml"
COHORT_PATH = BASE / "challenger_v2_research_approved_cohort_2026-11-04.yaml"
SOURCES_PATH = BASE / "challenger_v2_source_eligibility_register_2026-11-04.yaml"
R4_PLATFORM_REVIEW = BASE / "challenger_v2_r4_platform_reassessment_2026-11-04.yaml"
EVENT_REVIEW_PATH = BASE / "challenger_v2_event_review_2026-11-04.yaml"
AS_OF = "2026-11-04T00:00:00+00:00"
VALID_UNTIL = "2026-11-17T23:59:59-05:00"
VERSION = "CHALLENGER_V2_RESEARCH_APPROVED_2026-11-04"
FROZEN_AT = "2026-11-03T22:28:54+00:00"


def _load(path: Path) -> dict[str, Any]:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def calculate(as_of: str = AS_OF) -> dict[str, Any]:
    if datetime.fromisoformat(as_of) < datetime.fromisoformat(FROZEN_AT):
        raise ValueError("prospective as_of cannot predate approved cohort freeze")
    raw, cohort, sources = _load(RAW_PATH), _load(COHORT_PATH), _load(SOURCES_PATH)
    if sources["status"] != "SOURCE_ACCEPTANCE_VERIFIED_PUBLIC_BY_CONSERVATIVE_POLICY":
        raise ValueError("SEC source availability register is not reviewed")
    if raw["status"] != "RESEARCH_DATA_RECOVERY_NOT_REVIEWED_MODEL_INPUT":
        raise ValueError("unexpected raw data provenance")
    measured = build_recovered_metrics(raw)
    platform_review = _load(R4_PLATFORM_REVIEW)
    if platform_review.get("status") != "FINITE_RESEARCH_LEVEL_REVIEW_NOT_INDEPENDENT_PR_ACCEPTANCE":
        raise ValueError("unreviewed R4 platform evidence registry")
    if datetime.fromisoformat(platform_review["assessment_as_of"]) != datetime.fromisoformat(as_of):
        raise ValueError("new platform financing observations need exact matching PIT cutoff")
    event_review = _load(EVENT_REVIEW_PATH)
    if (event_review.get("status") != "FINITE_RESEARCH_CONTEXT_REVIEW_NO_QUALIFIED_SIGNED_EVENTS"
            or datetime.fromisoformat(event_review["as_of"]) != datetime.fromisoformat(as_of)):
        raise ValueError("event evidence assessment incompatible with as_of")
    issuer_sources = sources["issuer_documents"]
    core: dict[str, Any] = {}
    decisions: dict[str, Any] = {}
    for factor in ("R1", "R2", "R4"):
        roster = cohort["core"][factor]["issuer_weights"]
        obs: dict[str, Any] = {}
        decisions[factor] = {}
        for issuer in roster:
            candidate = measured[factor.lower()].get(issuer, {})
            level = candidate.get("risk_level_candidate")
            source = issuer_sources.get(issuer)
            record = raw[factor.lower()].get(issuer, {})
            if factor == "R4" and issuer in platform_review["platforms"]:
                source = platform_review["platforms"][issuer]
                level = source["level_candidate"]
                candidate = {"risk_level_candidate": level,
                             "reason": source["review_status"],
                             "measurement": source["measurement"]}
                record = {"source_research": str(R4_PLATFORM_REVIEW.relative_to(ROOT)),
                          "counterevidence": source["counterevidence"],
                          "note": source.get("reason")}
            reason = "CONDITIONAL_SOURCE_REVIEWED_RESEARCH_CANDIDATE"
            if level is None:
                reason = ("UNVERIFIED_PARENT_BORROWER_OR_BASELINE"
                          if issuer == "ORCL" and factor == "R4"
                          else "NO_QUALIFIED_INCREMENTAL_R4_EVIDENCE"
                          if factor == "R4" else "NO_QUALIFIED_LEVEL")
            if source is None or factor not in source.get("role", []):
                reason = "NO_MATCHED_PRIMARY_SOURCE"
                level = None
            decisions[factor][issuer] = {
                "level_candidate": level,
                "decision": reason,
                "source_register_status": (source.get("status") or source.get("review_status")) if source else None,
                "measurement": (candidate.get("measurement") or candidate.get("metrics") or candidate.get("comparison")
                                or candidate.get("reason") or candidate.get("latest")),
                "source_research": record.get("source_research"),
                "counterevidence": record.get("counterevidence") or record.get("note"),
                "source_url": source.get("source_index") if source else None,
                "known_public_by_at": source.get("known_public_by_at") if source else None,
            }
            if level is None:
                continue
            if factor == "R4":
                url = source["source_index"]
            else:
                url = record.get("source_original") or record.get("original_source")
            if not url:
                raise ValueError(f"{factor}/{issuer}: missing primary URL")
            obs[issuer] = {
                "level": level,
                "known_public_by_at": source["known_public_by_at"],
                "availability_basis": "CONSERVATIVE_KNOWN_PUBLIC_BY",
                "valid_until": VALID_UNTIL,
                "source_class": source.get("source_class", "PRIMARY_FACT"),
                "source_url": url,
                "measurement": json.dumps(decisions[factor][issuer]["measurement"], sort_keys=True),
                "rationale": f"Research candidate from dated matched {factor} source panel; manual review required",
                "counterevidence": (str(decisions[factor][issuer]["counterevidence"])
                                    if decisions[factor][issuer]["counterevidence"]
                                    else "Positive cloud demand and credit access; source scope caveats in reviewed register"),
                "causal_root_id": f"{factor}-{issuer}-2026Q3-source-panel",
            }
        core[factor] = {"roster": roster, "observations": obs}
    snapshot = {
        "schema": "ai-capex.challenger-observable.v2-draft",
        "as_of": as_of,
        "cohort_version": VERSION,
        "cohort_frozen_at": FROZEN_AT,
        "core": core,
        "events": event_review["accepted_scoring_events"],
    }
    evaluation = evaluate_challenger_v2(snapshot)
    return {
        "schema": "ai-capex.challenger-v2.full-roster-recalculation.v1",
        "status": "PROVISIONAL_FULL_ROSTER_RECALCULATION_REQUIRES_HUMAN_REVIEW",
        "as_of": as_of,
        "evidence_cutoff": raw["evidence_cutoff"],
        "source_policy": sources["calendar_policy"].strip(),
        "cohort_freeze": FROZEN_AT,
        "prospective_method_but_older_recovered_evidence": True,
        "new_source_search_performed": True,
        "new_source_scope": "Five fixed R4 large platforms, finite original filings and independent checks",
        "r4_platform_source_registry": str(R4_PLATFORM_REVIEW.relative_to(ROOT)),
        "all_roster_slots_processed": sum(len(v["roster"]) for v in core.values()),
        "issuer_decisions": decisions,
        "snapshot": snapshot,
        "evaluation": evaluation,
        "no_current_authoritative_v2_score": evaluation["final_exact_score"] is None,
        "research_coverage_sufficient_but_score_bounded": (
            evaluation["status"] == "BOUNDED_RESEARCH_WITH_UNCERTAINTY"
            and evaluation["final_exact_score"] is None),
        "unqualified_events": "All R3/R5/R6/R7 candidates reviewed; zero independently realized eligible effects does not mean zero risk",
        "event_review_path": str(EVENT_REVIEW_PATH.relative_to(ROOT)),
        "event_candidates_reviewed": len(event_review["candidates"]),
        "physical_overlay": event_review["physical_confirmation"],
        "category": None,
        "trading_signal": False,
    }


def main() -> None:
    print(json.dumps(calculate(), indent=2, ensure_ascii=False, sort_keys=True))


if __name__ == "__main__":
    main()
