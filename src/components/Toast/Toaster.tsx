import { cx } from '@/styles/classnames';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './Toast';
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
  const markerRef = React.useRef<HTMLSpanElement>(null);
  const portalDocument = markerRef.current?.ownerDocument ?? (typeof document === 'undefined' ? undefined : document);
  const portalTarget = portalDocument?.getElementById('toaster') || portalDocument?.body;

  return (
    <>
      <span ref={markerRef} hidden />
      {toasts.length > 0 &&
        portalTarget &&
        createPortal(
          <ol tabIndex={-1} className={cx(toastListRecipe({ position }))}>
            {toasts.map(t => (
              <Toast key={t.toastId} toast={t} position={position} />
            ))}
          </ol>,
          portalTarget,
        )}
    </>
  );
};
// styles moved to recipes
