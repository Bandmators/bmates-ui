import { createRecipe } from '@/styles/recipe';

export const inputFileHiddenRecipe = createRecipe('bm-file-input__input');
export const inputFileLabelRecipe = createRecipe('bm-file-input__label', {
  variant: ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline', 'ghost'],
  disabled: [true, false],
});
export const inputFileContainerRecipe = createRecipe('bm-file-input');
