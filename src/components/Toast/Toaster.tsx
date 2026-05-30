import { cx } from '@/styles/panda';
import { createPortal } from 'react-dom';

import { Toast } from './Toast';
import { ToasterProvider } from './ToastContext';
import { toastListRecipe } from './toastList.recipe';
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
          <ol tabIndex={-1} className={cx(toastListRecipe({ position }))}>
            {toasts.map(t => (
              <Toast key={t.toastId} toast={t} position={position} />
            ))}
          </ol>,
          document.getElementById('toaster') || document.body,
        )}
    </ToasterProvider>
  );
};
// styles moved to recipes
