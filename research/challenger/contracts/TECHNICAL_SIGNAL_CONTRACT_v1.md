# Technical Signal Contract v1

**Дата:** 25 августа 2026  
**Последнее уточнение:** 8 сентября 2026 — production tickerid correction (`NASDAQ:SMH`)  
**Last status sync:** 2026-09-23  
**Статус:** Phase 1 / Paper-first  
**Technical version:** `technical-v1`  
**Primary chart:** `SMH`, `1D`  
**Production tickerid:** `NASDAQ:SMH`

> 🆕 **CHANGED IN v1** — Зафиксирована deterministic technical scoring model до исторической оптимизации: признаки, веса, thresholds, confirmation timing, alert contract и anti-overfitting rules.

> 🆕 **CHANGED 25 AUG 2026** — Уточнена граница ответственности: SMH является canonical sector technical anchor, но technical layer не выбирает execution underlying. `MU/SMH` и AI leadership вынесены в diagnostic/leadership context и не меняют `technical_score v1`.

> 🆕 **CLARIFIED 28 AUG 2026 / ISSUE #6** — Production confirmation для canonical `SMH 1D` привязана к окончанию **regular US session**, а не к запаздывающему native `barstate.isconfirmed`. Score, regime thresholds и historical model semantics не менялись.

> 🆕 **FROZEN 05 SEP 2026** — Production alert contract: exact `event_id` formula, explicit `technical_version`, RFC3339 `time_close` timestamp, explicit `America/New_York` `bar_date`, production tickerid gate, `confirmation_source`, `alert.freq_once_per_bar`, overlay-only emit, master switch default OFF. Score/regime/RTH formula unchanged. FastAPI webhook and live TV enable remain out of this freeze.

> 🆕 **CORRECTED 08 SEP 2026 / ISSUE #6** — Exact TradingView listing identity is `NASDAQ:SMH`. The previous `BATS:SMH` production gate was stale identity metadata and is replaced without changing technical-v1 score, regime, breadth, drawdown, or RTH-confirmation semantics.

> **23-Sep reference alignment:** current trading source of truth is Strategy v1.3. Strategy D is research-only and does not change `technical-v1` semantics, thresholds or output.

## 1. Назначение

Этот документ является source of truth для technical layer Phase 1.

Он определяет:

```text
raw technical observations
        ↓
technical_score 0..100
        ↓
technical_regime
        ↓
TradingView visualization / alert
        ↓
Decision Engine input
```

Technical layer **не принимает торговое решение и не выбирает execution instrument**.

Даже `BREAKDOWN` означает только technical confirmation. Trade proposal требует Strategy gates, fundamental evidence, Combined Score, instrument selection, option liquidity, known max loss и Risk Engine approval.

Связанные документы:

- `AI_CapEx_Reversal_Strategy_v1.3.md` — trading rules, instrument selection and technical-confirmation role;
- `AI_CapEx_Reversal_Architecture_v1.2.md` — TradingView/webhook/Decision/Ranker architecture;
- `AI_CapEx_Reversal_Phase1_5_Plan_v2.6.md` — implementation roadmap;
- `AI_MARKET_LEADERSHIP_CONTRACT_v1.md` — leadership/market-reaction and `MU/SMH` diagnostic context;
- `FUNDAMENTAL_SNAPSHOT_CONTRACT_v2.md` — independent fundamental input contract;
- `config/strategy.json` — Combined Score weights and current execution strategy gates;
- `config/watchlist.json` — project instrument universe.

Если contract противоречит Strategy, приоритет имеет Strategy.

## 2. Phase 1 scope

`technical-v1` использует только US technical confirmation.

Canonical sector technical anchor:

```text
SMH
```

Benchmark:

```text
SPY
```

Breadth basket:

```text
NVDA
AMD
AVGO
MU
```

В `technical-v1` намеренно НЕ входят в score:

```text
QQQ
SOXX
VIX
CRWV
hyperscaler stocks
Asia symbols
option-chain data
fundamental data
news / sentiment
MU/SMH diagnostic ratio
AI leadership / MARKET_REJECTION state
Strategy D inverse-ETF product mechanics
```

Эти данные могут использоваться другими слоями системы, но не должны незаметно менять `technical-v1`.

Asia confirmation остаётся отдельным компонентом Combined Score. Leadership state остаётся отдельным confirmation/context layer без нового hidden weight.

## 3. Timeframe and data policy

