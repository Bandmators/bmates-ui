import { cva } from '../../../styled-system/css';

export const switchContainerRecipe = cva({
  base: { position: 'relative', display: 'inline-flex', lineHeight: '1' },
  variants: {
    align: { center: { alignItems: 'center' }, start: { alignItems: 'flex-start' }, end: { alignItems: 'flex-end' } },
    disabled: { true: { opacity: '0.5' } },
  },
  defaultVariants: { align: 'center' },
});

export const switchHiddenRecipe = cva({
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

export const switchLabelRecipe = cva({ base: { fontWeight: '500', marginLeft: '1rem' } });

export const switchBoxRecipe = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    borderRadius: '50rem',
    backgroundColor: 'var(--gray-200)',
    transition: 'background-color ease 0.2s',
    cursor: 'pointer',
    textIndent: '-9999px',
    '&:after': { content: "''", position: 'absolute', background: '#fff', borderRadius: '50rem', transition: '0.2s' },
    '&:focus-visible': { outline: 'none', borderColor: 'var(--focus-border)', boxShadow: 'var(--focus-shadow)' },
  },
  variants: {
    checked: {
      true: { '&:after': { transform: 'translateX(-100%)' } },
    },
    disabled: { true: { cursor: 'not-allowed' } },
    variant: {
      primary: {},
      secondary: {},
      success: {},
      danger: {},
      warning: {},
      info: {},
    },
    size: {
      sm: {
        width: '2rem',
        height: '1rem',
        '&:after': { top: '0.1rem', left: '0.1rem', width: '0.8rem', height: '0.8rem' },
      },
      md: {
        width: '3rem',
        height: '1.5rem',
        '&:after': { top: '0.15rem', left: '0.15rem', width: '1.2rem', height: '1.2rem' },
      },
      lg: {
        width: '4rem',
        height: '2rem',
        '&:after': { top: '0.2rem', left: '0.2rem', width: '1.6rem', height: '1.6rem' },
      },
      xl: {
        width: '6rem',
        height: '3rem',
        '&:after': { top: '0.3rem', left: '0.3rem', width: '2.4rem', height: '2.4rem' },
      },
    },
  },
  compoundVariants: [
    // knob position when checked (per size) — moves the thumb to the right edge
    { checked: true, size: 'sm', css: { '&:after': { left: 'calc(100% - 0.1rem)' } } },
    { checked: true, size: 'md', css: { '&:after': { left: 'calc(100% - 0.15rem)' } } },
    { checked: true, size: 'lg', css: { '&:after': { left: 'calc(100% - 0.2rem)' } } },
    { checked: true, size: 'xl', css: { '&:after': { left: 'calc(100% - 0.4rem)' } } },
    // track color when checked (per variant)
    { checked: true, variant: 'primary', css: { backgroundColor: 'var(--primary)' } },
    { checked: true, variant: 'secondary', css: { backgroundColor: 'var(--secondary)' } },
    { checked: true, variant: 'success', css: { backgroundColor: 'var(--success)' } },
    { checked: true, variant: 'danger', css: { backgroundColor: 'var(--danger)' } },
    { checked: true, variant: 'warning', css: { backgroundColor: 'var(--warning)' } },
    { checked: true, variant: 'info', css: { backgroundColor: 'var(--info)' } },
  ],
});
