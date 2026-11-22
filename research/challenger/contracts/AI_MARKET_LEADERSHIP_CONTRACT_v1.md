# AI Market Leadership Contract v1

**Дата:** 25 августа 2026  
**Last status sync:** 2026-09-09  
**Статус:** Phase 1 / Research / Paper-first  
**Contract version:** `leadership-v1`

> 🆕 **CHANGED IN v1** — Формализован отдельный leadership/market-reaction слой: hyperscaler breadth, failed highs, relative strength и реакция цены на сильные/слабые фундаментальные новости.

## 1. Назначение

Этот contract описывает **рыночное лидерство внутри AI / CapEx trade** и не заменяет `TECHNICAL_SIGNAL_CONTRACT_v1.md`.

Цель — ответить на вопрос:

> Слабость остаётся локальной в отдельных компаниях или распространяется от ранних canary-инструментов к главным лидерам AI/CapEx цикла?

Leadership layer используется для:

```text
regime diagnostics
confirmation / contradiction
market-reaction evidence
instrument ranking context
research
```

В `leadership-v1` он **не получает отдельный вес в Combined Score** и не может самостоятельно разрешить сделку.

## 2. Связанные документы

- `AI_CapEx_Reversal_Strategy_v1.3.md` — торговая логика и instrument selection;
- `AI_CapEx_Reversal_Architecture_v1.2.md` — technical/leadership/selection flow;
- `TECHNICAL_SIGNAL_CONTRACT_v1.md` — SMH sector technical regime;
- `FUNDAMENTAL_SNAPSHOT_CONTRACT_v2.md` — фундаментальные evidence;
- `config/watchlist.json` — project instrument universe.

Если leadership contract противоречит Strategy, приоритет имеет Strategy.

## 3. Universe

### 3.1 Hyperscaler / AI buyer leadership basket

```text
MSFT
AMZN
GOOGL
META
ORCL
```

Роли:

```text
MSFT  — AI/cloud leadership / late-cycle confirmation
AMZN  — AWS / CapEx leadership / control variable
GOOGL — Cloud + CapEx decision instrument
META  — CapEx discipline / FCF reaction instrument
ORCL  — AI infrastructure contracts / financing-capex canary
```

### 3.2 Semiconductor leadership overlay

Используется как контекст, но не заменяет semiconductor breadth из `technical-v1`:

```text
NVDA
AMD
AVGO
MU
```

Особенно важны:

```text
NVDA — late leadership confirmation
AVGO — AI networking / custom silicon reaction
MU   — memory/HBM high-beta cycle expression
```

## 4. Canonical timeframe

Phase 1:

```text
1D confirmed US daily bars
```

Для production-valid state используются только закрытые дневные бары.

Intraday движение может использоваться для event context, но не для окончательной daily classification.

## 5. Raw observations per company

Минимально сохранять:

```text
close
MA50
MA200
close_vs_MA50_pct
close_vs_MA200_pct
MA50_slope_20d_pct
MA200_slope_20d_pct
high_252
drawdown_from_high_pct
RS_vs_SPY
RS_MA50
RS_MA50_slope_20d_pct
recent_high_attempt
failed_high_flag
major_event_flag
fundamental_event_direction
price_reaction_direction
market_rejection_flag
```

Никакой скрытой оптимизации thresholds в Phase 1 не допускается.

## 6. Qualitative leadership states

`leadership-v1` намеренно не вводит ещё один оптимизированный numeric score.

Для каждого инструмента допускаются состояния:

```text
LEADER
TRANSITION
WEAK
BROKEN
INVALID
```

### LEADER

Характерные признаки:

```text
price above MA50 and MA200
relative strength vs SPY not deteriorating
no confirmed failed-high sequence
```

### TRANSITION

Характерные признаки:

```text
price between MA50 and MA200
or
price below MA50 but above MA200
or
failed breakout / consolidation after a major high
```

### WEAK

Характерные признаки:

```text
price below MA50
relative strength deteriorating
lower-high / failed-reacceleration evidence
```

### BROKEN

Характерные признаки:

```text
price below MA50 and MA200
+
relative strength materially weak
```

Это qualitative research states, а не автоматические entry rules.

## 7. Failed High / Failed Reacceleration

Ключевой паттерн:

```text
strong prior leader
        ↓
major correction
        ↓
new positive catalyst / strong earnings
        ↓
price cannot retake prior major high
        ↓
lower high / renewed weakness
```

