import { cx } from '@/styles/panda';
import * as React from 'react';

import { Input } from '../Input';
import { searchInputRecipe } from './searchInput.recipe';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {}

export const SearchInput = ({ className, ...props }: InputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return <Input ref={inputRef} className={cx(searchInputRecipe(), className)} {...props} />;
};
