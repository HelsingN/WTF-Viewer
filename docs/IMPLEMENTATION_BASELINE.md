# WTF Viewer — исходное состояние реализации

Дата проверки: 11 ноября 2026, Asia/Jerusalem. Этап 0: COMPLETE. Функциональная приёмка: PENDING.

## 1. Область фиксации

Проверен develop@a1a43736d44110179ef73ea2009c74ea19534074. Код унаследован от b9e838839485105da5b09da1774ec4df9e14ce51; следующий коммит добавил только план и ссылку в README. Все 120 файлов кода/конфигурации/зависимостей вне README и docs сопоставлены по Git blob SHA с локальной копией до запуска проверок: расхождений нет.

Этот документ фиксирует старт обновления, а не результат нового исследования или перерасчёта. ТЗ согласовано в v1.2 RU/EN; [план](UPDATE_PLAN_RU.md) и [реестр A01–A18](ACCEPTANCE_TRACKER.md) относятся к этой редакции. Историческое основание плана — ТЗ v1.1, blob f4e3edbc43adb949aac74d3d2e41c900dc0d9a05.

Владелец подтвердил открытость исследований. Код и встроенный снимок сохраняются в публичном репозитории. Credentials, изменение аудитории Site и экспорт пользовательской БД остаются отдельными операциями. Ограничение автоматических GitHub writes относится к приложению; оно не запрещает порученные владельцем изменения документации/кода WTF Viewer.

## 2. Приложение, хранение и версии

| Объект | Проверенное значение |
| --- | --- |
| Репозиторий/ветка | HelsingN/WTF-Viewer / develop |
| package.json | wtf-viewer, 0.1.0; Node >=22.13.0 |
| Стек | Vinext / React / TypeScript / Worker; D1 binding DB; R2 не используется |
| Site project_id | appgprj_6af488a9252481919df8e2a0e4fdeada |
| Текущее состояние Sites | active, latest version 2, access_mode custom; метаданные прочитаны, audience не изменялся |
| Действующий URL | https://ai-capex-reversal-desk.silveryopera8.chatgpt.site |
| Название в Sites | AI CapEx Reversal · Research Desk; публикация ещё не обновлена до целевого WTF Viewer |
| Seed envelope | capex-desk.seed.v1 |
| Workspace export envelope | capex-desk.export.v1 |
| Внутренний payload/API | WorkspaceSchema без schema_version и без workspace_id; не обозначать его выдуманным v1 |
| Таблицы D1 | workspaces: primary key owner; workspace_versions: composite key owner + revision |
| Последняя миграция | 0000_late_dragon_lord; Drizzle journal format 7 / SQLite; это версия журнала инструмента, не прикладной схемы |
| Browser recovery | capex-unsaved; ключ пока не изолирован по owner/workspace |
| GitHub workflows приложения | В проверенном дереве отсутствуют |

Production D1 не выгружалась и не изменялась. Количество пользовательских записей и полнота backup не проверены. Это не препятствует проектированию этапа 1, но backup/restore на копии и проверка миграции обязательны до применения в production. Не утверждать наличие резервной копии на основании GitHub-исходников.

## 3. Снимок исследования и происхождение

Канонический источник: HelsingN/AI_CapEx_Reversal. Main прочитан на 6101a36bab3657fd0fcfc1cb8be06e17f36e938d; он совпадает с исходным SHA встроенного снимка. Это совпадение на момент проверки, не постоянная live-синхронизация.

В lib/seed.json захват отмечен 2026-11-11T15:26:36.242Z. Он содержит 38 событий, 4 артефакта расчёта, 24 записи отчётов и 13 PR-снимков. Это состав исходного среза, не константы приложения и не проверка истинности каждой первичной публикации.

Последние решения реестра на этом SHA: QUALIFIED 2, CORE_ONLY 8, MACRO_ONLY 12, PHYSICAL_ONLY 9, CONTEXT_ONLY 4, EARLY_WARNING 3. Дневной индекс содержит 10 записей. Числа нужны для регрессии конкретного fixture, а не для общего алгоритма.

