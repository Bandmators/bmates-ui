import styled from '@emotion/styled';
import * as React from 'react';

import { PortalContent } from '@/components/portal/PortalContent';

interface ModalProps extends React.ComponentPropsWithoutRef<'ul'> {
  width?: React.CSSProperties['width'];
}

/**
 * SelectContent
 * @returns
 */
export const SelectContent = React.forwardRef<HTMLDivElement, ModalProps>(({ width, children, ...props }, ref) => {
  return (
    <PortalContent width={width} ref={ref} {...props}>
      <SelectListBox role="listbox">{children}</SelectListBox>
    </PortalContent>
  );
});
SelectContent.displayName = 'SelectContent';

const SelectListBox = styled.ul`
  margin: 0px;
  padding: 0px;
`;
