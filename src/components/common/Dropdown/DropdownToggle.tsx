import * as React from 'react';

import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { Button } from '..';
import DropdownContext from './DropdownContext';

type ComponentPropsWithoutRef<E extends React.ElementType> = React.ComponentPropsWithoutRef<E> & {
  asChild?: boolean;
};

/**
 * DropdownToggle
 * @returns
 */
export const DropdownToggle = React.forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ asChild, onClick, ...props }, ref) => {
    const { setShowModal, setToggleRect } = useContext(DropdownContext);
    const compRef = React.useRef<HTMLButtonElement | null>(null);

    const Comp = asChild ? Slot : Button;

    return (
      <Comp
        ref={composeRefs(compRef, ref)}
        onClick={composeEventHandlers(onClick, () => {
          if (compRef.current) {
            const rect = compRef.current.getBoundingClientRect();
            setToggleRect(rect);
          }

          setShowModal(true);
        })}
        {...props}
      />
    );
  },
);
DropdownToggle.displayName = 'DropdownToggle';
