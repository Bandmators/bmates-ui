import { cssCustomProperties } from '@/utils/css';

import theme from './theme';

export default function GlobalStyle(): JSX.Element {
  const vars = cssCustomProperties(theme.colors);
  const styles = `
    *, ::after, ::before { box-sizing: border-box; }
    :root { ${vars} }
    body { margin: 0; font-family: 'Barlow', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; }
    button, input, optgroup, select, textarea { font-family: inherit; }
    ::selection { background: var(--primary); color: white; }
    ::-moz-selection { background: var(--primary); color: white; }
  `;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
