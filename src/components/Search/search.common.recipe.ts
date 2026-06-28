import { cva } from '../../../styled-system/css';

export const searchLabelRecipe = cva({
  base: {
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    padding: '0.4rem 0.55rem',
    margin: 0,
    color: 'var(--faint)',
  },
});
export const searchDividerRecipe = cva({
  base: { height: '1px', margin: '0.3rem -0.3rem', background: 'var(--border)' },
});
export const searchDescriptionRecipe = cva({
  base: { margin: '0.375rem 0px', fontWeight: 400, fontSize: '0.74rem', lineHeight: '1.3', color: 'var(--muted)' },
});
export const searchShortcutRecipe = cva({
  base: {
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    marginLeft: 'auto',
    paddingLeft: '1rem',
    color: 'var(--faint)',
  },
});
export const searchItemListRecipe = cva({ base: { margin: 0, padding: 0, display: 'grid', gap: '0.1rem' } });