Phase 1 canonical context:

```text
chart symbol     = US-listed SMH
chart timeframe  = 1D
session           = regular US daily session
```

Правила:

1. SMH OHLC берётся из native chart series.
2. SPY/NVDA/AMD/AVGO/MU запрашиваются как отдельные daily series.
3. Все сравниваемые series используют совместимую daily confirmation timing.
4. State transition и alert разрешены только на `production_bar_confirmed`.
5. Intrabar/realtime flicker до regular-session close не является production signal.
6. Phase 1 не обязан поддерживать 1H/4H/15m charts.
7. Unsupported timeframe должен явно помечаться и не выдавать production-valid alert.

### 3.1 Regular-session production confirmation

NVIDIA Event Drill выявил, что на canonical `SMH 1D` native TradingView `barstate.isconfirmed` может оставаться `false` несколько часов **после** regular close, хотя `time_close` уже равен 16:00 ET и RTH OHLC не меняется.

Поэтому implementation использует следующий bridge:

```text
rth_close_elapsed =
    canonical_context
    AND barstate.islast
    AND time_close is available
    AND timenow >= time_close

production_bar_confirmed =
    barstate.isconfirmed
    OR rth_close_elapsed
```

Pine equivalent:

```pine
bool rthCloseElapsed = canonicalContext and barstate.islast and not na(time_close) and timenow >= time_close
bool productionBarConfirmed = barstate.isconfirmed or rthCloseElapsed
```

Смысл:

- historical/native-confirmed bars продолжают использовать стандартный `barstate.isconfirmed`;
- только текущий **последний** canonical daily bar получает RTH confirmation после собственного `time_close`;
- `timenow` не используется для выбора цены, timestamp события или изменения старых historical bars;
- epoch-millisecond comparison `timenow >= time_close` не зависит от timezone display;
- native `barstate.isconfirmed` сохраняется в diagnostics, но больше не является единственным production gate.

Observed canonical behavior on 2026-08-27:

```text
SMH 1D time_close       = 16:00 ET
~19:15 ET native        isconfirmed = false
~21:20 ET native        isconfirmed = true
```

Production semantics должны соответствовать **16:00 ET regular close**, а не более поздней lifecycle boundary TradingView.

Implementation использует однозначные TradingView symbol identifiers либо проверенные `input.symbol` defaults.

## 4. Data validity and fail-closed behavior

Technical score valid только если доступны:

```text
SMH daily history
SPY daily history
NVDA daily history
AMD daily history
AVGO daily history
MU daily history
```

Minimum warmup:

```text
252 completed daily bars
```

Если обязательный input `na`, history недостаточна или symbol invalid:

```text
technical_valid = false
technical_regime = INVALID
NO production alert
```

Silent substitution запрещён.

## 5. Feature definitions

Все расчёты выполняются по daily closing data.

### 5.1 SMH moving averages

```text
MA50  = SMA(SMH close, 50)
MA200 = SMA(SMH close, 200)
```

Binary observations:

```text
smh_below_ma50
smh_below_ma200
```

Классический `MA50 crosses below MA200` не является обязательным entry condition и не получает отдельные points в v1: такой crossover может существенно запаздывать.

### 5.2 Moving-average slopes

```text
ma50_slope_20d_pct  = (MA50 / MA50[20] - 1) * 100
ma200_slope_20d_pct = (MA200 / MA200[20] - 1) * 100
```

Bearish:

```text
ma50_slope_negative  = ma50_slope_20d_pct < 0
ma200_slope_negative = ma200_slope_20d_pct < 0
```

Нулевая граница фиксируется заранее, без optimized slope threshold.

### 5.3 Drawdown from high

```text
high_252 = highest(SMH high, 252)
drawdown_pct = (SMH close / high_252 - 1) * 100
```

Score tiers:

```text
< 10%       → 0 points
10%–<15%    → 5 points
15%–<20%    → 10 points
>= 20%      → 15 points
```

Drawdown также может использоваться Strategy/Instrument Ranker как input для `already_priced_drawdown`, но это отдельное решение и не меняет technical scoring formula.

### 5.4 SMH/SPY relative strength

```text
RS = SMH close / SPY close
RS_MA50 = SMA(RS, 50)
RS_MA50_slope_20d_pct = (RS_MA50 / RS_MA50[20] - 1) * 100
```

Bearish observations:

