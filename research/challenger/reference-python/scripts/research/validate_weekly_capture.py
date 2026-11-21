"""Offline research completeness gate; no runtime, broker or provider calls."""
from __future__ import annotations

import argparse
from datetime import date, datetime
import hashlib
import json
import math
from pathlib import Path
import re

import yaml

ROOT = Path(__file__).resolve().parents[2]
REQUIREMENTS = "data/research/weekly/requirements_v1.json"
# Legacy Challenger v1 arithmetic is validated ONLY for immutable weekly dates before 2026-11-04.
WEIGHTS = (20, 15, 15, 20, 10, 10, 10)
STATUSES = {"OBSERVED", "ASSESSED", "NO_MATERIAL_UPDATE", "UNAVAILABLE", "CARRIED"}
EVIDENCE_CLASSES = {"PRIMARY_FACT", "MANAGEMENT_CLAIM", "INDEPENDENT_CONFIRMATION",
                    "PRIMARY_POSITIONING_DATA", "PRIME_BROKER_PUBLISHED",
                    "INDEPENDENT_REPORTING", "INFERENCE"}


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"),
                      parse_constant=lambda value: (_ for _ in ()).throw(ValueError(value)))


def local_path(root: Path, value: str) -> Path:
    path = (root / value).resolve()
    path.relative_to(root.resolve())
    if not path.is_file():
        raise ValueError(f"missing artifact: {value}")
    return path


def aware_timestamp(value: str) -> datetime:
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        raise ValueError("timestamp requires timezone")
    return parsed


def contains_unknown(value) -> bool:
    if value is None:
        return True
    if isinstance(value, dict):
        return any(contains_unknown(v) for v in value.values())
    if isinstance(value, list):
        return any(contains_unknown(v) for v in value)
    if isinstance(value, str):
        return bool(re.match(r"^(UNKNOWN|UNAVAILABLE|NOT_CAPTURED)\b", value.strip(), re.IGNORECASE))
    return isinstance(value, float) and not math.isfinite(value)


def challenger_state(score: float) -> str:
    return ("HEALTHY" if score < 25 else "WATCH" if score < 45 else
            "ELEVATED" if score < 60 else "ALERT" if score < 75 else "HIGH_REVERSAL_RISK")


