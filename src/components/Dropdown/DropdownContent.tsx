import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';
import { PortalContext } from '@/components/Portal/PortalContext';
import useContext from '@/hooks/useContext';
import { composeEventHandlers, excludeTouchEventHandler } from '@/libs/event';

import { dropdownListBoxRecipe } from './dropdown.recipe';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * DropdownContent
 * @returns
 */
export const DropdownContent = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ width, children, onPointerEnter, onPointerLeave, ...props }, ref) => {
    const { hoverOpen, openHover } = useContext(PortalContext);

    return (
      <PortalContent
        width={width}
        ref={ref}
        disabledBG={hoverOpen}
        role="group"
        onPointerEnter={composeEventHandlers(
          onPointerEnter,
          excludeTouchEventHandler(() => hoverOpen && openHover()),
        )}
        onPointerLeave={composeEventHandlers(
          onPointerLeave,
          excludeTouchEventHandler(() => {
            // closed by portal-level pointer tracking
          }),
        )}
        {...props}
      >
        <ul className={cx(dropdownListBoxRecipe())}>{children}</ul>
      </PortalContent>
    );
  },
);
DropdownContent.displayName = 'DropdownContent';
