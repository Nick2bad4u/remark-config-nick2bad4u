---
name: "Remark-Config-Tests"
description: "Instructions for testing the shared Remark config package."
applyTo: "test/**, tests/**"
---

# Testing guidance

- Use Vitest for package tests.
- Keep tests coupled to the public package API (`remark-config-nick2bad4u`) so
  exports, declarations, and runtime loading are validated together.
- Verify that the preset exposes imported plugin implementations, not string
  plugin names.
- Include at least one runtime smoke test that loads the preset through
  `remark().use(...)` and processes Markdown without missing dependency errors.
- When adding a config option or plugin ordering rule, test the public behavior
  instead of implementation details.
- Keep tests strict and typechecked; avoid `any`, broad casts, and snapshots for
  values that can be asserted directly.
