import { cva } from '../../../styled-system/css';

export const avatarRecipe = cva({
  base: {
    borderRadius: '50%',
  },
  variants: {
    size: {
      sm: { width: '1.5rem', height: '1.5rem' },
      md: { width: '2rem', height: '2rem' },
      lg: { width: '3rem', height: '3rem' },
    },
  },
  defaultVariants: { size: 'md' },
});
