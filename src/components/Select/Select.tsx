import * as React from 'react';

import { PortalProvider } from '@/components/Portal/PortalProvider';
import { AlignType } from '@/types/align';

import SelectContext from './SelectContext';
import { SelectType } from './type';

export interface SelectProps extends React.PropsWithChildren {
  multi?: boolean;
  align?: AlignType;
  space?: number;
  hoverOpen?: boolean;
  value?: SelectType[];
  defaultValue?: SelectType[];
  onValueChange?: (value: SelectType[]) => void;
}

/**
 * Displays a list of options.
 * @returns
 */
export const Select = ({
  align = 'center',
  space = 0,
  multi = false,
  hoverOpen = false,
  value,
  defaultValue = [],
  onValueChange,
  children,
}: SelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<SelectType[]>(defaultValue);
  const selectedValue = value ?? uncontrolledValue;

  const setSelectedValue = React.useCallback(
    (nextValue: SelectType[]) => {
      if (value === undefined) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    },
    [onValueChange, value],
  );

  return (
    <PortalProvider align={align} space={space} hoverOpen={hoverOpen}>
      <SelectContext.Provider value={{ multi, selectedValue, setSelectedValue }}>{children}</SelectContext.Provider>
    </PortalProvider>
  );
};
