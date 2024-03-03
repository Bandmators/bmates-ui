import * as React from 'react';

import { PortalProvider } from '@/components/portal/PortalProvider';
import { AlignType } from '@/types/align';

import SelectContext from './SelectContext';
import { SelectType } from './type';

interface SelectProps extends React.PropsWithChildren {
  multi?: boolean;
  align?: AlignType;
}

/**
 * Displays a list of options.
 * @returns
 */
export const Select = ({ children, align = 'center', multi = false, ...props }: SelectProps) => {
  const [selectedValue, setSelectedValue] = React.useState<SelectType[]>([]);

  return (
    <PortalProvider align={align}>
      <SelectContext.Provider value={{ multi, selectedValue, setSelectedValue }} {...props}>
        {children}
      </SelectContext.Provider>
    </PortalProvider>
  );
};
