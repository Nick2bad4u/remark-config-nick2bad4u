import type { Options as RemarkTocOptions } from "remark-toc";

/** Shared `remark-toc` options used by the default preset and TOC CLI preset. */
export const tocOptions: Readonly<RemarkTocOptions> = Object.freeze({
    heading:
        // eslint-disable-next-line unicorn/prefer-string-raw -- `remark-toc` receives a regex source string.
        "(?:table[ _-]of[ _-])?contents?|toc|t\\.?o\\.?c\\.?|contents?[ _-]page|document[ _-]contents?|section[ _-]contents?|chapter[ _-]contents?|list[ _-]of[ _-]contents?",
    maxDepth: 2,
    ordered: false,
    tight: true,
});
