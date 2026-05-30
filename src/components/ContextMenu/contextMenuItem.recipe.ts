import { cva } from '../../../styled-system/css';

export const contextMenuItemRecipe = cva({
  base: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: '0.375rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    cursor: 'default',
  },
  variants: {
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed' },
      false: { '&:hover,&:focus': { backgroundColor: 'var(--gray-100)' } },
    },
  },
});
