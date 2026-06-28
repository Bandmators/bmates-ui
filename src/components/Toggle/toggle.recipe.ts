import { cva } from '../../../styled-system/css';

export const toggleRecipe = cva({
  base: {
    display: 'inline-flex',
    padding: '0.5rem',
    outline: 'none',
    borderRadius: 'var(--radius)',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    color: 'var(--text)',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    transition: 'background-color var(--transition), border-color var(--transition)',
    '&:focus-visible': { outline: 'none', boxShadow: 'var(--focus-shadow)' },
  },
  variants: {
    selected: {
      true: { border: '1px solid var(--border-strong)', backgroundColor: 'var(--surface-active)' },
      false: { '&:hover': { backgroundColor: 'var(--surface-hover)' } },
    },
    size: {
      sm: { padding: '0.25rem' },
      md: { padding: '0.5rem' },
      lg: { padding: '0.75rem' },
    },
    disabled: {
      true: { opacity: '0.7', backgroundColor: 'var(--surface-hover)', cursor: 'not-allowed' },
    },
  },
});
