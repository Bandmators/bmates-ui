import { defineConfig } from '@kyechan99/docgo';
import * as BMatesUI from 'bmates-ui';

export default defineConfig({
  title: 'BMates UI',
  description: 'Bandmators를 위한 React 디자인 시스템 문서',
  docsDir: 'docs',
  mdxComponents: BMatesUI,
  clientPreviews: {
    'bmates-preview': {
      module: './src/docs/ComponentPreview.tsx',
    },
  },
  outDir: 'docs-dist',
  baseUrl: '/bmates-ui/',
  siteUrl: 'https://bandmators.github.io/bmates-ui',
  previewStylesheets: ['assets/bmates-ui.css'],
  head: [['meta', { name: 'theme-color', content: '#212121' }]],
  headFile: 'head.html',
  seo: {
    favicon: { href: '/favicon.png', type: 'image/png', sizes: '64x64' },
    sitemap: true,
    robots: true,
    llmsTxt: true,
    jsonLd: true,
  },
  logo: { src: '/logo.png', alt: 'bmates-ui' },
  siteTitle: 'BMates UI',
  nav: [
    { text: 'Get started', link: '/guide/getting-started', activeMatch: '/guide/' },
    { text: 'Components', link: '/components/button', activeMatch: '/components/' },
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Foundations',
        items: [
          { text: 'Get started', link: '/guide/getting-started' },
          { text: 'Design tokens', link: '/guide/tokens' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'Accessibility', link: '/guide/accessibility' },
        ],
      },
    ],
    '/components/': [
      {
        text: 'Components',
        items: [
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'Alert', link: '/components/alert' },
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Button', link: '/components/button' },
          { text: 'Card', link: '/components/card' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'ContextMenu', link: '/components/context-menu' },
          { text: 'DataTable', link: '/components/data-table' },
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Dropdown', link: '/components/dropdown' },
          { text: 'HoverCard', link: '/components/hover-card' },
          { text: 'Input', link: '/components/input' },
          { text: 'Label', link: '/components/label' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'Search', link: '/components/search' },
          { text: 'Select', link: '/components/select' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Table', link: '/components/table' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Toggle', link: '/components/toggle' },
          { text: 'Tooltip', link: '/components/tooltip' },
        ],
      },
      {
        text: 'System',
        items: [{ text: 'BMatesProvider', link: '/components/provider' }],
      },
    ],
    '/': [
      {
        text: 'Start here',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Get started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'Foundations',
        items: [
          { text: 'Design tokens', link: '/guide/tokens' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'Accessibility', link: '/guide/accessibility' },
        ],
      },
      {
        text: 'Explore',
        items: [
          { text: 'Components', link: '/components/button' },
          { text: 'BMatesProvider', link: '/components/provider' },
        ],
      },
    ],
  },
  socialLinks: [{ icon: 'github', link: 'https://github.com/Bandmators/bmates-ui' }],
  editLink: {
    pattern: 'https://github.com/Bandmators/bmates-ui/edit/master/docs/:path',
    text: 'Edit this page',
  },
  search: true,
  footer: {
    message: 'A Design System for Personal Branding',
    copyright: '© 2026 kyechan99',
  },
  docs: {
    // menuTitle: '문서',
    // tocTitle: '이 페이지에서',
    tocActiveMode: 'multiple',
    tocHeadings: ['h2', 'h3'],
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', label: 'English' },
      {
        code: 'ko',
        label: '한국어',
        footer: {
          message: '개인 브랜딩을 위한 디자인 시스템',
          copyright: '© 2026 kyechan99',
        },
      },
    ],
  },
  plugins: [],
});
