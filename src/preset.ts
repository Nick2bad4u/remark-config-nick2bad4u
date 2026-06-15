/**
 * Shared Remark configuration for Nick2bad4u projects.
 *
 * The preset imports plugin implementations directly instead of exporting
 * string plugin names. That makes the package usable from downstream projects
 * without requiring every Remark plugin to be installed as a direct dependency
 * in each consumer repository.
 *
 * @see https://github.com/remarkjs/remark-lint
 * @see https://github.com/remarkjs/remark-gfm
 */
/* eslint-disable import-x/max-dependencies -- This shared preset intentionally imports every bundled Remark plugin implementation. */

import type {
    Pluggable,
    PluggableList,
    Plugin,
    Preset,
    Settings,
} from "unified";

import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkIgnoreEnd from "remark-ignore/end";
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
import remarkLintFrontmatterSchema from "remark-lint-frontmatter-schema";
import remarkLintHardBreakSpaces from "remark-lint-hard-break-spaces";
import remarkLintHeadingCapitalization from "remark-lint-heading-capitalization";
import remarkLintHeadingIncrement from "remark-lint-heading-increment";
import remarkLintHeadingStyle from "remark-lint-heading-style";
import remarkLintHeadingWhitespace from "remark-lint-heading-whitespace";
import remarkLintHeadingWordLength from "remark-lint-heading-word-length";
import remarkLintLinebreakStyle from "remark-lint-linebreak-style";
import remarkLintLinkTitleStyle from "remark-lint-link-title-style";
import remarkLintListItemBulletIndent from "remark-lint-list-item-bullet-indent";
import remarkLintListItemContentIndent from "remark-lint-list-item-content-indent";
import remarkLintListItemIndent from "remark-lint-list-item-indent";
import remarkLintListItemSpacing from "remark-lint-list-item-spacing";
import remarkLintMatchPunctuation from "remark-lint-match-punctuation";
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
import remarkLintNoEmptySections from "remark-lint-no-empty-sections";
import remarkLintNoEmptyUrl from "remark-lint-no-empty-url";
import remarkLintNoFileNameArticles from "remark-lint-no-file-name-articles";
import remarkLintNoFileNameConsecutiveDashes from "remark-lint-no-file-name-consecutive-dashes";
import remarkLintNoFileNameIrregularCharacters from "remark-lint-no-file-name-irregular-characters";
import remarkLintNoFileNameMixedCase from "remark-lint-no-file-name-mixed-case";
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
import remarkLintNoRepeatPunctuation from "remark-lint-no-repeat-punctuation";
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
import remarkLintWriteGood from "remark-lint-write-good";
import remarkMath from "remark-math";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkPresetPrettier from "remark-preset-prettier";
import remarkToc from "remark-toc";
import remarkValidateLinks from "remark-validate-links";
import wikiLinkPlugin from "remark-wiki-link";

import { tocOptions } from "./toc-options.js";
/* eslint-enable import-x/max-dependencies -- End shared Remark plugin import block. */

const remarkWikiLink = wikiLinkPlugin;
// These upstream plugins/presets are valid Unified pluggables at runtime, but
// their published types are narrower than `Pluggable`/`Preset`.
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- `remark-ignore` exports a zero-parameter plugin that Unified can still consume.
const remarkIgnoreEndPlugin = remarkIgnoreEnd as unknown as Pluggable;
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- `remark-ignore` exports a zero-parameter plugin that Unified can still consume.
const remarkIgnoreStartPlugin = remarkIgnoreStart as unknown as Pluggable;
const remarkLintFrontmatterSchemaPlugin =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- The plugin works with `false` to disable schema checks in this preset.
    remarkLintFrontmatterSchema as unknown as Plugin;
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- The package exports a preset object whose declarations include disabled entries.
const remarkPresetPrettierPlugin = remarkPresetPrettier as Preset;

/** Remark preset exported by this package. */
export interface RemarkConfig extends Preset {
    /** Plugin pipeline passed to Unified. */
    readonly plugins: PluggableList;
    /** Shared processor settings. */
    readonly settings: RemarkSettings;
}

/** Options for creating a derived Remark preset. */
export interface RemarkConfigOptions {
    /** Additional plugins appended before `remark-preset-prettier`. */
    readonly plugins?: PluggableList;
    /** Settings merged over the shared defaults. */
    readonly settings?: Readonly<Partial<RemarkSettings>>;
}

