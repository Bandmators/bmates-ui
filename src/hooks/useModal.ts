import * as React from 'react';

import { canUseDOM, useIsomorphicLayoutEffect } from '@/libs/dom';

const useModal = (
  enableScroll: boolean = true,
  targetDocument?: Document,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const bodyStyleRef = React.useRef<{ overflow: string; marginRight: string } | null>(null);
  const supportsScrollbarGutter =
    canUseDOM &&
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('scrollbar-gutter: stable');

  useIsomorphicLayoutEffect(() => {
    if (!canUseDOM) return;

    if (!enableScroll) return;
    const modalDocument = targetDocument ?? document;
    const modalWindow = modalDocument.defaultView ?? window;

    if (showModal) {
      const scrollbarWidth = Math.max(
        0,
        Math.round(modalWindow.innerWidth - modalDocument.documentElement.getBoundingClientRect().width),
      );

      if (!bodyStyleRef.current) {
        bodyStyleRef.current = {
          overflow: modalDocument.body.style.overflow,
          marginRight: modalDocument.body.style.marginRight,
        };
      }

      modalDocument.body.style.setProperty('overflow', 'hidden', 'important');
      modalDocument.body.style.marginRight = supportsScrollbarGutter && scrollbarWidth ? '' : `${scrollbarWidth}px`;
    } else {
      const previous = bodyStyleRef.current;
      if (previous) {
        modalDocument.body.style.overflow = previous.overflow;
        modalDocument.body.style.marginRight = previous.marginRight;
        bodyStyleRef.current = null;
      } else {
        modalDocument.body.style.overflow = '';
        modalDocument.body.style.marginRight = '';
      }
    }

    return () => {
      if (!bodyStyleRef.current) return;
      modalDocument.body.style.overflow = bodyStyleRef.current.overflow;
      modalDocument.body.style.marginRight = bodyStyleRef.current.marginRight;
    };
  }, [enableScroll, showModal, supportsScrollbarGutter, targetDocument]);

  return [showModal, setShowModal];
};

export default useModal;
