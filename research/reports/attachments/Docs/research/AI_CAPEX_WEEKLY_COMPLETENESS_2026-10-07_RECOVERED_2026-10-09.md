# Weekly Watch 7 октября — дополнение по полноте, восстановлено 9 октября 2026

**Статус данных: PARTIAL.** Все 12 обязательных блоков и 98 полей перечислены; **25 полей остаются UNAVAILABLE**. Это проверенное покрытие, а не утверждение, что все числовые данные доступны.  
**Исходный отчёт:** [Weekly Watch 7-Oct](AI_CAPEX_WEEKLY_WATCH_2026-10-07.md), исходный Challenger YAML сохранён без изменений.  
**Исследовательский срез дополнения:** 2026-10-07 23:59:59 America/New_York; последняя завершённая US RTH session7Oct.  
**Восстановление/инвентаризация:** 2026-10-09T03:58:00.599Z.
**Оригинальный cutoff:** UNKNOWN. Automation запускалась7Oct05:57UTC, раньше US session7Oct; её информационный набор нельзя подменять этим поздним EOD reconstruction.  
**Исходная база репозитория:** main@04ed3774bfbceb2be7daea5aa624343d79ffa03b.  
**Manifest:** [weekly_capture_2026-10-07_r1.json](../../data/research/weekly/weekly_capture_2026-10-07_r1.json).  
**Исправление:** [#74](https://github.com/HelsingN/AI_CapEx_Reversal/issues/74). Trading authorityNONE.

Доступные показатели дополнены, методологические/доступные ограничения оставлены явно. Original 7-Oct recovery содержит утраченный intraday cutoff и сбой первоначального connector write; точный exception/run trace не доступен. Новые October8 releases Samsung/TSMC, FRED Oct7 IG print с publicationOct8, short-interest Sep30 с publicationOct9, current Oct8 Cboe curve/CRB исключены.

Причина пропусков и контроль сборки сохранены в [аудите](../audits/2026-10-09_weekly_capture_completeness_audit.md). В ранее сохранённом automation prompt отсутствовали оба обязательных overlay, использовалась устаревшая Strategyv1.2, а CI проверял runtime/tests без inventory weekly. Исправленный prompt текущей задачи включает current-contract preflight, полное покрытие и уведомление о PARTIAL/сбое.

## champion

Исследовательский WATCH / NO_CANDIDATE сохранён. [Отдельный Champion supplement](CHAMPION_WEEKLY_COMPLETION_2026-10-07.md) содержит US proxy 10/NORMAL, RS WEAK, breadth0/4. Это не canonical Pine bundle. Свежий accepted Combined Score остаётся null: нельзя подставлять старые фундаментальные числа, Challenger60 или произвольный Asia=0.

| Field | Observation / status |
|---|---|
| `state` | WATCH research carry; fresh numeric band unavailable (ASSESSED) |
| `trade_state` | NO_CANDIDATE research conclusion; canonical runtime decision not computed (ASSESSED) |
| `combined_score` | UNKNOWN (UNAVAILABLE) |
| `fundamental_normalization` | UNKNOWN (UNAVAILABLE) |
| `technical` | 10 / NORMAL; SMH/SPY WEAK; breadth 0/4; 340 aligned bars (ASSESSED) |
| `canonical_technical` | UNKNOWN (UNAVAILABLE) |
| `asia` | UNKNOWN (UNAVAILABLE) |
| `leadership` | [{"ticker":"MSFT","close":529.76,"ma50":496.126,"ma200":433.5697,"weekly_pct":3.28719,"rs50_slope_pct":9.46727},{"ticker":"GOOGL","close":350.5,"ma50":345.6592,"ma200":339.61265,"weekly_pct":1.86585,"rs50_slope_pct":-1.75031},{"ticker":"AMZN","close":259.92,"ma50":258.0088,"ma200":241.848,"weekly_pct":4.3227,"rs50_slope_pct":0.29359},{"ticker":"META","close":721.31,"ma50":633.4318,"ma200":629.5374,"weekly_pct":-0.53366,"rs50_slope_pct":4.65663},{"ticker":"ORCL","close":143.56,"ma50":145.1112,"ma200":162.30685,"weekly_pct":4.55936,"rs50_slope_pct":2.35272}] (OBSERVED) |
| `leadership_events` | UNKNOWN (UNAVAILABLE) |
| `F1` | Broad hyperscaler cuts not confirmed (ASSESSED) |
| `F2` | Broad GPU oversupply not confirmed; missing utilization (ASSESSED) |
| `F3` | Credit/renewal dependence WATCH; access not closed (ASSESSED) |
| `F4` | Broad semiconductor deterioration not confirmed (ASSESSED) |
| `F5` | Structural backlog/financing quality WATCH; cancellations not established (ASSESSED) |

## hyperscalers

Перепроверены первичные раскрытия Microsoft, Alphabet, Amazon, Meta и Oracle. Cash PP&E, leased CapEx и financing-adjusted outlay различаются; H1, quarter и TTM не складываются. Выручка AI и отдача marginal projects не равны общей cloud revenue.

| Field | Observation / status |
|---|---|
| `MSFT_cash_capex` | FY26 Q4 OCF 55.4B, cash PP&E 35.8B, FCF 19.6B; total CapEx 41B includes leases (OBSERVED) |
| `GOOGL_cash_capex` | H1 OCF 84.859B, cash PP&E 80.598B; calculated difference 4.261B (H1, not Q2) (OBSERVED) |
| `AMZN_cash_capex` | TTM OCF 161.4B; FCF -7.6B; cash investment pressure (TTM, not one quarter) (OBSERVED) |
| `META_cash_capex` | Q2 OCF 31.862B, PP&E 30.116B + lease principal .962B, FCF .784B (OBSERVED) |
| `ORCL_cash_capex` | Q1 FY27 OCF 23.103B, CapEx 28.499B, FCF -5.396B; financing-adjusted outlay is different (OBSERVED) |

## gpu

Две даты Ornn из Champion research дают сопоставимые settlements, но не utilization. При повторном чтении live page не превращается в исторический архив. Нет основания заменить UNKNOWN реальной загрузки словом «здоровая».

| Field | Observation / status |
|---|---|
| `matched_prices` | Ornn Oct6 -> Oct7: H100 2.86 -> 2.85; H200 5.04 -> 5.29; B200 7.56 -> 7.56 USD/GPU-hour (ASSESSED) |
| `availability` | UNKNOWN (UNAVAILABLE) |
| `utilization` | UNKNOWN (UNAVAILABLE) |
| `renewals_contract_duration` | UNKNOWN (UNAVAILABLE) |

## financing

Обязательства, гарантии, синдикация, кредитная линия и фактически выданные средства учитываются раздельно. Старые Project Jupiter/power/regulatory задержки не пересчитываются как новые October cancellations. Доступность financing не подтверждает прибыльность конечного спроса.

| Field | Observation / status |
|---|---|
| `OpenAI` | Project Jupiter delay and funding context carried from Sept30; no newly verified broad ROI-led cancellation (ASSESSED) |
| `Anthropic` | Vendor-supported 42B senior / 18B junior reported package; do not double count overlapping facilities (ASSESSED) |
| `CoreWeave` | Aug facility 2.6B, SOFR+5.50%, ~5y debt vs ~3y average contracts; old structure, not Oct new borrowing (ASSESSED) |
| `credit_contracts` | Guarantees/commitments/drawn funds and realized cash are separate; R4 remains level2 (ASSESSED) |
| `capacity_funnel` | ANNOUNCED -> GRID_REQUESTED -> CONTRACTED -> FUNDED -> BUILT -> ENERGIZED -> UTILIZED -> MONETIZED -> PROFITABLE; final-stage comparable panel incomplete (ASSESSED) |
| `project_attrition` | Prior power/regulatory execution delays retained; not a new Oct ROI-led wave (ASSESSED) |

## semiconductors

AMD commentary и AVGO outlook проверяются как будущие заявления. NVDA price/RS присутствует в технике; повторно прочитан последний Q2FY27 primary release: сильные supplier результаты не доказывают ROI покупателей. Q3 guidance остаётся management claim. Oct1 NVIDIA performance claim about up to8x faster token generation adds an efficiency lead, but does not measure matched useful-task cost/energy or prove lower committed-cohort revenue.

| Field | Observation / status |
|---|---|
| `NVDA` | Latest reviewed Q2 FY27: revenue96.221B/DC89.0B, GM75%; Q3 guide108B±2% and GM74%±50bp are MANAGEMENT_CLAIM; supplier profit != buyer ROI (OBSERVED) |
| `AMD` | Supply-expansion CEO commentary in Oct6 recap; future deliveries are not realized output (ASSESSED) |
| `AVGO` | Q3 revenue 29.6B/FCF ~13.7B; Q4 guide ~34.8B/AI ~21.7B is forward claim (ASSESSED) |

## memory

Micron результаты/ASP/bits/инвентарь/контрактинг сохранены. HBM forward contracting является заявлением менеджмента о будущем. Inventory129 вместе с сильными ценами не устанавливает physical glut. Нет сопоставимого cancellation rate и нормализованного mid-cycle earnings ряда.

| Field | Observation / status |
|---|---|
| `MU_results` | FY26 Q4 revenue54.23B/OCF43.97B/NG GM87%; FY26 adjusted FCF62.31B (ASSESSED) |
| `DRAM_NAND_bits_ASP` | DRAM bits mid-single digit, prices high teens; NAND bits ~10%, prices ~30% sequential (ASSESSED) |
| `HBM_contracting` | Management most CY27 HBM contracted with price rises; not realized consumption (ASSESSED) |
| `inventory` | Inventory days129, +9; assess jointly with prices (ASSESSED) |
| `capacity` | Expansion/contracted supply visibility; energized/utilized/profitable cohort panel incomplete (ASSESSED) |
| `cancellations` | UNKNOWN (UNAVAILABLE) |
| `peak_earnings` | Peak-margin risk; current P/E not normalized mid-cycle earnings (ASSESSED) |
| `Cisco_warning` | Financial/capacity mechanisms visible; broad physical 2001 unwind unconfirmed (ASSESSED) |

## roi

Шесть обязательных вопросов сохранены, но отсутствие прямого payback/utilization/revenue-per-MW ряда ограничивает уверенность. Аналогия с Cisco — механизм проверки, не историческая дата падения.

| Field | Observation / status |
|---|---|
| `demand_growth` | YES in supplier contracting/results; not every-project ROI proof (ASSESSED) |
| `monetization_vs_deployment` | MIXED; buyers heterogeneous; comparable sector ratios incomplete (ASSESSED) |
| `payback_lengthening` | INDIRECT WATCH, no broad realized payback time series (ASSESSED) |
| `financing_dependence` | Material vendor/project dependence; access remains open and structured (ASSESSED) |
| `marginal_delays` | Prior power/regulatory delays; no new broad ROI-led wave (ASSESSED) |
| `physical_transmission` | NOT CONFIRMED in reviewed evidence; missing utilization limits inference (ASSESSED) |
| `revenue_per_MW_GPU` | UNKNOWN (UNAVAILABLE) |

## challenger

Frozen R1–R7 weights20/15/15/20/10/10/10; levels1/1/1/2/1/1/1: 10+7.5+7.5+20+5+5+5=60. P1–P4 отдельно. Исходный YAML byte-identical; новые макро/позиционные наблюдения не повышают score.

| Field | Observation / status |
|---|---|
| `score` | 60 (ASSESSED) |
| `state` | ALERT (ASSESSED) |
| `stage` | STAGE_5_PROJECT_ATTRITION (ASSESSED) |
| `R1` | 1 (ASSESSED) |
| `R2` | 1 (ASSESSED) |
| `R3` | 1 (ASSESSED) |
| `R4` | 2 (ASSESSED) |
| `R5` | 1 (ASSESSED) |
| `R6` | 1 (ASSESSED) |
| `R7` | 1 (ASSESSED) |
| `P1` | WATCH (ASSESSED) |
| `P2` | ANTI_REVERSAL (ASSESSED) |
| `P3` | ANTI_REVERSAL (ASSESSED) |
| `P4` | NEUTRAL (ASSESSED) |
| `divergence` | CHALLENGER_EARLY_WARNING (ASSESSED) |

## efficiency

Все пять вопросов обязательны даже при нехватке измерений. Данные tokens/list prices и сильный спрос на память не измеряют cost-per-successful-task, rebound или возврат на конкретную committed capacity.

| Field | Observation / status |
|---|---|
| `task_cost` | UNKNOWN (UNAVAILABLE) |
| `pricing_discipline` | UNKNOWN (UNAVAILABLE) |
| `induced_demand` | UNKNOWN (UNAVAILABLE) |
| `committed_capacity_economics` | UNKNOWN (UNAVAILABLE) |
| `assessment` | INCONCLUSIVE; no efficiency-induced deterioration confirmed; no automatic score adjustment (ASSESSED) |

## macro

Новый диапазон **33–68**, не прежние приблизительные52–62. M1=22: 10Y5.28% на7Oct против4.55% на7Jul (+73bp):14+4+4. M2=11: CPI3.4%, energy16.3%, monthly0.4% и неизменный YoY:3+4+4 по v1. M3=0–20 неизвестен. M4=0–15 при broad-IG fallback, неизвестных3m widening/sector premium. Это логические границы пропущенных inputs, не вероятности. FUNDING_BREAK UNKNOWN; STAGFLATION NO (CPI<3.5); EASING_FAILURE NO (последняя actionHIKE).

| Field | Observation / status |
|---|---|
| `score_range` | {"lower":33,"upper":68} (ASSESSED) |
| `state_range` | ["WATCH","HIGH_STRESS","BREAK_ZONE"] (ASSESSED) |
| `M1` | 22 (ASSESSED) |
| `M2` | 11 (ASSESSED) |
| `M3` | {"lower":0,"upper":20} (ASSESSED) |
| `M4` | {"lower":0,"upper":15} (ASSESSED) |
| `funding_break` | UNKNOWN (UNAVAILABLE) |
| `stagflation_trap` | NO: CPI3.4 <3.5 threshold (ASSESSED) |
| `easing_failure` | NO: latest Fed action HIKE, not easing (ASSESSED) |
| `crb_12m` | UNKNOWN (UNAVAILABLE) |
| `crb_ma260` | UNKNOWN (UNAVAILABLE) |
| `ai_spread_3m` | UNKNOWN (UNAVAILABLE) |

## institutional

Текущий H-state **UNKNOWN / LOW**; Sep23 H1 только исторический контекст. CFTC TFF futures-only 29Sep, опубликован2Oct: Nasdaq net−33,782 (WoW+1,888;4W−15,748;13W+46,162), S&P net−374,007 (WoW+1,609;4W−39,571;13W−11,408). Обе последние недели менее short, четырёхнедельные окна более short. Это не целые hedge-fund books. VIX7Oct16:15ET15.62. OCC September average loan value230.949B, YoY16.8%, MoM≈1.97%; это aggregate lending. Датированные put/call/SKEW/curve и fresh PB aggregates не восстановлены надёжно; нет оснований объявлять H3/H4.

| Field | Observation / status |
|---|---|
| `state` | UNKNOWN (UNAVAILABLE) |
| `confidence` | LOW (ASSESSED) |
| `nasdaq_positions` | {"long":44814,"short":78596,"spreading":10218,"net":-33782,"wow":1888} (OBSERVED) |
| `sp500_positions` | {"long":126466,"short":500473,"spreading":48341,"net":-374007,"wow":1609} (OBSERVED) |
| `cftc_4w13w` | {"nasdaq_4w":-15748,"nasdaq_13w":46162,"sp500_4w":-39571,"sp500_13w":-11408} (ASSESSED) |
| `put_call` | UNKNOWN (UNAVAILABLE) |
| `skew` | UNKNOWN (UNAVAILABLE) |
| `vix` | 15.62 (OBSERVED) |
| `vix_curve` | UNKNOWN (UNAVAILABLE) |
| `prime_broker` | UNKNOWN (UNAVAILABLE) |
| `lending` | {"september_avg_daily_loan_B":230.948833428,"yoy_pct":16.8,"mom_pct":1.967} (OBSERVED) |
| `security_shorts` | [{"ticker":"AMD","change_pct":-4.164,"days_to_cover":2.13},{"ticker":"AMZN","change_pct":-11.543,"days_to_cover":2.77},{"ticker":"AVGO","change_pct":2.914,"days_to_cover":1.7},{"ticker":"CRWV","change_pct":-1.133,"days_to_cover":2.43},{"ticker":"GOOGL","change_pct":12.477,"days_to_cover":3.5},{"ticker":"META","change_pct":7.578,"days_to_cover":1.57},{"ticker":"MSFT","change_pct":-9.543,"days_to_cover":3.73},{"ticker":"MU","change_pct":-6.974,"days_to_cover":1.1},{"ticker":"NVDA","change_pct":-1.366,"days_to_cover":2.55},{"ticker":"ORCL","change_pct":13.997,"days_to_cover":1.36},{"ticker":"QQQ","change_pct":0.124,"days_to_cover":2.24},{"ticker":"SMH","change_pct":-7.053,"days_to_cover":1.88}] (OBSERVED) |
| `forced_deleveraging` | UNKNOWN (UNAVAILABLE) |
| `price_positioning_divergence` | UNKNOWN (UNAVAILABLE) |
| `weekly_delta` | CFTC latest WoW less short in both; 4W more short, 13W mixed; monthly lending +1.97%; H-state change not measurable (ASSESSED) |

## outcomes

2/4/8/12-week reviews остаются PENDING. Исправление не является новым рыночным событием и не создаёт исходного intraday decision. Следующая обязательная проверка пробелов14Oct; runtime нормализация/Asia policy относятся к отдельному review/#72.

| Field | Observation / status |
|---|---|
| `weekly_delta` | Challenger60 unchanged, P4 NEUTRAL; Macro exact range unavailable; Institutional UNKNOWN instead of unverified H1 carry (ASSESSED) |
| `2w4w8w12w` | PENDING: Oct21/Nov4/Dec2/Dec30; append-only outcome capture (ASSESSED) |
| `next_earnings` | Next hyperscaler earnings-cycle review PENDING (ASSESSED) |
| `data_gaps` | All UNAVAILABLE fields listed in this manifest; owner collector/#74/#72; next reviewOct14 (ASSESSED) |

## Что ещё требуется

| Ограничение | Причина / следующее действие |
|---|---|
| Champion numeric/canonical/Asia/leadership | Отсутствуют accepted fresh normalization/Pine bundle/Asia policy и manual leadership event/failed-high context; отдельная нормализация и #72, не выдуманные scores |
| GPU/payback/efficiency | Нет matched cohort realized utilization/renewals/useful-task/revenue-per-MW; собрать disclosures/provider panel с denominator |
| CRB M3 | Не закреплены return variant и frozen Oct7 12m/MA260; Oct8 live значения и CFD не заменяют их |
| AI credit M4/funding flag | Нет той же AI basket3m history и fresh paired debt print/syndication difficulty; Sep23 baseline не новая цена |
| Institutional options/curve/PB | Massive index history NOT_ENTITLED; official date-pinned export не прочитан/страница динамическая; требуется dated primary export, не live backfill |
| Memory cancellations | Prepared remarks30Sep rechecked: no comparable cancellation rate disclosed/captured; absence of mention is not zero |

Полный перечень25 полей, выполненные попытки, owner и next_action находятся в manifest. Выбранный рабочий next_review14Oct не гарантирует публичность частных данных. На текущем доступе canonical score и exact Macro/H-state полностью закрыть нельзя.

## Дополнение short-interest

FINRA settlement15Sep опубликован24Sep, предыдущий settlement31Aug опубликован10Sep. Settlement30Sep выходит9Oct и исключён из среза7Oct. Через Massive доступны12 имён; raw provider tables в Git не добавляются. Ни stock price trend, ни short interest не доказывает манипуляцию/байбек; borrow fee/utilization, short-float denominator и weekly repurchase execution здесь не установлены.

| Ticker | Change short interest 31Aug→15Sep | Days to cover15Sep |
|---|---:|---:|
| AMD | -4.164% | 2.13 |
| AMZN | -11.543% | 2.77 |
| AVGO | 2.914% | 1.7 |
| CRWV | -1.133% | 2.43 |
| GOOGL | 12.477% | 3.5 |
| META | 7.578% | 1.57 |
| MSFT | -9.543% | 3.73 |
| MU | -6.974% | 1.1 |
| NVDA | -1.366% | 2.55 |
| ORCL | 13.997% | 1.36 |
| QQQ | 0.124% | 2.24 |
| SMH | -7.053% | 1.88 |

## Источники и время доступности

- Treasury: [daily nominal yields](https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026); Massive `/fed/v1/treasury-yields` 1Jul..7Oct, date-bounded; latest5.28 и Jul7anchor4.55 cross-checkprimary. Publication intraday not independently archived; only EOD recovery applies.
- Fed: [16Sep statement](https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm), published16Sep; CPI: [11Sep archived release forAugust](https://www.bls.gov/news.release/archives/cpi_09112026.htm),08:30ET. Latest available monthly release, не новые October данные.
- CFTC: [TFF primary current page](https://www.cftc.gov/dea/futures/financial_lf.htm), date-header29Sep, calendar release2Oct; [1Sep comparator](https://www.cftc.gov/sites/default/files/files/dea/cotarchives/2026/futures/financial_lf090126.htm); [30Jun comparator](https://www.cftc.gov/sites/default/files/files/dea/cotarchives/2026/futures/financial_lf063026.htm). Current URL mutable, archive29Sep retrieval failed; extracted research values remain recorded here, not a promise of raw frozen HTML replay.
- Cboe: [dated VIX7Oct16:15ET](https://www.cboe.com/delayed_quotes/_vix/quote_table/); [official options page](https://www.cboe.com/markets/us/options/market-statistics/daily) and [futures settlement page](https://www.cboe.com/markets/us/futures/market-statistics/settlement/futures/daily) attempted. Search snippets/direct reads produced differing/unlabelled daily ratios and mutable curves; excluded rather than picking a plausible print. VIX/SKEW Massive history NOT_ENTITLED; official CSV opens unreadable. [5Oct exchange commentary](https://www.cboe.com/insights/posts/week-of-10-5-2026-equity-markets-remain-resilient-amidst-continued-yield-surge) distinguishes rates-driven IG volatility from lower-quality credit demand; it is not prime-broker positioning.
- OCC: [September report2Oct](https://www.theocc.com/newsroom/views/2026/10-02-september-2026-monthly-volume-report); latest monthly aggregate. [FINRA publication calendar](https://www.finra.org/filing-reporting/regulatory-filing-systems/short-interest); Massive `/stocks/v1/short-interest` settlement15Sep and31Aug, derived changes above. No Sept30 use.
- CRB: [administrator benchmark description](https://www.corecommodityllc.com/CoreIndexes.aspx), [StockQ](https://stockq.org/index/CRB.php); official variant/ticker and Oct7 frozen 12m/260-session data not verified. Current StockQ date8Oct excluded.
- Broad credit: [FRED official ICE series](https://fred.stlouisfed.org/series/BAMLC0A0CM), Oct6 latest permissible at chosen cutoff; Oct7print updated8Oct09:15CDT excluded. Broad IG category maps to0 level points; AI premium/history stillunknown.
- Cash: Microsoft/Amazon/Meta/Alphabet/Oracle primary URLs and dated periods are in the manifest/Champion source register; primary source values rechecked9Oct, not newly published9Oct. Guidance remains management claim.
- [Ornn](https://data.ornn.com/) rechecked9Oct; current page does not provide a frozen historical utilization/task-cost dataset. Oct6/7 settlements have earlier Champion supplement provenance and unproven first availability.

No fresh canonical runtime decision, accepted snapshot replacement, order or threshold/weight change follows.

- NVIDIA primary [Q2FY27 release26Aug](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Second-Quarter-Fiscal-2027/) rechecked9Oct; [Oct1 efficiency claim](https://blogs.nvidia.com/blog/gpus-openai-gpt-6-astra-ultrafast/) is MANAGEMENT_CLAIM, not a cost-per-successful-task experiment. Micron30Sep prepared remarks searched for cancellation evidence; forward tightness claims do not supply a realized rate.

## Leadership numeric recovery

Reconstructed five buyer series plusSPY/SMH through7Oct, 340 aligned sessions each. Price, MA50/200, slopes, high252/drawdown and RS metrics are stored in [numeric panel](../../data/research/leadership/leadership_numeric_panel_2026-10-07_recovered_2026-10-09.json). Rate-limit warnings on the first SPY/SMH attempt were retried successfully after other work. No event classifier/threshold added. Qualitative states remain UNKNOWN until manual failed-high/event-window review.
