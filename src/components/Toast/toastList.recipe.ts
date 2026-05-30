import { cva } from '../../../styled-system/css';

export const toastListRecipe = cva({
  base: {
    listStyle: 'none',
    position: 'fixed',
    display: 'flex',
    margin: 0,
    zIndex: 100,
    maxHeight: '100vh',
    width: '100%',
    padding: '1rem',
    flexDirection: 'column',
    maxWidth: '25rem',
    gap: '1rem',
  },
  variants: {
    position: {
      'top-left': { top: 0, left: 0, bottom: 'auto' },
      'top-center': { top: 0, left: '50%', bottom: 'auto', transform: 'translate(-50%)' },
      'top-right': { top: 0, right: 0, bottom: 'auto' },
      'bottom-left': { top: 'auto', left: 0, bottom: 0 },
      'bottom-center': { bottom: 0, left: '50%', top: 'auto', transform: 'translate(-50%)' },
      'bottom-right': { top: 'auto', right: 0, bottom: 0 },
    },
  },
});
