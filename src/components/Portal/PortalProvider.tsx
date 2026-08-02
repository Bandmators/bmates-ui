import React from 'react';

import useModal from '@/hooks/useModal';
import { PositionType } from '@/types/position';

import { PortalContext, PortalFocusItem } from './PortalContext';
import { PortalType } from './type';

export interface PortalProviderProps extends React.PropsWithChildren, PortalType {
  enableScroll?: boolean;
  hoverOpen?: boolean;
}

export const PortalProvider = ({ align, space, enableScroll, hoverOpen = false, children }: PortalProviderProps) => {
  const [toggleElement, setToggleElment] = React.useState<HTMLElement>();
  const [portalDocument, setPortalDocument] = React.useState<Document | undefined>(() =>
    typeof document === 'undefined' ? undefined : document,
  );
  const [showModal, _setShowModal] = useModal(enableScroll, portalDocument);
  const [reorgPos, setReorgPos] = React.useState<PositionType>({ x: 0, y: 0 });
  const [focusItems, setFocusItems] = React.useState<PortalFocusItem[]>([]);
  const closeTimer = React.useRef<number | ReturnType<typeof setTimeout> | null>(null);
  const hoverModeRef = React.useRef(false);

  const clearHoverCloseTimer = React.useCallback(() => {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const setShowModal = (value: boolean) => {
    clearHoverCloseTimer();
    if (!value) hoverModeRef.current = false;
    _setShowModal(value);
    if (!value) setTimeout(() => toggleElement?.focus());
  };

  const setPortalToggleElement = React.useCallback((value: HTMLElement) => {
    setPortalDocument(value.ownerDocument);
    setToggleElment(value);
  }, []);

  const openHover = React.useCallback(() => {
    if (!hoverOpen) return;
    hoverModeRef.current = true;
    clearHoverCloseTimer();
    if (showModal) return;
    _setShowModal(true);
  }, [clearHoverCloseTimer, hoverOpen, showModal, _setShowModal]);

  const closeHover = React.useCallback(() => {
    if (!hoverOpen) return;
    if (!showModal) return;
  }, [hoverOpen, showModal]);

  React.useEffect(() => {
    if (!hoverOpen || !showModal || !hoverModeRef.current || !toggleElement) return;

    const handlePointerMove = (event: PointerEvent) => {
      const targetDocument = portalDocument ?? toggleElement.ownerDocument;
      const portalElement = targetDocument.getElementById('bmates-portal');
      const element = targetDocument.elementFromPoint(event.clientX, event.clientY);

      if (!element) return;
      if (portalElement?.contains(element) || toggleElement.contains(element)) return;

      hoverModeRef.current = false;
      _setShowModal(false);
    };

    const targetDocument = portalDocument ?? toggleElement.ownerDocument;
    targetDocument.addEventListener('pointermove', handlePointerMove, true);

    return () => {
      targetDocument.removeEventListener('pointermove', handlePointerMove, true);
    };
  }, [hoverOpen, portalDocument, showModal, toggleElement, _setShowModal]);

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
        hoverOpen,
        toggleElement,
        setToggleElment: setPortalToggleElement,
        portalDocument,
        setPortalDocument,
        openHover,
        closeHover,
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
