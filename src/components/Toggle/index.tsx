import { cx } from '@/styles/panda';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';
import { SizeType } from '@/types/size';

import { toggleRecipe } from './toggle.recipe';

export interface ToggleProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: SizeType;
  selected?: boolean;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, selected = false, size, disabled = false, ...props }, ref) => {
    const [sel, setSel] = React.useState<boolean>(selected);

    React.useEffect(() => {
      setSel(selected);
    }, [selected]);

    return (
      <button
        type="button"
        className={cx(toggleRecipe({ selected: sel, size: size || 'md', disabled }), className)}
        ref={ref}
        disabled={disabled}
        onClick={composeEventHandlers(props.onClick, () => {
          setSel(prev => !prev);
        })}
        {...props}
      />
    );
  },
);
Toggle.displayName = 'Toggle';
