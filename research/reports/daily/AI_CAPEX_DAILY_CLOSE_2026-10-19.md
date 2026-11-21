# AI CapEx Daily Close — 19 октября 2026 (понедельник)

**Статус: PARTIAL / RESEARCH ONLY / NO_TRADE.** Срез: 2026-10-19 16:26 EDT (20:26 UTC, 23:26 Asia/Jerusalem), после завершения регулярной сессии NYSE/Nasdaq в 16:00 EDT. Это единый дневной отчёт; еженедельный не требуется (понедельник). Основание: `Docs/research/AI_CAPEX_EVENT_WATCH_PLAN_2026-10-17.md` в незамёрдженном PR #79. События оцениваются по времени **публикации**, а не времени, к которому относятся исходные внутренние документы.

## События HIGH, опубликованные/подтверждённые 19 октября по Нью-Йорку

| ID | ET время публикации | Событие | Статус доказательства | Почему HIGH |
|---|---|---|---|---|
| AMZN-BI-20261019-090001Z | 05:00:01 EDT (09:00:01 UTC) | Business Insider впервые опубликовал журналистское расследование внутренних AWS-материалов: Early Rack Receipt, $5 млрд GB300 rack deliveries в августе и ориентир около $3 млрд ежемесячно в последующем, риски электроснабжения/хранения, комментарий AWS CFO о отрицательном FCF AI-бизнеса ещё несколько лет. | `INDEPENDENT_REPORTING / ATTRIBUTED_INTERNAL_RECORD`; оригиналы записи и внутренних писем не опубликованы для независимой проверки. | Новые существенные факты о cash-conversion, capacity funnel и рисках сроков окупаемости. |
| MSFT-NSCALE-REUTERS-20261019 | Reuters-републикация 09:53 по часам страницы (часовой пояс не обозначен; отдельный timestamp заявления представителя неизвестен) | Microsoft **19 октября подтвердил** отказ от якорной аренды площадки Nscale Loughton из-за отсутствия grid connection до 2030-х; Nscale подтвердил продолжение партнёрства по другим проектам. | `MANAGEMENT_STATEMENT_REPORTED_BY_REUTERS` + первичный релиз Nscale от 16 сентября 2025 о первоначальном проекте. **Первое публичное сообщение о выходе датировано 18 октября**, не выдавать его за впервые объявленное 19-го. | Подтверждённый в торговый день конкретный случай потери якорного заказчика и физической задержки: ~50 MW / 23 040 Nvidia GB300 планировалось, но это **не** общесекторная отмена CapEx. |

### Разбор Amazon

В новом расследовании приводится аудиозапись внутреннего собрания сентября и документы об августовских закупках/поставках. Согласно материалу, AWS меняет момент перехода права собственности на серверные стойки на более ранний этап, поэтому денежные средства могут уходить до фактического подключения и монетизации оборудования. Отдельно описан внутренний контроль `Secured Power at Risk`. Утверждение о $220 млрд CapEx за 2026 в публикации **не подтверждено новым публичным issuer guidance** в этом аудите: официальный CEO letter ранее указывал около $200 млрд, а отчет за Q2 2026 — TTM FCF −$7.6 млрд, AWS +37% YoY и положительный AWS operating income. Не путать CapEx всей Amazon с CapEx исключительно AI. В статье руководитель AWS утверждает, что спрос может превосходить доступную мощность и в 2027: это существенный контраргумент тезису о нынешнем физическом избытке GPU. Оценка 44 GW pipeline взята от внешней Cleanview Research и не равна energized/used capacity.

**Surprise versus consensus:** сопоставимый до-публикационный консенсус по внутренним графикам поставок, cash-timing и отрицательному FCF AI-юнита отсутствует; числовой earnings surprise = UNKNOWN. Нет доказательства, что именно статья вызвала движение AMZN или ETF.

### Разбор Microsoft / Nscale

