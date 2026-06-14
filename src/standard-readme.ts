import type { Preset } from "unified";

import standardReadmePreset from "standard-readme-preset";

/** Standard Readme preset exposed for README-only CLI usage. */
const standardReadme: Preset = Object.freeze({
    plugins: standardReadmePreset.plugins ?? [],
});

export default standardReadme;
