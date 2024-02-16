import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { createPortal } from 'react-dom';

import useContext from '@/hooks/useContext';
import { composeRefs } from '@/libs/ref';

import DropdownContext from './DropdownContext';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

type PositionType = {
  x: number;
  y: number;
};

/**
 * DropdownContent
 * @returns
 */
export const DropdownContent = React.forwardRef<HTMLDivElement, ModalProps>(({ width, ...props }, ref) => {
  const { showModal, setShowModal, toggleRect, align } = useContext(DropdownContext);
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const [reorgPos, setReorgPos] = React.useState<PositionType>({ x: 0, y: 0 });

  const close = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    if (modalRef.current && toggleRect) {
      const rect = modalRef.current.getBoundingClientRect();

      const isOverflowing = rect.bottom > window.innerHeight;
      const reorgPos = { x: 0, y: 0 };

      switch (align) {
        case 'center':
          reorgPos.x = toggleRect.x + toggleRect.width / 2 - rect.width / 2;
          break;
        case 'start':
          reorgPos.x = toggleRect.x;
          break;
        case 'end':
          reorgPos.x = toggleRect.x + toggleRect.width - rect.width;
          break;
      }

      if (isOverflowing) {
        reorgPos.y = toggleRect.y - rect.height;
      } else {
        reorgPos.y = toggleRect.y + toggleRect.height;
      }

      setReorgPos(reorgPos);
    }
  }, [align, showModal, toggleRect]);

  return (
    <>
      {showModal &&
        createPortal(
          <>
            <ModalBG onClick={close} className="bmates-modal-bg" />
            <Modal ref={composeRefs(modalRef, ref)} width={width} position={reorgPos} {...props}>
              {props.children}
            </Modal>
          </>,
          document.body,
        )}
    </>
  );
});
DropdownContent.displayName = 'DropdownContent';

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
  border-radius: 0.5rem;
  position: fixed;
  top: 0px;
  left: 0px;
  transform: ${({ position }) => `translate(${position.x}px, ${position.y}px)`};
  background-color: white;
  pointer-events: auto;
  z-index: 50;
  animation-name: ${enter};
  animation-duration: 0.15s;
  border: 1px solid ${({ theme }) => theme.colors.gray['300']};
  box-shadow: 0px 2px 2px 0px ${({ theme }) => theme.colors.gray['300']};
`;