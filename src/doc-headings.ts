import type { DocHeadingsOptions } from "remark-lint-doc-headings";
import type { PluggableList } from "unified";

import { isDefined, objectHasOwn } from "ts-extras";

import { mergeDocHeadingsOptions } from "./doc-heading-options.js";
import {
    createConfig,
    type RemarkConfig,
    type RemarkConfigOptions,
} from "./preset.js";

/** Options for creating a Remark preset with ESLint rule-doc heading checks. */
export interface RuleDocHeadingsConfigOptions extends Omit<
    RemarkConfigOptions,
    "docHeadings" | "plugins"
> {
    /** Options merged over the selected `remark-lint-doc-headings` preset. */
    readonly docHeadings?: Readonly<DocHeadingsOptions>;
    /** Additional plugins appended after the rule-doc heading checks. */
    readonly plugins?: PluggableList;
}

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
    const docHeadings = {
        eslint: mergeDocHeadingsOptions(defaults, options.docHeadings),
    };
    const configOptions: RemarkConfigOptions = isDefined(options.plugins)
        ? { docHeadings, plugins: options.plugins }
        : { docHeadings };

    return createConfig(
        hasSettings(options)
            ? {
                  ...configOptions,
                  settings: options.settings,
              }
            : configOptions
    );
};
