# WTF Viewer — единый план выпуска v1.2
Исходный план: 11 ноября 2026. Редакция назначения и источника: 21 ноября 2026, Asia/Jerusalem.  
Этапы 1–4 реализованы в `develop`. Этап 5 реализован и локально проверен в ветке исследовательского контекста. После интеграции следует этап 6 — общий редизайн, RU/EN и адаптивность. [Перенос данных](RESEARCH_MIGRATION.md) · [Пакет и ручное обновление](RESEARCH_PACKAGES.md) · [Пересчёт и проверка](CHALLENGER_CALCULATION.md) · [Reader и проверка](RESEARCH_READER.md) · [Исследовательский контекст и проверка](RESEARCH_CONTEXT.md).

## 1. Согласовать документацию и исходное состояние

Исходный этап 0 от 11 ноября завершён и остаётся историческим [baseline](IMPLEMENTATION_BASELINE.md). По новым указаниям выполнено повторное документальное согласование **0R**: [решения 1.1–1.4](PHASE1_SCOPE_DECISIONS_RU.md), [ТЗ RU/EN v1.2](SPEC_RU_EN.md), этот план и [приёмка](ACCEPTANCE_TRACKER.md). Оно не означает завершения функциональных этапов.

### 1.1. Назначение

Первая версия — reader исследований/полных отчётов и их рабочих статусов из GitHub, с чистым пересчётом Challenger по принятым структурированным входам. Сайтовые заметки, подготовка отчётов, помощь в принятии исследовательских решений и редакторские операции — позднее, после авторизации/прав.

### 1.2. Обновление данных

Для перенесённых исследований и отчётов **WTF-Viewer `develop` — основной рабочий источник**. AI_CapEx_Reversal хранит исходную историю этой области. Первый цикл обновления ручной: GitHub WTF-Viewer commit → проверенный пакет → импорт в Viewer. Позже — автоматическая доставка/интеграция. Reader использует пакет из сборки или локально выбранную ревизию. Прежний снимок доступен в историческом рабочем столе.

### 1.3. Пересчёт

Кнопка «Пересчитать Challenger» и чистое вычисление/кэш при обновлении страницы. Реализовать браузерное ядро с parity к существующему Python, без изменения методологии. Markdown и новые статьи не становятся автоматически квалифицированными числами. Local result не публикуется автоматически.

### 1.4. Рабочие записи

Приоритет — списки и полные тексты исследований/daily/weekly с GitHub provenance, историей расчётов и статусами. Редактор заметок/чек-листов, D1 owner/workspace миграция и полноценный GitHub CI/review/merge editor не блокируют первую версию.

Текущая закрытая аудитория Site и существующие identity/D1 сохраняются. «Позже добавить авторизацию» относится к новым редакторским правам, не к отключению имеющегося входа.

## 2. Что изменено относительно прежнего плана

| Прежнее обязательное требование | Решение для первой версии |
| --- | --- |
| Канонические исследования навсегда в AI_CapEx_Reversal | После сверки перенести основную область Challenger/daily/weekly в GitHub WTF-Viewer; origin history сохранить |
| Сначала owner/workspace D1 migration, notes/recovery и manual review API | Отложить новые редакторские функции; существующие записи/защиты сохранить |
| Только импорт готового расчёта, без исполнения | Добавить чистый пересчёт reviewed input по кнопке и reload/cache с Python parity |
| Полный отчётный editor/10 checkpoints и ручной пересчётный workflow | Просмотр готовых текстов/статусов/артефактов; редактирование и принятие решений позже |
| GitHub только отложенная интеграция | Ручная revision-aware синхронизация пакета из WTF-Viewer обязательна сейчас; live Refresh/write позже |
| A01–A18 все обязательны для первого релиза | B01–B10 + D01–D06 обязательны; исходные A-ID не переопределяются, применимость к фазе отмечена |

Прежние этапы 1–7 не были реализованы. Нумерация ниже заменяет их планируемое содержание; исторические evidence исходного этапа 0 не переносятся на новые сценарии автоматически.

## 3. Этапы реализации первой версии

### Этап 0R — повторное согласование (документы)

Статус: COMPLETE (документально). Назначение/источник/пересчёт согласованы по указанию владельца; исходный baseline дополнен, сохранены старые критерии и факты проверки. Код, D1, исследования, расписания и Sites не изменены.

