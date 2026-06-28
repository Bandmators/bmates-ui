import { cx } from '@/styles/panda';
import * as React from 'react';

import { SizeType } from '@/types/size';
import { SpecialVariantType } from '@/types/variant';

import { badgeRecipe } from './badge.recipe';

export interface BadgeVariantProps {
  variant?: SpecialVariantType;
  size?: SizeType;
}

export interface BadgeProps extends React.ComponentProps<'div'>, BadgeVariantProps {}

export const Badge = ({ className, variant = 'primary', size = 'md', ...props }: BadgeProps) => {
  return <div className={cx(badgeRecipe({ variant, size }), className)} {...props} />;
};
