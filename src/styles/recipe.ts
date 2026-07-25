import { cx } from './classnames';

type RecipeValue = string | number | boolean;
type RecipeVariants = Record<string, readonly RecipeValue[]>;

export type RecipeProps<T extends RecipeVariants> = Partial<{
  [K in keyof T]: T[K][number];
}>;

/**
 * Maps component props to documented, stable modifier classes. Styling stays in
 * static CSS, so this has no runtime stylesheet or SSR side effect.
 */
export const createRecipe = <const T extends RecipeVariants = Record<string, never>>(root: string, variants?: T) => {
  void variants;

  return (options: RecipeProps<T> = {}) =>
    cx(
      root,
      ...Object.entries(options as Record<string, RecipeValue | undefined>).flatMap(([name, value]) => {
        if (value === undefined || value === false) return [];
        return value === true ? [`${root}--${name}`] : [`${root}--${name}-${value}`];
      }),
    );
};
