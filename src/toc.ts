import type { Preset } from "unified";

import remarkLintCheckTOC from "remark-lint-check-toc";
import remarkToc from "remark-toc";

/** Table of contents preset exposed for CLI generation and checking. */
const toc: Preset = Object.freeze({
    plugins: [
        remarkLintCheckTOC,
        [
            remarkToc,
            {
                heading:
                    // eslint-disable-next-line unicorn/prefer-string-raw -- This is a regex, not a string.
                    "(?:table[ _-]of[ _-])?contents?|toc|t\\.?o\\.?c\\.?|contents?[ _-]page|document[ _-]contents?|section[ _-]contents?|chapter[ _-]contents?|list[ _-]of[ _-]contents?",
                maxDepth: 2,
                ordered: false,
                tight: true,
            },
        ],
    ],
});

export default toc;
