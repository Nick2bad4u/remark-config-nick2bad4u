import nickTwoBadFourU from "eslint-config-nick2bad4u";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.all,

    {
        files: ["preset.mjs"],
        languageOptions: {
            parserOptions: {
                project: false,
                projectService: {
                    allowDefaultProject: ["preset.mjs"],
                },
            },
        },
    },

    // Add repository-specific config entries below as needed.
];

export default config;
