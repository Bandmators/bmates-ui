import styled from '@emotion/styled';
import * as React from 'react';

interface PaginationProps extends React.ComponentPropsWithoutRef<'ul'> {}

export const PaginationContent = React.forwardRef<HTMLUListElement, PaginationProps>(({ children, ...props }, ref) => {
  return (
    <PaginationList ref={ref} {...props}>
      {children}
    </PaginationList>
  );
});
PaginationContent.displayName = 'PaginationContent';

const PaginationList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
