import { cx } from '@/styles/panda';
import * as React from 'react';

import { paginationListRecipe } from './pagination.recipe';

interface PaginationProps extends React.ComponentPropsWithoutRef<'ul'> {}

export const PaginationContent = React.forwardRef<HTMLUListElement, PaginationProps>(({ children, ...props }, ref) => {
  return (
    <ul ref={ref} className={cx(paginationListRecipe())} {...props}>
      {children}
    </ul>
  );
});
PaginationContent.displayName = 'PaginationContent';
