// import * as React from 'react';
import { PortalContext } from '@/components/portal/PortalContext';
import useContext from '@/hooks/useContext';

import HoverCardContext from './HoverCardContext';

const useHoverWaiting = () => {
  const { timer, openDelay, closeDelay } = useContext(HoverCardContext);
  const { showModal, setShowModal } = useContext(PortalContext);

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
  };

  const onClose = () => {
    if (showModal) {
      timer.current = setTimeout(() => {
        setShowModal(false);

        timer.current = null;
      }, closeDelay);
    }
  };

  //   React.useEffect(() => {
  //     return () => {
  //       if (timer !== null) {
  //         clearTimeout(timer);
  //         timer = null;
  //       }
  //     };
  //   }, []);

  return { onOpen, onClose };
};
export default useHoverWaiting;
