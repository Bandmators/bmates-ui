import { cva } from '../../../styled-system/css';

export const portalRecipe = cva({
  base: {
    display: 'grid',
    minWidth: 'max-content',
    maxWidth: '100%',
    padding: '0.3rem',
    borderRadius: 'var(--radius)',
    position: 'fixed',
    top: '0px',
    left: '0px',
    color: 'var(--text)',
    backgroundColor: 'var(--elevated)',
    pointerEvents: 'auto',
    zIndex: 50,
    animationName: 'bmates-portal-enter',
    animationDuration: '0.16s',
    animationTimingFunction: 'var(--ease-out)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)',
    '&:focus': { outline: 'none' },
  },
});

export const portalBGRecipe = cva({
  base: { position: 'fixed', backgroundColor: 'transparent', pointerEvents: 'auto', zIndex: 50, inset: '0' },
});
