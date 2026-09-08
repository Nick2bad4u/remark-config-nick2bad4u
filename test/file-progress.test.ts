import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import preset from "remark-config-nick2bad4u";
import remarkLintFileProgress from "remark-lint-file-progress";
import { describe, expect, it } from "vitest";

const configPath = fileURLToPath(
    new URL("fixtures/progress-config.mjs", import.meta.url)
);
const cliPath = fileURLToPath(
    new URL("../node_modules/remark-cli/cli.js", import.meta.url)
);
const markdown = "# Project\n\nParagraph text.\n";
// eslint-disable-next-line n/no-process-env -- Real CLI subprocesses need the host environment, including Windows SystemRoot and PATH.
const inheritedEnvironment = process.env;

const runRemark = (isDisabled: boolean, input: string, isFrail = false) =>
    spawnSync(
        process.execPath,
        [
            cliPath,
            "--rc-path",
            configPath,
            "--file-path",
            "progress-example.md",
            ...(isFrail ? ["--frail"] : []),
        ],
        {
            encoding: "utf8",
            env: {
                ...inheritedEnvironment,
                CI: "true",
                FORCE_COLOR: "0",
                NODE_OPTIONS: "",
                PROGRESS_TEST_DISABLED: String(isDisabled),
            },
            input,
            timeout: 10_000,
        }
    );

describe("shared file progress", () => {
    it("uses the shared Stylelint presentation settings", () => {
        expect.assertions(1);

        expect(preset.plugins).toContainEqual([
            remarkLintFileProgress,
            {
                detailedSuccess: false,
                failureMark: "✖",
                fileNameOnNewLine: true,
                hide: false,
                hideFileName: false,
                hidePrefix: false,
                minFilesBeforeShow: 0,
                mode: "file",
                outputStream: "stderr",
                pathFormat: "relative",
                prefixMark: "•",
                showSummaryWhenHidden: false,
                spinnerStyle: "dots",
                successMark: "✔",
                successMessage: "Linting complete!",
                throttleMs: 0,
                ttyOnly: false,
            },
        ]);
    });

    it("prints multiline progress in CI and one summary without changing Markdown", () => {
        expect.assertions(7);

        const enabled = runRemark(false, markdown);
        const disabled = runRemark(true, markdown);

        expect(enabled.error).toBeUndefined();
        expect(enabled.status).toBe(0);
        expect(disabled.status).toBe(0);
        expect(enabled.stdout).toBe(disabled.stdout);
        expect(enabled.stderr).toMatch(
            /linting\r?\n {2}↳ progress-example\.md/v
        );
        expect(enabled.stderr.match(/Linting complete!/gv)).toHaveLength(1);
        expect(disabled.stderr).not.toContain("RFP");
    });

    it.each([false, true])(
        "preserves diagnostics and exit status with frail=%s",
        (isFrail) => {
            expect.assertions(6);

            const input =
                "# Project\n\n### Skipped heading\n\nParagraph text.\n";
            const enabled = runRemark(false, input, isFrail);
            const disabled = runRemark(true, input, isFrail);

            expect(enabled.error).toBeUndefined();
            expect(enabled.status).toBe(isFrail ? 1 : 0);
            expect(enabled.status).toBe(disabled.status);
            expect(enabled.stdout).toBe(disabled.stdout);
            expect(enabled.stderr).toContain("heading-increment");
            expect(enabled.stderr).toContain(disabled.stderr.trim());
        }
    );

    it("keeps preset imports and unused frozen processors quiet", () => {
        expect.assertions(3);

        const result = spawnSync(
            process.execPath,
            [
                "--input-type=module",
                "--eval",
                'import {remark} from "remark"; import preset from "remark-config-nick2bad4u"; remark().use(preset).freeze();',
            ],
            {
                encoding: "utf8",
                env: { ...inheritedEnvironment, NODE_OPTIONS: "" },
                timeout: 10_000,
            }
        );

        expect(result.status).toBe(0);
        expect(result.stdout).toBe("");
        expect(result.stderr).toBe("");
    });
});
