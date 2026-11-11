# Source import — 11 November 2026

- Destination: `HelsingN/WTF-Viewer`, branch `main`.
- Source: existing Sites project `appgprj_6af488a9252481919df8e2a0e4fdeada`, version 2.
- Retrieved source commit: `6a7f18d33a84c8d81ddbfa873a84794f393b2ed9` in the Sites-managed repository (not a GitHub commit).
- Existing GitHub base: `f222a20ffc67cccfc602640fd0eb463972ab45ea`.

## Export changes

The runtime source, dependency lockfile, D1 schema/migrations and Sites build helpers were copied without the source Git history. The embedded research snapshot and cutoff-specific default tasks/conclusions were removed. The public dataset is empty, with explicit UNKNOWN display states and no placeholder numeric result. The dashboard branding and specification link use WTF Viewer and the existing v1.1 specification. The starter README is retained as `docs/DEVELOPMENT.md`; the root README describes the actual project.

`docs/SPEC_RU_EN.md` is retained from the destination repository without modification. Old duplicate specification copies and the old validation report were not exported.

No hosted data, user notes, workspace revisions, runtime credentials, access policies, build archives, dependencies or database files were transferred. The existing Site publication and source repository were not updated. The private research repository was not changed.

## Validation

- PASS: clean dependency installation via the supplied install helper.
- PASS: `npm run check` — preserved research rules with synthetic fixtures, report gates, append-only history and empty public dataset.
- PASS: `npm run build` — portable Vinext production build produces a Worker bundle.
- PASS: `npx tsc --noEmit` — TypeScript check.
- PASS: targeted credential-pattern scan of exported files; no credentials found.
- Browser interactions and hosted persistence were not re-tested during this source-only transfer.

## Deployment boundary

GitHub commits do not automatically deploy this Site. Publish an explicitly selected, verified source revision through Sites. Preserve project identity and existing D1 bindings when updating the original Site. Do not treat this source import as a database migration or backup.
