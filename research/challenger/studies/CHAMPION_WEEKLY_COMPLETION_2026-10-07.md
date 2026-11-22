# Champion — завершение Weekly Watch на 2026-10-07

**Статус исследования:** COMPLETE / RESEARCH SUPPLEMENT  
**Полный свежий Combined Score:** UNKNOWN — обязательные входы не завершены  
**Срез рынка:** закрытие US regular session 7-Oct-2026, 16:00 America/New_York  
**Сбор и проверка:** 8-Oct-2026; точное время сохранения — Git commit  
**Основа проекта:** `main@485c73f7973f3f7e249ba90cb9ade6c3506cb2ea`  
**Issue:** [#67](https://github.com/HelsingN/AI_CapEx_Reversal/issues/67)  
**Исходный отчёт:** [Weekly Watch 7-Oct](AI_CAPEX_WEEKLY_WATCH_2026-10-07.md)  
**Структурированное наблюдение:** [champion_observation_2026-10-07.yaml](../../data/research/champion/champion_observation_2026-10-07.yaml)  
**Числовая техника:** [technical_snapshot_2026-10-07.json](../../data/research/champion/technical_snapshot_2026-10-07.json)

## Вывод

На рассмотренном срезе **подтверждения AI CapEx reversal нет; исследовательский торговый вывод — NO_CANDIDATE**. Технический слой, восстановленный по Massive, даёт **10/100, NORMAL**, SMH/SPY **WEAK**, слабых акций в корзине **0/4**. Эти результаты не поддерживают обязательные BREAKDOWN и RS DOWN для Strategy A.

Финансовая зависимость и качество долгих обязательств остаются на WATCH. Однако они пока не сопровождаются установленным широким снижением GPU utilization, арендных цен, заказов и памяти. Высокая финансовая хрупкость сама по себе не заменяет подтверждение физического разворота.

**WATCH в исходном weekly — исследовательская метка наблюдения, а не доказанный числовой диапазон Champion.** Значение **60 / ALERT** принадлежит Challenger и не передаёт ему торговые полномочия. Новый полный Champion Combined Score здесь не объявляется: нет принятой свежей нормализации фундаментальных чисел и числового Asia input. Это ограничение имеет значение для результата, а не является нулевым риском.

## Что завершено и где проходит граница

Завершены восстановление US technical-v1, проверка доступной фундаментальной/азиатской информации, условная арифметика прежней нормализации, проверка причин отсутствия кандидата и сохранение воспроизводимого расчёта.

Исходная recovery-запись не изменена по смыслу. Точный оригинальный intraday cutoff остаётся UNKNOWN. Новый срез выбран явно, на закрытие 7-Oct; он не выдаётся за первоначальный исторический executable bundle. Источники могли обновляться к моменту повторного чтения, а точное первое время доступности части данных не зафиксировано.

Это исследование не выпускает TradingView alert, не загружает данные в runtime/SQLite, не заменяет текущий accepted FundamentalSnapshot и не генерирует ордер. Сохранённые research JSON/YAML имеют отдельные схемы; это не `ai-capex.signal.v1` и не runtime fundamental snapshot.

## 1. US technical-v1 — новая числовая проверка

Источник: Massive daily aggregates, `adjusted=true`, `sort=asc`, `limit=50000`, интервал 1-Jun-2025..7-Oct-2026. Использованы SMH, SPY, NVDA, AMD, AVGO, MU. Получено **по 340 баров**, фактические даты 2-Jun-2025..7-Oct-2026; даты всех шести рядов совпали, дубликатов нет, minimum warmup 252 выполнен.

Формулы и веса взяты из [Technical Signal Contract v1](../TECHNICAL_SIGNAL_CONTRACT_v1.md). Ни SOXX, ни VIX, ни Challenger, ни Asia в этот score не добавлялись.

| Признак | На закрытие 7-Oct | Баллы |
|---|---:|---:|
| SMH close | $625.03 | — |
| SMH MA50 | $574.8884; close выше | 0 |
| SMH MA200 | $503.76325; close выше | 0 |
| MA50 slope, 20 bars | +0.4954% | 0 |
| MA200 slope, 20 bars | +5.0005% | 0 |
| High за 252 бара | $671.83 | — |
| Drawdown от high252 | −6.9660% | 0 |
| SMH/SPY | WEAK | 10 |
| Breadth ниже MA50 | 0/4 | 0 |
| **Technical score / regime** | **10 / NORMAL** | **10** |

RS сейчас 0.8041867, RS MA50 0.7503778, то есть текущий ratio выше MA50. Но slope RS MA50 за 20 баров ещё −0.5911%. Из двух bearish RS-признаков выполнен один; именно поэтому состояние **WEAK**, а не DOWN или полностью UP.

| Акция | Close | MA50 | Ниже MA50 |
|---|---:|---:|---|
| NVDA | 237.47 | 220.5832 | нет |
| AMD | 645.86 | 522.6441 | нет |
| AVGO | 376.51 | 372.5980 | нет |
| MU | 1088.00 | 967.1625 | нет |

SMH вырос на **2.6322%** относительно close 30-Sep ($609.00). Один отрицательный день 7-Oct не создаёт BREAKDOWN. Дополнительный endpoint `/v1/open-close/SMH/2026-10-07` подтвердил regular close $625.03; отдельно вернул afterHours $626.45 и preMarket $630.63. В расчёт они не входят.

**Граница подтверждения:** это provider reconstruction, а не захваченный canonical `NASDAQ:SMH` Pine alert. Feed/session/adjustment parity с TradingView на этой дате не доказана. Проверка daily-close через второй endpoint снижает риск смешения с extended hours, но не устанавливает полную Pine parity.

## 2. Champion fundamentals — что подтверждается

Ниже — оценка исследовательских свидетельств. Это не скрытая смена F1–F5 или новая автоматическая шкала 0..100.

| Блок Champion | Свидетельства до среза | Оценка исследования |
|---|---|---|
| F1 Hyperscaler CapEx discipline | Reviewed spending/guidance остаются expansionary; у MSFT следующий квартал >$50B CapEx, Meta $130–145B за 2026; Oracle Q1 CapEx $28.499B | Широкий CapEx cut не установлен |
| FCF / cash pressure | Сильная OCF не всегда превращается в свободные деньги после CapEx; различия между эмитентами велики | WATCH; давление реально, но неоднородно |
| F2 GPU oversupply | Сопоставимые Ornn settlements не показывают синхронного падения всех трёх GPU классов; utilization/renewals UNKNOWN | Не подтверждён |
| F3 Neocloud credit | CoreWeave duration mismatch и риск повторного размещения мощности; кредитное финансирование доступно | WATCH, без доказанного общего credit crack |
| F4 Semiconductor guidance | Свежие MU результаты и AVGO outlook против широкого физического unwind | Не подтверждён; высокая маржа остаётся циклическим риском |
| F5 RPO/backlog quality | Большие долгие обязательства, концентрация и vendor support повышают требования к проверке payback | STRUCTURAL QUALITY WATCH; волна отмен/default не установлена |

### Денежные потоки: не смешивать периоды и определения

| Компания / период | Проверенные показатели | Класс / вывод |
|---|---|---|
| Microsoft FY26 Q4 | OCF $55.4B, cash PP&E $35.8B, FCF $19.6B; total CapEx $41B включает leases | PRIMARY_FACT; существенное внутреннее финансирование сохраняется |
| Amazon TTM до 30-Jun | OCF $161.4B, FCF −$7.6B; рост PP&E в основном связан с AI | PRIMARY_FACT; cash conversion под давлением |
| Meta Q2 | OCF $31.86B, CapEx с lease principal $31.08B, FCF $0.784B | PRIMARY_FACT; узкий cash buffer после spending |
| Alphabet H1 | OCF $84.859B, cash PP&E $80.598B; разность $4.261B рассчитана здесь | PRIMARY_FACT + явная арифметика; H1 нельзя выдавать за Q2 |
| Oracle Q1 FY27 | Компания сообщает OCF около $23B и FCF около −$5B; CapEx $28.499B | PRIMARY_FACT; cloud growth сосуществует с funding pressure |

Для Oracle отдельно требуется учитывать customer prepayments и специальные funding-related adjustments из release. Company-defined net cash outlay после финансирования нельзя автоматически приравнивать к gross CapEx или считать чистой выручкой от конечного потребления. Раскрытая информация о финансировании не доказывает несуществующий спрос.

CapEx-guidance — MANAGEMENT_CLAIM. Она показывает планы, не уже реализованный spending. Эти компании и периоды не складывались в «общую отраслевую FCF» без согласования определений.

### GPU pricing / utilization

| Ornn daily settlement, USD/GPU-hour | 6-Oct, исходный weekly S7 | 7-Oct, повторная проверка |
|---|---:|---:|
| H100 SXM | 2.86 | 2.85 |
| H200 | 5.04 | 5.29 |
| B200 | 7.56 | 7.56 |

Изменения: H100 примерно −0.35%, H200 +4.96%, B200 0%. Это две даты одной provider-defined серии, а не сравнение разных listing averages. Они **не устанавливают generalized price collapse**. Две точки также не измеряют тренд utilization, renewals, contract duration или всю популяцию провайдеров.

7-Oct settlement помечен на сайте обновлением 20:00 UTC; прочитан 8-Oct. Точное первое время публичной доступности не проверено, поэтому нельзя утверждать, что этот print уже был доступен оригинальному intraday решению. Missing utilization остаётся UNKNOWN, а не «здоровым utilization».

### Поставщики и кредит

Micron 30-Sep: Q4 revenue $54.23B, OCF $43.97B, adjusted FCF $33.20B, non-GAAP gross margin 87.0%. Следующий квартал: revenue guidance $61.5B ± $1.5B и non-GAAP GM около 86.25%. Реализованные результаты — PRIMARY_FACT; будущие величины — MANAGEMENT_CLAIM. Небольшое ожидаемое снижение margin не тождественно широкой остановке заказов, но peak-margin risk нельзя игнорировать.

Broadcom 2-Sep: revenue $29.6B и FCF около $13.7B — PRIMARY_FACT. Q4 revenue около $34.8B и AI semiconductor revenue около $21.7B — MANAGEMENT_CLAIM. Это expansionary outlook, не наблюдение о выполненном следующем квартале.

CoreWeave 10-Aug: facility $2.6B, maturity около пяти лет против average customer contracts около трёх, SOFR +5.50% — PRIMARY_FACT. Это контекст, не новое октябрьское финансирование. Сравнение с мартовской структурой нельзя выдавать за like-for-like рост company-wide funding cost.

Reuters 1-Oct сообщает о Broadcom financing до $42B для части пятилетних Anthropic commitments $125.2B. Это INDEPENDENT_CONFIRMATION reporting on a filing; underlying filing здесь не захвачен. Потенциальное финансирование не равно уже выданной сумме. Vendor support усиливает quality/payback watch, но не доказывает отмены заказов, fraud или финансовую несостоятельность клиента.

## 3. Asia — свежий контекст, числовой input остаётся UNKNOWN

Использованы локальные listings, не TSM US ADS. Цены ниже — новости о завершённой сессии, не собственный exchange raw export. Относительные движения вычислены из опубликованных rounded процентов; точность — примерно 0.01 pp.

| Локальная бумага, 7-Oct | Close | Day move | Local benchmark | Relative move |
|---|---:|---:|---:|---:|
| TSMC TWSE:2330 | TWD 2,585 | 0.00% | TAIEX −0.03% | +0.03 pp |
| SK hynix KRX:000660 | KRW 1,723,000 | −2.82% | KOSPI −1.98% | −0.84 pp |
| Samsung KRX:005930 | KRW 268,500 | −1.29% | KOSPI −1.98% | +0.69 pp |

TAIEX close 49,806.37; KOSPI 6,803.90. Результат **mixed with Korean weakness**, а не согласованное foundry + memory подтверждение физического reversal. Корейские движения происходили перед Samsung guidance; Samsung outperform относительно KOSPI важно учитывать, хотя absolute return отрицателен.

Последние проверенные до среза company materials также не устанавливают широкий unwind: SK hynix Q2 сообщал о росте DRAM/NAND pricing и customer LTAs; Samsung Q2 memory results сильны, outlook shortage — MANAGEMENT_CLAIM; TSMC August revenue +53.3% YoY, Q3 revenue guidance $44.6–45.8B. Эти older disclosures не выдаются за свежие October earnings.

Buyback flows и ожидания capital return могут влиять на локальную цену. SBS в оригинальном корейском отчёте описывает ongoing/reduced repurchase buying; company-level execution filings здесь не проверены. Это confounder для причинной интерпретации цены, не доказательство манипулирования и не изменение технических баллов.

**Не назначен произвольный Asia=0/10/50.** Исследовательская таблица и одно дневное движение не являются принятой versioned нормализацией обязательного компонента. Multi-session local data и согласованное числовое решение остаются необходимыми для VALID Asia input.

Samsung preliminary Q3 release с локальной датой **8-Oct** и TSMC September revenue release на **8-Oct** исключены из среза 7-Oct, даже если уже видны при сегодняшнем поиске.

## 4. Combined Score — доступная арифметика и её предел

В main последняя строгая нормализация — [fundamental-2026-09-02-v2](../../data/fundamentals/current/fundamental_snapshot_2026-09-02-v2.yaml). Её возраст сам по себе не делает её OBSOLETE: утверждённого универсального TTL нет. Но она не является новой нормализацией всех октябрьских фактов.

Таблица ниже **условно сохраняет именно эти старые числовые оценки** и подставляет новую research-технику. Новые финансовые факты не преобразованы в произвольные точные баллы.

| Компонент | Условный input | Вес | Вклад |
|---|---:|---:|---:|
| Hyperscaler CapEx | 15, baseline 2-Sep | 20% | 3.00 |
| FCF / cash pressure | 60, baseline 2-Sep | 10% | 6.00 |
| Neocloud credit | 35, baseline 2-Sep | 15% | 5.25 |
| GPU pricing/utilization | 10, baseline 2-Sep | 10% | 1.00 |
| Semiconductor guidance | 20, baseline 2-Sep | 15% | 3.00 |
| RPO/backlog | 10, baseline 2-Sep | 10% | 1.00 |
| Technical US | 10, reconstruction 7-Oct | 10% | 1.00 |
| Asia | UNKNOWN | 10% | UNKNOWN |
| **Известная часть сценария** | | | **20.25** |

```text
Conditional Combined = 20.25 + 0.10 × Asia
Asia ∈ [0,100] ⇒ Conditional Combined ∈ [20.25,30.25]
Conditional score band = NORMAL throughout this interval
```

Это не confidence interval и не bound для ещё не нормализованных свежих фундаментальных значений. Это sensitivity range **при фиксированных baseline inputs**. Значение 20.25 не объявляется полной оценкой и не получено путём подмены UNKNOWN на zero.

В baseline F1..F5 = 0/0/1/0/0: активен один weak/watch trigger. В runtime active count включает уровни >=1, а не только confirmed level 2. Новый accepted октябрьский trigger vector здесь не создавался.

**Полный fresh Combined Score = UNKNOWN.** Нужны новый immutable FundamentalSnapshot v2, принятое числовое Asia input и canonical technical evidence. При missing required inputs Decision Engine должен сохранять UNKNOWN / score null. Реальное runtime решение на новую дату не запускалось.

## 5. Почему NO_CANDIDATE обоснован и без выдуманного полного score

| Обязательный gate Strategy A | Исследовательская проверка |
|---|---|
| Combined >=75 | Fresh value UNKNOWN; baseline sensitivity значительно ниже |
| >=3 active F1..F5 | В accepted baseline 1; fresh vector не зафиксирован |
| SMH regime BREAKDOWN | Research reconstruction NORMAL — не выполнен |
| SMH/SPY DOWN | Research reconstruction WEAK — не выполнен |
| Broad semiconductor driver | Reviewed physical deterioration не установлен; runtime classifier не запускался |

Новый research trade conclusion следует из отсутствия подтверждений. Даже hypothetical высокий fundamental score сам по себе не устранил бы независимые технические требования. Это не утверждение, что production Risk Engine одобрил или отклонил ордер: pipeline до candidate/order здесь не запускался.

Необоснованно заменять исходное WATCH на официальный NORMAL по условной старой нормализации. Корректное отображение:

```text
Narrative risk monitoring:    WATCH
Research technical-v1:       10 / NORMAL
Fresh Combined Score:        UNKNOWN
Canonical runtime decision:  NOT_COMPUTED; missing inputs would fail closed to UNKNOWN
Research trade implication:  NO_CANDIDATE
Challenger reference:         60 / ALERT / NO TRADING AUTHORITY
```

## 6. Воспроизводимость и проверка

Расчёт: [calculate_champion_technical_snapshot.py](../../scripts/research/calculate_champion_technical_snapshot.py). Требуется только Python standard library и шесть CSV с `t,c,h`, имена `SMH.csv`, `SPY.csv`, `NVDA.csv`, `AMD.csv`, `AVGO.csv`, `MU.csv`.

```bash
python scripts/research/calculate_champion_technical_snapshot.py \
  --input-dir /path/to/six-csv-exports \
  --as-of 2026-10-07 \
  --output /path/to/technical_snapshot_2026-10-07.json
```

Через Massive каждый endpoint вызван с указанными параметрами; затем выбран `SELECT t,c,h FROM <table> ORDER BY t`. CSV UTF-8/LF с trailing newline. JSON хранит SHA256 каждого экспортированного input. Raw market series не включены в PR. Повторная загрузка требует доступности source data; исправления провайдера могут менять hash/результат. Hash provenance не заменяет архив исходных баров и не обещает bit-for-bit replay без тех же входов.

Проверено:
- независимый JS расчёт и Python дали score/regime/RS/breadth 10/NORMAL/WEAK/0; числовые признаки совпали с float tolerance;
- несовпадающие даты между рядами вызывают error, без intersection/fill;
- YAML сохраняет Asia и fresh Combined Score как null; baseline arithmetic проверена;
- existing `tests/unit/test_decision_engine.py`: **19 passed**, один upstream Starlette TestClient deprecation warning, локально Python 3.12;
- полный project CI Python 3.11 и точный run фиксируются в связанном PR; локальный результат не выдаётся за required CI.

Weights, thresholds, technical-v1, runtime, manual approval и gates не изменены:
`CORE_PHASE1_GATE=PASS`, `BROKER_SPECIFIC_GATE=BLOCKED`, `READY_FOR_PHASE_2=NO`, Live disabled.

## 7. Что ещё требуется для точного принятого Champion score

1. Создать отдельную свежую immutable fundamental normalization по источникам до выбранного cutoff. Зафиксировать для каждого компонента/F-trigger MAINTAIN или REVISE и мотивировку; не копировать 2-Sep числа молча и не наследовать Challenger 60.
2. Принять versioned numeric Asia input по локальным listings, benchmark adjustment, нескольким completed sessions и company-specific confounders. До этого Asia UNKNOWN.
3. Захватить canonical TradingView evidence. Не выпускать запрещённый DAILY_TECHNICAL_STATE production event для NORMAL research capture.
4. Только после заполнения этих входов выполнить отдельно запрошенный immutable runtime replay. Поздняя нормализация не должна задним числом превращаться в оригинальное решение 7-Oct.

Эти пункты ограничивают полноту canonical score, а не отменяют завершённую проверку доступной информации. Следующий содержательный сигнал для reversal — связка CapEx discipline/credit deterioration с ухудшением utilization/pricing/orders и секторным BREAKDOWN, а не просто новая высокая сумма commitments.

## Source register

Источники прочитаны 8-Oct. Original intraday availability и version history не доказаны для всех материалов. PRIMARY_FACT = reported result/terms; MANAGEMENT_CLAIM = forward outlook; third-party reports отмечены отдельно.

- **T1 — Massive:** [Custom Bars documentation](https://www.massive.com/docs/rest/stocks/aggregates/custom-bars), endpoints/params и export hashes в JSON; Daily Ticker Summary SMH 7-Oct проверен отдельно.
- **F1 — Microsoft, FY26 Q4:** [earnings call](https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4); realized cash/CapEx и forward guide разделены.
- **F2 — Amazon, Q2 2026:** [release](https://www.aboutamazon.com/news/company-news/amazon-earnings-q2-2026-report).
- **F3 — Meta, 29-Jul:** [release](https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/default.aspx).
- **F4 — Alphabet, Q2 10-Q:** [SEC filing](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm), H1 cash-flow table.
- **F5 — Oracle, 10-Sep:** [Q1 FY27 release](https://investor.oracle.com/investor-news/news-details/2026/Oracle-Announces-Q1-Results-Driven-by-Triple-Digit-Growth-in-Cloud-Infrastructure-Revenues/default.aspx).
- **F6 — Micron, 30-Sep:** [FY26 Q4 release](https://investors.micron.com/news/press-release/2026/Micron-Technology-Inc--Reports-Record-Fiscal-Fourth-Quarter-and-Full-Year-2026-Results/default.aspx).
- **F7 — Broadcom, 2-Sep:** [Q3 release](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial).
- **F8 — CoreWeave, 10-Aug:** [DDTL 5.5 terms](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-2-6-Billion-Loan-Facility-Expanding-Financing-Flexibility-for-AI-Infrastructure/default.aspx).
- **F9 — Reuters, 1-Oct:** [Broadcom/Anthropic](https://www.reuters.com/business/broadcom-lend-anthropic-up-42-billion-lease-its-chips-filing-says-2026-10-01/); INDEPENDENT_CONFIRMATION, underlying filing not captured.
- **G1 — Ornn, settlement 7-Oct:** [provider page](https://data.ornn.com/); 6-Oct values retained with original weekly S7 provenance.
- **A1 — SBS, 7-Oct Korea:** [local prices](https://news.sbs.co.kr/english/article.do?news_id=N1008787466), [original Korean KOSPI/flows report](https://news.sbs.co.kr/news/endPage.do?news_id=N1008787467). News observations; repurchase execution documents not captured.
- **A2 — Taipei Closing Bell, 7-Oct:** [local close recap](https://taipeiclosingbell.com/taiex-stalls-33-points-shy-of-50000-as-foreign/); news-reported context, not exchange raw.
- **A3 — SK hynix, 29-Jul:** [2Q release](https://news.skhynix.com/en/q2-2026-business-results/).
- **A4 — Samsung, 30-Jul:** [Q2 release](https://news.samsung.com/global/samsung-electronics-announces-second-quarter-2026-results).
- **A5 — TSMC, 10-Sep:** [August revenue SEC release](https://www.sec.gov/Archives/edgar/data/1046179/000104617926000658/tsm-revenue20260910.htm); [July outlook](https://pr.tsmc.com/english/news/3326).
- **Cutoff exclusion checks:** [Samsung Q3 guidance local 8-Oct](https://news.samsungsemiconductor.com/global/samsung-electronics-announces-earnings-guidance-for-third-quarter-2026/); [TSMC financial calendar](https://investor.tsmc.com/english/financial-calendar). These new results are not used to revise the Oct-7 assessment.

Authoritative project references: [Strategy v1.3](../AI_CapEx_Reversal_Strategy_v1.3.md), [Technical Contract v1](../TECHNICAL_SIGNAL_CONTRACT_v1.md), [Fundamental Contract v2](../FUNDAMENTAL_SNAPSHOT_CONTRACT_v2.md), [governance](../REPOSITORY_GOVERNANCE.md).
