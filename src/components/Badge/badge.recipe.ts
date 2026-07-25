import { createRecipe } from '@/styles/recipe';

export const badgeRecipe = createRecipe('bm-badge', {
  variant: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline', 'ghost'],
  size: ['sm', 'md', 'lg'],
});
