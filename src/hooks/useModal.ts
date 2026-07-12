import * as React from 'react';

import { canUseDOM, useIsomorphicLayoutEffect } from '@/libs/dom';

const useModal = (enableScroll: boolean = true): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
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

    if (showModal) {
      const scrollbarWidth = Math.max(
        0,
        Math.round(window.innerWidth - document.documentElement.getBoundingClientRect().width),
      );

      if (!bodyStyleRef.current) {
        bodyStyleRef.current = {
          overflow: document.body.style.overflow,
          marginRight: document.body.style.marginRight,
        };
      }

      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.body.style.marginRight = supportsScrollbarGutter && scrollbarWidth ? '' : `${scrollbarWidth}px`;
    } else {
      const previous = bodyStyleRef.current;
      if (previous) {
        document.body.style.overflow = previous.overflow;
        document.body.style.marginRight = previous.marginRight;
        bodyStyleRef.current = null;
      } else {
        document.body.style.overflow = '';
        document.body.style.marginRight = '';
      }
    }

    return () => {
      if (!bodyStyleRef.current) return;
      document.body.style.overflow = bodyStyleRef.current.overflow;
      document.body.style.marginRight = bodyStyleRef.current.marginRight;
    };
  }, [enableScroll, showModal]);

  return [showModal, setShowModal];
};

export default useModal;
