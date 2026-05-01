// @ts-check

import nick2bad4u from "eslint-config-nick2bad4u";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nick2bad4u.configs.all,
    {
        files: ["preset.mjs", ".remarkrc.mjs"],
        name: "remark-config-nick2bad4u: Remark preset overrides",
        rules: {
            "node-dependencies/absolute-version": "off",
        },
    },
];

export default config;
