import { cva } from '../../../styled-system/css';

export const portalRecipe = cva({
  base: {
    display: 'grid',
    minWidth: 'max-content',
    maxWidth: '100%',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    position: 'fixed',
    top: '0px',
    left: '0px',
    backgroundColor: 'white',
    pointerEvents: 'auto',
    zIndex: 50,
    animationName: 'bmates-portal-enter',
    animationDuration: '0.15s',
    border: '1px solid var(--gray-300)',
    boxShadow: '0px 2px 2px 0px var(--gray-300)',
    '&:focus': { outline: 'none' },
  },
});

export const portalBGRecipe = cva({
  base: { position: 'fixed', backgroundColor: 'transparent', pointerEvents: 'auto', zIndex: 50, inset: '0' },
});
