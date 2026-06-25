import type { Preset } from "unified";

import { remark } from "remark";
import * as packageExports from "remark-config-nick2bad4u";
import eslintRuleDocs, {
    createEslintConfig,
} from "remark-config-nick2bad4u/eslint";
import eslintRuleDocsStrict, {
    createEslintStrictConfig,
} from "remark-config-nick2bad4u/eslint-strict";
import standardReadme from "remark-config-nick2bad4u/standard-readme";
import toc from "remark-config-nick2bad4u/toc";
import remarkLintDocHeadings, {
    type DocHeadingsOptions,
    eslintOptions,
} from "remark-lint-doc-headings";
import remarkLintFrontmatterValidation from "remark-lint-frontmatter-validation";
import { describe, expect, it } from "vitest";

import * as sourceExports from "../src/preset";

type DocHeadingsEntry = readonly [
    plugin: typeof remarkLintDocHeadings,
    options: DocHeadingsOptions,
];

const isDocHeadingsEntry = (entry: unknown): entry is DocHeadingsEntry =>
    Array.isArray(entry) && entry[0] === remarkLintDocHeadings;

const findDocHeadingsEntries = (plugins: readonly unknown[]) =>
    plugins.filter(isDocHeadingsEntry);

const findEslintDocHeadingsEntry = (plugins: readonly unknown[]) =>
    findDocHeadingsEntries(plugins).find(
        (entry) =>
            entry[1].requireDeprecatedReplacementLink ===
            eslintOptions.requireDeprecatedReplacementLink
    );

