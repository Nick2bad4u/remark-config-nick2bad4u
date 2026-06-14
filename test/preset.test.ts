import type { Preset } from "unified";

import { remark } from "remark";
import * as packageExports from "remark-config-nick2bad4u";
import standardReadme from "remark-config-nick2bad4u/standard-readme";
import { describe, expect, it } from "vitest";

import * as sourceExports from "../src/preset";

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
            (entry) =>
                typeof entry === "string" ||
                (Array.isArray(entry) && typeof entry[0] === "string")
        );

        expect(stringPluginEntries).toStrictEqual([]);
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
});
