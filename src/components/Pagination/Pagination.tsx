import styled from '@emotion/styled';

interface PaginationProps extends React.PropsWithChildren {}

export const Pagination = ({ children }: PaginationProps) => {
  return (
    <PaginationNav role="navigation" aria-label="pagination">
      {children}
    </PaginationNav>
  );
};

const PaginationNav = styled.nav``;