Strength и macro имеют собственные origin PR #196 и SHA 486300f04918f74f4cf2d4b8da229e66929a51d5. Не обозначать их как main@6101a36bab3657fd0fcfc1cb8be06e17f36e938d. Их происхождение прочитано из сохранённого snapshot; актуальный статус PR отдельно не переоценивался.

Weekly report 2026-11-11 использует cutoff 2026-11-11T08:17:14+02:00, data_status PARTIAL и REQUIRES_HUMAN_REVIEW. Категория и exact score null. Наличие артефакта не подтверждает новый текущий расчёт.

## 4. Прочитанные канонические контракты

Все нижеперечисленные файлы прочитаны в AI_CapEx_Reversal на одном зафиксированном SHA 6101a36bab3657fd0fcfc1cb8be06e17f36e938d. Запись blob SHA позволяет отличить версию самого документа от названия файла.

| Файл | Git blob SHA | Что определяет |
| --- | --- | --- |
| Docs/AI_ROI_CHALLENGER_MODEL_v2.md | c30b9dc8ecf95ff783de4815fcdc2a62ed83a3a6 | Единственная модель, core R1/R2/R4, signed R3/R5/R6/R7, PIT/coverage/UNKNOWN; в заголовке сохраняется историческое 2.0.0-draft |
| Docs/CHALLENGER_V2_EVENT_POLICY_V2_1.md | d055a05fabea757ba1aa456778a07a45784bcac6 | Sole active OBSERVABLE_EVENT_QUALIFICATION_V2_1, конечная проверка и observable_outcome |
| Docs/CHALLENGER_V2_EVENT_REGISTRY_CONTRACT.md | 7319c4a61d10ddd55920785ebc89c1218a9482c4 | Идентичность, reviews, дневная сверка, QUALIFIED-triggered pipeline |
| data/research/events/challenger_v2_event_registry.json | 5d045e1ee10ed5b33548be44e58fbe6bdc330020 | schema ai-capex.challenger-v2.event-registry.v1, массив events |
| data/research/events/daily_high_critical_index.json | 4337f069d41d93a692d07432430edca0590b39c0 | schema ai-capex.challenger-v2.daily-high-critical-index.v1, массив records |
| data/research/weekly/weekly_challenger_v2_2026-11-11_r1.json | 2219d11a7ba6b72f7b498cc8f8a94008c6d18dc1 | schema ai-capex.weekly-challenger-v2.v1; published_result + cutoff + snapshot |
| data/research/events/recalculations/EVT-20261027-1C51396E8F19_20261104T072100Z_ca79ec08.json | e7062fec9473ef3dea57b759d610fde98ca4972f | schema ai-capex.challenger-v2.event-recalculation.v1; evaluation + trigger_review_at + snapshot |

Исторические разделы registry contract о backfill/нуле QUALIFIED/старых EARLY_WARNING — описание прежнего cutoff, не текущий итог реестра. Для новых оценок действует явно указанная observable policy v2.1. Упоминание в старом абзаце обязательного точного first_public_at не должно отменять разрешённый текущей политикой консервативный public-by с proof. Эта сверка не изменяет исходные документы и не переоткрывает экономическую оценку событий.

## 5. Решения для адаптера, которые нельзя потерять

