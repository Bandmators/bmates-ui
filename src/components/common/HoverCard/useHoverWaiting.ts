import React from 'react';

import { PortalContext } from '@/components/portal/PortalContext';
import useContext from '@/hooks/useContext';

import HoverCardContext from './HoverCardContext';

const useHoverWaiting = () => {
  const { timer, openDelay, closeDelay } = useContext(HoverCardContext);
  const { showModal, setShowModal } = useContext(PortalContext);
  const [isIn, setIsIn] = React.useState<boolean>(false);

  const onOpen = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (!showModal) {
      timer.current = setTimeout(() => {
        setShowModal(true);

        timer.current = null;
      }, openDelay);
    }

    setIsIn(true);
  };

  const onClose = () => {
    if (showModal) {
      timer.current = setTimeout(() => {
        setShowModal(false);

        timer.current = null;
      }, closeDelay);
    } else if (isIn && timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setIsIn(false);
  };

  return { onOpen, onClose };
};
export default useHoverWaiting;
