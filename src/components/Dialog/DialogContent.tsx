import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { createPortal } from 'react-dom';

import useContext from '@/hooks/useContext';

import DialogContext from './DialogContext';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  /*
    Modal Background Event : close modal when click event
  */
  outEvent?: boolean;
  /*
    Hide Close Button
  */
  hideClose?: boolean;
  /*
    Modal max width
  */
  maxWidth?: number | string;
}
/**
 * DialogContent
 * @returns
 */
export const DialogContent = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ outEvent = false, hideClose = false, maxWidth = '450px', ...props }, ref) => {
    const { showModal, setShowModal } = useContext(DialogContext);

    const close = () => {
      if (outEvent) setShowModal(false);
    };
    const closeBtnHandler = () => {
      setShowModal(false);
    };

    return (
      <>
        {showModal &&
          createPortal(
            <>
              <ModalBG onClick={close} className="bmates-modal-bg" />
              <Modal ref={ref} role="dialog" aria-modal="true" maxWidth={maxWidth} {...props}>
                {props.children}
                {!hideClose && (
                  <ExitButton onClick={closeBtnHandler}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </ExitButton>
                )}
              </Modal>
            </>,
            document.body,
          )}
      </>
    );
  },
);

const enter = keyframes`
  0% { opacity: 0;   }
  100% { opacity: 1; }
`;

const ModalBG = styled.div`
  pointer-events: auto;
  animation-name: ${enter};
  animation-duration: 0.15s;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  inset: 0;
  position: fixed;
`;

const Modal = styled.div<{ maxWidth: number | string }>`
  display: grid;
  width: 100%;
  max-width: ${({ maxWidth }) => {
    if (typeof maxWidth === 'string') return maxWidth;
    return `${maxWidth}px`;
  }};
  padding: 1.5rem;
  border-radius: 0.375rem;
  position: fixed;
  top: 50%;
  left: 50%;
  gap: 1rem;
  transform: translate(-50%, -50%);
  background-color: white;
  pointer-events: auto;
  animation-name: ${enter};
  animation-duration: 0.15s;
  z-index: 50;
`;

const ExitButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: transparent;
  border: none;
  padding: 0px;
  opacity: 0.5;
  cursor: pointer;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;
