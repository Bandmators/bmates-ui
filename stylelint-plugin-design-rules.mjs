/**
 * Stylelint rules enforcing docs/guide/design-rules.mdx.
 *
 * Each rule maps to a DR-x.y clause so a violation message points straight at
 * the clause it breaks. Without these, the rules live only in a document and
 * drift back — which is exactly how the 2026-08-08 audit findings accumulated.
 */
import stylelint from 'stylelint';

const { createPlugin, utils } = stylelint;

const ns = name => `design-rules/${name}`;

/** Properties whose values are lengths that must land on a whole pixel. */
const SPATIAL = /^(margin|padding|gap|row-gap|column-gap|top|right|bottom|left|inset|width|height|min-width|min-height|max-width|max-height|flex-basis|text-indent|letter-spacing)(-(top|right|bottom|left|block|inline)(-(start|end))?)?$/;

/**
 * Properties that position one component relative to another (4px tier).
 *
 * Deliberately margin-only. `gap` is excluded because it is just as often the
 * spacing between a component's own internal parts — menu rows, a tab track's
 * triggers — where 2px is a normal density (Tailwind ships `gap-0.5`). Those
 * gaps are still held to whole pixels by DR-1.3.
 */
const LAYOUT = /^margin(-(top|right|bottom|left|block|inline)(-(start|end))?)?$/;

const ROOT_PX = 16;
const rem = value => Number.parseFloat(value) * ROOT_PX;

/** Pulls every `<number>rem` token out of a declaration value. */
function remTokens(value) {
  // Ignore values inside var() fallbacks and url(); they are not ours to judge.
  const cleaned = value.replace(/url\([^)]*\)/g, '');
  return [...cleaned.matchAll(/(-?\d*\.?\d+)rem/g)].map(m => ({ raw: m[0], px: rem(m[1]) }));
}

const isWholePixel = px => Number.isInteger(Math.round(px * 1e6) / 1e6);

/* ------------------------------------------------------------------ DR-1.3 */

const wholePixel = createPlugin(
  ns('whole-pixel'),
  (enabled, _opts, context) => (root, result) => {
    if (!enabled) return;
    root.walkDecls(decl => {
      if (!SPATIAL.test(decl.prop)) return;
      for (const { raw, px } of remTokens(decl.value)) {
        if (isWholePixel(px)) continue;
        utils.report({
          result,
          ruleName: ns('whole-pixel'),
          node: decl,
          word: raw,
          message: `DR-1.3: "${raw}" resolves to ${px}px, which is not a whole pixel. Use a multiple of 0.125rem (2px).`,
        });
      }
    });
  },
);
wholePixel.ruleName = ns('whole-pixel');

/* ------------------------------------------------------------------ DR-1.1 */

const layoutGrid = createPlugin(
  ns('layout-grid'),
  enabled => (root, result) => {
    if (!enabled) return;
    root.walkDecls(decl => {
      if (!LAYOUT.test(decl.prop)) return;
      // Negative bleed margins pair with a parent's padding and are checked by
      // DR-1.3 only; -1px clip insets are an accessibility idiom.
      if (decl.value.includes('-')) return;
      for (const { raw, px } of remTokens(decl.value)) {
        if (px % 4 === 0) continue;
        utils.report({
          result,
          ruleName: ns('layout-grid'),
          node: decl,
          word: raw,
          message: `DR-1.1: "${raw}" (${px}px) is layout spacing and must be a multiple of 4px. The 2px half-step is for padding inside a control only.`,
        });
      }
    });
  },
);
layoutGrid.ruleName = ns('layout-grid');

/* ------------------------------------------------------------ DR-5.1 / 5.3 */

const FONT_SCALE = new Set(['0.75rem', '.75rem', '0.875rem', '.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', 'inherit']);

const fontScale = createPlugin(
  ns('font-scale'),
  enabled => (root, result) => {
    if (!enabled) return;
    root.walkDecls(/^font-size$/, decl => {
      const value = decl.value.trim();
      if (value.startsWith('var(') || FONT_SCALE.has(value)) return;
      utils.report({
        result,
        ruleName: ns('font-scale'),
        node: decl,
        message: `DR-5.1: font-size "${value}" is off-scale. Use a token from the type scale (0.75/0.875/1/1.125/1.25/1.5/1.875/2.25rem).`,
      });
    });
  },
);
fontScale.ruleName = ns('font-scale');

