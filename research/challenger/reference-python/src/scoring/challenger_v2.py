"""Challenger v2 bounded research calculator. No runtime or trading integrations.

Inputs are *reviewed observations*, not raw SEC lines. This module validates
coverage, PIT chronology, event provenance and deterministic score arithmetic.
It cannot independently validate economic correctness of issuer-level labels.
"""
from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from typing import Any, Mapping

from scoring.challenger_v2_event_policy import validate_observable_qualification

CORE_WEIGHTS = {"R1": Decimal(20), "R2": Decimal(15), "R4": Decimal(20)}
CORE_MAX_AGE_DAYS = {"R1": 150, "R2": 150, "R4": 180}
EVENT_CAPS = {"R3": Decimal(4), "R5": Decimal(3), "R6": Decimal(4), "R7": Decimal(4)}
EVENT_HALF_LIFE_DAYS = {"R3": 90, "R5": 90, "R6": 60, "R7": 90}
QUALIFIED_CLASSES = frozenset(("PRIMARY_FACT", "INDEPENDENT_CONFIRMATION"))
QUALIFIED_CONFIDENCE = frozenset(("MEDIUM", "HIGH"))
ALLOWED_IMPACTS = frozenset((Decimal("-1"), Decimal("-0.5"), Decimal("0.5"), Decimal("1")))
Q = Decimal("0.01")
TINY = Decimal("0.000001")

# Prospectively frozen via review commit cac10cb3 (2026-11-03T22:28:54Z).
# This is a research-only contract; presence in main never activates a feed.
APPROVED_RESEARCH_COHORT_VERSION = "CHALLENGER_V2_RESEARCH_APPROVED_2026-11-04"
APPROVED_RESEARCH_COHORT_AT = datetime.fromisoformat("2026-11-03T22:28:54+00:00")
APPROVED_RESEARCH_ROSTERS = {
    "R1": {"MSFT": Decimal("0.20"), "GOOGL": Decimal("0.20"),
           "AMZN": Decimal("0.20"), "META": Decimal("0.20"),
           "ORCL": Decimal("0.20")},
    "R2": {"MSFT": Decimal("0.20"), "GOOGL": Decimal("0.20"),
           "AMZN": Decimal("0.20"), "META": Decimal("0.20"),
           "ORCL": Decimal("0.20")},
    "R4": {"MSFT": Decimal("0.10"), "GOOGL": Decimal("0.10"),
           "AMZN": Decimal("0.10"), "META": Decimal("0.10"),
           "ORCL": Decimal("0.10"), "CRWV": Decimal("0.25"),
           "IREN": Decimal("0.25")},
}
APPROVED_R4_STRATA = {
    "large_platform": ("MSFT", "GOOGL", "AMZN", "META", "ORCL"),
    "project_neocloud": ("CRWV", "IREN"),
}


def _number(value: Any, label: str) -> Decimal:
    try:
        d = Decimal(str(value))
    except (ValueError, ArithmeticError) as exc:
        raise ValueError(f"{label}: invalid number") from exc
    if not d.is_finite():
        raise ValueError(f"{label}: non-finite number")
    return d


def _date(value: str | None, label: str) -> datetime | None:
    if not value:
        return None
    try:
        out = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except (ValueError, AttributeError) as exc:
        raise ValueError(f"{label}: invalid ISO timestamp") from exc
    if out.utcoffset() is None:
        raise ValueError(f"{label}: timezone required")
    return out.astimezone(timezone.utc)


def _clip(v: Decimal, lo: Decimal, hi: Decimal) -> Decimal:
    return min(hi, max(lo, v))


def _fmt(v: Decimal) -> str:
    return str(v.quantize(Q, rounding=ROUND_HALF_UP))


def _yes(obj: Mapping[str, Any], key: str) -> bool:
    return isinstance(obj.get(key), str) and bool(obj[key].strip())


