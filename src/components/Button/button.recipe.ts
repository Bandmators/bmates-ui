import { cva } from '../../../styled-system/css';

export const buttonRecipe = cva({
  base: {
    display: 'inline-flex',
    gap: '0.4rem',
    outline: 'none',
    border: '1px solid transparent',
    borderRadius: 'var(--radius)',
    fontWeight: '500',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'background-color var(--transition), border-color var(--transition), color var(--transition)',
    '&:focus-visible': {
      borderColor: 'var(--focus-border)',
      boxShadow: 'var(--focus-shadow)',
    },
  },
  variants: {
    variant: {
      default: {
        color: 'var(--text)',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        '&:hover': { backgroundColor: 'var(--surface-hover)' },
      },
      primary: {
        color: 'var(--primary-fg)',
        border: '1px solid var(--primary)',
        backgroundColor: 'var(--primary)',
        '&:hover': { backgroundColor: 'var(--primary-hover)', borderColor: 'var(--primary-hover)' },
      },
      secondary: {
        color: 'var(--secondary-fg)',
        border: '1px solid var(--secondary)',
        backgroundColor: 'var(--secondary)',
        '&:hover': { backgroundColor: 'var(--secondary-hover)', borderColor: 'var(--secondary-hover)' },
      },
      success: {
        color: 'var(--success-fg)',
        border: '1px solid var(--success)',
        backgroundColor: 'var(--success)',
        '&:hover': { backgroundColor: 'var(--success-hover)', borderColor: 'var(--success-hover)' },
      },
      danger: {
        color: 'var(--danger-fg)',
        border: '1px solid var(--danger)',
        backgroundColor: 'var(--danger)',
        '&:hover': { backgroundColor: 'var(--danger-hover)', borderColor: 'var(--danger-hover)' },
      },
      warning: {
        color: 'var(--warning-fg)',
        border: '1px solid var(--warning)',
        backgroundColor: 'var(--warning)',
        '&:hover': { backgroundColor: 'var(--warning-hover)', borderColor: 'var(--warning-hover)' },
      },
      info: {
        color: 'var(--info-fg)',
        border: '1px solid var(--info)',
        backgroundColor: 'var(--info)',
        '&:hover': { backgroundColor: 'var(--info-hover)', borderColor: 'var(--info-hover)' },
      },
      outline: {
        color: 'var(--text)',
        border: '1px solid var(--border-strong)',
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: 'var(--surface-hover)' },
      },
      ghost: {
        color: 'var(--text)',
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: 'var(--surface-hover)' },
      },
    },
    size: {
      sm: {
        padding: '0.375rem 0.75rem',
      },
      md: {
        padding: '0.5rem 1rem',
      },
      lg: {
        padding: '0.75rem 1.5rem',
      },
      icon: {
        padding: '0.5rem',
        '& img': {
          width: '20px',
          height: '20px',
        },
      },
    },
    full: {
      true: {
        width: '100%',
      },
    },
    disabled: {
      true: {
        opacity: '0.5',
        pointerEvents: 'none',
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
