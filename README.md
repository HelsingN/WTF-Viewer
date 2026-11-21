# WTF Viewer

Research and monitoring workspace for events, evidence, analytical models, reports and review workflows.

**First workspace:** AI CapEx Signals. **Model:** Challenger 2.1.

## Status and phase-one scope

The working `develop` branch contains the verified migration of Challenger research and complete report files. The Sites prototype still serves its original snapshot.

Phase one v1.2 is a **reader for complete Challenger research, daily/weekly reports and imported workflow statuses**, with **deterministic on-demand/reload Challenger calculation from accepted structured inputs**. Site notes, report drafting, research decisions, persistent manual editing and GitHub write actions follow later editorial authorization.

**Working source: HelsingN/WTF-Viewer, branch `develop`.** AI_CapEx_Reversal retains source history. [Research files and reports](research/README.md) · [Migration record](docs/RESEARCH_MIGRATION.md).

First synchronization is manual: pinned GitHub WTF-Viewer commit → validated full-content package → user import. Local calculation/download is not publication. Automated package delivery and supported read-only Refresh come later. Existing private Site access, identity and D1 records are preserved.

## Release plan

[Решения 1.1–1.4](docs/PHASE1_SCOPE_DECISIONS_RU.md), [RU/EN specification v1.2](docs/SPEC_RU_EN.md) and [единый план выпуска](docs/UPDATE_PLAN_RU.md) define the revised delivery sequence: migration/cutover → packages/manual sync → Python-compatible browser calculation → complete research/report reader → coverage/context → bilingual adaptive UI → release checks.

The integrated [design appendix/mockup](docs/design/README.md) remains part of v1.2; preserve WTF Viewer → AI CapEx Signals → Challenger 2.1. [Acceptance](docs/ACCEPTANCE_TRACKER.md) requires B01–B10 and D01–D06 for this phase; original A01–A18 retain their full-workspace backlog meanings. The original [baseline](docs/IMPLEMENTATION_BASELINE.md) remains historical; documentation rescoping 0R and the stage 1 migration to `develop` are complete. Package import and application implementation remain pending.

## Run locally

Requires Node.js >=22.13.0 (Node 24 recommended) and npm.

```sh
npm run install:ci
npm run check
npm run build
```

Initialize the local D1 database after building:

```sh
npx wrangler d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_late_dragon_lord.sql
npm run dev
```

Open http://localhost:5173. The portable development profile supports a loopback-only mock ChatGPT sign-in at `/signin-with-chatgpt?return_to=/`. This mock is excluded from production. If storage reports unavailable, verify that the local migrations were applied; preview data is separate from hosted data. Do not expose the development server to the Internet.

See [development details](docs/DEVELOPMENT.md) for the supplied Sites runtime helpers.

## Source map

| Path | Purpose |
| --- | --- |
| `app/desk.tsx` | RU/EN dashboard, calendar, reports, checks, manual tracking and imports |
| `app/api/workspace/route.ts` | Authenticated persistence, revision conflicts and audit history |
| `lib/workspace.ts` | Workspace schema, report gates and calculation artifact checks |
| `lib/seed.json` | Original dated research snapshot: events, reports, calculations, coverage, macro analysis and PR status |
| `db/`, `drizzle/` | D1 schema and migrations |
| `worker/`, `vite.config.ts` | Worker entry point and Vinext build |
| `.openai/hosting.json` | Existing Sites project identity and storage binding; no credentials |
| `docs/SPEC_RU_EN.md` | Product and technical specification |
| `docs/PHASE1_SCOPE_DECISIONS_RU.md` | Revised reader/calculator scope, canonical migration and manual synchronization decisions |
| `docs/SOURCE_IMPORT.md` | Import provenance, scope and verification |

## GitHub and Sites

GitHub is the development source: review changes and run checks here. Publishing to Sites is a separate, explicit operation; this repository has no automatic deployment workflow. Preserve the existing project ID when updating the existing Site. A fork must provision its own Site rather than reuse that identity.

Source code does not include a backup of D1 data, credentials or sharing settings. Keep secrets in runtime settings. Export and back up user records separately. Research data is intentionally public, as directed by the owner. Authentication credentials and runtime secrets must never be committed. User workspace exports and hosted database backups require a separate export operation.

## Current prototype limits (before the planned upgrade)

- No live GitHub synchronization or repository mutations; statuses and links are manual.
- The current prototype imports completed calculation artifacts. On-demand/reload browser calculation is planned and requires parity with the pinned Python reference; it is not implemented yet. Previous values cannot fill missing factors.
- Macro analysis, coverage and PR states are dated snapshots. Live updates are not implemented; freshness and current commit status require verification.
- Per-user workspaces are persisted in D1 with revision checks and audit records.
- Existing authorization headers depend on the Sites gateway. Another hosting provider needs its own trusted authentication layer.
- Hosted browser persistence was not re-tested during this source-only transfer.

## По-русски

**WTF Viewer** — рабочая панель для событий, доказательств, отчётов и незавершённых проверок. Первое направление — **AI CapEx Signals**, модель — **Challenger 2.1**.

В GitHub перенесены исходники существующего прототипа, схема БД и инструкции запуска. Включены исходный датированный снимок исследований и контекст незавершённых проверок. Данные исследований публикуются по указанию владельца. Пользовательские заметки и база опубликованного приложения не экспортировались. Перенос исходников не меняет действующий сайт и не включает автоматический деплой.

Двуязычное [ТЗ](docs/SPEC_RU_EN.md) остаётся описанием целевого продукта. Работы по его полной реализации продолжаются только по отдельному поручению владельца.


Актуальное назначение первой версии: просмотр полных исследований/ежедневных/еженедельных отчётов и импортированных статусов; ручное обновление из GitHub WTF-Viewer; пересчёт Challenger по проверенным входам по кнопке/reload. Текущий рабочий источник перенесённых материалов — WTF-Viewer `develop`. AI_CapEx_Reversal хранит исходную историю. Заметки, подготовка отчётов и редакторские решения — последующие версии с правами. Материалы доступны в [разделе исследований](research/README.md). Сайт пока использует встроенный исторический снимок.
