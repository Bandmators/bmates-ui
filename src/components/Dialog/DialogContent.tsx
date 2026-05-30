import { cx } from '@/styles/panda';
import * as React from 'react';
import { createPortal } from 'react-dom';

import useContext from '@/hooks/useContext';
import { canUseDOM } from '@/libs/dom';

import DialogContext from './DialogContext';
import { exitButtonRecipe, modalBGRecipe, modalRecipe } from './dialog.recipe';

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
  ({ outEvent = false, hideClose = false, maxWidth = '450px', children, ...props }, ref) => {
    const { showModal, setShowModal } = useContext(DialogContext);

    const close = () => {
      if (outEvent) setShowModal(false);
    };
    const closeBtnHandler = () => {
      setShowModal(false);
    };

    if (!canUseDOM) return null;

    return (
      <>
        {showModal &&
          createPortal(
            <>
              <div onClick={close} className={cx(modalBGRecipe(), 'bmates-modal-bg')} />
              <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                className={cx(modalRecipe())}
                style={{ maxWidth: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px` }}
                {...props}
              >
                {children}
                {!hideClose && (
                  <button aria-label="Close" className={cx(exitButtonRecipe())} onClick={closeBtnHandler}>
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
                  </button>
                )}
              </div>
            </>,
            document.body,
          )}
      </>
    );
  },
);

// styles moved to recipes
