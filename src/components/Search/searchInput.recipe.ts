import { cva } from '../../../styled-system/css';

export const searchInputRecipe = cva({
  base: {
    margin: '0.375rem 0.375rem',
    padding: '0.375rem 0.375rem',
    width: 'auto',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    outline: '2px solid transparent',
    outlineOffset: '2px',
  },
});
