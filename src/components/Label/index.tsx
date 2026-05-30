import { cx } from '@/styles/panda';
import * as React from 'react';

import { labelRecipe } from './label.recipe';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label ref={ref} className={cx(labelRecipe(), className)} {...props} />
));
Label.displayName = 'Label';
