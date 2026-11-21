# AI CapEx Daily Close — 2026-10-20 (America/New_York)

**Статус:** `PARTIAL / RESEARCH ONLY / PERSISTENCE_FAILED / NO_TRADE`  
**Период:** вторник 20 октября 2026, торговый день US equity; регулярная сессия 09:30–16:00 EDT.  
**Отсечка:** примерно 16:31 EDT = 23:31 IDT (Asia/Jerusalem), 20 октября 2026.  
**Правила:** `Docs/research/AI_CAPEX_EVENT_WATCH_PLAN_2026-10-17.md`, открытый PR #79, issue #78.  
**Оценка:** 3 события HIGH/CRITICAL по фактической публикации/торгам 20 октября; 1 важный контекст, опубликованный **19 октября**, без повторного подсчёта.

## Executive summary

День показал **расхождение между фундаментальной монетизацией AI-инфраструктуры и финансовым доверием инвесторов**. В Корее AI-cloud IPO Elice провалилось на ~32%, KOSPI упал на ~3.73%; это подтверждает риск доступа к equity financing, но не физическое сокращение заказов на GPU. Утренний отчёт 3M подтвердил сильные результаты поставщика и повторил уже раскрытый 19 октября контракт с Amazon. В 16:00 EDT SpaceX опубликовала крупный первичный отчёт: SI/AI выручка $7.560 млрд, SI операционная прибыль $431 млн, но SI CapEx $16.444 млрд за квартал и $39.995 млрд за девять месяцев. Таким образом, подтверждён рост коммерческой монетизации и одновременно очень большой разрыв между CapEx и текущим денежным потоком. Данные не доказывают общесистемный AI CapEx reversal. **NO_TRADE**, каноническая модель Champion неполна.

## 1. Manifest событий и временная атрибуция

| ID / дедуп-ключ | Приоритет | Первое подтверждённое время (EDT) | Статус | Кратко |
|---|---|---|---|---|
| `3M/2026-10-20/Q3-earnings` | HIGH (supplier/capacity) | **06:30**, PRNewswire | PRIMARY | Adjusted EPS $2.50; guidance $9.10–9.15; data-center optics как драйвер |
| `Elice/2026-10-20/KOSDAQ-IPO-debut` | HIGH (neocloud/equity access) | Корейская торговая сессия 20-Oct; закрытие 15:30 KST = **02:30 EDT**; точный timestamp первого опубликованного ценового сообщения **UNKNOWN** | PRIMARY issue price + SECONDARY close | IPO ₩90,500 → ~₩61,500 (−32.0%), KOSPI −3.73% |
| `SpaceX/SEC-000162828026066482/2026-10-20/Q3` | **CRITICAL** (AI monetization/CapEx) | **16:00 EDT**, SEC EDGAR acceptance (вторичный индексинг времени; оригинал SEC EX-99.1 подтверждён) | PRIMARY | Revenue $14.575B, SI $7.560B, SI CapEx $16.444B, SI operating income $431M |
| `3M/SEC-000006674026000303/2026-10-19/Amazon-warrant` | HIGH **carry-forward**, не новое 20-Oct событие | **19-Oct, ~16:55 EDT** (после закрытия; вторичная отметка фида) | PRIMARY contract, timing secondary | 3.162M warrants @ $164.89; 85% vesting при накопленных платежах Amazon $6B; это **условие**, а не гарантированный уже полученный заказ/выручка |

**Отдельно:** BLS выпустило State Employment and Unemployment в 10:00 EDT 20-Oct, но это не CPI/NFP/PPI и без подтверждённого существенного AI/финансового сюрприза не классифицировано HIGH. Уведомление DHS о DeepSeek опубликовано в Federal Register 20-Oct, но filed 19-Oct 08:45; влияние на текущие AI CapEx/мощности не подтверждено, поэтому не отдельное HIGH. FOMC и CPI/NFP/PPI в этот день не проводились. Meta и Tesla earnings ожидаются 21-Oct, а не 20-Oct.

## 2. HIGH — Elice IPO и Asia semiconductor

