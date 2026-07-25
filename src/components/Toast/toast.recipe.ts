import { createRecipe } from '@/styles/recipe';

export const toastRecipe = createRecipe('bm-toast', {
  variant: ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
  position: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
  active: [true, false],
});
export const toastTitleRecipe = createRecipe('bm-toast__title');
export const toastDescriptionRecipe = createRecipe('bm-toast__description');
