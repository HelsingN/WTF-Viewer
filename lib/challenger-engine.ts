import Decimal from "decimal.js";

const D = Decimal.clone({ precision: 28, rounding: Decimal.ROUND_HALF_EVEN });
const tiny = new D("0.000001");
const zero = new D(0);
const dayMicros = BigInt(86_400_000_000);
const microsPerSecond = BigInt(1_000_000);
const microsPerMillisecond = BigInt(1000);
const schema = "ai-capex.challenger-observable.v2-draft";
export const approvedCohort = "CHALLENGER_V2_RESEARCH_APPROVED_2026-11-04";
export const observablePolicy = "OBSERVABLE_EVENT_QUALIFICATION_V2_1";
const approvedFreeze = "2026-11-03T22:28:54Z";

const coreWeights = { R1: 20, R2: 15, R4: 20 } as const;
const maxAge = { R1: BigInt(150), R2: BigInt(150), R4: BigInt(180) } as const;
const caps = { R3: 4, R5: 3, R6: 4, R7: 4 } as const;
const halfLife = { R3: 90, R5: 90, R6: 60, R7: 90 } as const;
type Core = keyof typeof coreWeights;
type Factor = keyof typeof caps;
const coreFactors = Object.keys(coreWeights) as Core[];
const eventFactors = Object.keys(caps) as Factor[];

const platforms = ["MSFT", "GOOGL", "AMZN", "META", "ORCL"];
const neocloud = ["CRWV", "IREN"];
const platformWeights = Object.fromEntries(platforms.map(name => [name, "0.20"]));
const approvedRosters = {
  R1: platformWeights, R2: platformWeights,
  R4: { ...Object.fromEntries(platforms.map(name => [name, "0.10"])), CRWV: "0.25", IREN: "0.25" },
};
const strata = [
  ["large_platform", platforms, "0.60"],
  ["project_neocloud", neocloud, "0.50"],
] as const;
const outcomes: Record<Factor, readonly string[]> = {
  R3: ["REALIZED_COMPUTE_COST_INTENSITY", "OBSERVED_UNIT_REVENUE_OR_YIELD", "REPORTED_PROJECT_CASH_RETURN"],
  R5: ["EXECUTED_CONTRACT_AMENDMENT", "REALIZED_COLLECTION_OR_SHORTFALL", "ENFORCED_CONTRACT_CANCELLATION"],
  R6: ["REVENUE_GENERATING_CAPACITY", "PAID_CAPACITY_INTERRUPTION", "REVENUE_GENERATING_CAPACITY_RESTART"],
  R7: ["FUNDED_SITE_ECONOMIC_DEFERRAL", "FUNDED_SITE_CANCELLATION", "FUNDED_PROJECT_RESTRUCTURING", "RESUMED_FUNDED_SITE"],
};

type Fields = Record<string, unknown>;
type CoreResult = {
  level_bounds: [string, string];
  coverage_pct: string;
  coverage_ok_70pct: boolean;
  coverage_ok_for_research: boolean;
  strata_coverage_pct: Record<string, string>;
  missing_or_stale: Record<string, string>;
  exact_level: string | null;
};
type Event = Fields & { id: string; factor: Factor };
type Exclusion = { id: string; reason: string };

function reject(message: string): never { throw new Error(message); }
function mapping(input: unknown): input is Fields { return typeof input === "object" && input !== null && !Array.isArray(input); }
function object(input: unknown, message: string): Fields { return mapping(input) ? input : reject(message); }
function nonempty(value: unknown): value is string { return typeof value === "string" && Boolean(value.trim()); }
function https(value: unknown) { return typeof value === "string" && value.startsWith("https://"); }
function exactKeys(field: Fields, keys: readonly string[]) {
  return Object.keys(field).length === keys.length && keys.every(key => Object.hasOwn(field, key));
}
function qualifiedSource(value: unknown) { return value === "PRIMARY_FACT" || value === "INDEPENDENT_CONFIRMATION"; }
function number(value: unknown, label: string): Decimal {
  if (typeof value !== "string" && typeof value !== "number") reject(`${label}: invalid number`);
  const normalized = String(value).trim();
  if (/^[+-]?(?:s?nan|inf(?:inity)?)$/i.test(normalized)) reject(`${label}: non-finite number`);
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized)) reject(`${label}: invalid number`);
  const parsed = new D(normalized);
  if (!parsed.isFinite()) reject(`${label}: non-finite number`);
  return parsed;
}
function format(value: Decimal) { return value.toFixed(2, D.ROUND_HALF_UP); }
function sum(values: Iterable<Decimal>) {
  let total = zero;
  for (const value of values) total = total.plus(value);
  return total;
}
function clip(value: Decimal, lo: number, hi: number) { return D.min(hi, D.max(lo, value)); }

