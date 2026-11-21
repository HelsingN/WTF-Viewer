# WTF Viewer — Research & Monitoring Workspace
**Техническое задание / Product and technical specification**  
Version 1.2 · Scope revision: 21 November 2026 · RU / EN  
Status: PROTOTYPE_IMPORTED · PHASE_1_RESCOPED · Migration and acceptance pending  
Product: HelsingN/WTF-Viewer · Workspace: AI CapEx Signals · Model: Challenger 2.1

# Русская версия

## 1. Назначение и границы первой версии

Первая версия v1.2 показывает исследования Challenger, ежедневные и еженедельные отчёты, происхождение данных и рабочие статусы; выполняет детерминированный пересчёт по загруженным проверенным входам. Основной вопрос: что опубликовано, что подтверждено данными, чего не хватает и какой результат даёт действующая модель на выбранном срезе?

Редактор заметок, подготовка текста отчётов, самостоятельная квалификация событий, помощь в принятии исследовательских решений, серверный журнал ручных изменений и запись в GitHub из интерфейса — последующие версии после авторизации и проверки прав. Ручные действия владельца через GitHub/агента/CLI не являются разрешением приложению автоматически писать в репозиторий.

Пересмотр назначения согласован в [решениях 1.1–1.4](PHASE1_SCOPE_DECISIONS_RU.md). Он заменяет прежнее требование сначала строить полноценное редактируемое workspace с D1-миграцией. Исходный прототип и существующие записи сохраняются; новый пользовательский редактор не является условием первого выпуска.

Сохраняются RESEARCH_ONLY, UNCALIBRATED, trading_signal=false, category=null. Интерфейс и перенос вычислительного ядра не меняют коэффициенты, caps, decay, политику, когорту, методологию или Champion. Исследовательские решения не выводятся автоматически из факта появления статьи.

### 1.1. Название и доступ

Постоянная иерархия: **WTF Viewer → AI CapEx Signals → Challenger 2.1**. Название существующей публикации «AI CapEx Reversal · Research Desk» и AI CAPEX в PNG не заменяют бренд продукта.

Текущий Site уже использует закрытый доступ и ChatGPT identity. Не менять аудиторию, не отключать существующую авторизацию и не удалять D1/черновики в рамках первой версии. Позже добавить редакторские полномочия и авторизацию операций записи; наличие login само по себе не разрешает публикацию. Идентификаторы workspace/model поддерживаются в пакетах; миграция owner/workspace записей D1 отложена до редакторского этапа.

## 2. Основной источник и граница переноса

После проверенной миграции **GitHub HelsingN/WTF-Viewer становится основным источником исследований Challenger и daily/weekly отчётов**. AI_CapEx_Reversal сохраняет архив исходной истории этой области. До миграционной сверки источник остаётся исходным; не маркировать неполную копию Viewer как завершённый перенос.

Перенос охватывает модель и политику, контракты, наблюдения/eligibility/источники, реестр/reviews, расчётные артефакты, полные тексты отчётов, приложения/индексы/манифесты и связанные материалы, необходимые для их понимания и воспроизведения. Proposed/unmerged материалы отделяются от принятого main. Прочие области исходного проекта автоматически не переносятся.

Manifest переноса фиксирует source repository/ref/commit/path/blob SHA, target path/hash, ID/type/даты/cutoff, происхождение main/PR/manual и состояние проверки. Для отчётов хранится полный текст, а не только карточка. Исходные файлы сохраняются побайтово; mapping разрешает перенесённые внутренние ссылки без скрытого редактирования исторических документов.

Предлагаемая структура цели: research/challenger/{model,policy,contracts,inputs,sources,events,calculations,reference-python}/ и research/reports/{daily,weekly,attachments}/, плюс версионированные manifest/index. Точные пути фиксируются на этапе инвентаризации. Старые source paths сохраняются как metadata; перестановка каталогов не меняет canonical IDs и даты.

