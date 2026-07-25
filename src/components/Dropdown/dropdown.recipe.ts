import { createRecipe } from '@/styles/recipe';

export const dropdownLabelRecipe = createRecipe('bm-dropdown__label');
export const dropdownDividerRecipe = createRecipe('bm-dropdown__divider');
export const dropdownDescriptionRecipe = createRecipe('bm-dropdown__description');
export const dropdownShortcutRecipe = createRecipe('bm-dropdown__shortcut');
export const dropdownListBoxRecipe = createRecipe('bm-dropdown__list');
export const dropdownItemRecipe = createRecipe('bm-dropdown__item', { disabled: [true, false] });
