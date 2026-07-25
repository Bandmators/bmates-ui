import { cx } from '@/styles/classnames';
import * as React from 'react';

import { inputGroupRecipe } from './inputGroup.recipe';

export interface InputGroupProps extends React.ComponentProps<'div'> {}

const InputGroup = ({ className, ...props }: InputGroupProps) => {
  return <div className={cx(inputGroupRecipe(), className)} {...props} />;
};
export default InputGroup;
