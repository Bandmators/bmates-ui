import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';
import { SizeType } from '@/types/size';

export interface ToggleProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: SizeType;
  selected?: boolean;
}

const ButtonSizeStyles = ({ size }: { size: SizeType }) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.25rem;
      `;
    case 'lg':
      return css`
        padding: 0.75rem;
      `;
    case 'md':
    default:
      return css`
        padding: 0.5rem;
      `;
  }
};

const StyledToggle = styled.button<ToggleProps>`
  display: inline-flex;
  padding: 0.5rem;
  outline: none;
  border-radius: 0.375rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid transparent;

  &:focus {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.gray['200']};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      opacity: 0.7;
      background-color: ${theme.colors.gray['100']};
      cursor: not-allowed;
    `}

  ${({ selected, theme }) =>
    selected
      ? css`
          border: 1px solid ${theme.colors.gray['300']};
          background-color: ${theme.colors.gray['200']};
        `
      : css`
          &:hover {
            opacity: 0.5;
            background-color: ${theme.colors.gray['200']};
          }
        `}

        
  ${({ size }) => size && ButtonSizeStyles({ size })}
`;

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, selected = false, size, disabled = false, ...props }, ref) => {
    const [sel, setSel] = React.useState<boolean>(selected);

    React.useEffect(() => {
      setSel(selected);
    }, [selected]);

    return (
      <StyledToggle
        type="button"
        className={className}
        ref={ref}
        disabled={disabled}
        size={size}
        selected={sel}
        onClick={composeEventHandlers(props.onClick, () => {
          setSel(prev => !prev);
        })}
        {...props}
      />
    );
  },
);
Toggle.displayName = 'Input';
