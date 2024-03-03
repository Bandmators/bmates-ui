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
  toggleElement: HTMLElement | undefined;
  setToggleElment: (value: HTMLElement) => void;

  /*
   * Align
   */
  align: AlignType;
}
export const PortalContext = React.createContext<PortalContextType | null>(null);
