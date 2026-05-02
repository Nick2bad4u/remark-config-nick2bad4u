// @ts-check
/**
 * Shared Remark configuration for Nick2bad4u projects.
 *
 * The preset imports plugin implementations directly instead of exporting
 * string plugin names. That makes the package usable from downstream projects
 * without requiring every Remark plugin to be installed as a direct dependency
 * in each consumer repository.
 *
 * @see {@link https://github.com/remarkjs/remark-lint}
 * @see {@link https://github.com/remarkjs/remark-gfm}
 */

import remarkDirective from "remark-directive";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `default` in upstream types.
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `ignoreEnd` in upstream types.
import remarkIgnoreEnd from "remark-ignore/end";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `ignoreStart` in upstream types.
import remarkIgnoreStart from "remark-ignore/start";
import remarkInlineLinks from "remark-inline-links";
import remarkLint from "remark-lint";
import remarkLintBlockquoteIndentation from "remark-lint-blockquote-indentation";
import remarkLintCheckTOC from "remark-lint-check-toc";
import remarkLintCheckboxCharacterStyle from "remark-lint-checkbox-character-style";
import remarkLintCheckboxContentIndent from "remark-lint-checkbox-content-indent";
import remarkLintCodeBlockSplitList from "remark-lint-code-block-split-list";
import remarkLintCodeBlockStyle from "remark-lint-code-block-style";
import remarkLintCorrectMediaSyntax from "remark-lint-correct-media-syntax";
import remarkLintDefinitionCase from "remark-lint-definition-case";
import remarkLintDefinitionSort from "remark-lint-definition-sort";
import remarkLintDefinitionSpacing from "remark-lint-definition-spacing";
import remarkLintDirectiveAttributeSort from "remark-lint-directive-attribute-sort";
import remarkLintDirectiveCollapsedAttribute from "remark-lint-directive-collapsed-attribute";
import remarkLintDirectiveQuoteStyle from "remark-lint-directive-quote-style";
import remarkLintDirectiveShortcutAttribute from "remark-lint-directive-shortcut-attribute";
import remarkLintDirectiveUniqueAttributeName from "remark-lint-directive-unique-attribute-name";
import remarkLintEmphasisMarker from "remark-lint-emphasis-marker";
import remarkLintFencedCodeFlag from "remark-lint-fenced-code-flag";
import remarkLintFencedCodeFlagCase from "remark-lint-fenced-code-flag-case";
import remarkLintFencedCodeMarker from "remark-lint-fenced-code-marker";
import remarkLintFileExtension from "remark-lint-file-extension";
import remarkLintFinalDefinition from "remark-lint-final-definition";
import remarkLintFinalNewline from "remark-lint-final-newline";
import remarkLintFirstHeadingLevel from "remark-lint-first-heading-level";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `remarkFrontmatterSchema` in upstream types.
import remarkLintFrontmatterSchema from "remark-lint-frontmatter-schema";
import remarkLintHardBreakSpaces from "remark-lint-hard-break-spaces";
import remarkLintHeadingCapitalization from "remark-lint-heading-capitalization";
import remarkLintHeadingIncrement from "remark-lint-heading-increment";
import remarkLintHeadingStyle from "remark-lint-heading-style";
// eslint-disable-next-line module-interop/no-import-cjs -- Package currently resolves as CommonJS in lint analysis.
import remarkLintHeadingWhitespace from "remark-lint-heading-whitespace";
import remarkLintLinebreakStyle from "remark-lint-linebreak-style";
import remarkLintLinkTitleStyle from "remark-lint-link-title-style";
import remarkLintListItemBulletIndent from "remark-lint-list-item-bullet-indent";
import remarkLintListItemContentIndent from "remark-lint-list-item-content-indent";
import remarkLintListItemIndent from "remark-lint-list-item-indent";
import remarkLintListItemSpacing from "remark-lint-list-item-spacing";
import remarkLintMaximumHeadingLength from "remark-lint-maximum-heading-length";
import remarkLintMaximumLineLength from "remark-lint-maximum-line-length";
import remarkLintMdxJsxAttributeSort from "remark-lint-mdx-jsx-attribute-sort";
import remarkLintMdxJsxNoVoidChildren from "remark-lint-mdx-jsx-no-void-children";
import remarkLintMdxJsxQuoteStyle from "remark-lint-mdx-jsx-quote-style";
import remarkLintMdxJsxSelfClose from "remark-lint-mdx-jsx-self-close";
import remarkLintMdxJsxShorthandAttribute from "remark-lint-mdx-jsx-shorthand-attribute";
import remarkLintMdxJsxUniqueAttributeName from "remark-lint-mdx-jsx-unique-attribute-name";
import remarkLintMediaStyle from "remark-lint-media-style";
import remarkLintNoBlockquoteWithoutMarker from "remark-lint-no-blockquote-without-marker";
import remarkLintNoConsecutiveBlankLines from "remark-lint-no-consecutive-blank-lines";
import remarkLintNoDeadUrls from "remark-lint-no-dead-urls";
import remarkLintNoDuplicateDefinedUrls from "remark-lint-no-duplicate-defined-urls";
import remarkLintNoDuplicateDefinitions from "remark-lint-no-duplicate-definitions";
import remarkLintNoDuplicateHeadings from "remark-lint-no-duplicate-headings";
import remarkLintNoDuplicateHeadingsInSection from "remark-lint-no-duplicate-headings-in-section";
import remarkLintNoEmphasisAsHeading from "remark-lint-no-emphasis-as-heading";
// eslint-disable-next-line module-interop/no-import-cjs -- Package currently resolves as CommonJS in lint analysis.
import remarkLintNoEmptySections from "remark-lint-no-empty-sections";
import remarkLintNoEmptyUrl from "remark-lint-no-empty-url";
import remarkLintNoFileNameArticles from "remark-lint-no-file-name-articles";
import remarkLintNoFileNameConsecutiveDashes from "remark-lint-no-file-name-consecutive-dashes";
import remarkLintNoFileNameIrregularCharacters from "remark-lint-no-file-name-irregular-characters";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `remarkLintNofileNameMixedCase` in upstream types.
import remarkLintNoFileNameMixedCase from "remark-lint-no-file-name-mixed-case";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `remarkLintNofileNameOuterDashes` in upstream types.
import remarkLintNoFileNameOuterDashes from "remark-lint-no-file-name-outer-dashes";
import remarkLintNoHeadingContentIndent from "remark-lint-no-heading-content-indent";
import remarkLintNoHeadingIndent from "remark-lint-no-heading-indent";
import remarkLintNoHeadingLikeParagraph from "remark-lint-no-heading-like-paragraph";
import remarkLintNoHeadingPunctuation from "remark-lint-no-heading-punctuation";
import remarkLintNoHiddenTableCell from "remark-lint-no-hidden-table-cell";
import remarkLintNoHtml from "remark-lint-no-html";
import remarkLintNoLiteralUrls from "remark-lint-no-literal-urls";
import remarkLintNoMissingBlankLines from "remark-lint-no-missing-blank-lines";
import remarkLintNoMultipleToplevelHeadings from "remark-lint-no-multiple-toplevel-headings";
import remarkLintNoParagraphContentIndent from "remark-lint-no-paragraph-content-indent";
import remarkLintNoReferenceLikeUrl from "remark-lint-no-reference-like-url";
import remarkLintNoShellDollars from "remark-lint-no-shell-dollars";
import remarkLintNoShortcutReferenceImage from "remark-lint-no-shortcut-reference-image";
import remarkLintNoShortcutReferenceLink from "remark-lint-no-shortcut-reference-link";
import remarkLintNoTableIndentation from "remark-lint-no-table-indentation";
import remarkLintNoTabs from "remark-lint-no-tabs";
import remarkLintNoUndefinedReferences from "remark-lint-no-undefined-references";
import remarkLintNoUnneededFullReferenceImage from "remark-lint-no-unneeded-full-reference-image";
import remarkLintNoUnneededFullReferenceLink from "remark-lint-no-unneeded-full-reference-link";
import remarkLintNoUnusedDefinitions from "remark-lint-no-unused-definitions";
import remarkLintOrderedListMarkerStyle from "remark-lint-ordered-list-marker-style";
import remarkLintOrderedListMarkerValue from "remark-lint-ordered-list-marker-value";
import remarkLintRuleStyle from "remark-lint-rule-style";
import remarkLintStrikethroughMarker from "remark-lint-strikethrough-marker";
import remarkLintStrongMarker from "remark-lint-strong-marker";
import remarkLintTableCellPadding from "remark-lint-table-cell-padding";
import remarkLintTablePipeAlignment from "remark-lint-table-pipe-alignment";
import remarkLintTablePipes from "remark-lint-table-pipes";
import remarkLintUnorderedListMarkerStyle from "remark-lint-unordered-list-marker-style";
// eslint-disable-next-line module-interop/no-import-cjs -- Package currently resolves as CommonJS in lint analysis.
import remarkLintWriteGood from "remark-lint-write-good";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `default` in upstream types.
import remarkMath from "remark-math";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `_default` in upstream types.
import remarkPresetPrettier from "remark-preset-prettier";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `default` in upstream types.
import remarkToc from "remark-toc";
// eslint-disable-next-line import-x/no-rename-default -- Default export is named `default` in upstream types.
import remarkValidateLinks from "remark-validate-links";
import wikiLinkPlugin from "remark-wiki-link";

