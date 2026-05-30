import { cva } from '../../../styled-system/css';

export const toggleRecipe = cva({
  base: {
    display: 'inline-flex',
    padding: '0.5rem',
    outline: 'none',
    borderRadius: '0.375rem',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    '&:focus': { boxShadow: '0 0 5px var(--gray-200)' },
  },
  variants: {
    selected: {
      true: { border: '1px solid var(--gray-300)', backgroundColor: 'var(--gray-200)' },
      false: { '&:hover': { opacity: '0.5', backgroundColor: 'var(--gray-200)' } },
    },
    size: {
      sm: { padding: '0.25rem' },
      md: { padding: '0.5rem' },
      lg: { padding: '0.75rem' },
    },
    disabled: {
      true: { opacity: '0.7', backgroundColor: 'var(--gray-100)', cursor: 'not-allowed' },
    },
  },
});
