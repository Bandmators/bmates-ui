import { cva } from '../../../styled-system/css';

export const badgeRecipe = cva({
  base: {
    fontWeight: '500',
    fontSize: '75%',
    lineHeight: '1rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  variants: {
    variant: {
      primary: {
        color: 'var(--primary-fg)',
        backgroundColor: 'var(--primary)',
      },
      secondary: {
        color: 'var(--secondary-fg)',
        backgroundColor: 'var(--secondary)',
      },
      success: {
        color: 'var(--success-fg)',
        backgroundColor: 'var(--success)',
      },
      danger: {
        color: 'var(--danger-fg)',
        backgroundColor: 'var(--danger)',
      },
      warning: {
        color: 'var(--warning-fg)',
        backgroundColor: 'var(--warning)',
      },
      info: {
        color: 'var(--info-fg)',
        backgroundColor: 'var(--info)',
      },
      outline: {
        backgroundColor: 'transparent',
        border: '1px solid var(--border-strong)',
        '&:hover': {
          backgroundColor: 'var(--surface-hover)',
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