const LINE_HEIGHT_SCALE = new Set(['1.2', '1.5', '1.7', 'inherit', 'normal']);

const lineHeightScale = createPlugin(
  ns('line-height-scale'),
  enabled => (root, result) => {
    if (!enabled) return;
    root.walkDecls(/^line-height$/, decl => {
      const value = decl.value.trim();
      if (value.startsWith('var(') || LINE_HEIGHT_SCALE.has(value)) return;
      const clause = value === '1' ? 'DR-5.3: line-height 1 clips descenders.' : 'DR-5.2:';
      utils.report({
        result,
        ruleName: ns('line-height-scale'),
        node: decl,
        message: `${clause} line-height "${value}" is off-scale. Use 1.2 (tight), 1.5 (normal), or 1.7 (relaxed).`,
      });
    });
  },
);
lineHeightScale.ruleName = ns('line-height-scale');

/* ------------------------------------------------------------------ DR-6.3 */

const radiusToken = createPlugin(
  ns('radius-token'),
  enabled => (root, result) => {
    if (!enabled) return;
    root.walkDecls(/^border(-[a-z]+)*-radius$/, decl => {
      if (decl.value.includes('var(--radius')) return;
      utils.report({
        result,
        ruleName: ns('radius-token'),
        node: decl,
        message: `DR-6.3: border-radius "${decl.value}" must use a radius token (--radius-xs/-sm/none/-lg/-full).`,
      });
    });
  },
);
radiusToken.ruleName = ns('radius-token');

/* ------------------------------------------------------------ DR-8.1 / 8.2 */

const transitionToken = createPlugin(
  ns('transition-token'),
  enabled => (root, result) => {
    if (!enabled) return;
    root.walkDecls(/^transition(-duration|-property)?$/, decl => {
      const value = decl.value.trim();

      if (/(^|\s)all(\s|$|,)/.test(value)) {
        utils.report({
          result,
          ruleName: ns('transition-token'),
          node: decl,
          message: `DR-8.2: "transition: all" animates layout properties. Name the properties explicitly.`,
        });
        return;
      }

      const rawDuration = value.match(/(^|[\s,(])\d*\.?\d+m?s\b/);
      if (rawDuration && !value.includes('var(--transition')) {
        utils.report({
          result,
          ruleName: ns('transition-token'),
          node: decl,
          message: `DR-8.1: raw duration in "${value}". Use var(--transition), var(--transition-slow), or var(--transition-bounce).`,
        });
      }
    });
  },
);
transitionToken.ruleName = ns('transition-token');

/* ------------------------------------------------------------------ DR-4.1 */

/** Matches a public component root: `.bm-foo` with no element/modifier suffix. */
const ROOT_BLOCK = /^\.bm-[a-z0-9-]+$/;

const noRootMargin = createPlugin(
  ns('no-root-margin'),
  enabled => (root, result) => {
    if (!enabled) return;
    root.walkRules(rule => {
      if (!rule.selectors?.some(sel => ROOT_BLOCK.test(sel.trim()))) return;
      rule.walkDecls(/^margin/, decl => {
        if (decl.value.trim() === '0') return;
        utils.report({
          result,
          ruleName: ns('no-root-margin'),
          node: decl,
          message: `DR-4.1: "${rule.selector}" is a component root and must not set an outer margin. Let the parent own spacing via gap.`,
        });
      });
    });
  },
);
noRootMargin.ruleName = ns('no-root-margin');

/* ------------------------------------------------------------------ tokens */

const HEX_OR_NAMED = /(#[0-9a-f]{3,8}\b|(^|[\s,(])(white|black)(\s|$|,|\)))/i;

const colorToken = createPlugin(
  ns('color-token'),
  enabled => (root, result) => {
    if (!enabled) return;
    root.walkDecls(decl => {
      if (!/color|background|fill|stroke|box-shadow|border/.test(decl.prop)) return;
      if (decl.parent?.selector?.includes(':root')) return;
      if (!HEX_OR_NAMED.test(decl.value)) return;
      utils.report({
        result,
        ruleName: ns('color-token'),
        node: decl,
        message: `Tokens: "${decl.prop}: ${decl.value}" hardcodes a colour, so it cannot follow the dark theme. Use a semantic token.`,
      });
    });
  },
);
colorToken.ruleName = ns('color-token');

export default [wholePixel, layoutGrid, fontScale, lineHeightScale, radiusToken, transitionToken, noRootMargin, colorToken];
