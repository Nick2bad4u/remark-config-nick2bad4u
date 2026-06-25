import type { PluggableList } from "unified";

import remarkLintDocHeadings, {
    type DocHeadingsOptions,
    type H1Options,
} from "remark-lint-doc-headings";
import { isDefined, objectHasOwn } from "ts-extras";

import {
    createConfig,
    type RemarkConfig,
    type RemarkConfigOptions,
} from "./preset.js";

/** Options for creating a Remark preset with ESLint rule-doc heading checks. */
export interface RuleDocHeadingsConfigOptions extends Omit<
    RemarkConfigOptions,
    "plugins"
> {
    /** Options merged over the selected `remark-lint-doc-headings` preset. */
    readonly docHeadings?: Readonly<DocHeadingsOptions>;
    /** Additional plugins appended after the rule-doc heading checks. */
    readonly plugins?: PluggableList;
}

const mergeH1Options = (
    defaults: false | H1Options | undefined,
    overrides: false | H1Options | undefined,
    hasOverrides: boolean
): false | H1Options | undefined => {
    if (!hasOverrides) {
        return defaults;
    }

    if (overrides === false || defaults === false) {
        return overrides;
    }

    return {
        ...defaults,
        ...overrides,
    };
};

/** Merge user doc-heading options without dropping built-in heading toggles. */
export const mergeDocHeadingsOptions = (
    defaults: Readonly<DocHeadingsOptions>,
    overrides: Readonly<DocHeadingsOptions> = {}
): DocHeadingsOptions => {
    const { h1: defaultH1, ...defaultOptions } = defaults;
    const { h1: overrideH1, ...overrideOptions } = overrides;
    const h1 = mergeH1Options(
        defaultH1,
        overrideH1,
        objectHasOwn(overrides, "h1")
    );
    const mergedOptions = {
        ...defaultOptions,
        ...overrideOptions,
        headings: {
            ...defaultOptions.headings,
            ...overrideOptions.headings,
        },
    };

    return isDefined(h1)
        ? {
              ...mergedOptions,
              h1,
          }
        : mergedOptions;
};

const hasSettings = (
    options: Readonly<RuleDocHeadingsConfigOptions>
): options is Readonly<RuleDocHeadingsConfigOptions> &
    Required<Pick<RuleDocHeadingsConfigOptions, "settings">> =>
    objectHasOwn(options, "settings");

/** Create a shared config using a selected `remark-lint-doc-headings` preset. */
export const createRuleDocHeadingsConfig = (
    defaults: Readonly<DocHeadingsOptions>,
    options: Readonly<RuleDocHeadingsConfigOptions> = {}
): RemarkConfig => {
    const configOptions: RemarkConfigOptions = {
        plugins: [
            [
                remarkLintDocHeadings,
                mergeDocHeadingsOptions(defaults, options.docHeadings),
            ],
            ...(options.plugins ?? []),
        ],
    };

    return createConfig(
        hasSettings(options)
            ? {
                  ...configOptions,
                  settings: options.settings,
              }
            : configOptions
    );
};
