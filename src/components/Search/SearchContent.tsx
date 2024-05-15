import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * SearchContent
 * @returns
 */
export const SearchContent = React.forwardRef<HTMLDivElement, ModalProps>(({ width, children, ...props }, ref) => {
  return (
    <PortalContent width={width} ref={ref} role="group" disabledAutoFocus {...props}>
      {children}
    </PortalContent>
  );
});
SearchContent.displayName = 'SearchContent';