В Phase 1 `failed_high_flag` может быть определён вручную в research snapshot.

Автоматический алгоритм требует отдельной historical validation и не должен быть незаметно добавлен в Pine.

## 8. MARKET_REJECTION

`MARKET_REJECTION` — структурированное наблюдение о том, что цена не подтверждает сильные фундаментальные данные.

Примеры:

```text
strong earnings / guidance
+
stock flat or down

strong AI revenue acceleration
+
failed breakout

CapEx remains very high
+
stock loses leadership
```

Обратный сигнал также важен:

```text
CapEx guidance slows / falls
+
hyperscaler stock rises
```

Такое событие может означать, что рынок начинает вознаграждать capital discipline и хуже капитализировать дальнейший AI CapEx expansion.

### Phase 1 representation

```text
fundamental_event_direction = POSITIVE / NEUTRAL / NEGATIVE
price_reaction_direction    = POSITIVE / NEUTRAL / NEGATIVE
market_rejection_flag       = true / false
```

Exact event-window and reaction thresholds остаются research parameters до исторической проверки.

## 9. Leadership breadth summary

Сохранять counts:

```text
leaders_count
transition_count
weak_count
broken_count
```

И отдельный список:

```text
weak_or_broken_symbols
```

Interpretation:

```text
weakness confined to ORCL/META/AVGO
→ dispersion / warning

GOOGL/AMD/SMH also deteriorate
→ broader transition

MSFT/AMZN lose leadership
→ much stronger regime confirmation

NVDA fails on strong event / loses relative leadership
→ late-cycle confirmation candidate
```

Это interpretation framework, не фиксированный trading threshold.

## 10. Relationship to SMH technical-v1

`SMH technical regime` и `AI market leadership` — разные объекты.

```text
SMH BREAKDOWN
≠
automatic bearish trade in SMH
```

И:

```text
hyperscaler weakness
≠
automatic semiconductor short
```

Decision/Strategy layers должны использовать оба контекста независимо.

## 11. MU / SMH relative-strength diagnostic

Для memory-cycle research отдельно наблюдается:

```text
MU_RS = MU close / SMH close
MU_RS_MA50 = SMA(MU_RS, 50)
MU_RS_MA50_slope_20d_pct
```

Research interpretation:

```text
MU weak, but MU/SMH strong
→ memory-specific short may be premature

MU weak + SMH weak + MU/SMH DOWN
→ memory-specific deterioration is more credible
```

`MU/SMH` **не входит в technical_score v1**.

Он используется Strategy C / instrument ranking как diagnostic confirmation.

## 12. Manual baseline — 25 Aug 2026

Зафиксирован только как research snapshot, не как permanent classification:

```text
already weak / damaged:
ORCL, META, AVGO

transition / decision:
SMH, GOOGL, AMD, MU, NVDA

still holding stronger leadership:
AMZN, MSFT
```

Это состояние должно пересматриваться после новых закрытых дневных баров и крупных earnings events.

## 13. Phase 1 implementation boundary

Разрешено в Phase 1:

```text
manual leadership snapshot
manual MARKET_REJECTION annotation
TradingView visualization
Python normalized leadership snapshot
```

Не требуется для первого end-to-end signal path:

```text
fully automated failed-high classifier
new Combined Score weight
automatic trading from leadership state
```

Strategy D in Strategy v1.3 remains research-only and does not change this leadership contract or create an automatic broad-tech trade.

## 14. Acceptance

Research contract считается подготовленным, когда:

```text
[x] universe defined
[x] raw fields defined
[x] qualitative states defined
[x] MARKET_REJECTION defined
[x] MU/SMH diagnostic defined
[x] manual 25-Aug baseline documented
[ ] normalized leadership snapshot schema implemented in code
[ ] latest leadership snapshot persisted
[ ] historical validation documented
[ ] automated failed-high logic, if proposed, separately versioned
```

## 15. Hard Rules

```text
1. Leadership layer confirms or contradicts; it does not independently trade.
2. Do not add a new Combined Score weight without versioned validation.
3. Do not equate one weak stock with market-wide reversal.
4. Strong fundamentals + weak price reaction is evidence, not automatic entry.
5. SMH remains the canonical semiconductor technical anchor in technical-v1.
6. Execution instrument is selected later by Strategy / Instrument Ranker.
7. MU/SMH is diagnostic-only in v1.
8. All production-valid states use confirmed daily bars.
```