- UI-название: Challenger 2.1. Policy ID: OBSERVABLE_EVENT_QUALIFICATION_V2_1.
- В weekly JSON model_version = CHALLENGER_V2_RESEARCH_APPROVED_2026-11-04; snapshot.cohort_version имеет это же значение, snapshot.schema = ai-capex.challenger-observable.v2-draft. Название 2.1 не является основанием переписать эти строки в исторических JSON.
- model_id/workspace_id ещё не реализованы. В этапе 1 добавить ai-capex-signals и challenger, сохраняя исходные model_version/cohort_version/schema/policy metadata; display version хранить отдельно. Отсутствующие metadata не заполнять неподтверждённым утверждением о версии.
- Weekly и event-recalculation — разные envelopes. Адаптер выбирается по schema, сохраняет собственный cutoff/trigger_review_at и published_result/evaluation. Не заменять дату расчёта датой импорта.
- Core остаётся R1/R2/R4. Основная история дополнительно показывает R2/R3/R5/R6/R7, не исключая R1/R4 из модели.
- Реальные числовые поля встречаются строками. Преобразование должно различать допустимую числовую строку, null, пустую строку и невалидное значение; Number(null) не является доказательством нуля.
- EVT identity: event_date + первые 12 hex SHA-256 uppercase canonical event_key. Существующий ID не менять при новых sources/reviews. Causal root + effect ID проверяются отдельно от идентичности новости.
- Оба допустимых пути availability уже есть в реестре: first_public_at_verified и known_public_by_at/public_by_verified_at с proof/availability_basis. Не требовать вымышленной точной минуты.
- Публикация/факт/регистрация/import time различаются. PARTIAL, expiry и UNKNOWN сохраняются; фикстура с 38 событиями не ограничивает будущий импорт.
- Потребность в пересчёте — отдельное состояние. Панель не исполняет --assess или evaluate_challenger_v2 и не меняет исследовательский pipeline.

Это решения по совместимости будущего адаптера, не заявление, что он уже реализован. Методика, коэффициенты и артефакты исследования не изменены.

## 6. Проверки исходной точки

На Node v24.22.1 выполнены существующие команды над локальной копией, совпадающей с develop по всем 120 runtime/config blobs. Зависимости уже были установлены; новый clean install в этой проверке не выполнялся.

| Проверка | Результат | Доказательство / предел |
| --- | --- | --- |
| npm run check | PASS, exit 0 | Research contracts passed: explicit unknowns, missing-factor rejection, append-only reviews, report gates and dated snapshot consistency |
| npx tsc --noEmit | PASS, exit 0 | TypeScript не сообщил ошибок |
| npm run build | PASS, exit 0 | Пять стадий Vinext завершены; routes / и /api/workspace; Worker bundle собран |
| Исходники vs GitHub | PASS | 120 файлов вне README/docs, Git blob hashes совпали |
| Редакционная правка ТЗ | PASS | RU/EN приведены к открытому snapshot, уже перенесённому prototype и pending acceptance; A01–A18 сохранены |

Build предупреждает о неполной статической классификации route / в Vinext; это не runtime-проверка страницы. Environment warning npm о http-proxy не привёл к ошибке. Новые production build/deploy не выполнялись в Sites.

Не проверены заново: браузерные формы/мобильная версия, hosted sign-in/persistence, два реальных пользователя, конфликт двух вкладок в hosted Site, export/restore production D1, новая миграция и runtime connector GitHub. Эти пункты не отмечены PASS в приёмке.

## 7. Завершение этапа 0 и передача дальше

Подтверждено: текущая кодовая база и её проверки; открытый snapshot и независимая provenance PR; прочитанные версии контрактов; исходные форматы хранения; согласованное ТЗ v1.2 RU/EN; создан реестр A01–A18.

Не завершено: функциональные этапы 1–7 и пользовательская приёмка. Этап 0 закрывает исходную точку, не соответствие всего приложения ТЗ. Приложение, D1, Sites audience и исследовательский репозиторий не менялись.

Следующее действие: этап 1 — проект owner/workspace keys, schema-version envelope и миграции существующего payload/history с проверкой на копии. Перед production-изменением нужен проверенный backup/restore; отсутствие такого backup сейчас записано явно, а не скрыто как выполненная проверка.

## English summary

Stage 0 is complete: specification v1.2 matches the imported prototype and the owner's open-research instruction; source contracts and exact versions are recorded; A01–A18 acceptance remains pending. Runtime/config files matched the baseline commit and existing contract, TypeScript and build checks passed. UI label Challenger 2.1 must not overwrite the source artifact's model/cohort identifiers. This was a documentation-only stage: no application change, database migration, research recalculation, merge or Sites deployment occurred.
