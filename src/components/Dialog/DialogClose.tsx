import * as React from 'react';

import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';

import { Button } from '../Button';
import DialogContext from './DialogContext';

type ComponentPropsWithoutRef<E extends React.ElementType> = React.ComponentPropsWithoutRef<E> & {
  asChild?: boolean;
};

/**
 * DialogClose
 * @returns
 */
export const DialogClose = React.forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ asChild, onClick, ...props }, ref) => {
    const { setShowModal } = useContext(DialogContext);

    const Comp = asChild ? Slot : Button;

    return (
      <Comp
        ref={ref}
        onClick={composeEventHandlers(onClick, () => {
          setShowModal(false);
        })}
        {...props}
      />
    );
  },
);
DialogClose.displayName = 'DialogClose';
