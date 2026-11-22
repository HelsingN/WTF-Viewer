"""Offline prospective Challenger v2 weekly capture validator (research-only).

Never imports historical Challenger v1 arithmetic. Strictly enforces the
approved frozen roster, PIT evidence, missingness and source review; calls the
existing v2 calculator and compares all published numeric/status fields.
Does not collect data, auto-score issuers, change schedules or authorize trade.
"""
from __future__ import annotations

import argparse
from datetime import date, datetime
import json
from pathlib import Path
import re
from typing import Any

from scoring.challenger_v2 import (
    APPROVED_RESEARCH_COHORT_AT,
    APPROVED_RESEARCH_COHORT_VERSION,
    APPROVED_RESEARCH_ROSTERS,
    evaluate_challenger_v2,
)

ROOT = Path(__file__).resolve().parents[2]
WEEKLY = Path("data/research/weekly")
CUTOVER_DATE = date(2026, 11, 4)
SCHEMA = "ai-capex.weekly-challenger-v2.v1"
FILE_RE = re.compile(r"^weekly_challenger_v2_(\d{4}-\d{2}-\d{2})_r[1-9]\d*\.json$")
FACTORS = ("R1", "R2", "R4")
EVENTS = ("R3", "R5", "R6", "R7")
PHYSICAL = ("P1", "P2", "P3", "P4")
REPORT_RE = re.compile(r"^AI_CAPEX_WEEKLY_WATCH_(\d{4}-\d{2}-\d{2})\.md$")
RESULT_KEYS = (
    "status", "core_interval", "final_interval", "core_coverage_pct",
    "final_exact_score", "category", "calibration", "trading_signal",
    "event_total_adjustment", "event_adjustments", "core_factors",
)


def _aware(s: str) -> datetime:
    d = datetime.fromisoformat(str(s).replace("Z", "+00:00"))
    if d.tzinfo is None or d.utcoffset() is None:
        raise ValueError("timezone-aware timestamp required")
    return d


def _local_file(root: Path, rel: str) -> Path:
    if not isinstance(rel, str) or not rel or rel.startswith(("http:", "https:")):
        raise ValueError("expected repository relative artifact path")
    path = (root / rel).resolve()
    try:
        path.relative_to(root.resolve())
    except ValueError as exc:
        raise ValueError(f"local path outside repository: {rel}") from exc
    if not path.is_file():
        raise ValueError(f"referenced artifact missing: {rel}")
    return path


def _source_ref(root: Path, ref: str) -> None:
    if not isinstance(ref, str) or not ref.strip():
        raise ValueError("empty source reference")
    if ref.startswith("https://"):
        return
    _local_file(root, ref)


def _require(condition: Any, message: str, errors: list[str]) -> None:
    if not condition:
        errors.append(message)


