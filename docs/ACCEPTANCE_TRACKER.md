# WTF Viewer — приёмка v1.2: первая версия, редизайн и backlog
Редакция назначения: 21 ноября 2026, Asia/Jerusalem.  
Требования: [ТЗ RU/EN](SPEC_RU_EN.md), [решения 1.1–1.4](PHASE1_SCOPE_DECISIONS_RU.md), [единый план](UPDATE_PLAN_RU.md).

## Правило текущего выпуска

Первый reader/calculator выпуск требует **B01–B10 и D01–D06**. Исходные A01–A18 сохраняют свои значения и прежние статусы evidence; их применимость уточнена, deferred не означает VERIFIED. Готовность будущего редактора/новой D1-миграции не является условием выпуска viewer.

Исторические проверки baseline относятся к конкретному коду/дате, не новому порту расчёта или переносу. Документальное согласование 0R завершено. Этап 1 проверен на коммите данных в `develop`. [Протокол переноса](RESEARCH_MIGRATION.md).

Статусы: NOT_STARTED — новый полный прогон не начат; IN_PROGRESS — частичные evidence; VERIFIED — все условия проверены на exact SHA с environment/evidence; BLOCKED — конкретная причина и условие продолжения. При смене затронутого кода/данных/version сохранять старые evidence и перепроверять релевантные критерии. Зелёная сборка сама не доказывает user flow, source truth или human approval.

## B01–B10 — обязательная приёмка первой версии

| ID | Критерий | Статус | Этап | Что проверить |
| --- | --- | --- | --- | --- |
| B01 | Полный перенос и переключение основного источника | VERIFIED (`develop`) | 1 | 192 исходных файла сверены по Git blob SHA, 47 ID проверены, статусы и происхождение сохранены. [Ревизии и проверки](RESEARCH_MIGRATION.md) |
| B02 | Просмотр исследований и полных daily/weekly | NOT_STARTED | 2, 4 | Список строится из manifest; Markdown/вложения/источники открываются, GitHub target file/version и даты доступны; отсутствующие части явно обозначены |
| B03 | Ручная синхронизация с GitHub WTF-Viewer | NOT_STARTED | 2 | Пакеты из двух target commits обновляют данные без дублей; source SHA/даты различимы; локальный preview не выдаётся за опубликованное или live |
| B04 | Надёжный версионированный импорт | NOT_STARTED | 2 | Проверки schema/hash/ID/key/history/versions; no-op повтор; ошибочный пакет сохраняет предыдущий; seed не подмешивается без метки |
| B05 | Пересчёт по кнопке | NOT_STARTED | 3 | Reviewed structured input → чистое вычисление; LOCAL/UNPUBLISHED отдельно от published; as_of/hash/versions/exclusions/UNKNOWN и export JSON |
| B06 | Пересчёт/reload без побочных записей | NOT_STARTED | 3, 7 | Input+versions+as_of ключ; reload/cache воспроизводимы; нет дубликатов/commits/новых отчётов; новая дата явная, freshness не подменяется |
| B07 | Численная совместимость с Python | NOT_STARTED | 3, 7 | Golden vectors и отрицательные случаи: decimal/rounding, weights/caps/decay, qualification, PIT/expiry и неполнота; расхождение блокирует выпуск |
| B08 | Честная полнота, статусы и происхождение | NOT_STARTED | 4, 5 | Четыре даты, core/event factors каждого артефакта, main/proposed/local, metadata и macro отдельно; чисел из прошлого/PNG вместо пробела нет |
| B09 | Сохранность доступа и старых данных | NOT_STARTED | 0R, 7 | Audience/identity/D1/история не удалены; никаких write credentials в клиенте; reviewer функции первой версии не выполняют серверную запись |
| B10 | Рабочий двуязычный reader | NOT_STARTED | 6, 7 | RU/EN, фильтры/поиск/CSV, GitHub links, полные тексты, loading/empty/error, desktop/mobile, отсутствие ошибок рендера и безопасное отображение Markdown |

## D01–D06 — обязательная приёмка редизайна

| ID | Критерий | Статус | Этап | Evidence |
| --- | --- | --- | --- | --- |
| D01 | Общие токены и WTF Viewer → AI CapEx Signals → Challenger 2.1 | NOT_STARTED | D0, 3–6; итог 7 | Нейтральные тёмные поверхности, читаемый текст, фиолетовые actions/selection и правильный бренд |
| D02 | Контраст и типографика | NOT_STARTED | D0, 6–7 | CSS foreground/background/state: 4.5:1 ordinary, 3:1 large и необходимые non-text cues в применимых случаях; 16/14px, rem, 200% zoom |
| D03 | Раздельная семантика | NOT_STARTED | 3–7 | Severity/qualification/direction/coverage/freshness/recalc и импортированные CI/review/merge; UNKNOWN/interval без подстановок |
| D04 | RU/EN, клавиатура и состояния reader | NOT_STARTED | 6–7 | Focus/modal/Markdown/import/calculation, reduced motion, loading/empty/error/success; контекст чтения/фильтров сохраняется |
| D05 | Responsive и доступ к данным | NOT_STARTED | 6–7 | 1440/1280/768/390px, 200% zoom, длинные тексты, внутренний scroll таблиц, отсутствие перекрытий |
| D06 | Достоверный обзор и сохранность материала | NOT_STARTED | 3–7 | Published vs LOCAL/UNPUBLISHED, input hash/as_of/cutoff, полноценные файлы/ссылки/история и реальные импортированные статусы; DEMO не в рабочем наборе |

