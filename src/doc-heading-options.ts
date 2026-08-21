import type { DocHeadingsOptions, H1Options } from "remark-lint-doc-headings";

import { isDefined, objectHasOwn } from "ts-extras";

type H1OptionOverride =
    | false
    | H1Options
    | undefined;

/** Merge user doc-heading options without dropping built-in heading toggles. */
export const mergeDocHeadingsOptions = (
    defaults: Readonly<DocHeadingsOptions>,
    overrides: Readonly<DocHeadingsOptions> = {}
): DocHeadingsOptions => {
    const { h1: defaultH1, ...defaultOptions } = defaults;
    const { h1: overrideH1, ...overrideOptions } = overrides;
    const hasH1Override = objectHasOwn(overrides, "h1");
    const overriddenH1: H1OptionOverride =
        overrideH1 === false || defaultH1 === false
            ? overrideH1
            : {
                  ...defaultH1,
                  ...overrideH1,
              };
    const h1 = hasH1Override ? overriddenH1 : defaultH1;
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
