import styled from '@emotion/styled';
import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';

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
      <ContextMenuListBox>{children}</ContextMenuListBox>
    </PortalContent>
  );
});
ContextMenu.displayName = 'ContextMenu';

const ContextMenuListBox = styled.ul`
  margin: 0px;
  padding: 0px;
`;
