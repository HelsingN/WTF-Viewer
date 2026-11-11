# WTF Viewer

Research and monitoring workspace for events, evidence, analytical models, reports and review workflows.

**First workspace:** AI CapEx Signals. **Model:** Challenger 2.1.

## Status

This repository contains the source of the existing Sites prototype, imported on 11 November 2026, and the [RU/EN product specification](docs/SPEC_RU_EN.md). The specification describes the target product; importing the prototype does not mean all acceptance criteria are implemented.

The source includes the original **dated research snapshot** from the existing Site. It is a historical import, not a live GitHub synchronization. Missing calculations and coverage remain UNKNOWN. Research remains canonical in [HelsingN/AI_CapEx_Reversal](https://github.com/HelsingN/AI_CapEx_Reversal); access may require authorization. User notes and the hosted database are not stored in this repository.

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
| `docs/SOURCE_IMPORT.md` | Import provenance, scope and verification |

## GitHub and Sites

GitHub is the development source: review changes and run checks here. Publishing to Sites is a separate, explicit operation; this repository has no automatic deployment workflow. Preserve the existing project ID when updating the existing Site. A fork must provision its own Site rather than reuse that identity.

Source code does not include a backup of D1 data, credentials or sharing settings. Keep secrets in runtime settings. Export and back up user records separately. Research data is intentionally public, as directed by the owner. Authentication credentials and runtime secrets must never be committed. User workspace exports and hosted database backups require a separate export operation.

## Prototype limits

- No live GitHub synchronization or repository mutations; statuses and links are manual.
- Challenger is not executed here. Completed calculation artifacts can be imported; previous values cannot fill missing factors.
- Macro analysis, coverage and PR states are dated snapshots. Live updates are not implemented; freshness and current commit status require verification.
- Per-user workspaces are persisted in D1 with revision checks and audit records.
- Existing authorization headers depend on the Sites gateway. Another hosting provider needs its own trusted authentication layer.
- Hosted browser persistence was not re-tested during this source-only transfer.

## По-русски

**WTF Viewer** — рабочая панель для событий, доказательств, отчётов и незавершённых проверок. Первое направление — **AI CapEx Signals**, модель — **Challenger 2.1**.

В GitHub перенесены исходники существующего прототипа, схема БД и инструкции запуска. Включены исходный датированный снимок исследований и контекст незавершённых проверок. Данные исследований публикуются по указанию владельца. Пользовательские заметки и база опубликованного приложения не экспортировались. Перенос исходников не меняет действующий сайт и не включает автоматический деплой.

Двуязычное [ТЗ](docs/SPEC_RU_EN.md) остаётся описанием целевого продукта. Работы по его полной реализации продолжаются только по отдельному поручению владельца.
