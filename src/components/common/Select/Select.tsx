import * as React from 'react';

import useModal from '@/hooks/useModal';

import SelectContext from './SelectContext';
import { SelectAlignType, SelectType } from './type';

interface SelectProps extends React.ComponentPropsWithoutRef<'div'> {
  multi?: boolean;
  align?: SelectAlignType;
}

/**
 * Displays a list of options.
 * @returns
 */
export const Select = ({ children, align = 'center', multi = false, ...props }: SelectProps) => {
  const [showModal, setShowModal] = useModal();
  const [toggleRect, setToggleRect] = React.useState<DOMRect>();
  const [selectedValue, setSelectedValue] = React.useState<SelectType[]>([]);

  return (
    <SelectContext.Provider
      value={{ showModal, setShowModal, toggleRect, setToggleRect, align, multi, selectedValue, setSelectedValue }}
      {...props}
    >
      {children}
    </SelectContext.Provider>
  );
};
