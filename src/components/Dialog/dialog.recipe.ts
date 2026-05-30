import { cva } from '../../../styled-system/css';

export const dialogHeaderRecipe = cva({ base: { display: 'flex', flexDirection: 'column' } });

export const dialogFooterRecipe = cva({
  base: { display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'flex-start' },
  variants: { justify: { start: { justifyContent: 'flex-start' }, end: { justifyContent: 'flex-end' } } },
  defaultVariants: { justify: 'end' },
});

export const dialogTitleRecipe = cva({ base: { fontWeight: '600', lineHeight: '1', margin: '0px' } });
export const dialogDescriptionRecipe = cva({ base: { margin: '0.375rem 0px', fontWeight: '300' } });

export const modalBGRecipe = cva({
  base: {
    pointerEvents: 'auto',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 50,
    inset: '0',
    position: 'fixed',
    animationDuration: '0.15s',
  },
});

export const modalRecipe = cva({
  base: {
    display: 'grid',
    width: '100%',
    padding: '1.5rem',
    borderRadius: '0.375rem',
    position: 'fixed',
    top: '50%',
    left: '50%',
    gap: '1rem',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    pointerEvents: 'auto',
    zIndex: 50,
    animationDuration: '0.15s',
  },
});

export const exitButtonRecipe = cva({
  base: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    background: 'transparent',
    border: 'none',
    padding: '0px',
    opacity: '0.5',
    cursor: 'pointer',
    '& svg': { width: '1rem', height: '1rem' },
  },
});
