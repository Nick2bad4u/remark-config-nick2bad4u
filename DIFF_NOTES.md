# Repository conversion notes

This repository was converted from an ESLint shared-config template into
`remark-config-nick2bad4u`.

The published package now exports a reusable Remark preset from `preset.mjs`.
The local `eslint.config.mjs` only consumes the external shared ESLint config
for repository linting; it is no longer part of the package runtime surface.