export function timestamp(value: unknown, label: string): bigint | null {
  if (value === undefined || value === null || value === "") return null;
  const parts = typeof value === "string" && /^(\d{4}-\d{2}-\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,6}))?)?(Z|[+-]\d{2}:\d{2})?$/.exec(value);
  if (!parts) reject(`${label}: invalid ISO timestamp`);
  const [, date, hour, minute, second = "00", fraction = "", zone] = parts;
  if (!zone) reject(`${label}: timezone required`);
  const local = `${date}T${hour}:${minute}:${second}`;
  const wallClock = Date.parse(local + "Z");
  if (date.startsWith("0000-") || !Number.isFinite(wallClock) || new Date(wallClock).toISOString().slice(0, 19) !== local) {
    reject(`${label}: invalid ISO timestamp`);
  }
  const sign = zone.startsWith("-") ? -1 : 1;
  const zoneHour = zone === "Z" ? 0 : Number(zone.slice(1, 3));
  const zoneMinute = zone === "Z" ? 0 : Number(zone.slice(4, 6));
  if (zoneHour > 23 || zoneMinute > 59) reject(`${label}: invalid ISO timestamp`);
  const epoch = wallClock - sign * (zoneHour * 60 + zoneMinute) * 60_000;
  if (new Date(epoch).toISOString().length !== 24 || epoch < -62_135_596_800_000) reject(`${label}: invalid ISO timestamp`);
  return BigInt(epoch) * microsPerMillisecond + BigInt(fraction.padEnd(6, "0"));
}

export function utcTimestamp(micros: bigint) {
  const fraction = (micros % microsPerSecond + microsPerSecond) % microsPerSecond;
  const base = new Date(Number((micros - fraction) / microsPerMillisecond)).toISOString().slice(0, 19);
  return fraction ? `${base}.${String(fraction).padStart(6, "0")}Z` : `${base}Z`;
}

function eligibleCore(obs: Fields, factor: Core, issuer: string, asOf: bigint): [number, string] | string {
  const level = obs.level;
  if (level === null || level === undefined) return "UNKNOWN";
  const path = `${factor}/${issuer}`;
  if (level !== 0 && level !== 1 && level !== 2) reject(`${path}: level must be integer 0, 1 or 2`);
  const exact = obs.first_public_at != null;
  const bound = obs.known_public_by_at != null;
  if (exact && bound) reject(`${path}: choose exactly one availability timestamp`);
  if (exact && obs.availability_basis !== "FIRST_PUBLIC_VERIFIED") return "UNVERIFIED_FIRST_PUBLIC_BASIS";
  if (bound && obs.availability_basis !== "CONSERVATIVE_KNOWN_PUBLIC_BY") return "UNVERIFIED_KNOWN_BY_BASIS";
  const t = timestamp(exact ? obs.first_public_at : obs.known_public_by_at, `${path} ${exact ? "first_public_at" : "known_public_by_at"}`);
  if (t === null) return "NO_FIRST_PUBLIC_TIME";
  if (t > asOf) reject(`${path}: PIT lookahead`);
  const until = timestamp(obs.valid_until, `${path} valid_until`);
  if (until === null) return "NO_VALID_UNTIL";
  if (until < t) reject(`${path}: valid_until before first public`);
  if (until < asOf || asOf - t > maxAge[factor] * dayMicros) return "STALE";
  if (!qualifiedSource(obs.source_class) || !https(obs.source_url)
    || ![obs.measurement, obs.rationale, obs.counterevidence, obs.causal_root_id].every(nonempty)) return "INSUFFICIENT_PROVENANCE";
  return [level, obs.causal_root_id as string];
}

