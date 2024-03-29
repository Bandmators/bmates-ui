import React from 'react';

import useModal from '@/hooks/useModal';

import { PortalContext } from './PortalContext';
import { PortalType } from './type';

export interface PortalProviderProps extends React.PropsWithChildren, PortalType {
  enableScroll?: boolean;
}

export const PortalProvider = ({ align, space, enableScroll, children }: PortalProviderProps) => {
  const [showModal, _setShowModal] = useModal(enableScroll);
  const [toggleElement, setToggleElment] = React.useState<HTMLElement>();

  const setShowModal = (value: boolean) => {
    _setShowModal(value);
    if (!value) window.setTimeout(() => toggleElement?.focus());
  };

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