Выход: согласованная редакция документов и явные границы первой версии. Критерии и результаты этапа 1 приведены в [протоколе переноса](RESEARCH_MIGRATION.md).

### Этап 1 — инвентаризация, перенос и cutover

**Выполнено 21.11.2026 в `develop`.** Сохранены 192 файла с исходными хешами. Опись, проверка ID и переход зафиксированы в [протоколе переноса](RESEARCH_MIGRATION.md).

Приоритет P0. После 0R. Предлагаемая отдельная поставка: `research: migrate Challenger and reports with provenance manifest`.

- Зафиксировать исходные main/необходимые PR refs и SHA. Составить manifest и перечень зависимостей: тексты/приложения, модель/политика/контракты, источники/eligibility, входы/реестр/reviews, расчёты/индексы/манифесты.
- Определить target roots research/challenger/ и research/reports/, mapping source→target и reader resolution для ссылок. Переносить source bytes без скрытых исправлений; canonical IDs, reviews, model/policy/schema/cohort metadata и исходные даты сохранить.
- Перенести Python-эталон и минимальные нужные зависимости/тесты, pin versions. Существующий dated one-off не объявлять универсальным интерфейсом.
- Main и proposed/unmerged отделить; связанные источники сохраняют собственные commit/path. Утраченные ссылки/вложения отметить явно.
- Проверить manifest, hashes/ID/reviews, комплектность и связи. Записать migration ID, дату и точный target commit, после которого основной источник — WTF-Viewer.
- Сохранить AI_CapEx_Reversal как архив origin history этой области без удаления/force-push/автоматической установки GitHub archive flag. Другие области не переносить без основания.
- Инвентаризировать старые публикационные задачи и указать следующий ручной процесс, чтобы не вести две независимые версии. Не менять расписания в этой поставке без соответствующего поручения.

Приёмка B01: все обязательные материалы перенесены и сверены; неполный seed/список карточек не принимается за архив. После cutover новые исследования/отчёты ведутся файлами в WTF-Viewer.

### Этап 2 — пакет данных и ручная GitHub-синхронизация

Приоритет P0. Реализовано в `develop`, B03 и B04 проверены локально. [Пакет, ручное обновление и проверка](RESEARCH_PACKAGES.md).

- Сборщик создаёт пакет из одного target commit: schema/workspace/model/policy/code versions, source refs, hashes, тексты, attachments/index, snapshot/inputs, опубликованные статусы и GitHub target links.
- Manifest определяет списки документов, а не захардкоженные даты/количества. Старые metadata-only карточки остаются историческими.
- Импорт с предпросмотром состава/версии/пробелов; валидатор hash/schema/IDs/key/reviews/size/дат/versions. Один пакет повторно — no-op. Ошибка/конфликт не уничтожает предыдущий набор.
- Обновление из нового target SHA не клонирует экономические события. Нет безымянного подмешивания seed в частичный пакет.
- Явно различить bundled опубликованный пакет и локальный preview. Для reload использовать доставленный пакет или помеченный device-local cache; при отсутствии локального файла предложить выбрать его снова. Не обещать облачную синхронизацию локального импорта.
- Экспорт JSON/CSV/локального результата — ручная выгрузка, не автоматический GitHub write. Remote API/credentials/editorial write не добавлять.

Приёмка B03/B04 и основа B02: два target commits, no-op repeat, broken hash/version, отсутствие файла, stale/partial и reload ведут себя явно и воспроизводимо.

### D0 — основа дизайна до визуальной разработки

После 0R; можно вести во время этапов 1–2, завершить до новых UI этапа 3. Это пакет единого выпуска, не отдельный релиз.

Каркас экранов, общие стили и состояния описаны в [D0](design/STAGE3_D0.md). В этапе 3 каркас применён к пересчёту. Детальная отработка reader, реестра и карточки события относится к D1. Исходный PNG остаётся ориентиром для обзора.

### Этап 3 — вычислительное ядро и запрос пересчёта

Приоритет P0. Реализовано в `develop`, B05–B07 проверены локально. [Протокол расчёта и parity](CHALLENGER_CALCULATION.md).

