import * as React from 'react';

interface DialogContextType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
const DialogContext = React.createContext<DialogContextType | null>(null);
export default DialogContext;
