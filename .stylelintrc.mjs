/**
 * Design-system linting. The `design-rules/*` rules enforce
 * docs/guide/design-rules.mdx; see stylelint-plugin-design-rules.mjs.
 */
export default {
  plugins: ['./stylelint-plugin-design-rules.mjs'],
  rules: {
    'design-rules/whole-pixel': true,
    'design-rules/layout-grid': true,
    'design-rules/font-scale': true,
    'design-rules/line-height-scale': true,
    'design-rules/radius-token': true,
    'design-rules/transition-token': true,
    'design-rules/no-root-margin': true,
    'design-rules/color-token': true,
  },
  overrides: [
    {
      // Token definitions are where raw values are supposed to live.
      files: ['src/styles/theme-vars.css'],
      rules: {
        'design-rules/radius-token': null,
        'design-rules/transition-token': null,
        'design-rules/color-token': null,
        'design-rules/whole-pixel': null,
        'design-rules/font-scale': null,
        'design-rules/line-height-scale': null,
      },
    },
    {
      // Base/reset styles set page-level defaults, not component geometry.
      files: ['src/styles/base.css', 'src/styles/keyframes.css'],
      rules: {
        'design-rules/whole-pixel': null,
        'design-rules/layout-grid': null,
        'design-rules/line-height-scale': null,
        'design-rules/color-token': null,
      },
    },
  ],
};
