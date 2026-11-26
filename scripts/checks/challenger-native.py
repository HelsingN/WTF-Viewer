"""Validate active migrated Challenger evidence using the original Python tools."""

import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile


ROOT = Path(__file__).resolve().parents[2]
RESEARCH = ROOT / "research"
LEGACY_REPORTS = Path("Docs/research")
LEGACY_EVENTS = Path("data/research/events")
LEGACY_WEEKLY = Path("data/research/weekly")
REGISTRY = LEGACY_EVENTS / "challenger_v2_event_registry.json"
EVENTS = RESEARCH / "challenger/events"
WEEKLY_REPORT = re.compile(r"AI_CAPEX_WEEKLY_WATCH_(\d{4}-\d{2}-\d{2})\.md")
WEEKLY_CAPTURE = re.compile(r"weekly_challenger_v2_(\d{4}-\d{2}-\d{2})_r[1-9]\d*\.json")


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def copy(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)


def project_active(stage):
    shutil.copytree(RESEARCH / "challenger/reference-python", stage, dirs_exist_ok=True)
    for item in read_json(RESEARCH / "migration-manifest.json")["files"]:
        source = ROOT / item["target_path"]
        if item["origin"] == "MAIN" and source.is_file():
            copy(source, stage / item["source_path"])

    for directory, target, pattern in (
        (RESEARCH / "reports/attachments", Path(), "*"),
        (EVENTS, LEGACY_EVENTS, "*"),
    ):
        for source in directory.rglob(pattern):
            if source.is_file():
                copy(source, stage / target / source.relative_to(directory))
    for directory, pattern in (("weekly", "AI_CAPEX_WEEKLY_WATCH_*.md"), ("daily", "*.md")):
        for source in (RESEARCH / "reports" / directory).glob(pattern):
            copy(source, stage / LEGACY_REPORTS / source.name)
    for source in (RESEARCH / "challenger/calculations").glob("*.json"):
        copy(source, stage / LEGACY_EVENTS / "recalculations" / source.name)


def apply_supplements(stage):
    events = {event["id"]: event["event_date"] for event in read_json(stage / REGISTRY)["events"]}
    for supplement in sorted((EVENTS / "supplements").glob("*.json")):
        entry = read_json(supplement)
        day = entry["date"]
        name = f"AI_CAPEX_DAILY_CLOSE_{day}.md"
        event = entry["event_id"]
        row = entry["row"]
        active_report = RESEARCH / "reports/daily" / name
        if (
            entry["schema"] != "wtf-viewer.daily-ledger-supplement.v1"
            or entry["original_report"] != active_report.relative_to(ROOT).as_posix()
            or not active_report.is_file()
            or events.get(event) != day
            or row.count(event) != 1
            or "\n" in row
            or "\r" in row
        ):
            raise ValueError(f"Invalid daily ledger supplement: {supplement.name}")

        report = stage / LEGACY_REPORTS / name
        lines = report.read_text(encoding="utf-8").splitlines()
        start = next(
            (i for i, line in enumerate(lines)
             if line.startswith("## ") and any(
                 heading in line.lower() for heading in ("event ledger", "publication manifest")
             )),
            None,
        )
        if start is None or row in lines:
            raise ValueError(f"Missing ledger or duplicate supplement row: {supplement.name}")
        end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
        last = max((i for i in range(start + 1, end) if lines[i].startswith("|")), default=start)
        if last == start:
            raise ValueError(f"Missing ledger table: {name}")
        lines.insert(last + 1, row)
        report.write_text("\n".join(lines) + "\n", encoding="utf-8")


def run_validator(stage, name, *args):
    env = dict(os.environ, PYTHONPATH=str(stage / "src"))
    subprocess.run(
        [sys.executable, str(stage / "scripts/research" / name), *args],
        cwd=stage,
        env=env,
        check=True,
    )


def validate_weekly(stage):
    captures = sorted((stage / LEGACY_WEEKLY).glob("weekly_challenger_v2_*_r*.json"))
    if not captures:
        raise ValueError("No active Challenger v2 weekly captures")

    proposals = {}
    for source in sorted((RESEARCH / "proposed").glob("*/Docs/research/*.md")):
        if source.is_file():
            proposals.setdefault(LEGACY_REPORTS / source.name, []).append(source)

    dates = set()
    for capture in captures:
        match = WEEKLY_CAPTURE.fullmatch(capture.name)
        if match is None:
            raise ValueError(f"Invalid weekly capture filename: {capture.name}")
        day = match[1]
        payload = read_json(capture)
        report = LEGACY_REPORTS / f"AI_CAPEX_WEEKLY_WATCH_{day}.md"
        if payload["report_date"] != day or payload["report"] != report.as_posix() or not (stage / report).is_file():
            raise ValueError(f"{capture.name}: missing active report or mismatched capture date")
        dates.add(day)

        # Resolve cited prior reports only while validating this accepted capture.
        staged_evidence = []
        try:
            refs = list(payload["source_refs"])
            for panel in (*payload["event_assessments"].values(), *payload["physical"].values()):
                refs.extend(panel["source_refs"])
            for item in payload["unresolved"].values():
                refs.extend(item["sources_checked"])
            for ref in sorted(set(refs)):
                path = Path(ref)
                matches = proposals.get(path, [])
                if not matches or (stage / path).exists():
                    continue
                if len(matches) > 1:
                    raise ValueError(f"Ambiguous proposed evidence: {ref}")
                copy(matches[0], stage / path)
                staged_evidence.append(stage / path)
            print(f"Validating active capture: {capture.name}", flush=True)
            run_validator(stage, "validate_weekly_challenger_v2.py", "--manifest", str(capture))
        finally:
            for evidence in staged_evidence:
                evidence.unlink()

    for report in (stage / LEGACY_REPORTS).glob("AI_CAPEX_WEEKLY_WATCH_*.md"):
        match = WEEKLY_REPORT.fullmatch(report.name)
        if match and match[1] >= "2026-11-04" and match[1] not in dates:
            raise ValueError(f"Missing active Challenger v2 capture: {match[1]}")


def main():
    base = os.environ.get("BASE_SHA", "")
    if not re.fullmatch(r"(?!0{40}$)[0-9a-f]{40}", base):
        raise ValueError("BASE_SHA must identify an explicit nonzero 40-character Git commit")
    with tempfile.TemporaryDirectory() as temp:
        stage = Path(temp)
        project_active(stage)
        apply_supplements(stage)

        base_registry = stage / "base-registry.json"
        base_registry.write_bytes(subprocess.check_output(
            ["git", "show", f"{base}:research/challenger/events/{REGISTRY.name}"], cwd=ROOT
        ))
        print(f"Append-only registry base: {base}", flush=True)
        validate_weekly(stage)

        args = ["--check", "--base-registry", str(base_registry)]
        if emit_dir := os.environ.get("RECALC_AUDIT_DIR"):
            args.extend(("--emit-dir", str(Path(emit_dir).resolve())))
        run_validator(stage, "challenger_v2_event_register.py", *args)


if __name__ == "__main__":
    main()
