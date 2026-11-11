# WTF Viewer — Research & Monitoring Workspace

**Техническое задание / Product and technical specification**  
Version 1.1 · 11 November 2026 · RU / EN  
Product repository: [HelsingN/WTF-Viewer](https://github.com/HelsingN/WTF-Viewer)  
Initial research workspace: AI CapEx Signals · Initial model: Challenger 2.1  
Status: SPECIFICATION_ONLY · Planned implementation · Research only  
Scope of this repository: specification and project documentation; application implementation requires a separate user instruction.

---

# Русская версия

## 1. Цель и границы

Создать **WTF Viewer** — частное двуязычное Sites-приложение для наблюдения за событиями, работы с источниками, проверки гипотез и сопровождения аналитических моделей. Первое рабочее пространство — **AI CapEx Signals**, использующее исследования AI CapEx Reversal и единственную действующую для этого направления числовую модель **Challenger 2.1**. Главный рабочий вопрос: **что подтверждено, что ещё не завершено и какое следующее действие действительно нужно?**

Панель связывает событие → первичный источник → оценку → решение о пересчёте → расчётный артефакт → отчёт → PR → CI на конкретном SHA → ручной PASS → merge. Она должна помогать продолжать работу с сохранённого контекста, не запускать бесконечные повторные исследования.

Challenger остаётся `RESEARCH_ONLY`, `UNCALIBRATED`, `trading_signal=false`, `category=null`. Панель не создаёт торговые сигналы, не меняет Champion и не выполняет операции брокера. Улучшение интерфейса не считается изменением методологии.

**Репозиторий исследования — канонический источник.** Ручная запись панели — рабочая заметка/решение, а не незаметное изменение канонической квалификации. Нельзя автоматически создавать ветки, issue, PR, коммиты, запуски CI, reviews или merge. Для этих действий требуется отдельное явное указание пользователя. Репозиторий `HelsingN/WTF-Viewer` содержит ТЗ и документацию продукта; исходный `HelsingN/AI_CapEx_Reversal` остаётся отдельным каноническим исследовательским репозиторием.

### 1.1 Название и возможность расширения

| Уровень | Название / идентификатор | Назначение |
|---|---|---|
| Продукт | WTF Viewer | Общее имя интерфейса, документации и будущего приложения |
| Репозиторий продукта | `HelsingN/WTF-Viewer` | ТЗ и документация; в будущем — реализация по отдельному указанию |
| Первое рабочее пространство | AI CapEx Signals / `ai-capex-signals` | Первый набор событий, источников, отчётов и проверок |
| Канонический источник исследований | `HelsingN/AI_CapEx_Reversal` | Исследования и зарегистрированные события; не переименовывается |
| Первая модель | Challenger 2.1 | Единственный активный Challenger для AI CapEx Signals |

Название продукта не привязывается к AI, одному сектору или одной модели. Общие сущности — Workspace, Event, Source, Review, Report, Check и ModelRun; специфика Challenger вынесена в контракт первого рабочего пространства. В MVP достаточно одного рабочего пространства, но его `workspace_id` должен сопровождать записи. У каждой модели/расчёта есть `model_id`, `model_version` и `policy_version`. Это подготовка к расширению, а не создание второй экспериментальной модели или разрешение на изменение коэффициентов.

В шапке интерфейса — **WTF Viewer**, рядом — выбранное рабочее пространство **AI CapEx Signals**; Challenger 2.1 показывается как раздел/модель. Статус этого документа — ТЗ. Он не подтверждает готовность, тестирование или публикацию будущего WTF Viewer.

## 2. Подключение исходных исследований

| Объект | Требование |
|---|---|
| Источник | Подключать AI CapEx Reversal только в пределах доступных пользователю прав |
| Исходный срез | Фиксировать repository, branch/ref, commit SHA, cutoff и observed_at при каждом импорте |
| Реестр | Сохранять существующие ID и историю reviews; фактическое число записей читать из источника |
| Итог Challenger | Загружать готовый датированный расчётный артефакт; exact score может быть null |
| Числовые компоненты | Показывать собственные R2/R3/R5/R6/R7 каждого артефакта, без заполнения из прошлых строк |
| Полнота | Импортировать статусы, coverage, freshness и UNKNOWN отдельно от самого результата |
| PR/CI/review/merge | Читать/вводить состояние на конкретную дату и SHA; не фиксировать статусы навсегда в ТЗ |
| Материалы в PR | Всегда отделять proposed/unmerged от канонического main |
| Проверки | Сохранять контекст сделанного и условие возобновления существующей проверки |

Количество событий, распределение QUALIFIED, значения модели и открытые PR не являются константами продукта. Они определяются импортированным срезом. Нельзя подменять последний известный результат новым расчётом, а дату импорта — датой публикации.

До разрешённого импорта рабочее пространство показывает пустое состояние/UNKNOWN. Фикстуры допустимы только в явно помеченном DEMO-режиме. Закрытые исследования, снимки и источники не копируются автоматически в публичный репозиторий WTF-Viewer. Публичность ТЗ не меняет доступ к будущему приложению: пользовательские рабочие записи остаются частными.

Происхождение фактов должно быть проверяемым. Импорт не является независимой повторной проверкой каждой первичной публикации. Истёкший review_by помечает числовой вклад как требующий проверки актуальности; исторический QUALIFIED при этом сохраняется.

## 3. Роли и сценарии

Одна основная роль — владелец/исследователь, который читает доказательства, ведёт проверки, вручную фиксирует решения и проверяет GitHub. Доступ нового сайта — частный, с входом через ChatGPT. Серверные записи привязаны к идентификатору пользователя. Общее редактирование и разграничение командных ролей не входят в первую версию.

Основные сценарии:

1. Найти событие по ID/компании/дате, прочитать первичные ссылки и всю историю оценок.
2. Отдельно увидеть дату публикации и фактического события, точность времени и регистрацию задним числом.
3. Продолжить незавершённую проверку: прочитать, что проверено; увидеть блокер, ответственного, источники, условие возобновления и следующее действие.
4. Создать карточку дневного/недельного отчёта с пустым чек-листом, связать PR и довести его до проверенной полноты.
5. Зафиксировать необходимость нового пересчёта, выполнить его существующим процессом проекта и импортировать самостоятельный расчётный артефакт.
6. Посмотреть CI, review и merge как три разных состояния с привязкой к SHA.
7. Экспортировать рабочее пространство и отфильтрованный реестр; импортировать обновления без создания повторных событий.

## 4. Навигация и представления

| Раздел | Обязательное содержание |
|---|---|
| Обзор | счётчики событий/QUALIFIED/открытых проверок/PR; последний сохранённый интервал и его cutoff; покрытие; блок «подтверждено / не завершено / следующие действия» |
| Реестр | ID, компания/проект, заголовок, HIGH/CRITICAL, первичные ссылки, публикация, факт, исходная и последняя оценка, маршрут фактора, ручной статус и решение о пересчёте |
| Календарь | месяц/день; HIGH/CRITICAL; выбор базы даты; отдельные запланированные записи; переход к карточке события |
| Ежедневные отчёты | отдельный список Daily Close, дата NY-сессии, связанные ID, состояние сверки, карточка контроля |
| Еженедельные отчёты | отдельный список Weekly Watch, cutoff, манифест полноты, расчётные артефакты и ручной контроль |
| Полнота данных | матрица блоков, freshness, UNKNOWN, перечень пробелов, сверка дневного индекса и уникальных ID |
| Проверки | OPEN/IN_PROGRESS/BLOCKED/DONE/CLOSED_FOR_CUTOFF; сохранённый контекст и следующий новый факт |
| Модели → Challenger 2.1 | история отдельных артефактов и R2/R3/R5/R6/R7; интервалы; null вместо выдуманного балла; источники R2 и сроки событий |
| Макроанализ | отдельное внутригрупповое сравнение; каналы совместного эффекта; перекрытия; сценарии; ограничения количественной оценки |
| GitHub | PR, ссылка, head SHA, CI/URL, review/SHA, merge, ручные заметки; неизвестное явно UNKNOWN |
| ТЗ | этот двуязычный документ, планируемые возможности и ограничения |

Глобальные фильтры: весь период / 7 / 30 дней / произвольный диапазон, компания/орган, статус, текстовый поиск. Для реестра и календаря выбирается дата публикации или дата фактического события. Для отчётов применяется дата отчёта; для расчётов — cutoff; для проверок — дата обновления. Неприменимый фильтр не должен молча превращать отсутствие совпадения в утверждение об отсутствии данных. Сброс фильтров всегда доступен. Детальные карточки должны открываться без потери текущего контекста списка.

## 5. Данные, идентичность и происхождение

### 5.1 Event

Общий контекст записи: `workspace_id`; для модельной оценки/расчёта также `model_id`, `model_version`, `policy_version`. Идентичность записи задаётся парой `(workspace_id, canonical_id)`, поэтому импорт не перенумеровывает исходные события и не смешивает разные исследовательские пространства.

Обязательные поля канонической записи первого рабочего пространства: `id`, `event_key`, `title`, `entity`, `priority`, `event_date`, `registered_at`, `source_refs`, `source_precision`, `first_public_at` либо `known_public_by_at`, `registration_mode`, массив `reviews`.

Для AI CapEx Signals ID сохраняет контракт исходного проекта: `EVT-YYYYMMDD-XXXXXXXXXXXX`; X — первые 12 hex SHA-256 от uppercase canonical event_key. Один экономический факт сохраняет один ID при новых статьях и повторных оценках. Смена URL не создаёт событие. Проверка дубликатов: ID/key, затем causal_root_id + effect_id для числовых вкладов; подозрительное совпадение компании/проекта, даты и экономического результата требует ручной сверки. Нельзя заново регистрировать выполненное исследование как новый факт.

План календаря хранит собственный `CAL-...` ID. Он не получает EVT ID и не считается опубликованным событием до появления доказательства. Неизвестная дата факта остаётся неизвестной; дата публикации не подставляется автоматически.

### 5.2 Source

Сохраняются URL, класс `PRIMARY_FACT` / `MANAGEMENT_CLAIM` / `INDEPENDENT_CONFIRMATION`, фактическая дата публикации или консервативная граница доступности, доказательство даты, точность времени и ссылка на материал проекта. Время обнаружения не равно времени первичной публикации. Неизвестную минуту нельзя изобретать.

Внутреннее хранение использует ISO 8601 с часовым поясом. NY-сессия определяется в `America/New_York`, пользовательское расписание — в `Asia/Jerusalem`, с корректным DST. Отображаемая зона указывается явно. В первой версии канонические timestamps показываются с исходным offset/UTC, а планы требуют явно указанной зоны.

### 5.3 Review и ручное решение

Канонический review: решение, фактор/маршрут, причина, проверяющий, reviewed_at, источники, counterevidence, confidence, direction, критерии повторного открытия; при QUALIFIED — signed scored_event и versioned observable_outcome.

Ручное решение панели имеет отдельную метку MANUAL, reviewer, время, обоснование, заметки, next_action, owner, due, ссылку на PR и recalc_decision. Оно сохраняется новой записью истории и не переписывает каноническое review. Исходная оценка остаётся видимой.

### 5.4 Report, Check, Calculation, PullRequest

- Report: тип, период/дата, cutoff, источник/путь, связанные ID, статус полноты, чек-лист, PR и заметки. Наличие файла и полнота — разные поля.
- Check: ID, тема, состояние, проверенные источники, сделанное, блокер, контекст решения, условие возобновления, next_action, owner, due, связанные события/отчёты/PR. Существующая проверка продолжается, а не клонируется.
- Calculation: immutable ID, model_version, as_of, входной snapshot/provenance, core intervals, event adjustments, exact score или null, factor coverage, используемые/исключённые ID, expiry, review status, SHA/артефакт. В первой версии импортируются опубликованные JSON артефакты проекта.
- PullRequest: number, URL, draft/state, head_sha, observed_at, CI conclusion и проверенный SHA/URL, review decision и SHA, unresolved threads, merged_at/merge SHA, ручное подтверждение и заметки. Если поле не прочитано — UNKNOWN, а не PASS.

## 6. Статусы и квалификация

**HIGH/CRITICAL — важность новости; QUALIFIED — пригодность отдельного экономического эффекта для модели.** Одно не подразумевает другое.

| Статус/маршрут | Значение |
|---|---|
| QUALIFIED | доказанный независимый реализованный эффект R3/R5/R6/R7 по политике 2.1 |
| UNKNOWN/PENDING_REVIEW | данные/решение ещё не установлены; нельзя подставлять нейтральное число |
| EARLY_WARNING | предупреждение, окончательное для данного cutoff; числового signed эффекта нет |
| NOT_QUALIFIED_CLOSED | фильтр не пройден; причина, counterevidence и конечные условия повторного открытия сохранены |
| CORE_ONLY | материал относится к R1/R2/R4, не самостоятельному событийному overlay |
| PHYSICAL_ONLY | относится к P1–P4 |
| MACRO_ONLY | макроконтекст; сам по себе не числовой эффект Challenger |
| CONTEXT_ONLY | контекст без самостоятельного числового вклада |
| EXCLUDED_DUPLICATE/OUT_OF_SCOPE | явное исключение с причиной |

Не сводить все не-QUALIFIED маршруты к «исследование провалено». Состояние qualification, completeness, freshness, review и GitHub merge хранить отдельно.

Политика: `OBSERVABLE_EVENT_QUALIFICATION_V2_1`. R3 — сопоставимое изменение реализованной экономики вычислений; R5 — исполненная/обязательная поправка, реальный платёж/недоплата/отмена; R6 — оплаченная введённая мощность/коммерческая остановка/возобновление; R7 — экономически отложенный, отменённый, реструктурированный или возобновлённый **финансируемый** проект с наблюдаемым последствием.

Исследовательские impact tiers сохраняются ±0,5/±1; caps R3=4, R5=3, R6=4, R7=4. Ухудшение положительно, улучшение отрицательно. Полный tier требует отдельного corroborating HTTPS source. MANAGEMENT_CLAIM и LOW confidence сами по себе не создают вклад. Панель не присваивает новые коэффициенты.

## 7. Пересчёт и история без переноса чисел

Переход в QUALIFIED, отмена квалификации, изменение подписанного эффекта или исправление PIT/дубликата требуют решения о новом пересчёте. Статусы действия: UNDECIDED / REQUIRED / NOT_REQUIRED с обоснованием. REQUIRED не означает «посчитано». Ручное QUALIFIED — предложение до канонической проверки и PR-процесса.

Существующий процесс проекта: регистратор `--assess` → `evaluate_challenger_v2()` → immutable recalculation JSON → CI → ручной PASS → merge. Приложение его отслеживает, но не исполняет.

История показывает фактические артефакты на их собственных cutoff, без интерполяции и заполнения пропусков. Новый отчёт стартует с пустым чек-листом и без нового числового результата. Запрещено копировать старый итог и менять дату. R2/R3/R5/R6/R7 отсутствуют — выводить UNKNOWN/null. Нельзя брать midpoint интервала как «точечный балл».

Допускается повторное использование неизменившегося квартального **входного наблюдения**, если источник заново проверен на PIT/срок действия/методическую применимость. Это отмечается `rechecked input`, не «новые данные». Затем итог заново рассчитывается существующим калькулятором. Повторное использование входа и перенос старого результата — разные операции.

Покрытие ядра отдельно от полноты отчёта. R1/R2/R4 остаются в расчёте ядра, даже если в основном представлении выделены R2/R3/R5/R6/R7. Истечение review_by делает вклад устаревшим, не доказывает улучшение и не стирает историческую квалификацию.

## 8. Полнота и конечные проверки

Матрица показывает все блоки последнего манифеста, статусы, freshness, пропуски и ссылку на исходный манифест. UNKNOWN не считается нулём. Сопоставление индекса с реестром проверяет уникальность ID, наличие каждого ID и ожидаемый HIGH/CRITICAL count. Совпавшее количество само по себе не доказывает полноту.

Контрольные пункты нового отчёта:

1. Первичные источники и классы доказательств проверены.
2. Публикация, факт, NY-сессия, cutoff и отсутствие look-ahead проверены.
3. Выполненные исследования, экономические события и эффекты не дублируются.
4. Все HIGH/CRITICAL связаны с ID; индекс и отчёт сверены.
5. Маршруты факторов, независимость и counterevidence проверены.
6. UNKNOWN, freshness и пробелы раскрыты; coverage не подменяет completeness.
7. Новый расчёт сохранён либо указано, почему он не нужен.
8. CI прошёл на актуальном SHA.
9. Человек дал PASS на том же SHA.
10. Merge подтверждён ссылкой и SHA.

В первой версии это ручные подтверждения с пояснениями, а не автоматическая сертификация. COMPLETE блокируется до отметки всех десяти пунктов. Недельный исходный PARTIAL не превращается в COMPLETE от наличия JSON.

Одна конечная проверка на cutoff: последний первичный документ + сопоставимый предшественник + максимум одна целевая независимая проверка существенного противоречия. Затем решение. Неизвестные частные IRR/occupancy не запускают бесконечный цикл. Возобновление требует нового существенного первичного раскрытия, доказанной ошибки или другой конкретной причины. Срок напоминания сам по себе такой причиной не является.

## 9. Относительная сила и макрособытия

Импортированное ранжирование доказательств используется для приоритизации чтения, с постоянной маркировкой источника, версии методики, cutoff и статуса PR/main. Это не калиброванная значимость денег, вероятность разворота или дополнительный балл модели. Пропущенный сопоставимый знаменатель означает UNKNOWN, а не ноль.

Макрособытия сравниваются отдельно между собой при сопоставимых сериях/периодах. Для каждого: ряд, период, фактическое значение, предыдущий/consensus с vintage если проверен, источник, канал, направление, overlap group, ограничения. Не складывать порядковые индексы, CPI/PCE, payrolls/ADP и заголовки как независимые воздействия.

Совместный эффект разбирается по каналам: ставки/кредит, реальный спрос, инфляция/производительность, политика. Для канала указываются anchors, подтверждения, противоречия, неизвестные параметры и наблюдаемый триггер. Показываются базовый, негативный и позитивный сценарии. При отсутствии идентифицируемого размера чистый эффект остаётся качественным UNKNOWN. MACRO_ONLY не создаёт signed event delta.

## 10. Дизайн RU/EN и доступность

Референс — прочитанный текстовый бриф `build_or_kill_project_brief_gsd_gstack_refined.md`. Опубликованный Build or Kill или точные визуальные токены не найдены; нельзя выдавать результат за пиксельную копию.

Заимствуются общие решения: тёмная/нейтральная тема, отчётливо видимый итоговый статус, компактные красивые карточки, простые формы, минимум визуального шума, короткие выводы и раскрываемые подробности. Для аналитической панели используются плотные таблицы, прозрачное происхождение и отдельные состояния неизвестности.

Планируемый визуальный стиль WTF Viewer: угольный фон, мягкие зелёные акценты, янтарный для неполноты, красный для проблем; цвет всегда дополняется текстовой меткой. Моноширинные ID/SHA, явные даты, аккуратная иерархия, боковая навигация, адаптация к телефону. RU/EN переключает интерфейс; оригинальные доказательства, названия документов и цитаты не переводятся с потерей смысла. Канонические коды одинаковы в обоих языках.

Клавиатурный доступ, видимый focus, подписи полей, семантические таблицы с caption и th scope, modal dialog, error/empty/loading/success states, reduced motion. Горизонтальная прокрутка больших таблиц допустима; общая страница на мобильном не должна разъезжаться. Изображения для доказательств и точных графиков не генерируются. График истории показывает отдельные интервалы без фиктивной непрерывности.

Основания: [W3C Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/) и [GitHub Check Runs](https://docs.github.com/en/rest/checks/runs). Последний документ описывает связь проверки с commit/head SHA; принятое проектное правило требует CI и human PASS на текущей ревизии.

## 11. Архитектура и сохранение

Sites/Vinext/React/TypeScript; серверная база D1 для рабочих записей и неизменяемых версий; ChatGPT identity для владельца. Browser storage применяется к языку и несохранённому черновику, а не служит единственным хранилищем исследовательской работы.

Сервер: GET workspace и явный POST save. Проверяются identity, Origin, schema, размер и revision. Каждое сохранение использует optimistic concurrency: несовпавшая ревизия возвращает конфликт, не перезаписывает другую вкладку. Evidence imports и manual reviews append-only; версии содержат действие, дату и полный контекст.

Экспорт: JSON рабочего пространства и CSV отфильтрованного реестра; CSV защищает от spreadsheet-formula injection. Импорт: существующий канонический event registry, готовый calculation JSON либо экспорт панели. Импорт реестра проверяет стабильный ID/key и prefix существующей истории; не создаёт повторных ID и не переписывает старые reviews. Импорт расчёта требует собственного cutoff и компонентов, не заполняет их из прошлого результата. Импортированные вручную данные помечаются как не подтверждённые каноническим main.

Доступны восстановление несохранённого черновика, экспорт перед разрешением конфликта и ручное продолжение. Нет автоматической перезаписи исследовательского репозитория. Новое сохранение/новый источник не приравнивается к merge.

## 12. Этапы и ограничения реализации

**Этап 1 — планируемая рабочая панель WTF Viewer:** датированный исходный снимок main + явно выделенный PR; серверное сохранение ручной работы; весь интерфейс RU/EN; реестр и детали; календарь планов; отчёты/чек-листы; полнота; проверки; история артефактов; макро; GitHub snapshot; экспорт/импорт.

**Этап 2 — отдельное расширение после доступности интеграции:** поддерживаемое live read-only подключение GitHub с явным Refresh, собственными состояниями stale/error и SHA provenance. Каждый источник обновляется независимо. Нельзя выдавать snapshot за live или стирать прошлые данные при ошибке. Автозапись в репозиторий не входит и в этот этап.

Для первого этапа обязателен ручной режим: импорт/экспорт и ручные статусы. Наличие поддерживаемого runtime GitHub connector следует проверить перед отдельным этапом интеграции; live Refresh не считается реализованным по этому ТЗ. Исполнение Python-калькулятора внутри Sites не входит в MVP: вычисления выполняются существующим процессом исследовательского проекта, готовые артефакты импортируются вручную. Чтение main не подтверждает истинность всех первичных источников. Автоматизации AI CapEx Watch/Daily Close/Event Alerts не меняются.

Сохранение ТЗ в WTF-Viewer не запускает реализацию, не переносит ранее созданное приложение и не разрешает его изменение/повторную публикацию. Разработка начинается только по отдельному указанию пользователя. Другие рабочие пространства и модели — возможность будущего расширения; они не входят в обязательную реализацию первого этапа.

## 13. Приёмка

| ID | Проверяемый результат |
|---|---|
| A01 | RU/EN работает без потери выбранного раздела и сохранённых записей |
| A02 | Все события выбранного исходного среза показываются с исходными ID; повторный импорт не увеличивает число |
| A03 | Карточка различает публикацию, known-public-by, факт и регистрацию; точная минута не выдумывается |
| A04 | История канонических и ручных решений сохраняется раздельно |
| A05 | Ручное QUALIFIED/снятие квалификации отмечает REQUIRED, но не создаёт фиктивный расчёт |
| A06 | Новый отчёт получает пустой checklist и не наследует score; дубликат периода открывается для продолжения |
| A07 | COMPLETE невозможно без всех 10 checkpoints |
| A08 | Проверка сохраняет контекст/блокер/next action и восстанавливается после перезагрузки |
| A09 | История включает собственные R2/R3/R5/R6/R7 артефактов; пробелы UNKNOWN; interval не превращается в midpoint |
| A10 | Просроченный review_by видим отдельно от исторической QUALIFIED |
| A11 | Proposed/unmerged PR отделён от main; CI привязан к проверенному SHA; отсутствие human review не показывается как PASS |
| A12 | Макроранги отдельны, совместный эффект не является суммой ordinal scores |
| A13 | Фильтры и CSV соответствуют видимому набору; empty state и сброс доступны |
| A14 | Save/restore, ревизии и конфликты проверены; ошибки не показываются как успех |
| A15 | Нет доступного пути GitHub write/merge из приложения |
| A16 | Для будущей реализации TypeScript/build проходят; desktop/mobile и формы проверены; непроверенные hosted сценарии раскрыты |
| A17 | Бренд WTF Viewer, рабочее пространство AI CapEx Signals и модель Challenger 2.1 явно разделены в интерфейсе и документации |
| A18 | workspace_id изолирует записи; канонические ID сохраняются; добавление будущего пространства не создаёт новую модель Challenger автоматически |

Это критерии будущей приёмки, а не утверждение, что они уже выполнены.

## 14. Репозитории и канонические контракты

- Продукт/ТЗ: [HelsingN/WTF-Viewer](https://github.com/HelsingN/WTF-Viewer).
- Канонические исследования первого рабочего пространства: [HelsingN/AI_CapEx_Reversal](https://github.com/HelsingN/AI_CapEx_Reversal); доступ может требовать авторизации.
- Модель: `Docs/AI_ROI_CHALLENGER_MODEL_v2.md`.
- Политика: `Docs/CHALLENGER_V2_EVENT_POLICY_V2_1.md`.
- Контракт реестра: `Docs/CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md`.
- Реестр: `data/research/events/challenger_v2_event_registry.json`.
- Дневной индекс: `data/research/events/daily_high_critical_index.json`.
- Расчётные артефакты: `data/research/events/recalculations/` и `data/research/weekly/`.

Пути выше относятся к исходному исследовательскому репозиторию. При подключении фиксируется реальный SHA и версия контракта; этот документ не воспроизводит закрытые данные или текущие результаты исследований.

---

# English version

## 1. Purpose and boundaries

Build **WTF Viewer**, a private bilingual Sites workspace for monitoring events, reviewing sources, testing research hypotheses and tracking analytical models. The initial workspace, **AI CapEx Signals**, uses the existing AI CapEx Reversal research and its single active numeric **Challenger 2.1** model. The primary question is: **what is confirmed, what remains unfinished, and what is the next necessary action?**

Connect event → primary evidence → assessment → recalculation decision → calculation artifact → report → PR → commit-specific CI → human PASS → merge. Preserve resumable context and enforce finite research decisions.

Keep `RESEARCH_ONLY`, `UNCALIBRATED`, `trading_signal=false`, `category=null`. Do not alter Champion, create trading signals or operate a broker. UI changes do not change research methodology.

The research repository remains canonical. Desk records are manual work records and proposed decisions. Never automatically create branches, issues, PRs, commits, CI runs, reviews or merges. Research-repository changes require a separate explicit instruction. The product specification and documentation live in `HelsingN/WTF-Viewer`; `HelsingN/AI_CapEx_Reversal` remains the separate canonical research repository.

### 1.1 Naming and extensibility

| Layer | Name / identifier | Purpose |
|---|---|---|
| Product | WTF Viewer | Shared brand for the interface, documentation and future application |
| Product repository | `HelsingN/WTF-Viewer` | Specification/documentation; implementation only after a separate instruction |
| Initial workspace | AI CapEx Signals / `ai-capex-signals` | First set of events, sources, reports and checks |
| Canonical research source | `HelsingN/AI_CapEx_Reversal` | Existing research and registered events; not renamed |
| Initial model | Challenger 2.1 | Sole active Challenger in AI CapEx Signals |

Keep the product name independent of AI, one industry or one model. Shared entities are Workspace, Event, Source, Review, Report, Check and ModelRun; Challenger-specific rules belong to the initial workspace contract. One workspace is sufficient for the MVP, but records must carry `workspace_id`; model assessments/runs also retain `model_id`, `model_version` and `policy_version`. This prepares for extension without creating a second experimental Challenger or changing its coefficients.

The interface header reads **WTF Viewer**, with the selected **AI CapEx Signals** workspace alongside it. Challenger 2.1 is a model/view. This document is a specification, not evidence that the future WTF Viewer has been implemented, tested or published.

## 2. Research onboarding contract

| Object | Requirement |
|---|---|
| Source | Access AI CapEx Reversal only within the user's permissions |
| Imported cutoff | Retain repository, branch/ref, commit SHA, cutoff and observed_at |
| Registry | Preserve existing identities and review history; read actual counts from the source |
| Challenger result | Import a distinct dated artifact; exact score may be null |
| Components | Display each artifact's own R2/R3/R5/R6/R7; never fill from previous rows |
| Completeness | Retain status, coverage, freshness and UNKNOWN independently of the result |
| PR/CI/review/merge | Capture state at a specific time/SHA; do not freeze current PR states in this specification |
| Proposed PR material | Always separate proposed/unmerged from canonical main |
| Checks | Preserve existing completed work, context and reopening conditions |

Event counts, QUALIFIED distributions, model values and open PR numbers are not product constants. They come from the imported cutoff. A last-known result is not a new calculation; import time is not publication time.

Before an authorized import, show empty/UNKNOWN states. Fixtures are allowed only in an explicitly labelled DEMO mode. Do not automatically copy private research, snapshots or sources into the public WTF-Viewer repository. Public documentation does not make the future application public: user workspace records remain private.

Every fact needs inspectable provenance. Importing does not independently reverify all primary sources. Expired review_by marks current numeric eligibility as requiring a freshness check while preserving historical QUALIFIED.

## 3. User and core flows

The owner/researcher reads evidence, resumes checks, records manual decisions and verifies GitHub progress. The new Site is private with ChatGPT sign-in; server records are scoped by authenticated user ID. Team collaboration and role administration are outside v1.

Core flows: find an event by identity/entity/date; inspect sources and review history; distinguish publication from occurrence; resume a check with its blocker and reopening condition; create a report card with an empty checklist; decide whether recalculation is needed; import a separately generated artifact; inspect SHA-specific CI/review/merge; export and merge workspace updates without duplicates.

## 4. Views and navigation

| View | Required contents |
|---|---|
| Overview | counts; latest saved interval and cutoff; coverage; confirmed/unfinished/next-actions board |
| Event registry | stable identity; entity/title; priority; sources; publication/occurrence; initial/latest assessment; factor route; manual status; recalculation decision |
| Calendar | month/day; HIGH/CRITICAL; publication vs occurrence basis; separate planned entries; event detail |
| Daily reports | Daily Close list; New York session; event IDs; reconciliation and checklist |
| Weekly reports | Weekly Watch list; cutoff; coverage manifest; calculation artifacts and manual controls |
| Completeness | block status/freshness/missing data; daily-index-to-registry reconciliation |
| Open checks | OPEN/IN_PROGRESS/BLOCKED/DONE/CLOSED_FOR_CUTOFF; saved context and next material fact |
| Models → Challenger 2.1 | distinct artifact history; R2/R3/R5/R6/R7; intervals and null exact score; R2 sources; event expiry |
| Macro | separate within-family ranks; combined channels; overlap; scenarios and magnitude limitations |
| GitHub | PR URL/head SHA; CI/review/merge separately; unknown fields; manual notes |
| Specification | bilingual specification and implementation boundaries |

Global filters: all time, last 7/30 days, custom range, entity, status, full-text search. Event and calendar dates use the selected publication/occurrence basis; reports use report date, calculations use cutoff, checks use update date. Explain inapplicable filter semantics. Always provide reset and an explicit empty state. Detail views preserve list context.

## 5. Data and provenance

### Event and identity

Shared context is `workspace_id`; model assessments/runs also carry `model_id`, `model_version` and `policy_version`. Use `(workspace_id, canonical_id)` as identity, preserving source event IDs without mixing research spaces.

Initial-workspace canonical fields: `id`, `event_key`, `title`, `entity`, `priority`, `event_date`, `registered_at`, `source_refs`, `source_precision`, `first_public_at` or `known_public_by_at`, `registration_mode`, append-only `reviews`.

For AI CapEx Signals, preserve the source project contract `EVT-YYYYMMDD-XXXXXXXXXXXX`: the first 12 hexadecimal SHA-256 characters of the uppercase canonical event_key. New articles and reviews of one occurrence retain one ID. Deduplicate identity/key and numeric causal_root_id + effect_id; flag suspicious entity/project/date/economic-outcome matches. Do not re-register completed research as a new fact.

Calendar plans use `CAL-...`, not EVT identity, and do not count as registered published events. Unknown occurrence dates remain unknown; never fill them from publication dates.

### Sources and time

Keep URL, PRIMARY_FACT/MANAGEMENT_CLAIM/INDEPENDENT_CONFIRMATION, original publication or conservative known-public-by bound, publication proof, precision and repository references. Discovery time is not publication time. Never invent the original minute.

Store ISO 8601 with offsets. Use America/New_York for US sessions and Asia/Jerusalem for user schedules, respecting DST. Display zones explicitly. V1 preserves source offsets/UTC and requires a named zone for planned times.

### Reviews and workspace records

Canonical reviews retain decision, factor/route, rationale, reviewer/time, evidence, counterevidence, confidence, direction, reopening criteria and, when qualified, scored_event/observable_outcome.

Manual desk decisions have separate MANUAL provenance, reviewer/time, rationale, notes, next action, owner/due, PR URL and recalculation decision. Append history; do not overwrite canonical qualification or hide the initial assessment.

Report records separate file presence from completeness and track type/date/cutoff, source, linked IDs, checklist, PR and notes. Check records retain completed work, sources, blocker, context, reopening trigger, owner/due and next action. Continue existing work instead of cloning it.

Calculation records retain their own immutable identity, model/cutoff, input provenance, core intervals, signed adjustments, exact score or null, coverage, included/excluded event IDs, expiry/review and artifact SHA. PR records separately track state/draft/head SHA, observed time, CI SHA/URL, review SHA/decision/threads, merge SHA/time and manual attestations. Uninspected fields are UNKNOWN, never PASS.

## 6. Qualification semantics

**HIGH/CRITICAL is news priority. QUALIFIED is model eligibility of a distinct realized economic effect.**

| Status/route | Meaning |
|---|---|
| QUALIFIED | independently evidenced realized R3/R5/R6/R7 effect under policy 2.1 |
| UNKNOWN/PENDING_REVIEW | evidence or decision unresolved; do not impute neutral numbers |
| EARLY_WARNING | warning final for the current cutoff, without a signed numeric adjustment |
| NOT_QUALIFIED_CLOSED | failed eligibility with rationale, counterevidence and finite reopening criteria |
| CORE_ONLY | R1/R2/R4 material, not a distinct event overlay |
| PHYSICAL_ONLY | P1–P4 evidence |
| MACRO_ONLY | macro context, not a signed Challenger effect |
| CONTEXT_ONLY | context without independent numeric effect |
| EXCLUDED_DUPLICATE/OUT_OF_SCOPE | explicit exclusion with rationale |

Do not label every non-qualified route as failed research. Qualification, completeness, freshness, human review and merge are separate dimensions.

Apply `OBSERVABLE_EVENT_QUALIFICATION_V2_1`: R3 comparable realized compute economics; R5 implemented/enforceable amendments, actual payments/shortfalls/cancellations; R6 paid commissioned capacity/commercial interruption/restart; R7 economically deferred/cancelled/restructured/resumed **funded** projects with observed consequences.

Preserve ±0.5/±1 research impact tiers and caps R3=4, R5=3, R6=4, R7=4. Deterioration is positive; improvement negative. A full tier needs separate HTTPS corroboration. A MANAGEMENT_CLAIM or LOW confidence alone does not create a contribution. The desk does not introduce coefficients.

## 7. Recalculation and no score carry-forward

Qualification, withdrawal, signed-effect corrections and PIT/duplicate corrections require a recalculation decision. Use UNDECIDED/REQUIRED/NOT_REQUIRED with rationale. REQUIRED does not mean computed. Manual QUALIFIED remains a proposed assessment until the canonical review/PR process.

Track the existing registrar `--assess` → `evaluate_challenger_v2()` → immutable recalculation JSON → CI → human PASS → merge. Do not execute it from the desk.

Display only distinct artifacts at their own cutoffs, without interpolation or gap filling. A new report has an empty checklist and no new score. Never copy an old result and replace its date. Missing R2/R3/R5/R6/R7 remain UNKNOWN/null. Never present an interval midpoint as an exact score.

An unchanged quarterly **input observation** may remain usable after a documented PIT/expiry/method recheck. Label it rechecked input, not new data; recompute the output through the existing calculator. Input reuse is different from output carry-forward.

Core coverage is separate from report completeness. R1/R2/R4 remain in the core even where the main history highlights R2/R3/R5/R6/R7. Expired review-by makes a contribution stale; it neither proves improvement nor deletes historical qualification.

## 8. Completeness and finite research

Show the latest coverage blocks, status, freshness, gaps and manifest provenance. UNKNOWN is not zero. Reconcile index event identities, ID existence, uniqueness and expected HIGH/CRITICAL counts. Matching counts alone do not establish completeness.

New-report checkpoints:

1. Primary sources and evidence classes verified.
2. Publication/occurrence/session/cutoff separated; no look-ahead.
3. No duplicate research, occurrence or economic effect.
4. All HIGH/CRITICAL linked to registry IDs; report/index reconciled.
5. Factors, independence and counterevidence reviewed.
6. UNKNOWN/freshness/gaps disclosed; coverage not substituted for completeness.
7. New calculation saved or non-recalculation justified.
8. CI passed on current SHA.
9. Human PASS on that SHA.
10. Merge verified by URL and SHA.

V1 checkpoints are manual attestations supported by notes, not automatic certification. Block COMPLETE until all ten are checked. A PARTIAL source manifest does not become COMPLETE merely because JSON exists.

Use one bounded assessment: latest primary document, comparable predecessor and at most one targeted independent contradiction check. Then decide. Missing private IRR or occupancy must not restart an infinite audit. Reopen on genuinely new material primary evidence or a proven error, not a calendar date alone.

## 9. Evidence strength and macro combination

Imported evidence-link ranks support reading priority, retaining source, method version, cutoff and PR/main status. They are not calibrated financial magnitude, reversal probability or a new model score. An unavailable comparable denominator means UNKNOWN, not zero.

Compare macro events separately, using comparable series and periods where possible. Retain series/period/actual/prior/verified consensus-vintage/source/channel/direction/overlap/limitations. Never add ordinal ranks, CPI/PCE, payrolls/ADP or headlines as independent shocks.

Combine qualitatively by rates/credit, real demand, inflation/productivity and policy. Each channel identifies anchors, corroboration, contradictions, missing parameters and a future observable trigger. Include base/downside/upside scenarios. Keep net magnitude UNKNOWN when unidentified. MACRO_ONLY does not create signed event delta.

## 10. Design, language and accessibility

Use the read written reference `build_or_kill_project_brief_gsd_gstack_refined.md`. No published Build or Kill visual reference or exact tokens were available; do not claim pixel fidelity.

Adopt a dark/neutral theme, prominent final states, polished compact cards, simple forms, concise conclusions and progressive detail. Adapt to analytical work with dense accessible tables, transparent provenance and explicit unknown states.

The planned WTF Viewer visual system uses charcoal backgrounds, soft green accents, amber incompleteness and muted red issues, always with text labels. Monospaced IDs/SHAs, explicit dates, clear hierarchy, sidebar and responsive mobile layouts. RU/EN switches interface labels; preserve original evidence wording and canonical codes.

Require keyboard access, visible focus, field labels, semantic tables/captions/scoped headers, modal dialogs, loading/empty/error/success states and reduced motion. Large tables may scroll horizontally without overflowing the whole mobile page. Do not generate evidence imagery or imprecise data charts. Artifact intervals are separate marks without invented continuity.

References: [W3C accessible tables](https://www.w3.org/WAI/tutorials/tables/) and [GitHub commit-specific checks](https://docs.github.com/en/rest/checks/runs). The project's governance additionally requires current-SHA CI and human PASS.

## 11. Architecture and persistence

Sites/Vinext/React/TypeScript; server-side D1 for workspace records and immutable versions; ChatGPT identity for user scoping. Browser storage holds language and unsaved recovery drafts, not the sole durable research record.

Expose GET workspace and explicit POST save. Validate identity, Origin, schema, payload size and revision. Use optimistic concurrency; return conflicts without overwriting other tabs. Evidence imports and manual reviews are append-only; versions retain action, time and complete context.

Export workspace JSON and filtered event CSV with spreadsheet-formula protection. Import canonical registry JSON, completed calculation JSON or a desk export. Validate stable IDs/keys and existing review prefixes; do not duplicate identities or rewrite old reviews. Require a calculation's own cutoff and components; never fill them from prior results. Mark manual imports as unverified against canonical main.

Support draft recovery, export before conflict resolution and manual continuation. Saving a record or receiving a new source does not imply GitHub merge.

## 12. Phases and implementation limits

**Phase 1 — planned WTF Viewer implementation:** pinned main snapshot plus explicitly proposed PR material; server-persisted manual work; RU/EN interface; registry/details; planned-event calendar; daily/weekly report cards and checkpoints; completeness; resumable checks; artifact history; macro view; GitHub snapshot; import/export.

**Phase 2, a separate extension:** supported runtime read-only GitHub integration when available, with explicit Refresh, independent source errors/staleness and SHA provenance. Do not represent snapshots as live or clear retained evidence after refresh failure. Repository auto-writes remain excluded.

Phase 1 must support manual import/export and manual status tracking. Verify supported Sites runtime GitHub connector eligibility before a separate integration phase; this specification does not establish live Refresh as implemented. Running the Python calculator in Sites is outside the MVP: use the existing research pipeline and import resulting artifacts. Reading main does not independently certify all imported economic facts. Existing scheduled AI CapEx Watch, Daily Close and Event Alerts remain unchanged.

Saving this specification into WTF-Viewer does not start implementation, transfer the previously created application or authorize its modification/republication. Implementation requires a separate user instruction. Additional workspaces/models are future extension options, outside the mandatory first-phase scope.

## 13. Acceptance criteria

| ID | Expected result |
|---|---|
| A01 | RU/EN preserves the current view and saved records |
| A02 | All events in the selected source cutoff retain their IDs; duplicate registry import adds zero events |
| A03 | Publication, public-by, occurrence and registration remain distinct; no invented precision |
| A04 | Canonical and manual review histories remain separate |
| A05 | Manual qualification/withdrawal marks recalculation REQUIRED without fabricating an artifact |
| A06 | New report has empty checkpoints/no inherited score; duplicate periods resume existing work |
| A07 | COMPLETE is blocked without all ten checkpoints |
| A08 | Check context/blocker/next action survive reload |
| A09 | History uses artifact-specific components; missing values UNKNOWN; no midpoint substitution |
| A10 | Expired review-by remains visible independently of historical QUALIFIED |
| A11 | Proposed/unmerged PRs remain separate from main; CI bound to inspected SHA; no human review is not PASS |
| A12 | Macro ranks separate; combined effect does not sum ordinal scores |
| A13 | Filters/CSV match visible data; reset and empty state work |
| A14 | Save/recovery/revisions/conflicts verified; errors never shown as success |
| A15 | No application path writes or merges into the research repository |
| A16 | Future implementation passes TypeScript/build; desktop/mobile/forms inspected; untested hosted flows explicitly disclosed |
| A17 | WTF Viewer brand, AI CapEx Signals workspace and Challenger 2.1 model are distinguished in UI/documentation |
| A18 | workspace_id isolates records; canonical IDs survive; future workspaces do not automatically create another Challenger |

These are future acceptance criteria, not assertions of completed validation.

Product/research repositories and canonical source-contract paths are listed in Russian section 14 and apply equally to this English specification. Resolve and record actual source SHA/version when onboarding; do not embed private snapshots in the public product repository.