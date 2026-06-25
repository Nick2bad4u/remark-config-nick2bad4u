import { eslintOptions } from "remark-lint-doc-headings";

import type { RemarkConfig } from "./preset.js";

import {
    createRuleDocHeadingsConfig,
    type RuleDocHeadingsConfigOptions,
} from "./doc-headings.js";

/** Create a shared Remark preset for ESLint rule documentation. */
export const createEslintConfig = (
    options: Readonly<RuleDocHeadingsConfigOptions> = {}
): RemarkConfig => createRuleDocHeadingsConfig(eslintOptions, options);

/** Shared Remark preset for ESLint rule documentation. */
export const eslint: RemarkConfig = Object.freeze(createEslintConfig());

export default eslint;
