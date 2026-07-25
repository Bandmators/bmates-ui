import { createRecipe } from '@/styles/recipe';

export const switchContainerRecipe = createRecipe('bm-switch', {
  align: ['start', 'center', 'end'],
  disabled: [true, false],
});
export const switchHiddenRecipe = createRecipe('bm-switch__input');
export const switchLabelRecipe = createRecipe('bm-switch__label');
export const switchBoxRecipe = createRecipe('bm-switch__box', {
  checked: [true, false],
  disabled: [true, false],
  variant: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
  size: ['sm', 'md', 'lg', 'xl'],
});
