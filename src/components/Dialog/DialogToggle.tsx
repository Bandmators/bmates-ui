import * as React from 'react';

import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';

import { Button } from '../';
import type { ButtonAsChildProps } from '../Button';
import DialogContext from './DialogContext';

/**
 * DialogToggle
 * @returns
 */
export const DialogToggle = React.forwardRef<HTMLButtonElement, ButtonAsChildProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { setShowModal, setPortalDocument } = useContext(DialogContext);

    const Comp: React.ElementType = asChild ? Slot : Button;

    return (
      <Comp
        ref={ref}
        aria-haspopup="true"
        onClick={composeEventHandlers(onClick, event => {
          setPortalDocument(event.currentTarget.ownerDocument);
          setShowModal(true);
        })}
        {...props}
      />
    );
  },
);
DialogToggle.displayName = 'DialogToggle';
