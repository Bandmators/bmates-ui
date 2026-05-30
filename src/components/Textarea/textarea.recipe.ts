import { cva } from '../../../styled-system/css';

export const textareaRecipe = cva({
  base: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    padding: '0.375rem 0.75rem',
    backgroundColor: 'transparent',
    borderRadius: '0.375rem',
    border: '1px solid var(--gray-300)',
    outline: 'none',
    width: '100%',
    fontWeight: 'inherit',
    resize: 'vertical',
    color: 'var(--black)',
    minHeight: '2.25rem',
    '&:focus': { borderColor: 'var(--focus-border)', boxShadow: 'var(--focus-shadow)' },
  },
  variants: {
    disabled: {
      true: { opacity: '0.7', backgroundColor: 'var(--gray-100)', cursor: 'not-allowed' },
    },
  },
});
