---
name: "Remark-Config-Docs"
description: "Instructions for documenting the shared Remark config package."
applyTo: "docs/**, **/*.md"
---

# Documentation guidance

- Document consumer-facing usage in `README.md` first.
- Prefer `.remarkrc.mjs` examples that import `remark-config-nick2bad4u`.
- Explain dependency expectations clearly: consumers install the shared config
  plus their Remark runner, while this package ships the plugins it enables.
- When documenting a disabled-by-default rule, include the reason and the
  tradeoff, especially for network-dependent checks.
- Keep examples ESM-first and compatible with the package's Node engine floor.
- Run `npm run lint:remark` and `npm run lint:prettier` after documentation
  edits.
