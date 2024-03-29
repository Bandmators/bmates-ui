import styled from '@emotion/styled';
import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';

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
      <DropdownListBox>{children}</DropdownListBox>
    </PortalContent>
  );
});
DropdownContent.displayName = 'DropdownContent';

const DropdownListBox = styled.ul`
  margin: 0px;
  padding: 0px;
`;
