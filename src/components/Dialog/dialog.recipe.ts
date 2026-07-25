import { createRecipe } from '@/styles/recipe';

export const dialogHeaderRecipe = createRecipe('bm-dialog__header');
export const dialogFooterRecipe = createRecipe('bm-dialog__footer', { justify: ['start', 'end'] });
export const dialogTitleRecipe = createRecipe('bm-dialog__title');
export const dialogDescriptionRecipe = createRecipe('bm-dialog__description');
export const modalBGRecipe = createRecipe('bm-dialog__backdrop');
export const modalRecipe = createRecipe('bm-dialog');
export const exitButtonRecipe = createRecipe('bm-dialog__close');
