import { cx } from '@/styles/panda';
import * as React from 'react';

import { textareaRecipe } from './textarea.recipe';

export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled, ...props }, ref) => {
    return <textarea className={cx(textareaRecipe({ disabled }), className)} ref={ref} {...props} />;
  },
);
Textarea.displayName = 'Textarea';
