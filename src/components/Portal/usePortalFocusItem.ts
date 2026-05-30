import * as React from 'react';

import useContext from '@/hooks/useContext';
import { useIsomorphicLayoutEffect } from '@/libs/dom';

import { PortalContext } from './PortalContext';

export const usePortalFocusItem = (ref: React.RefObject<HTMLElement>, disabled: boolean) => {
  const { registerFocusItem, unregisterFocusItem } = useContext(PortalContext);
  const id = React.useId();

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    registerFocusItem({
      id,
      element,
      disabled,
      focus: () => element.focus(),
    });

    return () => {
      unregisterFocusItem(id);
    };
  }, [disabled, id, ref, registerFocusItem, unregisterFocusItem]);
};
