import { createRecipe } from '@/styles/recipe';

export const toggleRecipe = createRecipe('bm-toggle', {
  selected: [true, false],
  size: ['sm', 'md', 'lg'],
  disabled: [true, false],
});
