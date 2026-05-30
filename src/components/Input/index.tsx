import { cx } from '@/styles/panda';
import * as React from 'react';

import { inputRecipe } from './input.recipe';

export { default as InputGroup } from './InputGroup';
export { default as InputDesc } from './InputDesc';
export { default as InputFile } from './InputFile';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cx(inputRecipe({ disabled }), className)}
        disabled={disabled}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
