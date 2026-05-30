import { cx } from '@/styles/panda';
import type React from 'react';

import {
  dropdownDescriptionRecipe,
  dropdownDividerRecipe,
  dropdownLabelRecipe,
  dropdownShortcutRecipe,
} from './dropdown.recipe';

/* eslint-disable react-refresh/only-export-components */
export * from './Dropdown';
export * from './DropdownContent';
export * from './DropdownToggle';
export * from './DropdownItem';

export const DropdownLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
  <h2 className={cx(dropdownLabelRecipe(), className)} {...props} />
);

export const DropdownDivider = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(dropdownDividerRecipe(), className)} {...props} />
);
export const DropdownDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
  <p className={cx(dropdownDescriptionRecipe(), className)} {...props} />
);

export const DropdownShortcut = ({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) => (
  <span className={cx(dropdownShortcutRecipe(), className)} {...props} />
);
