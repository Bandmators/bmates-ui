import { cx } from '@/styles/panda';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';

import { paginationLinkRecipe } from './paginationLink.recipe';

interface PaginationLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  selected?: boolean;
  disabled?: boolean;

  as?: React.ElementType;

  /*
   * For React-Router-Dom Link
   */
  to?: string;
}

export const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ selected = false, disabled = false, onClick, as: Component = 'a', className, ...props }, ref) => {
    const LinkComponent = Component as React.ElementType;

    const handleOnclick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) e.preventDefault();
    };

    if (disabled) {
      const { to, href, target, rel, download, onKeyDown, ...spanProps } = props;
      return (
        <span aria-disabled="true" className={cx(paginationLinkRecipe({ disabled: true }), className)} {...spanProps} />
      );
    }

    return (
      <LinkComponent
        ref={ref}
        onClick={composeEventHandlers(handleOnclick, onClick)}
        aria-current={selected ? 'page' : undefined}
        className={cx(paginationLinkRecipe({ selected }), className)}
        {...props}
      />
    );
  },
);
PaginationLink.displayName = 'PaginationLink';

export const PaginationPreviousLink = ({
  selected = false,
  disabled = false,
  children,
  ...props
}: PaginationLinkProps) => {
  return (
    <PaginationLink selected={selected} disabled={disabled} aria-label="Previous page" {...props}>
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

export const PaginationNextLink = ({ selected = false, disabled = false, children, ...props }: PaginationLinkProps) => {
  return (
    <PaginationLink selected={selected} disabled={disabled} aria-label="Next page" {...props}>
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