Перед cutover сравнить все элементы manifest, hashes, ID, reviews, ссылки, приложения и полноту; записать migration ID, дату и target commit. Новый пакет после cutover строится из WTF-Viewer и сохраняет origin старых материалов. Историю исходного проекта не удалять и его GitHub archive setting не менять автоматически. Переход автоматизаций планируется отдельно, без двух независимых активных версий.

## 3. Первая версия: обновление и синхронизация GitHub

Ручной цикл: владелец обновляет файлы в GitHub WTF-Viewer → сборщик берёт конкретный commit и создаёт согласованный пакет → пользователь импортирует пакет в Viewer. Это первая версия синхронизации по GitHub-ревизии, не live API и не автоматическая двусторонняя запись.

| Объект | Контракт |
| --- | --- |
| Пакет | schema_version, workspace_id, model_id, model/policy/cohort/code versions, repository/ref/commit, cutoff, observed_at, input hash и manifest |
| Отчёт | ID/type/дата/период, Markdown-текст, вложения или явное отсутствие, source/target paths, hash, ссылки на события/артефакты, статус/происхождение |
| Исследование | полный материал и связи с политикой/источниками/моделью; поиск и доступ к соответствующему GitHub-файлу |
| Импорт | предпросмотр состава/версии/пробелов; валидация ID/key/hash/schema/versions/истории; identical input — no-op |
| Ошибка | предыдущий корректный набор остаётся доступным; missing block не означает удаление старых записей |
| Частичный пакет | явно PARTIAL; отсутствующие документы/вложения перечислены; неполный миграционный пакет не завершает cutover |
| Происхождение | дата факта, публикация/public-by, регистрация, cutoff, import time и evaluation time не смешиваются |

Для первой версии допустим комплект файлов/zip с локальными payload/Markdown/manifest. Встроенный пакет публикации обеспечивает открытие после reload. Ручной выбор файла не означает запись в GitHub или облачную синхронизацию; повторное открытие локального пакета после reload либо его device-local кэш показывать явно. Не выдавать device-local состояние за сохранение между устройствами.

Сохранённый серверный пакет/обновление версии публикации и пользовательский локальный preview различаются по метке и SHA. Нельзя молча подмешивать старый seed в новый неполный пакет. Существующие export/registry/calculation envelopes поддерживаются адаптером или выдаётся явное объяснение неприменимости.

Следующий этап добавит автоматическую сборку пакетов и доставку сайта, поддерживаемый read-only Refresh, проверки актуальности и ошибки сети. Двусторонняя редакторская синхронизация возможна позже с правами, конфликтами и review. Секреты GitHub не помещаются в клиент.

## 4. Пересчёт Challenger по запросу

Обязательна кнопка «Пересчитать Challenger» и повторное вычисление/проверка кэша при обновлении страницы. Пересчёт выполняется по принятому структурированному входу; чтение Markdown не является автоматическим экономическим исследованием.

Реализация первой версии: чистое вычислительное ядро в браузере, перенесённое из зафиксированного Python-эталона с численным контролем совместимости. Не объявлять существующий Worker исполнителем Python. Reference Python, policy validation, контрольные входы и expected outputs хранятся с provenance. Самостоятельная новая модель не создаётся.

Вход: reviewed snapshot, когорта, принятые core observations, signed event ledger, policy и явный evaluation_as_of. Package builder подготавливает эти входы из существующих принятых материалов. Отчётов без структурированных наблюдений недостаточно; UI показывает конкретную причину отказа. При допустимой неполноте модель возвращает собственные границы и UNKNOWN, без подстановки прошлых факторов или midpoint.

Ключ расчёта: hash нормализованного входа + model/code/policy versions + evaluation_as_of. Повторный refresh не создаёт новые отчёты/события/артефакты в репозитории. По умолчанию as_of берётся из пакета; новая дата выбирается явно. «На текущую дату» не делает источники свежими, не снимает review_by/expiry и не заполняет недостающие наблюдения. evaluated_at отдельно от as_of.

