import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface PaginationProps extends React.PropsWithChildren {
  active?: boolean;
}

export const PaginationItem = ({ active = false, children }: PaginationProps) => {
  return <PaginationListItem active={active}>{children}</PaginationListItem>;
};

const PaginationListItem = styled.li<PaginationProps>`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: 500;
  ${({ active }) =>
    active
      ? css`
          background-color: var(--primary);
          color: var(--background);
        `
      : css`
          &:hover {
            background-color: var(--gray-200);
          }
        `}
`;
