import { cssCustomProperties } from '@/utils/css';

import theme from './theme';

export default function GlobalStyle(): JSX.Element {
  const vars = cssCustomProperties(theme.colors) + cssCustomProperties(theme.tokens);
  const darkVars = cssCustomProperties(theme.colorsDark) + cssCustomProperties(theme.tokensDark);
  const styles = `
    *, ::after, ::before { box-sizing: border-box; }
    :root { color-scheme: light; ${vars} }
    html[data-theme='dark'] { color-scheme: dark; ${darkVars} }
    body { margin: 0; background: var(--background); color: var(--text); font-family: 'Barlow', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; }
    button, input, optgroup, select, textarea { font-family: inherit; }
    ::selection { background: var(--primary); color: white; }
    ::-moz-selection { background: var(--primary); color: white; }
  `;

  // Safe: `styles` is built from static CSS and theme.colors via cssCustomProperties — no user input.
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
