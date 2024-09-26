import React from 'react';

import { AlignType } from '@/types/align';
import { PositionType } from '@/types/position';

export interface PortalContextType {
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

  /*
   * Space Size
   */
  space?: number;

  reorgPos: PositionType;
  setReorgPos: (value: PositionType) => void;
}
export const PortalContext = React.createContext<PortalContextType | null>(null);
