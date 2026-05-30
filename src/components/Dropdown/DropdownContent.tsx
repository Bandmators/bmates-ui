import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';

import { dropdownListBoxRecipe } from './dropdown.recipe';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * DropdownContent
 * @returns
 */
export const DropdownContent = React.forwardRef<HTMLDivElement, ModalProps>(({ width, children, ...props }, ref) => {
  return (
    <PortalContent width={width} ref={ref} role="group" {...props}>
      <ul className={cx(dropdownListBoxRecipe())}>{children}</ul>
    </PortalContent>
  );
});
DropdownContent.displayName = 'DropdownContent';
