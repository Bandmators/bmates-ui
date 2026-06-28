import { cva } from '../../../styled-system/css';

export const selectLabelRecipe = cva({
  base: {
    fontWeight: '600',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    padding: '0.4rem 0.55rem',
    margin: '0px',
    color: 'var(--faint)',
  },
});

export const selectDividerRecipe = cva({
  base: { height: '1px', margin: '0.3rem -0.3rem', background: 'var(--border)' },
});
export const selectDescriptionRecipe = cva({
  base: { margin: '0.375rem 0px', fontWeight: '400', fontSize: '0.74rem', lineHeight: '1.3', color: 'var(--muted)' },
});
export const selectShortcutRecipe = cva({
  base: {
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    marginLeft: 'auto',
    paddingLeft: '1rem',
    color: 'var(--faint)',
  },
});

export const selectListBoxRecipe = cva({ base: { margin: '0px', padding: '0px', display: 'grid', gap: '0.1rem' } });

export const selectItemRecipe = cva({
  base: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.5rem 0.55rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.85rem',
    fontWeight: '500',
    lineHeight: '1.3',
    color: 'var(--text)',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background var(--transition), color var(--transition)',
  },
  variants: {
    selected: {
      true: { backgroundColor: 'var(--surface-active)' },
    },
    disabled: {
      true: { opacity: '0.45', cursor: 'not-allowed' },
      false: {
        '&[aria-selected="false"]:hover,&[aria-selected="false"]:focus': {
          backgroundColor: 'var(--surface-hover)',
        },
      },
    },
  },
});

export const selectIconRecipe = cva({ base: { marginLeft: 'auto', color: 'var(--muted)' } });

export const selectToggleContentRecipe = cva({
  base: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
});
export const selectDownIconWrapperRecipe = cva({
  base: { marginLeft: 'auto', paddingLeft: '1rem', display: 'flex', alignItems: 'center', color: 'var(--muted)' },
});
