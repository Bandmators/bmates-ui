import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { Button } from '../..';
import type { ButtonProps } from '../Button';

type SearchToggleProps = ButtonProps & {
  asChild?: boolean;
};

/**
 * SearchToggle
 * @returns
 */
export const SearchToggle = React.forwardRef<HTMLButtonElement, SearchToggleProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { setShowModal, setToggleElment } = useContext(PortalContext);
    const compRef = React.useRef<HTMLButtonElement | null>(null);

    const Comp: React.ElementType = asChild ? Slot : Button;

    return (
      <Comp
        ref={composeRefs(compRef, ref)}
        aria-haspopup="true"
        onClick={composeEventHandlers(onClick, () => {
          if (compRef.current) {
            const rect = compRef.current;
            setToggleElment(rect);
          }

          setShowModal(true);
        })}
        {...props}
      />
    );
  },
);
SearchToggle.displayName = 'SearchToggle';