**Первичные документы:** Elice IR 06-Oct подтверждает IPO price **₩90,500**, oversubscription **388.8x**, ожидаемое привлечение **₩201.1 млрд**. **Независимые наблюдения за 20-Oct:** Reuters сообщает о падении Elice на 32% в первый торговый день до примерно **₩61,500**, KOSPI −3.73%. WSJ сообщает SK hynix −5.3%, Samsung −3.8%, Nikkei −1.4%, Taiex −1.1%. В разных вторичных сообщениях есть расхождения по точной цене закрытия и проценту KOSPI; используем согласованное ядро, **не** принимаем непроверенные котировки за официальный KRX close.

**Интерпретация:** падение IPO цены при сильной первичной подписке — ухудшение *market clearing* для новых AI инфраструктурных equity-историй. Это поддерживает R4 (доступ к финансированию), R7 (риск отложенных проектов) и P4 (рыночное подтверждение стресса), но не доказывает отказ заказчиков от GPU, снижение utilization или физическое перепроизводство. Нельзя выводить, что Elice единолично вызвала падение всего корейского рынка: совпадение и рыночный контекст ≠ установленная причинность.

**Сюрприз:** −32.0% к IPO price, **не** «сюрприз к аналитическому EPS консенсусу»; консенсус отсутствует. **Первичная биржевая запись KRX с timestamp пока не получена.**

## 3. HIGH — 3M Q3 earnings, Amazon optics

**06:30 EDT 20-Oct:** 3M: GAAP revenue $6.6B; adjusted revenue $6.6B (+4.2% YoY); adjusted EPS **$2.50**; 2026 adjusted EPS guidance **$9.10–$9.15**; adjusted FCF Q3 **$1.2B**. В независимом консенсусе EPS $2.38, beat **+$0.12 / +5.0%**. Выручка ~$6.58B слегка ниже ориентировочного консенсуса $6.61B, то есть **около −$0.03B**; не смешивать GAAP/adjusted revenue и разные поставщики консенсуса. 3M отмечает инвестиции в оптические компоненты и сотрудничество с GSEO.

**Дедуп:** расширение отношений с Amazon и warrant было раскрыто **19-Oct после закрытия**, а не впервые 20-Oct. 3M повторила его в отчёте 20-Oct. Формула **$6B — условие полного vesting 85% warrants**, не доказанная безотзывная сумма закупок, не CapEx самого Amazon и не выручка 3M текущего квартала. Дополнительно 15% акций — event-based milestones. Не интерпретировать equity warrant как подтверждённый гарантированный backlog.

**Контраргумент reversal:** поставщик демонстрирует рост/инвестиции в оптические технологии; но спрос на EBO и маркетинговые планы не дают прямых данных по energization, utilization и project IRR.

## 4. CRITICAL — SpaceX Q3: монетизация против CapEx

**Публикация:** SEC EX-99.1, EDGAR 20-Oct **16:00 EDT**; конференц-звонок запланирован **16:30 EDT**, поэтому его комментарии, новые guidance и after-hours реакция к отсечке **PENDING**. Цифры ниже из первичного документа, не из предварительных журналистских пересказов.

| Метрика | Q3 2026 | Q2 2026 | Примечание |
|---|---:|---:|---|
| Консолидированная выручка | **$14.575B** | $7.814B | +161% YoY к Q3 2025 |
| SI (AI) revenue | **$7.560B** | $2.561B | включает $608M выручки Cursor после сделки 14-Aug; рост не полностью органический |
| SI operating income | **+$0.431B** | −$1.257B | позитивный GAAP операционный разворот за квартал |
| SI adjusted EBITDA | **$4.953B** | $1.146B | не равно FCF |
| SI CapEx | **$16.444B** | $15.828B | $39.995B за 9M 2026 |
| Общий CapEx | **$19.593B** | $18.369B | $48.069B за 9M 2026 |
| Консолидированная net income | **$4.4B** | −$0.541B | quarterly profit ≠ cash conversion |
| Nameplate compute | **1.7 GW** на 30-Sep | 1.4 GW на 30-Jun | installed/nameplate ≠ economically profitable utilized MW |

**Денежная проверка (сопоставимый 9M период, не Q3):** operating cash flow **$13.097B**, purchases of PP&E **$48.069B**, иллюстративный **OCF−PP&E = −$34.972B**. Это простой cash CapEx proxy, не полный GAAP FCF/FCFE и не показатель Q3. IPO net proceeds **$85.675B** за 9M и debt/other financing gross proceeds **$51.834B** — нельзя приравнивать к устойчивой операционной монетизации; долгосрочный debt + finance leases **$36.146B**, текущий **$2.698B** на 30-Sep. Cash и restricted cash на 30-Sep **$53.386B**, не смешивать с marketable securities без сверки баланса.