```text
rs_below_ma50     = RS < RS_MA50
rs_slope_negative = RS_MA50_slope_20d_pct < 0
```

States:

```text
UP / NEUTRAL → neither bearish observation
WEAK         → exactly one
DOWN         → both
```

Strategy gate `SMH/SPY relative strength = DOWN` maps exactly to `DOWN`.

### 5.5 Semiconductor breadth

Basket:

```text
NVDA
AMD
AVGO
MU
```

Per symbol:

```text
weak = daily close < SMA(daily close, 50)
```

`breadth_weak_count = 0/4 .. 4/4`.

Changing constituents requires a new technical version.

### 5.6 Diagnostic-only MU/SMH relative strength

`MU/SMH` may be calculated or visualized for Memory Strategy research:

```text
MU_RS = MU close / SMH close
MU_RS_MA50 = SMA(MU_RS, 50)
MU_RS_MA50_slope_20d_pct
```

Interpretation is owned by `AI_MARKET_LEADERSHIP_CONTRACT_v1.md` / Strategy C.

Hard boundary:

```text
MU/SMH DOES NOT ADD POINTS TO technical_score v1
MU/SMH DOES NOT CHANGE technical_regime v1
```

## 6. Technical score v1

| Component | Rule | Points |
| --- | --- | ---: |
| SMH vs MA50 | `close < MA50` | 10 |
| SMH vs MA200 | `close < MA200` | 15 |
| MA50 slope | `< 0` | 10 |
| MA200 slope | `< 0` | 10 |
| Drawdown | per §5.3 | 0 / 5 / 10 / 15 |
| SMH/SPY RS | UP/NEUTRAL→0; WEAK→10; DOWN→20 | 0 / 10 / 20 |
| Breadth | 0/4→0, 1/4→5, 2/4→10, 3/4→15, 4/4→20 | 0..20 |
| **Total** | | **0..100** |

```text
technical_score =
    trend_ma50_points
  + trend_ma200_points
  + ma50_slope_points
  + ma200_slope_points
  + drawdown_points
  + relative_strength_points
  + breadth_points
```

No hidden multiplier or leadership/option component is allowed.

## 7. Technical regime

Raw bands:

```text
0–34    NORMAL
35–64   WEAKENING
65–100  BREAKDOWN_CANDIDATE
```

Production regime:

```text
NORMAL:
technical_score < 35

WEAKENING:
technical_score >= 35
AND production BREAKDOWN condition is not met

BREAKDOWN:
technical_score >= 65
AND SMH close < MA50
```

Additional price gate prevents a high cross-sectional score from labeling the **canonical sector technical anchor** as broken while SMH still closes above its medium-term trend.

No hysteresis in v1; any later hysteresis is a versioned contract change.

## 8. Strategy-facing outputs

Required:

```text
technical_valid
technical_score
technical_regime
smh_below_ma50
smh_below_ma200
ma50_slope_20d_pct
ma200_slope_20d_pct
drawdown_pct
relative_strength_state
breadth_weak_count
```

Strategy mapping:

```text
SMH technical regime = BREAKDOWN
→ technical_regime == BREAKDOWN

SMH/SPY relative strength = DOWN
→ relative_strength_state == DOWN
```

Decision Engine may normalize `technical_score` as `technical_us` and apply configured Combined Score weight 10. Pine must not apply the overall weight.

### 8.1 Signal/Execution separation

> 🆕 **CHANGED 25 AUG 2026**

```text
technical_regime == BREAKDOWN
≠
trade SMH automatically
```

Technical layer has no authority to choose among SMH/SOXX/MU/CRWV or any other execution candidate. That is Strategy/Instrument Ranker responsibility after active reversal driver classification.

The same separation applies to Strategy D research candidates: a BREAKDOWN does not authorize PSQ/SH.

## 9. Visualization requirements

Required:

```text
SMH MA50
SMH MA200
current technical_score
current technical_regime
breadth_weak_count / 4
relative_strength_state
drawdown_pct
production confirmation status
```

Recommended:

```text
background/marker for regime
BREAKDOWN entry marker
compact component table
```

Optional diagnostic panels may show `MU/SMH` and native Pine barstate/session fields, but must be visually labelled as diagnostic and must not alter scoring.

## 10. Alert contract

Production source is **only** `pine/ai_semiconductor_regime_v1.pine`. Score-history, the Issue #3 backtest and the price-context diagnostic must not call `alert()`.

