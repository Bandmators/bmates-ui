import { cva } from '../../../styled-system/css';

export const tooltipTriggerRecipe = cva({
  base: {
    display: 'none',
    position: 'absolute',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    transform: 'scale(0.9)',
    boxShadow: '0 2px 4px var(--black)',
    color: 'var(--white)',
    backgroundColor: 'var(--black)',
    animation: 'bmates-tooltip 0.5s ease',
    zIndex: 200,
    whiteSpace: 'nowrap',
  },
  variants: {
    direction: {
      top: { left: 'calc(50% + 0.25rem)', transform: 'translateX(calc(-50% - 4px))', bottom: 'calc(100% + 0.5rem)' },
      bottom: { left: 'calc(50% + 0.25rem)', transform: 'translateX(calc(-50% - 4px))', top: 'calc(100% + 0.5rem)' },
      left: { top: 'calc(50% + 0.25rem)', transform: 'translateY(calc(-50% - 4px))', right: 'calc(100% + 0.5rem)' },
      right: { top: 'calc(50% + 0.25rem)', transform: 'translateY(calc(-50% - 4px))', left: 'calc(100% + 0.5rem)' },
    },
  },
});

export const tooltipWrapperRecipe = cva({
  base: {
    position: 'relative',
    width: 'fit-content',
    height: 'fit-content',
    '&:hover > .tooltip, &:active > .tooltip': { display: 'block' },
  },
});
