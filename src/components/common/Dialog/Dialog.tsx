import * as React from 'react';

import useModal from '@/hooks/useModal';

import DialogContext from './DialogContext';

interface DialogProps extends React.ComponentPropsWithoutRef<'div'> {}

/**
 * Block other actions and open new windows.
 * @returns
 */
export const Dialog = ({ children, ...props }: DialogProps) => {
  const [showModal, setShowModal] = useModal();

  return (
    <DialogContext.Provider value={{ showModal, setShowModal }} {...props}>
      {children}
    </DialogContext.Provider>
  );
};
