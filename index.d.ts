import type { Pluggable, PluggableList, Preset } from "unified";

/** Remark preset exported by this package. */
export interface RemarkConfig extends Preset {
    readonly plugins: PluggableList;
    readonly settings: RemarkSettings;
}

/** Options for creating a derived Remark preset. */
export interface RemarkConfigOptions {
    /** Additional plugins appended before `remark-preset-prettier`. */
    readonly plugins?: PluggableList;

    /** Settings merged over the shared defaults. */
    readonly settings?: Readonly<Partial<RemarkSettings>>;
}

/** Remark plugin, plugin tuple, or preset entry accepted by Unified. */
export type RemarkPluginEntry = Pluggable;

/** Shared Remark processor settings used by the Nick2bad4u preset. */
export interface RemarkSettings {
    readonly bullet?: "*" | "+" | "-";
    readonly closeAtx?: boolean;
    readonly commonmark?: boolean;
    readonly emphasis?: "*" | "_";
    readonly fence?: "`" | "~";
    readonly fences?: boolean;
    readonly gfm?: boolean;
    readonly incrementListMarker?: boolean;
    readonly listItemIndent?: "mixed" | "one" | "tab";
    readonly quote?: "'" | '"';
    readonly referenceLinks?: boolean;
    readonly resourceLink?: boolean;
    readonly rule?: string;
    readonly ruleRepetition?: number;
    readonly ruleSpaces?: boolean;
    readonly setext?: boolean;
    readonly strong?: "*" | "_";
    readonly style?: "ordered";
    readonly thematicBreak?: "***" | "---";
    readonly tightDefinitions?: boolean;
    readonly yaml?: boolean;
}

/** Create a Remark preset from the shared Nick2bad4u defaults. */
export declare const createConfig: (
    options?: Readonly<RemarkConfigOptions>
) => RemarkConfig;

/** Shared recommended Remark preset. */
export declare const preset: RemarkConfig;

/** Named Remark presets. */
export declare const presets: {
    readonly all: RemarkConfig;
    readonly recommended: RemarkConfig;
};

export default preset;
