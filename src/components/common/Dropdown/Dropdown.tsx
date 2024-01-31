import * as React from 'react';

import useModal from '@/hooks/useModal';

import DropdownContext, { DropdownAlignType } from './DropdownContext';

interface DropdownProps extends React.ComponentPropsWithoutRef<'div'> {
  align?: DropdownAlignType;
}

/**
 * Dropdown Context Provider
 * @returns
 */
export const Dropdown = ({ children, align = 'center', ...props }: DropdownProps) => {
  const [showModal, setShowModal] = useModal();
  const [toggleRect, setToggleRect] = React.useState<DOMRect>();

  return (
    <DropdownContext.Provider value={{ showModal, setShowModal, toggleRect, setToggleRect, align }} {...props}>
      {children}
    </DropdownContext.Provider>
  );
};
