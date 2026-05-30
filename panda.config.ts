import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: false,
  include: ['./src/**/*.{ts,tsx}', './index.ts'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  theme: {
    extend: {
      keyframes: {
        'bmates-portal-enter': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bmates-tooltip': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
});
