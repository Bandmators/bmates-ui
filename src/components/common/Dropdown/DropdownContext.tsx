import * as React from 'react';

export type DropdownAlignType = 'start' | 'center' | 'end';

interface DropdownContextType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  toggleRect: DOMRect | undefined;
  setToggleRect: (value: DOMRect) => void;
  align: DropdownAlignType;
}
const DropdownContext = React.createContext<DropdownContextType | null>(null);
export default DropdownContext;