Результат LOCAL/UNPUBLISHED показывается отдельно от последнего опубликованного артефакта. Он содержит входной hash, версии, as_of, исключения/полноту и историю происхождения. Download JSON допускает ручное добавление результата в GitHub; это не автоматическая публикация, не квалификация и не human PASS.

До выпуска обязательна parity-проверка против Python по decimal-арифметике/округлению, весам/caps/decay, датам/PIT/expiry, qualification gates, неизвестным/неполным значениям и отказам. Не использовать датированный one-off скрипт как универсальный API. Ошибка расчёта не заменяет последний корректный результат и не выглядит как успех.

## 5. Представления и рабочие статусы

| Раздел | Первая версия |
| --- | --- |
| Обзор | выбранный пакет/SHA/cutoff; последний опубликованный Challenger и отдельный локальный результат; полнота и опубликованные незавершённые проверки |
| Исследования | список/поиск полных материалов, Markdown-просмотр, источники, даты, связи, ссылка на target GitHub file/version |
| Ежедневные отчёты | самостоятельный список по NY-session/дате, полный текст, приложения, полнота и рабочий статус из пакета |
| Еженедельные отчёты | самостоятельный список, cutoff, полный текст/манифест, связанные входы и расчёты |
| Реестр и календарь | исходные ID, публикация/public-by/факт/регистрация, фильтры, qualified/route/direction, исходная и последняя оценка, источники |
| Challenger 2.1 | версия модели/политики, входы, опубликованные интервалы и R2/R3/R5/R6/R7 каждого артефакта; запрос вычисления и объяснение недостаточности данных |
| Полнота/проверки | статусы из GitHub-пакета, недостающие документы/данные, датированный next_action/контекст; без создания новых сайтовых заметок |
| Макро | имеющиеся отдельные и совокупные оценки с provenance/overlap; ранги не суммируются |
| Источник GitHub | target repository/ref/SHA, origin при переносе, ссылки на файлы; PR/CI/review/merge только как явно датированный импортированный контекст |
| Документация | назначение версии, импорт/обновление, ограничения и различия локального/опубликованного результата |

Все счётчики читаются из выбранного набора, а не задаются числами PNG/seed. Фильтры раздела учитывают подходящую дату, reset доступен; карточка сохраняет контекст списка. CSV отражает видимый реестр и защищён от формул. Неприменимые фильтры не создают ложное «данных нет».

HIGH/CRITICAL — важность; QUALIFIED — пригодность эффекта, не положительное направление. CORE_ONLY/MACRO_ONLY/PHYSICAL_ONLY/CONTEXT_ONLY/EARLY_WARNING и исторические статусы не подменяются. Отсутствие human review не означает PASS. Наличие отчёта, полнота исходных источников и статус проверки — отдельные поля. В первой версии эти значения читаются из источника; изменение ручной квалификации/COMPLETE/checklist из сайта отложено.

## 6. Данные, идентичность и достоверность

Идентичность — (workspace_id, canonical_id). Исходные EVT IDs/event_key, reviews, causal_root_id/effect_id и история сохраняются. CAL-планы отдельно от фактических событий. URL или новый документ не создают второй экономический факт.

Первичные источники имеют class, URL и доступность с proof/precision; публикация не подставляется вместо неизвестной даты факта. Хранение ISO 8601 с offset; NY-session — America/New_York, пользовательская зона — Asia/Jerusalem, DST и границы дней проверяются.

Каждый расчёт сохраняет свои model_version/cohort/schema/policy metadata и core/event inputs. UI display «2.1» не переписывает исторические идентификаторы. Core R1/R2/R4 и signed R3/R5/R6/R7 сохраняют исходные правила. UNKNOWN/null/невалидные числа и отсутствие фактора различаются; предыдущий результат не заполняет пробел.

Main/PR/manual, historical QUALIFIED и текущая пригодность вклада/freshness различаются. Совокупное макро не складывает ordinal ranks и не превращается автоматически в signed delta. Текстовые материалы и источники должны быть доступны для проверки; число без provenance недостаточно.

