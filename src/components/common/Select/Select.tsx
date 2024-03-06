import * as React from 'react';

import { PortalProvider } from '@/components/portal/PortalProvider';
import { AlignType } from '@/types/align';

import SelectContext from './SelectContext';
import { SelectType } from './type';

interface SelectProps extends React.PropsWithChildren {
  multi?: boolean;
  align?: AlignType;
  space?: number;
}

/**
 * Displays a list of options.
 * @returns
 */
export const Select = ({ align = 'center', space = 0, multi = false, children }: SelectProps) => {
  const [selectedValue, setSelectedValue] = React.useState<SelectType[]>([]);

  return (
    <PortalProvider align={align} space={space}>
      <SelectContext.Provider value={{ multi, selectedValue, setSelectedValue }}>{children}</SelectContext.Provider>
    </PortalProvider>
  );
};
