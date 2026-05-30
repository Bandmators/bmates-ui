import { cva } from '../../../styled-system/css';

export const badgeRecipe = cva({
  base: {
    fontWeight: '500',
    fontSize: '75%',
    lineHeight: '1rem',
    borderRadius: '6px',
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center',
  },
  variants: {
    variant: {
      primary: {
        color: 'white',
        backgroundColor: 'var(--primary)',
      },
      secondary: {
        backgroundColor: 'var(--secondary)',
      },
      danger: {
        color: 'var(--white)',
        backgroundColor: 'var(--danger)',
      },
      warning: {
        color: 'var(--white)',
        backgroundColor: 'var(--warning)',
      },
      outline: {
        backgroundColor: 'transparent',
        border: '1px solid var(--gray-300)',
        '&:hover': {
          backgroundColor: 'var(--gray-100)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    },
    size: {
      sm: {
        padding: '0.125rem 0.5rem',
      },
      md: {
        padding: '0.25rem 0.625rem',
      },
      lg: {
        padding: '0.375rem 0.75rem',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
