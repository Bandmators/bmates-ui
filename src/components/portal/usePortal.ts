import React from 'react';

import { PortalContext } from '@/components/portal/PortalContext';
import { PositionType } from '@/types/position';

export const usePortal = ({ modalRef }: { modalRef: React.RefObject<HTMLDivElement> }) => {
  const { showModal, align, toggleElement, setShowModal, setToggleElment } = React.useContext(PortalContext)!;
  const [reorgPos, setReorgPos] = React.useState<PositionType>({ x: 0, y: 0 });

  React.useEffect(() => {
    const adjustmentPos = () => {
      if (modalRef.current && toggleElement && showModal) {
        const rect = modalRef.current;
        const toggleRect = toggleElement.getBoundingClientRect();

        const isOverflowing = rect.offsetHeight + toggleRect.bottom >= window.innerHeight;
        const reorgPos = { x: 0, y: 0 };

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
          reorgPos.y = toggleRect.y - rect.offsetHeight;
        } else {
          reorgPos.y = toggleRect.y + toggleRect.height;
        }

        setReorgPos(reorgPos);
      }
    };
    adjustmentPos();

    window.addEventListener('resize', adjustmentPos);
    return () => {
      window.removeEventListener('resize', adjustmentPos);
    };
  }, [align, showModal, toggleElement, modalRef]);

  return { showModal, align, toggleElement, setShowModal, setToggleElment, reorgPos };
};