function qualify(ev: Event) {
  if (ev.qualification_policy !== observablePolicy) reject("QUALIFIED requires current observable-event qualification policy");
  const outcome = object(ev.observable_outcome, "QUALIFIED requires supported factor-specific observable economic change");
  if (typeof outcome.kind !== "string" || !outcomes[ev.factor].includes(outcome.kind)) reject("QUALIFIED requires supported factor-specific observable economic change");
  if (![outcome.scope, outcome.observed_change, outcome.comparison_basis, outcome.independent_effect_reason, outcome.uncertainties].every(nonempty)) {
    reject("QUALIFIED observable outcome lacks scope, comparable measurement or independence rationale");
  }
  const basis = outcome.impact_basis;
  if (basis !== "SINGLE_VERIFIED_CHANGE" && basis !== "REPEATED_OR_TERMINAL_CONFIRMED") reject("QUALIFIED needs an explicit pre-specified impact basis");
  const impact = number(ev.impact, "event impact");
  if (!impact.abs().eq(basis === "SINGLE_VERIFIED_CHANGE" ? "0.5" : 1)) reject("QUALIFIED impact does not match observable evidence tier");
  if (outcome.direction !== "DETERIORATION" && outcome.direction !== "IMPROVEMENT") reject("QUALIFIED needs signed economic direction");
  if (impact.gt(0) !== (outcome.direction === "DETERIORATION")) reject("QUALIFIED impact sign conflicts with economic direction");
  if (basis === "REPEATED_OR_TERMINAL_CONFIRMED" && !https(outcome.corroboration_url)) reject("maximum event magnitude requires independent corroboration");
  return impact;
}

function eventImpact(ev: Event, asOf: bigint): Decimal | string {
  const label = `event ${ev.id}`;
  const exact = ev.first_public_at;
  const bound = ev.known_public_by_at;
  if (exact && bound) reject(`${label}: first-public and known-public-by are mutually exclusive`);
  if (bound && (ev.availability_basis !== "CONSERVATIVE_KNOWN_PUBLIC_BY" || !https(ev.publication_proof_url))) return "UNVERIFIED_PUBLIC_BY";
  const publication = timestamp(exact || bound, `${label} public availability`);
  if (publication === null) return "NO_PUBLIC_AVAILABILITY_TIME";
  if (publication > asOf) reject(`${label}: PIT lookahead`);
  if (!qualifiedSource(ev.source_class) || (ev.confidence !== "MEDIUM" && ev.confidence !== "HIGH") || !https(ev.source_url)
      || ![ev.causal_root_id, ev.effect_id, ev.rationale, ev.counterevidence].every(nonempty)) return "NOT_QUALIFIED";
  const impact = qualify(ev);

  if (ev.kind === "STATE") {
    const until = timestamp(ev.review_by, `${label} review_by`);
    if (until === null) return "NO_REVIEW_BY";
    if (until < publication) reject(`${label}: review_by before publication`);
    return until < asOf ? "STALE_STATE" : impact;
  }
  if (ev.kind !== "EVENT") reject(`${label}: kind must be STATE or EVENT`);
  const until = timestamp(ev.expires_at, `${label} expires_at`);
  if (until === null) return "NO_EXPIRY";
  if (until < publication) reject(`${label}: expiry before publication`);
  const occurrence = bound ? timestamp(ev.occurred_at, `${label} occurred_at`) : publication;
  if (occurrence === null) return "NO_VERIFIED_OCCURRENCE_TIME_FOR_DECAY";
  if (occurrence > publication) reject(`${label}: occurrence after public-by bound`);
  const elapsedDays = (Number(asOf - occurrence) / 1_000_000) / 86400;
  const half = halfLife[ev.factor];
  if (until < asOf || elapsedDays > 2 * half) return "STALE_EVENT";
  // The reference uses a binary64 power before converting it into Decimal.
  return impact.times(String(2 ** (-elapsedDays / half)));
}