- Принять reviewed structured snapshot с явным evaluation_as_of. Package builder готовит его из принятых источников; из одного Markdown автоматические коэффициенты не извлекать.
- Перенести чистое ядро в браузерный модуль с точной decimal/rounding семантикой и policy validation. Сохранить версии единственной модели и политику; веса/caps/decay не редактировать.
- Сделать parity suite с зафиксированным Python и golden vectors: нормальный/partial/UNKNOWN, PIT/as_of/expiry, квалификация/дубликаты/limits, невалидные данные и исходные reference artifacts.
- Добавить кнопку и reload/cache. Ключ: input hash + model/code/policy versions + as_of. Одинаковый ключ не создаёт репозиторных записей; новый as_of выбирается явно, evaluated_at хранится отдельно.
- Отделить LOCAL/UNPUBLISHED результат и его download от опубликованного артефакта. Нет входа — отказ с причиной; допустимая неполнота — интервалы/UNKNOWN; ошибка не подменяет предыдущий успех.
- Обновление страницы не является ресерчем, live refresh или разрешением опубликовать отчёт.

Приёмка B05–B07. Численное расхождение с Python блокирует этап; не объявлять Python уже работающим в Worker и не добавлять незащищённый удалённый job API ради кнопки.

### Этап 4 — исследования, полные отчёты и источник

Приоритет P0. После этапа 2, интеграция результата после 3. D1 визуальное оформление в тех же сценариях.

- Списки и полный reader исследований/daily/weekly из пакета; даты/NY-session/cutoff, attachments, первичные ссылки, связи/поиск и GitHub file/version.
- Markdown отображать без исполнения произвольного HTML/скриптов; не терять нужные таблицы/ссылки/цитаты.
- Отображать наличие файла, комплектность и workflow status раздельно. Отсутствующий текст — явная проблема, не пустая «полная» карточка.
- Реестр/календарь/история открывают исходные ID и артефакты. Публикация/public-by/факт/регистрация различимы; UNKNOWN сохраняется.
- Обзор строится из выбранного набора: published Challenger, отдельно local, открытые проверки/next_action из источника. Никаких задач и значений, навсегда закреплённых за ноябрём/PNG.

Приёмка B02/B08: можно открыть материал из списка до полного текста, источника и GitHub target revision; local/published и все даты не смешиваются.

### Этап 5 — полнота, исследовательский контекст и macro

Приоритет P1. После 4. D1 продолжается.

- Показывать источники/eligibility и собственные факторы/coverage каждого расчёта, исторические reviews и срок их применимости.
- Существующие незавершённые проверки/решения читать из пакета с их статусом/источником, не создавать новые сайта-зависимые заметки.
- Макроранги отдельны; совместный эффект/overlap/ограничения и origin main/PR читаются без суммы ordinal scores.
- GitHub provenance обязателен; полноценное редактирование CI/review/merge не входит в первую версию. Если эти статусы импортированы, сохранять observed_at/inspected SHA и UNKNOWN при отсутствии evidence.
- Уточнить интерфейс и комплектность по реальным материалам, не запускать повторный экономический аудит по умолчанию.

Приёмка B08 и применимые read-only части A-критериев; это не приёмка будущего editor.

### Этап 6 — D2: общий редизайн, RU/EN и адаптивность

Приоритет P1, обязателен для релиза. После 5/D1.

Применить [дизайн-приложение](design/WTF_viewer_design_plan_RU.md) к всем reader/import/calculation экранам: общие токены/статусы/таблицы, WTF Viewer → AI CapEx Signals → Challenger 2.1, фиолетовые действия, читаемый текст. Закрыть пробелы, а не повторять уже реализованное.

RU/EN сохраняет фильтры/раздел/карточку; даты и GitHub links понятны; клавиатура/focus/modal/Markdown, states, CSV, reduced motion, 1440/1280/768/390px и 200% zoom проверены. Не внедрять editor ради совпадения с PNG.

Приёмка B10 и D01–D06 по актуальной области. D06 включает published/local distinction и честные данные.

### Этап 7 — D3 и выпуск reader/calculator

Приоритет P0 для выпуска. После 1–6.

