import type { PluggableList } from "unified";

import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { remark } from "remark";
import { createConfig, createRepositoryConfig } from "remark-config-nick2bad4u";
import remarkLintFileProgress from "remark-lint-file-progress";
import remarkValidateLinks from "remark-validate-links";
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import { createRepositoryConfig as createSourceRepositoryConfig } from "../src/preset";

const quietOptions = {
    plugins: [[remarkLintFileProgress, false]] satisfies PluggableList,
};

const initializeRepository = (cwd: string, name: string) => {
    // eslint-disable-next-line sonarjs/no-os-command-from-path -- Integration fixtures use the installed Git executable with fixed arguments.
    execFileSync("git", [
        "init",
        "--quiet",
        cwd,
    ]);
    execFileSync(
        // eslint-disable-next-line sonarjs/no-os-command-from-path -- The URL is fixture data passed as a separate argument, without a shell.
        "git",
        [
            "remote",
            "add",
            "origin",
            `https://github.com/example/${name}.git`,
        ],
        { cwd }
    );
};

describe.each([
    { createRepositoryConfig, name: "published package" },
    { createRepositoryConfig: createSourceRepositoryConfig, name: "source" },
])(
    "repository-scoped link validation ($name)",
    ({ createRepositoryConfig }) => {
        let directory = "";
        let repository = "";
        let nestedRepository = "";

        // eslint-disable-next-line vitest/no-hooks -- The integration suite shares isolated Git fixtures and removes them after the suite.
        beforeAll(async () => {
            directory = await mkdtemp(
                path.join(tmpdir(), "remark-repository-links-")
            );
            repository = path.join(directory, "project");
            nestedRepository = path.join(repository, "nested");
            await mkdir(path.join(repository, "docs"), { recursive: true });
            await mkdir(nestedRepository);
            initializeRepository(repository, "project");
            initializeRepository(nestedRepository, "nested");
            await writeFile(path.join(repository, "target.md"), "# Target\n");
        });

        // eslint-disable-next-line vitest/no-hooks -- Restore PATH even when the no-per-file-Git regression assertion fails.
        afterEach(() => {
            vi.unstubAllEnvs();
        });

        // eslint-disable-next-line vitest/no-hooks -- Remove only the unique directory returned by mkdtemp for this suite.
        afterAll(async () => {
            await rm(directory, { force: true, recursive: true });
        });

        it("preserves output and diagnostics for nested files", async () => {
            expect.assertions(3);

            const config = await createRepositoryConfig(
                pathToFileURL(path.join(repository, "docs")),
                quietOptions
            );
            const file = {
                cwd: repository,
                path: "docs/example.md",
                value: "# Example\n\n[Target](../target.md) [Missing](../missing.md) [Heading](#missing)\n",
            };
            const expected = await remark()
                .use(createConfig(quietOptions))
                .process(file);
            const actual = await remark().use(config).process(file);

            expect(String(actual)).toBe(String(expected));
            expect(actual.messages.map(String)).toStrictEqual(
                expected.messages.map(String)
            );
            expect(
                actual.messages.some(
                    (message) =>
                        message.source?.startsWith("remark-validate-links:") ??
                        false
                )
            ).toBe(true);
        });

        it("does not require Git while processing subsequent documents", async () => {
            expect.assertions(2);

            const config = await createRepositoryConfig(
                repository,
                quietOptions
            );
            vi.stubEnv("PATH", directory);
            for (const name of ["first", "second"]) {
                const result = await remark()
                    .use(config)
                    .process({
                        cwd: repository,
                        path: `${name}.md`,
                        value: "# Example\n\n[Missing](missing.md)\n",
                    });

                expect(
                    result.messages.some(
                        (message) =>
                            message.source?.startsWith(
                                "remark-validate-links:"
                            ) ?? false
                    )
                ).toBe(true);
            }
        });

        it("keeps independently scoped nested repositories separate", async () => {
            expect.assertions(2);

            const outer = await createRepositoryConfig(
                repository,
                quietOptions
            );
            const nested = await createRepositoryConfig(
                nestedRepository,
                quietOptions
            );
            const input = {
                cwd: repository,
                path: path.join(nestedRepository, "example.md"),
                value: "# Example\n\n[Target](/target.md)\n",
            };
            const outerFile = await remark().use(outer).process(input);
            const nestedFile = await remark().use(nested).process(input);

            expect(
                outerFile.messages.filter(
                    (message) =>
                        message.source?.startsWith("remark-validate-links:") ??
                        false
                )
            ).toHaveLength(0);
            expect(
                nestedFile.messages.filter(
                    (message) =>
                        message.source?.startsWith("remark-validate-links:") ??
                        false
                )
            ).toHaveLength(1);
        });

        it("honors native validator disabling and options overrides", async () => {
            expect.assertions(2);

            const file = {
                cwd: repository,
                path: "example.md",
                value: "# Example\n\n[Missing](missing.md)\n",
            };
            for (const override of [
                false,
                { skipPathPatterns: ["missing"] },
            ] as const) {
                const config = await createRepositoryConfig(repository, {
                    plugins: [
                        ...quietOptions.plugins,
                        [remarkValidateLinks, override],
                    ],
                });
                const result = await remark().use(config).process(file);

                expect(
                    result.messages.filter(
                        (message) =>
                            message.source?.startsWith(
                                "remark-validate-links:"
                            ) ?? false
                    )
                ).toHaveLength(0);
            }
        });

        it("preserves explicit repository and root overrides", async () => {
            expect.assertions(1);

            const config = await createRepositoryConfig(repository, {
                plugins: [
                    ...quietOptions.plugins,
                    [
                        remarkValidateLinks,
                        {
                            repository: "https://github.com/example/nested.git",
                            root: nestedRepository,
                        },
                    ],
                ],
            });
            const result = await remark().use(config).process({
                cwd: repository,
                path: "example.md",
                value: "# Example\n\n[Target](/target.md)\n",
            });

            expect(
                result.messages.filter(
                    (message) =>
                        message.source?.startsWith("remark-validate-links:") ??
                        false
                )
            ).toHaveLength(1);
        });

        it("preserves failure diagnostics when Git discovery fails", async () => {
            expect.assertions(1);

            const config = await createRepositoryConfig(
                directory,
                quietOptions
            );

            await expect(
                remark().use(config).process({
                    cwd: directory,
                    path: "example.md",
                    value: "# Example\n",
                })
            ).rejects.toThrow(/git remote -v/v);
        });

        it("allows non-Git use through native explicit options", async () => {
            expect.assertions(1);

            const config = await createRepositoryConfig(directory, {
                plugins: [
                    ...quietOptions.plugins,
                    [remarkValidateLinks, { repository: false }],
                ],
            });
            const result = await remark().use(config).process({
                cwd: directory,
                path: "example.md",
                value: "# Example\n\n[Missing](missing.md)\n",
            });

            expect(
                result.messages.filter(
                    (message) =>
                        message.source?.startsWith("remark-validate-links:") ??
                        false
                )
            ).toHaveLength(1);
        });

        it("preserves missing-origin errors instead of disabling validation", async () => {
            expect.assertions(1);

            const noOrigin = path.join(directory, "no-origin");
            await mkdir(noOrigin);
            // eslint-disable-next-line sonarjs/no-os-command-from-path -- This creates an isolated fixture using the installed Git executable.
            execFileSync("git", [
                "init",
                "--quiet",
                noOrigin,
            ]);
            const config = await createRepositoryConfig(noOrigin, quietOptions);

            await expect(
                remark().use(config).process({
                    cwd: noOrigin,
                    path: "example.md",
                    value: "# Example\n",
                })
            ).rejects.toThrow("Cannot find remote `origin`");
        });

        it("retains CLI validation of headings in other files", async () => {
            expect.assertions(3);

            await writeFile(
                path.join(repository, "source.md"),
                "# Source\n\n[Target](target.md#missing-heading)\n"
            );
            const result = spawnSync(
                process.execPath,
                [
                    fileURLToPath(
                        new URL(
                            "../node_modules/remark-cli/cli.js",
                            import.meta.url
                        )
                    ),
                    "--rc-path",
                    fileURLToPath(
                        new URL(
                            "fixtures/repository-config.mjs",
                            import.meta.url
                        )
                    ),
                    "--no-stdout",
                    "--frail",
                    "source.md",
                    "target.md",
                ],
                { cwd: repository, encoding: "utf8", timeout: 10_000 }
            );

            expect(result.error).toBeUndefined();
            expect(result.status).toBe(1);
            expect(result.stderr).toContain("missing-heading-in-file");
        });
    }
);
