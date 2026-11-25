"""Project migrated evidence into the original validator layout without editing it."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

root = Path(__file__).resolve().parents[2]
ref = root / "research/challenger/reference-python"
with tempfile.TemporaryDirectory() as tmp:
    stage = Path(tmp)
    def copy(source, relative):
        target = stage / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
    shutil.copytree(ref, stage, dirs_exist_ok=True)
    manifest = json.loads((root / "research/migration-manifest.json").read_text())
    for item in manifest["files"]:
        if item["origin"] == "MAIN" and (root / item["target_path"]).is_file():
            copy(root / item["target_path"], item["source_path"])
    for source in (root / "research/reports/attachments").rglob("*"):
        if source.is_file():
            copy(source, source.relative_to(root / "research/reports/attachments"))
    for source in (root / "research/reports/weekly").glob("AI_CAPEX_WEEKLY_WATCH_*.md"):
        copy(source, Path("Docs/research") / source.name)
    for source in (root / "research/reports/daily").glob("*.md"):
        copy(source, Path("Docs/research") / source.name)
    for source in (root / "research/challenger/events").rglob("*"):
        if source.is_file():
            copy(source, Path("data/research/events") / source.relative_to(root / "research/challenger/events"))
    # Every active weekly report after cutover must have an active capture.
    for report in (root / "research/reports/weekly").glob("AI_CAPEX_WEEKLY_WATCH_*.md"):
        day = report.stem[-10:]
        if day >= "2026-11-04":
            assert list((stage / "data/research/weekly").glob(f"weekly_challenger_v2_{day}_r*.json")), f"Missing capture: {day}"
    # Proposed reports may be cited as evidence, but are not accepted captures.
    # Resolve them only during individual manifest validation, not report discovery.
    proposed = root / "research/proposed"
    for source in proposed.glob("*/Docs/research/*.md"):
        relative = Path("Docs/research") / source.name
        if not (stage / relative).exists():
            copy(source, relative)
    # Apply explicit retrospective supplements only to temporary validation view.
    for supplement in sorted((root / "research/challenger/events/supplements").glob("*.json")):
        entry = json.loads(supplement.read_text())
        assert entry["schema"] == "wtf-viewer.daily-ledger-supplement.v1"
        report = stage / "Docs/research" / Path(entry["original_report"]).name
        lines = report.read_text().splitlines()
        start = next(i for i, line in enumerate(lines) if line.startswith("## ") and "event ledger" in line.lower())
        end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
        last = max(i for i in range(start + 1, end) if lines[i].startswith("|"))
        assert entry["row"] not in lines
        lines.insert(last + 1, entry["row"])
        report.write_text("\n".join(lines) + "\n")
    env = dict(os.environ, PYTHONPATH=str(stage / "src"))
    weekly = stage / "data/research/weekly"
    assert list(weekly.glob("weekly_challenger_v2_*_r*.json")), "No active weekly captures"
    assert (stage / "data/research/events/challenger_v2_event_registry.json").is_file(), "Missing registry"
    base_registry = stage / "base-registry.json"
    base = os.environ.get("BASE_SHA") or subprocess.check_output(["git", "rev-parse", "HEAD^"], cwd=root, text=True).strip()
    base_registry.write_bytes(subprocess.check_output(["git", "show", base + ":research/challenger/events/challenger_v2_event_registry.json"], cwd=root))
    # Validate each active manifest; proposed evidence is not a published report.
    for capture in sorted(weekly.glob("weekly_challenger_v2_*_r*.json")):
        subprocess.run([sys.executable, str(stage / "scripts/research/validate_weekly_challenger_v2.py"), "--manifest", str(capture)], cwd=stage, env=env, check=True)
    for script, args in [
        
        ("challenger_v2_event_register.py", ["--check", "--base-registry", str(base_registry)]),
    ]:
        subprocess.run([sys.executable, str(stage / "scripts/research" / script), *args], cwd=stage, env=env, check=True)