def _eligible_core(
    obs: Mapping[str, Any] | None, factor: str, issuer: str, as_of: datetime
) -> tuple[int | None, str | None, str | None]:
    if not obs or obs.get("level") is None:
        return None, "UNKNOWN", None
    level = obs["level"]
    if type(level) is not int or level not in (0, 1, 2):
        raise ValueError(f"{factor}/{issuer}: level must be integer 0, 1 or 2")
    # A conservative known-public-by timestamp is sufficient for later
    # research PIT cutoffs. It is never described as an exact first-public
    # instant; a reviewer must verify that the source was public by this bound.
    exact = obs.get("first_public_at")
    public_by = obs.get("known_public_by_at")
    basis = obs.get("availability_basis")
    if exact is not None and public_by is not None:
        raise ValueError(f"{factor}/{issuer}: choose exactly one availability timestamp")
    if exact is not None:
        if basis != "FIRST_PUBLIC_VERIFIED":
            return None, "UNVERIFIED_FIRST_PUBLIC_BASIS", None
        t = _date(exact, f"{factor}/{issuer} first_public_at")
    elif public_by is not None:
        if basis != "CONSERVATIVE_KNOWN_PUBLIC_BY":
            return None, "UNVERIFIED_KNOWN_BY_BASIS", None
        t = _date(public_by, f"{factor}/{issuer} known_public_by_at")
    else:
        return None, "NO_FIRST_PUBLIC_TIME", None
    if t is None:
        return None, "NO_FIRST_PUBLIC_TIME", None
    if t > as_of:
        raise ValueError(f"{factor}/{issuer}: PIT lookahead")
    until = _date(obs.get("valid_until"), f"{factor}/{issuer} valid_until")
    if until is None:
        return None, "NO_VALID_UNTIL", None
    if until < t:
        raise ValueError(f"{factor}/{issuer}: valid_until before first public")
    if until < as_of or (as_of - t).total_seconds() > CORE_MAX_AGE_DAYS[factor] * 86400:
        return None, "STALE", None
    if (
        obs.get("source_class") not in QUALIFIED_CLASSES
        or not str(obs.get("source_url", "")).startswith("https://")
        or not all(_yes(obs, k) for k in ("measurement", "rationale", "counterevidence", "causal_root_id"))
    ):
        return None, "INSUFFICIENT_PROVENANCE", None
    return level, None, str(obs["causal_root_id"])


def _event_admissibility(
    event: Mapping[str, Any], as_of: datetime
) -> tuple[bool, str, Decimal]:
    factor = event["factor"]
    exact, bound = event.get("first_public_at"), event.get("known_public_by_at")
    if exact and bound:
        raise ValueError(f"event {event['id']}: first-public and known-public-by are mutually exclusive")
    if bound and (
        event.get("availability_basis") != "CONSERVATIVE_KNOWN_PUBLIC_BY"
        or not str(event.get("publication_proof_url", "")).startswith("https://")
    ):
        return False, "UNVERIFIED_PUBLIC_BY", Decimal(0)
    p = _date(exact or bound, f"event {event['id']} public availability")
    if p is None:
        return False, "NO_PUBLIC_AVAILABILITY_TIME", Decimal(0)
    if p > as_of:
        raise ValueError(f"event {event['id']}: PIT lookahead")
    if (
        event.get("source_class") not in QUALIFIED_CLASSES
        or event.get("confidence") not in QUALIFIED_CONFIDENCE
        or not str(event.get("source_url", "")).startswith("https://")
        or not all(_yes(event, k) for k in ("causal_root_id", "effect_id", "rationale", "counterevidence"))
    ):
        return False, "NOT_QUALIFIED", Decimal(0)
    validate_observable_qualification(event)
    impact = _number(event.get("impact"), "event impact")
    if impact not in ALLOWED_IMPACTS:
        raise ValueError(f"event {event['id']}: unsupported impact")
    kind = event.get("kind")
    if kind == "STATE":
        until = _date(event.get("review_by"), f"event {event['id']} review_by")
        if until is None:
            return False, "NO_REVIEW_BY", Decimal(0)
        if until < p:
            raise ValueError(f"event {event['id']}: review_by before publication")
        if until < as_of:
            return False, "STALE_STATE", Decimal(0)
        return True, "ACTIVE_STATE", impact
    if kind == "EVENT":
        until = _date(event.get("expires_at"), f"event {event['id']} expires_at")
        if until is None:
            return False, "NO_EXPIRY", Decimal(0)
        if until < p:
            raise ValueError(f"event {event['id']}: expiry before publication")
        # Retrospective discovery must not make a transient event appear new.
        occurrence = _date(event.get("occurred_at"), f"event {event['id']} occurred_at") if bound else p
        if occurrence is None:
            return False, "NO_VERIFIED_OCCURRENCE_TIME_FOR_DECAY", Decimal(0)
        if occurrence > p:
            raise ValueError(f"event {event['id']}: occurrence after public-by bound")
        elapsed_days = max(0, (as_of - occurrence).total_seconds() / 86400)
        if until < as_of or elapsed_days > 2 * EVENT_HALF_LIFE_DAYS[factor]:
            return False, "STALE_EVENT", Decimal(0)
        freshness = Decimal(str(2 ** (-elapsed_days / EVENT_HALF_LIFE_DAYS[factor])))
        return True, "ACTIVE_EVENT", impact * freshness
    raise ValueError(f"event {event['id']}: kind must be STATE or EVENT")