def validate_capture(data: dict, root: Path = ROOT, requirements: dict | None = None) -> dict:
    errors: list[str] = []
    unresolved: list[str] = []
    requirements = requirements or load_json(root / REQUIREMENTS)

    def require(condition, message):
        if not condition:
            errors.append(message)

    try:
        require(data["schema"] == "ai-capex.weekly-capture.v1", "wrong weekly schema")
        cutoff = aware_timestamp(data["cutoff"])
        capture = aware_timestamp(data["captured_at"])
        report_date = date.fromisoformat(data["report_date"])
        require(report_date < date(2026, 11, 4),
                "Challenger v1 weekly schema retired for new reports; use v2 research protocol")
        require(capture >= cutoff or data["mode"] != "LATE_RECONSTRUCTION",
                "late reconstruction capture precedes cutoff")
        require(date.fromisoformat(data["last_completed_us_session"]) <= cutoff.date(),
                "future US session")
        require(data["mode"] in {"CONTEMPORANEOUS", "LATE_RECONSTRUCTION"}, "invalid mode")
        if data["mode"] == "CONTEMPORANEOUS":
            require(cutoff <= capture, "cutoff later than contemporaneous capture")
        require(data["trading_authority"] == "NONE", "weekly has trading authority")
        require(data["data_status"] in {"COMPLETE", "PARTIAL"}, "invalid publication status")
        require(report_date >= date.fromisoformat(requirements["effective_report_date"]),
                "legacy report should not claim current capture schema")
        report = local_path(root, data["report"]).read_text(encoding="utf-8")
        local_path(root, data["original_report"])
        for name in ("champion", "challenger", "macro", "institutional"):
            local_path(root, data["artifacts"][name])
        require(set(data["blocks"]) == set(requirements["blocks"]), "required blocks missing/extra")
        for block, names in requirements["blocks"].items():
            observed = data["blocks"].get(block, {})
            require(observed.get("section") == "## " + block, f"{block}: wrong heading")
            heading = "## " + block
            parts = report.split(heading + "\n", 1)
            section = parts[1].split("\n## ", 1)[0] if len(parts) == 2 else ""
            require(bool(section.strip()), f"{block}: missing report section")
            fields = observed.get("fields", {})
            require(set(fields) == set(names), f"{block}: required fields missing/extra")
            for name in names:
                field_id = f"{block}.{name}"
                record = fields.get(name)
                if not isinstance(record, dict):
                    errors.append(f"{field_id}: missing record")
                    continue
                require(f"| `{name}` |" in section, f"{field_id}: absent report row")
                status = record.get("status")
                require(status in STATUSES, f"{field_id}: invalid status")
                require("value" in record, f"{field_id}: value missing")
                display = ("UNKNOWN" if record.get("value") is None else record["value"] if isinstance(record["value"], str)
                           else json.dumps(record["value"], ensure_ascii=False, separators=(",", ":")))
                row = f"| `{name}` | {display.replace(chr(124), chr(47))} ({status}) |"
                require(row in section, f"{field_id}: report row/value mismatch")
                require(bool(record.get("note")), f"{field_id}: explanation missing")
                require(record.get("evidence_class") in EVIDENCE_CLASSES, f"{field_id}: evidence class missing")
                require(bool(record.get("sources")), f"{field_id}: source missing")
                for source in record.get("sources", []):
                    if not source.startswith(("https://", "http://")):
                        local_path(root, source)
                recorded = aware_timestamp(record["captured_at"])
                require(recorded <= capture, f"{field_id}: field capture later than manifest")
                if status in {"UNAVAILABLE", "CARRIED"}:
                    unresolved.append(field_id)
                    require(status != "UNAVAILABLE" or record.get("value") is None,
                            f"{field_id}: unavailable must have null value")
                    for key in ("reason", "owner", "next_action", "next_review"):
                        require(bool(record.get(key)), f"{field_id}: missing {key}")
                    require(bool(record.get("attempts")), f"{field_id}: no source attempts")
                    for attempt in record.get("attempts", []):
                        require(bool(attempt.get("source")) and bool(attempt.get("outcome")),
                                f"{field_id}: invalid source attempt")
                    date.fromisoformat(record["next_review"])
                    continue
                require(not contains_unknown(record.get("value")), f"{field_id}: hidden missing value")
                observation = date.fromisoformat(record["observation_date"])
                publication = date.fromisoformat(record["published_on"])
                require(observation <= cutoff.date(), f"{field_id}: observation after cutoff")
                require(observation <= publication, f"{field_id}: publication precedes observation")
                require(publication <= cutoff.date(), f"{field_id}: publication after cutoff")
                require(publication <= recorded.date(), f"{field_id}: publication after capture")
                budgets = requirements["freshness_review_days"]
                budget = requirements["field_overrides"].get(field_id, budgets.get(block, budgets["default"]))
                require((cutoff.date() - observation).days <= budget,
                        f"{field_id}: stale input must be CARRIED/UNAVAILABLE, not current")
        require(sorted(data.get("unresolved_fields", [])) == sorted(unresolved),
                "unresolved_fields does not match field statuses")
        require(data["data_status"] != "COMPLETE" or not unresolved,
                "COMPLETE contains unresolved inputs")
        require(data["data_status"] != "PARTIAL" or bool(unresolved),
                "PARTIAL must name unresolved inputs")
        for rel, expected in data.get("preserved_blobs", {}).items():
            raw = local_path(root, rel).read_bytes()
            actual = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
            require(actual == expected, f"historical blob changed: {rel}")

        shadow = yaml.safe_load(local_path(root, data["artifacts"]["challenger"]).read_text(encoding="utf-8"))
        components = shadow["components"]
        require(len(components) == 7, "Challenger requires seven components")
        levels, contributions = [], []
        for i, weight in enumerate(WEIGHTS, 1):
            matches = [v for k, v in components.items() if k.startswith(f"R{i}_")]
            require(len(matches) == 1, f"Challenger R{i} missing/duplicate")
            if len(matches) != 1:
                continue
            record = matches[0]
            require(record["weight"] == weight, f"Challenger R{i} weight changed")
            require(record["level"] in (0, 1, 2), f"Challenger R{i} invalid level")
            expected = weight * record["level"] / 2
            require(record["contribution"] == expected, f"Challenger R{i} contribution wrong")
            levels.append(record["level"])
            contributions.append(expected)
            require(data["blocks"]["challenger"]["fields"][f"R{i}"]["value"] == record["level"],
                    f"manifest R{i} differs from structured shadow")
        score = sum(contributions)
        require(score == shadow["challenger"]["score"], "Challenger score arithmetic wrong")
        require(shadow["challenger"]["state"] == challenger_state(score), "Challenger score/state mismatch")
        require(shadow["trading_authority"] == "NONE", "Challenger authority changed")
        for name in ("score", "state"):
            require(data["blocks"]["challenger"]["fields"][name]["value"] == shadow["challenger"][name],
                    f"manifest Challenger {name} mismatch")
        for i in range(1, 5):
            matches = [v for k, v in shadow["physical_confirmation"].items() if k.startswith(f"P{i}_")]
            require(len(matches) == 1, f"P{i} missing")
            if len(matches) == 1:
                require(matches[0]["state"] == data["blocks"]["challenger"]["fields"][f"P{i}"]["value"],
                        f"manifest P{i} mismatch")

        macro = load_json(local_path(root, data["artifacts"]["macro"]))
        require(macro["trading_authority"] == "NONE", "Macro authority changed")
        require(macro["as_of"] == data["cutoff"], "Macro cutoff mismatch")
        require(macro["source_research"] == data["report"], "Macro report link mismatch")
        low = high = 0
        for name, maximum in zip(("M1", "M2", "M3", "M4"), (30, 20, 20, 30), strict=True):
            comp = macro["components"][name]
            require(0 <= comp["lower"] <= comp["upper"] <= maximum, f"{name}: invalid bounds")
            low += comp["lower"]
            high += comp["upper"]
            value = data["blocks"]["macro"]["fields"][name]["value"]
            require(value == comp["lower"] if comp["lower"] == comp["upper"] else
                    value == {"lower": comp["lower"], "upper": comp["upper"]}, f"manifest {name} mismatch")
        require((low, high) == (macro["score"]["lower_bound"], macro["score"]["upper_bound"]),
                "Macro total bounds incorrect")
        require(data["blocks"]["macro"]["fields"]["score_range"]["value"] == {"lower": low, "upper": high},
                "manifest Macro bounds mismatch")
        if macro["score"]["canonical_point_estimate"] is not None:
            require(low == high == macro["score"]["canonical_point_estimate"],
                    "Macro exact score with unresolved range")
        institutional = load_json(local_path(root, data["artifacts"]["institutional"]))
        require(institutional["trading_authority"] == "NONE", "Institutional authority changed")
        require(institutional["as_of"] == data["cutoff"], "Institutional cutoff mismatch")
        fields = data["blocks"]["institutional"]["fields"]
        windows = {}
        for symbol, code in (("nasdaq", "20974+"), ("sp500", "13874+")):
            positions = institutional["cftc"][symbol]
            require(positions["code"] == code, "wrong consolidated CFTC code")
            position_field = fields[f"{symbol}_positions"]
            base_keys = ("long", "short", "spreading", "net", "wow_long", "wow_short", "wow_net")
            if any(positions.get(key) is None for key in base_keys):
                require(position_field["status"] in {"UNAVAILABLE", "CARRIED"},
                        "CFTC missing source must be explicitly unresolved")
            else:
                require(positions["net"] == positions["long"] - positions["short"], "CFTC net wrong")
                require(positions["wow_net"] == positions["wow_long"] - positions["wow_short"], "CFTC WoW wrong")
                expected = {key: positions[key] for key in ("long", "short", "spreading", "net")}
                expected["wow"] = positions["wow_net"]
                if position_field["status"] not in {"UNAVAILABLE", "CARRIED"}:
                    require(position_field["value"] == expected, "manifest CFTC positions mismatch")
                    require(position_field["observation_date"] == institutional["cftc"]["positions_as_of"],
                            "CFTC observation date mismatch")
                    require(position_field["published_on"] == institutional["cftc"]["published_on"],
                            "CFTC publication date mismatch")
            for window in ("4w", "13w"):
                keys = ("net", f"prior_{window}_net", f"change_{window}")
                if any(positions.get(key) is None for key in keys):
                    require(fields["cftc_4w13w"]["status"] in {"UNAVAILABLE", "CARRIED"},
                            "CFTC missing comparator must be explicitly unresolved")
                else:
                    require(positions[f"change_{window}"] == positions["net"] - positions[f"prior_{window}_net"],
                            f"CFTC {window} arithmetic wrong")
                    windows[f"{symbol}_{window}"] = positions[f"change_{window}"]
        if fields["cftc_4w13w"]["status"] not in {"UNAVAILABLE", "CARRIED"}:
            require(fields["cftc_4w13w"]["value"] == windows, "manifest CFTC windows mismatch")
        require(institutional["cftc"]["variant"] == "TFF_FUTURES_ONLY", "CFTC variant changed")
        require(institutional["cftc"]["category"] == "Leveraged Funds", "CFTC category changed")
        publication = institutional["cftc"].get("published_on")
        if publication is not None:
            require(date.fromisoformat(publication) <= cutoff.date(), "CFTC unpublished at cutoff")
        else:
            require(all(fields[name]["status"] in {"UNAVAILABLE", "CARRIED"}
                        for name in ("nasdaq_positions", "sp500_positions", "cftc_4w13w")),
                    "CFTC missing publication date requires unresolved fields")
        publication = institutional["short_interest"].get("publication_date")
        if publication is not None:
            require(date.fromisoformat(publication) <= cutoff.date(), "short interest unpublished at cutoff")
        else:
            require(fields["security_shorts"]["status"] in {"UNAVAILABLE", "CARRIED"},
                    "short interest missing publication date requires unresolved field")
        if fields["security_shorts"]["status"] not in {"UNAVAILABLE", "CARRIED"}:
            require(fields["security_shorts"]["value"] == institutional["short_interest"]["derived_analysis"],
                    "manifest short interest mismatch")
    except (KeyError, TypeError, ValueError, OSError) as exc:
        errors.append(f"malformed capture: {exc}")
    return {"valid": not errors, "data_status": data.get("data_status"),
            "unresolved_count": len(unresolved), "unresolved_fields": unresolved, "errors": errors}


