import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';

import { selectListBoxRecipe } from './select.recipe';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * SelectContent
 * @returns
 */
export const SelectContent = React.forwardRef<HTMLDivElement, ModalProps>(({ width, children, ...props }, ref) => {
  return (
    <PortalContent width={width} ref={ref} {...props}>
      <ul role="listbox" className={cx(selectListBoxRecipe())}>
        {children}
      </ul>
    </PortalContent>
  );
});
SelectContent.displayName = 'SelectContent';
