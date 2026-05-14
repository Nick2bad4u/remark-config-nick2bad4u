---
name: "Copilot-Instructions-Remark-Config"
description: "Instructions for maintaining the shared Remark config package."
applyTo: "**"
---

# Repository role

This repository publishes `remark-config-nick2bad4u`, a shared ESM Remark preset
used across Nick2bad4u projects.

## Source of truth

- `preset.mjs` is the public package entrypoint and canonical Remark preset.
- `.remarkrc.mjs` dogfoods the local preset for repository Markdown linting.
- `index.d.ts` is the public type contract for consumers.
- `package.json` exports, dependencies, peer dependencies, and scripts define
  the release contract.

## Dependency placement

- Put Remark plugins and presets imported by `preset.mjs` in `dependencies`.
- Put project-only tools, test runners, formatters, and the local shared ESLint
  config in `devDependencies`.
- Keep `remark` and `remark-cli` as `peerDependencies` and `devDependencies` so
  consuming projects control their runner versions while this repository can
  test and lint itself.
- Do not add ESLint plugin packages directly unless this repository imports them
  outside `eslint-config-nick2bad4u`.

## Code quality

- Keep the preset self-contained by importing plugin implementations directly;
  do not export string plugin names that force consumers to install every plugin
  manually.
- Preserve `remark-preset-prettier` as the last plugin in generated configs.
- Keep network-dependent rules disabled by default unless the README documents
  the tradeoff and tests cover the behavior.
- Prefer narrow local declaration shims for untyped Remark plugins instead of
  weakening TypeScript checking.

## Validation

Before release, run:

```sh
npm run release:verify
npm run coverage
```

When package exports, public types, or dependency placement changes, package
validation must include package sorting/linting, `npm pack --dry-run`, `publint`,
and ATTW.