Крупный текст: от 24 CSS px regular либо 18.67 bold. Цель 7:1 primary text желательна, не дополнительный blocker. PNG не является evidence runtime или численной точности. Кнопка «Новый отчёт», сохранение заметок и редакторский draft не требуются для D04 текущего выпуска.

## A01–A18 — исходные критерии полной панели

Значения критериев и статусы сохранены из предыдущей редакции; ниже изменено планирование/применимость. Подсценарии чтения проверяются через B; завершение B не закрывает целиком A со write-сценарием. Датированное evidence baseline не обновляется задним числом.

| ID | Исходный критерий | Статус (историческое evidence) | Применимость | Новый этап | Что осталось / evidence |
| --- | --- | --- | --- | --- | --- |
| A01 | RU/EN без потери контекста | NOT_STARTED | Reader — первая версия; сохранение редакторской работы — позже | 6–7 / позже | Язык с фильтрами, карточкой и draft; reload не теряет записи; Только чтение UI; новый браузерный прогон не выполнен |
| A02 | ID и повторный импорт | NOT_STARTED | Первая версия (B01/B03/B04) | 1–2 | Повтор идентичного импорта добавляет 0; конфликт identity/reviews отклоняется сервером; Seed/уникальность проверены скриптом; end-to-end импорт не проверен |
| A03 | Публикация/public-by/факт/регистрация | NOT_STARTED | Первая версия (B02/B08) | 4 | Даты и precision различаются; неизвестная дата не подставляется и не ломает экран; Сверены исходные availability-пути; runtime-сценарий ещё не выполнен |
| A04 | Canonical и MANUAL истории отдельно | NOT_STARTED | Просмотр исходной истории — сейчас; новые manual writes — позже | 4–5 / позже | Новый review не переписывает старый; явная provenance после reload/export; Есть append-only unit assertions, полной проверки UI/API нет |
| A05 | QUALIFIED/withdrawal → решение о пересчёте | NOT_STARTED | Позже: ручная квалификация/withdrawal из сайта | Редакторский этап | Переходы и прямой POST соблюдают REQUIRED, не создают фиктивный JSON; Нужно проверить и усилить серверные правила |
| A06 | Новый/повторный отчёт | NOT_STARTED | Позже: создание/продолжение отчёта в сайте | Редакторский этап | Пустые checkpoints/no score; существующий период открывается для продолжения; Новый пользовательский сценарий не проверен |
| A07 | COMPLETE и 10 checkpoints | NOT_STARTED | Позже: редактируемый checklist/COMPLETE | Редакторский этап | Сервер отвергает неполный checklist; исходный PARTIAL не меняется; reportReady unit assertions проходят; полный API-сценарий не проверен |
| A08 | Продолжение проверки после reload | NOT_STARTED | Чтение контекста — сейчас; редактирование/сохранение — позже | 4–5 / позже | Источники/сделанное/blocker/reopening_trigger/next_action сохраняются; Нужно добавить структурированные поля и проверить сохранение |
| A09 | Собственные компоненты артефакта | NOT_STARTED | Первая версия (B05/B07/B08) | 3–4 | Partial/null/строковые числа без подстановки старого результата и midpoint; Контрактные проверки проходят; полный UI/import сценарий не проверен |
| A10 | Историческое QUALIFIED и stale review_by | NOT_STARTED | Первая версия (B07/B08) | 3–5 | Expiry меняет актуальность вклада, не исторический статус; Новый runtime-прогон не выполнен |
| A11 | Proposed/main и актуальный SHA | NOT_STARTED | Импортированная provenance — сейчас; полный tracking workflow — позже | 5 / позже | Новый head делает прежние CI/PASS неактуальными; NO_REVIEW не PASS; Нужны поля inspected/reviewed/merge SHA и смена ревизии |
| A12 | Отдельный и совместный макроанализ | NOT_STARTED | Первая версия, отображение имеющихся материалов (B08) | 5 | PR provenance, сравнимость/overlap/каналы; ранги не суммируются; PR origin/SHA в seed установлены; UI-приёмка не выполнена |
| A13 | Фильтры/CSV/empty/reset | NOT_STARTED | Первая версия (B10) | 6–7 | CSV равен видимым строкам; неприменимый фильтр не скрывает отсутствие metadata; Новый браузерный и CSV-прогон не выполнен |
| A14 | Save/recovery/revisions/conflicts | NOT_STARTED | Позже: новая save/recovery/D1 migration; старые записи сохранить (B09) | Редакторский этап | Миграция/export/restore/две вкладки/ошибка сети без потери контекста; Hosted persistence/backup не проверялись; локальная сборка их не доказывает |
| A15 | Нет GitHub write/merge из приложения | NOT_STARTED | Первая версия read-only remote boundary (B09) | 2–7 | Ревью API/интеграции и сетевой trace подтверждают read-only границу; В текущем коде таких controls не найдено; итоговая проверка на релизном SHA впереди |
| A16 | TypeScript/build/UI/hosted | IN_PROGRESS | Первая версия reader/calculator; hosted write flows — позже | 3, 6–7 | Все технические и пользовательские проверки на релизном SHA с evidence; Baseline: npm run check, tsc и build PASS; UI/hosted остаются непроверенными |
| A17 | WTF Viewer / AI CapEx Signals / Challenger | IN_PROGRESS | Первая версия (D01) | D0, 6–7 | Документы и постоянная шапка разделяют три уровня без потери навигации; ТЗ v1.2 согласовано; hosted title остаётся прежним, целевой UI ещё не принят |
| A18 | Изоляция owner/workspace | NOT_STARTED | Позже: persistent owner/workspace migration; package IDs — сейчас | 2 / редакторский этап | Миграция сохраняет IDs/revisions; нет доступа к другому owner/workspace; В исходной схеме workspace_id отсутствует |

