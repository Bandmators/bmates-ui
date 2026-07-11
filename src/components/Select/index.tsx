import { cx } from '@/styles/panda';
import * as React from 'react';

import { selectDescriptionRecipe, selectDividerRecipe, selectLabelRecipe, selectShortcutRecipe } from './select.recipe';

export * from './Select';
export * from './SelectContent';
export * from './SelectToggle';
export * from './SelectItem';

export const SelectLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
  <h2 className={cx(selectLabelRecipe(), className)} {...props} />
);

export const SelectDivider = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(selectDividerRecipe(), className)} {...props} />
);
export const SelectDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
  <p className={cx(selectDescriptionRecipe(), className)} {...props} />
);

export const SelectShortcut = ({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) => (
  <span className={cx(selectShortcutRecipe(), className)} {...props} />
);
