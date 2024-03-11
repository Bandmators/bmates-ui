import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';

import SelectContext from './SelectContext';
import SelectIcon from './SelectIcon';

interface SelectItemProps extends React.ComponentPropsWithoutRef<'li'> {
  value: string | number | readonly string[];
  disabled?: boolean;
}
export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ disabled = false, children, value, ...props }, ref) => {
    const { setShowModal } = useContext(PortalContext);
    const { selectedValue, setSelectedValue, multi } = useContext(SelectContext);
    const selected = selectedValue?.some(v => v.value === value) || false;

    const onClickHandler = () => {
      if (!disabled) setShowModal(false);

      if (selected) {
        setSelectedValue([...selectedValue.filter(val => val.value !== value)]);
      } else if (!multi) {
        setSelectedValue([
          {
            name: children,
            value: value,
          },
        ]);
      } else {
        setSelectedValue([
          ...selectedValue,
          {
            name: children,
            value: value,
          },
        ]);
      }
    };

    return (
      <SelectItemStyled
        ref={ref}
        disabled={disabled}
        tabIndex={0}
        role={'option'}
        aria-selected={selected}
        selected={selected}
        onClick={composeEventHandlers(props.onClick, onClickHandler)}
        {...props}
      >
        {children}
        {selected && <SelectIcon />}
      </SelectItemStyled>
    );
  },
);
SelectItem.displayName = 'SelectItem';

const SelectItemStyled = styled.li<{ selected: boolean; disabled: boolean }>`
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
  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.colors.gray['200']};
    `}
  ${({ disabled, theme }) =>
    disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          &[aria-selected='false']:hover {
            background-color: ${theme.colors.gray['100']};
          }
        `}
`;
