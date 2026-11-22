"""Reproduce Challenger v2 issuer metrics from previous audit evidence.

This is NOT the v2 core scorer: all observed issuer levels require independent
review and cohort/time approval. No network or trading functionality.

Usage:
  python scripts/research/measure_challenger_v2_observables.py \
    --input data/research/challenger/challenger_v2_recovered_observables_2026-11-02.yaml
"""
import argparse
import json
import sys
from pathlib import Path

import yaml

from scoring.challenger_v2_metrics import build_recovered_metrics


def main() -> int:
    parser = argparse.ArgumentParser(description="Read-only recovered issuer metric report")
    parser.add_argument("--input", required=True, help="Recovered, non-approved YAML research data")
    args = parser.parse_args()
    try:
        data = yaml.safe_load(Path(args.input).read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError("YAML root must be mapping")
        output = build_recovered_metrics(data)
    except (OSError, ValueError, KeyError, TypeError, yaml.YAMLError) as exc:
        print(f"ERROR: recovered metric report failed: {exc}", file=sys.stderr)
        return 2
    print(json.dumps(output, sort_keys=True, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