**Консенсус:** $14.575B против Reuters/LSEG ~$12.72B = **+$1.855B (+14.6%)**; другой FactSet ~$12.9B → +$1.675B (+13.0%). Источники консенсуса различаются; не выдавать их за одну и ту же базу. Данные о EPS по FactSet 0.13 vs 0.37 — вторичные, требуют сверки GAAP/non-GAAP и diluted share count, не используем для модельного сигнала.

**Вывод:** реальная AI выручка и переход SI в положительный операционный результат — сильный контраргумент тезису «AI не монетизируется». Одновременно размер CapEx относительно cash conversion сохраняет фундаментальную уязвимость и вопрос marginal payback. Не выводить срок окупаемости из простого отношения квартального CapEx к квартальной выручке. Установленная revenue не доказывает независимость от кредитных соглашений, customer guarantees или устойчивость pricing.

## 5. Рыночная реакция и data quality

**US регулярное закрытие 16:00 EDT:** AP: S&P 500 **7,712.57 (+0.3%)**, Nasdaq Composite **26,424.82 (менее −0.1%)**, Dow **52,495.88 (+1%)**. Движение неоднородно, не демонстрирует единой AI-распродажи. Отчёт SpaceX вышел **после завершения regular session**, поэтому сегодняшнее закрытие не может быть реакцией на его новые цифры.

**Massive:** API `GET /v2/aggs/ticker/{ticker}/range/1/day/2026-10-19/2026-10-20` для SMH/QQQ/SOXX/SPY/MMM вернул только 19-Oct daily bar, **не 20-Oct**; последующие запросы для CRWV/NVDA/TSM — `RATE_LIMIT`. Поле `t=1792382400000` соответствует **2026-10-19 00:00 EDT**, метке бара, не времени запроса и не 20-Oct close. Время выполнения запросов около отсечки 16:31 EDT. Подтверждённые Massive 19-Oct closes: **SMH 548.46; QQQ 718.36; SOXX 501.93; SPY 766.48; MMM 162.01**.

**20-Oct только вторичные intraday snapshots, НЕ закрытие:**

| ETF | Вторичный intraday price | vs Massive close 19-Oct | Timestamp источника (EDT) | Статус |
|---|---:|---:|---|---|
| SMH | $548.30 | −0.03% | Yahoo 14:54:23 | provisional |
| QQQ | $719.07 | +0.10% | Yahoo 12:15:16 (страница показывает также $719.13 quote) | provisional / snapshot mismatch |
| SOXX | $502.68 | +0.15% | Yahoo 14:53:44 | provisional |
| SPY | $769.63 | +0.41% | Yahoo 13:59:35 | provisional |

Yahoo history может показывать динамически обновляемую колонку «Close» для текущего дня, **не окончательную 16:00 close**. Не использовать для технического daily confirmation. Полный набор закрытий, SPX earnings after-hours реакция, CRWV/NVDA/MU/TSM и Азия с первичными биржевыми ценами — **PENDING**. Источники не подтверждают причинную связь конкретной новости и движения ETF.

## 6. Champion / Challenger / physical / institutional

### Champion F1–F5 (качественные evidence deltas, **НЕ новые баллы**)

| Фактор | Изменение evidence 20-Oct | Канонический статус |
|---|---|---|
| **F1 Hyperscaler CapEx Discipline** | 3M/Amazon показывает продолжение цепочки поставок; **не** доказано сокращение CapEx. SpaceX — крупный AI buyer, но не эквивалент всего hyperscaler basket. | UNKNOWN, no rescore |
| **F2 GPU Compute Oversupply** | Нет проверенных новых цен GPU/занятости/renewal rates; nameplate 1.7GW не utilization. | UNKNOWN |
| **F3 Neocloud / Credit Stress** | Elice IPO падение указывает на equity funding selectivity; нет новых верифицированных кредитных спредов/ковенант. | WATCH qualitative, no rescore |
| **F4 Semiconductor Guidance Deterioration** | 3M supplier demand положительный; нет нового отрицательного руководства NVDA/TSMC/MU. | not confirmed |
| **F5 RPO / Backlog Quality** | 3M $6B — условие warrant vesting, а не гарантированный backlog; SpaceX cloud agreements без полного waterfall. | UNKNOWN |

