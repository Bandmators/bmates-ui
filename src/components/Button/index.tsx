import { cx } from '@/styles/panda';
import React, { ComponentPropsWithoutRef } from 'react';

import { SizeType } from '@/types/size';
import { SpecialVariantType } from '@/types/variant';

import { buttonRecipe } from './button.recipe';

type ButtonVariantType = SpecialVariantType | 'default';

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
  ({ className, variant = 'default', size = 'md', children, full = false, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(buttonRecipe({ variant, full, size, disabled: disabled }), className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