def evaluate_challenger_v2(snapshot: Mapping[str, Any]) -> dict[str, Any]:
    """Evaluate a frozen *reviewed* cohort and event ledger with honest bounds.

    Does not infer issuer levels, source truth, v2 alert bands or trading signals.
    """
    if snapshot.get("schema") != "ai-capex.challenger-observable.v2-draft":
        raise ValueError("v2 schema expected")
    as_of = _date(snapshot.get("as_of"), "as_of")
    if as_of is None:
        raise ValueError("as_of required")
    if not _yes(snapshot, "cohort_version"):
        raise ValueError("explicit cohort_version required")
    replay = snapshot.get("posthoc_replay")
    if replay is not None and snapshot["cohort_version"] == APPROVED_RESEARCH_COHORT_VERSION:
        raise ValueError("approved prospective roster cannot be used as posthoc replay")
    if replay is not None:
        if (not isinstance(replay, dict)
                or replay.get("mode") != "POSTHOC_METHOD_REPLAY"
                or replay.get("claimed_preregistered") is not False
                or snapshot.get("cohort_frozen_at") is not None):
            raise ValueError("post-hoc mode requires explicit non-preregistered cohort")
        cohort_proposed_at = _date(
            replay.get("cohort_proposed_at"), "cohort_proposed_at"
        )
        if cohort_proposed_at is None or cohort_proposed_at <= as_of:
            raise ValueError("post-hoc cohort must have been selected AFTER historical as_of")
    else:
        cohort_proposed_at = None
        cohort_frozen_at = _date(snapshot.get("cohort_frozen_at"), "cohort_frozen_at")
        if cohort_frozen_at is None or cohort_frozen_at > as_of:
            raise ValueError("cohort must have been frozen before PIT as_of")
    core = snapshot.get("core")
    if not isinstance(core, dict) or set(core) != set(CORE_WEIGHTS):
        raise ValueError("core must contain exactly R1, R2, R4")
    approved_roster = snapshot["cohort_version"] == APPROVED_RESEARCH_COHORT_VERSION
    if approved_roster:
        if replay is not None:
            raise ValueError("approved prospective roster cannot be used as posthoc replay")
        if cohort_frozen_at != APPROVED_RESEARCH_COHORT_AT:
            raise ValueError("approved cohort freeze timestamp differs from reviewed record")
        for factor, canonical in APPROVED_RESEARCH_ROSTERS.items():
            candidate = core[factor].get("roster")
            if not isinstance(candidate, dict) or set(candidate) != set(canonical):
                raise ValueError(f"{factor}: approved cohort membership mismatch")
            for issuer, approved_weight in canonical.items():
                if _number(candidate[issuer], f"{factor}/{issuer}") != approved_weight:
                    raise ValueError(f"{factor}/{issuer}: approved weight mismatch")
    results: dict[str, dict[str, Any]] = {}
    core_roots: set[str] = set()
    lower_total = Decimal(0)
    upper_total = Decimal(0)
    weighted_coverage = Decimal(0)
    factor_sum = sum(CORE_WEIGHTS.values())

    for factor, factor_weight in CORE_WEIGHTS.items():
        block = core[factor]
        roster = block.get("roster", {})
        observations = block.get("observations", {})
        if not isinstance(roster, dict) or not roster or not isinstance(observations, dict):
            raise ValueError(f"{factor}: roster and observations mapping required")
        if set(observations) - set(roster):
            raise ValueError(f"{factor}: observation outside frozen roster")
        weights = {name: _number(weight, f"{factor}/{name} weight") for name, weight in roster.items()}
        if any(not isinstance(name, str) or not name or w <= 0 for name, w in weights.items()):
            raise ValueError(f"{factor}: positive named fixed roster weights required")
        if abs(sum(weights.values()) - Decimal(1)) > TINY:
            raise ValueError(f"{factor}: issuer weights must sum to 1")
        observed = Decimal(0)
        covered = Decimal(0)
        eligible_issuers: set[str] = set()
        missing: dict[str, str] = {}
        for issuer, w in weights.items():
            entry = observations.get(issuer)
            if entry is not None and not isinstance(entry, dict):
                raise ValueError(f"{factor}/{issuer}: malformed observation")
            level, reason, root = _eligible_core(entry, factor, issuer, as_of)
            if level is None:
                missing[issuer] = reason or "UNKNOWN"
            else:
                observed += w * Decimal(level)
                covered += w
                eligible_issuers.add(issuer)
                if root:
                    core_roots.add(root)
        lo = observed
        hi = observed + 2 * (Decimal(1) - covered)
        lower_total += factor_weight * lo
        upper_total += factor_weight * hi
        weighted_coverage += factor_weight * covered
        strata_coverage: dict[str, str] = {}
        coverage_ok_research = covered >= Decimal("0.70")
        if approved_roster and factor == "R4":
            for stratum, names in APPROVED_R4_STRATA.items():
                cohort_weight = sum((weights[name] for name in names), Decimal(0))
                observed_weight = sum(
                    (weights[name] for name in names if name in eligible_issuers), Decimal(0)
                )
                fraction = observed_weight / cohort_weight
                strata_coverage[stratum] = _fmt(100 * fraction)
                minimum = Decimal("0.60") if stratum == "large_platform" else Decimal("0.50")
                coverage_ok_research = coverage_ok_research and fraction >= minimum
        results[factor] = {
            "level_bounds": [_fmt(lo), _fmt(hi)],
            "coverage_pct": _fmt(100 * covered),
            "coverage_ok_70pct": covered >= Decimal("0.70"),
            "coverage_ok_for_research": coverage_ok_research,
            "strata_coverage_pct": strata_coverage,
            "missing_or_stale": missing,
            "exact_level": _fmt(lo) if hi - lo <= TINY else None,
        }

    core_lo = 100 * lower_total / (2 * factor_sum)
    core_hi = 100 * upper_total / (2 * factor_sum)

    events = snapshot.get("events", [])
    if not isinstance(events, list):
        raise ValueError("events must be a list")
    ids: set[str] = set()
    candidates: list[tuple[Mapping[str, Any], Decimal]] = []
    rejected: list[dict[str, str]] = []
    event_map: dict[str, Mapping[str, Any]] = {}
    for ev in events:
        if not isinstance(ev, dict) or ev.get("factor") not in EVENT_CAPS or not _yes(ev, "id"):
            raise ValueError("every event needs a unique id and R3/R5/R6/R7 factor")
        event_id = str(ev["id"])
        if event_id in ids:
            raise ValueError(f"duplicate event id: {event_id}")
        ids.add(event_id)
        event_map[event_id] = ev
        eligible, reason, impact = _event_admissibility(ev, as_of)
        if eligible:
            candidates.append((ev, impact))
        else:
            rejected.append({"id": event_id, "reason": reason})

    # A candidate excluded for reusing an already-scored core cause cannot
    # supersede an older eligible state or erase its contribution.
    core_independent_candidates: list[tuple[Mapping[str, Any], Decimal]] = []
    for ev, impact in candidates:
        if str(ev["causal_root_id"]) in core_roots and not bool(ev.get("independent_effect")):
            rejected.append({"id": str(ev["id"]), "reason": "OVERLAPS_CORE"})
        else:
            core_independent_candidates.append((ev, impact))

    superseded: set[str] = set()
    for ev, _ in core_independent_candidates:
        for old_id in ev.get("supersedes", []):
            if old_id not in event_map or old_id == ev["id"]:
                raise ValueError(f"invalid supersedes relation: {ev['id']} -> {old_id}")
            old_dt = _date(event_map[old_id].get("first_public_at"), "superseded first_public_at")
            new_dt = _date(ev.get("first_public_at"), "superseding first_public_at")
            if old_dt is not None and new_dt is not None and new_dt < old_dt:
                raise ValueError(f"backdated supersession: {ev['id']}")
            superseded.add(old_id)

    deltas: dict[str, Decimal] = {f: Decimal(0) for f in EVENT_CAPS}
    counted_effects: set[tuple[str, str]] = set()
    counted_roots: set[str] = set()
    used_ids: list[str] = []
    for ev, impact in core_independent_candidates:
        ev_id = str(ev["id"])
        root = str(ev["causal_root_id"])
        effect = str(ev["effect_id"])
        if ev_id in superseded:
            rejected.append({"id": ev_id, "reason": "SUPERSEDED"})
            continue
        key = (root, effect)
        if key in counted_effects:
            raise ValueError(f"duplicate counted economic effect: {root}/{effect}")
        if root in counted_roots and not bool(ev.get("independent_effect")):
            rejected.append({"id": ev_id, "reason": "OVERLAPS_EVENT_ROOT"})
            continue
        counted_effects.add(key)
        counted_roots.add(root)
        factor = str(ev["factor"])
        deltas[factor] += impact * EVENT_CAPS[factor]
        used_ids.append(ev_id)

    factor_deltas = {f: _clip(d, -EVENT_CAPS[f], EVENT_CAPS[f]) for f, d in deltas.items()}
    adjustment = sum(factor_deltas.values(), Decimal(0))
    final_lo = _clip(core_lo + adjustment, Decimal(0), Decimal(100))
    final_hi = _clip(core_hi + adjustment, Decimal(0), Decimal(100))
    sufficiently_covered = all(v["coverage_ok_for_research"] for v in results.values())
    return {
        "schema": "ai-capex.challenger-observable.v2-draft",
        "as_of": snapshot["as_of"],
        "cohort_version": snapshot["cohort_version"],
        "cohort_frozen_at": snapshot.get("cohort_frozen_at"),
        "cohort_proposed_at": replay.get("cohort_proposed_at") if replay else None,
        "historically_preregistered": replay is None,
        "status": "POSTHOC_REPLAY_UNVALIDATED" if replay else (
            "EXACT_RESEARCH_ARITHMETIC" if abs(final_hi - final_lo) <= TINY else (
                "BOUNDED_RESEARCH_WITH_UNCERTAINTY" if sufficiently_covered else "LOW_COVERAGE_BOUND_ONLY"
            )
        ),
        "review_status": "POSTHOC_REQUIRES_REVIEW" if replay else "REQUIRES_HUMAN_REVIEW",
        "calibration": "UNCALIBRATED",
        "category": None,
        "trading_signal": False,
        "core_factors": results,
        "core_coverage_pct": _fmt(100 * weighted_coverage / factor_sum),
        "core_interval": [_fmt(core_lo), _fmt(core_hi)],
        "event_adjustments": {f: _fmt(v) for f, v in factor_deltas.items()},
        "event_total_adjustment": _fmt(adjustment),
        "used_event_ids": used_ids,
        "excluded_events": rejected,
        "final_interval": [_fmt(final_lo), _fmt(final_hi)],
        "final_exact_score": _fmt(final_lo) if abs(final_hi - final_lo) <= TINY else None,
    }
