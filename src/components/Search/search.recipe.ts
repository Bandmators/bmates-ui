import { cva } from '../../../styled-system/css';

export const searchItemRecipe = cva({
  base: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.5rem 0.55rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.85rem',
    fontWeight: '500',
    lineHeight: '1.3',
    color: 'var(--text)',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background var(--transition), color var(--transition)',
  },
  variants: {
    disabled: {
      true: { opacity: 0.45, cursor: 'not-allowed' },
      false: { '&:hover,&:focus': { backgroundColor: 'var(--surface-hover)' } },
    },
  },
});
