import * as React from 'react';

import DialogContext from './DialogContext';

interface DialogProps extends React.ComponentPropsWithoutRef<'div'> {}

/**
 * Dialog Context Provider
 * @returns
 */
export const Dialog = ({ children, ...props }: DialogProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ showModal, setShowModal }} {...props}>
      {children}
    </DialogContext.Provider>
  );
};

// const DialogProvider = styled.div``;