В официальном первоначальном релизе Nscale (16 сентября 2025) площадка Loughton входила в программу UK AI; Reuters 19 октября привёл прямые комментарии представителей обеих компаний: решение Microsoft относится к **одной площадке**, остальные контракты, по заявлению Nscale, не затронуты. Проблема — grid connection, а не доказанный спад конечного AI-спроса. Воронка площадки: объявлена/контрактована, но `ENERGIZED`, `UTILIZED`, `MONETIZED` для предполагаемой конфигурации **не достигнуты**; точный объём уже понесённых затрат, возвратных авансов и обязательств неизвестен. Отдельный финансовый эффект для MSFT и Nscale не раскрыт. Впервые факт стал публичным 18 октября, 19 октября — новое официальное подтверждение через Reuters; не считать два независимых отказа.

**Surprise versus consensus:** количественного sell-side consensus по сроку электроподключения, потерянной выручке и write-offs нет; UNKNOWN.

### Другие наблюдения дня — не отдельные HIGH/CRITICAL

- Reuters сообщил, что доходность облигации CoreWeave с погашением в 2031 снизилась до примерно 15.13% с более 16% на прошлой неделе; сопоставимая первичная серия котировок конкретного ISIN, bid/ask и timestamp не получена. Goldman повысил рейтинг акций, однако внутридневной рост CRWV сменился слабостью к закрытию. Это контекст R4/F3, не доказательство улучшения кредитоспособности.
- Samsung +1.16% (218 000 KRW) и SK hynix +0.39% (1 277 000 KRW) на корейском закрытии 19 октября; KOSPI около +1.8%. Это локальное восстановление после распродажи, не независимое подтверждение улучшения заказов.
- Сообщения о сотрудничестве Samsung/TSMC по новым HBM base dies основаны на прессе; в этом срезе не найдена датированная 19 октября официальная публикация компаний. `UNCONFIRMED`, не повышать до HIGH.
- Запланированного на 19 октября CPI, NFP, PPI или решения FOMC по календарю PR #79 нет; TSMC Q3 earnings были опубликованы 15 октября и не считаются новым событием 19-го.

## Рынок и качество котировок

Регулярная сессия США завершилась в 16:00 EDT. По итоговым рыночным обзорам 19 октября Nasdaq Composite +1.11%, S&P 500 +0.42%; SOX около +2.7% после восьми сессий падения. Это рыночный фон, **не** каузальное доказательство реакции на конкретные новости.

Massive дал **подтверждённые adjusted дневные бары только за пятницу 16 октября**, с ET label `t=1792123200000` (2026-10-16 00:00 EDT): SMH $539.79, QQQ $709.80, SOXX $493.39, SPY $763.25, MSFT $529.05. Запрос баров за 19 октября вернул `NOT_ENTITLED`; часть дополнительных запросов — `RATE_LIMIT`. Не обозначать эти пятничные значения как сегодняшнее закрытие.

Вторичные внутридневные **снимки, НЕ 16:00 closing bars**:

| ETF | Дата/время EDT снимка | Последняя цена USD | Изменение к Massive close 16 Oct | Ограничение |
|---|---|---:|---:|---|
| SMH | 19 Oct 15:50:35 | 550.50 | +1.98% | Yahoo real-time snapshot, не official RTH close |
| QQQ | 19 Oct 14:05:03 | 719.08 | +1.31% | Yahoo delayed snapshot, не close |
| SOXX | 19 Oct 14:49:31 | 503.54 | +2.06% | Yahoo delayed snapshot, не close |
| SPY | 19 Oct 14:50:41 | 767.60 | +0.57% | ChartExchange snapshot, не close |

Дневные Yahoo `history` строки в поиске динамически обновлялись и противоречили друг другу по времени; **не использовать** их как проверенный final RTH bar. По Microsoft/CRWV/AMZN нельзя выделить очищенную от рыночного движения event-study реакцию без pre/post timestamps, matching controls и after-hours trade data. Корейские цены — закрытие раньше открытия США; не утверждать Asia→US causality.

## Champion / Challenger / Physical: событийная оценка, без изменения модели

