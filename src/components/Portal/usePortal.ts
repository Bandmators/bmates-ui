import React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import { canUseDOM, useIsomorphicLayoutEffect } from '@/libs/dom';

// import { PositionType } from '@/types/position';

/** Max height the popup may take on the side it opens to (consumed by `.bm-portal` in portal.css). */
const MAX_HEIGHT_VAR = '--bm-portal-max-height';
/** Present while the popup is shorter than its content and therefore scrolls. */
const CAPPED_ATTR = 'data-bm-capped';
/** Gap kept between a capped popup and the viewport edge, in px. */
const VIEWPORT_MARGIN = 8;

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

        // Measure the popup without any cap from a previous pass.
        rect.style.removeProperty(MAX_HEIGHT_VAR);
        rect.removeAttribute(CAPPED_ATTR);
        const naturalHeight = rect.offsetHeight;

        const spaceBelow = portalWindow.innerHeight - toggleRect.bottom - space;
        const spaceAbove = toggleRect.y - space;
        // Open above only if it doesn't fit below AND there is more room above.
        const openAbove = naturalHeight > spaceBelow && spaceAbove > spaceBelow;

        // Still too tall for the side we picked: cap it to the available space
        // (minus a small gap to the viewport edge) so it scrolls instead of
        // being clipped by the viewport.
        const room = openAbove ? spaceAbove : spaceBelow;
        if (naturalHeight > room) {
          rect.style.setProperty(MAX_HEIGHT_VAR, `${Math.max(0, room - VIEWPORT_MARGIN)}px`);
          rect.setAttribute(CAPPED_ATTR, '');
        }
        // Real height once the cap (if any) has been applied.
        const height = rect.offsetHeight;

        const newPos = { x: reorgPos.x, y: reorgPos.y };

        // offsetWidth (not clientWidth) so a vertical scrollbar is counted in the width.
        switch (align) {
          case 'center':
            newPos.x = toggleRect.x + toggleRect.width / 2 - rect.offsetWidth / 2;
            break;
          case 'start':
            newPos.x = toggleRect.x;
            break;
          case 'end':
            newPos.x = toggleRect.x + toggleRect.width - rect.offsetWidth;
            break;
        }

        newPos.y = openAbove ? toggleRect.y - height - space : toggleRect.y + toggleRect.height + space;

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