const remarkWikiLink = wikiLinkPlugin;

/**
 * @typedef {object} RemarkSettings
 *
 * @property {"*" | "+" | "-"} [bullet]
 * @property {boolean} [closeAtx]
 * @property {boolean} [commonmark]
 * @property {"*" | "_"} [emphasis]
 * @property {"`" | "~"} [fence]
 * @property {boolean} [fences]
 * @property {boolean} [gfm]
 * @property {boolean} [incrementListMarker]
 * @property {"tab" | "one" | "mixed"} [listItemIndent]
 * @property {'"' | "'"} [quote]
 * @property {boolean} [referenceLinks]
 * @property {boolean} [resourceLink]
 * @property {string} [rule]
 * @property {number} [ruleRepetition]
 * @property {boolean} [ruleSpaces]
 * @property {boolean} [setext]
 * @property {"ordered"} [style]
 * @property {"*" | "_"} [strong]
 * @property {"***" | "---"} [thematicBreak]
 * @property {boolean} [tightDefinitions]
 * @property {boolean} [yaml]
 */

/** @typedef {unknown} RemarkPluginEntry */
/** @typedef {RemarkPluginEntry[]} RemarkPluginList */

/**
 * @typedef {object} RemarkConfig
 *
 * @property {RemarkPluginList} plugins
 * @property {RemarkSettings} settings
 */

