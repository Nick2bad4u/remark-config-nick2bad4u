# remark-config-nick2bad4u

[![NPM license.](https://flat.badgen.net/npm/license/remark-config-nick2bad4u?color=purple)](https://github.com/Nick2bad4u/remark-config-nick2bad4u/blob/main/LICENSE) [![NPM total downloads.](https://flat.badgen.net/npm/dt/remark-config-nick2bad4u?color=pink)](https://www.npmjs.com/package/remark-config-nick2bad4u) [![Latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/remark-config-nick2bad4u?color=cyan)](https://github.com/Nick2bad4u/remark-config-nick2bad4u/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/remark-config-nick2bad4u?color=yellow)](https://github.com/Nick2bad4u/remark-config-nick2bad4u/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/remark-config-nick2bad4u?color=orange)](https://github.com/Nick2bad4u/remark-config-nick2bad4u/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/remark-config-nick2bad4u?color=red)](https://github.com/Nick2bad4u/remark-config-nick2bad4u/issues) [![Codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/remark-config-nick2bad4u?color=blue)](https://codecov.io/gh/Nick2bad4u/remark-config-nick2bad4u) [![Repo Checks.](https://flat.badgen.net/github/checks/nick2bad4u/remark-config-nick2bad4u?color=green)](https://github.com/Nick2bad4u/remark-config-nick2bad4u/actions)

Shared Remark configuration for Nick2bad4u projects.

## Install

```sh
npm install --save-dev remark-config-nick2bad4u remark remark-cli
```

The package ships the Remark plugins and lint presets it enables, so consuming
repositories only need the shared config plus the Remark runner they use.

## Basic usage

Create `.remarkrc.mjs` in a consuming project:

```js
import remarkConfig from "remark-config-nick2bad4u";

export default remarkConfig;
```

Then add scripts similar to these:

```json
{
 "scripts": {
  "lint:remark": "npx remark . --frail --ignore-path .remarkignore",
  "lint:remark:fix": "npx remark . --ignore-path .remarkignore --output"
 }
}
```

Use `.remarkignore` for generated output, dependency folders, coverage reports,
and any project-specific Markdown that should not be rewritten automatically.
The default preset also checks Markdown-family files for generic document
heading hygiene and applies the ESLint rule-documentation heading contract only
to matching rule docs under `docs/rules`.

For README-only Standard Readme checks, use this package's CLI-loadable
Standard Readme subpath:

```sh
npx remark -u remark-config-nick2bad4u/standard-readme README.md --frail --no-stdout
```

Copy-paste npm script:

```json
{
 "scripts": {
  "lint:readme": "npx remark -u remark-config-nick2bad4u/standard-readme README.md --frail --no-stdout"
 }
}
```

That subpath is separate from the default shared preset so Standard Readme's
README-specific filename and section rules do not run against every Markdown
file in a repository.

For table of contents checks and generation, use the separate TOC subpath:

```sh
npx remark -u remark-config-nick2bad4u/toc README.md --frail --no-stdout
npx remark -u remark-config-nick2bad4u/toc README.md --output
```

Copy-paste npm scripts:

```json
{
 "scripts": {
  "lint:toc": "npx remark -u remark-config-nick2bad4u/toc README.md --frail --no-stdout",
  "lint:toc:fix": "npx remark -u remark-config-nick2bad4u/toc README.md --output"
 }
}
```

The TOC subpath checks existing TOCs before running the generator. It updates
the list below a `Contents`, `Table of Contents`, `Table-of-Contents`, or `TOC`
heading, so the file still needs that heading where the generated list should
appear.

The default preset already enables the standard ESLint rule documentation
heading checks for direct Markdown files under `docs/rules`. Use the separate
ESLint docs subpath when a repository wants to make that convention explicit:

```js
import eslintRuleDocs from "remark-config-nick2bad4u/eslint";

export default eslintRuleDocs;
```

That preset keeps the shared Remark defaults and configures
`remark-lint-doc-headings` with its built-in ESLint rule-documentation heading
rules. The shared root preset narrows the ESLint-specific check to
`docs/rules/*.md`, while the explicit ESLint subpath keeps the plugin's built-in
path options.

Use the strict variant when rule docs should also require package documentation
labels and rule catalog markers:

```js
import eslintRuleDocsStrict from "remark-config-nick2bad4u/eslint-strict";

export default eslintRuleDocsStrict;
```

Use the factory when a repo needs to adjust the heading contract, matched paths,
or shared Remark settings:

```js
import { createEslintConfig } from "remark-config-nick2bad4u/eslint";

export default createEslintConfig({
 docHeadings: {
  include: ["docs/rules/**/*.md", "docs/custom-rules/**/*.md"],
  headings: {
   adoptionResources: false,
   packageDocumentation: false,
  },
  h1: {
   allowedTitles: ["custom-rule-name"],
  },
 },
});
```

The `docHeadings` object is merged over the plugin's built-in ESLint rule-doc
options. Nested `headings` and `h1` values are merged, so a repo can disable one
built-in heading or add an allowed H1 title without redefining the whole preset.
Use `createEslintStrictConfig` from `remark-config-nick2bad4u/eslint-strict`
for the same customization against the strict defaults.

## Derived project config

Use `createConfig` when a project needs local settings or extra plugins while
keeping the shared preset as the base:

```js
import { createConfig } from "remark-config-nick2bad4u";

export default createConfig({
 settings: {
  gfm: true,
  rule: "*",
 },
 docHeadings: {
  // Both checks are enabled by default. Set either key to false to disable it.
  generic: {},
  eslint: {
   headings: {
    packageDocumentation: false,
   },
  },
 },
 plugins: [
  // Project-specific Remark plugins go here. They are inserted before
  // remark-preset-prettier so formatting normalization still runs last.
 ],
});
```

Set `docHeadings: false` to disable both built-in doc-heading checks. Set
`docHeadings.generic` or `docHeadings.eslint` to `false` to disable only that
entry.

Named imports are also available:

```js
import { preset, presets } from "remark-config-nick2bad4u";

export default presets.recommended;
```

Available named presets:

- `preset` - the shared recommended preset.
- `presets.recommended` - alias for `preset`.
- `presets.all` - alias for `preset`.

## Included capabilities

The shared preset includes support for:

- GitHub Flavored Markdown via `remark-gfm`.
- YAML frontmatter via `remark-frontmatter`.
- Directive syntax via `remark-directive`.
- Math syntax via `remark-math`.
- Wiki-style links via `remark-wiki-link`.
- Internal link validation via `remark-validate-links`.
- Table of contents maintenance via `remark-toc` and
  `remark-lint-check-toc`.
- The recommended, consistent, and Markdown style guide Remark lint presets.
- Additional lint rules for headings, lists, tables, code fences, references,
  file names, task lists, MDX JSX nodes, and prose quality.
- Generic document heading checks for Markdown-family files and ESLint rule
  documentation heading checks for direct Markdown files under `docs/rules`.
- Prettier-compatible normalization via `remark-preset-prettier`.
- Separate ESLint rule documentation heading presets at
  `remark-config-nick2bad4u/eslint` and
  `remark-config-nick2bad4u/eslint-strict`.
- A separate README-only Standard Readme preset export at
  `remark-config-nick2bad4u/standard-readme`.
- A separate table of contents preset export at
  `remark-config-nick2bad4u/toc`.

Network URL checks from `remark-lint-no-dead-urls` are installed but disabled in
the default preset because they can make local and CI runs slow or flaky. Enable
that rule in a derived project config only when the project explicitly wants
network-dependent checks.

## Local development

The preset is authored in `src/preset.ts`. `npm run build` compiles the
published runtime and declarations into `dist/`, which is what the package
exports and what this repository's `.remarkrc.mjs` loads.

Use the aggregate scripts before publishing or opening a pull request:

```sh
npm run lint:all
npm run release:verify
```

The verification pipeline runs typechecking, Vitest tests, ESLint, Remark,
Prettier, package sorting/linting, `publint`, ATTW in ESM-only mode, YAML lint,
and Secretlint. Release notes are generated with `git-cliff` via the
`changelog:*` scripts.

For maintainers, see [MAINTAINER\_GUIDE.md](./MAINTAINER_GUIDE.md).