`DAILY_TECHNICAL_STATE` is **not** a v1 production event.

### 10.1 Emission gate

A production alert may fire only when all of the following are true:

```text
Enable production alerts input == true          (default false)
AND technical_valid == true
AND production_bar_confirmed == true
AND syminfo.tickerid == "NASDAQ:SMH"
AND an ENTRY or EXIT edge on this bar
```

HUD / score / regime continue to compute on any `SMH` 1D chart. A non-`NASDAQ:SMH` prefix must not emit a production alert.

For canonical `SMH 1D`:

```text
production_bar_confirmed =
    barstate.isconfirmed
    OR (
        barstate.islast
        AND timenow >= time_close
    )
```

The second branch is the Issue #6 RTH bridge and is valid only in canonical context. It must not silently make unsupported symbols/timeframes production-valid.

ENTRY / EXIT edges (same as overlay markers / score-history):

```text
breakdownNow   = technical_valid AND technical_regime == BREAKDOWN
ENTRY          = production_bar_confirmed AND breakdownNow AND NOT breakdownNow[1]
EXIT           = production_bar_confirmed AND NOT breakdownNow AND breakdownNow[1]
```

Required events:

```text
REGIME_BREAKDOWN
REGIME_BREAKDOWN_EXIT
```

### 10.2 TradingView emit rules

```text
function:     alert(message, alert.freq_once_per_bar)
NOT:          alert.freq_once_per_bar_close
NOT:          alertcondition() with {{ticker}} placeholders
TV setup:     one alert — "Any alert() function call"
master switch default: OFF
```

`once_per_bar_close` waits for native `barstate.isconfirmed` and reintroduces Issue #6. `alert()` fires only on the latest realtime bar; historical BREAKDOWN episodes do not webhook-spam.

Issue #6 compile/live/reload/replay acceptance is complete. Keep the production alert master switch OFF until real alert delivery and production HTTPS ingress/origin verification are separately accepted.

### 10.3 event_id

Exact formula (colon-separated, no spaces):

```text
<technical_version>:<symbol>:<timeframe>:<signal>:<bar_date>
```

```text
technical-v1:SMH:1D:REGIME_BREAKDOWN:2026-08-24
technical-v1:SMH:1D:REGIME_BREAKDOWN_EXIT:2026-08-20
```

`bar_date` is the chart bar calendar date in `America/New_York`: `str.format_time(time, "yyyy-MM-dd", "America/New_York")`. It is not wall-clock `timenow`.

The Architecture v1.1 example `SMH-1D-2026-08-26-close` is rejected: it omits version and event type.

Identical delivery of the same bar+signal therefore produces the same `event_id`. Reload after RTH close must not mint a new `event_id` for the same `bar_date`+signal.

### 10.4 timestamp

`timestamp` is RFC3339 of `time_close` in `America/New_York`:

```text
2026-08-24T16:00:00-04:00
```

Not a unix epoch. `timenow` must not be used as the event timestamp.

### 10.5 Payload

Required fields:

```json
{
  "schema": "ai-capex.signal.v1",
  "source": "tradingview",
  "event_id": "technical-v1:SMH:1D:REGIME_BREAKDOWN:2026-08-24",
  "technical_version": "technical-v1",
  "symbol": "SMH",
  "tickerid": "NASDAQ:SMH",
  "timeframe": "1D",
  "bar_date": "2026-08-24",
  "signal": "REGIME_BREAKDOWN",
  "technical_score": 65,
  "technical_regime": "BREAKDOWN",
  "relative_strength_state": "DOWN",
  "breadth_weak_count": 3,
  "drawdown_pct": -18.6104,
  "confirmation_source": "rth_bridge",
  "timestamp": "2026-08-24T16:00:00-04:00"
}
```

`technical_version` is the version of the technical signal model. It is deliberately **not** named `strategy_version`; the project strategy version (for example Strategy v1.3) is a separate concept owned by the decision/proposal layer.

`confirmation_source` is `native` when `barstate.isconfirmed` is true, otherwise `rth_bridge`.

Fixtures: `data/signals/examples/regime_breakdown_2026-08-24.json` and `regime_breakdown_exit_2026-08-20.json`.

Forbidden in the payload:

```text
broker credentials / account IDs / API secrets
component point breakdown
option / DTE / strike fields
execution / order fields
```

FastAPI ingestion, `UNIQUE(event_id)` and webhook secrets are a later Phase 1 slice. This contract only freezes the Pine emit.