## 7. Редизайн и доступность

Редизайн D0–D3 остаётся частью единого выпуска v1.2; подробности — [дизайн-приложение](design/WTF_viewer_design_plan_RU.md), [PNG](design/research-desk-overview-2026-11-21.png). D0 подготавливается до основных визуальных изменений; оформление reader/import/calculation/report screens входит в D1, общий RU/EN/adaptive охват — D2, итоговая проверка — D3.

Почти чёрные нейтральные поверхности, белый текст, фиолетовые действия/выбор. Зелёный — QUALIFIED/завершено, янтарный — HIGH/неполнота, красный — CRITICAL/ошибка, нейтральный — UNKNOWN. Цвет сопровождается текстом/значком; локальный расчёт не выглядит опубликованным. Не добавлять редакторы отчётов/заметок в первую версию ради совпадения с PNG; «Новый отчёт» из концепции относится к последующим редакторским возможностям.

Body от 16px; важные таблицы/статусы/даты от 14px, второстепенные metadata 12–13px, rem и tabular-nums. Текст ≥4.5:1, крупный ≥3:1; необходимые визуальные признаки controls/graphics ≥3:1 к соседним цветам в применимых случаях. Крупный текст — от 24 CSS px regular либо 18.67 CSS px bold; основной текст 7:1 — желательная цель. Измерять CSS-цвета, не PNG.

Клавиатура/focus, семантические таблицы, подписи, modal, reduced motion, loading/empty/error/success, длинные RU/EN строки; 1440/1280/768/390px и 200% zoom; отсутствие перекрытий и общего горизонтального overflow. Генерируемый UI-макет допустим как иллюстрация, не первичное доказательство и не точный график данных.

## 8. Последующие версии

1. Автоматическая сборка/обновление data packages из GitHub WTF-Viewer, доставка/обновление публикации, поддерживаемый runtime read-only Refresh с cache/stale/error/provenance.
2. Авторизация редакторских действий, owner/workspace storage, сохранение/восстановление заметок и конфликтов, подготовка отчётов, ручной checklist и решения с audit history.
3. Разрешённая запись/синхронизация в GitHub WTF-Viewer через review/PR и явное действие; ограничения прав и защиты секретов. Автоматический merge/review не подразумевается.

Это расширения, а не условия выпуска первой версии. Существующие D1/identity не удаляются, но их развитие и полная приёмка write-сценариев не блокируют reader/calculator. Расписания AI CapEx Watch/Daily Close/Event Alerts не меняются этим документом.

## 9. Приёмка первой версии

Обязательны B01–B10 и применимые D01–D06, перечисленные в [реестре](ACCEPTANCE_TRACKER.md): проверенный перенос/cutover, полные исследования/отчёты, ручная GitHub-ревизионная синхронизация, безопасный импорт, воспроизводимый расчёт и reload/cache, parity с Python, честные UNKNOWN/provenance, сохранение доступа/старых записей и полноценный RU/EN reader.

Исходные A01–A18 сохраняют прежние значения как backlog полной рабочей панели; их перенос в позднюю версию явно отмечен в реестре, не считается VERIFIED. Уже имеющиеся partial evidence остаются историческими. Не требовать deferred editor/D1 migration для принятия reader, но не отключать существующие защитные механизмы.

## 10. Исходные критерии полной панели A01–A18

Следующая таблица сохранена для преемственности; она не означает, что все эти write-сценарии входят в первую версию. Применимость и текущие статусы находятся в едином реестре.

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
| A16 | Для целевой версии TypeScript/build проходят; desktop/mobile и формы проверены; непроверенные hosted сценарии раскрыты |
| A17 | Бренд WTF Viewer, рабочее пространство AI CapEx Signals и модель Challenger 2.1 явно разделены в интерфейсе и документации |
| A18 | workspace_id изолирует записи; канонические ID сохраняются; добавление будущего пространства не создаёт новую модель Challenger автоматически |

## 11. Источники и исполнение

