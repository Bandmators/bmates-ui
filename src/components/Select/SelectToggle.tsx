import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers, excludeTouchEventHandler } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { Button } from '../../';
import SelectContext from './SelectContext';
import { selectDownIconWrapperRecipe, selectToggleContentRecipe } from './select.recipe';

type ComponentPropsWithoutRef<E extends React.ElementType> = React.ComponentPropsWithoutRef<E> & {
  asChild?: boolean;
};

/**
 * SelectToggle
 * @returns
 */
export const SelectToggle = React.forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ asChild, onClick, onPointerEnter, onPointerLeave, children, ...props }, ref) => {
    const { hoverOpen, setShowModal, setToggleElment, openHover } = useContext(PortalContext);
    const { selectedValue } = useContext(SelectContext);
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
            // closed by portal-level pointer tracking
          }),
        )}
        onClick={composeEventHandlers(onClick, () => {
          syncToggle();
          setShowModal(true);
        })}
        aria-haspopup="true"
        aria-expanded="true"
        {...props}
      >
        <div className={cx(selectToggleContentRecipe())}>
          {selectedValue.length > 0 ? selectedValue.map(val => val.name).join(',') : children}
        </div>
        <div className={cx(selectDownIconWrapperRecipe())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </Comp>
    );
  },
);
SelectToggle.displayName = 'SelectToggle';
