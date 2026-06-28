import { cva } from '../../../styled-system/css';

export const paginationLinkRecipe = cva({
  base: {
    minWidth: '2.5rem',
    minHeight: '2.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 500,
    lineHeight: '2.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'var(--text)',
    transition: 'background-color var(--transition), color var(--transition)',
  },
  variants: {
    selected: {
      true: { backgroundColor: 'var(--primary)', color: 'var(--background)' },
      false: { '&:hover': { backgroundColor: 'var(--surface-hover)' } },
    },
    disabled: { true: { cursor: 'not-allowed', opacity: 0.5 } },
  },
});
