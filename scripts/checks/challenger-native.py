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
    env = dict(os.environ, PYTHONPATH=str(stage / "src"))
    weekly = stage / "data/research/weekly"
    assert list(weekly.glob("weekly_challenger_v2_*_r*.json")), "No active weekly captures"
    assert (stage / "data/research/events/challenger_v2_event_registry.json").is_file(), "Missing registry"
    for script, args in [
        ("validate_weekly_challenger_v2.py", ["--latest"]),
        ("challenger_v2_event_register.py", ["--check"]),
    ]:
        subprocess.run([sys.executable, str(stage / "scripts/research" / script), *args], cwd=stage, env=env, check=True)
