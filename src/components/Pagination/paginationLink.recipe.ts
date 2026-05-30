import { cva } from '../../../styled-system/css';

export const paginationLinkRecipe = cva({
  base: {
    minWidth: '2.5rem',
    minHeight: '2.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.25rem',
    fontWeight: 500,
    lineHeight: '2.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
  },
  variants: {
    selected: { true: { backgroundColor: 'var(--primary)', color: 'var(--background)' } },
    disabled: { true: { cursor: 'not-allowed', opacity: 0.5 } },
  },
});