### Challenger R1–R7 (shadow, **score не пересчитан**)

- **R1 Monetization vs CapEx:** двусторонний сигнал: SI revenue $7.56B и +$431M op income против $16.444B квартального SI CapEx.
- **R2 Cash Conversion / FCF:** 9M OCF−PP&E ~−$34.972B у SpaceX, с оговоркой об IPO и несопоставимости с кварталом; усиливает исследовательское внимание.
- **R3 Payback Duration:** project IRR, payback по когортам, полезная загрузка GW **UNKNOWN**.
- **R4 Financing/Refinancing:** Elice IPO и долг SpaceX указывают на важность funding, но не доказывают ухудшение кредитных условий у всех эмитентов.
- **R5 Backlog/Contract Quality:** условный warrant Amazon и cloud agreements SpaceX требуют подтверждения take-or-pay, отменяемости и контрагентов.
- **R6 Capacity Funnel:** 1.7 GW nameplate, без цепочки energized→utilized→monetized по площадкам; нельзя автоматически переводить в последнюю стадию.
- **R7 Project Attrition:** в 20-Oct новых подтверждённых отмен конкретных площадок нет; carry-forward Nscale от 19-Oct не повторять как новый факт.

**Inherited baseline, НЕ сегодняшний пересчёт:** Challenger **60 / ALERT / Stage 5**; R1..R7 **1/1/1/2/1/1/1**. Champion Combined Score **null / UNKNOWN**, trade state **NO_TRADE**.

### P1–P4 / leadership / institutional

- **P1 GPU compute:** `WATCH` inherited; фактические новые realized GPU rental prices/utilization UNKNOWN.
- **P2 memory:** `ANTI_REVERSAL` inherited (сильные поставки/цены ранее); корейские цены акций сегодня **не равны** физической слабости HBM/DRAM.
- **P3 semiconductors/networking:** `ANTI_REVERSAL` inherited; 3M optics supply positive, новых issuer order cancellations не подтверждено.
- **P4 market/technical:** `WATCH` inherited; KOSPI/Elice стресс и US Nasdaq dispersion поддерживают наблюдение, но canonical RTH SMH/MA/RS/Asia close not computed.
- **Institutional:** прямые потоки, short interest, prime broker leverage, credit spreads, put/call/SKEW, CFTC и options dealer positioning **не обновлены**. H1_QUIET_HEDGING/MEDIUM — лишь inherited 14-Oct, не подтверждение за 20-Oct.
- **Macro:** нефть и ставки остаются альтернативным объяснением переоценки акций; подтверждённой Fed/CPI/NFP/PPI новости 20-Oct нет. Изменения macro pain не вычислялись.

## 7. Контраргументы и незакрытые вопросы

1. У SpaceX SI впервые положительная операционная прибыль, высокая выручка и nameplate growth; у 3M supplier earnings лучше ожиданий. Это **против** широкого тезиса о немедленном исчезновении AI demand.
2. Отрицательный 9M cash proxy и слабость AI IPO — **за** финансовую уязвимость marginal projects, но не за автоматический переход Stage 6/7.
3. Различать AI business operating profit, EBITDA, GAAP net income, OCF и free cash flow; сравнивать одинаковые периоды.
4. Elice закрытие/KRX official data и точное время первого опубликованного сообщения — UNKNOWN. Падение IPO не является evidence проектной отмены.
5. SpaceX conference call, guidance, after-hours SPCX price, 20-Oct ETF daily bars, MA50/MA200, Nasdaq leadership breadth, bonds/CFTC/options data — PENDING.
6. 3M Amazon warrant **первично 19-Oct**, 20-Oct earnings лишь reiteration: двойной подсчёт запрещён.

## 8. Coverage / collection / persistence

