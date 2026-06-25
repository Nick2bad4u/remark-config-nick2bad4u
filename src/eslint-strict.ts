import { eslintStrictOptions } from "remark-lint-doc-headings";

import type { RemarkConfig } from "./preset.js";

import {
    createRuleDocHeadingsConfig,
    type RuleDocHeadingsConfigOptions,
} from "./doc-headings.js";

/** Create a strict shared Remark preset for ESLint rule documentation. */
export const createEslintStrictConfig = (
    options: Readonly<RuleDocHeadingsConfigOptions> = {}
): RemarkConfig => createRuleDocHeadingsConfig(eslintStrictOptions, options);

/** Strict shared Remark preset for ESLint rule documentation. */
export const eslintStrict: RemarkConfig = Object.freeze(
    createEslintStrictConfig()
);

export default eslintStrict;