/**
 * @typedef {object} RemarkConfigOptions
 *
 * @property {RemarkPluginList} [plugins] Additional plugins appended after the
 *   shared preset and before `remark-preset-prettier`.
 * @property {Partial<RemarkSettings>} [settings] Settings merged over the
 *   shared defaults.
 */

/** @type {RemarkSettings} */
const defaultSettings = Object.freeze({
    bullet: "-",
    closeAtx: false,
    commonmark: false,
    emphasis: "_",
    fence: "`",
    fences: true,
    gfm: true,
    incrementListMarker: true,
    listItemIndent: "one",
    quote: '"',
    referenceLinks: false,
    resourceLink: false,
    rule: "-",
    ruleRepetition: 3,
    ruleSpaces: false,
    setext: false,
    strong: "*",
    style: "ordered",
    thematicBreak: "***",
    tightDefinitions: true,
    yaml: true,
});

const writeGoodOptions = Object.freeze({
    adverb: false,
    cliches: true,
    eprime: false,
    illusion: true,
    passive: false,
    so: true,
    thereIs: true,
    tooWordy: false,
    weasel: true,
    whitelist: Object.freeze([
        "read-only",
        "monitor",
        "MONITOR",
        "expiration",
        "up-time",
        "uptime",
        "IP",
        "IPs",
    ]),
});

