<p align="center">
	<a href="https://github.com/Bandmators"><img src="https://avatars.githubusercontent.com/u/157222787"  width="150" height="150"/></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/bmates-ui">
    <img alt="Npm" src="https://img.shields.io/npm/v/bmates-ui?style=flat&color=cb3837&logo=npm" />
  </a>
  <a href="https://codecov.io/gh/Bandmators/bmates-ui">
    <img alt="Tests Coverage" src="https://codecov.io/gh/Bandmators/bmates-ui/graph/badge.svg" />
  </a>
  <a href="https://github.com/Bandmators/bmates-ui/tree/master/.github/workflows">
    <img src="https://img.shields.io/github/actions/workflow/status/Bandmators/bmates-ui/vitest.yml" alt="Build Passing" />
  </a>
  <a href="https://github.com/Bandmators/bmates-ui/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/Bandmators/bmates-ui" alt="license">
  </a>
<!--   <a href="https://github.com/Bandmators/bmates-ui/graphs/contributors">
    <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/Bandmators/bmates-ui" />
  </a>
  <a href="https://github.com/Bandmators/bmates-ui/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/Bandmators/bmates-ui?color=0088ff" />
  </a>
  <a href="https://github.com/Bandmators/bmates-ui/pulls">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Bandmators/bmates-ui?color=0088ff" />
  </a> -->
</p>

# bmates-ui

## Usage

Import the stylesheet once in your app entry. It includes component styles and
default design tokens, so components render correctly without requiring a
provider.

```tsx
import { Button, Dropdown, DropdownContent, DropdownItem, DropdownToggle } from 'bmates-ui';
import 'bmates-ui/style.css';
```

## Tokens

The stylesheet exposes primitive color scales, semantic component tokens, and
layout tokens. Prefer semantic tokens in application UI; use a scale when a
specific tonal step is genuinely required.

```css
:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-100: #dbeafe;
  --space-6: 1.5rem;
  --radius: 8px;
}
```

Available scales include `--primary-50` through `--primary-900`, plus
`--success-*`, `--danger-*`, `--warning-*`, `--info-*`, and `--gray-*`.

For responsive CSS, use the supplied responsive aliases such as
`--layout-gutter-responsive`, `--font-size-body`, and `--font-size-heading`.
They update at the shared `sm` and `lg` breakpoints. CSS variables cannot be
used as `@media` conditions, so TypeScript exports the same breakpoint values
for CSS-in-JS and application logic.

```ts
import { BMateBreakpoints, BMateColorScales, minMedia } from 'bmates-ui';

BMateBreakpoints.lg; // '1024px'
BMateColorScales.primary[100]; // '#F5F5F5'
minMedia.lg; // '@media screen and (min-width: 1024px)'
```

`BMatesProvider` is deprecated and retained only as a compatibility wrapper. It
does not inject styles or theme variables; import `bmates-ui/style.css` once at
your application entry instead.
