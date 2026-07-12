import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers, excludeTouchEventHandler } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { Button } from '../../';

type ComponentPropsWithoutRef<E extends React.ElementType> = React.ComponentPropsWithoutRef<E> & {
  asChild?: boolean;
};

/**
 * DropdownToggle
 * @returns
 */
export const DropdownToggle = React.forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ asChild, onClick, onPointerEnter, onPointerLeave, ...props }, ref) => {
    const { hoverOpen, setShowModal, setToggleElment, openHover } = useContext(PortalContext);
    const compRef = React.useRef<HTMLButtonElement | null>(null);

    const Comp = asChild ? Slot : Button;

    const syncToggle = () => {
      if (compRef.current) {
        setToggleElment(compRef.current);
      }
    };

    return (
      <Comp
        ref={composeRefs(compRef, ref)}
        aria-haspopup="true"
        onPointerEnter={composeEventHandlers(
          onPointerEnter,
          excludeTouchEventHandler(() => {
            syncToggle();
            if (hoverOpen) openHover();
          }),
        )}
        onPointerLeave={composeEventHandlers(
          onPointerLeave,
          excludeTouchEventHandler(() => {
            // hover-open is closed from portal-level pointer tracking
          }),
        )}
        onClick={composeEventHandlers(onClick, () => {
          syncToggle();
          setShowModal(true);
        })}
        {...props}
      />
    );
  },
);
DropdownToggle.displayName = 'DropdownToggle';
