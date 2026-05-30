import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: false,
  include: ['./src/**/*.{ts,tsx}', './index.ts'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
});
