import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '@/components/Portal/usePortal';
import useContext from '@/hooks/useContext';
import { composeRefs } from '@/libs/ref';
import { PositionType } from '@/types/position';

import { PortalContext } from './PortalContext';

interface ModalContentProps extends React.ComponentProps<'div'> {
  ref: React.ForwardedRef<HTMLDivElement>;
  width?: React.CSSProperties['width'];
  disabledBG?: boolean;
}

export const PortalContent = ({ children, ref, width, disabledBG = false, ...props }: ModalContentProps) => {
  const { showModal, setShowModal, toggleElement } = useContext(PortalContext)!;
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { reorgPos } = usePortal({ modalRef });

  const close = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal &&
        createPortal(
          <>
            {!disabledBG && <ModalBG onClick={close} id="bmates-portal-bg" className="bmates-portal-bg" />}
            <Modal
              ref={composeRefs(modalRef, ref)}
              width={width || toggleElement?.getBoundingClientRect().width}
              position={reorgPos}
              {...props}
            >
              {children}
            </Modal>
          </>,
          document.body,
        )}
    </>
  );
};

const enter = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; } 
  `;

const ModalBG = styled.div`
  position: fixed;
  background-color: transparent;
  pointer-events: auto;
  z-index: 50;
  inset: 0;
`;

const Modal = styled.div<{ width?: React.CSSProperties['width']; position: PositionType }>`
  display: grid;
  min-width: max-content;
  ${({ width }) => width && `width: ${typeof width === 'string' ? width : `${width}px`};`}
  padding: 0.25rem;
  border-radius: 0.25rem;
  position: fixed;
  top: 0px;
  left: 0px;
  transform: ${({ position }) => `translate(${position.x}px, ${position.y}px)`};
  background-color: white;
  pointer-events: auto;
  z-index: 50;
  animation-name: ${enter};
  animation-duration: 0.15s;
  border: 1px solid var(--gray-300);
  box-shadow: 0px 2px 2px 0px var(--gray-300);
`;
