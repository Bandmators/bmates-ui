import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentPropsWithoutRef } from 'react';

import { SizeType } from '@/types/size';
import { SpecialVariantType } from '@/types/variant';

type ButtonVariantType = SpecialVariantType | 'default';

const ButtonVariantStyles = ({ theme, variant }: { theme: Theme; variant: ButtonVariantType }) => {
  switch (variant) {
    case 'secondary':
      return css`
        border: 1px solid ${theme.colors.secondary};
        background-color: ${theme.colors.secondary};
        &:hover {
          opacity: 0.8;
        }
      `;
    case 'danger':
      return css`
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.danger};
        background-color: ${theme.colors.danger};
        &:hover {
          opacity: 0.8;
        }
      `;
    case 'warning':
      return css`
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.warning};
        background-color: ${theme.colors.warning};
        &:hover {
          opacity: 0.8;
        }
      `;
    case 'outline':
      return css`
        border: 1px solid ${theme.colors.gray['300']};
        background-color: transparent;
        &:hover {
          background-color: ${theme.colors.gray['100']};
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
      `;
    case 'primary':
      return css`
        color: white;
        border: 1px solid ${theme.colors.primary};
        background-color: ${theme.colors.primary};
        &:hover {
          opacity: 0.8;
        }
      `;
    default:
      return css`
        color: ${theme.colors.black};
        background-color: ${theme.colors.background};
        border: 1px solid ${theme.colors.gray['300']};
        &:hover {
          opacity: 0.8;
        }
      `;
  }
};

const ButtonSizeStyles = ({ size }: { size: SizeType | 'icon' }) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.375rem 0.75rem;
      `;
    case 'lg':
      return css`
        padding: 0.75rem 1.5rem;
      `;
    case 'icon':
      return css`
        padding: 0.375rem;
        img {
          width: 20px;
          height: 20px;
        }
      `;
    case 'md':
    default:
      return css`
        padding: 0.5rem 1rem;
      `;
  }
};

const StyledButton = styled.button<ButtonVariantProps>`
  display: inline-flex;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;

  ${({ theme, variant }) => variant && ButtonVariantStyles({ theme, variant })}

  ${({ size }) => size && ButtonSizeStyles({ size })}

  ${({ full }) =>
    full &&
    css`
      width: 100%;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

export interface ButtonVariantProps {
  /*
    Button variant
  */
  variant?: ButtonVariantType;
  /*
    Button size
  */
  size?: SizeType | 'icon';
  /*
    width full (width: 100%)
  */
  full?: boolean;
}
export interface ButtonProps extends ComponentPropsWithoutRef<'button'>, ButtonVariantProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, full = false, ...props }, ref) => {
    return (
      <StyledButton ref={ref} className={className} variant={variant} full={full} size={size} {...props}>
        {children}
      </StyledButton>
    );
  },
);
Button.displayName = 'Button';
