import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentPropsWithoutRef } from 'react';

import { SizeType } from '@/types/size';

import bandmate_60 from '@/assets/bandmate_60.png';

export interface AvatarVariantProps {
  /*
    Button size
  */
  size?: SizeType;
}
export interface AvatarProps extends ComponentPropsWithoutRef<'div'>, AvatarVariantProps {
  src: string;
  alt: string;
}

const AvatarSizeStyles = ({ size }: { size: SizeType }) => {
  switch (size) {
    case 'sm':
      return css`
        width: 1.5rem;
        height: 1.5rem;
      `;
    case 'lg':
      return css`
        width: 3rem;
        height: 3rem;
      `;
    case 'md':
    default:
      return css`
        width: 2rem;
        height: 2rem;
      `;
  }
};

const AvatarImage = styled.img<AvatarVariantProps>`
  border-radius: 50%;
  ${({ size }) => size && AvatarSizeStyles({ size })}
`;
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      <AvatarImage src={src || bandmate_60} alt={alt} size={size} />
    </div>
  ),
);
Avatar.displayName = 'Avatar';
