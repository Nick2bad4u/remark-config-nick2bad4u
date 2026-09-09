import assert from "node:assert/strict";
import { remark } from "remark";
import preset, { createConfig } from "remark-config-nick2bad4u";
import progress from "remark-lint-file-progress";

for (const subpath of [
    "",
    "/preset",
    "/preset.mjs",
    "/eslint",
    "/eslint-strict",
    "/toc",
    "/standard-readme",
]) {
    const entry = await import(`remark-config-nick2bad4u${subpath}`);
    assert(Array.isArray(entry.default.plugins));
}

const input = { path: "readme.md", value: "# Project\n\nParagraph text.\n" };
const enabled = await remark().use(preset).process(input);
const disabled = await remark()
    .use(createConfig({ plugins: [[progress, false]] }))
    .process(input);
assert.equal(enabled.toString(), disabled.toString());
assert.deepEqual(enabled.messages, disabled.messages);
assert.deepEqual(enabled.messages, []);
console.log(`Packed consumer passed on Node ${process.versions.node}`);
