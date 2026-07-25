import { createRecipe } from '@/styles/recipe';

export const selectLabelRecipe = createRecipe('bm-select__label');
export const selectDividerRecipe = createRecipe('bm-select__divider');
export const selectDescriptionRecipe = createRecipe('bm-select__description');
export const selectShortcutRecipe = createRecipe('bm-select__shortcut');
export const selectListBoxRecipe = createRecipe('bm-select__list');
export const selectItemRecipe = createRecipe('bm-select__item', { selected: [true, false], disabled: [true, false] });
export const selectIconRecipe = createRecipe('bm-select__icon');
export const selectToggleContentRecipe = createRecipe('bm-select__toggle-content');
export const selectToggleValueRecipe = createRecipe('bm-select__toggle-value');
export const selectDownIconWrapperRecipe = createRecipe('bm-select__toggle-icon');
