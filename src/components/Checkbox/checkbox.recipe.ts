import { cva } from '../../../styled-system/css';

export const checkboxContainerRecipe = cva({
  base: {
    display: 'inline-flex',
    lineHeight: '1',
  },
  variants: {
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
    },
    disabled: {
      true: { opacity: '0.5' },
    },
  },
  defaultVariants: { align: 'center' },
});

export const checkboxBoxRecipe = cva({
  base: {
    display: 'inline-flex',
    width: '1rem',
    height: '1rem',
    borderRadius: '4px',
    transition: 'all 150ms',
    border: '1px solid var(--primary)',
    cursor: 'pointer',
    '&:focus-visible': {
      outline: 'none',
      boxShadow: 'var(--focus-shadow)',
    },
    '& svg': {
      visibility: 'hidden',
      fill: 'none',
      stroke: 'white',
      strokeWidth: '2px',
    },
  },
  variants: {
    checked: {
      true: {
        background: 'var(--primary)',
        '& svg': { visibility: 'visible' },
      },
    },
    disabled: {
      true: { cursor: 'not-allowed' },
    },
  },
});

export const checkboxLabelRecipe = cva({ base: { fontWeight: '500', marginLeft: '1rem' } });

export const checkboxHiddenRecipe = cva({
  base: {
    clip: 'rect(0 0 0 0)',
    width: '1px',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    border: 'none',
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
});