**Champion F1–F5:**

| Триггер | Дельта события / контраргумент | Статус |
|---|---|---|
| F1 CapEx discipline | Нет нового подтверждённого снижения CapEx guidance гиперскейлеров. Amazon cash timing хуже, но это не сокращение бюджета. | `NO_CONFIRMED_TRIGGER_CHANGE` |
| F2 GPU oversupply | Staged racks из-за энергии = узкое место в вводе мощности; не равняется GPU glut, price decline или падению utilization в работающих кластерах. | `UNKNOWN` |
| F3 Neocloud credit | Nscale site execution + высокий CoreWeave credit yield подчёркивают selective financing risk; нет первичного сопоставимого credit-spread time series. | `WATCH / NO_CANONICAL_UPDATE` |
| F4 Semiconductor guidance | Новых подтверждённых массовых cut orders/guidance не обнаружено; TSMC сильный Q3 остаётся контраргументом. | `NO_CONFIRMED_TRIGGER_CHANGE` |
| F5 Backlog quality | Локальный отказ MSFT — факт counterparty/contract concentration; договоры других Nscale площадок и AWS backlog не проверены на cancellability. | `WATCH / NO_CANONICAL_UPDATE` |

**Challenger R1–R7:** сохранить прежний исследовательский baseline `1/1/1/2/1/1/1`, **не пересчитывать** `60 / ALERT / STAGE_5_PROJECT_ATTRITION` автоматически. По R1 (monetization vs CapEx) и R2 (FCF) материал AWS повышает качественную озабоченность, но не даёт сравнимой новой issuer-quarter series; R3 (payback) — риск задержки revenue-start без подтверждённого project IRR; R4 (financing) — давление у neocloud, без новой закрытой кредитной сделки; R5 (backlog quality) — потеря одного anchor customer, условия прочих контрактов неизвестны; R6 (capacity funnel) — зафиксирован конкретный разрыв между CONTRACTED и ENERGIZED; R7 (project attrition) — локальный отменённый клиентский договор, без доказанного industry-wide cascade. Никакого повышения R7=2, R6=2 или общего score без принятого нормализованного evidence bundle.

**Physical P1–P4:** оставить carried baseline `P1 WATCH / P2 ANTI_REVERSAL / P3 ANTI_REVERSAL / P4 WATCH`. P1: энергетическая задержка — не измерение GPU rental pricing/utilization. P2: HBM/DRAM price/inventory primary update за 19 октября отсутствует. P3: нет новых supplier order cancellations; Q3 TSMC ранее сильный. P4: отскок США и Кореи после резкой распродажи, техническая структура MA50/MA200/RS требует новой согласованной серии. Нет подтверждённого physical reversal.

**Macro:** ставки/нефть/кредит могут тормозить ввод мощности, но нет нового официального FOMC решения 19 октября. **Institutional:** новое синхронное CFTC/Cboe/prime broker evidence на дату отчёта не собрано; carried `H1_QUIET_HEDGING / MEDIUM` из отчёта 14 октября — не сегодняшняя оценка. **Divergence:** свежий Champion `UNKNOWN`, сравнение с Challenger `UNKNOWN`, допускается только историческое `CHALLENGER_EARLY_WARNING` к carried WATCH narrative.

## Coverage / manifest / unknowns

| Группа | Сегодня проверено | Что отсутствует / следующий шаг |
|---|---|---|
| Source events | Две публикации/подтверждения HIGH; оба временных среза, различие 18/19 Oct | Оригинальные AWS документы/запись и exact issuer confirmation timestamp MSFT; нет гарантии исчерпывающего новостного охвата |
| Market | Massive 16 Oct 5 баров; вторичные ETF intraday 19 Oct; индексные итоговые обзоры | Massive Oct19 `NOT_ENTITLED`; official matched 16:00 ETF RTH bars, CRWV bond ISIN/time, event-study attribution |
| Asia | Korea close 19 Oct Samsung/SK hynix и KOSPI ориентир | Полная согласованная серия TSMC/TWSE, Japan/Tokyo Electron и FX/Asia policy |
| Fundamental / financing | Amazon issuer Q2/CEO letter; Nscale первичный 2025 релиз; Reuters Monday spokespeople | AWS AI-only FCF, cash outlays, confirmed current CapEx guidance $220B, power contract terms, Nscale termination fee, insurer/bond bid/ask |
| Technical / institutional | Общий US индексный отскок, ранее принятый baseline | Canonical TradingView RTH signals; fresh CFTC/Cboe/short/prime-broker evidence |
| Canonical decision | Только inherited research baseline | `Champion.state`, `combined_score`, fresh fundamental normalization, canonical technical, approved Asia score, leadership attribution — UNKNOWN |

