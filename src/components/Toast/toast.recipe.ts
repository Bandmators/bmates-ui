import { cva } from '../../../styled-system/css';

export const toastRecipe = cva({
  base: {
    padding: '1rem',
    backgroundColor: 'var(--elevated)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.25s cubic-bezier(0.75, -0.5, 0.25, 1.25)',
    cursor: 'pointer',
  },
  variants: {
    variant: {
      default: { color: 'var(--text)', backgroundColor: 'var(--elevated)' },
      primary: { color: 'var(--primary-fg)', backgroundColor: 'var(--primary)' },
      secondary: { color: 'var(--secondary-fg)', backgroundColor: 'var(--secondary)' },
      success: { color: 'var(--success-fg)', backgroundColor: 'var(--success)' },
      danger: { color: 'var(--danger-fg)', backgroundColor: 'var(--danger)' },
      warning: { color: 'var(--warning-fg)', backgroundColor: 'var(--warning)' },
      info: { color: 'var(--info-fg)', backgroundColor: 'var(--info)' },
    },
    position: {
      'top-left': { transform: 'translateX(calc(-100% - 2rem))' },
      'top-center': { transform: 'translateY(-100vh)' },
      'top-right': { transform: 'translateX(calc(100% + 2rem))' },
      'bottom-left': { transform: 'translateX(calc(-100% - 2rem))' },
      'bottom-center': { transform: 'translateY(100vh)' },
      'bottom-right': { transform: 'translateX(calc(100% + 2rem))' },
    },
    active: {
      true: { transform: 'translateX(0) translateY(0)' },
    },
  },
});

export const toastTitleRecipe = cva({ base: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: '600' } });
export const toastDescriptionRecipe = cva({ base: { fontSize: '0.75rem', lineHeight: '1rem', fontWeight: '400' } });
