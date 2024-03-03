import React from 'react';

import { AlignType } from '@/types/align';

interface PortalContextType {
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
  align: AlignType;
}
export const PortalContext = React.createContext<PortalContextType | null>(null);
