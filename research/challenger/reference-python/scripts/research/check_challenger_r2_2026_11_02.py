"""Reproduce Challenger v1 R2 arithmetic from the dated research panel.

Research-only; no trade/Champion authority. Run: python scripts/research/check_challenger_r2_2026_11_02.py
Amounts USD bn; rounded Alphabet inputs are approximate.
"""
from decimal import Decimal as D

WEIGHTS = {"R1": 20, "R2": 15, "R3": 15, "R4": 20, "R5": 10, "R6": 10, "R7": 10}
LEVELS = {"R1": 1, "R2": 2, "R3": 1, "R4": 2, "R5": 1, "R6": 1, "R7": 1}

def score(levels):
    assert set(levels) == set(WEIGHTS)
    assert all(level in (0, 1, 2) for level in levels.values())
    return sum(D(WEIGHTS[k]) * D(levels[k]) / 2 for k in WEIGHTS)

def fcf(ocf, ppe, incentives=None, lease_principal=None):
    """Returns cash PPE proxy and lease-inclusive FCF; unknown stays None."""
    proxy = D(ocf) - D(ppe) + (D(incentives) if incentives is not None else 0)
    # A proxy with unknown incentives is gross-PPE based, not fully normalized.
    return proxy, proxy - D(lease_principal) if lease_principal is not None else None

def main():
    assert fcf("58.000", "39.367")[0] == D("18.633")
    assert fcf("42.300", "51.360")[0] == D("-9.060")
    assert fcf("42.422", "77.259", "1.381")[0] == D("-33.456")
    assert fcf("32.786", "33.942", "0", "0.964") == (D("-1.156"), D("-2.120"))
    assert fcf("23.103", "28.499")[0] == D("-5.396")
    assert D("-42.357") - D("-7.600") == D("-34.757")
    assert D("-2.120") - D("0.784") == D("-2.904")
    assert sum(WEIGHTS.values()) == 100
    assert score(LEVELS) == D("67.5")
    conservative = dict(LEVELS, R2=1)
    assert score(conservative) == D("60.0")
    print("PASS: issuer arithmetic and frozen Challenger sensitivity 60.0..67.5 (ALERT)")
    print("PARTIAL: source timestamps, lease normalization and reviewer acceptance not tested")

if __name__ == "__main__":
    main()
