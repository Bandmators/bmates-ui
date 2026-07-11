import { cx } from '@/styles/panda';
import * as React from 'react';

import {
  searchDescriptionRecipe,
  searchDividerRecipe,
  searchItemListRecipe,
  searchLabelRecipe,
  searchShortcutRecipe,
} from './search.common.recipe';

export * from './Search';
export * from './SearchContent';
export * from './SearchToggle';
export * from './SearchItem';
export * from './SearchInput';
export * from './SearchInputToggle';

export const SearchLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) => (
  <h3 className={cx(searchLabelRecipe(), className)} {...props} />
);
export const SearchDivider = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(searchDividerRecipe(), className)} {...props} />
);
export const SearchDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
  <p className={cx(searchDescriptionRecipe(), className)} {...props} />
);
export const SearchShortcut = ({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) => (
  <span className={cx(searchShortcutRecipe(), className)} {...props} />
);

export const SearchItemList = ({ className, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
  <ul className={cx(searchItemListRecipe(), className)} {...props} />
);
