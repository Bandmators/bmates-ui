import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';

interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<'li'> {
  disabled?: boolean;
}
export const ContextMenuItem = React.forwardRef<HTMLLIElement, ContextMenuItemProps>(
  ({ disabled = false, ...props }, ref) => {
    const { setShowModal } = useContext(PortalContext);

    const onClickHandler = () => {
      if (!disabled) setShowModal(false);
    };

    return (
      <ContextMenuItemStyled
        ref={ref}
        tabIndex={0}
        role={'menuitem'}
        disabled={disabled}
        onClick={composeEventHandlers(props.onClick, onClickHandler)}
        data-focus-enabled="true"
        {...props}
      ></ContextMenuItemStyled>
    );
  },
);
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuItemStyled = styled.li<{ disabled: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0.375rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  cursor: default;
  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover,
          &:focus {
            background-color: var(--gray-100);
          }
        `}
`;
