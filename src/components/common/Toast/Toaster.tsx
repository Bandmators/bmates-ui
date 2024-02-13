import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

import { Toast } from './Toast';
import { ToasterProvider } from './ToastContext';
import { useToast } from './useToast';

/**
 * Toast Context Provider
 * @returns
 */
export const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToasterProvider>
      {toasts.length > 0 &&
        createPortal(
          <ToastList tabIndex={-1}>
            {toasts.map(t => (
              <Toast key={t.toastId} toast={t} />
            ))}
          </ToastList>,
          document.getElementById('toaster') || document.body,
        )}
    </ToasterProvider>
  );
};
const ToastList = styled.ol`
  list-style: none;
  position: fixed;
  display: flex;
  margin: 0;
  z-index: 100;
  max-height: 100vh;
  width: 100%;
  padding: 1rem;
  top: auto;
  right: 0px;
  bottom: 0px;
  flex-direction: column;
  max-width: 25rem;
  gap: 1rem;
`;
