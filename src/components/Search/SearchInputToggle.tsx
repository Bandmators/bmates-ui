import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { Input } from '../..';

type ComponentPropsWithoutRef<E extends React.ElementType> = React.ComponentPropsWithoutRef<E>;

/**
 * SearchInputToggle
 * @returns
 */
export const SearchInputToggle = React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  ({ onClick, onChange, ...props }, ref) => {
    const { showModal, setShowModal, setToggleElment } = useContext(PortalContext);
    const compRef = React.useRef<HTMLInputElement | null>(null);

    const openModal = () => {
      if (showModal) return;

      if (compRef.current) {
        const rect = compRef.current;
        setToggleElment(rect);
      }

      setShowModal(true);
    };

    return (
      <Input
        ref={composeRefs(compRef, ref)}
        aria-haspopup="true"
        onClick={composeEventHandlers(openModal, onClick)}
        onChange={composeEventHandlers(openModal, onChange)}
        {...props}
      />
    );
  },
);
SearchInputToggle.displayName = 'SearchInputToggle';
