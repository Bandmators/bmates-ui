import { cva } from '../../../styled-system/css';

export const dropdownLabelRecipe = cva({
  base: { fontWeight: '600', fontSize: '0.875rem', lineHeight: '1.25rem', padding: '0.375rem 0.5rem', margin: '0px' },
});
export const dropdownDividerRecipe = cva({
  base: { height: '1px', margin: '0.25rem -0.25rem', background: 'var(--gray-300)' },
});
export const dropdownDescriptionRecipe = cva({ base: { margin: '0.375rem 0px', fontWeight: '300' } });
export const dropdownShortcutRecipe = cva({
  base: { fontSize: '0.75rem', letterSpacing: '0.1em', lineHeight: '1rem', marginLeft: 'auto', opacity: '0.5' },
});

export const dropdownListBoxRecipe = cva({ base: { margin: '0px', padding: '0px' } });

export const dropdownItemRecipe = cva({
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
    disabled: {
      true: { opacity: '0.5' },
      false: { '&:hover,&:focus': { backgroundColor: 'var(--gray-100)' } },
    },
  },
});
