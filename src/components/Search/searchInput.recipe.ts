import { cva } from '../../../styled-system/css';

export const searchInputRecipe = cva({
  base: {
    margin: '0.3rem',
    padding: '0.45rem 0.55rem',
    width: 'auto',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    color: 'var(--text)',
    fontSize: '0.85rem',
    lineHeight: '1.3',
    outline: 'none',
    transition: 'border-color var(--transition), box-shadow var(--transition)',
    '&:focus': { borderColor: 'var(--focus-border)', boxShadow: 'var(--focus-shadow)' },
    '&::placeholder': { color: 'var(--faint)' },
  },
});
