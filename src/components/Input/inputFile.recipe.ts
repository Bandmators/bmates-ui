import { cva } from '../../../styled-system/css';

export const inputFileHiddenRecipe = cva({ base: { display: 'none' } });

export const inputFileLabelRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    border: '1px solid transparent',
    borderRadius: 'var(--radius)',
    fontWeight: '500',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color var(--transition), border-color var(--transition), color var(--transition)',
  },
  variants: {
    variant: {
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
      default: {
        color: 'var(--text)',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        '&:hover': { backgroundColor: 'var(--surface-hover)' },
      },
    },
    disabled: { true: { opacity: '0.5', pointerEvents: 'none', cursor: 'not-allowed' } },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const inputFileContainerRecipe = cva({ base: { display: 'flex', flexDirection: 'column', gap: '0.5rem' } });
