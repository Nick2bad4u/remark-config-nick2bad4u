import type { Preset } from "unified";

import remarkLintCheckTOC from "remark-lint-check-toc";
import remarkToc from "remark-toc";

import { tocOptions } from "./toc-options.js";

/** Table of contents preset exposed for CLI generation and checking. */
const toc: Preset = Object.freeze({
    plugins: [remarkLintCheckTOC, [remarkToc, tocOptions]],
});

export default toc;