/** Remark plugin, plugin tuple, or preset entry accepted by Unified. */
export type RemarkPluginEntry = Pluggable;

/** Shared Remark processor settings used by the Nick2bad4u preset. */
export interface RemarkSettings extends Settings {
    /** Preferred unordered-list marker. */
    readonly bullet?: "*" | "+" | "-";
    /** Whether to close ATX headings. */
    readonly closeAtx?: boolean;
    /** Whether to parse in CommonMark mode. */
    readonly commonmark?: boolean;
    /** Preferred emphasis marker. */
    readonly emphasis?: "*" | "_";
    /** Preferred fenced-code marker. */
    readonly fence?: "`" | "~";
    /** Whether fenced code blocks are enabled. */
    readonly fences?: boolean;
    /** Whether GitHub Flavored Markdown is enabled. */
    readonly gfm?: boolean;
    /** Whether ordered markers increment. */
    readonly incrementListMarker?: boolean;
    /** List-item indentation style. */
    readonly listItemIndent?: "mixed" | "one" | "tab";
    /** Preferred quote marker. */
    readonly quote?: "'" | '"';
    /** Whether to prefer reference links. */
    readonly referenceLinks?: boolean;
    /** Whether to prefer resource links. */
    readonly resourceLink?: boolean;
    /** Marker used for thematic rules. */
    readonly rule?: "*" | "-" | "_" | null;
    /** Number of rule marker repetitions. */
    readonly ruleRepetition?: number;
    /** Whether rules include internal spaces. */
    readonly ruleSpaces?: boolean;
    /** Whether setext headings are enabled. */
    readonly setext?: boolean;
    /** Preferred strong marker. */
    readonly strong?: "*" | "_";
    /** Ordered-list style preference. */
    readonly style?: "ordered";

    /** Preferred thematic-break marker. */
    readonly thematicBreak?: "***" | "---";

    /** Whether definitions are tight. */
    readonly tightDefinitions?: boolean;

    /** Whether YAML frontmatter is enabled. */
    readonly yaml?: boolean;
}

const defaultSettings: Readonly<RemarkSettings> = Object.freeze({
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

const sharedPlugins: PluggableList = [
    remarkIgnoreStartPlugin,
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
    [
        remarkLintMatchPunctuation,
        [
            "“”",
            "‘’",
            "«»",
            "‹›",
        ],
    ],
    [remarkLintNoRepeatPunctuation, ",，。·"],
    // Set a very high maximum line length to avoid conflicts with Prettier and ESLint comment length plugins /
    // settings.
    [remarkLintMaximumLineLength, 5000],
    // Set a very high maximum heading length to avoid conflicts with `remark-lint-heading-word-length`,
    // which provides more precise control over heading word counts.
    [remarkLintMaximumHeadingLength, 600],
    [remarkLintHeadingCapitalization, false],
    [remarkLintHeadingWordLength, { maximumWords: 16, minimumWords: 1 }],
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
    [remarkToc, tocOptions],
    [remarkLintNoDeadUrls, false],
    remarkLintMdxJsxAttributeSort,
    [remarkLintMdxJsxQuoteStyle, '"'],
    [remarkLintMdxJsxSelfClose, true],
    [remarkLintMdxJsxNoVoidChildren, true],
    [remarkLintMdxJsxShorthandAttribute, true],
    remarkLintMdxJsxUniqueAttributeName,
    [remarkLintNoUndefinedReferences, false],
    [remarkLintFrontmatterSchemaPlugin, false],
    remarkIgnoreEndPlugin,
];

/**
 * Create a Remark preset using the shared Nick2bad4u defaults.
 *
 * @param options - Project-specific plugins and settings.
 *
 * @returns Remark preset containing the shared defaults and any
 *   project-specific additions.
 */
export const createConfig = (
    options: Readonly<RemarkConfigOptions> = {}
): RemarkConfig => ({
    plugins: [
        ...sharedPlugins,
        ...(options.plugins ?? []),
        remarkPresetPrettierPlugin,
    ],
    settings: {
        ...defaultSettings,
        ...options.settings,
    },
});

/** Shared recommended Remark preset. */
export const preset: RemarkConfig = Object.freeze(createConfig());

/** Named Remark presets exposed for conventional config-package imports. */
export const presets: {
    readonly all: RemarkConfig;
    readonly recommended: RemarkConfig;
} = Object.freeze({
    all: preset,
    recommended: preset,
});

export default preset;
