import * as React from 'react';

import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';

import { Button } from '../Button';
import type { ButtonAsChildProps } from '../Button';
import DialogContext from './DialogContext';

/**
 * DialogClose
 * @returns
 */
export const DialogClose = React.forwardRef<HTMLButtonElement, ButtonAsChildProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { setShowModal } = useContext(DialogContext);

    const Comp: React.ElementType = asChild ? Slot : Button;

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
