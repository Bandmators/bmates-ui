/// <reference types="vite/client" />
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/react';

import GlobalStyle from '../src/styles/GlobalStyle';
import '../styled-system/styles.css';

const withGlobalStyle: Decorator = Story => (
  <>
    <GlobalStyle />
    <Story />
  </>
);

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
  withGlobalStyle,
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
