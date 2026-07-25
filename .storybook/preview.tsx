/// <reference types="vite/client" />
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import '../src/styles/base.css';
import '../src/styles/components.css';
import '../src/styles/theme-vars.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  // Toggles `data-theme` on the <html> element — the same hook the design
  // tokens use (`html[data-theme='dark']`). Switch via the paintbrush icon
  // in the Storybook toolbar.
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme',
  }),
];
