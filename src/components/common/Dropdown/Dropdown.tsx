import * as React from 'react';

import { PortalProvider } from '@/components/portal/PortalProvider';
import { AlignType } from '@/types/align';

interface DropdownProps extends React.ComponentPropsWithoutRef<'div'> {
  align?: AlignType;
}

/**
 * Displays a list of menus.
 * @returns
 */
export const Dropdown = ({ children, align = 'center', ...props }: DropdownProps) => {
  return (
    <PortalProvider align={align} {...props}>
      {children}
    </PortalProvider>
  );
};
