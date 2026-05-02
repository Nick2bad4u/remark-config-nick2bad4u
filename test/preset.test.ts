import type { Preset } from "unified";

import { remark } from "remark";
import * as packageExports from "remark-config-nick2bad4u";
import { describe, expect, it } from "vitest";

import preset from "../preset.mjs";

describe("remark-config-nick2bad4u preset", () => {
    it("exports the shared preset as the default and named recommended preset", () => {
        expect.assertions(6);

        expect(packageExports.default).toBe(packageExports.preset);
        expect(packageExports.preset).toBe(preset);
        expect(packageExports.presets.all).toBe(packageExports.preset);
        expect(packageExports.presets.recommended).toBe(packageExports.preset);
        expect(packageExports.preset.plugins?.length ?? 0).toBeGreaterThan(0);
        expect(packageExports.preset.settings?.gfm).toBeTruthy();
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
        expect.assertions(5);

        const customPlugin = (): undefined => undefined;
        const derivedConfig = packageExports.createConfig({
            plugins: [customPlugin],
            settings: {
                gfm: false,
                rule: "*",
            },
        });

        expect(derivedConfig).not.toBe(packageExports.preset);
        expect(derivedConfig.settings.gfm).toBeFalsy();
        expect(derivedConfig.settings.rule).toBe("*");
        expect(derivedConfig.plugins).toContain(customPlugin);
        expect(derivedConfig.plugins.at(-2)).toBe(customPlugin);
    });

    it("can be loaded by Remark without missing plugin dependencies", async () => {
        expect.assertions(1);

        const file = await remark()
            .use(preset as Preset)
            .process({
                path: "readme.md",
                value: "# Project\n\nParagraph text.\n",
            });

        expect(file.messages).toStrictEqual([]);
    });
});
