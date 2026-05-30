import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';

import { contextMenuListRecipe } from './contextMenu.recipe';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * ContextMenu
 * @returns
 */
export const ContextMenu = React.forwardRef<HTMLDivElement, ModalProps>(({ width, children, ...props }, ref) => {
  return (
    <PortalContent width={width} ref={ref} role="group" {...props}>
      <ul className={cx(contextMenuListRecipe())}>{children}</ul>
    </PortalContent>
  );
});
ContextMenu.displayName = 'ContextMenu';
