import { cx } from '@/styles/panda';

import {
  searchDescriptionRecipe,
  searchDividerRecipe,
  searchItemListRecipe,
  searchLabelRecipe,
  searchShortcutRecipe,
} from './search.common.recipe';

/* eslint-disable react-refresh/only-export-components */
export * from './Search';
export * from './SearchContent';
export * from './SearchToggle';
export * from './SearchItem';
export * from './SearchInput';
export * from './SearchInputToggle';

export const SearchLabel = (props: React.ComponentPropsWithoutRef<'h3'>) => (
  <h3 {...props} className={cx(searchLabelRecipe(), props.className)} />
);
export const SearchDivider = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={cx(searchDividerRecipe(), props.className)} />
);
export const SearchDescription = (props: React.ComponentPropsWithoutRef<'p'>) => (
  <p {...props} className={cx(searchDescriptionRecipe(), props.className)} />
);
export const SearchShortcut = (props: React.ComponentPropsWithoutRef<'span'>) => (
  <span {...props} className={cx(searchShortcutRecipe(), props.className)} />
);

export const SearchItemList = (props: React.ComponentPropsWithoutRef<'ul'>) => (
  <ul {...props} className={cx(searchItemListRecipe(), props.className)} />
);
