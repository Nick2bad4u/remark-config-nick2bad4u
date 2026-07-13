import type { DocHeadingsOptions, H1Options } from "remark-lint-doc-headings";

import { isDefined, objectHasOwn } from "ts-extras";

type H1OptionOverride =
    | false
    | H1Options
    | undefined;

const mergeH1Options = (
    defaults: H1OptionOverride,
    overrides: H1OptionOverride,
    hasOverrides: boolean
): H1OptionOverride => {
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
