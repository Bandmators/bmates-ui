import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';

interface PaginationLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  active?: boolean;
  disabled?: boolean;

  as?: React.ElementType;

  /*
   * For React-Router-Dom Link
   */
  to?: string;
}

export const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ active = false, disabled = false, onClick, as, ...props }, ref) => {
    const handleOnclick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) e.preventDefault();
    };

    return (
      <>
        {disabled ? (
          <DisabledLink disabled={disabled} aria-disabled="true" as={as} {...props} />
        ) : (
          <Link ref={ref} as={as} active={active} onClick={composeEventHandlers(handleOnclick, onClick)} {...props} />
        )}
      </>
    );
  },
);
PaginationLink.displayName = 'PaginationLink';

export const PaginationPreviousLink = ({
  active = false,
  disabled = false,
  children,
  ...props
}: PaginationLinkProps) => {
  return (
    <PaginationLink active={active} disabled={disabled} {...props}>
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
    </PaginationLink>
  );
};

export const PaginationNextLink = ({ active = false, disabled = false, children, ...props }: PaginationLinkProps) => {
  return (
    <PaginationLink active={active} disabled={disabled} {...props}>
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
    </PaginationLink>
  );
};

const Link = styled.a<PaginationLinkProps>`
  min-width: 2.5rem;
  min-height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  font-weight: 500;
  line-height: 2.5rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
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

const DisabledLink = Link.withComponent('span');
