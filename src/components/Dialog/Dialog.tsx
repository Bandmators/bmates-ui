import * as React from 'react';

import useModal from '@/hooks/useModal';

import DialogContext from './DialogContext';

interface DialogProps extends React.ComponentPropsWithoutRef<'div'> {}

/**
 * Block other actions and open new windows.
 * @returns
 */
export const Dialog = ({ children, ...props }: DialogProps) => {
  const [portalDocument, setPortalDocument] = React.useState<Document | undefined>(() =>
    typeof document === 'undefined' ? undefined : document,
  );
  const [showModal, setShowModal] = useModal(true, portalDocument);

  return (
    <DialogContext.Provider value={{ showModal, setShowModal, portalDocument, setPortalDocument }} {...props}>
      {children}
    </DialogContext.Provider>
  );
};
