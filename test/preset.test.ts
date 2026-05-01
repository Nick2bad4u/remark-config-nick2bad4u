import type { Preset } from "unified";

import { remark } from "remark";
import preset, {
    createConfig,
    preset as namedPreset,
    presets,
    type RemarkPluginEntry,
} from "remark-config-nick2bad4u";
import { describe, expect, it } from "vitest";

import localPreset from "../preset.mjs";

const isStringPluginEntry = (entry: RemarkPluginEntry): boolean =>
    typeof entry === "string" ||
    (Array.isArray(entry) && typeof entry[0] === "string");

describe("remark-config-nick2bad4u preset", () => {
    it("exports the shared preset as the default and named recommended preset", () => {
        expect.assertions(6);

        expect(preset).toBe(namedPreset);
        expect(preset).toBe(localPreset);
        expect(presets.all).toBe(namedPreset);
        expect(presets.recommended).toBe(namedPreset);
        expect(preset.plugins?.length ?? 0).toBeGreaterThan(0);
        expect(preset.settings?.gfm).toBeTruthy();
    });

    it("exports imported plugin implementations instead of string plugin names", () => {
        expect.assertions(1);

        const stringPluginEntries = (preset.plugins ?? []).filter((entry) =>
            isStringPluginEntry(entry)
        );

        expect(stringPluginEntries).toStrictEqual([]);
    });

    it("supports derived project-specific settings and extra plugins", () => {
        expect.assertions(5);

        const customPlugin = (): undefined => undefined;
        const derivedConfig = createConfig({
            plugins: [customPlugin],
            settings: {
                gfm: false,
                rule: "*",
            },
        });

        expect(derivedConfig).not.toBe(namedPreset);
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
