import { cva } from '../../../styled-system/css';

export const inputRecipe = cva({
  base: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'transparent',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border-strong)',
    outline: 'none',
    width: '100%',
    fontWeight: 'inherit',
    color: 'var(--text)',
    transition: 'border-color var(--transition), box-shadow var(--transition)',
    '&::placeholder': { color: 'var(--faint)' },
    '&:focus': {
      borderColor: 'var(--focus-border)',
      boxShadow: 'var(--focus-shadow)',
    },
  },
  variants: {
    disabled: {
      true: {
        opacity: '0.7',
        backgroundColor: 'var(--surface-hover)',
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {},
});
