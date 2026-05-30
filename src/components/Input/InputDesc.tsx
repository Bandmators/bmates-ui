import { cx } from '@/styles/panda';
import * as React from 'react';

import { inputDescRecipe } from './inputDesc.recipe';

export interface InputDescProps extends React.ComponentProps<'p'> {}

const InputDesc = ({ className, ...props }: InputDescProps) => {
  return <p className={cx(inputDescRecipe(), className)} {...props} />;
};
export default InputDesc;
