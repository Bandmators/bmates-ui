import React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';

// import { PositionType } from '@/types/position';

export const usePortal = ({ portalRef }: { portalRef: React.RefObject<HTMLDivElement> }) => {
  const {
    showModal,
    setShowModal: setModal,
    toggleElement,
    setToggleElment,
    align,
    space = 0,
    reorgPos,
    setReorgPos,
  } = React.useContext(PortalContext)!;
  // const [reorgPos, setReorgPos] = React.useState<PositionType>({ x: 0, y: 0 });

  const setShowModal = (value: boolean) => {
    setModal(value);
    if (!value) window.setTimeout(() => toggleElement?.focus());
  };

  React.useEffect(() => {
    const adjustmentPos = () => {
      if (portalRef.current && showModal) {
        const rect = portalRef.current;
        const toggleRect = toggleElement
          ? toggleElement.getBoundingClientRect()
          : { x: reorgPos.x, y: reorgPos.y, bottom: reorgPos.y, height: 0, width: 0 };

        const isOverflowing = rect.offsetHeight + toggleRect.bottom + space >= window.innerHeight;

        switch (align) {
          case 'center':
            reorgPos.x = toggleRect.x + toggleRect.width / 2 - rect.clientWidth / 2;
            break;
          case 'start':
            reorgPos.x = toggleRect.x;
            break;
          case 'end':
            reorgPos.x = toggleRect.x + toggleRect.width - rect.clientWidth;
            break;
        }

        if (isOverflowing) {
          reorgPos.y = toggleRect.y - rect.offsetHeight - space;
        } else {
          reorgPos.y = toggleRect.y + toggleRect.height + space;
        }

        if (reorgPos.x <= 0) reorgPos.x = space;
        else if (reorgPos.x + rect.offsetWidth >= window.innerWidth)
          reorgPos.x = window.innerWidth - rect.offsetWidth - space;

        setReorgPos(reorgPos);
      }
    };
    adjustmentPos();

    window.addEventListener('resize', adjustmentPos);
    return () => {
      window.removeEventListener('resize', adjustmentPos);
    };
  }, [align, showModal, toggleElement, portalRef, space, reorgPos]);

  return { showModal, align, toggleElement, setShowModal, setToggleElment, reorgPos };
};