def validate_repository(root: Path = ROOT) -> list[dict]:
    requirements = load_json(root / REQUIREMENTS)
    manifests = sorted((root / "data/research/weekly").glob("weekly_capture_*_r*.json"))
    if not manifests:
        return [{"valid": False, "errors": ["weekly manifest missing"]}]
    results, dates = [], set()
    for path in manifests:
        data = load_json(path)
        dates.add(data.get("report_date"))
        result = validate_capture(data, root, requirements)
        result["manifest"] = path.relative_to(root).as_posix()
        results.append(result)
    for report in (root / "Docs/research").glob("AI_CAPEX_WEEKLY_WATCH_????-??-??.md"):
        day = report.stem[-10:]
        if requirements["effective_report_date"] <= day < "2026-11-04" and day not in dates:
            results.append({"valid": False, "errors": [f"{day}: weekly report has no coverage manifest"]})
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--latest", action="store_true", help="validate all adopted captures and newest report coverage")
    parser.add_argument("--manifest", type=Path)
    parser.add_argument("--require-complete", action="store_true")
    args = parser.parse_args()
    try:
        results = ([validate_capture(load_json(args.manifest))] if args.manifest else validate_repository())
    except (ValueError, OSError, TypeError) as exc:
        results = [{"valid": False, "errors": [str(exc)]}]
    for result in results:
        print(json.dumps(result, ensure_ascii=False))
    failure = any(not r["valid"] or (args.require_complete and r.get("unresolved_count", 0)) for r in results)
    raise SystemExit(1 if failure else 0)


if __name__ == "__main__":
    main()