**Pending for 20-Oct:** повторно запросить в разрешённом провайдере полный close 19-Oct для SMH/QQQ/SOXX/SPY/MSFT/AMZN/CRWV и after-hours, оценить влияние news на цену с matched market controls; проверить новые issuer responses и следующее объявление Lam Research/Meta только по официальному IR расписанию. Не подменять отсутствующие поля нулями.

**Outcome:** `PARTIAL`; `Champion UNKNOWN`; `combined_score=null`; `trade_state=NO_CANDIDATE / NO_TRADE`; `Challenger carried 60/ALERT/Stage5` без обновления; никаких ордеров и изменений модели. `PERSISTENCE_FAILED`: GitHub connector read работает, но попытка создать issue для отчёта заблокирована; ни ветка, ни PR, ни коммит не созданы. Локальный markdown-файл — отдельный экспорт, **не** GitHub persistence. Dedup ledger недоступен, гарантия отсутствия дублирования других потоков UNKNOWN.

## Source register

1. Amazon investigative report, published 2026-10-19T09:00:01.265Z: https://www.businessinsider.com/amazon-220-billion-ai-bet-data-centers-spending-challenges-2026-10
2. Amazon Q2 2026 issuer release (2026-07-30): https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Second-Quarter-Results/default.aspx
3. Amazon CEO primary shareholder letter: https://www.aboutamazon.com/news/company-news/amazon-ceo-andy-jassy-2025-letter-to-shareholders
4. Reuters Monday Nscale confirmation, mirror with publication 2026-10-19 09:53 (site timezone unlabelled): https://www.investing.com/news/stock-market-news/microsoft-pulls-out-of-uk-nscale-data-centre-deal-over-power-delay-4957808
5. First public coverage **Sunday** 2026-10-18 08:28 EDT: https://www.theguardian.com/uk-news/2026/oct/18/microsoft-drops-huge-ai-datacentre-project-in-essex-over-power-supply-concerns
6. Nscale original 2025 issuer commitment: https://www.nscale.com/press-releases/nscale-uk-ai-infrastructure-announcement
7. Nscale 2025 original site capacity: https://www.nscale.com/press-releases/ai-hyperscaler-nscale-to-invest-gbp-2-billion-in-the-uk-data-centre-industry
8. Reuters US close summary 19-Oct: https://www.reuters.com/business/wall-st-futures-climb-ai-stocks-rebound-oil-yields-fall-2026-10-19/
9. AP US close: https://apnews.com/article/5aec11ee466841cc2a69b2d23ab77f0e
10. Korea market close Yonhap, 2026-10-19 16:11 KST: https://www.yna.co.kr/amp/view/AKR20261019036551008
11. Yahoo ETF intraday source pages: https://finance.yahoo.com/quote/SMH/history/ ; https://finance.yahoo.com/quote/QQQ/history/ ; https://finance.yahoo.com/quote/SOXX/history/
12. SPY intraday snapshot: https://chartexchange.com/symbol/nyse-spy/historical/
13. PR #79 proposal: https://github.com/HelsingN/AI_CapEx_Reversal/pull/79
14. Prior baseline (private repo): Docs/research/AI_CAPEX_WEEKLY_WATCH_2026-10-14.md

**No financial advice.** Research-only, no automatic trading authority.