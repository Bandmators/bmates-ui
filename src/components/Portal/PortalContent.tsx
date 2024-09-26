import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

import useContext from '@/hooks/useContext';

import Portal, { PortalProps } from './Portal';
import { PortalContext } from './PortalContext';

export const PortalContent = ({
  children,
  ref,
  width,
  disabledBG = false,
  disabledAutoFocus = false,
  onKeyDown,
  ...props
}: PortalProps) => {
  const { showModal, setShowModal } = useContext(PortalContext)!;

  const close = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal &&
        createPortal(
          <>
            {!disabledBG && (
              <PortalBG
                id="bmates-portal-bg"
                className="bmates-portal-bg"
                onClick={close}
                onContextMenu={evt => {
                  evt.preventDefault();
                  close();
                }}
              />
            )}
            <Portal
              id="bmates-portal"
              ref={ref}
              width={width}
              onKeyDown={onKeyDown}
              disabledAutoFocus={disabledAutoFocus}
              {...props}
            >
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
