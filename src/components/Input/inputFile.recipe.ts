import { cva } from '../../../styled-system/css';

export const inputFileHiddenRecipe = cva({ base: { display: 'none' } });

export const inputFileLabelRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.2s',
  },
  variants: {
    variant: {
      secondary: {
        border: '1px solid var(--secondary)',
        backgroundColor: 'var(--secondary)',
        '&:hover': { opacity: '0.8' },
      },
      danger: {
        color: 'var(--white)',
        border: '1px solid var(--danger)',
        backgroundColor: 'var(--danger)',
        '&:hover': { opacity: '0.8' },
      },
      warning: {
        color: 'var(--white)',
        border: '1px solid var(--warning)',
        backgroundColor: 'var(--warning)',
        '&:hover': { opacity: '0.8' },
      },
      outline: {
        border: '1px solid var(--gray-300)',
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: 'var(--gray-100)' },
      },
      ghost: { backgroundColor: 'transparent' },
      primary: {
        color: 'white',
        border: '1px solid var(--primary)',
        backgroundColor: 'var(--primary)',
        '&:hover': { opacity: '0.8' },
      },
      default: {
        color: 'var(--black)',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--gray-300)',
        '&:hover': { opacity: '0.8' },
      },
    },
    disabled: { true: { opacity: '0.5', pointerEvents: 'none', cursor: 'not-allowed' } },
  },
});

export const inputFileContainerRecipe = cva({ base: { display: 'flex', flexDirection: 'column', gap: '0.5rem' } });
