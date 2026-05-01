import type { RemarkConfig, RemarkConfigOptions } from "./index.d.ts";

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