| Семейство | Проверка | Статус |
|---|---|---|
| Repo calendar / governance | PR #79 + README + governance + Champion/Challenger contracts | OK |
| Company primary IR/SEC | 3M Q3 SEC/IR, SpaceX SEC EX-99.1 | OK; call pending |
| Asia primary | Elice issue price IR, KRX official close unavailable | PARTIAL |
| Macro | BLS Oct schedule, Federal Register 20-Oct | OK calendar; not HIGH |
| US market official close | AP indices; Massive 19-Oct only; 20-Oct ETF close not confirmed | PARTIAL |
| Massive timestamps | 19-Oct ET bar label; later rate limit | PARTIAL/RATE_LIMIT |
| Consensus | 3M EPS, SpaceX revenue independently sourced; heterogeneous providers | PARTIAL |
| Credit/Institutional | no new primary matched series | COLLECTION_FAILED for daily refresh |
| Canonical Champion | no normalized accepted snapshot / technical parity | UNKNOWN / NO_TRADE |
| GitHub persistence | issue create attempted and blocked by safety checks; no branch/commit/PR | **PERSISTENCE_FAILED** |

**Решение:** `NO_TRADE`; никаких изменений Strategy A/D, score/weights, limits, execution или брокерских действий. На следующий US session 21-Oct: подтвердить closing ETF и SPCX after-hours / next regular reaction; добавить SpaceX earnings call и Elice official KRX; проверить Meta/Tesla 21-Oct actual release, не использовать предполагаемые даты как факт.

## 9. Источники / первичность

- [SpaceX SEC EX-99.1, 20-Oct-2026](https://www.sec.gov/Archives/edgar/data/1181412/000162828026066482/spaceexplorationtechnologi.htm) — PRIMARY, financial statements and capacity.
- [SpaceX IR 16-Oct schedule](https://ir.spacex.com/updates/releases-details/2026/SpaceX-to-Post-Third-Quarter-2026-Results-and-Host-Webcast-on-October-20-2026-2026-QssQGye3im/default.aspx) — PRIMARY, after-close release and 16:30 call.
- [3M Q3 20-Oct IR](https://investors.3m.com/news-events/press-releases/detail/1946/3m-reports-third-quarter-2026-results-raises-full-year-eps) — PRIMARY; [3M 20-Oct SEC 8-K](https://investors.3m.com/financials/sec-filings/content/0000066740-26-000308/mmm-20261020.htm).
- [3M/Amazon 19-Oct SEC 8-K](https://www.sec.gov/Archives/edgar/data/66740/000006674026000303/mmm-20261019.htm) — PRIMARY, **previous-day** warrant terms.
- [Elice 06-Oct IPO price / subscription](https://elice.io/ko/resources/newsroom/elice-kosdaq-ipo-price) — PRIMARY, IPO price.
- [Reuters Elice 20-Oct](https://www.reuters.com/world/asia-pacific/south-korean-ai-data-centre-firm-elice-shares-tumble-ipo-debut-2026-10-20/) — SECONDARY, closing performance.
- [WSJ Asia 20-Oct](https://www.wsj.com/finance/stocks/asian-stocks-fall-bucking-u-s-tech-rebound-d5c7aa96) — SECONDARY, regional equity close.
- [AP US indices 20-Oct](https://apnews.com/article/0a5ea168499c6ae617c49e10bf48f9c6) — SECONDARY, index closes.
- [Yahoo SMH](https://finance.yahoo.com/quote/SMH/history/), [QQQ](https://finance.yahoo.com/quote/QQQ/history/), [SOXX](https://finance.yahoo.com/quote/SOXX/history/), [SPY](https://finance.yahoo.com/quote/SPY/history/) — SECONDARY **intraday**, timestamps in table; not official close.
- [3M EPS consensus, WSJ](https://www.wsj.com/business/earnings/3m-lifts-earnings-outlook-as-profit-jumps-5c5ac54a), [SpaceX revenue consensus, Reuters](https://www.reuters.com/business/media-telecom/spacex-quarterly-revenue-jumps-beats-estimates-ai-business-surges-2026-10-20/) — SECONDARY consensus.
- [BLS October schedule](https://www.bls.gov/schedule/2026/10_sched_list.htm); [DHS Federal Register 20-Oct](https://www.govinfo.gov/content/pkg/FR-2026-10-20/html/2026-21447.htm).
- [Repository event plan PR #79](https://github.com/HelsingN/AI_CapEx_Reversal/pull/79), [governance](https://github.com/HelsingN/AI_CapEx_Reversal/blob/main/Docs/REPOSITORY_GOVERNANCE.md), [14-Oct baseline](https://github.com/HelsingN/AI_CapEx_Reversal/blob/main/Docs/research/AI_CAPEX_WEEKLY_WATCH_2026-10-14.md).