Репозиторий продукта и будущий основной источник: [HelsingN/WTF-Viewer](https://github.com/HelsingN/WTF-Viewer). Исходная история: [HelsingN/AI_CapEx_Reversal](https://github.com/HelsingN/AI_CapEx_Reversal).

Исходные пути: Docs/AI_ROI_CHALLENGER_MODEL_v2.md; Docs/CHALLENGER_V2_EVENT_POLICY_V2_1.md; Docs/CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md; data/research/events/challenger_v2_event_registry.json; data/research/events/daily_high_critical_index.json; data/research/challenger/; data/research/events/recalculations/; data/research/weekly/; Docs/research/AI_CAPEX_DAILY_CLOSE_*.md и AI_CAPEX_WEEKLY_WATCH_*.md. Перенесённые target paths определяются manifest, исходные пути не обозначают постоянную live-зависимость.

Эталон: src/scoring/challenger_v2.py и его policy/dependencies/tests; scripts/research/evaluate_challenger_v2.py — read-only CLI. Фиксированный one-off не заменяет универсальную функцию. Точные source SHA и наблюдения — в [решениях](PHASE1_SCOPE_DECISIONS_RU.md); исходный baseline сохраняется как исторический.

[Единый план](UPDATE_PLAN_RU.md), [baseline](IMPLEMENTATION_BASELINE.md), [приёмка](ACCEPTANCE_TRACKER.md). Эта редакция согласует требования; перенос, реализация, публикация и изменение аудитории не выполнены.

# English version

## 1. Phase-one purpose and access

Release v1.2 is a reader for Challenger research, complete daily/weekly reports, provenance and imported workflow statuses, plus deterministic calculation from accepted structured inputs. Report drafting, evidence qualification, research decision support, site notes, persistent manual edits and GitHub writes are later editorial features after authorization/permission checks.

The existing private Site already has ChatGPT identity and D1. Preserve its access and existing records; do not remove authentication or storage. Future authorization means editorial write permissions, not making the current Site public. Persistent owner/workspace migration is deferred, not a prerequisite for the reader.

Keep **WTF Viewer → AI CapEx Signals → Challenger 2.1**, RESEARCH_ONLY, UNCALIBRATED, trading_signal=false and category=null. No methodology, coefficient, cohort or Champion changes.

## 2. Canonical migration and manual synchronization

After verified migration, GitHub **HelsingN/WTF-Viewer** is canonical for the transferred Challenger research and daily/weekly domain; AI_CapEx_Reversal retains source history. Until reconciliation/cutover the source remains the original repository. Current seed metadata is not a complete report archive.

Transfer full report/research text, attachments, model/policy/contracts, observations/eligibility/sources, event/review history, calculation artifacts and completeness indexes. Pin source refs/commits, preserve file bytes and IDs, record target mappings/hashes and distinguish main/proposed/manual. Resolve moved internal links via manifest rather than silently rewriting historical content. Finalize cutover only after manifest, links, IDs, hashes and completeness checks; record target commit and date. Do not delete or automatically archive the source repository, touch unrelated research or change schedules.

Proposed target roots are research/challenger/ and research/reports/. Final paths belong in the migration manifest. New changes after cutover are versioned in WTF-Viewer; origin history remains attached.

Phase-one synchronization: owner updates GitHub files → builder packages one pinned WTF-Viewer commit with full content/manifest → user manually imports it into Viewer. This is revision-aware manual sync, not live or bidirectional API sync. Identical package is a no-op; invalid import preserves the previous valid dataset. Missing files are explicit PARTIAL. Never silently fill a new dataset from old seed.

Separate the published bundled package from a locally imported preview. Reload can reuse the delivered package or clearly labeled device-local cache; device-local storage does not promise cross-device persistence. Import/download never means a repository commit.

## 3. On-demand and reload calculation

Provide a **Recalculate Challenger** button and pure recalculation/cache validation on reload. Use accepted reviewed structured snapshots, cohort/policy/event inputs and an explicit evaluation_as_of. Markdown reports alone do not constitute numeric inputs or automatic economic review.

Implement a browser-side pure engine compatible with the pinned Python reference, retaining exact decimal/rounding, weights/caps/decay, qualification, PIT/expiry and missing-data behavior. Do not claim Python execution in the existing Worker. Pin reference dependencies, tests and golden input/output sets; parity failures block release.

Result identity is input hash + model/code/policy versions + evaluation_as_of. Repeated reload does not create repository artifacts/reports/events. Default as_of comes from the package; a new date is explicit. “Current date” does not refresh source facts or override expiry. Keep evaluated_at separate.

Local results are LOCAL/UNPUBLISHED and separate from published artifacts, with hashes, versions, interval/UNKNOWN and exclusion reasons. Invalid input blocks calculation with an explanation; permitted partial input produces honest bounds. JSON download may be manually committed by the owner later; it is not approval/publication.

## 4. Reader and status behavior

Provide complete research and daily/weekly lists/detail readers, Markdown content/attachments, sources, dates, links to target GitHub paths/versions, search/filters, event/calendar/history views and imported coverage/check context. Derive counts and tasks from the selected manifest.

Keep severity, qualification, direction, completeness, freshness, recalculation and imported CI/review/merge separate. QUALIFIED is not favorable direction; missing review is not PASS. Preserve canonical IDs/reviews/source precision, proposed/main boundaries, artifact-specific factors, null/UNKNOWN and distinct macro rankings. No site note/report/checklist editor is required in phase one.

## 5. Design and later versions

The integrated D0–D3 redesign remains in release v1.2. Use neutral near-black surfaces, white text and violet interaction accents; green/amber/red/neutral retain labeled status meanings. Preserve correct branding and distinguish local vs published calculation. The PNG's “New report” editor action is a future feature, not a reason to expand phase one.

Body ≥16px, important labels/table text/dates ≥14px, optional metadata 12–13px. Text contrast ≥4.5:1, large text ≥3:1, applicable required non-text cues ≥3:1. Large means 24 CSS px regular or 18.67 bold; 7:1 primary text is desirable. Verify actual CSS, keyboard/focus, semantic tables/forms, reduced motion, all states, RU/EN, 1440/1280/768/390px and 200% zoom.

Later phases add automatic package/site delivery and supported read-only Refresh, then editorial authorization, owner/workspace persistence, notes, report drafting/manual decisions and permissioned GitHub write workflows. Existing scheduled research tasks remain unchanged by this document.

## 6. Acceptance and original backlog

Phase one requires B01–B10 and applicable D01–D06 in the shared acceptance tracker: verified migration/cutover, complete content, manual revision-aware sync, validated import, deterministic on-demand/reload calculation, Python parity, honest unknowns/provenance, preserved access/data and a bilingual reader.

A01–A18 below retain their original meanings as full-workspace backlog. Applicability is explicit in the tracker; deferred work is not VERIFIED. Historical evidence remains dated.

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
| A16 | Target implementation passes TypeScript/build; desktop/mobile/forms inspected; untested hosted flows explicitly disclosed |
| A17 | WTF Viewer brand, AI CapEx Signals workspace and Challenger 2.1 model are distinguished in UI/documentation |
| A18 | workspace_id isolates records; canonical IDs survive; future workspaces do not automatically create another Challenger |

## 7. Provenance and delivery

The source contracts/paths listed in Russian §11 apply equally here. The scope decisions record pinned inspection refs; migration target paths are not implemented yet. The existing Python read-only evaluator is a reference, while the dated one-off script is not a universal service.

See [scope decisions](PHASE1_SCOPE_DECISIONS_RU.md), [unified release plan](UPDATE_PLAN_RU.md), [historical baseline](IMPLEMENTATION_BASELINE.md) and [acceptance tracker](ACCEPTANCE_TRACKER.md). This is a documentation revision; no data migration, recalculation, application implementation, deployment, audience change or schedule change has been performed.