def validate_capture(data: dict[str, Any], root: Path = ROOT) -> dict[str, Any]:
    errors: list[str] = []
    unresolved: list[str] = []
    try:
        _require(data["schema"] == SCHEMA, "wrong v2 weekly schema", errors)
        day = date.fromisoformat(data["report_date"])
        cutoff = _aware(data["cutoff"])
        capture = _aware(data["captured_at"])
        _require(day >= CUTOVER_DATE, "v2 weekly capture predates cutover", errors)
        _require(day >= cutoff.date(), "report date before economic cutoff UTC date", errors)
        _require(day <= capture.date(), "report date after capture date UTC", errors)
        _require(cutoff <= capture, "weekly cutoff after capture", errors)
        _require(data["mode"] in ("CONTEMPORANEOUS", "LATE_RECONSTRUCTION"),
                 "invalid research reconstruction mode", errors)
        _require(date.fromisoformat(data["last_completed_us_session"]) <= cutoff.date(),
                 "US session after cutoff", errors)
        _require(data["trading_authority"] == "NONE", "trading authority not NONE", errors)
        _require(data["data_status"] in ("COMPLETE", "PARTIAL"), "invalid data_status", errors)
        _require(data["model_version"] == APPROVED_RESEARCH_COHORT_VERSION,
                 "not the current approved Challenger v2 cohort", errors)

        report = _local_file(root, data["report"])
        _require(REPORT_RE.match(report.name) is not None,
                 "report must use dated AI_CAPEX_WEEKLY_WATCH naming", errors)
        _require(report.name.endswith(f"{day.isoformat()}.md"),
                 "weekly report filename/date mismatch", errors)
        report_body = report.read_text(encoding="utf-8")
        _require("Challenger v2" in report_body,
                 "weekly report must identify Challenger v2", errors)
        _require(bool(data.get("source_refs")), "source research references missing", errors)
        for ref in data.get("source_refs", []):
            _source_ref(root, ref)

        snapshot = data["snapshot"]
        _require(snapshot["schema"] == "ai-capex.challenger-observable.v2-draft",
                 "wrong scored snapshot schema", errors)
        _require(snapshot["as_of"] == data["cutoff"],
                 "snapshot as_of must equal manifest cutoff", errors)
        _require(snapshot["cohort_version"] == data["model_version"],
                 "snapshot frozen cohort version mismatch", errors)
        _require(_aware(snapshot["cohort_frozen_at"]) == APPROVED_RESEARCH_COHORT_AT,
                 "cohort freeze timestamp mismatch", errors)
        _require("posthoc_replay" not in snapshot,
                 "prospective weekly reports may not claim posthoc replay", errors)
        _require(_aware(snapshot["cohort_frozen_at"]) <= cutoff,
                 "weekly cutoff predates cohort freeze", errors)
        expected_unresolved: set[str] = set()
        for factor in FACTORS:
            panel = snapshot["core"][factor]
            _require(set(panel["roster"]) == set(APPROVED_RESEARCH_ROSTERS[factor]),
                     f"{factor}: frozen issuer membership changed", errors)
            _require(set(panel["observations"]) <= set(panel["roster"]),
                     f"{factor}: unlisted issuer observation", errors)

        # Calculator itself validates evidence provenance, source bounds,
        # company weights, credit strata, event admissibility, caps, decay
        # and independently demonstrated causal roots.
        evaluated = evaluate_challenger_v2(snapshot)
        for factor in FACTORS:
            for issuer in evaluated["core_factors"][factor]["missing_or_stale"]:
                expected_unresolved.add(f"{factor}/{issuer}")
        actual_unresolved = data["unresolved"]
        _require(isinstance(actual_unresolved, dict), "unresolved must be a mapping", errors)
        if not isinstance(actual_unresolved, dict):
            actual_unresolved = {}
        _require(set(actual_unresolved) == expected_unresolved,
                 "unresolved issuer set differs from computed UNKNOWN/stale", errors)
        unresolved.extend(sorted(expected_unresolved))
        for key, entry in actual_unresolved.items():
            if not isinstance(entry, dict):
                errors.append(f"{key}: unresolved entry not a mapping")
                continue
            for field in ("reason", "owner", "next_action", "next_review"):
                _require(isinstance(entry.get(field), str) and bool(entry[field].strip()),
                         f"{key}: unresolved {field} missing", errors)
            date.fromisoformat(entry["next_review"])
            _require(bool(entry.get("sources_checked")),
                     f"{key}: unresolved must show attempted sources", errors)
            for ref in entry.get("sources_checked", []):
                _source_ref(root, ref)
            _require(bool(entry.get("note")), f"{key}: counterevidence/limitation note missing", errors)

        panels = data["event_assessments"]
        _require(set(panels) == set(EVENTS), "must review all R3/R5/R6/R7", errors)
        ev_factors_used = {event["factor"] for event in snapshot.get("events", [])}
        for factor in EVENTS:
            panel = panels[factor]
            status = panel["status"]
            _require(status in ("ASSESSED_NO_QUALIFIED_EVENT", "ASSESSED_WITH_EVENTS", "UNKNOWN"),
                     f"{factor}: invalid event assessment", errors)
            _require(bool(panel.get("counterevidence")), f"{factor}: two-sided review absent", errors)
            _require(bool(panel.get("source_refs")), f"{factor}: evidence sources absent", errors)
            _require(_aware(panel["reviewed_at"]) <= capture,
                     f"{factor}: review after capture", errors)
            _require(_aware(panel["latest_source_public_by_at"]) <= cutoff,
                     f"{factor}: event-context evidence published after cutoff", errors)
            for ref in panel.get("source_refs", []):
                _source_ref(root, ref)
            if status == "ASSESSED_WITH_EVENTS":
                _require(factor in ev_factors_used, f"{factor}: no qualifying scored events", errors)
            else:
                _require(factor not in ev_factors_used,
                         f"{factor}: scored events contradict no-event/unknown review", errors)
            if status == "UNKNOWN":
                unresolved.append(f"EVENT/{factor}")
                _require(bool(panel.get("next_action")), f"{factor}: next_action required", errors)

        physical = data["physical"]
        _require(set(physical) == set(PHYSICAL), "must separately review P1-P4", errors)
        for name in PHYSICAL:
            item = physical[name]
            _require(item["status"] in ("OBSERVED", "ASSESSED", "UNKNOWN"),
                     f"{name}: invalid physical status", errors)
            _require(bool(item.get("note")), f"{name}: physical note missing", errors)
            _require(bool(item.get("source_refs")), f"{name}: physical source missing", errors)
            for ref in item.get("source_refs", []):
                _source_ref(root, ref)
            _require(_aware(item["latest_source_public_by_at"]) <= cutoff,
                     f"{name}: physical context source after cutoff", errors)
            if item["status"] == "UNKNOWN":
                unresolved.append(f"PHYSICAL/{name}")
                _require(bool(item.get("next_action")), f"{name}: next_action missing", errors)
            else:
                _require(_aware(item["observed_at"]) <= cutoff,
                         f"{name}: physical observation after cutoff", errors)

        result = data["published_result"]
        _require(set(result) == set(RESULT_KEYS), "published result fields missing/extra", errors)
        for key in RESULT_KEYS:
            _require(result.get(key) == evaluated[key],
                     f"published {key} differs from independently evaluated v2 snapshot", errors)
        _require(result.get("category") is None, "uncalibrated v2 category must be null", errors)
        _require(result.get("trading_signal") is False, "v2 cannot authorize trades", errors)
        _require(result.get("calibration") == "UNCALIBRATED",
                 "v2 calibration incorrectly claimed", errors)
        _require(result.get("final_exact_score") is None or
                 all(c["coverage_pct"] == "100.00" for c in evaluated["core_factors"].values()),
                 "exact point claim with issuer data missing", errors)
        _require(bool(data.get("review_status")) and data["review_status"] in
                 ("REQUIRES_HUMAN_REVIEW", "REVIEWER_ACCEPTED_RESEARCH_ONLY"),
                 "review status not explicit", errors)
        if data["data_status"] == "COMPLETE":
            _require(not unresolved, "COMPLETE contains UNKNOWN/unresolved inputs", errors)
            _require(all(v["coverage_ok_for_research"] for v in evaluated["core_factors"].values()),
                     "COMPLETE requires per-factor and R4 strata minimum coverage", errors)
        else:
            _require(bool(unresolved), "PARTIAL must contain real unresolved items", errors)

        # A reviewer flag is an informational assertion and is never itself a
        # GitHub PR review or an automatic authorization to trade/merge.
    except (KeyError, IndexError, TypeError, ValueError, OSError, AttributeError) as exc:
        errors.append(f"malformed v2 capture: {exc}")
    return {
        "valid": not errors, "schema": data.get("schema"),
        "data_status": data.get("data_status"),
        "unresolved_count": len(unresolved),
        "unresolved_fields": unresolved,
        "errors": errors,
    }


