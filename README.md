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

Override semantic CSS variables in your app only when you want to customize the
theme.

```css
:root {
  --primary: #2563eb;
  --radius: 8px;
}
```

`BMatesProvider` is optional. Use it when you also want bmates-ui to inject its
global body styles and theme variables at runtime.