## 11. Repainting and look-ahead rules

Implementation complies with repository Cursor Pine rules and official Pine v6 docs.

Hard rules:

```text
NO future data leakage
NO lookahead_on without required historical offset for HTF requests
NO mid-RTH-bar production signal
NO future confirmed values on historical bars
NO silent historical/realtime semantic mismatch
```

Canonical chart is 1D. Same-timeframe external US daily series use consistent confirmed-bar semantics.

`barstate.isconfirmed` remains the standard native historical/final-bar signal, but it is **not** treated as synonymous with `regular-session close elapsed` on the current SMH 1D bar. Issue #6 diagnostic fields remain available to verify this distinction.

The RTH bridge:

```text
timenow >= time_close
```

is evaluated only on `barstate.islast` in canonical context. `timenow` must not be used to rewrite historical timestamps or select future data.

If later requesting HTF, use documented non-repainting pattern. `barstate.isconfirmed` confirms current chart bar, not arbitrary requested context.

## 12. Versioning and anti-overfitting

Values are research/engineering defaults fixed before historical optimization.

Changes requiring new technical version:

```text
component weights
MA lengths
slope lookback
RS definition
breadth constituents
drawdown thresholds
regime thresholds
BREAKDOWN price gate
confirmation timing semantics
```

Issue #6 is treated as a **corrective implementation fix**, not a model retune, because the contract already declared `session = regular US daily session`; the bug was that native TradingView confirmation occurred later than that declared economic boundary. The fix therefore preserves `technical-v1` score/regime semantics while making implementation timing conform to the original regular-session intent.

Any future intentional shift away from RTH close semantics requires a new technical version.

Any proposed tuning records old/new value, reason, observation period, out-of-sample plan and false-positive/negative impact.

Do not optimize technical-v1 directly for option-spread P/L. Instrument/DTE/strike selection is a separate layer.

## 13. Historical validation policy

Inspect at minimum:

```text
2018 semiconductor correction
2020 COVID crash/recovery
2022 semiconductor/growth bear market
2023–2026 AI infrastructure expansion
```

Questions:

```text
Was BREAKDOWN based only on available information?
How many false BREAKDOWN events?
How persistent?
Did RS separate sector from broad-market weakness?
Did breadth confirm?
How late relative to initial decline?
Did replay/refresh change transitions?
Did the technical anchor remain useful even when another execution candidate would have been better?
```

Strategy D has its own broader 2000–2002 / 2007–2009 / 2018 / 2022 research requirement in Strategy v1.3; that does not retroactively extend the `technical-v1` dataset.

## 14. Phase 1 implementation acceptance

```text
[x] Pine v6 script compiles in TradingView
[x] canonical chart is SMH 1D
[x] MA50 / MA200 are visible in the project script
[x] technical_score matches this contract
[x] score is bounded 0..100
[x] regime mapping matches this contract
[x] SPY relative-strength state is visible
[x] NVDA/AMD/AVGO/MU breadth is visible
[x] insufficient/missing data fails closed
[x] production confirmation occurs at/after regular-session time_close
[x] native post-RTH isconfirmed lag does not delay RTH production status
[x] REGIME_BREAKDOWN event_id formula frozen
[x] REGIME_BREAKDOWN_EXIT event_id formula frozen
[x] duplicate alert produces identical event_id
[x] alert payload technical_version is technical-v1
[x] production tickerid gate is NASDAQ:SMH
[x] alert() uses freq_once_per_bar, not once_per_bar_close
[x] production alert master switch defaults OFF
[x] historical sanity review documented (Issue #3)
[x] no repaint/look-ahead issue found in replay/refresh review
[x] reload after RTH close does not mint a new event_id for the same bar_date+signal
[x] Issue #6 live/replay acceptance completed
[ ] TV alert created and delivery verified (including UI closed)
```

Manual TradingView watchlist/MA research or placeholder Pine code does **not** satisfy runtime acceptance.

Broker access/options permissions are not acceptance dependencies for this contract.

## 15. Implementation target

```text
pine/ai_semiconductor_regime_v1.pine
pine/ai_semiconductor_strategy_test_v1.pine
```

Strategy test harness must reproduce the same technical calculations/state transitions; no different thresholds solely to improve Strategy Tester results.

Future Python implementation must produce equivalent results for equivalent confirmed daily inputs.