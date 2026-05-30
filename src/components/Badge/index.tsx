import { cx } from '@/styles/panda';
import * as React from 'react';

import { SizeType } from '@/types/size';

import { badgeRecipe } from './badge.recipe';

type BadgeVariantType = 'primary' | 'secondary' | 'warning' | 'danger' | 'outline' | 'ghost';

export interface BadgeVariantProps {
  variant?: BadgeVariantType;
  size?: SizeType;
}

export interface BadgeProps extends React.ComponentProps<'div'>, BadgeVariantProps {}

export const Badge = ({ className, variant = 'primary', size = 'md', ...props }: BadgeProps) => {
  return <div className={cx(badgeRecipe({ variant, size }), className)} {...props} />;
};
