import * as React from 'react';

interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {}

export const Pagination = React.forwardRef<HTMLInputElement, PaginationProps>(({ children, ...props }, ref) => {
  return (
    <nav ref={ref} role="navigation" aria-label="pagination" {...props}>
      {children}
    </nav>
  );
});
Pagination.displayName = 'Pagination';
