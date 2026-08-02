import React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import { canUseDOM, useIsomorphicLayoutEffect } from '@/libs/dom';

// import { PositionType } from '@/types/position';

export const usePortal = ({ portalRef }: { portalRef: React.RefObject<HTMLDivElement> }) => {
  const {
    showModal,
    setShowModal: setModal,
    toggleElement,
    setToggleElment,
    portalDocument,
    align,
    space = 0,
    reorgPos,
    setReorgPos,
    focusItems,
  } = React.useContext(PortalContext)!;
  // const [reorgPos, setReorgPos] = React.useState<PositionType>({ x: 0, y: 0 });

  const setShowModal = (value: boolean) => {
    setModal(value);
    if (!value) setTimeout(() => toggleElement?.focus());
  };

  useIsomorphicLayoutEffect(() => {
    if (!canUseDOM) return;

    const adjustmentPos = () => {
      if (portalRef.current && showModal) {
        const rect = portalRef.current;
        const portalWindow = portalDocument?.defaultView ?? window;
        const toggleRect = toggleElement
          ? toggleElement.getBoundingClientRect()
          : { x: reorgPos.x, y: reorgPos.y, bottom: reorgPos.y, height: 0, width: 0 };

        const isOverflowing = rect.offsetHeight + toggleRect.bottom + space >= portalWindow.innerHeight;

        const newPos = { x: reorgPos.x, y: reorgPos.y };

        switch (align) {
          case 'center':
            newPos.x = toggleRect.x + toggleRect.width / 2 - rect.clientWidth / 2;
            break;
          case 'start':
            newPos.x = toggleRect.x;
            break;
          case 'end':
            newPos.x = toggleRect.x + toggleRect.width - rect.clientWidth;
            break;
        }

        if (isOverflowing) {
          newPos.y = toggleRect.y - rect.offsetHeight - space;
        } else {
          newPos.y = toggleRect.y + toggleRect.height + space;
        }

        if (newPos.x <= 0) newPos.x = space;
        else if (newPos.x + rect.offsetWidth >= portalWindow.innerWidth)
          newPos.x = portalWindow.innerWidth - rect.offsetWidth - space;

        // only update when the position actually changes — prevents an
        // infinite layout-effect loop (each call creates a new object)
        if (newPos.x !== reorgPos.x || newPos.y !== reorgPos.y) setReorgPos(newPos);
      }
    };
    // measure & position before paint to avoid a flash at (0, 0)
    adjustmentPos();

    const portalWindow = portalDocument?.defaultView ?? window;
    portalWindow.addEventListener('resize', adjustmentPos);
    return () => {
      portalWindow.removeEventListener('resize', adjustmentPos);
    };
  }, [align, portalDocument, showModal, toggleElement, portalRef, space, reorgPos, setReorgPos]);

  return { showModal, align, toggleElement, setShowModal, setToggleElment, reorgPos, focusItems };
};
