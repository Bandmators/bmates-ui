import * as React from 'react';

import { SelectType } from './type';

interface SelectContextType {
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
