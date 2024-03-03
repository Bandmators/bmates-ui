import * as React from 'react';

import { PortalContent } from '@/components/portal/PortalContent';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * DropdownContent
 * @returns
 */
export const DropdownContent = React.forwardRef<HTMLDivElement, ModalProps>(({ width, children, ...props }, ref) => {
  return (
    <PortalContent width={width} ref={ref} {...props}>
      {children}
    </PortalContent>
  );
});
DropdownContent.displayName = 'DropdownContent';
