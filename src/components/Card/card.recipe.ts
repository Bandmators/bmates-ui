import { cva } from '../../../styled-system/css';

export const cardRecipe = cva({
  base: {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--background)',
    boxShadow: '0 0 4px var(--gray-300)',
  },
});

export const cardBodyRecipe = cva({ base: { display: 'grid', gap: '0.5rem' } });
export const cardHeadRecipe = cva({ base: { marginBottom: '1rem' } });
export const cardFooterRecipe = cva({ base: { marginTop: '1rem' } });
export const cardTitleRecipe = cva({ base: { margin: '0px' } });
export const cardDescRecipe = cva({
  base: { margin: '0px', fontSize: '0.875rem', lineHeight: '1.25rem', color: 'var(--gray-500)' },
});
