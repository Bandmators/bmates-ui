import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { SizeType } from '@/types/size';

type BadgeVariantType = 'primary' | 'secondary' | 'warning' | 'danger' | 'outline' | 'ghost';

const BadgeVariantStyles = ({ variant }: { variant: BadgeVariantType }) => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: var(--secondary);
      `;
    case 'danger':
      return css`
        color: var(--white);
        background-color: var(--danger);
      `;
    case 'warning':
      return css`
        color: var(--white);
        background-color: var(--warning);
      `;
    case 'outline':
      return css`
        background-color: transparent;
        border: 1px solid var(--gray-300);
        &:hover {
          background-color: var(--gray-100);
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
      `;
    case 'primary':
    default:
      return css`
        color: white;
        background-color: var(--primary);
      `;
  }
};

const BadgeSizeStyles = ({ size }: { size: SizeType }) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.125rem 0.5rem;
      `;
    case 'lg':
      return css`
        padding: 0.375rem 0.75rem;
      `;
    case 'md':
    default:
      return css`
        padding: 0.25rem 0.625rem;
      `;
  }
};

const StyledBadge = styled.div<BadgeVariantProps>`
  font-weight: 500;
  font-size: 75%;
  line-height: 1rem;
  border-radius: 6px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;

  ${({ variant }) => variant && BadgeVariantStyles({ variant })}

  ${({ size }) => size && BadgeSizeStyles({ size })}
`;

export interface BadgeVariantProps {
  /*
        Badge variant
    */
  variant?: BadgeVariantType;
  /*
        Badge size
    */
  size?: SizeType;
}

export interface BadgeProps extends React.ComponentProps<'div'>, BadgeVariantProps {}

export const Badge = ({ className, variant = 'primary', size = 'md', ...props }: BadgeProps) => {
  return <StyledBadge className={className} variant={variant} size={size} {...props} />;
};
