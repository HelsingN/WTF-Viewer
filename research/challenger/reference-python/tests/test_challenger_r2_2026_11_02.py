"""CI regression check for frozen Challenger v1 R2 cash-flow arithmetic.

This verifies arithmetic, not the source facts or a reviewer decision.
"""
from pathlib import Path
import runpy


def test_challenger_r2_2026_11_02_reproducible_arithmetic():
    root = Path(__file__).resolve().parents[1]
    script = root / "scripts" / "research" / "check_challenger_r2_2026_11_02.py"
    namespace = runpy.run_path(str(script))
    namespace["main"]()