- CI приложения: зафиксированная установка, contract checks, TypeScript/build и meaningful tests импорта/модели/reader; отдельный parity run с Python.
- Сквозной сценарий: target GitHub commit → полный пакет → ручной импорт → список → полный отчёт/исследование → source link → запрос расчёта → reload/cache → export → ручной новый target commit → обновлённый пакет.
- Отрицательные сценарии: испорченный/partial пакет, неизвестная версия, невалидные числа/даты, missing input, failure/reload без ложного success, Markdown safety.
- D01–D06: actual CSS contrast/state table, desktop/mobile/zoom/keyboard, labels/semantics. Сохранить exact tested SHA и evidence в общем реестре.
- Существующий Site identity/audience/D1 не сбрасывать; проверить вход/чтение, отсутствие потери прежних records и секретов в клиенте. Новые D1 migrations не входят в этот выпуск.
- Подготовить версию с тем же Sites project_id. Merge/deploy выполняются в пределах отдельного поручения; после публикации проверить hosted reader/calculator и выбранную версию пакета.

Готово, когда B01–B10 и D01–D06 имеют VERIFIED на релизном SHA; deferred редакторские A-критерии явно вынесены, а не ложно закрыты.

## 4. Редизайн в общем выпуске

Порядок: D0 после 0R и до UI этапа 3; D1 в этапах 3–5; D2 в 6; D3 в 7. Подробный [дизайн-план](design/WTF_viewer_design_plan_RU.md) — приложение, [исходный PNG](design/research-desk-overview-2026-11-21.png) — ориентир.

Приоритет требований: канонические contracts действующей модели/политики задают расчёт; ТЗ — продукт/семантику; общий план — зависимости; дизайн-приложение — оформление; PNG не переопределяет текст. После migration cutover канонические документы этой области находятся в WTF-Viewer с сохранённым origin.

- D01: общие токены, нейтральная тёмная тема, фиолетовый выбор и правильный бренд.
- D02: обычный текст ≥4.5:1, крупный ≥3:1, необходимые non-text cues ≥3:1 в применимых случаях; body 16px, важные labels/dates 14px, rem/zoom. Крупный — 24 CSS px regular или 18.67 bold. 7:1 primary text — желательная цель.
- D03: независимые severity/qualification/direction/coverage/freshness/recalc/CI/review/merge с подписями; UNKNOWN/interval не превращаются в ложные числа.
- D04: RU/EN, клавиатура, focus, reader/import/calculation forms и все states; редактирование отчётов/заметок не проверяется как обязательная первая версия.
- D05: 1440/1280/768/390px и 200% zoom; отсутствие перекрытий/overflow; доступ к ID/датам/status/detail/actions.
- D06: полный dataset provenance, published vs LOCAL/UNPUBLISHED, реальные статусы/next_action из пакета, отсутствие потери файлов/ссылок/истории и DEMO-записей в рабочем наборе.

Функциональные и визуальные коммиты/PR разделяются с явными зависимостями. Отдельный релиз редизайна не нужен.

## 5. Приёмка и дальнейшие версии

| ID | Критерий первой версии | Этап | Доказательство |
| --- | --- | --- | --- |
| B01 | Полный перенос и переключение основного источника | 1 | Manifest по зафиксированным source/target SHA; полные файлы/приложения, hashes, ID/reviews и ссылки сверены; записан cutover в WTF-Viewer |
| B02 | Просмотр исследований и полных daily/weekly | 2, 4 | Список строится из manifest; Markdown/вложения/источники открываются, GitHub target file/version и даты доступны; отсутствующие части явно обозначены |
| B03 | Ручная синхронизация с GitHub WTF-Viewer | 2 | Пакеты из двух target commits обновляют данные без дублей; source SHA/даты различимы; локальный preview не выдаётся за опубликованное или live |
| B04 | Надёжный версионированный импорт | 2 | Проверки schema/hash/ID/key/history/versions; no-op повтор; ошибочный пакет сохраняет предыдущий; seed не подмешивается без метки |
| B05 | Пересчёт по кнопке | 3 | Reviewed structured input → чистое вычисление; LOCAL/UNPUBLISHED отдельно от published; as_of/hash/versions/exclusions/UNKNOWN и export JSON |
| B06 | Пересчёт/reload без побочных записей | 3, 7 | Input+versions+as_of ключ; reload/cache воспроизводимы; нет дубликатов/commits/новых отчётов; новая дата явная, freshness не подменяется |
| B07 | Численная совместимость с Python | 3, 7 | Golden vectors и отрицательные случаи: decimal/rounding, weights/caps/decay, qualification, PIT/expiry и неполнота; расхождение блокирует выпуск |
| B08 | Честная полнота, статусы и происхождение | 4, 5 | Четыре даты, core/event factors каждого артефакта, main/proposed/local, metadata и macro отдельно; чисел из прошлого/PNG вместо пробела нет |
| B09 | Сохранность доступа и старых данных | 0R, 7 | Audience/identity/D1/история не удалены; никаких write credentials в клиенте; reviewer функции первой версии не выполняют серверную запись |
| B10 | Рабочий двуязычный reader | 6, 7 | RU/EN, фильтры/поиск/CSV, GitHub links, полные тексты, loading/empty/error, desktop/mobile, отсутствие ошибок рендера и безопасное отображение Markdown |

