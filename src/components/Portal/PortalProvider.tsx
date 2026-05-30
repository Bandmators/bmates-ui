import React from 'react';

import useModal from '@/hooks/useModal';
import { PositionType } from '@/types/position';

import { PortalContext, PortalFocusItem } from './PortalContext';
import { PortalType } from './type';

export interface PortalProviderProps extends React.PropsWithChildren, PortalType {
  enableScroll?: boolean;
}

export const PortalProvider = ({ align, space, enableScroll, children }: PortalProviderProps) => {
  const [showModal, _setShowModal] = useModal(enableScroll);
  const [toggleElement, setToggleElment] = React.useState<HTMLElement>();
  const [reorgPos, setReorgPos] = React.useState<PositionType>({ x: 0, y: 0 });
  const [focusItems, setFocusItems] = React.useState<PortalFocusItem[]>([]);

  const setShowModal = (value: boolean) => {
    _setShowModal(value);
    if (!value) setTimeout(() => toggleElement?.focus());
  };

  const registerFocusItem = React.useCallback((item: PortalFocusItem) => {
    setFocusItems(prevItems => {
      const nextItems = prevItems.filter(existingItem => existingItem.id !== item.id);
      return [...nextItems, item];
    });
  }, []);

  const unregisterFocusItem = React.useCallback((id: string) => {
    setFocusItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  return (
    <PortalContext.Provider
      value={{
        showModal,
        setShowModal,
        toggleElement,
        setToggleElment,
        align,
        space,
        reorgPos,
        setReorgPos,
        focusItems,
        registerFocusItem,
        unregisterFocusItem,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};
