import { cva } from '../../../styled-system/css';

export const toastRecipe = cva({
  base: {
    padding: '1rem',
    backgroundColor: 'var(--white)',
    borderRadius: '0.5rem',
    border: '1px solid var(--gray-200)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 0px 3px var(--gray-400)',
    transition: 'transform 0.25s cubic-bezier(0.75, -0.5, 0.25, 1.25)',
    cursor: 'pointer',
  },
  variants: {
    variant: {
      default: { color: 'var(--black)', backgroundColor: 'var(--background)' },
      primary: { color: 'white', backgroundColor: 'var(--primary)' },
      secondary: { backgroundColor: 'var(--secondary)' },
      danger: { color: 'var(--white)', backgroundColor: 'var(--danger)' },
      warning: { color: 'var(--white)', backgroundColor: 'var(--warning)' },
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