def validate_repository(root: Path = ROOT) -> list[dict[str, Any]]:
    folder = root / WEEKLY
    paths = sorted(folder.glob("weekly_challenger_v2_*_r*.json"))
    manifests: dict[str, Path] = {}
    results: list[dict[str, Any]] = []
    for path in paths:
        match = FILE_RE.fullmatch(path.name)
        if match is None:
            results.append({"valid": False, "errors": [f"bad v2 manifest filename: {path.name}"]})
            continue
        day = match[1]
        manifests[day] = path
        try:
            payload = json.loads(path.read_text(encoding="utf-8"),
                                 parse_constant=lambda val: (_ for _ in ()).throw(ValueError(val)))
            result = validate_capture(payload, root)
            _require(payload.get("report_date") == day,
                     "v2 filename/report_date mismatch", result["errors"])
            if result["errors"]:
                result["valid"] = False
        except (TypeError, ValueError, OSError) as exc:
            result = {"valid": False, "errors": [f"invalid v2 manifest: {exc}"]}
        result["manifest"] = path.relative_to(root).as_posix()
        results.append(result)
    reports = sorted((root / "Docs/research").glob("AI_CAPEX_WEEKLY_WATCH_????-??-??.md"))
    for path in reports:
        match = REPORT_RE.fullmatch(path.name)
        if match and date.fromisoformat(match[1]) >= CUTOVER_DATE and match[1] not in manifests:
            results.append({"valid": False, "errors": [
                f"{match[1]}: new v2 weekly report has no matching v2 coverage manifest"]})
    if not results:
        return [{"valid": True, "status": "NO_V2_WEEKLY_REPORTS_YET",
                 "data_status": "NOT_STARTED", "unresolved_count": 0,
                 "message": "CI validator installed; no v2 captures yet; no COMPLETE claim",
                 "errors": []}]
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--latest", action="store_true")
    parser.add_argument("--manifest", type=Path)
    parser.add_argument("--require-complete", action="store_true")
    args = parser.parse_args()
    try:
        if args.manifest:
            data = json.loads(args.manifest.read_text(encoding="utf-8"),
                              parse_constant=lambda val: (_ for _ in ()).throw(ValueError(val)))
            results = [validate_capture(data)]
        else:
            results = validate_repository()
    except (TypeError, ValueError, OSError) as exc:
        results = [{"valid": False, "errors": [str(exc)]}]
    for item in results:
        print(json.dumps(item, ensure_ascii=False, sort_keys=True))
    failure = any(
        (not item["valid"]) or (args.require_complete and item.get("data_status") != "COMPLETE")
        for item in results
    )
    raise SystemExit(1 if failure else 0)


if __name__ == "__main__":
    main()
