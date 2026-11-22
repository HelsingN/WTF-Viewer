# Исследования Challenger и отчёты AI CapEx

- [Полные ежедневные и еженедельные отчёты](reports/README.md)
- [Модель Challenger v2](challenger/model/AI_ROI_CHALLENGER_MODEL_v2.md) и [политика квалификации v2.1](challenger/policy/CHALLENGER_V2_EVENT_POLICY_V2_1.md)
- [Реестр событий](challenger/events/challenger_v2_event_registry.json), [дневной индекс](challenger/events/daily_high_critical_index.json) и [исследовательские материалы](challenger/studies/)
- [Опись переноса с хешами и сопоставлением ссылок](migration-manifest.json) и [машиночитаемый указатель отчётов](report-index.json)

Снимок содержит 19 ежедневных и 8 еженедельных отчётов из исходного main, 1 архивный Weekly Watch и 3 отчёта из открытых PR. Архивное свидетельство 9 ноября имеет исходный статус ARCHIVED_PARTIAL. Полнота переноса означает сохранение содержимого файлов. Исходные статусы PARTIAL, UNKNOWN и DRAFT сохраняются. Предложения из PR лежат в `proposed/` с номером и SHA исходного PR. Аудит силы и сравнение макро из закрытого PR #196 совпали по blob SHA с файлами исходного main и входят в его снимок.

Опись фиксирует source path, commit, Git blob SHA, SHA-256 и target path. При чтении исходных Markdown используй поле `links` для перенесённых файлов, так как их относительные пути записаны применительно к исходной структуре. Для внешних зависимостей опись указывает исходный архив по зафиксированному SHA. Одна относительная ссылка в старой копии модели v1 уже не разрешается в источнике. Соответствующий [материал об эффективности вычислений](challenger/studies/AI_COMPUTE_ECONOMICS_EFFICIENCY_FRAMEWORK_v1.md) перенесён. Доступ к ссылкам обратно в исходный архив зависит от прав на тот репозиторий.

Python-эталон и его зависимости в `challenger/reference-python/` сохранены с исходным кодом и именами. Чтобы повторить исходные проверки, восстанови дерево из `source_path` по строкам MAIN описи и запусти из его корня `PYTHONPATH=src python -m pytest tests/test_challenger*.py tests/test_weekly_challenger_v2.py`. Проверено на Python 3.12.14, pytest 8.4.2, PyYAML 6.0.3, pydantic 2.13.4 и pydantic-settings 2.15.0.

Условия перехода и проверенные ревизии записаны в [протоколе переноса](../docs/RESEARCH_MIGRATION.md).