function eventAdjustments(value: unknown, asOf: bigint, coreRoots: Set<string>) {
  const ledger = value === undefined ? [] : value;
  if (!Array.isArray(ledger)) reject("events must be a list");
  const all = new Map<string, Event>();
  const candidates: [Event, Decimal][] = [];
  const excluded: Exclusion[] = [];
  for (const raw of ledger) {
    if (!mapping(raw) || !nonempty(raw.id) || typeof raw.factor !== "string" || !Object.hasOwn(caps, raw.factor)) {
      reject("every event needs a unique id and R3/R5/R6/R7 factor");
    }
    const ev = raw as Event;
    if (all.has(ev.id)) reject(`duplicate event id: ${ev.id}`);
    all.set(ev.id, ev);
    const impact = eventImpact(ev, asOf);
    if (typeof impact === "string") excluded.push({ id: ev.id, reason: impact });
    else candidates.push([ev, impact]);
  }

  const independent = candidates.filter(([ev]) => {
    if (!coreRoots.has(String(ev.causal_root_id)) || ev.independent_effect) return true;
    excluded.push({ id: ev.id, reason: "OVERLAPS_CORE" });
    return false;
  });
  const superseded = new Set<string>();
  for (const [ev] of independent) {
    const prior = ev.supersedes === undefined ? [] : ev.supersedes;
    if (!Array.isArray(prior)) reject(`invalid supersedes relation: ${ev.id}`);
    for (const id of prior) {
      const older = all.get(id);
      if (!older || id === ev.id) reject(`invalid supersedes relation: ${ev.id} -> ${id}`);
      const oldDate = timestamp(older.first_public_at, "superseded first_public_at");
      const newDate = timestamp(ev.first_public_at, "superseding first_public_at");
      if (oldDate !== null && newDate !== null && newDate < oldDate) reject(`backdated supersession: ${ev.id}`);
      superseded.add(id);
    }
  }

  const deltas = { R3: zero, R5: zero, R6: zero, R7: zero };
  const effects = new Set<string>();
  const roots = new Set<string>();
  const used: string[] = [];
  for (const [ev, impact] of independent) {
    const { id, factor } = ev;
    const root = String(ev.causal_root_id);
    const effect = String(ev.effect_id);
    if (superseded.has(id)) {
      excluded.push({ id, reason: "SUPERSEDED" });
      continue;
    }
    const key = JSON.stringify([root, effect]);
    if (effects.has(key)) reject(`duplicate counted economic effect: ${root}/${effect}`);
    if (roots.has(root) && !ev.independent_effect) {
      excluded.push({ id, reason: "OVERLAPS_EVENT_ROOT" });
      continue;
    }
    effects.add(key);
    roots.add(root);
    deltas[factor] = deltas[factor].plus(impact.times(caps[factor]));
    used.push(id);
  }

  const limited = eventFactors.map(factor => [factor, clip(deltas[factor], -caps[factor], caps[factor])] as const);
  return {
    byFactor: Object.fromEntries(limited.map(([factor, delta]) => [factor, format(delta)])),
    total: sum(limited.map(([, delta]) => delta)),
    used,
    excluded,
  };
}

