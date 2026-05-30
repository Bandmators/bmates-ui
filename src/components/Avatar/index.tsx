import { cx } from '@/styles/panda';
import React, { ComponentPropsWithoutRef } from 'react';

import { SizeType } from '@/types/size';

import { avatarRecipe } from './avatar.recipe';

export interface AvatarVariantProps {
  size?: SizeType;
}
export interface AvatarProps extends ComponentPropsWithoutRef<'img'>, AvatarVariantProps {
  src: string;
  alt: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, size = 'md', ...props }, ref) => (
    <img src={src} alt={alt} ref={ref} className={cx(avatarRecipe({ size }), className)} {...props} />
  ),
);
Avatar.displayName = 'Avatar';
