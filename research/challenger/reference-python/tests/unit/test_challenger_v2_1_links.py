"""Regression: active entry points must require Challenger 2.1 event qualification."""
from pathlib import Path
from scoring.challenger_v2_event_policy import POLICY

ROOT = Path(__file__).resolve().parents[2]
ACTIVE = [
    "README.md",
    ".cursor/rules/documentation-consistency.mdc",
    "config/research/ai_capex_watch_prompt_v1.txt",
    "Docs/AI_ROI_CHALLENGER_MODEL_v2.md",
    "Docs/CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md",
    "Docs/WEEKLY_CHALLENGER_V2_CAPTURE_CONTRACT.md",
]

def test_current_challenger_event_policy_links():
    assert POLICY == "OBSERVABLE_EVENT_QUALIFICATION_V2_1"
    for path in ACTIVE:
        text = (ROOT / path).read_text(encoding="utf-8")
        assert "CHALLENGER_V2_EVENT_POLICY_V2_1.md" in text, path
        assert "OBSERVABLE_EVENT_QUALIFICATION_V2_1" in text, path

def test_weekly_prompt_uses_adopted_v2_validator():
    text = (ROOT / ACTIVE[2]).read_text(encoding="utf-8")
    assert "VALIDATION_PENDING_V2_WEEKLY_SCHEMA" not in text
    assert "v2 weekly schema не принят" not in text
    assert "validate_weekly_challenger_v2.py --latest" in text