/** @type {RemarkPluginList} */
const sharedPlugins = [
    remarkIgnoreStart,
    remarkFrontmatter,
    remarkGfm,
    remarkLint,
    remarkPresetLintRecommended,
    remarkPresetLintConsistent,
    remarkPresetLintMarkdownStyleGuide,
    remarkLintCorrectMediaSyntax,
    remarkLintHeadingIncrement,
    remarkLintHeadingWhitespace,
    remarkValidateLinks,
    remarkMath,
    remarkWikiLink,
    remarkDirective,
    remarkInlineLinks,
    [remarkLintWriteGood, ["warn", writeGoodOptions]],
    [remarkLintBlockquoteIndentation, true],
    [remarkLintNoBlockquoteWithoutMarker, true],
    remarkLintDirectiveAttributeSort,
    remarkLintDirectiveCollapsedAttribute,
    remarkLintDirectiveQuoteStyle,
    remarkLintDirectiveShortcutAttribute,
    remarkLintDirectiveUniqueAttributeName,
    [remarkLintLinkTitleStyle, '"'],
    remarkLintNoReferenceLikeUrl,
    [remarkLintDefinitionCase, true],
    [remarkLintDefinitionSort, true],
    [remarkLintFinalDefinition, true],
    [remarkLintMediaStyle, "consistent"],
    [remarkLintNoUnneededFullReferenceImage, true],
    [remarkLintNoUnneededFullReferenceLink, true],
    [remarkLintNoUnusedDefinitions, true],
    [remarkLintFinalNewline, true],
    [remarkLintNoTabs, true],
    [remarkLintHardBreakSpaces, true],
    [remarkLintLinebreakStyle, "consistent"],
    [remarkLintNoMissingBlankLines, false],
    [remarkLintNoParagraphContentIndent, true],
    [remarkLintOrderedListMarkerValue, "ordered"],
    [remarkLintOrderedListMarkerStyle, "."],
    [remarkLintListItemIndent, "one"],
    [remarkLintNoMultipleToplevelHeadings, false],
    [remarkLintNoConsecutiveBlankLines, true],
    [remarkLintNoDuplicateDefinitions, true],
    [remarkLintDefinitionSpacing, true],
    [remarkLintFirstHeadingLevel, 1],
    [remarkLintNoDuplicateHeadings, true],
    [remarkLintNoDuplicateHeadingsInSection, true],
    [remarkLintNoEmphasisAsHeading, true],
    [remarkLintNoHeadingContentIndent, true],
    [remarkLintNoHeadingIndent, true],
    [remarkLintNoHeadingLikeParagraph, true],
    [remarkLintNoEmptySections, true],
    [remarkLintTablePipeAlignment, false],
    [remarkLintNoHiddenTableCell, true],
    [remarkLintListItemBulletIndent, false],
    remarkLintListItemContentIndent,
    [
        remarkLintCheckboxCharacterStyle,
        {
            checked: "x",
            unchecked: " ",
        },
    ],
    [remarkLintCheckboxContentIndent, true],
    [remarkLintFencedCodeFlag, { allowEmpty: false }],
    [remarkLintCodeBlockStyle, "fenced"],
    [remarkLintFencedCodeMarker, "`"],
    [remarkLintFencedCodeFlagCase, { case: "lower" }],
    remarkLintCodeBlockSplitList,
    [remarkLintHeadingStyle, "atx"],
    [remarkLintRuleStyle, "***"],
    remarkLintNoShellDollars,
    remarkLintNoShortcutReferenceImage,
    remarkLintNoShortcutReferenceLink,
    remarkLintNoTableIndentation,
    remarkLintTablePipes,
    [remarkLintNoHtml, false],
    // eslint-disable-next-line regexp/prefer-w -- Node rejects the suggested `\w` form inside this `v`-flag negated character class.
    [remarkLintNoFileNameIrregularCharacters, /[^\-.0-9A-Z_a-z]/v],
    [remarkLintNoFileNameMixedCase, true],
    [remarkLintNoFileNameArticles, true],
    [remarkLintNoFileNameConsecutiveDashes, true],
    [remarkLintNoFileNameOuterDashes, true],
    [
        remarkLintFileExtension,
        { allowExtensionless: false, extensions: ["mdx", "md"] },
    ],
    [remarkLintMaximumLineLength, 5000],
    [remarkLintMaximumHeadingLength, 120],
    [remarkLintHeadingCapitalization, false],
    [remarkLintListItemSpacing, true],
    [remarkLintEmphasisMarker, "consistent"],
    [remarkLintStrikethroughMarker, "consistent"],
    [remarkLintStrongMarker, "*"],
    [remarkLintUnorderedListMarkerStyle, "-"],
    [remarkLintNoLiteralUrls, false],
    [remarkLintNoHeadingPunctuation, /[!,.;]/v],
    [remarkLintTableCellPadding, false],
    remarkLintNoDuplicateDefinedUrls,
    remarkLintNoEmptyUrl,
    remarkLintCheckTOC,
    [
        remarkToc,
        {
            heading: "table of contents|toc",
            maxDepth: 2,
            ordered: true,
            tight: true,
        },
    ],
    [remarkLintNoDeadUrls, false],
    remarkLintMdxJsxAttributeSort,
    [remarkLintMdxJsxQuoteStyle, '"'],
    [remarkLintMdxJsxSelfClose, true],
    [remarkLintMdxJsxNoVoidChildren, true],
    [remarkLintMdxJsxShorthandAttribute, true],
    remarkLintMdxJsxUniqueAttributeName,
    [remarkLintNoUndefinedReferences, false],
    [remarkLintFrontmatterSchema, false],
    remarkIgnoreEnd,
];

/**
 * Create a Remark preset using the shared Nick2bad4u defaults.
 *
 * @param {RemarkConfigOptions} [options] Project-specific plugins and settings.
 *
 * @returns {RemarkConfig} Remark preset containing the shared defaults and any
 *   project-specific additions.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types -- JSDoc above documents the module boundary return type.
export const createConfig = (options = {}) => ({
    plugins: [
        ...sharedPlugins,
        ...(options.plugins ?? []),
        remarkPresetPrettier,
    ],
    settings: {
        ...defaultSettings,
        ...options.settings,
    },
});

/** Shared recommended Remark preset. */
export const preset = Object.freeze(createConfig());

/** Named Remark presets exposed for conventional config-package imports. */
export const presets = Object.freeze({
    all: preset,
    recommended: preset,
});

export default preset;
