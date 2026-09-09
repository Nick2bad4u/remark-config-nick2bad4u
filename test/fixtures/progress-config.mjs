import { createConfig } from "remark-config-nick2bad4u";
import remarkLintFileProgress from "remark-lint-file-progress";

export default createConfig({
    plugins:
        process.env["PROGRESS_TEST_DISABLED"] === "true"
            ? [[remarkLintFileProgress, false]]
            : [],
});
