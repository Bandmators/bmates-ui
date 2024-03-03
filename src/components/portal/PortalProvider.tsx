import React from 'react';

import useModal from '@/hooks/useModal';
import { AlignType } from '@/types/align';

import { PortalContext } from './PortalContext';

interface PortalProviderProps extends React.PropsWithChildren {
  align: AlignType;
}

export const PortalProvider = ({ align, children }: PortalProviderProps) => {
  const [showModal, setShowModal] = useModal();
  const [toggleElement, setToggleElment] = React.useState<HTMLElement>();

  return (
    <PortalContext.Provider
      value={{
        showModal,
        setShowModal,
        toggleElement,
        setToggleElment,
        align,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};
