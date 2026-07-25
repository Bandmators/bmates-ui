import { createRecipe } from '@/styles/recipe';

export const checkboxContainerRecipe = createRecipe('bm-checkbox', {
  align: ['start', 'center', 'end'],
  disabled: [true, false],
});
export const checkboxBoxRecipe = createRecipe('bm-checkbox__box', { checked: [true, false], disabled: [true, false] });
export const checkboxLabelRecipe = createRecipe('bm-checkbox__label');
export const checkboxHiddenRecipe = createRecipe('bm-checkbox__input');
