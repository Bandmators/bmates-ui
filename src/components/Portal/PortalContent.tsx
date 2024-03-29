import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';

import useContext from '@/hooks/useContext';

import Portal from './Portal';
import { PortalContext } from './PortalContext';

interface ModalContentProps extends React.ComponentProps<'div'> {
  ref: React.ForwardedRef<HTMLDivElement>;
  width?: React.CSSProperties['width'];
  disabledBG?: boolean;
}

export const PortalContent = ({ children, ref, width, disabledBG = false, onKeyDown, ...props }: ModalContentProps) => {
  const { showModal, setShowModal } = useContext(PortalContext)!;

  const close = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal &&
        createPortal(
          <>
            {!disabledBG && <PortalBG id="bmates-portal-bg" className="bmates-portal-bg" onClick={close} />}
            <Portal ref={ref} width={width} onKeyDown={onKeyDown} {...props}>
              {children}
            </Portal>
          </>,
          document.body,
        )}
    </>
  );
};

const PortalBG = styled.div`
  position: fixed;
  background-color: transparent;
  pointer-events: auto;
  z-index: 50;
  inset: 0;
`;