Ни один A-критерий не имеет VERIFIED. A16/A17 сохраняют IN_PROGRESS как прежнее частичное evidence, не утверждение о новом reader/calculator. B01 подтверждён для ветки `develop`. B02–B10 и D01–D06 ждут проверки приложения.

## Формат evidence

Criterion ID; дата/проверяющий; environment (reference Python/local/CI/hosted URL/version); exact product commit SHA; source/target dataset commits и manifest hash; input/model/policy/code versions и evaluation_as_of; команда/сценарий; expected/actual; ссылка на лог/артефакт; unresolved/next action.

Для migration дополнительно source→target manifest/hash reconciliation и cutover target commit. Для parity — оба engine versions, golden input hash и полный diff результата/ошибок. Для reload — ключ кэша, сохранность локального/опубликованного различия и отсутствие remote writes.

## Исторический журнал

| Проверка | SHA/период | Результат / предел |
| --- | --- | --- |
| Этап 0, исходный baseline | a1a43736d44110179ef73ea2009c74ea19534074, 11.11.2026 | check/TypeScript/build PASS; продуктовая/hosted приёмка PENDING |
| Согласование RU/EN и дизайна | develop@3463946f72dae1ad0b55f105f0242e34710a8520 | Документы связаны; runtime/data не менялись |
| 0R: назначение/источник/пересчёт | Документальная редакция 21.11.2026 | Первая версия пересогласована; перенос/вычислительный порт/приёмка не выполнены |

## Продолжение

| Проверка | Что установлено | Следующее действие |
| --- | --- | --- |
| CHECK-MIGRATION-CUTOVER | VERIFIED в develop. [Протокол](RESEARCH_MIGRATION.md) | Использовать проверенный target commit для сборки пакета на этапе 2 |
| CHECK-REPORT-CONTENT | Полные тексты сохранены, [указатель отчётов](../research/reports/README.md) | Этапы 2, 4: импорт и проверка просмотра в приложении |
| CHECK-CALCULATOR-PARITY | Python имеет чистый reviewed-input evaluator; dated one-off не универсален | Этап 3: pin reference/dependencies, browser port/golden vectors |
| CHECK-MANUAL-GITHUB-SYNC | Ручной GitHub commit→package→import процесс определён | Этап 2: два revisions, no-op/invalid/partial/reload |
| CHECK-READER-ACCESS | Site custom access/identity/D1 существуют | Этап 7: прежний доступ/записи не потеряны; reader/calculator hosted scenario |
| CHECK-UI-ACCESSIBILITY | Концепция обзора есть, другие макеты и внедрение pending | D0/D1/D2/D3 и D01–D06 |
| CHECK-WORKSPACE-MIGRATION | Owner-only legacy keys без workspace_id известны | Отложено до редакторской версии; сейчас не удалять records |
| CHECK-SOURCE-FRESHNESS | Источники и cutoff датированы | Новый принятый пакет/as_of, без нового ресерча по одному refresh |

Эти записи относятся к разработке приложения; они не создают новых экономических событий или новых выводов Challenger.
