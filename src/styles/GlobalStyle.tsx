import { Global, Theme, css } from '@emotion/react';

import { cssCustomProperties } from '@/utils/css';

// import resolveConfigPath, { resolveDefaultConfigPath } from '@/utils/resolve';
import theme from './theme';

const GlobalCustomStyle = (theme: Theme) => css`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  :root {
    ${cssCustomProperties(theme.colors)}
  }

  body {
    margin: 0px;
    font-family:
      'Barlow',
      sans-serif,
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Helvetica,
      Arial,
      sans-serif,
      Apple Color Emoji,
      Segoe UI Emoji;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
  }

  ::selection {
    background: ${theme.colors.primary};
    color: white;
  }
  ::-moz-selection {
    background: ${theme.colors.primary};
    color: white;
  }
  &:focus-visible {
    box-shadow: 0 0 10px ${theme.colors.gray['200']};
  }
`;

export default function GlobalStyle() {
  return <Global styles={GlobalCustomStyle(theme)} />;
}
