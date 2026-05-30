import { cva } from '../../../styled-system/css';

export const searchLabelRecipe = cva({
  base: { fontWeight: 600, fontSize: '0.75rem', lineHeight: '1rem', padding: '0.375rem 0.5rem', margin: 0 },
});
export const searchDividerRecipe = cva({
  base: { height: '1px', margin: '0.25rem -0.25rem', background: 'var(--gray-300)' },
});
export const searchDescriptionRecipe = cva({ base: { margin: '0.375rem 0px', fontWeight: 300 } });
export const searchShortcutRecipe = cva({
  base: { fontSize: '0.75rem', letterSpacing: '0.1em', lineHeight: '1rem', marginLeft: 'auto', opacity: 0.5 },
});
export const searchItemListRecipe = cva({ base: { margin: 0, padding: 0 } });
