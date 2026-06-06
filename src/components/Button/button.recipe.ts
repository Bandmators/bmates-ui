import { cva } from '../../../styled-system/css';

export const buttonRecipe = cva({
  base: {
    display: 'inline-flex',
    outline: 'none',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:focus-visible': {
      borderColor: 'var(--focus-border)',
      boxShadow: 'var(--focus-shadow)',
    },
  },
  variants: {
    variant: {
      default: {
        color: 'var(--black)',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--gray-300)',
        '&:hover': {
          opacity: '0.8',
        },
      },
      secondary: {
        border: '1px solid var(--secondary)',
        backgroundColor: 'var(--secondary)',
        '&:hover': {
          opacity: '0.8',
        },
      },
      danger: {
        color: 'var(--white)',
        border: '1px solid var(--danger)',
        backgroundColor: 'var(--danger)',
        '&:hover': {
          opacity: '0.8',
        },
      },
      warning: {
        color: 'var(--white)',
        border: '1px solid var(--warning)',
        backgroundColor: 'var(--warning)',
        '&:hover': {
          opacity: '0.8',
        },
      },
      outline: {
        border: '1px solid var(--gray-300)',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'var(--gray-100)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'var(--gray-100)',
        },
      },
      primary: {
        color: 'white',
        border: '1px solid var(--primary)',
        backgroundColor: 'var(--primary)',
        '&:hover': {
          opacity: '0.8',
        },
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
        padding: '0.375rem',
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
