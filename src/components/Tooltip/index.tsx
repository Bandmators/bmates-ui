import { cx } from '@/styles/panda';
import React from 'react';

import { tooltipTriggerRecipe, tooltipWrapperRecipe } from './tooltip.recipe';

interface TooltipProps extends React.ComponentProps<'div'> {
  /*
    Tooltip message
  */
  message: string;
  /*
    Where to display Tooltip 
  */
  direction?: Direction;
}

type Direction = 'top' | 'bottom' | 'left' | 'right';

export const Tooltip = ({ children, message, direction = 'top', ...props }: TooltipProps) => {
  return (
    <div className={cx(tooltipWrapperRecipe())} {...props}>
      {children}
      <div className={cx(tooltipTriggerRecipe({ direction }), 'tooltip')}>{message}</div>
    </div>
  );
};
