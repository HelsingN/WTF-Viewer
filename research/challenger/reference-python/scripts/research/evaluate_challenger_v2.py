"""Read-only Challenger v2 research CLI.

Example after package installation:
  python scripts/research/evaluate_challenger_v2.py --input data/research/challenger/challenger_v2_input_template.yaml
No network, no trading, no state mutation.
"""
import argparse
import json
import sys
from pathlib import Path

import yaml

from scoring.challenger_v2 import evaluate_challenger_v2


def main() -> int:
    parser = argparse.ArgumentParser(description="Bounded Challenger v2 research calculator")
    parser.add_argument("--input", required=True, help="Versioned, reviewed YAML input")
    args = parser.parse_args()
    try:
        payload = yaml.safe_load(Path(args.input).read_text(encoding="utf-8"))
        if not isinstance(payload, dict):
            raise ValueError("YAML root must be mapping")
        result = evaluate_challenger_v2(payload)
    except (OSError, ValueError, yaml.YAMLError) as exc:
        print(f"ERROR: v2 research evaluation rejected: {exc}", file=sys.stderr)
        return 2
    print(json.dumps(result, ensure_ascii=False, sort_keys=True, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
