import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';

import DropdownContext from './DropdownContext';

interface DropdownItemProps extends React.ComponentPropsWithoutRef<'div'> {
  disabled?: boolean;
}
export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ disabled = false, ...props }, ref) => {
    const { setShowModal } = useContext(DropdownContext);

    const onClickHandler = () => {
      if (!disabled) setShowModal(false);
    };

    return (
      <DropdownItemStyled
        ref={ref}
        tabIndex={0}
        disabled={disabled}
        onClick={composeEventHandlers(props.onClick, onClickHandler)}
        {...props}
      ></DropdownItemStyled>
    );
  },
);
DropdownItem.displayName = 'DropdownItem';

const DropdownItemStyled = styled.div<{ disabled: boolean }>`
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
  ${({ disabled, theme }) =>
    disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover {
            background-color: ${theme.colors.gray['100']};
          }
        `}
`;
