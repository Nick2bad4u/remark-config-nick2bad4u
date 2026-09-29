import type { Options } from "remark-validate-links";

import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { isDefined } from "ts-extras";

// eslint-disable-next-line @typescript-eslint/strict-void-return -- Node's promisify adapter intentionally ignores the ChildProcess return value.
const executeFile = promisify(execFile);

const repositoryOptions = (
    remotes: string,
    root: string
): Options | undefined => {
    const repository = /origin\t(?<repository>.+?) \(fetch\)/v.exec(remotes)
        ?.groups?.["repository"];

    return isDefined(repository)
        ? { repository, root: root.trim() }
        : undefined;
};

/** Resolve link-validation defaults once for an explicitly scoped repository. */
export const resolveRepositoryLinks = async (
    directory: Readonly<URL> | string
): Promise<Options | undefined> => {
    const cwd =
        typeof directory === "string" ? directory : fileURLToPath(directory);

    try {
        const [remotes, root] = await Promise.all([
            executeFile("git", ["remote", "-v"], { cwd }),
            executeFile("git", ["rev-parse", "--show-toplevel"], { cwd }),
        ]);

        return repositoryOptions(remotes.stdout, root.stdout);
    } catch {
        // Preserve upstream per-file diagnostics and native plugin overrides.
        return undefined;
    }
};
