# Maintainer guide: shared Remark preset

## 1) Add or edit Remark rules

1. Open `preset.mjs`.
2. Import the Remark plugin implementation directly from its package.
3. Add the plugin function, or `[plugin, options]` tuple, to `sharedPlugins`.
4. Keep `remark-preset-prettier` last by appending project-specific plugins
   through `createConfig` before that final preset.
5. Add or update tests in `test/preset.test.ts` when public API behavior,
   plugin ordering, or config defaults change.

Do not export string plugin names from the shared preset. Direct imports are
required so downstream projects can consume the config without installing every
individual Remark plugin as a direct dependency.

## 2) Add a new plugin dependency

1. Add the plugin package to `dependencies` in `package.json`.
2. Import it in `preset.mjs`.
3. Configure it in `sharedPlugins` with conservative defaults.
4. Document noteworthy behavior or intentionally disabled rules in `README.md`.
5. Run package validation because dependency and public package surfaces changed.

## 3) Add a project-specific override example

Prefer documenting overrides with `createConfig` instead of adding package-level
presets for every downstream repository:

```js
import { createConfig } from "remark-config-nick2bad4u";

export default createConfig({
    settings: {
        rule: "*",
    },
    plugins: [
        // Local Remark plugins go here.
    ],
});
```

## 4) Validation checklist (required)

Run before pushing:

```sh
npm run lint:all
npm run release:verify
```

Optional release notes preview:

```sh
npm run changelog:preview
```

If `git-cliff` reports missing refs locally, ensure your local branch has at
least one commit and tracks the expected branch ref.
