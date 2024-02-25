import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './Toast';
import { ToasterProvider } from './ToastContext';
import { ToastPosition } from './type';
import { useToast } from './useToast';

interface ToasterProps {
  position?: ToastPosition;
}

/**
 * Toast Context Provider
 * @returns
 */
export const Toaster = ({ position = 'bottom-right' }: ToasterProps) => {
  const { toasts } = useToast();

  return (
    <ToasterProvider>
      {toasts.length > 0 &&
        createPortal(
          <ToastList tabIndex={-1} position={position}>
            {toasts.map(t => (
              <Toast key={t.toastId} toast={t} position={position} />
            ))}
          </ToastList>,
          document.getElementById('toaster') || document.body,
        )}
    </ToasterProvider>
  );
};

const ToastPositionStyles = ({ position }: { position: ToastPosition }) => {
  switch (position) {
    case 'top-left':
      return css`
        top: 0px;
        left: 0px;
        bottom: auto;
      `;
    case 'top-center':
      return css`
        top: 0px;
        left: 50%;
        bottom: auto;
        transform: translate(-50%);
      `;
    case 'top-right':
      return css`
        top: 0px;
        right: 0px;
        bottom: auto;
      `;
    case 'bottom-left':
      return css`
        top: auto;
        left: 0px;
        bottom: 0px;
      `;
    case 'bottom-center':
      return css`
        bottom: 0px;
        left: 50%;
        top: auto;
        transform: translate(-50%);
      `;
    case 'bottom-right':
    default:
      return css`
        top: auto;
        right: 0px;
        bottom: 0px;
      `;
  }
};

const ToastList = styled.ol<{ position?: ToastPosition }>`
  list-style: none;
  position: fixed;
  display: flex;
  margin: 0;
  z-index: 100;
  max-height: 100vh;
  width: 100%;
  padding: 1rem;
  flex-direction: column;
  max-width: 25rem;
  gap: 1rem;

  ${({ position }) => position && ToastPositionStyles({ position })}
`;