B01–B10 — критерии текущего выпуска, D01–D06 — обязательное оформление. A01–A18 сохраняются в [реестре](ACCEPTANCE_TRACKER.md) без перенумерации/подмены смысла; их read-only части проверяются через B, а редакторские/сохранение/миграция deferred до следующих версий.

После первой версии:
1. Автоматическая сборка и доставка пакетов из GitHub WTF-Viewer, затем поддерживаемый read-only Refresh с stale/error/cache.
2. Авторизация редакторских прав, owner/workspace D1-изоляция/миграция, заметки, подготовка отчётов/checklists/решения и recovery/conflicts с аудитом.
3. Разрешённая запись в GitHub WTF-Viewer через review/PR и явные действия; автоматический merge не подразумевается.

Для будущих production-миграций требуется backup/restore; в текущем reader выпуске новые migrations не планируются, старые данные не удаляются. Автоматизации исследования не перенастраиваются этим планом.

## 6. Статусы и следующий шаг

| Работа | Статус | Основание / следующее действие |
| --- | --- | --- |
| Исходный этап 0, 11.11.2026 | COMPLETE (история) | Baseline исходного прототипа и прежнего scope |
| Интеграция дизайна | COMPLETE (документы) | Приложение/PNG сохранены; не означает внедрения |
| 0R: решения 1.1–1.4, 21.11.2026 | COMPLETE (документы) | Scope и цель канонической миграции согласованы; runtime не изменён |
| Этап 1 | VERIFIED | [Перенос и сверка 192 файлов в develop](RESEARCH_MIGRATION.md) |
| Этап 2 | VERIFIED (local) | [Пакет и ручное обновление](RESEARCH_PACKAGES.md) |
| Этап 3 | VERIFIED (local) | [Пересчёт и Python parity](CHALLENGER_CALCULATION.md) |
| Этапы 4–7 | NOT_STARTED | Следующий этап — полный reader и отображение источников |
| D0 | COMPLETE (каркас) | [Блоки и состояния](design/STAGE3_D0.md) |
| D1–D3 | IN_PROGRESS | Экран Challenger реализован, остальные экраны и релизная проверка запланированы |
| B01 | VERIFIED (`develop`) | [Протокол переноса](RESEARCH_MIGRATION.md) |
| B02–B10, D01–D06 | IN_PROGRESS | B03–B07 проверены локально. Актуальные статусы в [реестре](ACCEPTANCE_TRACKER.md) |

Ревизии исходных файлов, открытых PR и целевого коммита указаны в [протоколе переноса](RESEARCH_MIGRATION.md).

Следующее действие по плану — этап 4. Полный reader добавляет безопасный Markdown, приложения и переходы к первичным источникам.

## English summary

Phase one is a complete research/report reader with imported workflow statuses and deterministic on-demand/reload Challenger calculation. After verified migration/cutover WTF-Viewer becomes canonical for the transferred domain; AI_CapEx_Reversal retains origin history. Manual synchronization is target commit → validated full-content package → manual import; local results remain unpublished.

Stages are rescoped: 0R documents; 1 migration/manifest/cutover; 2 packages/manual sync; 3 browser engine with Python parity; 4 complete report/research reader; 5 coverage/context/macro; 6 D2 bilingual adaptive UI; 7 parity/end-to-end/D3 release acceptance. D0 precedes stage 3 UI, D1 accompanies 3–5. B01–B10 and D01–D06 gate this release; A01–A18 preserve full-workspace backlog meanings.

Existing private access, identity and D1 data are preserved. New owner/workspace migration, note/report editors, decision support and GitHub write flows follow later editorial authorization; automated package delivery/read-only Refresh is a subsequent extension. No source deletion/archive setting, schedules, model rules, runtime code, records or Site deployment were changed by documenting this plan.
