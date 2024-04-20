import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';

interface PaginationProps extends React.ComponentPropsWithoutRef<'li'> {
  active?: boolean;
  disabled?: boolean;
}

export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationProps>(
  ({ active = false, disabled = false, onClick, children, ...props }, ref) => {
    const handleOnclick = (e: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) e.preventDefault();
    };

    return (
      <PaginationListItem
        ref={ref}
        active={active}
        disabled={disabled}
        aria-disabled={disabled}
        onClick={composeEventHandlers(handleOnclick, onClick)}
        {...props}
      >
        {children}
      </PaginationListItem>
    );
  },
);
PaginationItem.displayName = 'PaginationItem';

export const PaginationPrevious = ({ active = false, disabled = false, children, ...props }: PaginationProps) => {
  return (
    <PaginationItem active={active} disabled={disabled} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      {children}
    </PaginationItem>
  );
};

export const PaginationNext = ({ active = false, disabled = false, children, ...props }: PaginationProps) => {
  return (
    <PaginationItem active={active} disabled={disabled} {...props}>
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </PaginationItem>
  );
};

const PaginationListItem = styled.li<PaginationProps>`
  min-width: 2.5rem;
  min-height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: 500;
  line-height: 2.5rem;

  ${({ active, disabled }) =>
    disabled
      ? css`
          cursor: default;
          border-color: transparent;
          opacity: 0.5;
        `
      : active
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
