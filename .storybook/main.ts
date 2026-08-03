import type { StorybookConfig } from '@storybook/react-vite';

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal(viteConfig) {
    viteConfig.plugins = viteConfig.plugins?.filter(plugin => {
      if (!plugin || typeof plugin !== 'object' || Array.isArray(plugin)) return true;
      return !('name' in plugin && plugin.name === 'vite:dts');
    });

    return viteConfig;
  },
} satisfies StorybookConfig;
export default config;
