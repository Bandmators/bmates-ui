import * as React from 'react';

import { SelectAlignType, SelectType } from './type';

interface SelectContextType {
  /*
   * Modal
   */
  showModal: boolean;
  setShowModal: (value: boolean) => void;

  /*
   * Toggle Rect
   * - to calcurate element size
   */
  toggleRect: DOMRect | undefined;
  setToggleRect: (value: DOMRect) => void;

  /*
   * Align
   */
  align: SelectAlignType;

  /*
   * Multi select
   */
  multi: boolean;

  /*
   * Selected Value
   */
  selectedValue: SelectType[];
  setSelectedValue: (value: SelectType[]) => void;
}
const SelectContext = React.createContext<SelectContextType | null>(null);
export default SelectContext;
