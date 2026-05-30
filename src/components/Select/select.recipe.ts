import { cva } from '../../../styled-system/css';

export const selectLabelRecipe = cva({
  base: { fontWeight: '600', fontSize: '0.875rem', lineHeight: '1.25rem', padding: '0.375rem 0.5rem', margin: '0px' },
});

export const selectDividerRecipe = cva({
  base: { height: '1px', margin: '0.25rem -0.25rem', background: 'var(--gray-300)' },
});
export const selectDescriptionRecipe = cva({ base: { margin: '0.375rem 0px', fontWeight: '300' } });
export const selectShortcutRecipe = cva({
  base: { fontSize: '0.75rem', letterSpacing: '0.1em', lineHeight: '1rem', marginLeft: 'auto', opacity: '0.5' },
});

export const selectListBoxRecipe = cva({ base: { margin: '0px', padding: '0px' } });

export const selectItemRecipe = cva({
  base: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: '0.375rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    cursor: 'default',
  },
  variants: {
    selected: {
      true: { backgroundColor: 'var(--gray-200)' },
    },
    disabled: {
      true: { opacity: '0.5' },
      false: {
        '&[aria-selected="false"]:hover,&[aria-selected="false"]:focus': { backgroundColor: 'var(--gray-100)' },
      },
    },
  },
});

export const selectIconRecipe = cva({ base: { marginLeft: 'auto' } });

export const selectToggleContentRecipe = cva({
  base: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
});
export const selectDownIconWrapperRecipe = cva({
  base: { marginLeft: 'auto', paddingLeft: '1rem', display: 'flex', alignItems: 'center' },
});
