import React from 'react';

import useModal from '@/hooks/useModal';

import { PortalContext } from './PortalContext';
import { PortalType } from './type';

export interface PortalProviderProps extends React.PropsWithChildren, PortalType {
  enableScroll?: boolean;
}

export const PortalProvider = ({ align, space, enableScroll, children }: PortalProviderProps) => {
  const [showModal, setShowModal] = useModal(enableScroll);
  const [toggleElement, setToggleElment] = React.useState<HTMLElement>();

  return (
    <PortalContext.Provider
      value={{
        showModal,
        setShowModal,
        toggleElement,
        setToggleElment,
        align,
        space,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};
