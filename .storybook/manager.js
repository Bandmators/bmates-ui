import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    // Typography
    fontBase: `'Barlow',
    'Open Sans',
    sans-serif,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Helvetica,
    Arial,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji`,

    brandTitle: 'bmates-ui',
    brandUrl: 'https://github.com/Bandmators/bmates-ui',
    brandImage: 'https://avatars.githubusercontent.com/u/157222787?s=50',

    colorPrimary: '#212121',
    colorSecondary: '#585C6D',

    // UI
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    appBorderColor: '#61616142',
    appBorderRadius: 4,

    // Text colors
    textColor: '#212121',
    textInverseColor: '#ffffff',
  }),
});
