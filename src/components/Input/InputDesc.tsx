import { cx } from '@/styles/panda';
import * as React from 'react';

import { inputDescRecipe } from './inputDesc.recipe';

export interface InputGroupProps extends React.ComponentProps<'p'> {}

const InputDesc = ({ className, ...props }: InputGroupProps) => {
  return <p className={cx(inputDescRecipe(), className)} {...props} />;
};
export default InputDesc;
