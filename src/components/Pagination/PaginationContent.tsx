import styled from '@emotion/styled';

interface PaginationProps extends React.PropsWithChildren {}

export const PaginationContent = ({ children }: PaginationProps) => {
  return <PaginationList>{children}</PaginationList>;
};
const PaginationList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
