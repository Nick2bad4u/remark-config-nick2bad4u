import { createRepositoryConfig } from "remark-config-nick2bad4u";
import remarkLintFileProgress from "remark-lint-file-progress";

export default await createRepositoryConfig(process.cwd(), {
    plugins: [[remarkLintFileProgress, false]],
});
