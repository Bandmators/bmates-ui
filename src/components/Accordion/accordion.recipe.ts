import { cva } from '../../../styled-system/css';

export const accordionRootRecipe = cva({ base: { display: 'flex', flexDirection: 'column' } });

export const accordionItemRecipe = cva({
  base: {
    border: '1px solid var(--gray-200)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--background)',
    overflow: 'hidden',
    '&:not(:last-child)': { marginBottom: '0.5rem' },
  },
});

export const accordionHeadRecipe = cva({
  base: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    padding: '1rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    color: 'var(--gray-800)',
    '&:focus-visible': { outline: 'none', boxShadow: 'var(--focus-shadow)' },
    '&:disabled': { opacity: '0.6', cursor: 'not-allowed' },
    '&[data-open="true"]': { borderBottom: '1px solid var(--gray-200)' },
  },
});

export const accordionTitleRecipe = cva({ base: { flex: 1, textAlign: 'left' } });

export const accordionIndicatorRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 200ms ease',
    '&[data-open="true"]': { transform: 'rotate(180deg)' },
  },
});

export const accordionContentWrapperRecipe = cva({
  base: {
    overflow: 'hidden',
    transition: 'max-height 200ms ease, opacity 200ms ease',
    opacity: 0,
    '&[data-open="true"]': { opacity: 1 },
  },
});

export const accordionContentInnerRecipe = cva({
  base: { padding: '1rem', color: 'var(--gray-600)', fontSize: '0.875rem', lineHeight: '1.5' },
});

export const accordionIconRecipe = cva({
  base: {
    width: '1rem',
    height: '1rem',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});