export function evaluateChallenger(snapshot: unknown) {
  const input = object(snapshot, "snapshot must be a mapping");
  if (input.schema !== schema) reject("v2 schema expected");
  const asOf = timestamp(input.as_of, "as_of");
  if (asOf === null) reject("as_of required");
  if (!nonempty(input.cohort_version)) reject("explicit cohort_version required");
  const approved = input.cohort_version === approvedCohort;
  const replay = input.posthoc_replay != null
    ? object(input.posthoc_replay, "post-hoc mode requires explicit non-preregistered cohort") : null;
  if (input.posthoc_replay != null && approved) reject("approved prospective roster cannot be used as posthoc replay");
  if (replay) {
    if (replay.mode !== "POSTHOC_METHOD_REPLAY" || replay.claimed_preregistered !== false || input.cohort_frozen_at != null) {
      reject("post-hoc mode requires explicit non-preregistered cohort");
    }
    const proposed = timestamp(replay.cohort_proposed_at, "cohort_proposed_at");
    if (proposed === null || proposed <= asOf) reject("post-hoc cohort must have been selected AFTER historical as_of");
  } else {
    const frozen = timestamp(input.cohort_frozen_at, "cohort_frozen_at");
    if (frozen === null || frozen > asOf) reject("cohort must have been frozen before PIT as_of");
    if (approved && frozen !== timestamp(approvedFreeze, "approved freeze")) reject("approved cohort freeze timestamp differs from reviewed record");
  }
  const core = object(input.core, "core must contain exactly R1, R2, R4");
  if (!exactKeys(core, coreFactors)) reject("core must contain exactly R1, R2, R4");

  const results: [Core, CoreResult][] = [];
  const roots = new Set<string>();
  let lower = zero, upper = zero, coverage = zero;
  for (const factor of coreFactors) {
    const block = object(core[factor], `${factor}: roster and observations mapping required`);
    const roster = object(block.roster, `${factor}: ${approved ? "approved cohort membership mismatch" : "roster and observations mapping required"}`);
    const observations = object(block.observations === undefined ? {} : block.observations, `${factor}: roster and observations mapping required`);
    if (approved) {
      const canonical: Record<string, string> = approvedRosters[factor];
      if (!exactKeys(roster, Object.keys(canonical))) reject(`${factor}: approved cohort membership mismatch`);
      for (const [issuer, weight] of Object.entries(canonical)) {
        if (!number(roster[issuer], `${factor}/${issuer}`).eq(weight)) reject(`${factor}/${issuer}: approved weight mismatch`);
      }
    }
    if (!Object.keys(roster).length) reject(`${factor}: roster and observations mapping required`);
    if (Object.keys(observations).some(issuer => !Object.hasOwn(roster, issuer))) reject(`${factor}: observation outside frozen roster`);
    const weights = new Map(Object.entries(roster).map(([issuer, weight]) => [issuer, number(weight, `${factor}/${issuer} weight`)]));
    for (const [issuer, weight] of weights) {
      if (!issuer || weight.lte(0)) reject(`${factor}: positive named fixed roster weights required`);
    }
    if (sum(weights.values()).minus(1).abs().gt(tiny)) reject(`${factor}: issuer weights must sum to 1`);

    let observed = zero, covered = zero;
    const eligible = new Set<string>();
    const missing: [string, string][] = [];
    for (const [issuer, weight] of weights) {
      const obs = Object.hasOwn(observations, issuer) ? observations[issuer] : null;
      const outcome = eligibleCore(obs == null ? {} : object(obs, `${factor}/${issuer}: malformed observation`), factor, issuer, asOf);
      if (typeof outcome === "string") {
        missing.push([issuer, outcome]);
        continue;
      }
      const [level, root] = outcome;
      observed = observed.plus(weight.times(level));
      covered = covered.plus(weight);
      eligible.add(issuer);
      roots.add(root);
    }
    const hi = observed.plus(new D(1).minus(covered).times(2));
    const factorWeight = coreWeights[factor];
    lower = lower.plus(observed.times(factorWeight));
    upper = upper.plus(hi.times(factorWeight));
    coverage = coverage.plus(covered.times(factorWeight));

    const strataCoverage: [string, string][] = [];
    const coverage70 = covered.gte("0.70");
    let coverageResearch = coverage70;
    if (approved && factor === "R4") {
      for (const [stratum, members, minimum] of strata) {
        const totalWeight = sum(members.map(issuer => weights.get(issuer)!));
        const eligibleWeight = sum(members.filter(issuer => eligible.has(issuer)).map(issuer => weights.get(issuer)!));
        const fraction = eligibleWeight.div(totalWeight);
        strataCoverage.push([stratum, format(fraction.times(100))]);
        coverageResearch = coverageResearch && fraction.gte(minimum);
      }
    }
    results.push([factor, {
      level_bounds: [format(observed), format(hi)],
      coverage_pct: format(covered.times(100)),
      coverage_ok_70pct: coverage70, coverage_ok_for_research: coverageResearch,
      strata_coverage_pct: Object.fromEntries(strataCoverage),
      missing_or_stale: Object.fromEntries(missing),
      exact_level: hi.minus(observed).lte(tiny) ? format(observed) : null,
    }]);
  }

  const weightTotal = Object.values(coreWeights).reduce((a, b) => a + b, 0);
  const coreLo = lower.times(100).div(2 * weightTotal);
  const coreHi = upper.times(100).div(2 * weightTotal);
  const events = eventAdjustments(input.events, asOf, roots);
  const finalLo = clip(coreLo.plus(events.total), 0, 100);
  const finalHi = clip(coreHi.plus(events.total), 0, 100);
  const exact = finalHi.minus(finalLo).abs().lte(tiny);
  return {
    schema,
    as_of: input.as_of,
    cohort_version: input.cohort_version,
    cohort_frozen_at: input.cohort_frozen_at ?? null,
    cohort_proposed_at: replay?.cohort_proposed_at ?? null,
    historically_preregistered: replay === null,
    status: replay ? "POSTHOC_REPLAY_UNVALIDATED" : exact ? "EXACT_RESEARCH_ARITHMETIC"
      : results.every(([, result]) => result.coverage_ok_for_research) ? "BOUNDED_RESEARCH_WITH_UNCERTAINTY" : "LOW_COVERAGE_BOUND_ONLY",
    review_status: replay ? "POSTHOC_REQUIRES_REVIEW" : "REQUIRES_HUMAN_REVIEW",
    calibration: "UNCALIBRATED",
    category: null,
    trading_signal: false,
    core_factors: Object.fromEntries(results),
    core_coverage_pct: format(coverage.times(100).div(weightTotal)),
    core_interval: [format(coreLo), format(coreHi)],
    event_adjustments: events.byFactor,
    event_total_adjustment: format(events.total),
    used_event_ids: events.used,
    excluded_events: events.excluded,
    final_interval: [format(finalLo), format(finalHi)],
    final_exact_score: exact ? format(finalLo) : null,
  };
}