describe("remark-config-nick2bad4u preset", () => {
    it("exports the shared preset as the default and named recommended preset", () => {
        expect.assertions(8);

        expect(packageExports.default).toBe(packageExports.preset);
        expect(packageExports.preset).toBe(packageExports.default);
        expect(packageExports.presets.all).toBe(packageExports.preset);
        expect(packageExports.presets.recommended).toBe(packageExports.preset);
        expect(packageExports.preset.plugins?.length ?? 0).toBeGreaterThan(0);
        expect(packageExports.preset.settings?.gfm).toBe(true);
        expect(sourceExports.default).toBe(sourceExports.preset);
        expect(sourceExports.presets.recommended).toBe(sourceExports.preset);
    });

    it("exports imported plugin implementations instead of string plugin names", () => {
        expect.assertions(1);

        const stringPluginEntries = (
            packageExports.preset.plugins ?? []
        ).filter(
            (entry: unknown) =>
                typeof entry === "string" ||
                (Array.isArray(entry) && typeof entry[0] === "string")
        );

        expect(stringPluginEntries).toStrictEqual([]);
    });

    it("enables frontmatter validation in the shared preset", () => {
        expect.assertions(2);

        const packageEntry = packageExports.preset.plugins?.find(
            (entry: unknown) =>
                Array.isArray(entry) &&
                entry[0] === remarkLintFrontmatterValidation
        );
        const sourceEntry = sourceExports.preset.plugins.find(
            (entry) =>
                Array.isArray(entry) &&
                entry[0] === remarkLintFrontmatterValidation
        );

        expect(packageEntry).toStrictEqual([
            remarkLintFrontmatterValidation,
            true,
        ]);
        expect(sourceEntry).toStrictEqual([
            remarkLintFrontmatterValidation,
            true,
        ]);
    });

    it("enables generic and ESLint doc heading checks in the shared preset", () => {
        expect.assertions(8);

        const packageEntries = findDocHeadingsEntries(
            packageExports.preset.plugins ?? []
        );
        const sourceEntries = findDocHeadingsEntries(
            sourceExports.preset.plugins
        );

        expect(packageEntries).toHaveLength(2);
        expect(sourceEntries).toHaveLength(2);
        expect(packageEntries[0]?.[0]).toBe(remarkLintDocHeadings);
        expect(packageEntries[0]?.[1]).toStrictEqual({});
        expect(packageEntries[1]?.[0]).toBe(remarkLintDocHeadings);
        expect(packageEntries[1]?.[1]).toMatchObject({
            exclude: eslintOptions.exclude,
            h1: eslintOptions.h1,
            include: eslintOptions.include,
        });
        expect(sourceEntries[0]?.[1]).toStrictEqual({});
        expect(sourceEntries[1]?.[1]).toMatchObject({
            include: eslintOptions.include,
        });
    });

    it("supports derived project-specific settings and extra plugins", () => {
        expect.assertions(7);

        const customPlugin = (): undefined => undefined;
        const derivedConfig = packageExports.createConfig({
            plugins: [customPlugin],
            settings: {
                gfm: false,
                rule: "*",
            },
        });

        expect(derivedConfig).not.toBe(packageExports.preset);
        expect(derivedConfig.settings.gfm).toBe(false);
        expect(derivedConfig.settings.rule).toBe("*");
        expect(derivedConfig.plugins).toContain(customPlugin);
        expect(derivedConfig.plugins.at(-2)).toBe(customPlugin);

        const sourceDerivedConfig = sourceExports.createConfig({
            plugins: [customPlugin],
        });

        expect(sourceDerivedConfig).not.toBe(sourceExports.preset);
        expect(sourceDerivedConfig.plugins.at(-2)).toBe(customPlugin);
    });

    it("supports disabling or customizing built-in doc heading checks", () => {
        expect.assertions(8);

        const disabledConfig = packageExports.createConfig({
            docHeadings: false,
        });
        const eslintOnlyConfig = packageExports.createConfig({
            docHeadings: {
                generic: false,
            },
        });
        const genericOnlyConfig = packageExports.createConfig({
            docHeadings: {
                eslint: false,
                generic: {
                    h1: false,
                },
            },
        });
        const customEslintConfig = packageExports.createConfig({
            docHeadings: {
                eslint: {
                    headings: {
                        packageDocumentation: false,
                    },
                },
            },
        });
        const eslintOnlyEntries = findDocHeadingsEntries(
            eslintOnlyConfig.plugins
        );
        const genericOnlyEntries = findDocHeadingsEntries(
            genericOnlyConfig.plugins
        );
        const customEslintEntry = findEslintDocHeadingsEntry(
            customEslintConfig.plugins
        );

        expect(findDocHeadingsEntries(disabledConfig.plugins)).toHaveLength(0);
        expect(eslintOnlyEntries).toHaveLength(1);
        expect(eslintOnlyEntries[0]?.[1].include).toBe(eslintOptions.include);
        expect(genericOnlyEntries).toHaveLength(1);
        expect(genericOnlyEntries[0]?.[1]).toStrictEqual({
            h1: false,
        });
        expect(customEslintEntry?.[1].headings?.correct).toBe(true);
        expect(customEslintEntry?.[1].headings?.packageDocumentation).toBe(
            false
        );
        expect(customEslintEntry?.[1].include).toBe(eslintOptions.include);
    });

    it("can be loaded by Remark without missing plugin dependencies", async () => {
        expect.assertions(1);

        const file = await remark()
            .use(packageExports.preset as Preset)
            .process({
                path: "readme.md",
                value: "# Project\n\nParagraph text.\n",
            });

        expect(file.messages).toStrictEqual([]);
    });

    it("uses the shared table of contents settings in the default preset", async () => {
        expect.assertions(1);

        const file = await remark()
            .use(packageExports.preset as Preset)
            .process({
                path: "README.md",
                value: [
                    "# Project",
                    "",
                    "## Contents",
                    "",
                    "## Install",
                    "",
                    "Install instructions.",
                    "",
                    "## Usage",
                    "",
                    "Usage instructions.",
                    "",
                ].join("\n"),
            });

        expect(String(file)).toContain(
            [
                "## Contents",
                "",
                "- [Install](#install)",
                "- [Usage](#usage)",
            ].join("\n")
        );
    });

    it("exposes Standard Readme as a separate README-only preset", async () => {
        expect.assertions(1);

        const file = await remark()
            .use(standardReadme)
            .process({
                path: "README.md",
                value: [
                    "# remark-config-nick2bad4u",
                    "",
                    "## Contributing",
                    "",
                    "Open an issue.",
                    "",
                    "## License",
                    "",
                    "MIT",
                    "",
                ].join("\n"),
            });

        expect(file.messages).toStrictEqual([]);
    });

    it("exposes ESLint rule documentation heading presets as separate subpath presets", () => {
        expect.assertions(4);

        const eslintEntry = findEslintDocHeadingsEntry(eslintRuleDocs.plugins);
        const strictEntry = findEslintDocHeadingsEntry(
            eslintRuleDocsStrict.plugins
        );

        expect(eslintEntry?.[0]).toBe(remarkLintDocHeadings);
        expect(eslintRuleDocs.plugins.at(-2)).toBe(eslintEntry);
        expect(strictEntry?.[0]).toBe(remarkLintDocHeadings);
        expect(eslintRuleDocsStrict.plugins.at(-2)).toBe(strictEntry);
    });

    it("supports configurable ESLint rule documentation heading options", () => {
        expect.assertions(10);

        const customPlugin = (): undefined => undefined;
        const config = createEslintConfig({
            docHeadings: {
                allowUnknownHeadings: true,
                h1: {
                    allowedTitles: ["custom-rule"],
                },
                headings: {
                    adoptionResources: false,
                    packageDocumentation: false,
                },
                include: ["docs/rules/**/*.md", "docs/custom-rules/**/*.md"],
            },
            plugins: [customPlugin],
            settings: {
                rule: "*",
            },
        });
        const strictConfig = createEslintStrictConfig({
            docHeadings: {
                headings: {
                    packageDocumentation: false,
                },
            },
        });
        const entry = findEslintDocHeadingsEntry(config.plugins);
        const strictEntry = findEslintDocHeadingsEntry(strictConfig.plugins);

        expect(entry?.[0]).toBe(remarkLintDocHeadings);
        expect(entry?.[1].allowUnknownHeadings).toBe(true);
        expect(entry?.[1].include).toStrictEqual([
            "docs/rules/**/*.md",
            "docs/custom-rules/**/*.md",
        ]);
        expect(entry?.[1].headings?.correct).toBe(true);
        expect(entry?.[1].headings?.packageDocumentation).toBe(false);
        expect(entry?.[1].h1).toMatchObject({
            allowedTitles: ["custom-rule"],
            requireExactlyOne: true,
            requireFileNameMatch: true,
        });
        expect(config.plugins.at(-2)).toBe(customPlugin);
        expect(config.settings.rule).toBe("*");
        expect(strictEntry?.[0]).toBe(remarkLintDocHeadings);
        expect(strictEntry?.[1].requirePackageDocumentation).toBe(true);
    });

    it("can attach the ESLint rule documentation heading presets to Remark", () => {
        expect.assertions(2);

        expect(() =>
            remark()
                .use(eslintRuleDocs as Preset)
                .freeze()
        ).not.toThrow();
        expect(() =>
            remark()
                .use(eslintRuleDocsStrict as Preset)
                .freeze()
        ).not.toThrow();
    });

    it("exposes table of contents generation as a separate CLI preset", async () => {
        expect.assertions(1);

        const file = await remark()
            .use(toc)
            .process({
                path: "README.md",
                value: [
                    "# Project",
                    "",
                    "## Contents",
                    "",
                    "## Install",
                    "",
                    "Install instructions.",
                    "",
                    "## Usage",
                    "",
                    "Usage instructions.",
                    "",
                ].join("\n"),
            });

        expect(String(file)).toContain(
            [
                "## Contents",
                "",
                "* [Install](#install)",
                "* [Usage](#usage)",
            ].join("\n")
        );
    });

    it("reports stale table of contents entries before generation", async () => {
        expect.assertions(1);

        const file = await remark()
            .use(toc)
            .process({
                path: "README.md",
                value: [
                    "# Project",
                    "",
                    "## Table of Contents",
                    "",
                    "1. [Wrong](#wrong)",
                    "",
                    "## Install",
                    "",
                    "Install instructions.",
                    "",
                ].join("\n"),
            });

        expect(file.messages.map((message) => message.ruleId)).toContain(
            "check-toc"
        );
    });
});
