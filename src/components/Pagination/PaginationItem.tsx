import * as React from 'react';

interface PaginationProps extends React.ComponentPropsWithoutRef<'li'> {}

export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationProps>(({ children, ...props }, ref) => {
  return (
    <li ref={ref} {...props}>
      {children}
    </li>
  );
});
PaginationItem.displayName = 'PaginationItem';
